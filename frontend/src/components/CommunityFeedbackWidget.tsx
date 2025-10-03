import { useEffect, useMemo, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { ScrollArea } from "./ui/scroll-area";
import {
  MessageSquare,
  Plus,
  ThumbsUp,
  ThumbsDown,
  MapPin,
  Clock,
  ChevronDown,
  ChevronUp,
  RefreshCcw,
} from "lucide-react";

import {
  fetchCommunityReports,
  voteOnReport,
} from "../api/client";
import type { CommunityReport } from "../api/types";

interface CommunityFeedbackWidgetProps {
  onSubmitReport: () => void;
}

const ISSUE_COLORS: Record<string, string> = {
  "Heat Island": "text-red-500",
  Heat: "text-red-500",
  "Air Quality": "text-orange-500",
  Flooding: "text-blue-500",
  "Flooding/Drainage": "text-blue-500",
  Greenspace: "text-green-500",
  "Greenspace Opportunity": "text-green-500",
};

function formatRelativeTime(timestamp: string) {
  const delta = Date.now() - new Date(timestamp).getTime();
  const minutes = Math.round(delta / 60000);
  if (minutes < 1) return "just now";
  if (minutes < 60) return `${minutes} min ago`;
  const hours = Math.round(minutes / 60);
  if (hours < 24) return `${hours} hr${hours > 1 ? "s" : ""} ago`;
  const days = Math.round(hours / 24);
  return `${days} day${days > 1 ? "s" : ""} ago`;
}

function deriveStatus(report: CommunityReport) {
  if (report.votes >= 20) return "resolved";
  if (report.votes >= 10) return "acknowledged";
  return "new";
}

function statusColor(status: string) {
  switch (status) {
    case "resolved":
      return "bg-green-500";
    case "acknowledged":
      return "bg-orange-500";
    default:
      return "bg-red-500";
  }
}

export function CommunityFeedbackWidget({ onSubmitReport }: CommunityFeedbackWidgetProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [reports, setReports] = useState<CommunityReport[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadReports = async () => {
    setLoading(true);
    try {
      const data = await fetchCommunityReports();
      setReports(data);
      setError(null);
    } catch (err) {
      const message = err instanceof Error ? err.message : "Unable to load community reports";
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadReports();
  }, []);

  const handleVote = async (reportId: number, delta: number) => {
    try {
      const updated = await voteOnReport(reportId, delta);
      setReports((prev) =>
        prev.map((report) => (report.id === updated.id ? updated : report))
      );
    } catch (err) {
      const message = err instanceof Error ? err.message : "Unable to update vote";
      setError(message);
    }
  };

  const newReportsCount = useMemo(
    () => reports.filter((report) => deriveStatus(report) === "new").length,
    [reports]
  );

  return (
    <Card className={`transition-all duration-300 ${isExpanded ? "h-96" : "h-auto"}`}>
      <CardHeader
        className="pb-3 cursor-pointer"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <CardTitle className="flex items-center justify-between text-green-500">
          <div className="flex items-center space-x-2">
            <MessageSquare className="h-5 w-5" />
            <span>Live Community Feedback</span>
            <Badge variant="outline" className="text-orange-500 border-orange-500">
              {newReportsCount} new
            </Badge>
          </div>
          {isExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
        </CardTitle>
      </CardHeader>

      {isExpanded && (
        <CardContent className="space-y-4">
          <div className="flex items-center gap-2">
            <Button onClick={onSubmitReport} className="flex-1 bg-green-600 hover:bg-green-700">
              <Plus className="h-4 w-4 mr-2" />
              Submit Report
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={loadReports}
              disabled={loading}
              className="border-green-500/50"
            >
              <RefreshCcw className={`h-4 w-4 ${loading ? "animate-spin" : ""}`} />
            </Button>
          </div>

          {error && (
            <div className="text-xs text-red-400 bg-red-500/10 border border-red-500/40 p-2 rounded">
              {error}
            </div>
          )}

          <ScrollArea className="h-64">
            {loading && reports.length === 0 ? (
              <div className="text-sm text-muted-foreground text-center py-6">
                Loading community reports...
              </div>
            ) : reports.length === 0 ? (
              <div className="text-sm text-muted-foreground text-center py-6">
                No community reports yet. Be the first to share your observation!
              </div>
            ) : (
              <div className="space-y-3">
                {reports.map((report) => {
                  const status = deriveStatus(report);
                  const issueColor = ISSUE_COLORS[report.issue_type] ?? "text-muted-foreground";
                  return (
                    <div
                      key={report.id}
                      className="p-3 rounded-lg bg-muted/30 border border-white/10"
                    >
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex items-center space-x-2">
                          <Badge className={`text-xs ${statusColor(status)} text-white`}>
                            {status}
                          </Badge>
                          <span className={`text-xs font-medium ${issueColor}`}>
                            {report.issue_type}
                          </span>
                        </div>
                        <div className="flex items-center space-x-1 text-xs text-muted-foreground">
                          <Clock className="h-3 w-3" />
                          {formatRelativeTime(report.timestamp)}
                        </div>
                      </div>

                      <div className="flex items-center gap-2 mb-2 text-sm font-medium">
                        <MapPin className="h-3 w-3 text-orange-500" />
                        <span>
                          {report.lat.toFixed(4)}°, {report.lon.toFixed(4)}°
                        </span>
                      </div>

                      <p className="text-xs text-muted-foreground mb-3">
                        {report.description}
                      </p>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-1 text-xs text-muted-foreground">
                          <Clock className="h-3 w-3" />
                          {new Date(report.timestamp).toLocaleString()}
                        </div>
                        <div className="flex items-center space-x-3">
                          <Button
                            onClick={() => handleVote(report.id, +1)}
                            variant="ghost"
                            size="icon"
                            className="h-6 w-6 text-green-500"
                          >
                            <ThumbsUp className="h-3 w-3" />
                          </Button>
                          <span className="text-xs font-semibold">
                            {report.votes}
                          </span>
                          <Button
                            onClick={() => handleVote(report.id, -1)}
                            variant="ghost"
                            size="icon"
                            className="h-6 w-6 text-red-500"
                          >
                            <ThumbsDown className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </ScrollArea>
        </CardContent>
      )}
    </Card>
  );
}
