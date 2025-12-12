"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Plus, CheckCircle, Clock, User, Calendar, Play } from "lucide-react";
import { toast } from "sonner@2.0.3";
import { CalendarModule } from "./UnifiedCalendarView";

type ReservationStatus = "pending" | "confirmed" | "checked-in" | "in-progress" | "completed" | "cancelled" | "no-show";

interface Reservation {
  id: string;
  type: "reservation";
  status: ReservationStatus;
  stationId: string;
  stationName: string;
  customerId: string;
  customerName: string;
  customerPhone: string;
  vehiclePlate: string;
  serviceName: string;
  scheduledTime: string; // "09:00"
  duration: number; // minutes
  price: number;
  checkedInAt?: Date;
  startedAt?: Date;
  progress?: number;
  paymentStatus: "pending" | "paid";
}

interface WalkInService {
  id: string;
  type: "walk-in";
  status: "pending" | "in-progress";
  stationId: string;
  stationName: string;
  customerName?: string;
  vehiclePlate?: string;
  serviceName: string;
  timeSlot: string; // Which time slot it occupies
  duration: number;
  price: number;
  createdAt: Date;
  startedAt?: Date;
  progress?: number;
}

interface Station {
  id: string;
  name: string;
  isAvailable: boolean;
}

interface ReservationGridViewProps {
  module: CalendarModule;
  moduleLabel: string;
  selectedDate: Date;
  branchId: string;
}

export function ReservationGridView({ module, moduleLabel, selectedDate, branchId }: ReservationGridViewProps) {
  // Time slots (30-minute intervals)
  const timeSlots = [
    "08:00", "08:30", "09:00", "09:30", "10:00", "10:30", "11:00", "11:30",
    "12:00", "12:30", "13:00", "13:30", "14:00", "14:30", "15:00", "15:30",
    "16:00", "16:30", "17:00", "17:30", "18:00", "18:30", "19:00", "19:30"
  ];

  // Mock stations
  const [stations] = useState<Station[]>([
    { id: "alpha", name: "Detail Station Alpha", isAvailable: true },
    { id: "beta", name: "Detail Station Beta", isAvailable: true },
    { id: "gamma", name: "Detail Station Gamma", isAvailable: true },
  ]);

  // Mock reservations
  const [reservations, setReservations] = useState<Reservation[]>([
    {
      id: "r1",
      type: "reservation",
      status: "in-progress",
      stationId: "alpha",
      stationName: "Detail Station Alpha",
      customerId: "c1",
      customerName: "Mike Wilson",
      customerPhone: "+1 234 567 8900",
      vehiclePlate: "34 XYZ 123",
      serviceName: "Full Detailing",
      scheduledTime: "09:00",
      duration: 180, // 3 hours
      price: 250,
      checkedInAt: new Date("2024-12-11T09:00:00"),
      startedAt: new Date("2024-12-11T09:00:00"),
      progress: 85,
      paymentStatus: "pending",
    },
    {
      id: "r2",
      type: "reservation",
      status: "confirmed",
      stationId: "gamma",
      stationName: "Detail Station Gamma",
      customerId: "c2",
      customerName: "Sarah Brown",
      customerPhone: "+1 234 567 8901",
      vehiclePlate: "34 ABC 456",
      serviceName: "Full Detail",
      scheduledTime: "14:00",
      duration: 180,
      price: 250,
      paymentStatus: "pending",
    },
  ]);

  // Mock walk-ins added to reservation view
  const [walkIns, setWalkIns] = useState<WalkInService[]>([
    {
      id: "w1",
      type: "walk-in",
      status: "pending",
      stationId: "alpha",
      stationName: "Detail Station Alpha",
      customerName: "Tom Lee",
      vehiclePlate: "34 DEF 789",
      serviceName: "Interior Clean",
      timeSlot: "14:00",
      duration: 90,
      price: 120,
      createdAt: new Date("2024-12-11T13:45:00"),
    },
  ]);

  const [isAddWalkInOpen, setIsAddWalkInOpen] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState({ stationId: "", time: "" });

  // Calculate time slots a service occupies
  const getOccupiedSlots = (startTime: string, duration: number) => {
    const startIndex = timeSlots.indexOf(startTime);
    const slotsNeeded = Math.ceil(duration / 30);
    return timeSlots.slice(startIndex, startIndex + slotsNeeded);
  };

  // Check if a slot is occupied
  const getSlotContent = (stationId: string, time: string) => {
    // Check reservations
    const reservation = reservations.find(r => {
      const occupiedSlots = getOccupiedSlots(r.scheduledTime, r.duration);
      return r.stationId === stationId && occupiedSlots.includes(time);
    });

    if (reservation) {
      // Only render the card at the start time
      if (reservation.scheduledTime === time) {
        return { type: "reservation" as const, data: reservation };
      }
      return { type: "occupied" as const };
    }

    // Check walk-ins
    const walkIn = walkIns.find(w => {
      const occupiedSlots = getOccupiedSlots(w.timeSlot, w.duration);
      return w.stationId === stationId && occupiedSlots.includes(time);
    });

    if (walkIn) {
      if (walkIn.timeSlot === time) {
        return { type: "walk-in" as const, data: walkIn };
      }
      return { type: "occupied" as const };
    }

    return { type: "available" as const };
  };

  // Handle check-in
  const handleCheckIn = (reservationId: string) => {
    setReservations(prev => prev.map(r =>
      r.id === reservationId ? { ...r, status: "checked-in" as ReservationStatus, checkedInAt: new Date() } : r
    ));
    toast.success("Customer checked in!");
  };

  // Handle start service
  const handleStartService = (id: string, type: "reservation" | "walk-in") => {
    if (type === "reservation") {
      setReservations(prev => prev.map(r =>
        r.id === id ? { ...r, status: "in-progress" as ReservationStatus, startedAt: new Date() } : r
      ));
    } else {
      setWalkIns(prev => prev.map(w =>
        w.id === id ? { ...w, status: "in-progress" as const, startedAt: new Date() } : w
      ));
    }
    toast.success("Service started!");
  };

  // Handle complete service
  const handleCompleteService = (id: string, type: "reservation" | "walk-in") => {
    if (type === "reservation") {
      setReservations(prev => prev.map(r =>
        r.id === id ? { ...r, status: "completed" as ReservationStatus } : r
      ));
    } else {
      setWalkIns(prev => prev.filter(w => w.id !== id));
    }
    toast.success("Service completed!");
  };

  // Handle add walk-in
  const handleAddWalkIn = (stationId: string, time: string) => {
    setSelectedSlot({ stationId, time });
    setIsAddWalkInOpen(true);
  };

  const handleSaveWalkIn = (formData: any) => {
    const station = stations.find(s => s.id === selectedSlot.stationId);
    if (!station) return;

    const newWalkIn: WalkInService = {
      id: `w${walkIns.length + 1}`,
      type: "walk-in",
      status: "pending",
      stationId: selectedSlot.stationId,
      stationName: station.name,
      customerName: formData.customerName,
      vehiclePlate: formData.vehiclePlate,
      serviceName: formData.serviceName,
      timeSlot: selectedSlot.time,
      duration: parseInt(formData.duration),
      price: parseInt(formData.price),
      createdAt: new Date(),
    };

    setWalkIns(prev => [...prev, newWalkIn]);
    setIsAddWalkInOpen(false);
    toast.success("Walk-in customer added!");
  };

  return (
    <div className="space-y-6">
      {/* Grid View */}
      <Card>
        <CardHeader>
          <CardTitle>{moduleLabel} - Time Slot Grid</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <div className="min-w-[1000px]">
              {/* Header */}
              <div className="grid grid-cols-[100px_repeat(3,1fr)] gap-2 mb-2">
                <div className="text-sm text-muted-foreground">Time</div>
                {stations.map(station => (
                  <div key={station.id} className="text-sm text-center">
                    {station.name}
                  </div>
                ))}
              </div>

              {/* Time slots */}
              <div className="space-y-1">
                {timeSlots.map(time => (
                  <div key={time} className="grid grid-cols-[100px_repeat(3,1fr)] gap-2">
                    <div className="text-sm text-muted-foreground flex items-center">
                      {time}
                    </div>
                    {stations.map(station => {
                      const slotContent = getSlotContent(station.id, time);

                      if (slotContent.type === "occupied") {
                        return <div key={station.id} />;
                      }

                      if (slotContent.type === "reservation") {
                        const reservation = slotContent.data;
                        const slotsNeeded = Math.ceil(reservation.duration / 30);
                        
                        return (
                          <div 
                            key={station.id}
                            className="border-2 border-blue-200 bg-blue-50 rounded-lg p-3"
                            style={{ 
                              gridRow: `span ${slotsNeeded}`,
                            }}
                          >
                            <div className="space-y-2">
                              <Badge variant={
                                reservation.status === "in-progress" ? "default" :
                                reservation.status === "checked-in" ? "secondary" :
                                "outline"
                              }>
                                📅 {reservation.status.toUpperCase().replace("-", " ")}
                              </Badge>
                              
                              <div>
                                <div>{reservation.customerName}</div>
                                <div className="text-xs text-muted-foreground">{reservation.vehiclePlate}</div>
                              </div>

                              <div className="text-sm">
                                <div>{reservation.serviceName}</div>
                                <div className="text-muted-foreground">${reservation.price} · {reservation.duration} min</div>
                              </div>

                              {reservation.status === "in-progress" && reservation.startedAt && (
                                <div className="space-y-1">
                                  <div className="text-xs text-muted-foreground">
                                    Started: {reservation.startedAt.toLocaleTimeString("en-US", { 
                                      hour: "2-digit", 
                                      minute: "2-digit" 
                                    })}
                                  </div>
                                  <div className="h-1.5 bg-secondary rounded-full overflow-hidden">
                                    <div 
                                      className="h-full bg-primary"
                                      style={{ width: `${reservation.progress}%` }}
                                    />
                                  </div>
                                  <div className="text-xs">{reservation.progress}%</div>
                                </div>
                              )}

                              <div className="flex gap-2">
                                {reservation.status === "confirmed" && (
                                  <Button 
                                    size="sm" 
                                    variant="outline"
                                    className="flex-1 text-xs"
                                    onClick={() => handleCheckIn(reservation.id)}
                                  >
                                    Check-in
                                  </Button>
                                )}
                                {reservation.status === "checked-in" && (
                                  <Button 
                                    size="sm"
                                    className="flex-1 text-xs"
                                    onClick={() => handleStartService(reservation.id, "reservation")}
                                  >
                                    <Play className="h-3 w-3 mr-1" />
                                    Start
                                  </Button>
                                )}
                                {reservation.status === "in-progress" && (
                                  <Button 
                                    size="sm"
                                    className="flex-1 text-xs"
                                    onClick={() => handleCompleteService(reservation.id, "reservation")}
                                  >
                                    <CheckCircle className="h-3 w-3 mr-1" />
                                    Complete
                                  </Button>
                                )}
                              </div>
                            </div>
                          </div>
                        );
                      }

                      if (slotContent.type === "walk-in") {
                        const walkIn = slotContent.data;
                        const slotsNeeded = Math.ceil(walkIn.duration / 30);
                        
                        return (
                          <div 
                            key={station.id}
                            className="border-2 border-amber-200 bg-amber-50 rounded-lg p-3"
                            style={{ 
                              gridRow: `span ${slotsNeeded}`,
                            }}
                          >
                            <div className="space-y-2">
                              <Badge variant={walkIn.status === "in-progress" ? "default" : "secondary"}>
                                🚶 {walkIn.status.toUpperCase().replace("-", " ")}
                              </Badge>
                              
                              <div>
                                <div>{walkIn.customerName || "Walk-in"}</div>
                                {walkIn.vehiclePlate && (
                                  <div className="text-xs text-muted-foreground">{walkIn.vehiclePlate}</div>
                                )}
                              </div>

                              <div className="text-sm">
                                <div>{walkIn.serviceName}</div>
                                <div className="text-muted-foreground">${walkIn.price} · {walkIn.duration} min</div>
                              </div>

                              <div className="text-xs text-muted-foreground">
                                Added: {walkIn.createdAt.toLocaleTimeString("en-US", { 
                                  hour: "2-digit", 
                                  minute: "2-digit" 
                                })}
                              </div>

                              <div className="flex gap-2">
                                {walkIn.status === "pending" && (
                                  <Button 
                                    size="sm"
                                    className="flex-1 text-xs"
                                    onClick={() => handleStartService(walkIn.id, "walk-in")}
                                  >
                                    <Play className="h-3 w-3 mr-1" />
                                    Start
                                  </Button>
                                )}
                                {walkIn.status === "in-progress" && (
                                  <Button 
                                    size="sm"
                                    className="flex-1 text-xs"
                                    onClick={() => handleCompleteService(walkIn.id, "walk-in")}
                                  >
                                    <CheckCircle className="h-3 w-3 mr-1" />
                                    Complete
                                  </Button>
                                )}
                              </div>
                            </div>
                          </div>
                        );
                      }

                      // Available slot
                      return (
                        <div 
                          key={station.id}
                          className="border border-dashed border-gray-300 rounded-lg p-2 hover:bg-gray-50 transition-colors cursor-pointer flex items-center justify-center min-h-[60px]"
                          onClick={() => handleAddWalkIn(station.id, time)}
                        >
                          <Button variant="ghost" size="sm" className="text-xs">
                            <Plus className="h-3 w-3 mr-1" />
                            Add Walk-in
                          </Button>
                        </div>
                      );
                    })}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Add Walk-in Dialog */}
      <AddWalkInDialog
        isOpen={isAddWalkInOpen}
        onClose={() => setIsAddWalkInOpen(false)}
        onSave={handleSaveWalkIn}
        stationName={stations.find(s => s.id === selectedSlot.stationId)?.name || ""}
        timeSlot={selectedSlot.time}
      />
    </div>
  );
}

// Add Walk-in Dialog Component
function AddWalkInDialog({ 
  isOpen, 
  onClose, 
  onSave, 
  stationName,
  timeSlot
}: { 
  isOpen: boolean; 
  onClose: () => void; 
  onSave: (data: any) => void;
  stationName: string;
  timeSlot: string;
}) {
  const [formData, setFormData] = useState({
    customerName: "",
    vehiclePlate: "",
    serviceName: "",
    duration: "90",
    price: "120",
  });

  const handleSubmit = () => {
    onSave(formData);
    setFormData({
      customerName: "",
      vehiclePlate: "",
      serviceName: "",
      duration: "90",
      price: "120",
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>
            Add Walk-in Customer
            <div className="text-sm text-muted-foreground mt-1">
              {stationName} · {timeSlot}
            </div>
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div>
            <Label>Customer Name (Optional)</Label>
            <Input
              placeholder="John Doe"
              value={formData.customerName}
              onChange={(e) => setFormData(prev => ({ ...prev, customerName: e.target.value }))}
            />
          </div>
          <div>
            <Label>Vehicle Plate (Optional)</Label>
            <Input
              placeholder="34 ABC 123"
              value={formData.vehiclePlate}
              onChange={(e) => setFormData(prev => ({ ...prev, vehiclePlate: e.target.value }))}
            />
          </div>
          <div>
            <Label>Service Type</Label>
            <Select 
              value={formData.serviceName}
              onValueChange={(value) => setFormData(prev => ({ ...prev, serviceName: value }))}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select service" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Interior Clean">Interior Clean - $120</SelectItem>
                <SelectItem value="Full Detailing">Full Detailing - $250</SelectItem>
                <SelectItem value="Paint Correction">Paint Correction - $350</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>Duration (min)</Label>
              <Input
                type="number"
                value={formData.duration}
                onChange={(e) => setFormData(prev => ({ ...prev, duration: e.target.value }))}
              />
            </div>
            <div>
              <Label>Price ($)</Label>
              <Input
                type="number"
                value={formData.price}
                onChange={(e) => setFormData(prev => ({ ...prev, price: e.target.value }))}
              />
            </div>
          </div>
          <div className="flex gap-2 pt-4">
            <Button variant="outline" onClick={onClose} className="flex-1">
              Cancel
            </Button>
            <Button onClick={handleSubmit} className="flex-1">
              Add Customer
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
