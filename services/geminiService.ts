
import { GoogleGenAI, GenerateContentResponse } from "@google/genai";

// Fixed: Initialize the Gemini client using the mandatory environment variable directly
const getAIClient = () => {
  return new GoogleGenAI({ apiKey: process.env.API_KEY });
};

// Fixed: Updated to correctly pass history to the chat session
export const chatWithPatrickAI = async (message: string, history: { role: 'user' | 'model', parts: { text: string }[] }[]) => {
  const ai = getAIClient();
  const chat = ai.chats.create({
    model: 'gemini-3-pro-preview',
    // Maintaining context by passing existing conversation history
    history: history,
    config: {
      systemInstruction: `You are the AI version of Patrick McHeyser, a Fractional Community Operations specialist who focuses on "warming up" cold communities and masterminds.
      Your background: 7 years as a NOLS Wilderness Instructor (leading expeditions for Fortune 500 and Special Forces) and 5 years as a Software Engineer.
      Your philosophy: Community isn't content; it's connection. Vulnerability is a skill, not an accident.
      You help leaders move away from being the "hub" and instead build self-sustaining networks.
      Tone: Observant, adventurous, human-centric, and professional. 
      Pricing: Typically $2,500 - $5,000/month for 3-6 month engagements.
      If users ask for deep strategy, suggest they fill out the application on the 'Work With Me' page.`,
    },
  });

  const result = await chat.sendMessage({ message });
  return result.text;
};

export const getConnectionInsights = async (topic: string) => {
  const ai = getAIClient();
  const prompt = `Provide 3 unique, high-impact community facilitation rituals or "connection prompts" specifically for a community focused on: ${topic}. 
  Focus on creating psychological safety and depth, not just shallow engagement. 
  Include a brief explanation of why these work based on group psychology. 
  Format as a clean, professional list with clear headings.`;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
      config: {
        tools: [{ googleSearch: {} }],
      },
    });

    // Fixed: Extracting website URLs from grounding chunks as required for Google Search grounding compliance
    const grounding = response.candidates?.[0]?.groundingMetadata?.groundingChunks;
    return {
      text: response.text,
      sources: grounding?.map((chunk: any) => chunk.web?.uri).filter(Boolean) || [],
    };
  } catch (error) {
    console.error("Error fetching insights:", error);
    return { text: "Unable to fetch live facilitation insights at this moment.", sources: [] };
  }
};
