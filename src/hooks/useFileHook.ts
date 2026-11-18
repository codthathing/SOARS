import { useRouter } from "next/navigation";
import { useState, ChangeEventHandler } from "react";
import { FileDetails } from "../lib/types";
import { formatFileSize } from "../utils/formatFileSize";

export const useFileHook = () => {
  const router = useRouter();
  const [details, setDetails] = useState<FileDetails>({ error: "", loading: false, original_filename: "upload a PDF file to save", size_bytes: "max file size: 5MB", file: undefined, title: "" });

  const handleFileUpload = async () => {
    if (!details.file) return;

    setDetails((prev) => ({...prev, loading: true, original_filename: "Processing PDF..." }));

    try {
      const formData = new FormData();
      formData.append("file", details.file);
      formData.append("title", details.title.trim());

      const response = await fetch("/api/files/preview", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (!response.ok)  throw new Error(data.error || "Unable to upload PDF.");

      sessionStorage.setItem(
        "soars-resource-draft",
        JSON.stringify({
          type: "file",
          file: data.file,
          analysis: data.analysis,
          userTitle: data.userTitle,
        }),
      );

      router.push("/add-resource/preview");
      setDetails({ error: "", loading: false, original_filename: "upload a PDF file to save", size_bytes: "max file size: 5MB", file: undefined, title: "" });
    } catch (error) {
      setDetails((prev) => ({ ...prev, error: error instanceof Error ? error.message : "Unable to upload PDF." }));
    }
  }


  const handleFileChange: ChangeEventHandler<HTMLInputElement> = async (e) => {
    const selected = e.target.files?.[0];

    if (!selected) return;

    if (selected.type !== "application/pdf") {
      setDetails((prev) => ({ ...prev, error: "Only PDF files are allowed" }));
      return;
    }

    if (selected.size > 5 * 1024 * 1024) {
      setDetails((prev) => ({ ...prev, error: "File must be 5MB or smaller" }));
      return;
    }

    setDetails((prev) => ({ ...prev, error: "", original_filename: selected.name, size_bytes: `file size: ${formatFileSize(selected.size)}`, file: selected }));
  };

  return { details, setDetails, handleFileChange, handleFileUpload };
}
