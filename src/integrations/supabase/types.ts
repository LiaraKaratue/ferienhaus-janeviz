export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.15"
  }
  public: {
    Tables: {
      admin_users: {
        Row: {
          created_at: string
          email: string
          full_name: string | null
          id: string
          notification_email: boolean | null
          notification_push: boolean | null
        }
        Insert: {
          created_at?: string
          email: string
          full_name?: string | null
          id: string
          notification_email?: boolean | null
          notification_push?: boolean | null
        }
        Update: {
          created_at?: string
          email?: string
          full_name?: string | null
          id?: string
          notification_email?: boolean | null
          notification_push?: boolean | null
        }
        Relationships: []
      }
      blocked_dates: {
        Row: {
          end_date: string
          external_uid: string | null
          id: string
          source: string
          start_date: string
          summary: string | null
          synced_at: string
        }
        Insert: {
          end_date: string
          external_uid?: string | null
          id?: string
          source: string
          start_date: string
          summary?: string | null
          synced_at?: string
        }
        Update: {
          end_date?: string
          external_uid?: string | null
          id?: string
          source?: string
          start_date?: string
          summary?: string | null
          synced_at?: string
        }
        Relationships: []
      }
      bookings: {
        Row: {
          booking_number: string
          check_in: string
          check_out: string
          created_at: string
          customer_id: string | null
          deposit_amount: number | null
          deposit_paid: boolean | null
          external_booking_id: string | null
          fully_paid: boolean | null
          guests_adults: number | null
          guests_children: number | null
          id: string
          source: string | null
          special_requests: string | null
          status: string | null
          total_price: number
          updated_at: string
        }
        Insert: {
          booking_number: string
          check_in: string
          check_out: string
          created_at?: string
          customer_id?: string | null
          deposit_amount?: number | null
          deposit_paid?: boolean | null
          external_booking_id?: string | null
          fully_paid?: boolean | null
          guests_adults?: number | null
          guests_children?: number | null
          id?: string
          source?: string | null
          special_requests?: string | null
          status?: string | null
          total_price: number
          updated_at?: string
        }
        Update: {
          booking_number?: string
          check_in?: string
          check_out?: string
          created_at?: string
          customer_id?: string | null
          deposit_amount?: number | null
          deposit_paid?: boolean | null
          external_booking_id?: string | null
          fully_paid?: boolean | null
          guests_adults?: number | null
          guests_children?: number | null
          id?: string
          source?: string | null
          special_requests?: string | null
          status?: string | null
          total_price?: number
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "bookings_customer_id_fkey"
            columns: ["customer_id"]
            isOneToOne: false
            referencedRelation: "customers"
            referencedColumns: ["id"]
          },
        ]
      }
      contracts: {
        Row: {
          booking_id: string
          contract_data: Json
          created_at: string
          id: string
          ip_address: string | null
          signature_data: string | null
          signed_at: string | null
        }
        Insert: {
          booking_id: string
          contract_data: Json
          created_at?: string
          id?: string
          ip_address?: string | null
          signature_data?: string | null
          signed_at?: string | null
        }
        Update: {
          booking_id?: string
          contract_data?: Json
          created_at?: string
          id?: string
          ip_address?: string | null
          signature_data?: string | null
          signed_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "contracts_booking_id_fkey"
            columns: ["booking_id"]
            isOneToOne: true
            referencedRelation: "bookings"
            referencedColumns: ["id"]
          },
        ]
      }
      customers: {
        Row: {
          address_city: string | null
          address_country: string | null
          address_postal_code: string | null
          address_street: string | null
          created_at: string
          email: string
          first_name: string
          id: string
          is_returning_guest: boolean | null
          last_name: string
          notes: string | null
          phone: string | null
          portal_access_until: string | null
          special_offers_enabled: boolean | null
          updated_at: string
        }
        Insert: {
          address_city?: string | null
          address_country?: string | null
          address_postal_code?: string | null
          address_street?: string | null
          created_at?: string
          email: string
          first_name: string
          id?: string
          is_returning_guest?: boolean | null
          last_name: string
          notes?: string | null
          phone?: string | null
          portal_access_until?: string | null
          special_offers_enabled?: boolean | null
          updated_at?: string
        }
        Update: {
          address_city?: string | null
          address_country?: string | null
          address_postal_code?: string | null
          address_street?: string | null
          created_at?: string
          email?: string
          first_name?: string
          id?: string
          is_returning_guest?: boolean | null
          last_name?: string
          notes?: string | null
          phone?: string | null
          portal_access_until?: string | null
          special_offers_enabled?: boolean | null
          updated_at?: string
        }
        Relationships: []
      }
      feedback: {
        Row: {
          booking_id: string
          comment: string | null
          id: string
          is_public: boolean | null
          rating: number | null
          submitted_at: string
        }
        Insert: {
          booking_id: string
          comment?: string | null
          id?: string
          is_public?: boolean | null
          rating?: number | null
          submitted_at?: string
        }
        Update: {
          booking_id?: string
          comment?: string | null
          id?: string
          is_public?: boolean | null
          rating?: number | null
          submitted_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "feedback_booking_id_fkey"
            columns: ["booking_id"]
            isOneToOne: true
            referencedRelation: "bookings"
            referencedColumns: ["id"]
          },
        ]
      }
      guest_access: {
        Row: {
          access_expires_at: string
          access_granted_at: string
          booking_id: string
          id: string
          user_id: string
        }
        Insert: {
          access_expires_at: string
          access_granted_at?: string
          booking_id: string
          id?: string
          user_id: string
        }
        Update: {
          access_expires_at?: string
          access_granted_at?: string
          booking_id?: string
          id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "guest_access_booking_id_fkey"
            columns: ["booking_id"]
            isOneToOne: false
            referencedRelation: "bookings"
            referencedColumns: ["id"]
          },
        ]
      }
      ical_feeds: {
        Row: {
          created_at: string
          feed_type: string
          feed_url: string
          id: string
          is_active: boolean | null
          last_synced_at: string | null
          name: string
        }
        Insert: {
          created_at?: string
          feed_type: string
          feed_url: string
          id?: string
          is_active?: boolean | null
          last_synced_at?: string | null
          name: string
        }
        Update: {
          created_at?: string
          feed_type?: string
          feed_url?: string
          id?: string
          is_active?: boolean | null
          last_synced_at?: string | null
          name?: string
        }
        Relationships: []
      }
      invoices: {
        Row: {
          booking_id: string | null
          created_at: string
          customer_id: string | null
          due_date: string
          id: string
          invoice_date: string
          invoice_number: string
          line_items: Json
          paid_at: string | null
          sent_at: string | null
          status: string | null
          tax_amount: number | null
          total_amount: number
        }
        Insert: {
          booking_id?: string | null
          created_at?: string
          customer_id?: string | null
          due_date: string
          id?: string
          invoice_date?: string
          invoice_number: string
          line_items: Json
          paid_at?: string | null
          sent_at?: string | null
          status?: string | null
          tax_amount?: number | null
          total_amount: number
        }
        Update: {
          booking_id?: string | null
          created_at?: string
          customer_id?: string | null
          due_date?: string
          id?: string
          invoice_date?: string
          invoice_number?: string
          line_items?: Json
          paid_at?: string | null
          sent_at?: string | null
          status?: string | null
          tax_amount?: number | null
          total_amount?: number
        }
        Relationships: [
          {
            foreignKeyName: "invoices_booking_id_fkey"
            columns: ["booking_id"]
            isOneToOne: false
            referencedRelation: "bookings"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "invoices_customer_id_fkey"
            columns: ["customer_id"]
            isOneToOne: false
            referencedRelation: "customers"
            referencedColumns: ["id"]
          },
        ]
      }
      messages: {
        Row: {
          booking_id: string
          content: string
          created_at: string
          id: string
          is_read: boolean | null
          sender_type: string
        }
        Insert: {
          booking_id: string
          content: string
          created_at?: string
          id?: string
          is_read?: boolean | null
          sender_type: string
        }
        Update: {
          booking_id?: string
          content?: string
          created_at?: string
          id?: string
          is_read?: boolean | null
          sender_type?: string
        }
        Relationships: [
          {
            foreignKeyName: "messages_booking_id_fkey"
            columns: ["booking_id"]
            isOneToOne: false
            referencedRelation: "bookings"
            referencedColumns: ["id"]
          },
        ]
      }
      payments: {
        Row: {
          amount: number
          booking_id: string
          created_at: string
          id: string
          paid_at: string | null
          payment_method: string | null
          payment_status: string | null
          payment_type: string
          paypal_order_id: string | null
          stripe_payment_id: string | null
        }
        Insert: {
          amount: number
          booking_id: string
          created_at?: string
          id?: string
          paid_at?: string | null
          payment_method?: string | null
          payment_status?: string | null
          payment_type: string
          paypal_order_id?: string | null
          stripe_payment_id?: string | null
        }
        Update: {
          amount?: number
          booking_id?: string
          created_at?: string
          id?: string
          paid_at?: string | null
          payment_method?: string | null
          payment_status?: string | null
          payment_type?: string
          paypal_order_id?: string | null
          stripe_payment_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "payments_booking_id_fkey"
            columns: ["booking_id"]
            isOneToOne: false
            referencedRelation: "bookings"
            referencedColumns: ["id"]
          },
        ]
      }
      seasonal_prices: {
        Row: {
          created_at: string
          end_date: string
          id: string
          is_active: boolean | null
          min_nights: number | null
          name: string
          price_per_night: number
          start_date: string
        }
        Insert: {
          created_at?: string
          end_date: string
          id?: string
          is_active?: boolean | null
          min_nights?: number | null
          name: string
          price_per_night: number
          start_date: string
        }
        Update: {
          created_at?: string
          end_date?: string
          id?: string
          is_active?: boolean | null
          min_nights?: number | null
          name?: string
          price_per_night?: number
          start_date?: string
        }
        Relationships: []
      }
      special_offers: {
        Row: {
          created_at: string
          description: string
          discount_percent: number
          for_returning_guests: boolean
          id: string
          is_active: boolean
          min_nights: number
          title: string
          valid_from: string
          valid_until: string
        }
        Insert: {
          created_at?: string
          description: string
          discount_percent: number
          for_returning_guests?: boolean
          id?: string
          is_active?: boolean
          min_nights?: number
          title: string
          valid_from: string
          valid_until: string
        }
        Update: {
          created_at?: string
          description?: string
          discount_percent?: number
          for_returning_guests?: boolean
          id?: string
          is_active?: boolean
          min_nights?: number
          title?: string
          valid_from?: string
          valid_until?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      has_guest_access: { Args: { _booking_id: string }; Returns: boolean }
      is_admin: { Args: never; Returns: boolean }
      no_admin_exists: { Args: never; Returns: boolean }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
