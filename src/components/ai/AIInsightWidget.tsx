"use client";

import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Sparkles, TrendingUp, TrendingDown, AlertTriangle, ArrowRight } from "lucide-react";
import { cn } from "../ui/utils";

export interface AIInsight {
  id: string;
  title: string;
  description: string;
  impact: string;
  confidence: number; // 0-100
  priority: 'critical' | 'high' | 'medium' | 'low';
  actionLabel?: string;
  actionUrl?: string;
  trend?: 'up' | 'down' | 'neutral';
  metric?: string;
}

interface AIInsightWidgetProps {
  insights: AIInsight[];
  onActionClick?: (insight: AIInsight) => void;
  compact?: boolean;
}

export function AIInsightWidget({ insights, onActionClick, compact = false }: AIInsightWidgetProps) {
  if (insights.length === 0) {
    return null;
  }

  const topInsight = insights[0];

  const priorityColors = {
    critical: 'bg-red-50 border-red-200 text-red-900',
    high: 'bg-orange-50 border-orange-200 text-orange-900',
    medium: 'bg-blue-50 border-blue-200 text-blue-900',
    low: 'bg-gray-50 border-gray-200 text-gray-900',
  };

  const TrendIcon = topInsight.trend === 'up' ? TrendingUp : topInsight.trend === 'down' ? TrendingDown : AlertTriangle;

  return (
    <Card className={cn("border-2", priorityColors[topInsight.priority])}>
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-2">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-purple-600" />
            <CardTitle className="text-sm">AI Insight</CardTitle>
          </div>
          <Badge variant="outline" className="text-xs">
            {topInsight.confidence}% confidence
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="flex items-start gap-2">
          <TrendIcon className={cn(
            "w-5 h-5 mt-0.5 flex-shrink-0",
            topInsight.trend === 'up' && "text-green-600",
            topInsight.trend === 'down' && "text-red-600",
            !topInsight.trend && "text-yellow-600"
          )} />
          <div className="flex-1 space-y-1">
            <h4 className="font-semibold text-sm">{topInsight.title}</h4>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {topInsight.description}
            </p>
            {topInsight.impact && (
              <div className="flex items-center gap-2 mt-2">
                <Badge variant="secondary" className="text-xs font-medium">
                  {topInsight.impact}
                </Badge>
                {topInsight.metric && (
                  <span className="text-xs text-muted-foreground">{topInsight.metric}</span>
                )}
              </div>
            )}
          </div>
        </div>

        {topInsight.actionLabel && (
          <Button
            variant="outline"
            size="sm"
            onClick={() => onActionClick?.(topInsight)}
            className="w-full gap-2"
          >
            {topInsight.actionLabel}
            <ArrowRight className="w-3 h-3" />
          </Button>
        )}

        {insights.length > 1 && !compact && (
          <div className="pt-2 border-t">
            <p className="text-xs text-muted-foreground">
              +{insights.length - 1} more insight{insights.length - 1 !== 1 ? 's' : ''} available
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
