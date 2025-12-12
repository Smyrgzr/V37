"use client";

import { Notification } from "../../types/notification";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import * as Icons from "lucide-react";
import { NOTIFICATION_ICONS, PRIORITY_COLORS, formatNotificationTime } from "../../utils/notificationHelpers";
import { cn } from "../ui/utils";

interface NotificationItemProps {
  notification: Notification;
  onMarkAsRead: (id: string) => void;
  onDismiss: (id: string) => void;
  onAction?: (action: string, payload?: any) => void;
  compact?: boolean;
}

export function NotificationItem({ 
  notification, 
  onMarkAsRead, 
  onDismiss, 
  onAction,
  compact = false 
}: NotificationItemProps) {
  const iconName = NOTIFICATION_ICONS[notification.type] || 'Bell';
  const Icon = (Icons as any)[iconName] || Icons.Bell;
  const priorityStyle = PRIORITY_COLORS[notification.priority];

  const handleClick = () => {
    if (!notification.isRead) {
      onMarkAsRead(notification.id);
    }
    if (notification.actionUrl && onAction) {
      onAction('navigate', notification.actionUrl);
    }
  };

  const handleActionClick = (e: React.MouseEvent, action: any) => {
    e.stopPropagation();
    if (!notification.isRead) {
      onMarkAsRead(notification.id);
    }
    if (onAction) {
      onAction(action.action, action.payload);
    }
  };

  const handleDismiss = (e: React.MouseEvent) => {
    e.stopPropagation();
    onDismiss(notification.id);
  };

  return (
    <div
      className={cn(
        "border-l-4 p-3 rounded-lg transition-all hover:shadow-md cursor-pointer",
        priorityStyle.bg,
        priorityStyle.border,
        !notification.isRead && "bg-opacity-100",
        notification.isRead && "opacity-75",
        compact && "p-2"
      )}
      onClick={handleClick}
    >
      <div className="flex items-start gap-3">
        {/* Icon */}
        <div className={cn("p-2 rounded-full", priorityStyle.bg)}>
          <Icon className={cn("w-4 h-4", priorityStyle.icon)} />
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2 mb-1">
            <div className="flex items-center gap-2 flex-wrap">
              <h4 className={cn("font-medium text-sm", priorityStyle.text)}>
                {notification.title}
              </h4>
              {notification.priority === 'critical' && (
                <Badge className="bg-red-600 text-white text-xs px-1.5 py-0">
                  CRITICAL
                </Badge>
              )}
              {!notification.isRead && (
                <div className="w-2 h-2 bg-blue-600 rounded-full" />
              )}
            </div>
            <button
              onClick={handleDismiss}
              className="text-gray-400 hover:text-gray-600 flex-shrink-0"
            >
              <Icons.X className="w-4 h-4" />
            </button>
          </div>

          <p className={cn("text-sm mb-2", priorityStyle.text, "opacity-80")}>
            {notification.message}
          </p>

          <div className="flex items-center justify-between gap-2 flex-wrap">
            <span className="text-xs text-gray-500">
              {formatNotificationTime(notification.timestamp)}
            </span>

            {/* Action Buttons */}
            {notification.actionButtons && notification.actionButtons.length > 0 && !compact && (
              <div className="flex gap-2">
                {notification.actionButtons.map((action, index) => (
                  <Button
                    key={index}
                    size="sm"
                    variant={action.variant === 'primary' ? 'default' : action.variant === 'destructive' ? 'destructive' : 'outline'}
                    onClick={(e) => handleActionClick(e, action)}
                    className="h-7 text-xs"
                  >
                    {action.label}
                  </Button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
