"use client";

import { useState, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Badge } from "../ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "../ui/dialog";
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerDescription, DrawerFooter } from "../ui/drawer";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import { Switch } from "../ui/switch";
import { Checkbox } from "../ui/checkbox";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../ui/dropdown-menu";
import { 
  Calendar, 
  Clock, 
  Phone, 
  User, 
  Car, 
  MapPin, 
  Search, 
  Filter, 
  CheckCircle, 
  XCircle,
  Play,
  QrCode,
  Bell,
  ChevronLeft,
  ChevronRight,
  MoreHorizontal,
  Plus,
  Edit,
  Trash2,
  List,
  CalendarIcon,
  DollarSign,
  Mail,
  Settings,
  ChevronDown,
  AlertTriangle,
  Sparkles,
  TrendingUp,
  TrendingDown,
  Target,
  Zap,
  BarChart3
} from "lucide-react";
import { toast } from "sonner@2.0.3";
import { AIInsights, AIInsight } from "./AIInsights";
import { BusinessModule, ModuleSpecificData } from "../../types/business-modules";

interface Booking {
  id: string;
  customerName: string;
  customerPhone: string;
  customerEmail: string;
  carPlateNumber?: string;
  date: string;
  time: string;
  service: string;
  vehicleType: string;
  estimatedDuration: number;
  status: "pending-approval" | "reserved" | "ai-campaign" | "approved" | "in-progress" | "completed" | "no-show" | "canceled" | "rescheduled";
  submittedAt: string;
  branchId: string;
  notes?: string;
  price: number;
  station: string;
  createdBy: "customer" | "admin";
  qrCode?: string;
  // Business Module Support
  businessModule: BusinessModule;
  moduleSpecificData?: ModuleSpecificData;
}

interface Branch {
  id: string;
  name: string;
  address: string;
  city: string;
  district: string;
  phone: string;
  email: string;
  description: string;
  isActive: boolean;
  operatingHours?: {
    monday: { isOpen: boolean; openTime: string; closeTime: string };
    tuesday: { isOpen: boolean; openTime: string; closeTime: string };
    wednesday: { isOpen: boolean; openTime: string; closeTime: string };
    thursday: { isOpen: boolean; openTime: string; closeTime: string };
    friday: { isOpen: boolean; openTime: string; closeTime: string };
    saturday: { isOpen: boolean; openTime: string; closeTime: string };
    sunday: { isOpen: boolean; openTime: string; closeTime: string };
  };
  specialDays?: Array<{
    date: string;
    name: string;
    isOpen: boolean;
    openTime?: string;
    closeTime?: string;
  }>;
  closedDays?: string[]; // Array of dates that are closed
}

interface Service {
  id: string;
  name: string;
  description: string;
  customPrice: number;
  customDuration: number;
  isActive: boolean;
  category: string;
  vehicleTypes: string[];
  // Business Module Support
  applicableModules?: BusinessModule[];
  moduleSpecificPricing?: {
    [K in BusinessModule]?: {
      price: number;
      duration: number;
      travelFee?: number; // for mobile only
    };
  };
}

interface Package {
  id: string;
  name: string;
  description: string;
  includedServices: string[];
  vehicleTypePricing: Array<{
    vehicleType: string;
    price: number;
    discountPrice: number;
    duration: number;
  }>;
  isActive: boolean;
  vehicleTypes: string[];
}

interface AICampaignSuggestion {
  id: string;
  campaignName: string;
  targetTimeSlot: string;
  campaignType: string;
  discountValue: number;
  predictedBookingIncrease: number;
  predictedRevenue: string;
  confidence: number;
  targetCustomerSegment: string;
  recommendedDuration: string;
  aiReasoning: string;
}

interface PeakTimeAnalytics {
  currentPeakHours: Array<{
    timeSlot: string;
    bookingCount: number;
    revenueGenerated: number;
    utilizationRate: number;
  }>;
  currentLowestHours: Array<{
    timeSlot: string;
    bookingCount: number;
    revenueGenerated: number;
    utilizationRate: number;
  }>;
  aiCampaignSuggestions: AICampaignSuggestion[];
}

interface BookingManagementProps {
  bookings: Booking[];
  branches: Branch[];
  services?: Service[];
  packages?: Package[];
  onUpdateBookingStatus: (bookingId: string, status: Booking['status'], notes?: string) => void;
  onCreateBooking: (booking: Partial<Booking>) => void;
  onUpdateBooking: (bookingId: string, updates: Partial<Booking>) => void;
  onDeleteBooking: (bookingId: string) => void;
  userRole?: "carwash_owner" | "carwash_admin";
  assignedBranches?: string[];
  peakTimeAnalytics?: PeakTimeAnalytics;
  onCreateCampaignFromSuggestion?: (suggestion: AICampaignSuggestion) => void;
}

const STATIONS = ["station1", "station2", "station3", "station4", "station5", "station6"];
const STATION_NAMES = ["Station 1", "Station 2", "Station 3", "Station 4", "Station 5", "Station 6"];

const STATUS_COLORS = {
  "pending-approval": "bg-amber-500",
  reserved: "bg-blue-500",
  "ai-campaign": "bg-purple-500",
  approved: "bg-green-600",
  "in-progress": "bg-orange-500",
  completed: "bg-green-500",
  "no-show": "bg-gray-500",
  canceled: "bg-red-500",
  rescheduled: "bg-indigo-500"
};

const STATUS_LABELS = {
  "pending-approval": "Pending Approval",
  reserved: "Reserved",
  "ai-campaign": "AI Campaign",
  approved: "Approved",
  "in-progress": "In Progress", 
  completed: "Completed",
  "no-show": "Did Not Appear",
  canceled: "Canceled",
  rescheduled: "Rescheduled"
};

export function BookingManagement({ 
  bookings, 
  branches,
  services = [],
  packages = [],
  onUpdateBookingStatus, 
  onCreateBooking, 
  onUpdateBooking, 
  onDeleteBooking,
  userRole = "carwash_owner",
  assignedBranches = [],
  peakTimeAnalytics,
  onCreateCampaignFromSuggestion
}: BookingManagementProps) {
  const [mainView, setMainView] = useState<"calendar" | "list">("calendar");
  const [currentView, setCurrentView] = useState<"daily" | "weekly" | "monthly">("daily");
  const [selectedDate, setSelectedDate] = useState(new Date());
  // For carwash_admin, default to first assigned branch; for owner, default to first branch
  const [selectedBranch, setSelectedBranch] = useState(() => {
    if (userRole === "carwash_admin" && assignedBranches.length > 0) {
      return assignedBranches[0];
    }
    return branches[0]?.id || "";
  });
  const [showNewBookingForm, setShowNewBookingForm] = useState(false);
  const [showEditBookingForm, setShowEditBookingForm] = useState(false);
  
  // Form states for creating/editing bookings
  const [newBookingForm, setNewBookingForm] = useState({
    customerName: "",
    customerPhone: "",
    customerEmail: "",
    carPlateNumber: "",
    date: "",
    time: "",
    service: "",
    vehicleType: "",
    estimatedDuration: 60,
    price: 0,
    station: "",
    notes: "",
    selectedServices: [] as string[],
    selectedPackages: [] as string[]
  });
  const [editFormServices, setEditFormServices] = useState<string[]>([]);
  const [editFormPackages, setEditFormPackages] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [stationFilter, setStationFilter] = useState<string>("all");
  const [branchFilter, setBranchFilter] = useState<string>("all");
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
  const [showBookingDialog, setShowBookingDialog] = useState(false);
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const [newBookingData, setNewBookingData] = useState<Partial<Booking>>({});
  const [actionNotes, setActionNotes] = useState("");
  const [showAISuggestionsDialog, setShowAISuggestionsDialog] = useState(false);
  const [selectedSuggestion, setSelectedSuggestion] = useState<AICampaignSuggestion | null>(null);
  const [showInsightsDrawer, setShowInsightsDrawer] = useState(false);
  const [showAlternativeTimeDialog, setShowAlternativeTimeDialog] = useState(false);
  const [alternativeTimeForm, setAlternativeTimeForm] = useState({
    suggestedDate: "",
    suggestedTime: "",
    incentiveType: "discount" as "discount" | "coupon" | "extra-service",
    discountType: "percentage" as "percentage" | "fixed",
    discountValue: 10,
    couponCode: "",
    extraService: "",
    message: ""
  });
  
  // Campaign form state
  const [campaignForm, setCampaignForm] = useState({
    name: "",
    description: "",
    type: "Percentage Discount" as const,
    discountValue: 10,
    startDate: "",
    endDate: "",
    scope: "All Branches" as const,
    applicableItems: [] as string[],
    applicableBranches: [] as string[],
    isActive: true,
    targetTimeSlot: "",
  });

  // Helper function to get US federal holidays and special days (including Islamic holidays)
  const getUSHolidays = (year: number) => {
    const holidays = [
      { date: `${year}-01-01`, name: "New Year's Day", emoji: "🎉" },
      { date: `${year}-07-04`, name: "Independence Day", emoji: "🇺🇸" },
      { date: `${year}-12-25`, name: "Christmas Day", emoji: "🎄" },
      { date: `${year}-11-11`, name: "Veterans Day", emoji: "🎖️" },
      { date: `${year}-02-14`, name: "Valentine's Day", emoji: "❤️" },
      { date: `${year}-10-31`, name: "Halloween", emoji: "🎃" },
      { date: `${year}-11-24`, name: "Thanksgiving", emoji: "🦃" }, // Approximation
      { date: `${year}-05-29`, name: "Memorial Day", emoji: "🇺🇸" }, // Approximation
      { date: `${year}-09-04`, name: "Labor Day", emoji: "🛠️" }, // Approximation
    ];

    // Add Islamic holidays (2025 dates - these change yearly based on lunar calendar)
    if (year === 2025) {
      holidays.push(
        { date: "2025-03-30", name: "Ramadan Eid", emoji: "🌙" },
        { date: "2025-03-31", name: "Ramadan Eid", emoji: "🌙" },
        { date: "2025-06-06", name: "Qurban Eid", emoji: "🕌" },
        { date: "2025-06-07", name: "Qurban Eid", emoji: "🕌" },
        { date: "2025-06-08", name: "Qurban Eid", emoji: "🕌" },
        { date: "2025-06-09", name: "Qurban Eid", emoji: "🕌" }
      );
    }
    
    // Add Islamic holidays (2024 dates)
    if (year === 2024) {
      holidays.push(
        { date: "2024-04-10", name: "Ramadan Eid", emoji: "🌙" },
        { date: "2024-04-11", name: "Ramadan Eid", emoji: "🌙" },
        { date: "2024-06-16", name: "Qurban Eid", emoji: "🕌" },
        { date: "2024-06-17", name: "Qurban Eid", emoji: "🕌" },
        { date: "2024-06-18", name: "Qurban Eid", emoji: "🕌" },
        { date: "2024-06-19", name: "Qurban Eid", emoji: "🕌" }
      );
    }

    return holidays;
  };

  // Check if a date is a holiday or special day
  const getSpecialDayInfo = (dateStr: string, branch: Branch | undefined) => {
    if (!branch) return null;
    
    const date = new Date(dateStr);
    const year = date.getFullYear();
    const holidays = getUSHolidays(year);
    
    // Check if it's a US holiday
    const holiday = holidays.find(h => h.date === dateStr);
    if (holiday) {
      return { type: 'holiday', name: holiday.name, emoji: holiday.emoji };
    }
    
    // Check branch special days
    if (branch.specialDays) {
      const specialDay = branch.specialDays.find(sd => sd.date === dateStr);
      if (specialDay) {
        return { type: 'special', name: specialDay.name, isOpen: specialDay.isOpen };
      }
    }
    
    // Check if it's in closed days
    if (branch.closedDays && branch.closedDays.includes(dateStr)) {
      return { type: 'closed', name: 'Closed Day' };
    }
    
    return null;
  };

  // Check if time is within working hours for a given date
  const isWithinWorkingHours = (dateStr: string, timeStr: string, branch: Branch | undefined) => {
    if (!branch || !branch.operatingHours) return true;
    
    const date = new Date(dateStr);
    const dayNames = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
    const dayName = dayNames[date.getDay()] as keyof typeof branch.operatingHours;
    
    const dayHours = branch.operatingHours[dayName];
    if (!dayHours || !dayHours.isOpen) return false;
    
    // Check special day override
    const specialDay = branch.specialDays?.find(sd => sd.date === dateStr);
    if (specialDay) {
      if (!specialDay.isOpen) return false;
      if (specialDay.openTime && specialDay.closeTime) {
        return timeStr >= specialDay.openTime && timeStr <= specialDay.closeTime;
      }
    }
    
    // Check closed days
    if (branch.closedDays && branch.closedDays.includes(dateStr)) {
      return false;
    }
    
    return timeStr >= dayHours.openTime && timeStr <= dayHours.closeTime;
  };

  // Get AI campaign suggestion for special days like 4th of July
  const getSpecialDayCampaignSuggestion = (dateStr: string) => {
    const specialDayInfo = getSpecialDayInfo(dateStr, branches.find(b => b.id === selectedBranch));
    
    if (!specialDayInfo || specialDayInfo.type !== 'holiday') return null;
    
    // Generate campaign suggestion for holidays
    const campaignSuggestions: Record<string, AICampaignSuggestion> = {
      "Independence Day": {
        id: "special_july4",
        campaignName: "🇺🇸 Independence Day Special",
        targetTimeSlot: "All Day",
        campaignType: "Percentage Discount",
        discountValue: 25,
        predictedBookingIncrease: 120,
        predictedRevenue: "$850",
        confidence: 94,
        targetCustomerSegment: "Patriotic Customers & Families",
        recommendedDuration: "3 days",
        aiReasoning: `July 4th is a major holiday with high customer sentiment. Families often prepare for celebrations and want clean vehicles. A 25% "Freedom Shine" discount will drive significant bookings while celebrating American pride.`
      },
      "Christmas Day": {
        id: "special_christmas",
        campaignName: "🎄 Holiday Sparkle Special",
        targetTimeSlot: "All Day",
        campaignType: "Percentage Discount",
        discountValue: 30,
        predictedBookingIncrease: 95,
        predictedRevenue: "$720",
        confidence: 89,
        targetCustomerSegment: "Holiday Travelers",
        recommendedDuration: "5 days",
        aiReasoning: "Christmas week sees increased family travel. Customers want pristine vehicles for holiday gatherings and photos. Premium holiday discount drives pre-celebration bookings."
      },
      "Valentine's Day": {
        id: "special_valentines",
        campaignName: "❤️ Love Your Car Special",
        targetTimeSlot: "All Day",
        campaignType: "Fixed Discount",
        discountValue: 20,
        predictedBookingIncrease: 75,
        predictedRevenue: "$540",
        confidence: 82,
        targetCustomerSegment: "Couples & Date Night",
        recommendedDuration: "3 days",
        aiReasoning: "Valentine's Day inspires date nights and special occasions. Clean car = better impression. Package this with 'Date Night Ready' messaging for emotional appeal."
      },
      "Halloween": {
        id: "special_halloween",
        campaignName: "🎃 Spooktacular Shine",
        targetTimeSlot: "All Day",
        campaignType: "Percentage Discount",
        discountValue: 20,
        predictedBookingIncrease: 65,
        predictedRevenue: "$480",
        confidence: 78,
        targetCustomerSegment: "Families with Kids",
        recommendedDuration: "3 days",
        aiReasoning: "Halloween means trunk-or-treating, costume parties, and neighborhood events. Families want clean vehicles for festivities and photos."
      },
      "Thanksgiving": {
        id: "special_thanksgiving",
        campaignName: "🦃 Grateful for Clean Cars",
        targetTimeSlot: "All Day",
        campaignType: "Percentage Discount",
        discountValue: 25,
        predictedBookingIncrease: 100,
        predictedRevenue: "$780",
        confidence: 91,
        targetCustomerSegment: "Holiday Travelers",
        recommendedDuration: "5 days",
        aiReasoning: "Thanksgiving is peak travel season. Families travel long distances for gatherings and want clean vehicles. Pre-holiday surge offers strong revenue opportunity."
      },
      "Ramadan Eid": {
        id: "special_ramadan_eid",
        campaignName: "🌙 Eid Mubarak Special",
        targetTimeSlot: "All Day",
        campaignType: "Percentage Discount",
        discountValue: 25,
        predictedBookingIncrease: 110,
        predictedRevenue: "$820",
        confidence: 93,
        targetCustomerSegment: "Muslim Families & Community",
        recommendedDuration: "4 days",
        aiReasoning: "Eid Al-Fitr marks the end of Ramadan and is a major celebration. Families gather, visit loved ones, and want pristine vehicles for the festive occasion. Special discount shows cultural respect and drives strong bookings."
      },
      "Qurban Eid": {
        id: "special_qurban_eid",
        campaignName: "🕌 Eid Al-Adha Blessing",
        targetTimeSlot: "All Day",
        campaignType: "Percentage Discount",
        discountValue: 25,
        predictedBookingIncrease: 105,
        predictedRevenue: "$795",
        confidence: 92,
        targetCustomerSegment: "Muslim Families & Community",
        recommendedDuration: "5 days",
        aiReasoning: "Eid Al-Adha (Feast of Sacrifice) is one of the most important Islamic holidays. Families prepare for prayers, gatherings, and visiting. Clean vehicles are essential for this blessed celebration period."
      }
    };
    
    return campaignSuggestions[specialDayInfo.name] || null;
  };

  // Filter bookings based on user role and assigned branches
  const filteredBookingsByRole = useMemo(() => {
    if (userRole === "carwash_admin" && assignedBranches.length > 0) {
      return bookings.filter(booking => assignedBranches.includes(booking.branchId));
    }
    return bookings;
  }, [bookings, userRole, assignedBranches]);

  // Filter bookings based on search and filters
  const filteredBookings = useMemo(() => {
    return filteredBookingsByRole.filter(booking => {
      const matchesSearch = !searchQuery || 
        booking.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        booking.customerPhone.includes(searchQuery) ||
        booking.carPlateNumber?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        booking.service.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesStatus = statusFilter === "all" || booking.status === statusFilter;
      const matchesStation = stationFilter === "all" || booking.station === stationFilter;
      const matchesBranch = branchFilter === "all" || booking.branchId === branchFilter;
      
      return matchesSearch && matchesStatus && matchesStation && matchesBranch;
    });
  }, [filteredBookingsByRole, searchQuery, statusFilter, stationFilter, branchFilter]);

  // Get bookings for current view
  const getBookingsForView = () => {
    const today = selectedDate.toISOString().split('T')[0];
    
    switch (currentView) {
      case "daily":
        return filteredBookings.filter(booking => booking.date === today);
      case "weekly":
        const startOfWeek = new Date(selectedDate);
        startOfWeek.setDate(startOfWeek.getDate() - startOfWeek.getDay());
        const endOfWeek = new Date(startOfWeek);
        endOfWeek.setDate(endOfWeek.getDate() + 6);
        
        return filteredBookings.filter(booking => {
          const bookingDate = new Date(booking.date);
          return bookingDate >= startOfWeek && bookingDate <= endOfWeek;
        });
      case "monthly":
        const startOfMonth = new Date(selectedDate.getFullYear(), selectedDate.getMonth(), 1);
        const endOfMonth = new Date(selectedDate.getFullYear(), selectedDate.getMonth() + 1, 0);
        
        return filteredBookings.filter(booking => {
          const bookingDate = new Date(booking.date);
          return bookingDate >= startOfMonth && bookingDate <= endOfMonth;
        });
      default:
        return filteredBookings;
    }
  };

  // Get dates for weekly/monthly views
  const getViewDates = () => {
    switch (currentView) {
      case "weekly":
        const startOfWeek = new Date(selectedDate);
        startOfWeek.setDate(startOfWeek.getDate() - startOfWeek.getDay());
        const weekDates = [];
        for (let i = 0; i < 7; i++) {
          const date = new Date(startOfWeek);
          date.setDate(date.getDate() + i);
          weekDates.push(date);
        }
        return weekDates;
      case "monthly":
        const startOfMonth = new Date(selectedDate.getFullYear(), selectedDate.getMonth(), 1);
        const endOfMonth = new Date(selectedDate.getFullYear(), selectedDate.getMonth() + 1, 0);
        const monthDates = [];
        for (let d = new Date(startOfMonth); d <= endOfMonth; d.setDate(d.getDate() + 1)) {
          monthDates.push(new Date(d));
        }
        return monthDates;
      default:
        return [selectedDate];
    }
  };

  const viewBookings = getBookingsForView();

  // Generate 30-minute time slots for the calendar (granular like Google Calendar)
  const generateTimeSlots = () => {
    const slots = [];
    for (let hour = 8; hour < 20; hour++) {
      slots.push({
        time: `${hour.toString().padStart(2, '0')}:00`,
        hour,
        minutes: 0,
        display: `${hour.toString().padStart(2, '0')}:00`
      });
      slots.push({
        time: `${hour.toString().padStart(2, '0')}:30`,
        hour,
        minutes: 30,
        display: `${hour.toString().padStart(2, '0')}:30`
      });
    }
    return slots;
  };

  const timeSlots = generateTimeSlots();

  // Get bookings for specific station and time slot
  const getBookingsForSlot = (station: string, time: string, date: string) => {
    return viewBookings.filter(booking => {
      const [bookingHour, bookingMinutes] = booking.time.split(':').map(Number);
      const [slotHour, slotMinutes] = time.split(':').map(Number);
      
      // Check if booking starts in this 30-minute slot
      const bookingStartMinutes = bookingHour * 60 + bookingMinutes;
      const slotStartMinutes = slotHour * 60 + slotMinutes;
      const slotEndMinutes = slotStartMinutes + 30;
      
      return booking.station === station && 
             booking.date === date &&
             bookingStartMinutes >= slotStartMinutes && 
             bookingStartMinutes < slotEndMinutes;
    });
  };

  // Calculate if booking spans multiple slots
  const getBookingSpanInfo = (booking: any) => {
    const [hours, minutes] = booking.time.split(':').map(Number);
    const duration = booking.estimatedDuration;
    const slotsSpanned = Math.ceil(duration / 30);
    
    return {
      slotsSpanned,
      isFirstSlot: true, // This function is called for the starting slot
      duration
    };
  };

  // Check if a time slot is within a low traffic period
  const isLowTrafficSlot = (slotTime: string) => {
    if (!peakTimeAnalytics?.currentLowestHours) return false;
    
    const [slotHour, slotMinutes] = slotTime.split(':').map(Number);
    const slotTotalMinutes = slotHour * 60 + slotMinutes;
    
    return peakTimeAnalytics.currentLowestHours.some(lowHour => {
      // Parse time ranges like "6:00 AM - 8:00 AM" or "2:00 PM - 4:00 PM"
      const [startStr, endStr] = lowHour.timeSlot.split(' - ');
      
      const parseTime = (timeStr: string) => {
        const match = timeStr.match(/(\d+):(\d+)\s*(AM|PM)/);
        if (!match) return 0;
        
        let hours = parseInt(match[1]);
        const minutes = parseInt(match[2]);
        const period = match[3];
        
        if (period === 'PM' && hours !== 12) hours += 12;
        if (period === 'AM' && hours === 12) hours = 0;
        
        return hours * 60 + minutes;
      };
      
      const startMinutes = parseTime(startStr);
      const endMinutes = parseTime(endStr);
      
      return slotTotalMinutes >= startMinutes && slotTotalMinutes < endMinutes;
    });
  };

  // Get AI campaign suggestion for a low traffic slot
  const getCampaignSuggestionForSlot = (slotTime: string) => {
    if (!peakTimeAnalytics?.aiCampaignSuggestions) return null;
    
    const [slotHour, slotMinutes] = slotTime.split(':').map(Number);
    const slotTotalMinutes = slotHour * 60 + slotMinutes;
    
    // Find the suggestion that targets this time slot
    return peakTimeAnalytics.aiCampaignSuggestions.find(suggestion => {
      const [startStr, endStr] = suggestion.targetTimeSlot.split(' - ');
      
      const parseTime = (timeStr: string) => {
        const match = timeStr.match(/(\d+):(\d+)\s*(AM|PM)/);
        if (!match) return 0;
        
        let hours = parseInt(match[1]);
        const minutes = parseInt(match[2]);
        const period = match[3];
        
        if (period === 'PM' && hours !== 12) hours += 12;
        if (period === 'AM' && hours === 12) hours = 0;
        
        return hours * 60 + minutes;
      };
      
      const startMinutes = parseTime(startStr);
      const endMinutes = parseTime(endStr);
      
      return slotTotalMinutes >= startMinutes && slotTotalMinutes < endMinutes;
    });
  };

  // Handle booking status updates
  const handleStatusUpdate = (booking: Booking, newStatus: Booking['status']) => {
    if (newStatus === "completed") {
      // Simulate push notification
      toast.success(`Push notification sent: "Your car is ready" to ${booking.customerName}`);
    }
    onUpdateBookingStatus(booking.id, newStatus, actionNotes);
    setActionNotes("");
    setShowBookingDialog(false);
    toast.success(`Booking ${STATUS_LABELS[newStatus].toLowerCase()}`);
  };

  // Generate QR code for check-in (mock)
  const generateQRCode = (bookingId: string) => {
    return `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${bookingId}`;
  };

  // Check if admin can edit bookings for selected branch
  // For carwash_admin: Only the FIRST assigned branch is editable (their primary branch)
  // Other assigned branches are "sibling branches" - view only
  const canEditBranch = (branchId: string) => {
    if (userRole === "carwash_owner") return true;
    if (userRole === "carwash_admin") {
      // Only the first assigned branch (primary) is editable
      return assignedBranches.length > 0 && assignedBranches[0] === branchId;
    }
    return false;
  };

  // Check if current selected branch is editable
  const isCurrentBranchEditable = canEditBranch(selectedBranch);
  
  // Check if current selected branch is a sibling (assigned but not editable)
  const isViewingSiblingBranch = userRole === "carwash_admin" && 
    assignedBranches.includes(selectedBranch) && 
    !canEditBranch(selectedBranch);

  // Navigation functions
  const navigateDate = (direction: "prev" | "next") => {
    const newDate = new Date(selectedDate);
    switch (currentView) {
      case "daily":
        newDate.setDate(newDate.getDate() + (direction === "next" ? 1 : -1));
        break;
      case "weekly":
        newDate.setDate(newDate.getDate() + (direction === "next" ? 7 : -7));
        break;
      case "monthly":
        newDate.setMonth(newDate.getMonth() + (direction === "next" ? 1 : -1));
        break;
    }
    setSelectedDate(newDate);
  };

  // Format date display
  const formatDateDisplay = () => {
    const options: Intl.DateTimeFormatOptions = { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    };
    
    switch (currentView) {
      case "daily":
        return selectedDate.toLocaleDateString(undefined, options);
      case "weekly":
        const startOfWeek = new Date(selectedDate);
        startOfWeek.setDate(startOfWeek.getDate() - startOfWeek.getDay());
        const endOfWeek = new Date(startOfWeek);
        endOfWeek.setDate(endOfWeek.getDate() + 6);
        return `${startOfWeek.toLocaleDateString(undefined, { month: 'short', day: 'numeric' })} - ${endOfWeek.toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}`;
      case "monthly":
        return selectedDate.toLocaleDateString(undefined, { year: 'numeric', month: 'long' });
      default:
        return "";
    }
  };

  // Completed bookings for notification panel
  const completedBookings = filteredBookings.filter(b => b.status === "completed").slice(0, 5);

  // Current time indicator for 30-minute slots
  const getCurrentTimePosition = () => {
    const now = new Date();
    const currentHour = now.getHours();
    const currentMinutes = now.getMinutes();
    
    if (currentHour < 8 || currentHour >= 20) return null;
    
    // Calculate which 30-minute slot we're in
    const totalMinutesSince8AM = (currentHour - 8) * 60 + currentMinutes;
    const slotIndex = Math.floor(totalMinutesSince8AM / 30);
    const minutesIntoSlot = totalMinutesSince8AM % 30;
    
    // Each slot is 40px high
    const pixelPosition = slotIndex * 40 + (minutesIntoSlot / 30) * 40;
    
    return {
      top: `${pixelPosition}px`,
      display: selectedDate.toDateString() === new Date().toDateString() ? 'block' : 'none'
    };
  };

  const currentTimeStyle = getCurrentTimePosition();

  // Generate time slots for the booking form dropdown
  const generateFormTimeSlots = () => {
    const slots = [];
    for (let hour = 8; hour < 20; hour++) {
      slots.push(`${hour.toString().padStart(2, '0')}:00`);
      slots.push(`${hour.toString().padStart(2, '0')}:30`);
    }
    return slots;
  };

  const formTimeSlots = generateFormTimeSlots();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Booking Management</h2>
          <p className="text-muted-foreground">
            Manage car wash bookings and capacity planning with real-time updates
          </p>
        </div>
        <div className="flex gap-2">
          {/* Branch Selector for Carwash Admin */}
          {userRole === "carwash_admin" && assignedBranches.length > 0 && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline">
                  <MapPin className="h-4 w-4 mr-2" />
                  {branches.find(b => b.id === selectedBranch)?.name || "Select Branch"}
                  <ChevronDown className="h-4 w-4 ml-2" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-[260px]">
                {branches
                  .filter(branch => assignedBranches.includes(branch.id))
                  .map((branch, index) => {
                    const isPrimaryBranch = index === 0 || branch.id === assignedBranches[0];
                    return (
                      <DropdownMenuItem
                        key={branch.id}
                        onClick={() => setSelectedBranch(branch.id)}
                        className="cursor-pointer"
                      >
                        <div className="flex items-center justify-between w-full gap-2">
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2">
                              <span className="truncate">{branch.name}</span>
                              {isPrimaryBranch && (
                                <Badge variant="secondary" className="text-xs px-1.5 py-0 h-5 bg-green-100 text-green-700 border-green-200">
                                  Your Branch
                                </Badge>
                              )}
                            </div>
                            {!isPrimaryBranch && (
                              <span className="text-xs text-muted-foreground">View Only</span>
                            )}
                          </div>
                          {selectedBranch === branch.id && (
                            <CheckCircle className="h-4 w-4 text-green-600 flex-shrink-0" />
                          )}
                        </div>
                      </DropdownMenuItem>
                    );
                  })}
              </DropdownMenuContent>
            </DropdownMenu>
          )}
          
          <Button 
            onClick={() => setShowCreateDialog(true)}
            disabled={userRole === "carwash_admin" && !isCurrentBranchEditable}
            title={userRole === "carwash_admin" && !isCurrentBranchEditable ? "You can only create bookings for your assigned branches" : undefined}
          >
            <Calendar className="h-4 w-4 mr-2" />
            New Booking
          </Button>
        </div>
      </div>

      {/* AI Insights */}
      <AIInsights
        insights={[
          {
            id: "booking-peak",
            type: "prediction",
            title: "Peak Hours Prediction",
            description: "Tomorrow 2-4 PM expected to be 40% busier than average. Consider adjusting staff allocation.",
            impact: "high",
            confidence: 0.87,
            metric: "Expected bookings",
            value: "18-22",
            trend: "up",
            action: {
              label: "Optimize Schedule",
              onClick: () => toast.info("Schedule optimization feature coming soon")
            }
          },
          {
            id: "pricing-opportunity",
            type: "opportunity",
            title: "Off-Peak Pricing Opportunity",
            description: "Weekday mornings (9-11 AM) show 65% lower utilization. A 20% discount could increase bookings by 35%.",
            impact: "medium",
            confidence: 0.82,
            metric: "Potential revenue increase",
            value: "+$340/week",
            action: {
              label: "Create Campaign",
              onClick: () => toast.success("Campaign creation initiated")
            }
          },
          {
            id: "no-show-alert",
            type: "alert",
            title: "No-Show Pattern Detected",
            description: "Customer 'John Smith' has 3 consecutive no-shows. Consider requiring deposit for future bookings.",
            impact: "medium",
            action: {
              label: "View Customer Profile",
              onClick: () => toast.info("Navigating to customer profile")
            }
          },
          {
            id: "service-demand",
            type: "recommendation",
            title: "Popular Service Combination",
            description: "75% of premium wash customers also request interior detailing. Consider creating a bundled package.",
            impact: "high",
            confidence: 0.91,
            metric: "Conversion rate",
            value: "75%",
            action: {
              label: "Create Package",
              onClick: () => toast.success("Package builder opened")
            }
          }
        ]}
        title="Booking Intelligence"
        dismissible={true}
      />

      {/* Main Tabs */}
      <Tabs value={mainView} onValueChange={(v) => setMainView(v as "calendar" | "list")}>
        <TabsList>
          <TabsTrigger value="calendar" className="flex items-center gap-2">
            <CalendarIcon className="h-4 w-4" />
            Calendar View
          </TabsTrigger>
          <TabsTrigger value="list" className="flex items-center gap-2">
            <List className="h-4 w-4" />
            List View
          </TabsTrigger>
        </TabsList>

        {/* Calendar Tab Content */}
        <TabsContent value="calendar" className="space-y-6">

      {/* Filters and Search */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search by customer name, phone, plate number, or service..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9"
                />
              </div>
            </div>
            
            <div className="flex gap-2">
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-40">
                  <Filter className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="requested">Requested</SelectItem>
                  <SelectItem value="reserved">Reserved</SelectItem>
                  <SelectItem value="pending-approval">Pending Approval</SelectItem>
                  <SelectItem value="ai-campaign">AI Campaign</SelectItem>
                  <SelectItem value="approved">Approved</SelectItem>
                  <SelectItem value="in-progress">In Progress</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                  <SelectItem value="no-show">Did Not Appear</SelectItem>
                  <SelectItem value="canceled">Canceled</SelectItem>
                  <SelectItem value="rescheduled">Rescheduled</SelectItem>
                </SelectContent>
              </Select>

              <Select value={stationFilter} onValueChange={setStationFilter}>
                <SelectTrigger className="w-32">
                  <SelectValue placeholder="Station" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Stations</SelectItem>
                  {STATIONS.map((station, index) => (
                    <SelectItem key={station} value={station}>
                      Station {index + 1}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* View-Only Mode Alert for Carwash Admin - Sibling Branch */}
      {isViewingSiblingBranch && (
        <Card className="border-blue-200 bg-blue-50">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                <AlertTriangle className="h-5 w-5 text-blue-600" />
              </div>
              <div className="flex-1">
                <h4 className="font-medium text-blue-900">View-Only Mode - Sibling Branch</h4>
                <p className="text-sm text-blue-700">
                  You are viewing <strong>{branches.find(b => b.id === selectedBranch)?.name}</strong>, a sibling branch. You can view bookings and calendars but cannot create, edit, or manage bookings. Switch to <strong>{branches.find(b => b.id === assignedBranches[0])?.name}</strong> (your branch) to make changes.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="grid grid-cols-1 xl:grid-cols-5 gap-6 px-[-40px] py-[0px]">
        {/* Main Calendar View */}
        <div className="xl:col-span-4">
          <Card className="">
            <CardHeader>
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-2">
                <div className="flex items-center gap-4 flex-1">
                  {/* Mobile Insights Button */}
                  <Button
                    variant="outline"
                    size="sm"
                    className="xl:hidden"
                    onClick={() => setShowInsightsDrawer(true)}
                  >
                    <BarChart3 className="h-4 w-4 mr-2" />
                    Insights
                  </Button>
                  
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => navigateDate("prev")}
                    >
                      <ChevronLeft className="h-4 w-4" />
                    </Button>
                    <CardTitle className="text-lg">{formatDateDisplay()}</CardTitle>
                    <Button
                      variant="outline" 
                      size="sm"
                      onClick={() => navigateDate("next")}
                    >
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setSelectedDate(new Date())}
                  >
                    Today
                  </Button>
                </div>

                <Tabs value={currentView} onValueChange={(v) => setCurrentView(v as any)}>
                  <TabsList>
                    <TabsTrigger value="daily">Daily</TabsTrigger>
                    <TabsTrigger value="weekly">Weekly</TabsTrigger>
                    <TabsTrigger value="monthly">Monthly</TabsTrigger>
                  </TabsList>
                </Tabs>
              </div>
            </CardHeader>
            <CardContent>
              {currentView === "daily" && (
                /* Daily View - 30-minute slots with Station Columns */
                <div className="overflow-x-auto">
                  <div className="min-w-[900px]">
                    {/* Header Row with Station Columns */}
                    <div className="grid grid-cols-7 gap-0 border-b mb-0 sticky top-0 bg-background z-20">
                      <div className="p-3 text-sm font-medium bg-muted/50 border-r">Time</div>
                      {STATION_NAMES.map((stationName, index) => (
                        <div key={stationName} className="p-3 text-sm font-medium text-center bg-muted/30 border-r last:border-r-0">
                          {stationName}
                        </div>
                      ))}
                    </div>

                    {/* Calendar Body with 30-minute Time Slots */}
                    <div className="h-[calc(100vh-420px)] overflow-y-auto relative">
                      {/* Current Time Indicator */}
                      {currentTimeStyle && (
                        <div 
                          className="absolute left-0 right-0 z-10 pointer-events-none"
                          style={currentTimeStyle}
                        >
                          <div className="h-0.5 bg-red-500 relative">
                            <div className="absolute -left-1 -top-1 w-2 h-2 bg-red-500 rounded-full"></div>
                            <div className="absolute right-2 -top-2 text-xs text-red-500 font-medium">
                              {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                            </div>
                          </div>
                        </div>
                      )}

                      {timeSlots.map((slot, slotIndex) => (
                        <div key={slot.time} className={`grid grid-cols-7 gap-0 ${slot.minutes === 0 ? 'border-b border-border' : 'border-b border-border/30'} min-h-[40px]`}>
                          {/* Time Column */}
                          <div className={`p-2 text-sm border-r flex items-center ${slot.minutes === 0 ? 'bg-muted/20 text-muted-foreground font-medium' : 'bg-muted/10 text-muted-foreground/70'}`}>
                            <div className="text-xs">
                              {slot.minutes === 0 ? slot.display : slot.display}
                            </div>
                          </div>
                          
                          {/* Station Columns */}
                          {STATIONS.map((station, stationIndex) => {
                            const bookingsInSlot = getBookingsForSlot(station, slot.time, selectedDate.toISOString().split('T')[0]);
                            const isLowTraffic = isLowTrafficSlot(slot.time);
                            const campaignSuggestion = isLowTraffic ? getCampaignSuggestionForSlot(slot.time) : null;
                            const showCampaignCard = isLowTraffic && campaignSuggestion && bookingsInSlot.length === 0 && stationIndex === 0 && slot.minutes === 0;
                            const currentBranch = branches.find(b => b.id === selectedBranch);
                            const isWorkingHour = isWithinWorkingHours(selectedDate.toISOString().split('T')[0], slot.time, currentBranch);
                            const specialDay = getSpecialDayInfo(selectedDate.toISOString().split('T')[0], currentBranch);
                            const showSpecialDayCard = specialDay && stationIndex === 0 && slot.hour === 8 && slot.minutes === 0;
                            
                            return (
                              <div 
                                key={station} 
                                className={`border-r last:border-r-0 min-h-[40px] relative transition-colors ${
                                  !isWorkingHour 
                                    ? 'bg-gray-100 hover:bg-gray-150 pattern-diagonal-lines opacity-40' 
                                    : isLowTraffic && bookingsInSlot.length === 0 
                                      ? 'bg-purple-50/30 hover:bg-purple-50/50' 
                                      : 'bg-background hover:bg-muted/5'
                                }`}
                                title={!isWorkingHour ? 'Non-working hours' : ''}
                              >
                                {bookingsInSlot.map((booking) => {
                                  const spanInfo = getBookingSpanInfo(booking);
                                  const height = Math.max(40, (spanInfo.slotsSpanned * 40) - 2);
                                  
                                  return (
                                    <div
                                      key={booking.id}
                                      className={`absolute left-1 right-1 top-1 rounded-md p-2 text-white text-xs cursor-pointer hover:opacity-90 transition-all shadow-sm ${STATUS_COLORS[booking.status]} border border-white/20 z-5`}
                                      style={{ 
                                        height: `${height}px`,
                                        minHeight: '38px'
                                      }}
                                      onClick={() => {
                                        setSelectedBooking(booking);
                                        setShowBookingDialog(true);
                                      }}
                                    >
                                      <div className="font-medium truncate text-white text-xs leading-tight">
                                        {booking.time} - {booking.customerName}
                                      </div>
                                      <div className="truncate text-white/90 text-xs leading-tight mt-0.5">
                                        {booking.service}
                                      </div>
                                      {height > 50 && (
                                        <div className="text-white/80 text-xs leading-tight mt-0.5">
                                          {booking.estimatedDuration}min
                                        </div>
                                      )}
                                    </div>
                                  );
                                })}

                                {/* Special Day Card */}
                                {showSpecialDayCard && specialDay && (
                                  <div
                                    className={`absolute left-1 top-1 rounded-md p-2 text-xs shadow-md border z-5 ${
                                      specialDay.type === 'holiday' 
                                        ? 'bg-gradient-to-br from-yellow-50 to-orange-50 border-orange-200'
                                        : specialDay.type === 'closed'
                                        ? 'bg-gray-100 border-gray-300'
                                        : 'bg-blue-50 border-blue-200'
                                    }`}
                                    style={{ 
                                      height: '58px',
                                      minHeight: '58px',
                                      width: 'calc(600% + 5px)'
                                    }}
                                  >
                                    <div className="flex items-center gap-2">
                                      <span className="text-2xl">{specialDay.emoji || '📅'}</span>
                                      <div className="flex-1">
                                        <div className="font-medium text-gray-900 text-xs mb-0.5">
                                          {specialDay.name}
                                        </div>
                                        <div className="text-gray-600 text-xs">
                                          {specialDay.type === 'holiday' ? 'Special Holiday' : specialDay.type === 'closed' ? 'Closed' : 'Special Day'}
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                )}

                                {/* AI Campaign Suggestion Card for Low Traffic Slots */}
                                {showCampaignCard && (
                                  <div
                                    className="absolute left-1 top-1 rounded-md p-2 text-xs cursor-pointer hover:scale-[1.02] transition-all shadow-md bg-gradient-to-br from-purple-500/10 to-blue-500/10 hover:from-purple-500 hover:to-blue-500 border border-purple-300/50 z-5 group"
                                    style={{ 
                                      height: '78px',
                                      minHeight: '78px',
                                      width: 'calc(600% + 5px)'
                                    }}
                                    onClick={() => {
                                      setSelectedSuggestion(campaignSuggestion);
                                      // Pre-fill campaign form with AI suggestion data
                                      const today = new Date();
                                      const endDate = new Date();
                                      const durationWeeks = parseInt(campaignSuggestion.recommendedDuration) || 2;
                                      endDate.setDate(endDate.getDate() + (durationWeeks * 7));
                                      
                                      setCampaignForm({
                                        name: campaignSuggestion.campaignName,
                                        description: `AI-generated campaign targeting ${campaignSuggestion.targetCustomerSegment} during ${campaignSuggestion.targetTimeSlot}. ${campaignSuggestion.aiReasoning}`,
                                        type: campaignSuggestion.campaignType as "Percentage Discount" | "Fixed Discount",
                                        discountValue: campaignSuggestion.discountValue,
                                        startDate: today.toISOString().split('T')[0],
                                        endDate: endDate.toISOString().split('T')[0],
                                        scope: "All Branches",
                                        applicableItems: ["All Services"],
                                        applicableBranches: [],
                                        isActive: true,
                                        targetTimeSlot: campaignSuggestion.targetTimeSlot,
                                      });
                                      setShowAISuggestionsDialog(true);
                                    }}
                                  >
                                    <div className="flex items-start gap-1.5">
                                      <div className="h-5 w-5 rounded-full bg-purple-600/30 group-hover:bg-white/20 flex items-center justify-center flex-shrink-0 transition-colors">
                                        <Sparkles className="h-3 w-3 text-purple-600 group-hover:text-white transition-colors" />
                                      </div>
                                      <div className="flex-1 min-w-0">
                                        <div className="font-medium text-purple-900 group-hover:text-white text-xs leading-tight mb-1 transition-colors">
                                          AI Suggestion: {campaignSuggestion.campaignName}
                                        </div>
                                        <div className="text-purple-800 group-hover:text-white/90 text-xs leading-tight mb-1 transition-colors">
                                          {campaignSuggestion.discountValue}% off • +{campaignSuggestion.predictedBookingIncrease}% bookings
                                        </div>
                                        <div className="flex items-center gap-1.5 mt-1">
                                          <Badge className="bg-purple-600/30 group-hover:bg-white/20 text-purple-900 group-hover:text-white text-xs border-0 h-4 px-1.5 transition-colors">
                                            {campaignSuggestion.confidence}% confidence
                                          </Badge>
                                          <span className="text-purple-700 group-hover:text-white/80 text-xs transition-colors">
                                            {campaignSuggestion.predictedRevenue} potential
                                          </span>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                )}
                                
                                {/* AI Campaign Suggestion for Special Days (e.g., 4th of July) */}
                                {showSpecialDayCard && !showCampaignCard && (() => {
                                  const specialDayCampaign = getSpecialDayCampaignSuggestion(selectedDate.toISOString().split('T')[0]);
                                  return specialDayCampaign && (
                                    <div
                                      className="absolute left-1 rounded-md p-2 text-xs cursor-pointer hover:scale-[1.02] transition-all shadow-md bg-gradient-to-br from-purple-500/10 to-blue-500/10 hover:from-purple-500 hover:to-blue-500 border border-purple-300/50 z-5 group"
                                      style={{ 
                                        top: '62px',
                                        height: '78px',
                                        minHeight: '78px',
                                        width: 'calc(600% + 5px)'
                                      }}
                                      onClick={() => {
                                        setSelectedSuggestion(specialDayCampaign);
                                        const today = new Date();
                                        const endDate = new Date();
                                        const durationWeeks = parseInt(specialDayCampaign.recommendedDuration) || 2;
                                        endDate.setDate(endDate.getDate() + (durationWeeks * 7));
                                        
                                        setCampaignForm({
                                          name: specialDayCampaign.campaignName,
                                          description: `AI-generated campaign for special day targeting ${specialDayCampaign.targetCustomerSegment}. ${specialDayCampaign.aiReasoning}`,
                                          type: specialDayCampaign.campaignType as "Percentage Discount" | "Fixed Discount",
                                          discountValue: specialDayCampaign.discountValue,
                                          startDate: today.toISOString().split('T')[0],
                                          endDate: endDate.toISOString().split('T')[0],
                                          scope: "All Branches",
                                          applicableItems: ["All Services"],
                                          applicableBranches: [],
                                          isActive: true,
                                          targetTimeSlot: specialDayCampaign.targetTimeSlot,
                                        });
                                        setShowAISuggestionsDialog(true);
                                      }}
                                    >
                                      <div className="flex items-start gap-1.5">
                                        <div className="h-5 w-5 rounded-full bg-purple-600/30 group-hover:bg-white/20 flex items-center justify-center flex-shrink-0 transition-colors">
                                          <Sparkles className="h-3 w-3 text-purple-600 group-hover:text-white transition-colors" />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                          <div className="font-medium text-purple-900 group-hover:text-white text-xs leading-tight mb-1 transition-colors">
                                            AI Suggestion: {specialDayCampaign.campaignName}
                                          </div>
                                          <div className="text-purple-800 group-hover:text-white/90 text-xs leading-tight mb-1 transition-colors">
                                            {specialDayCampaign.discountValue}{specialDayCampaign.campaignType === "Percentage Discount" ? "%" : "$"} off • +{specialDayCampaign.predictedBookingIncrease}% bookings
                                          </div>
                                          <div className="flex items-center gap-1.5 mt-1">
                                            <Badge className="bg-purple-600/30 group-hover:bg-white/20 text-purple-900 group-hover:text-white text-xs border-0 h-4 px-1.5 transition-colors">
                                              {specialDayCampaign.confidence}% confidence
                                            </Badge>
                                            <span className="text-purple-700 group-hover:text-white/80 text-xs transition-colors">
                                              {specialDayCampaign.predictedRevenue} potential
                                            </span>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  );
                                })()}
                                
                                {/* Empty slot indicator for hour markers */}
                                {bookingsInSlot.length === 0 && slot.minutes === 0 && !showCampaignCard && (
                                  <div className="absolute inset-0 flex items-center justify-center text-muted-foreground/20">
                                    <div className="w-1 h-1 rounded-full bg-muted-foreground/30"></div>
                                  </div>
                                )}
                                
                                {/* Subtle background pattern for 30-minute slots */}
                                {slot.minutes === 30 && (
                                  <div className="absolute inset-0 bg-muted/[0.02]"></div>
                                )}
                              </div>
                            );
                          })}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {currentView === "weekly" && (
                /* Weekly View - Days as columns with working hours visualization */
                <div className="overflow-x-auto">
                  <div className="min-w-[1200px]">
                    {/* Week Header */}
                    <div className="grid grid-cols-8 gap-0 border-b mb-0 sticky top-0 bg-background z-20">
                      <div className="p-3 text-sm font-medium bg-muted/50 border-r">Time</div>
                      {getViewDates().map((date) => {
                        const currentBranch = branches.find(b => b.id === selectedBranch);
                        const specialDay = getSpecialDayInfo(date.toISOString().split('T')[0], currentBranch);
                        const dayOfWeek = date.getDay();
                        const isSunday = dayOfWeek === 0;
                        
                        return (
                          <div key={date.toISOString()} className={`p-3 text-sm font-medium text-center border-r last:border-r-0 ${
                            isSunday ? 'bg-red-50/50' : specialDay ? 'bg-yellow-50' : 'bg-muted/30'
                          }`}>
                            <div className="flex items-center justify-center gap-1">
                              {specialDay && <span className="text-base">{specialDay.emoji || '📅'}</span>}
                              <span>{date.toLocaleDateString(undefined, { weekday: 'short' })}</span>
                            </div>
                            <div className="text-xs text-muted-foreground">{date.getDate()}</div>
                            {specialDay && (
                              <div className="text-xs text-orange-600 font-medium mt-0.5 truncate">
                                {specialDay.name}
                              </div>
                            )}
                            {isSunday && !specialDay && (
                              <div className="text-xs text-red-600 font-medium mt-0.5">Closed</div>
                            )}
                          </div>
                        );
                      })}
                    </div>

                    {/* Week Body with hourly slots and working hours */}
                    <div className="h-[calc(100vh-420px)] overflow-y-auto">
                      {timeSlots.filter((slot, index) => index % 2 === 0).map((slot) => (
                        <div key={slot.time} className="grid grid-cols-8 gap-0 border-b border-border/50 min-h-[50px]">
                          <div className="p-2 text-sm text-muted-foreground border-r bg-muted/20 flex items-center">
                            <div className="text-xs font-medium">
                              {slot.display}
                            </div>
                          </div>
                          {getViewDates().map((date, dateIndex) => {
                            const currentBranch = branches.find(b => b.id === selectedBranch);
                            const dateStr = date.toISOString().split('T')[0];
                            const isWorkingHour = isWithinWorkingHours(dateStr, slot.time, currentBranch);
                            const specialDay = getSpecialDayInfo(dateStr, currentBranch);
                            const dayOfWeek = date.getDay();
                            const isSaturday = dayOfWeek === 6;
                            const isSunday = dayOfWeek === 0;
                            
                            // Determine if this is a closing soon hour
                            const slotHour = slot.hour;
                            const isClosingSoon = (
                              (isSaturday && slotHour >= 17) || // Saturday closes at 6 PM
                              (!isSaturday && !isSunday && slotHour >= 19) // Weekdays close at 8 PM
                            );
                            
                            const dayBookings = viewBookings.filter(b => b.date === dateStr);
                            const slotBookings = dayBookings.filter(b => {
                              const [bookingHour, bookingMinutes] = b.time.split(':').map(Number);
                              return bookingHour === slot.hour && bookingMinutes >= slot.minutes && bookingMinutes < slot.minutes + 60;
                            });
                            const isLowTraffic = isLowTrafficSlot(slot.time);
                            const campaignSuggestion = isLowTraffic ? getCampaignSuggestionForSlot(slot.time) : null;
                            const showCampaignCard = isLowTraffic && campaignSuggestion && slotBookings.length === 0 && dateIndex === 0 && slot.hour === 6;
                            const showSpecialDayCard = specialDay && slot.hour === 8 && dateIndex === 0;
                            
                            return (
                              <div 
                                key={date.toISOString()} 
                                className={`border-r last:border-r-0 min-h-[50px] relative transition-colors ${
                                  !isWorkingHour || isSunday
                                    ? 'bg-gray-100/70 opacity-50 pattern-diagonal-stripes' 
                                    : isClosingSoon
                                    ? 'bg-amber-50/40'
                                    : isLowTraffic && slotBookings.length === 0 
                                    ? 'bg-purple-50/30 hover:bg-purple-50/50' 
                                    : 'bg-background hover:bg-muted/5'
                                }`}
                                title={
                                  !isWorkingHour || isSunday 
                                    ? 'Non-working hours' 
                                    : isClosingSoon 
                                    ? 'Closing soon' 
                                    : ''
                                }
                              >
                                {slotBookings.map((booking, index) => (
                                  <div
                                    key={booking.id}
                                    className={`absolute left-1 right-1 rounded text-white text-xs cursor-pointer hover:opacity-90 flex items-center px-1 shadow-sm ${STATUS_COLORS[booking.status]}`}
                                    style={{ 
                                      top: `${index * 14 + 2}px`,
                                      height: '12px',
                                      fontSize: '10px'
                                    }}
                                    onClick={() => {
                                      setSelectedBooking(booking);
                                      setShowBookingDialog(true);
                                    }}
                                  >
                                    <span className="truncate leading-none">
                                      {booking.time} {booking.customerName}
                                    </span>
                                  </div>
                                ))}

                                {/* Special Day Indicator */}
                                {showSpecialDayCard && specialDay && (
                                  <div
                                    className={`absolute left-1 top-2 rounded text-xs shadow-md border z-10 ${
                                      specialDay.type === 'holiday' 
                                        ? 'bg-gradient-to-br from-yellow-50 to-orange-50 border-orange-200'
                                        : specialDay.type === 'closed'
                                        ? 'bg-gray-100 border-gray-300'
                                        : 'bg-blue-50 border-blue-200'
                                    }`}
                                    style={{ 
                                      width: 'calc(700% + 6px)',
                                      height: '36px',
                                      padding: '4px 6px'
                                    }}
                                  >
                                    <div className="flex items-center gap-1.5">
                                      <span className="text-lg">{specialDay.emoji || '📅'}</span>
                                      <div className="flex-1 min-w-0">
                                        <div className="font-medium text-gray-900 text-xs truncate">
                                          {specialDay.name}
                                        </div>
                                        <div className="text-gray-600 text-xs">
                                          {specialDay.type === 'holiday' ? 'Special Holiday' : 'Special Day'}
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                )}

                                {/* AI Campaign for Special Days */}
                                {showSpecialDayCard && specialDay && (() => {
                                  const specialDayCampaign = getSpecialDayCampaignSuggestion(dateStr);
                                  return specialDayCampaign && (
                                    <div
                                      className="absolute left-1 rounded text-xs cursor-pointer hover:scale-[1.01] transition-all shadow-md bg-gradient-to-br from-purple-500/10 to-blue-500/10 hover:from-purple-500 hover:to-blue-500 border border-purple-300/50 z-10 group"
                                      style={{ 
                                        top: '42px',
                                        width: 'calc(700% + 6px)',
                                        height: '36px',
                                        padding: '4px 6px'
                                      }}
                                      onClick={() => {
                                        setSelectedSuggestion(specialDayCampaign);
                                        const today = new Date();
                                        const endDate = new Date();
                                        const durationWeeks = parseInt(specialDayCampaign.recommendedDuration) || 2;
                                        endDate.setDate(endDate.getDate() + (durationWeeks * 7));
                                        
                                        setCampaignForm({
                                          name: specialDayCampaign.campaignName,
                                          description: `AI-generated campaign for special day targeting ${specialDayCampaign.targetCustomerSegment}. ${specialDayCampaign.aiReasoning}`,
                                          type: specialDayCampaign.campaignType as "Percentage Discount" | "Fixed Discount",
                                          discountValue: specialDayCampaign.discountValue,
                                          startDate: today.toISOString().split('T')[0],
                                          endDate: endDate.toISOString().split('T')[0],
                                          scope: "All Branches",
                                          applicableItems: ["All Services"],
                                          applicableBranches: [],
                                          isActive: true,
                                          targetTimeSlot: specialDayCampaign.targetTimeSlot,
                                        });
                                        setShowAISuggestionsDialog(true);
                                      }}
                                    >
                                      <div className="flex items-center gap-1.5">
                                        <Sparkles className="h-3 w-3 flex-shrink-0 text-purple-600 group-hover:text-white transition-colors" />
                                        <div className="flex-1 min-w-0">
                                          <div className="font-medium text-purple-900 group-hover:text-white text-xs truncate transition-colors">
                                            {specialDayCampaign.campaignName}
                                          </div>
                                          <div className="text-purple-800 group-hover:text-white/90 text-xs transition-colors">
                                            {specialDayCampaign.discountValue}% off • {specialDayCampaign.confidence}% confidence
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  );
                                })()}

                                {/* AI Campaign Suggestion Card for Low Traffic Slots */}
                                {showCampaignCard && !showSpecialDayCard && (
                                  <div
                                    className="absolute left-1 right-1 top-2 rounded text-xs cursor-pointer hover:scale-[1.02] transition-all shadow-md bg-gradient-to-br from-purple-500/10 to-blue-500/10 hover:from-purple-500 hover:to-blue-500 border border-purple-300/50 flex items-center gap-1 px-1.5 py-1 group"
                                    style={{ 
                                      height: '32px',
                                      fontSize: '9px'
                                    }}
                                    onClick={() => {
                                      setSelectedSuggestion(campaignSuggestion);
                                      const today = new Date();
                                      const endDate = new Date();
                                      const durationWeeks = parseInt(campaignSuggestion.recommendedDuration) || 2;
                                      endDate.setDate(endDate.getDate() + (durationWeeks * 7));
                                      
                                      setCampaignForm({
                                        name: campaignSuggestion.campaignName,
                                        description: `AI-generated campaign targeting ${campaignSuggestion.targetCustomerSegment} during ${campaignSuggestion.targetTimeSlot}. ${campaignSuggestion.aiReasoning}`,
                                        type: campaignSuggestion.campaignType as "Percentage Discount" | "Fixed Discount",
                                        discountValue: campaignSuggestion.discountValue,
                                        startDate: today.toISOString().split('T')[0],
                                        endDate: endDate.toISOString().split('T')[0],
                                        scope: "All Branches",
                                        applicableItems: ["All Services"],
                                        applicableBranches: [],
                                        isActive: true,
                                        targetTimeSlot: campaignSuggestion.targetTimeSlot,
                                      });
                                      setShowAISuggestionsDialog(true);
                                    }}
                                  >
                                    <Sparkles className="h-2.5 w-2.5 flex-shrink-0 text-purple-600 group-hover:text-white transition-colors" />
                                    <span className="truncate leading-none flex-1 text-purple-900 group-hover:text-white transition-colors">
                                      {campaignSuggestion.campaignName} • {campaignSuggestion.discountValue}% off
                                    </span>
                                  </div>
                                )}
                              </div>
                            );
                          })}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {currentView === "monthly" && (
                /* Monthly View - Grid format with working hours and special days */
                <div className="space-y-4 h-[calc(100vh-420px)] overflow-y-auto">
                  <div className="grid gap-3 grid-cols-7">
                    {getViewDates().map((date) => {
                      const currentBranch = branches.find(b => b.id === selectedBranch);
                      const dateStr = date.toISOString().split('T')[0];
                      const specialDay = getSpecialDayInfo(dateStr, currentBranch);
                      const dayOfWeek = date.getDay();
                      const isSaturday = dayOfWeek === 6;
                      const isSunday = dayOfWeek === 0;
                      const dayBookings = viewBookings.filter(b => b.date === dateStr);
                      
                      // Determine working hours for display
                      let workingHours = '';
                      if (isSunday) {
                        workingHours = 'Closed';
                      } else if (isSaturday) {
                        workingHours = '8:00-18:00';
                      } else {
                        workingHours = '8:00-20:00';
                      }
                      
                      return (
                        <div 
                          key={date.toISOString()} 
                          className={`border rounded-lg p-2 min-h-[120px] ${
                            isSunday 
                              ? 'bg-red-50/30 border-red-200' 
                              : specialDay 
                              ? 'bg-yellow-50 border-yellow-300' 
                              : isSaturday
                              ? 'bg-blue-50/30'
                              : 'bg-background'
                          }`}
                        >
                          {/* Date Header */}
                          <div className="flex items-start justify-between mb-2 pb-1 border-b">
                            <div>
                              <div className={`text-sm font-medium ${isSunday ? 'text-red-600' : 'text-foreground'}`}>
                                {date.getDate()}
                              </div>
                              <div className="text-xs text-muted-foreground">
                                {date.toLocaleDateString(undefined, { weekday: 'short' })}
                              </div>
                            </div>
                            {specialDay && (
                              <span className="text-lg" title={specialDay.name}>
                                {specialDay.emoji || '📅'}
                              </span>
                            )}
                          </div>

                          {/* Special Day Badge */}
                          {specialDay && (
                            <div className="mb-2">
                              <Badge className="text-xs bg-orange-500 text-white mb-1 truncate max-w-full">
                                {specialDay.name}
                              </Badge>
                              {(() => {
                                const campaign = getSpecialDayCampaignSuggestion(dateStr);
                                return campaign && (
                                  <div 
                                    className="bg-gradient-to-br from-purple-500/10 to-blue-500/10 border border-purple-300/50 rounded p-1.5 mt-1 cursor-pointer hover:from-purple-500/20 hover:to-blue-500/20 transition-colors"
                                    onClick={() => {
                                      setSelectedSuggestion(campaign);
                                      const today = new Date();
                                      const endDate = new Date();
                                      const durationWeeks = parseInt(campaign.recommendedDuration) || 2;
                                      endDate.setDate(endDate.getDate() + (durationWeeks * 7));
                                      
                                      setCampaignForm({
                                        name: campaign.campaignName,
                                        description: `AI-generated campaign for special day targeting ${campaign.targetCustomerSegment}. ${campaign.aiReasoning}`,
                                        type: campaign.campaignType as "Percentage Discount" | "Fixed Discount",
                                        discountValue: campaign.discountValue,
                                        startDate: today.toISOString().split('T')[0],
                                        endDate: endDate.toISOString().split('T')[0],
                                        scope: "All Branches",
                                        applicableItems: ["All Services"],
                                        applicableBranches: [],
                                        isActive: true,
                                        targetTimeSlot: campaign.targetTimeSlot,
                                      });
                                      setShowAISuggestionsDialog(true);
                                    }}
                                  >
                                    <div className="flex items-center gap-1">
                                      <Sparkles className="h-2.5 w-2.5 text-purple-600 flex-shrink-0" />
                                      <span className="text-xs text-purple-900 font-medium truncate">
                                        {campaign.discountValue}% Campaign
                                      </span>
                                    </div>
                                  </div>
                                );
                              })()}
                            </div>
                          )}

                          {/* Working Hours */}
                          <div className={`text-xs mb-2 ${isSunday ? 'text-red-600 font-medium' : 'text-muted-foreground'}`}>
                            {workingHours}
                          </div>

                          {/* Bookings */}
                          <div className="space-y-1">
                            {dayBookings.length > 0 ? (
                              dayBookings.slice(0, 3).map((booking) => (
                                <div
                                  key={booking.id}
                                  className={`p-1.5 rounded text-white text-xs cursor-pointer hover:opacity-90 ${STATUS_COLORS[booking.status]}`}
                                  onClick={() => {
                                    setSelectedBooking(booking);
                                    setShowBookingDialog(true);
                                  }}
                                >
                                  <div className="font-medium truncate">{booking.time} {booking.customerName}</div>
                                  <div className="text-white/80 text-xs truncate">{booking.service}</div>
                                </div>
                              ))
                            ) : (
                              <div className="text-xs text-muted-foreground/60 italic">
                                {isSunday ? 'Closed' : 'No bookings'}
                              </div>
                            )}
                            {dayBookings.length > 3 && (
                              <div className="text-xs text-muted-foreground font-medium text-center pt-1">
                                +{dayBookings.length - 3} more
                              </div>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}


            </CardContent>
          </Card>

          {/* AI Recommendations Section */}
          <Card className="border-purple-200 bg-gradient-to-br from-purple-50 to-blue-50 mt-4">
            {/* Mobile Banner */}
            <div className="md:hidden">
              <CardContent className="p-3">
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2 flex-1 min-w-0">
                    <Sparkles className="h-4 w-4 text-purple-600 flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-medium truncate">AI Recommendations</div>
                      <div className="text-xs text-muted-foreground truncate">
                        {peakTimeAnalytics.lowestHourInsights.opportunityRevenue} revenue opportunity
                      </div>
                    </div>
                  </div>
                  <Button 
                    size="sm" 
                    variant="outline"
                    className="text-xs h-8 border-purple-300 bg-white hover:bg-purple-50"
                    onClick={() => {
                      const firstSuggestion = peakTimeAnalytics.aiCampaignSuggestions[0];
                      setSelectedSuggestion(firstSuggestion);
                      const today = new Date();
                      const endDate = new Date();
                      const durationWeeks = parseInt(firstSuggestion.recommendedDuration) || 2;
                      endDate.setDate(endDate.getDate() + (durationWeeks * 7));
                      
                      setCampaignForm({
                        name: firstSuggestion.campaignName,
                        description: `AI-generated campaign targeting ${firstSuggestion.targetCustomerSegment} during ${firstSuggestion.targetTimeSlot}. ${firstSuggestion.aiReasoning}`,
                        type: firstSuggestion.campaignType as "Percentage Discount" | "Fixed Discount",
                        discountValue: firstSuggestion.discountValue,
                        startDate: today.toISOString().split('T')[0],
                        endDate: endDate.toISOString().split('T')[0],
                        scope: "All Branches",
                        applicableItems: ["All Services"],
                        applicableBranches: [],
                        isActive: true,
                        targetTimeSlot: firstSuggestion.targetTimeSlot,
                      });
                      setShowAISuggestionsDialog(true);
                    }}
                  >
                    View {peakTimeAnalytics.aiCampaignSuggestions.length}
                  </Button>
                </div>
              </CardContent>
            </div>

            {/* Desktop Layout */}
            <div className="hidden md:block">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Sparkles className="h-4 w-4 text-purple-600" />
                    <CardTitle className="text-sm">AI Recommendations</CardTitle>
                  </div>
                  <p className="text-xs text-muted-foreground">Smart campaign suggestions to boost bookings</p>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {/* Opportunity Revenue Banner */}
                <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg p-4 text-white">
                  <div className="flex items-center gap-2 mb-2">
                    <DollarSign className="h-4 w-4" />
                    <span className="text-xs font-medium">Opportunity Revenue</span>
                  </div>
                  <div className="text-2xl font-bold mb-1">
                    {peakTimeAnalytics.lowestHourInsights.opportunityRevenue}
                  </div>
                  <div className="text-xs opacity-90">
                    Additional monthly revenue potential
                  </div>
                  <div className="flex items-center justify-between mt-3 pt-3 border-t border-white/20">
                    <span className="text-xs opacity-90">Potential Growth</span>
                    <span className="text-sm font-medium">
                      +{peakTimeAnalytics.lowestHourInsights.potentialGrowth}%
                    </span>
                  </div>
                </div>

                {/* Campaign Suggestions */}
                {peakTimeAnalytics.aiCampaignSuggestions.slice(0, 3).map((suggestion) => (
                  <div 
                    key={suggestion.id}
                    className="bg-white rounded-lg p-4 space-y-2 cursor-pointer hover:shadow-md transition-shadow border border-purple-100"
                    onClick={() => {
                      setSelectedSuggestion(suggestion);
                      const today = new Date();
                      const endDate = new Date();
                      const durationWeeks = parseInt(suggestion.recommendedDuration) || 2;
                      endDate.setDate(endDate.getDate() + (durationWeeks * 7));
                      
                      setCampaignForm({
                        name: suggestion.campaignName,
                        description: `AI-generated campaign targeting ${suggestion.targetCustomerSegment} during ${suggestion.targetTimeSlot}. ${suggestion.aiReasoning}`,
                        type: suggestion.campaignType as "Percentage Discount" | "Fixed Discount",
                        discountValue: suggestion.discountValue,
                        startDate: today.toISOString().split('T')[0],
                        endDate: endDate.toISOString().split('T')[0],
                        scope: "All Branches",
                        applicableItems: ["All Services"],
                        applicableBranches: [],
                        isActive: true,
                        targetTimeSlot: suggestion.targetTimeSlot,
                      });
                      setShowAISuggestionsDialog(true);
                    }}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <Zap className="h-3 w-3 text-purple-600" />
                          <span className="text-xs font-medium text-purple-900">{suggestion.campaignName}</span>
                        </div>
                        <div className="text-xs text-muted-foreground mt-1">
                          {suggestion.targetTimeSlot}
                        </div>
                      </div>
                      <Badge className="bg-purple-600 text-white text-xs">
                        {suggestion.confidence}%
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-purple-700 font-medium">
                        {suggestion.discountValue}% off
                      </span>
                      <span className="text-green-600 font-medium">
                        +{suggestion.predictedBookingIncrease}% bookings
                      </span>
                    </div>
                    <div className="text-xs text-muted-foreground line-clamp-2">
                      {suggestion.aiReasoning}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
            </div>
          </Card>
        </div>

        {/* Sidebar - Hidden on mobile */}
        <div className="hidden xl:block space-y-6">
          {/* Today's Overview */}
          <Card className="px-4 py-0">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm">Today's Overview</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 px-4 py-0 pb-4">
              {Object.entries(STATUS_LABELS).map(([status, label]) => {
                const count = viewBookings.filter(b => b.status === status).length;
                return (
                  <div key={status} className="bg-muted/30 border border-border rounded-lg p-2 hover:bg-muted/50 transition-colors">
                    <div className="flex items-center justify-between mb-1">
                      <p className="text-xs font-medium text-foreground">{label}</p>
                      <div className={`w-2 h-2 rounded-full ${STATUS_COLORS[status as keyof typeof STATUS_COLORS]}`} />
                    </div>
                    <p className="text-xl font-semibold tracking-tight">{count}</p>
                    <p className="text-[10px] text-muted-foreground mt-0.5">bookings</p>
                  </div>
                );
              })}
            </CardContent>
          </Card>

          {/* Recent Completions */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Bell className="h-4 w-4" />
                Recent Completions
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {completedBookings.length > 0 ? (
                  completedBookings.map((booking) => (
                    <div key={booking.id} className="flex items-center gap-3 p-2 rounded-lg bg-green-50 dark:bg-green-950/20">
                      <Avatar className="h-8 w-8">
                        <AvatarFallback className="bg-green-500 text-white">
                          {booking.customerName.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium truncate">{booking.customerName}</p>
                        <p className="text-xs text-muted-foreground">{booking.service}</p>
                      </div>
                      <CheckCircle className="h-4 w-4 text-green-500" />
                    </div>
                  ))
                ) : (
                  <p className="text-sm text-muted-foreground">No recent completions</p>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

        </TabsContent>

        {/* List Tab Content */}
        <TabsContent value="list" className="space-y-6">
          <div className="bg-background rounded-lg border">
            {/* List View Header with Filters */}
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 p-4 border-b">
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => navigateDate("prev")}
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <span className="text-sm font-medium">{formatDateDisplay()}</span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => navigateDate("next")}
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setSelectedDate(new Date())}
                >
                  Today
                </Button>
              </div>

              <div className="flex items-center gap-2 w-full md:w-auto">
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-[140px]">
                    <Filter className="h-4 w-4 mr-2" />
                    <SelectValue placeholder="All Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    {Object.entries(STATUS_LABELS).map(([status, label]) => (
                      <SelectItem key={status} value={status}>{label}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Select value={stationFilter} onValueChange={setStationFilter}>
                  <SelectTrigger className="w-[140px]">
                    <SelectValue placeholder="All Stations" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Stations</SelectItem>
                    {STATION_NAMES.map(station => (
                      <SelectItem key={station} value={station}>{station}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Select value={selectedBranch} onValueChange={setSelectedBranch}>
                  <SelectTrigger className="w-[140px]">
                    <SelectValue placeholder="All Branches" />
                  </SelectTrigger>
                  <SelectContent>
                    {branches.map(branch => (
                      <SelectItem key={branch.id} value={branch.id}>{branch.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* List View Table */}
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="bg-muted/50">
                    <TableHead className="w-[180px]">Customer</TableHead>
                    <TableHead className="w-[150px]">Date & Time</TableHead>
                    <TableHead className="w-[140px]">Service</TableHead>
                    <TableHead className="w-[100px]">Vehicle</TableHead>
                    <TableHead className="w-[100px]">Station</TableHead>
                    <TableHead className="w-[100px]">Branch</TableHead>
                    <TableHead className="w-[90px]">Duration</TableHead>
                    <TableHead className="w-[80px]">Price</TableHead>
                    <TableHead className="w-[120px]">Status</TableHead>
                    <TableHead className="w-[140px] text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {viewBookings.map((booking) => {
                    const branch = branches.find(b => b.id === booking.branchId);
                    return (
                      <TableRow key={booking.id} className="hover:bg-muted/30">
                        <TableCell>
                          <div className="space-y-1">
                            <div className="font-medium text-sm">{booking.customerName}</div>
                            <div className="flex items-center gap-1 text-xs text-muted-foreground">
                              <Phone className="h-3 w-3" />
                              <span>{booking.customerPhone}</span>
                            </div>
                            <div className="flex items-center gap-1 text-xs text-muted-foreground">
                              <Mail className="h-3 w-3" />
                              <span className="truncate max-w-[160px]">{booking.customerEmail}</span>
                            </div>
                            <div className="flex items-center gap-1 text-xs text-muted-foreground">
                              <User className="h-3 w-3" />
                              <span>{booking.customerId}</span>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="space-y-1">
                            <div className="text-sm">{booking.date}</div>
                            <div className="flex items-center gap-1 text-xs text-muted-foreground">
                              <Clock className="h-3 w-3" />
                              <span>{booking.time}</span>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <span className="text-sm">{booking.service}</span>
                        </TableCell>
                        <TableCell>
                          <span className="text-sm">{booking.vehicleType}</span>
                        </TableCell>
                        <TableCell>
                          <span className="text-sm">{booking.station}</span>
                        </TableCell>
                        <TableCell>
                          <span className="text-sm">{branch?.name || 'N/A'}</span>
                        </TableCell>
                        <TableCell>
                          <span className="text-sm">{booking.estimatedDuration}min</span>
                        </TableCell>
                        <TableCell>
                          <span className="text-sm font-medium">${booking.price}</span>
                        </TableCell>
                        <TableCell>
                          <Badge className={`${STATUS_COLORS[booking.status]} text-white border-0`}>
                            {STATUS_LABELS[booking.status]}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex items-center justify-end gap-1">
                            {booking.status === "requested" && (
                              <>
                                <Button
                                  size="sm"
                                  variant="ghost"
                                  className="h-8 w-8 p-0 text-blue-600 hover:text-blue-700 hover:bg-blue-50"
                                  onClick={() => handleStatusChange(booking.id, "confirmed")}
                                  title="Approve"
                                >
                                  <CheckCircle className="h-4 w-4" />
                                </Button>
                                <Button
                                  size="sm"
                                  variant="ghost"
                                  className="h-8 w-8 p-0 text-red-600 hover:text-red-700 hover:bg-red-50"
                                  onClick={() => handleStatusChange(booking.id, "cancelled")}
                                  title="Reject"
                                >
                                  <XCircle className="h-4 w-4" />
                                </Button>
                              </>
                            )}
                            {booking.status === "confirmed" && (
                              <Button
                                size="sm"
                                variant="ghost"
                                className="h-8 w-8 p-0 text-green-600 hover:text-green-700 hover:bg-green-50"
                                onClick={() => handleStatusChange(booking.id, "in-progress")}
                                title="Start Service"
                              >
                                <Play className="h-4 w-4" />
                              </Button>
                            )}
                            {booking.status === "in-progress" && (
                              <Button
                                size="sm"
                                variant="ghost"
                                className="h-8 w-8 p-0 text-green-600 hover:text-green-700 hover:bg-green-50"
                                onClick={() => handleStatusChange(booking.id, "completed")}
                                title="Complete"
                              >
                                <CheckCircle className="h-4 w-4" />
                              </Button>
                            )}
                            <Button
                              size="sm"
                              variant="ghost"
                              className="h-8 w-8 p-0 text-purple-600 hover:text-purple-700 hover:bg-purple-50"
                              onClick={() => {
                                setSelectedBooking(booking);
                                setShowBookingDialog(true);
                              }}
                              title="View Details"
                            >
                              <Settings className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </div>

            {/* Status Summary Footer */}
            <div className="border-t p-4">
              <div className="flex items-center justify-center gap-6 text-sm">
                {Object.entries(STATUS_LABELS).map(([status, label]) => {
                  const count = viewBookings.filter(b => b.status === status).length;
                  return (
                    <div key={status} className="flex items-center gap-2">
                      <div className={`w-2 h-2 rounded-full ${STATUS_COLORS[status as keyof typeof STATUS_COLORS]}`} />
                      <span className="text-muted-foreground">{label}</span>
                      <span className="font-medium">{count}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>

      {/* Booking Details Dialog - Status-Based Sub-Pages */}
      <Dialog open={showBookingDialog} onOpenChange={setShowBookingDialog}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-hidden flex flex-col p-0">
          {/* Fixed Header */}
          <div className="sticky top-0 bg-white z-10 border-b px-6 py-4">
            <div className="flex items-start justify-between">
              <DialogHeader className="flex-1">
                <DialogTitle className="flex items-center gap-3">
                  <span>Booking Details</span>
                  {selectedBooking && (
                    <Badge className={`${STATUS_COLORS[selectedBooking.status]} text-white border-0`}>
                      {STATUS_LABELS[selectedBooking.status]}
                    </Badge>
                  )}
                </DialogTitle>
                <DialogDescription>
                  {selectedBooking?.status === "requested" && "Review and approve this booking request"}
                  {selectedBooking?.status === "confirmed" && "Booking is confirmed and ready to start"}
                  {selectedBooking?.status === "in-progress" && "Service is currently in progress"}
                  {selectedBooking?.status === "completed" && "Service has been completed"}
                  {selectedBooking?.status === "cancelled" && "This booking was cancelled"}
                  {selectedBooking?.status === "no-show" && "Customer did not show up"}
                </DialogDescription>
              </DialogHeader>
              <Button 
                variant="ghost" 
                onClick={() => setShowBookingDialog(false)}
                className="text-muted-foreground hover:text-foreground"
              >
                Close
              </Button>
            </div>
          </div>
          
          {selectedBooking && (
            <>
              {/* Scrollable Content */}
              <div className="flex-1 overflow-y-auto px-6 py-4 space-y-6 bg-[rgb(255,255,255)] rounded-[-26px]">
              
              {/* Status-Based Alert Banner */}
              {selectedBooking.status === "requested" && (
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <div className="flex items-start gap-3">
                    <AlertTriangle className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
                    <div className="flex-1">
                      <h4 className="font-medium text-blue-900 mb-1">Action Required</h4>
                      <p className="text-sm text-blue-700">
                        This booking is awaiting your approval. Please review the details and approve or reject the request.
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {selectedBooking.status === "confirmed" && (
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <div className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <div className="flex-1">
                      <h4 className="font-medium text-green-900 mb-1">Ready to Start</h4>
                      <p className="text-sm text-green-700">
                        Booking is confirmed. When the customer arrives, start the service.
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {selectedBooking.status === "in-progress" && (
                <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                  <div className="flex items-start gap-3">
                    <Clock className="h-5 w-5 text-amber-600 flex-shrink-0 mt-0.5" />
                    <div className="flex-1">
                      <h4 className="font-medium text-amber-900 mb-1">Service In Progress</h4>
                      <p className="text-sm text-amber-700">
                        Service started at {selectedBooking.time}. Mark as complete when finished.
                      </p>
                      <div className="mt-2 flex items-center gap-2">
                        <div className="text-xs text-amber-700">Estimated completion: {selectedBooking.estimatedDuration} min</div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {selectedBooking.status === "completed" && (
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <div className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <div className="flex-1">
                      <h4 className="font-medium text-green-900 mb-1">Service Completed</h4>
                      <p className="text-sm text-green-700">
                        This service has been successfully completed. Thank you!
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {selectedBooking.status === "cancelled" && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                  <div className="flex items-start gap-3">
                    <XCircle className="h-5 w-5 text-red-600 flex-shrink-0 mt-0.5" />
                    <div className="flex-1">
                      <h4 className="font-medium text-red-900 mb-1">Booking Cancelled</h4>
                      <p className="text-sm text-red-700">
                        This booking was cancelled and the slot is now available.
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {selectedBooking.status === "no-show" && (
                <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                  <div className="flex items-start gap-3">
                    <AlertTriangle className="h-5 w-5 text-gray-600 flex-shrink-0 mt-0.5" />
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-900 mb-1">Customer No-Show</h4>
                      <p className="text-sm text-gray-700">
                        Customer did not arrive for their scheduled appointment.
                      </p>
                    </div>
                  </div>
                </div>
              )}
              
              {/* Customer Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <User className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <Label className="text-sm font-medium">Customer</Label>
                      <p className="text-sm">{selectedBooking.customerName}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Phone className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <Label className="text-sm font-medium">Phone</Label>
                      <p className="text-sm">{selectedBooking.customerPhone}</p>
                    </div>
                  </div>

                  {selectedBooking.carPlateNumber && (
                    <div className="flex items-center gap-2">
                      <Car className="h-4 w-4 text-muted-foreground" />
                      <div>
                        <Label className="text-sm font-medium">Car Plate</Label>
                        <p className="text-sm">{selectedBooking.carPlateNumber}</p>
                      </div>
                    </div>
                  )}
                </div>

                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <Label className="text-sm font-medium">Date & Time</Label>
                      <p className="text-sm">{selectedBooking.date} at {selectedBooking.time}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <Label className="text-sm font-medium">Station</Label>
                      <p className="text-sm">{STATION_NAMES[STATIONS.indexOf(selectedBooking.station)]}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <Label className="text-sm font-medium">Duration</Label>
                      <p className="text-sm">{selectedBooking.estimatedDuration} minutes</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Service Information */}
              <div className="p-4 bg-muted rounded-lg">
                <h4 className="font-medium mb-2">Service Details</h4>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <Label className="text-muted-foreground">Service</Label>
                    <p>{selectedBooking.service}</p>
                  </div>
                  <div>
                    <Label className="text-muted-foreground">Vehicle Type</Label>
                    <p>{selectedBooking.vehicleType}</p>
                  </div>
                  <div>
                    <Label className="text-muted-foreground">Price</Label>
                    <p>${selectedBooking.price}</p>
                  </div>
                  <div>
                    <Label className="text-muted-foreground">Status</Label>
                    <Badge className={`${STATUS_COLORS[selectedBooking.status]} text-white`}>
                      {STATUS_LABELS[selectedBooking.status]}
                    </Badge>
                  </div>
                </div>
                {selectedBooking.notes && (
                  <div className="mt-3">
                    <Label className="text-muted-foreground">Notes</Label>
                    <p>{selectedBooking.notes}</p>
                  </div>
                )}
              </div>

              {/* QR Code for Check-in */}
              {(selectedBooking.status === "reserved" || selectedBooking.status === "approved" || selectedBooking.status === "in-progress") && (
                <div className="text-center p-4 bg-blue-50 dark:bg-blue-950/20 rounded-lg">
                  <QrCode className="h-6 w-6 mx-auto mb-2 text-blue-600" />
                  <h4 className="font-medium mb-2">Customer Check-in QR Code</h4>
                  <div className="bg-white p-2 rounded inline-block">
                    <img 
                      src={generateQRCode(selectedBooking.id)} 
                      alt="QR Code" 
                      className="w-24 h-24"
                    />
                  </div>
                  <p className="text-xs text-muted-foreground mt-2">
                    Customer can scan this code upon arrival
                  </p>
                </div>
              )}

              {/* Action Notes */}
              <div>
                <Label htmlFor="notes">Action Notes (Optional)</Label>
                <Textarea
                  id="notes"
                  placeholder="Add any notes about this booking..."
                  value={actionNotes}
                  onChange={(e) => setActionNotes(e.target.value)}
                  className="mt-1"
                />
              </div>
            </div>

            {/* Fixed Footer with Status-Based Action Buttons */}
            <div className="sticky bottom-0 bg-white border-t space-y-3 py-[7px] my-[-39px] my-[9px] mx-[-3px] px-[18px] py-[25px]">
              
              {/* REQUESTED Status Actions */}
              {selectedBooking.status === "requested" && (
                <div className="space-y-3">
                  <div className="grid grid-cols-2 gap-3">
                    <Button
                      onClick={() => {
                        handleStatusChange(selectedBooking.id, "confirmed");
                        toast.success("Booking approved successfully");
                        setShowBookingDialog(false);
                      }}
                      className="bg-blue-600 hover:bg-blue-700 w-full h-12"
                      size="lg"
                    >
                      <CheckCircle className="h-5 w-5 mr-2" />
                      Approve Booking
                    </Button>
                    <Button
                      variant="destructive"
                      onClick={() => {
                        handleStatusChange(selectedBooking.id, "cancelled");
                        toast.error("Booking rejected");
                        setShowBookingDialog(false);
                      }}
                      className="w-full h-12"
                      size="lg"
                    >
                      <XCircle className="h-5 w-5 mr-2" />
                      Reject
                    </Button>
                  </div>
                  
                  <div className="flex justify-end">
                    <Button
                      variant="outline"
                      onClick={() => {
                        toast.info("Alternative time suggestion feature coming soon");
                      }}
                      className="border-2 border-purple-400 text-purple-700 hover:bg-purple-50 hover:border-purple-500"
                    >
                      <Sparkles className="h-4 w-4 mr-2" />
                      Suggest Alternative Time
                    </Button>
                  </div>
                </div>
              )}

              {/* CONFIRMED Status Actions */}
              {selectedBooking.status === "confirmed" && (
                <div className="space-y-3">
                  <div className="grid grid-cols-2 gap-3">
                    <Button
                      onClick={() => {
                        handleStatusChange(selectedBooking.id, "in-progress");
                        toast.success("Service started");
                        setShowBookingDialog(false);
                      }}
                      className="bg-green-600 hover:bg-green-700 w-full h-12"
                      size="lg"
                    >
                      <Play className="h-5 w-5 mr-2" />
                      Start Service
                    </Button>
                    <Button
                      variant="destructive"
                      onClick={() => {
                        handleStatusChange(selectedBooking.id, "cancelled");
                        toast.error("Booking cancelled");
                        setShowBookingDialog(false);
                      }}
                      className="w-full h-12"
                      size="lg"
                    >
                      <XCircle className="h-5 w-5 mr-2" />
                      Cancel
                    </Button>
                  </div>
                  
                  <div className="flex justify-end">
                    <Button
                      variant="outline"
                      onClick={() => {
                        handleStatusChange(selectedBooking.id, "no-show");
                        toast.error("Marked as no-show");
                        setShowBookingDialog(false);
                      }}
                      className="border-2 border-gray-400 text-gray-700 hover:bg-gray-50 hover:border-gray-500"
                    >
                      <AlertTriangle className="h-4 w-4 mr-2" />
                      Mark as No-Show
                    </Button>
                  </div>
                </div>
              )}

              {/* IN-PROGRESS Status Actions */}
              {selectedBooking.status === "in-progress" && (
                <div className="space-y-3">
                  <Button
                    onClick={() => {
                      handleStatusChange(selectedBooking.id, "completed");
                      toast.success("Service completed successfully!");
                      setShowBookingDialog(false);
                    }}
                    className="bg-green-600 hover:bg-green-700 w-full h-12"
                    size="lg"
                  >
                    <CheckCircle className="h-5 w-5 mr-2" />
                    Mark as Completed
                  </Button>
                  
                  <div className="bg-amber-50 border border-amber-200 rounded-lg p-3">
                    <div className="flex items-center gap-2 text-sm text-amber-700">
                      <Clock className="h-4 w-4 flex-shrink-0" />
                      <span>Service in progress - Complete when finished</span>
                    </div>
                  </div>
                </div>
              )}

              {/* COMPLETED Status Actions */}
              {selectedBooking.status === "completed" && (
                <div className="space-y-3">
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0" />
                        <div>
                          <p className="font-medium text-green-900">Service Completed</p>
                          <p className="text-sm text-green-700">Payment: ${selectedBooking.price}</p>
                        </div>
                      </div>
                      <Badge className="bg-green-600 text-white">Paid</Badge>
                    </div>
                  </div>
                  
                  <Button
                    variant="outline"
                    onClick={() => {
                      toast.success("Receipt will be sent to customer");
                    }}
                    className="w-full"
                  >
                    <Mail className="h-4 w-4 mr-2" />
                    Send Receipt to Customer
                  </Button>
                </div>
              )}

              {/* CANCELLED Status - Info Only */}
              {selectedBooking.status === "cancelled" && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                  <div className="flex items-center gap-2">
                    <XCircle className="h-5 w-5 text-red-600 flex-shrink-0" />
                    <div>
                      <p className="font-medium text-red-900">This booking was cancelled</p>
                      <p className="text-sm text-red-700">The time slot is now available for new bookings</p>
                    </div>
                  </div>
                </div>
              )}

              {/* NO-SHOW Status - Info Only */}
              {selectedBooking.status === "no-show" && (
                <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center gap-2">
                    <AlertTriangle className="h-5 w-5 text-gray-600 flex-shrink-0" />
                    <div>
                      <p className="font-medium text-gray-900">Customer did not show up</p>
                      <p className="text-sm text-gray-700">Consider applying a no-show policy if applicable</p>
                    </div>
                  </div>
                </div>
              )}

              {/* View-Only Mode Notice for other branches */}
              {!canEditBranch(selectedBooking.branchId) && (
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mx-[0px] my-[12px]">
                  <div className="flex items-center gap-2">
                    <AlertTriangle className="h-4 w-4 text-blue-600 flex-shrink-0" />
                    <p className="text-sm text-blue-700">
                      You are viewing a booking from a sibling branch. No actions can be performed.
                    </p>
                  </div>
                </div>
              )}
              
              {canEditBranch(selectedBooking.branchId) && selectedBooking.status === "pending-approval" && (
                <div className="space-y-3 mx-[0px] my-[29px]">
                  {/* First row: Accept and Decline buttons */}
                  <div className="grid grid-cols-2 gap-3">
                    <Button
                      onClick={() => handleStatusUpdate(selectedBooking, "reserved")}
                      className="bg-blue-600 hover:bg-blue-700 w-full h-12"
                      size="lg"
                    >
                      <CheckCircle className="h-5 w-5 mr-2" />
                      Accept
                    </Button>
                    <Button
                      variant="destructive"
                      onClick={() => handleStatusUpdate(selectedBooking, "canceled")}
                      className="w-full h-12"
                      size="lg"
                    >
                      <XCircle className="h-5 w-5 mr-2" />
                      Decline
                    </Button>
                  </div>
                  
                  {/* Second row: Suggest Alternative Time with AI icon */}
                  <div className="flex justify-end mx-[0px] my-[-12px]">
                    <Button
                      variant="outline"
                      onClick={() => {
                        setAlternativeTimeForm({
                          suggestedDate: selectedBooking.date,
                          suggestedTime: selectedBooking.time,
                          incentiveType: "discount",
                          discountType: "percentage",
                          discountValue: 15,
                          couponCode: "",
                          extraService: "",
                          message: `We noticed your requested time slot (${selectedBooking.time}) is during our peak hours. We'd like to suggest an alternative time with a special offer!`
                        });
                        setShowAlternativeTimeDialog(true);
                      }}
                      className="border-2 border-purple-400 text-purple-700 hover:bg-purple-50 hover:border-purple-500 mx-[0px] my-[24px] rounded-[6px]"
                    >
                      <Sparkles className="h-4 w-4 mr-2" />
                      Suggest Alternative Time
                    </Button>
                  </div>
                </div>
              )}

              {canEditBranch(selectedBooking.branchId) && selectedBooking.status === "reserved" && (
                <div className="space-y-3 mx-[0px] my-[29px]">
                  {/* First row: Start and Cancel with more height */}
                  <div className="grid grid-cols-2 gap-3">
                    <Button
                      onClick={() => handleStatusUpdate(selectedBooking, "in-progress")}
                      className="bg-orange-600 hover:bg-orange-700 w-full h-12"
                      size="lg"
                    >
                      <Play className="h-5 w-5 mr-2" />
                      Start
                    </Button>
                    <Button
                      variant="destructive"
                      onClick={() => handleStatusUpdate(selectedBooking, "canceled")}
                      className="w-full h-12"
                      size="lg"
                    >
                      <XCircle className="h-5 w-5 mr-2" />
                      Cancel
                    </Button>
                  </div>
                  
                  {/* Second row: Customer Did Not Appear on the right with border */}
                  <div className="flex justify-end">
                    <Button
                      variant="outline"
                      onClick={() => handleStatusUpdate(selectedBooking, "no-show")}
                      className="border-2 border-gray-400 text-gray-700 hover:bg-gray-50 hover:border-gray-500 mx-[0px] my-[24px] rounded-[6px]"
                    >
                      <AlertTriangle className="h-4 w-4 mr-2" />
                      Customer Did Not Appear
                    </Button>
                  </div>
                </div>
              )}

              {canEditBranch(selectedBooking.branchId) && selectedBooking.status === "confirmed" && (
                <div className="flex flex-wrap gap-2">
                  <Button
                    onClick={() => handleStatusUpdate(selectedBooking, "in-progress")}
                    className="bg-orange-600 hover:bg-orange-700"
                  >
                    <Play className="h-4 w-4 mr-2" />
                    Start Service
                  </Button>
                </div>
              )}

              {canEditBranch(selectedBooking.branchId) && selectedBooking.status === "in-progress" && (
                <div className="flex flex-wrap gap-2">
                  <Button
                    onClick={() => handleStatusUpdate(selectedBooking, "completed")}
                    className="bg-green-600 hover:bg-green-700"
                  >
                    <CheckCircle className="h-4 w-4 mr-2" />
                    Mark Completed
                  </Button>
                </div>
              )}

              {canEditBranch(selectedBooking.branchId) && selectedBooking.status === "rescheduled" && (
                <div className="space-y-3 mx-[0px] my-[29px]">
                  {/* First row: Start and Cancel with more height */}
                  <div className="grid grid-cols-2 gap-3">
                    <Button
                      onClick={() => handleStatusUpdate(selectedBooking, "in-progress")}
                      className="bg-orange-600 hover:bg-orange-700 w-full h-12"
                      size="lg"
                    >
                      <Play className="h-5 w-5 mr-2" />
                      Start
                    </Button>
                    <Button
                      variant="destructive"
                      onClick={() => handleStatusUpdate(selectedBooking, "canceled")}
                      className="w-full h-12"
                      size="lg"
                    >
                      <XCircle className="h-5 w-5 mr-2" />
                      Cancel
                    </Button>
                  </div>
                  
                  {/* Second row: Customer Did Not Appear on the right with border */}
                  <div className="flex justify-end">
                    <Button
                      variant="outline"
                      onClick={() => handleStatusUpdate(selectedBooking, "no-show")}
                      className="border-2 border-gray-400 text-gray-700 hover:bg-gray-50 hover:border-gray-500 mx-[0px] my-[24px] rounded-[6px]"
                    >
                      <AlertTriangle className="h-4 w-4 mr-2" />
                      Customer Did Not Appear
                    </Button>
                  </div>
                </div>
              )}
            </div>
            </>
          )}
        </DialogContent>
      </Dialog>

      {/* Create Booking Dialog */}
      <Dialog open={showCreateDialog} onOpenChange={setShowCreateDialog}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>Create New Booking</DialogTitle>
            <DialogDescription>
              Add a new booking reservation for a customer
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="customerName">Customer Name</Label>
                <Input
                  id="customerName"
                  value={newBookingData.customerName || ""}
                  onChange={(e) => setNewBookingData(prev => ({ ...prev, customerName: e.target.value }))}
                />
              </div>
              <div>
                <Label htmlFor="customerPhone">Phone Number</Label>
                <Input
                  id="customerPhone"
                  value={newBookingData.customerPhone || ""}
                  onChange={(e) => setNewBookingData(prev => ({ ...prev, customerPhone: e.target.value }))}
                />
              </div>
            </div>

            <div>
              <Label htmlFor="customerEmail">Email</Label>
              <Input
                id="customerEmail"
                type="email"
                value={newBookingData.customerEmail || ""}
                onChange={(e) => setNewBookingData(prev => ({ ...prev, customerEmail: e.target.value }))}
              />
            </div>

            <div>
              <Label htmlFor="carPlate">Car Plate Number</Label>
              <Input
                id="carPlate"
                value={newBookingData.carPlateNumber || ""}
                onChange={(e) => setNewBookingData(prev => ({ ...prev, carPlateNumber: e.target.value }))}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="date">Date</Label>
                <Input
                  id="date"
                  type="date"
                  value={newBookingData.date || ""}
                  onChange={(e) => setNewBookingData(prev => ({ ...prev, date: e.target.value }))}
                />
              </div>
              <div>
                <Label htmlFor="time">Time</Label>
                <Select value={newBookingData.time || ""} onValueChange={(value) => setNewBookingData(prev => ({ ...prev, time: value }))}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select time" />
                  </SelectTrigger>
                  <SelectContent>
                    {formTimeSlots.map((slot) => (
                      <SelectItem key={slot} value={slot}>{slot}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div>
              <Label htmlFor="station">Station</Label>
              <Select value={newBookingData.station || ""} onValueChange={(value) => setNewBookingData(prev => ({ ...prev, station: value }))}>
                <SelectTrigger>
                  <SelectValue placeholder="Select station" />
                </SelectTrigger>
                <SelectContent>
                  {STATIONS.map((station, index) => (
                    <SelectItem key={station} value={station}>Station {index + 1}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="flex gap-2">
              <Button
                onClick={() => {
                  const booking = {
                    ...newBookingData,
                    id: `booking_${Date.now()}`,
                    status: "confirmed" as const,
                    submittedAt: new Date().toISOString(),
                    createdBy: "admin" as const,
                    service: "Manual Booking",
                    vehicleType: "Regular",
                    estimatedDuration: 60,
                    price: 50,
                    branchId: branches[0]?.id || "b1"
                  };
                  onCreateBooking(booking);
                  setNewBookingData({});
                  setShowCreateDialog(false);
                  toast.success("Booking created successfully");
                }}
                disabled={!newBookingData.customerName || !newBookingData.date || !newBookingData.time || !newBookingData.station}
              >
                Create Booking
              </Button>
              <Button variant="outline" onClick={() => {
                setNewBookingData({});
                setShowCreateDialog(false);
              }}>
                Cancel
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Create Booking Dialog */}
      <Dialog open={showCreateDialog} onOpenChange={setShowCreateDialog}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>Create New Booking</DialogTitle>
            <DialogDescription>
              Add a new booking reservation for a customer
            </DialogDescription>
          </DialogHeader>
          <div className="text-sm text-muted-foreground py-4">
            Create booking form content here
          </div>
        </DialogContent>
      </Dialog>

      {/* AI Campaign Creation Dialog */}
      <Dialog open={showAISuggestionsDialog} onOpenChange={setShowAISuggestionsDialog}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <div className="flex items-center gap-2">
              <div className="h-10 w-10 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center">
                <Sparkles className="h-5 w-5 text-white" />
              </div>
              <div>
                <DialogTitle className="text-xl">Create Campaign from AI Suggestion</DialogTitle>
                <DialogDescription>
                  {selectedSuggestion && `${selectedSuggestion.campaignName} • ${selectedSuggestion.targetTimeSlot}`}
                </DialogDescription>
              </div>
            </div>
          </DialogHeader>

          {selectedSuggestion && (
            <div className="space-y-4 mt-6">
              {/* AI Insight Banner */}
              <div className="bg-gradient-to-r from-purple-50 to-blue-50 border border-purple-200 rounded-lg p-4">
                <div className="flex items-start gap-3">
                  <Sparkles className="h-5 w-5 text-purple-600 mt-0.5" />
                  <div className="flex-1">
                    <p className="font-medium text-purple-900 mb-1">AI Recommendation</p>
                    <p className="text-sm text-purple-700">{selectedSuggestion.aiReasoning}</p>
                    <div className="flex items-center gap-4 mt-3">
                      <div className="flex items-center gap-2">
                        <TrendingUp className="h-4 w-4 text-green-600" />
                        <span className="text-sm text-green-700">+{selectedSuggestion.predictedBookingIncrease}% bookings</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <DollarSign className="h-4 w-4 text-green-600" />
                        <span className="text-sm text-green-700">{selectedSuggestion.predictedRevenue} revenue</span>
                      </div>
                      <Badge className="bg-green-100 text-green-700 border-green-200">
                        {selectedSuggestion.confidence}% confidence
                      </Badge>
                    </div>
                  </div>
                </div>
              </div>

              {/* Campaign Form */}
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Campaign Name</Label>
                  <Input
                    id="name"
                    value={campaignForm.name}
                    onChange={(e) => setCampaignForm(prev => ({ ...prev, name: e.target.value }))}
                    placeholder="Enter campaign name..."
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    value={campaignForm.description}
                    onChange={(e) => setCampaignForm(prev => ({ ...prev, description: e.target.value }))}
                    placeholder="Brief description of the campaign..."
                    rows={3}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Campaign Type</Label>
                    <Select 
                      value={campaignForm.type} 
                      onValueChange={(value: any) => setCampaignForm(prev => ({ ...prev, type: value }))}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Percentage Discount">Percentage Discount</SelectItem>
                        <SelectItem value="Fixed Discount">Fixed Discount</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label>
                      {campaignForm.type === "Percentage Discount" && "Discount Percentage (%)"}
                      {campaignForm.type === "Fixed Discount" && "Discount Amount ($)"}
                    </Label>
                    <Input
                      type="number"
                      value={campaignForm.discountValue}
                      onChange={(e) => setCampaignForm(prev => ({ ...prev, discountValue: parseFloat(e.target.value) }))}
                      min="1"
                      max={campaignForm.type === "Percentage Discount" ? "100" : undefined}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="startDate">Start Date</Label>
                    <Input
                      id="startDate"
                      type="date"
                      value={campaignForm.startDate}
                      onChange={(e) => setCampaignForm(prev => ({ ...prev, startDate: e.target.value }))}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="endDate">End Date</Label>
                    <Input
                      id="endDate"
                      type="date"
                      value={campaignForm.endDate}
                      onChange={(e) => setCampaignForm(prev => ({ ...prev, endDate: e.target.value }))}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Campaign Scope</Label>
                  <Select 
                    value={campaignForm.scope} 
                    onValueChange={(value: any) => setCampaignForm(prev => ({ ...prev, scope: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="All Branches">All Branches</SelectItem>
                      <SelectItem value="Specific Branches">Specific Branches</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {campaignForm.scope === "Specific Branches" && (
                  <div className="space-y-2">
                    <Label>Select Branches</Label>
                    <div className="space-y-2 max-h-32 overflow-y-auto border rounded p-2">
                      {branches.map(branch => (
                        <div key={branch.id} className="flex items-center space-x-2">
                          <Checkbox
                            id={`branch-${branch.id}`}
                            checked={campaignForm.applicableBranches.includes(branch.id)}
                            onCheckedChange={(checked) => {
                              setCampaignForm(prev => ({
                                ...prev,
                                applicableBranches: checked
                                  ? [...prev.applicableBranches, branch.id]
                                  : prev.applicableBranches.filter(b => b !== branch.id)
                              }));
                            }}
                          />
                          <Label htmlFor={`branch-${branch.id}`} className="text-sm">
                            {branch.name}
                          </Label>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <div className="space-y-2">
                  <Label>Target Time Slot</Label>
                  <Input
                    value={campaignForm.targetTimeSlot}
                    onChange={(e) => setCampaignForm(prev => ({ ...prev, targetTimeSlot: e.target.value }))}
                    placeholder="e.g., 6:00 AM - 8:00 AM"
                    disabled
                  />
                  <p className="text-xs text-muted-foreground">AI recommended time slot based on low traffic analysis</p>
                </div>
              </div>

              <DialogFooter className="gap-2">
                <Button 
                  variant="outline" 
                  onClick={() => setShowAISuggestionsDialog(false)}
                >
                  Cancel
                </Button>
                <Button 
                  onClick={() => {
                    if (onCreateCampaignFromSuggestion && selectedSuggestion) {
                      // Create campaign with form data
                      const campaignData = {
                        ...selectedSuggestion,
                        ...campaignForm
                      };
                      onCreateCampaignFromSuggestion(campaignData as any);
                      setShowAISuggestionsDialog(false);
                      toast.success("Campaign created successfully!");
                    }
                  }}
                  className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
                >
                  <Sparkles className="h-4 w-4 mr-2" />
                  Create Campaign
                </Button>
              </DialogFooter>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Alternative Time Suggestion Dialog */}
      <Dialog open={showAlternativeTimeDialog} onOpenChange={setShowAlternativeTimeDialog}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <div className="flex items-center gap-2">
              <div className="h-10 w-10 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                <Sparkles className="h-5 w-5 text-white" />
              </div>
              <div>
                <DialogTitle className="text-xl">Suggest Alternative Time</DialogTitle>
                <DialogDescription>
                  {selectedBooking && `${selectedBooking.customerName} • ${selectedBooking.service}`}
                </DialogDescription>
              </div>
            </div>
          </DialogHeader>

          {selectedBooking && (
            <div className="space-y-6 mt-6">
              {/* Current Booking Info */}
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                <p className="text-sm font-medium text-gray-900 mb-2">Current Request</p>
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div className="flex items-center gap-2 text-gray-600">
                    <Calendar className="h-4 w-4" />
                    <span>{new Date(selectedBooking.date).toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <Clock className="h-4 w-4" />
                    <span>{selectedBooking.time}</span>
                  </div>
                </div>
              </div>

              {/* Suggested Time */}
              <div className="space-y-4">
                <h3 className="font-medium text-gray-900">Alternative Time Slot</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="suggestedDate">Suggested Date</Label>
                    <Input
                      id="suggestedDate"
                      type="date"
                      value={alternativeTimeForm.suggestedDate}
                      onChange={(e) => setAlternativeTimeForm(prev => ({ ...prev, suggestedDate: e.target.value }))}
                    />
                  </div>
                  <div>
                    <Label htmlFor="suggestedTime">Suggested Time</Label>
                    <Input
                      id="suggestedTime"
                      type="time"
                      value={alternativeTimeForm.suggestedTime}
                      onChange={(e) => setAlternativeTimeForm(prev => ({ ...prev, suggestedTime: e.target.value }))}
                    />
                  </div>
                </div>
              </div>

              {/* Incentive Type */}
              <div className="space-y-4">
                <h3 className="font-medium text-gray-900">Incentive Offer</h3>
                <div>
                  <Label>Incentive Type</Label>
                  <Select
                    value={alternativeTimeForm.incentiveType}
                    onValueChange={(value: "discount" | "coupon" | "extra-service") => 
                      setAlternativeTimeForm(prev => ({ ...prev, incentiveType: value }))
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="discount">Discount</SelectItem>
                      <SelectItem value="coupon">Coupon Code</SelectItem>
                      <SelectItem value="extra-service">Extra Service</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Discount Options */}
                {alternativeTimeForm.incentiveType === "discount" && (
                  <div className="space-y-4 p-4 bg-green-50 border border-green-200 rounded-lg">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label>Discount Type</Label>
                        <Select
                          value={alternativeTimeForm.discountType}
                          onValueChange={(value: "percentage" | "fixed") => 
                            setAlternativeTimeForm(prev => ({ ...prev, discountType: value }))
                          }
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="percentage">Percentage (%)</SelectItem>
                            <SelectItem value="fixed">Fixed Amount ($)</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label>Value</Label>
                        <Input
                          type="number"
                          value={alternativeTimeForm.discountValue}
                          onChange={(e) => setAlternativeTimeForm(prev => ({ 
                            ...prev, 
                            discountValue: parseInt(e.target.value) || 0 
                          }))}
                          min="0"
                          max={alternativeTimeForm.discountType === "percentage" ? 100 : undefined}
                        />
                      </div>
                    </div>
                    <div className="text-sm text-green-700">
                      {alternativeTimeForm.discountType === "percentage" 
                        ? `${alternativeTimeForm.discountValue}% off the service price`
                        : `${alternativeTimeForm.discountValue} off the service price`
                      }
                    </div>
                  </div>
                )}

                {/* Coupon Options */}
                {alternativeTimeForm.incentiveType === "coupon" && (
                  <div className="space-y-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                    <div>
                      <Label htmlFor="couponCode">Coupon Code</Label>
                      <Input
                        id="couponCode"
                        value={alternativeTimeForm.couponCode}
                        onChange={(e) => setAlternativeTimeForm(prev => ({ 
                          ...prev, 
                          couponCode: e.target.value.toUpperCase() 
                        }))}
                        placeholder="e.g., SAVE20"
                      />
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        const randomCoupon = `SAVE${Math.floor(Math.random() * 30 + 10)}`;
                        setAlternativeTimeForm(prev => ({ ...prev, couponCode: randomCoupon }));
                      }}
                    >
                      Generate Random Code
                    </Button>
                  </div>
                )}

                {/* Extra Service Options */}
                {alternativeTimeForm.incentiveType === "extra-service" && (
                  <div className="space-y-4 p-4 bg-purple-50 border border-purple-200 rounded-lg">
                    <div>
                      <Label htmlFor="extraService">Extra Service</Label>
                      <Select
                        value={alternativeTimeForm.extraService}
                        onValueChange={(value) => 
                          setAlternativeTimeForm(prev => ({ ...prev, extraService: value }))
                        }
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select a complimentary service" />
                        </SelectTrigger>
                        <SelectContent>
                          {services.filter(s => s.isActive).map(service => (
                            <SelectItem key={service.id} value={service.name}>
                              {service.name} - ${service.customPrice}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    {alternativeTimeForm.extraService && (
                      <div className="text-sm text-purple-700">
                        Complimentary {alternativeTimeForm.extraService} added to booking
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Message to Customer */}
              <div className="space-y-2">
                <Label htmlFor="message">Message to Customer</Label>
                <Textarea
                  id="message"
                  value={alternativeTimeForm.message}
                  onChange={(e) => setAlternativeTimeForm(prev => ({ ...prev, message: e.target.value }))}
                  rows={4}
                  placeholder="Explain why you're suggesting this alternative time and highlight the incentive..."
                />
              </div>
            </div>
          )}

          <DialogFooter className="gap-2">
            <Button 
              variant="outline" 
              onClick={() => setShowAlternativeTimeDialog(false)}
            >
              Cancel
            </Button>
            <Button 
              onClick={() => {
                if (selectedBooking) {
                  // Create a campaign or send notification with the alternative time suggestion
                  const incentiveText = 
                    alternativeTimeForm.incentiveType === "discount" 
                      ? `${alternativeTimeForm.discountValue}${alternativeTimeForm.discountType === "percentage" ? "%" : "$"} discount`
                      : alternativeTimeForm.incentiveType === "coupon"
                      ? `Coupon code: ${alternativeTimeForm.couponCode}`
                      : `Free ${alternativeTimeForm.extraService}`;
                  
                  toast.success(
                    `Alternative time suggestion sent to ${selectedBooking.customerName}`,
                    {
                      description: `${alternativeTimeForm.suggestedDate} at ${alternativeTimeForm.suggestedTime} with ${incentiveText}`
                    }
                  );
                  
                  // In a real app, this would send an email/SMS to the customer
                  // and possibly create a special campaign or booking offer
                  
                  setShowAlternativeTimeDialog(false);
                  setShowBookingDialog(false);
                }
              }}
              className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
            >
              <Sparkles className="h-4 w-4 mr-2" />
              Send Suggestion
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Mobile Insights Drawer */}
      <Drawer open={showInsightsDrawer} onOpenChange={setShowInsightsDrawer}>
        <DrawerContent className="max-h-[85vh]">
          <DrawerHeader>
            <DrawerTitle>Today's Insights</DrawerTitle>
            <DrawerDescription>
              Overview of bookings and recent activity
            </DrawerDescription>
          </DrawerHeader>
          
          <div className="overflow-y-auto p-4 space-y-6">
            {/* Today's Overview */}
            <div>
              <h3 className="font-medium mb-4">Booking Status</h3>
              <div className="space-y-3">
                {Object.entries(STATUS_LABELS).map(([status, label]) => {
                  const count = viewBookings.filter(b => b.status === status).length;
                  return (
                    <div key={status} className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className={`w-2 h-2 rounded ${STATUS_COLORS[status as keyof typeof STATUS_COLORS]}`} />
                        <span className="text-sm">{label}</span>
                      </div>
                      <Badge variant="secondary">{count}</Badge>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Recent Completions */}
            <div>
              <h3 className="font-medium mb-4 flex items-center gap-2">
                <Bell className="h-4 w-4" />
                Recent Completions
              </h3>
              <div className="space-y-3">
                {completedBookings.length > 0 ? (
                  completedBookings.map((booking) => (
                    <div key={booking.id} className="flex items-center gap-3 p-2 rounded-lg bg-green-50">
                      <Avatar className="h-8 w-8">
                        <AvatarFallback className="bg-green-500 text-white">
                          {booking.customerName.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium truncate">{booking.customerName}</p>
                        <p className="text-xs text-muted-foreground">{booking.service}</p>
                      </div>
                      <CheckCircle className="h-4 w-4 text-green-500" />
                    </div>
                  ))
                ) : (
                  <p className="text-sm text-muted-foreground">No recent completions</p>
                )}
              </div>
            </div>
          </div>
        </DrawerContent>
      </Drawer>
    </div>
  );
}