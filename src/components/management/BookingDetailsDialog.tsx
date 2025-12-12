"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { ScrollArea } from "../ui/scroll-area";
import { Separator } from "../ui/separator";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "../ui/dialog";
import {
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
} from "lucide-react";
import { cn } from "../ui/utils";

interface Booking {
  id: string;
  customer: string;
  phone?: string;
  email?: string;
  service: string;
  vehicle?: string;
  datetime: string;
  startTime: string;
  endTime: string;
  duration: number;
  status: "requested" | "reserved" | "in-progress" | "completed" | "cancelled" | "no-show";
  stationId: string;
  price: number;
  reservationCode?: string;
  notes?: string;
  location?: string;
}

interface BookingDetailsDialogProps {
  booking: Booking | null;
  isOpen: boolean;
  onClose: () => void;
  onAction: (bookingId: string, action: "approve" | "reject" | "edit" | "delete" | "call" | "navigate") => void;
}

export function BookingDetailsDialog({
  booking,
  isOpen,
  onClose,
  onAction,
}: BookingDetailsDialogProps) {
  const [isEditMode, setIsEditMode] = useState(false);
  const [editedNotes, setEditedNotes] = useState(booking?.notes || "");

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
      default:
        return {
          color: "bg-neutral-100 text-neutral-700 border-neutral-200",
          icon: Clock,
          label: "Unknown",
        };
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount);
  };

  if (!booking) return null;

  const config = getStatusConfig(booking.status);
  const StatusIcon = config.icon;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto">
        {/* Header with Customer Info */}
        <DialogHeader className="border-b pb-4">
          <div className="flex items-start justify-between">
            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <div className="size-12 rounded-full bg-blue-100 flex items-center justify-center">
                  <User size={24} className="text-blue-600" />
                </div>
                <div>
                  <DialogTitle className="text-xl">{booking.customer}</DialogTitle>
                  <DialogDescription className="flex items-center gap-2 mt-1 text-sm text-neutral-500">
                    <span className="font-mono text-xs">#{booking.reservationCode}</span>
                    <span className="text-neutral-300">|</span>
                    <span className="text-xs">{booking.datetime}</span>
                  </DialogDescription>
                </div>
              </div>
            </div>
            <Badge variant="outline" className={cn("text-xs gap-1", config.color)}>
              <StatusIcon size={12} />
              {config.label}
            </Badge>
          </div>
        </DialogHeader>

        {/* Quick Actions Bar */}
        <div className="flex flex-wrap gap-2 py-4 border-b">
          {booking.phone && (
            <Button
              size="sm"
              variant="outline"
              className="gap-2"
              onClick={() => {
                window.open(`tel:${booking.phone}`);
                onAction(booking.id, "call");
              }}
            >
              <Phone size={14} />
              Call Customer
            </Button>
          )}
          {booking.email && (
            <Button
              size="sm"
              variant="outline"
              className="gap-2"
              onClick={() => window.open(`mailto:${booking.email}`)}
            >
              <Mail size={14} />
              Send Email
            </Button>
          )}
          {booking.location && (
            <Button
              size="sm"
              variant="outline"
              className="gap-2"
              onClick={() => {
                const encodedLocation = encodeURIComponent(booking.location || "");
                window.open(`https://www.google.com/maps/search/?api=1&query=${encodedLocation}`, "_blank");
                onAction(booking.id, "navigate");
              }}
            >
              <Navigation size={14} />
              Navigate
            </Button>
          )}
          <Button
            size="sm"
            variant="outline"
            className="gap-2"
            onClick={() => {
              navigator.clipboard.writeText(booking.reservationCode || "");
            }}
          >
            <Copy size={14} />
            Copy Code
          </Button>
          <Button
            size="sm"
            variant="outline"
            className="gap-2"
          >
            <RefreshCw size={14} />
            Reschedule
          </Button>
        </div>

        {/* Tabbed Content */}
        <Tabs defaultValue="details" className="mt-4">
          <TabsList className="w-full grid grid-cols-3">
            <TabsTrigger value="details">Details</TabsTrigger>
            <TabsTrigger value="timeline">Timeline</TabsTrigger>
            <TabsTrigger value="ai">AI Insights</TabsTrigger>
          </TabsList>

          {/* Details Tab */}
          <TabsContent value="details" className="space-y-4 mt-4">
            <div className="grid grid-cols-2 gap-4">
              {/* Customer Info Card */}
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm flex items-center gap-2">
                    <User size={14} />
                    Customer Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 text-sm">
                  <div className="space-y-1">
                    <Label className="text-xs text-neutral-600">Name</Label>
                    <p className="font-semibold">{booking.customer}</p>
                  </div>
                  {booking.phone && (
                    <div className="space-y-1">
                      <Label className="text-xs text-neutral-600">Phone</Label>
                      <p className="font-mono text-xs">{booking.phone}</p>
                    </div>
                  )}
                  {booking.email && (
                    <div className="space-y-1">
                      <Label className="text-xs text-neutral-600">Email</Label>
                      <p className="text-xs">{booking.email}</p>
                    </div>
                  )}
                  {booking.vehicle && (
                    <div className="space-y-1">
                      <Label className="text-xs text-neutral-600">Vehicle</Label>
                      <div className="flex items-center gap-2">
                        <Car size={14} className="text-neutral-400" />
                        <p className="text-xs">{booking.vehicle}</p>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Service Info Card */}
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm flex items-center gap-2">
                    <Sparkles size={14} />
                    Service Details
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 text-sm">
                  <div className="space-y-1">
                    <Label className="text-xs text-neutral-600">Service</Label>
                    <p className="font-semibold">{booking.service}</p>
                  </div>
                  <div className="space-y-1">
                    <Label className="text-xs text-neutral-600">Duration</Label>
                    <div className="flex items-center gap-2">
                      <Clock size={14} className="text-neutral-400" />
                      <p className="text-xs">{booking.duration} minutes</p>
                    </div>
                  </div>
                  <div className="space-y-1">
                    <Label className="text-xs text-neutral-600">Time Slot</Label>
                    <p className="text-xs">{booking.startTime} - {booking.endTime}</p>
                  </div>
                  <div className="space-y-1">
                    <Label className="text-xs text-neutral-600">Station</Label>
                    <p className="text-xs font-mono">{booking.stationId}</p>
                  </div>
                  {booking.location && (
                    <div className="space-y-1">
                      <Label className="text-xs text-neutral-600">Location</Label>
                      <div className="flex items-center gap-2">
                        <MapPin size={14} className="text-neutral-400" />
                        <p className="text-xs">{booking.location}</p>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Payment Info and Customer Communication - 2 Column Grid */}
            <div className="grid grid-cols-2 gap-4">
              {/* Payment Info */}
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm flex items-center gap-2">
                    <CreditCard size={14} />
                    Payment Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-neutral-600">Service Price</span>
                    <span className="text-lg font-bold">{formatCurrency(booking.price)}</span>
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-neutral-600">Payment Status</span>
                    <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                      Paid
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-neutral-600">Payment Method</span>
                    <span className="font-medium">Credit Card (**** 4242)</span>
                  </div>
                </CardContent>
              </Card>

              {/* Customer Communication */}
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm flex items-center gap-2">
                    <Send size={14} />
                    Customer Communication
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <Button variant="outline" size="sm" className="w-full gap-2 justify-start">
                    <Send size={14} />
                    Send Confirmation SMS
                  </Button>
                  <Button variant="outline" size="sm" className="w-full gap-2 justify-start">
                    <Mail size={14} />
                    Send Confirmation Email
                  </Button>
                  <Button variant="outline" size="sm" className="w-full gap-2 justify-start">
                    <MessageSquare size={14} />
                    Send Reminder
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* Notes */}
            {isEditMode ? (
              <div className="space-y-2">
                <Label htmlFor="notes">Notes</Label>
                <Textarea
                  id="notes"
                  value={editedNotes}
                  onChange={(e) => setEditedNotes(e.target.value)}
                  placeholder="Add booking notes..."
                  rows={4}
                />
              </div>
            ) : (
              booking.notes && (
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-sm flex items-center gap-2">
                      <MessageSquare size={14} />
                      Notes
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-neutral-700">{booking.notes}</p>
                  </CardContent>
                </Card>
              )
            )}

            {/* AI Campaign Suggestions for Requested Bookings */}
            {booking.status === "requested" && (
              <Card className="border-2 border-purple-200 bg-gradient-to-br from-purple-50 to-blue-50">
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm flex items-center gap-2">
                    <Sparkles size={14} className="text-purple-600" />
                    AI Campaign Suggestions
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <p className="text-xs text-neutral-600 mb-3">
                    Approve this booking with a special campaign to increase customer satisfaction and revenue
                  </p>
                  
                  {/* Welcome Campaign */}
                  <div className="p-3 bg-white rounded-lg border border-purple-200">
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <TrendingUp size={14} className="text-green-600" />
                          <p className="text-sm font-semibold">First-Time Customer Discount</p>
                        </div>
                        <p className="text-xs text-neutral-600 mb-2">
                          New customer detected. Offer 15% discount to secure booking and encourage repeat visits.
                        </p>
                        <div className="flex items-center gap-2 text-xs">
                          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                            +78% Conversion
                          </Badge>
                          <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                            ${(booking.price * 0.85).toFixed(2)} Final Price
                          </Badge>
                        </div>
                      </div>
                      <Button 
                        size="sm" 
                        className="bg-purple-600 hover:bg-purple-700 h-8 text-xs"
                        onClick={() => alert("Approved with 15% Welcome Discount!")}
                      >
                        Apply & Approve
                      </Button>
                    </div>
                  </div>

                  {/* Upsell Campaign */}
                  <div className="p-3 bg-white rounded-lg border border-blue-200">
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <Zap size={14} className="text-blue-600" />
                          <p className="text-sm font-semibold">Premium Upgrade Offer</p>
                        </div>
                        <p className="text-xs text-neutral-600 mb-2">
                          Suggest premium package upgrade for only +$20. Includes wax, interior detail, and tire shine.
                        </p>
                        <div className="flex items-center gap-2 text-xs">
                          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                            +42% Accept Rate
                          </Badge>
                          <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200">
                            +${(20).toFixed(2)} Revenue
                          </Badge>
                        </div>
                      </div>
                      <Button 
                        size="sm" 
                        variant="outline"
                        className="border-blue-300 text-blue-700 hover:bg-blue-50 h-8 text-xs"
                        onClick={() => alert("Sent Premium Upgrade Offer!")}
                      >
                        Send Offer
                      </Button>
                    </div>
                  </div>

                  {/* Quick Approve/Reject Actions */}
                  <Separator />
                  <div className="flex gap-2 pt-2">
                    <Button 
                      className="flex-1 gap-2 bg-green-600 hover:bg-green-700"
                      onClick={() => alert("Booking Approved!")}
                    >
                      <CheckCircle size={14} />
                      Approve (No Campaign)
                    </Button>
                    <Button 
                      variant="outline"
                      className="flex-1 gap-2 text-red-600 border-red-300 hover:bg-red-50"
                      onClick={() => {
                        if (confirm("Reject this booking request?")) {
                          alert("Booking Rejected");
                        }
                      }}
                    >
                      <XCircle size={14} />
                      Reject Request
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Change Status Actions - Bottom Button Set */}
            <div className="pt-4 border-t space-y-3">
              <h3 className="text-sm font-medium">Change Status</h3>
              <div className="grid grid-cols-2 gap-2">
                <Button
                  variant="outline"
                  className="gap-2 justify-start"
                  onClick={() => alert("Status changed to Reserved")}
                >
                  <Clock size={14} />
                  Mark as Reserved
                </Button>
                <Button
                  variant="outline"
                  className="gap-2 justify-start"
                  onClick={() => alert("Status changed to In Progress")}
                >
                  <Radio size={14} />
                  Start Service
                </Button>
                <Button
                  variant="outline"
                  className="gap-2 justify-start"
                  onClick={() => alert("Status changed to Completed")}
                >
                  <CheckCircle size={14} />
                  Mark Complete
                </Button>
                <Button
                  variant="outline"
                  className="gap-2 justify-start text-red-600"
                  onClick={() => {
                    if (confirm("Cancel this booking?")) {
                      alert("Booking cancelled");
                    }
                  }}
                >
                  <XCircle size={14} />
                  Cancel Booking
                </Button>
              </div>
            </div>
          </TabsContent>

          {/* Timeline Tab */}
          <TabsContent value="timeline" className="mt-4">
            <ScrollArea className="h-[300px] pr-4">
              <div className="space-y-4">
                {[
                  { time: "2 hours ago", event: "Booking created", icon: CalendarIcon, color: "text-blue-600" },
                  { time: "1 hour ago", event: "Confirmation sent to customer", icon: Send, color: "text-green-600" },
                  { time: "30 min ago", event: "Payment received", icon: CreditCard, color: "text-green-600" },
                  { time: "15 min ago", event: "Reminder SMS sent", icon: MessageSquare, color: "text-purple-600" },
                  { time: "Just now", event: "Customer arrived", icon: CheckCircle, color: "text-green-600" },
                ].map((item, index) => {
                  const ItemIcon = item.icon;
                  return (
                    <div key={index} className="flex gap-3">
                      <div className="size-8 rounded-full bg-neutral-100 flex items-center justify-center flex-shrink-0">
                        <ItemIcon size={14} className={item.color} />
                      </div>
                      <div className="flex-1 pt-1">
                        <p className="text-sm font-medium">{item.event}</p>
                        <p className="text-xs text-neutral-500">{item.time}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </ScrollArea>
          </TabsContent>

          {/* AI Insights Tab */}
          <TabsContent value="ai" className="space-y-4 mt-4">
            <Card className="border-2 border-purple-200 bg-gradient-to-br from-purple-50 to-blue-50">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm flex items-center gap-2">
                  <Sparkles size={14} className="text-purple-600" />
                  AI Recommendations
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="p-3 bg-white rounded-lg border border-purple-200">
                  <div className="flex items-start gap-2">
                    <TrendingUp size={14} className="text-green-600 mt-0.5 flex-shrink-0" />
                    <div className="flex-1">
                      <p className="text-sm font-medium">Upsell Opportunity</p>
                      <p className="text-xs text-neutral-600 mt-1">
                        Customer has booked Basic Wash 3 times. Suggest Premium Wash upgrade (+$20)
                      </p>
                      <Button size="sm" variant="outline" className="mt-2 h-7 text-xs">
                        Send Offer
                      </Button>
                    </div>
                  </div>
                </div>

                <div className="p-3 bg-white rounded-lg border border-blue-200">
                  <div className="flex items-start gap-2">
                    <Zap size={14} className="text-blue-600 mt-0.5 flex-shrink-0" />
                    <div className="flex-1">
                      <p className="text-sm font-medium">Loyalty Program</p>
                      <p className="text-xs text-neutral-600 mt-1">
                        Customer is 1 visit away from VIP tier. Remind them about benefits.
                      </p>
                      <Button size="sm" variant="outline" className="mt-2 h-7 text-xs">
                        Send Reminder
                      </Button>
                    </div>
                  </div>
                </div>

                <div className="p-3 bg-white rounded-lg border border-amber-200">
                  <div className="flex items-start gap-2">
                    <AlertCircle size={14} className="text-amber-600 mt-0.5 flex-shrink-0" />
                    <div className="flex-1">
                      <p className="text-sm font-medium">Scheduling Optimization</p>
                      <p className="text-xs text-neutral-600 mt-1">
                        This time slot has 92% utilization. Consider suggesting off-peak times for next booking.
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}