/**
 * RESERVATION APPROVAL DASHBOARD
 * ===============================
 * 
 * Owner interface for reviewing and managing pending reservation requests
 * Features: Quick approve/reject, alternative suggestions, batch actions
 */

"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { ScrollArea } from "../ui/scroll-area";
import { Separator } from "../ui/separator";
import { Input } from "../ui/input";
import { cn } from "../ui/utils";
import {
  CheckCircle,
  XCircle,
  Clock,
  AlertCircle,
  User,
  Car,
  Calendar,
  DollarSign,
  Phone,
  Mail,
  FileText,
  Sparkles,
  Filter,
  Search,
  ChevronRight,
} from "lucide-react";
import { motion } from "motion/react";
import { Reservation, getReservationStatusColor } from "../../types/reservation";
import { ReservationStatusBadge } from "../management/ReservationStatusBadge";

interface ApprovalDashboardProps {
  reservations: Reservation[];
  onApprove: (reservationId: string) => void;
  onReject: (reservationId: string, reason?: string) => void;
  onSuggestAlternative: (reservationId: string) => void;
  onViewDetails: (reservation: Reservation) => void;
}

export function ApprovalDashboard({
  reservations,
  onApprove,
  onReject,
  onSuggestAlternative,
  onViewDetails,
}: ApprovalDashboardProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState<"all" | "pending" | "today">("pending");
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());

  // Filter reservations
  const filteredReservations = reservations.filter((r) => {
    // Status filter
    if (filterStatus === "pending" && !["requested", "pending-approval"].includes(r.status)) {
      return false;
    }
    if (filterStatus === "today") {
      const today = new Date().toISOString().split("T")[0];
      if (r.scheduledDate !== today) return false;
    }

    // Search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      return (
        r.customer.name.toLowerCase().includes(query) ||
        r.customer.phone?.includes(query) ||
        r.customer.email?.toLowerCase().includes(query) ||
        r.vehicle.plate.toLowerCase().includes(query)
      );
    }

    return true;
  });

  const pendingCount = reservations.filter((r) =>
    ["requested", "pending-approval"].includes(r.status)
  ).length;

  const todayCount = reservations.filter(
    (r) => r.scheduledDate === new Date().toISOString().split("T")[0]
  ).length;

  // Batch actions
  const toggleSelection = (id: string) => {
    const newSet = new Set(selectedIds);
    if (newSet.has(id)) {
      newSet.delete(id);
    } else {
      newSet.add(id);
    }
    setSelectedIds(newSet);
  };

  const handleBatchApprove = () => {
    selectedIds.forEach((id) => onApprove(id));
    setSelectedIds(new Set());
  };

  const handleBatchReject = () => {
    selectedIds.forEach((id) => onReject(id));
    setSelectedIds(new Set());
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Reservation Approvals</h2>
          <p className="text-sm text-neutral-600 mt-1">
            Review and manage pending reservation requests
          </p>
        </div>

        {selectedIds.size > 0 && (
          <div className="flex items-center gap-2">
            <Badge variant="secondary">{selectedIds.size} selected</Badge>
            <Button size="sm" variant="outline" onClick={() => setSelectedIds(new Set())}>
              Clear
            </Button>
            <Button size="sm" variant="outline" onClick={handleBatchReject}>
              <XCircle size={14} className="mr-1" />
              Reject All
            </Button>
            <Button size="sm" onClick={handleBatchApprove}>
              <CheckCircle size={14} className="mr-1" />
              Approve All
            </Button>
          </div>
        )}
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card
          className={cn(
            "cursor-pointer transition-all",
            filterStatus === "pending" && "ring-2 ring-yellow-500"
          )}
          onClick={() => setFilterStatus("pending")}
        >
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="size-10 rounded-lg bg-yellow-100 flex items-center justify-center">
                <AlertCircle size={20} className="text-yellow-700" />
              </div>
              <div>
                <p className="text-2xl font-bold">{pendingCount}</p>
                <p className="text-xs text-neutral-600">Pending Approval</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card
          className={cn(
            "cursor-pointer transition-all",
            filterStatus === "today" && "ring-2 ring-blue-500"
          )}
          onClick={() => setFilterStatus("today")}
        >
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="size-10 rounded-lg bg-blue-100 flex items-center justify-center">
                <Calendar size={20} className="text-blue-700" />
              </div>
              <div>
                <p className="text-2xl font-bold">{todayCount}</p>
                <p className="text-xs text-neutral-600">Today's Bookings</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card
          className={cn(
            "cursor-pointer transition-all",
            filterStatus === "all" && "ring-2 ring-neutral-500"
          )}
          onClick={() => setFilterStatus("all")}
        >
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="size-10 rounded-lg bg-neutral-100 flex items-center justify-center">
                <Clock size={20} className="text-neutral-700" />
              </div>
              <div>
                <p className="text-2xl font-bold">{reservations.length}</p>
                <p className="text-xs text-neutral-600">All Reservations</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search Bar */}
      <div className="relative">
        <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" />
        <Input
          placeholder="Search by name, phone, email, or plate..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* Reservations List */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>
              {filterStatus === "pending" && "Pending Requests"}
              {filterStatus === "today" && "Today's Reservations"}
              {filterStatus === "all" && "All Reservations"}
            </span>
            <Badge variant="secondary">{filteredReservations.length} items</Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          {filteredReservations.length > 0 ? (
            <ScrollArea className="h-[600px]">
              <div className="p-6 space-y-4">
                {filteredReservations.map((reservation, index) => {
                  const isPending = ["requested", "pending-approval"].includes(reservation.status);
                  const isSelected = selectedIds.has(reservation.id);

                  return (
                    <motion.div
                      key={reservation.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                    >
                      <Card
                        className={cn(
                          "border-2 transition-all cursor-pointer",
                          isSelected && "ring-2 ring-blue-500 border-blue-500",
                          isPending && "border-yellow-200 bg-yellow-50"
                        )}
                        onClick={() => isPending && toggleSelection(reservation.id)}
                      >
                        <CardContent className="p-4">
                          <div className="flex items-start justify-between mb-3">
                            <div className="flex items-start gap-3">
                              <div className="size-12 rounded-lg bg-blue-100 flex items-center justify-center">
                                <User size={24} className="text-blue-700" />
                              </div>
                              <div>
                                <p className="font-semibold text-lg">{reservation.customer.name}</p>
                                <div className="flex items-center gap-2 text-sm text-neutral-600">
                                  <Phone size={12} />
                                  <span>{reservation.customer.phone}</span>
                                  {reservation.customer.email && (
                                    <>
                                      <span>•</span>
                                      <Mail size={12} />
                                      <span>{reservation.customer.email}</span>
                                    </>
                                  )}
                                </div>
                              </div>
                            </div>
                            <ReservationStatusBadge status={reservation.status} />
                          </div>

                          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                            <div className="flex items-center gap-2 text-sm">
                              <Car size={14} className="text-neutral-500" />
                              <div>
                                <p className="font-medium">
                                  {reservation.vehicle.brand} {reservation.vehicle.model}
                                </p>
                                <p className="text-xs text-neutral-600">{reservation.vehicle.plate}</p>
                              </div>
                            </div>

                            <div className="flex items-center gap-2 text-sm">
                              <Calendar size={14} className="text-neutral-500" />
                              <div>
                                <p className="font-medium">{reservation.scheduledDate}</p>
                                <p className="text-xs text-neutral-600">
                                  {reservation.scheduledStartTime}
                                </p>
                              </div>
                            </div>

                            <div className="flex items-center gap-2 text-sm">
                              <Clock size={14} className="text-neutral-500" />
                              <div>
                                <p className="font-medium">{reservation.duration} min</p>
                                <p className="text-xs text-neutral-600">Duration</p>
                              </div>
                            </div>

                            <div className="flex items-center gap-2 text-sm">
                              <DollarSign size={14} className="text-green-600" />
                              <div>
                                <p className="font-medium text-green-700">
                                  ${reservation.price.toFixed(2)}
                                </p>
                                <p className="text-xs text-neutral-600">Total</p>
                              </div>
                            </div>
                          </div>

                          {reservation.notes && (
                            <div className="mb-3 p-2 bg-neutral-50 rounded text-sm">
                              <div className="flex items-start gap-2">
                                <FileText size={14} className="text-neutral-500 mt-0.5" />
                                <p className="text-neutral-700">{reservation.notes}</p>
                              </div>
                            </div>
                          )}

                          <Separator className="my-3" />

                          {/* Actions */}
                          <div className="flex items-center justify-between">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={(e) => {
                                e.stopPropagation();
                                onViewDetails(reservation);
                              }}
                            >
                              View Details
                              <ChevronRight size={14} className="ml-1" />
                            </Button>

                            {isPending && (
                              <div className="flex items-center gap-2">
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    onSuggestAlternative(reservation.id);
                                  }}
                                >
                                  <Sparkles size={14} className="mr-1" />
                                  Suggest Alternative
                                </Button>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    onReject(reservation.id);
                                  }}
                                >
                                  <XCircle size={14} className="mr-1" />
                                  Reject
                                </Button>
                                <Button
                                  size="sm"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    onApprove(reservation.id);
                                  }}
                                >
                                  <CheckCircle size={14} className="mr-1" />
                                  Approve
                                </Button>
                              </div>
                            )}
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  );
                })}
              </div>
            </ScrollArea>
          ) : (
            <div className="p-12 text-center">
              <AlertCircle size={48} className="mx-auto text-neutral-300 mb-4" />
              <p className="text-neutral-500">No reservations found</p>
              <p className="text-sm text-neutral-400 mt-2">
                {filterStatus === "pending" && "All pending requests have been processed"}
                {filterStatus === "today" && "No reservations scheduled for today"}
                {filterStatus === "all" && "No reservations in the system"}
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
