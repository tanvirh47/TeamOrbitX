import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Badge } from "../ui/badge";
import { Progress } from "../ui/progress";
import { MapPin, Upload, Camera, Check, RefreshCw } from "lucide-react";

import { submitCommunityReport } from "../../api/client";

interface SubmitReportPageProps {
  onNavigate?: (page: string) => void;
}

const ISSUE_OPTIONS = [
  { id: "heat", label: "Heat Island", description: "Too hot, no shade", issueType: "Heat Island" },
  { id: "air", label: "Air Quality", description: "Bad smell or pollution", issueType: "Air Quality" },
  { id: "flood", label: "Flooding", description: "Standing water or drainage", issueType: "Flooding" },
  { id: "green", label: "Lack of Greenspace", description: "Need trees or parks", issueType: "Greenspace" },
  { id: "noise", label: "Noise Pollution", description: "Loud or constant noise", issueType: "Noise Pollution" },
];

export function SubmitReportPage({ onNavigate }: SubmitReportPageProps) {
  const [lat, setLat] = useState(40.7128);
  const [lon, setLon] = useState(-74.0060);
  const [issueId, setIssueId] = useState<string | null>(null);
  const [description, setDescription] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [feedback, setFeedback] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [greenPoints, setGreenPoints] = useState(120);

  const issue = ISSUE_OPTIONS.find((option) => option.id === issueId);

  const handleSubmit = async () => {
    if (!issue) {
      setError("Select an issue category before submitting.");
      return;
    }
    if (!description.trim()) {
      setError("Describe what you observed so planners can act.");
      return;
    }

    setError(null);
    setSubmitting(true);
    try {
      await submitCommunityReport({
        lat,
        lon,
        issue_type: issue.issueType,
        description: description.trim(),
      });
      setFeedback("Thanks! Your report is logged and visible to planners.");
      setGreenPoints((points) => points + 20);
      setDescription("");
    } catch (err) {
      const message = err instanceof Error ? err.message : "Unable to submit report";
      setError(message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="mx-auto max-w-3xl space-y-6 p-4 lg:p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-orange-500">Submit Community Report</h1>
          <p className="text-sm text-muted-foreground">
            Share what you see so OrbitX can combine it with NASA data for faster action.
          </p>
        </div>
        <div className="text-right">
          <div className="text-xs uppercase text-muted-foreground">Green Points</div>
          <div className="text-lg font-semibold text-green-400">{greenPoints}</div>
        </div>
      </div>

      {feedback && (
        <div className="rounded-md border border-green-500/40 bg-green-500/10 px-4 py-3 text-sm text-green-200">
          {feedback}
        </div>
      )}
      {error && (
        <div className="rounded-md border border-red-500/40 bg-red-500/10 px-4 py-3 text-sm text-red-200">
          {error}
        </div>
      )}

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-sm">
            <MapPin className="h-4 w-4 text-orange-500" />
            Location
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="text-xs text-muted-foreground">Latitude</label>
              <Input type="number" step="0.0001" value={lat} onChange={(event) => setLat(parseFloat(event.target.value) || 0)} />
            </div>
            <div>
              <label className="text-xs text-muted-foreground">Longitude</label>
              <Input type="number" step="0.0001" value={lon} onChange={(event) => setLon(parseFloat(event.target.value) || 0)} />
            </div>
          </div>
          <Button variant="outline" size="sm" className="flex items-center gap-2" onClick={() => setFeedback("Location auto-detect is coming soon.")}>
            <RefreshCw className="h-4 w-4" />
            Use my current location
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-sm">What kind of issue is this?</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-3 sm:grid-cols-2">
          {ISSUE_OPTIONS.map((option) => (
            <button
              key={option.id}
              onClick={() => setIssueId(option.id)}
              className={`rounded-lg border p-4 text-left transition ${
                issueId === option.id ? "border-orange-500 bg-orange-500/10" : "border-white/10 hover:border-white/20"
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="text-sm font-medium">{option.label}</div>
                {issueId === option.id && <Check className="h-4 w-4 text-orange-500" />}
              </div>
              <div className="mt-1 text-xs text-muted-foreground">{option.description}</div>
            </button>
          ))}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-sm">Describe what you observed</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <Textarea
            value={description}
            onChange={(event) => setDescription(event.target.value)}
            placeholder="What happened? When does it occur? How does it impact people?"
            className="min-h-[140px]"
          />
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <Camera className="h-4 w-4" />
            Photos help planners prioritize. Attach if you can.
          </div>
          <div className="flex gap-2">
            <Button variant="outline" className="flex-1" size="sm">
              <Camera className="mr-2 h-4 w-4" />
              Take Photo
            </Button>
            <Button variant="outline" className="flex-1" size="sm">
              <Upload className="mr-2 h-4 w-4" />
              Upload
            </Button>
          </div>
        </CardContent>
      </Card>

      <div className="flex items-center justify-between">
        <div className="text-xs text-muted-foreground">
          Your report is shared with city planners and community members. Personal details remain private.
        </div>
        <Button onClick={handleSubmit} disabled={submitting}>
          {submitting ? "Submitting..." : "Submit report"}
        </Button>
      </div>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm">Progress to next badge</CardTitle>
        </CardHeader>
        <CardContent>
          <Progress value={(greenPoints % 100)} className="mb-2" />
          <div className="text-xs text-muted-foreground">
            {100 - (greenPoints % 100)} more points until the next recognition level.
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
