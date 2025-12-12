/**
 * MODULE-AWARE METRICS COMPONENT
 * ===============================
 * 
 * Displays real-time metrics specific to business module operation models
 * - Walk-in modules: Transaction-based metrics
 * - Reservation modules: Booking-based metrics
 */

"use client";

import { Card, CardContent } from "../ui/card";
import { Badge } from "../ui/badge";
import { cn } from "../ui/utils";
import {
  TrendingUp,
  TrendingDown,
  Activity,
  Zap,
  Users,
  DollarSign,
  Clock,
  Calendar,
  CheckCircle,
  Radio,
  AlertCircle,
} from "lucide-react";
import { motion } from "motion/react";
import { BusinessModule, getModuleConfig, OperationModel } from "../../types/business-modules";
import { Station } from "../management/StationStatusManager";
import { Reservation } from "../../types/reservation";

interface MetricCardProps {
  label: string;
  value: string | number;
  change?: string;
  trend?: "up" | "down" | "neutral";
  icon: any;
  color?: string;
  delay?: number;
}

function MetricCard({ label, value, change, trend, icon: Icon, color = "blue", delay = 0 }: MetricCardProps) {
  const colorMap = {
    blue: "bg-blue-100 text-blue-700 border-blue-200",
    green: "bg-green-100 text-green-700 border-green-200",
    purple: "bg-purple-100 text-purple-700 border-purple-200",
    orange: "bg-orange-100 text-orange-700 border-orange-200",
    red: "bg-red-100 text-red-700 border-red-200",
    yellow: "bg-yellow-100 text-yellow-700 border-yellow-200",
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
    >
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-2">
            <div className={cn("size-10 rounded-lg flex items-center justify-center", colorMap[color as keyof typeof colorMap])}>
              <Icon size={20} />
            </div>
            {change && (
              <Badge
                variant="outline"
                className={cn(
                  "text-xs",
                  trend === "up" && "text-green-600 border-green-200 bg-green-50",
                  trend === "down" && "text-red-600 border-red-200 bg-red-50",
                  trend === "neutral" && "text-neutral-600 border-neutral-200"
                )}
              >
                {trend === "up" && <TrendingUp size={12} className="mr-1" />}
                {trend === "down" && <TrendingDown size={12} className="mr-1" />}
                {change}
              </Badge>
            )}
          </div>
          <p className="text-3xl font-bold">{value}</p>
          <p className="text-sm text-neutral-600 mt-1">{label}</p>
        </CardContent>
      </Card>
    </motion.div>
  );
}

interface WalkInMetricsProps {
  stations: Station[];
  module?: BusinessModule;
}

export function WalkInMetrics({ stations, module }: WalkInMetricsProps) {
  // Filter stations by walk-in modules
  const walkInStations = stations.filter(s => 
    s.operationModel === "walk-in" && 
    (module ? s.businessModule === module : true)
  );

  // Calculate metrics
  const activeTransactions = walkInStations.filter(s => s.status === "occupied").length;
  const availableStations = walkInStations.filter(s => s.status === "available").length;
  const cleaningStations = walkInStations.filter(s => s.status === "cleaning").length;
  
  // Calculate throughput (services per hour)
  const avgThroughput = walkInStations.reduce((acc, s) => {
    return acc + (s.capacity?.servicesPerHour || 0);
  }, 0);

  // Calculate current revenue rate ($/hour)
  const revenueRate = activeTransactions * 45; // Mock: $45 per active service

  // Calculate average wait time
  const queueLength = Math.floor(Math.random() * 3); // Mock queue
  const avgWaitTime = queueLength > 0 ? queueLength * 5 : 0; // 5 min per car in queue

  // Calculate utilization
  const totalCapacity = walkInStations.length;
  const utilization = totalCapacity > 0 
    ? Math.round((activeTransactions / totalCapacity) * 100) 
    : 0;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <MetricCard
        label="Active Transactions"
        value={activeTransactions}
        change={`${availableStations} available`}
        trend="neutral"
        icon={Radio}
        color="blue"
        delay={0}
      />
      
      <MetricCard
        label="Throughput/Hour"
        value={Math.round(avgThroughput)}
        change="+12%"
        trend="up"
        icon={Zap}
        color="green"
        delay={0.1}
      />
      
      <MetricCard
        label="Revenue Rate"
        value={`$${revenueRate}/hr`}
        change="+8%"
        trend="up"
        icon={DollarSign}
        color="purple"
        delay={0.2}
      />
      
      <MetricCard
        label="Avg Wait Time"
        value={`${avgWaitTime} min`}
        change={queueLength > 0 ? `${queueLength} in queue` : "No wait"}
        trend={queueLength > 2 ? "down" : "up"}
        icon={Clock}
        color={queueLength > 2 ? "orange" : "green"}
        delay={0.3}
      />
    </div>
  );
}

interface ReservationMetricsProps {
  reservations: Reservation[];
  stations: Station[];
  module?: BusinessModule;
}

export function ReservationMetrics({ reservations, stations, module }: ReservationMetricsProps) {
  // Filter reservations for today
  const today = new Date().toISOString().split('T')[0];
  const todayReservations = reservations.filter(r => 
    r.scheduledDate === today &&
    (module ? r.businessModule === module : true)
  );

  // Calculate metrics
  const upcomingCount = todayReservations.filter(r => 
    ["reserved", "confirmed"].includes(r.status)
  ).length;

  const confirmedCount = todayReservations.filter(r => 
    r.status === "confirmed"
  ).length;

  const checkedInCount = todayReservations.filter(r => 
    ["checked-in", "in-progress"].includes(r.status)
  ).length;

  const completedCount = todayReservations.filter(r => 
    ["completed", "picked-up"].includes(r.status)
  ).length;

  const pendingApproval = todayReservations.filter(r => 
    ["requested", "pending-approval"].includes(r.status)
  ).length;

  // Calculate utilization
  const reservationStations = stations.filter(s => 
    s.operationModel === "reservation" &&
    (module ? s.businessModule === module : true)
  );
  
  const totalSlots = reservationStations.length * 8; // 8 slots per day per station
  const bookedSlots = todayReservations.length;
  const utilization = totalSlots > 0 
    ? Math.round((bookedSlots / totalSlots) * 100) 
    : 0;

  // Calculate revenue
  const todayRevenue = todayReservations
    .filter(r => r.status === "picked-up")
    .reduce((acc, r) => acc + r.finalPrice, 0);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <MetricCard
        label="Upcoming Today"
        value={upcomingCount}
        change={`${confirmedCount} confirmed`}
        trend="neutral"
        icon={Calendar}
        color="blue"
        delay={0}
      />
      
      <MetricCard
        label="Currently Serving"
        value={checkedInCount}
        change={`${completedCount} completed`}
        trend="up"
        icon={Activity}
        color="green"
        delay={0.1}
      />
      
      <MetricCard
        label="Utilization Rate"
        value={`${utilization}%`}
        change={`${bookedSlots}/${totalSlots} slots`}
        trend={utilization > 70 ? "up" : "neutral"}
        icon={Users}
        color={utilization > 70 ? "green" : "yellow"}
        delay={0.2}
      />
      
      <MetricCard
        label="Revenue Today"
        value={`$${todayRevenue.toFixed(0)}`}
        change={pendingApproval > 0 ? `${pendingApproval} pending` : "All approved"}
        trend={todayRevenue > 500 ? "up" : "neutral"}
        icon={DollarSign}
        color="purple"
        delay={0.3}
      />
    </div>
  );
}

interface CombinedMetricsProps {
  stations: Station[];
  reservations: Reservation[];
}

export function CombinedMetrics({ stations, reservations }: CombinedMetricsProps) {
  // Overall metrics combining both models
  const walkInStations = stations.filter(s => s.operationModel === "walk-in");
  const reservationStations = stations.filter(s => s.operationModel === "reservation");

  const activeWalkIns = walkInStations.filter(s => s.status === "occupied").length;
  
  const today = new Date().toISOString().split('T')[0];
  const todayReservations = reservations.filter(r => r.scheduledDate === today);
  const activeReservations = todayReservations.filter(r => 
    ["checked-in", "in-progress"].includes(r.status)
  ).length;

  const totalActive = activeWalkIns + activeReservations;
  const totalStations = stations.length;
  const utilizationRate = totalStations > 0 
    ? Math.round((totalActive / totalStations) * 100) 
    : 0;

  // Revenue calculation
  const walkInRevenue = activeWalkIns * 45; // Mock
  const reservationRevenue = todayReservations
    .filter(r => r.status === "picked-up")
    .reduce((acc, r) => acc + r.finalPrice, 0);
  const totalRevenue = walkInRevenue + reservationRevenue;

  // Pending approvals
  const pendingApprovals = todayReservations.filter(r => 
    r.status === "pending-approval"
  ).length;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <MetricCard
        label="Active Services"
        value={totalActive}
        change={`${activeWalkIns} walk-in, ${activeReservations} reserved`}
        trend="up"
        icon={Radio}
        color="blue"
        delay={0}
      />
      
      <MetricCard
        label="Overall Utilization"
        value={`${utilizationRate}%`}
        change={`${totalActive}/${totalStations} stations`}
        trend={utilizationRate > 70 ? "up" : "neutral"}
        icon={Activity}
        color={utilizationRate > 70 ? "green" : "yellow"}
        delay={0.1}
      />
      
      <MetricCard
        label="Total Revenue"
        value={`$${totalRevenue.toFixed(0)}`}
        change="+15%"
        trend="up"
        icon={DollarSign}
        color="purple"
        delay={0.2}
      />
      
      <MetricCard
        label="Action Items"
        value={pendingApprovals}
        change={pendingApprovals > 0 ? "Needs approval" : "All clear"}
        trend={pendingApprovals > 0 ? "down" : "up"}
        icon={AlertCircle}
        color={pendingApprovals > 0 ? "orange" : "green"}
        delay={0.3}
      />
    </div>
  );
}
