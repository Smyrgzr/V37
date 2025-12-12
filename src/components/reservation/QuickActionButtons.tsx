import { Button } from "../ui/button";
import {
  CheckCircle,
  Clock,
  XCircle,
  UserCheck,
  Play,
  Flag,
  Car,
} from "lucide-react";
import type { ReservationStatus } from "../../types/reservation";

export interface QuickActionButtonsProps {
  currentStatus: ReservationStatus;
  onCheckIn?: () => void;
  onStartService?: () => void;
  onComplete?: () => void;
  onCancel?: () => void;
  onConfirm?: () => void;
}

export function QuickActionButtons({
  currentStatus,
  onCheckIn,
  onStartService,
  onComplete,
  onCancel,
  onConfirm,
}: QuickActionButtonsProps) {
  // Determine which actions are available based on current status
  const availableActions = [];

  if (currentStatus === "reserved" && onConfirm) {
    availableActions.push({
      label: "Confirm",
      icon: CheckCircle,
      onClick: onConfirm,
      variant: "default" as const,
      color: "bg-green-600 hover:bg-green-700",
    });
  }

  if (currentStatus === "confirmed" && onCheckIn) {
    availableActions.push({
      label: "Check In",
      icon: UserCheck,
      onClick: onCheckIn,
      variant: "default" as const,
      color: "bg-blue-600 hover:bg-blue-700",
    });
  }

  if (currentStatus === "checked-in" && onStartService) {
    availableActions.push({
      label: "Start Service",
      icon: Play,
      onClick: onStartService,
      variant: "default" as const,
      color: "bg-purple-600 hover:bg-purple-700",
    });
  }

  if (currentStatus === "in-progress" && onComplete) {
    availableActions.push({
      label: "Complete",
      icon: Flag,
      onClick: onComplete,
      variant: "default" as const,
      color: "bg-emerald-600 hover:bg-emerald-700",
    });
  }

  if (
    (currentStatus === "reserved" ||
      currentStatus === "confirmed" ||
      currentStatus === "pending-approval") &&
    onCancel
  ) {
    availableActions.push({
      label: "Cancel",
      icon: XCircle,
      onClick: onCancel,
      variant: "outline" as const,
      color: "text-red-600 border-red-300 hover:bg-red-50",
    });
  }

  if (availableActions.length === 0) {
    return null;
  }

  return (
    <div className="flex gap-2 flex-wrap">
      {availableActions.map((action) => {
        const Icon = action.icon;
        return (
          <Button
            key={action.label}
            onClick={action.onClick}
            variant={action.variant}
            size="sm"
            className={action.color}
          >
            <Icon className="size-4 mr-1.5" />
            {action.label}
          </Button>
        );
      })}
    </div>
  );
}
