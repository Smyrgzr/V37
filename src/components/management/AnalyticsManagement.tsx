"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { 
  BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, 
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  AreaChart, Area
} from "recharts";
import { 
  TrendingUp, TrendingDown, Calendar, DollarSign, Users, 
  Activity, Package, Star, Clock, MapPin, Car, Zap, Wrench, Truck, Lightbulb, TrendingDown as ArrowDown, AlertCircle, ChevronDown, CheckCircle, Download
} from "lucide-react";
import { Badge } from "../ui/badge";
import { BusinessModule, ModuleConfig, WorkingHours } from "../modules/BusinessModuleSelector";
import { useState } from "react";
import { getModuleName, getModuleConfig, MODULE_CONFIG } from "../../types/business-modules";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";
import { motion, AnimatePresence } from "motion/react";
import { cn } from "../ui/utils";
import { toast } from "sonner@2.0.3";

interface AnalyticsManagementProps {
  analyticsData?: any;
  userRole?: string;
  branches?: any[];
  selectedBranchFilter?: string;
  onBranchFilterChange?: (branchId: string) => void;
}

export function AnalyticsManagement({ 
  analyticsData, 
  userRole, 
  branches = [],
  selectedBranchFilter = "all",
  onBranchFilterChange
}: AnalyticsManagementProps) {
  const [selectedModule, setSelectedModule] = useState<BusinessModule | "all">("all");
  const [showBranchSelector, setShowBranchSelector] = useState(false);

  // Get selected branch
  const selectedBranch = branches.find((b) => b.id === selectedBranchFilter);

  // Get all available modules from branches
  const availableModules: BusinessModule[] = branches 
    ? Array.from(new Set(branches.flatMap(b => b.businessModules || []))) as BusinessModule[]
    : [];

  // Filter function for module-based data
  const filterByModule = (data: any[], moduleKey: string = 'module') => {
    if (selectedModule === "all") return data;
    return data.filter(item => item[moduleKey] === selectedModule);
  };

  // Mock data for charts
  const bookingTrendsData = [
    { date: "Jan 1", bookings: 45, revenue: 1580 },
    { date: "Jan 8", bookings: 52, revenue: 1820 },
    { date: "Jan 15", bookings: 48, revenue: 1680 },
    { date: "Jan 22", bookings: 61, revenue: 2140 },
    { date: "Jan 29", bookings: 55, revenue: 1930 },
    { date: "Feb 5", bookings: 67, revenue: 2350 },
    { date: "Feb 12", bookings: 59, revenue: 2070 },
    { date: "Feb 19", bookings: 71, revenue: 2490 },
    { date: "Feb 26", bookings: 64, revenue: 2240 },
    { date: "Mar 4", bookings: 78, revenue: 2730 },
    { date: "Mar 11", bookings: 82, revenue: 2870 },
    { date: "Mar 18", bookings: 76, revenue: 2660 },
  ];

  const servicePerformanceData = [
    { name: "Premium Wash", bookings: 456, revenue: 20520, avgRating: 4.8 },
    { name: "Basic Wash", bookings: 782, revenue: 19550, avgRating: 4.6 },
    { name: "Full Detailing", bookings: 234, revenue: 35100, avgRating: 4.9 },
    { name: "Interior Clean", bookings: 567, revenue: 19845, avgRating: 4.7 },
    { name: "Express Wash", bookings: 891, revenue: 17820, avgRating: 4.5 },
    { name: "Wax & Polish", bookings: 345, revenue: 29325, avgRating: 4.8 },
  ];

  const vehicleTypeData = [
    { name: "Sedan", value: 42, color: "#155DFC" },
    { name: "SUV", value: 31, color: "#00A63E" },
    { name: "Truck", value: 18, color: "#F54900" },
    { name: "Van", value: 9, color: "#9810FA" },
  ];

  const customerAcquisitionData = [
    { month: "Sep", newCustomers: 87, returning: 234 },
    { month: "Oct", newCustomers: 124, returning: 267 },
    { month: "Nov", newCustomers: 156, returning: 289 },
    { month: "Dec", newCustomers: 198, returning: 312 },
    { month: "Jan", newCustomers: 234, returning: 356 },
    { month: "Feb", newCustomers: 267, returning: 389 },
  ];

  const peakHoursData = [
    { hour: "6 AM", bookings: 12, utilization: 18 },
    { hour: "8 AM", bookings: 28, utilization: 42 },
    { hour: "10 AM", bookings: 45, utilization: 68 },
    { hour: "12 PM", bookings: 52, utilization: 78 },
    { hour: "2 PM", bookings: 67, utilization: 95 },
    { hour: "4 PM", bookings: 58, utilization: 87 },
    { hour: "6 PM", bookings: 71, utilization: 92 },
    { hour: "8 PM", bookings: 34, utilization: 51 },
  ];

  const branchPerformanceData = [
    { branch: "Downtown", bookings: 456, revenue: 34560, rating: 4.8, growth: 15 },
    { branch: "Uptown", bookings: 389, revenue: 29340, rating: 4.7, growth: 12 },
    { branch: "Brooklyn", bookings: 267, revenue: 20070, rating: 4.6, growth: 8 },
  ];

  const COLORS = ["#155DFC", "#00A63E", "#F54900", "#9810FA"];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl hidden md:block">Analytics & Insights</h1>
          <p className="text-muted-foreground hidden md:block">Comprehensive business analytics and performance metrics</p>
        </div>
        <div className="hidden md:flex gap-2">
          <Button variant="outline" onClick={() => toast.info("Exporting analytics report...")}>
            <Download className="h-4 w-4 mr-2" />
            Export Report
          </Button>
        </div>
      </div>

      {/* Mobile: Branch Selector */}
      {branches.length > 0 && (
        <div className="md:hidden relative mb-4">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowBranchSelector(!showBranchSelector)}
            className="h-9 px-3 gap-2"
          >
            <div className="size-5 rounded-full bg-blue-100 flex items-center justify-center">
              <MapPin size={12} className="text-blue-600" />
            </div>
            <span className="text-xs font-medium">
              {selectedBranchFilter === "all"
                ? "All Branches"
                : selectedBranch?.name || "Branch"}
            </span>
            <ChevronDown
              size={14}
              className={cn(
                "transition-transform",
                showBranchSelector && "rotate-180"
              )}
            />
          </Button>

          {/* Branch Dropdown */}
          <AnimatePresence>
            {showBranchSelector && (
              <>
                {/* Backdrop */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="fixed inset-0 z-40"
                  onClick={() => setShowBranchSelector(false)}
                />
                {/* Dropdown */}
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="fixed left-4 right-4 top-[72px] bg-white border border-neutral-200 rounded-lg shadow-lg z-50 overflow-hidden"
                >
                  {/* Header */}
                  <div className="p-3 border-b border-neutral-200">
                    <h3 className="text-sm font-semibold text-neutral-900">Select Branch</h3>
                  </div>
                  
                  {/* Branch List */}
                  <div className="max-h-64 overflow-y-auto">
                    <button
                      onClick={() => {
                        if (onBranchFilterChange) {
                          onBranchFilterChange("all");
                        }
                        setShowBranchSelector(false);
                      }}
                      className={cn(
                        "w-full flex items-center justify-between p-3 transition-colors",
                        selectedBranchFilter === "all"
                          ? "bg-blue-50 text-blue-900"
                          : "hover:bg-neutral-50"
                      )}
                    >
                      <span className="text-sm font-medium">All Branches</span>
                      {selectedBranchFilter === "all" && (
                        <CheckCircle size={16} className="text-blue-600" />
                      )}
                    </button>
                    <Separator />
                    {branches.map((branch) => (
                      <button
                        key={branch.id}
                        onClick={() => {
                          setSelectedBranchFilter(branch.id);
                          setShowBranchSelector(false);
                          if (onBranchFilterChange) {
                            onBranchFilterChange(branch.id);
                          }
                        }}
                        className={cn(
                          "w-full flex items-start justify-between p-3 transition-colors",
                          selectedBranchFilter === branch.id
                            ? "bg-blue-50 text-blue-900"
                            : "hover:bg-neutral-50"
                        )}
                      >
                        <div className="text-left">
                          <p className="text-sm font-semibold">{branch.name}</p>
                          <p className="text-xs text-neutral-600 mt-0.5">{branch.city}</p>
                        </div>
                        {selectedBranchFilter === branch.id && (
                          <CheckCircle size={16} className="text-blue-600 flex-shrink-0 mt-0.5" />
                        )}
                      </button>
                    ))}
                  </div>
                </motion.div>
              </>
            )}
          </AnimatePresence>
        </div>
      )}

      {/* Mobile: Page Title */}
      <div className="md:hidden">
        <h1 className="text-xl font-semibold text-neutral-900">Analytics & Insights</h1>
        <p className="text-sm text-neutral-600 mt-0.5">Business analytics and metrics</p>
      </div>

      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="bg-[#ececf0] p-1 h-9">
          <TabsTrigger value="overview" className="data-[state=active]:bg-white">Overview</TabsTrigger>
          <TabsTrigger value="modules" className="data-[state=active]:bg-white">Business Modules</TabsTrigger>
          <TabsTrigger value="services" className="data-[state=active]:bg-white">Services</TabsTrigger>
          <TabsTrigger value="customers" className="data-[state=active]:bg-white">Customers</TabsTrigger>
          <TabsTrigger value="operations" className="data-[state=active]:bg-white">Operations</TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-6 mt-6">
          {/* Key Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card>
              <CardContent className="p-3">
                <div className="flex items-center justify-between mb-1">
                  <p className="text-sm text-muted-foreground">Total Bookings</p>
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                </div>
                <p className="text-2xl font-semibold">2,845</p>
                <div className="flex items-center gap-1 mt-1">
                  <TrendingUp className="h-3 w-3 text-[#00a63e]" />
                  <p className="text-xs text-[#00a63e]">+12.5% from last month</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-3">
                <div className="flex items-center justify-between mb-1">
                  <p className="text-sm text-muted-foreground">Total Revenue</p>
                  <DollarSign className="h-4 w-4 text-muted-foreground" />
                </div>
                <p className="text-2xl font-semibold">$126,340</p>
                <div className="flex items-center gap-1 mt-1">
                  <TrendingUp className="h-3 w-3 text-[#00a63e]" />
                  <p className="text-xs text-[#00a63e]">+18.2% from last month</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-3">
                <div className="flex items-center justify-between mb-1">
                  <p className="text-sm text-muted-foreground">Active Customers</p>
                  <Users className="h-4 w-4 text-muted-foreground" />
                </div>
                <p className="text-2xl font-semibold">1,234</p>
                <div className="flex items-center gap-1 mt-1">
                  <TrendingUp className="h-3 w-3 text-[#00a63e]" />
                  <p className="text-xs text-[#00a63e]">+8.1% from last month</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-3">
                <div className="flex items-center justify-between mb-1">
                  <p className="text-sm text-muted-foreground">Avg Rating</p>
                  <Star className="h-4 w-4 text-muted-foreground" />
                </div>
                <p className="text-2xl font-semibold">4.7/5</p>
              </CardContent>
            </Card>
          </div>

          {/* Charts Row 1 */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>Booking & Revenue Trends</CardTitle>
                <CardDescription>Daily performance over the last 12 weeks</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <AreaChart data={bookingTrendsData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
                    <XAxis dataKey="date" stroke="#666" style={{ fontSize: '12px' }} />
                    <YAxis yAxisId="left" stroke="#155DFC" style={{ fontSize: '12px' }} />
                    <YAxis yAxisId="right" orientation="right" stroke="#00A63E" style={{ fontSize: '12px' }} />
                    <Tooltip />
                    <Legend />
                    <Area yAxisId="left" type="monotone" dataKey="bookings" stroke="#155DFC" fill="#155DFC" fillOpacity={0.2} name="Bookings" />
                    <Area yAxisId="right" type="monotone" dataKey="revenue" stroke="#00A63E" fill="#00A63E" fillOpacity={0.2} name="Revenue ($)" />
                  </AreaChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Customer Acquisition</CardTitle>
                <CardDescription>New vs returning customers</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={customerAcquisitionData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
                    <XAxis dataKey="month" stroke="#666" style={{ fontSize: '12px' }} />
                    <YAxis stroke="#666" style={{ fontSize: '12px' }} />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="newCustomers" fill="#155DFC" name="New Customers" />
                    <Bar dataKey="returning" fill="#00A63E" name="Returning Customers" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          {/* Charts Row 2 */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Peak Hours Analysis</CardTitle>
                <CardDescription>Bookings and utilization by hour</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={peakHoursData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
                    <XAxis dataKey="hour" stroke="#666" style={{ fontSize: '12px' }} />
                    <YAxis yAxisId="left" stroke="#666" style={{ fontSize: '12px' }} />
                    <YAxis yAxisId="right" orientation="right" stroke="#666" style={{ fontSize: '12px' }} />
                    <Tooltip />
                    <Legend />
                    <Line yAxisId="left" type="monotone" dataKey="bookings" stroke="#155DFC" strokeWidth={2} name="Bookings" />
                    <Line yAxisId="right" type="monotone" dataKey="utilization" stroke="#F54900" strokeWidth={2} name="Utilization %" />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Vehicle Type Distribution</CardTitle>
                <CardDescription>Breakdown by vehicle type</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={vehicleTypeData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={(entry) => `${entry.name} ${entry.value}%`}
                      outerRadius={100}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {vehicleTypeData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Business Modules Tab */}
        <TabsContent value="modules" className="space-y-6 mt-6">
          {branches && branches.length > 0 ? (() => {
            const allModules = branches.flatMap(b => b.businessModules || []);
            const uniqueModules: BusinessModule[] = Array.from(new Set(allModules)) as BusinessModule[];
            
            const getModuleIcon = (moduleId: BusinessModule) => {
              const icons = { in_bay: Car, tunnel: Zap, self_service: Wrench, mobile: Truck, manual_detailing: Users };
              return icons[moduleId];
            };

            const getModuleLabel = (moduleId: BusinessModule) => {
              const labels = { in_bay: "In-Bay Automatic", tunnel: "Tunnel Wash", self_service: "Self-Service", mobile: "Mobile Detailing", manual_detailing: "Manual Detailing" };
              return labels[moduleId];
            };

            const getModuleColor = (moduleId: BusinessModule) => {
              const colors = { in_bay: "#155DFC", tunnel: "#9810FA", self_service: "#00A63E", mobile: "#F54900", manual_detailing: "#FF1744" };
              return colors[moduleId];
            };

            const moduleAnalytics = uniqueModules.map(moduleId => {
              const branchCount = branches.filter(b => b.businessModules?.includes(moduleId)).length;
              return {
                moduleId,
                branchCount,
                bookings: Math.floor(Math.random() * 500) + 200,
                revenue: Math.floor(Math.random() * 50000) + 20000,
                avgRating: (Math.random() * 0.5 + 4.5).toFixed(1),
                growth: Math.floor(Math.random() * 30) + 5,
              };
            });

            const moduleRevenueData = moduleAnalytics.map(m => ({
              name: getModuleLabel(m.moduleId),
              revenue: m.revenue,
              bookings: m.bookings,
            }));

            return (
              <>
                {/* Module Overview Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                  {moduleAnalytics.map(({ moduleId, branchCount, bookings, revenue, avgRating, growth }) => {
                    const Icon = getModuleIcon(moduleId);
                    const color = getModuleColor(moduleId);
                    return (
                      <Card key={moduleId}>
                        <CardContent className="p-4">
                          <div className="flex items-center justify-between mb-2">
                            <Icon className="h-5 w-5" style={{ color }} />
                            <Badge className="bg-green-100 text-green-700 border-green-200 text-xs">
                              +{growth}%
                            </Badge>
                          </div>
                          <p className="text-xs text-muted-foreground mb-1">{getModuleLabel(moduleId)}</p>
                          <p className="text-xl font-semibold mb-2">${(revenue / 1000).toFixed(1)}k</p>
                          <div className="space-y-0.5">
                            <div className="flex justify-between text-xs">
                              <span className="text-muted-foreground">Branches</span>
                              <span className="font-medium">{branchCount}</span>
                            </div>
                            <div className="flex justify-between text-xs">
                              <span className="text-muted-foreground">Bookings</span>
                              <span className="font-medium">{bookings}</span>
                            </div>
                            <div className="flex justify-between text-xs">
                              <span className="text-muted-foreground">Rating</span>
                              <span className="font-medium">{avgRating} ⭐</span>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    );
                  })}
                </div>

                {/* Module Performance Charts */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Module Distribution Across Branches</CardTitle>
                      <CardDescription>How modules are distributed in your branches</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {moduleAnalytics.map(({ moduleId, branchCount }) => {
                          const Icon = getModuleIcon(moduleId);
                          const color = getModuleColor(moduleId);
                          const percentage = ((branchCount / branches.length) * 100).toFixed(0);
                          return (
                            <div key={moduleId} className="space-y-2">
                              <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                  <Icon className="h-4 w-4" style={{ color }} />
                                  <span className="text-sm font-medium">{getModuleLabel(moduleId)}</span>
                                </div>
                                <span className="text-sm text-muted-foreground">
                                  {percentage}% • {branchCount}/{branches.length} branches
                                </span>
                              </div>
                              <div className="h-2 bg-[#ececf0] rounded-full overflow-hidden">
                                <div className="h-full" style={{ width: `${percentage}%`, backgroundColor: color }} />
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Revenue by Business Module</CardTitle>
                      <CardDescription>Comparative revenue performance</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={moduleRevenueData}>
                          <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
                          <XAxis dataKey="name" stroke="#666" style={{ fontSize: '11px' }} angle={-15} textAnchor="end" height={80} />
                          <YAxis stroke="#666" style={{ fontSize: '12px' }} />
                          <Tooltip />
                          <Bar dataKey="revenue" fill="#155DFC" name="Revenue ($)" />
                        </BarChart>
                      </ResponsiveContainer>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Bookings by Business Module</CardTitle>
                      <CardDescription>Booking volume comparison</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={moduleRevenueData}>
                          <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
                          <XAxis dataKey="name" stroke="#666" style={{ fontSize: '11px' }} angle={-15} textAnchor="end" height={80} />
                          <YAxis stroke="#666" style={{ fontSize: '12px' }} />
                          <Tooltip />
                          <Bar dataKey="bookings" fill="#00A63E" name="Bookings" />
                        </BarChart>
                      </ResponsiveContainer>
                    </CardContent>
                  </Card>
                </div>

                {/* Capacity Planning & Insights */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Clock className="h-5 w-5 text-blue-600" />
                        Peak & Low Hours Analysis
                      </CardTitle>
                      <CardDescription>Optimize staffing and pricing based on demand patterns</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {/* Peak Hours */}
                      <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                        <div className="flex items-center gap-2 mb-2">
                          <TrendingUp className="h-4 w-4 text-red-600" />
                          <h4 className="font-medium text-red-900">Peak Hours</h4>
                        </div>
                        <div className="space-y-2">
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-red-800">Weekdays</span>
                            <span className="font-medium text-red-900">2:00 PM - 6:00 PM</span>
                          </div>
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-red-800">Weekends</span>
                            <span className="font-medium text-red-900">10:00 AM - 2:00 PM</span>
                          </div>
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-red-800">Avg Utilization</span>
                            <Badge className="bg-red-600 text-white">92%</Badge>
                          </div>
                        </div>
                      </div>

                      {/* Lowest Hours */}
                      <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                        <div className="flex items-center gap-2 mb-2">
                          <ArrowDown className="h-4 w-4 text-blue-600" />
                          <h4 className="font-medium text-blue-900">Lowest Hours</h4>
                        </div>
                        <div className="space-y-2">
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-blue-800">Weekdays</span>
                            <span className="font-medium text-blue-900">8:00 AM - 10:00 AM</span>
                          </div>
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-blue-800">Weekends</span>
                            <span className="font-medium text-blue-900">6:00 PM - 8:00 PM</span>
                          </div>
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-blue-800">Avg Utilization</span>
                            <Badge className="bg-blue-600 text-white">34%</Badge>
                          </div>
                        </div>
                      </div>

                      {/* Working Days Summary */}
                      <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                        <div className="flex items-center gap-2 mb-2">
                          <Calendar className="h-4 w-4 text-green-600" />
                          <h4 className="font-medium text-green-900">Operating Schedule</h4>
                        </div>
                        <div className="grid grid-cols-7 gap-1 mt-3">
                          {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((day, i) => {
                            const isOpen = i < 7; // All days open for demo
                            return (
                              <div
                                key={i}
                                className={`h-8 flex items-center justify-center rounded text-xs font-medium ${
                                  isOpen ? 'bg-green-600 text-white' : 'bg-gray-200 text-gray-500'
                                }`}
                              >
                                {day}
                              </div>
                            );
                          })}
                        </div>
                        <p className="text-xs text-green-800 mt-2">7 days/week • Avg 11 hours/day</p>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Lightbulb className="h-5 w-5 text-yellow-600" />
                        AI-Powered Insights & Recommendations
                      </CardTitle>
                      <CardDescription>Data-driven suggestions to maximize revenue</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {/* Campaign Suggestions */}
                      <div>
                        <h4 className="font-medium mb-3 flex items-center gap-2">
                          <DollarSign className="h-4 w-4 text-purple-600" />
                          Campaign Suggestions
                        </h4>
                        <div className="space-y-3">
                          <div className="p-3 bg-purple-50 border border-purple-200 rounded-lg">
                            <div className="flex items-start justify-between mb-2">
                              <p className="font-medium text-sm text-purple-900">Early Bird Special</p>
                              <Badge className="bg-purple-600 text-white text-xs">High Impact</Badge>
                            </div>
                            <p className="text-xs text-purple-800 mb-2">
                              Offer 20% off for bookings before 10 AM to boost low-hour utilization
                            </p>
                            <div className="flex items-center gap-2 text-xs text-purple-700">
                              <span>Expected lift: +45% morning bookings</span>
                            </div>
                          </div>

                          <div className="p-3 bg-orange-50 border border-orange-200 rounded-lg">
                            <div className="flex items-start justify-between mb-2">
                              <p className="font-medium text-sm text-orange-900">Weekend Package Deal</p>
                              <Badge className="bg-orange-600 text-white text-xs">Medium Impact</Badge>
                            </div>
                            <p className="text-xs text-orange-800 mb-2">
                              Bundle 2 services for Sunday slots to increase utilization
                            </p>
                            <div className="flex items-center gap-2 text-xs text-orange-700">
                              <span>Expected lift: +28% Sunday revenue</span>
                            </div>
                          </div>

                          <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                            <div className="flex items-start justify-between mb-2">
                              <p className="font-medium text-sm text-blue-900">Loyalty Rewards</p>
                              <Badge className="bg-blue-600 text-white text-xs">High Impact</Badge>
                            </div>
                            <p className="text-xs text-blue-800 mb-2">
                              Introduce points system to increase customer retention by 15%
                            </p>
                            <div className="flex items-center gap-2 text-xs text-blue-700">
                              <span>Expected lift: +15% repeat visits</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Operational Insights */}
                      <div>
                        <h4 className="font-medium mb-3 flex items-center gap-2">
                          <AlertCircle className="h-4 w-4 text-blue-600" />
                          Operational Insights
                        </h4>
                        <div className="space-y-2">
                          <div className="flex items-start gap-2 p-2 bg-yellow-50 border border-yellow-200 rounded text-xs">
                            <AlertCircle className="h-3 w-3 text-yellow-600 mt-0.5 flex-shrink-0" />
                            <span className="text-yellow-900">
                              <strong>Staff Optimization:</strong> Reduce staff by 2 during 8-10 AM to cut costs by $450/week
                            </span>
                          </div>
                          <div className="flex items-start gap-2 p-2 bg-green-50 border border-green-200 rounded text-xs">
                            <TrendingUp className="h-3 w-3 text-green-600 mt-0.5 flex-shrink-0" />
                            <span className="text-green-900">
                              <strong>Capacity Opportunity:</strong> Peak hours at 92% - consider adding 1 bay to capture demand
                            </span>
                          </div>
                          <div className="flex items-start gap-2 p-2 bg-blue-50 border border-blue-200 rounded text-xs">
                            <Lightbulb className="h-3 w-3 text-blue-600 mt-0.5 flex-shrink-0" />
                            <span className="text-blue-900">
                              <strong>Dynamic Pricing:</strong> Implement surge pricing (15% premium) during 2-6 PM for +$2.8k/month
                            </span>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </>
            );
          })() : (
            <Card>
              <CardContent className="p-12 text-center">
                <p className="text-muted-foreground">No business module data available. Add modules to your branches to see analytics.</p>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        {/* Services Tab */}
        <TabsContent value="services" className="space-y-6 mt-6">
          {/* Module Filter */}
          {branches && branches.length > 0 && (() => {
            const allModules = branches.flatMap(b => b.businessModules || []);
            const uniqueModules: BusinessModule[] = Array.from(new Set(allModules)) as BusinessModule[];
            
            if (uniqueModules.length === 0) return null;

            const getModuleIcon = (moduleId: BusinessModule) => {
              const icons = { in_bay: Car, tunnel: Zap, self_service: Wrench, mobile: Truck, manual_detailing: Users };
              return icons[moduleId];
            };

            const getModuleLabel = (moduleId: BusinessModule) => {
              const labels = { in_bay: "In-Bay Automatic", tunnel: "Tunnel Wash", self_service: "Self-Service", mobile: "Mobile Detailing", manual_detailing: "Manual Detailing" };
              return labels[moduleId];
            };

            return (
              <Card className="bg-blue-50 border-blue-200">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Package className="h-4 w-4 text-blue-600" />
                      <span className="text-sm font-medium text-blue-900">Filter by Business Module</span>
                    </div>
                    <Select value={selectedModule} onValueChange={(value) => setSelectedModule(value as BusinessModule | "all")}>
                      <SelectTrigger className="w-[220px] bg-white">
                        <SelectValue placeholder="Select module" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Modules</SelectItem>
                        {uniqueModules.map((moduleId) => {
                          const Icon = getModuleIcon(moduleId);
                          return (
                            <SelectItem key={moduleId} value={moduleId}>
                              <div className="flex items-center gap-2">
                                <Icon className="h-4 w-4" />
                                <span>{getModuleLabel(moduleId)}</span>
                              </div>
                            </SelectItem>
                          );
                        })}
                      </SelectContent>
                    </Select>
                  </div>
                </CardContent>
              </Card>
            );
          })()}

          <Card>
            <CardHeader>
              <CardTitle>Service Performance</CardTitle>
              <CardDescription>Top performing services by bookings and revenue</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <BarChart data={servicePerformanceData} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
                  <XAxis type="number" stroke="#666" style={{ fontSize: '12px' }} />
                  <YAxis dataKey="name" type="category" width={120} stroke="#666" style={{ fontSize: '12px' }} />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="bookings" fill="#155DFC" name="Bookings" />
                  <Bar dataKey="revenue" fill="#00A63E" name="Revenue ($)" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {servicePerformanceData.map((service, index) => (
              <Card key={index}>
                <CardContent className="p-4">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1">
                      <p className="font-medium mb-0.5 text-sm">{service.name}</p>
                      <div className="flex items-center gap-1">
                        <Star className="h-3 w-3 fill-[#fbbf24] text-[#fbbf24]" />
                        <span className="text-xs">{service.avgRating}</span>
                      </div>
                    </div>
                    <Package className="h-4 w-4 text-muted-foreground" />
                  </div>
                  <div className="space-y-1">
                    <div className="flex justify-between text-xs">
                      <span className="text-muted-foreground">Bookings</span>
                      <span className="font-medium">{service.bookings}</span>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span className="text-muted-foreground">Revenue</span>
                      <span className="font-medium">${service.revenue.toLocaleString()}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Customers Tab */}
        <TabsContent value="customers" className="space-y-6 mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-sm text-muted-foreground">Total Customers</p>
                  <Users className="h-4 w-4 text-muted-foreground" />
                </div>
                <p className="text-2xl font-semibold">1,234</p>
                <p className="text-xs text-muted-foreground mt-1">856 active this month</p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-sm text-muted-foreground">New This Month</p>
                  <TrendingUp className="h-4 w-4 text-muted-foreground" />
                </div>
                <p className="text-2xl font-semibold">267</p>
                <div className="flex items-center gap-1 mt-1">
                  <TrendingUp className="h-3 w-3 text-[#00a63e]" />
                  <p className="text-xs text-[#00a63e]">+22% from last month</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-sm text-muted-foreground">Retention Rate</p>
                  <Activity className="h-4 w-4 text-muted-foreground" />
                </div>
                <p className="text-2xl font-semibold">84%</p>
                <p className="text-xs text-muted-foreground mt-1">Above industry avg</p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-sm text-muted-foreground">Avg Lifetime Value</p>
                  <DollarSign className="h-4 w-4 text-muted-foreground" />
                </div>
                <p className="text-2xl font-semibold">$456</p>
                <div className="flex items-center gap-1 mt-1">
                  <TrendingUp className="h-3 w-3 text-[#00a63e]" />
                  <p className="text-xs text-[#00a63e]">+15% from last month</p>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Customer Segments</CardTitle>
              <CardDescription>Distribution by visit frequency</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">VIP (10+ visits)</span>
                    <span className="text-sm text-muted-foreground">18% • 222 customers</span>
                  </div>
                  <div className="h-2 bg-[#ececf0] rounded-full overflow-hidden">
                    <div className="h-full bg-[#9810FA]" style={{ width: '18%' }} />
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Frequent (5-9 visits)</span>
                    <span className="text-sm text-muted-foreground">32% • 395 customers</span>
                  </div>
                  <div className="h-2 bg-[#ececf0] rounded-full overflow-hidden">
                    <div className="h-full bg-[#155DFC]" style={{ width: '32%' }} />
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Regular (2-4 visits)</span>
                    <span className="text-sm text-muted-foreground">35% • 432 customers</span>
                  </div>
                  <div className="h-2 bg-[#ececf0] rounded-full overflow-hidden">
                    <div className="h-full bg-[#00A63E]" style={{ width: '35%' }} />
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">New (1 visit)</span>
                    <span className="text-sm text-muted-foreground">15% • 185 customers</span>
                  </div>
                  <div className="h-2 bg-[#ececf0] rounded-full overflow-hidden">
                    <div className="h-full bg-[#F54900]" style={{ width: '15%' }} />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Operations Tab */}
        <TabsContent value="operations" className="space-y-6 mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-sm text-muted-foreground">Avg Wait Time</p>
                  <Clock className="h-4 w-4 text-muted-foreground" />
                </div>
                <p className="text-2xl font-semibold">8 min</p>
                <div className="flex items-center gap-1 mt-1">
                  <TrendingDown className="h-3 w-3 text-[#00a63e]" />
                  <p className="text-xs text-[#00a63e]">-12% improvement</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-sm text-muted-foreground">Capacity Usage</p>
                  <Activity className="h-4 w-4 text-muted-foreground" />
                </div>
                <p className="text-2xl font-semibold">78%</p>
                <p className="text-xs text-muted-foreground mt-1">22% available capacity</p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-sm text-muted-foreground">Completion Rate</p>
                  <TrendingUp className="h-4 w-4 text-muted-foreground" />
                </div>
                <p className="text-2xl font-semibold">94%</p>
                <div className="flex items-center gap-1 mt-1">
                  <TrendingUp className="h-3 w-3 text-[#00a63e]" />
                  <p className="text-xs text-[#00a63e]">+3% from last month</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-sm text-muted-foreground">No-Show Rate</p>
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                </div>
                <p className="text-2xl font-semibold">3.2%</p>
                <div className="flex items-center gap-1 mt-1">
                  <TrendingDown className="h-3 w-3 text-[#00a63e]" />
                  <p className="text-xs text-[#00a63e]">-0.5% improvement</p>
                </div>
              </CardContent>
            </Card>
          </div>

          {userRole !== "carwash_admin" && (
            <Card>
              <CardHeader>
                <CardTitle>Branch Performance</CardTitle>
                <CardDescription>Comparative performance across branches</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {branchPerformanceData.map((branch, index) => (
                    <div key={index} className="border border-border rounded-lg p-4">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-2">
                          <MapPin className="h-4 w-4 text-muted-foreground" />
                          <span className="font-medium">{branch.branch}</span>
                        </div>
                        <Badge className={`${branch.growth >= 12 ? 'bg-[#00a63e]' : 'bg-[#fbbf24]'} text-white border-0`}>
                          +{branch.growth}% Growth
                        </Badge>
                      </div>
                      <div className="grid grid-cols-3 gap-4">
                        <div>
                          <p className="text-xs text-muted-foreground mb-1">Bookings</p>
                          <p className="text-lg font-semibold">{branch.bookings}</p>
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground mb-1">Revenue</p>
                          <p className="text-lg font-semibold">${branch.revenue.toLocaleString()}</p>
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground mb-1">Rating</p>
                          <div className="flex items-center gap-1">
                            <Star className="h-4 w-4 fill-[#fbbf24] text-[#fbbf24]" />
                            <p className="text-lg font-semibold">{branch.rating}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}