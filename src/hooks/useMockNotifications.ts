import { useEffect } from "react";
import { useNotifications } from "../contexts/NotificationContext";

export function useMockNotifications(userRole: 'root_owner' | 'carwash_owner') {
  const { addNotification } = useNotifications();

  useEffect(() => {
    // Add initial mock notifications based on user role
    if (userRole === 'root_owner') {
      // ROOT OWNER notifications
      setTimeout(() => {
        addNotification({
          userId: 'root1',
          userRole: 'root_owner',
          type: 'center_registration_new',
          priority: 'high',
          category: 'administrative',
          title: 'New Carwash Center Registered',
          message: 'Premium Car Wash joined the platform with Professional plan',
          icon: 'UserPlus',
          actionUrl: '/platform-users',
          actionButtons: [
            { label: 'View Profile', action: 'navigate', payload: '/platform-users' },
            { label: 'Send Welcome', action: 'api_call', variant: 'primary' }
          ],
          metadata: { centerId: 'center3' }
        });
      }, 1000);

      setTimeout(() => {
        addNotification({
          userId: 'root1',
          userRole: 'root_owner',
          type: 'service_request_pending',
          priority: 'high',
          category: 'administrative',
          title: 'Service Request Pending Review',
          message: 'AutoWash Pro waiting approval for "Ceramic Coating" service for 2 days',
          icon: 'FileQuestion',
          actionUrl: '/service-management',
          actionButtons: [
            { label: 'Review', action: 'navigate', payload: '/service-management' },
            { label: 'Approve', action: 'api_call', variant: 'primary' },
            { label: 'Reject', action: 'api_call', variant: 'destructive' }
          ],
          metadata: { serviceRequestId: 'req123' }
        });
      }, 2000);

      setTimeout(() => {
        addNotification({
          userId: 'root1',
          userRole: 'root_owner',
          type: 'revenue_milestone',
          priority: 'medium',
          category: 'financial',
          title: 'Platform Revenue Milestone',
          message: 'Congratulations! Platform reached $100K monthly recurring revenue',
          icon: 'TrendingUp',
          actionUrl: '/analytics',
          actionButtons: [
            { label: 'View Analytics', action: 'navigate', payload: '/analytics' }
          ]
        });
      }, 3000);

      setTimeout(() => {
        addNotification({
          userId: 'root1',
          userRole: 'root_owner',
          type: 'ai_anomaly',
          priority: 'medium',
          category: 'ai_analytics',
          title: 'Unusual Activity Detected',
          message: 'AI detected 45% increase in cancellations across Downtown branches',
          icon: 'Zap',
          actionUrl: '/analytics',
          actionButtons: [
            { label: 'Investigate', action: 'navigate', payload: '/analytics' }
          ]
        });
      }, 4000);

    } else if (userRole === 'carwash_owner') {
      // CARWASH OWNER notifications
      setTimeout(() => {
        addNotification({
          userId: 'owner1',
          userRole: 'carwash_owner',
          type: 'booking_new',
          priority: 'high',
          category: 'operational',
          title: 'New Booking Received',
          message: 'Sarah Connor booked Premium Detail for Tomorrow 2:00 PM',
          icon: 'Calendar',
          actionUrl: '/calendar',
          actionButtons: [
            { label: 'View Booking', action: 'navigate', payload: '/calendar' },
            { label: 'Confirm', action: 'api_call', variant: 'primary' }
          ],
          metadata: { bookingId: 'book123', branchId: 'branch1' }
        });
      }, 1000);

      setTimeout(() => {
        addNotification({
          userId: 'owner1',
          userRole: 'carwash_owner',
          type: 'review_negative',
          priority: 'critical',
          category: 'customer',
          title: '2⭐ Review Alert',
          message: 'Mike Johnson: "Service was rushed, missed some spots"',
          icon: 'AlertOctagon',
          actionUrl: '/reviews',
          actionButtons: [
            { label: 'View Review', action: 'navigate', payload: '/reviews' },
            { label: 'Respond', action: 'navigate', variant: 'primary' }
          ],
          metadata: { reviewId: 'rev123', customerId: 'cust456' }
        });
      }, 2000);

      setTimeout(() => {
        addNotification({
          userId: 'owner1',
          userRole: 'carwash_owner',
          type: 'staff_shortage',
          priority: 'critical',
          category: 'operational',
          title: 'Critical: Staff Shortage',
          message: 'Only 2/5 staff checked in for Downtown Branch today',
          icon: 'Users',
          actionUrl: '/employees',
          actionButtons: [
            { label: 'Call Backup Staff', action: 'navigate', payload: '/employees' },
            { label: 'View Schedule', action: 'navigate' }
          ],
          metadata: { branchId: 'branch1' }
        });
      }, 3000);

      setTimeout(() => {
        addNotification({
          userId: 'owner1',
          userRole: 'carwash_owner',
          type: 'customer_churn_risk',
          priority: 'high',
          category: 'customer',
          title: 'Churn Risk: Emily Davis',
          message: 'No activity for 45 days. AI predicts 78% likely to churn.',
          icon: 'UserMinus',
          actionUrl: '/customers',
          actionButtons: [
            { label: 'View Profile', action: 'navigate', payload: '/customers' },
            { label: 'Send Win-Back Offer', action: 'api_call', variant: 'primary' }
          ],
          metadata: { customerId: 'cust789' }
        });
      }, 4000);

      setTimeout(() => {
        addNotification({
          userId: 'owner1',
          userRole: 'carwash_owner',
          type: 'service_request_approved',
          priority: 'medium',
          category: 'administrative',
          title: 'Service Request Approved',
          message: 'ROOT OWNER approved your "Ceramic Coating" service request',
          icon: 'CheckCircle',
          actionUrl: '/services',
          actionButtons: [
            { label: 'Add to Catalog', action: 'navigate', payload: '/services' }
          ],
          metadata: { serviceRequestId: 'req123' }
        });
      }, 5000);

      setTimeout(() => {
        addNotification({
          userId: 'owner1',
          userRole: 'carwash_owner',
          type: 'capacity_peak_approaching',
          priority: 'high',
          category: 'operational',
          title: 'Peak Hour Approaching',
          message: 'High demand expected in 2 hours at Airport Branch',
          icon: 'TrendingUp',
          actionUrl: '/capacity',
          actionButtons: [
            { label: 'View Capacity', action: 'navigate', payload: '/capacity' },
            { label: 'Add Staff', action: 'navigate', payload: '/employees' }
          ],
          metadata: { branchId: 'branch2' }
        });
      }, 6000);

      setTimeout(() => {
        addNotification({
          userId: 'owner1',
          userRole: 'carwash_owner',
          type: 'campaign_performance',
          priority: 'medium',
          category: 'marketing',
          title: 'Campaign Performance Update',
          message: 'Summer Special campaign: 234 clicks, 18% conversion rate',
          icon: 'BarChart3',
          actionUrl: '/campaigns',
          actionButtons: [
            { label: 'View Campaign', action: 'navigate', payload: '/campaigns' }
          ],
          metadata: { campaignId: 'camp123' }
        });
      }, 7000);

      setTimeout(() => {
        addNotification({
          userId: 'owner1',
          userRole: 'carwash_owner',
          type: 'revenue_alert',
          priority: 'medium',
          category: 'financial',
          title: 'Daily Revenue Update',
          message: '$2,450 today (↑12% vs yesterday)',
          icon: 'DollarSign',
          actionUrl: '/revenue',
          actionButtons: [
            { label: 'View Report', action: 'navigate', payload: '/revenue' }
          ]
        });
      }, 8000);
    }
  }, [userRole, addNotification]);
}
