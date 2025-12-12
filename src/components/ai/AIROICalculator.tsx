"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Slider } from "../ui/slider";
import { 
  DollarSign, 
  TrendingUp, 
  Calculator,
  Sparkles,
  CheckCircle,
  ArrowRight
} from "lucide-react";
import { cn } from "../ui/utils";

interface ROIMetrics {
  totalInvestment: number;
  annualReturn: number;
  roiPercentage: number;
  paybackMonths: number;
  threeYearValue: number;
}

export function AIROICalculator() {
  const [monthlyRevenue, setMonthlyRevenue] = useState<number>(50000);
  const [monthlyCustomers, setMonthlyCustomers] = useState<number>(500);
  const [averageTicket, setAverageTicket] = useState<number>(65);
  const [churnRate, setChurnRate] = useState<number>([25]);

  const calculateROI = (): ROIMetrics => {
    // AI Investment Costs
    const aiSubscriptionYearly = 3600; // $300/month
    const implementationCost = 5000; // One-time
    const trainingCost = 2000; // One-time
    const totalInvestment = implementationCost + trainingCost + (aiSubscriptionYearly * 3);

    // Revenue Impact Calculations
    const dynamicPricingLift = monthlyRevenue * 0.18; // 18% revenue increase
    const churnReduction = (monthlyRevenue * (churnRate[0] / 100)) * 0.28; // 28% churn reduction
    const upsellIncrease = monthlyCustomers * 22; // $22 increase per customer from AI upsells
    const staffSavings = 2400; // $2,400/month labor optimization

    const monthlyGain = dynamicPricingLift + churnReduction + upsellIncrease + staffSavings;
    const annualReturn = monthlyGain * 12;
    const roiPercentage = ((annualReturn - aiSubscriptionYearly) / totalInvestment) * 100;
    const paybackMonths = totalInvestment / monthlyGain;
    const threeYearValue = (monthlyGain * 36) - totalInvestment;

    return {
      totalInvestment,
      annualReturn,
      roiPercentage,
      paybackMonths,
      threeYearValue
    };
  };

  const roi = calculateROI();

  const benefits = [
    {
      name: 'Dynamic Pricing',
      impact: '+18% revenue',
      value: Math.round(monthlyRevenue * 0.18),
      description: 'Real-time price optimization based on demand'
    },
    {
      name: 'Churn Reduction',
      impact: '-28% churn',
      value: Math.round((monthlyRevenue * (churnRate[0] / 100)) * 0.28),
      description: 'AI-powered customer retention campaigns'
    },
    {
      name: 'Upsell Engine',
      impact: '+$22 per customer',
      value: Math.round(monthlyCustomers * 22),
      description: 'Smart service recommendations at checkout'
    },
    {
      name: 'Staff Optimization',
      impact: '-15% labor costs',
      value: 2400,
      description: 'AI-driven scheduling and capacity planning'
    }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">AI ROI Calculator</h2>
        <p className="text-muted-foreground mt-1">
          Calculate the return on investment for AI implementation at your car wash
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Input Form */}
        <Card>
          <CardHeader>
            <CardTitle>Your Business Metrics</CardTitle>
            <CardDescription>Enter your current business data</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="revenue">Monthly Revenue</Label>
              <div className="relative">
                <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  id="revenue"
                  type="number"
                  value={monthlyRevenue}
                  onChange={(e) => setMonthlyRevenue(Number(e.target.value))}
                  className="pl-9"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="customers">Monthly Customers</Label>
              <Input
                id="customers"
                type="number"
                value={monthlyCustomers}
                onChange={(e) => setMonthlyCustomers(Number(e.target.value))}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="ticket">Average Ticket Size</Label>
              <div className="relative">
                <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  id="ticket"
                  type="number"
                  value={averageTicket}
                  onChange={(e) => setAverageTicket(Number(e.target.value))}
                  className="pl-9"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label>Current Churn Rate: {churnRate[0]}%</Label>
              <Slider
                value={churnRate}
                onValueChange={setChurnRate}
                min={0}
                max={50}
                step={1}
                className="mt-2"
              />
              <p className="text-xs text-muted-foreground">
                Percentage of customers who don't return annually
              </p>
            </div>
          </CardContent>
        </Card>

        {/* ROI Results */}
        <Card className="border-2 border-green-200 bg-green-50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-green-900">
              <Calculator className="w-5 h-5" />
              Projected AI ROI
            </CardTitle>
            <CardDescription className="text-green-700">
              Based on industry benchmarks and your inputs
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="bg-white rounded-lg p-4 border border-green-200">
              <p className="text-sm text-green-700 mb-1">3-Year ROI</p>
              <p className="text-4xl font-bold text-green-900">{Math.round(roi.roiPercentage)}%</p>
              <Badge className="bg-green-600 text-white mt-2">
                <TrendingUp className="w-3 h-3 mr-1" />
                Excellent Return
              </Badge>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="bg-white rounded-lg p-3 border border-green-200">
                <p className="text-xs text-green-700">Total Investment</p>
                <p className="text-xl font-bold text-green-900">
                  ${roi.totalInvestment.toLocaleString()}
                </p>
              </div>
              <div className="bg-white rounded-lg p-3 border border-green-200">
                <p className="text-xs text-green-700">Annual Return</p>
                <p className="text-xl font-bold text-green-900">
                  ${Math.round(roi.annualReturn).toLocaleString()}
                </p>
              </div>
              <div className="bg-white rounded-lg p-3 border border-green-200">
                <p className="text-xs text-green-700">Payback Period</p>
                <p className="text-xl font-bold text-green-900">
                  {roi.paybackMonths.toFixed(1)} months
                </p>
              </div>
              <div className="bg-white rounded-lg p-3 border border-green-200">
                <p className="text-xs text-green-700">3-Year Value</p>
                <p className="text-xl font-bold text-green-900">
                  ${Math.round(roi.threeYearValue).toLocaleString()}
                </p>
              </div>
            </div>

            <Button className="w-full bg-green-600 hover:bg-green-700">
              <Sparkles className="w-4 h-4 mr-2" />
              Enable AI Features
            </Button>
          </CardContent>
        </Card>

        {/* Benefits Breakdown */}
        <Card>
          <CardHeader>
            <CardTitle>Monthly Value</CardTitle>
            <CardDescription>AI revenue & cost impact</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {benefits.map((benefit, idx) => (
              <div key={idx} className="p-3 bg-gray-50 rounded-lg border">
                <div className="flex items-center justify-between gap-2 mb-1">
                  <div className="flex items-center gap-2 min-w-0">
                    <div className="p-1.5 bg-blue-100 rounded-lg flex-shrink-0">
                      <CheckCircle className="w-4 h-4 text-blue-600" />
                    </div>
                    <div className="min-w-0">
                      <h4 className="font-semibold text-sm">{benefit.name}</h4>
                      <p className="text-xs text-muted-foreground truncate">{benefit.description}</p>
                    </div>
                  </div>
                </div>
                <div className="flex items-center justify-between mt-2">
                  <Badge variant="secondary" className="text-xs">
                    {benefit.impact}
                  </Badge>
                  <p className="font-bold text-sm text-green-600">
                    +${benefit.value.toLocaleString()}/mo
                  </p>
                </div>
              </div>
            ))}

            <div className="bg-gradient-to-r from-blue-50 to-purple-50 border-2 border-blue-200 rounded-lg p-3 mt-3">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium text-blue-900">Monthly Gain</p>
                  <p className="text-2xl font-bold text-blue-900">
                    +${Math.round(roi.annualReturn / 12).toLocaleString()}
                  </p>
                </div>
                <p className="text-xs text-blue-700">${Math.round(roi.annualReturn).toLocaleString()}/year total</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}