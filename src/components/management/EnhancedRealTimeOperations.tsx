/**
 * ENHANCED REAL-TIME OPERATIONS CENTER
 * =====================================
 * 
 * Module-aware real-time operations dashboard with:
 * - Business module filtering
 * - Walk-in vs Reservation metrics separation
 * - Live updates per module
 * - Module-specific activity feed
 */

"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Separator } from "../ui/separator";
import { ScrollArea } from "../ui/scroll-area";
import {
  Activity,
  Radio,
  CheckCircle,
  Clock,
  Wrench,
  XCircle,
  AlertCircle,
  TrendingUp,
  Users,
  DollarSign,
  Zap,
  Bell,
  PlayCircle,
  PauseCircle,
  Filter,
  LayoutGrid,
  Calendar,
  Car,
  Sparkles,
} from "lucide-react";
import { cn } from "../ui/utils";
import { motion, AnimatePresence } from "motion/react";
import { Station, StationStatusManager } from "./StationStatusManager";
import { Reservation } from "../../types/reservation";
import { BusinessModule, getModuleConfig } from "../../types/business-modules";
import { ModuleFilterTabs, CompactModuleFilter } from "./ModuleFilterTabs";
import { WalkInMetrics, ReservationMetrics, CombinedMetrics } from "./ModuleAwareMetrics";

interface EnhancedRealTimeOperationsProps {
  stations: Station[];
  reservations?: Reservation[];
  onStationStatusChange: (stationId: string, status: any) => void;
  demoMode?: boolean;
}

interface ActivityLog {
  id: string;
  timestamp: Date;
  type: "walk-in" | "reservation" | "completion" | "status-change" | "alert";
  message: string;
  stationName?: string;
  businessModule?: BusinessModule;
  severity?: "info" | "warning" | "error" | "success";
}

export function EnhancedRealTimeOperations({
  stations,
  reservations = [],
  onStationStatusChange,
  demoMode = false,
}: EnhancedRealTimeOperationsProps) {
  const [isLive, setIsLive] = useState(demoMode);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [moduleFilter, setModuleFilter] = useState<"all" | "walk-in" | "reservation" | BusinessModule>("all");
  const [activityLogs, setActivityLogs] = useState<ActivityLog[]>([
    {
      id: "1",
      timestamp: new Date(Date.now() - 120000),
      type: "completion",
      message: "John Doe - Premium Wash completed",
      stationName: "Bay 1",
      businessModule: "in_bay",
      severity: "success",
    },
    {
      id: "2",
      timestamp: new Date(Date.now() - 60000),
      type: "reservation",
      message: "New reservation: Sarah Smith - Full Detail at 2:00 PM",
      stationName: "Detail Station Alpha",
      businessModule: "manual_detailing",
      severity: "info",
    },
    {
      id: "3",
      timestamp: new Date(Date.now() - 30000),
      type: "walk-in",
      message: "Mike Johnson started Express Wash",
      stationName: "Tunnel Line A",
      businessModule: "tunnel",
      severity: "info",
    },
    {
      id: "4",
      timestamp: new Date(Date.now() - 10000),
      type: "alert",
      message: "High demand detected on In-Bay modules",
      businessModule: "in_bay",
      severity: "warning",
    },
  ]);

  // Filter stations based on selected module
  const filteredStations = stations.filter(station => {
    if (moduleFilter === "all") return true;
    if (moduleFilter === "walk-in") return station.operationModel === "walk-in";
    if (moduleFilter === "reservation") return station.operationModel === "reservation";
    return station.businessModule === moduleFilter;
  });

  // Filter activity logs based on selected module
  const filteredLogs = activityLogs.filter(log => {
    if (moduleFilter === "all") return true;
    if (moduleFilter === "walk-in") {
      return log.businessModule && 
        ["in_bay", "tunnel", "self_service"].includes(log.businessModule);
    }
    if (moduleFilter === "reservation") {
      return log.businessModule === "manual_detailing";
    }
    return log.businessModule === moduleFilter;
  });

  // Update time every second
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  // Demo mode - simulate real-time updates
  useEffect(() => {
    if (!isLive || !demoMode) return;

    const interval = setInterval(() => {
      // Randomly add new activity log
      if (Math.random() > 0.7) {
        const modules: BusinessModule[] = ["in_bay", "tunnel", "self_service", "manual_detailing"];
        const randomModule = modules[Math.floor(Math.random() * modules.length)];
        const moduleConfig = getModuleConfig(randomModule);

        const walkInActivities = [
          "Customer started service",
          "Payment processed",
          "Service completed",
          "Station ready for next customer",
        ];

        const reservationActivities = [
          "Customer checked in for reservation",
          "Reservation confirmed",
          "Detailing service started",
          "Customer requested rescheduling",
        ];

        const activities = randomModule === "manual_detailing" 
          ? reservationActivities 
          : walkInActivities;

        const randomActivity = activities[Math.floor(Math.random() * activities.length)];

        setActivityLogs((prev) => [
          {
            id: Date.now().toString(),
            timestamp: new Date(),
            type: randomModule === "manual_detailing" ? "reservation" : "walk-in",
            message: `${randomActivity} - ${moduleConfig.name}`,
            businessModule: randomModule,
            severity: "info",
          },
          ...prev.slice(0, 19),
        ]);
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [isLive, demoMode]);

  // Demo mode - Station Auto-Transitions
  useEffect(() => {
    if (!isLive || !demoMode) return;

    const transitionInterval = setInterval(() => {
      const availableStations = filteredStations.filter(s => s.status === "available");
      
      if (availableStations.length > 0 && Math.random() > 0.6) {
        const randomStation = availableStations[Math.floor(Math.random() * availableStations.length)];
        const customers = ["Mike Johnson", "Emma Davis", "Chris Lee", "Lisa Wang", "Tom Brown"];
        const randomCustomer = customers[Math.floor(Math.random() * customers.length)];
        
        const moduleConfig = getModuleConfig(randomStation.businessModule);
        
        onStationStatusChange(randomStation.id, "occupied");
        
        setActivityLogs((prev) => [
          {
            id: Date.now().toString(),
            timestamp: new Date(),
            type: randomStation.operationModel === "walk-in" ? "walk-in" : "reservation",
            message: `${randomCustomer} started service at ${randomStation.name}`,
            stationName: randomStation.name,
            businessModule: randomStation.businessModule,
            severity: "info",
          },
          ...prev.slice(0, 19),
        ]);
        
        const completionTime = Math.random() * 15000 + 25000;
        setTimeout(() => {
          onStationStatusChange(randomStation.id, "cleaning");
          
          setActivityLogs((prev) => [
            {
              id: Date.now().toString(),
              timestamp: new Date(),
              type: "completion",
              message: `Service completed at ${randomStation.name}`,
              stationName: randomStation.name,
              businessModule: randomStation.businessModule,
              severity: "success",
            },
            ...prev.slice(0, 19),
          ]);
          
          setTimeout(() => {
            onStationStatusChange(randomStation.id, "available");
          }, Math.random() * 5000 + 5000);
        }, completionTime);
      }
    }, 12000);

    return () => clearInterval(transitionInterval);
  }, [isLive, demoMode, filteredStations, onStationStatusChange]);

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });
  };

  const formatLogTime = (date: Date) => {
    const now = new Date();
    const diff = Math.floor((now.getTime() - date.getTime()) / 1000);

    if (diff < 60) return `${diff}s ago`;
    if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
    return date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getActivityIcon = (type: ActivityLog["type"]) => {
    switch (type) {
      case "walk-in":
        return Car;
      case "reservation":
        return Calendar;
      case "completion":
        return CheckCircle;
      case "status-change":
        return Activity;
      case "alert":
        return AlertCircle;
      default:
        return Activity;
    }
  };

  const getActivityColor = (severity: ActivityLog["severity"]) => {
    switch (severity) {
      case "success":
        return "text-green-600 bg-green-50";
      case "warning":
        return "text-amber-600 bg-amber-50";
      case "error":
        return "text-red-600 bg-red-50";
      case "info":
      default:
        return "text-blue-600 bg-blue-50";
    }
  };

  return (
    <div className="space-y-6">
      {/* Demo Mode Banner */}
      {demoMode && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-r from-purple-600 via-blue-600 to-cyan-600 text-white px-6 py-4 rounded-lg shadow-lg border-2 border-white"
        >
          <div className="flex items-center justify-center gap-3">
            <Zap size={20} className="animate-pulse" />
            <div className="text-center">
              <p className="font-bold text-lg">🎯 DEMO MODE ACTIVE - Module-Aware Operations</p>
              <p className="text-sm opacity-90">
                Auto-refresh enabled • Module filtering • Real-time metrics • Business intelligence
              </p>
            </div>
          </div>
        </motion.div>
      )}

      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div
            className={cn(
              "size-12 rounded-lg flex items-center justify-center",
              isLive
                ? "bg-gradient-to-br from-green-500 to-emerald-600 animate-pulse"
                : "bg-neutral-300"
            )}
          >
            <Radio size={24} className="text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold">
              Real-Time Operations Center
            </h1>
            <div className="flex items-center gap-2 mt-1">
              <div
                className={cn(
                  "size-2 rounded-full",
                  isLive ? "bg-green-500 animate-pulse" : "bg-neutral-400"
                )}
              />
              <p className="text-sm text-neutral-600">
                {isLive ? "LIVE" : "PAUSED"} • {formatTime(currentTime)}
              </p>
              {moduleFilter !== "all" && (
                <>
                  <span className="text-neutral-400">•</span>
                  <Badge variant="outline" className="text-xs">
                    <Filter size={12} className="mr-1" />
                    {moduleFilter === "walk-in" ? "Walk-In Only" : 
                     moduleFilter === "reservation" ? "Reservation Only" :
                     getModuleConfig(moduleFilter as BusinessModule).name}
                  </Badge>
                </>
              )}
            </div>
          </div>
        </div>
        <Button
          onClick={() => setIsLive(!isLive)}
          variant={isLive ? "outline" : "default"}
        >
          {isLive ? (
            <>
              <PauseCircle size={16} className="mr-2" />
              Pause Updates
            </>
          ) : (
            <>
              <PlayCircle size={16} className="mr-2" />
              Start Live Mode
            </>
          )}
        </Button>
      </div>

      {/* Module Filter Tabs */}
      <ModuleFilterTabs
        stations={stations}
        activeFilter={moduleFilter}
        onFilterChange={setModuleFilter}
      />

      <Separator />

      {/* Metrics Section - Module Aware */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold flex items-center gap-2">
            <TrendingUp size={20} />
            Live Metrics
            {moduleFilter !== "all" && (
              <Badge variant="secondary">
                {moduleFilter === "walk-in" ? "Walk-In Modules" : 
                 moduleFilter === "reservation" ? "Reservation Modules" :
                 getModuleConfig(moduleFilter as BusinessModule).name}
              </Badge>
            )}
          </h2>
        </div>

        {moduleFilter === "all" && (
          <CombinedMetrics stations={stations} reservations={reservations} />
        )}

        {(moduleFilter === "walk-in" || 
          moduleFilter === "in_bay" || 
          moduleFilter === "tunnel" || 
          moduleFilter === "self_service") && (
          <WalkInMetrics 
            stations={filteredStations}
            module={moduleFilter === "walk-in" ? undefined : moduleFilter as BusinessModule}
          />
        )}

        {(moduleFilter === "reservation" || moduleFilter === "manual_detailing") && (
          <ReservationMetrics
            reservations={reservations}
            stations={filteredStations}
            module={moduleFilter === "reservation" ? undefined : moduleFilter as BusinessModule}
          />
        )}
      </div>

      <Separator />

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Station Status Grid */}
        <div className="xl:col-span-2">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Live Station Status</CardTitle>
                <Badge variant="outline" className="text-xs">
                  {filteredStations.length} {moduleFilter !== "all" ? "Filtered" : "Total"} Stations
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              {filteredStations.length > 0 ? (
                <>
                  <StationStatusManager
                    stations={filteredStations}
                    onStatusChange={onStationStatusChange}
                    compact
                  />

                  {/* Status Summary */}
                  <Separator className="my-6" />
                  <div className="grid grid-cols-3 md:grid-cols-6 gap-4">
                    {Object.entries({
                      available: filteredStations.filter(s => s.status === "available").length,
                      occupied: filteredStations.filter(s => s.status === "occupied").length,
                      cleaning: filteredStations.filter(s => s.status === "cleaning").length,
                      maintenance: filteredStations.filter(s => s.status === "maintenance").length,
                      "out-of-service": filteredStations.filter(s => s.status === "out-of-service").length,
                      "reserved-next": filteredStations.filter(s => s.status === "reserved-next").length,
                    }).map(([status, count]) => (
                      <div
                        key={status}
                        className="text-center p-3 rounded-lg bg-neutral-50 hover:bg-neutral-100 transition-colors cursor-pointer"
                      >
                        <p className="text-2xl font-bold">{count}</p>
                        <p className="text-xs text-neutral-600 capitalize mt-1">
                          {status.replace("-", " ")}
                        </p>
                      </div>
                    ))}
                  </div>
                </>
              ) : (
                <div className="text-center py-12">
                  <Filter size={48} className="mx-auto text-neutral-300 mb-4" />
                  <p className="text-neutral-500">No stations match the selected filter</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Activity Feed */}
        <div>
          <Card className="h-full">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Activity size={20} />
                Live Activity Feed
                {moduleFilter !== "all" && (
                  <Badge variant="secondary" className="text-xs">
                    Filtered
                  </Badge>
                )}
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <ScrollArea className="h-[600px]">
                <div className="p-6 space-y-3">
                  {filteredLogs.length > 0 ? (
                    <AnimatePresence>
                      {filteredLogs.map((log, index) => {
                        const Icon = getActivityIcon(log.type);
                        const colorClass = getActivityColor(log.severity);

                        return (
                          <motion.div
                            key={log.id}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 20 }}
                            transition={{ delay: index * 0.05 }}
                            className="flex gap-3 p-3 rounded-lg hover:bg-neutral-50 transition-colors cursor-pointer"
                          >
                            <div
                              className={cn(
                                "size-8 rounded-lg flex items-center justify-center shrink-0",
                                colorClass
                              )}
                            >
                              <Icon size={16} />
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-medium leading-tight">
                                {log.message}
                              </p>
                              <div className="flex items-center gap-2 mt-1 flex-wrap">
                                <p className="text-xs text-neutral-500">
                                  {formatLogTime(log.timestamp)}
                                </p>
                                {log.stationName && (
                                  <>
                                    <span className="text-xs text-neutral-400">•</span>
                                    <Badge variant="outline" className="text-xs">
                                      {log.stationName}
                                    </Badge>
                                  </>
                                )}
                                {log.businessModule && (
                                  <>
                                    <span className="text-xs text-neutral-400">•</span>
                                    <Badge 
                                      variant="outline" 
                                      className={cn(
                                        "text-xs",
                                        getModuleConfig(log.businessModule).bgColor,
                                        getModuleConfig(log.businessModule).color
                                      )}
                                    >
                                      {getModuleConfig(log.businessModule).name}
                                    </Badge>
                                  </>
                                )}
                              </div>
                            </div>
                          </motion.div>
                        );
                      })}
                    </AnimatePresence>
                  ) : (
                    <div className="text-center py-12">
                      <Bell size={48} className="mx-auto text-neutral-300 mb-4" />
                      <p className="text-neutral-500">No activity for selected filter</p>
                    </div>
                  )}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* AI Insights Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Sparkles size={20} className="text-purple-600" />
            AI-Powered Insights
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
              <div className="flex items-start gap-3">
                <TrendingUp size={20} className="text-blue-600 mt-0.5" />
                <div>
                  <p className="font-medium text-blue-900">Peak Time Optimization</p>
                  <p className="text-sm text-blue-700 mt-1">
                    In-Bay modules showing 85% utilization. Consider dynamic pricing.
                  </p>
                </div>
              </div>
            </div>

            <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
              <div className="flex items-start gap-3">
                <Users size={20} className="text-purple-600 mt-0.5" />
                <div>
                  <p className="font-medium text-purple-900">Staffing Recommendation</p>
                  <p className="text-sm text-purple-700 mt-1">
                    Add 1 detailer to manual stations for peak efficiency.
                  </p>
                </div>
              </div>
            </div>

            <div className="p-4 bg-green-50 rounded-lg border border-green-200">
              <div className="flex items-start gap-3">
                <DollarSign size={20} className="text-green-600 mt-0.5" />
                <div>
                  <p className="font-medium text-green-900">Revenue Opportunity</p>
                  <p className="text-sm text-green-700 mt-1">
                    Launch premium package campaign for 18% revenue boost.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
