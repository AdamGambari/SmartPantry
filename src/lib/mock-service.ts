// Mock service for when database is not set up yet
import { type PantryItem, type ItemCategory } from './supabase'

export class MockPantryService {
  private static mockItems: PantryItem[] = [
    {
      id: '1',
      household_id: 'mock-household',
      name: 'Organic Milk',
      quantity: 2,
      unit: 'cartons',
      category: 'dairy',
      price: 4.99,
      expires_at: '2024-01-15T00:00:00Z',
      purchased_at: '2024-01-10T00:00:00Z',
      created_by: 'mock-user',
      created_at: '2024-01-10T00:00:00Z',
      updated_at: '2024-01-10T00:00:00Z',
      notes: null
    },
    {
      id: '2',
      household_id: 'mock-household',
      name: 'Free Range Eggs',
      quantity: 12,
      unit: 'eggs',
      category: 'dairy',
      price: 3.99,
      expires_at: '2024-01-20T00:00:00Z',
      purchased_at: '2024-01-10T00:00:00Z',
      created_by: 'mock-user',
      created_at: '2024-01-10T00:00:00Z',
      updated_at: '2024-01-10T00:00:00Z',
      notes: null
    },
    {
      id: '3',
      household_id: 'mock-household',
      name: 'Whole Wheat Bread',
      quantity: 1,
      unit: 'loaf',
      category: 'bakery',
      price: 2.49,
      expires_at: '2024-01-12T00:00:00Z',
      purchased_at: '2024-01-10T00:00:00Z',
      created_by: 'mock-user',
      created_at: '2024-01-10T00:00:00Z',
      updated_at: '2024-01-10T00:00:00Z',
      notes: null
    }
  ]

  static async getPantryItems(householdId: string): Promise<PantryItem[]> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500))
    return this.mockItems
  }

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
    await new Promise(resolve => setTimeout(resolve, 300))
    
    const newItem: PantryItem = {
      id: Date.now().toString(),
      household_id: item.household_id,
      name: item.name,
      quantity: item.quantity,
      unit: item.unit,
      category: item.category,
      price: item.price || null,
      expires_at: item.expires_at || null,
      purchased_at: new Date().toISOString(),
      created_by: 'mock-user',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      notes: item.notes || null
    }
    
    this.mockItems.unshift(newItem)
    return newItem
  }

  static async deletePantryItem(id: string): Promise<void> {
    await new Promise(resolve => setTimeout(resolve, 300))
    this.mockItems = this.mockItems.filter(item => item.id !== id)
  }

  static async getExpiringItems(householdId: string): Promise<PantryItem[]> {
    await new Promise(resolve => setTimeout(resolve, 300))
    const sevenDaysFromNow = new Date()
    sevenDaysFromNow.setDate(sevenDaysFromNow.getDate() + 7)
    
    return this.mockItems.filter(item => 
      item.expires_at && new Date(item.expires_at) <= sevenDaysFromNow
    )
  }

  static async getExpiredItems(householdId: string): Promise<PantryItem[]> {
    await new Promise(resolve => setTimeout(resolve, 300))
    const now = new Date()
    
    return this.mockItems.filter(item => 
      item.expires_at && new Date(item.expires_at) < now
    )
  }

  static async searchPantryItems(householdId: string, query: string): Promise<PantryItem[]> {
    await new Promise(resolve => setTimeout(resolve, 300))
    return this.mockItems.filter(item => 
      item.name.toLowerCase().includes(query.toLowerCase())
    )
  }

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
