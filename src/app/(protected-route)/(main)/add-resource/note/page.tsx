"use client";
import AddResourceTypesButtons from "@/src/components/add-resource/AddResourceTypesButtons";
import { Button } from "@/src/components/ui/button";
import { Plus } from "lucide-react";
import { ChangeEventHandler } from "react";
import { useNoteHook } from "@/src/hooks/useNoteHook";

export default function Page() {
  const { isGenerating, details, setDetails, error, setError, handleNoteSubmit } = useNoteHook();

  const handleInputDetails: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement> = (e) => {
    const { name, value } = e.target;

    setDetails((previous) => ({...previous, [name]: value}));
  };


  return (
    <>
      <AddResourceTypesButtons />

      <input type="text" name="title" value={details.title} onChange={handleInputDetails} placeholder="Enter title (optional)" className="outline-none border-none rounded-lg md:rounded-xl bg-soft-lavender/30 p-4 md:p-5 w-3/5" />

      <textarea name="note" value={details.note} onChange={handleInputDetails} onChangeCapture={() => setError("")} placeholder="Enter note details" className="border-none outline-none rounded-lg md:rounded-xl bg-soft-lavender/30 p-4 md:p-5" required />

      {error && (<p className="text-sm text-red-500" role="alert">{error}</p>)}

      <Button type="button" onClick={handleNoteSubmit} disabled={!details.note.trim() || isGenerating} className={`w-full flex items-center gap-x-1 md:gap-x-2.5 capitalize ${details.note.trim() && !isGenerating ? "bg-brownish-amber hover:bg-brownish-amber" : "bg-brownish-amber/50 hover:bg-brownish-amber/50"} cursor-pointer text-white text-base p-6 md:text-2xl md:px-3 md:py-8 lg:text-xl lg:px-5 lg:py-6.5 disabled:opacity-50`}>
        <Plus className="size-4 md:size-5.5" />
        <span>{isGenerating ? "generating preview..." : "generate preview"}</span>
      </Button>
    </>
  );
}
