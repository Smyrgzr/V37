/**
 * NOTIFICATION CENTER - Activity & Alerts
 * =======================================
 * Centralized notification system for all reservation activities,
 * status changes, payments, and system alerts
 */

import { useState, useEffect } from "react";
import { Card } from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { ScrollArea } from "../ui/scroll-area";
import {
  Bell,
  CheckCircle,
  Clock,
  DollarSign,
  AlertTriangle,
  Info,
  XCircle,
  Calendar,
  Car,
  MapPin,
  User,
  X,
} from "lucide-react";
import { cn } from "../ui/utils";
import { motion, AnimatePresence } from "motion/react";

export interface Notification {
  id: string;
  type:
    | "reservation"
    | "status_change"
    | "payment"
    | "alert"
    | "info"
    | "cancellation";
  severity: "info" | "success" | "warning" | "error";
  title: string;
  message: string;
  timestamp: Date;
  read: boolean;
  reservationId?: string;
  actionRequired?: boolean;
  actionUrl?: string;
  metadata?: {
    customerName?: string;
    vehiclePlate?: string;
    amount?: number;
    oldStatus?: string;
    newStatus?: string;
  };
}

export interface NotificationCenterProps {
  notifications: Notification[];
  onMarkAsRead?: (id: string) => void;
  onMarkAllAsRead?: () => void;
  onDismiss?: (id: string) => void;
  onNotificationClick?: (notification: Notification) => void;
}

export function NotificationCenter({
  notifications,
  onMarkAsRead,
  onMarkAllAsRead,
  onDismiss,
  onNotificationClick,
}: NotificationCenterProps) {
  const [filter, setFilter] = useState<"all" | "unread">("all");

  const unreadCount = notifications.filter((n) => !n.read).length;

  const filteredNotifications =
    filter === "unread"
      ? notifications.filter((n) => !n.read)
      : notifications;

  const getNotificationIcon = (
    type: Notification["type"],
    severity: Notification["severity"]
  ) => {
    if (severity === "error") return XCircle;
    if (severity === "warning") return AlertTriangle;
    if (severity === "success") return CheckCircle;

    switch (type) {
      case "reservation":
        return Calendar;
      case "status_change":
        return Info;
      case "payment":
        return DollarSign;
      case "alert":
        return AlertTriangle;
      case "cancellation":
        return XCircle;
      default:
        return Bell;
    }
  };

  const getNotificationColor = (severity: Notification["severity"]) => {
    switch (severity) {
      case "error":
        return "bg-red-100 text-red-700 border-red-200";
      case "warning":
        return "bg-amber-100 text-amber-700 border-amber-200";
      case "success":
        return "bg-green-100 text-green-700 border-green-200";
      case "info":
      default:
        return "bg-blue-100 text-blue-700 border-blue-200";
    }
  };

  const formatTimestamp = (date: Date) => {
    const now = new Date();
    const diff = Math.floor((now.getTime() - date.getTime()) / 1000);

    if (diff < 60) return "Just now";
    if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
    if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
    return date.toLocaleDateString();
  };

  return (
    <Card className="p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="relative">
            <Bell className="size-6 text-blue-600" />
            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 size-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                {unreadCount > 9 ? "9+" : unreadCount}
              </span>
            )}
          </div>
          <div>
            <h3 className="font-semibold">Notifications</h3>
            <p className="text-xs text-neutral-600">
              {unreadCount} unread {unreadCount === 1 ? "notification" : "notifications"}
            </p>
          </div>
        </div>

        {unreadCount > 0 && (
          <Button
            onClick={onMarkAllAsRead}
            variant="ghost"
            size="sm"
            className="text-xs"
          >
            Mark all read
          </Button>
        )}
      </div>

      {/* Filter Tabs */}
      <div className="flex gap-2 mb-4">
        <Button
          onClick={() => setFilter("all")}
          variant={filter === "all" ? "default" : "outline"}
          size="sm"
          className="flex-1"
        >
          All ({notifications.length})
        </Button>
        <Button
          onClick={() => setFilter("unread")}
          variant={filter === "unread" ? "default" : "outline"}
          size="sm"
          className="flex-1"
        >
          Unread ({unreadCount})
        </Button>
      </div>

      {/* Notifications List */}
      <ScrollArea className="h-[500px] pr-4">
        <div className="space-y-2">
          {filteredNotifications.length === 0 ? (
            <div className="text-center py-12">
              <Bell className="size-12 text-neutral-300 mx-auto mb-3" />
              <p className="text-neutral-500 text-sm">
                {filter === "unread"
                  ? "No unread notifications"
                  : "No notifications yet"}
              </p>
            </div>
          ) : (
            <AnimatePresence>
              {filteredNotifications.map((notification) => {
                const Icon = getNotificationIcon(
                  notification.type,
                  notification.severity
                );
                const colorClass = getNotificationColor(notification.severity);

                return (
                  <motion.div
                    key={notification.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    className={cn(
                      "p-4 border rounded-lg transition-all cursor-pointer hover:shadow-md",
                      !notification.read && "bg-blue-50 border-blue-200"
                    )}
                    onClick={() => {
                      if (!notification.read) {
                        onMarkAsRead?.(notification.id);
                      }
                      onNotificationClick?.(notification);
                    }}
                  >
                    <div className="flex items-start gap-3">
                      {/* Icon */}
                      <div
                        className={cn(
                          "size-8 rounded-lg flex items-center justify-center shrink-0",
                          colorClass
                        )}
                      >
                        <Icon className="size-4" />
                      </div>

                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2">
                          <div className="flex-1">
                            <p className="font-medium text-sm leading-tight">
                              {notification.title}
                            </p>
                            <p className="text-sm text-neutral-600 mt-1">
                              {notification.message}
                            </p>

                            {/* Metadata */}
                            {notification.metadata && (
                              <div className="flex flex-wrap items-center gap-2 mt-2">
                                {notification.metadata.customerName && (
                                  <Badge variant="outline" className="text-xs">
                                    <User className="size-3 mr-1" />
                                    {notification.metadata.customerName}
                                  </Badge>
                                )}
                                {notification.metadata.vehiclePlate && (
                                  <Badge variant="outline" className="text-xs">
                                    <Car className="size-3 mr-1" />
                                    {notification.metadata.vehiclePlate}
                                  </Badge>
                                )}
                                {notification.metadata.amount !== undefined && (
                                  <Badge variant="outline" className="text-xs">
                                    <DollarSign className="size-3 mr-1" />
                                    ${notification.metadata.amount.toFixed(2)}
                                  </Badge>
                                )}
                              </div>
                            )}
                          </div>

                          {/* Dismiss button */}
                          <Button
                            onClick={(e) => {
                              e.stopPropagation();
                              onDismiss?.(notification.id);
                            }}
                            variant="ghost"
                            size="sm"
                            className="size-6 p-0 shrink-0"
                          >
                            <X className="size-3" />
                          </Button>
                        </div>

                        {/* Footer */}
                        <div className="flex items-center justify-between mt-2">
                          <span className="text-xs text-neutral-500">
                            {formatTimestamp(notification.timestamp)}
                          </span>
                          {notification.actionRequired && (
                            <Badge className="bg-orange-100 text-orange-700 text-xs">
                              Action Required
                            </Badge>
                          )}
                        </div>
                      </div>

                      {/* Unread indicator */}
                      {!notification.read && (
                        <div className="size-2 bg-blue-600 rounded-full shrink-0 mt-1" />
                      )}
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          )}
        </div>
      </ScrollArea>
    </Card>
  );
}
