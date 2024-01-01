export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      alarms: {
        Row: {
          alarm_time: string
          id: number
          room_id: number
          status: Database["public"]["Enums"]["alarm_status_enum"] | null
          user_id: string
        }
        Insert: {
          alarm_time?: string
          id?: number
          room_id: number
          status?: Database["public"]["Enums"]["alarm_status_enum"] | null
          user_id: string
        }
        Update: {
          alarm_time?: string
          id?: number
          room_id?: number
          status?: Database["public"]["Enums"]["alarm_status_enum"] | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "alarms_room_id_fkey"
            columns: ["room_id"]
            isOneToOne: false
            referencedRelation: "rooms"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "alarms_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          }
        ]
      }
      invitation: {
        Row: {
          approved: boolean
          created_at: string
          created_by: string
          id: number
          room_id: number
          user_id: string
        }
        Insert: {
          approved?: boolean
          created_at?: string
          created_by: string
          id?: number
          room_id: number
          user_id: string
        }
        Update: {
          approved?: boolean
          created_at?: string
          created_by?: string
          id?: number
          room_id?: number
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "invitation_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "invitation_room_id_fkey"
            columns: ["room_id"]
            isOneToOne: false
            referencedRelation: "rooms"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "invitation_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          }
        ]
      }
      profiles: {
        Row: {
          avatar_url: string | null
          default_room: number | null
          id: string
          updated_at: string | null
          user_code: string
          user_name: string | null
        }
        Insert: {
          avatar_url?: string | null
          default_room?: number | null
          id: string
          updated_at?: string | null
          user_code?: string
          user_name?: string | null
        }
        Update: {
          avatar_url?: string | null
          default_room?: number | null
          id?: string
          updated_at?: string | null
          user_code?: string
          user_name?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "profiles_default_room_fkey"
            columns: ["default_room"]
            isOneToOne: false
            referencedRelation: "rooms"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "profiles_id_fkey"
            columns: ["id"]
            isOneToOne: true
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      room_members: {
        Row: {
          failure_count: number
          penalty_count: number
          remaining_skips: number
          room_id: number
          total_failure_count: number
          user_id: string
        }
        Insert: {
          failure_count?: number
          penalty_count?: number
          remaining_skips?: number
          room_id: number
          total_failure_count?: number
          user_id: string
        }
        Update: {
          failure_count?: number
          penalty_count?: number
          remaining_skips?: number
          room_id?: number
          total_failure_count?: number
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "room_members_room_id_fkey"
            columns: ["room_id"]
            isOneToOne: false
            referencedRelation: "rooms"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "room_members_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          }
        ]
      }
      rooms: {
        Row: {
          created_at: string
          host_user: string
          id: number
          name: string
          purpose: string
          rule: number
          status: Database["public"]["Enums"]["room_status"] | null
        }
        Insert: {
          created_at?: string
          host_user: string
          id?: number
          name: string
          purpose?: string
          rule: number
          status?: Database["public"]["Enums"]["room_status"] | null
        }
        Update: {
          created_at?: string
          host_user?: string
          id?: number
          name?: string
          purpose?: string
          rule?: number
          status?: Database["public"]["Enums"]["room_status"] | null
        }
        Relationships: [
          {
            foreignKeyName: "rooms_host_user_fkey"
            columns: ["host_user"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "rooms_rule_fkey"
            columns: ["rule"]
            isOneToOne: false
            referencedRelation: "rules"
            referencedColumns: ["id"]
          }
        ]
      }
      rules: {
        Row: {
          active_days: number[] | null
          created_at: string
          createdBy: string
          id: number
          penalty_detail: string
          penalty_threshold: number
          skip_limit: number
          skip_period: Database["public"]["Enums"]["skip_period_enum"] | null
          wakeup_time: string
        }
        Insert: {
          active_days?: number[] | null
          created_at?: string
          createdBy: string
          id?: number
          penalty_detail: string
          penalty_threshold: number
          skip_limit: number
          skip_period?: Database["public"]["Enums"]["skip_period_enum"] | null
          wakeup_time?: string
        }
        Update: {
          active_days?: number[] | null
          created_at?: string
          createdBy?: string
          id?: number
          penalty_detail?: string
          penalty_threshold?: number
          skip_limit?: number
          skip_period?: Database["public"]["Enums"]["skip_period_enum"] | null
          wakeup_time?: string
        }
        Relationships: [
          {
            foreignKeyName: "rules_createdBy_fkey"
            columns: ["createdBy"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          }
        ]
      }
      user_activity_logs: {
        Row: {
          room_id: number
          timestamp: string
          user_activity_type: Database["public"]["Enums"]["user_activity_type_enum"]
          user_id: string
        }
        Insert: {
          room_id: number
          timestamp?: string
          user_activity_type: Database["public"]["Enums"]["user_activity_type_enum"]
          user_id: string
        }
        Update: {
          room_id?: number
          timestamp?: string
          user_activity_type?: Database["public"]["Enums"]["user_activity_type_enum"]
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_activity_logs_room_id_fkey"
            columns: ["room_id"]
            isOneToOne: false
            referencedRelation: "rooms"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_activity_logs_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          }
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
      alarm_status_enum: "pause" | "standby" | "success" | "failure"
      days_enum: "0" | "1" | "2" | "3" | "4" | "5" | "6"
      room_status: "active" | "suspended" | "standby"
      skip_period_enum: "weekly" | "monthly"
      user_activity_type_enum:
        | "invite_make"
        | "invite_accept"
        | "penalty_alert"
        | "rule_approve"
        | "rule_propose"
        | "penalty_complete"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (Database["public"]["Tables"] & Database["public"]["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (Database["public"]["Tables"] &
      Database["public"]["Views"])
  ? (Database["public"]["Tables"] &
      Database["public"]["Views"])[PublicTableNameOrOptions] extends {
      Row: infer R
    }
    ? R
    : never
  : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof Database["public"]["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof Database["public"]["Tables"]
  ? Database["public"]["Tables"][PublicTableNameOrOptions] extends {
      Insert: infer I
    }
    ? I
    : never
  : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof Database["public"]["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof Database["public"]["Tables"]
  ? Database["public"]["Tables"][PublicTableNameOrOptions] extends {
      Update: infer U
    }
    ? U
    : never
  : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof Database["public"]["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof Database["public"]["Enums"]
  ? Database["public"]["Enums"][PublicEnumNameOrOptions]
  : never
