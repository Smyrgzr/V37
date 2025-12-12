/**
 * RESERVATION STATUS BADGE COMPONENT
 * ===================================
 * 
 * Visual indicator for reservation status with colors and icons
 */

import { Badge } from "../ui/badge";
import { cn } from "../ui/utils";
import {
  Clock,
  AlertCircle,
  CheckCircle,
  Calendar,
  UserCheck,
  Play,
  CheckCheck,
  Package,
  X,
  XCircle,
  UserX,
  RefreshCw,
} from "lucide-react";
import { ReservationStatus, getReservationStatusColor, getReservationStatusLabel } from "../../types/reservation";

interface ReservationStatusBadgeProps {
  status: ReservationStatus;
  size?: "sm" | "md" | "lg";
  showIcon?: boolean;
}

export function ReservationStatusBadge({
  status,
  size = "md",
  showIcon = true,
}: ReservationStatusBadgeProps) {
  const colorClass = getReservationStatusColor(status);
  const label = getReservationStatusLabel(status);
  
  const iconMap: Record<ReservationStatus, any> = {
    "requested": Clock,
    "pending-approval": AlertCircle,
    "alternative-offered": RefreshCw,
    "reserved": Calendar,
    "confirmed": CheckCircle,
    "checked-in": UserCheck,
    "in-progress": Play,
    "completed": CheckCheck,
    "picked-up": Package,
    "cancelled": X,
    "cancelled-penalty": XCircle,
    "no-show": UserX,
    "rescheduled": RefreshCw,
  };
  
  const Icon = iconMap[status];
  
  const sizeClasses = {
    sm: "text-xs px-2 py-0.5",
    md: "text-sm px-2.5 py-1",
    lg: "text-base px-3 py-1.5",
  };
  
  const iconSizes = {
    sm: 12,
    md: 14,
    lg: 16,
  };
  
  return (
    <Badge 
      variant="outline" 
      className={cn(
        "gap-1.5 font-medium",
        colorClass,
        sizeClasses[size]
      )}
    >
      {showIcon && Icon && <Icon size={iconSizes[size]} />}
      {label}
    </Badge>
  );
}

/**
 * Timeline status indicator - shows which stage we're at
 */
export function ReservationTimelineIndicator({ status }: { status: ReservationStatus }) {
  const stages = [
    { key: "requested", label: "Requested" },
    { key: "reserved", label: "Reserved" },
    { key: "confirmed", label: "Confirmed" },
    { key: "checked-in", label: "Checked In" },
    { key: "in-progress", label: "In Progress" },
    { key: "completed", label: "Completed" },
    { key: "picked-up", label: "Picked Up" },
  ];
  
  const statusOrder: Record<string, number> = {
    "requested": 0,
    "pending-approval": 0,
    "alternative-offered": 0,
    "reserved": 1,
    "confirmed": 2,
    "checked-in": 3,
    "in-progress": 4,
    "completed": 5,
    "picked-up": 6,
    "cancelled": -1,
    "cancelled-penalty": -1,
    "no-show": -1,
    "rescheduled": -1,
  };
  
  const currentStageIndex = statusOrder[status];
  
  if (currentStageIndex === -1) {
    return (
      <div className="flex items-center gap-2 p-3 bg-red-50 rounded-lg border border-red-200">
        <XCircle size={16} className="text-red-600" />
        <span className="text-sm font-medium text-red-900">
          {status === "cancelled" && "Cancelled"}
          {status === "cancelled-penalty" && "Cancelled (Penalty Applied)"}
          {status === "no-show" && "Customer No-Show"}
          {status === "rescheduled" && "Rescheduled"}
        </span>
      </div>
    );
  }
  
  return (
    <div className="flex items-center gap-1">
      {stages.map((stage, index) => {
        const isActive = index === currentStageIndex;
        const isCompleted = index < currentStageIndex;
        
        return (
          <div key={stage.key} className="flex items-center">
            <div
              className={cn(
                "size-8 rounded-full flex items-center justify-center text-xs font-medium transition-all",
                isActive && "bg-blue-600 text-white ring-4 ring-blue-100",
                isCompleted && "bg-green-500 text-white",
                !isActive && !isCompleted && "bg-neutral-200 text-neutral-600"
              )}
            >
              {isCompleted ? <CheckCircle size={16} /> : index + 1}
            </div>
            {index < stages.length - 1 && (
              <div
                className={cn(
                  "h-0.5 w-8 mx-1 transition-all",
                  isCompleted ? "bg-green-500" : "bg-neutral-200"
                )}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}
