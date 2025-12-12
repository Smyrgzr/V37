import {
  Clock,
  CheckCircle,
  AlertCircle,
  Activity,
  Calendar,
  TrendingUp,
} from "lucide-react";
import { Card } from "../ui/card";
import type { Reservation } from "../../types/reservation";

export interface ServiceStatsSummaryProps {
  reservations: Reservation[];
}

export function ServiceStatsSummary({ reservations }: ServiceStatsSummaryProps) {
  const stats = {
    pending: reservations.filter((r) => r.status === "pending").length,
    reserved: reservations.filter((r) => r.status === "reserved").length,
    confirmed: reservations.filter((r) => r.status === "confirmed").length,
    checkedIn: reservations.filter((r) => r.status === "checked-in").length,
    inProgress: reservations.filter((r) => r.status === "in-progress").length,
    completed: reservations.filter((r) => r.status === "completed").length,
    cancelled: reservations.filter((r) => r.status === "cancelled").length,
  };

  const activeServices = stats.checkedIn + stats.inProgress;
  const awaitingAction = stats.pending + stats.reserved;
  const completionRate = reservations.length > 0
    ? ((stats.completed / reservations.length) * 100).toFixed(0)
    : 0;

  const statCards = [
    {
      label: "Pending Approval",
      value: stats.pending,
      icon: Clock,
      color: "text-amber-600",
      bgColor: "bg-amber-100",
    },
    {
      label: "Awaiting Confirmation",
      value: stats.reserved,
      icon: AlertCircle,
      color: "text-blue-600",
      bgColor: "bg-blue-100",
    },
    {
      label: "Confirmed",
      value: stats.confirmed,
      icon: CheckCircle,
      color: "text-green-600",
      bgColor: "bg-green-100",
    },
    {
      label: "Active Services",
      value: activeServices,
      icon: Activity,
      color: "text-purple-600",
      bgColor: "bg-purple-100",
    },
    {
      label: "Completed Today",
      value: stats.completed,
      icon: CheckCircle,
      color: "text-emerald-600",
      bgColor: "bg-emerald-100",
    },
    {
      label: "Completion Rate",
      value: `${completionRate}%`,
      icon: TrendingUp,
      color: "text-indigo-600",
      bgColor: "bg-indigo-100",
    },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
      {statCards.map((stat) => {
        const Icon = stat.icon;
        return (
          <Card key={stat.label} className="p-4">
            <div className="flex items-start justify-between gap-2">
              <div className="flex-1">
                <p className="text-xs text-neutral-600 mb-1">{stat.label}</p>
                <p className="text-2xl font-bold">{stat.value}</p>
              </div>
              <div className={`${stat.bgColor} p-2 rounded-lg`}>
                <Icon className={`size-4 ${stat.color}`} />
              </div>
            </div>
          </Card>
        );
      })}
    </div>
  );
}
