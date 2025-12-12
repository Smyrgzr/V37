"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Switch } from "../ui/switch";
import { Label } from "../ui/label";
import { Slider } from "../ui/slider";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { 
  DollarSign, 
  TrendingUp, 
  TrendingDown, 
  Zap,
  Cloud,
  Clock,
  Users,
  Target,
  Settings,
  Play,
  Pause,
  BarChart3,
  AlertCircle
} from "lucide-react";
import { cn } from "../ui/utils";
import { Alert, AlertDescription } from "../ui/alert";

interface PricingRule {
  id: string;
  name: string;
  enabled: boolean;
  multiplier: number; // 0.7 = -30%, 1.4 = +40%
  conditions: string[];
}

interface ServicePricing {
  id: string;
  name: string;
  basePrice: number;
  currentPrice: number;
  aiSuggestedPrice: number;
  demand: 'low' | 'medium' | 'high' | 'peak';
  bookings24h: number;
  revenue24h: number;
  priceChange: number; // percentage
}

export function DynamicPricingAI() {
  const [aiEnabled, setAiEnabled] = useState(true);
  const [selectedTab, setSelectedTab] = useState('overview');
  const [maxPriceIncrease, setMaxPriceIncrease] = useState([40]);
  const [maxPriceDecrease, setMaxPriceDecrease] = useState([20]);

  // Mock pricing rules
  const [pricingRules, setPricingRules] = useState<PricingRule[]>([
    {
      id: 'peak',
      name: 'Peak Hour Pricing',
      enabled: true,
      multiplier: 1.25,
      conditions: ['Weekends 10 AM - 2 PM', 'High demand (>80% capacity)']
    },
    {
      id: 'weather',
      name: 'Weather-Based Pricing',
      enabled: true,
      multiplier: 1.15,
      conditions: ['After rain', 'Snow/salt conditions']
    },
    {
      id: 'offpeak',
      name: 'Off-Peak Discount',
      enabled: true,
      multiplier: 0.85,
      conditions: ['Weekdays 2 PM - 5 PM', 'Low demand (<30% capacity)']
    },
    {
      id: 'lastminute',
      name: 'Last-Minute Deals',
      enabled: true,
      multiplier: 0.70,
      conditions: ['Slots available <2 hours', 'Low booking rate']
    },
    {
      id: 'competitor',
      name: 'Competitor Matching',
      enabled: false,
      multiplier: 1.0,
      conditions: ['Match competitor pricing ±10%']
    }
  ]);

  // Mock service pricing data
  const servicePricing: ServicePricing[] = [
    {
      id: 's1',
      name: 'Basic Exterior Wash',
      basePrice: 25,
      currentPrice: 28,
      aiSuggestedPrice: 30,
      demand: 'high',
      bookings24h: 45,
      revenue24h: 1260,
      priceChange: 12
    },
    {
      id: 's2',
      name: 'Premium Detail Package',
      basePrice: 89,
      currentPrice: 89,
      aiSuggestedPrice: 99,
      demand: 'peak',
      bookings24h: 18,
      revenue24h: 1602,
      priceChange: 0
    },
    {
      id: 's3',
      name: 'Interior Cleaning',
      basePrice: 35,
      currentPrice: 30,
      aiSuggestedPrice: 30,
      demand: 'low',
      bookings24h: 12,
      revenue24h: 360,
      priceChange: -14
    },
    {
      id: 's4',
      name: 'Full Service Combo',
      basePrice: 65,
      currentPrice: 75,
      aiSuggestedPrice: 78,
      demand: 'high',
      bookings24h: 28,
      revenue24h: 2100,
      priceChange: 15
    }
  ];

  const stats = {
    revenueIncrease: '+18.4%',
    avgPriceChange: '+12%',
    demandOptimization: '94%',
    activeRules: pricingRules.filter(r => r.enabled).length
  };

  const toggleRule = (ruleId: string) => {
    setPricingRules(prev => prev.map(rule => 
      rule.id === ruleId ? { ...rule, enabled: !rule.enabled } : rule
    ));
  };

  const getDemandColor = (demand: string) => {
    switch (demand) {
      case 'peak': return 'text-purple-600 bg-purple-100';
      case 'high': return 'text-green-600 bg-green-100';
      case 'medium': return 'text-blue-600 bg-blue-100';
      case 'low': return 'text-orange-600 bg-orange-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getDemandIcon = (demand: string) => {
    switch (demand) {
      case 'peak': return Zap;
      case 'high': return TrendingUp;
      case 'medium': return BarChart3;
      case 'low': return TrendingDown;
      default: return BarChart3;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header with AI Toggle */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">AI Dynamic Pricing</h2>
          <p className="text-muted-foreground mt-1">
            Real-time price optimization based on demand, weather, and competition
          </p>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <Label htmlFor="ai-toggle">AI Pricing</Label>
            <Switch
              id="ai-toggle"
              checked={aiEnabled}
              onCheckedChange={setAiEnabled}
            />
          </div>
          <Button variant={aiEnabled ? "default" : "outline"}>
            {aiEnabled ? <Pause className="w-4 h-4 mr-2" /> : <Play className="w-4 h-4 mr-2" />}
            {aiEnabled ? 'Active' : 'Paused'}
          </Button>
        </div>
      </div>

      {/* AI Status Alert */}
      {aiEnabled && (
        <Alert className="border-green-200 bg-green-50">
          <Zap className="h-4 w-4 text-green-600" />
          <AlertDescription className="text-green-900">
            AI Dynamic Pricing is active. Prices are being optimized every 15 minutes based on real-time demand, weather conditions, and competitor analysis.
          </AlertDescription>
        </Alert>
      )}

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Revenue Increase</p>
                <p className="text-2xl font-bold text-green-600">{stats.revenueIncrease}</p>
                <p className="text-xs text-muted-foreground mt-1">vs last week</p>
              </div>
              <TrendingUp className="w-8 h-8 text-green-600 opacity-20" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Avg Price Change</p>
                <p className="text-2xl font-bold">{stats.avgPriceChange}</p>
                <p className="text-xs text-muted-foreground mt-1">across all services</p>
              </div>
              <DollarSign className="w-8 h-8 text-blue-600 opacity-20" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Demand Match</p>
                <p className="text-2xl font-bold text-purple-600">{stats.demandOptimization}</p>
                <p className="text-xs text-muted-foreground mt-1">optimization score</p>
              </div>
              <Target className="w-8 h-8 text-purple-600 opacity-20" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Active Rules</p>
                <p className="text-2xl font-bold">{stats.activeRules}/{pricingRules.length}</p>
                <p className="text-xs text-muted-foreground mt-1">pricing strategies</p>
              </div>
              <Settings className="w-8 h-8 text-gray-400 opacity-20" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Tabs */}
      <Tabs value={selectedTab} onValueChange={setSelectedTab}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="overview">Current Pricing</TabsTrigger>
          <TabsTrigger value="rules">Pricing Rules</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-4 mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Service Pricing Overview</CardTitle>
              <CardDescription>AI-optimized prices updated 5 minutes ago</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {servicePricing.map((service) => {
                  const DemandIcon = getDemandIcon(service.demand);
                  const priceImpact = service.aiSuggestedPrice - service.currentPrice;
                  
                  return (
                    <Card key={service.id} className="border-l-4 border-l-blue-600">
                      <CardContent className="pt-4 pb-4">
                        <div className="space-y-3">
                          {/* Header */}
                          <div className="space-y-2">
                            <h4 className="font-semibold text-sm truncate">{service.name}</h4>
                            <Badge className={cn("text-xs w-fit", getDemandColor(service.demand))}>
                              <DemandIcon className="w-3 h-3 mr-1" />
                              {service.demand}
                            </Badge>
                          </div>

                          {/* Pricing Grid */}
                          <div className="space-y-2 text-xs">
                            <div className="flex justify-between">
                              <span className="text-muted-foreground">Base Price</span>
                              <span className="font-medium">${service.basePrice}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-muted-foreground">Current</span>
                              <span className="font-medium">${service.currentPrice}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-muted-foreground">AI Suggested</span>
                              <span className="font-bold text-blue-600">${service.aiSuggestedPrice}</span>
                            </div>
                            <div className="flex justify-between pt-2 border-t">
                              <span className="text-muted-foreground">Bookings 24h</span>
                              <span className="font-medium">{service.bookings24h}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-muted-foreground">Revenue 24h</span>
                              <span className="font-medium">${service.revenue24h}</span>
                            </div>
                          </div>

                          {/* AI Recommendation */}
                          {priceImpact !== 0 && (
                            <div className="bg-blue-50 border border-blue-200 rounded-lg p-2.5">
                              <div className="flex items-start gap-2">
                                <Zap className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" />
                                <div className="flex-1 min-w-0">
                                  <p className="text-xs font-medium text-blue-900 mb-1">
                                    {priceImpact > 0 ? 'Increase' : 'Decrease'} by ${Math.abs(priceImpact)} 
                                    ({priceImpact > 0 ? '+' : ''}{((priceImpact / service.currentPrice) * 100).toFixed(1)}%)
                                  </p>
                                  <p className="text-xs text-blue-700 leading-relaxed">
                                    {priceImpact > 0 
                                      ? `Est. +$${Math.round(priceImpact * service.bookings24h * 0.85)}/day revenue`
                                      : `Boost bookings by ~25%`
                                    }
                                  </p>
                                </div>
                              </div>
                            </div>
                          )}

                          {/* Actions */}
                          <div className="pt-2 border-t">
                            {priceImpact !== 0 ? (
                              <div className="grid grid-cols-2 gap-1.5">
                                <Button size="sm" variant="default" className="h-8 text-xs">
                                  Apply
                                </Button>
                                <Button size="sm" variant="outline" className="h-8 text-xs">
                                  Edit
                                </Button>
                              </div>
                            ) : (
                              <Badge variant="secondary" className="text-xs w-full justify-center">
                                ✓ Optimized
                              </Badge>
                            )}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Rules Tab */}
        <TabsContent value="rules" className="space-y-4 mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Pricing Rules & Strategies</CardTitle>
              <CardDescription>Configure automated pricing adjustments</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                {pricingRules.map((rule) => (
                  <Card key={rule.id}>
                    <CardContent className="pt-4 pb-4">
                      <div className="space-y-3">
                        {/* Header with Switch */}
                        <div className="flex items-start justify-between gap-2">
                          <Switch
                            checked={rule.enabled}
                            onCheckedChange={() => toggleRule(rule.id)}
                          />
                          <Button variant="ghost" size="sm" className="h-7 w-7 p-0 flex-shrink-0">
                            <Settings className="w-3.5 h-3.5" />
                          </Button>
                        </div>

                        {/* Rule Name */}
                        <div>
                          <h4 className="font-semibold text-sm mb-1">{rule.name}</h4>
                          <p className="text-xs text-muted-foreground">
                            {rule.multiplier < 1 
                              ? `${((1 - rule.multiplier) * 100).toFixed(0)}% off` 
                              : `+${((rule.multiplier - 1) * 100).toFixed(0)}%`
                            }
                          </p>
                        </div>

                        {/* Conditions */}
                        <div className="space-y-1">
                          <p className="text-xs font-medium text-muted-foreground">Conditions:</p>
                          <div className="space-y-1">
                            {rule.conditions.map((condition, idx) => (
                              <div key={idx} className="flex items-start gap-1.5 text-xs">
                                <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-1 flex-shrink-0" />
                                <span className="leading-tight">{condition}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <Button variant="outline" className="w-full mt-4">
                + Add Custom Rule
              </Button>
            </CardContent>
          </Card>

          {/* External Factors */}
          <Card>
            <CardHeader>
              <CardTitle>Real-Time Factors</CardTitle>
              <CardDescription>Current conditions affecting pricing</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <Cloud className="w-5 h-5 text-blue-600" />
                  <div>
                    <p className="font-medium text-sm">Weather</p>
                    <p className="text-xs text-muted-foreground">Sunny, 72°F</p>
                  </div>
                </div>
                <Badge variant="outline">Normal pricing</Badge>
              </div>

              <div className="flex items-center justify-between p-3 bg-orange-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <Clock className="w-5 h-5 text-orange-600" />
                  <div>
                    <p className="font-medium text-sm">Time of Day</p>
                    <p className="text-xs text-muted-foreground">Peak hours (11:30 AM)</p>
                  </div>
                </div>
                <Badge className="bg-orange-600 text-white">+15% pricing</Badge>
              </div>

              <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <Users className="w-5 h-5 text-green-600" />
                  <div>
                    <p className="font-medium text-sm">Capacity</p>
                    <p className="text-xs text-muted-foreground">78% utilized</p>
                  </div>
                </div>
                <Badge className="bg-green-600 text-white">High demand</Badge>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Settings Tab */}
        <TabsContent value="settings" className="space-y-4 mt-4">
          <Card>
            <CardHeader>
              <CardTitle>AI Pricing Settings</CardTitle>
              <CardDescription>Configure pricing boundaries and behavior</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="max-increase">Maximum Price Increase</Label>
                  <div className="flex items-center gap-4 mt-2">
                    <Slider
                      id="max-increase"
                      min={0}
                      max={100}
                      step={5}
                      value={maxPriceIncrease}
                      onValueChange={setMaxPriceIncrease}
                      className="flex-1"
                    />
                    <Badge variant="outline" className="w-16 justify-center">
                      +{maxPriceIncrease[0]}%
                    </Badge>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">
                    AI cannot increase prices beyond this percentage
                  </p>
                </div>

                <div>
                  <Label htmlFor="max-decrease">Maximum Price Decrease</Label>
                  <div className="flex items-center gap-4 mt-2">
                    <Slider
                      id="max-decrease"
                      min={0}
                      max={50}
                      step={5}
                      value={maxPriceDecrease}
                      onValueChange={setMaxPriceDecrease}
                      className="flex-1"
                    />
                    <Badge variant="outline" className="w-16 justify-center">
                      -{maxPriceDecrease[0]}%
                    </Badge>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">
                    AI cannot decrease prices beyond this percentage
                  </p>
                </div>
              </div>

              <div className="space-y-3 pt-4 border-t">
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Auto-Apply AI Suggestions</Label>
                    <p className="text-xs text-muted-foreground">
                      Automatically apply AI price recommendations
                    </p>
                  </div>
                  <Switch />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label>Require Manual Approval</Label>
                    <p className="text-xs text-muted-foreground">
                      Large price changes need confirmation
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label>Competitor Price Tracking</Label>
                    <p className="text-xs text-muted-foreground">
                      Monitor competitor pricing changes
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>
              </div>

              <div className="flex gap-2 pt-4">
                <Button className="flex-1">Save Settings</Button>
                <Button variant="outline">Reset to Default</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}