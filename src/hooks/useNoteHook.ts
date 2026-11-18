import { useRouter } from "next/navigation";
import { useState } from "react";

export const useNoteHook = () => {
  const router = useRouter();
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState("");
  const [details, setDetails] = useState({ title: "", note: "" });

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
          content: note,
        }),
      });

      const data = await response.json();

      if (!response.ok) throw new Error(data.error || "Unable to analyse your note.");

      sessionStorage.setItem(
        "soars-resource-draft",
        JSON.stringify({
          type: "note",
          note: data.note,
          analysis: data.analysis,
          userTitle: data.userTitle,
        }),
      );

      router.push("/add-resource/preview");
    } catch (err) {
      console.error("Note analysis error:", err);

      setError(err instanceof Error ? err.message : "Something went wrong while analysing your note.");
    } finally {
      setIsGenerating(false);
    }
  };

  return { isGenerating, details, setDetails, error, setError, handleNoteSubmit };
}
