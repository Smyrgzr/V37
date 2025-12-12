/**
 * Letwash API Client
 * Centralized API communication layer
 */

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api/v1';

// ============================================
// TYPES
// ============================================

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  email: string;
  password: string;
  fullName: string;
  phone?: string;
  businessModules: string[];
  subscriptionTier: 'STARTER' | 'PROFESSIONAL' | 'ENTERPRISE';
}

export interface User {
  id: string;
  email: string;
  fullName: string;
  role: 'ROOT_OWNER' | 'CARWASH_OWNER' | 'MANAGER' | 'STAFF';
  phone?: string;
  profilePhoto?: string;
}

export interface AuthResponse {
  user: User;
  accessToken: string;
  refreshToken: string;
}

// ============================================
// API CLIENT
// ============================================

class ApiClient {
  private baseUrl: string;
  private accessToken: string | null = null;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
    this.loadToken();
  }

  private loadToken() {
    this.accessToken = localStorage.getItem('accessToken');
  }

  private saveToken(token: string) {
    this.accessToken = token;
    localStorage.setItem('accessToken', token);
  }

  private removeToken() {
    this.accessToken = null;
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    const url = `${this.baseUrl}${endpoint}`;
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
      ...options.headers,
    };

    if (this.accessToken) {
      headers['Authorization'] = `Bearer ${this.accessToken}`;
    }

    try {
      const response = await fetch(url, {
        ...options,
        headers,
      });

      const data = await response.json();

      if (!response.ok) {
        // If unauthorized, try to refresh token
        if (response.status === 401) {
          const refreshed = await this.refreshToken();
          if (refreshed) {
            // Retry the original request
            return this.request<T>(endpoint, options);
          } else {
            this.removeToken();
            window.location.href = '/login';
          }
        }

        return {
          success: false,
          error: data.message || data.error || 'Request failed',
        };
      }

      return {
        success: true,
        data: data.data || data,
      };
    } catch (error) {
      console.error('API Error:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Network error',
      };
    }
  }

  // ============================================
  // AUTHENTICATION
  // ============================================

  async login(credentials: LoginRequest): Promise<ApiResponse<AuthResponse>> {
    const response = await this.request<AuthResponse>('/auth/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
    });

    if (response.success && response.data) {
      this.saveToken(response.data.accessToken);
      localStorage.setItem('refreshToken', response.data.refreshToken);
    }

    return response;
  }

  async register(data: RegisterRequest): Promise<ApiResponse<AuthResponse>> {
    const response = await this.request<AuthResponse>('/auth/register', {
      method: 'POST',
      body: JSON.stringify(data),
    });

    if (response.success && response.data) {
      this.saveToken(response.data.accessToken);
      localStorage.setItem('refreshToken', response.data.refreshToken);
    }

    return response;
  }

  async logout(): Promise<void> {
    await this.request('/auth/logout', { method: 'POST' });
    this.removeToken();
  }

  async refreshToken(): Promise<boolean> {
    const refreshToken = localStorage.getItem('refreshToken');
    if (!refreshToken) return false;

    const response = await this.request<AuthResponse>('/auth/refresh', {
      method: 'POST',
      body: JSON.stringify({ refreshToken }),
    });

    if (response.success && response.data) {
      this.saveToken(response.data.accessToken);
      localStorage.setItem('refreshToken', response.data.refreshToken);
      return true;
    }

    return false;
  }

  async getCurrentUser(): Promise<ApiResponse<User>> {
    return this.request<User>('/auth/me');
  }

  // ============================================
  // BRANCHES
  // ============================================

  async getBranches() {
    return this.request('/branches');
  }

  async createBranch(data: any) {
    return this.request('/branches', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async updateBranch(id: string, data: any) {
    return this.request(`/branches/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  async deleteBranch(id: string) {
    return this.request(`/branches/${id}`, {
      method: 'DELETE',
    });
  }

  // ============================================
  // SERVICES
  // ============================================

  async getServices(branchId?: string) {
    const query = branchId ? `?branchId=${branchId}` : '';
    return this.request(`/services${query}`);
  }

  async createService(data: any) {
    return this.request('/services', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async updateService(id: string, data: any) {
    return this.request(`/services/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  async deleteService(id: string) {
    return this.request(`/services/${id}`, {
      method: 'DELETE',
    });
  }

  // ============================================
  // BOOKINGS
  // ============================================

  async getBookings(params?: {
    branchId?: string;
    status?: string;
    startDate?: string;
    endDate?: string;
  }) {
    const query = new URLSearchParams(params as any).toString();
    return this.request(`/bookings${query ? `?${query}` : ''}`);
  }

  async getBooking(id: string) {
    return this.request(`/bookings/${id}`);
  }

  async createBooking(data: any) {
    return this.request('/bookings', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async updateBooking(id: string, data: any) {
    return this.request(`/bookings/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  async cancelBooking(id: string) {
    return this.request(`/bookings/${id}`, {
      method: 'DELETE',
    });
  }

  async getBookingStats() {
    return this.request('/bookings/stats/summary');
  }

  // ============================================
  // CUSTOMERS
  // ============================================

  async getCustomers(branchId?: string) {
    const query = branchId ? `?branchId=${branchId}` : '';
    return this.request(`/customers${query}`);
  }

  async createCustomer(data: any) {
    return this.request('/customers', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async updateCustomer(id: string, data: any) {
    return this.request(`/customers/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  // ============================================
  // CAMPAIGNS
  // ============================================

  async getCampaigns(branchId?: string) {
    const query = branchId ? `?branchId=${branchId}` : '';
    return this.request(`/campaigns${query}`);
  }

  async createCampaign(data: any) {
    return this.request('/campaigns', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async updateCampaign(id: string, data: any) {
    return this.request(`/campaigns/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  async deleteCampaign(id: string) {
    return this.request(`/campaigns/${id}`, {
      method: 'DELETE',
    });
  }

  // ============================================
  // ANALYTICS
  // ============================================

  async getDashboardAnalytics(branchId?: string) {
    const query = branchId ? `?branchId=${branchId}` : '';
    return this.request(`/analytics/dashboard${query}`);
  }

  // ============================================
  // NOTIFICATIONS
  // ============================================

  async getNotifications() {
    return this.request('/notifications');
  }

  async markNotificationAsRead(id: string) {
    return this.request(`/notifications/${id}/read`, {
      method: 'PUT',
    });
  }

  async markAllNotificationsAsRead() {
    return this.request('/notifications/read-all', {
      method: 'PUT',
    });
  }

  // ============================================
  // SUBSCRIPTIONS
  // ============================================

  async getSubscription() {
    return this.request('/subscriptions/current');
  }

  async createSubscription(data: {
    tierId: 'STARTER' | 'PROFESSIONAL' | 'ENTERPRISE';
    billingCycle: 'MONTHLY' | 'YEARLY';
    businessModules: string[];
  }) {
    return this.request('/subscriptions', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async updateSubscription(data: any) {
    return this.request('/subscriptions', {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  async cancelSubscription() {
    return this.request('/subscriptions/cancel', {
      method: 'POST',
    });
  }
}

// ============================================
// EXPORT SINGLETON
// ============================================

export const api = new ApiClient(API_BASE_URL);
export default api;
