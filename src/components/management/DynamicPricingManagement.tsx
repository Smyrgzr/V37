"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Switch } from "../ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Slider } from "../ui/slider";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";
import { Alert, AlertDescription } from "../ui/alert";
import { 
  TrendingUp, 
  TrendingDown,
  DollarSign,
  Clock,
  Cloud,
  Zap,
  Calendar,
  BarChart3,
  Settings,
  Target,
  Percent,
  Sun,
  CloudRain,
  Users,
  Activity,
  Plus,
  Edit2,
  Trash2,
  Copy,
  CheckCircle2,
  AlertCircle,
  Info,
  Play,
  Pause,
  RefreshCw
} from "lucide-react";
import { toast } from "sonner@2.0.3";

interface PricingRule {
  id: string;
  name: string;
  type: "time-based" | "demand-based" | "weather-based" | "seasonal" | "custom";
  enabled: boolean;
  priority: number;
  conditions: {
    type: string;
    operator: string;
    value: any;
  }[];
  modifier: {
    type: "percentage" | "fixed";
    value: number;
  };
  appliesTo: string[]; // service IDs
  schedule?: {
    startTime: string;
    endTime: string;
    days: string[];
  };
  createdAt: string;
  lastModified: string;
}

interface PriceHistory {
  serviceId: string;
  serviceName: string;
  timestamp: string;
  basePrice: number;
  finalPrice: number;
  appliedRules: string[];
  bookingRate: number;
}

interface DynamicPricingManagementProps {
  services: any[];
  branches: any[];
  onUpdatePricing?: () => void;
}

export function DynamicPricingManagement({
  services,
  branches,
  onUpdatePricing
}: DynamicPricingManagementProps) {
  const [selectedBranch, setSelectedBranch] = useState("all");
  const [selectedService, setSelectedService] = useState("all");
  const [showRuleDialog, setShowRuleDialog] = useState(false);
  const [editingRule, setEditingRule] = useState<PricingRule | null>(null);
  const [globalEnabled, setGlobalEnabled] = useState(true);

  // Mock pricing rules
  const [pricingRules, setPricingRules] = useState<PricingRule[]>([
    {
      id: "rule1",
      name: "Peak Hours Premium",
      type: "time-based",
      enabled: true,
      priority: 1,
      conditions: [
        { type: "time", operator: "between", value: ["17:00", "19:00"] },
        { type: "day", operator: "in", value: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"] }
      ],
      modifier: { type: "percentage", value: 25 },
      appliesTo: ["all"],
      schedule: {
        startTime: "17:00",
        endTime: "19:00",
        days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"]
      },
      createdAt: "2024-01-15",
      lastModified: "2024-03-01"
    },
    {
      id: "rule2",
      name: "Weekend Surge",
      type: "demand-based",
      enabled: true,
      priority: 2,
      conditions: [
        { type: "day", operator: "in", value: ["Saturday", "Sunday"] },
        { type: "occupancy", operator: ">", value: 70 }
      ],
      modifier: { type: "percentage", value: 30 },
      appliesTo: ["all"],
      createdAt: "2024-01-20",
      lastModified: "2024-02-15"
    },
    {
      id: "rule3",
      name: "Rainy Day Discount",
      type: "weather-based",
      enabled: true,
      priority: 3,
      conditions: [
        { type: "weather", operator: "equals", value: "rain" }
      ],
      modifier: { type: "percentage", value: -15 },
      appliesTo: ["exterior_wash", "basic_wash"],
      createdAt: "2024-02-01",
      lastModified: "2024-02-28"
    },
    {
      id: "rule4",
      name: "Early Morning Discount",
      type: "time-based",
      enabled: true,
      priority: 4,
      conditions: [
        { type: "time", operator: "between", value: ["06:00", "09:00"] }
      ],
      modifier: { type: "percentage", value: -20 },
      appliesTo: ["all"],
      schedule: {
        startTime: "06:00",
        endTime: "09:00",
        days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"]
      },
      createdAt: "2024-02-10",
      lastModified: "2024-03-05"
    },
    {
      id: "rule5",
      name: "High Demand Surge",
      type: "demand-based",
      enabled: true,
      priority: 5,
      conditions: [
        { type: "occupancy", operator: ">", value: 85 }
      ],
      modifier: { type: "percentage", value: 40 },
      appliesTo: ["all"],
      createdAt: "2024-01-25",
      lastModified: "2024-03-10"
    }
  ]);

  // Mock price history
  const priceHistory: PriceHistory[] = [
    {
      serviceId: "s1",
      serviceName: "Premium Wash",
      timestamp: "2024-03-11 18:00",
      basePrice: 50,
      finalPrice: 62.5,
      appliedRules: ["Peak Hours Premium"],
      bookingRate: 85
    },
    {
      serviceId: "s1",
      serviceName: "Premium Wash",
      timestamp: "2024-03-11 14:00",
      basePrice: 50,
      finalPrice: 50,
      appliedRules: [],
      bookingRate: 45
    },
    {
      serviceId: "s2",
      serviceName: "Exterior Wash",
      timestamp: "2024-03-11 10:00",
      basePrice: 25,
      finalPrice: 21.25,
      appliedRules: ["Rainy Day Discount"],
      bookingRate: 30
    }
  ];

  // Statistics
  const stats = {
    avgPriceIncrease: "+18%",
    revenueImpact: "+$12,450",
    activeRules: pricingRules.filter(r => r.enabled).length,
    totalRules: pricingRules.length,
    avgBookingRate: "72%",
    optimalPricing: "94%"
  };

  const handleToggleRule = (ruleId: string) => {
    setPricingRules(prev =>
      prev.map(rule =>
        rule.id === ruleId ? { ...rule, enabled: !rule.enabled } : rule
      )
    );
    toast.success("Pricing rule updated");
  };

  const handleDeleteRule = (ruleId: string) => {
    setPricingRules(prev => prev.filter(rule => rule.id !== ruleId));
    toast.success("Pricing rule deleted");
  };

  const handleDuplicateRule = (rule: PricingRule) => {
    const newRule = {
      ...rule,
      id: `rule${pricingRules.length + 1}`,
      name: `${rule.name} (Copy)`,
      createdAt: new Date().toISOString().split('T')[0],
      lastModified: new Date().toISOString().split('T')[0]
    };
    setPricingRules(prev => [...prev, newRule]);
    toast.success("Pricing rule duplicated");
  };

  const getRuleTypeIcon = (type: string) => {
    switch (type) {
      case "time-based":
        return <Clock className="h-4 w-4" />;
      case "demand-based":
        return <TrendingUp className="h-4 w-4" />;
      case "weather-based":
        return <Cloud className="h-4 w-4" />;
      case "seasonal":
        return <Calendar className="h-4 w-4" />;
      default:
        return <Settings className="h-4 w-4" />;
    }
  };

  const getRuleTypeBadge = (type: string) => {
    const colors = {
      "time-based": "bg-blue-500",
      "demand-based": "bg-orange-500",
      "weather-based": "bg-cyan-500",
      "seasonal": "bg-purple-500",
      "custom": "bg-gray-500"
    };
    return <Badge className={colors[type as keyof typeof colors]}>{type}</Badge>;
  };

  return (
    <div className="space-y-6">
      {/* Header with Global Toggle */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Dynamic Pricing</h2>
          <p className="text-muted-foreground">
            Automatically adjust prices based on demand, time, and conditions
          </p>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <Label htmlFor="global-toggle">Dynamic Pricing</Label>
            <Switch
              id="global-toggle"
              checked={globalEnabled}
              onCheckedChange={(checked) => {
                setGlobalEnabled(checked);
                toast.success(checked ? "Dynamic pricing enabled" : "Dynamic pricing disabled");
              }}
            />
          </div>
          <Button onClick={() => setShowRuleDialog(true)}>
            <Plus className="h-4 w-4 mr-2" />
            New Rule
          </Button>
        </div>
      </div>

      {/* Alert when disabled */}
      {!globalEnabled && (
        <Alert>
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            Dynamic pricing is currently disabled. All services will use their base prices.
          </AlertDescription>
        </Alert>
      )}

      {/* Stats Overview */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Rules</CardTitle>
            <Zap className="h-4 w-4 text-orange-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.activeRules}/{stats.totalRules}</div>
            <p className="text-xs text-muted-foreground mt-1">
              Currently active pricing rules
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Price Change</CardTitle>
            <TrendingUp className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{stats.avgPriceIncrease}</div>
            <p className="text-xs text-muted-foreground mt-1">
              Compared to base prices
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Revenue Impact</CardTitle>
            <DollarSign className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">{stats.revenueImpact}</div>
            <p className="text-xs text-muted-foreground mt-1">
              This month from dynamic pricing
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Booking Rate</CardTitle>
            <Activity className="h-4 w-4 text-purple-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.avgBookingRate}</div>
            <p className="text-xs text-muted-foreground mt-1">
              Average across all services
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <Tabs defaultValue="rules" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="rules">Pricing Rules</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="simulator">Price Simulator</TabsTrigger>
          <TabsTrigger value="history">History</TabsTrigger>
        </TabsList>

        {/* Pricing Rules Tab */}
        <TabsContent value="rules" className="space-y-4">
          {/* Filters */}
          <Card>
            <CardHeader>
              <CardTitle>Filter Rules</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-3">
                <div>
                  <Label>Rule Type</Label>
                  <Select defaultValue="all">
                    <SelectTrigger>
                      <SelectValue placeholder="All Types" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Types</SelectItem>
                      <SelectItem value="time-based">Time-based</SelectItem>
                      <SelectItem value="demand-based">Demand-based</SelectItem>
                      <SelectItem value="weather-based">Weather-based</SelectItem>
                      <SelectItem value="seasonal">Seasonal</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label>Status</Label>
                  <Select defaultValue="all">
                    <SelectTrigger>
                      <SelectValue placeholder="All Status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Status</SelectItem>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="inactive">Inactive</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label>Branch</Label>
                  <Select value={selectedBranch} onValueChange={setSelectedBranch}>
                    <SelectTrigger>
                      <SelectValue placeholder="All Branches" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Branches</SelectItem>
                      {branches.map(branch => (
                        <SelectItem key={branch.id} value={branch.id}>
                          {branch.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Rules List */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {pricingRules.map((rule) => (
              <Card key={rule.id} className={!rule.enabled ? "opacity-60" : ""}>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="space-y-1">
                      <CardTitle className="flex items-center gap-2">
                        {getRuleTypeIcon(rule.type)}
                        {rule.name}
                      </CardTitle>
                      <CardDescription>
                        Priority: {rule.priority} • {getRuleTypeBadge(rule.type)}
                      </CardDescription>
                    </div>
                    <Switch
                      checked={rule.enabled && globalEnabled}
                      onCheckedChange={() => handleToggleRule(rule.id)}
                      disabled={!globalEnabled}
                    />
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Rule Details */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Modifier:</span>
                      <Badge variant={rule.modifier.value > 0 ? "default" : "secondary"}>
                        {rule.modifier.value > 0 ? "+" : ""}
                        {rule.modifier.value}
                        {rule.modifier.type === "percentage" ? "%" : " USD"}
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Applies to:</span>
                      <span className="font-medium">
                        {rule.appliesTo.includes("all") ? "All Services" : `${rule.appliesTo.length} services`}
                      </span>
                    </div>
                    {rule.schedule && (
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Schedule:</span>
                        <span className="font-medium">
                          {rule.schedule.startTime} - {rule.schedule.endTime}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Conditions */}
                  <div className="space-y-2">
                    <p className="text-sm font-medium">Conditions:</p>
                    <div className="space-y-1">
                      {rule.conditions.map((condition, idx) => (
                        <div key={idx} className="text-sm text-muted-foreground bg-muted/50 rounded px-2 py-1">
                          {condition.type} {condition.operator} {Array.isArray(condition.value) ? condition.value.join(", ") : condition.value}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2 pt-2 border-t">
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex-1"
                      onClick={() => {
                        setEditingRule(rule);
                        setShowRuleDialog(true);
                      }}
                    >
                      <Edit2 className="h-4 w-4 mr-1" />
                      Edit
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDuplicateRule(rule)}
                    >
                      <Copy className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDeleteRule(rule.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Analytics Tab */}
        <TabsContent value="analytics" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            {/* Price Distribution */}
            <Card>
              <CardHeader>
                <CardTitle>Price Adjustment Distribution</CardTitle>
                <CardDescription>How often different price levels are applied</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {[
                  { label: "+40% (High Demand)", percentage: 12, color: "bg-red-500" },
                  { label: "+30% (Weekend)", percentage: 18, color: "bg-orange-500" },
                  { label: "+25% (Peak Hours)", percentage: 25, color: "bg-yellow-500" },
                  { label: "Base Price", percentage: 30, color: "bg-blue-500" },
                  { label: "-15% (Rain)", percentage: 8, color: "bg-cyan-500" },
                  { label: "-20% (Early Morning)", percentage: 7, color: "bg-green-500" }
                ].map((item, idx) => (
                  <div key={idx} className="space-y-1">
                    <div className="flex items-center justify-between text-sm">
                      <span>{item.label}</span>
                      <span className="font-medium">{item.percentage}%</span>
                    </div>
                    <div className="h-2 bg-muted rounded-full overflow-hidden">
                      <div
                        className={`h-full ${item.color}`}
                        style={{ width: `${item.percentage}%` }}
                      />
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Revenue Impact */}
            <Card>
              <CardHeader>
                <CardTitle>Revenue Impact by Rule</CardTitle>
                <CardDescription>Additional revenue generated by each rule</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {[
                  { name: "Peak Hours Premium", revenue: "$4,250", bookings: 145 },
                  { name: "Weekend Surge", revenue: "$3,850", bookings: 98 },
                  { name: "High Demand Surge", revenue: "$2,650", bookings: 67 },
                  { name: "Early Morning Discount", revenue: "-$890", bookings: 112 },
                  { name: "Rainy Day Discount", revenue: "-$410", bookings: 34 }
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                    <div className="flex-1">
                      <p className="font-medium text-sm">{item.name}</p>
                      <p className="text-xs text-muted-foreground">{item.bookings} bookings</p>
                    </div>
                    <div className={`text-lg font-bold ${item.revenue.startsWith("-") ? "text-red-600" : "text-green-600"}`}>
                      {item.revenue}
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Optimal Times */}
            <Card>
              <CardHeader>
                <CardTitle>Optimal Pricing Times</CardTitle>
                <CardDescription>Best times for price adjustments</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {[
                  { time: "17:00 - 19:00", day: "Weekdays", impact: "+25%", rate: "High" },
                  { time: "10:00 - 12:00", day: "Weekends", impact: "+30%", rate: "Very High" },
                  { time: "06:00 - 09:00", day: "All Days", impact: "-20%", rate: "Low" },
                  { time: "14:00 - 16:00", day: "Weekdays", impact: "Base", rate: "Medium" }
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <p className="font-medium text-sm">{item.time}</p>
                      <p className="text-xs text-muted-foreground">{item.day}</p>
                    </div>
                    <div className="text-right">
                      <Badge variant={item.impact.startsWith("+") ? "default" : item.impact.startsWith("-") ? "secondary" : "outline"}>
                        {item.impact}
                      </Badge>
                      <p className="text-xs text-muted-foreground mt-1">{item.rate} demand</p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Booking Conversion */}
            <Card>
              <CardHeader>
                <CardTitle>Booking Conversion Rate</CardTitle>
                <CardDescription>Impact of pricing on booking success</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>With Dynamic Pricing</span>
                    <span className="font-medium text-green-600">72%</span>
                  </div>
                  <div className="h-3 bg-muted rounded-full overflow-hidden">
                    <div className="h-full bg-green-500" style={{ width: "72%" }} />
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Without Dynamic Pricing</span>
                    <span className="font-medium text-gray-600">58%</span>
                  </div>
                  <div className="h-3 bg-muted rounded-full overflow-hidden">
                    <div className="h-full bg-gray-400" style={{ width: "58%" }} />
                  </div>
                </div>
                <div className="pt-4 border-t">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Improvement</span>
                    <div className="flex items-center gap-2">
                      <TrendingUp className="h-4 w-4 text-green-500" />
                      <span className="text-lg font-bold text-green-600">+14%</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Price Simulator Tab */}
        <TabsContent value="simulator" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Price Simulator</CardTitle>
              <CardDescription>
                Simulate how pricing rules would affect your services
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-6 md:grid-cols-2">
                <div className="space-y-4">
                  <div>
                    <Label>Service</Label>
                    <Select defaultValue="s1">
                      <SelectTrigger>
                        <SelectValue placeholder="Select service" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="s1">Premium Wash - $50</SelectItem>
                        <SelectItem value="s2">Exterior Wash - $25</SelectItem>
                        <SelectItem value="s3">Interior Detail - $75</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label>Date & Time</Label>
                    <Input type="datetime-local" defaultValue="2024-03-15T18:00" />
                  </div>

                  <div>
                    <Label>Occupancy Rate (%)</Label>
                    <Slider defaultValue={[75]} max={100} step={5} className="mt-2" />
                    <p className="text-sm text-muted-foreground mt-1">75%</p>
                  </div>

                  <div>
                    <Label>Weather Condition</Label>
                    <Select defaultValue="sunny">
                      <SelectTrigger>
                        <SelectValue placeholder="Select weather" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="sunny">
                          <div className="flex items-center gap-2">
                            <Sun className="h-4 w-4" />
                            Sunny
                          </div>
                        </SelectItem>
                        <SelectItem value="rain">
                          <div className="flex items-center gap-2">
                            <CloudRain className="h-4 w-4" />
                            Rainy
                          </div>
                        </SelectItem>
                        <SelectItem value="cloudy">
                          <div className="flex items-center gap-2">
                            <Cloud className="h-4 w-4" />
                            Cloudy
                          </div>
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <Button className="w-full">
                    <Play className="h-4 w-4 mr-2" />
                    Run Simulation
                  </Button>
                </div>

                <div className="space-y-4">
                  <div className="p-6 bg-gradient-to-br from-blue-50 to-purple-50 rounded-lg border-2 border-blue-200">
                    <h3 className="font-medium mb-4">Simulation Result</h3>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Base Price:</span>
                        <span className="font-medium">$50.00</span>
                      </div>
                      <div className="border-t pt-3 space-y-2">
                        <p className="text-sm font-medium">Applied Rules:</p>
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-muted-foreground">Peak Hours Premium</span>
                          <span className="text-green-600">+$12.50</span>
                        </div>
                      </div>
                      <div className="border-t pt-3">
                        <div className="flex justify-between items-center">
                          <span className="text-lg font-medium">Final Price:</span>
                          <span className="text-3xl font-bold text-blue-600">$62.50</span>
                        </div>
                        <p className="text-sm text-muted-foreground mt-1">
                          +25% from base price
                        </p>
                      </div>
                    </div>
                  </div>

                  <Alert>
                    <Info className="h-4 w-4" />
                    <AlertDescription>
                      Based on current conditions, this price has a projected booking rate of 78%.
                    </AlertDescription>
                  </Alert>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* History Tab */}
        <TabsContent value="history" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Price Adjustment History</CardTitle>
              <CardDescription>Track how prices changed over time</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {priceHistory.map((item, idx) => (
                  <div key={idx} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex-1">
                      <p className="font-medium">{item.serviceName}</p>
                      <div className="flex items-center gap-4 mt-1 text-sm text-muted-foreground">
                        <span>{item.timestamp}</span>
                        {item.appliedRules.length > 0 && (
                          <>
                            <span>•</span>
                            <span>{item.appliedRules.join(", ")}</span>
                          </>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center gap-6">
                      <div className="text-right">
                        <p className="text-sm text-muted-foreground">Base</p>
                        <p className="font-medium">${item.basePrice}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-muted-foreground">Final</p>
                        <p className="text-lg font-bold text-blue-600">${item.finalPrice}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-muted-foreground">Booking Rate</p>
                        <p className="font-medium">{item.bookingRate}%</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* New/Edit Rule Dialog */}
      <Dialog open={showRuleDialog} onOpenChange={setShowRuleDialog}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>{editingRule ? "Edit" : "Create"} Pricing Rule</DialogTitle>
            <DialogDescription>
              Configure automatic price adjustments based on conditions
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label>Rule Name</Label>
              <Input placeholder="e.g., Weekend Premium" />
            </div>

            <div>
              <Label>Rule Type</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="time-based">Time-based</SelectItem>
                  <SelectItem value="demand-based">Demand-based</SelectItem>
                  <SelectItem value="weather-based">Weather-based</SelectItem>
                  <SelectItem value="seasonal">Seasonal</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <Label>Modifier Type</Label>
                <Select defaultValue="percentage">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="percentage">Percentage</SelectItem>
                    <SelectItem value="fixed">Fixed Amount</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label>Modifier Value</Label>
                <Input type="number" placeholder="e.g., 25" />
              </div>
            </div>

            <div>
              <Label>Priority (1 = Highest)</Label>
              <Input type="number" defaultValue="1" min="1" />
            </div>

            <div className="flex justify-end gap-2 pt-4">
              <Button variant="outline" onClick={() => setShowRuleDialog(false)}>
                Cancel
              </Button>
              <Button onClick={() => {
                setShowRuleDialog(false);
                toast.success("Pricing rule saved");
              }}>
                {editingRule ? "Update" : "Create"} Rule
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}