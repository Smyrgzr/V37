"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Separator } from "../ui/separator";
import {
  Radio,
  CheckCircle,
  AlertCircle,
  XCircle,
  Wrench,
  AlertTriangle,
  Clock,
  Activity,
} from "lucide-react";
import { cn } from "../ui/utils";
import { motion } from "motion/react";
import { BusinessModule, getModuleConfig, OperationModel } from "../../types/business-modules";

export type StationStatus =
  | "available"
  | "occupied"
  | "cleaning"
  | "maintenance"
  | "out-of-service"
  | "reserved-next";

export interface Station {
  id: string;
  name: string;
  type: "in-bay" | "tunnel" | "self-service" | "manual-detailing";
  businessModule: BusinessModule; // 🆕 Critical addition
  operationModel: OperationModel; // 🆕 "walk-in" or "reservation"
  status: StationStatus;
  currentBooking?: {
    customer: string;
    service: string;
    endsIn?: string;
  };
  nextBooking?: {
    customer: string;
    time: string;
  };
  lastUpdated: Date;
  notes?: string;
  // Capacity info
  capacity?: {
    avgServiceTime: number; // minutes
    servicesPerHour: number;
    currentLoad: number; // percentage
  };
}

interface StationStatusManagerProps {
  stations: Station[];
  onStatusChange: (stationId: string, newStatus: StationStatus) => void;
  onStationClick?: (station: Station) => void;
  compact?: boolean;
}

export function StationStatusManager({
  stations,
  onStatusChange,
  onStationClick,
  compact = false,
}: StationStatusManagerProps) {
  const getStatusConfig = (status: StationStatus) => {
    switch (status) {
      case "available":
        return {
          color: "bg-green-100 text-green-700 border-green-200",
          icon: CheckCircle,
          label: "Available",
          ringColor: "ring-green-500",
        };
      case "occupied":
        return {
          color: "bg-blue-100 text-blue-700 border-blue-200",
          icon: Radio,
          label: "Occupied",
          ringColor: "ring-blue-500",
          animated: true,
        };
      case "cleaning":
        return {
          color: "bg-yellow-100 text-yellow-700 border-yellow-200",
          icon: Clock,
          label: "Cleaning",
          ringColor: "ring-yellow-500",
        };
      case "maintenance":
        return {
          color: "bg-orange-100 text-orange-700 border-orange-200",
          icon: Wrench,
          label: "Maintenance",
          ringColor: "ring-orange-500",
        };
      case "out-of-service":
        return {
          color: "bg-red-100 text-red-700 border-red-200",
          icon: XCircle,
          label: "Out of Service",
          ringColor: "ring-red-500",
        };
      case "reserved-next":
        return {
          color: "bg-purple-100 text-purple-700 border-purple-200",
          icon: AlertCircle,
          label: "Reserved Next",
          ringColor: "ring-purple-500",
        };
      default:
        return {
          color: "bg-neutral-100 text-neutral-700 border-neutral-200",
          icon: Activity,
          label: "Unknown",
          ringColor: "ring-neutral-500",
        };
    }
  };

  if (compact) {
    return (
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2">
        {stations.map((station, index) => {
          const config = getStatusConfig(station.status);
          const Icon = config.icon;
          const moduleConfig = getModuleConfig(station.businessModule);
          const ModuleIcon = moduleConfig.icon;

          return (
            <motion.div
              key={station.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <Card
                className={cn(
                  "cursor-pointer hover:shadow-lg transition-all border-2",
                  config.color,
                  config.animated && "ring-2 ring-offset-2 " + config.ringColor
                )}
                onClick={() => onStationClick?.(station)}
              >
                <CardContent className="p-2.5 space-y-1.5">
                  <div className="flex items-center justify-between">
                    <p className="font-bold text-xs truncate">{station.name}</p>
                    <Icon
                      size={14}
                      className={cn(config.animated && "animate-pulse", "shrink-0")}
                    />
                  </div>
                  
                  {/* Business Module Badge */}
                  <div className="flex items-center gap-1">
                    <Badge variant="outline" className={cn("text-[10px] px-1.5 py-0", moduleConfig.bgColor, moduleConfig.color)}>
                      <ModuleIcon size={9} className="mr-0.5" />
                      <span className="truncate">{moduleConfig.name}</span>
                    </Badge>
                  </div>
                  
                  <Badge variant="outline" className="text-[10px] px-1.5 py-0">
                    {config.label}
                  </Badge>
                  {station.currentBooking && (
                    <div className="text-[10px] pt-1 border-t border-current/20">
                      <p className="font-medium truncate">
                        {station.currentBooking.customer}
                      </p>
                      {station.currentBooking.endsIn && (
                        <p className="text-[10px] opacity-75">
                          Ends: {station.currentBooking.endsIn}
                        </p>
                      )}
                    </div>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {stations.map((station, index) => {
        const config = getStatusConfig(station.status);
        const Icon = config.icon;
        const moduleConfig = getModuleConfig(station.businessModule);
        const ModuleIcon = moduleConfig.icon;

        return (
          <motion.div
            key={station.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.05 }}
          >
            <Card
              className={cn(
                "border-2 hover:shadow-md transition-all cursor-pointer",
                config.animated && "ring-2 ring-offset-2 " + config.ringColor
              )}
              onClick={() => onStationClick?.(station)}
            >
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div
                      className={cn(
                        "size-10 rounded-lg flex items-center justify-center",
                        config.color
                      )}
                    >
                      <Icon
                        size={20}
                        className={cn(config.animated && "animate-pulse")}
                      />
                    </div>
                    <div>
                      <CardTitle className="text-lg">{station.name}</CardTitle>
                      <div className="flex items-center gap-2 mt-1">
                        <Badge variant="outline" className={cn("text-xs", moduleConfig.bgColor, moduleConfig.color)}>
                          <ModuleIcon size={12} className="mr-1" />
                          {moduleConfig.name}
                        </Badge>
                        <Badge variant="outline" className="text-xs">
                          {station.operationModel === "walk-in" ? "🚶 Walk-in" : "📅 Reservation"}
                        </Badge>
                      </div>
                    </div>
                  </div>
                  <Badge
                    variant="outline"
                    className={cn("text-sm", config.color)}
                  >
                    {config.label}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Current Booking */}
                {station.currentBooking && (
                  <div className="p-3 bg-neutral-50 rounded-lg border">
                    <p className="text-xs text-neutral-600 mb-1">
                      Current Service
                    </p>
                    <p className="font-semibold">
                      {station.currentBooking.customer}
                    </p>
                    <p className="text-sm text-neutral-600">
                      {station.currentBooking.service}
                    </p>
                    {station.currentBooking.endsIn && (
                      <div className="flex items-center gap-1 mt-2 text-sm text-blue-600">
                        <Clock size={14} />
                        <span>Ends in {station.currentBooking.endsIn}</span>
                      </div>
                    )}
                  </div>
                )}

                {/* Next Booking */}
                {station.nextBooking && (
                  <div className="p-3 bg-purple-50 rounded-lg border border-purple-200">
                    <p className="text-xs text-purple-600 mb-1">
                      Next Booking
                    </p>
                    <p className="font-semibold text-purple-900">
                      {station.nextBooking.customer}
                    </p>
                    <p className="text-sm text-purple-700">
                      {station.nextBooking.time}
                    </p>
                  </div>
                )}

                {/* Capacity Info */}
                {station.capacity && (
                  <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
                    <p className="text-xs text-blue-600 mb-2">Capacity Info</p>
                    <div className="grid grid-cols-3 gap-2 text-xs">
                      <div>
                        <p className="text-neutral-600">Avg Service</p>
                        <p className="font-semibold">{station.capacity.avgServiceTime}min</p>
                      </div>
                      <div>
                        <p className="text-neutral-600">Per Hour</p>
                        <p className="font-semibold">{station.capacity.servicesPerHour}</p>
                      </div>
                      <div>
                        <p className="text-neutral-600">Load</p>
                        <p className="font-semibold">{station.capacity.currentLoad}%</p>
                      </div>
                    </div>
                  </div>
                )}

                <Separator />

                {/* Status Control */}
                <div className="space-y-2">
                  <label className="text-xs font-medium text-neutral-600">
                    Change Status
                  </label>
                  <Select
                    value={station.status}
                    onValueChange={(value) =>
                      onStatusChange(station.id, value as StationStatus)
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="available">
                        <div className="flex items-center gap-2">
                          <CheckCircle size={14} className="text-green-600" />
                          Available
                        </div>
                      </SelectItem>
                      <SelectItem value="occupied">
                        <div className="flex items-center gap-2">
                          <Radio size={14} className="text-blue-600" />
                          Occupied
                        </div>
                      </SelectItem>
                      <SelectItem value="cleaning">
                        <div className="flex items-center gap-2">
                          <Clock size={14} className="text-yellow-600" />
                          Cleaning
                        </div>
                      </SelectItem>
                      <SelectItem value="maintenance">
                        <div className="flex items-center gap-2">
                          <Wrench size={14} className="text-orange-600" />
                          Maintenance
                        </div>
                      </SelectItem>
                      <SelectItem value="out-of-service">
                        <div className="flex items-center gap-2">
                          <XCircle size={14} className="text-red-600" />
                          Out of Service
                        </div>
                      </SelectItem>
                      <SelectItem value="reserved-next">
                        <div className="flex items-center gap-2">
                          <AlertCircle size={14} className="text-purple-600" />
                          Reserved Next
                        </div>
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Notes */}
                {station.notes && (
                  <div className="p-2 bg-amber-50 rounded border border-amber-200">
                    <p className="text-xs text-amber-800">{station.notes}</p>
                  </div>
                )}

                {/* Last Updated */}
                <p className="text-xs text-neutral-500">
                  Last updated:{" "}
                  {station.lastUpdated.toLocaleTimeString("en-US", {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </p>
              </CardContent>
            </Card>
          </motion.div>
        );
      })}
    </div>
  );
}

// Compact status badge component for inline use
export function StationStatusBadge({
  status,
  size = "sm",
}: {
  status: StationStatus;
  size?: "sm" | "md";
}) {
  const config = {
    available: {
      color: "bg-green-100 text-green-700 border-green-200",
      icon: CheckCircle,
      label: "Available",
    },
    occupied: {
      color: "bg-blue-100 text-blue-700 border-blue-200",
      icon: Radio,
      label: "Occupied",
      animated: true,
    },
    cleaning: {
      color: "bg-yellow-100 text-yellow-700 border-yellow-200",
      icon: Clock,
      label: "Cleaning",
    },
    maintenance: {
      color: "bg-orange-100 text-orange-700 border-orange-200",
      icon: Wrench,
      label: "Maintenance",
    },
    "out-of-service": {
      color: "bg-red-100 text-red-700 border-red-200",
      icon: XCircle,
      label: "Out of Service",
    },
    "reserved-next": {
      color: "bg-purple-100 text-purple-700 border-purple-200",
      icon: AlertCircle,
      label: "Reserved Next",
    },
  }[status];

  const Icon = config.icon;
  const iconSize = size === "sm" ? 12 : 14;

  return (
    <Badge variant="outline" className={cn("text-xs gap-1", config.color)}>
      <Icon
        size={iconSize}
        className={cn(config.animated && "animate-pulse")}
      />
      {config.label}
    </Badge>
  );
}