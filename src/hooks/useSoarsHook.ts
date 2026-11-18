import { useState, FormEvent } from "react";
import { ChatMessage } from "../lib/types";

export const useSoarsHook = () => {
  const [prompt, setPrompt] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const userPrompt = prompt.trim();

    if (!userPrompt || loading) return;

    setPrompt("");
    setError("");

    setMessages((previous) => [...previous, { role: "user", content: userPrompt } ]);

    setLoading(true);

    try {
      const response = await fetch("/api/soars-ai", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt: userPrompt }),
      });

      const data = await response.json();

      if (!response.ok) throw new Error(data.error || "SOARS AI could not respond.");

      setMessages((previous) => [...previous, { role: "assistant", content: data.answer, resources: data.resources || [] } ]);
    } catch (err) {
      console.error("SOARS AI chat error:", err);

      setError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return { handleSubmit, prompt, setPrompt, messages, error, loading };
}
