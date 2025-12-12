/**
 * RESERVATION TIME GRID VIEW
 * ===========================
 * 
 * Time-slot based calendar grid for reservation modules
 * Shows hourly slots with booking status and capacity
 */

"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { ScrollArea } from "../ui/scroll-area";
import { cn } from "../ui/utils";
import {
  Calendar,
  Clock,
  User,
  CheckCircle,
  AlertCircle,
  Plus,
  Eye,
  Edit,
  Phone,
  Mail,
} from "lucide-react";
import { motion } from "motion/react";
import { Station } from "../management/StationStatusManager";
import { Reservation, getReservationStatusColor, getReservationStatusLabel } from "../../types/reservation";
import { BusinessModule, getModuleConfig } from "../../types/business-modules";
import { ReservationStatusBadge } from "../management/ReservationStatusBadge";
import { ReservationDetailsDialog } from "../management/ReservationDetailsDialog";

interface TimeSlot {
  hour: number;
  minute: number;
  label: string;
}

interface ReservationTimeGridProps {
  stations: Station[];
  reservations: Reservation[];
  module?: BusinessModule;
  selectedDate: Date;
  onReservationClick?: (reservation: Reservation) => void;
  onNewReservation?: (stationId: string, timeSlot: string) => void;
}

export function ReservationTimeGrid({
  stations,
  reservations,
  module,
  selectedDate,
  onReservationClick,
  onNewReservation,
}: ReservationTimeGridProps) {
  const [selectedReservation, setSelectedReservation] = useState<Reservation | null>(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);

  // Filter stations
  const filteredStations = stations.filter(s => 
    s.operationModel === "reservation" &&
    (module ? s.businessModule === module : true)
  );

  // Generate time slots (8 AM to 6 PM)
  const generateTimeSlots = (): TimeSlot[] => {
    const slots: TimeSlot[] = [];
    for (let hour = 8; hour <= 18; hour++) {
      for (let minute = 0; minute < 60; minute += 30) {
        if (hour === 18 && minute > 0) break; // Stop at 6:00 PM
        slots.push({
          hour,
          minute,
          label: `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`,
        });
      }
    }
    return slots;
  };

  const timeSlots = generateTimeSlots();
  const dateStr = selectedDate.toISOString().split('T')[0];

  // Filter reservations for selected date
  const dayReservations = reservations.filter(r => r.scheduledDate === dateStr);

  // Get reservation for specific station and time
  const getReservationForSlot = (stationId: string, timeLabel: string) => {
    return dayReservations.find(r => 
      r.stationId === stationId &&
      r.scheduledStartTime === timeLabel
    );
  };

  // Check if slot is available
  const isSlotAvailable = (stationId: string, slot: TimeSlot) => {
    const reservation = getReservationForSlot(stationId, slot.label);
    return !reservation || ["cancelled", "no-show"].includes(reservation.status);
  };

  // Calculate statistics
  const totalSlots = filteredStations.length * timeSlots.length;
  const bookedSlots = dayReservations.filter(r => 
    !["cancelled", "no-show"].includes(r.status)
  ).length;
  const availableSlots = totalSlots - bookedSlots;
  const utilization = totalSlots > 0 ? Math.round((bookedSlots / totalSlots) * 100) : 0;

  const confirmedCount = dayReservations.filter(r => r.status === "confirmed").length;
  const pendingCount = dayReservations.filter(r => 
    ["requested", "pending-approval"].includes(r.status)
  ).length;
  const activeCount = dayReservations.filter(r => 
    ["checked-in", "in-progress"].includes(r.status)
  ).length;

  const handleSlotClick = (stationId: string, timeSlot: TimeSlot) => {
    const reservation = getReservationForSlot(stationId, timeSlot.label);
    if (reservation) {
      setSelectedReservation(reservation);
      setIsDetailsOpen(true);
      onReservationClick?.(reservation);
    } else {
      onNewReservation?.(stationId, timeSlot.label);
    }
  };

  return (
    <>
      <div className="space-y-4">
        {/* Summary Cards */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="size-10 rounded-lg bg-blue-100 flex items-center justify-center">
                  <Calendar size={20} className="text-blue-700" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{bookedSlots}</p>
                  <p className="text-xs text-neutral-600">Booked</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="size-10 rounded-lg bg-green-100 flex items-center justify-center">
                  <CheckCircle size={20} className="text-green-700" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{availableSlots}</p>
                  <p className="text-xs text-neutral-600">Available</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="size-10 rounded-lg bg-purple-100 flex items-center justify-center">
                  <Clock size={20} className="text-purple-700" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{confirmedCount}</p>
                  <p className="text-xs text-neutral-600">Confirmed</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="size-10 rounded-lg bg-yellow-100 flex items-center justify-center">
                  <AlertCircle size={20} className="text-yellow-700" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{pendingCount}</p>
                  <p className="text-xs text-neutral-600">Pending</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="size-10 rounded-lg bg-cyan-100 flex items-center justify-center">
                  <User size={20} className="text-cyan-700" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{utilization}%</p>
                  <p className="text-xs text-neutral-600">Utilization</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Time Grid */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <Clock size={20} />
                Time Slot Grid
              </CardTitle>
              <Badge variant="secondary">
                {filteredStations.length} stations • {timeSlots.length} slots/station
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            {filteredStations.length > 0 ? (
              <ScrollArea className="h-[600px]">
                <div className="space-y-6">
                  {filteredStations.map((station, stationIndex) => {
                    const moduleConfig = getModuleConfig(station.businessModule);
                    const stationReservations = dayReservations.filter(r => r.stationId === station.id);

                    return (
                      <motion.div
                        key={station.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: stationIndex * 0.1 }}
                      >
                        <div className="space-y-3">
                          {/* Station Header */}
                          <div className="flex items-center gap-3 sticky top-0 bg-white z-10 pb-2 border-b">
                            <div className={cn(
                              "size-10 rounded-lg flex items-center justify-center",
                              moduleConfig.bgColor
                            )}>
                              <moduleConfig.icon size={20} className={moduleConfig.color} />
                            </div>
                            <div className="flex-1">
                              <p className="font-semibold">{station.name}</p>
                              <p className="text-xs text-neutral-600">
                                {stationReservations.length} bookings • {moduleConfig.name}
                              </p>
                            </div>
                            <Badge 
                              variant="outline"
                              className={cn(
                                stationReservations.length > 15 && "bg-green-50 text-green-700 border-green-200",
                                stationReservations.length > 8 && stationReservations.length <= 15 && "bg-yellow-50 text-yellow-700 border-yellow-200",
                                stationReservations.length <= 8 && "bg-neutral-50 text-neutral-700"
                              )}
                            >
                              {Math.round((stationReservations.length / timeSlots.length) * 100)}% full
                            </Badge>
                          </div>

                          {/* Time Slots */}
                          <div className="grid grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-2">
                            {timeSlots.map((slot, slotIndex) => {
                              const reservation = getReservationForSlot(station.id, slot.label);
                              const isAvailable = !reservation || ["cancelled", "no-show"].includes(reservation.status);

                              return (
                                <motion.button
                                  key={`${station.id}-${slot.label}`}
                                  initial={{ opacity: 0, scale: 0.9 }}
                                  animate={{ opacity: 1, scale: 1 }}
                                  transition={{ delay: slotIndex * 0.01 }}
                                  onClick={() => handleSlotClick(station.id, slot)}
                                  className={cn(
                                    "p-3 rounded-lg border-2 transition-all text-left",
                                    "hover:shadow-md hover:scale-105",
                                    isAvailable 
                                      ? "border-neutral-200 bg-white hover:border-green-300 hover:bg-green-50" 
                                      : `${getReservationStatusColor(reservation!.status)} cursor-pointer`
                                  )}
                                >
                                  <p className="text-xs font-semibold mb-1">{slot.label}</p>
                                  {isAvailable ? (
                                    <div className="flex items-center gap-1 text-xs text-green-600">
                                      <Plus size={12} />
                                      <span>Available</span>
                                    </div>
                                  ) : (
                                    <div className="space-y-1">
                                      <p className="text-xs font-medium truncate">
                                        {reservation!.customer.name}
                                      </p>
                                      <ReservationStatusBadge 
                                        status={reservation!.status} 
                                        size="sm" 
                                        showIcon={false}
                                      />
                                    </div>
                                  )}
                                </motion.button>
                              );
                            })}
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </ScrollArea>
            ) : (
              <div className="p-12 text-center">
                <Calendar size={48} className="mx-auto text-neutral-300 mb-4" />
                <p className="text-neutral-500">No reservation stations available</p>
                <p className="text-sm text-neutral-400 mt-2">
                  Add manual detailing stations to enable reservation booking
                </p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Legend */}
        <Card>
          <CardHeader>
            <CardTitle className="text-sm">Status Legend</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-3">
              <div className="flex items-center gap-2">
                <div className="size-4 rounded bg-green-100 border-2 border-green-200" />
                <span className="text-xs">Available</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="size-4 rounded bg-yellow-100 border-2 border-yellow-200" />
                <span className="text-xs">Pending</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="size-4 rounded bg-blue-100 border-2 border-blue-200" />
                <span className="text-xs">Reserved</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="size-4 rounded bg-green-100 border-2 border-green-200" />
                <span className="text-xs">Confirmed</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="size-4 rounded bg-cyan-100 border-2 border-cyan-200" />
                <span className="text-xs">Checked In</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="size-4 rounded bg-indigo-100 border-2 border-indigo-200" />
                <span className="text-xs">In Progress</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="size-4 rounded bg-emerald-100 border-2 border-emerald-200" />
                <span className="text-xs">Completed</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Reservation Details Dialog */}
      {selectedReservation && (
        <ReservationDetailsDialog
          open={isDetailsOpen}
          onOpenChange={setIsDetailsOpen}
          reservation={selectedReservation}
        />
      )}
    </>
  );
}
