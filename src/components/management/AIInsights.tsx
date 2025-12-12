"use client";

import { Card } from "../ui/card";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { 
  Sparkles, 
  TrendingUp, 
  TrendingDown, 
  AlertTriangle, 
  Lightbulb,
  ChevronDown,
  ChevronUp,
  X
} from "lucide-react";
import { useState } from "react";
import { cn } from "../ui/utils";

export interface AIInsight {
  id: string;
  type: "prediction" | "recommendation" | "alert" | "opportunity";
  title: string;
  description: string;
  impact?: "high" | "medium" | "low";
  confidence?: number;
  trend?: "up" | "down" | "stable";
  metric?: string;
  value?: string | number;
  action?: {
    label: string;
    onClick: () => void;
  };
}

interface AIInsightsProps {
  insights: AIInsight[];
  title?: string;
  compact?: boolean;
  dismissible?: boolean;
  onDismiss?: (id: string) => void;
  className?: string;
}

export function AIInsights({ 
  insights, 
  title = "AI Insights", 
  compact = false,
  dismissible = false,
  onDismiss,
  className 
}: AIInsightsProps) {
  const [isExpanded, setIsExpanded] = useState(true);
  const [dismissedIds, setDismissedIds] = useState<Set<string>>(new Set());

  if (insights.length === 0) {
    return null;
  }

  const visibleInsights = insights.filter(insight => !dismissedIds.has(insight.id));

  if (visibleInsights.length === 0) {
    return null;
  }

  const handleDismiss = (id: string) => {
    setDismissedIds(prev => new Set([...prev, id]));
    onDismiss?.(id);
  };

  const getTypeIcon = (type: AIInsight["type"]) => {
    switch (type) {
      case "prediction":
        return <TrendingUp className="h-4 w-4" />;
      case "recommendation":
        return <Lightbulb className="h-4 w-4" />;
      case "alert":
        return <AlertTriangle className="h-4 w-4" />;
      case "opportunity":
        return <Sparkles className="h-4 w-4" />;
    }
  };

  const getTypeColor = (type: AIInsight["type"]) => {
    switch (type) {
      case "prediction":
        return "bg-blue-50 text-blue-700 border-blue-200";
      case "recommendation":
        return "bg-purple-50 text-purple-700 border-purple-200";
      case "alert":
        return "bg-orange-50 text-orange-700 border-orange-200";
      case "opportunity":
        return "bg-green-50 text-green-700 border-green-200";
    }
  };

  const getImpactBadge = (impact?: string) => {
    if (!impact) return null;
    const colors = {
      high: "bg-red-100 text-red-700",
      medium: "bg-yellow-100 text-yellow-700",
      low: "bg-blue-100 text-blue-700"
    };
    return (
      <Badge variant="outline" className={cn("text-[10px]", colors[impact as keyof typeof colors])}>
        {impact.toUpperCase()} IMPACT
      </Badge>
    );
  };

  return (
    <Card className={cn("border-purple-200 bg-gradient-to-br from-purple-50 to-white", className)}>
      <div className="p-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-lg bg-purple-100">
              <Sparkles className="h-4 w-4 text-purple-600" />
            </div>
            <h3 className="font-medium text-neutral-950">{title}</h3>
            <Badge variant="outline" className="text-[10px] bg-purple-100 text-purple-700 border-purple-200">
              AI-POWERED
            </Badge>
          </div>
          <Button
            variant="ghost"
            size="sm"
            className="h-6 w-6 p-0"
            onClick={() => setIsExpanded(!isExpanded)}
          >
            {isExpanded ? (
              <ChevronUp className="h-4 w-4" />
            ) : (
              <ChevronDown className="h-4 w-4" />
            )}
          </Button>
        </div>

        {/* Insights List */}
        {isExpanded && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
            {visibleInsights.map((insight) => (
              <div
                key={insight.id}
                className={cn(
                  "p-3 rounded-lg border",
                  getTypeColor(insight.type)
                )}
              >
                <div className="flex items-start gap-3">
                  <div className="mt-0.5">{getTypeIcon(insight.type)}</div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2 mb-1">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 flex-wrap">
                          <h4 className="text-[13px] font-medium">{insight.title}</h4>
                          {getImpactBadge(insight.impact)}
                          {insight.confidence && (
                            <span className="text-[10px] text-muted-foreground">
                              {Math.round(insight.confidence * 100)}% confidence
                            </span>
                          )}
                        </div>
                      </div>
                      {dismissible && (
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-5 w-5 p-0 shrink-0"
                          onClick={() => handleDismiss(insight.id)}
                        >
                          <X className="h-3 w-3" />
                        </Button>
                      )}
                    </div>
                    
                    {!compact && (
                      <p className="text-[12px] text-muted-foreground mb-2">
                        {insight.description}
                      </p>
                    )}

                    {insight.metric && insight.value && (
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-[11px] text-muted-foreground">{insight.metric}:</span>
                        <span className="text-[13px] font-semibold">{insight.value}</span>
                        {insight.trend && (
                          <>
                            {insight.trend === "up" && <TrendingUp className="h-3 w-3 text-green-600" />}
                            {insight.trend === "down" && <TrendingDown className="h-3 w-3 text-red-600" />}
                          </>
                        )}
                      </div>
                    )}

                    {insight.action && (
                      <Button
                        size="sm"
                        variant="outline"
                        className="h-7 text-[11px] mt-1"
                        onClick={insight.action.onClick}
                      >
                        {insight.action.label}
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </Card>
  );
}