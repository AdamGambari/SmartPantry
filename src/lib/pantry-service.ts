import { supabase, type PantryItem, type ItemCategory } from './supabase'

export class PantryService {
  // Get all pantry items for a household
  static async getPantryItems(householdId: string): Promise<PantryItem[]> {
    const { data, error } = await supabase
      .from('pantry_items')
      .select('*')
      .eq('household_id', householdId)
      .order('created_at', { ascending: false })

    if (error) throw error
    return data || []
  }

  // Add a new pantry item
  static async addPantryItem(item: {
    household_id: string
    name: string
    quantity: number
    unit: string
    category: ItemCategory
    price?: number
    expires_at?: string
    notes?: string
  }): Promise<PantryItem> {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) throw new Error('User not authenticated')

    const { data, error } = await supabase
      .from('pantry_items')
      .insert({
        ...item,
        created_by: user.id
      })
      .select()
      .single()

    if (error) throw error
    return data
  }

  // Update a pantry item
  static async updatePantryItem(id: string, updates: Partial<PantryItem>): Promise<PantryItem> {
    const { data, error } = await supabase
      .from('pantry_items')
      .update(updates)
      .eq('id', id)
      .select()
      .single()

    if (error) throw error
    return data
  }

  // Delete a pantry item
  static async deletePantryItem(id: string): Promise<void> {
    const { error } = await supabase
      .from('pantry_items')
      .delete()
      .eq('id', id)

    if (error) throw error
  }

  // Get items expiring soon (within 7 days)
  static async getExpiringItems(householdId: string): Promise<PantryItem[]> {
    const sevenDaysFromNow = new Date()
    sevenDaysFromNow.setDate(sevenDaysFromNow.getDate() + 7)

    const { data, error } = await supabase
      .from('pantry_items')
      .select('*')
      .eq('household_id', householdId)
      .not('expires_at', 'is', null)
      .lte('expires_at', sevenDaysFromNow.toISOString())
      .order('expires_at', { ascending: true })

    if (error) throw error
    return data || []
  }

  // Get expired items
  static async getExpiredItems(householdId: string): Promise<PantryItem[]> {
    const now = new Date()

    const { data, error } = await supabase
      .from('pantry_items')
      .select('*')
      .eq('household_id', householdId)
      .not('expires_at', 'is', null)
      .lt('expires_at', now.toISOString())
      .order('expires_at', { ascending: true })

    if (error) throw error
    return data || []
  }

  // Search pantry items
  static async searchPantryItems(householdId: string, query: string): Promise<PantryItem[]> {
    const { data, error } = await supabase
      .from('pantry_items')
      .select('*')
      .eq('household_id', householdId)
      .ilike('name', `%${query}%`)
      .order('name', { ascending: true })

    if (error) throw error
    return data || []
  }

  // Get pantry statistics
  static async getPantryStats(householdId: string) {
    const [items, expiring, expired] = await Promise.all([
      this.getPantryItems(householdId),
      this.getExpiringItems(householdId),
      this.getExpiredItems(householdId)
    ])

    const totalValue = items.reduce((sum, item) => sum + (item.price || 0), 0)

    return {
      totalItems: items.length,
      expiringSoon: expiring.length,
      expired: expired.length,
      totalValue: totalValue
    }
  }
}
