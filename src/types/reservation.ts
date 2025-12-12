/**
 * LETWASH RESERVATION SYSTEM - TYPE DEFINITIONS
 * ==============================================
 * 
 * Complete type system for reservation-based operations
 * (primarily for Manual Detailing business module)
 */

import { BusinessModule } from './business-modules';
import { CarType } from './vehicle';

/**
 * Reservation Lifecycle States
 */
export type ReservationStatus = 
  | "requested"           // Customer requested, waiting for approval
  | "pending-approval"    // Carwash is reviewing
  | "alternative-offered" // Carwash offered alternative time/date with campaign
  | "reserved"            // Approved, more than 4 hours away
  | "confirmed"           // Confirmed by customer (4h rule), cannot cancel without penalty
  | "checked-in"          // Vehicle handed over (QR/OCR matched)
  | "in-progress"         // Service in progress
  | "completed"           // Carwash completed the service
  | "picked-up"           // Customer picked up vehicle, transaction processed
  | "cancelled"           // Cancelled (before 4h deadline, no penalty)
  | "cancelled-penalty"   // Cancelled (after 4h deadline, with penalty)
  | "no-show"            // Customer didn't show up
  | "rescheduled";        // Rescheduled to different time/date

/**
 * Check-in method for vehicle matching
 */
export type CheckInMethod = "qr" | "ocr" | "manual";

/**
 * Service item in a reservation
 */
export interface ServiceItem {
  id: string;
  name: string;
  duration: number; // minutes
  price: number;
  category?: string;
  description?: string;
}

/**
 * Customer information
 */
export interface ReservationCustomer {
  id: string;
  name: string;
  phone: string;
  email: string;
  vehiclePlate: string;
  vehicleModel?: string;
  vehicleColor?: string;
  carType: CarType; // Added car type
}

/**
 * Alternative offer when carwash suggests different time
 */
export interface AlternativeOffer {
  suggestedDate: Date;
  suggestedStartTime: string;
  suggestedEndTime: string;
  reason: string;
  campaignApplied?: {
    id: string;
    name: string;
    discount: number;
    discountType: "percentage" | "fixed";
  };
  expiresAt: Date; // How long this offer is valid
}

/**
 * Cancellation policy details
 */
export interface CancellationPolicy {
  freeUntil: Date; // 4 hours before scheduled time
  penaltyAmount: number; // Commission amount if cancelled after deadline
  canCancel: boolean; // Current state: can they cancel?
  canReschedule: boolean; // Current state: can they reschedule?
}

/**
 * Timeline tracking for audit and transparency
 */
export interface ReservationTimeline {
  requestedAt: Date;
  reviewedAt?: Date;
  approvedAt?: Date;
  alternativeOfferedAt?: Date;
  confirmedAt?: Date; // When customer confirmed (4h rule)
  confirmationRequestedAt?: Date; // When we sent 4h confirmation request
  checkedInAt?: Date;
  startedAt?: Date;
  completedAt?: Date;
  pickedUpAt?: Date;
  cancelledAt?: Date;
  rescheduledAt?: Date;
}

/**
 * Main Reservation Interface
 */
export interface Reservation {
  id: string;
  reservationCode: string; // e.g., "LW-2024-001234"
  status: ReservationStatus;
  businessModule: BusinessModule; // Should be "manual_detailing" or "mobile" primarily
  stationId: string;
  stationName: string;
  
  // Customer information
  customer: ReservationCustomer;
  
  // Service details
  services: ServiceItem[];
  totalDuration: number; // minutes
  totalPrice: number;
  discountApplied?: number;
  finalPrice: number;
  
  // Mobile Detailing specific (only for businessModule === "mobile")
  serviceLocation?: {
    address: string;
    lat: number;
    lng: number;
    directions?: string; // Google Maps or similar link
    travelDistance?: number; // km
    travelDuration?: number; // minutes
  };
  workerStatus?: "idle" | "en-route" | "on-site" | "returning"; // For mobile workers
  
  // Scheduling
  scheduledDate: string; // YYYY-MM-DD
  scheduledStartTime: string; // HH:mm
  scheduledEndTime: string; // HH:mm
  scheduledStart: Date;
  scheduledEnd: Date;
  
  // Timeline
  timeline: ReservationTimeline;
  
  // Approval workflow
  approvalStatus: "pending" | "approved" | "rejected" | "alternative-offered";
  alternativeOffer?: AlternativeOffer;
  rejectionReason?: string;
  
  // 4-hour confirmation system
  confirmationDeadline: Date; // 4 hours before scheduled time
  confirmationRequested: boolean;
  confirmedByCustomer: boolean;
  
  // Cancellation
  cancellationPolicy: CancellationPolicy;
  cancellationReason?: string;
  
  // Vehicle matching/check-in
  checkInMethod?: CheckInMethod;
  verificationCode: string; // QR code data or verification PIN
  platePhotoUrl?: string; // OCR photo if used
  checkInVerified: boolean;
  
  // Notes
  specialRequests?: string[];
  customerNotes?: string;
  internalNotes?: string;
  
  // Staff assignment
  assignedStaff?: {
    id: string;
    name: string;
    rating: number;
  };
  
  // Metadata
  createdAt: Date;
  updatedAt: Date;
  createdBy?: string; // User or system
}

/**
 * Walk-in transaction (for non-reservation modules)
 */
export interface WalkInTransaction {
  id: string;
  transactionCode: string; // e.g., "TXN-2024-001234"
  businessModule: BusinessModule; // in_bay, tunnel, self_service
  stationId: string;
  stationName: string;
  
  // Timing
  startedAt: Date;
  estimatedEndTime: Date;
  completedAt?: Date;
  duration?: number; // actual duration in minutes
  
  // Service
  service: {
    name: string;
    price: number;
    type: string;
  };
  
  // Payment
  paymentMethod?: "cash" | "card" | "app" | "token" | "coin";
  paymentStatus: "pending" | "completed" | "failed";
  amount: number;
  
  // Status
  status: "active" | "completed" | "cancelled";
  
  // Metadata
  createdAt: Date;
  completedAt?: Date;
}

/**
 * Time slot for reservation calendar
 */
export interface TimeSlot {
  startTime: string; // HH:mm
  endTime: string; // HH:mm
  available: boolean;
  reservation?: Reservation;
  capacity: number; // how many can be served in this slot
  booked: number; // how many are booked
}

/**
 * Daily schedule for a station
 */
export interface DailySchedule {
  date: string; // YYYY-MM-DD
  stationId: string;
  stationName: string;
  businessModule: BusinessModule;
  operationModel: "walk-in" | "reservation";
  
  // For reservation-based
  timeSlots?: TimeSlot[];
  reservations?: Reservation[];
  
  // For walk-in based
  transactions?: WalkInTransaction[];
  totalTransactions?: number;
  totalRevenue?: number;
  
  // Capacity
  totalCapacity: number;
  usedCapacity: number;
  utilizationRate: number; // percentage
}

/**
 * Reservation statistics
 */
export interface ReservationStats {
  total: number;
  byStatus: Record<ReservationStatus, number>;
  avgDuration: number;
  avgPrice: number;
  totalRevenue: number;
  confirmationRate: number; // percentage who confirmed 4h before
  noShowRate: number; // percentage who didn't show up
  cancellationRate: number; // percentage who cancelled
}

/**
 * Reservation notification triggers
 */
export type ReservationNotificationType =
  | "request-received"        // To carwash: New request
  | "approved"                // To customer: Approved
  | "alternative-offered"     // To customer: Alternative suggested
  | "confirmation-required"   // To customer: 4h before, confirm
  | "confirmed"               // To carwash: Customer confirmed
  | "reminder-30min"          // To customer: 30min before
  | "checked-in"              // To both: Check-in successful
  | "in-progress"             // To customer: Service started
  | "completed"               // To customer: Ready for pickup
  | "picked-up"               // To both: Transaction completed
  | "cancelled"               // To both: Cancelled
  | "no-show";                // To carwash: Customer no-show

export interface ReservationNotification {
  id: string;
  reservationId: string;
  type: ReservationNotificationType;
  recipient: "customer" | "carwash" | "both";
  title: string;
  message: string;
  sentAt: Date;
  readAt?: Date;
  actionRequired?: boolean;
  actionUrl?: string;
}

/**
 * Helper functions
 */

/**
 * Calculate confirmation deadline (4 hours before scheduled time)
 */
export function calculateConfirmationDeadline(scheduledStart: Date): Date {
  const deadline = new Date(scheduledStart);
  deadline.setHours(deadline.getHours() - 4);
  return deadline;
}

/**
 * Check if reservation can be cancelled without penalty
 */
export function canCancelWithoutPenalty(confirmationDeadline: Date): boolean {
  return new Date() < confirmationDeadline;
}

/**
 * Calculate penalty amount (e.g., 20% of total price)
 */
export function calculateCancellationPenalty(totalPrice: number, penaltyRate: number = 0.2): number {
  return totalPrice * penaltyRate;
}

/**
 * Generate reservation code
 */
export function generateReservationCode(): string {
  const year = new Date().getFullYear();
  const random = Math.floor(Math.random() * 1000000).toString().padStart(6, '0');
  return `LW-${year}-${random}`;
}

/**
 * Generate verification code for QR
 */
export function generateVerificationCode(): string {
  return Math.random().toString(36).substring(2, 10).toUpperCase();
}

/**
 * Get status badge color
 */
export function getReservationStatusColor(status: ReservationStatus): string {
  const colorMap: Record<ReservationStatus, string> = {
    "requested": "bg-yellow-100 text-yellow-700 border-yellow-200",
    "pending-approval": "bg-amber-100 text-amber-700 border-amber-200",
    "alternative-offered": "bg-purple-100 text-purple-700 border-purple-200",
    "reserved": "bg-blue-100 text-blue-700 border-blue-200",
    "confirmed": "bg-green-100 text-green-700 border-green-200",
    "checked-in": "bg-cyan-100 text-cyan-700 border-cyan-200",
    "in-progress": "bg-indigo-100 text-indigo-700 border-indigo-200",
    "completed": "bg-emerald-100 text-emerald-700 border-emerald-200",
    "picked-up": "bg-teal-100 text-teal-700 border-teal-200",
    "cancelled": "bg-neutral-100 text-neutral-700 border-neutral-200",
    "cancelled-penalty": "bg-orange-100 text-orange-700 border-orange-200",
    "no-show": "bg-red-100 text-red-700 border-red-200",
    "rescheduled": "bg-violet-100 text-violet-700 border-violet-200",
  };
  
  return colorMap[status] || "bg-neutral-100 text-neutral-700 border-neutral-200";
}

/**
 * Get status label
 */
export function getReservationStatusLabel(status: ReservationStatus): string {
  const labelMap: Record<ReservationStatus, string> = {
    "requested": "Requested",
    "pending-approval": "Pending Approval",
    "alternative-offered": "Alternative Offered",
    "reserved": "Reserved",
    "confirmed": "Confirmed",
    "checked-in": "Checked In",
    "in-progress": "In Progress",
    "completed": "Completed",
    "picked-up": "Picked Up",
    "cancelled": "Cancelled",
    "cancelled-penalty": "Cancelled (Penalty)",
    "no-show": "No Show",
    "rescheduled": "Rescheduled",
  };
  
  return labelMap[status] || status;
}

/**
 * Check if status allows modification
 */
export function canModifyReservation(status: ReservationStatus): boolean {
  return ["requested", "pending-approval", "alternative-offered", "reserved"].includes(status);
}

/**
 * Get next possible statuses for workflow
 */
export function getNextPossibleStatuses(currentStatus: ReservationStatus): ReservationStatus[] {
  const transitions: Record<ReservationStatus, ReservationStatus[]> = {
    "requested": ["pending-approval", "cancelled"],
    "pending-approval": ["reserved", "alternative-offered", "cancelled"],
    "alternative-offered": ["reserved", "cancelled"],
    "reserved": ["confirmed", "cancelled", "rescheduled"],
    "confirmed": ["checked-in", "no-show", "cancelled-penalty"],
    "checked-in": ["in-progress"],
    "in-progress": ["completed"],
    "completed": ["picked-up"],
    "picked-up": [],
    "cancelled": [],
    "cancelled-penalty": [],
    "no-show": [],
    "rescheduled": ["requested"],
  };
  
  return transitions[currentStatus] || [];
}