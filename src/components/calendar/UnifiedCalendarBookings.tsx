/**
 * UNIFIED CALENDAR & BOOKINGS - OPERATIONS CENTER
 * ================================================
 * Central hub for all operations across all business modules
 * - Walk-in modules (In-Bay, Tunnel, Self-Service)
 * - Reservation-based (Manual Detailing, Pick-up & Drop-off)
 * - Mobile Service with map integration
 */

"use client";

import { useState, useMemo } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Input } from "../ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { Separator } from "../ui/separator";
import { ScrollArea } from "../ui/scroll-area";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "../ui/dialog";
import { cn } from "../ui/utils";
import {
  Calendar as CalendarIcon,
  ChevronLeft,
  ChevronRight,
  Plus,
  Search,
  Filter,
  Download,
  Grid,
  List,
  Clock,
  MapPin,
  Car,
  Phone,
  Mail,
  Navigation,
  AlertCircle,
  CheckCircle,
  XCircle,
  TrendingUp,
  Users,
  Activity,
  DollarSign,
  FileText,
  Radio,
  Package,
  Zap,
  Wrench,
  Truck,
  PackageOpen,
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { BusinessModule, getModuleConfig } from "../../types/business-modules";
import { Reservation, getReservationStatusColor, getReservationStatusLabel } from "../../types/reservation";
import { Station } from "../management/StationStatusManager";
import { ApprovalDashboard } from "../reservation/ApprovalDashboard";
import { CheckInInterface } from "../reservation/CheckInInterface";
import { ServiceProgressTracker } from "../reservation/ServiceProgressTracker";
import { DirectionNavigator } from "../mobile/DirectionNavigator";
import { MobileCheckIn } from "../mobile/MobileCheckIn";
import { WalkInCardView } from "./WalkInCardView";
import { ReservationGridView } from "./ReservationGridView";
import { MobileServiceView } from "./MobileServiceView";

export type CalendarModule = 
  | "in_bay" 
  | "tunnel" 
  | "self_service" 
  | "manual_detailing" 
  | "mobile" 
  | "pickup_dropoff_detailing";

interface UnifiedCalendarBookingsProps {
  reservations: Reservation[];
  stations: Station[];
  onApproveReservation?: (id: string) => void;
  onRejectReservation?: (id: string, reason?: string) => void;
  onSuggestAlternative?: (id: string) => void;
  onCheckIn?: (id: string) => void;
  onStartService?: (id: string) => void;
  onCompleteService?: (id: string) => void;
  onNewReservation?: () => void;
  onStationStatusChange?: (stationId: string, status: any) => void;
}

export function UnifiedCalendarBookings({
  reservations,
  stations,
  onApproveReservation,
  onRejectReservation,
  onSuggestAlternative,
  onCheckIn,
  onStartService,
  onCompleteService,
  onNewReservation,
  onStationStatusChange,
}: UnifiedCalendarBookingsProps) {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [viewMode, setViewMode] = useState<"timeline" | "list" | "module">("list");
  const [selectedModule, setSelectedModule] = useState<BusinessModule | "all">("all");
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedReservation, setSelectedReservation] = useState<Reservation | null>(null);
  const [showDetailDialog, setShowDetailDialog] = useState(false);
  const [showMobileMapDialog, setShowMobileMapDialog] = useState(false);

  // Filter reservations by date
  const dateStr = selectedDate.toISOString().split("T")[0];
  const filteredReservations = useMemo(() => {
    return reservations.filter((res) => {
      const matchesDate = res.scheduledDate === dateStr;
      const matchesModule = selectedModule === "all" || res.businessModule === selectedModule;
      const matchesStatus = filterStatus === "all" || res.status === filterStatus;
      const matchesSearch =
        searchTerm === "" ||
        res.customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        res.customer.phone?.includes(searchTerm) ||
        res.customer.email?.toLowerCase().includes(searchTerm) ||
        res.reservationCode?.toLowerCase().includes(searchTerm.toLowerCase());

      return matchesDate && matchesModule && matchesStatus && matchesSearch;
    });
  }, [reservations, selectedDate, selectedModule, filterStatus, searchTerm]);

  // Separate by status categories
  const pendingApproval = useMemo(
    () => filteredReservations.filter((r) => r.status === "pending-approval" || r.status === "requested"),
    [filteredReservations]
  );
  const awaitingCheckIn = useMemo(
    () => filteredReservations.filter((r) => r.status === "confirmed" || r.status === "reserved"),
    [filteredReservations]
  );
  const inProgress = useMemo(
    () => filteredReservations.filter((r) => r.status === "in-progress" || r.status === "checked-in"),
    [filteredReservations]
  );
  const completed = useMemo(
    () => filteredReservations.filter((r) => r.status === "completed"),
    [filteredReservations]
  );

  // Mobile detailing specific
  const mobileReservations = useMemo(
    () => filteredReservations.filter((r) => r.businessModule === "mobile_detailing"),
    [filteredReservations]
  );

  // Generate time slots (8:00 - 20:00, 30-min intervals)
  const timeSlots = useMemo(() => {
    const slots: string[] = [];
    for (let hour = 8; hour < 20; hour++) {
      slots.push(`${hour.toString().padStart(2, "0")}:00`);
      slots.push(`${hour.toString().padStart(2, "0")}:30`);
    }
    return slots;
  }, []);

  // Group reservations by time slot
  const reservationsByTimeSlot = useMemo(() => {
    const grouped: Record<string, Reservation[]> = {};
    timeSlots.forEach((slot) => (grouped[slot] = []));

    filteredReservations.forEach((res) => {
      const slot = res.scheduledStartTime.substring(0, 5);
      if (grouped[slot]) {
        grouped[slot].push(res);
      }
    });

    return grouped;
  }, [filteredReservations, timeSlots]);

  // Calculate stats
  const stats = useMemo(() => {
    const total = filteredReservations.length;
    const pending = pendingApproval.length;
    const active = inProgress.length;
    const done = completed.length;
    const totalRevenue = filteredReservations.reduce((sum, r) => sum + r.finalPrice, 0);

    return { total, pending, active, done, totalRevenue };
  }, [filteredReservations, pendingApproval, inProgress, completed]);

  // Date navigation
  const navigateDate = (direction: "prev" | "next") => {
    const newDate = new Date(selectedDate);
    newDate.setDate(newDate.getDate() + (direction === "next" ? 1 : -1));
    setSelectedDate(newDate);
  };

  const goToToday = () => {
    setSelectedDate(new Date());
  };

  const isToday = () => {
    const today = new Date();
    return (
      selectedDate.getDate() === today.getDate() &&
      selectedDate.getMonth() === today.getMonth() &&
      selectedDate.getFullYear() === today.getFullYear()
    );
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  };

  const handleReservationClick = (reservation: Reservation) => {
    setSelectedReservation(reservation);
    setShowDetailDialog(true);
  };

  // Render reservation card (unified design)
  const ReservationCard = ({ reservation }: { reservation: Reservation }) => {
    const isMobile = reservation.businessModule === "mobile_detailing";

    return (
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center gap-3 p-4 bg-white rounded-lg border border-border hover:border-[#155DFC] cursor-pointer transition-all group"
        onClick={() => handleReservationClick(reservation)}
      >
        <Avatar className="size-12">
          <AvatarFallback className="bg-[#155DFC] text-white">
            {reservation.customer.name
              .split(" ")
              .map((n) => n[0])
              .join("")}
          </AvatarFallback>
        </Avatar>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <p className="font-medium truncate">{reservation.customer.name}</p>
            {isMobile && (
              <Badge className="bg-[#fb923c] text-white border-0 text-xs">
                <Navigation className="h-3 w-3 mr-1" />
                Mobile
              </Badge>
            )}
            <Badge className={cn("border-0 text-xs", getReservationStatusColor(reservation.status))}>
              {getReservationStatusLabel(reservation.status)}
            </Badge>
          </div>
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <span className="flex items-center gap-1">
              <Clock className="h-3 w-3" />
              {reservation.scheduledStartTime}
            </span>
            <span className="flex items-center gap-1">
              <Car className="h-3 w-3" />
              {reservation.customer.vehiclePlate}
            </span>
            {isMobile && reservation.serviceLocation && (
              <span className="flex items-center gap-1 truncate">
                <MapPin className="h-3 w-3" />
                {reservation.serviceLocation.address}
              </span>
            )}
          </div>
        </div>
        <div className="text-right">
          <p className="font-semibold text-lg">${reservation.finalPrice}</p>
          <p className="text-xs text-muted-foreground">{reservation.totalDuration}min</p>
        </div>
      </motion.div>
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl">Operations</h1>
          <p className="text-muted-foreground">
            Real-time operations management across all business modules
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
          <Button className="gap-2" onClick={onNewReservation}>
            <Plus className="h-4 w-4" />
            New Reservation
          </Button>
        </div>
      </div>

      {/* Business Module Tabs */}
      <Tabs value={selectedModule} onValueChange={(v) => setSelectedModule(v as CalendarModule | "all")} className="w-full">
        <Card>
          <CardContent className="p-4">
            <TabsList className="grid grid-cols-7 w-full">
              <TabsTrigger value="all">All Modules</TabsTrigger>
              <TabsTrigger value="in_bay" className="flex items-center gap-2">
                <Car className="h-4 w-4" />
                <span className="hidden lg:inline">In-Bay</span>
              </TabsTrigger>
              <TabsTrigger value="tunnel" className="flex items-center gap-2">
                <Zap className="h-4 w-4" />
                <span className="hidden lg:inline">Tunnel</span>
              </TabsTrigger>
              <TabsTrigger value="self_service" className="flex items-center gap-2">
                <Wrench className="h-4 w-4" />
                <span className="hidden lg:inline">Self-Service</span>
              </TabsTrigger>
              <TabsTrigger value="manual_detailing" className="flex items-center gap-2">
                <Users className="h-4 w-4" />
                <span className="hidden lg:inline">Manual</span>
              </TabsTrigger>
              <TabsTrigger value="mobile" className="flex items-center gap-2">
                <Truck className="h-4 w-4" />
                <span className="hidden lg:inline">Mobile</span>
              </TabsTrigger>
              <TabsTrigger value="pickup_dropoff_detailing" className="flex items-center gap-2">
                <PackageOpen className="h-4 w-4" />
                <span className="hidden lg:inline">Pick-up</span>
              </TabsTrigger>
            </TabsList>
          </CardContent>
        </Card>

        {/* Tab Contents */}
        <div className="mt-6">
          {/* All Modules View */}
          <TabsContent value="all" className="m-0">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-6">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-sm text-muted-foreground">Total Today</p>
                    <CalendarIcon className="h-4 w-4 text-muted-foreground" />
                  </div>
                  <p className="text-2xl font-semibold">{stats.total}</p>
                  <p className="text-xs text-muted-foreground mt-1">All bookings</p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-sm text-muted-foreground">Pending Approval</p>
                    <AlertCircle className="h-4 w-4 text-[#fbbf24]" />
                  </div>
                  <p className="text-2xl font-semibold text-[#fbbf24]">{stats.pending}</p>
                  <p className="text-xs text-muted-foreground mt-1">Need action</p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-sm text-muted-foreground">In Progress</p>
                    <Activity className="h-4 w-4 text-[#155DFC]" />
                  </div>
                  <p className="text-2xl font-semibold text-[#155DFC]">{stats.active}</p>
                  <p className="text-xs text-muted-foreground mt-1">Active services</p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-sm text-muted-foreground">Completed</p>
                    <CheckCircle className="h-4 w-4 text-[#00a63e]" />
                  </div>
                  <p className="text-2xl font-semibold text-[#00a63e]">{stats.done}</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    {stats.total > 0 ? Math.round((stats.done / stats.total) * 100) : 0}% completion
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-sm text-muted-foreground">Revenue</p>
                    <DollarSign className="h-4 w-4 text-muted-foreground" />
                  </div>
                  <p className="text-2xl font-semibold">${stats.totalRevenue.toLocaleString()}</p>
                  <p className="text-xs text-muted-foreground mt-1">Today's total</p>
                </CardContent>
              </Card>
            </div>

            {/* Existing Timeline/List/Module Views */}
            <Tabs value={viewMode} onValueChange={(v) => setViewMode(v as any)} className="w-full">
              <TabsList className="bg-[#ececf0] p-1 h-9">
                <TabsTrigger value="timeline" className="data-[state=active]:bg-white gap-2">
                  <Grid className="h-4 w-4" />
                  Timeline
                </TabsTrigger>
                <TabsTrigger value="list" className="data-[state=active]:bg-white gap-2">
                  <List className="h-4 w-4" />
                  List View
                </TabsTrigger>
                <TabsTrigger value="module" className="data-[state=active]:bg-white gap-2">
                  <Package className="h-4 w-4" />
                  By Module
                </TabsTrigger>
              </TabsList>

              {/* Timeline View */}
              <TabsContent value="timeline" className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Daily Timeline</CardTitle>
                    <CardDescription>30-minute slots showing all reservations</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ScrollArea className="h-[600px]">
                      <div className="space-y-2">
                        {timeSlots.map((slot) => {
                          const slotReservations = reservationsByTimeSlot[slot] || [];
                          const hasReservations = slotReservations.length > 0;

                          return (
                            <div
                              key={slot}
                              className={cn(
                                "border border-border rounded-lg p-3 transition-colors",
                                hasReservations ? "bg-white" : "bg-[#fafafa]"
                              )}
                            >
                              <div className="flex items-start gap-4">
                                <div className="flex items-center justify-center w-16 shrink-0">
                                  <p
                                    className={cn(
                                      "font-medium",
                                      hasReservations ? "text-[#155DFC]" : "text-muted-foreground"
                                    )}
                                  >
                                    {slot}
                                  </p>
                                </div>
                                <div className="flex-1">
                                  {hasReservations ? (
                                    <div className="space-y-2">
                                      {slotReservations.map((reservation) => (
                                        <ReservationCard key={reservation.id} reservation={reservation} />
                                      ))}
                                    </div>
                                  ) : (
                                    <p className="text-sm text-muted-foreground py-2">No reservations</p>
                                  )}
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </ScrollArea>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* List View */}
              <TabsContent value="list" className="mt-6 space-y-4">
                {/* Awaiting Check-in */}
                {awaitingCheckIn.length > 0 && (
                  <Card>
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <CardTitle>Awaiting Check-in</CardTitle>
                        <Badge className="bg-[#155DFC] text-white border-0">{awaitingCheckIn.length} ready</Badge>
                      </div>
                      <CardDescription>Confirmed reservations ready for check-in</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        {awaitingCheckIn.map((reservation) => (
                          <ReservationCard key={reservation.id} reservation={reservation} />
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                )}

                {/* In Progress */}
                {inProgress.length > 0 && (
                  <Card>
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <CardTitle>In Progress</CardTitle>
                        <Badge className="bg-[#00a63e] text-white border-0">{inProgress.length} active</Badge>
                      </div>
                      <CardDescription>Services currently being performed</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        {inProgress.map((reservation) => (
                          <ReservationCard key={reservation.id} reservation={reservation} />
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                )}

                {/* Completed */}
                {completed.length > 0 && (
                  <Card>
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <CardTitle>Completed</CardTitle>
                        <Badge className="bg-[#64748b] text-white border-0">{completed.length} done</Badge>
                      </div>
                      <CardDescription>Successfully completed services</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        {completed.map((reservation) => (
                          <ReservationCard key={reservation.id} reservation={reservation} />
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                )}

                {filteredReservations.length === 0 && (
                  <Card>
                    <CardContent className="flex flex-col items-center justify-center py-12">
                      <AlertCircle className="h-12 w-12 text-muted-foreground mb-4" />
                      <p className="text-muted-foreground">No reservations found for selected date</p>
                      <Button className="mt-4" onClick={onNewReservation}>
                        <Plus className="h-4 w-4 mr-2" />
                        Create New Reservation
                      </Button>
                    </CardContent>
                  </Card>
                )}
              </TabsContent>

              {/* Module View */}
              <TabsContent value="module" className="mt-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                  {/* Manual Detailing */}
                  <Card>
                    <CardHeader>
                      <CardTitle>Manual Detailing</CardTitle>
                      <CardDescription>
                        {filteredReservations.filter((r) => r.businessModule === "manual_detailing").length} reservations
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        {filteredReservations
                          .filter((r) => r.businessModule === "manual_detailing")
                          .map((reservation) => (
                            <ReservationCard key={reservation.id} reservation={reservation} />
                          ))}
                      </div>
                    </CardContent>
                  </Card>

                  {/* Mobile Detailing */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Navigation className="h-5 w-5 text-[#fb923c]" />
                        Mobile Detailing
                      </CardTitle>
                      <CardDescription>
                        {mobileReservations.length} mobile reservations
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        {mobileReservations.map((reservation) => (
                          <ReservationCard key={reservation.id} reservation={reservation} />
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  {/* In-Bay */}
                  <Card>
                    <CardHeader>
                      <CardTitle>In-Bay Automatic</CardTitle>
                      <CardDescription>
                        {filteredReservations.filter((r) => r.businessModule === "in_bay").length} bookings
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        {filteredReservations
                          .filter((r) => r.businessModule === "in_bay")
                          .map((reservation) => (
                            <ReservationCard key={reservation.id} reservation={reservation} />
                          ))}
                      </div>
                    </CardContent>
                  </Card>

                  {/* Tunnel */}
                  <Card>
                    <CardHeader>
                      <CardTitle>Tunnel</CardTitle>
                      <CardDescription>
                        {filteredReservations.filter((r) => r.businessModule === "tunnel").length} bookings
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        {filteredReservations
                          .filter((r) => r.businessModule === "tunnel")
                          .map((reservation) => (
                            <ReservationCard key={reservation.id} reservation={reservation} />
                          ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
            </Tabs>
          </TabsContent>

          {/* Walk-in Modules (In-Bay, Tunnel, Self-Service) */}
          <TabsContent value="in_bay" className="m-0">
            <WalkInCardView
              module="in_bay"
              moduleLabel="In-Bay Automatic"
              selectedDate={selectedDate}
              branchId="b1"
            />
          </TabsContent>

          <TabsContent value="tunnel" className="m-0">
            <WalkInCardView
              module="tunnel"
              moduleLabel="Tunnel Wash"
              selectedDate={selectedDate}
              branchId="b1"
            />
          </TabsContent>

          <TabsContent value="self_service" className="m-0">
            <WalkInCardView
              module="self_service"
              moduleLabel="Self-Service"
              selectedDate={selectedDate}
              branchId="b1"
            />
          </TabsContent>

          {/* Reservation Modules (Manual Detailing, Pick-up & Drop-off) */}
          <TabsContent value="manual_detailing" className="m-0">
            <ReservationGridView
              module="manual_detailing"
              moduleLabel="Manual Detailing"
              selectedDate={selectedDate}
              branchId="b1"
            />
          </TabsContent>

          <TabsContent value="pickup_dropoff_detailing" className="m-0">
            <ReservationGridView
              module="pickup_dropoff_detailing"
              moduleLabel="Pick-up & Drop-off Detailing"
              selectedDate={selectedDate}
              branchId="b1"
            />
          </TabsContent>

          {/* Mobile Service Module */}
          <TabsContent value="mobile" className="m-0">
            <MobileServiceView
              selectedDate={selectedDate}
              branchId="b1"
            />
          </TabsContent>
        </div>
      </Tabs>

      {/* Reservation Detail Dialog */}
      <Dialog open={showDetailDialog} onOpenChange={setShowDetailDialog}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Reservation Details</DialogTitle>
            <DialogDescription>
              {selectedReservation?.reservationCode} • {selectedReservation?.customer.name}
            </DialogDescription>
          </DialogHeader>
          {selectedReservation && (
            <div className="space-y-6">
              {/* Customer Info */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Customer</p>
                  <div className="flex items-center gap-2">
                    <Avatar className="size-10">
                      <AvatarFallback className="bg-[#155DFC] text-white">
                        {selectedReservation.customer.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium">{selectedReservation.customer.name}</p>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <Phone className="h-3 w-3" />
                        {selectedReservation.customer.phone}
                      </div>
                    </div>
                  </div>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Vehicle</p>
                  <div className="flex items-center gap-2">
                    <Car className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <p className="font-medium">{selectedReservation.customer.vehiclePlate}</p>
                      <p className="text-xs text-muted-foreground">
                        {selectedReservation.customer.vehicleModel}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Service Info */}
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Date & Time</p>
                  <div className="flex items-center gap-2">
                    <CalendarIcon className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <p className="font-medium">{selectedReservation.scheduledDate}</p>
                      <p className="text-xs text-muted-foreground">{selectedReservation.scheduledStartTime}</p>
                    </div>
                  </div>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Duration</p>
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <p className="font-medium">{selectedReservation.totalDuration} min</p>
                  </div>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Price</p>
                  <div className="flex items-center gap-2">
                    <DollarSign className="h-4 w-4 text-muted-foreground" />
                    <p className="font-medium">${selectedReservation.finalPrice}</p>
                  </div>
                </div>
              </div>

              {/* Location (Mobile only) */}
              {selectedReservation.serviceLocation && (
                <div>
                  <p className="text-sm text-muted-foreground mb-2">Service Location</p>
                  <div className="flex items-start gap-2 p-3 bg-[#f3f3f5] rounded-lg">
                    <MapPin className="h-4 w-4 text-muted-foreground mt-0.5" />
                    <div className="flex-1">
                      <p className="font-medium">{selectedReservation.serviceLocation.address}</p>
                      {selectedReservation.serviceLocation.specialInstructions && (
                        <p className="text-sm text-muted-foreground mt-1">
                          {selectedReservation.serviceLocation.specialInstructions}
                        </p>
                      )}
                    </div>
                  </div>
                  {/* Mobile Navigation */}
                  {selectedReservation.businessModule === "mobile_detailing" && 
                   selectedReservation.status === "in-progress" && (
                    <div className="mt-4">
                      <DirectionNavigator reservation={selectedReservation} />
                    </div>
                  )}
                </div>
              )}

              {/* Check-in Interface */}
              {selectedReservation.status === "confirmed" && (
                <Card className="border-[#155DFC] bg-[#eff6ff]">
                  <CardContent className="p-4">
                    <CheckInInterface
                      reservation={selectedReservation}
                      onCheckIn={(method) => {
                        onCheckIn?.(selectedReservation.id);
                        setShowDetailDialog(false);
                      }}
                    />
                  </CardContent>
                </Card>
              )}

              {/* Service Progress */}
              {(selectedReservation.status === "in-progress" || 
                selectedReservation.status === "checked-in") && (
                <Card>
                  <CardContent className="p-4">
                    <ServiceProgressTracker
                      reservation={selectedReservation}
                      onComplete={() => {
                        onCompleteService?.(selectedReservation.id);
                        setShowDetailDialog(false);
                      }}
                    />
                  </CardContent>
                </Card>
              )}

              {/* Mobile Check-in for Mobile Detailing */}
              {selectedReservation.businessModule === "mobile_detailing" && 
               selectedReservation.status === "checked-in" && (
                <Card className="border-[#fb923c] bg-orange-50">
                  <CardContent className="p-4">
                    <MobileCheckIn
                      reservation={selectedReservation}
                      onStartService={() => {
                        onStartService?.(selectedReservation.id);
                      }}
                      onComplete={() => {
                        onCompleteService?.(selectedReservation.id);
                        setShowDetailDialog(false);
                      }}
                    />
                  </CardContent>
                </Card>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}