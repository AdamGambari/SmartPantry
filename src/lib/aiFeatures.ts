
export interface MealSuggestion {
  id: string;
  name: string;
  description: string;
  ingredients: string[];
  difficulty: 'Easy' | 'Medium' | 'Hard';
  cookTime: string;
  category: 'Breakfast' | 'Lunch' | 'Dinner' | 'Snack';
  missingIngredients?: string[];
  confidence: number; // 0-100%
}

export interface SmartAlert {
  id: string;
  type: 'expiration' | 'low_stock' | 'recipe_suggestion' | 'waste_reduction';
  title: string;
  message: string;
  priority: 'high' | 'medium' | 'low';
  actionRequired: boolean;
  suggestedAction?: string;
}

export interface PantryItem {
  id: string;
  name: string;
  quantity: number;
  unit: string;
  price?: number;
  expires?: string;
}

export function generateMealSuggestions(pantryItems: PantryItem[]): MealSuggestion[] {
  const itemNames = pantryItems.map(item => item.name.toLowerCase());
  
  const mealDatabase: MealSuggestion[] = [
    // Breakfast Options
    {
      id: 'breakfast-1',
      name: 'Classic Scrambled Eggs & Toast',
      description: 'Perfect protein-rich breakfast to start your day',
      ingredients: ['eggs', 'bread', 'butter'],
      difficulty: 'Easy',
      cookTime: '10 min',
      category: 'Breakfast',
      confidence: 95
    },
    {
      id: 'breakfast-2', 
      name: 'Berry Yogurt Parfait',
      description: 'Healthy layered yogurt with fresh berries',
      ingredients: ['yogurt', 'strawberries', 'blueberries'],
      difficulty: 'Easy',
      cookTime: '5 min',
      category: 'Breakfast',
      confidence: 90
    },
    {
      id: 'breakfast-3',
      name: 'Avocado Toast Deluxe',
      description: 'Creamy avocado on crispy whole wheat toast',
      ingredients: ['avocado', 'bread', 'eggs', 'salt'],
      difficulty: 'Easy',
      cookTime: '8 min',
      category: 'Breakfast',
      confidence: 85
    },

    // Lunch Options
    {
      id: 'lunch-1',
      name: 'Grilled Chicken Salad',
      description: 'Fresh mixed greens with grilled chicken breast',
      ingredients: ['chicken', 'lettuce', 'spinach', 'tomatoes'],
      difficulty: 'Medium',
      cookTime: '20 min',
      category: 'Lunch',
      confidence: 88
    },
    {
      id: 'lunch-2',
      name: 'Caprese Sandwich',
      description: 'Fresh mozzarella, tomatoes, and basil on bread',
      ingredients: ['cheese', 'tomatoes', 'bread', 'basil'],
      difficulty: 'Easy',
      cookTime: '5 min',
      category: 'Lunch',
      confidence: 92
    },

    // Dinner Options
    {
      id: 'dinner-1',
      name: 'Pan-Seared Salmon',
      description: 'Perfectly cooked salmon with steamed vegetables',
      ingredients: ['salmon', 'broccoli', 'carrots', 'lemon'],
      difficulty: 'Medium',
      cookTime: '25 min',
      category: 'Dinner',
      confidence: 90
    },
    {
      id: 'dinner-2',
      name: 'Stir-Fry Vegetables',
      description: 'Colorful mix of fresh vegetables with rice',
      ingredients: ['bell peppers', 'broccoli', 'carrots', 'rice'],
      difficulty: 'Easy',
      cookTime: '15 min',
      category: 'Dinner',
      confidence: 87
    },
    {
      id: 'dinner-3',
      name: 'Chicken Pasta',
      description: 'Creamy pasta with grilled chicken',
      ingredients: ['chicken', 'pasta', 'cheese', 'milk'],
      difficulty: 'Medium',
      cookTime: '30 min',
      category: 'Dinner',
      confidence: 85
    }
  ];

  const suggestions = mealDatabase.map(meal => {
    const availableIngredients = meal.ingredients.filter(ingredient => 
      itemNames.some(item => item.includes(ingredient) || ingredient.includes(item))
    );
    
    const missingIngredients = meal.ingredients.filter(ingredient => 
      !itemNames.some(item => item.includes(ingredient) || ingredient.includes(item))
    );

    const confidence = Math.round((availableIngredients.length / meal.ingredients.length) * 100);
    
    return {
      ...meal,
      confidence,
      missingIngredients: missingIngredients.length > 0 ? missingIngredients : undefined
    };
  });

  // Return suggestions with at least 50% confidence, sorted by confidence
  return suggestions
    .filter(meal => meal.confidence >= 50)
    .sort((a, b) => b.confidence - a.confidence)
    .slice(0, 6); // Top 6 suggestions
}

export function generateSmartAlerts(pantryItems: PantryItem[]): SmartAlert[] {
  const alerts: SmartAlert[] = [];
  const today = new Date();

  pantryItems.forEach(item => {
    if (item.expires) {
      const expiryDate = new Date(item.expires);
      const diffTime = expiryDate.getTime() - today.getTime();
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

      if (diffDays < 0) {
        alerts.push({
          id: `expired-${item.id}`,
          type: 'expiration',
          title: '🚨 Item Expired!',
          message: `${item.name} expired ${Math.abs(diffDays)} day(s) ago`,
          priority: 'high',
          actionRequired: true,
          suggestedAction: 'Remove from pantry or check if still safe to consume'
        });
      } else if (diffDays <= 1) {
        alerts.push({
          id: `expires-today-${item.id}`,
          type: 'expiration',
          title: '⏰ Expires Today!',
          message: `${item.name} expires today`,
          priority: 'high',
          actionRequired: true,
          suggestedAction: 'Use immediately or freeze'
        });
      } else if (diffDays <= 3) {
        alerts.push({
          id: `expires-soon-${item.id}`,
          type: 'expiration',
          title: '⚠️ Expires Soon',
          message: `${item.name} expires in ${diffDays} day(s)`,
          priority: 'medium',
          actionRequired: false,
          suggestedAction: 'Plan to use in next meal'
        });
      }
    }

    // Low stock alerts
    if (item.quantity <= 1) {
      alerts.push({
        id: `low-stock-${item.id}`,
        type: 'low_stock',
        title: '📦 Low Stock',
        message: `${item.name} is running low (${item.quantity} ${item.unit})`,
        priority: 'medium',
        actionRequired: false,
        suggestedAction: 'Add to shopping list'
      });
    }
  });

  const expiringItems = pantryItems.filter(item => {
    if (!item.expires) return false;
    const expiryDate = new Date(item.expires);
    const diffTime = expiryDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays <= 3 && diffDays >= 0;
  });

  if (expiringItems.length >= 2) {
    alerts.push({
      id: 'waste-reduction-tip',
      type: 'waste_reduction',
      title: '🌱 Waste Reduction Tip',
      message: `You have ${expiringItems.length} items expiring soon. Consider meal prep!`,
      priority: 'low',
      actionRequired: false,
      suggestedAction: 'Check AI meal suggestions for recipes using these items'
    });
  }

  return alerts.sort((a, b) => {
    const priorityOrder = { high: 3, medium: 2, low: 1 };
    return priorityOrder[b.priority] - priorityOrder[a.priority];
  });
}

export async function generateShoppingList(pantryItems: PantryItem[], mealSuggestions: MealSuggestion[]): Promise<string[]> {
  try {
    // Use secure server-side API route
    const response = await fetch('/api/ai/shopping-list', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        pantryItems,
        mealSuggestions,
        userPreferences: undefined
      }),
    });

    if (response.ok) {
      const data = await response.json();
      return data.shoppingList || [];
    }
  } catch (error) {
    console.error('AI Shopping List Error:', error);
  }

  // Fallback: Rule-based system (current logic)
  const shoppingItems: string[] = [];

  mealSuggestions.forEach(meal => {
    if (meal.missingIngredients) {
      meal.missingIngredients.forEach(ingredient => {
        if (!shoppingItems.includes(ingredient)) {
          shoppingItems.push(ingredient);
        }
      });
    }
  });

  pantryItems.forEach(item => {
    if (item.quantity <= 1 && !shoppingItems.includes(item.name.toLowerCase())) {
      shoppingItems.push(item.name);
    }
  });

  const commonStaples = ['onions', 'garlic', 'olive oil', 'salt', 'pepper', 'rice', 'pasta'];
  commonStaples.forEach(staple => {
    const hasStaple = pantryItems.some(item => 
      item.name.toLowerCase().includes(staple)
    );
    if (!hasStaple && !shoppingItems.includes(staple)) {
      shoppingItems.push(staple);
    }
  });

  return shoppingItems.slice(0, 15);
}

export function analyzeFoodCategories(pantryItems: PantryItem[]): Record<string, number> {
  const categories: Record<string, number> = {
    'Dairy & Eggs': 0,
    'Meat & Protein': 0,
    'Fruits & Vegetables': 0,
    'Grains & Bread': 0,
    'Pantry Staples': 0,
    'Beverages': 0
  };

  pantryItems.forEach(item => {
    const name = item.name.toLowerCase();
    
    if (name.includes('milk') || name.includes('cheese') || name.includes('egg') || name.includes('yogurt')) {
      categories['Dairy & Eggs']++;
    } else if (name.includes('chicken') || name.includes('beef') || name.includes('fish') || name.includes('salmon')) {
      categories['Meat & Protein']++;
    } else if (name.includes('apple') || name.includes('banana') || name.includes('tomato') || name.includes('carrot') || name.includes('broccoli')) {
      categories['Fruits & Vegetables']++;
    } else if (name.includes('bread') || name.includes('rice') || name.includes('pasta')) {
      categories['Grains & Bread']++;
    } else if (name.includes('oil') || name.includes('salt') || name.includes('sugar') || name.includes('flour')) {
      categories['Pantry Staples']++;
    } else if (name.includes('coffee') || name.includes('tea') || name.includes('juice')) {
      categories['Beverages']++;
    } else {
      categories['Pantry Staples']++; // Default category
    }
  });

  return categories;
}

export function calculateHealthScore(pantryItems: PantryItem[]): number {
  let score = 0;
  const maxScore = 100;

  // Fresh produce bonus
  const freshItems = pantryItems.filter(item => {
    const name = item.name.toLowerCase();
    return name.includes('apple') || name.includes('banana') || name.includes('broccoli') || 
           name.includes('carrot') || name.includes('spinach') || name.includes('tomato');
  });
  score += Math.min(freshItems.length * 5, 25);

  // Protein variety bonus
  const proteinItems = pantryItems.filter(item => {
    const name = item.name.toLowerCase();
    return name.includes('chicken') || name.includes('fish') || name.includes('eggs') || 
           name.includes('cheese') || name.includes('yogurt');
  });
  score += Math.min(proteinItems.length * 4, 20);

  const grainItems = pantryItems.filter(item => {
    const name = item.name.toLowerCase();
    return name.includes('bread') || name.includes('rice') || name.includes('pasta') || 
           name.includes('oats') || name.includes('quinoa');
  });
  score += Math.min(grainItems.length * 3, 15);

  // Diversity bonus
  const uniqueCategories = Object.keys(analyzeFoodCategories(pantryItems)).filter(
    category => analyzeFoodCategories(pantryItems)[category] > 0
  ).length;
  score += Math.min(uniqueCategories * 8, 40);

  return Math.min(score, maxScore);
}
