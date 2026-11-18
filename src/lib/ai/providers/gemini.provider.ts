import "server-only";
import { GoogleGenAI } from "@google/genai";
import { AIProvider } from "../types";

export class GeminiProvider implements AIProvider {
  private client: GoogleGenAI;
  private model: string;

  constructor() {
    const apiKey = process.env.GEMINI_API_KEY;
    const model = process.env.GEMINI_MODEL;

    if (!apiKey) throw new Error("GEMINI_API_KEY is missing from environment variables.");

    if (!model) throw new Error("GEMINI_MODEL is missing from environment variables.");

    this.client = new GoogleGenAI({ apiKey });
    this.model = model;
  }

  async generateText(prompt: string): Promise<string> {
    const response = await this.client.models.generateContent({
      model: this.model,
      contents: prompt,
    });

    if (!response.text) throw new Error("Gemini returned an empty response.");

    return response.text;
  }

  async generateJSON<T>(prompt: string): Promise<T> {
    const response = await this.client.models.generateContent({
      model: this.model,
      contents: prompt,
      config: {
        responseMimeType: "application/json",
      },
    });

    if (!response.text) throw new Error("Gemini returned an empty JSON response.");

    try {
      return JSON.parse(response.text) as T;
    } catch {
      throw new Error("Gemini returned invalid JSON.");
    }
  }
}
