import { useEffect, useMemo, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Badge } from "../ui/badge";
import { Progress } from "../ui/progress";
import { Loader2, Target, Brain, DollarSign, Leaf, Thermometer } from "lucide-react";

import { fetchInterventionsCatalogue, runSimulation } from "../../api/client";
import type { InterventionsCatalogue, SimulationResult } from "../../api/types";
import { useEnvironmentalData } from "../../hooks/useEnvironmentalData";

interface SimulatorPageProps {
  onNavigate?: (page: string) => void;
}

interface SelectedIntervention {
  id: string;
  quantity: number;
}

export function SimulatorPage({ onNavigate }: SimulatorPageProps) {
  const { data, loading: envLoading } = useEnvironmentalData();
  const [catalogue, setCatalogue] = useState<InterventionsCatalogue | null>(null);
  const [selected, setSelected] = useState<SelectedIntervention[]>([]);
  const [result, setResult] = useState<SimulationResult | null>(null);
  const [running, setRunning] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      try {
        const response = await fetchInterventionsCatalogue();
        setCatalogue(response);
        setSelected(
          Object.keys(response).map((id) => ({ id, quantity: 1 }))
        );
      } catch (err) {
        const message = err instanceof Error ? err.message : "Unable to load interventions";
        setError(message);
      }
    })();
  }, []);

  const baseline = useMemo(() => ({
    heat: data?.risks?.heat_risk ?? 0.5,
    air: data?.risks?.air_quality ?? 0.5,
    ndvi: data?.risks?.greenness_index ?? 0.3,
  }), [data]);

  const handleQuantityChange = (id: string, quantity: number) => {
    setSelected((prev) =>
      prev.map((item) => (item.id === id ? { ...item, quantity: Math.max(0, quantity) } : item))
    );
  };

  const handleToggle = (id: string) => {
    setSelected((prev) =>
      prev.some((item) => item.id === id)
        ? prev.filter((item) => item.id !== id)
        : [...prev, { id, quantity: 1 }]
    );
  };

  const handleRun = async () => {
    if (!catalogue) return;
    if (selected.length === 0) {
      setError("Select at least one intervention to simulate");
      return;
    }

    setError(null);
    setRunning(true);
    try {
      const payload = {
        interventions: selected.map((item) => ({ intervention_id: item.id, quantity: Math.max(1, item.quantity) })),
        baseline_heat_risk: baseline.heat,
        baseline_air_quality: baseline.air,
        baseline_ndvi: baseline.ndvi,
      };
      const response = await runSimulation(payload);
      setResult(response);
    } catch (err) {
      const message = err instanceof Error ? err.message : "Simulation failed";
      setError(message);
    } finally {
      setRunning(false);
    }
  };

  return (
    <div className="mx-auto flex max-w-5xl flex-col gap-6 p-4 lg:p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-orange-500">Intervention Simulator</h1>
          <p className="text-sm text-muted-foreground">
            Test NASA-aligned interventions and measure their impact on heat, flood, and air quality risk.
          </p>
        </div>
        <Button variant="outline" size="sm" onClick={() => onNavigate?.("digital-twin")}>{"← Back"}</Button>
      </div>

      {error && (
        <div className="rounded-md border border-red-500/40 bg-red-500/10 px-4 py-3 text-sm text-red-200">
          {error}
        </div>
      )}

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2 text-sm">
              <Target className="h-4 w-4 text-orange-400" />
              Select Interventions
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {catalogue ? (
              Object.entries(catalogue).map(([id, meta]) => {
                const active = selected.some((item) => item.id === id);
                const current = selected.find((item) => item.id === id)?.quantity ?? 1;
                return (
                  <div
                    key={id}
                    className={`rounded-lg border p-3 transition ${
                      active ? "border-orange-500/60 bg-orange-500/10" : "border-white/10 hover:border-white/20"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-sm font-medium capitalize">{id.replace(/_/g, " ")}</div>
                        <div className="text-xs text-muted-foreground">${meta.cost.toLocaleString()}</div>
                      </div>
                      <Button variant="outline" size="sm" onClick={() => handleToggle(id)}>
                        {active ? "Remove" : "Add"}
                      </Button>
                    </div>
                    {active && (
                      <div className="mt-3 flex items-center gap-2 text-xs text-muted-foreground">
                        <span>Quantity</span>
                        <Input
                          type="number"
                          min={1}
                          value={current}
                          onChange={(event) => handleQuantityChange(id, parseInt(event.target.value, 10) || 1)}
                          className="h-8 w-20"
                        />
                      </div>
                    )}
                  </div>
                );
              })
            ) : (
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Loader2 className="h-4 w-4 animate-spin" />
                Loading catalogue...
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">Baseline Risks</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm">
            <div className="flex justify-between">
              <span className="flex items-center gap-2 text-red-400">
                <Thermometer className="h-4 w-4" /> Heat risk
              </span>
              <span>{envLoading ? "--" : baseline.heat.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span className="flex items-center gap-2 text-purple-400">
                <Leaf className="h-4 w-4" /> Air quality
              </span>
              <span>{envLoading ? "--" : baseline.air.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span className="flex items-center gap-2 text-green-400">
                <Brain className="h-4 w-4" /> Greenness
              </span>
              <span>{envLoading ? "--" : baseline.ndvi.toFixed(2)}</span>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="flex justify-end gap-2">
        <Button onClick={handleRun} disabled={running || selected.length === 0}>
          {running && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}Run simulation
        </Button>
      </div>

      {result && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-sm">
              <Brain className="h-4 w-4 text-green-400" /> Simulation Outcome
            </CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2 text-sm">
              <div className="text-xs uppercase text-muted-foreground">Projected risks</div>
              <div className="rounded border border-white/10 p-3">
                <div className="flex justify-between"><span>Heat</span><Badge variant="outline">{result.projected.heat_risk.toFixed(3)}</Badge></div>
                <div className="flex justify-between"><span>Air</span><Badge variant="outline">{result.projected.air_quality.toFixed(3)}</Badge></div>
                <div className="flex justify-between"><span>Greenness</span><Badge variant="outline">{result.projected.ndvi.toFixed(3)}</Badge></div>
              </div>
            </div>
            <div className="space-y-2 text-sm">
              <div className="text-xs uppercase text-muted-foreground">Impact</div>
              <div className="rounded border border-white/10 p-3 space-y-2">
                <div className="flex items-center justify-between">
                  <span>Heat risk change</span>
                  <span className="text-green-400">{result.impact.heat_risk_delta.toFixed(3)}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Air quality change</span>
                  <span className="text-green-400">{result.impact.air_quality_delta.toFixed(3)}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>NDVI change</span>
                  <span className="text-green-400">{result.impact.ndvi_delta.toFixed(3)}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Cost</span>
                  <span>${result.impact.total_cost.toLocaleString()}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>ROI</span>
                  <span>{(result.impact.roi * 100).toFixed(1)}%</span>
                </div>
              </div>
            </div>
            <div className="md:col-span-2 space-y-2 text-xs text-muted-foreground">
              <div className="uppercase">Benefit breakdown</div>
              <div className="grid gap-2 md:grid-cols-3">
                {Object.entries(result.impact.breakdown).map(([key, value]) => (
                  <div key={key} className="rounded border border-white/10 p-3">
                    <div className="text-sm font-medium capitalize">{key.replace(/_/g, " ")}</div>
                    <div className="text-xs text-muted-foreground">
                      ${value.toLocaleString()}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
