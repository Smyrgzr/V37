"use client";

import { useMemo } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Badge } from "../ui/badge";
import { Progress } from "../ui/progress";
import { cn } from "../ui/utils";
import { Activity, Users, AlertCircle, CheckCircle, TrendingUp, Calendar } from "lucide-react";
import { BusinessModule } from "../../types/business-modules";
import { CapacityEngine, BranchCapacityConfig } from "../../utils/capacityEngine";
import { Worker } from "../../types/worker";

interface CapacityDashboardWidgetProps {
  workers: Worker[];
  branchId: string;
  branchName: string;
  date?: Date;
}

export function CapacityDashboardWidget({
  workers,
  branchId,
  branchName,
  date = new Date(),
}: CapacityDashboardWidgetProps) {
  // Initialize capacity engine
  const capacityEngine = useMemo(() => {
    const config: BranchCapacityConfig = {
      branchId,
      branchName,
      inBayCount: 4,
      tunnelCount: 2,
      selfServiceCount: 6,
      detailingStations: 3,
      parkingSpots: 10,
      openingTime: "08:00",
      closingTime: "20:00",
      slotDuration: 30,
      bufferTime: 15,
      workers,
      moduleSettings: {
        manual_detailing: {
          enabled: true,
          minWorkers: 1,
          maxConcurrentServices: 3,
          avgServiceDuration: 90,
        },
        mobile_detailing: {
          enabled: true,
          minWorkers: 1,
          maxConcurrentServices: 5,
          avgServiceDuration: 120,
        },
        in_bay: {
          enabled: true,
          minWorkers: 0,
          maxConcurrentServices: 4,
          avgServiceDuration: 20,
        },
        tunnel: {
          enabled: true,
          minWorkers: 1,
          maxConcurrentServices: 2,
          avgServiceDuration: 15,
        },
      },
    };
    return new CapacityEngine(config);
  }, [branchId, branchName, workers]);

  // Calculate capacity for different modules
  const capacityByModule = useMemo(() => {
    const dateStr = date.toISOString().split("T")[0];
    const modules: BusinessModule[] = ["manual_detailing", "mobile_detailing", "in_bay", "tunnel"];

    return modules.map((module) => {
      const capacity = capacityEngine.calculateCapacity(dateStr, "08:00", "20:00", module);
      return {
        module,
        moduleName: module.replace(/_/g, " ").replace(/\b\w/g, (l) => l.toUpperCase()),
        ...capacity,
      };
    });
  }, [capacityEngine, date]);

  // Overall stats
  const overallStats = useMemo(() => {
    const totalWorkers = workers.length;
    const availableWorkers = workers.filter((w) => w.currentStatus === "available").length;
    const busyWorkers = workers.filter((w) => w.currentStatus === "busy").length;
    const onBreakWorkers = workers.filter((w) => w.currentStatus === "on-break").length;

    // Average utilization across all modules
    const avgUtilization =
      capacityByModule.reduce((sum, c) => sum + c.utilizationRate, 0) / capacityByModule.length;

    return {
      totalWorkers,
      availableWorkers,
      busyWorkers,
      onBreakWorkers,
      avgUtilization: Math.round(avgUtilization),
    };
  }, [workers, capacityByModule]);

  const getUtilizationColor = (rate: number) => {
    if (rate >= 90) return "text-[#d4183d]";
    if (rate >= 70) return "text-[#fbbf24]";
    return "text-[#00a63e]";
  };

  const getUtilizationBgColor = (rate: number) => {
    if (rate >= 90) return "bg-[#d4183d]";
    if (rate >= 70) return "bg-[#fbbf24]";
    return "bg-[#00a63e]";
  };

  return (
    <div className="space-y-4">
      {/* Overall Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm text-muted-foreground">Available Workers</p>
              <Users className="h-4 w-4 text-muted-foreground" />
            </div>
            <p className="text-2xl font-semibold">{overallStats.availableWorkers}</p>
            <div className="flex items-center gap-2 mt-1 text-xs">
              <Badge className="bg-[#00a63e] text-white border-0">
                {overallStats.availableWorkers} ready
              </Badge>
              <Badge className="bg-[#fbbf24] text-[#030213] border-0">
                {overallStats.busyWorkers} busy
              </Badge>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm text-muted-foreground">Avg Utilization</p>
              <Activity className="h-4 w-4 text-muted-foreground" />
            </div>
            <p className={cn("text-2xl font-semibold", getUtilizationColor(overallStats.avgUtilization))}>
              {overallStats.avgUtilization}%
            </p>
            <div className="h-2 bg-[#ececf0] rounded-full mt-2 overflow-hidden">
              <div
                className={cn("h-full transition-all", getUtilizationBgColor(overallStats.avgUtilization))}
                style={{ width: `${overallStats.avgUtilization}%` }}
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm text-muted-foreground">Status</p>
              {overallStats.avgUtilization >= 90 ? (
                <AlertCircle className="h-4 w-4 text-[#d4183d]" />
              ) : (
                <CheckCircle className="h-4 w-4 text-[#00a63e]" />
              )}
            </div>
            <p className="text-lg font-semibold">
              {overallStats.avgUtilization >= 90
                ? "Near Capacity"
                : overallStats.avgUtilization >= 70
                ? "Busy"
                : "Normal"}
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              {overallStats.avgUtilization >= 90
                ? "Consider additional staff"
                : overallStats.avgUtilization >= 70
                ? "Good utilization"
                : "Accepting bookings"}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Module-specific Capacity */}
      <Card>
        <CardHeader>
          <CardTitle>Capacity by Module</CardTitle>
          <CardDescription>Real-time capacity across business modules</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {capacityByModule.map((capacity) => (
              <div key={capacity.module} className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <p className="font-medium">{capacity.moduleName}</p>
                    <Badge
                      className={cn(
                        "border-0 text-xs",
                        capacity.canAcceptReservation
                          ? "bg-[#00a63e] text-white"
                          : "bg-[#d4183d] text-white"
                      )}
                    >
                      {capacity.canAcceptReservation ? "Accepting" : "Full"}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-4 text-sm">
                    <div className="flex items-center gap-1">
                      <Users className="h-3 w-3 text-muted-foreground" />
                      <span>
                        {capacity.resources.workers.available}/{capacity.resources.workers.total} available
                      </span>
                    </div>
                    <p className={cn("font-semibold", getUtilizationColor(capacity.utilizationRate))}>
                      {capacity.utilizationRate}%
                    </p>
                  </div>
                </div>
                <div className="h-2 bg-[#ececf0] rounded-full overflow-hidden">
                  <div
                    className={cn("h-full transition-all", getUtilizationBgColor(capacity.utilizationRate))}
                    style={{ width: `${capacity.utilizationRate}%` }}
                  />
                </div>
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <span>
                    {capacity.usedCapacity} / {capacity.totalCapacity} slots used
                  </span>
                  <span>{capacity.availableCapacity} slots available</span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Recommendations */}
      {overallStats.avgUtilization >= 80 && (
        <Card className="border-[#fbbf24] bg-[#fef3c7]">
          <CardContent className="p-4">
            <div className="flex items-start gap-3">
              <AlertCircle className="h-5 w-5 text-[#f59e0b] shrink-0 mt-0.5" />
              <div className="flex-1">
                <p className="font-medium text-[#92400e] mb-1">Capacity Alert</p>
                <p className="text-sm text-[#92400e]">
                  {overallStats.avgUtilization >= 90
                    ? "Your branch is operating at near-maximum capacity. Consider scheduling additional staff or declining new reservations."
                    : "Your branch is experiencing high demand. Monitor capacity closely and prepare backup staff if needed."}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
