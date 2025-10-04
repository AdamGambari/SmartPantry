import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY, // Server-side only
});

export async function POST(request: NextRequest) {
  try {
    const { pantryItems, mealSuggestions, userPreferences } = await request.json();

    if (!pantryItems || !Array.isArray(pantryItems)) {
      return NextResponse.json({ error: 'Invalid pantry items' }, { status: 400 });
    }

    const prompt = `
You are a smart pantry assistant. Based on the user's current pantry items and meal suggestions, generate a personalized shopping list.

Current Pantry Items: ${pantryItems.map((item: any) => `${item.name} (${item.quantity})`).join(', ')}
Meal Suggestions: ${mealSuggestions?.map((meal: any) => meal.name).join(', ') || 'None'}
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
    let shoppingList: string[] = [];

    if (response) {
      try {
        shoppingList = JSON.parse(response);
      } catch (parseError) {
        // Fallback: extract items from text response
        shoppingList = response.split('\n')
          .map(line => line.replace(/^[-•\s]+/, '').trim())
          .filter(item => item.length > 0)
          .slice(0, 15);
      }
    }

    return NextResponse.json({ shoppingList });
  } catch (error) {
    console.error('OpenAI API Error:', error);
    return NextResponse.json({ error: 'Failed to generate shopping list' }, { status: 500 });
  }
}
