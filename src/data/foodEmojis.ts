// Comprehensive Food Emoji Database for Smart Pantry
// Organized by categories for easy searching and selection

export interface FoodEmoji {
  name: string;
  emoji: string;
  category: string;
  keywords: string[];
}

export const foodEmojis: FoodEmoji[] = [
  // DAIRY & EGGS
  { name: 'Milk', emoji: '🥛', category: 'Dairy', keywords: ['milk', 'dairy', 'drink'] },
  { name: 'Eggs', emoji: '🥚', category: 'Dairy', keywords: ['eggs', 'chicken', 'protein'] },
  { name: 'Cheese', emoji: '🧀', category: 'Dairy', keywords: ['cheese', 'dairy', 'aged'] },
  { name: 'Butter', emoji: '🧈', category: 'Dairy', keywords: ['butter', 'dairy', 'spread'] },
  { name: 'Yogurt', emoji: '🥛', category: 'Dairy', keywords: ['yogurt', 'dairy', 'probiotic'] },
  { name: 'Ice Cream', emoji: '🍦', category: 'Dairy', keywords: ['ice cream', 'dessert', 'frozen'] },
  { name: 'Cream', emoji: '🥛', category: 'Dairy', keywords: ['cream', 'dairy', 'whipping'] },

  // BREADS & GRAINS
  { name: 'Bread', emoji: '🍞', category: 'Grains', keywords: ['bread', 'loaf', 'bakery'] },
  { name: 'Croissant', emoji: '🥐', category: 'Grains', keywords: ['croissant', 'pastry', 'french'] },
  { name: 'Bagel', emoji: '🥯', category: 'Grains', keywords: ['bagel', 'breakfast', 'bread'] },
  { name: 'Pretzel', emoji: '🥨', category: 'Grains', keywords: ['pretzel', 'snack', 'salty'] },
  { name: 'Rice', emoji: '🍚', category: 'Grains', keywords: ['rice', 'grain', 'asian'] },
  { name: 'Pasta', emoji: '🍝', category: 'Grains', keywords: ['pasta', 'noodles', 'italian'] },
  { name: 'Cereal', emoji: '🥣', category: 'Grains', keywords: ['cereal', 'breakfast', 'grains'] },
  { name: 'Oatmeal', emoji: '🥣', category: 'Grains', keywords: ['oatmeal', 'oats', 'breakfast'] },

  // MEAT & PROTEIN
  { name: 'Beef', emoji: '🥩', category: 'Protein', keywords: ['beef', 'steak', 'meat'] },
  { name: 'Chicken', emoji: '🍗', category: 'Protein', keywords: ['chicken', 'poultry', 'meat'] },
  { name: 'Pork', emoji: '🥓', category: 'Protein', keywords: ['bacon', 'pork', 'meat'] },
  { name: 'Fish', emoji: '🐟', category: 'Protein', keywords: ['fish', 'seafood', 'protein'] },
  { name: 'Shrimp', emoji: '🦐', category: 'Protein', keywords: ['shrimp', 'seafood', 'shellfish'] },
  { name: 'Crab', emoji: '🦀', category: 'Protein', keywords: ['crab', 'seafood', 'shellfish'] },
  { name: 'Lobster', emoji: '🦞', category: 'Protein', keywords: ['lobster', 'seafood', 'luxury'] },
  { name: 'Turkey', emoji: '🦃', category: 'Protein', keywords: ['turkey', 'poultry', 'thanksgiving'] },
  { name: 'Sausage', emoji: '🌭', category: 'Protein', keywords: ['sausage', 'hot dog', 'meat'] },
  { name: 'Ham', emoji: '🍖', category: 'Protein', keywords: ['ham', 'pork', 'meat'] },

  // FRUITS
  { name: 'Apple', emoji: '🍎', category: 'Fruits', keywords: ['apple', 'fruit', 'red'] },
  { name: 'Banana', emoji: '🍌', category: 'Fruits', keywords: ['banana', 'fruit', 'yellow'] },
  { name: 'Orange', emoji: '🍊', category: 'Fruits', keywords: ['orange', 'citrus', 'fruit'] },
  { name: 'Lemon', emoji: '🍋', category: 'Fruits', keywords: ['lemon', 'citrus', 'sour'] },
  { name: 'Lime', emoji: '🍋', category: 'Fruits', keywords: ['lime', 'citrus', 'green'] },
  { name: 'Grapes', emoji: '🍇', category: 'Fruits', keywords: ['grapes', 'fruit', 'purple'] },
  { name: 'Strawberry', emoji: '🍓', category: 'Fruits', keywords: ['strawberry', 'berry', 'red'] },
  { name: 'Blueberry', emoji: '🫐', category: 'Fruits', keywords: ['blueberry', 'berry', 'blue'] },
  { name: 'Cherry', emoji: '🍒', category: 'Fruits', keywords: ['cherry', 'fruit', 'red'] },
  { name: 'Peach', emoji: '🍑', category: 'Fruits', keywords: ['peach', 'fruit', 'fuzzy'] },
  { name: 'Pear', emoji: '🍐', category: 'Fruits', keywords: ['pear', 'fruit', 'green'] },
  { name: 'Pineapple', emoji: '🍍', category: 'Fruits', keywords: ['pineapple', 'tropical', 'fruit'] },
  { name: 'Watermelon', emoji: '🍉', category: 'Fruits', keywords: ['watermelon', 'summer', 'fruit'] },
  { name: 'Melon', emoji: '🍈', category: 'Fruits', keywords: ['cantaloupe', 'melon', 'fruit'] },
  { name: 'Kiwi', emoji: '🥝', category: 'Fruits', keywords: ['kiwi', 'fruit', 'green'] },
  { name: 'Mango', emoji: '🥭', category: 'Fruits', keywords: ['mango', 'tropical', 'fruit'] },
  { name: 'Avocado', emoji: '🥑', category: 'Fruits', keywords: ['avocado', 'fruit', 'green'] },
  { name: 'Coconut', emoji: '🥥', category: 'Fruits', keywords: ['coconut', 'tropical', 'white'] },

  // VEGETABLES
  { name: 'Carrot', emoji: '🥕', category: 'Vegetables', keywords: ['carrot', 'vegetable', 'orange'] },
  { name: 'Corn', emoji: '🌽', category: 'Vegetables', keywords: ['corn', 'vegetable', 'yellow'] },
  { name: 'Broccoli', emoji: '🥦', category: 'Vegetables', keywords: ['broccoli', 'vegetable', 'green'] },
  { name: 'Lettuce', emoji: '🥬', category: 'Vegetables', keywords: ['lettuce', 'leafy', 'green'] },
  { name: 'Cucumber', emoji: '🥒', category: 'Vegetables', keywords: ['cucumber', 'vegetable', 'green'] },
  { name: 'Tomato', emoji: '🍅', category: 'Vegetables', keywords: ['tomato', 'vegetable', 'red'] },
  { name: 'Potato', emoji: '🥔', category: 'Vegetables', keywords: ['potato', 'starch', 'brown'] },
  { name: 'Onion', emoji: '🧅', category: 'Vegetables', keywords: ['onion', 'vegetable', 'bulb'] },
  { name: 'Garlic', emoji: '🧄', category: 'Vegetables', keywords: ['garlic', 'spice', 'bulb'] },
  { name: 'Bell Pepper', emoji: '🫑', category: 'Vegetables', keywords: ['pepper', 'bell pepper', 'capsicum'] },
  { name: 'Hot Pepper', emoji: '🌶️', category: 'Vegetables', keywords: ['chili', 'hot pepper', 'spicy'] },
  { name: 'Mushroom', emoji: '🍄', category: 'Vegetables', keywords: ['mushroom', 'fungi', 'brown'] },
  { name: 'Eggplant', emoji: '🍆', category: 'Vegetables', keywords: ['eggplant', 'aubergine', 'purple'] },
  { name: 'Radish', emoji: '🥕', category: 'Vegetables', keywords: ['radish', 'root', 'red'] },
  { name: 'Sweet Potato', emoji: '🍠', category: 'Vegetables', keywords: ['sweet potato', 'yam', 'orange'] },

  // BEVERAGES
  { name: 'Coffee', emoji: '☕', category: 'Beverages', keywords: ['coffee', 'caffeine', 'hot'] },
  { name: 'Tea', emoji: '🫖', category: 'Beverages', keywords: ['tea', 'herbal', 'hot'] },
  { name: 'Beer', emoji: '🍺', category: 'Beverages', keywords: ['beer', 'alcohol', 'cold'] },
  { name: 'Wine', emoji: '🍷', category: 'Beverages', keywords: ['wine', 'alcohol', 'red'] },
  { name: 'Champagne', emoji: '🍾', category: 'Beverages', keywords: ['champagne', 'sparkling', 'celebration'] },
  { name: 'Soda', emoji: '🥤', category: 'Beverages', keywords: ['soda', 'pop', 'carbonated'] },
  { name: 'Juice', emoji: '🧃', category: 'Beverages', keywords: ['juice', 'fruit', 'drink'] },
  { name: 'Water', emoji: '💧', category: 'Beverages', keywords: ['water', 'hydration', 'clear'] },
  { name: 'Energy Drink', emoji: '🥤', category: 'Beverages', keywords: ['energy', 'caffeine', 'drink'] },

  // SNACKS & SWEETS
  { name: 'Chips', emoji: '🍟', category: 'Snacks', keywords: ['chips', 'fries', 'potato'] },
  { name: 'Popcorn', emoji: '🍿', category: 'Snacks', keywords: ['popcorn', 'corn', 'movie'] },
  { name: 'Candy', emoji: '🍬', category: 'Snacks', keywords: ['candy', 'sweet', 'sugar'] },
  { name: 'Chocolate', emoji: '🍫', category: 'Snacks', keywords: ['chocolate', 'sweet', 'cocoa'] },
  { name: 'Lollipop', emoji: '🍭', category: 'Snacks', keywords: ['lollipop', 'sucker', 'sweet'] },
  { name: 'Cookie', emoji: '🍪', category: 'Snacks', keywords: ['cookie', 'biscuit', 'sweet'] },
  { name: 'Cake', emoji: '🎂', category: 'Snacks', keywords: ['cake', 'dessert', 'birthday'] },
  { name: 'Donut', emoji: '🍩', category: 'Snacks', keywords: ['donut', 'doughnut', 'sweet'] },
  { name: 'Muffin', emoji: '🧁', category: 'Snacks', keywords: ['muffin', 'cupcake', 'baked'] },
  { name: 'Pie', emoji: '🥧', category: 'Snacks', keywords: ['pie', 'dessert', 'baked'] },
  { name: 'Cracker', emoji: '🍘', category: 'Snacks', keywords: ['cracker', 'rice', 'snack'] },
  { name: 'Nuts', emoji: '🥜', category: 'Snacks', keywords: ['nuts', 'peanuts', 'protein'] },

  // CONDIMENTS & SPICES
  { name: 'Salt', emoji: '🧂', category: 'Condiments', keywords: ['salt', 'seasoning', 'sodium'] },
  { name: 'Pepper', emoji: '🫚', category: 'Condiments', keywords: ['pepper', 'spice', 'black'] },
  { name: 'Olive Oil', emoji: '🫒', category: 'Condiments', keywords: ['olive', 'oil', 'healthy'] },
  { name: 'Honey', emoji: '🍯', category: 'Condiments', keywords: ['honey', 'sweet', 'natural'] },
  { name: 'Ketchup', emoji: '🍅', category: 'Condiments', keywords: ['ketchup', 'tomato', 'sauce'] },
  { name: 'Mustard', emoji: '🟡', category: 'Condiments', keywords: ['mustard', 'yellow', 'sauce'] },
  { name: 'Mayo', emoji: '🥄', category: 'Condiments', keywords: ['mayonnaise', 'mayo', 'sauce'] },
  { name: 'Vinegar', emoji: '🫗', category: 'Condiments', keywords: ['vinegar', 'acid', 'sour'] },
  { name: 'Soy Sauce', emoji: '🫗', category: 'Condiments', keywords: ['soy sauce', 'asian', 'sauce'] },

  // FROZEN FOODS
  { name: 'Ice Cream', emoji: '🍦', category: 'Frozen', keywords: ['ice cream', 'frozen', 'dessert'] },
  { name: 'Popsicle', emoji: '🍧', category: 'Frozen', keywords: ['popsicle', 'ice', 'frozen'] },
  { name: 'Snow Cone', emoji: '🍧', category: 'Frozen', keywords: ['snow cone', 'shaved ice', 'frozen'] },
  { name: 'Frozen Pizza', emoji: '🍕', category: 'Frozen', keywords: ['pizza', 'frozen', 'italian'] },
  { name: 'Frozen Vegetables', emoji: '🥦', category: 'Frozen', keywords: ['frozen vegetables', 'frozen', 'mixed'] },

  // CANNED & PACKAGED
  { name: 'Canned Soup', emoji: '🥫', category: 'Canned', keywords: ['canned', 'soup', 'preserved'] },
  { name: 'Canned Beans', emoji: '🫘', category: 'Canned', keywords: ['beans', 'canned', 'protein'] },
  { name: 'Tuna', emoji: '🐟', category: 'Canned', keywords: ['tuna', 'fish', 'canned'] },
  { name: 'Crackers', emoji: '🍘', category: 'Canned', keywords: ['crackers', 'snack', 'packaged'] },

  // SPECIALTY & HEALTH FOODS
  { name: 'Tofu', emoji: '🧈', category: 'Health', keywords: ['tofu', 'soy', 'protein'] },
  { name: 'Quinoa', emoji: '🌾', category: 'Health', keywords: ['quinoa', 'grain', 'superfood'] },
  { name: 'Chia Seeds', emoji: '🌱', category: 'Health', keywords: ['chia', 'seeds', 'superfood'] },
  { name: 'Almonds', emoji: '🥜', category: 'Health', keywords: ['almonds', 'nuts', 'healthy'] },
  { name: 'Granola', emoji: '🥣', category: 'Health', keywords: ['granola', 'cereal', 'healthy'] },
  { name: 'Protein Bar', emoji: '🍫', category: 'Health', keywords: ['protein bar', 'energy', 'healthy'] },
];

// Helper functions for easy emoji lookup
export const getEmojiByName = (name: string): string => {
  const food = foodEmojis.find(f => 
    f.name.toLowerCase() === name.toLowerCase() || 
    f.keywords.some(keyword => keyword.toLowerCase() === name.toLowerCase())
  );
  return food?.emoji || '🍽️'; // Default food emoji
};

export const getEmojiByCategory = (category: string): FoodEmoji[] => {
  return foodEmojis.filter(food => food.category === category);
};

export const searchFoodEmojis = (query: string): FoodEmoji[] => {
  const lowercaseQuery = query.toLowerCase();
  return foodEmojis.filter(food => 
    food.name.toLowerCase().includes(lowercaseQuery) ||
    food.keywords.some(keyword => keyword.toLowerCase().includes(lowercaseQuery))
  );
};

export const getRandomFoodEmoji = (): string => {
  const randomIndex = Math.floor(Math.random() * foodEmojis.length);
  return foodEmojis[randomIndex].emoji;
};

// Categories for easy filtering
export const categories = [
  'Dairy', 'Grains', 'Protein', 'Fruits', 'Vegetables', 
  'Beverages', 'Snacks', 'Condiments', 'Frozen', 'Canned', 'Health'
];
