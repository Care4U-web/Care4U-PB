
import { GoogleGenAI, Chat, GenerateContentResponse } from "@google/genai";

const SYSTEM_INSTRUCTION = `
You are the "Care4U AI Assistant", a virtual extension of the University Medical Center.
Your goal is to provide supportive, professional, and clear health guidance to students who are feeling unwell, primarily with common colds and flu.

Guidelines:
1. Always maintain a calm, trustworthy, and caring tone (consistent with Teal Green/White visual identity).
2. Help students recognize symptoms of cold vs. flu.
3. Provide evidence-based self-care advice (hydration, rest, simple nutrition).
4. CRITICAL: If a student mentions severe symptoms (high fever over 103F, chest pain, confusion, persistent vomiting, difficulty breathing), immediately advise them to contact university emergency services or go to the nearest ER.
5. Remind users that you are an AI assistant and they should consult university medical staff for formal diagnoses.
6. Keep responses concise and easy to read.
`;

export class GeminiService {
  private ai: GoogleGenAI;
  private chatSession: Chat;

  constructor() {
    this.ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    this.chatSession = this.ai.chats.create({
      model: 'gemini-3-flash-preview',
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        temperature: 0.7,
      },
    });
  }

  async sendMessage(message: string): Promise<string> {
    try {
      const result = await this.chatSession.sendMessage({ message });
      return result.text || "I'm sorry, I couldn't process that request.";
    } catch (error) {
      console.error("Gemini Error:", error);
      return "I'm having trouble connecting right now. Please try again or visit the medical center directly.";
    }
  }
}

export const geminiService = new GeminiService();
