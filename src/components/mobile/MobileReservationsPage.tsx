/**
 * MOBILE RESERVATIONS PAGE
 * ========================
 * Dedicated page for Mobile Detailing reservations with special UI
 */

import { useState } from "react";
import { Card } from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import {
  MapPin,
  Navigation,
  Clock,
  DollarSign,
  User,
  Car,
  Phone,
  Calendar,
  TrendingUp,
  CheckCircle,
  AlertCircle,
  ChevronRight,
  Filter,
} from "lucide-react";
import { cn } from "../ui/utils";
import type { Reservation } from "../../types/reservation";
import { getReservationStatusColor, getReservationStatusLabel } from "../../types/reservation";

export interface MobileReservationsPageProps {
  reservations: Reservation[];
  onReservationClick?: (reservation: Reservation) => void;
  onApprove?: (id: string) => void;
  onReject?: (id: string) => void;
}

export function MobileReservationsPage({
  reservations,
  onReservationClick,
  onApprove,
  onReject,
}: MobileReservationsPageProps) {
  const [filterStatus, setFilterStatus] = useState<"all" | "pending" | "active" | "completed">("all");

  // Filter only mobile detailing reservations
  const mobileReservations = reservations.filter(r => r.businessModule === "mobile");

  // Filter by status
  const filteredReservations = mobileReservations.filter(r => {
    if (filterStatus === "all") return true;
    if (filterStatus === "pending") return ["requested", "pending-approval", "alternative-offered"].includes(r.status);
    if (filterStatus === "active") return ["reserved", "confirmed", "checked-in", "in-progress"].includes(r.status);
    if (filterStatus === "completed") return ["completed", "picked-up"].includes(r.status);
    return true;
  });

  const stats = {
    total: mobileReservations.length,
    pending: mobileReservations.filter(r => ["requested", "pending-approval", "alternative-offered"].includes(r.status)).length,
    active: mobileReservations.filter(r => ["reserved", "confirmed", "checked-in", "in-progress"].includes(r.status)).length,
    completed: mobileReservations.filter(r => ["completed", "picked-up"].includes(r.status)).length,
  };

  const MobileReservationCard = ({ reservation }: { reservation: Reservation }) => {
    const { serviceLocation, customer, services, totalDuration, finalPrice, scheduledStart, status, workerStatus } = reservation;

    return (
      <Card
        className="p-6 hover:shadow-lg transition-all cursor-pointer border-l-4 border-l-orange-500"
        onClick={() => onReservationClick?.(reservation)}
      >
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="size-12 rounded-lg bg-orange-100 flex items-center justify-center">
              <MapPin className="size-6 text-orange-600" />
            </div>
            <div>
              <p className="font-semibold">{customer.name}</p>
              <p className="text-sm text-neutral-600">{customer.vehiclePlate}</p>
            </div>
          </div>
          <Badge className={cn("text-xs", getReservationStatusColor(status))}>
            {getReservationStatusLabel(status)}
          </Badge>
        </div>

        {/* Location */}
        {serviceLocation && (
          <div className="mb-4 p-3 bg-orange-50 rounded-lg border border-orange-100">
            <div className="flex items-start gap-2">
              <MapPin className="size-4 text-orange-600 mt-0.5 shrink-0" />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-orange-900 truncate">
                  {serviceLocation.address}
                </p>
                {serviceLocation.travelDistance && serviceLocation.travelDuration && (
                  <div className="flex items-center gap-3 mt-1 text-xs text-orange-700">
                    <span>{serviceLocation.travelDistance.toFixed(1)} km</span>
                    <span>•</span>
                    <span>{serviceLocation.travelDuration} min travel</span>
                  </div>
                )}
              </div>
              {serviceLocation.directions && (
                <Button
                  size="sm"
                  variant="ghost"
                  className="shrink-0 size-8 p-0"
                  onClick={(e) => {
                    e.stopPropagation();
                    window.open(serviceLocation.directions, "_blank");
                  }}
                >
                  <Navigation className="size-4 text-orange-600" />
                </Button>
              )}
            </div>
          </div>
        )}

        {/* Details Grid */}
        <div className="grid grid-cols-2 gap-3 mb-4">
          <div className="flex items-center gap-2 text-sm">
            <Calendar className="size-4 text-neutral-500" />
            <div>
              <p className="text-xs text-neutral-600">Scheduled</p>
              <p className="font-medium">
                {scheduledStart.toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                })}
                {" "}
                {scheduledStart.toLocaleTimeString("en-US", {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 text-sm">
            <Clock className="size-4 text-neutral-500" />
            <div>
              <p className="text-xs text-neutral-600">Duration</p>
              <p className="font-medium">{totalDuration} min</p>
            </div>
          </div>

          <div className="flex items-center gap-2 text-sm">
            <Car className="size-4 text-neutral-500" />
            <div>
              <p className="text-xs text-neutral-600">Service</p>
              <p className="font-medium truncate">{services[0]?.name || "Mobile Detailing"}</p>
            </div>
          </div>

          <div className="flex items-center gap-2 text-sm">
            <DollarSign className="size-4 text-neutral-500" />
            <div>
              <p className="text-xs text-neutral-600">Price</p>
              <p className="font-medium">${finalPrice.toFixed(2)}</p>
            </div>
          </div>
        </div>

        {/* Worker Status */}
        {workerStatus && ["en-route", "on-site"].includes(workerStatus) && (
          <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
            <div className="flex items-center gap-2 text-blue-700">
              {workerStatus === "en-route" && <TrendingUp className="size-4" />}
              {workerStatus === "on-site" && <CheckCircle className="size-4" />}
              <p className="text-sm font-medium">
                {workerStatus === "en-route" && "Worker En Route"}
                {workerStatus === "on-site" && "Worker On Site"}
              </p>
            </div>
          </div>
        )}

        {/* Actions */}
        {status === "pending-approval" && (
          <div className="flex gap-2 pt-4 border-t">
            <Button
              size="sm"
              variant="outline"
              className="flex-1 text-red-600 hover:text-red-700 hover:bg-red-50"
              onClick={(e) => {
                e.stopPropagation();
                onReject?.(reservation.id);
              }}
            >
              Reject
            </Button>
            <Button
              size="sm"
              className="flex-1 bg-green-600 hover:bg-green-700"
              onClick={(e) => {
                e.stopPropagation();
                onApprove?.(reservation.id);
              }}
            >
              Approve
            </Button>
          </div>
        )}

        {/* Contact */}
        <div className="flex items-center justify-between pt-4 border-t">
          <div className="flex items-center gap-2 text-sm text-neutral-600">
            <Phone className="size-4" />
            <span>{customer.phone}</span>
          </div>
          <ChevronRight className="size-4 text-neutral-400" />
        </div>
      </Card>
    );
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold mb-1">Mobile Detailing Reservations</h1>
          <p className="text-neutral-600">Manage on-location service requests</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Filter className="size-4 mr-2" />
            Filters
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-4 gap-4">
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-neutral-600 mb-1">Total</p>
              <p className="text-2xl font-semibold">{stats.total}</p>
            </div>
            <div className="size-10 rounded-lg bg-orange-100 flex items-center justify-center">
              <MapPin className="size-5 text-orange-600" />
            </div>
          </div>
        </Card>

        <Card className="p-4 cursor-pointer hover:shadow-md transition-shadow" onClick={() => setFilterStatus("pending")}>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-neutral-600 mb-1">Pending</p>
              <p className="text-2xl font-semibold">{stats.pending}</p>
            </div>
            <div className="size-10 rounded-lg bg-yellow-100 flex items-center justify-center">
              <AlertCircle className="size-5 text-yellow-600" />
            </div>
          </div>
        </Card>

        <Card className="p-4 cursor-pointer hover:shadow-md transition-shadow" onClick={() => setFilterStatus("active")}>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-neutral-600 mb-1">Active</p>
              <p className="text-2xl font-semibold">{stats.active}</p>
            </div>
            <div className="size-10 rounded-lg bg-blue-100 flex items-center justify-center">
              <TrendingUp className="size-5 text-blue-600" />
            </div>
          </div>
        </Card>

        <Card className="p-4 cursor-pointer hover:shadow-md transition-shadow" onClick={() => setFilterStatus("completed")}>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-neutral-600 mb-1">Completed</p>
              <p className="text-2xl font-semibold">{stats.completed}</p>
            </div>
            <div className="size-10 rounded-lg bg-green-100 flex items-center justify-center">
              <CheckCircle className="size-5 text-green-600" />
            </div>
          </div>
        </Card>
      </div>

      {/* Tabs Filter */}
      <Tabs value={filterStatus} onValueChange={(v) => setFilterStatus(v as any)} className="w-full">
        <TabsList className="w-full justify-start">
          <TabsTrigger value="all">All ({stats.total})</TabsTrigger>
          <TabsTrigger value="pending">Pending ({stats.pending})</TabsTrigger>
          <TabsTrigger value="active">Active ({stats.active})</TabsTrigger>
          <TabsTrigger value="completed">Completed ({stats.completed})</TabsTrigger>
        </TabsList>

        <TabsContent value={filterStatus} className="mt-6">
          {filteredReservations.length === 0 ? (
            <Card className="p-12 text-center">
              <MapPin className="size-12 text-neutral-300 mx-auto mb-3" />
              <p className="text-neutral-500">No mobile detailing reservations found</p>
            </Card>
          ) : (
            <div className="grid gap-4">
              {filteredReservations.map((reservation) => (
                <MobileReservationCard key={reservation.id} reservation={reservation} />
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
