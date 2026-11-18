"use client";
import HomeHeader from "@/src/components/home/HomeHeader";
import { Button } from "@/src/components/ui/button";
import { Plus } from "lucide-react";
import { useCreateCollection } from "@/src/hooks/useCreateCollection";

export default function NewCollectionPage() {
  const { collection, setCollection, loading, error, handleCreate } = useCreateCollection();

  return (
    <>
      <HomeHeader topic="new collection" showAvatar={false} showArrowLeft={true} />

      <section className="flex h-full flex-col gap-y-4 overflow-y-auto px-6 py-4 md:gap-y-10 md:p-7 lg:gap-y-5">
        <input type="text" placeholder="Enter collection name" value={collection} onChange={(e) => setCollection(e.target.value)} className="w-3/5 rounded-lg border-none bg-soft-lavender/30 p-4 outline-none md:rounded-xl md:p-5" onKeyDown={(e) => (e.key === "Enter") && handleCreate() }/>

        {error && <p className="text-sm text-red-600">{error}</p>}

        <Button onClick={handleCreate} disabled={!collection.trim() || loading} className={`flex w-full cursor-pointer items-center gap-x-1 p-6 text-base capitalize text-white md:gap-x-2.5 md:px-3 md:py-8 md:text-2xl lg:px-5 lg:py-6.5 lg:text-xl ${collection.trim() && !loading ? "bg-brownish-amber hover:bg-brownish-amber" : "bg-brownish-amber/50 hover:bg-brownish-amber/50"}`}>
          <Plus className="size-4 md:size-5.5" />
          <span>{loading ? "Creating..." : "Create collection"}</span>
        </Button>
      </section>
    </>
  );
}
