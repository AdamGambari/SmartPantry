import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
});

export async function generateAIShoppingList(
  pantryItems: Array<{ name: string; quantity: number; expires?: string }>,
  mealSuggestions: Array<{ name: string; ingredients: string[] }>,
  userPreferences?: string
): Promise<string[]> {
  try {
    const prompt = `
You are a smart pantry assistant. Based on the user's current pantry items and meal suggestions, generate a personalized shopping list.

Current Pantry Items: ${pantryItems.map(item => `${item.name} (${item.quantity})`).join(', ')}
Meal Suggestions: ${mealSuggestions.map(meal => meal.name).join(', ')}
User Preferences: ${userPreferences || 'No specific preferences'}

Please generate a shopping list that includes:
1. Missing ingredients for suggested meals
2. Common kitchen staples that might be missing
3. Items that are running low (quantity ≤ 1)
4. Seasonal or healthy additions

Return ONLY a JSON array of shopping list items, like: ["onions", "garlic", "olive oil", "fresh spinach"]
    `;

    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.7,
      max_tokens: 500,
    });

    const response = completion.choices[0]?.message?.content;
    if (response) {
      return JSON.parse(response);
    }
    
    return [];
  } catch (error) {
    console.error('OpenAI API Error:', error);
    return [];
  }
}

export async function generateAIMealSuggestions(
  pantryItems: Array<{ name: string; quantity: number; expires?: string }>,
  dietaryRestrictions?: string[]
): Promise<Array<{
  name: string;
  description: string;
  ingredients: string[];
  difficulty: string;
  cookTime: string;
}>> {
  try {
    const prompt = `
You are a culinary expert. Based on the user's pantry items, suggest 3 creative meal ideas.

Available Ingredients: ${pantryItems.map(item => item.name).join(', ')}
Dietary Restrictions: ${dietaryRestrictions?.join(', ') || 'None'}

For each meal, provide:
- Creative name
- Brief description
- Required ingredients (mark missing ones)
- Difficulty level (Easy/Medium/Hard)
- Cook time

Return as JSON array with this structure:
[
  {
    "name": "Meal Name",
    "description": "Brief description",
    "ingredients": ["ingredient1", "ingredient2"],
    "difficulty": "Easy",
    "cookTime": "15 min"
  }
]
    `;

    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.8,
      max_tokens: 800,
    });

    const response = completion.choices[0]?.message?.content;
    if (response) {
      return JSON.parse(response);
    }
    
    return [];
  } catch (error) {
    console.error('OpenAI API Error:', error);
    return [];
  }
}
