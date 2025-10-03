import type { SimulationRequest, SimulationResult } from "../types/api";
import { getInterventionsCatalogue } from "./interventionsService";

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

export function simulateInterventions(request: SimulationRequest): SimulationResult {
  const catalogue = getInterventionsCatalogue();

  let heatRiskDelta = 0;
  let airQualityDelta = 0;
  let ndviDelta = 0;
  let no2Delta = 0;
  let totalCost = 0;
  const breakdown: Record<string, number> = {};

  for (const intervention of request.interventions) {
    const details = catalogue[intervention.intervention_id];
    if (!details) {
      throw new Error(`Unknown intervention: ${intervention.intervention_id}`);
    }

    const quantity = Math.max(0, intervention.quantity);
    heatRiskDelta += details.lst * quantity;
    airQualityDelta += -details.no2 * quantity;
    ndviDelta += details.ndvi * quantity;
    no2Delta += details.no2 * quantity;
    totalCost += details.cost * quantity;

    for (const [key, value] of Object.entries(details.benefits)) {
      breakdown[key] = (breakdown[key] ?? 0) + value * quantity;
    }
  }

  const baseline = {
    heat_risk: clamp(request.baseline_heat_risk, 0, 1),
    air_quality: clamp(request.baseline_air_quality, 0, 1),
    ndvi: clamp(request.baseline_ndvi, 0, 1),
    no2: 32,
  } as const;

  const projected = {
    heat_risk: clamp(baseline.heat_risk + heatRiskDelta, 0, 1),
    air_quality: clamp(baseline.air_quality + airQualityDelta, 0, 1),
    ndvi: clamp(baseline.ndvi + ndviDelta, 0, 1),
    no2: clamp(baseline.no2 + no2Delta, 5, 60),
  } as const;

  const totalBenefits = Object.values(breakdown).reduce((sum, value) => sum + value, 0);

  const impact = {
    heat_risk_delta: parseFloat((projected.heat_risk - baseline.heat_risk).toFixed(3)),
    air_quality_delta: parseFloat((projected.air_quality - baseline.air_quality).toFixed(3)),
    ndvi_delta: parseFloat((projected.ndvi - baseline.ndvi).toFixed(3)),
    no2_delta: parseFloat((projected.no2 - baseline.no2).toFixed(2)),
    total_cost: Math.round(totalCost),
    total_benefits: Math.round(totalBenefits),
    roi: totalCost === 0 ? 0 : parseFloat((totalBenefits / totalCost).toFixed(2)),
    breakdown: Object.fromEntries(
      Object.entries(breakdown).map(([key, value]) => [key, Math.round(value)]),
    ),
  } as const;

  return {
    baseline,
    projected,
    impact,
  };
}
