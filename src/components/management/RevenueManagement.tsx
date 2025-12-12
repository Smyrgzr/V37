"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import {
  LineChart, Line, BarChart, Bar, AreaChart, Area,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell
} from "recharts";
import {
  DollarSign, TrendingUp, TrendingDown, Calendar, CreditCard, 
  Banknote, Target, Download, Filter, Search, MapPin, Clock, Users, Repeat, UserCheck, Building2
} from "lucide-react";
import { Input } from "../ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { AIInsights } from "./AIInsights";
import { BusinessModule, getModuleConfig, getModuleName } from "../../types/business-modules";
import { Car, Zap, Wrench, Truck, Users as UsersIcon } from "lucide-react";
import { useState } from "react";

// Module Icons Map
const MODULE_ICONS: Record<BusinessModule, React.ComponentType<any>> = {
  in_bay: Car,
  tunnel: Zap,
  self_service: Wrench,
  mobile: Truck,
  manual_detailing: UsersIcon,
};

interface RevenueManagementProps {
  revenueData?: any;
  userRole?: string;
  branches?: any[];
}

export function RevenueManagement({ revenueData, userRole, branches }: RevenueManagementProps) {
  const [selectedModule, setSelectedModule] = useState<BusinessModule | "all">("all");

  // Get all available modules from branches
  const availableModules: BusinessModule[] = branches 
    ? Array.from(new Set(branches.flatMap(b => b.businessModules || []))) as BusinessModule[]
    : [];

  // Filter function for module-based data
  const filterByModule = <T extends { module: BusinessModule }>(data: T[]): T[] => {
    if (selectedModule === "all") return data;
    return data.filter(item => item.module === selectedModule);
  };
  // Module-specific revenue data
  const moduleRevenueData = [
    { 
      module: "manual_detailing" as BusinessModule, 
      revenue: 18900, 
      bookings: 210, 
      avgPrice: 90, 
      share: 35,
      growth: 18.5,
      avgServiceTime: 45
    },
    { 
      module: "tunnel" as BusinessModule, 
      revenue: 15300, 
      bookings: 680, 
      avgPrice: 22, 
      share: 28,
      growth: 12.3,
      avgServiceTime: 8
    },
    { 
      module: "in_bay" as BusinessModule, 
      revenue: 12450, 
      bookings: 420, 
      avgPrice: 30, 
      share: 23,
      growth: 8.7,
      avgServiceTime: 15
    },
    { 
      module: "mobile" as BusinessModule, 
      revenue: 5680, 
      bookings: 89, 
      avgPrice: 64, 
      share: 10,
      growth: 22.4,
      avgServiceTime: 60
    },
    { 
      module: "self_service" as BusinessModule, 
      revenue: 2340, 
      bookings: 234, 
      avgPrice: 10, 
      share: 4,
      growth: -3.2,
      avgServiceTime: 12
    },
  ];

  const totalModuleRevenue = moduleRevenueData.reduce((sum, m) => sum + m.revenue, 0);

  // Monthly trend data by module
  const monthlyModuleTrend = [
    { 
      month: "Oct", 
      manual_detailing: 16200, 
      tunnel: 13800, 
      in_bay: 11200, 
      mobile: 4800, 
      self_service: 2400 
    },
    { 
      month: "Nov", 
      manual_detailing: 17500, 
      tunnel: 14500, 
      in_bay: 11800, 
      mobile: 5200, 
      self_service: 2350 
    },
    { 
      month: "Dec", 
      manual_detailing: 18900, 
      tunnel: 15300, 
      in_bay: 12450, 
      mobile: 5680, 
      self_service: 2340 
    },
  ];

  // Payment methods by module
  const modulePaymentMethods: Record<BusinessModule, Array<{ method: string; value: number }>> = {
    in_bay: [
      { method: "Card", value: 78 },
      { method: "App", value: 18 },
      { method: "Cash", value: 4 },
    ],
    tunnel: [
      { method: "Card", value: 82 },
      { method: "App", value: 15 },
      { method: "Cash", value: 3 },
    ],
    manual_detailing: [
      { method: "Card", value: 65 },
      { method: "Cash", value: 25 },
      { method: "App", value: 10 },
    ],
    mobile: [
      { method: "Card", value: 55 },
      { method: "App", value: 42 },
      { method: "Cash", value: 3 },
    ],
    self_service: [
      { method: "Coin/Token", value: 45 },
      { method: "Card", value: 40 },
      { method: "App", value: 15 },
    ],
  };

  const recentTransactions = [
    {
      id: "TRX001",
      customer: "John Smith",
      service: "Full Detailing",
      amount: 150,
      method: "Credit Card",
      time: "2 hours ago",
      branch: "Downtown",
      status: "completed"
    },
    {
      id: "TRX002",
      customer: "Maria Garcia",
      service: "Premium Complete Package",
      amount: 70,
      method: "Debit Card",
      time: "3 hours ago",
      branch: "Downtown",
      status: "completed"
    },
    {
      id: "TRX003",
      customer: "David Wilson",
      service: "Interior Cleaning",
      amount: 35,
      method: "Cash",
      time: "4 hours ago",
      branch: "Uptown",
      status: "completed"
    },
    {
      id: "TRX004",
      customer: "Sarah Johnson",
      service: "Wax & Polish",
      amount: 85,
      method: "Credit Card",
      time: "5 hours ago",
      branch: "Downtown",
      status: "completed"
    },
    {
      id: "TRX005",
      customer: "Michael Chen",
      service: "Express Wash",
      amount: 20,
      method: "Digital Wallet",
      time: "6 hours ago",
      branch: "Brooklyn",
      status: "completed"
    },
    {
      id: "TRX006",
      customer: "Emily Davis",
      service: "Premium Wash",
      amount: 45,
      method: "Credit Card",
      time: "7 hours ago",
      branch: "Uptown",
      status: "completed"
    },
  ];

  const topCustomersData = [
    { name: "Amanda Foster", visits: 24, spent: 3240, avgSpend: 135 },
    { name: "Michael Chen", visits: 18, spent: 2790, avgSpend: 155 },
    { name: "John Doe", visits: 15, spent: 2250, avgSpend: 150 },
    { name: "Sarah Johnson", visits: 14, spent: 1960, avgSpend: 140 },
    { name: "David Wilson", visits: 12, spent: 1680, avgSpend: 140 },
  ];

  // Mock revenue trend data
  const revenueTrendData = [
    { date: "Jan 1", revenue: 1580, transactions: 42, avgOrder: 37.6 },
    { date: "Jan 8", revenue: 1820, transactions: 48, avgOrder: 37.9 },
    { date: "Jan 15", revenue: 1680, transactions: 45, avgOrder: 37.3 },
    { date: "Jan 22", revenue: 2140, transactions: 56, avgOrder: 38.2 },
    { date: "Jan 29", revenue: 1930, transactions: 51, avgOrder: 37.8 },
    { date: "Feb 5", revenue: 2350, transactions: 61, avgOrder: 38.5 },
    { date: "Feb 12", revenue: 2070, transactions: 54, avgOrder: 38.3 },
    { date: "Feb 19", revenue: 2490, transactions: 65, avgOrder: 38.3 },
    { date: "Feb 26", revenue: 2240, transactions: 58, avgOrder: 38.6 },
    { date: "Mar 4", revenue: 2730, transactions: 70, avgOrder: 39.0 },
    { date: "Mar 11", revenue: 2870, transactions: 73, avgOrder: 39.3 },
    { date: "Mar 18", revenue: 2660, transactions: 67, avgOrder: 39.7 },
  ];

  const serviceRevenueData = [
    { name: "Full Detailing", revenue: 35100, bookings: 234, avgPrice: 150, share: 28 },
    { name: "Wax & Polish", revenue: 29325, bookings: 345, avgPrice: 85, share: 23 },
    { name: "Premium Wash", revenue: 20520, bookings: 456, avgPrice: 45, share: 16 },
    { name: "Interior Clean", revenue: 19845, bookings: 567, avgPrice: 35, share: 16 },
    { name: "Basic Wash", revenue: 19550, bookings: 782, avgPrice: 25, share: 15 },
    { name: "Express Wash", revenue: 17820, bookings: 891, avgPrice: 20, share: 14 },
  ];

  const paymentMethodData = [
    { method: "Credit Card", value: 65, color: "#155DFC" },
    { method: "Debit Card", value: 22, color: "#00A63E" },
    { method: "Cash", value: 10, color: "#F54900" },
    { method: "Digital Wallet", value: 3, color: "#9810FA" },
  ];

  const monthlyComparisonData = [
    { month: "Oct", thisYear: 24580, lastYear: 21340 },
    { month: "Nov", thisYear: 26340, lastYear: 22180 },
    { month: "Dec", thisYear: 31250, lastYear: 27650 },
    { month: "Jan", thisYear: 28430, lastYear: 24890 },
    { month: "Feb", thisYear: 32680, lastYear: 28120 },
    { month: "Mar", thisYear: 35940, lastYear: 30450 },
  ];

  const branchRevenueData = [
    { branch: "Downtown", revenue: 45680, transactions: 892, growth: 15.2, avgOrder: 51.2 },
    { branch: "Uptown", revenue: 34890, transactions: 734, growth: 12.8, avgOrder: 47.5 },
    { branch: "Brooklyn", revenue: 26340, transactions: 567, growth: 8.3, avgOrder: 46.5 },
  ];

  // Module-specific cost and profit data
  const moduleProfitData = [
    {
      module: "manual_detailing" as BusinessModule,
      revenue: 18900,
      costs: {
        labor: 9450,        // 50% - skilled detailers
        materials: 1890,    // 10% - premium products
        overhead: 1890,     // 10% - workspace, utilities
        total: 13230
      },
      profit: 5670,
      margin: 30.0
    },
    {
      module: "tunnel" as BusinessModule,
      revenue: 15300,
      costs: {
        labor: 3060,        // 20% - operators
        materials: 2295,    // 15% - water, chemicals
        overhead: 4590,     // 30% - equipment maintenance
        total: 9945
      },
      profit: 5355,
      margin: 35.0
    },
    {
      module: "in_bay" as BusinessModule,
      revenue: 12450,
      costs: {
        labor: 2490,        // 20% - attendants
        materials: 1868,    // 15% - supplies
        overhead: 3735,     // 30% - equipment
        total: 8093
      },
      profit: 4357,
      margin: 35.0
    },
    {
      module: "mobile" as BusinessModule,
      revenue: 5680,
      costs: {
        labor: 2272,        // 40% - mobile teams
        materials: 852,     // 15% - products
        overhead: 1704,     // 30% - fuel, vehicle maintenance
        total: 4828
      },
      profit: 852,
      margin: 15.0
    },
    {
      module: "self_service" as BusinessModule,
      revenue: 2340,
      costs: {
        labor: 234,         // 10% - minimal staff
        materials: 351,     // 15% - supplies
        overhead: 702,      // 30% - equipment
        total: 1287
      },
      profit: 1053,
      margin: 45.0
    },
  ];

  const totalProfit = moduleProfitData.reduce((sum, m) => sum + m.profit, 0);
  const totalCosts = moduleProfitData.reduce((sum, m) => sum + m.costs.total, 0);
  const overallMargin = ((totalProfit / totalModuleRevenue) * 100).toFixed(1);

  // Payment method colors
  const PAYMENT_COLORS: Record<string, string> = {
    "Card": "#155DFC",
    "App": "#00A63E",
    "Cash": "#F54900",
    "Coin/Token": "#9810FA",
  };

  // B2B Subscription Data (Car Wash Centers → Letwash Platform)
  const b2bSubscriptionData = {
    totalSubscribers: 24,
    activeSubscribers: 22,
    mrr: 4800, // Monthly Recurring Revenue from car wash centers
    arr: 57600, // Annual Recurring Revenue
    avgLtv: 14400, // Average Lifetime Value (24 months avg retention)
    churnRate: 8.3, // Monthly churn percentage
    tiers: [
      { 
        name: "Starter", 
        price: 150, 
        subscribers: 8, 
        mrr: 1200,
        features: "Single branch, 1 business module"
      },
      { 
        name: "Professional", 
        price: 250, 
        subscribers: 10, 
        mrr: 2500,
        features: "Up to 3 branches, 3 business modules"
      },
      { 
        name: "Enterprise", 
        price: 450, 
        subscribers: 4, 
        mrr: 1800,
        features: "Unlimited branches, all modules"
      },
    ],
    mrrGrowth: [
      { month: "Oct", mrr: 4200, new: 600, churned: 0 },
      { month: "Nov", mrr: 4500, new: 450, churned: 150 },
      { month: "Dec", mrr: 4800, new: 750, churned: 450 },
    ]
  };

  // B2C Subscription Data (Customers → Car Wash Centers)
  const b2cSubscriptionData = {
    totalSubscribers: 186,
    activeSubscribers: 178,
    mrr: 8340, // Monthly Recurring Revenue from customer subscriptions
    arr: 100080, // Annual Recurring Revenue
    avgLtv: 1350, // Average Lifetime Value (18 months avg retention)
    churnRate: 4.3, // Monthly churn percentage
    plans: [
      {
        name: "Basic Unlimited",
        price: 35,
        subscribers: 89,
        mrr: 3115,
        modules: ["tunnel", "in_bay"],
        washesPerMonth: 8
      },
      {
        name: "Premium Unlimited",
        price: 55,
        subscribers: 64,
        mrr: 3520,
        modules: ["tunnel", "in_bay", "self_service"],
        washesPerMonth: 12
      },
      {
        name: "VIP Detailing",
        price: 120,
        subscribers: 25,
        mrr: 3000,
        modules: ["manual_detailing", "tunnel", "in_bay"],
        washesPerMonth: 4
      },
    ],
    mrrGrowth: [
      { month: "Oct", mrr: 7200, new: 1240, churned: 280 },
      { month: "Nov", mrr: 7680, new: 715, churned: 235 },
      { month: "Dec", mrr: 8340, new: 880, churned: 220 },
    ]
  };

  // Combined subscription metrics
  const totalMRR = b2bSubscriptionData.mrr + b2cSubscriptionData.mrr;
  const totalARR = b2bSubscriptionData.arr + b2cSubscriptionData.arr;
  const subscriptionRevenueShare = (totalMRR / totalModuleRevenue * 100).toFixed(1);

  // Revenue breakdown: Subscription vs Pay-per-service
  const revenueBreakdown = {
    subscription: totalMRR,
    payPerService: totalModuleRevenue - totalMRR,
    subscriptionPercentage: ((totalMRR / totalModuleRevenue) * 100).toFixed(1),
    payPerServicePercentage: (((totalModuleRevenue - totalMRR) / totalModuleRevenue) * 100).toFixed(1),
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl">Revenue Management</h1>
        <p className="text-muted-foreground">Financial tracking and revenue analytics</p>
      </div>

      {/* AI Insights */}
      <AIInsights
        insights={[
          {
            id: "revenue-forecast",
            type: "prediction",
            title: "Revenue Growth Forecast",
            description: "Based on current trends, projected to reach $42,500 next month (+18% growth). Weekend bookings showing strongest momentum.",
            impact: "high",
            confidence: 0.89,
            trend: "up",
            metric: "Next month forecast",
            value: "$42,500"
          },
          {
            id: "pricing-opportunity",
            type: "opportunity",
            title: "Premium Service Pricing",
            description: "'Full Detailing' has 95% booking rate even at peak prices. Consider 10% price increase to maximize revenue without impacting demand.",
            impact: "high",
            confidence: 0.87,
            metric: "Revenue increase potential",
            value: "+$3,510/month",
            action: {
              label: "Adjust Pricing",
              onClick: () => {}
            }
          },
          {
            id: "payment-insight",
            type: "recommendation",
            title: "Digital Wallet Incentive",
            description: "Digital wallet payments have 35% lower processing fees. Offering 5% cashback could save $840/month in fees while boosting adoption.",
            impact: "medium",
            confidence: 0.82,
            metric: "Cost savings",
            value: "$840/month",
            action: {
              label: "Create Incentive",
              onClick: () => {}
            }
          },
          {
            id: "seasonal-pattern",
            type: "alert",
            title: "Seasonal Revenue Dip Ahead",
            description: "Historical data shows 22% revenue decline in summer months. Start promoting AC cleaning and interior services now to offset.",
            impact: "high",
            trend: "down",
            metric: "Projected decline",
            value: "-22%"
          },
          {
            id: "subscription-growth",
            type: "prediction",
            title: "Strong Subscription Momentum",
            description: `MRR growing at +14.3% monthly. At current rate, subscription revenue will represent ${(parseFloat(subscriptionRevenueShare) + 8).toFixed(0)}% of total revenue by Q2 2025, creating more predictable cash flow.`,
            impact: "high",
            confidence: 0.91,
            trend: "up",
            metric: "MRR Growth",
            value: "+14.3%"
          },
          {
            id: "b2c-churn",
            type: "recommendation",
            title: "Excellent B2C Retention",
            description: `B2C churn at ${b2cSubscriptionData.churnRate}% is well below industry average (5-7%). Current LTV of $${b2cSubscriptionData.avgLtv} indicates strong value proposition. Consider loyalty rewards to maintain this momentum.`,
            impact: "medium",
            confidence: 0.85,
            metric: "B2C Churn Rate",
            value: `${b2cSubscriptionData.churnRate}%`,
            action: {
              label: "View Loyalty Options",
              onClick: () => {}
            }
          },
          {
            id: "b2b-churn-alert",
            type: "alert",
            title: "B2B Churn Requires Attention",
            description: `Platform subscription churn at ${b2bSubscriptionData.churnRate}% is elevated. ${b2bSubscriptionData.totalSubscribers - b2bSubscriptionData.activeSubscribers} centers cancelled this month. Schedule retention interviews to identify pain points.`,
            impact: "high",
            metric: "B2B Churn Rate",
            value: `${b2bSubscriptionData.churnRate}%`,
            action: {
              label: "Contact At-Risk Centers",
              onClick: () => {}
            }
          }
        ]}
        title="Revenue Intelligence"
        dismissible={true}
      />

      {/* Module Filter */}
      {availableModules.length > 0 && (
        <Card className="bg-blue-50 border-blue-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <DollarSign className="h-4 w-4 text-blue-600" />
                <span className="text-sm font-medium text-blue-900">Filter by Business Module</span>
              </div>
              <Select value={selectedModule} onValueChange={(value) => setSelectedModule(value as BusinessModule | "all")}>
                <SelectTrigger className="w-[220px] bg-white">
                  <SelectValue placeholder="Select module" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Modules</SelectItem>
                  {availableModules.map((moduleId) => {
                    const Icon = MODULE_ICONS[moduleId];
                    return (
                      <SelectItem key={moduleId} value={moduleId}>
                        <div className="flex items-center gap-2">
                          <Icon className="h-4 w-4" />
                          <span>{getModuleName(moduleId)}</span>
                        </div>
                      </SelectItem>
                    );
                  })}
                </SelectContent>
              </Select>
            </div>
            {selectedModule !== "all" && (
              <div className="mt-3 pt-3 border-t border-blue-300">
                <p className="text-xs text-blue-800">
                  Showing revenue data for <strong>{getModuleName(selectedModule)}</strong> module only
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      )}

      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="bg-[#ececf0] p-1 h-9">
          <TabsTrigger value="overview" className="data-[state=active]:bg-white">Overview</TabsTrigger>
          <TabsTrigger value="profitability" className="data-[state=active]:bg-white">Profitability</TabsTrigger>
          <TabsTrigger value="payments" className="data-[state=active]:bg-white">Payment Analysis</TabsTrigger>
          <TabsTrigger value="subscriptions" className="data-[state=active]:bg-white">Subscriptions</TabsTrigger>
          <TabsTrigger value="transactions" className="data-[state=active]:bg-white">Transactions</TabsTrigger>
          <TabsTrigger value="services" className="data-[state=active]:bg-white">By Service</TabsTrigger>
          <TabsTrigger value="reports" className="data-[state=active]:bg-white">Reports</TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-6 mt-6">
          {/* Key Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-sm text-muted-foreground">Today's Revenue</p>
                  <DollarSign className="h-4 w-4 text-muted-foreground" />
                </div>
                <p className="text-2xl font-semibold">$2,870</p>
                <div className="flex items-center gap-1 mt-1">
                  <TrendingUp className="h-3 w-3 text-[#00a63e]" />
                  <p className="text-xs text-[#00a63e]">+8.2% from yesterday</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-sm text-muted-foreground">This Month</p>
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                </div>
                <p className="text-2xl font-semibold">$35,940</p>
                <div className="flex items-center gap-1 mt-1">
                  <TrendingUp className="h-3 w-3 text-[#00a63e]" />
                  <p className="text-xs text-[#00a63e]">+18% from last month</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-sm text-muted-foreground">Average Order</p>
                  <CreditCard className="h-4 w-4 text-muted-foreground" />
                </div>
                <p className="text-2xl font-semibold">$39.70</p>
                <div className="flex items-center gap-1 mt-1">
                  <TrendingUp className="h-3 w-3 text-[#00a63e]" />
                  <p className="text-xs text-[#00a63e]">+5.4% from last month</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-sm text-muted-foreground">Monthly Target</p>
                  <Target className="h-4 w-4 text-muted-foreground" />
                </div>
                <p className="text-2xl font-semibold">89.8%</p>
                <p className="text-xs text-muted-foreground mt-1">$4,060 to goal</p>
              </CardContent>
            </Card>
          </div>

          {/* Charts Row */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Revenue Trend</CardTitle>
                <CardDescription>Daily revenue and average order value</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <AreaChart data={revenueTrendData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
                    <XAxis dataKey="date" stroke="#666" style={{ fontSize: '12px' }} />
                    <YAxis yAxisId="left" stroke="#155DFC" style={{ fontSize: '12px' }} />
                    <YAxis yAxisId="right" orientation="right" stroke="#00A63E" style={{ fontSize: '12px' }} />
                    <Tooltip />
                    <Legend />
                    <Area yAxisId="left" type="monotone" dataKey="revenue" stroke="#155DFC" fill="#155DFC" fillOpacity={0.2} name="Revenue ($)" />
                    <Line yAxisId="right" type="monotone" dataKey="avgOrder" stroke="#00A63E" strokeWidth={2} name="Avg Order ($)" />
                  </AreaChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Revenue by Business Module</CardTitle>
                <CardDescription>Monthly revenue breakdown</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={monthlyModuleTrend}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
                    <XAxis dataKey="month" stroke="#666" style={{ fontSize: '12px' }} />
                    <YAxis stroke="#666" style={{ fontSize: '12px' }} />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="manual_detailing" stackId="a" fill={getModuleConfig("manual_detailing").bgColor.replace('bg-', '#')} name="Manual Detailing" />
                    <Bar dataKey="tunnel" stackId="a" fill={getModuleConfig("tunnel").bgColor.replace('bg-', '#')} name="Tunnel Wash" />
                    <Bar dataKey="in_bay" stackId="a" fill={getModuleConfig("in_bay").bgColor.replace('bg-', '#')} name="In-Bay" />
                    <Bar dataKey="mobile" stackId="a" fill={getModuleConfig("mobile").bgColor.replace('bg-', '#')} name="Mobile" />
                    <Bar dataKey="self_service" stackId="a" fill={getModuleConfig("self_service").bgColor.replace('bg-', '#')} name="Self-Service" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          {/* Module Revenue Breakdown */}
          <Card>
            <CardHeader>
              <CardTitle>Business Module Performance</CardTitle>
              <CardDescription>
                Revenue contribution by business module (December 2024)
                {selectedModule !== "all" && ` - ${getModuleName(selectedModule)}`}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4 mb-6">
                {filterByModule(moduleRevenueData).map((module) => {
                  const config = getModuleConfig(module.module);
                  const ModuleIcon = MODULE_ICONS[module.module];
                  const percentage = (module.revenue / totalModuleRevenue * 100).toFixed(1);
                  
                  return (
                    <div key={module.module} className="border border-border rounded-lg p-4">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <div className={`w-10 h-10 rounded-lg ${config.bgColor} flex items-center justify-center`}>
                            <ModuleIcon className={config.iconColor} size={20} />
                          </div>
                          <div>
                            <h4 className="font-semibold">{config.name}</h4>
                            <p className="text-xs text-muted-foreground">{module.bookings} bookings</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-xl font-semibold">${module.revenue.toLocaleString()}</p>
                          <div className="flex items-center gap-1 justify-end">
                            {module.growth >= 0 ? (
                              <TrendingUp className="h-3 w-3 text-[#00a63e]" />
                            ) : (
                              <TrendingDown className="h-3 w-3 text-red-600" />
                            )}
                            <p className={`text-xs ${module.growth >= 0 ? 'text-[#00a63e]' : 'text-red-600'}`}>
                              {module.growth >= 0 ? '+' : ''}{module.growth}%
                            </p>
                          </div>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-4 gap-3 mb-3">
                        <div>
                          <p className="text-xs text-muted-foreground">Share</p>
                          <p className="font-semibold">{percentage}%</p>
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground">Avg Price</p>
                          <p className="font-semibold">${module.avgPrice}</p>
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground">Service Time</p>
                          <p className="font-semibold">{module.avgServiceTime}min</p>
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground">Rev/Hour</p>
                          <p className="font-semibold">${Math.round((module.revenue / module.bookings) / (module.avgServiceTime / 60))}</p>
                        </div>
                      </div>
                      
                      <div className="w-full bg-gray-200 h-2 rounded-full overflow-hidden">
                        <div 
                          className={`h-2 ${config.bgColor.replace('100', '600')} transition-all`}
                          style={{ width: `${percentage}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t border-border">
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <p className="text-sm text-muted-foreground mb-1">Total Module Revenue</p>
                  <p className="text-2xl font-semibold">${totalModuleRevenue.toLocaleString()}</p>
                </div>
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <p className="text-sm text-muted-foreground mb-1">Highest Performer</p>
                  <p className="text-2xl font-semibold">{getModuleName(moduleRevenueData[0].module)}</p>
                </div>
                <div className="text-center p-4 bg-purple-50 rounded-lg">
                  <p className="text-sm text-muted-foreground mb-1">Fastest Growth</p>
                  <p className="text-2xl font-semibold">
                    {getModuleName(moduleRevenueData.reduce((max, m) => m.growth > max.growth ? m : max).module)}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Payment Methods & Branch Performance */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Payment Methods</CardTitle>
                <CardDescription>Distribution of payment types</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={paymentMethodData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={(entry) => `${entry.method} ${entry.value}%`}
                      outerRadius={100}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {paymentMethodData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {userRole !== "carwash_admin" && (
              <Card>
                <CardHeader>
                  <CardTitle>Branch Performance</CardTitle>
                  <CardDescription>Revenue by location</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {branchRevenueData.map((branch, index) => (
                      <div key={index} className="border border-border rounded-lg p-4">
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center gap-2">
                            <MapPin className="h-4 w-4 text-muted-foreground" />
                            <span className="font-medium">{branch.branch}</span>
                          </div>
                          <Badge className={`${branch.growth >= 12 ? 'bg-[#00a63e]' : 'bg-[#fbbf24]'} text-white border-0`}>
                            +{branch.growth}%
                          </Badge>
                        </div>
                        <div className="grid grid-cols-3 gap-2 text-sm">
                          <div>
                            <p className="text-muted-foreground text-xs">Revenue</p>
                            <p className="font-semibold">${branch.revenue.toLocaleString()}</p>
                          </div>
                          <div>
                            <p className="text-muted-foreground text-xs">Orders</p>
                            <p className="font-semibold">{branch.transactions}</p>
                          </div>
                          <div>
                            <p className="text-muted-foreground text-xs">Avg Order</p>
                            <p className="font-semibold">${branch.avgOrder}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Top Customers */}
          <Card>
            <CardHeader>
              <CardTitle>Top Customers by Revenue</CardTitle>
              <CardDescription>Highest spending customers this month</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Customer</TableHead>
                    <TableHead className="text-right">Visits</TableHead>
                    <TableHead className="text-right">Total Spent</TableHead>
                    <TableHead className="text-right">Avg Spend</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {topCustomersData.map((customer, index) => (
                    <TableRow key={index}>
                      <TableCell className="font-medium">{customer.name}</TableCell>
                      <TableCell className="text-right">{customer.visits}</TableCell>
                      <TableCell className="text-right">${customer.spent.toLocaleString()}</TableCell>
                      <TableCell className="text-right">${customer.avgSpend}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Profitability Tab - GAP-015: Calculate profit margins per module */}
        <TabsContent value="profitability" className="space-y-6 mt-6">
          {/* Profit Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-sm text-muted-foreground">Total Revenue</p>
                  <DollarSign className="h-4 w-4 text-blue-600" />
                </div>
                <p className="text-2xl font-semibold">${totalModuleRevenue.toLocaleString()}</p>
                <p className="text-xs text-muted-foreground mt-1">Across all modules</p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-sm text-muted-foreground">Total Costs</p>
                  <TrendingDown className="h-4 w-4 text-orange-600" />
                </div>
                <p className="text-2xl font-semibold">${totalCosts.toLocaleString()}</p>
                <p className="text-xs text-muted-foreground mt-1">Operating expenses</p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-sm text-muted-foreground">Net Profit</p>
                  <TrendingUp className="h-4 w-4 text-green-600" />
                </div>
                <p className="text-2xl font-semibold">${totalProfit.toLocaleString()}</p>
                <p className="text-xs text-green-600 mt-1">+{overallMargin}% margin</p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-sm text-muted-foreground">Best Margin</p>
                  <Target className="h-4 w-4 text-purple-600" />
                </div>
                <p className="text-2xl font-semibold">
                  {getModuleName(moduleProfitData.reduce((max, m) => m.margin > max.margin ? m : max).module)}
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  {moduleProfitData.reduce((max, m) => m.margin > max.margin ? m : max).margin}% profit margin
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Module Profitability Breakdown */}
          <Card>
            <CardHeader>
              <CardTitle>Profit Margins by Business Module</CardTitle>
              <CardDescription>Revenue, costs, and profit breakdown for each module</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {moduleProfitData.map((module) => {
                  const config = getModuleConfig(module.module);
                  const ModuleIcon = MODULE_ICONS[module.module];
                  
                  return (
                    <div key={module.module} className="border border-border rounded-lg p-5">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-3">
                          <div className={`w-12 h-12 rounded-lg ${config.bgColor} flex items-center justify-center`}>
                            <ModuleIcon className={config.iconColor} size={24} />
                          </div>
                          <div>
                            <h4 className="font-semibold text-lg">{config.name}</h4>
                            <p className="text-sm text-muted-foreground">December 2024</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full ${
                            module.margin >= 40 ? 'bg-green-100 text-green-700' :
                            module.margin >= 30 ? 'bg-blue-100 text-blue-700' :
                            module.margin >= 20 ? 'bg-yellow-100 text-yellow-700' :
                            'bg-red-100 text-red-700'
                          }`}>
                            <Target className="h-4 w-4" />
                            <span className="font-semibold">{module.margin}%</span>
                          </div>
                          <p className="text-xs text-muted-foreground mt-1">Profit Margin</p>
                        </div>
                      </div>

                      <div className="grid grid-cols-5 gap-4 mb-4">
                        <div className="text-center p-3 bg-blue-50 rounded-lg">
                          <p className="text-xs text-muted-foreground mb-1">Revenue</p>
                          <p className="font-semibold text-blue-700">${module.revenue.toLocaleString()}</p>
                        </div>
                        <div className="text-center p-3 bg-orange-50 rounded-lg">
                          <p className="text-xs text-muted-foreground mb-1">Labor</p>
                          <p className="font-semibold text-orange-700">${module.costs.labor.toLocaleString()}</p>
                        </div>
                        <div className="text-center p-3 bg-purple-50 rounded-lg">
                          <p className="text-xs text-muted-foreground mb-1">Materials</p>
                          <p className="font-semibold text-purple-700">${module.costs.materials.toLocaleString()}</p>
                        </div>
                        <div className="text-center p-3 bg-gray-50 rounded-lg">
                          <p className="text-xs text-muted-foreground mb-1">Overhead</p>
                          <p className="font-semibold text-gray-700">${module.costs.overhead.toLocaleString()}</p>
                        </div>
                        <div className="text-center p-3 bg-green-50 rounded-lg">
                          <p className="text-xs text-muted-foreground mb-1">Profit</p>
                          <p className="font-semibold text-green-700">${module.profit.toLocaleString()}</p>
                        </div>
                      </div>

                      {/* Profit visualization */}
                      <div className="space-y-2">
                        <div className="flex justify-between text-xs text-muted-foreground">
                          <span>Cost Breakdown</span>
                          <span>${module.costs.total.toLocaleString()} total costs</span>
                        </div>
                        <div className="flex h-8 rounded-lg overflow-hidden">
                          <div 
                            className="bg-orange-500 flex items-center justify-center text-white text-xs font-medium"
                            style={{ width: `${(module.costs.labor / module.revenue * 100).toFixed(0)}%` }}
                          >
                            {(module.costs.labor / module.revenue * 100).toFixed(0)}%
                          </div>
                          <div 
                            className="bg-purple-500 flex items-center justify-center text-white text-xs font-medium"
                            style={{ width: `${(module.costs.materials / module.revenue * 100).toFixed(0)}%` }}
                          >
                            {(module.costs.materials / module.revenue * 100).toFixed(0)}%
                          </div>
                          <div 
                            className="bg-gray-500 flex items-center justify-center text-white text-xs font-medium"
                            style={{ width: `${(module.costs.overhead / module.revenue * 100).toFixed(0)}%` }}
                          >
                            {(module.costs.overhead / module.revenue * 100).toFixed(0)}%
                          </div>
                          <div 
                            className="bg-green-500 flex items-center justify-center text-white text-xs font-medium"
                            style={{ width: `${module.margin}%` }}
                          >
                            {module.margin}%
                          </div>
                        </div>
                        <div className="flex justify-between text-xs">
                          <span className="text-orange-600">Labor</span>
                          <span className="text-purple-600">Materials</span>
                          <span className="text-gray-600">Overhead</span>
                          <span className="text-green-600">Profit</span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          {/* Profit Comparison Chart */}
          <Card>
            <CardHeader>
              <CardTitle>Module Profit Comparison</CardTitle>
              <CardDescription>Compare profitability across business modules</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <BarChart data={moduleProfitData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
                  <XAxis 
                    dataKey="module" 
                    stroke="#666" 
                    style={{ fontSize: '12px' }}
                    tickFormatter={(value) => getModuleName(value as BusinessModule)}
                  />
                  <YAxis stroke="#666" style={{ fontSize: '12px' }} />
                  <Tooltip 
                    formatter={(value: number) => `$${value.toLocaleString()}`}
                    labelFormatter={(label) => getModuleName(label as BusinessModule)}
                  />
                  <Legend />
                  <Bar dataKey="revenue" fill="#155DFC" name="Revenue" />
                  <Bar dataKey="costs.total" fill="#F54900" name="Total Costs" />
                  <Bar dataKey="profit" fill="#00A63E" name="Profit" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Margin Analysis */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Profit Margin Trends</CardTitle>
                <CardDescription>Module profitability ranking</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {moduleProfitData
                    .sort((a, b) => b.margin - a.margin)
                    .map((module, index) => {
                      const config = getModuleConfig(module.module);
                      return (
                        <div key={module.module} className="flex items-center justify-between p-3 border border-border rounded-lg">
                          <div className="flex items-center gap-3">
                            <div className={`w-8 h-8 rounded-lg ${config.bgColor} flex items-center justify-center`}>
                              <span className="font-bold text-sm">{index + 1}</span>
                            </div>
                            <div>
                              <p className="font-medium">{config.name}</p>
                              <p className="text-xs text-muted-foreground">${module.profit.toLocaleString()} profit</p>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className={`font-semibold ${
                              module.margin >= 40 ? 'text-green-600' :
                              module.margin >= 30 ? 'text-blue-600' :
                              module.margin >= 20 ? 'text-yellow-600' :
                              'text-red-600'
                            }`}>
                              {module.margin}%
                            </p>
                            <p className="text-xs text-muted-foreground">margin</p>
                          </div>
                        </div>
                      );
                    })}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Cost Structure Analysis</CardTitle>
                <CardDescription>Average cost distribution</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={[
                        { name: "Labor", value: moduleProfitData.reduce((sum, m) => sum + m.costs.labor, 0), color: "#F54900" },
                        { name: "Materials", value: moduleProfitData.reduce((sum, m) => sum + m.costs.materials, 0), color: "#9810FA" },
                        { name: "Overhead", value: moduleProfitData.reduce((sum, m) => sum + m.costs.overhead, 0), color: "#666666" },
                        { name: "Profit", value: totalProfit, color: "#00A63E" },
                      ]}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={(entry) => `${entry.name} ${((entry.value / totalModuleRevenue) * 100).toFixed(0)}%`}
                      outerRadius={100}
                      dataKey="value"
                    >
                      {[
                        { color: "#F54900" },
                        { color: "#9810FA" },
                        { color: "#666666" },
                        { color: "#00A63E" },
                      ].map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value: number) => `$${value.toLocaleString()}`} />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Payment Analysis Tab - GAP-014: Track payment methods by module */}
        <TabsContent value="payments" className="space-y-6 mt-6">
          {/* Payment Overview */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-1.5">
                  <p className="text-sm text-muted-foreground">Card Payments</p>
                  <CreditCard className="h-4 w-4 text-blue-600" />
                </div>
                <p className="text-2xl font-semibold">67%</p>
                <p className="text-xs text-green-600 mt-0.5">Dominant across all modules</p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-1.5">
                  <p className="text-sm text-muted-foreground">App Payments</p>
                  <DollarSign className="h-4 w-4 text-green-600" />
                </div>
                <p className="text-2xl font-semibold">21%</p>
                <p className="text-xs text-green-600 mt-0.5">Growing rapidly +35%</p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-1.5">
                  <p className="text-sm text-muted-foreground">Cash/Other</p>
                  <Banknote className="h-4 w-4 text-orange-600" />
                </div>
                <p className="text-2xl font-semibold">12%</p>
                <p className="text-xs text-orange-600 mt-0.5">Declining -15%</p>
              </CardContent>
            </Card>
          </div>

          {/* Payment Methods by Module */}
          <Card>
            <CardHeader>
              <CardTitle>Payment Methods by Business Module</CardTitle>
              <CardDescription>Preferred payment types for each module</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {Object.entries(modulePaymentMethods).map(([moduleId, methods]) => {
                  const config = getModuleConfig(moduleId as BusinessModule);
                  const ModuleIcon = MODULE_ICONS[moduleId as BusinessModule];
                  
                  return (
                    <div key={moduleId} className="border border-border rounded-lg p-4">
                      <div className="flex items-center gap-3 mb-4">
                        <div className={`w-10 h-10 rounded-lg ${config.bgColor} flex items-center justify-center`}>
                          <ModuleIcon className={config.iconColor} size={20} />
                        </div>
                        <div>
                          <h4 className="font-semibold">{config.name}</h4>
                          <p className="text-xs text-muted-foreground">Payment breakdown</p>
                        </div>
                      </div>

                      <div className="space-y-3">
                        {methods.map((method) => (
                          <div key={method.method}>
                            <div className="flex justify-between text-sm mb-1">
                              <span className="text-muted-foreground">{method.method}</span>
                              <span className="font-semibold">{method.value}%</span>
                            </div>
                            <div className="w-full bg-gray-200 h-2 rounded-full overflow-hidden">
                              <div
                                className="h-2 transition-all"
                                style={{ 
                                  width: `${method.value}%`,
                                  backgroundColor: PAYMENT_COLORS[method.method] || '#666666'
                                }}
                              />
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* Dominant method indicator */}
                      <div className="mt-4 pt-4 border-t border-border">
                        <p className="text-xs text-muted-foreground">Most Popular</p>
                        <p className="font-semibold" style={{ 
                          color: PAYMENT_COLORS[methods[0].method] || '#666666' 
                        }}>
                          {methods[0].method} ({methods[0].value}%)
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          {/* Payment Insights */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Module Payment Patterns</CardTitle>
                <CardDescription>Key insights by business module</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="border border-blue-200 bg-blue-50 rounded-lg p-4">
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center shrink-0">
                        <Car className="text-blue-700" size={20} />
                      </div>
                      <div>
                        <h4 className="font-semibold text-blue-900">In-Bay Automatic</h4>
                        <p className="text-sm text-blue-700 mt-1">
                          High card usage (78%) - customers prefer contactless quick payments. App adoption growing at +22% monthly.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="border border-green-200 bg-green-50 rounded-lg p-4">
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-lg bg-green-100 flex items-center justify-center shrink-0">
                        <Wrench className="text-green-700" size={20} />
                      </div>
                      <div>
                        <h4 className="font-semibold text-green-900">Self-Service</h4>
                        <p className="text-sm text-green-700 mt-1">
                          Unique payment mix with 45% coin/token usage. Consider upgrading to modern payment terminals.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="border border-red-200 bg-red-50 rounded-lg p-4">
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-lg bg-red-100 flex items-center justify-center shrink-0">
                        <UsersIcon className="text-red-700" size={20} />
                      </div>
                      <div>
                        <h4 className="font-semibold text-red-900">Manual Detailing</h4>
                        <p className="text-sm text-red-700 mt-1">
                          Highest cash usage (25%) - often includes tips. Card processing remains dominant at 65%.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="border border-orange-200 bg-orange-50 rounded-lg p-4">
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-lg bg-orange-100 flex items-center justify-center shrink-0">
                        <Truck className="text-orange-700" size={20} />
                      </div>
                      <div>
                        <h4 className="font-semibold text-orange-900">Mobile Detailing</h4>
                        <p className="text-sm text-orange-700 mt-1">
                          Leading app adoption (42%) - customers book and pay digitally. Minimal cash transactions (3%).
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Payment Processing Fees</CardTitle>
                <CardDescription>Cost analysis by payment method</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="border border-border rounded-lg p-4">
                    <div className="flex justify-between items-center mb-3">
                      <div>
                        <p className="font-medium">Card Payments</p>
                        <p className="text-xs text-muted-foreground">Average 2.9% + $0.30 fee</p>
                      </div>
                      <Badge variant="outline">67% volume</Badge>
                    </div>
                    <div className="text-sm space-y-1">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Monthly volume:</span>
                        <span className="font-semibold">$36,420</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Processing fees:</span>
                        <span className="font-semibold text-orange-600">$1,220</span>
                      </div>
                    </div>
                  </div>

                  <div className="border border-border rounded-lg p-4">
                    <div className="flex justify-between items-center mb-3">
                      <div>
                        <p className="font-medium">App Payments</p>
                        <p className="text-xs text-muted-foreground">Average 1.9% + $0.20 fee</p>
                      </div>
                      <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                        21% volume
                      </Badge>
                    </div>
                    <div className="text-sm space-y-1">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Monthly volume:</span>
                        <span className="font-semibold">$11,420</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Processing fees:</span>
                        <span className="font-semibold text-green-600">$280</span>
                      </div>
                    </div>
                  </div>

                  <div className="border border-border rounded-lg p-4">
                    <div className="flex justify-between items-center mb-3">
                      <div>
                        <p className="font-medium">Cash/Coin</p>
                        <p className="text-xs text-muted-foreground">No processing fees</p>
                      </div>
                      <Badge variant="outline">12% volume</Badge>
                    </div>
                    <div className="text-sm space-y-1">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Monthly volume:</span>
                        <span className="font-semibold">$6,530</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Handling cost:</span>
                        <span className="font-semibold text-gray-600">$120</span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <p className="text-sm font-medium text-blue-900 mb-1">💡 Savings Opportunity</p>
                    <p className="text-sm text-blue-700">
                      Incentivizing 10% shift to app payments could save ~$150/month in processing fees.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Subscriptions Tab - Two-tier subscription model tracking */}
        <TabsContent value="subscriptions" className="space-y-6 mt-6">
          {/* Subscription Overview Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-sm text-muted-foreground">Total MRR</p>
                  <Repeat className="h-4 w-4 text-blue-600" />
                </div>
                <p className="text-2xl font-semibold">${totalMRR.toLocaleString()}</p>
                <p className="text-xs text-muted-foreground mt-1">Monthly Recurring Revenue</p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-sm text-muted-foreground">ARR Projection</p>
                  <TrendingUp className="h-4 w-4 text-green-600" />
                </div>
                <p className="text-2xl font-semibold">${(totalARR / 1000).toFixed(0)}K</p>
                <p className="text-xs text-green-600 mt-1">Annual Recurring Revenue</p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-sm text-muted-foreground">Active Subscribers</p>
                  <UserCheck className="h-4 w-4 text-purple-600" />
                </div>
                <p className="text-2xl font-semibold">{b2bSubscriptionData.activeSubscribers + b2cSubscriptionData.activeSubscribers}</p>
                <p className="text-xs text-muted-foreground mt-1">
                  B2B: {b2bSubscriptionData.activeSubscribers} | B2C: {b2cSubscriptionData.activeSubscribers}
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-sm text-muted-foreground">Revenue Share</p>
                  <Target className="h-4 w-4 text-orange-600" />
                </div>
                <p className="text-2xl font-semibold">{subscriptionRevenueShare}%</p>
                <p className="text-xs text-muted-foreground mt-1">of total revenue</p>
              </CardContent>
            </Card>
          </div>

          {/* B2B vs B2C Comparison */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* B2B Subscriptions */}
            <Card>
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Building2 className="h-5 w-5 text-blue-600" />
                  <CardTitle>B2B Platform Subscriptions</CardTitle>
                </div>
                <CardDescription>Car wash centers subscribing to Letwash platform</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-3 gap-3">
                    <div className="text-center p-3 bg-blue-50 rounded-lg">
                      <p className="text-xs text-muted-foreground mb-1">MRR</p>
                      <p className="font-semibold text-blue-700">${b2bSubscriptionData.mrr.toLocaleString()}</p>
                    </div>
                    <div className="text-center p-3 bg-green-50 rounded-lg">
                      <p className="text-xs text-muted-foreground mb-1">ARR</p>
                      <p className="font-semibold text-green-700">${(b2bSubscriptionData.arr / 1000).toFixed(0)}K</p>
                    </div>
                    <div className="text-center p-3 bg-purple-50 rounded-lg">
                      <p className="text-xs text-muted-foreground mb-1">Avg LTV</p>
                      <p className="font-semibold text-purple-700">${(b2bSubscriptionData.avgLtv / 1000).toFixed(1)}K</p>
                    </div>
                  </div>

                  <div className="border border-border rounded-lg p-4">
                    <div className="flex justify-between items-center mb-2">
                      <p className="text-sm font-medium">Churn Rate</p>
                      <Badge variant="outline" className={`${
                        b2bSubscriptionData.churnRate < 5 ? 'bg-green-50 text-green-700 border-green-200' :
                        b2bSubscriptionData.churnRate < 10 ? 'bg-yellow-50 text-yellow-700 border-yellow-200' :
                        'bg-red-50 text-red-700 border-red-200'
                      }`}>
                        {b2bSubscriptionData.churnRate}%
                      </Badge>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      {b2bSubscriptionData.totalSubscribers - b2bSubscriptionData.activeSubscribers} churned this month
                    </p>
                  </div>

                  <div>
                    <h4 className="font-medium mb-3">Subscription Tiers</h4>
                    <div className="space-y-2">
                      {b2bSubscriptionData.tiers.map((tier) => (
                        <div key={tier.name} className="border border-border rounded-lg p-3">
                          <div className="flex justify-between items-start mb-2">
                            <div>
                              <p className="font-medium">{tier.name}</p>
                              <p className="text-xs text-muted-foreground">{tier.features}</p>
                            </div>
                            <div className="text-right">
                              <p className="font-semibold">${tier.price}/mo</p>
                              <p className="text-xs text-muted-foreground">{tier.subscribers} centers</p>
                            </div>
                          </div>
                          <div className="flex justify-between items-center mt-2 pt-2 border-t border-border">
                            <span className="text-xs text-muted-foreground">MRR Contribution</span>
                            <span className="font-semibold text-sm">${tier.mrr.toLocaleString()}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* B2C Subscriptions */}
            <Card>
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Users className="h-5 w-5 text-green-600" />
                  <CardTitle>B2C Customer Subscriptions</CardTitle>
                </div>
                <CardDescription>Customers subscribing to car wash services</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-3 gap-3">
                    <div className="text-center p-3 bg-blue-50 rounded-lg">
                      <p className="text-xs text-muted-foreground mb-1">MRR</p>
                      <p className="font-semibold text-blue-700">${b2cSubscriptionData.mrr.toLocaleString()}</p>
                    </div>
                    <div className="text-center p-3 bg-green-50 rounded-lg">
                      <p className="text-xs text-muted-foreground mb-1">ARR</p>
                      <p className="font-semibold text-green-700">${(b2cSubscriptionData.arr / 1000).toFixed(0)}K</p>
                    </div>
                    <div className="text-center p-3 bg-purple-50 rounded-lg">
                      <p className="text-xs text-muted-foreground mb-1">Avg LTV</p>
                      <p className="font-semibold text-purple-700">${b2cSubscriptionData.avgLtv.toLocaleString()}</p>
                    </div>
                  </div>

                  <div className="border border-border rounded-lg p-4">
                    <div className="flex justify-between items-center mb-2">
                      <p className="text-sm font-medium">Churn Rate</p>
                      <Badge variant="outline" className={`${
                        b2cSubscriptionData.churnRate < 5 ? 'bg-green-50 text-green-700 border-green-200' :
                        b2cSubscriptionData.churnRate < 10 ? 'bg-yellow-50 text-yellow-700 border-yellow-200' :
                        'bg-red-50 text-red-700 border-red-200'
                      }`}>
                        {b2cSubscriptionData.churnRate}%
                      </Badge>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      {b2cSubscriptionData.totalSubscribers - b2cSubscriptionData.activeSubscribers} churned this month
                    </p>
                  </div>

                  <div>
                    <h4 className="font-medium mb-3">Subscription Plans</h4>
                    <div className="space-y-2">
                      {b2cSubscriptionData.plans.map((plan) => (
                        <div key={plan.name} className="border border-border rounded-lg p-3">
                          <div className="flex justify-between items-start mb-2">
                            <div>
                              <p className="font-medium">{plan.name}</p>
                              <p className="text-xs text-muted-foreground">{plan.washesPerMonth} washes/month</p>
                            </div>
                            <div className="text-right">
                              <p className="font-semibold">${plan.price}/mo</p>
                              <p className="text-xs text-muted-foreground">{plan.subscribers} customers</p>
                            </div>
                          </div>
                          <div className="flex flex-wrap gap-1 mb-2">
                            {plan.modules.map((mod) => (
                              <Badge key={mod} variant="outline" className="text-xs">
                                {getModuleName(mod as BusinessModule)}
                              </Badge>
                            ))}
                          </div>
                          <div className="flex justify-between items-center pt-2 border-t border-border">
                            <span className="text-xs text-muted-foreground">MRR Contribution</span>
                            <span className="font-semibold text-sm">${plan.mrr.toLocaleString()}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* MRR Growth Trends */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>B2B MRR Growth</CardTitle>
                <CardDescription>Platform subscription revenue trend</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <AreaChart data={b2bSubscriptionData.mrrGrowth}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
                    <XAxis dataKey="month" stroke="#666" style={{ fontSize: '12px' }} />
                    <YAxis stroke="#666" style={{ fontSize: '12px' }} />
                    <Tooltip />
                    <Legend />
                    <Area type="monotone" dataKey="mrr" stroke="#155DFC" fill="#155DFC" fillOpacity={0.3} name="MRR ($)" />
                    <Area type="monotone" dataKey="new" stroke="#00A63E" fill="#00A63E" fillOpacity={0.2} name="New ($)" />
                    <Area type="monotone" dataKey="churned" stroke="#F54900" fill="#F54900" fillOpacity={0.2} name="Churned ($)" />
                  </AreaChart>
                </ResponsiveContainer>
                <div className="grid grid-cols-3 gap-2 mt-4">
                  <div className="text-center p-2 bg-blue-50 rounded">
                    <p className="text-xs text-muted-foreground">Dec MRR</p>
                    <p className="font-semibold text-sm">${b2bSubscriptionData.mrrGrowth[2].mrr}</p>
                  </div>
                  <div className="text-center p-2 bg-green-50 rounded">
                    <p className="text-xs text-muted-foreground">New</p>
                    <p className="font-semibold text-sm text-green-600">+${b2bSubscriptionData.mrrGrowth[2].new}</p>
                  </div>
                  <div className="text-center p-2 bg-red-50 rounded">
                    <p className="text-xs text-muted-foreground">Churned</p>
                    <p className="font-semibold text-sm text-red-600">-${b2bSubscriptionData.mrrGrowth[2].churned}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>B2C MRR Growth</CardTitle>
                <CardDescription>Customer subscription revenue trend</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <AreaChart data={b2cSubscriptionData.mrrGrowth}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
                    <XAxis dataKey="month" stroke="#666" style={{ fontSize: '12px' }} />
                    <YAxis stroke="#666" style={{ fontSize: '12px' }} />
                    <Tooltip />
                    <Legend />
                    <Area type="monotone" dataKey="mrr" stroke="#00A63E" fill="#00A63E" fillOpacity={0.3} name="MRR ($)" />
                    <Area type="monotone" dataKey="new" stroke="#155DFC" fill="#155DFC" fillOpacity={0.2} name="New ($)" />
                    <Area type="monotone" dataKey="churned" stroke="#F54900" fill="#F54900" fillOpacity={0.2} name="Churned ($)" />
                  </AreaChart>
                </ResponsiveContainer>
                <div className="grid grid-cols-3 gap-2 mt-4">
                  <div className="text-center p-2 bg-green-50 rounded">
                    <p className="text-xs text-muted-foreground">Dec MRR</p>
                    <p className="font-semibold text-sm">${b2cSubscriptionData.mrrGrowth[2].mrr}</p>
                  </div>
                  <div className="text-center p-2 bg-blue-50 rounded">
                    <p className="text-xs text-muted-foreground">New</p>
                    <p className="font-semibold text-sm text-blue-600">+${b2cSubscriptionData.mrrGrowth[2].new}</p>
                  </div>
                  <div className="text-center p-2 bg-red-50 rounded">
                    <p className="text-xs text-muted-foreground">Churned</p>
                    <p className="font-semibold text-sm text-red-600">-${b2cSubscriptionData.mrrGrowth[2].churned}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Revenue Model Breakdown */}
          <Card>
            <CardHeader>
              <CardTitle>Revenue Model Analysis</CardTitle>
              <CardDescription>Subscription vs pay-per-service breakdown</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2">
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={[
                          { name: "Subscription Revenue", value: revenueBreakdown.subscription, color: "#155DFC" },
                          { name: "Pay-per-Service", value: revenueBreakdown.payPerService, color: "#00A63E" },
                        ]}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={(entry) => `${entry.name}: ${((entry.value / totalModuleRevenue) * 100).toFixed(1)}%`}
                        outerRadius={100}
                        dataKey="value"
                      >
                        <Cell fill="#155DFC" />
                        <Cell fill="#00A63E" />
                      </Pie>
                      <Tooltip formatter={(value: number) => `$${value.toLocaleString()}`} />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div className="space-y-4">
                  <div className="border border-blue-200 bg-blue-50 rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Repeat className="h-5 w-5 text-blue-600" />
                      <h4 className="font-semibold text-blue-900">Subscription Model</h4>
                    </div>
                    <p className="text-2xl font-semibold text-blue-700 mb-1">
                      ${revenueBreakdown.subscription.toLocaleString()}
                    </p>
                    <p className="text-xs text-blue-700 mb-3">
                      {revenueBreakdown.subscriptionPercentage}% of total revenue
                    </p>
                    <div className="space-y-1 text-xs">
                      <div className="flex justify-between">
                        <span className="text-blue-700">B2B Platform:</span>
                        <span className="font-semibold">${b2bSubscriptionData.mrr.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-blue-700">B2C Customer:</span>
                        <span className="font-semibold">${b2cSubscriptionData.mrr.toLocaleString()}</span>
                      </div>
                    </div>
                  </div>

                  <div className="border border-green-200 bg-green-50 rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <DollarSign className="h-5 w-5 text-green-600" />
                      <h4 className="font-semibold text-green-900">Pay-per-Service</h4>
                    </div>
                    <p className="text-2xl font-semibold text-green-700 mb-1">
                      ${revenueBreakdown.payPerService.toLocaleString()}
                    </p>
                    <p className="text-xs text-green-700">
                      {revenueBreakdown.payPerServicePercentage}% of total revenue
                    </p>
                  </div>

                  <div className="border border-purple-200 bg-purple-50 rounded-lg p-4">
                    <p className="text-xs font-medium text-purple-900 mb-1">💡 Strategic Insight</p>
                    <p className="text-xs text-purple-700">
                      {parseFloat(revenueBreakdown.subscriptionPercentage) > 30 
                        ? "Strong recurring revenue foundation. Consider expanding subscription tiers."
                        : "Opportunity to grow subscription base for more predictable revenue."}
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Subscription Health Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>LTV:CAC Ratio</CardTitle>
                <CardDescription>Customer lifetime value analysis</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="border border-border rounded-lg p-4">
                    <p className="text-sm text-muted-foreground mb-1">B2B Average LTV</p>
                    <p className="text-2xl font-semibold">${(b2bSubscriptionData.avgLtv / 1000).toFixed(1)}K</p>
                    <p className="text-xs text-muted-foreground mt-1">~24 months retention</p>
                  </div>
                  <div className="border border-border rounded-lg p-4">
                    <p className="text-sm text-muted-foreground mb-1">B2C Average LTV</p>
                    <p className="text-2xl font-semibold">${b2cSubscriptionData.avgLtv.toLocaleString()}</p>
                    <p className="text-xs text-muted-foreground mt-1">~18 months retention</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Churn Analysis</CardTitle>
                <CardDescription>Monthly cancellation rates</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="border border-border rounded-lg p-4">
                    <div className="flex justify-between items-center mb-2">
                      <p className="text-sm text-muted-foreground">B2B Churn</p>
                      <Badge variant="outline" className={`${
                        b2bSubscriptionData.churnRate < 5 ? 'bg-green-50 text-green-700 border-green-200' :
                        'bg-yellow-50 text-yellow-700 border-yellow-200'
                      }`}>
                        {b2bSubscriptionData.churnRate}%
                      </Badge>
                    </div>
                    <div className="w-full bg-gray-200 h-2 rounded-full overflow-hidden">
                      <div 
                        className="h-2 bg-red-500"
                        style={{ width: `${b2bSubscriptionData.churnRate * 10}%` }}
                      />
                    </div>
                  </div>
                  <div className="border border-border rounded-lg p-4">
                    <div className="flex justify-between items-center mb-2">
                      <p className="text-sm text-muted-foreground">B2C Churn</p>
                      <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                        {b2cSubscriptionData.churnRate}%
                      </Badge>
                    </div>
                    <div className="w-full bg-gray-200 h-2 rounded-full overflow-hidden">
                      <div 
                        className="h-2 bg-green-500"
                        style={{ width: `${b2cSubscriptionData.churnRate * 10}%` }}
                      />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Growth Metrics</CardTitle>
                <CardDescription>Month-over-month performance</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="border border-border rounded-lg p-4">
                    <p className="text-sm text-muted-foreground mb-1">MRR Growth Rate</p>
                    <div className="flex items-center gap-2">
                      <p className="text-2xl font-semibold text-green-600">+14.3%</p>
                      <TrendingUp className="h-5 w-5 text-green-600" />
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">
                      +${((b2bSubscriptionData.mrrGrowth[2].mrr + b2cSubscriptionData.mrrGrowth[2].mrr) - 
                         (b2bSubscriptionData.mrrGrowth[1].mrr + b2cSubscriptionData.mrrGrowth[1].mrr)).toLocaleString()} this month
                    </p>
                  </div>
                  <div className="border border-border rounded-lg p-4">
                    <p className="text-sm text-muted-foreground mb-1">New Subscribers</p>
                    <p className="text-2xl font-semibold">
                      {((b2bSubscriptionData.mrrGrowth[2].new + b2cSubscriptionData.mrrGrowth[2].new) / 
                        ((b2bSubscriptionData.mrr / b2bSubscriptionData.activeSubscribers + 
                          b2cSubscriptionData.mrr / b2cSubscriptionData.activeSubscribers) / 2)).toFixed(0)}
                    </p>
                    <p className="text-xs text-green-600 mt-1">+28% from last month</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Transactions Tab */}
        <TabsContent value="transactions" className="space-y-6 mt-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Recent Transactions</CardTitle>
                  <CardDescription>Latest payment transactions</CardDescription>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm" className="gap-2">
                    <Filter className="h-4 w-4" />
                    Filter
                  </Button>
                  <Button variant="outline" size="sm" className="gap-2">
                    <Download className="h-4 w-4" />
                    Export
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Transaction ID</TableHead>
                    <TableHead>Customer</TableHead>
                    <TableHead>Service</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Method</TableHead>
                    <TableHead>Branch</TableHead>
                    <TableHead>Time</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {recentTransactions.map((txn, index) => (
                    <TableRow key={index}>
                      <TableCell className="font-medium">{txn.id}</TableCell>
                      <TableCell>{txn.customer}</TableCell>
                      <TableCell>{txn.service}</TableCell>
                      <TableCell className="font-semibold">${txn.amount}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          {txn.method === "Cash" ? (
                            <Banknote className="h-4 w-4 text-muted-foreground" />
                          ) : (
                            <CreditCard className="h-4 w-4 text-muted-foreground" />
                          )}
                          <span className="text-sm">{txn.method}</span>
                        </div>
                      </TableCell>
                      <TableCell>{txn.branch}</TableCell>
                      <TableCell className="text-muted-foreground text-sm">{txn.time}</TableCell>
                      <TableCell>
                        <Badge className="bg-[#00a63e] text-white border-0 capitalize">
                          {txn.status}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Services Tab */}
        <TabsContent value="services" className="space-y-6 mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Revenue by Service</CardTitle>
              <CardDescription>Performance breakdown by service type</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <BarChart data={serviceRevenueData} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
                  <XAxis type="number" stroke="#666" style={{ fontSize: '12px' }} />
                  <YAxis dataKey="name" type="category" width={130} stroke="#666" style={{ fontSize: '12px' }} />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="revenue" fill="#155DFC" name="Revenue ($)" />
                  <Bar dataKey="bookings" fill="#00A63E" name="Bookings" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {serviceRevenueData.map((service, index) => (
              <Card key={index}>
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <p className="font-medium mb-1">{service.name}</p>
                      <Badge variant="outline" className="border-border/40">
                        {service.share}% of revenue
                      </Badge>
                    </div>
                    <DollarSign className="h-4 w-4 text-muted-foreground" />
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Revenue</span>
                      <span className="font-semibold">${service.revenue.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Bookings</span>
                      <span className="font-semibold">{service.bookings}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Avg Price</span>
                      <span className="font-semibold">${service.avgPrice}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Reports Tab */}
        <TabsContent value="reports" className="space-y-6 mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Generate Report</CardTitle>
                <CardDescription>Download financial reports for specific periods</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-4">
                  <Button className="w-full gap-2">
                    <Download className="h-4 w-4" />
                    Daily Revenue Report
                  </Button>
                  <Button className="w-full gap-2" variant="outline">
                    <Download className="h-4 w-4" />
                    Weekly Summary
                  </Button>
                  <Button className="w-full gap-2" variant="outline">
                    <Download className="h-4 w-4" />
                    Monthly Financial Report
                  </Button>
                  <Button className="w-full gap-2" variant="outline">
                    <Download className="h-4 w-4" />
                    Quarterly Performance
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Financial Insights</CardTitle>
                <CardDescription>Key financial metrics and trends</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="border border-border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium">Revenue Growth</span>
                      <TrendingUp className="h-4 w-4 text-[#00a63e]" />
                    </div>
                    <p className="text-2xl font-semibold">+18.2%</p>
                    <p className="text-xs text-muted-foreground mt-1">Month-over-month increase</p>
                  </div>

                  <div className="border border-border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium">Profit Margin</span>
                      <DollarSign className="h-4 w-4 text-muted-foreground" />
                    </div>
                    <p className="text-2xl font-semibold">42.5%</p>
                    <p className="text-xs text-muted-foreground mt-1">Above industry average</p>
                  </div>

                  <div className="border border-border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium">Customer LTV</span>
                      <Users className="h-4 w-4 text-muted-foreground" />
                    </div>
                    <p className="text-2xl font-semibold">$456</p>
                    <p className="text-xs text-muted-foreground mt-1">Average lifetime value</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}