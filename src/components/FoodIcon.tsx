'use client'

import { getEmojiByName, searchFoodEmojis, FoodEmoji } from '@/data/foodEmojis'

interface FoodIconProps {
  name: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}

const sizeClasses = {
  sm: 'text-lg',
  md: 'text-2xl',
  lg: 'text-3xl',
  xl: 'text-4xl'
}

export default function FoodIcon({ name, size = 'lg', className = '' }: FoodIconProps) {
  const emoji = getEmojiByName(name)
  
  return (
    <span className={`${sizeClasses[size]} ${className}`}>
      {emoji}
    </span>
  )
}

// Export search functionality for advanced use
export { searchFoodEmojis, getEmojiByName }
export type { FoodEmoji }
