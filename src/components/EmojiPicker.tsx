'use client'

import { useState } from 'react'
import { foodEmojis, categories } from '@/data/foodEmojis'

interface EmojiPickerProps {
  onSelect: (emoji: string, name: string) => void;
  selectedEmoji?: string;
  className?: string;
}

export default function EmojiPicker({ onSelect, selectedEmoji, className = '' }: EmojiPickerProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('All')
  const [searchTerm, setSearchTerm] = useState('')

  const filteredEmojis = foodEmojis.filter(food => {
    const matchesCategory = selectedCategory === 'All' || food.category === selectedCategory
    const matchesSearch = searchTerm === '' || 
      food.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      food.keywords.some(keyword => keyword.toLowerCase().includes(searchTerm.toLowerCase()))
    
    return matchesCategory && matchesSearch
  })

  return (
    <div className={`bg-white border-2 border-black p-4 ${className}`}>
      {/* Search */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search foods..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full px-3 py-2 border-2 border-black text-black placeholder-gray-500 focus:outline-none focus:border-black"
        />
      </div>

      {/* Category Filter */}
      <div className="mb-4">
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setSelectedCategory('All')}
            className={`px-3 py-1 border-2 border-black text-sm font-bold transition-all ${
              selectedCategory === 'All' 
                ? 'bg-black text-white' 
                : 'bg-white text-black hover:bg-gray-100'
            }`}
          >
            All
          </button>
          {categories.map(category => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-3 py-1 border-2 border-black text-sm font-bold transition-all ${
                selectedCategory === category 
                  ? 'bg-black text-white' 
                  : 'bg-white text-black hover:bg-gray-100'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Emoji Grid */}
      <div className="grid grid-cols-6 gap-2 max-h-60 overflow-y-auto">
        {filteredEmojis.map((food) => (
          <button
            key={`${food.name}-${food.emoji}`}
            onClick={() => onSelect(food.emoji, food.name)}
            className={`p-2 border-2 transition-all hover:bg-gray-100 text-center ${
              selectedEmoji === food.emoji 
                ? 'border-black bg-gray-100' 
                : 'border-gray-300'
            }`}
            title={food.name}
          >
            <div className="text-2xl mb-1">{food.emoji}</div>
            <div className="text-xs font-medium text-gray-600 truncate">
              {food.name}
            </div>
          </button>
        ))}
      </div>

      {filteredEmojis.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          No foods found matching your search.
        </div>
      )}
    </div>
  )
}
