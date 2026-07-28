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
    PostgrestVersion: "14.5"
  }
  public: {
    Tables: {
      clinical_intakes: {
        Row: {
          answers: Json
          completed_at: string | null
          created_at: string
          current_step: string | null
          id: string
          last_activity_at: string
          last_completed_step: string | null
          lead_id: string | null
          provider_review_status: string
          resume_attempts: number
          resume_token_expires_at: string | null
          resume_token_hash: string | null
          status: string
          submitted_at: string | null
          updated_at: string
          verify_dob: string | null
          verify_last_name: string | null
        }
        Insert: {
          answers?: Json
          completed_at?: string | null
          created_at?: string
          current_step?: string | null
          id?: string
          last_activity_at?: string
          last_completed_step?: string | null
          lead_id?: string | null
          provider_review_status?: string
          resume_attempts?: number
          resume_token_expires_at?: string | null
          resume_token_hash?: string | null
          status?: string
          submitted_at?: string | null
          updated_at?: string
          verify_dob?: string | null
          verify_last_name?: string | null
        }
        Update: {
          answers?: Json
          completed_at?: string | null
          created_at?: string
          current_step?: string | null
          id?: string
          last_activity_at?: string
          last_completed_step?: string | null
          lead_id?: string | null
          provider_review_status?: string
          resume_attempts?: number
          resume_token_expires_at?: string | null
          resume_token_hash?: string | null
          status?: string
          submitted_at?: string | null
          updated_at?: string
          verify_dob?: string | null
          verify_last_name?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "clinical_intakes_lead_id_fkey"
            columns: ["lead_id"]
            isOneToOne: false
            referencedRelation: "leads"
            referencedColumns: ["id"]
          },
        ]
      }
      intake_events: {
        Row: {
          created_at: string
          event: string
          id: string
          intake_id: string | null
          lead_id: string | null
          step: string | null
        }
        Insert: {
          created_at?: string
          event: string
          id?: string
          intake_id?: string | null
          lead_id?: string | null
          step?: string | null
        }
        Update: {
          created_at?: string
          event?: string
          id?: string
          intake_id?: string | null
          lead_id?: string | null
          step?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "intake_events_intake_id_fkey"
            columns: ["intake_id"]
            isOneToOne: false
            referencedRelation: "clinical_intakes"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "intake_events_lead_id_fkey"
            columns: ["lead_id"]
            isOneToOne: false
            referencedRelation: "leads"
            referencedColumns: ["id"]
          },
        ]
      }
      leads: {
        Row: {
          clinical_intake_id: string | null
          consent_text_version: string
          created_at: string
          email: string
          first_name: string
          funnel_completed_at: string | null
          funnel_source: string
          funnel_status: string
          id: string
          last_activity_at: string
          last_name: string
          marketing_consent: boolean
          marketing_consent_at: string | null
          marketing_sync_attempted_at: string | null
          marketing_sync_completed_at: string | null
          marketing_sync_error_code: string | null
          marketing_sync_provider: string | null
          marketing_sync_status: string
          operational_consent: boolean
          operational_consent_at: string | null
          phone: string
          referring_page: string | null
          state: string
          utm_campaign: string | null
          utm_content: string | null
          utm_medium: string | null
          utm_source: string | null
          utm_term: string | null
        }
        Insert: {
          clinical_intake_id?: string | null
          consent_text_version: string
          created_at?: string
          email: string
          first_name: string
          funnel_completed_at?: string | null
          funnel_source?: string
          funnel_status?: string
          id?: string
          last_activity_at?: string
          last_name: string
          marketing_consent?: boolean
          marketing_consent_at?: string | null
          marketing_sync_attempted_at?: string | null
          marketing_sync_completed_at?: string | null
          marketing_sync_error_code?: string | null
          marketing_sync_provider?: string | null
          marketing_sync_status?: string
          operational_consent?: boolean
          operational_consent_at?: string | null
          phone: string
          referring_page?: string | null
          state: string
          utm_campaign?: string | null
          utm_content?: string | null
          utm_medium?: string | null
          utm_source?: string | null
          utm_term?: string | null
        }
        Update: {
          clinical_intake_id?: string | null
          consent_text_version?: string
          created_at?: string
          email?: string
          first_name?: string
          funnel_completed_at?: string | null
          funnel_source?: string
          funnel_status?: string
          id?: string
          last_activity_at?: string
          last_name?: string
          marketing_consent?: boolean
          marketing_consent_at?: string | null
          marketing_sync_attempted_at?: string | null
          marketing_sync_completed_at?: string | null
          marketing_sync_error_code?: string | null
          marketing_sync_provider?: string | null
          marketing_sync_status?: string
          operational_consent?: boolean
          operational_consent_at?: string | null
          phone?: string
          referring_page?: string | null
          state?: string
          utm_campaign?: string | null
          utm_content?: string | null
          utm_medium?: string | null
          utm_source?: string | null
          utm_term?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "leads_clinical_intake_id_fkey"
            columns: ["clinical_intake_id"]
            isOneToOne: false
            referencedRelation: "clinical_intakes"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
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
