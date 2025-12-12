import { NotificationPriority } from "../types/notification";

// Icon mapping for notification types
export const NOTIFICATION_ICONS: Record<string, string> = {
  // Operational
  booking_new: 'Calendar',
  booking_cancelled: 'CalendarX',
  booking_modified: 'CalendarClock',
  booking_noshow: 'CalendarX2',
  staff_shortage: 'Users',
  staff_late: 'Clock',
  equipment_malfunction: 'AlertTriangle',
  capacity_overbooked: 'AlertCircle',
  capacity_peak_approaching: 'TrendingUp',
  inventory_low: 'Package',
  
  // Financial
  revenue_alert: 'TrendingDown',
  revenue_milestone: 'TrendingUp',
  payment_failed: 'CreditCard',
  subscription_expiring: 'Clock',
  subscription_renewed: 'CheckCircle',
  subscription_cancelled: 'XCircle',
  pricing_updated: 'DollarSign',
  
  // Administrative
  center_registration_new: 'UserPlus',
  service_request_pending: 'FileQuestion',
  service_request_approved: 'CheckCircle',
  service_request_rejected: 'XCircle',
  branch_status_changed: 'Building2',
  system_maintenance: 'Settings',
  
  // Customer
  review_new: 'Star',
  review_negative: 'AlertOctagon',
  complaint_filed: 'MessageSquare',
  customer_churn_risk: 'UserMinus',
  customer_milestone: 'Award',
  
  // Marketing
  campaign_started: 'Megaphone',
  campaign_performance: 'BarChart3',
  campaign_budget_warning: 'AlertTriangle',
  
  // AI/Analytics
  ai_prediction: 'Brain',
  ai_anomaly: 'Zap',
  ai_recommendation: 'Lightbulb',
};

// Priority color mapping
export const PRIORITY_COLORS: Record<NotificationPriority, { bg: string; text: string; border: string; icon: string }> = {
  critical: {
    bg: 'bg-red-50',
    text: 'text-red-900',
    border: 'border-red-200',
    icon: 'text-red-600',
  },
  high: {
    bg: 'bg-orange-50',
    text: 'text-orange-900',
    border: 'border-orange-200',
    icon: 'text-orange-600',
  },
  medium: {
    bg: 'bg-blue-50',
    text: 'text-blue-900',
    border: 'border-blue-200',
    icon: 'text-blue-600',
  },
  low: {
    bg: 'bg-gray-50',
    text: 'text-gray-900',
    border: 'border-gray-200',
    icon: 'text-gray-600',
  },
};

// Priority badge styling
export const PRIORITY_BADGES: Record<NotificationPriority, { label: string; color: string }> = {
  critical: { label: 'CRITICAL', color: 'bg-red-600 text-white' },
  high: { label: 'HIGH', color: 'bg-orange-600 text-white' },
  medium: { label: 'MEDIUM', color: 'bg-blue-600 text-white' },
  low: { label: 'LOW', color: 'bg-gray-600 text-white' },
};

// Time formatting helper
export function formatNotificationTime(timestamp: Date): string {
  const now = new Date();
  const diff = now.getTime() - timestamp.getTime();
  const seconds = Math.floor(diff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (seconds < 60) return 'Just now';
  if (minutes < 60) return `${minutes} min ago`;
  if (hours < 24) return `${hours}h ago`;
  if (days === 1) return 'Yesterday';
  if (days < 7) return `${days} days ago`;
  
  return timestamp.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
}

// Truncate message helper
export function truncateMessage(message: string, maxLength: number = 100): string {
  if (message.length <= maxLength) return message;
  return message.substring(0, maxLength) + '...';
}
