/**
 * MOCK RESERVATION DATA GENERATOR
 * ================================
 * 
 * Generates realistic mock data for reservation testing and demo
 */

import {
  Reservation,
  ReservationStatus,
  ServiceItem,
  generateReservationCode,
  generateVerificationCode,
  calculateConfirmationDeadline,
  canCancelWithoutPenalty,
  calculateCancellationPenalty,
} from '../types/reservation';

/**
 * Sample services for manual detailing
 */
export const SAMPLE_SERVICES: ServiceItem[] = [
  {
    id: "svc-001",
    name: "Basic Hand Wash",
    duration: 30,
    price: 49.99,
    category: "wash",
    description: "Exterior hand wash with premium soap",
  },
  {
    id: "svc-002",
    name: "Premium Detail",
    duration: 90,
    price: 149.99,
    category: "detail",
    description: "Complete interior and exterior detailing",
  },
  {
    id: "svc-003",
    name: "Full Detailing Package",
    duration: 120,
    price: 249.99,
    category: "detail",
    description: "Premium detailing with wax and polish",
  },
  {
    id: "svc-004",
    name: "Interior Deep Clean",
    duration: 60,
    price: 89.99,
    category: "interior",
    description: "Deep cleaning of all interior surfaces",
  },
  {
    id: "svc-005",
    name: "Paint Correction",
    duration: 180,
    price: 399.99,
    category: "specialty",
    description: "Professional paint correction and ceramic coating",
  },
  {
    id: "svc-006",
    name: "Express Detail",
    duration: 45,
    price: 79.99,
    category: "detail",
    description: "Quick detail for busy schedules",
  },
];

/**
 * Mobile detailing specific services (limited packages)
 */
export const MOBILE_SERVICES: ServiceItem[] = [
  {
    id: "mob-001",
    name: "Mobile Express Wash",
    duration: 45,
    price: 69.99,
    category: "mobile",
    description: "Quick exterior wash at your location",
  },
  {
    id: "mob-002",
    name: "Mobile Premium Detail",
    duration: 90,
    price: 159.99,
    category: "mobile",
    description: "Complete mobile detailing service",
  },
  {
    id: "mob-003",
    name: "Mobile Interior Clean",
    duration: 60,
    price: 99.99,
    category: "mobile",
    description: "Full interior cleaning on-site",
  },
];

/**
 * Sample locations for mobile detailing
 */
const SAMPLE_LOCATIONS = [
  {
    address: "123 Main Street, San Francisco, CA 94102",
    lat: 37.7749,
    lng: -122.4194,
    travelDistance: 5.2,
    travelDuration: 15,
  },
  {
    address: "456 Oak Avenue, San Jose, CA 95110",
    lat: 37.3382,
    lng: -121.8863,
    travelDistance: 8.5,
    travelDuration: 22,
  },
  {
    address: "789 Pine Road, Oakland, CA 94607",
    lat: 37.8044,
    lng: -122.2712,
    travelDistance: 12.3,
    travelDuration: 28,
  },
  {
    address: "321 Elm Street, Berkeley, CA 94704",
    lat: 37.8715,
    lng: -122.2730,
    travelDistance: 6.8,
    travelDuration: 18,
  },
  {
    address: "654 Maple Drive, Palo Alto, CA 94301",
    lat: 37.4419,
    lng: -122.1430,
    travelDistance: 15.7,
    travelDuration: 32,
  },
];

/**
 * Sample customer data
 */
const SAMPLE_CUSTOMERS = [
  {
    id: "cust-001",
    name: "John Doe",
    phone: "+1-555-0123",
    email: "john.doe@email.com",
    vehiclePlate: "ABC-1234",
    vehicleModel: "Tesla Model 3",
    vehicleColor: "White",
  },
  {
    id: "cust-002",
    name: "Sarah Smith",
    phone: "+1-555-0124",
    email: "sarah.smith@email.com",
    vehiclePlate: "XYZ-5678",
    vehicleModel: "Honda Civic",
    vehicleColor: "Blue",
  },
  {
    id: "cust-003",
    name: "Mike Johnson",
    phone: "+1-555-0125",
    email: "mike.j@email.com",
    vehiclePlate: "LMN-9012",
    vehicleModel: "Toyota Camry",
    vehicleColor: "Silver",
  },
  {
    id: "cust-004",
    name: "Emma Davis",
    phone: "+1-555-0126",
    email: "emma.d@email.com",
    vehiclePlate: "PQR-3456",
    vehicleModel: "BMW X5",
    vehicleColor: "Black",
  },
  {
    id: "cust-005",
    name: "Chris Lee",
    phone: "+1-555-0127",
    email: "chris.lee@email.com",
    vehiclePlate: "STU-7890",
    vehicleModel: "Mercedes C-Class",
    vehicleColor: "Gray",
  },
  {
    id: "cust-006",
    name: "Lisa Wang",
    phone: "+1-555-0128",
    email: "lisa.wang@email.com",
    vehiclePlate: "VWX-2345",
    vehicleModel: "Audi A4",
    vehicleColor: "Red",
  },
  {
    id: "cust-007",
    name: "Tom Brown",
    phone: "+1-555-0129",
    email: "tom.brown@email.com",
    vehiclePlate: "YZA-6789",
    vehicleModel: "Ford F-150",
    vehicleColor: "Blue",
  },
];

/**
 * Generate a mock reservation
 */
export function generateMockReservation(
  overrides?: Partial<Reservation>
): Reservation {
  const customer = SAMPLE_CUSTOMERS[Math.floor(Math.random() * SAMPLE_CUSTOMERS.length)];
  const service = SAMPLE_SERVICES[Math.floor(Math.random() * SAMPLE_SERVICES.length)];
  
  const scheduledStart = new Date();
  scheduledStart.setDate(scheduledStart.getDate() + Math.floor(Math.random() * 7));
  scheduledStart.setHours(9 + Math.floor(Math.random() * 9), 0, 0, 0);
  
  const scheduledEnd = new Date(scheduledStart);
  scheduledEnd.setMinutes(scheduledEnd.getMinutes() + service.duration);
  
  const confirmationDeadline = calculateConfirmationDeadline(scheduledStart);
  const canCancel = canCancelWithoutPenalty(confirmationDeadline);
  const penaltyAmount = calculateCancellationPenalty(service.price);
  
  const requestedAt = new Date();
  requestedAt.setHours(requestedAt.getHours() - Math.floor(Math.random() * 48));
  
  return {
    id: `res-${Math.random().toString(36).substring(2, 9)}`,
    reservationCode: generateReservationCode(),
    status: "reserved" as ReservationStatus,
    businessModule: "manual_detailing",
    stationId: "station-5",
    stationName: "Detail Station Alpha",
    
    customer,
    
    services: [service],
    totalDuration: service.duration,
    totalPrice: service.price,
    finalPrice: service.price,
    
    scheduledDate: scheduledStart.toISOString().split('T')[0],
    scheduledStartTime: scheduledStart.toTimeString().substring(0, 5),
    scheduledEndTime: scheduledEnd.toTimeString().substring(0, 5),
    scheduledStart,
    scheduledEnd,
    
    timeline: {
      requestedAt,
      approvedAt: new Date(requestedAt.getTime() + 1800000), // 30 min after request
    },
    
    approvalStatus: "approved",
    
    confirmationDeadline,
    confirmationRequested: false,
    confirmedByCustomer: false,
    
    cancellationPolicy: {
      freeUntil: confirmationDeadline,
      penaltyAmount,
      canCancel,
      canReschedule: canCancel,
    },
    
    verificationCode: generateVerificationCode(),
    checkInVerified: false,
    
    createdAt: requestedAt,
    updatedAt: new Date(),
    
    ...overrides,
  };
}

/**
 * Generate mock reservations for today
 */
export function generateTodayReservations(count: number = 8): Reservation[] {
  const reservations: Reservation[] = [];
  const today = new Date();
  const statuses: ReservationStatus[] = [
    "requested",
    "pending-approval",
    "reserved",
    "confirmed",
    "checked-in",
    "in-progress",
    "completed",
    "picked-up",
  ];
  
  // Mix of business modules
  const businessModules = ["manual_detailing", "manual_detailing", "in_bay", "tunnel", "self_service"];
  
  for (let i = 0; i < count; i++) {
    const scheduledStart = new Date(today);
    scheduledStart.setHours(8 + i * 2, 0, 0, 0);
    
    const service = SAMPLE_SERVICES[i % SAMPLE_SERVICES.length];
    const customer = SAMPLE_CUSTOMERS[i % SAMPLE_CUSTOMERS.length];
    const status = statuses[i % statuses.length];
    const businessModule = businessModules[i % businessModules.length];
    
    const scheduledEnd = new Date(scheduledStart);
    scheduledEnd.setMinutes(scheduledEnd.getMinutes() + service.duration);
    
    const confirmationDeadline = calculateConfirmationDeadline(scheduledStart);
    const requestedAt = new Date(scheduledStart);
    requestedAt.setDate(requestedAt.getDate() - 2);
    
    reservations.push(generateMockReservation({
      status,
      businessModule: businessModule as any,
      services: [service],
      customer,
      totalDuration: service.duration,
      totalPrice: service.price,
      finalPrice: service.price,
      scheduledDate: scheduledStart.toISOString().split('T')[0],
      scheduledStartTime: scheduledStart.toTimeString().substring(0, 5),
      scheduledEndTime: scheduledEnd.toTimeString().substring(0, 5),
      scheduledStart,
      scheduledEnd,
      confirmationDeadline,
      timeline: {
        requestedAt,
        approvedAt: status !== "requested" && status !== "pending-approval" 
          ? new Date(requestedAt.getTime() + 1800000) 
          : undefined,
        confirmedAt: ["confirmed", "checked-in", "in-progress", "completed", "picked-up"].includes(status)
          ? new Date(confirmationDeadline.getTime() + 3600000)
          : undefined,
        checkedInAt: ["checked-in", "in-progress", "completed", "picked-up"].includes(status)
          ? new Date(scheduledStart)
          : undefined,
        startedAt: ["in-progress", "completed", "picked-up"].includes(status)
          ? new Date(scheduledStart.getTime() + 300000)
          : undefined,
        completedAt: ["completed", "picked-up"].includes(status)
          ? new Date(scheduledEnd)
          : undefined,
        pickedUpAt: status === "picked-up"
          ? new Date(scheduledEnd.getTime() + 600000)
          : undefined,
      },
      confirmationRequested: ["confirmed", "checked-in", "in-progress", "completed", "picked-up"].includes(status),
      confirmedByCustomer: ["confirmed", "checked-in", "in-progress", "completed", "picked-up"].includes(status),
      checkInVerified: ["checked-in", "in-progress", "completed", "picked-up"].includes(status),
      approvalStatus: status === "requested" || status === "pending-approval" ? "pending" : "approved",
    }));
  }
  
  return reservations;
}

/**
 * Generate reservations with specific statuses for testing
 */
export function generateReservationsByStatus(): Record<ReservationStatus, Reservation> {
  const baseTime = new Date();
  baseTime.setHours(10, 0, 0, 0);
  
  const statuses: ReservationStatus[] = [
    "requested",
    "pending-approval",
    "alternative-offered",
    "reserved",
    "confirmed",
    "checked-in",
    "in-progress",
    "completed",
    "picked-up",
    "cancelled",
    "cancelled-penalty",
    "no-show",
    "rescheduled",
  ];
  
  const result: Record<string, Reservation> = {};
  
  statuses.forEach((status, index) => {
    const scheduledStart = new Date(baseTime);
    scheduledStart.setHours(scheduledStart.getHours() + index);
    
    result[status] = generateMockReservation({
      status,
      scheduledStart,
      scheduledDate: scheduledStart.toISOString().split('T')[0],
      scheduledStartTime: scheduledStart.toTimeString().substring(0, 5),
    });
  });
  
  return result as Record<ReservationStatus, Reservation>;
}

/**
 * Sample special requests
 */
export const SPECIAL_REQUESTS = [
  "Please use fragrance-free products",
  "Extra attention to pet hair removal",
  "Leather seats need conditioning",
  "Scratches on driver's side door",
  "Rush service if possible",
  "Child car seats to be cleaned separately",
];

/**
 * Sample internal notes
 */
export const INTERNAL_NOTES = [
  "VIP customer - ensure premium service",
  "Previous complaint about water spots",
  "Customer prefers specific detailer",
  "Regular customer - knows the process",
  "New customer - provide full explanation",
  "Payment pending approval",
];

/**
 * Generate mobile detailing reservations
 */
export function generateMobileReservations(count: number = 10): Reservation[] {
  const reservations: Reservation[] = [];
  const mobileStatuses: ReservationStatus[] = [
    "requested",
    "pending-approval",
    "reserved",
    "confirmed",
    "checked-in",
    "in-progress",
    "completed",
    "picked-up",
  ];
  
  for (let i = 0; i < count; i++) {
    const scheduledStart = new Date();
    scheduledStart.setDate(scheduledStart.getDate() + Math.floor(i / 3)); // Spread across days
    scheduledStart.setHours(9 + (i % 3) * 3, 0, 0, 0); // 9am, 12pm, 3pm
    
    const service = MOBILE_SERVICES[i % MOBILE_SERVICES.length];
    const customer = SAMPLE_CUSTOMERS[i % SAMPLE_CUSTOMERS.length];
    const location = SAMPLE_LOCATIONS[i % SAMPLE_LOCATIONS.length];
    const status = mobileStatuses[i % mobileStatuses.length];
    
    const travelFee = location.travelDistance * 2; // $2 per km
    const totalDuration = service.duration + location.travelDuration;
    const totalPrice = service.price + travelFee;
    
    const scheduledEnd = new Date(scheduledStart);
    scheduledEnd.setMinutes(scheduledEnd.getMinutes() + totalDuration);
    
    const confirmationDeadline = calculateConfirmationDeadline(scheduledStart);
    const requestedAt = new Date(scheduledStart);
    requestedAt.setDate(requestedAt.getDate() - 1);
    
    // Determine worker status based on reservation status
    let workerStatus: "idle" | "en-route" | "on-site" | "returning" | undefined;
    if (status === "confirmed") workerStatus = "idle";
    if (status === "confirmed" && Math.random() > 0.5) workerStatus = "en-route";
    if (status === "checked-in") workerStatus = "on-site";
    if (status === "in-progress") workerStatus = "on-site";
    if (status === "completed" || status === "picked-up") workerStatus = "returning";
    
    reservations.push(generateMockReservation({
      businessModule: "mobile_detailing",
      status,
      services: [service],
      customer,
      totalDuration,
      totalPrice,
      finalPrice: totalPrice,
      stationId: `mobile-unit-${(i % 3) + 1}`,
      stationName: `Mobile Unit ${(i % 3) + 1}`,
      scheduledDate: scheduledStart.toISOString().split('T')[0],
      scheduledStartTime: scheduledStart.toTimeString().substring(0, 5),
      scheduledEndTime: scheduledEnd.toTimeString().substring(0, 5),
      scheduledStart,
      scheduledEnd,
      confirmationDeadline,
      serviceLocation: {
        ...location,
        directions: `https://www.google.com/maps/dir/?api=1&destination=${location.lat},${location.lng}`,
      },
      workerStatus,
      timeline: {
        requestedAt,
        approvedAt: status !== "requested" && status !== "pending-approval" 
          ? new Date(requestedAt.getTime() + 1800000) 
          : undefined,
        confirmedAt: ["confirmed", "checked-in", "in-progress", "completed", "picked-up"].includes(status)
          ? new Date(confirmationDeadline.getTime() + 3600000)
          : undefined,
        checkedInAt: ["checked-in", "in-progress", "completed", "picked-up"].includes(status)
          ? new Date(scheduledStart)
          : undefined,
        startedAt: ["in-progress", "completed", "picked-up"].includes(status)
          ? new Date(scheduledStart.getTime() + 300000)
          : undefined,
        completedAt: ["completed", "picked-up"].includes(status)
          ? new Date(scheduledEnd)
          : undefined,
        pickedUpAt: status === "picked-up"
          ? new Date(scheduledEnd.getTime() + 600000)
          : undefined,
      },
      confirmationRequested: ["confirmed", "checked-in", "in-progress", "completed", "picked-up"].includes(status),
      confirmedByCustomer: ["confirmed", "checked-in", "in-progress", "completed", "picked-up"].includes(status),
      checkInVerified: ["checked-in", "in-progress", "completed", "picked-up"].includes(status),
      approvalStatus: status === "requested" || status === "pending-approval" ? "pending" : "approved",
      assignedStaff: {
        id: `worker-${(i % 3) + 1}`,
        name: ["Michael Torres", "Jessica Martinez", "David Kim"][i % 3],
        rating: 4.5 + (Math.random() * 0.5),
      },
    }));
  }
  
  return reservations;
}