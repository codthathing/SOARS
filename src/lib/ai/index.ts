import "server-only";
import { GeminiProvider } from "./providers/gemini.provider";
import { OllamaProvider } from "./providers/ollama.provider";
import { AIProvider } from "./types";

function createAIProvider(): AIProvider {
  const provider = process.env.AI_PROVIDER;

  switch (provider) {
    case "ollama":
      return new OllamaProvider();
    case "gemini":
      return new GeminiProvider();
    default:
      throw new Error(`Unsupported AI provider: ${provider}`);
  }
}

export const ai = createAIProvider();