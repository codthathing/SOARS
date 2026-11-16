"use client";
import Link from "next/link";
import { FolderIcon } from "lucide-react";
import ResourceCard from "../common/ResourceCard";
import type { Collection, UserResource } from "@/src/lib/db/types";

interface SearchSavesProps {
  resources: UserResource[];
  collections: Collection[];
  filter: string;
}

export default function SearchSaves({ resources, collections, filter }: SearchSavesProps) {
  if (filter === "collections") {
    if (collections.length === 0) {
      return <p className="text-sm text-charcoal-black">No matching collections found.</p>;
    }

    return (
      <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
        {collections.map((collection) => (
          <Link key={collection.id} href={`/collections/${collection.id}`} className="flex items-center gap-x-3 rounded-xl border border-soft-lavender bg-white p-4 hover:bg-soft-lavender/20">
            <div className="flex size-11 items-center justify-center rounded-xl bg-soft-lavender">
              <FolderIcon className="size-5 text-brownish-amber" />
            </div>
            <span className="font-medium capitalize text-charcoal-black">{collection.title}</span>
          </Link>
        ))}
      </div>
    );
  }

  if (resources.length === 0) {
    return (
      <p className="text-sm text-charcoal-black">No matching resources found.</p>
    );
  }

  return <ResourceCard resources={resources} className="lg:grid-cols-3" />;
}
