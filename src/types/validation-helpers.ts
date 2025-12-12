/**
 * LETWASH VALIDATION HELPERS
 * ==========================
 * 
 * Validation utilities for business module operations.
 * Ensures data consistency and business rule compliance.
 */

import {
  BusinessModule,
  ModuleSpecificData,
  validateModuleCapacity,
  getModuleName,
} from "./business-modules";

/**
 * Validate module-specific data completeness
 */
export interface ValidationResult {
  isValid: boolean;
  errors: string[];
  warnings: string[];
}

export function validateModuleSpecificData(
  moduleId: BusinessModule,
  data?: ModuleSpecificData
): ValidationResult {
  const errors: string[] = [];
  const warnings: string[] = [];

  if (!data) {
    return {
      isValid: false,
      errors: [`Module-specific data is required for ${getModuleName(moduleId)}`],
      warnings: [],
    };
  }

  switch (moduleId) {
    case "in_bay":
      if (!data.in_bay) {
        errors.push("In-Bay module data is missing");
      } else {
        if (!data.in_bay.bayNumber) {
          errors.push("Bay number is required");
        }
        if (!data.in_bay.automaticType) {
          errors.push("Automatic type (soft-touch/touchless) is required");
        }
        if (data.in_bay.bayNumber && (data.in_bay.bayNumber < 1 || data.in_bay.bayNumber > 10)) {
          warnings.push("Bay number should typically be between 1 and 10");
        }
      }
      break;

    case "tunnel":
      if (!data.tunnel) {
        errors.push("Tunnel module data is missing");
      } else {
        if (!data.tunnel.tunnelLine) {
          errors.push("Tunnel line number is required");
        }
        if (data.tunnel.conveyorSpeed && data.tunnel.conveyorSpeed > 10) {
          warnings.push("Conveyor speed seems unusually high");
        }
      }
      break;

    case "manual_detailing":
      if (!data.manual_detailing) {
        errors.push("Manual detailing module data is missing");
      } else {
        if (!data.manual_detailing.detailerName) {
          errors.push("Detailer name is required");
        }
        if (!data.manual_detailing.stationId) {
          errors.push("Station ID is required");
        }
        if (data.manual_detailing.specialRequests && data.manual_detailing.specialRequests.length > 5) {
          warnings.push("Large number of special requests may impact service time");
        }
      }
      break;

    case "mobile":
      if (!data.mobile) {
        errors.push("Mobile module data is missing");
      } else {
        if (!data.mobile.serviceLocation) {
          errors.push("Service location is required for mobile detailing");
        }
        if (!data.mobile.driverName) {
          errors.push("Driver name is required");
        }
        if (!data.mobile.vehiclePlateNumber) {
          warnings.push("Vehicle plate number recommended for record keeping");
        }
        if (data.mobile.travelFee && data.mobile.travelFee > 50) {
          warnings.push("Travel fee seems unusually high");
        }
      }
      break;

    case "self_service":
      if (!data.self_service) {
        errors.push("Self-service module data is missing");
      } else {
        if (!data.self_service.bayNumber) {
          errors.push("Bay number is required");
        }
        if (data.self_service.minuteRate && data.self_service.minuteRate > 2) {
          warnings.push("Minute rate seems high for self-service");
        }
      }
      break;
  }

  return {
    isValid: errors.length === 0,
    errors,
    warnings,
  };
}

/**
 * Validate booking time slot for specific module
 */
export interface TimeSlotValidation extends ValidationResult {
  suggestedAlternatives?: {
    timeSlot: string;
    availableCapacity: number;
  }[];
}

export function validateBookingTimeSlot(
  moduleId: BusinessModule,
  timeSlot: string,
  duration: number,
  currentBookings: number,
  maxCapacity: number
): TimeSlotValidation {
  const errors: string[] = [];
  const warnings: string[] = [];

  // Basic capacity check
  const capacityCheck = validateModuleCapacity(
    moduleId,
    timeSlot,
    duration,
    currentBookings,
    maxCapacity
  );

  if (!capacityCheck.isAvailable) {
    errors.push(capacityCheck.reason || "Time slot not available");
  }

  // Module-specific validations
  switch (moduleId) {
    case "tunnel":
      if (duration < 3) {
        warnings.push("Tunnel wash duration should be at least 3 minutes");
      }
      if (currentBookings / maxCapacity > 0.9) {
        warnings.push("Near capacity - expect possible delays");
      }
      break;

    case "manual_detailing":
      if (duration < 30) {
        warnings.push("Manual detailing typically requires at least 30 minutes");
      }
      if (duration > 180) {
        warnings.push("Service duration over 3 hours - consider splitting into multiple sessions");
      }
      break;

    case "mobile":
      // Check if time slot allows for travel time
      const hour = parseInt(timeSlot.split(":")[0]);
      if (hour < 8 || hour > 18) {
        warnings.push("Mobile services are typically scheduled between 8 AM and 6 PM");
      }
      if (duration < 45) {
        warnings.push("Mobile detailing should include travel time (typically 45+ minutes total)");
      }
      break;

    case "in_bay":
      if (duration > 30) {
        warnings.push("In-Bay automatic washes typically take 10-20 minutes");
      }
      break;

    case "self_service":
      if (currentBookings > 0) {
        errors.push("Self-service bays don't support advance bookings - walk-in only");
      }
      break;
  }

  return {
    isValid: errors.length === 0,
    errors,
    warnings,
    suggestedAlternatives: !capacityCheck.isAvailable 
      ? generateAlternativeTimeSlots(timeSlot, maxCapacity)
      : undefined,
  };
}

/**
 * Generate alternative time slots
 */
function generateAlternativeTimeSlots(
  requestedSlot: string,
  maxCapacity: number
): { timeSlot: string; availableCapacity: number }[] {
  // Simple implementation - suggest next 3 hours
  const alternatives: { timeSlot: string; availableCapacity: number }[] = [];
  const [hours, minutes] = requestedSlot.split(":").map(Number);
  
  for (let i = 1; i <= 3; i++) {
    const newHour = (hours + i) % 24;
    const newTimeSlot = `${newHour.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}`;
    alternatives.push({
      timeSlot: newTimeSlot,
      availableCapacity: Math.floor(Math.random() * maxCapacity) + 1,
    });
  }
  
  return alternatives;
}

/**
 * Validate module compatibility for cross-selling
 */
export interface CrossSellValidation {
  isCompatible: boolean;
  reason: string;
  suggestedUpsell?: {
    targetModule: BusinessModule;
    reason: string;
    expectedValueIncrease: number; // in dollars
  };
}

export function validateModuleCrossSell(
  currentModule: BusinessModule,
  customerHistory: {
    totalVisits: number;
    avgSpend: number;
    preferredModule: BusinessModule;
  }
): CrossSellValidation {
  // Define cross-sell rules
  const crossSellRules: Record<BusinessModule, {
    compatibleModules: BusinessModule[];
    upsellThreshold: number; // minimum avg spend to suggest upsell
  }> = {
    in_bay: {
      compatibleModules: ["manual_detailing", "mobile"],
      upsellThreshold: 25,
    },
    tunnel: {
      compatibleModules: ["manual_detailing", "in_bay"],
      upsellThreshold: 30,
    },
    self_service: {
      compatibleModules: ["in_bay", "tunnel"],
      upsellThreshold: 15,
    },
    mobile: {
      compatibleModules: ["manual_detailing"],
      upsellThreshold: 60,
    },
    manual_detailing: {
      compatibleModules: ["mobile"],
      upsellThreshold: 90,
    },
  };

  const rules = crossSellRules[currentModule];
  
  // Check if customer is a good upsell candidate
  if (customerHistory.avgSpend >= rules.upsellThreshold && customerHistory.totalVisits >= 3) {
    // Suggest premium upgrade
    const premiumModules: BusinessModule[] = ["manual_detailing", "mobile"];
    const suggestedModule = premiumModules.find(m => 
      rules.compatibleModules.includes(m) && m !== currentModule
    );

    if (suggestedModule) {
      return {
        isCompatible: true,
        reason: `Customer shows high engagement with ${getModuleName(currentModule)}`,
        suggestedUpsell: {
          targetModule: suggestedModule,
          reason: `Based on spending pattern, customer may be interested in premium ${getModuleName(suggestedModule)} services`,
          expectedValueIncrease: suggestedModule === "manual_detailing" ? 45 : 35,
        },
      };
    }
  }

  return {
    isCompatible: false,
    reason: "Customer history doesn't indicate strong upsell potential yet",
  };
}

/**
 * Validate employee assignment to module
 */
export function validateEmployeeModuleAssignment(
  moduleId: BusinessModule,
  employeeSkillLevel: "beginner" | "intermediate" | "expert",
  serviceComplexity: "basic" | "standard" | "premium"
): ValidationResult {
  const errors: string[] = [];
  const warnings: string[] = [];

  // Module-specific skill requirements
  const skillRequirements: Record<BusinessModule, {
    basic: ("beginner" | "intermediate" | "expert")[];
    standard: ("beginner" | "intermediate" | "expert")[];
    premium: ("beginner" | "intermediate" | "expert")[];
  }> = {
    manual_detailing: {
      basic: ["beginner", "intermediate", "expert"],
      standard: ["intermediate", "expert"],
      premium: ["expert"],
    },
    mobile: {
      basic: ["intermediate", "expert"],
      standard: ["intermediate", "expert"],
      premium: ["expert"],
    },
    in_bay: {
      basic: ["beginner", "intermediate", "expert"],
      standard: ["beginner", "intermediate", "expert"],
      premium: ["intermediate", "expert"],
    },
    tunnel: {
      basic: ["beginner", "intermediate", "expert"],
      standard: ["beginner", "intermediate", "expert"],
      premium: ["intermediate", "expert"],
    },
    self_service: {
      basic: ["beginner", "intermediate", "expert"],
      standard: ["beginner", "intermediate", "expert"],
      premium: ["beginner", "intermediate", "expert"],
    },
  };

  const requirements = skillRequirements[moduleId][serviceComplexity];
  
  if (!requirements.includes(employeeSkillLevel)) {
    errors.push(
      `${serviceComplexity.charAt(0).toUpperCase() + serviceComplexity.slice(1)} ${getModuleName(moduleId)} services require ${requirements.join(" or ")} skill level`
    );
  } else if (employeeSkillLevel === "beginner" && serviceComplexity === "premium") {
    warnings.push("Beginner employee assigned to premium service - consider supervision");
  }

  return {
    isValid: errors.length === 0,
    errors,
    warnings,
  };
}

/**
 * Validate pricing consistency across modules
 */
export function validateModulePricing(
  moduleId: BusinessModule,
  servicePrice: number,
  serviceDuration: number
): ValidationResult {
  const errors: string[] = [];
  const warnings: string[] = [];

  // Expected price ranges per module (per service, not per hour)
  const priceRanges: Record<BusinessModule, {
    min: number;
    max: number;
    avgDuration: number;
  }> = {
    in_bay: { min: 15, max: 45, avgDuration: 15 },
    tunnel: { min: 20, max: 50, avgDuration: 3 },
    manual_detailing: { min: 60, max: 200, avgDuration: 50 },
    mobile: { min: 70, max: 250, avgDuration: 60 },
    self_service: { min: 8, max: 25, avgDuration: 25 },
  };

  const range = priceRanges[moduleId];

  if (servicePrice < range.min) {
    warnings.push(
      `Price $${servicePrice} is below typical range for ${getModuleName(moduleId)} ($${range.min}-$${range.max})`
    );
  }

  if (servicePrice > range.max) {
    warnings.push(
      `Price $${servicePrice} is above typical range for ${getModuleName(moduleId)} ($${range.min}-$${range.max})`
    );
  }

  // Check duration vs price consistency
  if (serviceDuration && serviceDuration !== range.avgDuration) {
    const durationDiff = Math.abs(serviceDuration - range.avgDuration);
    if (durationDiff > range.avgDuration * 0.5) {
      warnings.push(
        `Service duration (${serviceDuration} min) differs significantly from typical ${getModuleName(moduleId)} duration (${range.avgDuration} min)`
      );
    }
  }

  return {
    isValid: errors.length === 0,
    errors,
    warnings,
  };
}
