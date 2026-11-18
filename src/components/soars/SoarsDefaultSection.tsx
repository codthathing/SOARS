import { Sparkles } from "lucide-react";
import { Dispatch, SetStateAction } from "react";

export default function SoarsDefaultSection({ chatLength, setPrompt }: {chatLength: number; setPrompt: Dispatch<SetStateAction<string>>}) {
  if (chatLength === 0) {
    return (
      <div className="flex flex-col items-center justify-center text-center flex-1 gap-y-3">
        <div className="rounded-2xl bg-soft-lavender/40 p-4">
          <Sparkles className="size-8 text-brownish-amber" />
        </div>

        <h2 className="text-lg md:text-2xl font-semibold text-charcoal-black">Your library, intelligently connected.</h2>

        <p className="text-sm md:text-base text-charcoal-black/60 max-w-md">Ask SOARS AI about anything you've saved. I'll search your links, PDFs, notes and collections to find what you need.</p>

        <div className="flex flex-wrap justify-center gap-2 mt-3">
          {["About development", "My saved tutorials", "Resources about design"].map((suggestion) => (
            <button key={suggestion} type="button" onClick={() => setPrompt(suggestion)} className="rounded-full border border-soft-lavender px-3 py-2 text-xs md:text-sm text-charcoal-black hover:bg-soft-lavender/30">
              {suggestion}
            </button>
          ))}
        </div>
      </div>
    )
  }
}