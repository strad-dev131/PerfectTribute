import OpenAI from "openai";

// the newest OpenAI model is "gpt-4o" which was released May 13, 2024. do not change this unless explicitly requested by the user
const openai = new OpenAI({ 
  apiKey: process.env.OPENAI_API_KEY || process.env.VITE_OPENAI_API_KEY || "default_key" 
});

export interface SayariRequest {
  mood: "happy" | "flirty" | "funny" | "motivational";
  context?: string;
}

export interface SayariResponse {
  sayari: string;
  mood: string;
}

export async function generateSayari(request: SayariRequest): Promise<SayariResponse> {
  const moodPrompts = {
    happy: "Generate a happy and joyful Hinglish sayari (2-4 lines) for Vivaan's birthday. Use a mix of Hindi and English words naturally. Make it celebratory and warm.",
    flirty: "Generate a playful and charming Hinglish sayari (2-4 lines) about Vivaan's charismatic personality. Use a mix of Hindi and English words naturally. Keep it fun and light-hearted.",
    funny: "Generate a humorous and entertaining Hinglish sayari (2-4 lines) about Vivaan's fun-loving nature. Use a mix of Hindi and English words naturally. Make it witty and amusing.",
    motivational: "Generate an inspiring and motivational Hinglish sayari (2-4 lines) about Vivaan's leadership qualities. Use a mix of Hindi and English words naturally. Make it uplifting and encouraging."
  };

  const systemPrompt = `You are a creative Hinglish poetry generator specializing in sayaris (short poems) for birthday celebrations. 
  
  Key guidelines:
  - Mix Hindi and English words naturally in the same sentence
  - Keep sayaris short (2-4 lines maximum)
  - Make them personal and heartfelt for someone named Vivaan
  - Use common Hinglish expressions and words
  - Include birthday-themed elements
  - Ensure proper rhythm and flow
  - Reference Vivaan's groups: "The Global Hub", "The Gossip Edge", "TeamX"
  - Highlight his qualities: leadership, sayari skills, group management, charm
  
  Respond with JSON in this exact format: { "sayari": "your generated sayari here", "mood": "${request.mood}" }`;

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "system",
          content: systemPrompt,
        },
        {
          role: "user",
          content: moodPrompts[request.mood],
        },
      ],
      response_format: { type: "json_object" },
      max_tokens: 200,
      temperature: 0.8,
    });

    const result = JSON.parse(response.choices[0].message.content || "{}");
    
    return {
      sayari: result.sayari || "Vivaan bhai, aap toh sabse pyaare ho! Happy Birthday! 🎉",
      mood: request.mood,
    };
  } catch (error) {
    console.error("Failed to generate sayari:", error);
    
    // Fallback sayaris for each mood
    const fallbackSayaris = {
      happy: "Khushi se bhari hai teri har subah,\nHappy Birthday Vivaan Bhai! 🎉",
      flirty: "Tere style mein hai kaisi baat,\nDil churane wala jaadoo! 😉",
      funny: "Group mein aata hai toh comedy central ban jaata hai,\nHappy Birthday funny wale! 😂",
      motivational: "Leader banne ka talent, Vivaan bhai mein hai natural,\nHappy Birthday champion! 💪"
    };
    
    return {
      sayari: fallbackSayaris[request.mood],
      mood: request.mood,
    };
  }
}
