import { createClient } from '@supabase/supabase-js'
import { Database } from '@/types/database'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey)

// Convenience types
export type Profile = Database['public']['Tables']['profiles']['Row']
export type Household = Database['public']['Tables']['households']['Row']
export type HouseholdMember = Database['public']['Tables']['household_members']['Row']
export type PantryItem = Database['public']['Tables']['pantry_items']['Row']
export type ShoppingList = Database['public']['Tables']['shopping_lists']['Row']
export type ShoppingListItem = Database['public']['Tables']['shopping_list_items']['Row']
export type Recipe = Database['public']['Tables']['recipes']['Row']

export type ItemCategory = Database['public']['Enums']['item_category']
export type UserRole = Database['public']['Enums']['user_role']
