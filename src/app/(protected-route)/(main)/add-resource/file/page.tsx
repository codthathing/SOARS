"use client";
import AddResourceTypesButtons from "@/src/components/add-resource/AddResourceTypesButtons";
import { Button } from "@/src/components/ui/button";
import { File } from "lucide-react";
import { ChangeEventHandler, useRef, useState } from "react";


const formatFileSize = (bytes: number) => {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
};

export default function page() {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [details, setDetails] = useState({error: "", title: "upload a PDF file to save", size: "max file size: 12 MB"});
  const [title, setTitle] = useState("");

  const handleFileChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    const selected = e.target.files?.[0];
    if (!selected) return;

    if (selected.type !== "application/pdf") {
      setDetails(prev => ({ ...prev, error: "Only PDF files are allowed" }));

      return;
    }

    const MAX_SIZE = 5 * 1024 * 1024;

    if (selected.size > MAX_SIZE) {
      setDetails(prev => ({ ...prev, error: "File must be 5MB or smaller" }));

      return;
    }

    setDetails({error: "", title: selected.name, size: `file size: ${formatFileSize(selected.size)}`})
    
    console.log(selected);
  }

  return (
    <>
      <AddResourceTypesButtons />
      <div className="border-3 border-dashed border-brownish-amber/20 bg-soft-lavender/30 self-center rounded-lg md:rounded-xl mt-15 p-5 flex flex-col gap-y-5 lg:w-2/5 items-center justify-center">
        <File fill="currentColor" className="size-3 text-brownish-amber lg:size-6" />
        <div className="flex flex-col gap-y-0.5 items-center">
          <input type="file" accept="application/pdf,.pdf" ref={fileInputRef} onChange={handleFileChange} hidden />
          <h1 className="text-sm font-bold first-letter:uppercase text-charcoal-black">{details.title}</h1>
          <p className="first-letter:uppercase text-charcoal-black text-xs">{details.size}</p>
        </div>
        <Button onClick={() => fileInputRef.current?.click()} className="bg-brownish-amber/50 text-white capitalize text-sm cursor-pointer hover:bg-brownish-amber/50">upload file</Button>
      </div>
      <input type="text" name="title" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Enter title (optional)" className="outline-none border-none rounded-lg md:rounded-xl bg-soft-lavender/30 p-4 md:p-5 w-4/5 mt-6" />
      {details.error && <p className="text-red-500 text-base">{details.error}</p>}
    </>
  )
}