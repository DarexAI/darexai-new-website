import { createClient } from '@supabase/supabase-js';

// Initialize Supabase client
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Demo Request Interface
export interface DemoRequest {
  id?: string;
  full_name: string;
  email: string;
  company_name: string;
  preferred_date?: string;
  preferred_time?: string;
  description: string;
  calendar_event_id?: string;
  status: 'pending' | 'scheduled' | 'completed' | 'cancelled';
  created_at?: string;
  updated_at?: string;
}

// User Profile Interface
export interface UserProfile {
  id: string;
  first_name?: string;
  last_name?: string;
  company?: string;
  phone?: string;
  timezone?: string;
  avatar_url?: string;
}

// User Preferences Interface
export interface UserPreferences {
  id?: string;
  user_id: string;
  notification_settings?: {
    leadAlerts: boolean;
    weeklyReports: boolean;
    meetingReminders: boolean;
    smsNotifications: boolean;
    pushNotifications: boolean;
    emailNotifications: boolean;
  };
  theme?: string;
}

// Demo Request Service
export class DemoRequestService {
  static async createDemoRequest(data: Omit<DemoRequest, 'id' | 'created_at' | 'updated_at'>): Promise<DemoRequest> {
    try {
      const { data: result, error } = await supabase
        .from('demo_requests')
        .insert([data])
        .select()
        .single();

      if (error) {
        console.error('Error creating demo request:', error);
        throw new Error(`Failed to save demo request: ${error.message}`);
      }

      return result;
    } catch (error) {
      console.error('Error in createDemoRequest:', error);
      throw error;
    }
  }

  static async updateDemoRequest(id: string, updates: Partial<DemoRequest>): Promise<DemoRequest> {
    try {
      const { data: result, error } = await supabase
        .from('demo_requests')
        .update({ ...updates, updated_at: new Date().toISOString() })
        .eq('id', id)
        .select()
        .single();

      if (error) {
        console.error('Error updating demo request:', error);
        throw new Error(`Failed to update demo request: ${error.message}`);
      }

      return result;
    } catch (error) {
      console.error('Error in updateDemoRequest:', error);
      throw error;
    }
  }

  static async getDemoRequests(): Promise<DemoRequest[]> {
    try {
      const { data, error } = await supabase
        .from('demo_requests')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error retrieving demo requests:', error);
        throw new Error(`Failed to retrieve demo requests: ${error.message}`);
      }

      return data || [];
    } catch (error) {
      console.error('Error in getDemoRequests:', error);
      throw error;
    }
  }

  static async getDemoRequestById(id: string): Promise<DemoRequest> {
    try {
      const { data, error } = await supabase
        .from('demo_requests')
        .select('*')
        .eq('id', id)
        .single();

      if (error) {
        console.error('Error retrieving demo request:', error);
        throw new Error(`Failed to retrieve demo request: ${error.message}`);
      }

      return data;
    } catch (error) {
      console.error('Error in getDemoRequestById:', error);
      throw error;
    }
  }
}

// User Service
export class UserService {
  static async getCurrentUser() {
    try {
      const { data: { user }, error } = await supabase.auth.getUser();
      
      if (error) {
        console.error('Error getting current user:', error);
        return null;
      }
      
      return user;
    } catch (error) {
      console.error('Error in getCurrentUser:', error);
      return null;
    }
  }

  static async getUserProfile(userId: string): Promise<UserProfile | null> {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();

      if (error) {
        console.error('Error retrieving user profile:', error);
        return null;
      }

      return data;
    } catch (error) {
      console.error('Error in getUserProfile:', error);
      return null;
    }
  }

  static async updateUserProfile(userId: string, updates: Partial<UserProfile>): Promise<UserProfile | null> {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .update(updates)
        .eq('id', userId)
        .select()
        .single();

      if (error) {
        console.error('Error updating user profile:', error);
        return null;
      }

      return data;
    } catch (error) {
      console.error('Error in updateUserProfile:', error);
      return null;
    }
  }

  static async getUserPreferences(userId: string): Promise<UserPreferences | null> {
    try {
      const { data, error } = await supabase
        .from('user_preferences')
        .select('*')
        .eq('user_id', userId)
        .single();

      if (error) {
        console.error('Error retrieving user preferences:', error);
        return null;
      }

      return data;
    } catch (error) {
      console.error('Error in getUserPreferences:', error);
      return null;
    }
  }

  static async updateUserPreferences(userId: string, updates: Partial<UserPreferences>): Promise<UserPreferences | null> {
    try {
      // Check if preferences exist
      const { data: existing } = await supabase
        .from('user_preferences')
        .select('id')
        .eq('user_id', userId)
        .single();

      if (existing) {
        // Update existing preferences
        const { data, error } = await supabase
          .from('user_preferences')
          .update(updates)
          .eq('user_id', userId)
          .select()
          .single();

        if (error) {
          console.error('Error updating user preferences:', error);
          return null;
        }

        return data;
      } else {
        // Create new preferences
        const { data, error } = await supabase
          .from('user_preferences')
          .insert([{ user_id: userId, ...updates }])
          .select()
          .single();

        if (error) {
          console.error('Error creating user preferences:', error);
          return null;
        }

        return data;
      }
    } catch (error) {
      console.error('Error in updateUserPreferences:', error);
      return null;
    }
  }
}

// Notification Service
export class NotificationService {
  static async createNotification(userId: string, message: string, messageType: string, payload: any = {}) {
    try {
      const { data, error } = await supabase
        .from('realtime_notifications')
        .insert([
          { 
            user_id: userId, 
            message_type: messageType, 
            payload,
            read_at: null
          }
        ])
        .select()
        .single();

      if (error) {
        console.error('Error creating notification:', error);
        throw new Error(`Failed to create notification: ${error.message}`);
      }

      return data;
    } catch (error) {
      console.error('Error in createNotification:', error);
      throw error;
    }
  }

  static async getUserNotifications(userId: string) {
    try {
      const { data, error } = await supabase
        .from('realtime_notifications')
        .select('*')
        .eq('user_id', userId)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error retrieving notifications:', error);
        throw new Error(`Failed to retrieve notifications: ${error.message}`);
      }

      return data || [];
    } catch (error) {
      console.error('Error in getUserNotifications:', error);
      throw error;
    }
  }

  static async markNotificationAsRead(notificationId: string) {
    try {
      const { data, error } = await supabase
        .from('realtime_notifications')
        .update({ read_at: new Date().toISOString() })
        .eq('id', notificationId)
        .select()
        .single();

      if (error) {
        console.error('Error marking notification as read:', error);
        throw new Error(`Failed to mark notification as read: ${error.message}`);
      }

      return data;
    } catch (error) {
      console.error('Error in markNotificationAsRead:', error);
      throw error;
    }
  }
}

// System Diagnostics Service
export class SystemDiagnosticsService {
  static async logDiagnostic(userId: string, componentName: string, status: 'pass' | 'fail' | 'warning' | 'checking', message: string, details?: string) {
    try {
      const { data, error } = await supabase
        .from('system_diagnostics')
        .insert([
          { 
            user_id: userId, 
            component_name: componentName, 
            status,
            message,
            details
          }
        ])
        .select()
        .single();

      if (error) {
        console.error('Error logging diagnostic:', error);
        throw new Error(`Failed to log diagnostic: ${error.message}`);
      }

      return data;
    } catch (error) {
      console.error('Error in logDiagnostic:', error);
      throw error;
    }
  }

  static async getUserDiagnostics(userId: string) {
    try {
      const { data, error } = await supabase
        .from('system_diagnostics')
        .select('*')
        .eq('user_id', userId)
        .order('checked_at', { ascending: false });

      if (error) {
        console.error('Error retrieving diagnostics:', error);
        throw new Error(`Failed to retrieve diagnostics: ${error.message}`);
      }

      return data || [];
    } catch (error) {
      console.error('Error in getUserDiagnostics:', error);
      throw error;
    }
  }
}

// Subscription Service
export class SubscriptionService {
  static async getUserSubscription(userId: string) {
    try {
      // First get the customer ID for this user
      const { data: customerData, error: customerError } = await supabase
        .from('stripe_customers')
        .select('customer_id')
        .eq('user_id', userId)
        .single();

      if (customerError) {
        console.error('Error retrieving customer:', customerError);
        return null;
      }

      if (!customerData) {
        return null; // No customer record found
      }

      // Then get the subscription for this customer
      const { data: subscriptionData, error: subscriptionError } = await supabase
        .from('stripe_user_subscriptions')
        .select('*')
        .eq('customer_id', customerData.customer_id)
        .single();

      if (subscriptionError && subscriptionError.code !== 'PGRST116') { // PGRST116 is "no rows returned" which is fine
        console.error('Error retrieving subscription:', subscriptionError);
        return null;
      }

      return subscriptionData || null;
    } catch (error) {
      console.error('Error in getUserSubscription:', error);
      return null;
    }
  }

  static async getUserOrders(userId: string) {
    try {
      // First get the customer ID for this user
      const { data: customerData, error: customerError } = await supabase
        .from('stripe_customers')
        .select('customer_id')
        .eq('user_id', userId)
        .single();

      if (customerError) {
        console.error('Error retrieving customer:', customerError);
        return [];
      }

      if (!customerData) {
        return []; // No customer record found
      }

      // Then get the orders for this customer
      const { data: orderData, error: orderError } = await supabase
        .from('stripe_user_orders')
        .select('*')
        .eq('customer_id', customerData.customer_id)
        .order('order_date', { ascending: false });

      if (orderError) {
        console.error('Error retrieving orders:', orderError);
        return [];
      }

      return orderData || [];
    } catch (error) {
      console.error('Error in getUserOrders:', error);
      return [];
    }
  }

  static async getUserPaymentMethods(userId: string) {
    try {
      // First get the customer ID for this user
      const { data: customerData, error: customerError } = await supabase
        .from('stripe_customers')
        .select('customer_id')
        .eq('user_id', userId)
        .single();

      if (customerError) {
        console.error('Error retrieving customer:', customerError);
        return [];
      }

      if (!customerData) {
        return []; // No customer record found
      }

      // Then get the payment methods for this customer
      const { data: paymentData, error: paymentError } = await supabase
        .from('stripe_payment_methods')
        .select('*')
        .eq('customer_id', customerData.customer_id)
        .order('created_at', { ascending: false });

      if (paymentError) {
        console.error('Error retrieving payment methods:', paymentError);
        return [];
      }

      return paymentData || [];
    } catch (error) {
      console.error('Error in getUserPaymentMethods:', error);
      return [];
    }
  }
}

// Google Workspace Integration Service
export class GoogleWorkspaceService {
  static async getUserIntegration(userId: string) {
    try {
      const { data, error } = await supabase
        .from('google_workspace_integrations')
        .select('*')
        .eq('user_id', userId)
        .single();

      if (error && error.code !== 'PGRST116') { // PGRST116 is "no rows returned" which is fine
        console.error('Error retrieving Google Workspace integration:', error);
        return null;
      }

      return data || null;
    } catch (error) {
      console.error('Error in getUserIntegration:', error);
      return null;
    }
  }

  static async updateUserIntegration(userId: string, updates: any) {
    try {
      // Check if integration exists
      const { data: existing } = await supabase
        .from('google_workspace_integrations')
        .select('id')
        .eq('user_id', userId)
        .single();

      if (existing) {
        // Update existing integration
        const { data, error } = await supabase
          .from('google_workspace_integrations')
          .update(updates)
          .eq('user_id', userId)
          .select()
          .single();

        if (error) {
          console.error('Error updating Google Workspace integration:', error);
          throw new Error(`Failed to update Google Workspace integration: ${error.message}`);
        }

        return data;
      } else {
        // Create new integration
        const { data, error } = await supabase
          .from('google_workspace_integrations')
          .insert([{ user_id: userId, ...updates }])
          .select()
          .single();

        if (error) {
          console.error('Error creating Google Workspace integration:', error);
          throw new Error(`Failed to create Google Workspace integration: ${error.message}`);
        }

        return data;
      }
    } catch (error) {
      console.error('Error in updateUserIntegration:', error);
      throw error;
    }
  }
}