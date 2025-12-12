"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { ScrollArea } from "../ui/scroll-area";
import { Separator } from "../ui/separator";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { BookingDetailsDialog } from "./BookingDetailsDialog";
import { AISuggestionDialog } from "./AISuggestionDialog";
import { AddBookingDialog } from "../dialogs/AddBookingDialog";
import {
  Calendar,
  List,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  Plus,
  Filter,
  Search,
  Clock,
  Radio,
  CheckCircle,
  AlertCircle,
  XCircle,
  Phone,
  Navigation,
  Edit,
  Trash2,
  Sparkles,
  TrendingUp,
  Zap,
  MoreVertical,
  Mail,
  User,
  DollarSign,
  MapPin,
  Car,
  CreditCard,
  MessageSquare,
  Send,
  Copy,
  Calendar as CalendarIcon,
  RefreshCw,
  Wrench,
  Truck,
  PackageOpen,
  Users,
} from "lucide-react";
import { cn } from "../ui/utils";
import { motion, AnimatePresence } from "motion/react";
import {
  Station,
  StationStatus,
  StationStatusBadge,
} from "./StationStatusManager";
import { mockBookings, Booking } from "./mockBookingsData";

interface AISuggestion {
  id: string;
  type: "capacity" | "pricing" | "promo";
  title: string;
  description: string;
  impact: string;
  slotTime: string;
  stationId: string;
  priority: "high" | "medium" | "low";
}

interface AdvancedCalendarViewProps {
  stations: Station[];
  onStationStatusChange: (stationId: string, status: StationStatus) => void;
  onBookingAction: (bookingId: string, action: "approve" | "reject" | "edit" | "delete" | "call" | "navigate") => void;
  onNewBooking: () => void;
  onAISuggestionClick: (suggestion: AISuggestion) => void;
  branches?: { id: string; name: string; address: string; city: string; isActive: boolean; }[];
  selectedBranchFilter?: string;
  onBranchFilterChange?: (branchId: string) => void;
}

export function AdvancedCalendarView({
  stations,
  onStationStatusChange,
  onBookingAction,
  onNewBooking,
  onAISuggestionClick,
  branches = [],
  selectedBranchFilter = "all",
  onBranchFilterChange,
}: AdvancedCalendarViewProps) {
  const [view, setView] = useState<"calendar" | "list">("calendar");
  const [viewMode, setViewMode] = useState<"daily" | "weekly">("daily");
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [filterStation, setFilterStation] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
  const [isDetailsDialogOpen, setIsDetailsDialogOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editedNotes, setEditedNotes] = useState("");
  const [selectedAISuggestion, setSelectedAISuggestion] = useState<AISuggestion | null>(null);
  const [isAISuggestionDialogOpen, setIsAISuggestionDialogOpen] = useState(false);
  const [showBranchSelector, setShowBranchSelector] = useState(false);
  const [isAddBookingDialogOpen, setIsAddBookingDialogOpen] = useState(false);
  
  // Business module selection - DEFAULT: in_bay
  const [selectedBusinessModule, setSelectedBusinessModule] = useState<string>("in_bay");

  // Get selected branch
  const selectedBranch = branches.find((b) => b.id === selectedBranchFilter);

  // Business module configuration
  const businessModules = [
    {
      id: "in_bay",
      label: "In-Bay Automatic",
      icon: Car,
    },
    {
      id: "tunnel",
      label: "Tunnel Wash",
      icon: Zap,
    },
    {
      id: "self_service",
      label: "Self-Service",
      icon: Wrench,
    },
    {
      id: "manual_detailing",
      label: "Manual Detailing",
      icon: Users,
    },
    {
      id: "mobile",
      label: "Mobile Service",
      icon: Truck,
    },
    {
      id: "pickup_dropoff",
      label: "Pick-up & Drop-off",
      icon: PackageOpen,
    },
  ];

  // Filter stations by selected business module
  const filteredStations = stations.filter(
    (station) => station.businessModule === selectedBusinessModule
  );

  // Mock AI Suggestions - dynamic based on business module
  const getAISuggestionsForModule = () => {
    const suggestions: Record<string, AISuggestion[]> = {
      in_bay: [
        {
          id: "AI-IB-001",
          type: "capacity",
          title: "午后高峰优化",
          description: "Low traffic at 14:00-16:00",
          impact: "+$350 potential revenue",
          slotTime: "14:00",
          stationId: "inbay-2",
          priority: "high",
        },
        {
          id: "AI-IB-002",
          type: "pricing",
          title: "Dynamic Pricing",
          description: "Peak hours 16:00-18:00",
          impact: "+15% pricing boost",
          slotTime: "16:00",
          stationId: "inbay-4",
          priority: "medium",
        },
      ],
      tunnel: [
        {
          id: "AI-TN-001",
          type: "capacity",
          title: "Morning Rush Gap",
          description: "Low capacity at 10:00",
          impact: "+$280 estimated",
          slotTime: "10:00",
          stationId: "tunnel-2",
          priority: "high",
        },
      ],
      self_service: [
        {
          id: "AI-SS-001",
          type: "promo",
          title: "Midday Promotion",
          description: "Offer 20% off 12:00-14:00",
          impact: "+8 bookings potential",
          slotTime: "12:00",
          stationId: "self-3",
          priority: "medium",
        },
      ],
      manual_detailing: [
        {
          id: "AI-MD-001",
          type: "capacity",
          title: "Evening Slot Available",
          description: "Premium slots open 16:00+",
          impact: "+$650 opportunity",
          slotTime: "16:00",
          stationId: "detail-3",
          priority: "high",
        },
      ],
      mobile: [
        {
          id: "AI-MB-001",
          type: "capacity",
          title: "Afternoon Routes",
          description: "Optimize 15:00-17:00 routing",
          impact: "+3 bookings possible",
          slotTime: "15:00",
          stationId: "mobile-4",
          priority: "medium",
        },
      ],
      pickup_dropoff: [
        {
          id: "AI-PD-001",
          type: "capacity",
          title: "Pickup Optimization",
          description: "Morning pickups underutilized",
          impact: "+$800 potential",
          slotTime: "09:00",
          stationId: "pickup-6",
          priority: "high",
        },
      ],
    };
    return suggestions[selectedBusinessModule] || [];
  };

  const aiSuggestions = getAISuggestionsForModule();

  // Generate time slots (30-minute intervals)
  const generateTimeSlots = () => {
    const slots = [];
    for (let hour = 8; hour <= 18; hour++) {
      slots.push(`${hour.toString().padStart(2, "0")}:00`);
      slots.push(`${hour.toString().padStart(2, "0")}:30`);
    }
    return slots;
  };

  const timeSlots = generateTimeSlots();

  // Filter bookings by selected business module
  const filteredBookings = mockBookings.filter(
    (booking) => booking.businessModule === selectedBusinessModule
  );

  const getBookingForSlot = (stationId: string, timeSlot: string) => {
    return filteredBookings.find(
      (b) => b.stationId === stationId && b.startTime === timeSlot
    );
  };

  const getAISuggestionForSlot = (stationId: string, timeSlot: string) => {
    return aiSuggestions.find(
      (s) => s.stationId === stationId && s.slotTime === timeSlot
    );
  };

  const getStatusConfig = (status: Booking["status"]) => {
    switch (status) {
      case "requested":
        return {
          color: "bg-amber-100 text-amber-700 border-amber-200",
          icon: AlertCircle,
          label: "Requested",
        };
      case "reserved":
        return {
          color: "bg-blue-100 text-blue-700 border-blue-200",
          icon: Clock,
          label: "Reserved",
        };
      case "in-progress":
        return {
          color: "bg-green-100 text-green-700 border-green-200",
          icon: Radio,
          label: "In Progress",
          animated: true,
        };
      case "completed":
        return {
          color: "bg-neutral-100 text-neutral-700 border-neutral-200",
          icon: CheckCircle,
          label: "Completed",
        };
      case "cancelled":
        return {
          color: "bg-red-100 text-red-700 border-red-200",
          icon: XCircle,
          label: "Cancelled",
        };
      case "no-show":
        return {
          color: "bg-red-100 text-red-700 border-red-200",
          icon: XCircle,
          label: "No-Show",
        };
      case "walk-in":
        return {
          color: "bg-green-100 text-green-700 border-green-200",
          icon: CheckCircle,
          label: "Walk-In",
        };
      default:
        return {
          color: "bg-neutral-100 text-neutral-700 border-neutral-200",
          icon: Clock,
          label: "Unknown",
        };
    }
  };

  // Calculate booking block height based on duration
  const getBookingHeight = (duration: number) => {
    // Each 30-minute slot is 60px, so 2px per minute
    return duration * 2;
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount);
  };

  // Status summary - filtered by business module
  const statusSummary = filteredBookings.reduce(
    (acc, booking) => {
      acc[booking.status] = (acc[booking.status] || 0) + 1;
      return acc;
    },
    {} as Record<string, number>
  );

  const currentDate = selectedDate.toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="hidden md:flex items-center gap-3">
          <div className="size-10 rounded-lg bg-blue-600 flex items-center justify-center">
            <Calendar size={20} className="text-white" />
          </div>
          <div>
            <h2 className="text-2xl font-bold">Today's Schedule</h2>
            <p className="text-sm text-neutral-600">{currentDate}</p>
          </div>
        </div>
        
        {/* Desktop: Full Button */}
        <Button onClick={() => setIsAddBookingDialogOpen(true)} className="hidden md:flex">
          <Plus size={16} className="mr-2" />
          New Booking
        </Button>

        {/* Mobile: Branch Selector + New Booking */}
        <div className="md:hidden flex items-center justify-between w-full">
          {/* Branch Selector - Left Side */}
          {branches.length > 0 && (
            <div className="relative">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowBranchSelector(!showBranchSelector)}
                className="h-9 px-3 gap-2"
              >
                {/* Avatar */}
                <div className="size-5 rounded-full bg-blue-100 flex items-center justify-center">
                  <MapPin size={12} className="text-blue-600" />
                </div>
                <span className="text-xs font-medium">
                  {selectedBranchFilter === "all"
                    ? "All Branches"
                    : selectedBranch?.name || "Branch"}
                </span>
                <ChevronDown
                  size={14}
                  className={cn(
                    "transition-transform",
                    showBranchSelector && "rotate-180"
                  )}
                />
              </Button>

              {/* Branch Dropdown */}
              <AnimatePresence>
                {showBranchSelector && (
                  <>
                    {/* Backdrop */}
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="fixed inset-0 z-40"
                      onClick={() => setShowBranchSelector(false)}
                    />
                    {/* Dropdown */}
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="fixed left-4 right-4 top-[72px] bg-white border border-neutral-200 rounded-lg shadow-lg z-50 overflow-hidden"
                    >
                      {/* Header */}
                      <div className="p-3 border-b border-neutral-200">
                        <h3 className="text-sm font-semibold text-neutral-900">Select Branch</h3>
                      </div>
                      
                      {/* Branch List */}
                      <div className="max-h-64 overflow-y-auto">
                        <button
                          onClick={() => {
                            onBranchFilterChange?.("all");
                            setShowBranchSelector(false);
                          }}
                          className={cn(
                            "w-full flex items-center justify-between p-3 transition-colors",
                            selectedBranchFilter === "all"
                              ? "bg-blue-50 text-blue-900"
                              : "hover:bg-neutral-50"
                          )}
                        >
                          <span className="text-sm font-medium">All Branches</span>
                          {selectedBranchFilter === "all" && (
                            <CheckCircle size={16} className="text-blue-600" />
                          )}
                        </button>
                        <Separator />
                        {branches.map((branch) => (
                          <button
                            key={branch.id}
                            onClick={() => {
                              onBranchFilterChange?.(branch.id);
                              setShowBranchSelector(false);
                            }}
                            className={cn(
                              "w-full flex items-start justify-between p-3 transition-colors",
                              selectedBranchFilter === branch.id
                                ? "bg-blue-50 text-blue-900"
                                : "hover:bg-neutral-50"
                            )}
                          >
                            <div className="text-left">
                              <p className="text-sm font-semibold">{branch.name}</p>
                              <p className="text-xs text-neutral-600 mt-0.5">{branch.city}</p>
                            </div>
                            {selectedBranchFilter === branch.id && (
                              <CheckCircle size={16} className="text-blue-600 flex-shrink-0 mt-0.5" />
                            )}
                          </button>
                        ))}
                      </div>
                    </motion.div>
                  </>
                )}
              </AnimatePresence>
            </div>
          )}

          {/* New Booking Button - Right Side */}
          <Button 
            onClick={() => setIsAddBookingDialogOpen(true)} 
            size="sm"
            className="h-9 w-9 p-0"
          >
            <Plus size={18} />
          </Button>
        </div>
      </div>

      {/* Mobile: Page Title */}
      <div className="md:hidden px-1">
        <h1 className="text-xl font-semibold text-neutral-900">Today's Schedule</h1>
        <p className="text-sm text-neutral-600 mt-0.5">{currentDate}</p>
      </div>

      {/* View Toggle & Filters */}
      <Card>
        <CardContent className="p-4 space-y-4">
          {/* View Toggle */}
          <div className="flex items-center gap-4">
            {/* Desktop Date Navigation */}
            <div className="hidden md:flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  const newDate = new Date(selectedDate);
                  newDate.setDate(newDate.getDate() - 1);
                  setSelectedDate(newDate);
                }}
              >
                <ChevronLeft size={16} />
              </Button>
              <Button 
                variant="outline" 
                size="sm"
                className="min-w-[140px]"
                onClick={() => setSelectedDate(new Date())}
              >
                {(() => {
                  const today = new Date();
                  const isToday = 
                    selectedDate.getDate() === today.getDate() &&
                    selectedDate.getMonth() === today.getMonth() &&
                    selectedDate.getFullYear() === today.getFullYear();
                  
                  if (isToday) {
                    return "Today";
                  }
                  
                  return selectedDate.toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: selectedDate.getFullYear() !== today.getFullYear() ? "numeric" : undefined
                  });
                })()}
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  const newDate = new Date(selectedDate);
                  newDate.setDate(newDate.getDate() + 1);
                  setSelectedDate(newDate);
                }}
              >
                <ChevronRight size={16} />
              </Button>
            </div>

            {/* Mobile Date Navigation */}
            <div className="flex md:hidden items-center justify-between w-full">
              <Button
                variant="ghost"
                size="sm"
                className="h-10 w-10 p-0"
                onClick={() => {
                  const newDate = new Date(selectedDate);
                  newDate.setDate(newDate.getDate() - 1);
                  setSelectedDate(newDate);
                }}
              >
                <ChevronLeft size={20} />
              </Button>
              
              <Button 
                variant="ghost" 
                size="sm"
                className="flex-1 mx-2"
                onClick={() => setSelectedDate(new Date())}
              >
                <div className="text-center">
                  {(() => {
                    const today = new Date();
                    const isToday = 
                      selectedDate.getDate() === today.getDate() &&
                      selectedDate.getMonth() === today.getMonth() &&
                      selectedDate.getFullYear() === today.getFullYear();
                    
                    if (isToday) {
                      return (
                        <>
                          <div className="font-semibold">Today</div>
                          <div className="text-xs text-neutral-600">
                            {selectedDate.toLocaleDateString("en-US", {
                              weekday: "short",
                              month: "short",
                              day: "numeric"
                            })}
                          </div>
                        </>
                      );
                    }
                    
                    return (
                      <>
                        <div className="font-semibold">
                          {selectedDate.toLocaleDateString("en-US", {
                            month: "short",
                            day: "numeric"
                          })}
                        </div>
                        <div className="text-xs text-neutral-600">
                          {selectedDate.toLocaleDateString("en-US", {
                            weekday: "short"
                          })}
                        </div>
                      </>
                    );
                  })()}
                </div>
              </Button>

              <Button
                variant="ghost"
                size="sm"
                className="h-10 w-10 p-0"
                onClick={() => {
                  const newDate = new Date(selectedDate);
                  newDate.setDate(newDate.getDate() + 1);
                  setSelectedDate(newDate);
                }}
              >
                <ChevronRight size={20} />
              </Button>
            </div>
          </div>

          {/* Business Module Tabs */}
          <div className="bg-[#ececf0] rounded-[12.75px] p-1 h-[32px] md:block hidden">
            <div className="flex items-center gap-1 h-full">
              {businessModules.map((module) => {
                const Icon = module.icon;
                const isSelected = selectedBusinessModule === module.id;
                return (
                  <button
                    key={module.id}
                    onClick={() => setSelectedBusinessModule(module.id)}
                    className={cn(
                      "flex items-center gap-2 px-3 h-full rounded-[10px] transition-all text-xs font-medium",
                      isSelected
                        ? "bg-white text-neutral-950 shadow-sm"
                        : "text-[#717182] hover:text-neutral-900"
                    )}
                  >
                    <Icon className="h-3.5 w-3.5" />
                    <span>{module.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Mobile: Horizontal Scrollable Pills */}
          <div className="md:hidden -mx-4 px-4 overflow-x-auto scrollbar-hide scroll-smooth touch-pan-x">
            <div className="flex items-center gap-2 min-w-max pb-1 snap-x snap-mandatory">
              {businessModules.map((module) => {
                const Icon = module.icon;
                const isSelected = selectedBusinessModule === module.id;
                return (
                  <button
                    key={module.id}
                    onClick={() => setSelectedBusinessModule(module.id)}
                    className={cn(
                      "flex items-center gap-2 px-4 py-2 rounded-full transition-all text-xs font-medium whitespace-nowrap snap-center touch-manipulation select-none",
                      isSelected
                        ? "bg-blue-600 text-white shadow-md"
                        : "bg-neutral-100 text-neutral-700 active:bg-neutral-200"
                    )}
                  >
                    <Icon className="h-4 w-4" />
                    <span>{module.label}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Main Content */}
      <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
        {/* Calendar/List View */}
        <div className="xl:col-span-3">
          {view === "calendar" ? (
            <Card className="overflow-hidden">
              <CardContent className="p-0">
                {/* Mobile: Timeline/Agenda View */}
                <div className="md:hidden">
                  {/* Mobile Station Filter */}
                  <div className="sticky top-0 z-20 bg-white border-b p-3">
                    <Select
                      value={filterStation}
                      onValueChange={setFilterStation}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="All Stations" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Stations</SelectItem>
                        {filteredStations.map((station) => (
                          <SelectItem key={station.id} value={station.id}>
                            {station.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Mobile Timeline */}
                  <ScrollArea className="h-[calc(100vh-420px)]">
                    <div className="p-3 space-y-3">
                      {timeSlots.map((timeSlot) => {
                        // Get all bookings for this time slot
                        const bookingsInSlot = filteredStations
                          .map((station) => ({
                            station,
                            booking: getBookingForSlot(station.id, timeSlot),
                            aiSuggestion: getAISuggestionForSlot(station.id, timeSlot),
                          }))
                          .filter((item) => 
                            (item.booking || item.aiSuggestion) && 
                            (filterStation === "all" || item.station.id === filterStation)
                          );

                        if (bookingsInSlot.length === 0) return null;

                        return (
                          <div key={timeSlot} className="space-y-2">
                            {/* Time Header */}
                            <div className="flex items-center gap-2">
                              <div className="flex items-center justify-center w-16 h-8 bg-neutral-100 rounded-lg">
                                <span className="text-xs font-semibold text-neutral-700">
                                  {timeSlot}
                                </span>
                              </div>
                              <div className="flex-1 h-px bg-neutral-200" />
                            </div>

                            {/* Bookings for this time */}
                            {bookingsInSlot.map((item) => {
                              if (item.booking) {
                                const booking = item.booking;
                                const config = getStatusConfig(booking.status);
                                const Icon = config.icon;

                                return (
                                  <motion.div
                                    key={`${item.station.id}-${timeSlot}`}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className={cn(
                                      "rounded-xl border-2 p-2 space-y-1.5 active:scale-[0.98] transition-all touch-manipulation",
                                      config.color
                                    )}
                                    onClick={() => {
                                      setSelectedBooking(booking);
                                      setEditedNotes(booking.notes || "");
                                      setIsDetailsDialogOpen(true);
                                      setIsEditMode(false);
                                    }}
                                  >
                                    {/* Header */}
                                    <div className="flex items-start justify-between">
                                      <div className="flex-1 min-w-0">
                                        <h4 className="font-semibold truncate text-sm leading-tight">
                                          {booking.customer}
                                        </h4>
                                        <p className="text-[10px] opacity-75 truncate leading-tight">
                                          {item.station.name}
                                        </p>
                                      </div>
                                      <Badge
                                        variant="outline"
                                        className={cn("text-[10px] gap-0.5 ml-1.5 shrink-0 px-1.5 py-0.5", config.color)}
                                      >
                                        <Icon size={10} className={cn(config.animated && "animate-pulse")} />
                                        {config.label}
                                      </Badge>
                                    </div>

                                    {/* Details */}
                                    <div className="space-y-1">
                                      <div className="flex items-center gap-1 text-[10px]">
                                        <Clock size={11} className="shrink-0 opacity-60" />
                                        <span>{booking.startTime} - {booking.endTime}</span>
                                        <span className="opacity-60">({booking.duration} min)</span>
                                      </div>
                                      
                                      <div className="flex items-center gap-1 text-[10px]">
                                        <Car size={11} className="shrink-0 opacity-60" />
                                        <span className="truncate">{booking.service}</span>
                                      </div>

                                      {booking.vehicle && (
                                        <div className="flex items-center gap-1 text-[10px] opacity-75">
                                          <span className="truncate">{booking.vehicle}</span>
                                        </div>
                                      )}
                                    </div>

                                    {/* Footer */}
                                    <div className="flex items-center justify-between pt-1 border-t border-current/10">
                                      <span className="text-[9px] font-mono opacity-60">
                                        #{booking.reservationCode}
                                      </span>
                                      <span className="font-semibold text-sm">
                                        {formatCurrency(booking.price)}
                                      </span>
                                    </div>
                                  </motion.div>
                                );
                              }

                              if (item.aiSuggestion) {
                                const suggestion = item.aiSuggestion;
                                return (
                                  <motion.div
                                    key={`ai-${item.station.id}-${timeSlot}`}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="rounded-xl bg-gradient-to-br from-purple-100 to-blue-100 border-2 border-purple-300 p-2 space-y-1.5 active:scale-[0.98] transition-all touch-manipulation"
                                    onClick={() => {
                                      setSelectedAISuggestion(suggestion);
                                      setIsAISuggestionDialogOpen(true);
                                    }}
                                  >
                                    <div className="flex items-start gap-1.5">
                                      <Sparkles size={14} className="text-purple-600 shrink-0 mt-0.5" />
                                      <div className="flex-1 min-w-0">
                                        <h4 className="font-semibold text-purple-900 text-sm leading-tight">
                                          {suggestion.title}
                                        </h4>
                                        <p className="text-[10px] text-purple-700 mt-0.5 leading-tight">
                                          {suggestion.description}
                                        </p>
                                        <p className="text-[10px] text-purple-600 mt-1 font-medium">
                                          {suggestion.impact}
                                        </p>
                                      </div>
                                    </div>
                                  </motion.div>
                                );
                              }

                              return null;
                            })}
                          </div>
                        );
                      })}

                      {/* Empty State */}
                      {filteredBookings.length === 0 && (
                        <div className="py-12 text-center">
                          <Calendar className="mx-auto h-12 w-12 text-neutral-300 mb-3" />
                          <p className="text-sm text-neutral-500">No bookings scheduled</p>
                        </div>
                      )}
                    </div>
                  </ScrollArea>
                </div>

                {/* Desktop: Grid View - Keep existing code */}
                <div className="hidden md:block">
                  <ScrollArea className="h-[calc(100vh-380px)]">
                    <div className="relative">
                      {/* Header - Station Names */}
                      <div className="sticky top-0 z-20 bg-white border-b-2">
                        <div className="grid grid-cols-7 gap-px">
                          {/* Time column header */}
                          <div className="bg-neutral-100 p-3 font-semibold text-sm">
                            Time
                          </div>
                          {/* Station headers */}
                          {filteredStations.slice(0, 6).map((station) => (
                            <div
                              key={station.id}
                              className="bg-neutral-50 p-3 space-y-1"
                            >
                              <p className="font-semibold text-sm">
                                {station.name}
                              </p>
                              <StationStatusBadge status={station.status} />
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Calendar Grid */}
                      <div className="relative">
                        {timeSlots.map((timeSlot, timeIndex) => (
                          <div
                            key={timeSlot}
                            className={cn(
                              "grid grid-cols-7 gap-px border-b",
                              timeSlot.endsWith(":00") && "border-b-2"
                            )}
                            style={{ minHeight: "60px" }}
                          >
                            {/* Time label */}
                            <div className="bg-neutral-50 p-2 flex items-start justify-center">
                              <span className="text-xs font-medium text-neutral-600">
                                {timeSlot}
                              </span>
                            </div>

                            {/* Station slots */}
                            {filteredStations.slice(0, 6).map((station) => {
                              const booking = getBookingForSlot(
                                station.id,
                                timeSlot
                              );
                              const aiSuggestion = getAISuggestionForSlot(
                                station.id,
                                timeSlot
                              );

                              if (booking) {
                                const config = getStatusConfig(booking.status);
                                const Icon = config.icon;
                                const height = getBookingHeight(booking.duration);

                                return (
                                  <div
                                    key={station.id}
                                    className="relative bg-white p-1"
                                    style={{ minHeight: `${height}px` }}
                                  >
                                    <motion.div
                                      initial={{ opacity: 0, scale: 0.95 }}
                                      animate={{ opacity: 1, scale: 1 }}
                                      className={cn(
                                        "absolute inset-1 rounded-lg border-2 p-1.5 cursor-pointer hover:shadow-lg transition-all overflow-hidden",
                                        config.color,
                                        config.animated &&
                                          "ring-2 ring-blue-300 ring-offset-1"
                                      )}
                                      onClick={() => {
                                        setSelectedBooking(booking);
                                        setEditedNotes(booking.notes || "");
                                        setIsDetailsDialogOpen(true);
                                        setIsEditMode(false);
                                      }}
                                    >
                                      <div className="space-y-0.5">
                                        <div className="flex items-start justify-between gap-1">
                                          <p className="font-semibold text-[11px] truncate leading-tight">
                                            {booking.customer}
                                          </p>
                                          <Icon
                                            size={11}
                                            className={cn(
                                              config.animated && "animate-pulse",
                                              "shrink-0"
                                            )}
                                          />
                                        </div>
                                        <p className="text-[11px] opacity-75 truncate leading-tight">
                                          {booking.service}
                                        </p>
                                        {booking.vehicle && (
                                          <p className="text-[10px] opacity-60 truncate leading-tight">
                                            {booking.vehicle}
                                          </p>
                                        )}
                                        <div className="flex items-center gap-1 text-[10px] opacity-75">
                                          <Clock size={9} />
                                          <span>
                                            {booking.startTime}-{booking.endTime}
                                          </span>
                                        </div>
                                        {booking.reservationCode && (
                                          <p className="text-[10px] font-mono opacity-60 leading-tight">
                                            #{booking.reservationCode}
                                          </p>
                                        )}
                                      </div>
                                    </motion.div>
                                  </div>
                                );
                              }

                              if (aiSuggestion) {
                                return (
                                  <div
                                    key={station.id}
                                    className="relative bg-white p-1"
                                  >
                                    <motion.div
                                      initial={{ opacity: 0, scale: 0.95 }}
                                      animate={{ opacity: 1, scale: 1 }}
                                      className="h-full bg-gradient-to-br from-purple-100 to-blue-100 border-2 border-purple-300 rounded-lg p-2 cursor-pointer hover:shadow-lg transition-all"
                                      onClick={() => {
                                        setSelectedAISuggestion(aiSuggestion);
                                        setIsAISuggestionDialogOpen(true);
                                      }}
                                    >
                                      <div className="space-y-1">
                                        <div className="flex items-center gap-1">
                                          <Sparkles
                                            size={12}
                                            className="text-purple-600"
                                          />
                                          <p className="font-semibold text-xs text-purple-900">
                                            AI Suggestion
                                          </p>
                                        </div>
                                        <p className="text-xs text-purple-800">
                                          {aiSuggestion.title}
                                        </p>
                                        <p className="text-xs text-purple-600">
                                          {aiSuggestion.impact}
                                        </p>
                                      </div>
                                    </motion.div>
                                  </div>
                                );
                              }

                              return (
                                <div
                                  key={station.id}
                                  className="bg-white hover:bg-neutral-50 cursor-pointer transition-colors"
                                />
                              );
                            })}
                          </div>
                        ))}
                      </div>
                    </div>
                  </ScrollArea>
                </div>
              </CardContent>
            </Card>
          ) : (
            // List View
            <Card>
              <CardContent className="p-0">
                {/* Mobile: Card List */}
                <div className="md:hidden">
                  <ScrollArea className="h-[calc(100vh-380px)]">
                    <div className="p-3 space-y-3">
                      {filteredBookings.map((booking) => {
                        const config = getStatusConfig(booking.status);
                        const Icon = config.icon;
                        const station = stations.find(
                          (s) => s.id === booking.stationId
                        );

                        return (
                          <motion.div
                            key={booking.id}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="bg-white border-2 rounded-xl p-2 space-y-1.5 active:scale-[0.98] transition-all touch-manipulation"
                            onClick={() => {
                              setSelectedBooking(booking);
                              setEditedNotes(booking.notes || "");
                              setIsDetailsDialogOpen(true);
                              setIsEditMode(false);
                            }}
                          >
                            {/* Header Row */}
                            <div className="flex items-start justify-between gap-1.5">
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-1 mb-0.5">
                                  <h4 className="font-semibold truncate text-sm leading-tight">
                                    {booking.customer}
                                  </h4>
                                  {booking.status === "requested" && (
                                    <Sparkles size={12} className="text-purple-600 shrink-0" />
                                  )}
                                </div>
                                <p className="text-[10px] text-neutral-600 truncate leading-tight">
                                  {booking.service}
                                </p>
                              </div>
                              <Badge
                                variant="outline"
                                className={cn("text-[10px] gap-0.5 shrink-0 px-1.5 py-0.5", config.color)}
                              >
                                <Icon size={10} className={cn(config.animated && "animate-pulse")} />
                                {config.label}
                              </Badge>
                            </div>

                            {/* Info Grid */}
                            <div className="grid grid-cols-2 gap-1 text-[10px]">
                              <div className="flex items-center gap-1">
                                <Clock size={11} className="text-neutral-500 shrink-0" />
                                <span className="truncate">
                                  {booking.startTime} - {booking.endTime}
                                </span>
                              </div>
                              
                              <div className="flex items-center gap-1">
                                <MapPin size={11} className="text-neutral-500 shrink-0" />
                                <span className="truncate">{station?.name}</span>
                              </div>

                              {booking.vehicle && (
                                <div className="flex items-center gap-1 col-span-2">
                                  <Car size={11} className="text-neutral-500 shrink-0" />
                                  <span className="truncate">{booking.vehicle}</span>
                                </div>
                              )}

                              {booking.phone && (
                                <div className="flex items-center gap-1 col-span-2">
                                  <Phone size={11} className="text-neutral-500 shrink-0" />
                                  <span className="truncate">{booking.phone}</span>
                                </div>
                              )}
                            </div>

                            {/* Footer Row */}
                            <div className="flex items-center justify-between pt-1 border-t">
                              <span className="text-[9px] font-mono text-neutral-600">
                                #{booking.reservationCode}
                              </span>
                              <div className="flex items-center gap-1.5">
                                <span className="font-semibold text-sm">
                                  {formatCurrency(booking.price)}
                                </span>
                                <div className="flex gap-1">
                                  {booking.status === "requested" && (
                                    <>
                                      <Button
                                        size="sm"
                                        variant="ghost"
                                        className="h-8 w-8 p-0 text-green-600"
                                        onClick={(e) => {
                                          e.stopPropagation();
                                          onBookingAction(booking.id, "approve");
                                        }}
                                      >
                                        <CheckCircle size={16} />
                                      </Button>
                                      <Button
                                        size="sm"
                                        variant="ghost"
                                        className="h-8 w-8 p-0 text-red-600"
                                        onClick={(e) => {
                                          e.stopPropagation();
                                          onBookingAction(booking.id, "reject");
                                        }}
                                      >
                                        <XCircle size={16} />
                                      </Button>
                                    </>
                                  )}
                                  {booking.phone && (
                                    <Button
                                      size="sm"
                                      variant="ghost"
                                      className="h-8 w-8 p-0"
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        onBookingAction(booking.id, "call");
                                      }}
                                    >
                                      <Phone size={16} />
                                    </Button>
                                  )}
                                </div>
                              </div>
                            </div>
                          </motion.div>
                        );
                      })}

                      {/* Empty State */}
                      {filteredBookings.length === 0 && (
                        <div className="py-12 text-center">
                          <List className="mx-auto h-12 w-12 text-neutral-300 mb-3" />
                          <p className="text-sm text-neutral-500">No bookings found</p>
                        </div>
                      )}
                    </div>
                  </ScrollArea>
                </div>

                {/* Desktop: Table View */}
                <div className="hidden md:block">
                  <ScrollArea className="h-[calc(100vh-380px)]">
                    <table className="w-full">
                      <thead className="sticky top-0 bg-neutral-50 border-b-2">
                        <tr>
                          <th className="text-left p-3 text-xs font-semibold">Code</th>
                          <th className="text-left p-3 text-xs font-semibold">Customer</th>
                          <th className="text-left p-3 text-xs font-semibold">Time</th>
                          <th className="text-left p-3 text-xs font-semibold">Service</th>
                          <th className="text-left p-3 text-xs font-semibold">Station</th>
                          <th className="text-left p-3 text-xs font-semibold">Duration</th>
                          <th className="text-left p-3 text-xs font-semibold">Price</th>
                          <th className="text-left p-3 text-xs font-semibold">Status</th>
                          <th className="text-left p-3 text-xs font-semibold">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredBookings.map((booking) => {
                          const config = getStatusConfig(booking.status);
                          const Icon = config.icon;
                          const station = stations.find((s) => s.id === booking.stationId);
                          return (
                            <tr key={booking.id} className="border-b hover:bg-neutral-50 transition-colors">
                              <td className="p-3"><span className="text-xs font-mono">#{booking.reservationCode}</span></td>
                              <td className="p-3">
                                <div>
                                  <p className="font-semibold text-sm">{booking.customer}</p>
                                  {booking.phone && <p className="text-xs text-neutral-600">{booking.phone}</p>}
                                </div>
                              </td>
                              <td className="p-3"><p className="text-sm">{booking.startTime}-{booking.endTime}</p></td>
                              <td className="p-3">
                                <p className="text-sm">{booking.service}</p>
                                {booking.vehicle && <p className="text-xs text-neutral-600">{booking.vehicle}</p>}
                              </td>
                              <td className="p-3"><p className="text-sm">{station?.name}</p></td>
                              <td className="p-3"><p className="text-sm">{booking.duration} min</p></td>
                              <td className="p-3"><p className="text-sm font-semibold">{formatCurrency(booking.price)}</p></td>
                              <td className="p-3">
                                <Badge variant="outline" className={cn("text-xs gap-1", config.color)}>
                                  <Icon size={12} className={cn(config.animated && "animate-pulse")} />
                                  {config.label}
                                </Badge>
                              </td>
                              <td className="p-3">
                                <div className="flex gap-1">
                                  {booking.status === "requested" && (
                                    <>
                                      <Button size="sm" variant="ghost" className="h-7 w-7 p-0 text-purple-600 hover:text-purple-700 hover:bg-purple-50" onClick={() => { setSelectedBooking(booking); setEditedNotes(booking.notes || ""); setIsDetailsDialogOpen(true); setIsEditMode(false); }} title="AI Campaign Suggestions"><Sparkles size={14} /></Button>
                                      <Button size="sm" variant="ghost" className="h-7 w-7 p-0" onClick={() => onBookingAction(booking.id, "approve")}><CheckCircle size={14} /></Button>
                                      <Button size="sm" variant="ghost" className="h-7 w-7 p-0" onClick={() => onBookingAction(booking.id, "reject")}><XCircle size={14} /></Button>
                                    </>
                                  )}
                                  {booking.phone && <Button size="sm" variant="ghost" className="h-7 w-7 p-0" onClick={() => onBookingAction(booking.id, "call")}><Phone size={14} /></Button>}
                                  <Button size="sm" variant="ghost" className="h-7 w-7 p-0"><MoreVertical size={14} /></Button>
                                </div>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </ScrollArea>
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Right Sidebar - Today's Overview */}
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Today's Overview</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Status Summary */}
              <div className="space-y-2">
                {Object.entries(statusSummary).map(([status, count]) => {
                  const config = getStatusConfig(
                    status as Booking["status"]
                  );
                  const Icon = config.icon;

                  return (
                    <div
                      key={status}
                      className="flex items-center justify-between p-2 rounded-lg hover:bg-neutral-50 cursor-pointer transition-colors"
                    >
                      <div className="flex items-center gap-2">
                        <Icon size={16} className="text-neutral-600" />
                        <span className="text-sm capitalize">
                          {status.replace("-", " ")}
                        </span>
                      </div>
                      <Badge variant="outline">{count}</Badge>
                    </div>
                  );
                })}</div>

              <Separator />

              {/* Quick Stats */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-neutral-600">
                    Total Bookings
                  </span>
                  <span className="font-semibold">
                    {filteredBookings.length}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-neutral-600">
                    Total Revenue
                  </span>
                  <span className="font-semibold">
                    {formatCurrency(
                      filteredBookings.reduce((sum, b) => sum + b.price, 0)
                    )}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-neutral-600">
                    Avg. Duration
                  </span>
                  <span className="font-semibold">
                    {filteredBookings.length > 0 ? Math.round(
                      filteredBookings.reduce((sum, b) => sum + b.duration, 0) /
                        filteredBookings.length
                    ) : 0}{" "}
                    min
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Recent Completions */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Recent Completions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {filteredBookings
                  .filter((b) => b.status === "completed")
                  .slice(0, 5)
                  .map((booking) => (
                    <div
                      key={booking.id}
                      className="p-2 rounded-lg bg-neutral-50 space-y-0.5"
                    >
                      <p className="font-semibold text-sm leading-tight">
                        {booking.customer}
                      </p>
                      <p className="text-[10px] text-neutral-600 leading-tight">
                        {booking.service}
                      </p>
                      <div className="flex items-center justify-between pt-0.5">
                        <span className="text-[10px] text-neutral-500">
                          {booking.startTime}
                        </span>
                        <span className="text-xs font-semibold">
                          {formatCurrency(booking.price)}
                        </span>
                      </div>
                    </div>
                  ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Bottom Summary */}
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex gap-6">
              {Object.entries(statusSummary).map(([status, count]) => (
                <div key={status} className="flex items-center gap-2">
                  <span className="text-sm capitalize text-neutral-600">
                    {status.replace("-", " ")}:
                  </span>
                  <span className="font-semibold">{count}</span>
                </div>
              ))}
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                <Filter size={14} className="mr-2" />
                Export
              </Button>
              <Button variant="outline" size="sm">
                <Sparkles size={14} className="mr-2" />
                AI Insights
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Booking Details Dialog */}
      <BookingDetailsDialog
        booking={selectedBooking}
        isOpen={isDetailsDialogOpen}
        onClose={() => {
          setIsDetailsDialogOpen(false);
          setIsEditMode(false);
        }}
        onAction={onBookingAction}
      />

      {/* AI Suggestion Dialog */}
      <AISuggestionDialog
        suggestion={selectedAISuggestion}
        isOpen={isAISuggestionDialogOpen}
        onClose={() => {
          setIsAISuggestionDialogOpen(false);
          setSelectedAISuggestion(null);
        }}
        onApply={(suggestionId, config) => {
          alert(`Applied campaign ${suggestionId} with config: ${JSON.stringify(config)}`);
          setIsAISuggestionDialogOpen(false);
        }}
        onSchedule={(suggestionId, date) => {
          alert(`Scheduled campaign ${suggestionId} for ${date.toLocaleDateString()}`);
          setIsAISuggestionDialogOpen(false);
        }}
        onDismiss={(suggestionId) => {
          alert(`Dismissed suggestion ${suggestionId}`);
          setIsAISuggestionDialogOpen(false);
        }}
      />

      {/* Add Booking Dialog */}
      <AddBookingDialog
        open={isAddBookingDialogOpen}
        onOpenChange={setIsAddBookingDialogOpen}
        branches={branches}
        selectedBranchId={selectedBranchFilter !== "all" ? selectedBranchFilter : undefined}
        selectedModule={selectedBusinessModule as any}
        onAddBooking={(booking) => {
          console.log("New booking created:", booking);
          // In real app, this would add to bookings list
        }}
      />
    </div>
  );
}