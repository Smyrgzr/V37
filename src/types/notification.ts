// Notification System Types

export type NotificationPriority = 'critical' | 'high' | 'medium' | 'low';

export type NotificationCategory = 
  | 'operational'
  | 'financial'
  | 'administrative'
  | 'customer'
  | 'marketing'
  | 'ai_analytics';

export type NotificationType = 
  // Operational
  | 'booking_new'
  | 'booking_cancelled'
  | 'booking_modified'
  | 'booking_noshow'
  | 'staff_shortage'
  | 'staff_late'
  | 'equipment_malfunction'
  | 'capacity_overbooked'
  | 'capacity_peak_approaching'
  | 'inventory_low'
  // Financial
  | 'revenue_alert'
  | 'revenue_milestone'
  | 'payment_failed'
  | 'subscription_expiring'
  | 'subscription_renewed'
  | 'subscription_cancelled'
  | 'pricing_updated'
  // Administrative
  | 'center_registration_new'
  | 'service_request_pending'
  | 'service_request_approved'
  | 'service_request_rejected'
  | 'branch_status_changed'
  | 'system_maintenance'
  // Customer
  | 'review_new'
  | 'review_negative'
  | 'complaint_filed'
  | 'customer_churn_risk'
  | 'customer_milestone'
  // Marketing
  | 'campaign_started'
  | 'campaign_performance'
  | 'campaign_budget_warning'
  // AI/Analytics
  | 'ai_prediction'
  | 'ai_anomaly'
  | 'ai_recommendation';

export interface NotificationAction {
  label: string;
  action: 'navigate' | 'api_call' | 'dismiss';
  payload?: any;
  variant?: 'primary' | 'secondary' | 'destructive';
}

export interface Notification {
  id: string;
  userId: string;
  userRole: 'root_owner' | 'carwash_owner';
  
  // Classification
  type: NotificationType;
  priority: NotificationPriority;
  category: NotificationCategory;
  
  // Content
  title: string;
  message: string;
  icon?: string;
  
  // State
  isRead: boolean;
  isDismissed: boolean;
  timestamp: Date;
  expiresAt?: Date;
  
  // Actions
  actionUrl?: string;
  actionButtons?: NotificationAction[];
  
  // Metadata
  metadata?: {
    bookingId?: string;
    branchId?: string;
    customerId?: string;
    campaignId?: string;
    serviceRequestId?: string;
    [key: string]: any;
  };
}

export interface NotificationPreferences {
  userId: string;
  
  // Channels
  channels: {
    inApp: boolean;
    email: boolean;
    emailAddress?: string;
    sms: boolean;
    smsNumber?: string;
  };
  
  // Category preferences
  categories: {
    [key in NotificationCategory]: {
      enabled: boolean;
      frequency: 'realtime' | 'hourly' | 'daily';
    };
  };
  
  // Quiet hours
  quietHours: {
    enabled: boolean;
    startTime: string;
    endTime: string;
    allowCritical: boolean;
  };
  
  // Digest
  digest: {
    daily: {
      enabled: boolean;
      time: string;
    };
    weekly: {
      enabled: boolean;
      day: number;
      time: string;
    };
  };
}
