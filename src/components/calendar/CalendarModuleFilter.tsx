/**
 * CALENDAR MODULE FILTER
 * ======================
 * 
 * Business module filter specifically designed for calendar views
 * Shows capacity and booking counts for each module
 */

"use client";

import { Badge } from "../ui/badge";
import { cn } from "../ui/utils";
import { BusinessModule, getModuleConfig } from "../../types/business-modules";
import { Station } from "../management/StationStatusManager";
import { Reservation } from "../../types/reservation";
import { Calendar } from "lucide-react";

interface CalendarModuleFilterProps {
  stations: Station[];
  reservations: Reservation[];
  selectedDate: Date;
  activeModule: "all" | BusinessModule;
  onModuleChange: (module: "all" | BusinessModule) => void;
}

export function CalendarModuleFilter({
  stations,
  reservations,
  selectedDate,
  activeModule,
  onModuleChange,
}: CalendarModuleFilterProps) {
  const dateStr = selectedDate.toISOString().split('T')[0];
  
  // Calculate stats for each module
  const getModuleStats = (module: BusinessModule) => {
    const moduleStations = stations.filter(s => s.businessModule === module);
    const isReservationBased = moduleStations[0]?.operationModel === "reservation";
    
    if (isReservationBased) {
      // Reservation-based: count bookings
      const bookings = reservations.filter(r => 
        r.scheduledDate === dateStr && 
        r.businessModule === module &&
        !["cancelled", "no-show"].includes(r.status)
      );
      const totalSlots = moduleStations.length * 8; // 8 slots per station
      return {
        count: bookings.length,
        total: totalSlots,
        utilization: totalSlots > 0 ? Math.round((bookings.length / totalSlots) * 100) : 0,
        label: "bookings"
      };
    } else {
      // Walk-in: count active stations
      const active = moduleStations.filter(s => s.status === "occupied").length;
      return {
        count: active,
        total: moduleStations.length,
        utilization: moduleStations.length > 0 
          ? Math.round((active / moduleStations.length) * 100) 
          : 0,
        label: "active"
      };
    }
  };

  const allModules: BusinessModule[] = ["in_bay", "tunnel", "self_service", "manual_detailing"];
  const availableModules = allModules.filter(m => 
    stations.some(s => s.businessModule === m)
  );

  // Calculate "all" stats
  const allReservations = reservations.filter(r => 
    r.scheduledDate === dateStr &&
    !["cancelled", "no-show"].includes(r.status)
  );
  const allActive = stations.filter(s => s.status === "occupied").length;

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2 text-sm text-neutral-600">
        <Calendar size={16} />
        <span>Filter by Business Module</span>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
        {/* All Modules */}
        <button
          onClick={() => onModuleChange("all")}
          className={cn(
            "p-4 rounded-lg border-2 transition-all text-left",
            "hover:shadow-md",
            activeModule === "all" 
              ? "border-blue-500 bg-blue-50 ring-2 ring-blue-200" 
              : "border-neutral-200 bg-white hover:border-neutral-300"
          )}
        >
          <div className="flex items-center justify-between mb-2">
            <p className={cn(
              "font-semibold",
              activeModule === "all" ? "text-blue-900" : "text-neutral-900"
            )}>
              All Modules
            </p>
            <Badge 
              variant={activeModule === "all" ? "default" : "secondary"}
              className="text-xs"
            >
              {availableModules.length}
            </Badge>
          </div>
          <div className="space-y-1">
            <p className="text-xs text-neutral-600">
              {allReservations.length} reservations
            </p>
            <p className="text-xs text-neutral-600">
              {allActive} active now
            </p>
          </div>
        </button>

        {/* Individual Modules */}
        {availableModules.map(module => {
          const config = getModuleConfig(module);
          const Icon = config.icon;
          const stats = getModuleStats(module);
          const isActive = activeModule === module;

          return (
            <button
              key={module}
              onClick={() => onModuleChange(module)}
              className={cn(
                "p-4 rounded-lg border-2 transition-all text-left",
                "hover:shadow-md",
                isActive 
                  ? `${config.borderColor} ${config.bgColor} ring-2 ring-offset-1` 
                  : "border-neutral-200 bg-white hover:border-neutral-300"
              )}
            >
              <div className="flex items-center justify-between mb-2">
                <div className={cn(
                  "size-8 rounded-lg flex items-center justify-center",
                  isActive ? config.bgColor : "bg-neutral-100"
                )}>
                  <Icon size={16} className={isActive ? config.color : "text-neutral-600"} />
                </div>
                <Badge 
                  variant="outline"
                  className={cn(
                    "text-xs",
                    stats.utilization > 70 && "bg-green-50 text-green-700 border-green-200",
                    stats.utilization > 50 && stats.utilization <= 70 && "bg-yellow-50 text-yellow-700 border-yellow-200",
                    stats.utilization <= 50 && "bg-neutral-50 text-neutral-700"
                  )}
                >
                  {stats.utilization}%
                </Badge>
              </div>
              
              <p className={cn(
                "font-semibold text-sm mb-1",
                isActive ? config.color : "text-neutral-900"
              )}>
                {config.name}
              </p>
              
              <div className="flex items-center justify-between text-xs text-neutral-600">
                <span>{stats.count} {stats.label}</span>
                <span className="text-neutral-400">•</span>
                <span>{stats.total} total</span>
              </div>

              {/* Utilization bar */}
              <div className="mt-2 h-1.5 bg-neutral-200 rounded-full overflow-hidden">
                <div
                  className={cn(
                    "h-full transition-all",
                    stats.utilization > 70 && "bg-green-500",
                    stats.utilization > 50 && stats.utilization <= 70 && "bg-yellow-500",
                    stats.utilization <= 50 && "bg-neutral-400"
                  )}
                  style={{ width: `${stats.utilization}%` }}
                />
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
