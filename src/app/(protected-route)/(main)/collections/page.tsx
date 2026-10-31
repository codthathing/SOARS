
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import HomeHeader from "@/src/components/home/HomeHeader";
import { FolderIcon, PlusIcon } from "lucide-react";

interface Collection {
  id: string;
  title: string;
  created_at: string;
}

interface Resource {
  id: string;
  collection_id: string;
}

const collectionColors = [
  "bg-emerald-green",
  "bg-pink-500",
  "bg-soft-lavender",
  "bg-brownish-amber",
];

export default function CollectionsPage() {
  const [collections, setCollections] = useState<Collection[]>([]);
  const [resources, setResources] = useState<Resource[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadData = async () => {
      try {
        const response = await fetch("/api/resources", {
          cache: "no-store",
        });
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error || "Unable to load collections.");
        }

        setCollections(data.collections ?? []);
        setResources(data.resources ?? []);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Unable to load collections."
        );
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  return (
    <>
      <HomeHeader topic="collections" showAvatar showArrowLeft={false} />

      <section className="flex h-full flex-col gap-y-4 overflow-y-auto px-6 py-4 md:gap-y-8 md:p-7 lg:gap-y-5">
        <div className="flex justify-between">
          <span className="text-sm font-light text-charcoal-black">
            {collections.length} collections
          </span>
        </div>

        {loading ? (
          <p className="text-sm text-charcoal-black">Loading collections...</p>
        ) : error ? (
          <p className="text-sm text-red-600">{error}</p>
        ) : (
          <div className="grid gap-y-2.5 md:grid-cols-2 md:gap-4 lg:grid-cols-3">
            <Link
              href="/collections/new"
              className="flex cursor-pointer flex-col items-center justify-center gap-y-2 rounded-xl border border-soft-lavender py-7 md:gap-y-2.5 md:p-0"
            >
              <PlusIcon className="size-4 text-charcoal-black md:size-6 lg:size-5" />
              <span className="text-xs font-light capitalize text-charcoal-black md:text-base">
                create collection
              </span>
            </Link>

            {collections.map((collection, index) => {
              const count = resources.filter(
                (resource) => resource.collection_id === collection.id
              ).length;

              return (
                <Link
                  key={collection.id}
                  href={`/collections/${collection.id}`}
                  className="flex flex-col overflow-hidden rounded-xl"
                >
                  <div
                    className={`flex items-center justify-center py-7 md:flex-1 md:py-8 lg:py-6 ${
                      collectionColors[index % collectionColors.length]
                    }`}
                  >
                    <FolderIcon className="size-8 text-charcoal-black md:size-10 lg:size-8" />
                  </div>

                  <div className="flex flex-col bg-white p-2.5 md:p-3">
                    <h1 className="line-clamp-1 text-base font-semibold capitalize text-charcoal-black md:text-lg lg:text-base">
                      {collection.title}
                    </h1>
                    <span className="text-sm font-light text-charcoal-black md:text-base lg:text-sm">
                      {count} {count === 1 ? "item" : "items"}
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
        )}

        {!loading && !error && collections.length === 0 && (
          <p className="text-sm text-charcoal-black">
            You haven't created any collections yet.
          </p>
        )}
      </section>
    </>
  );
}
