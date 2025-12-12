"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Separator } from "../ui/separator";
import { ScrollArea } from "../ui/scroll-area";
import {
  Calendar,
  Clock,
  TrendingUp,
  TrendingDown,
  Users,
  DollarSign,
  Activity,
  AlertCircle,
  ChevronRight,
  Phone,
  Navigation,
  CheckCircle,
  XCircle,
  Radio,
  Zap,
  Sparkles,
  ArrowRight,
  BarChart3,
  Target,
  Car,
  Truck,
  Wrench,
  Waves,
  MapPin,
} from "lucide-react";
import { cn } from "../ui/utils";
import { motion } from "motion/react";
import { AIInsightWidget } from "../ai/AIInsightWidget";
import { BusinessModuleDetailPage } from "../modules/BusinessModuleDetailPage";

interface BookingSlot {
  id: string;
  time: string;
  customer: string;
  service: string;
  bay?: string;
  status: "in-progress" | "upcoming" | "pending" | "completed";
  phone?: string;
  location?: string;
  endTime?: string;
  endsIn?: string;
}

interface ModernCarwashDashboardProps {
  centerName: string;
  onNavigate: (page: string) => void;
}

export function ModernCarwashDashboard({
  centerName,
  onNavigate,
}: ModernCarwashDashboardProps) {
  const [selectedModule, setSelectedModule] = useState<
    "in-bay" | "tunnel" | "self-service" | "mobile" | "detailing" | null
  >(null);
  const [bookings, setBookings] = useState<BookingSlot[]>([
    {
      id: "1",
      time: "09:45",
      customer: "John Doe",
      service: "Premium Wash",
      bay: "Bay 1",
      status: "in-progress",
      endsIn: "8 min",
    },
  ]);

  const now = new Date();
  const currentTime = now.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
  });
  const currentDate = now.toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  // Mock metrics
  const metrics = {
    today: {
      revenue: 2847,
      customers: 23,
      capacity: 78,
      trend: "+18%",
    },
    week: {
      revenue: 18240,
      customers: 156,
      capacity: 72,
      trend: "+12%",
    },
    month: {
      revenue: 67450,
      customers: 687,
      capacity: 68,
      trend: "+8%",
    },
  };

  // AI Insights
  const aiInsights = [
    {
      id: "1",
      priority: "critical" as const,
      title: "Customer Churn Alert",
      description: "89 customers at risk • $12.4K LTV",
      impact: "High Risk",
      confidence: 94,
      trend: "down" as const,
      metric: "$12,400 potential loss",
      actionLabel: "Take Action",
      actionPage: "ai-churn-prediction",
    },
    {
      id: "2",
      priority: "high" as const,
      title: "Saturday Pricing Opportunity",
      description: "+23% demand predicted • +$1,200 revenue",
      impact: "Revenue Boost",
      confidence: 87,
      trend: "up" as const,
      metric: "+$1,200 estimated",
      actionLabel: "Enable Smart Pricing",
      actionPage: "ai-dynamic-pricing",
    },
    {
      id: "3",
      priority: "medium" as const,
      title: "Add afternoon slot at 2 PM",
      description: "Low utilization window • Fill capacity",
      impact: "Capacity Optimization",
      confidence: 76,
      trend: "neutral" as const,
      actionLabel: "Auto-Add Slot",
      actionPage: "capacity-planning",
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "in-progress":
        return "bg-green-100 text-green-700 border-green-200";
      case "upcoming":
        return "bg-blue-100 text-blue-700 border-blue-200";
      case "pending":
        return "bg-amber-100 text-amber-700 border-amber-200";
      case "completed":
        return "bg-neutral-100 text-neutral-700 border-neutral-200";
      default:
        return "bg-neutral-100 text-neutral-700 border-neutral-200";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "in-progress":
        return <Radio size={14} className="animate-pulse" />;
      case "upcoming":
        return <Clock size={14} />;
      case "pending":
        return <AlertCircle size={14} />;
      case "completed":
        return <CheckCircle size={14} />;
      default:
        return <Clock size={14} />;
    }
  };

  // Action handlers
  const handleApproveBooking = (bookingId: string) => {
    setBookings((prev) =>
      prev.map((b) =>
        b.id === bookingId ? { ...b, status: "upcoming" as const } : b
      )
    );
  };

  const handleRejectBooking = (bookingId: string) => {
    setBookings((prev) => prev.filter((b) => b.id !== bookingId));
  };

  const handleCallCustomer = (phone: string, customerName: string) => {
    window.open(`tel:${phone}`);
    alert(`Calling ${customerName} at ${phone}`);
  };

  const handleNavigateToLocation = (location: string) => {
    // Open Google Maps with the location
    const encodedLocation = encodeURIComponent(location);
    window.open(
      `https://www.google.com/maps/search/?api=1&query=${encodedLocation}`,
      "_blank"
    );
  };

  const handleViewBookingDetails = (booking: BookingSlot) => {
    alert(
      `Booking Details:\n\nTime: ${booking.time}\nCustomer: ${booking.customer}\nService: ${booking.service}\nStatus: ${booking.status}\n${booking.bay ? `Bay: ${booking.bay}` : ""}\n${booking.phone ? `Phone: ${booking.phone}` : ""}\n${booking.location ? `Location: ${booking.location}` : ""}`
    );
  };

  return (
    <div className="space-y-6 p-6 max-w-[1600px] mx-auto">
      {/* Welcome Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-2"
      >
        <h1 className="text-2xl md:text-3xl font-bold pt-[env(safe-area-inset-top,0px)] md:pt-0">Good morning, {centerName}! 👋</h1>
        <div className="flex items-center gap-2 text-neutral-600">
          <Calendar size={16} />
          <span>{currentDate}</span>
          <Separator orientation="vertical" className="h-4" />
          <Clock size={16} />
          <span>{currentTime}</span>
        </div>
      </motion.div>

      {/* Business Modules Overview */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.05 }}
      >
        <Card className="border-2 border-purple-200 shadow-lg">
          <CardHeader className="bg-gradient-to-r from-purple-50 to-blue-50">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="size-10 rounded-lg bg-gradient-to-br from-purple-600 to-blue-600 flex items-center justify-center">
                  <Zap size={20} className="text-white" />
                </div>
                <div>
                  <CardTitle className="text-xl">Active Business Modules</CardTitle>
                  <p className="text-sm text-neutral-600">
                    5 modules operational • Multi-service platform
                  </p>
                </div>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
              {/* In-Bay Module */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.1 }}
                className="relative p-4 rounded-lg border-2 border-blue-200 bg-blue-50 hover:shadow-md transition-all cursor-pointer"
                onClick={() => onNavigate("operations")}
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="size-12 rounded-lg bg-blue-600 flex items-center justify-center">
                      <Car size={24} className="text-white" />
                    </div>
                    <Badge className="bg-green-500 text-white">Active</Badge>
                  </div>
                  <div>
                    <h4 className="font-bold">In-Bay</h4>
                    <p className="text-xs text-neutral-600 mt-1">Automated wash bays</p>
                  </div>
                  <Separator />
                  <div className="space-y-1 text-xs">
                    <div className="flex justify-between">
                      <span className="text-neutral-600">Active Bays:</span>
                      <span className="font-semibold">3/6</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-neutral-600">Today:</span>
                      <span className="font-semibold text-green-600">$847</span>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Tunnel Module */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.15 }}
                className="relative p-4 rounded-lg border-2 border-cyan-200 bg-cyan-50 hover:shadow-md transition-all cursor-pointer"
                onClick={() => onNavigate("operations")}
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="size-12 rounded-lg bg-cyan-600 flex items-center justify-center">
                      <Waves size={24} className="text-white" />
                    </div>
                    <Badge className="bg-green-500 text-white">Active</Badge>
                  </div>
                  <div>
                    <h4 className="font-bold">Tunnel</h4>
                    <p className="text-xs text-neutral-600 mt-1">Conveyor wash system</p>
                  </div>
                  <Separator />
                  <div className="space-y-1 text-xs">
                    <div className="flex justify-between">
                      <span className="text-neutral-600">Capacity:</span>
                      <span className="font-semibold">85%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-neutral-600">Today:</span>
                      <span className="font-semibold text-green-600">$1,240</span>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Self-Service Module */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 }}
                className="relative p-4 rounded-lg border-2 border-green-200 bg-green-50 hover:shadow-md transition-all cursor-pointer"
                onClick={() => onNavigate("operations")}
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="size-12 rounded-lg bg-green-600 flex items-center justify-center">
                      <Users size={24} className="text-white" />
                    </div>
                    <Badge className="bg-green-500 text-white">Active</Badge>
                  </div>
                  <div>
                    <h4 className="font-bold">Self-Service</h4>
                    <p className="text-xs text-neutral-600 mt-1">DIY wash stations</p>
                  </div>
                  <Separator />
                  <div className="space-y-1 text-xs">
                    <div className="flex justify-between">
                      <span className="text-neutral-600">Stations:</span>
                      <span className="font-semibold">2/4</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-neutral-600">Today:</span>
                      <span className="font-semibold text-green-600">$320</span>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Mobile Module */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.25 }}
                className="relative p-4 rounded-lg border-2 border-orange-200 bg-orange-50 hover:shadow-md transition-all cursor-pointer"
                onClick={() => onNavigate("operations")}
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="size-12 rounded-lg bg-orange-600 flex items-center justify-center">
                      <Truck size={24} className="text-white" />
                    </div>
                    <Badge className="bg-green-500 text-white">Active</Badge>
                  </div>
                  <div>
                    <h4 className="font-bold">Mobile</h4>
                    <p className="text-xs text-neutral-600 mt-1">On-location service</p>
                  </div>
                  <Separator />
                  <div className="space-y-1 text-xs">
                    <div className="flex justify-between">
                      <span className="text-neutral-600">Bookings:</span>
                      <span className="font-semibold">8 today</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-neutral-600">Revenue:</span>
                      <span className="font-semibold text-green-600">$680</span>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Manual Detailing Module */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3 }}
                className="relative p-4 rounded-lg border-2 border-purple-200 bg-purple-50 hover:shadow-md transition-all cursor-pointer"
                onClick={() => onNavigate("operations")}
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="size-12 rounded-lg bg-purple-600 flex items-center justify-center">
                      <Wrench size={24} className="text-white" />
                    </div>
                    <Badge className="bg-green-500 text-white">Active</Badge>
                  </div>
                  <div>
                    <h4 className="font-bold">Detailing</h4>
                    <p className="text-xs text-neutral-600 mt-1">Premium hand detailing</p>
                  </div>
                  <Separator />
                  <div className="space-y-1 text-xs">
                    <div className="flex justify-between">
                      <span className="text-neutral-600">Appointments:</span>
                      <span className="font-semibold">4 today</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-neutral-600">Revenue:</span>
                      <span className="font-semibold text-green-600">$920</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Module Summary */}
            <div className="mt-4 pt-4 border-t border-neutral-200">
              <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                <div className="text-center">
                  <p className="text-2xl font-bold text-blue-600">6</p>
                  <p className="text-xs text-neutral-600">In-Bay Stations</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-cyan-600">85%</p>
                  <p className="text-xs text-neutral-600">Tunnel Capacity</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-green-600">4</p>
                  <p className="text-xs text-neutral-600">Self-Service Bays</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-orange-600">8</p>
                  <p className="text-xs text-neutral-600">Mobile Bookings</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-purple-600">4</p>
                  <p className="text-xs text-neutral-600">Detailing Slots</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Peak & Lowest Hours Analysis */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15 }}
      >
        <Card className="border-2 border-amber-200 shadow-lg">
          <CardHeader className="bg-gradient-to-r from-amber-50 to-orange-50">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="size-10 rounded-lg bg-gradient-to-br from-amber-600 to-orange-600 flex items-center justify-center">
                  <Clock size={20} className="text-white" />
                </div>
                <div>
                  <CardTitle className="text-xl">Peak & Lowest Hours</CardTitle>
                  <p className="text-sm text-neutral-600">
                    Optimize staffing and pricing strategies
                  </p>
                </div>
              </div>
              <Button variant="outline" onClick={() => onNavigate("analytics")}>
                View Details
                <ChevronRight size={16} className="ml-1" />
              </Button>
            </div>
          </CardHeader>
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Peak Hours */}
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <div className="size-8 rounded-lg bg-red-100 flex items-center justify-center">
                    <TrendingUp size={16} className="text-red-600" />
                  </div>
                  <h3 className="font-bold text-red-900">Peak Hours</h3>
                  <Badge className="ml-auto bg-red-100 text-red-700">High Demand</Badge>
                </div>

                <div className="space-y-3">
                  {/* Weekday Peak */}
                  <motion.div
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 }}
                    className="p-4 bg-gradient-to-r from-red-50 to-orange-50 border-2 border-red-200 rounded-lg"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-neutral-600">Monday - Friday</span>
                      <Badge variant="outline" className="bg-white">
                        <Activity size={12} className="mr-1" />
                        92% utilization
                      </Badge>
                    </div>
                    <div className="space-y-1">
                      <p className="text-2xl font-bold text-red-900">2:00 PM - 6:00 PM</p>
                      <div className="flex items-center gap-4 text-xs text-neutral-600 mt-2">
                        <span className="flex items-center gap-1">
                          <Users size={12} />
                          67 avg bookings
                        </span>
                        <span className="flex items-center gap-1">
                          <DollarSign size={12} />
                          $2,340 revenue
                        </span>
                      </div>
                    </div>
                  </motion.div>

                  {/* Weekend Peak */}
                  <motion.div
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.25 }}
                    className="p-4 bg-gradient-to-r from-red-50 to-orange-50 border-2 border-red-200 rounded-lg"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-neutral-600">Saturday - Sunday</span>
                      <Badge variant="outline" className="bg-white">
                        <Activity size={12} className="mr-1" />
                        95% utilization
                      </Badge>
                    </div>
                    <div className="space-y-1">
                      <p className="text-2xl font-bold text-red-900">10:00 AM - 4:00 PM</p>
                      <div className="flex items-center gap-4 text-xs text-neutral-600 mt-2">
                        <span className="flex items-center gap-1">
                          <Users size={12} />
                          78 avg bookings
                        </span>
                        <span className="flex items-center gap-1">
                          <DollarSign size={12} />
                          $2,840 revenue
                        </span>
                      </div>
                    </div>
                  </motion.div>
                </div>

                {/* AI Suggestion */}
                <div className="p-3 bg-purple-50 border border-purple-200 rounded-lg">
                  <div className="flex items-start gap-2">
                    <Sparkles size={14} className="text-purple-600 mt-0.5 flex-shrink-0" />
                    <p className="text-xs text-purple-900">
                      <strong>AI Recommendation:</strong> Consider dynamic pricing (+15%) during peak hours to maximize revenue
                    </p>
                  </div>
                </div>
              </div>

              {/* Lowest Hours */}
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <div className="size-8 rounded-lg bg-blue-100 flex items-center justify-center">
                    <TrendingDown size={16} className="text-blue-600" />
                  </div>
                  <h3 className="font-bold text-blue-900">Lowest Hours</h3>
                  <Badge className="ml-auto bg-blue-100 text-blue-700">Low Demand</Badge>
                </div>

                <div className="space-y-3">
                  {/* Weekday Low */}
                  <motion.div
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 }}
                    className="p-4 bg-gradient-to-r from-blue-50 to-cyan-50 border-2 border-blue-200 rounded-lg"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-neutral-600">Monday - Friday</span>
                      <Badge variant="outline" className="bg-white">
                        <Activity size={12} className="mr-1" />
                        28% utilization
                      </Badge>
                    </div>
                    <div className="space-y-1">
                      <p className="text-2xl font-bold text-blue-900">6:00 AM - 9:00 AM</p>
                      <div className="flex items-center gap-4 text-xs text-neutral-600 mt-2">
                        <span className="flex items-center gap-1">
                          <Users size={12} />
                          18 avg bookings
                        </span>
                        <span className="flex items-center gap-1">
                          <DollarSign size={12} />
                          $640 revenue
                        </span>
                      </div>
                    </div>
                  </motion.div>

                  {/* Weekend Low */}
                  <motion.div
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.25 }}
                    className="p-4 bg-gradient-to-r from-blue-50 to-cyan-50 border-2 border-blue-200 rounded-lg"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-neutral-600">Saturday - Sunday</span>
                      <Badge variant="outline" className="bg-white">
                        <Activity size={12} className="mr-1" />
                        35% utilization
                      </Badge>
                    </div>
                    <div className="space-y-1">
                      <p className="text-2xl font-bold text-blue-900">7:00 PM - 9:00 PM</p>
                      <div className="flex items-center gap-4 text-xs text-neutral-600 mt-2">
                        <span className="flex items-center gap-1">
                          <Users size={12} />
                          24 avg bookings
                        </span>
                        <span className="flex items-center gap-1">
                          <DollarSign size={12} />
                          $820 revenue
                        </span>
                      </div>
                    </div>
                  </motion.div>
                </div>

                {/* AI Suggestion */}
                <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                  <div className="flex items-start gap-2">
                    <Sparkles size={14} className="text-green-600 mt-0.5 flex-shrink-0" />
                    <p className="text-xs text-green-900">
                      <strong>AI Recommendation:</strong> Run early bird promotions (-20%) to fill capacity during low-demand hours
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Stats Bar */}
            <Separator className="my-4" />
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center">
                <p className="text-2xl font-bold text-red-600">6:00 PM</p>
                <p className="text-xs text-neutral-600">Busiest Hour</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-blue-600">7:00 AM</p>
                <p className="text-xs text-neutral-600">Quietest Hour</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-amber-600">67%</p>
                <p className="text-xs text-neutral-600">Avg Utilization Gap</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-green-600">$1,700</p>
                <p className="text-xs text-neutral-600">Potential Revenue</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Metrics Grid - Time-scoped */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="grid grid-cols-1 md:grid-cols-3 gap-4"
      >
        {/* Today */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-neutral-600">Today</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 pt-0">
            <div>
              <div className="flex items-baseline gap-2">
                <DollarSign size={20} className="text-green-600" />
                <span className="text-3xl font-bold">${metrics.today.revenue.toLocaleString()}</span>
              </div>
              <div className="flex items-center gap-1 text-sm text-green-600 mt-1">
                <TrendingUp size={14} />
                <span>{metrics.today.trend}</span>
              </div>
            </div>
            <Separator />
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-neutral-600 flex items-center gap-1">
                  <Users size={14} />
                  Customers
                </span>
                <span className="font-semibold">{metrics.today.customers}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-neutral-600 flex items-center gap-1">
                  <Activity size={14} />
                  Capacity
                </span>
                <span className="font-semibold">{metrics.today.capacity}%</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* This Week */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-neutral-600">This Week</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 pt-0">
            <div>
              <div className="flex items-baseline gap-2">
                <DollarSign size={20} className="text-blue-600" />
                <span className="text-3xl font-bold">${metrics.week.revenue.toLocaleString()}</span>
              </div>
              <div className="flex items-center gap-1 text-sm text-blue-600 mt-1">
                <TrendingUp size={14} />
                <span>{metrics.week.trend}</span>
              </div>
            </div>
            <Separator />
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-neutral-600 flex items-center gap-1">
                  <Users size={14} />
                  Customers
                </span>
                <span className="font-semibold">{metrics.week.customers}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-neutral-600 flex items-center gap-1">
                  <Activity size={14} />
                  Avg Capacity
                </span>
                <span className="font-semibold">{metrics.week.capacity}%</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* This Month */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-neutral-600">This Month</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 pt-0">
            <div>
              <div className="flex items-baseline gap-2">
                <DollarSign size={20} className="text-purple-600" />
                <span className="text-3xl font-bold">${metrics.month.revenue.toLocaleString()}</span>
              </div>
              <div className="flex items-center gap-1 text-sm text-purple-600 mt-1">
                <TrendingUp size={14} />
                <span>{metrics.month.trend}</span>
              </div>
            </div>
            <Separator />
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-neutral-600 flex items-center gap-1">
                  <Users size={14} />
                  Customers
                </span>
                <span className="font-semibold">{metrics.month.customers}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-neutral-600 flex items-center gap-1">
                  <Activity size={14} />
                  Avg Capacity
                </span>
                <span className="font-semibold">{metrics.month.capacity}%</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* AI Insights - Top 3 */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="size-10 rounded-lg bg-gradient-to-br from-purple-600 to-blue-600 flex items-center justify-center">
                  <Sparkles size={20} className="text-white" />
                </div>
                <div>
                  <CardTitle className="text-xl">AI Insights</CardTitle>
                  <p className="text-sm text-neutral-600">Top 3 recommendations for today</p>
                </div>
              </div>
              <Button variant="outline" onClick={() => onNavigate("ai-dashboard")}>
                View All Insights
                <ChevronRight size={16} className="ml-1" />
              </Button>
            </div>
          </CardHeader>
          <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {aiInsights.map((insight) => (
              <AIInsightWidget
                key={insight.id}
                insights={[insight]}
                onActionClick={() => onNavigate(insight.actionPage)}
              />
            ))}
          </CardContent>
        </Card>
      </motion.div>

      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              <Button
                variant="outline"
                className="h-auto flex-col gap-2 py-4"
                onClick={() => onNavigate("calendar")}
              >
                <Calendar size={24} />
                <span className="text-sm">New Booking</span>
              </Button>
              <Button
                variant="outline"
                className="h-auto flex-col gap-2 py-4"
                onClick={() => onNavigate("customer-hub")}
              >
                <Users size={24} />
                <span className="text-sm">Add Customer</span>
              </Button>
              <Button
                variant="outline"
                className="h-auto flex-col gap-2 py-4"
                onClick={() => onNavigate("campaigns")}
              >
                <Zap size={24} />
                <span className="text-sm">New Campaign</span>
              </Button>
              <Button
                variant="outline"
                className="h-auto flex-col gap-2 py-4"
                onClick={() => onNavigate("analytics")}
              >
                <BarChart3 size={24} />
                <span className="text-sm">View Reports</span>
              </Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Week at a Glance */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="grid grid-cols-1 lg:grid-cols-2 gap-4"
      >
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 size={20} />
              Weekly Trends
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-48 flex items-center justify-center text-neutral-400">
              {/* Recharts graph buraya gelecek */}
              <p className="text-sm">Revenue & Bookings Chart</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target size={20} />
              Capacity Overview
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-48 flex items-center justify-center text-neutral-400">
              {/* Capacity heat map buraya gelecek */}
              <p className="text-sm">Capacity Heat Map</p>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}