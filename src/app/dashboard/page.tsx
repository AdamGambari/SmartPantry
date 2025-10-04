'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabaseClient'
import { useRouter } from 'next/navigation'
import Navbar from '@/components/Navbar'
import { Package, DollarSign, AlertTriangle, Calendar, Brain } from 'lucide-react'
import FoodIcon from '@/components/FoodIcon'
import AIMealSuggestions from '@/components/AIMealSuggestions'
import SmartAlerts from '@/components/SmartAlerts'
import AIAnalytics from '@/components/AIAnalytics'
import { generateMealSuggestions, generateSmartAlerts, generateShoppingList, analyzeFoodCategories, calculateHealthScore } from '@/lib/aiFeatures'

interface PantryItem {
  id: string;
  name: string;
  quantity: number;
  unit: string;
  price?: number;
  expires?: string;
}

export default function Dashboard() {
  const [user, setUser] = useState<{ id: string; email?: string } | null>(null)
  const [loading, setLoading] = useState(true)
  const [pantryItems, setPantryItems] = useState<PantryItem[]>([])
  const [showAddForm, setShowAddForm] = useState(false)
  const [showShoppingList, setShowShoppingList] = useState(false)
  const [newItem, setNewItem] = useState({
    name: '',
    quantity: 1,
    unit: 'piece',
    price: '',
    expires: ''
  })
  const router = useRouter()

  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      if (user) {
        setUser(user)
        // Load pantry items from localStorage for demo
        const savedItems = localStorage.getItem(`pantry_${user.id}`)
        if (savedItems) {
          setPantryItems(JSON.parse(savedItems))
        }
      } else {
        router.push('/sign-in')
      }
      setLoading(false)
    }

    getUser()
  }, [router])

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    router.push('/')
  }

  const handleAddItem = (e: React.FormEvent) => {
    e.preventDefault()
    if (!user || !newItem.name.trim()) return

    const item: PantryItem = {
      id: Date.now().toString(),
      name: newItem.name.trim(),
      quantity: newItem.quantity,
      unit: newItem.unit,
      price: newItem.price ? parseFloat(newItem.price) : undefined,
      expires: newItem.expires || undefined
    }

    const updatedItems = [item, ...pantryItems]
    setPantryItems(updatedItems)
    localStorage.setItem(`pantry_${user.id}`, JSON.stringify(updatedItems))
    
    setNewItem({ name: '', quantity: 1, unit: 'piece', price: '', expires: '' })
    setShowAddForm(false)
  }

  const handleDeleteItem = (id: string) => {
    if (!user) return
    const updatedItems = pantryItems.filter(item => item.id !== id)
    setPantryItems(updatedItems)
    localStorage.setItem(`pantry_${user.id}`, JSON.stringify(updatedItems))
  }

  const getExpirationStatus = (expiryDate?: string) => {
    if (!expiryDate) return { status: 'unknown', color: 'bg-gray-100 text-gray-800', icon: '❓' }
    
    const today = new Date()
    const expiry = new Date(expiryDate)
    const diffTime = expiry.getTime() - today.getTime()
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

    if (diffDays < 0) return { status: 'expired', color: 'bg-red-100 text-red-800', icon: '🚨' }
    if (diffDays <= 7) return { status: 'soon', color: 'bg-orange-100 text-orange-800', icon: '⏰' }
    return { status: 'good', color: 'bg-green-100 text-green-800', icon: '✅' }
  }

  const totalValue = pantryItems.reduce((sum, item) => sum + (item.price || 0), 0)
  const expiringSoon = pantryItems.filter(item => {
    const status = getExpirationStatus(item.expires)
    return status.status === 'soon' || status.status === 'expired'
  }).length

  const [shoppingList, setShoppingList] = useState<string[]>([])
  const [isGeneratingList, setIsGeneratingList] = useState(false)

  const mealSuggestions = generateMealSuggestions(pantryItems)
  const smartAlerts = generateSmartAlerts(pantryItems)
  const foodCategories = analyzeFoodCategories(pantryItems)
  const healthScore = calculateHealthScore(pantryItems)

  // Generate AI shopping list
  useEffect(() => {
    const generateList = async () => {
      if (pantryItems.length > 0) {
        setIsGeneratingList(true)
        try {
          const list = await generateShoppingList(pantryItems, mealSuggestions)
          setShoppingList(list)
        } catch (error) {
          console.error('Error generating shopping list:', error)
        } finally {
          setIsGeneratingList(false)
        }
      }
    }
    generateList()
  }, [pantryItems, mealSuggestions])

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-yellow-50 to-green-50">
      <Navbar variant="dashboard" />
      
      <div className="pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-12">
            <div>
              <h1 className="text-5xl font-black bg-gradient-to-r from-orange-500 via-red-500 to-green-500 bg-clip-text text-transparent mb-4">
                🍎 MY SMART PANTRY 🥕
              </h1>
              <p className="text-xl text-gray-700 font-medium">
                🍽️ Welcome back, {user?.email?.split('@')[0]}! Manage your groceries and track expirations. 🍽️
              </p>
            </div>
            <div className="flex gap-3">
            <button
              onClick={() => setShowShoppingList(!showShoppingList)}
              disabled={isGeneratingList}
              className="bg-blue-500 text-white px-8 py-4 rounded-xl hover:bg-blue-600 hover:scale-105 transition-all duration-300 flex items-center gap-2 font-bold text-lg shadow-lg hover:shadow-blue-500/30 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isGeneratingList ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  🤖 AI Thinking...
                </>
              ) : (
                <>🛒 AI Shopping List</>
              )}
            </button>
            <button
              onClick={() => setShowAddForm(!showAddForm)}
              className="bg-green-500 text-white px-8 py-4 rounded-xl hover:bg-green-600 hover:scale-105 transition-all duration-300 flex items-center gap-2 font-bold text-lg shadow-lg hover:shadow-green-500/30"
            >
              ➕ Add Item
            </button>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-white/80 backdrop-blur-xl border-2 border-orange-200 p-6 rounded-2xl hover:shadow-xl hover:shadow-orange-500/20 transition-all duration-300 hover:scale-105">
              <div className="flex items-center gap-4">
                <div className="p-4 bg-orange-500 rounded-xl shadow-lg">
                  <Package className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-3xl font-black text-orange-600">{pantryItems.length}</p>
                  <p className="text-gray-600 text-sm font-medium">🍎 Total Items</p>
                </div>
              </div>
            </div>

            <div className="bg-white/80 backdrop-blur-xl border-2 border-orange-200 p-6 rounded-2xl hover:shadow-xl hover:shadow-orange-500/20 transition-all duration-300 hover:scale-105">
              <div className="flex items-center gap-4">
                <div className="p-4 bg-orange-500 rounded-xl shadow-lg">
                  <AlertTriangle className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-3xl font-black text-orange-600">{expiringSoon}</p>
                  <p className="text-gray-600 text-sm font-medium">⏰ Expiring Soon</p>
                </div>
              </div>
            </div>

            <div className="bg-white/80 backdrop-blur-xl border-2 border-green-200 p-6 rounded-2xl hover:shadow-xl hover:shadow-green-500/20 transition-all duration-300 hover:scale-105">
              <div className="flex items-center gap-4">
                <div className="p-4 bg-green-500 rounded-xl shadow-lg">
                  <DollarSign className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-3xl font-black text-green-600">${totalValue.toFixed(2)}</p>
                  <p className="text-gray-600 text-sm font-medium">💵 Total Value</p>
                </div>
              </div>
            </div>

            <div className="bg-white/80 backdrop-blur-xl border-2 border-blue-200 p-6 rounded-2xl hover:shadow-xl hover:shadow-blue-500/20 transition-all duration-300 hover:scale-105">
              <div className="flex items-center gap-4">
                <div className="p-4 bg-blue-500 rounded-xl shadow-lg">
                  <Calendar className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-3xl font-black text-blue-600">Dashboard</p>
                  <p className="text-gray-600 text-sm font-medium">🏠 Smart Pantry</p>
                </div>
              </div>
            </div>
          </div>

          {/* AI Shopping List */}
          {showShoppingList && (
            <div className="bg-white/90 backdrop-blur-xl border-2 border-blue-200 p-8 mb-8 rounded-2xl shadow-xl">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 bg-blue-500 rounded-xl">
                  <Brain className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-bold text-blue-600 uppercase tracking-wide">🧠 AI-Generated Shopping List</h3>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {shoppingList.map((item, index) => (
                  <div key={index} className="bg-blue-50 border-2 border-blue-200 p-4 text-center rounded-xl hover:shadow-lg transition-all duration-300 hover:scale-105">
                    <div className="font-medium text-gray-700">🛒 {item}</div>
                  </div>
                ))}
              </div>
              <p className="text-sm text-gray-700 mt-6 font-medium">
                💡 AI suggests these items based on your pantry, meal preferences, and common staples.
              </p>
            </div>
          )}

          {/* Add Item Form */}
          {showAddForm && (
            <div className="bg-white/90 backdrop-blur-xl border-2 border-green-200 p-8 mb-8 rounded-2xl shadow-xl">
              <h3 className="text-xl font-bold text-green-600 mb-6 uppercase tracking-wide">➕ Add New Item</h3>
              <form onSubmit={handleAddItem} className="grid grid-cols-1 md:grid-cols-5 gap-4">
                <div>
                  <label className="block text-black text-sm font-bold mb-2 uppercase tracking-wide">
                    Item Name
                  </label>
                  <input
                    type="text"
                    placeholder="e.g., Organic Milk"
                    value={newItem.name}
                    onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
                    className="w-full px-4 py-3 border-2 border-green-300 focus:border-green-500 focus:outline-none font-medium text-gray-800 placeholder-gray-500 rounded-lg bg-white/80"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-black text-sm font-bold mb-2 uppercase tracking-wide">
                    Quantity
                  </label>
                  <input
                    type="number"
                    placeholder="1"
                    value={newItem.quantity}
                    onChange={(e) => setNewItem({ ...newItem, quantity: Number(e.target.value) })}
                    className="w-full px-4 py-3 border-2 border-green-300 focus:border-green-500 focus:outline-none font-medium text-gray-800 placeholder-gray-500 rounded-lg bg-white/80"
                    min="1"
                    step="0.1"
                  />
                </div>
                
                <div>
                  <label className="block text-black text-sm font-bold mb-2 uppercase tracking-wide">
                    Unit/Pieces
                  </label>
                  <input
                    type="text"
                    placeholder="e.g., cartons, lbs, pieces"
                    value={newItem.unit}
                    onChange={(e) => setNewItem({ ...newItem, unit: e.target.value })}
                    className="w-full px-4 py-3 border-2 border-green-300 focus:border-green-500 focus:outline-none font-medium text-gray-800 placeholder-gray-500 rounded-lg bg-white/80"
                  />
                </div>
                
                <div>
                  <label className="block text-black text-sm font-bold mb-2 uppercase tracking-wide">
                    Price ($)
                  </label>
                  <input
                    type="number"
                    placeholder="0.00"
                    value={newItem.price}
                    onChange={(e) => setNewItem({ ...newItem, price: e.target.value })}
                    className="w-full px-4 py-3 border-2 border-green-300 focus:border-green-500 focus:outline-none font-medium text-gray-800 placeholder-gray-500 rounded-lg bg-white/80"
                    min="0"
                    step="0.01"
                  />
                </div>
                
                <div>
                  <label className="block text-black text-sm font-bold mb-2 uppercase tracking-wide">
                    Expires On
                  </label>
                  <input
                    type="date"
                    value={newItem.expires}
                    onChange={(e) => setNewItem({ ...newItem, expires: e.target.value })}
                    className="w-full px-4 py-3 border-2 border-green-300 focus:border-green-500 focus:outline-none font-medium text-gray-800 placeholder-gray-500 rounded-lg bg-white/80"
                  />
                </div>
                <div className="md:col-span-5 flex gap-4">
                  <button
                    type="submit"
                    className="bg-gradient-to-r from-green-500 to-emerald-500 text-white px-8 py-3 rounded-xl hover:from-green-600 hover:to-emerald-600 hover:scale-105 transition-all duration-300 font-bold text-lg shadow-lg hover:shadow-green-500/30"
                  >
                    ✅ Add Item
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowAddForm(false)}
                    className="bg-gradient-to-r from-gray-500 to-gray-600 text-white px-8 py-3 rounded-xl hover:from-gray-600 hover:to-gray-700 hover:scale-105 transition-all duration-300 font-bold text-lg shadow-lg hover:shadow-gray-500/30"
                  >
                    ❌ Cancel
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* Pantry Items List */}
          <div className="bg-white/90 backdrop-blur-xl border-2 border-blue-200 overflow-hidden rounded-2xl shadow-xl">
            <div className="px-8 py-6 border-b-2 border-blue-200 bg-blue-500">
              <h3 className="text-xl font-bold text-white uppercase tracking-wide">📦 Pantry Items</h3>
            </div>
            
            {pantryItems.length === 0 ? (
              <div className="p-12 text-center">
                <div className="p-4 bg-blue-500 rounded-full w-20 h-20 mx-auto mb-4 flex items-center justify-center">
                  <Package className="w-10 h-10 text-white" />
                </div>
                <p className="text-gray-700 text-lg font-medium">🍽️ No items in your pantry yet</p>
                <p className="text-gray-600 font-medium">Click &quot;➕ Add Item&quot; to get started</p>
              </div>
            ) : (
              <div className="divide-y divide-blue-200">
                {pantryItems.map((item) => {
                  const expirationStatus = getExpirationStatus(item.expires)
                  return (
                    <div
                      key={item.id}
                      className="p-6 hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 transition-all duration-300"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <FoodIcon name={item.name} size="lg" />
                          <div>
                            <h4 className="font-bold text-gray-800">{item.name}</h4>
                <p className="text-gray-600 text-sm font-medium">
                  {item.quantity} {item.unit}
                  {item.price && ` • $${item.price.toFixed(2)}`}
                  {item.expires && ` • Expires ${new Date(item.expires).toLocaleDateString()}`}
                </p>
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-3">
                          {item.expires && (
                            <span className={`px-3 py-1 rounded-full text-xs font-bold ${expirationStatus.color}`}>
                              {expirationStatus.icon} {expirationStatus.status.toUpperCase()}
                            </span>
                          )}
                          <button
                            onClick={() => handleDeleteItem(item.id)}
                            className="p-3 text-gray-600 hover:bg-red-500 hover:text-white border-2 border-gray-300 hover:border-red-500 transition-all duration-300 rounded-lg hover:scale-110"
                          >
                            🗑️
                          </button>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            )}
          </div>

          {/* AI Features Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
            {/* Smart Alerts */}
            <SmartAlerts alerts={smartAlerts} />
            
            {/* AI Analytics */}
            <AIAnalytics 
              healthScore={healthScore}
              categories={foodCategories}
              totalValue={totalValue}
              expiringSoon={expiringSoon}
            />
          </div>

          {/* AI Meal Suggestions */}
          <div className="mt-8">
            <AIMealSuggestions suggestions={mealSuggestions} />
          </div>

          <div className="text-center mt-8">
            <button
              onClick={handleSignOut}
              className="bg-gradient-to-r from-gray-500 to-gray-600 text-white px-8 py-3 rounded-xl hover:from-gray-600 hover:to-gray-700 hover:scale-105 transition-all duration-300 font-bold text-lg shadow-lg hover:shadow-gray-500/30"
            >
              👋 Sign Out
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}