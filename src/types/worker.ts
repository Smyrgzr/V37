/**
 * LETWASH WORKER & CAPACITY MANAGEMENT - TYPE DEFINITIONS
 * ========================================================
 * 
 * Complete type system for worker management and capacity planning
 */

import { BusinessModule } from './business-modules';

/**
 * Worker Role Types
 */
export type WorkerRole = 
  | "driver"              // Only drives (pick-up/drop-off)
  | "detailer"            // Only performs detailing work
  | "mobile_detailer"     // Mobile detailing specialist
  | "both"                // Can both drive and detail
  | "technician"          // General car wash technician
  | "manager"             // Branch manager
  | "customer_service";   // Customer service representative

/**
 * Worker Status
 */
export type WorkerStatus = 
  | "available"           // Available for assignment
  | "busy"                // Currently on a job
  | "on-break"            // On break
  | "off-duty"            // Not working today
  | "on-leave"            // On extended leave
  | "inactive";           // No longer employed

/**
 * Shift definition
 */
export interface Shift {
  id: string;
  workerId: string;
  date: string; // YYYY-MM-DD
  startTime: string; // HH:mm
  endTime: string; // HH:mm
  breakTime?: number; // minutes
  branchId: string;
  status: "scheduled" | "active" | "completed" | "cancelled";
  actualStartTime?: string;
  actualEndTime?: string;
}

/**
 * Worker specialization for specific business modules
 */
export interface WorkerSpecialization {
  module: BusinessModule;
  level: "beginner" | "intermediate" | "expert";
  certifiedAt?: Date;
  hoursTrained?: number;
}

/**
 * Worker assignment (current/active job)
 */
export interface WorkerAssignment {
  id: string;
  workerId: string;
  reservationId?: string;
  transactionId?: string;
  type: "reservation" | "walk-in" | "pickup" | "dropoff" | "mobile";
  status: "assigned" | "en-route" | "on-site" | "in-progress" | "completed";
  assignedAt: Date;
  startedAt?: Date;
  completedAt?: Date;
  estimatedDuration: number; // minutes
  location?: {
    address: string;
    lat: number;
    lng: number;
  };
  // For mobile/pickup-dropoff
  travelDistance?: number; // km
  travelDuration?: number; // minutes
}

/**
 * Worker Performance Metrics
 */
export interface WorkerPerformance {
  workerId: string;
  period: "daily" | "weekly" | "monthly" | "yearly";
  periodStart: Date;
  periodEnd: Date;
  
  // Job metrics
  totalJobs: number;
  completedJobs: number;
  cancelledJobs: number;
  completionRate: number; // percentage
  
  // Time metrics
  hoursWorked: number;
  overtimeHours: number;
  avgJobDuration: number; // minutes
  
  // Quality metrics
  customerRating: number; // 0-5
  totalRatings: number;
  complaints: number;
  compliments: number;
  
  // Attendance
  scheduledShifts: number;
  completedShifts: number;
  lateArrivals: number;
  earlyDepartures: number;
  attendanceRate: number; // percentage
  
  // Revenue contribution
  totalRevenue: number;
  avgRevenuePerJob: number;
}

/**
 * Main Worker Interface
 */
export interface Worker {
  id: string;
  name: string;
  email: string;
  phone: string;
  avatar?: string;
  
  // Role and capabilities
  role: WorkerRole;
  specializations: WorkerSpecialization[];
  canDrive: boolean;
  canDetail: boolean;
  
  // Employment details
  branchId: string;
  branchName: string;
  employeeId: string; // Company employee ID
  joinDate: Date;
  status: WorkerStatus;
  
  // Current state
  currentStatus: WorkerStatus;
  currentAssignments: WorkerAssignment[];
  maxConcurrentJobs: number; // Usually 1, but could be more for some roles
  
  // Schedule
  weeklySchedule?: WeeklySchedule;
  currentShift?: Shift;
  upcomingShifts: Shift[];
  
  // Performance
  performance?: WorkerPerformance;
  overallRating: number;
  totalJobsCompleted: number;
  
  // Preferences
  preferredModules?: BusinessModule[];
  maxDistanceKm?: number; // For mobile workers
  
  // Metadata
  createdAt: Date;
  updatedAt: Date;
  lastActiveAt?: Date;
}

/**
 * Weekly schedule template
 */
export interface WeeklySchedule {
  workerId: string;
  monday?: DaySchedule;
  tuesday?: DaySchedule;
  wednesday?: DaySchedule;
  thursday?: DaySchedule;
  friday?: DaySchedule;
  saturday?: DaySchedule;
  sunday?: DaySchedule;
}

/**
 * Day schedule template
 */
export interface DaySchedule {
  isWorkingDay: boolean;
  startTime?: string; // HH:mm
  endTime?: string; // HH:mm
  breakStart?: string;
  breakEnd?: string;
  branchId?: string;
}

/**
 * Capacity resource types
 */
export type CapacityResourceType = 
  | "worker"              // Human resource
  | "bay"                 // Physical bay (In-Bay, Self-Service)
  | "tunnel"              // Tunnel wash
  | "detailing_station"   // Detailing bay
  | "parking_spot";       // Parking for waiting vehicles

/**
 * Capacity slot - represents availability at a specific time
 */
export interface CapacitySlot {
  id: string;
  branchId: string;
  date: string; // YYYY-MM-DD
  startTime: string; // HH:mm
  endTime: string; // HH:mm
  
  // Resource type
  resourceType: CapacityResourceType;
  resourceId?: string; // Specific worker ID, bay number, etc.
  
  // Business module
  businessModule: BusinessModule;
  serviceType?: string; // Specific service within module
  
  // Capacity
  totalCapacity: number;
  bookedCapacity: number;
  availableCapacity: number;
  
  // Reservations/assignments in this slot
  reservations: string[]; // reservation IDs
  assignments: string[]; // assignment IDs
  
  // Status
  isAvailable: boolean;
  isBlocked: boolean;
  blockReason?: string;
  
  // Worker-specific (when resourceType === "worker")
  workerStatus?: WorkerStatus;
  workerLocation?: {
    lat: number;
    lng: number;
    lastUpdated: Date;
  };
}

/**
 * Capacity calculation for a specific time period
 */
export interface CapacityCalculation {
  branchId: string;
  businessModule: BusinessModule;
  date: string;
  startTime: string;
  endTime: string;
  
  // Resource breakdown
  resources: {
    workers: {
      total: number;
      available: number;
      busy: number;
      onBreak: number;
      ids: string[];
    };
    physicalResources?: {
      type: CapacityResourceType;
      total: number;
      available: number;
      inUse: number;
    };
  };
  
  // Capacity metrics
  totalCapacity: number;
  usedCapacity: number;
  availableCapacity: number;
  utilizationRate: number; // percentage
  
  // Time slots
  slots: CapacitySlot[];
  
  // Recommendations
  canAcceptReservation: boolean;
  suggestedAlternatives?: {
    time: string;
    availableCapacity: number;
  }[];
}

/**
 * Capacity constraint for planning
 */
export interface CapacityConstraint {
  branchId: string;
  businessModule: BusinessModule;
  
  // Worker requirements
  minWorkers: number;
  maxWorkers: number;
  requiredRoles: WorkerRole[];
  
  // Physical resource requirements
  requiredResources?: {
    type: CapacityResourceType;
    quantity: number;
  }[];
  
  // Time requirements
  minDuration: number; // minutes
  maxDuration: number; // minutes
  bufferTime: number; // minutes between jobs
  
  // Mobile-specific
  maxTravelDistance?: number; // km
  travelTimePerKm?: number; // minutes
}

/**
 * Worker availability query result
 */
export interface WorkerAvailability {
  worker: Worker;
  isAvailable: boolean;
  reason?: string;
  currentAssignment?: WorkerAssignment;
  nextAvailableAt?: Date;
  conflictingReservations?: string[];
}

/**
 * Capacity planning recommendation
 */
export interface CapacityRecommendation {
  type: "hire" | "shift_adjustment" | "equipment" | "optimization";
  priority: "low" | "medium" | "high" | "critical";
  title: string;
  description: string;
  impact: string;
  estimatedCost?: number;
  expectedBenefit?: string;
  
  // Supporting data
  currentUtilization: number;
  projectedDemand: number;
  gap: number;
  
  // Timeline
  recommendedBy: Date;
  implementBy?: Date;
}

/**
 * Shift planning template
 */
export interface ShiftTemplate {
  id: string;
  name: string;
  branchId: string;
  businessModule?: BusinessModule;
  
  // Timing
  startTime: string;
  endTime: string;
  duration: number; // minutes
  breakDuration: number;
  
  // Requirements
  requiredWorkers: number;
  requiredRoles: WorkerRole[];
  
  // Days
  daysOfWeek: number[]; // 0-6 (Sunday-Saturday)
  
  // Status
  isActive: boolean;
}

/**
 * Helper Functions
 */

/**
 * Check if worker can handle a specific business module
 */
export function canWorkerHandleModule(worker: Worker, module: BusinessModule): boolean {
  return worker.specializations.some(spec => spec.module === module);
}

/**
 * Calculate worker utilization rate
 */
export function calculateWorkerUtilization(
  hoursWorked: number,
  scheduledHours: number
): number {
  if (scheduledHours === 0) return 0;
  return Math.round((hoursWorked / scheduledHours) * 100);
}

/**
 * Get worker availability for a specific time slot
 */
export function isWorkerAvailable(
  worker: Worker,
  date: string,
  startTime: string,
  endTime: string
): boolean {
  // Check status
  if (worker.status !== "available" && worker.status !== "busy") {
    return false;
  }
  
  // Check if working on this day
  const dayOfWeek = new Date(date).getDay();
  const dayName = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"][dayOfWeek] as keyof WeeklySchedule;
  const daySchedule = worker.weeklySchedule?.[dayName];
  
  if (!daySchedule || !daySchedule.isWorkingDay) {
    return false;
  }
  
  // Check if time is within working hours
  if (daySchedule.startTime && daySchedule.endTime) {
    if (startTime < daySchedule.startTime || endTime > daySchedule.endTime) {
      return false;
    }
  }
  
  // Check current assignments
  if (worker.currentAssignments.length >= worker.maxConcurrentJobs) {
    return false;
  }
  
  return true;
}

/**
 * Calculate travel time based on distance
 */
export function calculateTravelTime(distanceKm: number, avgSpeedKmh: number = 40): number {
  return Math.ceil((distanceKm / avgSpeedKmh) * 60); // minutes
}

/**
 * Estimate service duration including travel for mobile jobs
 */
export function estimateMobileJobDuration(
  serviceDuration: number,
  travelDistance: number,
  includeReturnTrip: boolean = true
): number {
  const travelTime = calculateTravelTime(travelDistance);
  const totalTravelTime = includeReturnTrip ? travelTime * 2 : travelTime;
  return serviceDuration + totalTravelTime;
}

/**
 * Get worker role display name
 */
export function getWorkerRoleLabel(role: WorkerRole): string {
  const labels: Record<WorkerRole, string> = {
    driver: "Driver",
    detailer: "Detailer",
    mobile_detailer: "Mobile Detailer",
    both: "Driver & Detailer",
    technician: "Technician",
    manager: "Manager",
    customer_service: "Customer Service"
  };
  return labels[role];
}

/**
 * Get worker status color
 */
export function getWorkerStatusColor(status: WorkerStatus): string {
  const colors: Record<WorkerStatus, string> = {
    available: "bg-green-100 text-green-700 border-green-200",
    busy: "bg-yellow-100 text-yellow-700 border-yellow-200",
    "on-break": "bg-blue-100 text-blue-700 border-blue-200",
    "off-duty": "bg-neutral-100 text-neutral-700 border-neutral-200",
    "on-leave": "bg-orange-100 text-orange-700 border-orange-200",
    inactive: "bg-red-100 text-red-700 border-red-200"
  };
  return colors[status];
}

/**
 * Calculate capacity for a time slot
 */
export function calculateSlotCapacity(
  workers: Worker[],
  physicalResources: number = 0,
  slotDuration: number = 30
): number {
  const workerCapacity = workers.length;
  return Math.max(workerCapacity, physicalResources);
}

/**
 * Generate shift schedule for a week
 */
export function generateWeeklyShifts(
  worker: Worker,
  startDate: Date,
  branchId: string
): Shift[] {
  const shifts: Shift[] = [];
  
  if (!worker.weeklySchedule) return shifts;
  
  for (let i = 0; i < 7; i++) {
    const date = new Date(startDate);
    date.setDate(date.getDate() + i);
    const dateStr = date.toISOString().split('T')[0];
    const dayOfWeek = date.getDay();
    const dayName = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"][dayOfWeek] as keyof WeeklySchedule;
    
    const daySchedule = worker.weeklySchedule[dayName];
    
    if (daySchedule?.isWorkingDay && daySchedule.startTime && daySchedule.endTime) {
      shifts.push({
        id: `shift-${worker.id}-${dateStr}`,
        workerId: worker.id,
        date: dateStr,
        startTime: daySchedule.startTime,
        endTime: daySchedule.endTime,
        breakTime: daySchedule.breakStart && daySchedule.breakEnd 
          ? calculateTimeDifference(daySchedule.breakStart, daySchedule.breakEnd)
          : 0,
        branchId: daySchedule.branchId || branchId,
        status: "scheduled"
      });
    }
  }
  
  return shifts;
}

/**
 * Calculate time difference in minutes
 */
function calculateTimeDifference(startTime: string, endTime: string): number {
  const [startHour, startMin] = startTime.split(':').map(Number);
  const [endHour, endMin] = endTime.split(':').map(Number);
  return (endHour * 60 + endMin) - (startHour * 60 + startMin);
}

/**
 * Find optimal worker for a job
 */
export function findOptimalWorker(
  workers: Worker[],
  module: BusinessModule,
  location?: { lat: number; lng: number },
  requiredRole?: WorkerRole
): Worker | null {
  // Filter available workers
  let available = workers.filter(w => 
    w.currentStatus === "available" &&
    canWorkerHandleModule(w, module) &&
    (!requiredRole || w.role === requiredRole || w.role === "both")
  );
  
  if (available.length === 0) return null;
  
  // For mobile jobs, prefer workers closer to location
  if (location && module === "mobile") {
    available = available.filter(w => w.role === "mobile_detailer" || w.role === "both");
    // TODO: Calculate distance and sort by proximity
  }
  
  // Sort by rating and specialization level
  available.sort((a, b) => {
    const aSpec = a.specializations.find(s => s.module === module);
    const bSpec = b.specializations.find(s => s.module === module);
    
    const aScore = a.overallRating * 10 + (aSpec?.level === "expert" ? 3 : aSpec?.level === "intermediate" ? 2 : 1);
    const bScore = b.overallRating * 10 + (bSpec?.level === "expert" ? 3 : bSpec?.level === "intermediate" ? 2 : 1);
    
    return bScore - aScore;
  });
  
  return available[0];
}
