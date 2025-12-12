"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Separator } from "../ui/separator";
import { ScrollArea } from "../ui/scroll-area";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import {
  ArrowLeft,
  TrendingUp,
  TrendingDown,
  DollarSign,
  Users,
  Activity,
  Clock,
  Calendar,
  Target,
  Zap,
  BarChart3,
  LineChart,
  PieChart,
  Settings,
  AlertCircle,
  CheckCircle,
  XCircle,
  Radio,
  Car,
  Truck,
  Wrench,
  Waves,
  MapPin,
  Sparkles,
  Award,
  RefreshCw,
  Download,
  Filter,
} from "lucide-react";
import { cn } from "../ui/utils";
import { motion } from "motion/react";
import {
  LineChart as RechartsLineChart,
  Line,
  AreaChart,
  Area,
  BarChart as RechartsBarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart as RechartsPieChart,
  Pie,
  Cell,
} from "recharts";

interface BusinessModuleDetailPageProps {
  moduleType: "in-bay" | "tunnel" | "self-service" | "mobile" | "detailing";
  onBack: () => void;
}

export function BusinessModuleDetailPage({
  moduleType,
  onBack,
}: BusinessModuleDetailPageProps) {
  const [activeTab, setActiveTab] = useState("overview");
  const [timeRange, setTimeRange] = useState("today");

  // Module configuration
  const moduleConfig = {
    "in-bay": {
      name: "In-Bay Automatic",
      icon: Car,
      color: "blue",
      bgColor: "bg-blue-50",
      borderColor: "border-blue-200",
      textColor: "text-blue-600",
      description: "Automated wash bay operations",
      units: "Bays",
      totalUnits: 6,
      activeUnits: 3,
    },
    tunnel: {
      name: "Tunnel Wash",
      icon: Waves,
      color: "cyan",
      bgColor: "bg-cyan-50",
      borderColor: "border-cyan-200",
      textColor: "text-cyan-600",
      description: "Conveyor belt wash system",
      units: "Tunnels",
      totalUnits: 2,
      activeUnits: 2,
    },
    "self-service": {
      name: "Self-Service",
      icon: Users,
      color: "green",
      bgColor: "bg-green-50",
      borderColor: "border-green-200",
      textColor: "text-green-600",
      description: "DIY wash stations",
      units: "Stations",
      totalUnits: 4,
      activeUnits: 2,
    },
    mobile: {
      name: "Mobile Detailing",
      icon: Truck,
      color: "orange",
      bgColor: "bg-orange-50",
      borderColor: "border-orange-200",
      textColor: "text-orange-600",
      description: "On-location service",
      units: "Teams",
      totalUnits: 3,
      activeUnits: 2,
    },
    detailing: {
      name: "Manual Detailing",
      icon: Wrench,
      color: "purple",
      bgColor: "bg-purple-50",
      borderColor: "border-purple-200",
      textColor: "text-purple-600",
      description: "Premium detail services",
      units: "Bays",
      totalUnits: 3,
      activeUnits: 2,
    },
  };

  const config = moduleConfig[moduleType];
  const ModuleIcon = config.icon;

  // Mock data
  const revenueData = [
    { date: "Mon", revenue: 850, bookings: 34, avgTicket: 25 },
    { date: "Tue", revenue: 920, bookings: 38, avgTicket: 24 },
    { date: "Wed", revenue: 780, bookings: 32, avgTicket: 24 },
    { date: "Thu", revenue: 1100, bookings: 45, avgTicket: 24 },
    { date: "Fri", revenue: 1350, bookings: 52, avgTicket: 26 },
    { date: "Sat", revenue: 1680, bookings: 68, avgTicket: 25 },
    { date: "Sun", revenue: 1420, bookings: 58, avgTicket: 24 },
  ];

  const hourlyData = [
    { hour: "8am", utilization: 45 },
    { hour: "9am", utilization: 62 },
    { hour: "10am", utilization: 78 },
    { hour: "11am", utilization: 85 },
    { hour: "12pm", utilization: 92 },
    { hour: "1pm", utilization: 88 },
    { hour: "2pm", utilization: 75 },
    { hour: "3pm", utilization: 82 },
    { hour: "4pm", utilization: 90 },
    { hour: "5pm", utilization: 95 },
    { hour: "6pm", utilization: 72 },
  ];

  const serviceDistribution = [
    { name: "Basic Wash", value: 45, color: "#3b82f6" },
    { name: "Premium Wash", value: 30, color: "#8b5cf6" },
    { name: "Deluxe Package", value: 15, color: "#10b981" },
    { name: "Subscription", value: 10, color: "#f59e0b" },
  ];

  const campaigns = [
    {
      id: 1,
      name: "Weekend Rush Special",
      status: "active",
      discount: "15% off",
      used: 42,
      revenue: 680,
      ends: "2 days",
    },
    {
      id: 2,
      name: "Premium Upgrade",
      status: "active",
      discount: "+$5",
      used: 28,
      revenue: 420,
      ends: "5 days",
    },
    {
      id: 3,
      name: "Loyalty Bonus",
      status: "scheduled",
      discount: "2x points",
      used: 0,
      revenue: 0,
      starts: "Tomorrow",
    },
  ];

  const todayStats = {
    revenue: 1247,
    revenueChange: 12.5,
    bookings: 48,
    bookingsChange: 8.3,
    avgTicket: 26,
    avgTicketChange: 4.2,
    utilization: 78,
    utilizationChange: 5.5,
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount);
  };

  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Header */}
      <div className="bg-white border-b sticky top-0 z-10">
        <div className="p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="icon" onClick={onBack}>
                <ArrowLeft size={20} />
              </Button>
              <div className="flex items-center gap-3">
                <div
                  className={cn(
                    "size-14 rounded-xl flex items-center justify-center",
                    config.bgColor
                  )}
                >
                  <ModuleIcon size={28} className={config.textColor} />
                </div>
                <div>
                  <h1 className="text-2xl font-bold">{config.name}</h1>
                  <p className="text-sm text-neutral-600">
                    {config.description}
                  </p>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Select value={timeRange} onValueChange={setTimeRange}>
                <SelectTrigger className="w-40">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="today">Today</SelectItem>
                  <SelectItem value="week">This Week</SelectItem>
                  <SelectItem value="month">This Month</SelectItem>
                  <SelectItem value="year">This Year</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline" className="gap-2">
                <Download size={16} />
                Export
              </Button>
              <Button className="gap-2">
                <Settings size={16} />
                Settings
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-6">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="revenue">Revenue</TabsTrigger>
            <TabsTrigger value="operations">Operations</TabsTrigger>
            <TabsTrigger value="campaigns">Campaigns</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-neutral-600">
                      Revenue Today
                    </span>
                    <DollarSign size={16} className="text-green-600" />
                  </div>
                  <p className="text-2xl font-bold">
                    {formatCurrency(todayStats.revenue)}
                  </p>
                  <div className="flex items-center gap-1 mt-2">
                    <TrendingUp
                      size={14}
                      className="text-green-600"
                    />
                    <span className="text-xs text-green-600">
                      +{todayStats.revenueChange}%
                    </span>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-neutral-600">Bookings</span>
                    <Calendar size={16} className="text-blue-600" />
                  </div>
                  <p className="text-2xl font-bold">{todayStats.bookings}</p>
                  <div className="flex items-center gap-1 mt-2">
                    <TrendingUp
                      size={14}
                      className="text-green-600"
                    />
                    <span className="text-xs text-green-600">
                      +{todayStats.bookingsChange}%
                    </span>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-neutral-600">
                      Avg Ticket
                    </span>
                    <Target size={16} className="text-purple-600" />
                  </div>
                  <p className="text-2xl font-bold">
                    {formatCurrency(todayStats.avgTicket)}
                  </p>
                  <div className="flex items-center gap-1 mt-2">
                    <TrendingUp
                      size={14}
                      className="text-green-600"
                    />
                    <span className="text-xs text-green-600">
                      +{todayStats.avgTicketChange}%
                    </span>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-neutral-600">
                      Utilization
                    </span>
                    <Activity size={16} className="text-orange-600" />
                  </div>
                  <p className="text-2xl font-bold">
                    {todayStats.utilization}%
                  </p>
                  <div className="flex items-center gap-1 mt-2">
                    <TrendingUp
                      size={14}
                      className="text-green-600"
                    />
                    <span className="text-xs text-green-600">
                      +{todayStats.utilizationChange}%
                    </span>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Weekly Performance */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>Weekly Performance</span>
                  <Badge variant="outline" className="text-xs">
                    Last 7 Days
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <RechartsLineChart data={revenueData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line
                      type="monotone"
                      dataKey="revenue"
                      stroke="#3b82f6"
                      strokeWidth={2}
                      name="Revenue ($)"
                    />
                    <Line
                      type="monotone"
                      dataKey="bookings"
                      stroke="#10b981"
                      strokeWidth={2}
                      name="Bookings"
                    />
                  </RechartsLineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Service Distribution & Active Units */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-sm">Service Distribution</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={250}>
                    <RechartsPieChart>
                      <Pie
                        data={serviceDistribution}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={90}
                        fill="#8884d8"
                        paddingAngle={5}
                        dataKey="value"
                        label
                      >
                        {serviceDistribution.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </RechartsPieChart>
                  </ResponsiveContainer>
                  <div className="space-y-2 mt-4">
                    {serviceDistribution.map((service) => (
                      <div
                        key={service.name}
                        className="flex items-center justify-between text-sm"
                      >
                        <div className="flex items-center gap-2">
                          <div
                            className="size-3 rounded-full"
                            style={{ backgroundColor: service.color }}
                          />
                          <span>{service.name}</span>
                        </div>
                        <span className="font-semibold">{service.value}%</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-sm">Unit Status</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="text-center p-6 bg-gradient-to-br from-blue-50 to-purple-50 rounded-lg">
                    <p className="text-5xl font-bold">
                      {config.activeUnits}/{config.totalUnits}
                    </p>
                    <p className="text-sm text-neutral-600 mt-2">
                      {config.units} Active
                    </p>
                  </div>
                  <Separator />
                  <div className="space-y-3">
                    {Array.from({ length: config.totalUnits }).map((_, i) => (
                      <div
                        key={i}
                        className="flex items-center justify-between p-3 border rounded-lg"
                      >
                        <div className="flex items-center gap-3">
                          <div
                            className={cn(
                              "size-10 rounded-lg flex items-center justify-center",
                              i < config.activeUnits
                                ? "bg-green-100"
                                : "bg-neutral-100"
                            )}
                          >
                            <ModuleIcon
                              size={20}
                              className={
                                i < config.activeUnits
                                  ? "text-green-600"
                                  : "text-neutral-400"
                              }
                            />
                          </div>
                          <div>
                            <p className="font-semibold text-sm">
                              {config.units.slice(0, -1)} {i + 1}
                            </p>
                            <p className="text-xs text-neutral-600">
                              {i < config.activeUnits
                                ? "Currently active"
                                : "Idle"}
                            </p>
                          </div>
                        </div>
                        <Badge
                          variant="outline"
                          className={cn(
                            "text-xs",
                            i < config.activeUnits
                              ? "bg-green-50 text-green-700 border-green-200"
                              : "bg-neutral-50 text-neutral-600"
                          )}
                        >
                          {i < config.activeUnits ? "Active" : "Idle"}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Analytics Tab */}
          <TabsContent value="analytics" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Hourly Utilization */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-sm">
                    Hourly Utilization Rate
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <AreaChart data={hourlyData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="hour" />
                      <YAxis />
                      <Tooltip />
                      <Area
                        type="monotone"
                        dataKey="utilization"
                        stroke="#8b5cf6"
                        fill="#8b5cf6"
                        fillOpacity={0.3}
                        name="Utilization %"
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              {/* Revenue Breakdown */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-sm">Daily Revenue Trend</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <RechartsBarChart data={revenueData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="date" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="revenue" fill="#10b981" name="Revenue ($)" />
                    </RechartsBarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>

            {/* Performance Metrics */}
            <Card>
              <CardHeader>
                <CardTitle className="text-sm">Performance Metrics</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-neutral-600">
                        Peak Hours Efficiency
                      </span>
                      <Badge className="bg-green-500">Excellent</Badge>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Current</span>
                        <span className="font-semibold">92%</span>
                      </div>
                      <div className="h-2 bg-neutral-200 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-green-500"
                          style={{ width: "92%" }}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-neutral-600">
                        Customer Satisfaction
                      </span>
                      <Badge className="bg-blue-500">Great</Badge>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Rating</span>
                        <span className="font-semibold">4.8/5.0</span>
                      </div>
                      <div className="h-2 bg-neutral-200 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-blue-500"
                          style={{ width: "96%" }}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-neutral-600">
                        Avg Service Time
                      </span>
                      <Badge className="bg-purple-500">Optimal</Badge>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Duration</span>
                        <span className="font-semibold">18 min</span>
                      </div>
                      <div className="h-2 bg-neutral-200 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-purple-500"
                          style={{ width: "75%" }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Revenue Tab */}
          <TabsContent value="revenue" className="space-y-6">
            {/* Revenue Summary */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card className="border-2 border-green-200 bg-green-50">
                <CardContent className="p-6 text-center">
                  <DollarSign size={32} className="text-green-600 mx-auto mb-2" />
                  <p className="text-3xl font-bold text-green-900">
                    {formatCurrency(8247)}
                  </p>
                  <p className="text-sm text-green-700 mt-1">This Week</p>
                  <div className="flex items-center justify-center gap-1 mt-2">
                    <TrendingUp size={14} className="text-green-600" />
                    <span className="text-xs text-green-600">+15.2%</span>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-2 border-blue-200 bg-blue-50">
                <CardContent className="p-6 text-center">
                  <Calendar size={32} className="text-blue-600 mx-auto mb-2" />
                  <p className="text-3xl font-bold text-blue-900">
                    {formatCurrency(32450)}
                  </p>
                  <p className="text-sm text-blue-700 mt-1">This Month</p>
                  <div className="flex items-center justify-center gap-1 mt-2">
                    <TrendingUp size={14} className="text-blue-600" />
                    <span className="text-xs text-blue-600">+12.8%</span>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-2 border-purple-200 bg-purple-50">
                <CardContent className="p-6 text-center">
                  <Target size={32} className="text-purple-600 mx-auto mb-2" />
                  <p className="text-3xl font-bold text-purple-900">
                    {formatCurrency(145200)}
                  </p>
                  <p className="text-sm text-purple-700 mt-1">YTD Total</p>
                  <div className="flex items-center justify-center gap-1 mt-2">
                    <TrendingUp size={14} className="text-purple-600" />
                    <span className="text-xs text-purple-600">+18.5%</span>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Detailed Revenue Table */}
            <Card>
              <CardHeader>
                <CardTitle className="text-sm">Revenue Breakdown</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {revenueData.map((day) => (
                    <div
                      key={day.date}
                      className="flex items-center justify-between p-4 border rounded-lg hover:bg-neutral-50 transition-colors"
                    >
                      <div className="flex items-center gap-4">
                        <div className="text-center">
                          <p className="font-semibold">{day.date}</p>
                          <p className="text-xs text-neutral-600">
                            {day.bookings} bookings
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-6">
                        <div className="text-right">
                          <p className="font-semibold">
                            {formatCurrency(day.revenue)}
                          </p>
                          <p className="text-xs text-neutral-600">
                            Avg: {formatCurrency(day.avgTicket)}
                          </p>
                        </div>
                        <Button variant="outline" size="sm">
                          Details
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Operations Tab */}
          <TabsContent value="operations" className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-sm">Live Operations</CardTitle>
                  <Button variant="outline" size="sm" className="gap-2">
                    <RefreshCw size={14} />
                    Refresh
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {Array.from({ length: config.activeUnits }).map((_, i) => (
                  <div
                    key={i}
                    className="p-4 border-2 border-green-200 bg-green-50 rounded-lg"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div className="size-12 rounded-lg bg-green-600 flex items-center justify-center">
                          <ModuleIcon size={24} className="text-white" />
                        </div>
                        <div>
                          <p className="font-semibold">
                            {config.units.slice(0, -1)} {i + 1}
                          </p>
                          <p className="text-sm text-neutral-600">
                            Currently servicing
                          </p>
                        </div>
                      </div>
                      <Badge className="bg-green-600">
                        <Radio size={12} className="mr-1 animate-pulse" />
                        Active
                      </Badge>
                    </div>
                    <Separator className="my-3" />
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="text-neutral-600">Customer</p>
                        <p className="font-semibold">John Doe</p>
                      </div>
                      <div>
                        <p className="text-neutral-600">Service</p>
                        <p className="font-semibold">Premium Wash</p>
                      </div>
                      <div>
                        <p className="text-neutral-600">Started</p>
                        <p className="font-semibold">10:15 AM</p>
                      </div>
                      <div>
                        <p className="text-neutral-600">Est. Complete</p>
                        <p className="font-semibold text-green-600">
                          8 minutes
                        </p>
                      </div>
                    </div>
                  </div>
                ))}

                {Array.from({
                  length: config.totalUnits - config.activeUnits,
                }).map((_, i) => (
                  <div
                    key={`idle-${i}`}
                    className="p-4 border rounded-lg bg-neutral-50"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="size-12 rounded-lg bg-neutral-200 flex items-center justify-center">
                          <ModuleIcon size={24} className="text-neutral-400" />
                        </div>
                        <div>
                          <p className="font-semibold text-neutral-600">
                            {config.units.slice(0, -1)} {config.activeUnits + i + 1}
                          </p>
                          <p className="text-sm text-neutral-500">
                            Ready for service
                          </p>
                        </div>
                      </div>
                      <Badge variant="outline" className="text-neutral-600">
                        Idle
                      </Badge>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Campaigns Tab */}
          <TabsContent value="campaigns" className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold">Active Campaigns</h3>
                <p className="text-sm text-neutral-600">
                  Manage module-specific promotions
                </p>
              </div>
              <Button className="gap-2">
                <Sparkles size={16} />
                Create Campaign
              </Button>
            </div>

            <div className="space-y-4">
              {campaigns.map((campaign) => (
                <Card
                  key={campaign.id}
                  className={cn(
                    "border-2",
                    campaign.status === "active"
                      ? "border-green-200 bg-green-50"
                      : "border-blue-200 bg-blue-50"
                  )}
                >
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          <h4 className="font-semibold">{campaign.name}</h4>
                          <Badge
                            className={cn(
                              campaign.status === "active"
                                ? "bg-green-600"
                                : "bg-blue-600"
                            )}
                          >
                            {campaign.status}
                          </Badge>
                        </div>
                        <p className="text-sm text-neutral-600">
                          {campaign.discount}
                        </p>
                      </div>
                      <Button variant="outline" size="sm">
                        Edit
                      </Button>
                    </div>

                    <Separator className="my-4" />

                    <div className="grid grid-cols-3 gap-4 text-sm">
                      <div>
                        <p className="text-neutral-600">Times Used</p>
                        <p className="text-xl font-bold">{campaign.used}</p>
                      </div>
                      <div>
                        <p className="text-neutral-600">Revenue Generated</p>
                        <p className="text-xl font-bold">
                          {formatCurrency(campaign.revenue)}
                        </p>
                      </div>
                      <div>
                        <p className="text-neutral-600">
                          {campaign.status === "active" ? "Ends In" : "Starts"}
                        </p>
                        <p className="text-xl font-bold">
                          {campaign.status === "active"
                            ? campaign.ends
                            : campaign.starts}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* AI Suggestions */}
            <Card className="border-2 border-purple-200 bg-gradient-to-br from-purple-50 to-blue-50">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="size-12 rounded-lg bg-purple-600 flex items-center justify-center">
                    <Sparkles size={24} className="text-white" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h4 className="font-semibold">AI Campaign Suggestion</h4>
                      <Badge className="bg-purple-600">New</Badge>
                    </div>
                    <p className="text-sm text-neutral-700 mb-4">
                      Based on your low-utilization hours (2-4 PM), we suggest a
                      "Afternoon Special" campaign with 20% off to increase bookings.
                      Expected impact: +{formatCurrency(450)} revenue/week
                    </p>
                    <div className="flex gap-2">
                      <Button size="sm" className="gap-2">
                        <CheckCircle size={14} />
                        Apply Suggestion
                      </Button>
                      <Button variant="outline" size="sm">
                        View Details
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
