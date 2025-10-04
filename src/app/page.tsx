'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Package, DollarSign, AlertTriangle, Users, ArrowRight, CheckCircle } from 'lucide-react'
import Navbar from '@/components/Navbar'

export default function Home() {
  const [showPreview, setShowPreview] = useState(true)

  // Mock data for marketing homepage
  const mockStats = {
    totalItems: 12,
    expiringSoon: 3,
    totalValue: 67.88,
    familyMembers: 4
  }

  const mockPantryItems = [
    { id: 1, name: 'Organic Milk', quantity: 2, unit: 'cartons', expires: '2024-01-15', price: 4.99, emoji: '🥛' },
    { id: 2, name: 'Free Range Eggs', quantity: 12, unit: 'eggs', expires: '2024-01-20', price: 3.99, emoji: '🥚' },
    { id: 3, name: 'Whole Wheat Bread', quantity: 1, unit: 'loaf', expires: '2024-01-12', price: 2.49, emoji: '🍞' },
    { id: 4, name: 'Chicken Breast', quantity: 1, unit: 'lb', expires: '2024-01-14', price: 6.99, emoji: '🍗' },
    { id: 5, name: 'Fresh Strawberries', quantity: 2, unit: 'pints', expires: '2024-01-18', price: 3.99, emoji: '🍓' },
    { id: 6, name: 'Greek Yogurt', quantity: 4, unit: 'containers', expires: '2024-01-16', price: 8.99, emoji: '🥛' },
    { id: 7, name: 'Aged Cheddar Cheese', quantity: 1, unit: 'block', expires: '2024-01-25', price: 5.99, emoji: '🧀' },
    { id: 8, name: 'Fresh Salmon', quantity: 1, unit: 'fillet', expires: '2024-01-13', price: 12.99, emoji: '🐟' },
    { id: 9, name: 'Avocado', quantity: 4, unit: 'pieces', expires: '2024-01-17', price: 2.99, emoji: '🥑' },
    { id: 10, name: 'Baby Spinach', quantity: 1, unit: 'bag', expires: '2024-01-19', price: 3.49, emoji: '🥬' },
    { id: 11, name: 'Bell Peppers', quantity: 3, unit: 'pieces', expires: '2024-01-21', price: 2.99, emoji: '🫑' },
    { id: 12, name: 'Fresh Coffee Beans', quantity: 1, unit: 'bag', expires: '2024-02-15', price: 8.99, emoji: '☕' },
  ]

  const getExpirationStatus = (expiryDate: string) => {
    const today = new Date()
    const expiry = new Date(expiryDate)
    const diffTime = expiry.getTime() - today.getTime()
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    
    if (diffDays < 0) return { status: 'expired', color: 'bg-red-100 text-red-800', icon: '🚨' }
    if (diffDays <= 2) return { status: 'expiring', color: 'bg-orange-100 text-orange-800', icon: '⚠️' }
    if (diffDays <= 7) return { status: 'soon', color: 'bg-yellow-100 text-yellow-800', icon: '⏰' }
    return { status: 'good', color: 'bg-green-100 text-green-800', icon: '✅' }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-100 via-yellow-50 to-green-100 relative overflow-hidden">
      <Navbar variant="homepage" />

      {/* Floating Food Emojis */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Food Emojis */}
        {[
          '🍎', '🥕', '🍞', '🥛', '🧀', '🍌', '🥚', '🍇', '🥑', '🍓', 
          '🍊', '🥬', '🍗', '🐟', '🥜', '🍅', '🌽', '🥒', '🍋', '🍒',
          '🥖', '🥨', '🧈', '🍯', '🥔', '🍄', '🌶️', '🥥', '🍑', '🍈'
        ].map((emoji, i) => (
          <motion.div
            key={i}
            className="absolute text-4xl select-none"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -50, 0],
              x: [0, Math.random() * 20 - 10, 0],
              rotate: [0, Math.random() * 360, 0],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 4 + Math.random() * 3,
              repeat: Infinity,
              delay: Math.random() * 2,
              ease: "easeInOut"
            }}
          >
            {emoji}
          </motion.div>
        ))}
        
        {/* Floating Food Icons */}
        <motion.div
          className="absolute top-20 left-20 text-6xl"
          animate={{ 
            y: [0, -30, 0],
            rotate: [0, 360],
            scale: [1, 1.1, 1]
          }}
          transition={{ 
            duration: 6, 
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          🍕
        </motion.div>
        <motion.div
          className="absolute top-40 right-32 text-5xl"
          animate={{ 
            y: [0, 40, 0],
            rotate: [0, -360],
            scale: [1, 1.2, 1]
          }}
          transition={{ 
            duration: 8, 
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          🍔
        </motion.div>
        <motion.div
          className="absolute bottom-32 left-1/4 text-5xl"
          animate={{ 
            y: [0, -25, 0],
            x: [0, 15, 0],
            rotate: [0, 180, 360]
          }}
          transition={{ 
            duration: 7, 
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          🍰
        </motion.div>
        <motion.div
          className="absolute top-1/2 right-20 text-4xl"
          animate={{ 
            y: [0, 30, 0],
            x: [0, -20, 0],
            scale: [1, 1.3, 1]
          }}
          transition={{ 
            duration: 5, 
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          🥗
        </motion.div>
      </div>

      {/* Hero Section */}
      <div className="relative overflow-hidden pt-24 pb-16">
        {/* Food-Themed Background Elements */}
        <div className="absolute inset-0">
          <motion.div 
            className="absolute top-20 left-10 w-96 h-96 bg-gradient-to-r from-orange-400 via-red-400 to-pink-400 rounded-full opacity-15 blur-3xl"
            animate={{
              scale: [1, 1.2, 1],
              rotate: [0, 180, 360],
            }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          />
          <motion.div 
            className="absolute top-40 right-20 w-80 h-80 bg-gradient-to-r from-green-400 via-lime-400 to-yellow-400 rounded-full opacity-20 blur-2xl"
            animate={{
              x: [0, 50, 0],
              y: [0, -30, 0],
              scale: [1, 1.1, 1],
            }}
            transition={{ duration: 15, repeat: Infinity }}
          />
          <motion.div 
            className="absolute bottom-20 left-1/3 w-72 h-72 bg-gradient-to-r from-purple-400 via-pink-400 to-rose-400 rounded-full opacity-18 blur-3xl"
            animate={{
              rotate: [0, -180, -360],
              scale: [1, 1.3, 1],
            }}
            transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          />
          <motion.div 
            className="absolute top-1/2 right-10 w-64 h-64 bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-400 rounded-full opacity-15 blur-2xl"
            animate={{
              y: [0, 40, 0],
              x: [0, -20, 0],
            }}
            transition={{ duration: 12, repeat: Infinity }}
          />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-center mb-16"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="inline-block mb-6 relative"
            >
              <h1 className="relative text-8xl font-black tracking-tight bg-gradient-to-r from-orange-500 via-red-500 via-green-500 to-yellow-500 bg-clip-text text-transparent mb-6">
                🍎 SMART PANTRY 🥕
              </h1>
              {/* Floating Food Animation */}
              <motion.div
                className="absolute inset-0 text-8xl font-black tracking-tight bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent opacity-20"
                animate={{ 
                  opacity: [0.2, 0.4, 0.2],
                  scale: [1, 1.02, 1]
                }}
                transition={{ 
                  duration: 2, 
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                🍎 SMART PANTRY 🥕
              </motion.div>
            </motion.div>
            
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-2xl text-gray-700 max-w-3xl mx-auto mb-8 font-medium leading-relaxed"
            >
              🍽️ Never waste food again! Track groceries, manage expirations, and plan delicious meals with precision for your family. 🍽️
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link href="/auth?mode=signup" className="relative group bg-gradient-to-r from-orange-500 via-red-500 to-green-500 text-white px-12 py-6 rounded-3xl font-black text-xl flex items-center justify-center gap-3 uppercase tracking-wide shadow-2xl hover:shadow-orange-500/50 transition-all duration-500 overflow-hidden">
                  {/* Animated Background */}
                  <div className="absolute inset-0 bg-gradient-to-r from-green-500 via-orange-500 to-red-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  {/* Shimmer Effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-20 group-hover:animate-pulse"></div>
                  <span className="relative z-10">🍴 Get Started Free 🍴</span>
                  <ArrowRight className="w-6 h-6 relative z-10 group-hover:translate-x-1 transition-transform duration-300" />
                </Link>
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Stats Cards */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16"
          >
            <motion.div 
              whileHover={{ scale: 1.08, rotateY: 10, rotateX: 5 }}
              className="relative group bg-white/80 backdrop-blur-xl border-2 border-orange-200 p-8 rounded-3xl hover:bg-white/90 transition-all duration-500 shadow-2xl hover:shadow-orange-500/30 overflow-hidden"
            >
              {/* Animated Background Gradient */}
              <div className="absolute inset-0 bg-gradient-to-br from-orange-400/20 via-red-500/20 to-yellow-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              {/* Floating Food Particles */}
              <div className="absolute top-2 right-2 text-lg animate-bounce">🥕</div>
              <div className="absolute bottom-4 left-4 text-sm animate-pulse">🍅</div>
              
              <div className="relative z-10 flex items-center gap-6">
                <motion.div 
                  className="p-4 bg-gradient-to-r from-orange-500 to-red-500 rounded-2xl shadow-2xl"
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.5 }}
                >
                  <Package className="w-10 h-10 text-white" />
                </motion.div>
                <div>
                  <motion.p 
                    className="text-4xl font-black bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent"
                    animate={{ scale: [1, 1.05, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    {mockStats.totalItems}
                  </motion.p>
                  <p className="text-gray-700 font-medium text-lg">🍎 Total Items</p>
                </div>
              </div>
            </motion.div>

            <motion.div 
              whileHover={{ scale: 1.08, rotateY: 10, rotateX: 5 }}
              className="relative group bg-white/80 backdrop-blur-xl border-2 border-red-200 p-8 rounded-3xl hover:bg-white/90 transition-all duration-500 shadow-2xl hover:shadow-red-500/30 overflow-hidden"
            >
              {/* Animated Background Gradient */}
              <div className="absolute inset-0 bg-gradient-to-br from-red-400/20 via-orange-500/20 to-pink-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              {/* Floating Food Particles */}
              <div className="absolute top-2 right-2 text-lg animate-bounce">⚠️</div>
              <div className="absolute bottom-4 left-4 text-sm animate-pulse">🍌</div>
              
              <div className="relative z-10 flex items-center gap-6">
                <motion.div 
                  className="p-4 bg-gradient-to-r from-red-500 to-orange-500 rounded-2xl shadow-2xl"
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.5 }}
                >
                  <AlertTriangle className="w-10 h-10 text-white" />
                </motion.div>
                <div>
                  <motion.p 
                    className="text-4xl font-black bg-gradient-to-r from-red-500 to-orange-500 bg-clip-text text-transparent"
                    animate={{ scale: [1, 1.05, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    {mockStats.expiringSoon}
                  </motion.p>
                  <p className="text-gray-700 font-medium text-lg">⏰ Expiring Soon</p>
                </div>
              </div>
            </motion.div>

            <motion.div 
              whileHover={{ scale: 1.08, rotateY: 10, rotateX: 5 }}
              className="relative group bg-white/80 backdrop-blur-xl border-2 border-green-200 p-8 rounded-3xl hover:bg-white/90 transition-all duration-500 shadow-2xl hover:shadow-green-500/30 overflow-hidden"
            >
              {/* Animated Background Gradient */}
              <div className="absolute inset-0 bg-gradient-to-br from-green-400/20 via-emerald-500/20 to-lime-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              {/* Floating Food Particles */}
              <div className="absolute top-2 right-2 text-lg animate-bounce">💰</div>
              <div className="absolute bottom-4 left-4 text-sm animate-pulse">🥬</div>
              
              <div className="relative z-10 flex items-center gap-6">
                <motion.div 
                  className="p-4 bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl shadow-2xl"
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.5 }}
                >
                  <DollarSign className="w-10 h-10 text-white" />
                </motion.div>
                <div>
                  <motion.p 
                    className="text-4xl font-black bg-gradient-to-r from-green-500 to-emerald-500 bg-clip-text text-transparent"
                    animate={{ scale: [1, 1.05, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    ${mockStats.totalValue}
                  </motion.p>
                  <p className="text-gray-700 font-medium text-lg">💵 Total Value</p>
                </div>
              </div>
            </motion.div>

            <motion.div 
              whileHover={{ scale: 1.08, rotateY: 10, rotateX: 5 }}
              className="relative group bg-white/80 backdrop-blur-xl border-2 border-purple-200 p-8 rounded-3xl hover:bg-white/90 transition-all duration-500 shadow-2xl hover:shadow-purple-500/30 overflow-hidden"
            >
              {/* Animated Background Gradient */}
              <div className="absolute inset-0 bg-gradient-to-br from-purple-400/20 via-pink-500/20 to-rose-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              {/* Floating Food Particles */}
              <div className="absolute top-2 right-2 text-lg animate-bounce">👨‍👩‍👧‍👦</div>
              <div className="absolute bottom-4 left-4 text-sm animate-pulse">🍇</div>
              
              <div className="relative z-10 flex items-center gap-6">
                <motion.div 
                  className="p-4 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl shadow-2xl"
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.5 }}
                >
                  <Users className="w-10 h-10 text-white" />
                </motion.div>
                <div>
                  <motion.p 
                    className="text-4xl font-black bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent"
                    animate={{ scale: [1, 1.05, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    {mockStats.familyMembers}
                  </motion.p>
                  <p className="text-gray-700 font-medium text-lg">👨‍👩‍👧‍👦 Family Members</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Live Preview Section */}
      {showPreview && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.5 }}
          className="relative bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 py-16 overflow-hidden"
        >
          {/* Animated Background Elements */}
          <div className="absolute inset-0">
            <div className="absolute top-10 left-10 w-64 h-64 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full opacity-10 blur-3xl animate-pulse"></div>
            <div className="absolute bottom-10 right-10 w-80 h-80 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full opacity-10 blur-3xl animate-pulse"></div>
            <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-gradient-to-r from-orange-500 to-red-500 rounded-full opacity-5 blur-3xl animate-pulse"></div>
          </div>

          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12"
            >
              <h2 className="text-5xl font-black bg-gradient-to-r from-white via-purple-200 to-pink-200 bg-clip-text text-transparent mb-4">
                SEE IT IN ACTION
              </h2>
              <p className="text-xl text-gray-300 font-medium">
                Here's how your pantry will look with Smart Pantry
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-white border-4 border-purple-200 p-8 rounded-3xl shadow-2xl shadow-purple-500/10"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {mockPantryItems.map((item, index) => {
                  const status = getExpirationStatus(item.expires)
                  return (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      whileHover={{ scale: 1.05, rotateY: 2 }}
                      className="bg-gradient-to-br from-white to-gray-50 border-2 border-gray-200 p-6 rounded-2xl hover:shadow-xl hover:shadow-gray-500/20 transition-all duration-300 backdrop-blur-sm"
                    >
                      <div className="flex items-center gap-4 mb-3">
                        <div className="text-4xl filter drop-shadow-sm">{item.emoji}</div>
                        <div className="flex-1">
                          <h3 className="font-bold text-gray-800">{item.name}</h3>
                          <p className="text-gray-600 text-sm font-medium">
                            {item.quantity} {item.unit} • ${item.price}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <p className="text-gray-500 text-sm font-medium">
                          Expires {new Date(item.expires).toLocaleDateString()}
                        </p>
                        <span className={`px-3 py-1 rounded-full text-xs font-bold ${status.color} shadow-sm`}>
                          {status.icon} {status.status.toUpperCase()}
                        </span>
                      </div>
                    </motion.div>
                  )
                })}
              </div>
            </motion.div>
          </div>
        </motion.div>
      )}

      {/* Features Section */}
      <div className="py-20 bg-gradient-to-br from-indigo-50 via-white to-cyan-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-5xl font-black bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-4">
              EVERYTHING YOU NEED
            </h2>
            <p className="text-xl text-gray-700 max-w-2xl mx-auto font-medium">
              Smart features designed to make pantry management effortless
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              whileHover={{ scale: 1.05, rotateY: 5 }}
              className="bg-gradient-to-br from-green-50 to-emerald-100 border-2 border-green-200 p-8 rounded-3xl hover:shadow-2xl hover:shadow-green-500/20 transition-all duration-300 backdrop-blur-sm"
            >
              <div className="p-4 bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl w-fit mb-6 shadow-lg">
                <CheckCircle className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-4">Expiration Tracking</h3>
              <p className="text-gray-700">
                Never waste food again. Get alerts before items expire and see what needs to be used first.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              whileHover={{ scale: 1.05, rotateY: 5 }}
              className="bg-gradient-to-br from-blue-50 to-cyan-100 border-2 border-blue-200 p-8 rounded-3xl hover:shadow-2xl hover:shadow-blue-500/20 transition-all duration-300 backdrop-blur-sm"
            >
              <div className="p-4 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl w-fit mb-6 shadow-lg">
                <Users className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-4">Family Sharing</h3>
              <p className="text-gray-700">
                Share your pantry with family members. Everyone can add items and get notifications.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              whileHover={{ scale: 1.05, rotateY: 5 }}
              className="bg-gradient-to-br from-purple-50 to-pink-100 border-2 border-purple-200 p-8 rounded-3xl hover:shadow-2xl hover:shadow-purple-500/20 transition-all duration-300 backdrop-blur-sm"
            >
              <div className="p-4 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl w-fit mb-6 shadow-lg">
                <Package className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-4">Smart Insights</h3>
              <p className="text-gray-700">
                AI-powered meal suggestions and shopping lists based on what you have and what's expiring.
              </p>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Footer CTA Section */}
      <footer className="py-20 text-center bg-gradient-to-br from-purple-900 via-pink-900 to-red-900 relative overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-20 w-72 h-72 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full opacity-20 blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full opacity-15 blur-3xl animate-pulse"></div>
          <div className="absolute top-1/2 left-1/2 w-80 h-80 bg-gradient-to-r from-pink-400 to-purple-500 rounded-full opacity-10 blur-3xl animate-pulse"></div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6 }}
          className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8"
        >
          <h2 className="text-5xl font-black bg-gradient-to-r from-white via-yellow-200 to-orange-200 bg-clip-text text-transparent mb-4">
            READY TO SIMPLIFY YOUR PANTRY?
          </h2>
          <p className="text-xl text-gray-200 mb-8 font-medium">
            Join thousands of families who never run out of groceries again.
          </p>
          <Link href="/sign-in" className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-12 py-5 rounded-2xl hover:from-yellow-500 hover:to-orange-600 transform hover:scale-105 transition-all duration-300 font-black text-lg inline-flex items-center gap-2 uppercase tracking-wide shadow-2xl hover:shadow-yellow-500/25">
            Get Started Today
            <ArrowRight className="w-5 h-5" />
          </Link>
          <p className="text-gray-300 mt-6 font-medium">
            Free to get started • No credit card required
          </p>
          <p className="text-gray-400 mt-8 font-medium">
            &copy; {new Date().getFullYear()} Smart Pantry. All rights reserved.
          </p>
        </motion.div>
      </footer>
    </div>
  )
}