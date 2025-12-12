"use client";

import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import {
  LineChart, Line, BarChart, Bar, AreaChart, Area, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from "recharts";
import { 
  Building2, Clock, Users, Globe, TrendingUp, TrendingDown, AlertCircle, 
  Bell, CheckCircle, XCircle, Lightbulb, DollarSign, Activity, 
  Zap, Target, BarChart3, Sparkles, Calendar, UserCheck, Timer, 
  Radio, Users2, TrendingDown as TrendingDownIcon, AlertTriangle,
  Clock3, UserX, UserCog, CreditCard, Repeat, ArrowRightLeft, 
  Gauge, Package, TrendingUpIcon
} from "lucide-react";
import { BusinessModule, ModulePerformance } from "../../types/business-modules";
import { ModulePerformanceGrid } from "../management/ModulePerformanceCard";

interface DashboardStats {
  totalCenters: number;
  pendingRequests: number;
  totalCustomers: number;
  totalServices: number;
  monthlyRevenue: string;
  activeBookings: number;
}

interface ServiceRequest {
  id: string;
  centerName: string;
  contactPerson: string;
  serviceName: string;
  description: string;
  suggestedPrice: number;
  suggestedDuration: number;
  vehicleTypes: string[];
  category: string;
  status: "pending" | "approved" | "rejected";
  submissionDate: string;
}

interface LetwashAdminDashboardProps {
  stats: DashboardStats;
  onNavigate: (page: string) => void;
  serviceRequests?: ServiceRequest[];
  onApproveRequest?: (id: string) => void;
  onRejectRequest?: (id: string) => void;
}

export function LetwashAdminDashboard({ stats, onNavigate, serviceRequests = [], onApproveRequest, onRejectRequest }: LetwashAdminDashboardProps) {
  const pendingRequests = serviceRequests.filter(r => r.status === "pending");
  
  // Mock revenue trend data
  const revenueTrendData = [
    { month: "Sep", revenue: 38450, bookings: 1234, centers: 8 },
    { month: "Oct", revenue: 41230, bookings: 1389, centers: 9 },
    { month: "Nov", revenue: 43680, bookings: 1456, centers: 10 },
    { month: "Dec", revenue: 47920, bookings: 1598, centers: 11 },
    { month: "Jan", revenue: 51340, bookings: 1723, centers: 12 },
    { month: "Feb", revenue: 54760, bookings: 1834, centers: 13 },
  ];

  // B2B Subscription Revenue Data
  const b2bSubscriptionData = [
    { month: "Sep", mrr: 8200, newSubs: 2, churned: 0 },
    { month: "Oct", mrr: 9450, newSubs: 1, churned: 0 },
    { month: "Nov", mrr: 10100, newSubs: 1, churned: 0 },
    { month: "Dec", mrr: 11800, newSubs: 1, churned: 0 },
    { month: "Jan", mrr: 13450, newSubs: 2, churned: 1 },
    { month: "Feb", mrr: 15600, newSubs: 1, churned: 0 },
  ];

  // Subscription tier distribution (B2B - Car wash centers subscribing to Letwash)
  const b2bTierData = [
    { tier: "Starter", count: 5, mrr: 2500, features: "Basic POS, 1 Branch", price: 500 },
    { tier: "Professional", count: 6, mrr: 7200, features: "Advanced Analytics, 5 Branches", price: 1200 },
    { tier: "Enterprise", count: 2, mrr: 5900, features: "Unlimited, Custom Integration", price: 2950 },
  ];

  // Module Transition Data
  const moduleTransitionData = [
    { module: "In-Bay", centers: 8, ready: 7, inProgress: 1, notStarted: 0, readinessScore: 88 },
    { module: "Tunnel", centers: 6, ready: 5, inProgress: 1, notStarted: 0, readinessScore: 83 },
    { module: "Manual Detailing", centers: 7, ready: 6, inProgress: 1, notStarted: 0, readinessScore: 86 },
    { module: "Mobile", centers: 4, ready: 2, inProgress: 2, notStarted: 0, readinessScore: 50 },
    { module: "Self-Service", centers: 5, ready: 3, inProgress: 1, notStarted: 1, readinessScore: 60 },
  ];

  // Platform usage analytics
  const platformUsageData = [
    { metric: "Mobile App Users", value: 12450, growth: 18, color: "#155DFC" },
    { metric: "Web Dashboard Users", value: 3240, growth: 12, color: "#00A63E" },
    { metric: "API Integrations", value: 890, growth: 25, color: "#9810FA" },
    { metric: "Active Sessions/Day", value: 5678, growth: 15, color: "#F54900" },
  ];

  // AI Campaign performance
  const aiCampaignData = [
    { name: "Early Bird Special", generated: 245, revenue: 8750, conversion: 68 },
    { name: "Afternoon Refresh", generated: 189, revenue: 6340, conversion: 52 },
    { name: "Weekend Boost", generated: 312, revenue: 12480, conversion: 74 },
    { name: "Night Owl Special", generated: 156, revenue: 4680, conversion: 45 },
  ];

  // Service popularity
  const servicePopularityData = [
    { name: "Basic Wash", bookings: 4567, share: 28 },
    { name: "Premium Detail", bookings: 3234, share: 20 },
    { name: "Full Package", bookings: 2890, share: 18 },
    { name: "Interior Clean", bookings: 2456, share: 15 },
    { name: "Express Wash", bookings: 3123, share: 19 },
  ];

  // Center performance distribution
  const centerPerformanceData = [
    { range: "$10k-20k", count: 3, color: "#cbced4" },
    { range: "$20k-30k", count: 4, color: "#fbbf24" },
    { range: "$30k-40k", count: 3, color: "#155DFC" },
    { range: "$40k+", count: 3, color: "#00A63E" },
  ];

  const statsCards = [
    {
      title: "Total Active Carwash Centers",
      value: stats.totalCenters,
      icon: Building2,
      color: "text-blue-600",
    },
    {
      title: "Pending Registration Requests",
      value: stats.pendingRequests,
      icon: Clock,
      color: "text-orange-600",
    },
    {
      title: "Total Customers",
      value: stats.totalCustomers,
      icon: Users,
      color: "text-green-600",
    },
    {
      title: "Total Global Services",
      value: stats.totalServices,
      icon: Globe,
      color: "text-purple-600",
    },
  ];

  const quickActions = [
    {
      title: "Add New Center",
      description: "Manually add a new carwash center to the platform",
      action: () => onNavigate("carwash-centers"),
      variant: "default" as const,
    },
    {
      title: "Review Pending Requests",
      description: "Review and approve pending carwash registrations",
      action: () => onNavigate("service-requests"),
      variant: "secondary" as const,
    },
    {
      title: "Manage Global Services",
      description: "Add, edit, or remove global service offerings",
      action: () => onNavigate("global-services"),
      variant: "secondary" as const,
    },
    {
      title: "View All Customers",
      description: "Access customer database and analytics",
      action: () => onNavigate("customers"),
      variant: "secondary" as const,
    },
  ];

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div>
        <h2 className="text-3xl">Welcome to Letwash Admin</h2>
        <p className="text-muted-foreground mt-2">
          Manage your carwash network, monitor performance, and oversee operations from this central dashboard.
        </p>
      </div>

      {/* Main Grid Layout: Left Content + Right Notifications */}
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-6">
        {/* Left Column - Main Content (2/3 width) */}
        <div className="space-y-6">
          {/* Key Performance Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-sm text-muted-foreground">Monthly Revenue</p>
                  <DollarSign className="h-4 w-4 text-muted-foreground" />
                </div>
                <p className="text-2xl font-semibold">$54,760</p>
                <div className="flex items-center gap-1 mt-1">
                  <TrendingUp className="h-3 w-3 text-[#00a63e]" />
                  <p className="text-xs text-[#00a63e]">+19.8% from last month</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-sm text-muted-foreground">Active Bookings</p>
                  <Activity className="h-4 w-4 text-muted-foreground" />
                </div>
                <p className="text-2xl font-semibold">{stats.activeBookings}</p>
                <div className="flex items-center gap-1 mt-1">
                  <TrendingUp className="h-3 w-3 text-[#00a63e]" />
                  <p className="text-xs text-[#00a63e]">+12.3% growth</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-sm text-muted-foreground">AI Campaign Impact</p>
                  <Sparkles className="h-4 w-4 text-muted-foreground" />
                </div>
                <p className="text-2xl font-semibold">902</p>
                <p className="text-xs text-muted-foreground mt-1">Bookings generated</p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-sm text-muted-foreground">Platform Uptime</p>
                  <Zap className="h-4 w-4 text-muted-foreground" />
                </div>
                <p className="text-2xl font-semibold">99.9%</p>
                <p className="text-xs text-[#00a63e] mt-1">Excellent performance</p>
              </CardContent>
            </Card>
          </div>

          {/* Analytics Tabs */}
          <Tabs defaultValue="realtime-ops" className="w-full">
            <TabsList className="bg-[#ececf0] p-1 h-9">
              <TabsTrigger value="realtime-ops" className="data-[state=active]:bg-white">Real-Time Ops</TabsTrigger>
              <TabsTrigger value="revenue" className="data-[state=active]:bg-white">Revenue</TabsTrigger>
              <TabsTrigger value="transitions" className="data-[state=active]:bg-white">Transitions</TabsTrigger>
              <TabsTrigger value="usage" className="data-[state=active]:bg-white">Usage</TabsTrigger>
              <TabsTrigger value="ai-campaigns" className="data-[state=active]:bg-white">AI Campaigns</TabsTrigger>
              <TabsTrigger value="services" className="data-[state=active]:bg-white">Services</TabsTrigger>
            </TabsList>

            {/* Real-Time Operations Tab */}
            <TabsContent value="realtime-ops" className="space-y-6 mt-6">
              {/* Platform-Wide Module Performance */}
              {(() => {
                const platformModules: BusinessModule[] = ["in_bay", "tunnel", "manual_detailing", "mobile", "self_service"];
                
                const modulePerformances: ModulePerformance[] = platformModules.map(moduleId => {
                  const performanceData: Record<BusinessModule, Partial<ModulePerformance>> = {
                    in_bay: { 
                      revenue: 99600, 
                      bookings: 1872, 
                      avgServiceTime: 15, 
                      utilizationRate: 78,
                      customerSatisfaction: 4.6,
                      topService: "Premium Wash",
                      trendDirection: "up",
                      trendPercentage: 12
                    },
                    tunnel: { 
                      revenue: 91800, 
                      bookings: 3480, 
                      avgServiceTime: 3, 
                      utilizationRate: 85,
                      customerSatisfaction: 4.4,
                      topService: "Express Tunnel Wash",
                      trendDirection: "up",
                      trendPercentage: 18
                    },
                    manual_detailing: { 
                      revenue: 132300, 
                      bookings: 623, 
                      avgServiceTime: 45, 
                      utilizationRate: 92,
                      customerSatisfaction: 4.8,
                      topService: "Full Detail Package",
                      trendDirection: "up",
                      trendPercentage: 8
                    },
                    mobile: { 
                      revenue: 34720, 
                      bookings: 260, 
                      avgServiceTime: 60, 
                      utilizationRate: 68,
                      customerSatisfaction: 4.7,
                      topService: "Mobile Premium Detail",
                      trendDirection: "stable",
                      trendPercentage: 0
                    },
                    self_service: { 
                      revenue: 21700, 
                      bookings: 2280, 
                      avgServiceTime: 25, 
                      utilizationRate: 54,
                      customerSatisfaction: 4.2,
                      topService: "Self-Service Bay Access",
                      trendDirection: "down",
                      trendPercentage: -5
                    },
                  };
                  
                  return {
                    moduleId,
                    ...performanceData[moduleId]
                  } as ModulePerformance;
                });
                
                const branchCountByModule: Record<BusinessModule, number> = {
                  in_bay: 8,
                  tunnel: 6,
                  manual_detailing: 7,
                  mobile: 4,
                  self_service: 5,
                };
                
                return (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-lg font-semibold">Platform-Wide Module Performance</h3>
                        <p className="text-sm text-muted-foreground">Aggregated metrics across all carwash centers</p>
                      </div>
                      <Badge variant="outline" className="text-xs">
                        Real-time data
                      </Badge>
                    </div>
                    <ModulePerformanceGrid 
                      performances={modulePerformances}
                      branchCountByModule={branchCountByModule}
                    />
                  </div>
                );
              })()}
              
              {/* Critical Gap Solution: Real-Time Operations Dashboard */}
              <Card className="border-[#155DFC]/30 bg-gradient-to-br from-blue-50 to-indigo-50">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="flex items-center gap-2">
                        <Radio className="h-5 w-5 text-[#155DFC] animate-pulse" />
                        Live Operations Command Center
                      </CardTitle>
                      <p className="text-sm text-muted-foreground mt-1">Real-time visibility across all centers</p>
                    </div>
                    <Badge className="bg-[#155DFC] text-white border-0 animate-pulse">
                      LIVE
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="bg-white rounded-lg p-4 border border-[#155DFC]/20">
                      <div className="flex items-center gap-2 mb-2">
                        <Activity className="h-4 w-4 text-[#155DFC]" />
                        <p className="text-xs text-muted-foreground">In Service</p>
                      </div>
                      <p className="text-2xl font-bold text-[#155DFC]">47</p>
                      <p className="text-xs text-muted-foreground mt-1">Across all centers</p>
                    </div>
                    <div className="bg-white rounded-lg p-4 border border-orange-200">
                      <div className="flex items-center gap-2 mb-2">
                        <Clock3 className="h-4 w-4 text-orange-600" />
                        <p className="text-xs text-muted-foreground">Waiting</p>
                      </div>
                      <p className="text-2xl font-bold text-orange-600">28</p>
                      <p className="text-xs text-muted-foreground mt-1">~18 min avg wait</p>
                    </div>
                    <div className="bg-white rounded-lg p-4 border border-green-200">
                      <div className="flex items-center gap-2 mb-2">
                        <UserCheck className="h-4 w-4 text-green-600" />
                        <p className="text-xs text-muted-foreground">Walk-Ins Today</p>
                      </div>
                      <p className="text-2xl font-bold text-green-600">156</p>
                      <p className="text-xs text-green-600 mt-1">+23% vs yesterday</p>
                    </div>
                    <div className="bg-white rounded-lg p-4 border border-purple-200">
                      <div className="flex items-center gap-2 mb-2">
                        <Target className="h-4 w-4 text-purple-600" />
                        <p className="text-xs text-muted-foreground">Capacity Used</p>
                      </div>
                      <p className="text-2xl font-bold text-purple-600">78%</p>
                      <p className="text-xs text-muted-foreground mt-1">Platform-wide</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Hourly Analytics - Gap Solution */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Clock className="h-5 w-5 text-orange-600" />
                    Hourly Performance Analytics
                  </CardTitle>
                  <p className="text-sm text-muted-foreground">Peak hours and capacity utilization</p>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {[
                      { hour: "8:00 AM", bookings: 45, walkIns: 32, capacity: 68, isPeak: false },
                      { hour: "9:00 AM", bookings: 68, walkIns: 52, capacity: 95, isPeak: true },
                      { hour: "10:00 AM", bookings: 58, walkIns: 38, capacity: 82, isPeak: false },
                      { hour: "11:00 AM", bookings: 72, walkIns: 58, capacity: 100, isPeak: true },
                      { hour: "12:00 PM", bookings: 52, walkIns: 28, capacity: 72, isPeak: false },
                      { hour: "1:00 PM", bookings: 48, walkIns: 24, capacity: 65, isPeak: false },
                      { hour: "2:00 PM", bookings: 65, walkIns: 45, capacity: 88, isPeak: false },
                    ].map((slot, index) => (
                      <div key={index} className={`flex items-center gap-3 p-3 rounded-lg ${slot.isPeak ? 'bg-red-50 border border-red-200' : 'bg-muted/30'}`}>
                        <div className="w-24">
                          <p className="text-sm font-medium">{slot.hour}</p>
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                              <div 
                                className={`h-full ${slot.isPeak ? 'bg-red-500' : 'bg-[#155DFC]'}`}
                                style={{ width: `${slot.capacity}%` }}
                              />
                            </div>
                            <span className="text-xs font-medium w-12 text-right">{slot.capacity}%</span>
                          </div>
                          <div className="flex items-center gap-4 text-xs text-muted-foreground">
                            <span>Bookings: {slot.bookings}</span>
                            <span>Walk-ins: {slot.walkIns}</span>
                          </div>
                        </div>
                        {slot.isPeak && (
                          <Badge className="bg-red-500 text-white border-0">PEAK</Badge>
                        )}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Walk-In vs Appointment Analytics - Gap Solution */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <UserCheck className="h-5 w-5 text-green-600" />
                      Walk-In Performance
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="border border-border rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium">Today's Walk-Ins</span>
                        <Users2 className="h-4 w-4 text-muted-foreground" />
                      </div>
                      <p className="text-2xl font-semibold">156</p>
                      <p className="text-xs text-green-600 mt-1">42% of total customers</p>
                    </div>
                    <div className="border border-border rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium">Walk-In Revenue</span>
                        <DollarSign className="h-4 w-4 text-muted-foreground" />
                      </div>
                      <p className="text-2xl font-semibold">$4,680</p>
                      <p className="text-xs text-muted-foreground mt-1">Avg $30 per walk-in</p>
                    </div>
                    <div className="border border-border rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium">Conversion Rate</span>
                        <Target className="h-4 w-4 text-muted-foreground" />
                      </div>
                      <p className="text-2xl font-semibold">87%</p>
                      <p className="text-xs text-green-600 mt-1">Walk-in to service</p>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Calendar className="h-5 w-5 text-[#155DFC]" />
                      Appointment Performance
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="border border-border rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium">Today's Appointments</span>
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                      </div>
                      <p className="text-2xl font-semibold">218</p>
                      <p className="text-xs text-[#155DFC] mt-1">58% of total customers</p>
                    </div>
                    <div className="border border-border rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium">Appointment Revenue</span>
                        <DollarSign className="h-4 w-4 text-muted-foreground" />
                      </div>
                      <p className="text-2xl font-semibold">$8,720</p>
                      <p className="text-xs text-muted-foreground mt-1">Avg $40 per booking</p>
                    </div>
                    <div className="border border-border rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium">No-Show Rate</span>
                        <UserX className="h-4 w-4 text-muted-foreground" />
                      </div>
                      <p className="text-2xl font-semibold">7.2%</p>
                      <p className="text-xs text-red-600 mt-1">16 no-shows today</p>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Staff Performance Dashboard - Gap Solution */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <UserCog className="h-5 w-5 text-purple-600" />
                    Staff Performance Metrics
                  </CardTitle>
                  <p className="text-sm text-muted-foreground">Real-time productivity across all centers</p>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div className="border border-border rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium">Active Staff</span>
                        <Users className="h-4 w-4 text-muted-foreground" />
                      </div>
                      <p className="text-2xl font-semibold">89</p>
                      <p className="text-xs text-muted-foreground mt-1">Currently working</p>
                    </div>
                    <div className="border border-border rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium">Avg Efficiency</span>
                        <Timer className="h-4 w-4 text-muted-foreground" />
                      </div>
                      <p className="text-2xl font-semibold">92%</p>
                      <p className="text-xs text-green-600 mt-1">Above target (85%)</p>
                    </div>
                    <div className="border border-border rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium">Services/Staff</span>
                        <Target className="h-4 w-4 text-muted-foreground" />
                      </div>
                      <p className="text-2xl font-semibold">4.2</p>
                      <p className="text-xs text-muted-foreground mt-1">Today's average</p>
                    </div>
                    <div className="border border-border rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium">Customer Rating</span>
                        <Sparkles className="h-4 w-4 text-muted-foreground" />
                      </div>
                      <p className="text-2xl font-semibold">4.8</p>
                      <p className="text-xs text-green-600 mt-1">Excellent performance</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Operational Insights - Gap Solution */}
              <Card className="border-orange-200 bg-orange-50">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <AlertTriangle className="h-5 w-5 text-orange-600" />
                    Actionable Insights & Recommendations
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="bg-white rounded-lg p-4 border border-orange-200">
                      <div className="flex items-start gap-3">
                        <div className="size-8 bg-red-100 rounded-lg flex items-center justify-center flex-shrink-0">
                          <AlertCircle className="h-4 w-4 text-red-600" />
                        </div>
                        <div className="flex-1">
                          <p className="font-medium text-sm">High No-Show Rate Detected</p>
                          <p className="text-xs text-muted-foreground mt-1">
                            7.2% no-show rate today (16 customers). Recommend implementing SMS reminder system.
                          </p>
                          <Button size="sm" className="mt-2 h-7 text-xs">Enable SMS Reminders</Button>
                        </div>
                      </div>
                    </div>
                    <div className="bg-white rounded-lg p-4 border border-orange-200">
                      <div className="flex items-start gap-3">
                        <div className="size-8 bg-yellow-100 rounded-lg flex items-center justify-center flex-shrink-0">
                          <TrendingDownIcon className="h-4 w-4 text-yellow-600" />
                        </div>
                        <div className="flex-1">
                          <p className="font-medium text-sm">Low Capacity at 3 Centers</p>
                          <p className="text-xs text-muted-foreground mt-1">
                            Centers A, F, and K are running at 45% capacity. Launch AI campaigns to boost bookings.
                          </p>
                          <Button size="sm" variant="outline" className="mt-2 h-7 text-xs">Generate Campaigns</Button>
                        </div>
                      </div>
                    </div>
                    <div className="bg-white rounded-lg p-4 border border-green-200">
                      <div className="flex items-start gap-3">
                        <div className="size-8 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                          <Sparkles className="h-4 w-4 text-green-600" />
                        </div>
                        <div className="flex-1">
                          <p className="font-medium text-sm">Walk-In Performance Excellent</p>
                          <p className="text-xs text-muted-foreground mt-1">
                            156 walk-ins today (+23% increase). 87% conversion rate. Great customer experience!
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Revenue Tab */}
            <TabsContent value="revenue" className="space-y-6 mt-6">
              {/* B2B Subscription Revenue Overview - NEW */}
              <Card className="border-[#9810FA]/30 bg-gradient-to-br from-purple-50 to-pink-50">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="flex items-center gap-2">
                        <CreditCard className="h-5 w-5 text-[#9810FA]" />
                        B2B Platform Subscriptions
                      </CardTitle>
                      <p className="text-sm text-muted-foreground mt-1">Car wash centers subscribing to Letwash</p>
                    </div>
                    <Badge className="bg-[#9810FA] text-white border-0">
                      13 Active Subscribers
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                    <div className="bg-white rounded-lg p-4 border border-[#9810FA]/20">
                      <div className="flex items-center gap-2 mb-2">
                        <Repeat className="h-4 w-4 text-[#9810FA]" />
                        <p className="text-xs text-muted-foreground">MRR</p>
                      </div>
                      <p className="text-2xl font-bold text-[#9810FA]">$15,600</p>
                      <p className="text-xs text-green-600 mt-1">+16% from last month</p>
                    </div>
                    <div className="bg-white rounded-lg p-4 border border-blue-200">
                      <div className="flex items-center gap-2 mb-2">
                        <TrendingUpIcon className="h-4 w-4 text-blue-600" />
                        <p className="text-xs text-muted-foreground">ARR</p>
                      </div>
                      <p className="text-2xl font-bold text-blue-600">$187K</p>
                      <p className="text-xs text-muted-foreground mt-1">Annual projection</p>
                    </div>
                    <div className="bg-white rounded-lg p-4 border border-green-200">
                      <div className="flex items-center gap-2 mb-2">
                        <Package className="h-4 w-4 text-green-600" />
                        <p className="text-xs text-muted-foreground">LTV</p>
                      </div>
                      <p className="text-2xl font-bold text-green-600">$22,400</p>
                      <p className="text-xs text-muted-foreground mt-1">Avg per customer</p>
                    </div>
                    <div className="bg-white rounded-lg p-4 border border-red-200">
                      <div className="flex items-center gap-2 mb-2">
                        <AlertCircle className="h-4 w-4 text-red-600" />
                        <p className="text-xs text-muted-foreground">Churn Rate</p>
                      </div>
                      <p className="text-2xl font-bold text-red-600">2.1%</p>
                      <p className="text-xs text-green-600 mt-1">Below industry avg</p>
                    </div>
                  </div>

                  {/* B2B MRR Growth Chart */}
                  <div className="bg-white rounded-lg p-4 border border-[#9810FA]/20">
                    <h4 className="font-semibold mb-4">MRR Growth Trend</h4>
                    <ResponsiveContainer width="100%" height={200}>
                      <AreaChart data={b2bSubscriptionData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
                        <XAxis dataKey="month" stroke="#666" style={{ fontSize: '12px' }} />
                        <YAxis stroke="#666" style={{ fontSize: '12px' }} />
                        <Tooltip />
                        <Legend />
                        <Area type="monotone" dataKey="mrr" stroke="#9810FA" fill="#9810FA" fillOpacity={0.2} name="MRR ($)" />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              {/* Subscription Tier Breakdown */}
              <Card>
                <CardHeader>
                  <CardTitle>Subscription Tier Distribution</CardTitle>
                  <p className="text-sm text-muted-foreground">Revenue breakdown by subscription plan</p>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {b2bTierData.map((tier, index) => (
                      <div key={index} className="border border-border rounded-lg p-4">
                        <div className="flex items-center justify-between mb-3">
                          <div>
                            <p className="font-semibold">{tier.tier}</p>
                            <p className="text-xs text-muted-foreground">{tier.features}</p>
                          </div>
                          <Badge variant="outline">{tier.count} centers</Badge>
                        </div>
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span className="text-muted-foreground">Price/month</span>
                            <span className="font-semibold">${tier.price}</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="text-muted-foreground">MRR</span>
                            <span className="font-semibold text-[#9810FA]">${tier.mrr.toLocaleString()}</span>
                          </div>
                          <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                            <div 
                              className="h-full bg-[#9810FA]"
                              style={{ width: `${(tier.mrr / 15600) * 100}%` }}
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Revenue Growth Trend</CardTitle>
                    <p className="text-sm text-muted-foreground">Platform-wide revenue over 6 months</p>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={300}>
                      <AreaChart data={revenueTrendData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
                        <XAxis dataKey="month" stroke="#666" style={{ fontSize: '12px' }} />
                        <YAxis stroke="#666" style={{ fontSize: '12px' }} />
                        <Tooltip />
                        <Legend />
                        <Area type="monotone" dataKey="revenue" stroke="#155DFC" fill="#155DFC" fillOpacity={0.2} name="Revenue ($)" />
                      </AreaChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Center Revenue Distribution</CardTitle>
                    <p className="text-sm text-muted-foreground">Monthly revenue ranges</p>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={300}>
                      <PieChart>
                        <Pie
                          data={centerPerformanceData}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          label={(entry) => `${entry.range}: ${entry.count}`}
                          outerRadius={100}
                          fill="#8884d8"
                          dataKey="count"
                        >
                          {centerPerformanceData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip />
                      </PieChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>Key Revenue Insights</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="border border-border rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium">Average per Center</span>
                        <Building2 className="h-4 w-4 text-muted-foreground" />
                      </div>
                      <p className="text-2xl font-semibold">$4,212</p>
                      <p className="text-xs text-muted-foreground mt-1">Monthly average</p>
                    </div>
                    <div className="border border-border rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium">Top Performer</span>
                        <Target className="h-4 w-4 text-muted-foreground" />
                      </div>
                      <p className="text-2xl font-semibold">$12,680</p>
                      <p className="text-xs text-muted-foreground mt-1">SpeedWash Express</p>
                    </div>
                    <div className="border border-border rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium">Growth Rate</span>
                        <TrendingUp className="h-4 w-4 text-muted-foreground" />
                      </div>
                      <p className="text-2xl font-semibold">+19.8%</p>
                      <p className="text-xs text-[#00a63e] mt-1">Month-over-month</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Transitions Tab */}
            <TabsContent value="transitions" className="space-y-6 mt-6">
              {/* Transition Overview */}
              <Card className="border-orange-200 bg-gradient-to-br from-orange-50 to-amber-50">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="flex items-center gap-2">
                        <ArrowRightLeft className="h-5 w-5 text-orange-600" />
                        Business Module Transition Tracking
                      </CardTitle>
                      <p className="text-sm text-muted-foreground mt-1">Monitor readiness across all 5 business modules</p>
                    </div>
                    <Badge className="bg-orange-600 text-white border-0">
                      Platform-Wide
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                    {moduleTransitionData.map((module, index) => (
                      <div key={index} className="bg-white rounded-lg p-4 border border-orange-200">
                        <div className="flex items-center gap-2 mb-2">
                          <Gauge className="h-4 w-4 text-orange-600" />
                          <p className="text-xs font-medium">{module.module}</p>
                        </div>
                        <p className="text-2xl font-bold text-orange-600">{module.readinessScore}%</p>
                        <p className="text-xs text-muted-foreground mt-1">{module.ready}/{module.centers} ready</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Detailed Module Status */}
              <Card>
                <CardHeader>
                  <CardTitle>Module Transition Status</CardTitle>
                  <p className="text-sm text-muted-foreground">Readiness and progress of modules across centers</p>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={moduleTransitionData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
                      <XAxis dataKey="module" stroke="#666" style={{ fontSize: '12px' }} />
                      <YAxis stroke="#666" style={{ fontSize: '12px' }} />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="ready" fill="#00A63E" name="Ready" />
                      <Bar dataKey="inProgress" fill="#FFC107" name="In Progress" />
                      <Bar dataKey="notStarted" fill="#F44336" name="Not Started" />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              {/* Module Breakdown Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {moduleTransitionData.map((module, index) => (
                  <Card key={index} className={module.readinessScore >= 80 ? "border-green-200" : module.readinessScore >= 60 ? "border-yellow-200" : "border-red-200"}>
                    <CardHeader className="pb-3">
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-base">{module.module}</CardTitle>
                        <Badge className={module.readinessScore >= 80 ? "bg-green-600" : module.readinessScore >= 60 ? "bg-yellow-600" : "bg-red-600"}>
                          {module.readinessScore}%
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Total Centers</span>
                          <span className="font-semibold">{module.centers}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-green-600">✓ Ready</span>
                          <span className="font-semibold">{module.ready}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-yellow-600">⚡ In Progress</span>
                          <span className="font-semibold">{module.inProgress}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-red-600">⏸ Not Started</span>
                          <span className="font-semibold">{module.notStarted}</span>
                        </div>
                      </div>
                      <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
                        <div className="h-full flex">
                          <div className="bg-green-600" style={{ width: `${(module.ready / module.centers) * 100}%` }} />
                          <div className="bg-yellow-500" style={{ width: `${(module.inProgress / module.centers) * 100}%` }} />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Transition Insights */}
              <Card className="border-blue-200 bg-blue-50">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Lightbulb className="h-5 w-5 text-blue-600" />
                    Transition Insights & Recommendations
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="bg-white rounded-lg p-4 border border-green-200">
                      <div className="flex items-start gap-3">
                        <div className="size-8 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                          <CheckCircle className="h-4 w-4 text-green-600" />
                        </div>
                        <div className="flex-1">
                          <p className="font-medium text-sm">In-Bay & Manual Detailing Leading</p>
                          <p className="text-xs text-muted-foreground mt-1">
                            88% and 86% readiness scores. These modules are nearly platform-ready for full deployment.
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="bg-white rounded-lg p-4 border border-yellow-200">
                      <div className="flex items-start gap-3">
                        <div className="size-8 bg-yellow-100 rounded-lg flex items-center justify-center flex-shrink-0">
                          <AlertTriangle className="h-4 w-4 text-yellow-600" />
                        </div>
                        <div className="flex-1">
                          <p className="font-medium text-sm">Mobile & Self-Service Need Attention</p>
                          <p className="text-xs text-muted-foreground mt-1">
                            50% and 60% readiness. Recommend prioritizing training and setup assistance for these centers.
                          </p>
                          <Button size="sm" variant="outline" className="mt-2 h-7 text-xs">View Action Plan</Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Usage Tab */}
            <TabsContent value="usage" className="space-y-6 mt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {platformUsageData.map((item, index) => (
                  <Card key={index}>
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1">
                          <p className="text-sm text-muted-foreground mb-1">{item.metric}</p>
                          <p className="text-2xl font-semibold">{item.value.toLocaleString()}</p>
                        </div>
                        <div className="size-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: `${item.color}15` }}>
                          <Activity className="h-5 w-5" style={{ color: item.color }} />
                        </div>
                      </div>
                      <div className="flex items-center gap-1">
                        <TrendingUp className="h-3 w-3 text-[#00a63e]" />
                        <p className="text-xs text-[#00a63e]">+{item.growth}% this month</p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>Bookings & Centers Growth</CardTitle>
                  <p className="text-sm text-muted-foreground">Platform expansion metrics</p>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={revenueTrendData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
                      <XAxis dataKey="month" stroke="#666" style={{ fontSize: '12px' }} />
                      <YAxis yAxisId="left" stroke="#155DFC" style={{ fontSize: '12px' }} />
                      <YAxis yAxisId="right" orientation="right" stroke="#00A63E" style={{ fontSize: '12px' }} />
                      <Tooltip />
                      <Legend />
                      <Line yAxisId="left" type="monotone" dataKey="bookings" stroke="#155DFC" strokeWidth={2} name="Bookings" />
                      <Line yAxisId="right" type="monotone" dataKey="centers" stroke="#00A63E" strokeWidth={2} name="Active Centers" />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </TabsContent>

            {/* AI Campaigns Tab */}
            <TabsContent value="ai-campaigns" className="space-y-6 mt-6">
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="flex items-center gap-2">
                        <Sparkles className="h-5 w-5 text-[#9810FA]" />
                        AI Campaign Performance
                      </CardTitle>
                      <p className="text-sm text-muted-foreground mt-1">Platform-wide AI-generated campaigns</p>
                    </div>
                    <Badge className="bg-[#9810FA] text-white border-0">
                      902 Bookings Generated
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={aiCampaignData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
                      <XAxis dataKey="name" stroke="#666" style={{ fontSize: '12px' }} />
                      <YAxis stroke="#666" style={{ fontSize: '12px' }} />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="generated" fill="#9810FA" name="Bookings Generated" />
                      <Bar dataKey="revenue" fill="#00A63E" name="Revenue ($)" />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>AI Impact Summary</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="border border-border rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium">Total AI Revenue</span>
                        <DollarSign className="h-4 w-4 text-muted-foreground" />
                      </div>
                      <p className="text-2xl font-semibold">$32,250</p>
                      <p className="text-xs text-muted-foreground mt-1">From AI campaigns</p>
                    </div>
                    <div className="border border-border rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium">Avg Conversion</span>
                        <Target className="h-4 w-4 text-muted-foreground" />
                      </div>
                      <p className="text-2xl font-semibold">59.8%</p>
                      <p className="text-xs text-[#00a63e] mt-1">Above industry avg</p>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Top Performing Campaign</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="border border-[#9810FA]/20 bg-[#9810FA]/5 rounded-lg p-4">
                      <div className="flex items-center gap-2 mb-3">
                        <Sparkles className="h-5 w-5 text-[#9810FA]" />
                        <span className="font-medium">Weekend Boost</span>
                        <Badge className="bg-[#00a63e] text-white border-0 ml-auto">
                          74% Conv.
                        </Badge>
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Bookings</span>
                          <span className="font-semibold">312</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Revenue</span>
                          <span className="font-semibold">$12,480</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Centers Using</span>
                          <span className="font-semibold">8 / 13</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Services Tab */}
            <TabsContent value="services" className="space-y-6 mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Service Popularity</CardTitle>
                  <p className="text-sm text-muted-foreground">Most booked services across all centers</p>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={servicePopularityData} layout="vertical">
                      <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
                      <XAxis type="number" stroke="#666" style={{ fontSize: '12px' }} />
                      <YAxis dataKey="name" type="category" width={120} stroke="#666" style={{ fontSize: '12px' }} />
                      <Tooltip />
                      <Bar dataKey="bookings" fill="#155DFC" name="Total Bookings" />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {servicePopularityData.slice(0, 3).map((service, index) => (
                  <Card key={index}>
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1">
                          <p className="font-medium mb-1">{service.name}</p>
                          <Badge variant="outline" className="border-border/40">
                            #{index + 1} Most Popular
                          </Badge>
                        </div>
                        <Globe className="h-4 w-4 text-muted-foreground" />
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Bookings</span>
                          <span className="font-semibold">{service.bookings.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Market Share</span>
                          <span className="font-semibold">{service.share}%</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>

          {/* Additional Metrics */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-green-600" />
              Platform Performance
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Monthly Revenue</span>
              <span className="font-semibold">{stats.monthlyRevenue}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Active Bookings</span>
              <span className="font-semibold">{stats.activeBookings}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Platform Uptime</span>
              <span className="font-semibold text-green-600">99.9%</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertCircle className="h-5 w-5 text-orange-600" />
              Recent Activity
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="text-sm">
              <p className="font-medium">New registration from AutoWash Pro</p>
              <p className="text-muted-foreground">2 hours ago</p>
            </div>
            <div className="text-sm">
              <p className="font-medium">Service request: Premium Detailing</p>
              <p className="text-muted-foreground">4 hours ago</p>
            </div>
            <div className="text-sm">
              <p className="font-medium">New customer: 1,247 registered today</p>
              <p className="text-muted-foreground">6 hours ago</p>
            </div>
          </CardContent>
        </Card>
          </div>

          {/* Quick Actions */}
          <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {quickActions.map((action, index) => (
              <div key={index} className="p-4 border border-border rounded-lg space-y-2">
                <h4 className="font-medium">{action.title}</h4>
                <p className="text-sm text-muted-foreground">{action.description}</p>
                <Button variant={action.variant} size="sm" onClick={action.action}>
                  {action.title}
                </Button>
              </div>
            ))}
          </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column - Notifications Sidebar (1/3 width) */}
        {pendingRequests.length > 0 && (
          <div className="lg:col-span-1">
            <Card className="border-[#155DFC]/20 bg-[#155DFC]/5 sticky top-6">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-base flex items-center gap-2">
                    <Bell className="h-4 w-4 text-[#155DFC]" />
                    Notifications
                  </CardTitle>
                  <Badge className="bg-[#155DFC] text-white border-0">
                    {pendingRequests.length}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                {pendingRequests.map((request) => (
                  <Card key={request.id} className="bg-white">
                    <CardContent className="p-3">
                      <div className="space-y-2">
                        <div className="flex items-start gap-2">
                          <div className="flex-shrink-0 size-8 bg-[#155DFC]/10 rounded-lg flex items-center justify-center">
                            <Lightbulb className="h-4 w-4 text-[#155DFC]" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium line-clamp-1">{request.serviceName}</p>
                            <p className="text-xs text-muted-foreground">{request.centerName}</p>
                          </div>
                        </div>
                        <p className="text-xs text-muted-foreground line-clamp-2">
                          {request.description}
                        </p>
                        <div className="flex items-center gap-3 text-xs text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            <span>{request.suggestedDuration}min</span>
                          </div>
                          <div className="font-medium text-foreground">
                            ${request.suggestedPrice}
                          </div>
                        </div>
                        <div className="flex items-center gap-1.5 pt-1">
                          <Button 
                            size="sm" 
                            className="gap-1 bg-[#00a63e] hover:bg-[#00a63e]/90 h-7 text-xs flex-1"
                            onClick={() => onApproveRequest?.(request.id)}
                          >
                            <CheckCircle className="h-3 w-3" />
                            Approve
                          </Button>
                          <Button 
                            size="sm" 
                            variant="outline"
                            className="gap-1 h-7 text-xs"
                            onClick={() => onRejectRequest?.(request.id)}
                          >
                            <XCircle className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={() => onNavigate("service-management")}
                  className="w-full text-[#155DFC] h-8 text-xs"
                >
                  View All Notifications
                </Button>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}