"use client";
import AddResourceTypesButtons from "@/src/components/add-resource/AddResourceTypesButtons";
import { Button } from "@/src/components/ui/button";
import { Plus } from "lucide-react";
import { ChangeEventHandler, useState } from "react";

export default function page() {
  const [details, setDetails] = useState({title: "", note: ""});

  const handleInputDetails: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement> = (e) => {
    const {name, value} = e.target;
    setDetails({...details, [name]: value});
  }

  const handleNoteSubmit = () => {
    console.log(details.note);
  }

  return (
    <>
      <AddResourceTypesButtons />
      <input type="text" name="title" onChange={handleInputDetails} placeholder="Enter title (optional)" className="outline-none border-none rounded-lg md:rounded-xl bg-soft-lavender/30 p-4 md:p-5 w-3/5" />
      <textarea name="note" onChange={handleInputDetails} placeholder="Enter note details" className="border-none outline-none rounded-lg md:rounded-xl bg-soft-lavender/30 p-4 md:p-5" required />
      <Button onClick={(e) => details.note ? handleNoteSubmit() : e.preventDefault()} className={`w-full flex items-center gap-x-1 md:gap-x-2.5 capitalize ${details.note ? "bg-brownish-amber hover:bg-brownish-amber" : "bg-brownish-amber/50 hover:bg-brownish-amber/50"} cursor-pointer text-white text-base p-6 md:text-2xl md:px-3 md:py-8 lg:text-xl lg:px-5 lg:py-6.5`}><Plus className="size-4 md:size-5.5"/> <span>save note</span></Button>
    </>
  )
}