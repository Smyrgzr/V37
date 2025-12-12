/**
 * LETWASH BUSINESS MODULES - SHARED TYPE DEFINITIONS
 * ==================================================
 * 
 * This file contains all business module related types and utilities
 * used across the platform.
 */

import { LucideIcon, Car, Zap, Wrench, Truck, Users } from 'lucide-react';

export type BusinessModule = 
  | "in_bay" 
  | "tunnel" 
  | "self_service" 
  | "mobile" 
  | "manual_detailing";

/**
 * Operation model for business modules
 */
export type OperationModel = "walk-in" | "reservation";

/**
 * Get operation model for a business module
 */
export function getOperationModel(module: BusinessModule): OperationModel {
  // Manual detailing and mobile are reservation-based, others are walk-in
  return module === "manual_detailing" || module === "mobile" ? "reservation" : "walk-in";
}

/**
 * Module-specific metadata and configuration
 */
export interface ModuleMetadata {
  name: string;
  description: string;
  icon: LucideIcon;
  color: string;
  iconColor: string;
  bgColor: string;
  borderColor: string;
  operationModel: OperationModel;
}

/**
 * Module-specific data that can be attached to bookings
 */
export interface ModuleSpecificData {
  // In-Bay specific
  in_bay?: {
    bayNumber: number;
    automaticType: "soft-touch" | "touchless";
    paymentSystem?: "coin" | "token" | "card" | "app";
  };
  
  // Tunnel specific
  tunnel?: {
    tunnelLine: number;
    conveyorSpeed?: number;
    tunnelLength?: number;
    conveyorType?: "chain" | "belt";
  };
  
  // Self-Service specific
  self_service?: {
    bayNumber: number;
    pricingModel?: "pay-per-minute" | "flat-rate";
    minuteRate?: number;
  };
  
  // Mobile specific
  mobile?: {
    serviceLocation: string;
    driverName: string;
    vehiclePlateNumber: string;
    travelFee?: number;
    serviceAreaRadius?: number;
  };
  
  // Manual Detailing specific
  manual_detailing?: {
    detailerName: string;
    stationId: string;
    specialRequests?: string[];
    skillLevel?: "beginner" | "intermediate" | "expert";
  };
}

/**
 * Module-specific pricing and duration
 */
export interface ModulePricing {
  module: BusinessModule;
  price: number;
  duration: number; // in minutes
  travelFee?: number; // for mobile only
}

/**
 * Module performance metrics
 */
export interface ModulePerformance {
  moduleId: BusinessModule;
  revenue: number;
  bookings: number;
  avgServiceTime: number; // minutes
  utilizationRate: number; // percentage
  customerSatisfaction: number; // 1-5 stars
  topService?: string;
  trendDirection?: "up" | "down" | "stable";
  trendPercentage?: number;
}

/**
 * Module capacity configuration
 */
export interface ModuleCapacity {
  module: BusinessModule;
  totalSlots: number; // total capacity units (bays, stations, etc.)
  usedSlots: number;
  utilizationPercentage: number;
  avgServiceDuration: number; // minutes
  maxServicesPerHour: number;
}

/**
 * Employee module specialization
 */
export interface ModuleSpecialization {
  module: BusinessModule;
  skillLevel: "beginner" | "intermediate" | "expert";
  certifications: string[];
  performanceRating: number; // 1-5 stars
  serviceCount?: number; // total services completed in this module
  avgCustomerRating?: number;
}

/**
 * Campaign targeting by module
 */
export interface ModuleCampaignTarget {
  targetModules: BusinessModule[];
  moduleSpecificDiscount?: {
    [K in BusinessModule]?: {
      discountType: "percentage" | "fixed";
      discountValue: number;
    };
  };
}

/**
 * Module utility functions
 */
export const MODULE_CONFIG: Record<BusinessModule, ModuleMetadata> = {
  in_bay: {
    name: "In-Bay Automatic",
    description: "Automated bay wash system",
    icon: Car,
    color: "text-blue-700",
    iconColor: "text-blue-700",
    bgColor: "bg-blue-100",
    borderColor: "border-blue-300",
    operationModel: "walk-in",
  },
  tunnel: {
    name: "Tunnel Wash",
    description: "High-volume conveyor tunnel system",
    icon: Zap,
    color: "text-purple-700",
    iconColor: "text-purple-700",
    bgColor: "bg-purple-100",
    borderColor: "border-purple-300",
    operationModel: "walk-in",
  },
  self_service: {
    name: "Self-Service",
    description: "Customer-operated wash bays",
    icon: Wrench,
    color: "text-green-700",
    iconColor: "text-green-700",
    bgColor: "bg-green-100",
    borderColor: "border-green-300",
    operationModel: "walk-in",
  },
  mobile: {
    name: "Mobile Detailing",
    description: "On-location mobile service",
    icon: Truck,
    color: "text-orange-700",
    iconColor: "text-orange-700",
    bgColor: "bg-orange-100",
    borderColor: "border-orange-300",
    operationModel: "reservation",
  },
  manual_detailing: {
    name: "Manual Detailing",
    description: "Hand wash and detailing services",
    icon: Users,
    color: "text-red-700",
    iconColor: "text-red-700",
    bgColor: "bg-red-100",
    borderColor: "border-red-300",
    operationModel: "reservation",
  },
};

/**
 * Get module metadata
 */
export function getModuleConfig(moduleId: BusinessModule): ModuleMetadata {
  return MODULE_CONFIG[moduleId];
}

/**
 * Get module display name
 */
export function getModuleName(moduleId: BusinessModule): string {
  return MODULE_CONFIG[moduleId].name;
}

/**
 * Get module color classes
 */
export function getModuleColor(moduleId: BusinessModule): string {
  return MODULE_CONFIG[moduleId].color;
}

/**
 * Get module background color
 */
export function getModuleBgColor(moduleId: BusinessModule): string {
  return MODULE_CONFIG[moduleId].bgColor;
}

/**
 * Module-specific station naming
 */
export const MODULE_STATION_NAMES: Record<BusinessModule, string[]> = {
  in_bay: ["Bay 1", "Bay 2", "Bay 3", "Bay 4"],
  tunnel: ["Tunnel Line A", "Tunnel Line B"],
  manual_detailing: ["Detail Station Alpha", "Detail Station Beta", "Detail Station Gamma"],
  self_service: ["Self-Service Bay 1", "Self-Service Bay 2", "Self-Service Bay 3", "Self-Service Bay 4"],
  mobile: ["Mobile Unit 1", "Mobile Unit 2", "Mobile Unit 3"],
};

/**
 * Get station names for a specific module
 */
export function getModuleStationNames(moduleId: BusinessModule): string[] {
  return MODULE_STATION_NAMES[moduleId] || [];
}

/**
 * Module capacity calculation helpers
 */
export function calculateModuleCapacity(
  module: BusinessModule,
  totalUnits: number, // number of bays, tunnels, detailers, etc.
  avgServiceTime: number // in minutes
): number {
  switch (module) {
    case "in_bay":
      // In-Bay: Each bay can do 4 services per hour (15 min avg)
      return totalUnits * (60 / avgServiceTime);
    
    case "tunnel":
      // Tunnel: High throughput - can process cars every 2.5 minutes
      return totalUnits * (60 / avgServiceTime);
    
    case "manual_detailing":
      // Manual: Slower, typically 45-60 min per service
      return totalUnits * (60 / avgServiceTime);
    
    case "mobile":
      // Mobile: Factor in travel time (service time + travel time)
      const effectiveTime = avgServiceTime + 15; // Add 15 min travel time
      return totalUnits * (60 / effectiveTime);
    
    case "self_service":
      // Self-Service: Customer-driven, avg 20-30 min
      return totalUnits * (60 / avgServiceTime);
    
    default:
      return totalUnits * (60 / avgServiceTime);
  }
}

/**
 * Validate module capacity for booking
 */
export interface CapacityValidationResult {
  isAvailable: boolean;
  reason?: string;
  alternativeModules?: BusinessModule[];
}

export function validateModuleCapacity(
  module: BusinessModule,
  timeSlot: string,
  duration: number,
  existingBookings: number,
  maxCapacity: number
): CapacityValidationResult {
  const availableSlots = maxCapacity - existingBookings;
  
  if (availableSlots <= 0) {
    return {
      isAvailable: false,
      reason: `All ${MODULE_CONFIG[module].name} stations are fully booked at this time`,
      alternativeModules: getAlternativeModules(module),
    };
  }
  
  return {
    isAvailable: true,
  };
}

/**
 * Get alternative modules for a service
 */
function getAlternativeModules(module: BusinessModule): BusinessModule[] {
  const alternatives: Record<BusinessModule, BusinessModule[]> = {
    in_bay: ["tunnel", "manual_detailing"],
    tunnel: ["in_bay", "manual_detailing"],
    manual_detailing: ["in_bay", "tunnel"],
    mobile: ["manual_detailing"],
    self_service: ["in_bay", "tunnel"],
  };
  
  return alternatives[module] || [];
}