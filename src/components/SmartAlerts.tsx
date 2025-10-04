'use client'

import { motion } from 'framer-motion'
import { Bell, Clock, Lightbulb, ShoppingCart } from 'lucide-react'
import { SmartAlert } from '@/lib/aiFeatures'

interface SmartAlertsProps {
  alerts: SmartAlert[]
}

export default function SmartAlerts({ alerts }: SmartAlertsProps) {
  if (alerts.length === 0) {
    return (
      <div className="bg-white/90 backdrop-blur-xl border-2 border-green-200 p-8 text-center rounded-2xl shadow-xl">
        <div className="p-4 bg-orange-500 rounded-full w-20 h-20 mx-auto mb-4 flex items-center justify-center">
          <Bell className="w-10 h-10 text-white" />
        </div>
        <h3 className="text-xl font-bold text-orange-600 mb-2">🎉 All Good!</h3>
        <p className="text-gray-600 font-medium">No alerts at this time. Your pantry is well managed!</p>
      </div>
    )
  }

  const getAlertIcon = (type: string) => {
    switch (type) {
      case 'expiration':
        return <Clock className="w-5 h-5" />
      case 'low_stock':
        return <ShoppingCart className="w-5 h-5" />
      case 'recipe_suggestion':
        return <Lightbulb className="w-5 h-5" />
      case 'waste_reduction':
        return <Lightbulb className="w-5 h-5" />
      default:
        return <Bell className="w-5 h-5" />
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'border-red-500 bg-red-50'
      case 'medium':
        return 'border-yellow-500 bg-yellow-50'
      case 'low':
        return 'border-blue-500 bg-blue-50'
      default:
        return 'border-gray-500 bg-gray-50'
    }
  }

  return (
    <div className="bg-white/90 backdrop-blur-xl border-2 border-orange-200 overflow-hidden rounded-2xl shadow-xl">
      <div className="px-8 py-6 border-b-2 border-orange-200 bg-orange-500">
        <h3 className="text-xl font-bold text-white uppercase tracking-wide flex items-center gap-2">
          🔔 Smart AI Alerts
        </h3>
      </div>
      
      <div className="p-6 space-y-4">
        {alerts.map((alert, index) => (
          <motion.div
            key={alert.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className={`border-2 p-6 rounded-xl shadow-lg ${getPriorityColor(alert.priority)}`}
          >
            <div className="flex items-start gap-4">
              <div className={`p-3 rounded-xl shadow-lg ${
                alert.priority === 'high' ? 'bg-orange-500 text-white' :
                alert.priority === 'medium' ? 'bg-blue-500 text-white' :
                'bg-green-500 text-white'
              }`}>
                {getAlertIcon(alert.type)}
              </div>
              
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-3">
                  <h4 className="font-bold text-gray-800 text-lg">{alert.title}</h4>
                  <span className={`px-3 py-1 text-xs font-bold rounded-full ${
                    alert.priority === 'high' ? 'text-white bg-orange-500' :
                    alert.priority === 'medium' ? 'text-white bg-blue-500' :
                    'text-white bg-green-500'
                  }`}>
                    {alert.priority.toUpperCase()}
                  </span>
                </div>
                
                <p className="text-gray-700 mb-4 font-medium">{alert.message}</p>
                
                {alert.suggestedAction && (
                  <div className="bg-blue-50 border-2 border-blue-200 p-4 rounded-xl">
                    <p className="text-sm text-gray-700 font-medium">
                      <span className="font-bold text-blue-600">💡 AI Suggestion:</span> {alert.suggestedAction}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
