import { Activity, Clock, CheckCircle, AlertCircle } from "lucide-react";
import { Card } from "../ui/card";
import { cn } from "../ui/utils";
import type { Reservation } from "../../types/reservation";

export interface ServiceProgressWidgetProps {
  activeServices: Reservation[];
  onViewDetails?: (reservationId: string) => void;
}

export function ServiceProgressWidget({
  activeServices,
  onViewDetails,
}: ServiceProgressWidgetProps) {
  const getProgressColor = (progress: number) => {
    if (progress >= 75) return "text-green-600";
    if (progress >= 50) return "text-blue-600";
    if (progress >= 25) return "text-amber-600";
    return "text-neutral-600";
  };

  const getProgressBg = (progress: number) => {
    if (progress >= 75) return "bg-green-500";
    if (progress >= 50) return "bg-blue-500";
    if (progress >= 25) return "bg-amber-500";
    return "bg-neutral-500";
  };

  if (activeServices.length === 0) {
    return (
      <Card className="p-6">
        <div className="flex items-center gap-3 mb-4">
          <Activity className="size-5 text-blue-600" />
          <h3 className="font-semibold">Active Services</h3>
        </div>
        <div className="text-center py-8">
          <p className="text-sm text-neutral-500">No active services at the moment</p>
        </div>
      </Card>
    );
  }

  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <Activity className="size-5 text-blue-600" />
          <h3 className="font-semibold">Active Services</h3>
        </div>
        <span className="text-sm text-neutral-600 bg-blue-100 px-2 py-1 rounded-full">
          {activeServices.length} in progress
        </span>
      </div>

      <div className="space-y-3">
        {activeServices.map((service) => {
          // Mock progress based on status
          const progress = service.status === "checked-in" ? 5 : 
                          service.status === "in-progress" ? 45 : 0;

          return (
            <div
              key={service.id}
              className="p-3 border rounded-lg hover:border-blue-300 transition-colors cursor-pointer"
              onClick={() => onViewDetails?.(service.id)}
            >
              <div className="flex items-start justify-between gap-3 mb-2">
                <div className="flex-1 min-w-0">
                  <p className="font-medium truncate">{service.customer.name}</p>
                  <p className="text-xs text-neutral-600 truncate">
                    {service.customer.vehicleModel || "Vehicle"} • {service.services[0]?.name || "Service"}
                  </p>
                </div>
                <div className="flex items-center gap-1 text-xs text-neutral-600">
                  <Clock className="size-3" />
                  <span>
                    {service.scheduledStart.toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </span>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="space-y-1">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-neutral-600">
                    {service.status === "checked-in" ? "Check-In" : "Washing"}
                  </span>
                  <span className={cn("font-medium", getProgressColor(progress))}>
                    {progress}%
                  </span>
                </div>
                <div className="h-1.5 bg-neutral-200 rounded-full overflow-hidden">
                  <div
                    className={cn(
                      "h-full transition-all duration-300",
                      getProgressBg(progress)
                    )}
                    style={{ width: `${progress}%` }}
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </Card>
  );
}