/**
 * Mock Data for Letwash Platform
 * Centralized mock data to keep App.tsx clean
 */

import type { BusinessModule } from "../components/modules/SimpleBusinessModuleSelector";

// Service Requests
export const initialServiceRequests = [
  {
    id: "sr1",
    centerName: "AutoWash Pro",
    contactPerson: "John Smith",
    serviceName: "Ceramic Coating Application",
    description: "Professional-grade ceramic coating for long-lasting protection and enhanced appearance",
    suggestedPrice: 150,
    suggestedDuration: 120,
    vehicleTypes: ["Regular", "SUV", "Sedan"],
    category: "Premium",
    status: "pending" as const,
    submissionDate: "2024-01-22",
    businessModule: "manual_detailing" as BusinessModule,
  },
  {
    id: "sr2",
    centerName: "Clean & Shine",
    contactPerson: "Sarah Johnson",
    serviceName: "Engine Bay Detailing",
    description: "Comprehensive engine compartment cleaning and degreasing service",
    suggestedPrice: 45,
    suggestedDuration: 40,
    vehicleTypes: ["Regular", "SUV", "Truck"],
    category: "Specialty",
    status: "approved" as const,
    submissionDate: "2024-01-21",
    businessModule: "manual_detailing" as BusinessModule,
  },
  {
    id: "sr3",
    centerName: "AutoWash Pro",
    contactPerson: "John Smith",
    serviceName: "Self-Service Bay Premium Package",
    description: "Enhanced self-service package with foam cannon and tire shine",
    suggestedPrice: 25,
    suggestedDuration: 15,
    vehicleTypes: ["Regular", "SUV", "Sedan", "Truck"],
    category: "Self-Service",
    status: "pending" as const,
    submissionDate: "2024-01-25",
    businessModule: "self_service" as BusinessModule,
  },
  {
    id: "sr4",
    centerName: "SpeedWash Express",
    contactPerson: "Michael Rodriguez",
    serviceName: "Mobile Fleet Wash Service",
    description: "On-site fleet washing service for corporate clients",
    suggestedPrice: 80,
    suggestedDuration: 90,
    vehicleTypes: ["Van", "Truck", "SUV"],
    category: "Mobile",
    status: "rejected" as const,
    submissionDate: "2024-01-18",
    rejectionReason: "Service area too large",
    businessModule: "mobile" as BusinessModule,
  },
];

// Station Status Data
export const initialStations = [
  { 
    id: 1, 
    name: "Bay 1", 
    status: "active" as const, 
    currentCustomer: "John D.", 
    serviceType: "Premium Wash",
    progress: 45,
    timeRemaining: 8,
    revenue: 25
  },
  { 
    id: 2, 
    name: "Bay 2", 
    status: "idle" as const,
    timeRemaining: 0,
    revenue: 0
  },
  { 
    id: 3, 
    name: "Bay 3", 
    status: "active" as const, 
    currentCustomer: "Sarah M.", 
    serviceType: "Express Clean",
    progress: 75,
    timeRemaining: 3,
    revenue: 15
  },
  { 
    id: 4, 
    name: "Bay 4", 
    status: "maintenance" as const,
    timeRemaining: 0,
    revenue: 0
  },
  { 
    id: 5, 
    name: "Bay 5", 
    status: "active" as const, 
    currentCustomer: "Mike R.", 
    serviceType: "Full Detail",
    progress: 20,
    timeRemaining: 25,
    revenue: 45
  },
  { 
    id: 6, 
    name: "Bay 6", 
    status: "idle" as const,
    timeRemaining: 0,
    revenue: 0
  },
];

// Compact Mock Data Export
export const mockDataSummary = {
  serviceRequestsCount: initialServiceRequests.length,
  stationsCount: initialStations.length,
  version: "1.0.0",
  lastUpdated: "2024-12-10"
};
