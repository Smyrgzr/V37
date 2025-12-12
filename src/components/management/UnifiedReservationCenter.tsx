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
  Users,
  MapPin,
  Clock,
  Activity,
  AlertCircle,
  CheckCircle,
  XCircle,
  Car,
  Navigation,
  TrendingUp,
  BarChart3,
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { BusinessModule, getModuleConfig } from "../../types/business-modules";
import { Reservation, getReservationStatusColor, getReservationStatusLabel } from "../../types/reservation";
import { Worker, getWorkerStatusColor, getWorkerRoleLabel } from "../../types/worker";
import { CapacityEngine, BranchCapacityConfig } from "../../utils/capacityEngine";
import { generateMockWorkers } from "../../data/mockWorkers";
import { generateTodayReservations } from "../../data/mockReservations";
import { AddBookingDialog } from "../dialogs/AddBookingDialog";
import { toast } from "sonner@2.0.3";

interface UnifiedReservationCenterProps {
  branchId?: string;
  branchName?: string;
  onReservationClick?: (reservation: Reservation) => void;
  onNewReservation?: () => void;
}

export function UnifiedReservationCenter({
  branchId = "branch-1",
  branchName = "Downtown Branch",
  onReservationClick,
  onNewReservation,
}: UnifiedReservationCenterProps) {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [viewMode, setViewMode] = useState<"timeline" | "list" | "worker">("timeline");
  const [filterModule, setFilterModule] = useState<BusinessModule | "all">("all");
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [isAddBookingDialogOpen, setIsAddBookingDialogOpen] = useState(false);

  // Mock data
  const workers = useMemo(() => generateMockWorkers(branchId, branchName), [branchId, branchName]);
  const allReservations = useMemo(() => generateTodayReservations(), []);

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
      },
    };
    return new CapacityEngine(config);
  }, [branchId, branchName, workers]);

  // Filter reservations
  const filteredReservations = useMemo(() => {
    const dateStr = selectedDate.toISOString().split("T")[0];
    return allReservations.filter((res) => {
      const matchesDate = res.scheduledDate === dateStr;
      const matchesModule = filterModule === "all" || res.businessModule === filterModule;
      const matchesStatus = filterStatus === "all" || res.status === filterStatus;
      const matchesSearch =
        searchTerm === "" ||
        res.customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        res.customer.phone.includes(searchTerm) ||
        res.reservationCode.toLowerCase().includes(searchTerm.toLowerCase());

      return matchesDate && matchesModule && matchesStatus && matchesSearch;
    });
  }, [allReservations, selectedDate, filterModule, filterStatus, searchTerm]);

  // Generate time slots (8:00 - 20:00, 30-min slots)
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

  // Group reservations by worker
  const reservationsByWorker = useMemo(() => {
    const grouped: Record<string, Reservation[]> = {};
    workers.forEach((worker) => (grouped[worker.id] = []));

    filteredReservations.forEach((res) => {
      if (res.assignedStaff?.id && grouped[res.assignedStaff.id]) {
        grouped[res.assignedStaff.id].push(res);
      }
    });

    return grouped;
  }, [filteredReservations, workers]);

  // Calculate stats
  const stats = useMemo(() => {
    const total = filteredReservations.length;
    const confirmed = filteredReservations.filter(
      (r) => r.status === "confirmed" || r.status === "reserved"
    ).length;
    const inProgress = filteredReservations.filter(
      (r) => r.status === "in-progress" || r.status === "checked-in"
    ).length;
    const completed = filteredReservations.filter((r) => r.status === "completed").length;
    const pending = filteredReservations.filter((r) => r.status === "pending-approval").length;

    const totalRevenue = filteredReservations.reduce((sum, r) => sum + r.finalPrice, 0);

    // Calculate capacity usage
    const dateStr = selectedDate.toISOString().split("T")[0];
    const capacity =
      filterModule !== "all"
        ? capacityEngine.calculateCapacity(dateStr, "08:00", "20:00", filterModule)
        : null;

    return {
      total,
      confirmed,
      inProgress,
      completed,
      pending,
      totalRevenue,
      capacityUsage: capacity?.utilizationRate || 0,
      availableWorkers: capacity?.resources.workers.available || 0,
    };
  }, [filteredReservations, selectedDate, filterModule, capacityEngine]);

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

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl">Unified Reservation Center</h1>
          <p className="text-muted-foreground">
            Manage all reservations, capacity, and worker assignments
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
          <Button className="gap-2" onClick={() => setIsAddBookingDialogOpen(true)}>
            <Plus className="h-4 w-4" />
            New Reservation
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm text-muted-foreground">Total Today</p>
              <CalendarIcon className="h-4 w-4 text-muted-foreground" />
            </div>
            <p className="text-2xl font-semibold">{stats.total}</p>
            <p className="text-xs text-muted-foreground mt-1">{stats.confirmed} confirmed</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm text-muted-foreground">In Progress</p>
              <Activity className="h-4 w-4 text-muted-foreground" />
            </div>
            <p className="text-2xl font-semibold">{stats.inProgress}</p>
            <div className="flex items-center gap-1 mt-1">
              <CheckCircle className="h-3 w-3 text-[#00a63e]" />
              <p className="text-xs text-[#00a63e]">Active services</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm text-muted-foreground">Completed</p>
              <CheckCircle className="h-4 w-4 text-muted-foreground" />
            </div>
            <p className="text-2xl font-semibold">{stats.completed}</p>
            <p className="text-xs text-muted-foreground mt-1">
              {stats.total > 0 ? Math.round((stats.completed / stats.total) * 100) : 0}% completion
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm text-muted-foreground">Revenue</p>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </div>
            <p className="text-2xl font-semibold">${stats.totalRevenue.toLocaleString()}</p>
            <p className="text-xs text-muted-foreground mt-1">Today's bookings</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm text-muted-foreground">Capacity</p>
              <BarChart3 className="h-4 w-4 text-muted-foreground" />
            </div>
            <p className="text-2xl font-semibold">{stats.capacityUsage}%</p>
            <div className="h-2 bg-[#ececf0] rounded-full mt-2 overflow-hidden">
              <div
                className={cn(
                  "h-full transition-all",
                  stats.capacityUsage > 80
                    ? "bg-[#d4183d]"
                    : stats.capacityUsage > 60
                    ? "bg-[#fbbf24]"
                    : "bg-[#00a63e]"
                )}
                style={{ width: `${stats.capacityUsage}%` }}
              />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Date Navigation & Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            {/* Date Navigation */}
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" onClick={() => navigateDate("prev")}>
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button
                variant={isToday() ? "default" : "outline"}
                size="sm"
                onClick={goToToday}
                className="min-w-[120px]"
              >
                {isToday() ? "Today" : "Go to Today"}
              </Button>
              <Button variant="outline" size="sm" onClick={() => navigateDate("next")}>
                <ChevronRight className="h-4 w-4" />
              </Button>
              <Separator orientation="vertical" className="h-8 mx-2" />
              <p className="font-medium">{formatDate(selectedDate)}</p>
            </div>

            {/* Filters */}
            <div className="flex items-center gap-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search reservations..."
                  className="pl-10 w-64 bg-[#f3f3f5] border-0"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <Select value={filterModule} onValueChange={(v) => setFilterModule(v as BusinessModule | "all")}>
                <SelectTrigger className="w-48">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Modules</SelectItem>
                  <SelectItem value="manual_detailing">Manual Detailing</SelectItem>
                  <SelectItem value="mobile_detailing">Mobile Detailing</SelectItem>
                  <SelectItem value="in_bay">In-Bay</SelectItem>
                  <SelectItem value="tunnel">Tunnel</SelectItem>
                </SelectContent>
              </Select>
              <Select value={filterStatus} onValueChange={setFilterStatus}>
                <SelectTrigger className="w-40">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="pending-approval">Pending</SelectItem>
                  <SelectItem value="confirmed">Confirmed</SelectItem>
                  <SelectItem value="in-progress">In Progress</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* View Mode Tabs */}
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
          <TabsTrigger value="worker" className="data-[state=active]:bg-white gap-2">
            <Users className="h-4 w-4" />
            By Worker
          </TabsTrigger>
        </TabsList>

        {/* Timeline View */}
        <TabsContent value="timeline" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Reservation Timeline</CardTitle>
              <CardDescription>30-minute time slots showing all reservations</CardDescription>
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
                          hasReservations ? "bg-white hover:bg-[#f3f3f5]" : "bg-[#fafafa]"
                        )}
                      >
                        <div className="flex items-start gap-4">
                          <div className="flex items-center justify-center w-16 shrink-0">
                            <p className={cn("font-medium", hasReservations ? "text-[#155DFC]" : "text-muted-foreground")}>
                              {slot}
                            </p>
                          </div>
                          <div className="flex-1">
                            {hasReservations ? (
                              <div className="space-y-2">
                                {slotReservations.map((reservation) => (
                                  <motion.div
                                    key={reservation.id}
                                    initial={{ opacity: 0, y: -10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="flex items-center gap-3 p-3 bg-[#f3f3f5] rounded-lg border border-border hover:border-[#155DFC] cursor-pointer transition-colors"
                                    onClick={() => onReservationClick?.(reservation)}
                                  >
                                    <Avatar className="size-10">
                                      <AvatarFallback className="bg-[#155DFC] text-white text-xs">
                                        {reservation.customer.name
                                          .split(" ")
                                          .map((n) => n[0])
                                          .join("")}
                                      </AvatarFallback>
                                    </Avatar>
                                    <div className="flex-1 min-w-0">
                                      <div className="flex items-center gap-2 mb-1">
                                        <p className="font-medium">{reservation.customer.name}</p>
                                        <Badge className={cn("border-0 text-xs", getReservationStatusColor(reservation.status))}>
                                          {getReservationStatusLabel(reservation.status)}
                                        </Badge>
                                      </div>
                                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                                        <span className="flex items-center gap-1">
                                          <Car className="h-3 w-3" />
                                          {reservation.customer.vehiclePlate}
                                        </span>
                                        <span className="flex items-center gap-1">
                                          <Clock className="h-3 w-3" />
                                          {reservation.totalDuration}min
                                        </span>
                                        {reservation.serviceLocation && (
                                          <span className="flex items-center gap-1">
                                            <Navigation className="h-3 w-3" />
                                            Mobile
                                          </span>
                                        )}
                                      </div>
                                    </div>
                                    <div className="text-right">
                                      <p className="font-semibold">${reservation.finalPrice}</p>
                                      {reservation.assignedStaff && (
                                        <p className="text-xs text-muted-foreground">{reservation.assignedStaff.name}</p>
                                      )}
                                    </div>
                                  </motion.div>
                                ))}
                              </div>
                            ) : (
                              <p className="text-sm text-muted-foreground">No reservations</p>
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
        <TabsContent value="list" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>All Reservations</CardTitle>
              <CardDescription>{filteredReservations.length} reservations found</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {filteredReservations.map((reservation) => (
                  <div
                    key={reservation.id}
                    className="border border-border rounded-lg p-4 hover:bg-[#f3f3f5] cursor-pointer transition-colors"
                    onClick={() => onReservationClick?.(reservation)}
                  >
                    <div className="flex items-start gap-4">
                      <Avatar className="size-12">
                        <AvatarFallback className="bg-[#155DFC] text-white">
                          {reservation.customer.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-medium">{reservation.customer.name}</h3>
                          <Badge className={cn("border-0", getReservationStatusColor(reservation.status))}>
                            {getReservationStatusLabel(reservation.status)}
                          </Badge>
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-2">
                          <div className="flex items-center gap-2 text-sm">
                            <Clock className="h-4 w-4 text-muted-foreground" />
                            <span>
                              {reservation.scheduledStartTime} ({reservation.totalDuration}min)
                            </span>
                          </div>
                          <div className="flex items-center gap-2 text-sm">
                            <Car className="h-4 w-4 text-muted-foreground" />
                            <span>{reservation.customer.vehiclePlate}</span>
                          </div>
                          {reservation.serviceLocation ? (
                            <div className="flex items-center gap-2 text-sm">
                              <MapPin className="h-4 w-4 text-muted-foreground" />
                              <span className="truncate">{reservation.serviceLocation.address}</span>
                            </div>
                          ) : (
                            <div className="flex items-center gap-2 text-sm">
                              <MapPin className="h-4 w-4 text-muted-foreground" />
                              <span>{reservation.stationName}</span>
                            </div>
                          )}
                          {reservation.assignedStaff && (
                            <div className="flex items-center gap-2 text-sm">
                              <Users className="h-4 w-4 text-muted-foreground" />
                              <span>{reservation.assignedStaff.name}</span>
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-lg">${reservation.finalPrice}</p>
                        <p className="text-xs text-muted-foreground">{reservation.reservationCode}</p>
                      </div>
                    </div>
                  </div>
                ))}

                {filteredReservations.length === 0 && (
                  <div className="text-center py-12">
                    <AlertCircle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <p className="text-muted-foreground">No reservations found for selected filters</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Worker View */}
        <TabsContent value="worker" className="mt-6">
          <div className="space-y-4">
            {workers
              .filter((w) => filterModule === "all" || w.specializations.some((s) => s.module === filterModule))
              .map((worker) => {
                const workerReservations = reservationsByWorker[worker.id] || [];
                return (
                  <Card key={worker.id}>
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <Avatar className="size-12">
                            <AvatarFallback className="bg-[#155DFC] text-white">
                              {worker.name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <CardTitle className="text-lg">{worker.name}</CardTitle>
                            <CardDescription>{getWorkerRoleLabel(worker.role)}</CardDescription>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge className={cn("border-0", getWorkerStatusColor(worker.currentStatus))}>
                            {worker.currentStatus}
                          </Badge>
                          <Badge className="bg-[#155DFC] text-white border-0">
                            {workerReservations.length} bookings
                          </Badge>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      {workerReservations.length > 0 ? (
                        <div className="space-y-2">
                          {workerReservations.map((reservation) => (
                            <div
                              key={reservation.id}
                              className="flex items-center justify-between p-3 bg-[#f3f3f5] rounded-lg border border-border hover:border-[#155DFC] cursor-pointer transition-colors"
                              onClick={() => onReservationClick?.(reservation)}
                            >
                              <div className="flex items-center gap-3">
                                <div className="flex items-center justify-center w-16 h-10 bg-white rounded border border-border">
                                  <p className="text-sm font-medium">{reservation.scheduledStartTime}</p>
                                </div>
                                <div>
                                  <p className="font-medium">{reservation.customer.name}</p>
                                  <p className="text-sm text-muted-foreground">
                                    {reservation.customer.vehiclePlate} • {reservation.totalDuration}min
                                  </p>
                                </div>
                              </div>
                              <div className="flex items-center gap-2">
                                <Badge className={cn("border-0 text-xs", getReservationStatusColor(reservation.status))}>
                                  {getReservationStatusLabel(reservation.status)}
                                </Badge>
                                <p className="font-semibold">${reservation.finalPrice}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <p className="text-center text-sm text-muted-foreground py-4">No reservations assigned</p>
                      )}
                    </CardContent>
                  </Card>
                );
              })}
          </div>
        </TabsContent>
      </Tabs>

      {/* Add Booking Dialog */}
      <AddBookingDialog
        isOpen={isAddBookingDialogOpen}
        onClose={() => setIsAddBookingDialogOpen(false)}
        branchId={branchId}
        branchName={branchName}
        onNewReservation={onNewReservation}
      />
    </div>
  );
}