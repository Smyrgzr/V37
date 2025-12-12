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
} from "lucide-react";
import { cn } from "../ui/utils";
import { motion, AnimatePresence } from "motion/react";
import { Station, StationStatusManager } from "./StationStatusManager";

interface RealTimeOperationsCenterProps {
  stations: Station[];
  onStationStatusChange: (stationId: string, status: any) => void;
  demoMode?: boolean;
}

interface LiveMetric {
  label: string;
  value: string | number;
  change: string;
  trend: "up" | "down" | "neutral";
  icon: any;
}

interface ActivityLog {
  id: string;
  timestamp: Date;
  type: "booking" | "completion" | "status-change" | "alert";
  message: string;
  stationName?: string;
  severity?: "info" | "warning" | "error" | "success";
}

export function RealTimeOperationsCenter({
  stations,
  onStationStatusChange,
  demoMode = false,
}: RealTimeOperationsCenterProps) {
  const [isLive, setIsLive] = useState(demoMode);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [activityLogs, setActivityLogs] = useState<ActivityLog[]>([
    {
      id: "1",
      timestamp: new Date(Date.now() - 120000),
      type: "completion",
      message: "John Doe - Premium Wash completed at Bay 1",
      stationName: "Station 1",
      severity: "success",
    },
    {
      id: "2",
      timestamp: new Date(Date.now() - 60000),
      type: "booking",
      message: "New booking: Sarah Smith - Basic Wash at 11:00 AM",
      stationName: "Station 2",
      severity: "info",
    },
    {
      id: "3",
      timestamp: new Date(Date.now() - 30000),
      type: "status-change",
      message: "Station 3 status changed to Cleaning",
      stationName: "Station 3",
      severity: "warning",
    },
    {
      id: "4",
      timestamp: new Date(Date.now() - 10000),
      type: "alert",
      message: "High demand detected - Consider dynamic pricing",
      severity: "warning",
    },
  ]);

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
        const activities = [
          "New booking received",
          "Service completed",
          "Customer checked in",
          "Payment processed",
          "Station ready for next service",
        ];
        const randomActivity =
          activities[Math.floor(Math.random() * activities.length)];

        setActivityLogs((prev) => [
          {
            id: Date.now().toString(),
            timestamp: new Date(),
            type: "booking",
            message: randomActivity,
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
      // Find available stations
      const availableStations = stations.filter(s => s.status === "available");
      
      // 40% chance to start a new service on an available station
      if (availableStations.length > 0 && Math.random() > 0.6) {
        const randomStation = availableStations[Math.floor(Math.random() * availableStations.length)];
        const customers = ["Mike Johnson", "Emma Davis", "Chris Lee", "Lisa Wang", "Tom Brown"];
        const services = ["Premium Wash", "Express Clean", "Full Detail", "Basic Wash"];
        const randomCustomer = customers[Math.floor(Math.random() * customers.length)];
        const randomService = services[Math.floor(Math.random() * services.length)];
        
        // Start service
        onStationStatusChange(randomStation.id, "occupied");
        
        setActivityLogs((prev) => [
          {
            id: Date.now().toString(),
            timestamp: new Date(),
            type: "booking",
            message: `${randomCustomer} started ${randomService} at ${randomStation.name}`,
            stationName: randomStation.name,
            severity: "info",
          },
          ...prev.slice(0, 19),
        ]);
        
        // Auto-complete after 25-40 seconds
        const completionTime = Math.random() * 15000 + 25000;
        setTimeout(() => {
          onStationStatusChange(randomStation.id, "cleaning");
          
          setActivityLogs((prev) => [
            {
              id: Date.now().toString(),
              timestamp: new Date(),
              type: "completion",
              message: `${randomService} completed at ${randomStation.name}`,
              stationName: randomStation.name,
              severity: "success",
            },
            ...prev.slice(0, 19),
          ]);
          
          // Return to available after 5-10 seconds
          setTimeout(() => {
            onStationStatusChange(randomStation.id, "available");
            
            setActivityLogs((prev) => [
              {
                id: Date.now().toString(),
                timestamp: new Date(),
                type: "status-change",
                message: `${randomStation.name} is now available`,
                stationName: randomStation.name,
                severity: "info",
              },
              ...prev.slice(0, 19),
            ]);
          }, Math.random() * 5000 + 5000);
        }, completionTime);
      }
    }, 12000); // Check every 12 seconds

    return () => clearInterval(transitionInterval);
  }, [isLive, demoMode, stations, onStationStatusChange]);

  const liveMetrics: LiveMetric[] = [
    {
      label: "Active Services",
      value: stations.filter((s) => s.status === "occupied").length,
      change: "+2",
      trend: "up",
      icon: Radio,
    },
    {
      label: "Available Bays",
      value: stations.filter((s) => s.status === "available").length,
      change: "-1",
      trend: "down",
      icon: CheckCircle,
    },
    {
      label: "Hourly Revenue",
      value: "$847",
      change: "+18%",
      trend: "up",
      icon: DollarSign,
    },
    {
      label: "Wait Time",
      value: "12 min",
      change: "-3 min",
      trend: "up",
      icon: Clock,
    },
  ];

  const statusBreakdown = {
    available: stations.filter((s) => s.status === "available").length,
    occupied: stations.filter((s) => s.status === "occupied").length,
    cleaning: stations.filter((s) => s.status === "cleaning").length,
    maintenance: stations.filter((s) => s.status === "maintenance").length,
    "out-of-service": stations.filter((s) => s.status === "out-of-service")
      .length,
    "reserved-next": stations.filter((s) => s.status === "reserved-next")
      .length,
  };

  const getActivityIcon = (type: ActivityLog["type"]) => {
    switch (type) {
      case "booking":
        return Bell;
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
              <p className="font-bold text-lg">🎯 DEMO MODE ACTIVE</p>
              <p className="text-sm opacity-90">
                Auto-refresh enabled • Simulated data • Updates every 5 seconds • Not connected to production
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

      {/* Live Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {liveMetrics.map((metric, index) => {
          const Icon = metric.icon;
          return (
            <motion.div
              key={metric.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <Icon size={20} className="text-neutral-600" />
                    <Badge
                      variant="outline"
                      className={cn(
                        "text-xs",
                        metric.trend === "up" &&
                          "text-green-600 border-green-200",
                        metric.trend === "down" && "text-red-600 border-red-200"
                      )}
                    >
                      {metric.change}
                    </Badge>
                  </div>
                  <p className="text-3xl font-bold">{metric.value}</p>
                  <p className="text-sm text-neutral-600 mt-1">
                    {metric.label}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Station Status Grid */}
        <div className="xl:col-span-2">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Live Station Status</CardTitle>
                <Badge variant="outline" className="text-xs">
                  {stations.length} Total Stations
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <StationStatusManager
                stations={stations}
                onStatusChange={onStationStatusChange}
                compact
              />

              {/* Status Summary */}
              <Separator className="my-6" />
              <div className="grid grid-cols-3 md:grid-cols-6 gap-4">
                {Object.entries(statusBreakdown).map(([status, count]) => (
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
            </CardContent>
          </Card>
        </div>

        {/* Activity Log */}
        <div>
          <Card className="h-full">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Activity size={20} />
                Live Activity Feed
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <ScrollArea className="h-[600px]">
                <div className="p-6 space-y-3">
                  <AnimatePresence>
                    {activityLogs.map((log, index) => {
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
                            <div className="flex items-center gap-2 mt-1">
                              <p className="text-xs text-neutral-500">
                                {formatLogTime(log.timestamp)}
                              </p>
                              {log.stationName && (
                                <>
                                  <span className="text-xs text-neutral-400">
                                    •
                                  </span>
                                  <Badge variant="outline" className="text-xs">
                                    {log.stationName}
                                  </Badge>
                                </>
                              )}
                            </div>
                          </div>
                        </motion.div>
                      );
                    })}
                  </AnimatePresence>
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Performance Chart Placeholder */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp size={20} />
            Real-Time Performance
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-64 flex items-center justify-center bg-neutral-50 rounded-lg border-2 border-dashed">
            <div className="text-center">
              <Zap size={48} className="mx-auto mb-4 text-neutral-300" />
              <p className="text-sm text-neutral-500">
                Live performance chart coming soon
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}