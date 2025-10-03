import { pool } from "./pool";

const CREATE_REPORTS_TABLE = `
  CREATE TABLE IF NOT EXISTS community_reports (
    id INT AUTO_INCREMENT PRIMARY KEY,
    lat DECIMAL(9,6) NOT NULL,
    lon DECIMAL(9,6) NOT NULL,
    issue_type VARCHAR(100) NOT NULL,
    description TEXT NOT NULL,
    timestamp DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    votes INT NOT NULL DEFAULT 0,
    INDEX idx_issue_type (issue_type),
    INDEX idx_timestamp (timestamp)
  ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
`;

export async function initializeDatabase() {
  const connection = await pool.getConnection();
  try {
    await connection.query(CREATE_REPORTS_TABLE);
  } finally {
    connection.release();
  }
}
