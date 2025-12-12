"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "../ui/dialog";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Separator } from "../ui/separator";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Slider } from "../ui/slider";
import {
  Sparkles,
  TrendingUp,
  Zap,
  DollarSign,
  Clock,
  Users,
  Target,
  CheckCircle,
  Send,
  Calendar,
  XCircle,
  TrendingDown,
  Award,
  AlertCircle,
  BarChart3,
  ArrowRight,
  Percent,
} from "lucide-react";
import { cn } from "../ui/utils";
import { motion } from "motion/react";

interface AISuggestion {
  id: string;
  type: "capacity" | "pricing" | "promo";
  title: string;
  description: string;
  impact: string;
  slotTime: string;
  stationId: string;
  priority: "high" | "medium" | "low";
}

interface AISuggestionDialogProps {
  suggestion: AISuggestion | null;
  isOpen: boolean;
  onClose: () => void;
  onApply: (suggestionId: string, config: any) => void;
  onSchedule: (suggestionId: string, scheduleDate: Date) => void;
  onDismiss: (suggestionId: string) => void;
}

export function AISuggestionDialog({
  suggestion,
  isOpen,
  onClose,
  onApply,
  onSchedule,
  onDismiss,
}: AISuggestionDialogProps) {
  const [activeTab, setActiveTab] = useState("overview");
  const [discountValue, setDiscountValue] = useState([15]);
  const [targetAudience, setTargetAudience] = useState("all");
  const [campaignDuration, setCampaignDuration] = useState("1");
  const [customMessage, setCustomMessage] = useState("");

  if (!suggestion) return null;

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount);
  };

  const getTypeConfig = () => {
    switch (suggestion.type) {
      case "capacity":
        return {
          icon: TrendingUp,
          color: "text-green-600",
          bgColor: "bg-green-50",
          borderColor: "border-green-300",
          label: "Capacity Optimization",
        };
      case "pricing":
        return {
          icon: DollarSign,
          color: "text-blue-600",
          bgColor: "bg-blue-50",
          borderColor: "border-blue-300",
          label: "Dynamic Pricing",
        };
      case "promo":
        return {
          icon: Zap,
          color: "text-purple-600",
          bgColor: "bg-purple-50",
          borderColor: "border-purple-300",
          label: "Promotional Campaign",
        };
    }
  };

  const typeConfig = getTypeConfig();
  const TypeIcon = typeConfig.icon;

  // Mock data based on suggestion type
  const getDetailedMetrics = () => {
    if (suggestion.type === "capacity") {
      return {
        currentUtilization: 68,
        projectedUtilization: 89,
        potentialRevenue: 450,
        estimatedBookings: 12,
        confidenceScore: 87,
        historicalSuccess: 78,
      };
    } else if (suggestion.type === "pricing") {
      return {
        currentPrice: 49.99,
        suggestedPrice: 57.49,
        priceIncrease: 15,
        demandIndex: 92,
        competitorPrice: 59.99,
        confidenceScore: 84,
      };
    } else {
      return {
        discountAmount: 15,
        targetCustomers: 234,
        expectedConversion: 28,
        estimatedRevenue: 380,
        costOfPromotion: 95,
        netGain: 285,
      };
    }
  };

  const metrics = getDetailedMetrics();

  const historicalCampaigns = [
    {
      id: 1,
      date: "Nov 28, 2024",
      type: suggestion.type,
      result: "Success",
      revenue: 520,
      conversion: 32,
    },
    {
      id: 2,
      date: "Nov 15, 2024",
      type: suggestion.type,
      result: "Success",
      revenue: 445,
      conversion: 28,
    },
    {
      id: 3,
      date: "Oct 30, 2024",
      type: suggestion.type,
      result: "Moderate",
      revenue: 310,
      conversion: 22,
    },
  ];

  const handleApplyCampaign = () => {
    const config = {
      discount: discountValue[0],
      targetAudience,
      duration: campaignDuration,
      message: customMessage,
    };
    onApply(suggestion.id, config);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-3">
            <div
              className={cn(
                "size-10 rounded-lg flex items-center justify-center",
                typeConfig.bgColor
              )}
            >
              <TypeIcon size={20} className={typeConfig.color} />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <Sparkles size={16} className="text-purple-600" />
                <span>AI Campaign Suggestion</span>
              </div>
              <p className="text-sm text-neutral-600 font-normal">
                {typeConfig.label}
              </p>
            </div>
          </DialogTitle>
          <DialogDescription className="text-sm text-neutral-500">
            Review and apply the suggested AI campaign to optimize your station.
          </DialogDescription>
        </DialogHeader>

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="customize">Customize</TabsTrigger>
            <TabsTrigger value="history">History</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-4 mt-4">
            {/* Main Suggestion Card */}
            <Card className={cn("border-2", typeConfig.borderColor)}>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg flex items-center justify-between">
                  <span>{suggestion.title}</span>
                  <Badge
                    variant="outline"
                    className={cn(
                      "text-xs",
                      suggestion.priority === "high" &&
                        "bg-red-50 text-red-700 border-red-200",
                      suggestion.priority === "medium" &&
                        "bg-amber-50 text-amber-700 border-amber-200",
                      suggestion.priority === "low" &&
                        "bg-blue-50 text-blue-700 border-blue-200"
                    )}
                  >
                    {suggestion.priority.toUpperCase()} PRIORITY
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="text-sm text-neutral-600">
                  {suggestion.description}
                </p>
                <div className="flex items-center gap-2">
                  <Clock size={14} className="text-neutral-400" />
                  <span className="text-sm">
                    Suggested for {suggestion.slotTime}
                  </span>
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <span className="text-sm text-neutral-600">
                    Expected Impact
                  </span>
                  <span className="font-bold text-green-600">
                    {suggestion.impact}
                  </span>
                </div>
              </CardContent>
            </Card>

            {/* Key Metrics Grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {suggestion.type === "capacity" && (
                <>
                  <Card>
                    <CardContent className="p-4 space-y-2">
                      <div className="flex items-center justify-between">
                        <TrendingUp
                          size={16}
                          className="text-green-600"
                        />
                        <Badge variant="outline" className="text-xs">
                          +{metrics.projectedUtilization - metrics.currentUtilization}%
                        </Badge>
                      </div>
                      <p className="text-2xl font-bold">
                        {metrics.projectedUtilization}%
                      </p>
                      <p className="text-xs text-neutral-600">
                        Projected Utilization
                      </p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-4 space-y-2">
                      <div className="flex items-center justify-between">
                        <Users size={16} className="text-blue-600" />
                        <Badge variant="outline" className="text-xs">
                          EST
                        </Badge>
                      </div>
                      <p className="text-2xl font-bold">
                        +{metrics.estimatedBookings}
                      </p>
                      <p className="text-xs text-neutral-600">
                        New Bookings
                      </p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-4 space-y-2">
                      <div className="flex items-center justify-between">
                        <Target size={16} className="text-purple-600" />
                        <Badge
                          variant="outline"
                          className="text-xs bg-green-50 text-green-700"
                        >
                          HIGH
                        </Badge>
                      </div>
                      <p className="text-2xl font-bold">
                        {metrics.confidenceScore}%
                      </p>
                      <p className="text-xs text-neutral-600">
                        Confidence Score
                      </p>
                    </CardContent>
                  </Card>
                </>
              )}

              {suggestion.type === "pricing" && (
                <>
                  <Card>
                    <CardContent className="p-4 space-y-2">
                      <div className="flex items-center justify-between">
                        <DollarSign
                          size={16}
                          className="text-green-600"
                        />
                        <Badge
                          variant="outline"
                          className="text-xs bg-green-50 text-green-700"
                        >
                          +{metrics.priceIncrease}%
                        </Badge>
                      </div>
                      <p className="text-2xl font-bold">
                        {formatCurrency(metrics.suggestedPrice)}
                      </p>
                      <p className="text-xs text-neutral-600">
                        Suggested Price
                      </p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-4 space-y-2">
                      <div className="flex items-center justify-between">
                        <TrendingUp
                          size={16}
                          className="text-blue-600"
                        />
                        <Badge variant="outline" className="text-xs">
                          INDEX
                        </Badge>
                      </div>
                      <p className="text-2xl font-bold">
                        {metrics.demandIndex}
                      </p>
                      <p className="text-xs text-neutral-600">
                        Demand Index
                      </p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-4 space-y-2">
                      <div className="flex items-center justify-between">
                        <BarChart3
                          size={16}
                          className="text-purple-600"
                        />
                        <Badge
                          variant="outline"
                          className="text-xs bg-blue-50 text-blue-700"
                        >
                          VS
                        </Badge>
                      </div>
                      <p className="text-2xl font-bold">
                        {formatCurrency(metrics.competitorPrice)}
                      </p>
                      <p className="text-xs text-neutral-600">
                        Competitor Avg
                      </p>
                    </CardContent>
                  </Card>
                </>
              )}

              {suggestion.type === "promo" && (
                <>
                  <Card>
                    <CardContent className="p-4 space-y-2">
                      <div className="flex items-center justify-between">
                        <Users size={16} className="text-blue-600" />
                        <Badge variant="outline" className="text-xs">
                          TARGET
                        </Badge>
                      </div>
                      <p className="text-2xl font-bold">
                        {metrics.targetCustomers}
                      </p>
                      <p className="text-xs text-neutral-600">
                        Target Customers
                      </p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-4 space-y-2">
                      <div className="flex items-center justify-between">
                        <Target
                          size={16}
                          className="text-green-600"
                        />
                        <Badge
                          variant="outline"
                          className="text-xs bg-green-50 text-green-700"
                        >
                          CVR
                        </Badge>
                      </div>
                      <p className="text-2xl font-bold">
                        {metrics.expectedConversion}%
                      </p>
                      <p className="text-xs text-neutral-600">
                        Expected Conversion
                      </p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-4 space-y-2">
                      <div className="flex items-center justify-between">
                        <DollarSign
                          size={16}
                          className="text-purple-600"
                        />
                        <Badge
                          variant="outline"
                          className="text-xs bg-purple-50 text-purple-700"
                        >
                          NET
                        </Badge>
                      </div>
                      <p className="text-2xl font-bold">
                        {formatCurrency(metrics.netGain)}
                      </p>
                      <p className="text-xs text-neutral-600">
                        Net Gain
                      </p>
                    </CardContent>
                  </Card>
                </>
              )}
            </div>

            {/* AI Confidence Breakdown */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm flex items-center gap-2">
                  <Award size={14} />
                  AI Confidence Analysis
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span>Historical Performance</span>
                      <span className="font-semibold">
                        {suggestion.type === "capacity"
                          ? metrics.historicalSuccess
                          : 85}
                        %
                      </span>
                    </div>
                    <div className="h-2 bg-neutral-200 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{
                          width: `${
                            suggestion.type === "capacity"
                              ? metrics.historicalSuccess
                              : 85
                          }%`,
                        }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="h-full bg-green-500"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span>Market Conditions</span>
                      <span className="font-semibold">92%</span>
                    </div>
                    <div className="h-2 bg-neutral-200 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: "92%" }}
                        transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
                        className="h-full bg-blue-500"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span>Timing Optimization</span>
                      <span className="font-semibold">88%</span>
                    </div>
                    <div className="h-2 bg-neutral-200 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: "88%" }}
                        transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                        className="h-full bg-purple-500"
                      />
                    </div>
                  </div>
                </div>

                <Separator />

                <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                  <div className="flex items-center gap-2">
                    <CheckCircle size={16} className="text-green-600" />
                    <span className="text-sm font-semibold text-green-900">
                      Overall Confidence Score
                    </span>
                  </div>
                  <span className="text-xl font-bold text-green-600">
                    {suggestion.type === "capacity"
                      ? metrics.confidenceScore
                      : suggestion.type === "pricing"
                      ? metrics.confidenceScore
                      : 89}
                    %
                  </span>
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <div className="flex gap-3">
              <Button
                className="flex-1 gap-2"
                size="lg"
                onClick={handleApplyCampaign}
              >
                <CheckCircle size={16} />
                Apply Campaign Now
              </Button>
              <Button
                variant="outline"
                className="flex-1 gap-2"
                size="lg"
                onClick={() => setActiveTab("customize")}
              >
                <Zap size={16} />
                Customize First
              </Button>
            </div>
          </TabsContent>

          {/* Customize Tab */}
          <TabsContent value="customize" className="space-y-4 mt-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-sm">Campaign Settings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Discount Slider (for promo type) */}
                {suggestion.type === "promo" && (
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <Label>Discount Percentage</Label>
                      <Badge variant="outline" className="text-sm">
                        {discountValue[0]}%
                      </Badge>
                    </div>
                    <Slider
                      value={discountValue}
                      onValueChange={setDiscountValue}
                      min={5}
                      max={50}
                      step={5}
                      className="w-full"
                    />
                    <div className="flex justify-between text-xs text-neutral-500">
                      <span>5%</span>
                      <span>50%</span>
                    </div>
                  </div>
                )}

                {/* Target Audience */}
                <div className="space-y-2">
                  <Label>Target Audience</Label>
                  <Select value={targetAudience} onValueChange={setTargetAudience}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Customers</SelectItem>
                      <SelectItem value="new">New Customers Only</SelectItem>
                      <SelectItem value="returning">Returning Customers</SelectItem>
                      <SelectItem value="vip">VIP Members</SelectItem>
                      <SelectItem value="inactive">Inactive (30+ days)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Campaign Duration */}
                <div className="space-y-2">
                  <Label>Campaign Duration</Label>
                  <Select
                    value={campaignDuration}
                    onValueChange={setCampaignDuration}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">1 Day</SelectItem>
                      <SelectItem value="3">3 Days</SelectItem>
                      <SelectItem value="7">1 Week</SelectItem>
                      <SelectItem value="14">2 Weeks</SelectItem>
                      <SelectItem value="30">1 Month</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Custom Message */}
                <div className="space-y-2">
                  <Label>Custom Message (Optional)</Label>
                  <Textarea
                    placeholder="Add a personalized message for your customers..."
                    value={customMessage}
                    onChange={(e) => setCustomMessage(e.target.value)}
                    rows={4}
                  />
                  <p className="text-xs text-neutral-500">
                    This message will be included in notification emails and SMS
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Preview Impact */}
            <Card className="border-2 border-blue-200 bg-blue-50">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm flex items-center gap-2">
                  <BarChart3 size={14} />
                  Updated Impact Forecast
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <p className="text-xs text-neutral-600">
                      Estimated Revenue
                    </p>
                    <p className="text-xl font-bold text-blue-900">
                      {formatCurrency(
                        suggestion.type === "promo"
                          ? (metrics.estimatedRevenue || 380) *
                              (1 - discountValue[0] / 100)
                          : 450
                      )}
                    </p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-xs text-neutral-600">
                      Expected Conversion
                    </p>
                    <p className="text-xl font-bold text-blue-900">
                      {suggestion.type === "promo"
                        ? Math.round(
                            (metrics.expectedConversion || 28) *
                              (1 + discountValue[0] / 100)
                          )
                        : 32}
                      %
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Action Buttons */}
            <div className="flex gap-3">
              <Button
                className="flex-1 gap-2"
                size="lg"
                onClick={handleApplyCampaign}
              >
                <CheckCircle size={16} />
                Apply Custom Campaign
              </Button>
              <Button
                variant="outline"
                size="lg"
                onClick={() => setActiveTab("overview")}
              >
                Back
              </Button>
            </div>
          </TabsContent>

          {/* History Tab */}
          <TabsContent value="history" className="space-y-4 mt-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-sm">
                  Similar Campaign Performance
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {historicalCampaigns.map((campaign) => (
                    <div
                      key={campaign.id}
                      className="p-4 rounded-lg border hover:bg-neutral-50 transition-colors"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <Calendar size={14} className="text-neutral-400" />
                          <span className="text-sm font-medium">
                            {campaign.date}
                          </span>
                        </div>
                        <Badge
                          variant="outline"
                          className={cn(
                            "text-xs",
                            campaign.result === "Success" &&
                              "bg-green-50 text-green-700 border-green-200",
                            campaign.result === "Moderate" &&
                              "bg-amber-50 text-amber-700 border-amber-200"
                          )}
                        >
                          {campaign.result}
                        </Badge>
                      </div>
                      <div className="grid grid-cols-2 gap-4 mt-3">
                        <div>
                          <p className="text-xs text-neutral-600">Revenue</p>
                          <p className="font-semibold">
                            {formatCurrency(campaign.revenue)}
                          </p>
                        </div>
                        <div>
                          <p className="text-xs text-neutral-600">
                            Conversion
                          </p>
                          <p className="font-semibold">
                            {campaign.conversion}%
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Overall Stats */}
            <Card className="border-2 border-green-200 bg-green-50">
              <CardContent className="p-4">
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <p className="text-2xl font-bold text-green-900">
                      78%
                    </p>
                    <p className="text-xs text-green-700">
                      Avg Success Rate
                    </p>
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-green-900">
                      {formatCurrency(425)}
                    </p>
                    <p className="text-xs text-green-700">
                      Avg Revenue
                    </p>
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-green-900">
                      27%
                    </p>
                    <p className="text-xs text-green-700">
                      Avg Conversion
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Button
              className="w-full gap-2"
              size="lg"
              onClick={handleApplyCampaign}
            >
              <CheckCircle size={16} />
              Apply This Campaign
            </Button>
          </TabsContent>
        </Tabs>

        {/* Footer Actions */}
        <Separator />
        <div className="flex items-center justify-between">
          <Button
            variant="ghost"
            className="gap-2 text-red-600 hover:text-red-700 hover:bg-red-50"
            onClick={() => {
              onDismiss(suggestion.id);
              onClose();
            }}
          >
            <XCircle size={16} />
            Dismiss Suggestion
          </Button>
          <div className="flex gap-2">
            <Button
              variant="outline"
              className="gap-2"
              onClick={() => {
                alert("Scheduled for later!");
                onClose();
              }}
            >
              <Clock size={16} />
              Schedule Later
            </Button>
            <Button
              variant="outline"
              className="gap-2"
              onClick={() => {
                alert("Sent to team!");
                onClose();
              }}
            >
              <Send size={16} />
              Send to Team
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}