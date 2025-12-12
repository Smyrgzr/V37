/**
 * MODULE-AWARE CALENDAR VIEW
 * ==========================
 * 
 * Comprehensive calendar system that adapts based on business module operation model:
 * - Walk-in modules: Transaction list view
 * - Reservation modules: Time-slot grid view
 * - Module filtering and switching
 * - Date navigation
 */

"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Separator } from "../ui/separator";
import { cn } from "../ui/utils";
import {
  Calendar,
  List,
  Grid,
  ChevronLeft,
  ChevronRight,
  TrendingUp,
  Activity,
  LayoutGrid,
  Plus,
  Download,
  Filter,
  Search,
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { Station } from "../management/StationStatusManager";
import { Reservation } from "../../types/reservation";
import { BusinessModule, getModuleConfig, getOperationModel } from "../../types/business-modules";
import { CalendarModuleFilter } from "./CalendarModuleFilter";
import { WalkInTransactionList } from "./WalkInTransactionList";
import { ReservationTimeGrid } from "./ReservationTimeGrid";

interface ModuleAwareCalendarViewProps {
  stations: Station[];
  reservations: Reservation[];
  onStationStatusChange?: (stationId: string, status: any) => void;
  onReservationClick?: (reservation: Reservation) => void;
  onNewReservation?: (stationId: string, timeSlot: string) => void;
  onNewTransaction?: () => void;
}

export function ModuleAwareCalendarView({
  stations,
  reservations,
  onStationStatusChange,
  onReservationClick,
  onNewReservation,
  onNewTransaction,
}: ModuleAwareCalendarViewProps) {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [activeModule, setActiveModule] = useState<"all" | BusinessModule>("all");
  const [viewType, setViewType] = useState<"auto" | "list" | "grid">("auto");

  // Determine which view to show based on active module
  const getViewMode = () => {
    if (viewType !== "auto") return viewType;

    if (activeModule === "all") {
      // Check if we have both types
      const hasWalkIn = stations.some(s => s.operationModel === "walk-in");
      const hasReservation = stations.some(s => s.operationModel === "reservation");
      
      if (hasWalkIn && hasReservation) return "list"; // Default to list for mixed
      if (hasReservation) return "grid";
      return "list";
    }

    const operationModel = getOperationModel(activeModule as BusinessModule);
    return operationModel === "walk-in" ? "list" : "grid";
  };

  const currentViewMode = getViewMode();

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
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const formatShortDate = (date: Date) => {
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  // Filter stations and reservations based on active module
  const filteredStations = stations.filter(s =>
    activeModule === "all" ? true : s.businessModule === activeModule
  );

  const filteredReservations = reservations.filter(r =>
    activeModule === "all" ? true : r.businessModule === activeModule
  );

  // Calculate stats
  const dateStr = selectedDate.toISOString().split('T')[0];
  const dayReservations = filteredReservations.filter(r => r.scheduledDate === dateStr);
  const activeTransactions = filteredStations.filter(s => s.status === "occupied").length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">Calendar & Scheduling</h1>
          <p className="text-neutral-600 mt-1">
            Manage reservations and track real-time operations
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Download size={16} className="mr-2" />
            Export
          </Button>
          <Button size="sm" onClick={() => {
            if (currentViewMode === "list") {
              onNewTransaction?.();
            } else {
              // Open new reservation form
              console.log("New reservation");
            }
          }}>
            <Plus size={16} className="mr-2" />
            New {currentViewMode === "list" ? "Transaction" : "Reservation"}
          </Button>
        </div>
      </div>

      {/* Module Filter */}
      <CalendarModuleFilter
        stations={stations}
        reservations={reservations}
        selectedDate={selectedDate}
        activeModule={activeModule}
        onModuleChange={setActiveModule}
      />

      <Separator />

      {/* Date Navigation & View Controls */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        {/* Date Navigation */}
        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            size="sm"
            onClick={() => navigateDate("prev")}
          >
            <ChevronLeft size={16} />
          </Button>

          <div className="flex items-center gap-3">
            <Calendar size={20} className="text-neutral-600" />
            <div>
              <p className="font-semibold">{formatDate(selectedDate)}</p>
              <p className="text-xs text-neutral-600">
                {isToday() ? (
                  <Badge variant="default" className="text-xs">Today</Badge>
                ) : (
                  formatShortDate(selectedDate)
                )}
              </p>
            </div>
          </div>

          <Button
            variant="outline"
            size="sm"
            onClick={() => navigateDate("next")}
          >
            <ChevronRight size={16} />
          </Button>

          {!isToday() && (
            <Button
              variant="ghost"
              size="sm"
              onClick={goToToday}
            >
              Today
            </Button>
          )}
        </div>

        {/* View Controls */}
        <div className="flex items-center gap-2">
          <Tabs value={viewType} onValueChange={(v: any) => setViewType(v)}>
            <TabsList>
              <TabsTrigger value="auto" className="gap-1.5">
                <LayoutGrid size={14} />
                Auto
              </TabsTrigger>
              <TabsTrigger value="list" className="gap-1.5">
                <List size={14} />
                List
              </TabsTrigger>
              <TabsTrigger value="grid" className="gap-1.5">
                <Grid size={14} />
                Grid
              </TabsTrigger>
            </TabsList>
          </Tabs>

          <Badge variant="secondary" className="ml-2">
            {currentViewMode === "list" ? "Transaction List" : "Time Grid"}
          </Badge>
        </div>
      </div>

      {/* Quick Stats Bar */}
      <Card>
        <CardContent className="p-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-blue-600">
                {dayReservations.length}
              </p>
              <p className="text-xs text-neutral-600 mt-1">Reservations</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-green-600">
                {activeTransactions}
              </p>
              <p className="text-xs text-neutral-600 mt-1">Active Now</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-purple-600">
                {filteredStations.length}
              </p>
              <p className="text-xs text-neutral-600 mt-1">
                {activeModule === "all" ? "All Stations" : "Filtered Stations"}
              </p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-orange-600">
                {filteredStations.filter(s => s.status === "available").length}
              </p>
              <p className="text-xs text-neutral-600 mt-1">Available</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Main Content - Adaptive View */}
      <AnimatePresence mode="wait">
        {currentViewMode === "list" ? (
          <motion.div
            key="list-view"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <WalkInTransactionList
              stations={filteredStations}
              module={activeModule === "all" ? undefined : activeModule as BusinessModule}
              selectedDate={selectedDate}
            />
          </motion.div>
        ) : (
          <motion.div
            key="grid-view"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <ReservationTimeGrid
              stations={filteredStations}
              reservations={filteredReservations}
              module={activeModule === "all" ? undefined : activeModule as BusinessModule}
              selectedDate={selectedDate}
              onReservationClick={onReservationClick}
              onNewReservation={onNewReservation}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Module Info Card */}
      {activeModule !== "all" && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <TrendingUp size={16} />
              {getModuleConfig(activeModule as BusinessModule).name} - Daily Overview
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="p-3 bg-blue-50 rounded-lg">
                <p className="text-sm text-blue-600 mb-1">Operation Model</p>
                <p className="font-semibold text-blue-900">
                  {getOperationModel(activeModule as BusinessModule) === "walk-in" 
                    ? "🚶 Walk-In" 
                    : "📅 Reservation"}
                </p>
              </div>

              <div className="p-3 bg-green-50 rounded-lg">
                <p className="text-sm text-green-600 mb-1">Stations</p>
                <p className="font-semibold text-green-900">
                  {filteredStations.length} active
                </p>
              </div>

              <div className="p-3 bg-purple-50 rounded-lg">
                <p className="text-sm text-purple-600 mb-1">Today's Activity</p>
                <p className="font-semibold text-purple-900">
                  {currentViewMode === "list" 
                    ? `${activeTransactions} transactions`
                    : `${dayReservations.length} bookings`}
                </p>
              </div>

              <div className="p-3 bg-orange-50 rounded-lg">
                <p className="text-sm text-orange-600 mb-1">Capacity</p>
                <p className="font-semibold text-orange-900">
                  {filteredStations.reduce((acc, s) => acc + (s.capacity?.servicesPerHour || 0), 0).toFixed(1)} /hr
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
