"use client";
import HomeHeader from "@/src/components/home/HomeHeader";
import { Button } from "@/src/components/ui/button";
import { Plus } from "lucide-react";
import { useState } from "react";

export default function page() {
  const [collection, setCollection] = useState("");

  return (
    <>
      <HomeHeader topic="new collection" showAvatar={false} showArrowLeft={true} />
      <section className={"flex flex-col px-6 py-4 gap-y-4 h-full overflow-y-auto md:p-7 md:gap-y-10 lg:gap-y-5"}>
        <input type="text" placeholder="Enter collection name" value={collection} onChange={(e) => setCollection(e.target.value)} className="outline-none border-none rounded-lg md:rounded-xl bg-soft-lavender/30 p-4 md:p-5 w-3/5" />
        <Button className={`w-full flex items-center gap-x-1 md:gap-x-2.5 capitalize ${collection ? "bg-brownish-amber hover:bg-brownish-amber" : "bg-brownish-amber/50 hover:bg-brownish-amber/50"} cursor-pointer text-white text-base p-6 md:text-2xl md:px-3 md:py-8 lg:text-xl lg:px-5 lg:py-6.5`}><Plus className="size-4 md:size-5.5"/> <span>create collection</span></Button>
      </section>
    </>
  )
}