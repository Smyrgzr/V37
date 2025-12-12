/**
 * LETWASH CAPACITY ENGINE
 * =======================
 * 
 * Real-time capacity calculation and management engine
 * Handles all business modules with different capacity models
 */

import { BusinessModule } from '../types/business-modules';
import { Reservation } from '../types/reservation';
import { 
  Worker, 
  CapacitySlot, 
  CapacityCalculation, 
  CapacityConstraint,
  WorkerAvailability,
  CapacityResourceType,
  isWorkerAvailable,
  calculateTravelTime,
  estimateMobileJobDuration
} from '../types/worker';

/**
 * Branch capacity configuration
 */
export interface BranchCapacityConfig {
  branchId: string;
  branchName: string;
  
  // Physical resources
  inBayCount: number;
  tunnelCount: number;
  selfServiceCount: number;
  detailingStations: number;
  parkingSpots: number;
  
  // Operating hours
  openingTime: string; // HH:mm
  closingTime: string; // HH:mm
  
  // Time slot configuration
  slotDuration: number; // minutes (default: 30)
  bufferTime: number; // minutes between reservations
  
  // Worker allocation
  workers: Worker[];
  
  // Module-specific settings
  moduleSettings: {
    [key in BusinessModule]?: {
      enabled: boolean;
      minWorkers: number;
      maxConcurrentServices: number;
      avgServiceDuration: number; // minutes
    };
  };
}

/**
 * Capacity Engine Class
 */
export class CapacityEngine {
  private config: BranchCapacityConfig;
  
  constructor(config: BranchCapacityConfig) {
    this.config = config;
  }
  
  /**
   * Calculate capacity for a specific date and time range
   */
  calculateCapacity(
    date: string,
    startTime: string,
    endTime: string,
    businessModule: BusinessModule
  ): CapacityCalculation {
    const slots = this.generateTimeSlots(date, startTime, endTime, businessModule);
    
    // Get available workers
    const availableWorkers = this.getAvailableWorkers(date, startTime, endTime, businessModule);
    const busyWorkers = this.config.workers.filter(w => w.currentStatus === "busy");
    const onBreakWorkers = this.config.workers.filter(w => w.currentStatus === "on-break");
    
    // Calculate physical resource capacity
    const physicalCapacity = this.getPhysicalResourceCapacity(businessModule);
    
    // Calculate total capacity
    const totalCapacity = this.calculateTotalCapacity(
      availableWorkers.length,
      physicalCapacity,
      businessModule
    );
    
    // Calculate used capacity from slots
    const usedCapacity = slots.reduce((sum, slot) => sum + slot.bookedCapacity, 0);
    const availableCapacity = Math.max(0, totalCapacity - usedCapacity);
    
    return {
      branchId: this.config.branchId,
      businessModule,
      date,
      startTime,
      endTime,
      resources: {
        workers: {
          total: this.config.workers.length,
          available: availableWorkers.length,
          busy: busyWorkers.length,
          onBreak: onBreakWorkers.length,
          ids: availableWorkers.map(w => w.id)
        },
        physicalResources: physicalCapacity > 0 ? {
          type: this.getResourceType(businessModule),
          total: physicalCapacity,
          available: physicalCapacity - usedCapacity,
          inUse: usedCapacity
        } : undefined
      },
      totalCapacity,
      usedCapacity,
      availableCapacity,
      utilizationRate: totalCapacity > 0 ? Math.round((usedCapacity / totalCapacity) * 100) : 0,
      slots,
      canAcceptReservation: availableCapacity > 0,
      suggestedAlternatives: this.findAlternativeSlots(date, businessModule, 3)
    };
  }
  
  /**
   * Generate time slots for a time range
   */
  private generateTimeSlots(
    date: string,
    startTime: string,
    endTime: string,
    businessModule: BusinessModule
  ): CapacitySlot[] {
    const slots: CapacitySlot[] = [];
    const slotDuration = this.config.slotDuration;
    
    let currentTime = this.parseTime(startTime);
    const endMinutes = this.parseTime(endTime);
    
    while (currentTime < endMinutes) {
      const slotStartTime = this.formatTime(currentTime);
      const slotEndTime = this.formatTime(currentTime + slotDuration);
      
      // Calculate capacity for this slot
      const availableWorkers = this.getAvailableWorkers(date, slotStartTime, slotEndTime, businessModule);
      const physicalCapacity = this.getPhysicalResourceCapacity(businessModule);
      const totalCapacity = this.calculateTotalCapacity(
        availableWorkers.length,
        physicalCapacity,
        businessModule
      );
      
      // Check existing reservations in this slot (would come from database)
      const bookedCapacity = 0; // TODO: Get from actual reservations
      
      slots.push({
        id: `slot-${date}-${slotStartTime}-${businessModule}`,
        branchId: this.config.branchId,
        date,
        startTime: slotStartTime,
        endTime: slotEndTime,
        resourceType: this.getResourceType(businessModule),
        businessModule,
        totalCapacity,
        bookedCapacity,
        availableCapacity: totalCapacity - bookedCapacity,
        reservations: [],
        assignments: [],
        isAvailable: totalCapacity - bookedCapacity > 0,
        isBlocked: false
      });
      
      currentTime += slotDuration;
    }
    
    return slots;
  }
  
  /**
   * Get available workers for a specific time slot
   */
  getAvailableWorkers(
    date: string,
    startTime: string,
    endTime: string,
    businessModule: BusinessModule
  ): Worker[] {
    return this.config.workers.filter(worker => {
      // Check if worker can handle this module
      const canHandle = worker.specializations.some(spec => spec.module === businessModule);
      if (!canHandle) return false;
      
      // Check availability
      return isWorkerAvailable(worker, date, startTime, endTime);
    });
  }
  
  /**
   * Check worker availability with detailed reason
   */
  checkWorkerAvailability(
    worker: Worker,
    date: string,
    startTime: string,
    endTime: string,
    businessModule: BusinessModule
  ): WorkerAvailability {
    // Check if worker can handle module
    const canHandle = worker.specializations.some(spec => spec.module === businessModule);
    if (!canHandle) {
      return {
        worker,
        isAvailable: false,
        reason: `Worker is not trained for ${businessModule}`
      };
    }
    
    // Check basic availability
    const basicAvailable = isWorkerAvailable(worker, date, startTime, endTime);
    if (!basicAvailable) {
      return {
        worker,
        isAvailable: false,
        reason: "Worker is not available during this time",
        currentAssignment: worker.currentAssignments[0]
      };
    }
    
    // Check for conflicts
    const conflicts = worker.currentAssignments.filter(assignment => {
      // TODO: Implement proper time conflict checking
      return false;
    });
    
    if (conflicts.length > 0) {
      return {
        worker,
        isAvailable: false,
        reason: "Worker has conflicting assignments",
        conflictingReservations: conflicts.map(a => a.reservationId || a.transactionId || a.id)
      };
    }
    
    return {
      worker,
      isAvailable: true
    };
  }
  
  /**
   * Get physical resource capacity for a module
   */
  private getPhysicalResourceCapacity(businessModule: BusinessModule): number {
    switch (businessModule) {
      case "in_bay":
        return this.config.inBayCount;
      case "tunnel":
        return this.config.tunnelCount;
      case "self_service":
        return this.config.selfServiceCount;
      case "manual_detailing":
        return this.config.detailingStations;
      case "mobile":
      case "mobile_detailing":
        return 0; // Mobile doesn't need physical resources
      default:
        return 0;
    }
  }
  
  /**
   * Get resource type for a module
   */
  private getResourceType(businessModule: BusinessModule): CapacityResourceType {
    switch (businessModule) {
      case "in_bay":
      case "self_service":
        return "bay";
      case "tunnel":
        return "tunnel";
      case "manual_detailing":
        return "detailing_station";
      case "mobile":
      case "mobile_detailing":
        return "worker";
      default:
        return "worker";
    }
  }
  
  /**
   * Calculate total capacity based on workers and physical resources
   */
  private calculateTotalCapacity(
    workerCount: number,
    physicalCapacity: number,
    businessModule: BusinessModule
  ): number {
    const moduleSettings = this.config.moduleSettings[businessModule];
    
    // For walk-in modules, capacity is limited by physical resources
    if (["in_bay", "tunnel", "self_service"].includes(businessModule)) {
      return physicalCapacity;
    }
    
    // For reservation-based modules, capacity is worker-driven
    if (["manual_detailing", "mobile", "mobile_detailing"].includes(businessModule)) {
      const maxConcurrent = moduleSettings?.maxConcurrentServices || workerCount;
      return Math.min(workerCount, maxConcurrent);
    }
    
    // Default: max of workers or physical resources
    return Math.max(workerCount, physicalCapacity);
  }
  
  /**
   * Find alternative time slots
   */
  private findAlternativeSlots(
    date: string,
    businessModule: BusinessModule,
    count: number = 3
  ): { time: string; availableCapacity: number }[] {
    const slots = this.generateTimeSlots(
      date,
      this.config.openingTime,
      this.config.closingTime,
      businessModule
    );
    
    return slots
      .filter(slot => slot.isAvailable && slot.availableCapacity > 0)
      .sort((a, b) => b.availableCapacity - a.availableCapacity)
      .slice(0, count)
      .map(slot => ({
        time: slot.startTime,
        availableCapacity: slot.availableCapacity
      }));
  }
  
  /**
   * Check if a reservation can be accommodated
   */
  canAccommodateReservation(
    date: string,
    startTime: string,
    duration: number, // minutes
    businessModule: BusinessModule,
    location?: { lat: number; lng: number }
  ): {
    canAccommodate: boolean;
    reason?: string;
    requiredWorkers?: number;
    availableWorkers?: Worker[];
    suggestedTime?: string;
  } {
    const endMinutes = this.parseTime(startTime) + duration;
    const endTime = this.formatTime(endMinutes);
    
    const capacity = this.calculateCapacity(date, startTime, endTime, businessModule);
    
    if (capacity.availableCapacity > 0) {
      return {
        canAccommodate: true,
        availableWorkers: this.getAvailableWorkers(date, startTime, endTime, businessModule)
      };
    }
    
    // Find alternative
    const alternatives = this.findAlternativeSlots(date, businessModule, 1);
    
    return {
      canAccommodate: false,
      reason: "No available capacity for this time slot",
      suggestedTime: alternatives[0]?.time
    };
  }
  
  /**
   * Calculate capacity for mobile detailing with travel time
   */
  calculateMobileCapacity(
    date: string,
    startTime: string,
    serviceDuration: number,
    customerLocation: { lat: number; lng: number; address: string }
  ): {
    canAccommodate: boolean;
    availableWorkers: Worker[];
    estimatedDuration: number;
    estimatedArrival: string;
  } {
    // Get mobile workers
    const mobileWorkers = this.config.workers.filter(w => 
      (w.role === "mobile_detailer" || w.role === "both") &&
      isWorkerAvailable(w, date, startTime, "23:59", "mobile")
    );
    
    if (mobileWorkers.length === 0) {
      return {
        canAccommodate: false,
        availableWorkers: [],
        estimatedDuration: 0,
        estimatedArrival: startTime
      };
    }
    
    // Calculate travel time (mock - would use Google Maps API)
    const estimatedDistance = 5; // km - mock value
    const travelTime = calculateTravelTime(estimatedDistance);
    const totalDuration = estimateMobileJobDuration(serviceDuration, estimatedDistance, true);
    
    const arrivalMinutes = this.parseTime(startTime) + travelTime;
    
    return {
      canAccommodate: true,
      availableWorkers: mobileWorkers,
      estimatedDuration: totalDuration,
      estimatedArrival: this.formatTime(arrivalMinutes)
    };
  }
  
  /**
   * Helper: Parse time string to minutes
   */
  private parseTime(time: string): number {
    const [hours, minutes] = time.split(':').map(Number);
    return hours * 60 + minutes;
  }
  
  /**
   * Helper: Format minutes to time string
   */
  private formatTime(minutes: number): string {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}`;
  }
  
  /**
   * Get capacity utilization for a date range
   */
  getUtilizationReport(
    startDate: string,
    endDate: string,
    businessModule: BusinessModule
  ): {
    date: string;
    totalCapacity: number;
    usedCapacity: number;
    utilizationRate: number;
  }[] {
    const report: {
      date: string;
      totalCapacity: number;
      usedCapacity: number;
      utilizationRate: number;
    }[] = [];
    
    const start = new Date(startDate);
    const end = new Date(endDate);
    
    for (let date = new Date(start); date <= end; date.setDate(date.getDate() + 1)) {
      const dateStr = date.toISOString().split('T')[0];
      const capacity = this.calculateCapacity(
        dateStr,
        this.config.openingTime,
        this.config.closingTime,
        businessModule
      );
      
      report.push({
        date: dateStr,
        totalCapacity: capacity.totalCapacity,
        usedCapacity: capacity.usedCapacity,
        utilizationRate: capacity.utilizationRate
      });
    }
    
    return report;
  }
  
  /**
   * Block a time slot
   */
  blockTimeSlot(
    date: string,
    startTime: string,
    endTime: string,
    reason: string
  ): CapacitySlot[] {
    const slots = this.generateTimeSlots(date, startTime, endTime, "in_bay" as BusinessModule);
    
    return slots.map(slot => ({
      ...slot,
      isBlocked: true,
      isAvailable: false,
      blockReason: reason
    }));
  }
}

/**
 * Create capacity engine instance for a branch
 */
export function createCapacityEngine(config: BranchCapacityConfig): CapacityEngine {
  return new CapacityEngine(config);
}

/**
 * Get capacity constraints for a business module
 */
export function getModuleCapacityConstraints(module: BusinessModule): CapacityConstraint {
  const constraints: Record<BusinessModule, CapacityConstraint> = {
    in_bay: {
      branchId: "",
      businessModule: "in_bay",
      minWorkers: 0,
      maxWorkers: 0,
      requiredRoles: [],
      requiredResources: [{ type: "bay", quantity: 1 }],
      minDuration: 15,
      maxDuration: 30,
      bufferTime: 5
    },
    tunnel: {
      branchId: "",
      businessModule: "tunnel",
      minWorkers: 1,
      maxWorkers: 2,
      requiredRoles: ["technician"],
      requiredResources: [{ type: "tunnel", quantity: 1 }],
      minDuration: 10,
      maxDuration: 15,
      bufferTime: 2
    },
    self_service: {
      branchId: "",
      businessModule: "self_service",
      minWorkers: 0,
      maxWorkers: 0,
      requiredRoles: [],
      requiredResources: [{ type: "bay", quantity: 1 }],
      minDuration: 20,
      maxDuration: 60,
      bufferTime: 0
    },
    manual_detailing: {
      branchId: "",
      businessModule: "manual_detailing",
      minWorkers: 1,
      maxWorkers: 3,
      requiredRoles: ["detailer", "both"],
      requiredResources: [{ type: "detailing_station", quantity: 1 }],
      minDuration: 60,
      maxDuration: 240,
      bufferTime: 15
    },
    mobile: {
      branchId: "",
      businessModule: "mobile",
      minWorkers: 1,
      maxWorkers: 1,
      requiredRoles: ["mobile_detailer", "both"],
      minDuration: 90,
      maxDuration: 300,
      bufferTime: 30,
      maxTravelDistance: 30,
      travelTimePerKm: 2
    },
    mobile_detailing: {
      branchId: "",
      businessModule: "mobile_detailing",
      minWorkers: 1,
      maxWorkers: 1,
      requiredRoles: ["mobile_detailer", "both"],
      minDuration: 90,
      maxDuration: 300,
      bufferTime: 30,
      maxTravelDistance: 30,
      travelTimePerKm: 2
    }
  };
  
  return constraints[module];
}
