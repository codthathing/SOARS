import { Send } from "lucide-react";
import { Button } from "../ui/button";
import { PromptField } from "@/src/lib/types";

export default function SoarsPromptField({ setPrompt, prompt, loading, handleSubmit }: PromptField) {
  return (
    <form onSubmit={handleSubmit} className="bg-white w-full rounded-2xl p-3 md:p-4 flex items-center gap-x-3 border border-soft-lavender/50">
      <input type="text" value={prompt} onChange={(e) => setPrompt(e.target.value)} placeholder="Ask anything about your library..." disabled={loading} className="bg-soft-lavender/20 border border-charcoal-black/20 rounded-lg p-3 w-full outline-none text-sm md:text-base disabled:opacity-60" />

      <Button type="submit" disabled={!prompt.trim() || loading} className="bg-brownish-amber hover:bg-brownish-amber text-white text-sm capitalize shrink-0 disabled:opacity-50">
        <Send className="size-4" />
        <span className="hidden md:inline">Send</span>
      </Button>
    </form>
  )
}