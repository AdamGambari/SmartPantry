import { supabase, type Household, type HouseholdMember, type UserRole } from './supabase'

export class HouseholdService {
  // Create a new household
  static async createHousehold(name: string, description?: string): Promise<Household> {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) throw new Error('User not authenticated')

    const { data, error } = await supabase
      .from('households')
      .insert({
        name,
        description,
        created_by: user.id
      })
      .select()
      .single()

    if (error) throw error
    return data
  }

  // Get all households for a user
  static async getUserHouseholds(): Promise<Household[]> {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) throw new Error('User not authenticated')

    const { data, error } = await supabase
      .from('household_members')
      .select(`
        household_id,
        households (*)
      `)
      .eq('user_id', user.id)

    if (error) throw error
    return data?.map(item => item.households).filter(Boolean) as Household[]
  }

  // Get household members
  static async getHouseholdMembers(householdId: string): Promise<HouseholdMember[]> {
    const { data, error } = await supabase
      .from('household_members')
      .select(`
        *,
        profiles (full_name, email, avatar_url)
      `)
      .eq('household_id', householdId)
      .order('joined_at', { ascending: true })

    if (error) throw error
    return data || []
  }

  // Add member to household
  static async addHouseholdMember(householdId: string, email: string, role: UserRole = 'member'): Promise<void> {
    // First, get the user by email
    const { data: user, error: userError } = await supabase
      .from('profiles')
      .select('id')
      .eq('email', email)
      .single()

    if (userError || !user) {
      throw new Error('User not found')
    }

    const { error } = await supabase
      .from('household_members')
      .insert({
        household_id: householdId,
        user_id: user.id,
        role
      })

    if (error) throw error
  }

  // Update member role
  static async updateMemberRole(householdId: string, userId: string, role: UserRole): Promise<void> {
    const { error } = await supabase
      .from('household_members')
      .update({ role })
      .eq('household_id', householdId)
      .eq('user_id', userId)

    if (error) throw error
  }

  // Remove member from household
  static async removeHouseholdMember(householdId: string, userId: string): Promise<void> {
    const { error } = await supabase
      .from('household_members')
      .delete()
      .eq('household_id', householdId)
      .eq('user_id', userId)

    if (error) throw error
  }

  // Update household details
  static async updateHousehold(householdId: string, updates: Partial<Household>): Promise<Household> {
    const { data, error } = await supabase
      .from('households')
      .update(updates)
      .eq('id', householdId)
      .select()
      .single()

    if (error) throw error
    return data
  }

  // Delete household
  static async deleteHousehold(householdId: string): Promise<void> {
    const { error } = await supabase
      .from('households')
      .delete()
      .eq('id', householdId)

    if (error) throw error
  }

  // Get household by ID
  static async getHousehold(householdId: string): Promise<Household | null> {
    const { data, error } = await supabase
      .from('households')
      .select('*')
      .eq('id', householdId)
      .single()

    if (error) {
      if (error.code === 'PGRST116') return null // No rows returned
      throw error
    }
    return data
  }
}
