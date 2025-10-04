'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { ChefHat, Clock, Users, ShoppingCart, Star } from 'lucide-react'
import { MealSuggestion } from '@/lib/aiFeatures'

interface AIMealSuggestionsProps {
  suggestions: MealSuggestion[]
}

export default function AIMealSuggestions({ suggestions }: AIMealSuggestionsProps) {
  const [selectedMeal, setSelectedMeal] = useState<MealSuggestion | null>(null)

  if (suggestions.length === 0) {
    return (
      <div className="bg-white/90 backdrop-blur-xl border-2 border-orange-200 p-8 text-center rounded-2xl shadow-xl">
        <div className="p-4 bg-orange-500 rounded-full w-20 h-20 mx-auto mb-4 flex items-center justify-center">
          <ChefHat className="w-10 h-10 text-white" />
        </div>
        <h3 className="text-xl font-bold text-orange-600 mb-2">🍽️ No Meal Suggestions Available</h3>
        <p className="text-gray-600 font-medium">Add more items to your pantry to get AI-powered meal suggestions!</p>
      </div>
    )
  }

  return (
    <div className="bg-white/90 backdrop-blur-xl border-2 border-orange-200 overflow-hidden rounded-2xl shadow-xl">
      <div className="px-8 py-6 border-b-2 border-orange-200 bg-orange-500">
        <h3 className="text-xl font-bold text-white uppercase tracking-wide flex items-center gap-2">
          <ChefHat className="w-6 h-6" />
          👨‍🍳 AI Meal Suggestions
        </h3>
      </div>
      
      <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {suggestions.map((meal, index) => (
            <motion.div
              key={meal.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`border-2 border-orange-200 p-6 cursor-pointer transition-all hover:shadow-lg rounded-xl ${
                selectedMeal?.id === meal.id ? 'bg-orange-100 border-orange-300' : 'bg-orange-50 hover:bg-orange-100'
              }`}
              onClick={() => setSelectedMeal(selectedMeal?.id === meal.id ? null : meal)}
            >
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h4 className="font-bold text-lg text-gray-800">{meal.name}</h4>
                  <p className="text-sm text-gray-700 mt-1">{meal.description}</p>
                </div>
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 fill-current" />
                  <span className="text-sm font-bold">{meal.confidence}%</span>
                </div>
              </div>
              
              <div className="flex items-center gap-4 text-sm mb-3">
                <div className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  <span>{meal.cookTime}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Users className="w-4 h-4" />
                  <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                    meal.difficulty === 'Easy' ? 'text-white bg-green-500' :
                    meal.difficulty === 'Medium' ? 'text-white bg-orange-500' : 'text-white bg-orange-500'
                  }`}>
                    {meal.difficulty}
                  </span>
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="text-sm">
                  <span className="font-bold">Ingredients:</span>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {meal.ingredients.map((ingredient, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1 bg-blue-50 text-gray-700 text-xs border-2 border-blue-200 rounded-lg"
                      >
                        {ingredient}
                      </span>
                    ))}
                  </div>
                </div>
                
                {meal.missingIngredients && meal.missingIngredients.length > 0 && (
                  <div className="text-sm">
                    <span className="font-bold text-orange-600">Missing:</span>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {meal.missingIngredients.map((ingredient, idx) => (
                        <span
                          key={idx}
                          className="px-3 py-1 bg-orange-50 text-orange-700 text-xs border-2 border-orange-200 rounded-lg"
                        >
                          {ingredient}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>
        
        {selectedMeal && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-6 p-6 bg-orange-50 border-2 border-orange-300 rounded-xl"
          >
            <h4 className="font-bold text-lg mb-3 text-gray-800">Recipe Details: {selectedMeal.name}</h4>
            <p className="text-gray-700 mb-4">{selectedMeal.description}</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h5 className="font-bold mb-2 text-gray-800">Ingredients:</h5>
                <ul className="list-disc list-inside space-y-1 text-sm text-gray-700">
                  {selectedMeal.ingredients.map((ingredient, idx) => (
                    <li key={idx}>{ingredient}</li>
                  ))}
                </ul>
              </div>
              
              <div>
                <h5 className="font-bold mb-2 text-gray-800">Instructions:</h5>
                <p className="text-sm text-gray-700">
                  {selectedMeal.difficulty === 'Easy' && 'This is a simple recipe perfect for beginners. Follow basic cooking techniques.'}
                  {selectedMeal.difficulty === 'Medium' && 'This recipe requires some cooking experience. Take your time and follow each step carefully.'}
                  {selectedMeal.difficulty === 'Hard' && 'This is an advanced recipe. Make sure you have the right tools and techniques.'}
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  )
}
