'use client'

import { motion } from 'framer-motion'
import { Target } from 'lucide-react'

interface AIAnalyticsProps {
  healthScore: number
  categories: Record<string, number>
  totalValue: number
  expiringSoon: number
}

export default function AIAnalytics({ healthScore, categories, totalValue, expiringSoon }: AIAnalyticsProps) {
  const getHealthScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600'
    if (score >= 60) return 'text-yellow-600'
    return 'text-red-600'
  }

  const getHealthScoreAdvice = (score: number) => {
    if (score >= 80) return 'Excellent! Your pantry is well-balanced and nutritious.'
    if (score >= 60) return 'Good! Consider adding more fresh produce for better nutrition.'
    return 'Room for improvement! Focus on adding fresh fruits and vegetables.'
  }

  return (
    <div className="space-y-6">
      {/* Health Score */}
      <div className="bg-white/90 backdrop-blur-xl border-2 border-green-200 p-8 rounded-2xl shadow-xl">
        <div className="flex items-center gap-3 mb-6">
          <h3 className="text-xl font-bold text-green-600 uppercase tracking-wide">❤️ AI Health Score</h3>
        </div>
        
        <div className="flex items-center gap-6">
          <div className="text-center">
            <div className={`text-4xl font-black ${getHealthScoreColor(healthScore)}`}>
              {healthScore}
            </div>
            <div className="text-sm text-gray-600 font-medium">out of 100</div>
          </div>
          
          <div className="flex-1">
            <div className="w-full bg-gray-200 h-6 border-2 border-gray-300 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${healthScore}%` }}
                transition={{ duration: 1, delay: 0.5 }}
                className={`h-full rounded-full ${
                  healthScore >= 80 ? 'bg-green-500' :
                  healthScore >= 60 ? 'bg-orange-500' : 'bg-orange-500'
                }`}
              />
            </div>
            <p className="text-sm text-gray-700 mt-3 font-medium">{getHealthScoreAdvice(healthScore)}</p>
          </div>
        </div>
      </div>

      {/* Category Analysis */}
      <div className="bg-white/90 backdrop-blur-xl border-2 border-blue-200 p-8 rounded-2xl shadow-xl">
        <div className="flex items-center gap-3 mb-6">
          <h3 className="text-xl font-bold text-blue-600 uppercase tracking-wide">📊 Pantry Analysis</h3>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {Object.entries(categories).map(([category, count]) => (
            <div key={category} className="bg-blue-50 border-2 border-blue-200 p-4 text-center rounded-xl hover:shadow-lg transition-all duration-300 hover:scale-105">
              <div className="text-3xl font-black text-blue-600">{count}</div>
              <div className="text-xs text-gray-600 font-medium">{category}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Smart Insights */}
      <div className="bg-white/90 backdrop-blur-xl border-2 border-orange-200 p-8 rounded-2xl shadow-xl">
        <div className="flex items-center gap-3 mb-6">
          <h3 className="text-xl font-bold text-orange-600 uppercase tracking-wide">🌱 AI Insights</h3>
        </div>
        
        <div className="space-y-4">
          <div className="flex items-start gap-4 p-4 bg-green-50 border-2 border-green-200 rounded-xl">
            <div className="p-2 bg-green-500 rounded-lg">
              <Target className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-700">
                <strong className="text-green-600">Waste Reduction:</strong> Your pantry is worth ${totalValue.toFixed(2)}. 
                {expiringSoon > 0 ? ` ${expiringSoon} item(s) need attention to prevent waste.` : ' No items expiring soon!'}
              </p>
            </div>
          </div>
          
          {Object.entries(categories).some(([, count]) => count === 0) && (
            <div className="flex items-start gap-4 p-4 bg-orange-50 border-2 border-orange-200 rounded-xl">
              <div className="p-2 bg-orange-500 rounded-lg">
                <Target className="w-5 h-5 text-white" />
              </div>
              <div>
              <p className="text-sm font-medium text-gray-700">
                <strong className="text-orange-600">Nutrition Balance:</strong> Consider adding items from categories with 0 items for better meal variety.
              </p>
              </div>
            </div>
          )}
          
          <div className="flex items-start gap-4 p-4 bg-blue-50 border-2 border-blue-200 rounded-xl">
            <div className="p-2 bg-blue-500 rounded-lg">
              <Target className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-700">
                <strong className="text-blue-600">Smart Tip:</strong> Use AI meal suggestions to make the most of your current ingredients and reduce food waste.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
