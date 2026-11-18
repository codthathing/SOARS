import "server-only";
import { AIProvider } from "../types";

interface OllamaResponse {
  model: string;
  message: {
    role: string;
    content: string;
  };
  done: boolean;
}

export class OllamaProvider implements AIProvider {
  private OLLAMA_URL = process.env.OLLAMA_BASE_URL!;
  private MODEL = process.env.OLLAMA_MODEL!;

  async generateText(prompt: string): Promise<string> {
    const response = await fetch(`${this.OLLAMA_URL}/api/chat`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: this.MODEL,
        messages: [{ role: "user", content: prompt }],
        stream: false,
      }),
      signal: AbortSignal.timeout(120000),
    });

    if (!response.ok) throw new Error(`Ollama request failed: ${response.status}`);

    const result = (await response.json()) as OllamaResponse;

    if (!result.message?.content) throw new Error("Gemma returned an empty response");

    return result.message.content;
  }


  async generateJSON<T>(prompt: string): Promise<T> {
    const response = await fetch(`${this.OLLAMA_URL}/api/chat`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: this.MODEL,
        messages: [{ role: "user", content: prompt }],
        format: "json",
        stream: false,
      }),
      signal: AbortSignal.timeout(120000),
    });

    if (!response.ok) throw new Error(`Ollama request failed: ${response.status}`);

    const result = (await response.json()) as OllamaResponse;

    if (!result.message?.content) throw new Error("Gemma returned an empty response");

    try {
      return JSON.parse(result.message.content) as T;
    } catch {
      throw new Error("Gemma returned invalid JSON");
    }
  }
}
