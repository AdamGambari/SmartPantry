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
      profiles: {
        Row: {
          id: string
          email: string
          full_name: string | null
          avatar_url: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          email: string
          full_name?: string | null
          avatar_url?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          email?: string
          full_name?: string | null
          avatar_url?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      households: {
        Row: {
          id: string
          name: string
          description: string | null
          created_by: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          description?: string | null
          created_by: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          description?: string | null
          created_by?: string
          created_at?: string
          updated_at?: string
        }
      }
      household_members: {
        Row: {
          id: string
          household_id: string
          user_id: string
          role: 'owner' | 'member' | 'viewer'
          joined_at: string
        }
        Insert: {
          id?: string
          household_id: string
          user_id: string
          role?: 'owner' | 'member' | 'viewer'
          joined_at?: string
        }
        Update: {
          id?: string
          household_id?: string
          user_id?: string
          role?: 'owner' | 'member' | 'viewer'
          joined_at?: string
        }
      }
      pantry_items: {
        Row: {
          id: string
          household_id: string
          name: string
          quantity: number
          unit: string
          category: 'dairy' | 'meat' | 'produce' | 'bakery' | 'pantry' | 'frozen' | 'beverages' | 'snacks'
          price: number | null
          expires_at: string | null
          purchased_at: string
          created_by: string
          created_at: string
          updated_at: string
          notes: string | null
        }
        Insert: {
          id?: string
          household_id: string
          name: string
          quantity?: number
          unit?: string
          category: 'dairy' | 'meat' | 'produce' | 'bakery' | 'pantry' | 'frozen' | 'beverages' | 'snacks'
          price?: number | null
          expires_at?: string | null
          purchased_at?: string
          created_by: string
          created_at?: string
          updated_at?: string
          notes?: string | null
        }
        Update: {
          id?: string
          household_id?: string
          name?: string
          quantity?: number
          unit?: string
          category?: 'dairy' | 'meat' | 'produce' | 'bakery' | 'pantry' | 'frozen' | 'beverages' | 'snacks'
          price?: number | null
          expires_at?: string | null
          purchased_at?: string
          created_by?: string
          created_at?: string
          updated_at?: string
          notes?: string | null
        }
      }
      shopping_lists: {
        Row: {
          id: string
          household_id: string
          name: string
          status: 'active' | 'completed' | 'archived'
          created_by: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          household_id: string
          name: string
          status?: 'active' | 'completed' | 'archived'
          created_by: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          household_id?: string
          name?: string
          status?: 'active' | 'completed' | 'archived'
          created_by?: string
          created_at?: string
          updated_at?: string
        }
      }
      shopping_list_items: {
        Row: {
          id: string
          shopping_list_id: string
          name: string
          quantity: number
          unit: string
          category: 'dairy' | 'meat' | 'produce' | 'bakery' | 'pantry' | 'frozen' | 'beverages' | 'snacks' | null
          estimated_price: number | null
          is_purchased: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          shopping_list_id: string
          name: string
          quantity?: number
          unit?: string
          category?: 'dairy' | 'meat' | 'produce' | 'bakery' | 'pantry' | 'frozen' | 'beverages' | 'snacks' | null
          estimated_price?: number | null
          is_purchased?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          shopping_list_id?: string
          name?: string
          quantity?: number
          unit?: string
          category?: 'dairy' | 'meat' | 'produce' | 'bakery' | 'pantry' | 'frozen' | 'beverages' | 'snacks' | null
          estimated_price?: number | null
          is_purchased?: boolean
          created_at?: string
          updated_at?: string
        }
      }
      recipes: {
        Row: {
          id: string
          household_id: string
          name: string
          description: string | null
          ingredients: Json
          instructions: string[] | null
          prep_time: number | null
          cook_time: number | null
          servings: number | null
          tags: string[] | null
          image_url: string | null
          created_by: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          household_id: string
          name: string
          description?: string | null
          ingredients?: Json
          instructions?: string[] | null
          prep_time?: number | null
          cook_time?: number | null
          servings?: number | null
          tags?: string[] | null
          image_url?: string | null
          created_by: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          household_id?: string
          name?: string
          description?: string | null
          ingredients?: Json
          instructions?: string[] | null
          prep_time?: number | null
          cook_time?: number | null
          servings?: number | null
          tags?: string[] | null
          image_url?: string | null
          created_by?: string
          created_at?: string
          updated_at?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      user_role: 'owner' | 'member' | 'viewer'
      item_category: 'dairy' | 'meat' | 'produce' | 'bakery' | 'pantry' | 'frozen' | 'beverages' | 'snacks'
    }
  }
}
