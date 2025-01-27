export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      catering_details: {
        Row: {
          cuisine_type: Database["public"]["Enums"]["cuisine_type"] | null
          id: string
          includes_equipment: boolean | null
          includes_service_staff: boolean | null
          max_price_per_person: number | null
          min_price_per_person: number | null
          offers_tasting: boolean | null
        }
        Insert: {
          cuisine_type?: Database["public"]["Enums"]["cuisine_type"] | null
          id: string
          includes_equipment?: boolean | null
          includes_service_staff?: boolean | null
          max_price_per_person?: number | null
          min_price_per_person?: number | null
          offers_tasting?: boolean | null
        }
        Update: {
          cuisine_type?: Database["public"]["Enums"]["cuisine_type"] | null
          id?: string
          includes_equipment?: boolean | null
          includes_service_staff?: boolean | null
          max_price_per_person?: number | null
          min_price_per_person?: number | null
          offers_tasting?: boolean | null
        }
        Relationships: [
          {
            foreignKeyName: "catering_details_id_fkey"
            columns: ["id"]
            isOneToOne: true
            referencedRelation: "vendors"
            referencedColumns: ["id"]
          },
        ]
      }
      catering_dietary_options: {
        Row: {
          catering_id: string | null
          id: string
          option_type: Database["public"]["Enums"]["dietary_option"]
        }
        Insert: {
          catering_id?: string | null
          id?: string
          option_type: Database["public"]["Enums"]["dietary_option"]
        }
        Update: {
          catering_id?: string | null
          id?: string
          option_type?: Database["public"]["Enums"]["dietary_option"]
        }
        Relationships: [
          {
            foreignKeyName: "catering_dietary_options_catering_id_fkey"
            columns: ["catering_id"]
            isOneToOne: false
            referencedRelation: "catering_details"
            referencedColumns: ["id"]
          },
        ]
      }
      favorites: {
        Row: {
          created_at: string | null
          id: string
          user_id: string | null
          vendor_id: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          user_id?: string | null
          vendor_id?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          user_id?: string | null
          vendor_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "favorites_vendor_id_fkey"
            columns: ["vendor_id"]
            isOneToOne: false
            referencedRelation: "vendors"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          created_at: string | null
          estimated_budget: number | null
          first_name: string | null
          guest_count: number | null
          id: string
          last_name: string | null
          updated_at: string | null
          wedding_date: string | null
          wedding_location: string | null
        }
        Insert: {
          created_at?: string | null
          estimated_budget?: number | null
          first_name?: string | null
          guest_count?: number | null
          id: string
          last_name?: string | null
          updated_at?: string | null
          wedding_date?: string | null
          wedding_location?: string | null
        }
        Update: {
          created_at?: string | null
          estimated_budget?: number | null
          first_name?: string | null
          guest_count?: number | null
          id?: string
          last_name?: string | null
          updated_at?: string | null
          wedding_date?: string | null
          wedding_location?: string | null
        }
        Relationships: []
      }
      reviews: {
        Row: {
          comment: string | null
          created_at: string | null
          id: string
          rating: number | null
          updated_at: string | null
          user_id: string | null
          vendor_id: string | null
        }
        Insert: {
          comment?: string | null
          created_at?: string | null
          id?: string
          rating?: number | null
          updated_at?: string | null
          user_id?: string | null
          vendor_id?: string | null
        }
        Update: {
          comment?: string | null
          created_at?: string | null
          id?: string
          rating?: number | null
          updated_at?: string | null
          user_id?: string | null
          vendor_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "reviews_vendor_id_fkey"
            columns: ["vendor_id"]
            isOneToOne: false
            referencedRelation: "vendors"
            referencedColumns: ["id"]
          },
        ]
      }
      vendor_availability: {
        Row: {
          created_at: string | null
          date: string
          id: string
          is_available: boolean | null
          vendor_id: string | null
        }
        Insert: {
          created_at?: string | null
          date: string
          id?: string
          is_available?: boolean | null
          vendor_id?: string | null
        }
        Update: {
          created_at?: string | null
          date?: string
          id?: string
          is_available?: boolean | null
          vendor_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "vendor_availability_vendor_id_fkey"
            columns: ["vendor_id"]
            isOneToOne: false
            referencedRelation: "vendors"
            referencedColumns: ["id"]
          },
        ]
      }
      vendor_services: {
        Row: {
          base_price: number | null
          created_at: string | null
          description: string | null
          id: string
          is_optional: boolean | null
          name: string
          vendor_id: string | null
        }
        Insert: {
          base_price?: number | null
          created_at?: string | null
          description?: string | null
          id?: string
          is_optional?: boolean | null
          name: string
          vendor_id?: string | null
        }
        Update: {
          base_price?: number | null
          created_at?: string | null
          description?: string | null
          id?: string
          is_optional?: boolean | null
          name?: string
          vendor_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "vendor_services_vendor_id_fkey"
            columns: ["vendor_id"]
            isOneToOne: false
            referencedRelation: "vendors"
            referencedColumns: ["id"]
          },
        ]
      }
      vendors: {
        Row: {
          address: string | null
          capacity_max: number | null
          capacity_min: number | null
          category: Database["public"]["Enums"]["vendor_category"]
          created_at: string | null
          description: string | null
          id: string
          latitude: number | null
          location: string
          longitude: number | null
          name: string
          price_range_max: number | null
          price_range_min: number | null
          rating: number | null
          review_count: number | null
          short_description: string | null
          updated_at: string | null
        }
        Insert: {
          address?: string | null
          capacity_max?: number | null
          capacity_min?: number | null
          category: Database["public"]["Enums"]["vendor_category"]
          created_at?: string | null
          description?: string | null
          id?: string
          latitude?: number | null
          location: string
          longitude?: number | null
          name: string
          price_range_max?: number | null
          price_range_min?: number | null
          rating?: number | null
          review_count?: number | null
          short_description?: string | null
          updated_at?: string | null
        }
        Update: {
          address?: string | null
          capacity_max?: number | null
          capacity_min?: number | null
          category?: Database["public"]["Enums"]["vendor_category"]
          created_at?: string | null
          description?: string | null
          id?: string
          latitude?: number | null
          location?: string
          longitude?: number | null
          name?: string
          price_range_max?: number | null
          price_range_min?: number | null
          rating?: number | null
          review_count?: number | null
          short_description?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      venue_details: {
        Row: {
          distance_to_city_center: number | null
          has_accommodation: boolean | null
          has_outdoor_space: boolean | null
          id: string
          indoor_capacity: number | null
          outdoor_capacity: number | null
          parking_capacity: number | null
        }
        Insert: {
          distance_to_city_center?: number | null
          has_accommodation?: boolean | null
          has_outdoor_space?: boolean | null
          id: string
          indoor_capacity?: number | null
          outdoor_capacity?: number | null
          parking_capacity?: number | null
        }
        Update: {
          distance_to_city_center?: number | null
          has_accommodation?: boolean | null
          has_outdoor_space?: boolean | null
          id?: string
          indoor_capacity?: number | null
          outdoor_capacity?: number | null
          parking_capacity?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "venue_details_id_fkey"
            columns: ["id"]
            isOneToOne: true
            referencedRelation: "vendors"
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
      cuisine_type:
        | "french"
        | "italian"
        | "mediterranean"
        | "asian"
        | "fusion"
        | "international"
      dietary_option:
        | "vegetarian"
        | "vegan"
        | "halal"
        | "kosher"
        | "gluten_free"
      vendor_category:
        | "venue"
        | "catering"
        | "photography"
        | "videography"
        | "wedding_planning"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never
