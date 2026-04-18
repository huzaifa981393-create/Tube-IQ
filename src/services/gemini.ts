import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export async function getAICoachResponse(message: string, context: any) {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Context: ${JSON.stringify(context)}\nUser: ${message}`,
      config: {
        systemInstruction: "You are a world-class YouTube growth coach named TubeIQ AI. You help creators grow their channels by providing data-driven strategies. Be encouraging, precise, and use creator-slang (CTR, retention, metadata).",
      },
    });
    return response.text;
  } catch (error) {
    console.error("Gemini Error:", error);
    return "I'm having trouble connecting to my brain right now. Please try again later!";
  }
}

export async function generateDailyIdeas(channelNiche: string) {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Generate 3 viral video ideas for a YouTube channel in the ${channelNiche} niche.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: "array",
          items: {
            type: "object",
            properties: {
              title: { type: "string" },
              description: { type: "string" },
              reason: { type: "string" },
              potential: { type: "string" },
              keywords: { type: "array", items: { type: "string" } }
            },
            required: ["title", "description", "reason", "potential", "keywords"]
          }
        }
      }
    });
    return JSON.parse(response.text || "[]");
  } catch (error) {
    console.error("Gemini Error:", error);
    return [];
  }
}
