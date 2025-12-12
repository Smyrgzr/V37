"use client";

import { createContext, useContext, useState, ReactNode, useEffect } from "react";
import { Notification, NotificationPreferences, NotificationPriority, NotificationCategory } from "../types/notification";

interface NotificationContextType {
  notifications: Notification[];
  unreadCount: number;
  preferences: NotificationPreferences;
  
  // Actions
  addNotification: (notification: Omit<Notification, 'id' | 'timestamp' | 'isRead' | 'isDismissed'>) => void;
  markAsRead: (notificationId: string) => void;
  markAllAsRead: () => void;
  dismissNotification: (notificationId: string) => void;
  clearAll: () => void;
  deleteNotification: (notificationId: string) => void;
  
  // Filters
  getByPriority: (priority: NotificationPriority) => Notification[];
  getByCategory: (category: NotificationCategory) => Notification[];
  getUnread: () => Notification[];
  getToday: () => Notification[];
  
  // Preferences
  updatePreferences: (preferences: Partial<NotificationPreferences>) => void;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

interface NotificationProviderProps {
  children: ReactNode;
  userId: string;
  userRole: 'root_owner' | 'carwash_owner';
}

export function NotificationProvider({ children, userId, userRole }: NotificationProviderProps) {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [preferences, setPreferences] = useState<NotificationPreferences>({
    userId,
    channels: {
      inApp: true,
      email: true,
      sms: false,
    },
    categories: {
      operational: { enabled: true, frequency: 'realtime' },
      financial: { enabled: true, frequency: 'realtime' },
      administrative: { enabled: true, frequency: 'realtime' },
      customer: { enabled: true, frequency: 'realtime' },
      marketing: { enabled: true, frequency: 'daily' },
      ai_analytics: { enabled: true, frequency: 'daily' },
    },
    quietHours: {
      enabled: true,
      startTime: '22:00',
      endTime: '07:00',
      allowCritical: true,
    },
    digest: {
      daily: {
        enabled: true,
        time: '08:00',
      },
      weekly: {
        enabled: true,
        day: 1,
        time: '08:00',
      },
    },
  });

  // Load notifications from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem(`notifications_${userId}`);
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        setNotifications(parsed.map((n: any) => ({
          ...n,
          timestamp: new Date(n.timestamp),
          expiresAt: n.expiresAt ? new Date(n.expiresAt) : undefined,
        })));
      } catch (e) {
        console.error('Failed to load notifications:', e);
      }
    }

    const storedPrefs = localStorage.getItem(`notification_preferences_${userId}`);
    if (storedPrefs) {
      try {
        setPreferences(JSON.parse(storedPrefs));
      } catch (e) {
        console.error('Failed to load preferences:', e);
      }
    }
  }, [userId]);

  // Save notifications to localStorage when changed
  useEffect(() => {
    if (notifications.length > 0) {
      localStorage.setItem(`notifications_${userId}`, JSON.stringify(notifications));
    }
  }, [notifications, userId]);

  // Save preferences to localStorage when changed
  useEffect(() => {
    localStorage.setItem(`notification_preferences_${userId}`, JSON.stringify(preferences));
  }, [preferences, userId]);

  // Auto-cleanup expired notifications
  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      setNotifications(prev => prev.filter(n => !n.expiresAt || n.expiresAt > now));
    }, 60000); // Check every minute

    return () => clearInterval(interval);
  }, []);

  const addNotification = (notification: Omit<Notification, 'id' | 'timestamp' | 'isRead' | 'isDismissed'>) => {
    // Check quiet hours
    if (preferences.quietHours.enabled && notification.priority !== 'critical') {
      const now = new Date();
      const currentTime = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;
      const { startTime, endTime } = preferences.quietHours;
      
      if (currentTime >= startTime || currentTime <= endTime) {
        // Queue for later delivery
        return;
      }
    }

    // Check if category is enabled
    const categoryPref = preferences.categories[notification.category];
    if (!categoryPref.enabled) {
      return;
    }

    const newNotification: Notification = {
      ...notification,
      id: `notif_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      timestamp: new Date(),
      isRead: false,
      isDismissed: false,
    };

    setNotifications(prev => [newNotification, ...prev].slice(0, 100)); // Keep max 100 notifications
  };

  const markAsRead = (notificationId: string) => {
    setNotifications(prev => prev.map(n => 
      n.id === notificationId ? { ...n, isRead: true } : n
    ));
  };

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, isRead: true })));
  };

  const dismissNotification = (notificationId: string) => {
    setNotifications(prev => prev.map(n => 
      n.id === notificationId ? { ...n, isDismissed: true } : n
    ));
  };

  const deleteNotification = (notificationId: string) => {
    setNotifications(prev => prev.filter(n => n.id !== notificationId));
  };

  const clearAll = () => {
    setNotifications([]);
  };

  const getByPriority = (priority: NotificationPriority) => {
    return notifications.filter(n => n.priority === priority && !n.isDismissed);
  };

  const getByCategory = (category: NotificationCategory) => {
    return notifications.filter(n => n.category === category && !n.isDismissed);
  };

  const getUnread = () => {
    return notifications.filter(n => !n.isRead && !n.isDismissed);
  };

  const getToday = () => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return notifications.filter(n => n.timestamp >= today && !n.isDismissed);
  };

  const updatePreferences = (newPreferences: Partial<NotificationPreferences>) => {
    setPreferences(prev => ({ ...prev, ...newPreferences }));
  };

  const unreadCount = getUnread().length;

  return (
    <NotificationContext.Provider
      value={{
        notifications: notifications.filter(n => !n.isDismissed),
        unreadCount,
        preferences,
        addNotification,
        markAsRead,
        markAllAsRead,
        dismissNotification,
        clearAll,
        deleteNotification,
        getByPriority,
        getByCategory,
        getUnread,
        getToday,
        updatePreferences,
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
}

export function useNotifications() {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error('useNotifications must be used within NotificationProvider');
  }
  return context;
}
