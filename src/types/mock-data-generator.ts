/**
 * LETWASH MOCK DATA GENERATOR
 * ===========================
 * 
 * Utility to generate realistic mock data for testing business module features.
 * This helps verify that all module-aware implementations work correctly.
 */

import {
  BusinessModule,
  ModulePerformance,
  ModuleSpecificData,
  ModuleCapacity,
  getModuleName,
} from "./business-modules";

/**
 * Generate mock module performance data
 */
export function generateModulePerformance(
  moduleId: BusinessModule,
  branchCount: number = 1
): ModulePerformance {
  // Define realistic ranges per module
  const moduleRanges: Record<BusinessModule, {
    revenue: [number, number];
    bookings: [number, number];
    avgServiceTime: number;
    utilization: [number, number];
    satisfaction: [number, number];
  }> = {
    in_bay: {
      revenue: [8000, 15000],
      bookings: [200, 400],
      avgServiceTime: 15,
      utilization: [65, 85],
      satisfaction: [4.2, 4.6],
    },
    tunnel: {
      revenue: [12000, 25000],
      bookings: [400, 800],
      avgServiceTime: 3,
      utilization: [70, 90],
      satisfaction: [4.0, 4.4],
    },
    manual_detailing: {
      revenue: [15000, 30000],
      bookings: [80, 180],
      avgServiceTime: 50,
      utilization: [75, 95],
      satisfaction: [4.5, 4.9],
    },
    mobile: {
      revenue: [6000, 12000],
      bookings: [60, 120],
      avgServiceTime: 60,
      utilization: [60, 80],
      satisfaction: [4.4, 4.8],
    },
    self_service: {
      revenue: [3000, 8000],
      bookings: [150, 350],
      avgServiceTime: 25,
      utilization: [45, 70],
      satisfaction: [3.8, 4.2],
    },
  };

  const range = moduleRanges[moduleId];
  
  // Random value within range
  const random = (min: number, max: number) => 
    Math.floor(Math.random() * (max - min + 1)) + min;
  
  const randomFloat = (min: number, max: number) => 
    Math.random() * (max - min) + min;

  // Multiply by branch count
  const revenue = random(range.revenue[0], range.revenue[1]) * branchCount;
  const bookings = random(range.bookings[0], range.bookings[1]) * branchCount;
  const utilization = random(range.utilization[0], range.utilization[1]);
  const satisfaction = parseFloat(randomFloat(range.satisfaction[0], range.satisfaction[1]).toFixed(1));

  // Generate trend
  const trends: ("up" | "down" | "stable")[] = ["up", "down", "stable"];
  const trendDirection = trends[random(0, 2)];
  const trendPercentage = trendDirection === "stable" 
    ? 0 
    : (trendDirection === "up" ? random(5, 25) : -random(5, 25));

  // Top services by module
  const topServices: Record<BusinessModule, string[]> = {
    in_bay: ["Premium Wash + Wax", "Basic Express Wash", "Deluxe Package"],
    tunnel: ["Ultimate Shine Package", "Quick Wash", "Premium Tunnel"],
    manual_detailing: ["Full Interior & Exterior Detail", "Premium Hand Wash", "Engine Bay Detailing"],
    mobile: ["On-Site Premium Detailing", "Mobile Wash & Wax", "Fleet Service Package"],
    self_service: ["Self-Wash Bay Time", "Premium Foam & Wax", "Basic Rinse"],
  };

  return {
    moduleId,
    revenue,
    bookings,
    avgServiceTime: range.avgServiceTime,
    utilizationRate: utilization,
    customerSatisfaction: satisfaction,
    topService: topServices[moduleId][random(0, topServices[moduleId].length - 1)],
    trendDirection,
    trendPercentage,
  };
}

/**
 * Generate all module performances
 */
export function generateAllModulePerformances(
  branchCountByModule: Partial<Record<BusinessModule, number>> = {}
): ModulePerformance[] {
  const modules: BusinessModule[] = ["in_bay", "tunnel", "self_service", "mobile", "manual_detailing"];
  
  return modules
    .filter(module => (branchCountByModule[module] || 0) > 0)
    .map(module => generateModulePerformance(module, branchCountByModule[module] || 1));
}

/**
 * Generate module-specific booking data
 */
export function generateModuleSpecificData(
  moduleId: BusinessModule,
  branchId?: string
): ModuleSpecificData {
  switch (moduleId) {
    case "in_bay":
      return {
        in_bay: {
          bayNumber: Math.floor(Math.random() * 4) + 1,
          automaticType: Math.random() > 0.5 ? "soft-touch" : "touchless",
          paymentSystem: ["coin", "token", "card", "app"][Math.floor(Math.random() * 4)] as any,
        },
      };
    
    case "tunnel":
      return {
        tunnel: {
          tunnelLine: Math.random() > 0.5 ? 1 : 2,
          conveyorSpeed: Math.floor(Math.random() * 3) + 2, // 2-4 ft/s
          conveyorType: Math.random() > 0.5 ? "chain" : "belt",
        },
      };
    
    case "manual_detailing":
      const detailers = ["Alex Johnson", "Maria Garcia", "David Chen", "Sarah Williams"];
      const stations = ["Alpha", "Beta", "Gamma"];
      return {
        manual_detailing: {
          detailerName: detailers[Math.floor(Math.random() * detailers.length)],
          stationId: stations[Math.floor(Math.random() * stations.length)],
          specialRequests: Math.random() > 0.6 
            ? ["Extra attention to wheels", "Pet hair removal"] 
            : undefined,
          skillLevel: ["beginner", "intermediate", "expert"][Math.floor(Math.random() * 3)] as any,
        },
      };
    
    case "mobile":
      const drivers = ["John Mobile Unit 1", "Sarah Mobile Unit 2", "Mike Mobile Unit 3"];
      return {
        mobile: {
          serviceLocation: "123 Main Street, Brooklyn, NY",
          driverName: drivers[Math.floor(Math.random() * drivers.length)],
          vehiclePlateNumber: `ABC${Math.floor(Math.random() * 9000) + 1000}`,
          travelFee: Math.random() > 0.5 ? 15 : 0,
          serviceAreaRadius: 10,
        },
      };
    
    case "self_service":
      return {
        self_service: {
          bayNumber: Math.floor(Math.random() * 4) + 1,
          pricingModel: Math.random() > 0.5 ? "pay-per-minute" : "flat-rate",
          minuteRate: 0.5,
        },
      };
    
    default:
      return {};
  }
}

/**
 * Generate module capacity data
 */
export function generateModuleCapacity(
  moduleId: BusinessModule,
  currentHour: number = new Date().getHours()
): ModuleCapacity {
  const capacityRanges: Record<BusinessModule, {
    totalSlots: number;
    avgDuration: number;
    peakHours: number[];
  }> = {
    in_bay: {
      totalSlots: 4,
      avgDuration: 15,
      peakHours: [9, 10, 11, 17, 18],
    },
    tunnel: {
      totalSlots: 2,
      avgDuration: 3,
      peakHours: [10, 11, 12, 16, 17, 18],
    },
    manual_detailing: {
      totalSlots: 3,
      avgDuration: 50,
      peakHours: [10, 11, 14, 15, 16],
    },
    mobile: {
      totalSlots: 3,
      avgDuration: 60,
      peakHours: [9, 10, 13, 14, 15, 16],
    },
    self_service: {
      totalSlots: 4,
      avgDuration: 25,
      peakHours: [8, 9, 17, 18, 19],
    },
  };

  const config = capacityRanges[moduleId];
  const isPeakHour = config.peakHours.includes(currentHour);
  
  // Calculate utilization - higher during peak hours
  const baseUtilization = isPeakHour ? 0.7 : 0.4;
  const randomFactor = Math.random() * 0.2; // +/- 20%
  const utilizationPercentage = Math.min(95, Math.max(10, 
    Math.round((baseUtilization + randomFactor) * 100)
  ));
  
  const usedSlots = Math.round(config.totalSlots * (utilizationPercentage / 100));
  const maxServicesPerHour = Math.floor((60 / config.avgDuration) * config.totalSlots);

  return {
    module: moduleId,
    totalSlots: config.totalSlots,
    usedSlots,
    utilizationPercentage,
    avgServiceDuration: config.avgDuration,
    maxServicesPerHour,
  };
}

/**
 * Generate realistic revenue breakdown by module
 */
export interface RevenueByModule {
  module: BusinessModule;
  revenue: number;
  percentage: number;
  transactions: number;
  avgTransactionValue: number;
}

export function generateRevenueByModule(
  activeModules: BusinessModule[]
): RevenueByModule[] {
  const moduleRevenues = activeModules.map(module => {
    const perf = generateModulePerformance(module);
    return {
      module,
      revenue: perf.revenue,
      transactions: perf.bookings,
      avgTransactionValue: Math.round(perf.revenue / perf.bookings),
    };
  });

  const totalRevenue = moduleRevenues.reduce((sum, m) => sum + m.revenue, 0);

  return moduleRevenues.map(m => ({
    ...m,
    percentage: Math.round((m.revenue / totalRevenue) * 100),
  }));
}

/**
 * Generate hourly capacity data for a specific module
 */
export interface HourlyModuleCapacity {
  hour: string;
  bookings: number;
  walkIns: number;
  capacity: number;
  utilization: number;
}

export function generateHourlyCapacityData(
  moduleId: BusinessModule,
  hours: number = 12
): HourlyModuleCapacity[] {
  const startHour = 8; // 8 AM
  const data: HourlyModuleCapacity[] = [];
  
  for (let i = 0; i < hours; i++) {
    const hour = startHour + i;
    const capacity = generateModuleCapacity(moduleId, hour);
    
    // Split used slots into bookings and walk-ins
    const totalUsed = capacity.usedSlots;
    const bookingRatio = moduleId === "self_service" ? 0.2 : 0.7; // Self-service has more walk-ins
    const bookings = Math.floor(totalUsed * bookingRatio);
    const walkIns = totalUsed - bookings;
    
    data.push({
      hour: `${hour % 12 || 12}${hour >= 12 ? 'pm' : 'am'}`,
      bookings,
      walkIns,
      capacity: capacity.totalSlots,
      utilization: capacity.utilizationPercentage,
    });
  }
  
  return data;
}

/**
 * Generate customer segmentation by module
 */
export interface CustomerSegmentByModule {
  module: BusinessModule;
  totalCustomers: number;
  avgLifetimeValue: number;
  avgFrequency: number; // visits per month
  retentionRate: number; // percentage
  avgSpendPerVisit: number;
}

export function generateCustomerSegmentation(): CustomerSegmentByModule[] {
  const segments: CustomerSegmentByModule[] = [
    {
      module: "manual_detailing",
      totalCustomers: 450,
      avgLifetimeValue: 2450,
      avgFrequency: 1.2,
      retentionRate: 87,
      avgSpendPerVisit: 95,
    },
    {
      module: "mobile",
      totalCustomers: 280,
      avgLifetimeValue: 1980,
      avgFrequency: 0.8,
      retentionRate: 72,
      avgSpendPerVisit: 78,
    },
    {
      module: "in_bay",
      totalCustomers: 1200,
      avgLifetimeValue: 840,
      avgFrequency: 2.5,
      retentionRate: 65,
      avgSpendPerVisit: 28,
    },
    {
      module: "tunnel",
      totalCustomers: 950,
      avgLifetimeValue: 1680,
      avgFrequency: 3.2,
      retentionRate: 68,
      avgSpendPerVisit: 32,
    },
    {
      module: "self_service",
      totalCustomers: 780,
      avgLifetimeValue: 360,
      avgFrequency: 2.8,
      retentionRate: 45,
      avgSpendPerVisit: 12,
    },
  ];

  return segments;
}

/**
 * Test scenario: Multi-module branch performance
 */
export interface TestScenario {
  name: string;
  description: string;
  branchConfig: {
    branchId: string;
    branchName: string;
    activeModules: BusinessModule[];
  };
  expectedResults: {
    totalRevenue: number;
    totalBookings: number;
    topPerformingModule: BusinessModule;
    lowestPerformingModule: BusinessModule;
  };
}

export function generateTestScenarios(): TestScenario[] {
  return [
    {
      name: "Premium Multi-Module Branch",
      description: "Large branch with all 5 modules - testing complete module awareness",
      branchConfig: {
        branchId: "branch-001",
        branchName: "Manhattan Premium Wash Center",
        activeModules: ["in_bay", "tunnel", "self_service", "mobile", "manual_detailing"],
      },
      expectedResults: {
        totalRevenue: 54000,
        totalBookings: 1100,
        topPerformingModule: "manual_detailing",
        lowestPerformingModule: "self_service",
      },
    },
    {
      name: "Budget-Focused Branch",
      description: "Branch with automated modules only - no manual services",
      branchConfig: {
        branchId: "branch-002",
        branchName: "Queens Express Wash",
        activeModules: ["in_bay", "tunnel", "self_service"],
      },
      expectedResults: {
        totalRevenue: 28000,
        totalBookings: 950,
        topPerformingModule: "tunnel",
        lowestPerformingModule: "self_service",
      },
    },
    {
      name: "Premium Service Only",
      description: "Boutique detailing center - manual and mobile only",
      branchConfig: {
        branchId: "branch-003",
        branchName: "Brooklyn Elite Detailing",
        activeModules: ["manual_detailing", "mobile"],
      },
      expectedResults: {
        totalRevenue: 26000,
        totalBookings: 200,
        topPerformingModule: "manual_detailing",
        lowestPerformingModule: "mobile",
      },
    },
  ];
}
