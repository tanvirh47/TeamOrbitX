import type { InterventionsCatalogue } from "../types/api";

const catalogue: InterventionsCatalogue = {
  "cool-roofs": {
    name: "Cool Roof Coatings",
    description: "High-albedo coatings to reduce roof surface temperatures and building cooling loads.",
    cost: 120000,
    lst: -0.05,
    ndvi: 0.01,
    no2: -0.005,
    benefits: {
      avoided_heat_emergencies: 35000,
      energy_savings: 42000,
      productivity_gain: 28000,
    },
  },
  "urban-tree-canopy": {
    name: "Urban Tree Canopy Expansion",
    description: "Targeted street tree planting focused on low-canopy neighborhoods.",
    cost: 90000,
    lst: -0.08,
    ndvi: 0.05,
    no2: -0.01,
    benefits: {
      stormwater_management: 26000,
      air_quality: 31000,
      property_value: 22000,
    },
  },
  "green-roofs": {
    name: "Green Roof Retrofit",
    description: "Install vegetated roof systems on municipal buildings to retain stormwater and lower heat stress.",
    cost: 150000,
    lst: -0.06,
    ndvi: 0.07,
    no2: -0.012,
    benefits: {
      heat_risk: 40000,
      biodiversity: 18000,
      building_performance: 36000,
    },
  },
  "permeable-pavement": {
    name: "Permeable Pavement",
    description: "Replace impervious surfaces with permeable materials to increase infiltration and reduce runoff.",
    cost: 75000,
    lst: -0.03,
    ndvi: 0.02,
    no2: -0.004,
    benefits: {
      flood_risk: 33000,
      maintenance_savings: 19000,
      cooling_effect: 17000,
    },
  },
  "community-cooling-centers": {
    name: "Community Cooling Centers",
    description: "Retrofit community centers with high-efficiency cooling and backup power for heat emergencies.",
    cost: 60000,
    lst: -0.02,
    ndvi: 0,
    no2: -0.001,
    benefits: {
      public_health: 45000,
      social_resilience: 22000,
      emergency_response: 18000,
    },
  },
};

export function getInterventionsCatalogue(): InterventionsCatalogue {
  return catalogue;
}
