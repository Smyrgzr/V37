/**
 * MOCK WORKER DATA
 * ================
 * 
 * Sample worker data for testing capacity management
 */

import { 
  Worker, 
  WorkerRole, 
  WorkerSpecialization, 
  WeeklySchedule,
  WorkerPerformance 
} from '../types/worker';
import { BusinessModule } from '../types/business-modules';

/**
 * Generate mock workers for a branch
 */
export function generateMockWorkers(branchId: string, branchName: string): Worker[] {
  const baseDate = new Date('2024-01-15');
  
  return [
    {
      id: "worker-1",
      name: "Mike Thompson",
      email: "mike.thompson@letwash.com",
      phone: "+1-555-0987",
      role: "manager",
      specializations: [
        { module: "manual_detailing", level: "expert", certifiedAt: baseDate, hoursTrained: 200 },
        { module: "in_bay", level: "expert", certifiedAt: baseDate, hoursTrained: 150 }
      ],
      canDrive: true,
      canDetail: true,
      branchId,
      branchName,
      employeeId: "EMP001",
      joinDate: baseDate,
      status: "available",
      currentStatus: "available",
      currentAssignments: [],
      maxConcurrentJobs: 1,
      weeklySchedule: createStandardWeeklySchedule(branchId, "08:00", "17:00"),
      upcomingShifts: [],
      overallRating: 4.8,
      totalJobsCompleted: 245,
      createdAt: baseDate,
      updatedAt: new Date(),
      lastActiveAt: new Date()
    },
    {
      id: "worker-2",
      name: "Sarah Johnson",
      email: "sarah.johnson@letwash.com",
      phone: "+1-555-0234",
      role: "detailer",
      specializations: [
        { module: "manual_detailing", level: "expert", certifiedAt: new Date('2024-02-10'), hoursTrained: 180 },
        { module: "mobile_detailing", level: "intermediate", certifiedAt: new Date('2024-02-10'), hoursTrained: 80 }
      ],
      canDrive: false,
      canDetail: true,
      branchId,
      branchName,
      employeeId: "EMP002",
      joinDate: new Date('2024-02-10'),
      status: "available",
      currentStatus: "available",
      currentAssignments: [],
      maxConcurrentJobs: 1,
      weeklySchedule: createStandardWeeklySchedule(branchId, "09:00", "18:00"),
      upcomingShifts: [],
      overallRating: 4.6,
      totalJobsCompleted: 189,
      createdAt: new Date('2024-02-10'),
      updatedAt: new Date(),
      lastActiveAt: new Date()
    },
    {
      id: "worker-3",
      name: "Alex Rodriguez",
      email: "alex.rodriguez@letwash.com",
      phone: "+1-555-0345",
      role: "mobile_detailer",
      specializations: [
        { module: "mobile_detailing", level: "expert", certifiedAt: new Date('2024-01-20'), hoursTrained: 250 },
        { module: "manual_detailing", level: "intermediate", certifiedAt: new Date('2024-01-20'), hoursTrained: 100 }
      ],
      canDrive: true,
      canDetail: true,
      branchId,
      branchName,
      employeeId: "EMP003",
      joinDate: new Date('2024-01-20'),
      status: "available",
      currentStatus: "busy",
      currentAssignments: [{
        id: "assignment-1",
        workerId: "worker-3",
        reservationId: "res-001",
        type: "mobile",
        status: "en-route",
        assignedAt: new Date(),
        estimatedDuration: 120,
        location: {
          address: "123 Main St, Brooklyn, NY",
          lat: 40.6782,
          lng: -73.9442
        },
        travelDistance: 5.2,
        travelDuration: 15
      }],
      maxConcurrentJobs: 1,
      weeklySchedule: createStandardWeeklySchedule(branchId, "08:00", "20:00"),
      upcomingShifts: [],
      overallRating: 4.9,
      totalJobsCompleted: 312,
      maxDistanceKm: 30,
      createdAt: new Date('2024-01-20'),
      updatedAt: new Date(),
      lastActiveAt: new Date()
    },
    {
      id: "worker-4",
      name: "Emily Davis",
      email: "emily.davis@letwash.com",
      phone: "+1-555-0456",
      role: "both",
      specializations: [
        { module: "manual_detailing", level: "intermediate", certifiedAt: new Date('2024-03-05'), hoursTrained: 120 },
        { module: "mobile_detailing", level: "beginner", certifiedAt: new Date('2024-03-05'), hoursTrained: 40 }
      ],
      canDrive: true,
      canDetail: true,
      branchId,
      branchName,
      employeeId: "EMP004",
      joinDate: new Date('2024-03-05'),
      status: "available",
      currentStatus: "available",
      currentAssignments: [],
      maxConcurrentJobs: 1,
      weeklySchedule: createStandardWeeklySchedule(branchId, "10:00", "19:00"),
      upcomingShifts: [],
      overallRating: 4.5,
      totalJobsCompleted: 145,
      maxDistanceKm: 20,
      createdAt: new Date('2024-03-05'),
      updatedAt: new Date(),
      lastActiveAt: new Date()
    },
    {
      id: "worker-5",
      name: "David Wilson",
      email: "david.wilson@letwash.com",
      phone: "+1-555-0567",
      role: "technician",
      specializations: [
        { module: "in_bay", level: "expert", certifiedAt: new Date('2023-11-12'), hoursTrained: 300 },
        { module: "tunnel", level: "expert", certifiedAt: new Date('2023-11-12'), hoursTrained: 280 },
        { module: "self_service", level: "intermediate", certifiedAt: new Date('2023-11-12'), hoursTrained: 150 }
      ],
      canDrive: false,
      canDetail: false,
      branchId,
      branchName,
      employeeId: "EMP005",
      joinDate: new Date('2023-11-12'),
      status: "available",
      currentStatus: "on-break",
      currentAssignments: [],
      maxConcurrentJobs: 2,
      weeklySchedule: createStandardWeeklySchedule(branchId, "07:00", "16:00"),
      upcomingShifts: [],
      overallRating: 4.7,
      totalJobsCompleted: 278,
      createdAt: new Date('2023-11-12'),
      updatedAt: new Date(),
      lastActiveAt: new Date()
    },
    {
      id: "worker-6",
      name: "Jennifer Lee",
      email: "jennifer.lee@letwash.com",
      phone: "+1-555-0678",
      role: "detailer",
      specializations: [
        { module: "manual_detailing", level: "expert", certifiedAt: new Date('2024-01-08'), hoursTrained: 220 }
      ],
      canDrive: false,
      canDetail: true,
      branchId,
      branchName,
      employeeId: "EMP006",
      joinDate: new Date('2024-01-08'),
      status: "available",
      currentStatus: "available",
      currentAssignments: [],
      maxConcurrentJobs: 1,
      weeklySchedule: createStandardWeeklySchedule(branchId, "08:00", "17:00"),
      upcomingShifts: [],
      overallRating: 4.9,
      totalJobsCompleted: 156,
      createdAt: new Date('2024-01-08'),
      updatedAt: new Date(),
      lastActiveAt: new Date()
    },
    {
      id: "worker-7",
      name: "Robert Martinez",
      email: "robert.martinez@letwash.com",
      phone: "+1-555-0789",
      role: "mobile_detailer",
      specializations: [
        { module: "mobile_detailing", level: "expert", certifiedAt: new Date('2023-09-20'), hoursTrained: 280 }
      ],
      canDrive: true,
      canDetail: true,
      branchId,
      branchName,
      employeeId: "EMP007",
      joinDate: new Date('2023-09-20'),
      status: "on-leave",
      currentStatus: "off-duty",
      currentAssignments: [],
      maxConcurrentJobs: 1,
      weeklySchedule: createStandardWeeklySchedule(branchId, "08:00", "20:00"),
      upcomingShifts: [],
      overallRating: 4.6,
      totalJobsCompleted: 234,
      maxDistanceKm: 40,
      createdAt: new Date('2023-09-20'),
      updatedAt: new Date(),
      lastActiveAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) // 7 days ago
    },
    {
      id: "worker-8",
      name: "Lisa Anderson",
      email: "lisa.anderson@letwash.com",
      phone: "+1-555-0890",
      role: "customer_service",
      specializations: [],
      canDrive: false,
      canDetail: false,
      branchId,
      branchName,
      employeeId: "EMP008",
      joinDate: new Date('2024-02-18'),
      status: "available",
      currentStatus: "available",
      currentAssignments: [],
      maxConcurrentJobs: 3,
      weeklySchedule: createStandardWeeklySchedule(branchId, "09:00", "18:00"),
      upcomingShifts: [],
      overallRating: 4.8,
      totalJobsCompleted: 267,
      createdAt: new Date('2024-02-18'),
      updatedAt: new Date(),
      lastActiveAt: new Date()
    },
    {
      id: "worker-9",
      name: "Carlos Mendez",
      email: "carlos.mendez@letwash.com",
      phone: "+1-555-0901",
      role: "driver",
      specializations: [
        { module: "mobile_detailing", level: "intermediate", certifiedAt: new Date('2024-04-10'), hoursTrained: 80 }
      ],
      canDrive: true,
      canDetail: false,
      branchId,
      branchName,
      employeeId: "EMP009",
      joinDate: new Date('2024-04-10'),
      status: "available",
      currentStatus: "available",
      currentAssignments: [],
      maxConcurrentJobs: 1,
      weeklySchedule: createStandardWeeklySchedule(branchId, "07:00", "19:00"),
      upcomingShifts: [],
      overallRating: 4.4,
      totalJobsCompleted: 98,
      maxDistanceKm: 50,
      createdAt: new Date('2024-04-10'),
      updatedAt: new Date(),
      lastActiveAt: new Date()
    },
    {
      id: "worker-10",
      name: "Maria Garcia",
      email: "maria.garcia@letwash.com",
      phone: "+1-555-1012",
      role: "both",
      specializations: [
        { module: "manual_detailing", level: "expert", certifiedAt: new Date('2023-12-05'), hoursTrained: 240 },
        { module: "mobile_detailing", level: "expert", certifiedAt: new Date('2023-12-05'), hoursTrained: 200 }
      ],
      canDrive: true,
      canDetail: true,
      branchId,
      branchName,
      employeeId: "EMP010",
      joinDate: new Date('2023-12-05'),
      status: "available",
      currentStatus: "available",
      currentAssignments: [],
      maxConcurrentJobs: 1,
      weeklySchedule: createStandardWeeklySchedule(branchId, "08:00", "18:00"),
      upcomingShifts: [],
      overallRating: 4.95,
      totalJobsCompleted: 321,
      maxDistanceKm: 35,
      createdAt: new Date('2023-12-05'),
      updatedAt: new Date(),
      lastActiveAt: new Date()
    }
  ];
}

/**
 * Create standard weekly schedule (Mon-Fri)
 */
function createStandardWeeklySchedule(
  branchId: string,
  startTime: string,
  endTime: string
): WeeklySchedule {
  const workDay = {
    isWorkingDay: true,
    startTime,
    endTime,
    breakStart: "12:00",
    breakEnd: "13:00",
    branchId
  };
  
  const dayOff = {
    isWorkingDay: false
  };
  
  return {
    workerId: "", // Will be set when assigned to worker
    monday: workDay,
    tuesday: workDay,
    wednesday: workDay,
    thursday: workDay,
    friday: workDay,
    saturday: { ...workDay, startTime: "09:00", endTime: "15:00" },
    sunday: dayOff
  };
}

/**
 * Generate worker performance data
 */
export function generateWorkerPerformance(
  workerId: string,
  period: "daily" | "weekly" | "monthly" | "yearly" = "monthly"
): WorkerPerformance {
  const now = new Date();
  const periodStart = new Date(now);
  
  switch (period) {
    case "daily":
      periodStart.setHours(0, 0, 0, 0);
      break;
    case "weekly":
      periodStart.setDate(now.getDate() - 7);
      break;
    case "monthly":
      periodStart.setMonth(now.getMonth() - 1);
      break;
    case "yearly":
      periodStart.setFullYear(now.getFullYear() - 1);
      break;
  }
  
  const totalJobs = Math.floor(Math.random() * 50) + 20;
  const completedJobs = Math.floor(totalJobs * (0.9 + Math.random() * 0.1));
  const cancelledJobs = totalJobs - completedJobs;
  
  return {
    workerId,
    period,
    periodStart,
    periodEnd: now,
    totalJobs,
    completedJobs,
    cancelledJobs,
    completionRate: Math.round((completedJobs / totalJobs) * 100),
    hoursWorked: Math.floor(Math.random() * 80) + 120,
    overtimeHours: Math.floor(Math.random() * 10),
    avgJobDuration: Math.floor(Math.random() * 60) + 45,
    customerRating: 4.0 + Math.random(),
    totalRatings: Math.floor(Math.random() * 40) + 10,
    complaints: Math.floor(Math.random() * 3),
    compliments: Math.floor(Math.random() * 15) + 5,
    scheduledShifts: 22,
    completedShifts: 20 + Math.floor(Math.random() * 2),
    lateArrivals: Math.floor(Math.random() * 3),
    earlyDepartures: Math.floor(Math.random() * 2),
    attendanceRate: 90 + Math.floor(Math.random() * 10),
    totalRevenue: Math.floor(Math.random() * 5000) + 8000,
    avgRevenuePerJob: Math.floor(Math.random() * 200) + 150
  };
}

/**
 * Get workers by branch
 */
export function getWorkersByBranch(branchId: string): Worker[] {
  // In real app, this would query database
  // For now, return mock data for all branches
  const branchNames: Record<string, string> = {
    'branch-1': 'Downtown Branch',
    'branch-2': 'Uptown Branch',
    'branch-3': 'Brooklyn Branch'
  };
  
  return generateMockWorkers(branchId, branchNames[branchId] || 'Unknown Branch');
}

/**
 * Get workers by role
 */
export function getWorkersByRole(workers: Worker[], role: WorkerRole): Worker[] {
  return workers.filter(w => w.role === role || w.role === "both");
}

/**
 * Get workers by module
 */
export function getWorkersByModule(workers: Worker[], module: BusinessModule): Worker[] {
  return workers.filter(w => 
    w.specializations.some(spec => spec.module === module)
  );
}

/**
 * Get available workers for now
 */
export function getAvailableWorkers(workers: Worker[]): Worker[] {
  return workers.filter(w => 
    w.currentStatus === "available" && 
    w.status === "available"
  );
}

/**
 * Get busy workers
 */
export function getBusyWorkers(workers: Worker[]): Worker[] {
  return workers.filter(w => w.currentStatus === "busy");
}
