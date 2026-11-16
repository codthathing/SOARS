"use client";
import { useState } from "react";
import { useParams } from "next/navigation";
import HomeHeader from "@/src/components/home/HomeHeader";
import ResourceCard from "@/src/components/common/ResourceCard";
import { selectAllCollections, selectAllResources, useAppSelector } from "@/src/store/store";

interface Collection {
  id: string;
  title: string;
}

export default function CollectionDetailsPage() {
  const { id } = useParams<{ id: string }>();

  const collections = useAppSelector(selectAllCollections);
  const resources = useAppSelector(selectAllResources);

  let collection: Collection | undefined = undefined;
  const [error, setError] = useState<string>("");

  try {
    collection = collections.find((collection) => collection.id === id);

    if (!collection) throw new Error("Collection not found.");
  } catch (error) {
    setError(error instanceof Error ? error.message : "Unable to load collection.");
  }

  const collectionResources = resources.filter((resource) => resource.collection_id === collection?.id);

  return (
    <>
      <HomeHeader topic={collection?.title ?? "collection"} showAvatar={false} showArrowLeft />

      <section className="flex h-full flex-col gap-y-4 overflow-y-auto px-6 py-4 md:gap-y-8 md:p-7 lg:gap-y-5">
        {error ? (
          <p className="text-sm text-red-600">{error}</p>
        ) : (
          <>
            <p className="text-sm font-light text-charcoal-black">{collectionResources.length} {collectionResources.length === 1 ? "resource" : "resources"}</p>
            {collectionResources.length > 0 ? <ResourceCard resources={collectionResources} className="lg:grid-cols-3" /> : <p className="text-sm text-charcoal-black">This collection is empty.</p>}
          </>
        )}
      </section>
    </>
  );
}
