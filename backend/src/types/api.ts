export interface GridCell {
  lat: number;
  lon: number;
  lst: number;
  ndvi: number;
  precipitation: number;
  elevation: number;
  no2: number;
  o3: number;
  heat_risk: number;
  flood_risk: number;
  air_quality: number;
  greenness_index: number;
}

export interface SummaryStats {
  lst_min: number;
  lst_max: number;
  lst_mean: number;
  ndvi_mean: number;
  precipitation_mean: number;
  elevation_mean: number;
  no2_mean: number;
  o3_mean: number;
}

export interface EnvironmentalSummary {
  center_lat: number;
  center_lon: number;
  radius_km: number;
  acquired_at: string;
  stats: SummaryStats;
  grid: GridCell[];
}

export interface EnvironmentalResponse {
  summary: EnvironmentalSummary;
  risks: Record<string, number>;
}

export interface CommunityReport {
  id: number;
  lat: number;
  lon: number;
  issue_type: string;
  description: string;
  timestamp: string;
  votes: number;
}

export interface ReportCreate {
  lat: number;
  lon: number;
  issue_type: string;
  description: string;
  timestamp?: string;
}

export interface SimulationIntervention {
  intervention_id: string;
  quantity: number;
}

export interface SimulationRequest {
  interventions: SimulationIntervention[];
  baseline_heat_risk: number;
  baseline_air_quality: number;
  baseline_ndvi: number;
}

export interface SimulationResult {
  baseline: Record<string, number>;
  projected: Record<string, number>;
  impact: {
    heat_risk_delta: number;
    air_quality_delta: number;
    ndvi_delta: number;
    no2_delta: number;
    total_cost: number;
    total_benefits: number;
    roi: number;
    breakdown: Record<string, number>;
  };
}

export type InterventionsCatalogue = Record<string, {
  name: string;
  description: string;
  cost: number;
  lst: number;
  ndvi: number;
  no2: number;
  benefits: Record<string, number>;
}>;
