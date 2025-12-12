"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import {
  Activity,
  AlertCircle,
  AlertTriangle,
  BarChart3,
  Calendar,
  CheckCircle,
  Clock,
  DollarSign,
  MapPin,
  Radio,
  Settings,
  Target,
  TrendingUp,
  Users,
  Wrench,
  Zap,
  Timer,
  Gauge,
} from "lucide-react";
import { BusinessModule } from "../modules/BusinessModuleSelector";

interface Branch {
  id: string;
  name: string;
  businessModules?: BusinessModule[];
  bays?: BayConfig[];
}

interface BayConfig {
  id: string;
  name: string;
  type: "automatic" | "manual" | "self-service" | "detail-bay";
  status: "available" | "in-service" | "waiting" | "maintenance" | "offline";
  currentCustomer?: {
    name: string;
    service: string;
    startTime: string;
    estimatedEnd: string;
    progress: number; // 0-100
  };
  todayStats: {
    servicesCompleted: number;
    utilizationRate: number;
    avgServiceTime: number;
    revenue: number;
  };
}

interface CapacitySnapshot {
  timestamp: string;
  totalCapacity: number;
  inUse: number;
  available: number;
  maintenance: number;
  utilizationRate: number;
}

interface HourlyCapacity {
  hour: string;
  capacity: number;
  booked: number;
  walkIns: number;
  available: number;
  utilizationRate: number;
  revenue: number;
}

interface CapacityManagementProps {
  branches: Branch[];
  selectedBranchId?: string;
  onBranchChange?: (branchId: string) => void;
}

export function CapacityManagement({
  branches,
  selectedBranchId,
  onBranchChange,
}: CapacityManagementProps) {
  const [selectedBranch, setSelectedBranch] = useState<string>(
    selectedBranchId || (branches && branches.length > 0 ? branches[0].id : "")
  );
  const [selectedView, setSelectedView] = useState<"realtime" | "planning">("realtime");

  // Early return if no branches
  if (!branches || branches.length === 0) {
    return (
      <div className="p-6">
        <Card>
          <CardContent className="p-12 text-center">
            <AlertCircle className="size-12 mx-auto mb-4 text-neutral-400" />
            <h3 className="text-lg font-semibold mb-2">No Branches Available</h3>
            <p className="text-neutral-600">Please add a branch to view capacity management.</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Mock data - Real-time bay status
  const mockBays: BayConfig[] = [
    {
      id: "bay1",
      name: "Bay 1 - Express",
      type: "automatic",
      status: "in-service",
      currentCustomer: {
        name: "John Smith",
        service: "Basic Wash",
        startTime: "10:15 AM",
        estimatedEnd: "10:35 AM",
        progress: 75,
      },
      todayStats: {
        servicesCompleted: 12,
        utilizationRate: 89,
        avgServiceTime: 18,
        revenue: 360,
      },
    },
    {
      id: "bay2",
      name: "Bay 2 - Premium",
      type: "automatic",
      status: "in-service",
      currentCustomer: {
        name: "Sarah Johnson",
        service: "Premium Detail",
        startTime: "9:45 AM",
        estimatedEnd: "11:00 AM",
        progress: 45,
      },
      todayStats: {
        servicesCompleted: 8,
        utilizationRate: 92,
        avgServiceTime: 45,
        revenue: 520,
      },
    },
    {
      id: "bay3",
      name: "Bay 3 - Standard",
      type: "automatic",
      status: "available",
      todayStats: {
        servicesCompleted: 10,
        utilizationRate: 65,
        avgServiceTime: 22,
        revenue: 300,
      },
    },
    {
      id: "bay4",
      name: "Bay 4 - Quick Service",
      type: "automatic",
      status: "waiting",
      todayStats: {
        servicesCompleted: 15,
        utilizationRate: 95,
        avgServiceTime: 15,
        revenue: 450,
      },
    },
    {
      id: "bay5",
      name: "Detail Bay 1",
      type: "detail-bay",
      status: "in-service",
      currentCustomer: {
        name: "Mike Wilson",
        service: "Interior Detailing",
        startTime: "8:00 AM",
        estimatedEnd: "12:00 PM",
        progress: 60,
      },
      todayStats: {
        servicesCompleted: 2,
        utilizationRate: 85,
        avgServiceTime: 180,
        revenue: 280,
      },
    },
    {
      id: "bay6",
      name: "Self-Service 1",
      type: "self-service",
      status: "available",
      todayStats: {
        servicesCompleted: 18,
        utilizationRate: 72,
        avgServiceTime: 25,
        revenue: 270,
      },
    },
    {
      id: "bay7",
      name: "Bay 7 - Maintenance",
      type: "automatic",
      status: "maintenance",
      todayStats: {
        servicesCompleted: 0,
        utilizationRate: 0,
        avgServiceTime: 0,
        revenue: 0,
      },
    },
  ];

  // Mock hourly capacity data
  const hourlyCapacityData: HourlyCapacity[] = [
    { hour: "8:00 AM", capacity: 7, booked: 4, walkIns: 1, available: 2, utilizationRate: 71, revenue: 180 },
    { hour: "9:00 AM", capacity: 7, booked: 6, walkIns: 1, available: 0, utilizationRate: 100, revenue: 280 },
    { hour: "10:00 AM", capacity: 7, booked: 5, walkIns: 2, available: 0, utilizationRate: 100, revenue: 315 },
    { hour: "11:00 AM", capacity: 7, booked: 6, walkIns: 1, available: 0, utilizationRate: 100, revenue: 350 },
    { hour: "12:00 PM", capacity: 7, booked: 4, walkIns: 1, available: 2, utilizationRate: 71, revenue: 225 },
    { hour: "1:00 PM", capacity: 7, booked: 3, walkIns: 2, available: 2, utilizationRate: 71, revenue: 200 },
    { hour: "2:00 PM", capacity: 7, booked: 5, walkIns: 2, available: 0, utilizationRate: 100, revenue: 315 },
    { hour: "3:00 PM", capacity: 7, booked: 6, walkIns: 0, available: 1, utilizationRate: 86, revenue: 270 },
    { hour: "4:00 PM", capacity: 7, booked: 5, walkIns: 1, available: 1, utilizationRate: 86, revenue: 270 },
    { hour: "5:00 PM", capacity: 7, booked: 4, walkIns: 2, available: 1, utilizationRate: 86, revenue: 270 },
  ];

  const getStatusColor = (status: BayConfig["status"]) => {
    switch (status) {
      case "available":
        return "bg-green-100 text-green-700 border-green-200";
      case "in-service":
        return "bg-blue-100 text-blue-700 border-blue-200";
      case "waiting":
        return "bg-orange-100 text-orange-700 border-orange-200";
      case "maintenance":
        return "bg-red-100 text-red-700 border-red-200";
      case "offline":
        return "bg-gray-100 text-gray-700 border-gray-200";
      default:
        return "bg-gray-100 text-gray-700 border-gray-200";
    }
  };

  const getStatusIcon = (status: BayConfig["status"]) => {
    switch (status) {
      case "available":
        return <CheckCircle className="h-4 w-4" />;
      case "in-service":
        return <Activity className="h-4 w-4" />;
      case "waiting":
        return <Clock className="h-4 w-4" />;
      case "maintenance":
        return <Wrench className="h-4 w-4" />;
      case "offline":
        return <AlertCircle className="h-4 w-4" />;
      default:
        return <AlertCircle className="h-4 w-4" />;
    }
  };

  const getStatusLabel = (status: BayConfig["status"]) => {
    switch (status) {
      case "available":
        return "Available";
      case "in-service":
        return "In Service";
      case "waiting":
        return "Customer Waiting";
      case "maintenance":
        return "Maintenance";
      case "offline":
        return "Offline";
      default:
        return "Unknown";
    }
  };

  // Calculate real-time statistics
  const realtimeStats = {
    totalBays: mockBays.length,
    inService: mockBays.filter((b) => b.status === "in-service").length,
    available: mockBays.filter((b) => b.status === "available").length,
    waiting: mockBays.filter((b) => b.status === "waiting").length,
    maintenance: mockBays.filter((b) => b.status === "maintenance").length,
    avgUtilization: Math.round(
      mockBays.reduce((acc, bay) => acc + bay.todayStats.utilizationRate, 0) /
        mockBays.filter((b) => b.status !== "maintenance").length
    ),
    totalRevenue: mockBays.reduce((acc, bay) => acc + bay.todayStats.revenue, 0),
    servicesCompleted: mockBays.reduce(
      (acc, bay) => acc + bay.todayStats.servicesCompleted,
      0
    ),
  };

  const utilizationRate = Math.round(
    ((realtimeStats.inService + realtimeStats.waiting) /
      (realtimeStats.totalBays - realtimeStats.maintenance)) *
      100
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl">Capacity Management</h2>
          <p className="text-muted-foreground mt-2">
            Real-time bay utilization and capacity planning
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Select value={selectedBranch} onValueChange={(value) => {
            setSelectedBranch(value);
            onBranchChange?.(value);
          }}>
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Select branch" />
            </SelectTrigger>
            <SelectContent>
              {branches.map((branch) => (
                <SelectItem key={branch.id} value={branch.id}>
                  {branch.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Badge className="bg-[#155DFC] text-white border-0 animate-pulse">
            LIVE
          </Badge>
        </div>
      </div>

      {/* Real-Time Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm text-muted-foreground">Total Capacity</p>
              <MapPin className="h-4 w-4 text-muted-foreground" />
            </div>
            <p className="text-2xl font-semibold">{realtimeStats.totalBays} Bays</p>
            <p className="text-xs text-muted-foreground mt-1">
              {realtimeStats.totalBays - realtimeStats.maintenance} operational
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm text-muted-foreground">Current Utilization</p>
              <Gauge className="h-4 w-4 text-muted-foreground" />
            </div>
            <p className="text-2xl font-semibold">{utilizationRate}%</p>
            <div className="flex items-center gap-1 mt-1">
              {utilizationRate >= 90 ? (
                <>
                  <TrendingUp className="h-3 w-3 text-red-600" />
                  <p className="text-xs text-red-600">At capacity</p>
                </>
              ) : (
                <>
                  <TrendingUp className="h-3 w-3 text-[#00a63e]" />
                  <p className="text-xs text-[#00a63e]">Optimal range</p>
                </>
              )}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm text-muted-foreground">Services Today</p>
              <Activity className="h-4 w-4 text-muted-foreground" />
            </div>
            <p className="text-2xl font-semibold">{realtimeStats.servicesCompleted}</p>
            <p className="text-xs text-muted-foreground mt-1">
              {realtimeStats.inService} in progress
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm text-muted-foreground">Revenue Today</p>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </div>
            <p className="text-2xl font-semibold">${realtimeStats.totalRevenue}</p>
            <div className="flex items-center gap-1 mt-1">
              <TrendingUp className="h-3 w-3 text-[#00a63e]" />
              <p className="text-xs text-[#00a63e]">+18% vs yesterday</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Tabs */}
      <Tabs defaultValue="realtime" className="w-full">
        <TabsList className="bg-[#ececf0] p-1 h-9">
          <TabsTrigger value="realtime" className="data-[state=active]:bg-white">
            Real-Time Status
          </TabsTrigger>
          <TabsTrigger value="planning" className="data-[state=active]:bg-white">
            Capacity Planning
          </TabsTrigger>
          <TabsTrigger value="analytics" className="data-[state=active]:bg-white">
            Analytics
          </TabsTrigger>
          <TabsTrigger value="settings" className="data-[state=active]:bg-white">
            Settings
          </TabsTrigger>
        </TabsList>

        {/* Real-Time Status Tab */}
        <TabsContent value="realtime" className="space-y-6 mt-6">
          {/* Bay Status Grid */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <Radio className="h-5 w-5 text-[#155DFC] animate-pulse" />
                  Live Bay Status
                </CardTitle>
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="border-green-200 text-green-700">
                    <CheckCircle className="h-3 w-3 mr-1" />
                    {realtimeStats.available} Available
                  </Badge>
                  <Badge variant="outline" className="border-blue-200 text-blue-700">
                    <Activity className="h-3 w-3 mr-1" />
                    {realtimeStats.inService} In Service
                  </Badge>
                  {realtimeStats.waiting > 0 && (
                    <Badge variant="outline" className="border-orange-200 text-orange-700">
                      <Clock className="h-3 w-3 mr-1" />
                      {realtimeStats.waiting} Waiting
                    </Badge>
                  )}
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {mockBays.map((bay) => (
                  <Card
                    key={bay.id}
                    className={`border-2 ${
                      bay.status === "available"
                        ? "border-green-200 bg-green-50"
                        : bay.status === "in-service"
                        ? "border-blue-200 bg-blue-50"
                        : bay.status === "waiting"
                        ? "border-orange-200 bg-orange-50"
                        : bay.status === "maintenance"
                        ? "border-red-200 bg-red-50"
                        : "border-gray-200 bg-gray-50"
                    }`}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h4 className="font-semibold">{bay.name}</h4>
                          <p className="text-xs text-muted-foreground capitalize">
                            {bay.type.replace("-", " ")}
                          </p>
                        </div>
                        <Badge
                          variant="outline"
                          className={`${getStatusColor(bay.status)} flex items-center gap-1`}
                        >
                          {getStatusIcon(bay.status)}
                          {getStatusLabel(bay.status)}
                        </Badge>
                      </div>

                      {bay.currentCustomer && (
                        <div className="bg-white rounded-lg p-3 mb-3 border">
                          <div className="flex items-start justify-between mb-2">
                            <div className="flex-1">
                              <p className="text-sm font-medium">
                                {bay.currentCustomer.name}
                              </p>
                              <p className="text-xs text-muted-foreground">
                                {bay.currentCustomer.service}
                              </p>
                            </div>
                          </div>
                          <div className="space-y-2">
                            <div className="flex items-center justify-between text-xs">
                              <span className="text-muted-foreground">Started:</span>
                              <span className="font-medium">
                                {bay.currentCustomer.startTime}
                              </span>
                            </div>
                            <div className="flex items-center justify-between text-xs">
                              <span className="text-muted-foreground">Est. End:</span>
                              <span className="font-medium">
                                {bay.currentCustomer.estimatedEnd}
                              </span>
                            </div>
                            <div>
                              <div className="flex items-center justify-between text-xs mb-1">
                                <span className="text-muted-foreground">Progress:</span>
                                <span className="font-medium">
                                  {bay.currentCustomer.progress}%
                                </span>
                              </div>
                              <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                                <div
                                  className="h-full bg-blue-500 transition-all"
                                  style={{ width: `${bay.currentCustomer.progress}%` }}
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      )}

                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-xs">
                          <span className="text-muted-foreground">Today's Services:</span>
                          <span className="font-semibold">
                            {bay.todayStats.servicesCompleted}
                          </span>
                        </div>
                        <div className="flex items-center justify-between text-xs">
                          <span className="text-muted-foreground">Utilization:</span>
                          <span className="font-semibold">
                            {bay.todayStats.utilizationRate}%
                          </span>
                        </div>
                        <div className="flex items-center justify-between text-xs">
                          <span className="text-muted-foreground">Revenue:</span>
                          <span className="font-semibold text-green-600">
                            ${bay.todayStats.revenue}
                          </span>
                        </div>
                      </div>

                      {bay.status === "available" && (
                        <Button size="sm" className="w-full mt-3">
                          Assign Customer
                        </Button>
                      )}
                      {bay.status === "in-service" && (
                        <Button size="sm" variant="outline" className="w-full mt-3">
                          View Details
                        </Button>
                      )}
                      {bay.status === "maintenance" && (
                        <Button
                          size="sm"
                          variant="outline"
                          className="w-full mt-3 border-red-200 text-red-600"
                        >
                          Mark as Operational
                        </Button>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Capacity Insights */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="border-orange-200 bg-orange-50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-base">
                  <AlertTriangle className="h-5 w-5 text-orange-600" />
                  Capacity Alerts
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="bg-white rounded-lg p-3 border border-red-200">
                    <div className="flex items-start gap-2">
                      <div className="size-8 bg-red-100 rounded-lg flex items-center justify-center flex-shrink-0">
                        <AlertCircle className="h-4 w-4 text-red-600" />
                      </div>
                      <div className="flex-1">
                        <p className="font-medium text-sm">Bay 3 Underutilized</p>
                        <p className="text-xs text-muted-foreground mt-1">
                          Only 65% utilization. Idle for 2 hours total today.
                        </p>
                        <p className="text-xs font-semibold text-red-600 mt-1">
                          Revenue opportunity: $120
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="bg-white rounded-lg p-3 border border-yellow-200">
                    <div className="flex items-start gap-2">
                      <div className="size-8 bg-yellow-100 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Clock className="h-4 w-4 text-yellow-600" />
                      </div>
                      <div className="flex-1">
                        <p className="font-medium text-sm">Peak Hour Approaching</p>
                        <p className="text-xs text-muted-foreground mt-1">
                          11 AM typically reaches 100% capacity. 3 bays available now.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-blue-200 bg-blue-50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-base">
                  <Target className="h-5 w-5 text-blue-600" />
                  Performance Highlights
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="bg-white rounded-lg p-3 border border-green-200">
                    <div className="flex items-start gap-2">
                      <div className="size-8 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Zap className="h-4 w-4 text-green-600" />
                      </div>
                      <div className="flex-1">
                        <p className="font-medium text-sm">Bay 2 Top Performer</p>
                        <p className="text-xs text-muted-foreground mt-1">
                          92% utilization, $520 revenue. 8 services completed.
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="bg-white rounded-lg p-3 border border-blue-200">
                    <div className="flex items-start gap-2">
                      <div className="size-8 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Timer className="h-4 w-4 text-blue-600" />
                      </div>
                      <div className="flex-1">
                        <p className="font-medium text-sm">Efficient Service Times</p>
                        <p className="text-xs text-muted-foreground mt-1">
                          Average service time: 22 mins (Target: 25 mins)
                        </p>
                        <p className="text-xs font-semibold text-green-600 mt-1">
                          12% faster than target
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Capacity Planning Tab */}
        <TabsContent value="planning" className="space-y-6 mt-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5 text-purple-600" />
                Hourly Capacity Planning
              </CardTitle>
              <p className="text-sm text-muted-foreground">
                Optimize capacity allocation throughout the day
              </p>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {hourlyCapacityData.map((slot, index) => (
                  <div
                    key={index}
                    className={`flex items-center gap-4 p-4 rounded-lg border ${
                      slot.utilizationRate >= 100
                        ? "bg-red-50 border-red-200"
                        : slot.utilizationRate >= 85
                        ? "bg-orange-50 border-orange-200"
                        : "bg-white border-border"
                    }`}
                  >
                    <div className="w-24">
                      <p className="font-semibold">{slot.hour}</p>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <div className="flex-1">
                          <div className="flex items-center justify-between text-xs mb-1">
                            <span className="text-muted-foreground">Capacity</span>
                            <span className="font-medium">
                              {slot.booked + slot.walkIns}/{slot.capacity}
                            </span>
                          </div>
                          <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                            <div
                              className={`h-full transition-all ${
                                slot.utilizationRate >= 100
                                  ? "bg-red-500"
                                  : slot.utilizationRate >= 85
                                  ? "bg-orange-500"
                                  : "bg-blue-500"
                              }`}
                              style={{ width: `${Math.min(slot.utilizationRate, 100)}%` }}
                            />
                          </div>
                        </div>
                        <Badge
                          variant="outline"
                          className={`${
                            slot.utilizationRate >= 100
                              ? "bg-red-100 text-red-700 border-red-200"
                              : slot.utilizationRate >= 85
                              ? "bg-orange-100 text-orange-700 border-orange-200"
                              : "bg-blue-100 text-blue-700 border-blue-200"
                          }`}
                        >
                          {slot.utilizationRate}%
                        </Badge>
                      </div>
                      <div className="flex items-center gap-6 text-xs">
                        <div className="flex items-center gap-1">
                          <div className="size-2 rounded-full bg-blue-500" />
                          <span className="text-muted-foreground">Booked: {slot.booked}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <div className="size-2 rounded-full bg-green-500" />
                          <span className="text-muted-foreground">Walk-ins: {slot.walkIns}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <div className="size-2 rounded-full bg-gray-300" />
                          <span className="text-muted-foreground">
                            Available: {slot.available}
                          </span>
                        </div>
                        <div className="ml-auto">
                          <span className="text-muted-foreground">Revenue:</span>{" "}
                          <span className="font-semibold text-green-600">
                            ${slot.revenue}
                          </span>
                        </div>
                      </div>
                    </div>
                    {slot.utilizationRate >= 100 && (
                      <Badge className="bg-red-500 text-white border-0">FULL</Badge>
                    )}
                    {slot.utilizationRate < 50 && (
                      <Badge className="bg-yellow-500 text-white border-0">LOW</Badge>
                    )}
                  </div>
                ))}
              </div>

              <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <div className="flex items-start gap-3">
                  <div className="size-8 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Zap className="h-4 w-4 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-sm">Capacity Optimization Tip</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      9 AM, 10 AM, 11 AM, and 2 PM are at 100% capacity. Consider:
                    </p>
                    <ul className="text-xs text-muted-foreground mt-2 space-y-1 list-disc list-inside">
                      <li>Add temporary bay during peak hours</li>
                      <li>Offer discounts for 12 PM and 1 PM slots (currently 71% capacity)</li>
                      <li>Block walk-ins during 100% hours for better planning</li>
                    </ul>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Capacity Recommendations */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Revenue Opportunities</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                    <p className="font-medium text-sm">Low-Demand Hours</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      12 PM and 1 PM slots at 71% capacity
                    </p>
                    <p className="text-xs font-semibold text-green-600 mt-2">
                      Potential: +$280/day with 20% discount campaign
                    </p>
                  </div>
                  <div className="p-3 bg-purple-50 border border-purple-200 rounded-lg">
                    <p className="font-medium text-sm">Weekend Expansion</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      Saturday mornings show high walk-in demand
                    </p>
                    <p className="text-xs font-semibold text-purple-600 mt-2">
                      Potential: +$450/week by opening 1 hour earlier
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-base">Efficiency Improvements</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="p-3 bg-orange-50 border border-orange-200 rounded-lg">
                    <p className="font-medium text-sm">Reduce Service Time</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      Bay 2 averages 45 mins vs 40 min target
                    </p>
                    <p className="text-xs font-semibold text-orange-600 mt-2">
                      Impact: +2 services/day if optimized
                    </p>
                  </div>
                  <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                    <p className="font-medium text-sm">Balance Bay Loads</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      Bay 4 at 95% vs Bay 3 at 65% utilization
                    </p>
                    <p className="text-xs font-semibold text-blue-600 mt-2">
                      Impact: Better customer distribution, less wait time
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Analytics Tab */}
        <TabsContent value="analytics" className="space-y-6 mt-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5 text-purple-600" />
                Capacity Analytics
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg border border-blue-200">
                  <p className="text-sm text-muted-foreground mb-1">Average Utilization</p>
                  <p className="text-3xl font-bold text-blue-600">
                    {realtimeStats.avgUtilization}%
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">This week</p>
                </div>
                <div className="p-4 bg-gradient-to-br from-green-50 to-emerald-50 rounded-lg border border-green-200">
                  <p className="text-sm text-muted-foreground mb-1">Peak Efficiency</p>
                  <p className="text-3xl font-bold text-green-600">95%</p>
                  <p className="text-xs text-muted-foreground mt-1">Best performing bay</p>
                </div>
                <div className="p-4 bg-gradient-to-br from-purple-50 to-pink-50 rounded-lg border border-purple-200">
                  <p className="text-sm text-muted-foreground mb-1">Revenue per Bay</p>
                  <p className="text-3xl font-bold text-purple-600">$257</p>
                  <p className="text-xs text-muted-foreground mt-1">Daily average</p>
                </div>
              </div>

              <div className="mt-6 p-4 border rounded-lg">
                <p className="font-medium mb-3">Top Performing Bays (Last 7 Days)</p>
                <div className="space-y-3">
                  {[
                    { name: "Bay 2 - Premium", utilization: 92, revenue: 3640, services: 56 },
                    { name: "Bay 4 - Quick Service", utilization: 95, revenue: 3150, services: 105 },
                    { name: "Bay 1 - Express", utilization: 89, revenue: 2520, services: 84 },
                  ].map((bay, index) => (
                    <div key={index} className="flex items-center gap-4">
                      <div className="size-8 bg-blue-100 rounded-lg flex items-center justify-center">
                        <span className="font-bold text-blue-600">#{index + 1}</span>
                      </div>
                      <div className="flex-1">
                        <p className="font-medium text-sm">{bay.name}</p>
                        <div className="flex items-center gap-4 text-xs text-muted-foreground mt-1">
                          <span>Utilization: {bay.utilization}%</span>
                          <span>Revenue: ${bay.revenue}</span>
                          <span>Services: {bay.services}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Settings Tab */}
        <TabsContent value="settings" className="space-y-6 mt-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings className="h-5 w-5" />
                Capacity Settings
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-4 border rounded-lg">
                  <h4 className="font-medium mb-2">Bay Configuration</h4>
                  <p className="text-sm text-muted-foreground mb-3">
                    Configure your bay types and capacity limits
                  </p>
                  <Button variant="outline">Configure Bays</Button>
                </div>
                <div className="p-4 border rounded-lg">
                  <h4 className="font-medium mb-2">Operating Hours</h4>
                  <p className="text-sm text-muted-foreground mb-3">
                    Set daily operating hours and capacity schedules
                  </p>
                  <Button variant="outline">Manage Hours</Button>
                </div>
                <div className="p-4 border rounded-lg">
                  <h4 className="font-medium mb-2">Alerts & Notifications</h4>
                  <p className="text-sm text-muted-foreground mb-3">
                    Get notified when capacity reaches certain thresholds
                  </p>
                  <Button variant="outline">Configure Alerts</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}