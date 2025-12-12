"use client";

import { useState, useEffect } from "react";
import { Button } from "../ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Badge } from "../ui/badge";
import { Calendar } from "../ui/calendar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "../ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Switch } from "../ui/switch";
import { Textarea } from "../ui/textarea";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../ui/dropdown-menu";
import { Checkbox } from "../ui/checkbox";
import { 
  Calendar as CalendarIcon, 
  Clock, 
  Users, 
  Car, 
  Plus, 
  Settings, 
  CheckCircle, 
  XCircle, 
  AlertTriangle,
  List,
  Filter,
  Search,
  ArrowLeft,
  MoreHorizontal,
  DollarSign,
  MapPin,
  Edit,
  Trash2,
  Phone,
  Mail,
  User,
  ChevronDown,
  Zap,
  Wrench,
  Truck
} from "lucide-react";
import { 
  BusinessModule, 
  ModuleCapacity,
  calculateModuleCapacity,
  validateModuleCapacity,
  getModuleName,
  getModuleStationNames,
  MODULE_STATION_NAMES
} from "../../types/business-modules";

interface BookingRequest {
  id: string;
  customerName: string;
  customerPhone: string;
  customerEmail: string;
  date: string;
  time: string;
  service: string;
  vehicleType: string;
  estimatedDuration: number;
  status: "pending" | "confirmed" | "rejected" | "completed" | "in-progress";
  submittedAt: string;
  notes?: string;
  branchId: string;
  price: number;
  station?: string;
  createdBy?: "customer" | "admin";
  businessModule?: BusinessModule; // Module awareness
}

interface Branch {
  id: string;
  name: string;
  businessModules?: BusinessModule[]; // Module awareness
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

interface CapacityPlanningProps {
  branches: Branch[];
  services: Service[];
  packages: Package[];
  bookings: BookingRequest[];
  onUpdateCapacity: (branchId: string, capacity: any) => void;
  onApproveBooking: (bookingId: string, notes?: string) => void;
  onRejectBooking: (bookingId: string, reason: string) => void;
  onCreateBooking: (booking: BookingRequest) => void;
  onUpdateBooking: (bookingId: string, updates: Partial<BookingRequest>) => void;
  onDeleteBooking: (bookingId: string) => void;
}

export function CapacityPlanningManagement({ 
  branches, 
  services, 
  packages, 
  bookings, 
  onUpdateCapacity, 
  onApproveBooking, 
  onRejectBooking,
  onCreateBooking,
  onUpdateBooking,
  onDeleteBooking
}: CapacityPlanningProps) {
  const [selectedBranch, setSelectedBranch] = useState(branches[0]?.id || "");
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [viewMode, setViewMode] = useState<"calendar" | "list">("calendar");
  const [showNewBookingDialog, setShowNewBookingDialog] = useState(false);
  const [showEditBookingDialog, setShowEditBookingDialog] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState<BookingRequest | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState<string>("all");

  // Mock stations/bays
  const stations = [
    { id: "station1", name: "Station 1", type: "Self Automated" },
    { id: "station2", name: "Station 2", type: "Self Automated" },  
    { id: "station3", name: "Station 3", type: "Self Automated" },
    { id: "station4", name: "Station 4", type: "Self Automated" }
  ];

  // Time slots for the calendar
  const timeSlots = [
    "8:00 AM", "8:30 AM", "9:00 AM", "9:30 AM", "10:00 AM", "10:30 AM", 
    "11:00 AM", "11:30 AM", "12:00 PM", "12:30 PM", "1:00 PM", "1:30 PM", "2:00 PM"
  ];

  // Combined bookings and requests state
  const [allBookings, setAllBookings] = useState<BookingRequest[]>(bookings);

  // Sync bookings when prop changes
  useEffect(() => {
    setAllBookings(bookings);
  }, [bookings]);

  const [newBookingForm, setNewBookingForm] = useState({
    customerName: "",
    customerPhone: "",
    customerEmail: "",
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

  // Price and duration calculation
  const calculateTotals = (selectedServices: string[], selectedPackages: string[], vehicleType: string) => {
    let totalPrice = 0;
    let totalDuration = 0;

    // Calculate services
    selectedServices.forEach(serviceId => {
      const service = services.find(s => s.id === serviceId);
      if (service && service.vehicleTypes.includes(vehicleType)) {
        totalPrice += service.customPrice;
        totalDuration += service.customDuration;
      }
    });

    // Calculate packages
    selectedPackages.forEach(packageId => {
      const pkg = packages.find(p => p.id === packageId);
      if (pkg && pkg.vehicleTypes.includes(vehicleType)) {
        const vehiclePricing = pkg.vehicleTypePricing.find(vt => vt.vehicleType === vehicleType);
        if (vehiclePricing) {
          totalPrice += vehiclePricing.discountPrice || vehiclePricing.price;
          totalDuration += vehiclePricing.duration;
        }
      }
    });

    return { totalPrice, totalDuration };
  };

  // Update form when services/packages/vehicle type changes
  const updateNewBookingCalculations = () => {
    if (newBookingForm.vehicleType) {
      const { totalPrice, totalDuration } = calculateTotals(
        newBookingForm.selectedServices,
        newBookingForm.selectedPackages,
        newBookingForm.vehicleType
      );
      
      const selectedItems = [
        ...newBookingForm.selectedServices.map(sid => services.find(s => s.id === sid)?.name).filter(Boolean),
        ...newBookingForm.selectedPackages.map(pid => packages.find(p => p.id === pid)?.name).filter(Boolean)
      ];
      
      setNewBookingForm(prev => ({
        ...prev,
        price: totalPrice,
        estimatedDuration: totalDuration,
        service: selectedItems.join(", ")
      }));
    }
  };

  const updateEditBookingCalculations = () => {
    if (selectedBooking?.vehicleType) {
      const { totalPrice, totalDuration } = calculateTotals(
        editFormServices,
        editFormPackages,
        selectedBooking.vehicleType
      );
      
      const selectedItems = [
        ...editFormServices.map(sid => services.find(s => s.id === sid)?.name).filter(Boolean),
        ...editFormPackages.map(pid => packages.find(p => p.id === pid)?.name).filter(Boolean)
      ];
      
      setSelectedBooking(prev => prev ? {
        ...prev,
        price: totalPrice,
        estimatedDuration: totalDuration,
        service: selectedItems.join(", ")
      } : null);
    }
  };

  // Multi-select dropdown component
  const ServicePackageSelector = ({ 
    selectedServices, 
    selectedPackages, 
    onServicesChange, 
    onPackagesChange,
    vehicleType 
  }: {
    selectedServices: string[];
    selectedPackages: string[];
    onServicesChange: (services: string[]) => void;
    onPackagesChange: (packages: string[]) => void;
    vehicleType: string;
  }) => {
    const [isOpen, setIsOpen] = useState(false);
    
    const availableServices = services.filter(s => s.isActive && s.vehicleTypes.includes(vehicleType));
    const availablePackages = packages.filter(p => p.isActive && p.vehicleTypes.includes(vehicleType));
    
    const toggleService = (serviceId: string) => {
      const newServices = selectedServices.includes(serviceId)
        ? selectedServices.filter(id => id !== serviceId)
        : [...selectedServices, serviceId];
      onServicesChange(newServices);
    };
    
    const togglePackage = (packageId: string) => {
      const newPackages = selectedPackages.includes(packageId)
        ? selectedPackages.filter(id => id !== packageId)
        : [...selectedPackages, packageId];
      onPackagesChange(newPackages);
    };
    
    const selectedCount = selectedServices.length + selectedPackages.length;
    
    return (
      <div className="relative">
        <Button
          type="button"
          variant="outline"
          className="w-full justify-between"
          onClick={() => setIsOpen(!isOpen)}
          disabled={!vehicleType}
        >
          <span className="text-left">
            {selectedCount === 0 
              ? vehicleType ? "Select services & packages" : "Select vehicle type first"
              : `${selectedCount} item${selectedCount !== 1 ? 's' : ''} selected`
            }
          </span>
          <ChevronDown className="h-4 w-4 opacity-50" />
        </Button>
        
        {isOpen && vehicleType && (
          <Card className="absolute top-full left-0 right-0 z-50 mt-1 max-h-80 overflow-auto">
            <CardContent className="p-4 space-y-4">
              {/* Services Section */}
              {availableServices.length > 0 && (
                <div>
                  <Label className="text-sm font-medium">Individual Services</Label>
                  <div className="space-y-2 mt-2">
                    {availableServices.map((service) => (
                      <div key={service.id} className="flex items-start gap-3 p-2 hover:bg-gray-50 rounded">
                        <Checkbox
                          id={`service-${service.id}`}
                          checked={selectedServices.includes(service.id)}
                          onCheckedChange={() => toggleService(service.id)}
                        />
                        <div className="flex-1 min-w-0">
                          <Label htmlFor={`service-${service.id}`} className="text-sm cursor-pointer">
                            {service.name}
                          </Label>
                          <p className="text-xs text-muted-foreground mt-1">{service.description}</p>
                          <div className="flex items-center gap-4 mt-1">
                            <span className="text-xs text-green-600 font-medium">${service.customPrice}</span>
                            <span className="text-xs text-gray-500">{service.customDuration}min</span>
                            <Badge variant="outline" className="text-xs">{service.category}</Badge>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              
              {/* Packages Section */}
              {availablePackages.length > 0 && (
                <div>
                  <Label className="text-sm font-medium">Service Packages</Label>
                  <div className="space-y-2 mt-2">
                    {availablePackages.map((pkg) => {
                      const vehiclePricing = pkg.vehicleTypePricing.find(vt => vt.vehicleType === vehicleType);
                      return (
                        <div key={pkg.id} className="flex items-start gap-3 p-2 hover:bg-gray-50 rounded">
                          <Checkbox
                            id={`package-${pkg.id}`}
                            checked={selectedPackages.includes(pkg.id)}
                            onCheckedChange={() => togglePackage(pkg.id)}
                          />
                          <div className="flex-1 min-w-0">
                            <Label htmlFor={`package-${pkg.id}`} className="text-sm cursor-pointer">
                              {pkg.name}
                            </Label>
                            <p className="text-xs text-muted-foreground mt-1">{pkg.description}</p>
                            <p className="text-xs text-gray-600 mt-1">
                              Includes: {pkg.includedServices.join(", ")}
                            </p>
                            {vehiclePricing && (
                              <div className="flex items-center gap-4 mt-1">
                                <span className="text-xs text-green-600 font-medium">
                                  ${vehiclePricing.discountPrice || vehiclePricing.price}
                                  {vehiclePricing.discountPrice && (
                                    <span className="line-through text-gray-400 ml-1">
                                      ${vehiclePricing.price}
                                    </span>
                                  )}
                                </span>
                                <span className="text-xs text-gray-500">{vehiclePricing.duration}min</span>
                                <Badge variant="secondary" className="text-xs">Package</Badge>
                              </div>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
              
              {availableServices.length === 0 && availablePackages.length === 0 && (
                <p className="text-sm text-muted-foreground text-center py-4">
                  No services or packages available for {vehicleType} vehicles
                </p>
              )}
              
              <div className="flex justify-end pt-2 border-t">
                <Button size="sm" onClick={() => setIsOpen(false)}>
                  Done
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    );
  };

  const getTodaysBookings = () => {
    const today = selectedDate.toISOString().split('T')[0];
    return bookings.filter(booking => booking.date === today);
  };

  const filteredBookings = bookings.filter(booking => {
    const matchesSearch = booking.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         booking.customerPhone.includes(searchQuery) ||
                         booking.service.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = filterStatus === "all" || booking.status === filterStatus;
    const matchesBranch = booking.branchId === selectedBranch;
    return matchesSearch && matchesStatus && matchesBranch;
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "pending":
        return <Badge variant="secondary" className="bg-amber-100 text-amber-800 text-xs">Pending</Badge>;
      case "confirmed":
        return <Badge variant="default" className="bg-green-100 text-green-800 text-xs">Confirmed</Badge>;
      case "rejected":
        return <Badge variant="destructive" className="text-xs">Rejected</Badge>;
      case "completed":
        return <Badge variant="default" className="bg-blue-100 text-blue-800 text-xs">Completed</Badge>;
      case "in-progress":
        return <Badge variant="default" className="bg-purple-100 text-purple-800 text-xs">In Progress</Badge>;
      default:
        return <Badge variant="secondary" className="text-xs">{status}</Badge>;
    }
  };

  const getSlotStyle = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-amber-50 border-amber-200 border-2 border-dashed";
      case "confirmed":
        return "bg-green-100 border-green-300 border-2";
      case "in-progress":
        return "bg-purple-100 border-purple-300 border-2";
      case "completed":
        return "bg-blue-100 border-blue-300 border-2";
      case "rejected":
        return "bg-red-100 border-red-300 border-2";
      default:
        return "bg-gray-100 border-gray-300 border";
    }
  };

  const handleQuickApprove = (bookingId: string) => {
    onApproveBooking(bookingId);
  };

  const handleQuickReject = (bookingId: string) => {
    onRejectBooking(bookingId, "Rejected by admin");
  };

  const handleCreateBooking = () => {
    const newBooking: BookingRequest = {
      id: `admin_${Date.now()}`,
      customerName: newBookingForm.customerName,
      customerPhone: newBookingForm.customerPhone,
      customerEmail: newBookingForm.customerEmail,
      date: newBookingForm.date,
      time: newBookingForm.time,
      service: newBookingForm.service,
      vehicleType: newBookingForm.vehicleType,
      estimatedDuration: newBookingForm.estimatedDuration,
      status: "confirmed",
      submittedAt: new Date().toISOString(),
      branchId: selectedBranch,
      price: newBookingForm.price,
      station: newBookingForm.station,
      notes: newBookingForm.notes,
      createdBy: "admin"
    };

    onCreateBooking(newBooking);
    setShowNewBookingDialog(false);
    setNewBookingForm({
      customerName: "",
      customerPhone: "",
      customerEmail: "",
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
  };

  const handleEditBooking = () => {
    if (!selectedBooking) return;
    
    onUpdateBooking(selectedBooking.id, selectedBooking);
    setShowEditBookingDialog(false);
    setSelectedBooking(null);
    setEditFormServices([]);
    setEditFormPackages([]);
  };

  const handleDeleteBooking = (bookingId: string) => {
    onDeleteBooking(bookingId);
  };

  const getBookingForSlot = (stationId: string, timeSlot: string) => {
    const today = selectedDate.toISOString().split('T')[0];
    return bookings.find(booking => 
      booking.station === stationId && 
      booking.time === timeSlot && 
      booking.date === today
    );
  };

  const renderBookingInSlot = (booking: BookingRequest) => {
    return (
      <div className={`${getSlotStyle(booking.status)} rounded-md p-3 text-xs relative group h-full min-h-[120px]`}>
        <div className="space-y-2">
          {/* Customer Information Header */}
          <div className="flex items-start justify-between">
            <div className="flex-1 min-w-0">
              <div className="font-medium text-gray-900 truncate">{booking.customerName}</div>
              <div className="text-xs text-muted-foreground flex items-center gap-1">
                <Phone className="w-3 h-3" />
                {booking.customerPhone}
              </div>
              <div className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
                <Mail className="w-3 h-3" />
                {booking.customerEmail}
              </div>
            </div>
            
            {/* Status Badge */}
            <div className="ml-2">
              {getStatusBadge(booking.status)}
            </div>
          </div>

          {/* Service Details */}
          <div className="space-y-1">
            <div className="font-medium text-gray-800 text-xs">{booking.service}</div>
            <div className="text-xs text-muted-foreground">{booking.vehicleType}</div>
          </div>

          {/* Duration and Price */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1 text-xs text-gray-600">
              <Clock className="w-3 h-3" />
              {booking.estimatedDuration}min
            </div>
            <div className="text-xs font-medium text-green-600">
              ${booking.price}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-1 pt-1">
            {booking.status === "pending" && (
              <>
                <Button
                  size="sm"
                  className="h-6 px-2 bg-green-500 hover:bg-green-600 text-white text-xs flex-1"
                  onClick={() => handleQuickApprove(booking.id)}
                >
                  Approve
                </Button>
                <Button
                  size="sm"
                  variant="destructive"
                  className="h-6 px-2 text-xs flex-1"
                  onClick={() => handleQuickReject(booking.id)}
                >
                  Reject
                </Button>
              </>
            )}
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                  <MoreHorizontal className="h-3 w-3" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => {
                  setSelectedBooking(booking);
                  setShowEditBookingDialog(true);
                }}>
                  <Edit className="w-3 h-3 mr-2" />
                  Edit
                </DropdownMenuItem>
                <DropdownMenuItem 
                  onClick={() => handleDeleteBooking(booking.id)}
                  className="text-red-600"
                >
                  <Trash2 className="w-3 h-3 mr-2" />
                  Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    );
  };

  const renderEmptySlot = (stationId: string, timeSlot: string) => {
    return (
      <div className="h-full min-h-[120px] flex items-center justify-center border border-dashed border-gray-300 rounded-md group hover:bg-gray-50">
        <Button
          size="sm"
          variant="ghost"
          className="opacity-0 group-hover:opacity-100 text-xs"
          onClick={() => {
            setNewBookingForm(prev => ({
              ...prev,
              station: stationId,
              time: timeSlot,
              date: selectedDate.toISOString().split('T')[0]
            }));
            setShowNewBookingDialog(true);
          }}
        >
          <Plus className="w-3 h-3 mr-1" />
          Add Booking
        </Button>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="sm" className="p-2">
            <ArrowLeft className="w-4 h-4" />
          </Button>
          <div>
            <h2 className="text-xl font-medium">Premium Car Wash Center</h2>
            <p className="text-sm text-muted-foreground">Schedule management • Aug</p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <Select value={selectedBranch} onValueChange={setSelectedBranch}>
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Select branch" />
            </SelectTrigger>
            <SelectContent>
              {branches.map((branch) => (
                <SelectItem key={branch.id} value={branch.id}>
                  {branch.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Button 
            size="sm" 
            className="bg-blue-500 hover:bg-blue-600 text-white"
            onClick={() => setShowNewBookingDialog(true)}
          >
            + New Booking
          </Button>
          <Button variant="ghost" size="sm">
            Export
          </Button>
        </div>
      </div>

      {/* Tabs for Calendar and List View */}
      <Tabs value={viewMode} onValueChange={(value) => setViewMode(value as any)}>
        <TabsList>
          <TabsTrigger value="calendar">
            <CalendarIcon className="w-4 h-4 mr-2" />
            Calendar View
          </TabsTrigger>
          <TabsTrigger value="list">
            <List className="w-4 h-4 mr-2" />
            List View
          </TabsTrigger>
        </TabsList>

        <TabsContent value="calendar" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Date Picker */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Select Date</CardTitle>
              </CardHeader>
              <CardContent>
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={(date) => date && setSelectedDate(date)}
                  className="rounded-md border"
                />
              </CardContent>
            </Card>

            {/* Calendar Grid */}
            <Card className="lg:col-span-3">
              <CardHeader className="pb-3">
                <CardTitle className="text-base">
                  Schedule - {selectedDate.toLocaleDateString('en-US', { 
                    weekday: 'long', 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })}
                </CardTitle>
                <CardDescription className="text-xs">
                  Station-based schedule with real-time booking management
                </CardDescription>
              </CardHeader>
              <CardContent className="p-0">
                <div className="overflow-auto">
                  <div className="min-w-[800px]">
                    {/* Header Row */}
                    <div className="grid grid-cols-5 border-b bg-gray-50">
                      <div className="p-3 border-r">
                        <span className="text-xs font-medium text-muted-foreground">Time</span>
                      </div>
                      {stations.map((station) => (
                        <div key={station.id} className="p-3 border-r last:border-r-0">
                          <div className="text-xs font-medium">{station.name}</div>
                          <div className="text-xs text-muted-foreground">{station.type}</div>
                        </div>
                      ))}
                    </div>

                    {/* Time Slot Rows */}
                    {timeSlots.map((timeSlot) => (
                      <div key={timeSlot} className="grid grid-cols-5 border-b min-h-[140px]">
                        {/* Time Column */}
                        <div className="p-3 border-r bg-gray-50/50 flex items-start">
                          <span className="text-xs text-muted-foreground pt-2">{timeSlot}</span>
                        </div>
                        
                        {/* Station Columns */}
                        {stations.map((station) => {
                          const booking = getBookingForSlot(station.id, timeSlot);
                          
                          return (
                            <div key={station.id} className="p-2 border-r last:border-r-0 min-h-[140px]">
                              {booking ? 
                                renderBookingInSlot(booking) : 
                                renderEmptySlot(station.id, timeSlot)
                              }
                            </div>
                          );
                        })}
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="list" className="space-y-6">
          {/* Search and Filter */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-base">All Bookings</CardTitle>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <Search className="w-4 h-4 text-muted-foreground" />
                    <Input
                      placeholder="Search bookings..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-64"
                    />
                  </div>
                  <Select value={filterStatus} onValueChange={setFilterStatus}>
                    <SelectTrigger className="w-32">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All</SelectItem>
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="confirmed">Confirmed</SelectItem>
                      <SelectItem value="in-progress">In Progress</SelectItem>
                      <SelectItem value="completed">Completed</SelectItem>
                      <SelectItem value="rejected">Rejected</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Customer</TableHead>
                    <TableHead>Date & Time</TableHead>
                    <TableHead>Service</TableHead>
                    <TableHead>Station</TableHead>
                    <TableHead>Duration</TableHead>
                    <TableHead>Price</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredBookings.map((booking) => (
                    <TableRow key={booking.id}>
                      <TableCell>
                        <div>
                          <div className="font-medium">{booking.customerName}</div>
                          <div className="text-sm text-muted-foreground flex items-center gap-1">
                            <Phone className="w-3 h-3" />
                            {booking.customerPhone}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div>
                          <div className="font-medium">
                            {new Date(booking.date).toLocaleDateString()}
                          </div>
                          <div className="text-sm text-muted-foreground">{booking.time}</div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div>
                          <div>{booking.service}</div>
                          <div className="text-sm text-muted-foreground">{booking.vehicleType}</div>
                        </div>
                      </TableCell>
                      <TableCell>{booking.station?.replace('station', 'Station ')}</TableCell>
                      <TableCell>
                        <div className="flex items-center">
                          <Clock className="w-4 h-4 mr-1" />
                          {booking.estimatedDuration}m
                        </div>
                      </TableCell>
                      <TableCell className="font-medium">${booking.price}</TableCell>
                      <TableCell>{getStatusBadge(booking.status)}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          {booking.status === "pending" && (
                            <>
                              <Button
                                size="sm"
                                className="bg-green-500 hover:bg-green-600 text-white"
                                onClick={() => handleQuickApprove(booking.id)}
                              >
                                Approve
                              </Button>
                              <Button
                                size="sm"
                                variant="destructive"
                                onClick={() => handleQuickReject(booking.id)}
                              >
                                Reject
                              </Button>
                            </>
                          )}
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="sm">
                                <MoreHorizontal className="w-4 h-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem onClick={() => {
                                setSelectedBooking(booking);
                                setShowEditBookingDialog(true);
                              }}>
                                <Edit className="w-4 h-4 mr-2" />
                                Edit
                              </DropdownMenuItem>
                              <DropdownMenuItem 
                                onClick={() => handleDeleteBooking(booking.id)}
                                className="text-red-600"
                              >
                                <Trash2 className="w-4 h-4 mr-2" />
                                Delete
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              {filteredBookings.length === 0 && (
                <div className="text-center py-8 text-muted-foreground">
                  <Users className="w-12 h-12 mx-auto mb-4 opacity-50" />
                  <p>No bookings found</p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* New Booking Dialog */}
      <Dialog open={showNewBookingDialog} onOpenChange={setShowNewBookingDialog}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>Create New Booking</DialogTitle>
            <DialogDescription>
              Add a new booking to the schedule
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4">
            {/* Customer Information */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="customerName">Customer Name</Label>
                <Input
                  id="customerName"
                  placeholder="Enter customer name"
                  value={newBookingForm.customerName}
                  onChange={(e) => setNewBookingForm(prev => ({ ...prev, customerName: e.target.value }))}
                />
              </div>
              <div>
                <Label htmlFor="customerPhone">Phone</Label>
                <Input
                  id="customerPhone"
                  placeholder="Phone number"
                  value={newBookingForm.customerPhone}
                  onChange={(e) => setNewBookingForm(prev => ({ ...prev, customerPhone: e.target.value }))}
                />
              </div>
            </div>
            
            <div>
              <Label htmlFor="customerEmail">Email</Label>
              <Input
                id="customerEmail"
                type="email"
                placeholder="Email address"
                value={newBookingForm.customerEmail}
                onChange={(e) => setNewBookingForm(prev => ({ ...prev, customerEmail: e.target.value }))}
              />
            </div>

            {/* Date and Time */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="date">Date</Label>
                <Input
                  id="date"
                  type="date"
                  value={newBookingForm.date}
                  onChange={(e) => setNewBookingForm(prev => ({ ...prev, date: e.target.value }))}
                />
              </div>
              <div>
                <Label htmlFor="time">Time</Label>
                <Select 
                  value={newBookingForm.time} 
                  onValueChange={(value) => setNewBookingForm(prev => ({ ...prev, time: value }))}
                >
                  <SelectTrigger id="time">
                    <SelectValue placeholder="Select time" />
                  </SelectTrigger>
                  <SelectContent>
                    {timeSlots.map((time) => (
                      <SelectItem key={time} value={time}>{time}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Station and Vehicle Type */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="station">Station</Label>
                <Select 
                  value={newBookingForm.station} 
                  onValueChange={(value) => setNewBookingForm(prev => ({ ...prev, station: value }))}
                >
                  <SelectTrigger id="station">
                    <SelectValue placeholder="Select station" />
                  </SelectTrigger>
                  <SelectContent>
                    {stations.map((station) => (
                      <SelectItem key={station.id} value={station.id}>{station.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="vehicleType">Vehicle Type</Label>
                <Select 
                  value={newBookingForm.vehicleType} 
                  onValueChange={(value) => {
                    setNewBookingForm(prev => ({ ...prev, vehicleType: value, selectedServices: [], selectedPackages: [] }));
                  }}
                >
                  <SelectTrigger id="vehicleType">
                    <SelectValue placeholder="Select vehicle type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Regular">Regular</SelectItem>
                    <SelectItem value="SUV">SUV</SelectItem>
                    <SelectItem value="Sedan">Sedan</SelectItem>
                    <SelectItem value="Truck">Truck</SelectItem>
                    <SelectItem value="Van">Van</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Services & Packages Multi-Select */}
            <div>
              <Label>Services & Packages</Label>
              <ServicePackageSelector
                selectedServices={newBookingForm.selectedServices}
                selectedPackages={newBookingForm.selectedPackages}
                onServicesChange={(services) => {
                  setNewBookingForm(prev => ({ ...prev, selectedServices: services }));
                  setTimeout(updateNewBookingCalculations, 0);
                }}
                onPackagesChange={(packages) => {
                  setNewBookingForm(prev => ({ ...prev, selectedPackages: packages }));
                  setTimeout(updateNewBookingCalculations, 0);
                }}
                vehicleType={newBookingForm.vehicleType}
              />
            </div>

            {/* Duration and Price Display */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="duration">Duration (minutes)</Label>
                <Input
                  id="duration"
                  value={newBookingForm.estimatedDuration}
                  disabled
                  className="bg-gray-50"
                />
                <p className="text-xs text-muted-foreground mt-1">
                  Calculated automatically from selected services
                </p>
              </div>
              <div>
                <Label htmlFor="price">Price ($)</Label>
                <Input
                  id="price"
                  value={newBookingForm.price}
                  disabled
                  className="bg-gray-50"
                />
                <p className="text-xs text-muted-foreground mt-1">
                  Calculated automatically from selected services
                </p>
              </div>
            </div>

            {/* Notes */}
            <div>
              <Label htmlFor="notes">Notes (Optional)</Label>
              <Textarea
                id="notes"
                placeholder="Special instructions or notes"
                value={newBookingForm.notes}
                onChange={(e) => setNewBookingForm(prev => ({ ...prev, notes: e.target.value }))}
              />
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setShowNewBookingDialog(false)}>
              Cancel
            </Button>
            <Button 
              onClick={handleCreateBooking}
              disabled={!newBookingForm.customerName || !newBookingForm.vehicleType || (newBookingForm.selectedServices.length === 0 && newBookingForm.selectedPackages.length === 0)}
            >
              Create Booking
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Booking Dialog */}
      <Dialog open={showEditBookingDialog} onOpenChange={setShowEditBookingDialog}>
        <DialogContent className="max-w-2xl">
          {selectedBooking && (
            <>
              <DialogHeader>
                <DialogTitle>Edit Booking</DialogTitle>
                <DialogDescription>
                  Modify booking details
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 grid grid-cols-2 gap-4">
                <div>
                  <Label>Customer Name</Label>
                  <Input
                    value={selectedBooking.customerName}
                    onChange={(e) => setSelectedBooking(prev => prev ? { ...prev, customerName: e.target.value } : null)}
                  />
                </div>
                <div>
                  <Label>Phone</Label>
                  <Input
                    value={selectedBooking.customerPhone}
                    onChange={(e) => setSelectedBooking(prev => prev ? { ...prev, customerPhone: e.target.value } : null)}
                  />
                </div>
                <div>
                  <Label>Email</Label>
                  <Input
                    value={selectedBooking.customerEmail}
                    onChange={(e) => setSelectedBooking(prev => prev ? { ...prev, customerEmail: e.target.value } : null)}
                  />
                </div>
                <div>
                  <Label>Service</Label>
                  <Input
                    value={selectedBooking.service}
                    onChange={(e) => setSelectedBooking(prev => prev ? { ...prev, service: e.target.value } : null)}
                  />
                </div>
                <div>
                  <Label>Date</Label>
                  <Input
                    type="date"
                    value={selectedBooking.date}
                    onChange={(e) => setSelectedBooking(prev => prev ? { ...prev, date: e.target.value } : null)}
                  />
                </div>
                <div>
                  <Label>Time</Label>
                  <Select value={selectedBooking.time} onValueChange={(value) => setSelectedBooking(prev => prev ? { ...prev, time: value } : null)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {timeSlots.map((time) => (
                        <SelectItem key={time} value={time}>{time}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Station</Label>
                  <Select value={selectedBooking.station} onValueChange={(value) => setSelectedBooking(prev => prev ? { ...prev, station: value } : null)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {stations.map((station) => (
                        <SelectItem key={station.id} value={station.id}>{station.name}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Status</Label>
                  <Select value={selectedBooking.status} onValueChange={(value) => setSelectedBooking(prev => prev ? { ...prev, status: value as any } : null)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="confirmed">Confirmed</SelectItem>
                      <SelectItem value="in-progress">In Progress</SelectItem>
                      <SelectItem value="completed">Completed</SelectItem>
                      <SelectItem value="rejected">Rejected</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Duration (minutes)</Label>
                  <Input
                    type="number"
                    value={selectedBooking.estimatedDuration}
                    onChange={(e) => setSelectedBooking(prev => prev ? { ...prev, estimatedDuration: parseInt(e.target.value) || 60 } : null)}
                  />
                </div>
                <div>
                  <Label>Price ($)</Label>
                  <Input
                    type="number"
                    value={selectedBooking.price}
                    onChange={(e) => setSelectedBooking(prev => prev ? { ...prev, price: parseFloat(e.target.value) || 0 } : null)}
                  />
                </div>
                <div className="col-span-2">
                  <Label>Notes</Label>
                  <Textarea
                    value={selectedBooking.notes || ""}
                    onChange={(e) => setSelectedBooking(prev => prev ? { ...prev, notes: e.target.value } : null)}
                    rows={3}
                  />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setShowEditBookingDialog(false)}>
                  Cancel
                </Button>
                <Button onClick={handleEditBooking}>
                  Save Changes
                </Button>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}