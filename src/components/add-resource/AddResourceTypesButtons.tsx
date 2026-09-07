"use client";
import { LinkIcon, File, NotepadText, LucideProps } from "lucide-react";
import { Button } from "../ui/button";
import { ForwardRefExoticComponent, RefAttributes, useState } from "react";

const resourceTypes: {id: number; text: "link" | "file" | "note"; Icon: ForwardRefExoticComponent<Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>>}[] = [
  {id: 0, text: "link", Icon: LinkIcon},
  {id: 1, text: "file", Icon: File},
  {id: 2, text: "note", Icon: NotepadText},
]

export default function AddResourceTypesButtons() {
  const [resourceType, setResourceType] = useState<"link" | "file" | "note">("link");

  return (
    <div className="flex justify-between gap-x-2 md:gap-x-3">{resourceTypes.map(({id, text, Icon}) => <Button key={id} onClick={() => setResourceType(text)} className={`capitalize ${text === resourceType ? "bg-brownish-amber text-white" : "bg-soft-lavender/30 text-charcoal-black"} flex-1 md:text-xl md:rounded-xl md:py-6 md:px-6 lg:text-base lg:px-5`}><Icon className="size-3 md:size-4.5" /><span>{text}</span></Button>)}</div>
  )
}