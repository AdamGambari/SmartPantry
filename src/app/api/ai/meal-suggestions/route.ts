import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY, // Server-side only
});

export async function POST(request: NextRequest) {
  try {
    const { pantryItems, dietaryRestrictions } = await request.json();

    if (!pantryItems || !Array.isArray(pantryItems)) {
      return NextResponse.json({ error: 'Invalid pantry items' }, { status: 400 });
    }

    const prompt = `
You are a culinary expert. Based on the user's pantry items, suggest 3 creative meal ideas.

Available Ingredients: ${pantryItems.map((item: any) => item.name).join(', ')}
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
    let mealSuggestions: any[] = [];

    if (response) {
      try {
        mealSuggestions = JSON.parse(response);
      } catch (parseError) {
        console.error('Failed to parse meal suggestions:', parseError);
      }
    }

    return NextResponse.json({ mealSuggestions });
  } catch (error) {
    console.error('OpenAI API Error:', error);
    return NextResponse.json({ error: 'Failed to generate meal suggestions' }, { status: 500 });
  }
}
