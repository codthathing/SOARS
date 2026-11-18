"use client";
import { selectAllCollections, selectAllResources, useAppSelector } from "@/src/store/store";
import { FolderIcon } from "lucide-react";
import Link from "next/link";
import { ReactNode } from "react";

const collectionColors = ["bg-emerald-green", "bg-pink-500", "bg-soft-lavender", "bg-brownish-amber"];

export default function CollectionsSection({ children }: { children: ReactNode }) {
  const collections = useAppSelector(selectAllCollections);
  const resources = useAppSelector(selectAllResources);

  return (
    <>
      <div className="flex justify-between">
        <span className="text-sm font-light text-charcoal-black">{collections.length} collections</span>
      </div>

      <div className="grid gap-y-2.5 md:grid-cols-2 md:gap-4 lg:grid-cols-3">
        {children}

        {collections.map((collection, index) => {
          const count = resources.filter((resource) => resource.collection_id === collection.id).length;

          return (
            <Link key={collection.id} href={`/collections/${collection.id}`} className="flex shrink-0 flex-col overflow-hidden rounded-xl">
              <div className={`flex items-center justify-center py-7 md:flex-1 md:py-8 lg:py-6 ${collectionColors[index % collectionColors.length]}`}>
                <FolderIcon className="size-8 text-charcoal-black md:size-10 lg:size-8" />
              </div>

              <div className="flex flex-col bg-white p-2.5 md:p-3">
                <h1 className="line-clamp-1 text-base font-semibold capitalize text-charcoal-black md:text-lg lg:text-base">{collection.title}</h1>
                <span className="text-sm font-light text-charcoal-black md:text-base lg:text-sm">
                  {count} {count === 1 ? "item" : "items"}
                </span>
              </div>
            </Link>
          );
        })}
      </div>

      {collections.length === 0 && <p className="text-sm text-charcoal-black">You haven't created any collections yet.</p>}
    </>
  )
}