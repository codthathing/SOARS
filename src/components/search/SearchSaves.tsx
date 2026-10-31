
"use client";

import Link from "next/link";
import { FolderIcon } from "lucide-react";
import ResourceCard from "../common/ResourceCard";
import type { Save } from "@/src/store/store";

interface Collection {
  id: string;
  title: string;
}

interface SearchSavesProps {
  resources: Save[];
  collections: Collection[];
  search: string;
  filter: string;
}

export default function SearchSaves({
  resources,
  collections,
  search,
  filter,
}: SearchSavesProps) {
  const query = search.trim().toLowerCase();

  if (filter === "collections") {
    const matchingCollections = collections.filter((collection) =>
      collection.title.toLowerCase().includes(query)
    );

    return (
      <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
        {matchingCollections.map((collection) => (
          <Link
            key={collection.id}
            href={`/collections/${collection.id}`}
            className="flex items-center gap-x-3 rounded-xl border border-soft-lavender bg-white p-4 hover:bg-soft-lavender/20"
          >
            <div className="flex size-11 items-center justify-center rounded-xl bg-soft-lavender">
              <FolderIcon className="size-5 text-brownish-amber" />
            </div>
            <span className="font-medium capitalize text-charcoal-black">
              {collection.title}
            </span>
          </Link>
        ))}

        {matchingCollections.length === 0 && (
          <p className="text-sm text-charcoal-black">
            No matching collections found.
          </p>
        )}
      </div>
    );
  }

  const matchingResources = resources.filter((resource) => {
    const matchesType =
      filter === "all" || resource.type === filter.slice(0, -1);

    const searchable = [
      resource.title,
      resource.summary,
      resource.url,
      resource.hostname,
      ...(resource.tags ?? []),
    ]
      .join(" ")
      .toLowerCase();

    return matchesType && searchable.includes(query);
  });

  if (matchingResources.length === 0) {
    return (
      <p className="text-sm text-charcoal-black">
        No matching resources found.
      </p>
    );
  }

  return (
    <ResourceCard
      resources={matchingResources}
      className="lg:grid-cols-3"
    />
  );
}
