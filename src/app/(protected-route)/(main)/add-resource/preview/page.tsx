"use client";
import { Badge } from "@/src/components/ui/badge";
import { Button } from "@/src/components/ui/button";
import { Card, CardHeader, CardContent, CardTitle, CardDescription } from "@/src/components/ui/card";
import { Check, FolderIcon, Globe, LinkIcon, Plus, X } from "lucide-react";
import { useState } from "react";

const tags = [
  {id: 0, text: "dev"},
  {id: 1, text: "reading"},
  {id: 2, text: "Add tag"},
]

export default function page() {
  const [newTagDetails, setNewTagDetails] = useState({text: "", show: false});

  return (
    <div className="overflow-y-auto flex flex-col gap-y-4 md:gap-y-10 lg:gap-y-5">
      <div className="bg-soft-lavender/30 p-4 rounded-lg flex gap-x-4 items-center md:p-5 md:rounded-xl">
        <LinkIcon className="text-charcoal-black/90 size-4 md:size-5" />
        <span className="text-sm text-charcoal-black md:text-xl">https://css-tricks.com/complete-guide-flexbox</span>
      </div>
      <div className="flex flex-col gap-y-2.5 bg-white rounded-xl py-4 px-5">
        <p className="text-xs md:text-base first-letter:capitalize text-charcoal-black">auto-generated preview</p>
        <Card className={"flex flex-row items-center border-none shadow-none gap-x-3 lg:gap-x-4 p-0"}>
          <CardHeader className={"flex items-center justify-end p-0 w-12 h-fit"}>
            <div className={"w-12 h-12 rounded-xl flex items-center justify-center bg-soft-lavender"}><Globe size={16} className={"text-brownish-amber"} /></div>
          </CardHeader>
          <CardContent className={"flex flex-col flex-1 gap-y-1 px-0 lg:gap-y-3"}>
            <CardTitle className={"line-clamp-1 capitalize md:text-lg"}>a complete guide to flexbox</CardTitle>
            <CardDescription className={"flex items-center gap-x-1"}>
              <span className={"leading-none md:text-base lg:text-sm"}>css-tricks.com · Our comprehensive guide to CSS flexbox layout</span>
            </CardDescription>
          </CardContent>
        </Card>
      </div>
      <input type="text" className="outline-none bg-soft-lavender/30 text-charcoal-black p-4 md:p-5 rounded-lg md:rounded-xl text-sm md:text-xl" placeholder="Add a note (optional)" />
      <div className="flex flex-col gap-y-2.5">
        <h3 className="text-sm text-charcoal-black capitalize md:text-base">tags</h3>
        <div className={"flex flex-wrap gap-2"}>
          {tags.map(({ id, text }) => {
            if (text === "Add tag" && newTagDetails.show) return;

            return (
              <Badge key={id} onClick={(e) => text === "Add tag" ? setNewTagDetails((prev) => ({...prev, show: true})) : e.preventDefault()} className={`${text === "Add tag" ? "bg-transparent text-charcoal-black font-light border border-soft-lavender cursor-pointer" : "bg-brownish-amber/20 text-brownish-amber"} md:text-base px-2 md:px-3.5 lg:px-3 flex items-baseline gap-x-1.5`}>
                <span>{text === "Add tag" ? "+" : "#"}{text}</span> 
                {text !== "Add tag" && <X className="size-2 cursor-pointer" />}
              </Badge>
            )
          })}
          {newTagDetails.show && <div className="flex items-center gap-x-2 bg-transparent text-charcoal-black font-light rounded-lg md:rounded-xl border border-soft-lavender md:text-base px-2 md:px-3.5 lg:px-3">
            <input type="text" placeholder="New tag" value={newTagDetails.text} onChange={(e) => setNewTagDetails((prev) => ({...prev, text: e.target.value}))} className="bg-transparent border-none outline-none" />
            <X onClick={() => setNewTagDetails((prev) => ({...prev, show: false}))} className="size-2 cursor-pointer shrink-0" />
            <Plus className="size-2 cursor-pointer shrink-0" />
          </div>}
        </div>
      </div>
      <div className="flex flex-col gap-y-2.5">
        <h3 className="text-sm text-charcoal-black capitalize md:text-base">collection</h3>
        <div className="rounded-xl overflow-hidden flex flex-col w-1/4 relative">
          <X className="absolute top-2 right-2 size-4 cursor-pointer" />
          <div className="flex items-center justify-center py-7 md:py-8 lg:py-3 md:flex-1 bg-emerald-green"><FolderIcon className="size-8 md:size-10 lg:size-5 text-charcoal-black" /></div>
          <div className="p-2.5 md:p-2.5 flex flex-col bg-white">
            <h1 className="font-semibold capitalize text-base md:text-lg lg:text-xs text-charcoal-black">all resources</h1>
            <span className="text-charcoal-black text-sm md:text-base lg:text-[10px] font-light capitalize">already exists</span>
          </div>
        </div>
      </div>
      <Button className={"w-full flex items-center gap-x-1 md:gap-x-2.5 capitalize bg-brownish-amber/50 hover:bg-brownish-amber cursor-pointer text-white text-base p-6 md:text-2xl md:px-3 md:py-8 lg:text-xl lg:px-5 lg:py-6.5"}><Check className="size-4 md:size-5.5"/> <span>save resource</span></Button>
    </div>
  );
}
