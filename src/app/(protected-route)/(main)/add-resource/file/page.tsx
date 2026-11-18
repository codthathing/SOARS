"use client";
import AddResourceTypesButtons from "@/src/components/add-resource/AddResourceTypesButtons";
import { Button } from "@/src/components/ui/button";
import { useFileHook } from "@/src/hooks/useFileHook";
import { File } from "lucide-react";
import { useRef } from "react";

export default function page() {
  const { details, setDetails, handleFileChange, handleFileUpload } = useFileHook();
  const fileInputRef = useRef<HTMLInputElement>(null);

  return (
    <>
      <AddResourceTypesButtons />
      <div className="border-3 border-dashed border-brownish-amber/20 bg-soft-lavender/30 self-center rounded-lg md:rounded-xl mt-15 p-5 flex flex-col gap-y-5 lg:w-2/5 items-center justify-center">
        <File fill="currentColor" className="size-3 text-brownish-amber lg:size-6" />
        <div className="flex flex-col gap-y-0.5 items-center">
          <input type="file" accept="application/pdf,.pdf" ref={fileInputRef} onChange={handleFileChange} hidden />
          <h1 className="text-sm font-bold first-letter:uppercase text-charcoal-black">{details.original_filename}</h1>
          <p className="first-letter:uppercase text-charcoal-black text-xs">{details.size_bytes}</p>
        </div>
        <Button onClick={() => details.file ? handleFileUpload() : fileInputRef.current?.click()} disabled={details.loading} className="bg-brownish-amber text-white capitalize text-sm cursor-pointer hover:bg-brownish-amber">{details.file ? "upload file" : "select file"}</Button>
      </div>
      <input type="text" name="title" value={details.title} onChange={(e) => setDetails((prev) => ({...prev, title: e.target.value}))} placeholder="Enter title (optional)" className="outline-none border-none rounded-lg md:rounded-xl bg-soft-lavender/30 p-4 md:p-5 w-4/5 mt-6" />
      {details.error && <p className="text-red-500 text-base">{details.error}</p>}
    </>
  );
}
