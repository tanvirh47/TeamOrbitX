import type { ResultSetHeader, RowDataPacket } from "mysql2/promise";

import type { CommunityReport, ReportCreate } from "../types/api";
import { pool } from "../db/pool";

interface ReportRow extends RowDataPacket {
  id: number;
  lat: number | string;
  lon: number | string;
  issue_type: string;
  description: string;
  timestamp: Date;
  votes: number;
}

function mapReport(row: ReportRow): CommunityReport {
  const timestamp = row.timestamp instanceof Date ? row.timestamp : new Date(row.timestamp);
  return {
    id: row.id,
    lat: typeof row.lat === "string" ? parseFloat(row.lat) : row.lat,
    lon: typeof row.lon === "string" ? parseFloat(row.lon) : row.lon,
    issue_type: row.issue_type,
    description: row.description,
    timestamp: timestamp.toISOString(),
    votes: row.votes,
  };
}

export async function listReports(): Promise<CommunityReport[]> {
  const [rows] = await pool.query<ReportRow[]>(
    "SELECT id, lat, lon, issue_type, description, timestamp, votes FROM community_reports ORDER BY timestamp DESC",
  );
  return rows.map(mapReport);
}

export async function getReport(id: number): Promise<CommunityReport | null> {
  const [rows] = await pool.query<ReportRow[]>(
    "SELECT id, lat, lon, issue_type, description, timestamp, votes FROM community_reports WHERE id = ?",
    [id],
  );
  if (rows.length === 0) {
    return null;
  }
  return mapReport(rows[0]!);
}

export async function createReport(payload: ReportCreate): Promise<CommunityReport> {
  const timestamp = payload.timestamp ? new Date(payload.timestamp) : new Date();

  const [result] = await pool.execute<ResultSetHeader>(
    `INSERT INTO community_reports (lat, lon, issue_type, description, timestamp, votes)
     VALUES (?, ?, ?, ?, ?, 0)`,
    [payload.lat, payload.lon, payload.issue_type, payload.description, timestamp],
  );

  return (await getReport(result.insertId))!;
}

export async function updateVotes(id: number, delta: number): Promise<CommunityReport | null> {
  const connection = await pool.getConnection();
  try {
    await connection.beginTransaction();

    const [rows] = await connection.query<ReportRow[]>(
      "SELECT id, lat, lon, issue_type, description, timestamp, votes FROM community_reports WHERE id = ? FOR UPDATE",
      [id],
    );

    if (rows.length === 0) {
      await connection.rollback();
      return null;
    }

    const current = rows[0]!;
    const updatedVotes = current.votes + delta;

    await connection.execute<ResultSetHeader>(
      "UPDATE community_reports SET votes = ? WHERE id = ?",
      [updatedVotes, id],
    );

    await connection.commit();

    return mapReport({ ...current, votes: updatedVotes });
  } catch (error) {
    await connection.rollback();
    throw error;
  } finally {
    connection.release();
  }
}
