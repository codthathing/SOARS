"use client";
import AddResourceTypesButtons from "@/src/components/add-resource/AddResourceTypesButtons";
import { Button } from "@/src/components/ui/button";
import { LinkIcon, Plus } from "lucide-react";
import { ChangeEventHandler, useState } from "react";

export default function page() {
  const [details, setDetails] = useState({link: "", title: ""});
  const [error, setError] = useState("");

  const handleInputChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    const {name, value} = e.target;
    setDetails({...details, [name]:value});
  }

  const handleLinkSubmit = () => {
    const linkWithProtocol = /^https?:\/\//i.test(details.link) ? details.link : `https://${details.link}`;

    try {
      const url = new URL(linkWithProtocol);
      if (!url.hostname.includes(".")) throw new Error("Not a valid url!");

      console.log(url.href);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    }
  }

  return (
    <>
      <AddResourceTypesButtons />
      <div className="bg-soft-lavender/30 py-1 rounded-lg flex gap-x-4 items-center md:rounded-xl px-4 md:px-5">
        <LinkIcon className="text-charcoal-black/90 size-4 md:size-5" />
        <input type="url" name="link" onFocus={() => setError("")} onChange={handleInputChange} placeholder="Enter the url" className="w-full border-none outline-none text-sm text-charcoal-black md:text-xl py-3 md:py-4" />
      </div>
      <input type="text" name="title" onChange={handleInputChange} placeholder="Enter title (optional)" className="outline-none border-none rounded-lg md:rounded-xl bg-soft-lavender/30 p-4 md:p-5 w-2/5" />
      <Button onClick={(e) => details.link ? handleLinkSubmit() : e.preventDefault()} className={`w-full flex items-center gap-x-1 md:gap-x-2.5 capitalize ${details.link ? "bg-brownish-amber hover:bg-brownish-amber" : "bg-brownish-amber/50 hover:bg-brownish-amber/50"} cursor-pointer text-white text-base p-6 md:text-2xl md:px-3 md:py-8 lg:text-xl lg:px-5 lg:py-6.5`}><Plus className="size-4 md:size-5.5"/> <span>save link</span></Button>
      {error && <p className="text-red-500 text-base">{error}</p>}
    </>
  )
}