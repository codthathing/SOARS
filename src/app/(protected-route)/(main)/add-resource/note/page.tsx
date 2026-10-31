
"use client";

import AddResourceTypesButtons from "@/src/components/add-resource/AddResourceTypesButtons";
import { Button } from "@/src/components/ui/button";
import { Plus } from "lucide-react";
import { ChangeEventHandler, useState } from "react";
import { useRouter } from "next/navigation";

export default function Page() {
  const router = useRouter();

  const [details, setDetails] = useState({
    title: "",
    note: "",
  });

  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState("");

  const handleInputDetails: ChangeEventHandler<
    HTMLInputElement | HTMLTextAreaElement
  > = (e) => {
    const { name, value } = e.target;

    setDetails((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const handleNoteSubmit = async () => {
    const note = details.note.trim();

    if (!note || isGenerating) return;

    setIsGenerating(true);
    setError("");

    try {
      const response = await fetch("/api/notes/preview", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: details.title,
          note,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Unable to analyse your note.");
      }

      sessionStorage.setItem(
        "soars-resource-draft",
        JSON.stringify({
          type: "note",
          note: {
            text: data.note,
          },
          analysis: data.analysis,
          collections: data.collections,
          userTitle: data.userTitle,
        })
      );

      router.push("/add-resource/preview");
    } catch (err) {
      console.error("Note analysis error:", err);

      setError(
        err instanceof Error
          ? err.message
          : "Something went wrong while analysing your note."
      );
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <>
      <AddResourceTypesButtons />

      <input
        type="text"
        name="title"
        value={details.title}
        onChange={handleInputDetails}
        placeholder="Enter title (optional)"
        className="outline-none border-none rounded-lg md:rounded-xl bg-soft-lavender/30 p-4 md:p-5 w-3/5"
      />

      <textarea
        name="note"
        value={details.note}
        onChange={handleInputDetails}
        onChangeCapture={() => setError("")}
        placeholder="Enter note details"
        className="border-none outline-none rounded-lg md:rounded-xl bg-soft-lavender/30 p-4 md:p-5"
        required
      />

      {error && (
        <p className="text-sm text-red-500" role="alert">
          {error}
        </p>
      )}

      <Button
        type="button"
        onClick={handleNoteSubmit}
        disabled={!details.note.trim() || isGenerating}
        className={`w-full flex items-center gap-x-1 md:gap-x-2.5 capitalize ${
          details.note.trim() && !isGenerating
            ? "bg-brownish-amber hover:bg-brownish-amber"
            : "bg-brownish-amber/50 hover:bg-brownish-amber/50"
        } cursor-pointer text-white text-base p-6 md:text-2xl md:px-3 md:py-8 lg:text-xl lg:px-5 lg:py-6.5 disabled:opacity-50`}
      >
        <Plus className="size-4 md:size-5.5" />
        <span>
          {isGenerating ? "generating preview..." : "generate preview"}
        </span>
      </Button>
    </>
  );
}
