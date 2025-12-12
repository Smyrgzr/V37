/**
 * DIRECTION NAVIGATOR - Mobile Detailing
 * ======================================
 * Shows service location, provides navigation link, and tracks worker status
 */

import { useState } from "react";
import { Card } from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import {
  Navigation,
  MapPin,
  Phone,
  Clock,
  Car,
  ExternalLink,
  CheckCircle,
  TrendingUp,
  AlertCircle,
} from "lucide-react";
import { cn } from "../ui/utils";
import type { Reservation } from "../../types/reservation";

export interface DirectionNavigatorProps {
  reservation: Reservation;
  onStatusChange?: (status: "en-route" | "on-site") => void;
  onArrival?: () => void;
}

export function DirectionNavigator({
  reservation,
  onStatusChange,
  onArrival,
}: DirectionNavigatorProps) {
  const [workerStatus, setWorkerStatus] = useState<
    "idle" | "en-route" | "on-site" | "returning"
  >(reservation.workerStatus || "idle");

  if (!reservation.serviceLocation) {
    return null;
  }

  const { address, lat, lng, directions, travelDistance, travelDuration } =
    reservation.serviceLocation;

  // Generate Google Maps link if not provided
  const mapsLink =
    directions ||
    `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`;

  const handleStartRoute = () => {
    setWorkerStatus("en-route");
    onStatusChange?.("en-route");
    // Open Google Maps in new tab
    window.open(mapsLink, "_blank");
  };

  const handleArrived = () => {
    setWorkerStatus("on-site");
    onStatusChange?.("on-site");
    onArrival?.();
  };

  const getStatusConfig = () => {
    switch (workerStatus) {
      case "idle":
        return {
          label: "Ready to Start",
          color: "bg-neutral-100 text-neutral-700 border-neutral-300",
          icon: Car,
        };
      case "en-route":
        return {
          label: "En Route",
          color: "bg-blue-100 text-blue-700 border-blue-300",
          icon: TrendingUp,
        };
      case "on-site":
        return {
          label: "On Site",
          color: "bg-green-100 text-green-700 border-green-300",
          icon: CheckCircle,
        };
      case "returning":
        return {
          label: "Returning",
          color: "bg-purple-100 text-purple-700 border-purple-300",
          icon: Navigation,
        };
      default:
        return {
          label: "Unknown",
          color: "bg-neutral-100 text-neutral-700 border-neutral-300",
          icon: AlertCircle,
        };
    }
  };

  const statusConfig = getStatusConfig();
  const StatusIcon = statusConfig.icon;

  return (
    <Card className="p-6">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="size-10 rounded-lg bg-orange-100 flex items-center justify-center">
            <MapPin className="size-5 text-orange-600" />
          </div>
          <div>
            <h3 className="font-semibold">Service Location</h3>
            <Badge className={cn("mt-1", statusConfig.color)}>
              <StatusIcon className="size-3 mr-1" />
              {statusConfig.label}
            </Badge>
          </div>
        </div>
        <div className="text-right text-sm text-neutral-600">
          <p>{reservation.customer.name}</p>
          <p className="text-xs">{reservation.customer.vehicleModel}</p>
        </div>
      </div>

      {/* Address */}
      <div className="mb-4 p-4 bg-neutral-50 rounded-lg">
        <div className="flex items-start gap-2">
          <MapPin className="size-4 text-neutral-600 mt-0.5 shrink-0" />
          <div>
            <p className="font-medium text-sm">{address}</p>
            {(travelDistance || travelDuration) && (
              <div className="flex items-center gap-3 mt-2 text-xs text-neutral-600">
                {travelDistance && (
                  <span>
                    <strong>{travelDistance.toFixed(1)} km</strong> distance
                  </span>
                )}
                {travelDuration && (
                  <span>
                    <Clock className="size-3 inline mr-1" />
                    <strong>{travelDuration} min</strong> travel time
                  </span>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Customer Contact */}
      <div className="mb-4 pb-4 border-b flex items-center justify-between">
        <div className="text-sm">
          <p className="text-neutral-600">Customer Contact</p>
          <p className="font-medium">{reservation.customer.phone}</p>
        </div>
        <Button variant="outline" size="sm">
          <Phone className="size-4 mr-1.5" />
          Call
        </Button>
      </div>

      {/* Actions */}
      <div className="space-y-2">
        {workerStatus === "idle" && (
          <Button onClick={handleStartRoute} className="w-full">
            <Navigation className="size-4 mr-2" />
            Start Navigation
            <ExternalLink className="size-3 ml-2 opacity-70" />
          </Button>
        )}

        {workerStatus === "en-route" && (
          <div className="space-y-2">
            <Button onClick={handleArrived} className="w-full bg-green-600 hover:bg-green-700">
              <CheckCircle className="size-4 mr-2" />
              Mark as Arrived
            </Button>
            <Button
              onClick={handleStartRoute}
              variant="outline"
              className="w-full"
            >
              <Navigation className="size-4 mr-2" />
              Re-open Navigation
              <ExternalLink className="size-3 ml-2 opacity-70" />
            </Button>
          </div>
        )}

        {workerStatus === "on-site" && (
          <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
            <div className="flex items-center gap-2 text-green-700">
              <CheckCircle className="size-5" />
              <div>
                <p className="font-medium">You've Arrived</p>
                <p className="text-xs text-green-600">
                  Ready to check in with customer
                </p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Service Details */}
      <div className="mt-4 pt-4 border-t">
        <div className="grid grid-cols-2 gap-3 text-sm">
          <div>
            <p className="text-neutral-600 text-xs">Scheduled Time</p>
            <p className="font-medium">
              {reservation.scheduledStart.toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </p>
          </div>
          <div>
            <p className="text-neutral-600 text-xs">Duration</p>
            <p className="font-medium">{reservation.totalDuration} min</p>
          </div>
          <div>
            <p className="text-neutral-600 text-xs">Service</p>
            <p className="font-medium truncate">
              {reservation.services[0]?.name || "Service"}
            </p>
          </div>
          <div>
            <p className="text-neutral-600 text-xs">Vehicle Plate</p>
            <p className="font-medium">{reservation.customer.vehiclePlate}</p>
          </div>
        </div>
      </div>
    </Card>
  );
}
