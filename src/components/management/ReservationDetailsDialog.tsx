/**
 * RESERVATION DETAILS DIALOG
 * ==========================
 * 
 * Comprehensive view and management of a single reservation
 * Includes timeline, status updates, customer info, and actions
 */

"use client";

import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "../ui/dialog";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Separator } from "../ui/separator";
import { ScrollArea } from "../ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import {
  User,
  Phone,
  Mail,
  Car,
  Calendar,
  Clock,
  DollarSign,
  MapPin,
  Shield,
  QrCode,
  Camera,
  FileText,
  CheckCircle,
  XCircle,
  RefreshCw,
  AlertTriangle,
  ExternalLink,
  Copy,
  Send,
} from "lucide-react";
import { cn } from "../ui/utils";
import { motion } from "motion/react";
import { Reservation, canModifyReservation, getNextPossibleStatuses } from "../../types/reservation";
import { ReservationStatusBadge, ReservationTimelineIndicator } from "./ReservationStatusBadge";
import { toast } from "sonner";

interface ReservationDetailsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  reservation: Reservation | null;
  onStatusChange?: (reservationId: string, newStatus: any) => void;
  onApprove?: (reservationId: string) => void;
  onReject?: (reservationId: string, reason: string) => void;
  onOfferAlternative?: (reservationId: string) => void;
  onCheckIn?: (reservationId: string, method: "qr" | "ocr" | "manual") => void;
  onComplete?: (reservationId: string) => void;
  onPickup?: (reservationId: string) => void;
}

export function ReservationDetailsDialog({
  open,
  onOpenChange,
  reservation,
  onStatusChange,
  onApprove,
  onReject,
  onOfferAlternative,
  onCheckIn,
  onComplete,
  onPickup,
}: ReservationDetailsDialogProps) {
  const [activeTab, setActiveTab] = useState("details");
  
  if (!reservation) return null;
  
  const canModify = canModifyReservation(reservation.status);
  const nextStatuses = getNextPossibleStatuses(reservation.status);
  
  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }).format(date);
  };
  
  const formatTime = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      hour: '2-digit',
      minute: '2-digit',
    }).format(date);
  };
  
  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    toast.success(`${label} copied to clipboard`);
  };
  
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] p-0">
        <DialogHeader className="px-6 pt-6 pb-4">
          <div className="flex items-center justify-between">
            <div>
              <DialogTitle className="text-2xl">Reservation Details</DialogTitle>
              <DialogDescription className="flex items-center gap-2 mt-2">
                <code className="px-2 py-1 bg-neutral-100 rounded text-sm font-mono">
                  {reservation.reservationCode}
                </code>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => copyToClipboard(reservation.reservationCode, "Reservation code")}
                >
                  <Copy size={14} />
                </Button>
              </DialogDescription>
            </div>
            <ReservationStatusBadge status={reservation.status} size="lg" />
          </div>
        </DialogHeader>
        
        <Separator />
        
        <ScrollArea className="max-h-[calc(90vh-120px)]">
          <div className="px-6 py-4">
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="details">Details</TabsTrigger>
                <TabsTrigger value="timeline">Timeline</TabsTrigger>
                <TabsTrigger value="customer">Customer</TabsTrigger>
              </TabsList>
              
              {/* DETAILS TAB */}
              <TabsContent value="details" className="space-y-6 mt-6">
                {/* Timeline Indicator */}
                <div>
                  <h3 className="text-sm font-medium text-neutral-600 mb-3">Progress</h3>
                  <ReservationTimelineIndicator status={reservation.status} />
                </div>
                
                <Separator />
                
                {/* Scheduling Info */}
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-sm font-medium text-neutral-600 mb-3">Scheduled Date & Time</h3>
                    <div className="space-y-3">
                      <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg border border-blue-200">
                        <Calendar size={20} className="text-blue-600" />
                        <div>
                          <p className="text-sm text-blue-900 font-medium">
                            {formatDate(reservation.scheduledStart)}
                          </p>
                          <p className="text-xs text-blue-600">
                            {reservation.scheduledStartTime} - {reservation.scheduledEndTime}
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-3 p-3 bg-neutral-50 rounded-lg border">
                        <Clock size={20} className="text-neutral-600" />
                        <div>
                          <p className="text-sm font-medium">Duration</p>
                          <p className="text-xs text-neutral-600">{reservation.totalDuration} minutes</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-sm font-medium text-neutral-600 mb-3">Location</h3>
                    <div className="space-y-3">
                      <div className="flex items-center gap-3 p-3 bg-purple-50 rounded-lg border border-purple-200">
                        <MapPin size={20} className="text-purple-600" />
                        <div>
                          <p className="text-sm text-purple-900 font-medium">
                            {reservation.stationName}
                          </p>
                          <p className="text-xs text-purple-600">Manual Detailing Station</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-3 p-3 bg-neutral-50 rounded-lg border">
                        <DollarSign size={20} className="text-neutral-600" />
                        <div>
                          <p className="text-sm font-medium">Total Price</p>
                          <p className="text-xs text-neutral-600">
                            ${reservation.finalPrice.toFixed(2)}
                            {reservation.discountApplied && (
                              <span className="ml-2 text-green-600">
                                (${reservation.discountApplied.toFixed(2)} discount)
                              </span>
                            )}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <Separator />
                
                {/* Services */}
                <div>
                  <h3 className="text-sm font-medium text-neutral-600 mb-3">Services</h3>
                  <div className="space-y-2">
                    {reservation.services.map((service) => (
                      <div
                        key={service.id}
                        className="flex items-center justify-between p-3 bg-neutral-50 rounded-lg border"
                      >
                        <div>
                          <p className="font-medium">{service.name}</p>
                          <p className="text-sm text-neutral-600">{service.description}</p>
                          <p className="text-xs text-neutral-500 mt-1">
                            {service.duration} minutes • {service.category}
                          </p>
                        </div>
                        <p className="font-semibold">${service.price.toFixed(2)}</p>
                      </div>
                    ))}
                  </div>
                </div>
                
                {/* Cancellation Policy */}
                {reservation.cancellationPolicy.canCancel && (
                  <div className="p-4 bg-amber-50 rounded-lg border border-amber-200">
                    <div className="flex items-start gap-3">
                      <AlertTriangle size={20} className="text-amber-600 mt-0.5" />
                      <div className="flex-1">
                        <p className="font-medium text-amber-900">Cancellation Policy</p>
                        <p className="text-sm text-amber-700 mt-1">
                          Free cancellation until {formatTime(reservation.cancellationPolicy.freeUntil)} on{" "}
                          {formatDate(reservation.cancellationPolicy.freeUntil)}
                        </p>
                        <p className="text-xs text-amber-600 mt-1">
                          After this time, a ${reservation.cancellationPolicy.penaltyAmount.toFixed(2)} penalty will apply
                        </p>
                      </div>
                    </div>
                  </div>
                )}
                
                {/* Special Requests */}
                {reservation.specialRequests && reservation.specialRequests.length > 0 && (
                  <div>
                    <h3 className="text-sm font-medium text-neutral-600 mb-3">Special Requests</h3>
                    <div className="space-y-2">
                      {reservation.specialRequests.map((request, index) => (
                        <div key={index} className="flex items-start gap-2 p-2 bg-neutral-50 rounded border">
                          <FileText size={16} className="text-neutral-600 mt-0.5" />
                          <p className="text-sm">{request}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </TabsContent>
              
              {/* TIMELINE TAB */}
              <TabsContent value="timeline" className="space-y-4 mt-6">
                <div className="space-y-3">
                  {reservation.timeline.requestedAt && (
                    <TimelineEvent
                      icon={Clock}
                      title="Reservation Requested"
                      time={reservation.timeline.requestedAt}
                      color="blue"
                    />
                  )}
                  
                  {reservation.timeline.approvedAt && (
                    <TimelineEvent
                      icon={CheckCircle}
                      title="Approved by Carwash"
                      time={reservation.timeline.approvedAt}
                      color="green"
                    />
                  )}
                  
                  {reservation.timeline.confirmationRequestedAt && (
                    <TimelineEvent
                      icon={Send}
                      title="Confirmation Request Sent"
                      time={reservation.timeline.confirmationRequestedAt}
                      color="purple"
                    />
                  )}
                  
                  {reservation.timeline.confirmedAt && (
                    <TimelineEvent
                      icon={CheckCircle}
                      title="Confirmed by Customer"
                      time={reservation.timeline.confirmedAt}
                      color="green"
                    />
                  )}
                  
                  {reservation.timeline.checkedInAt && (
                    <TimelineEvent
                      icon={QrCode}
                      title="Customer Checked In"
                      time={reservation.timeline.checkedInAt}
                      color="cyan"
                    />
                  )}
                  
                  {reservation.timeline.startedAt && (
                    <TimelineEvent
                      icon={Clock}
                      title="Service Started"
                      time={reservation.timeline.startedAt}
                      color="blue"
                    />
                  )}
                  
                  {reservation.timeline.completedAt && (
                    <TimelineEvent
                      icon={CheckCircle}
                      title="Service Completed"
                      time={reservation.timeline.completedAt}
                      color="green"
                    />
                  )}
                  
                  {reservation.timeline.pickedUpAt && (
                    <TimelineEvent
                      icon={CheckCircle}
                      title="Vehicle Picked Up"
                      time={reservation.timeline.pickedUpAt}
                      color="emerald"
                    />
                  )}
                </div>
              </TabsContent>
              
              {/* CUSTOMER TAB */}
              <TabsContent value="customer" className="space-y-6 mt-6">
                <div className="grid grid-cols-2 gap-4">
                  <InfoCard icon={User} label="Customer Name" value={reservation.customer.name} />
                  <InfoCard icon={Phone} label="Phone" value={reservation.customer.phone} copyable />
                  <InfoCard icon={Mail} label="Email" value={reservation.customer.email} copyable />
                  <InfoCard icon={Car} label="Vehicle Plate" value={reservation.customer.vehiclePlate} />
                </div>
                
                {reservation.customer.vehicleModel && (
                  <div className="p-4 bg-neutral-50 rounded-lg border">
                    <div className="flex items-center gap-3">
                      <Car size={24} className="text-neutral-600" />
                      <div>
                        <p className="text-sm font-medium">Vehicle Information</p>
                        <p className="text-sm text-neutral-600">
                          {reservation.customer.vehicleModel} • {reservation.customer.vehicleColor}
                        </p>
                      </div>
                    </div>
                  </div>
                )}
                
                {/* Verification */}
                <div>
                  <h3 className="text-sm font-medium text-neutral-600 mb-3">Verification</h3>
                  <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Shield size={20} className="text-green-600" />
                        <div>
                          <p className="font-medium text-green-900">Verification Code</p>
                          <code className="text-lg font-mono text-green-700">
                            {reservation.verificationCode}
                          </code>
                        </div>
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => copyToClipboard(reservation.verificationCode, "Verification code")}
                      >
                        <Copy size={14} className="mr-2" />
                        Copy
                      </Button>
                    </div>
                  </div>
                </div>
                
                {/* Notes */}
                {reservation.customerNotes && (
                  <div>
                    <h3 className="text-sm font-medium text-neutral-600 mb-3">Customer Notes</h3>
                    <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
                      <p className="text-sm text-blue-900">{reservation.customerNotes}</p>
                    </div>
                  </div>
                )}
                
                {reservation.internalNotes && (
                  <div>
                    <h3 className="text-sm font-medium text-neutral-600 mb-3">Internal Notes</h3>
                    <div className="p-3 bg-amber-50 rounded-lg border border-amber-200">
                      <p className="text-sm text-amber-900">{reservation.internalNotes}</p>
                    </div>
                  </div>
                )}
              </TabsContent>
              
              {/* ACTIONS TAB */}
              <TabsContent value="actions" className="space-y-4 mt-6">
                {reservation.status === "pending-approval" && (
                  <div className="space-y-3">
                    <h3 className="font-medium">Approval Actions</h3>
                    <div className="grid grid-cols-2 gap-3">
                      <Button
                        onClick={() => onApprove?.(reservation.id)}
                        className="bg-green-600 hover:bg-green-700"
                      >
                        <CheckCircle size={16} className="mr-2" />
                        Approve Reservation
                      </Button>
                      <Button
                        variant="outline"
                        onClick={() => onOfferAlternative?.(reservation.id)}
                        className="border-purple-300 text-purple-700 hover:bg-purple-50"
                      >
                        <RefreshCw size={16} className="mr-2" />
                        Suggest Alternative
                      </Button>
                    </div>
                    <Button
                      variant="destructive"
                      onClick={() => onReject?.(reservation.id, "No capacity available")}
                      className="w-full"
                    >
                      <XCircle size={16} className="mr-2" />
                      Reject Reservation
                    </Button>
                  </div>
                )}
                
                {reservation.status === "confirmed" && !reservation.checkInVerified && (
                  <div className="space-y-3">
                    <h3 className="font-medium">Check-In Methods</h3>
                    <div className="grid grid-cols-3 gap-3">
                      <Button
                        variant="outline"
                        onClick={() => onCheckIn?.(reservation.id, "qr")}
                        className="flex-col h-auto py-4"
                      >
                        <QrCode size={24} className="mb-2" />
                        QR Code
                      </Button>
                      <Button
                        variant="outline"
                        onClick={() => onCheckIn?.(reservation.id, "ocr")}
                        className="flex-col h-auto py-4"
                      >
                        <Camera size={24} className="mb-2" />
                        Plate OCR
                      </Button>
                      <Button
                        variant="outline"
                        onClick={() => onCheckIn?.(reservation.id, "manual")}
                        className="flex-col h-auto py-4"
                      >
                        <User size={24} className="mb-2" />
                        Manual
                      </Button>
                    </div>
                  </div>
                )}
                
                {reservation.status === "in-progress" && (
                  <Button
                    onClick={() => onComplete?.(reservation.id)}
                    className="w-full bg-green-600 hover:bg-green-700"
                  >
                    <CheckCircle size={16} className="mr-2" />
                    Mark Service as Completed
                  </Button>
                )}
                
                {reservation.status === "completed" && (
                  <Button
                    onClick={() => onPickup?.(reservation.id)}
                    className="w-full bg-blue-600 hover:bg-blue-700"
                  >
                    <CheckCircle size={16} className="mr-2" />
                    Customer Picked Up Vehicle
                  </Button>
                )}
                
                {canModify && (
                  <div className="pt-4 border-t">
                    <h3 className="font-medium mb-3">Quick Actions</h3>
                    <div className="space-y-2">
                      <Button variant="outline" size="sm" className="w-full justify-start">
                        <Phone size={14} className="mr-2" />
                        Call Customer
                      </Button>
                      <Button variant="outline" size="sm" className="w-full justify-start">
                        <Mail size={14} className="mr-2" />
                        Send Email
                      </Button>
                      <Button variant="outline" size="sm" className="w-full justify-start">
                        <Calendar size={14} className="mr-2" />
                        Reschedule
                      </Button>
                    </div>
                  </div>
                )}
              </TabsContent>
            </Tabs>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}

// Helper Components
function TimelineEvent({
  icon: Icon,
  title,
  time,
  color,
}: {
  icon: any;
  title: string;
  time: Date;
  color: string;
}) {
  const colorClasses: Record<string, string> = {
    blue: "bg-blue-100 text-blue-700 border-blue-200",
    green: "bg-green-100 text-green-700 border-green-200",
    purple: "bg-purple-100 text-purple-700 border-purple-200",
    cyan: "bg-cyan-100 text-cyan-700 border-cyan-200",
    emerald: "bg-emerald-100 text-emerald-700 border-emerald-200",
  };
  
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      className={cn("flex items-center gap-3 p-3 rounded-lg border", colorClasses[color])}
    >
      <Icon size={20} />
      <div className="flex-1">
        <p className="font-medium">{title}</p>
        <p className="text-xs opacity-75">
          {new Intl.DateTimeFormat('en-US', {
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
          }).format(time)}
        </p>
      </div>
    </motion.div>
  );
}

function InfoCard({
  icon: Icon,
  label,
  value,
  copyable = false,
}: {
  icon: any;
  label: string;
  value: string;
  copyable?: boolean;
}) {
  return (
    <div className="p-3 bg-neutral-50 rounded-lg border">
      <div className="flex items-start justify-between">
        <div className="flex items-start gap-2 flex-1">
          <Icon size={16} className="text-neutral-600 mt-0.5" />
          <div>
            <p className="text-xs text-neutral-600">{label}</p>
            <p className="font-medium">{value}</p>
          </div>
        </div>
        {copyable && (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => {
              navigator.clipboard.writeText(value);
              toast.success(`${label} copied`);
            }}
          >
            <Copy size={12} />
          </Button>
        )}
      </div>
    </div>
  );
}