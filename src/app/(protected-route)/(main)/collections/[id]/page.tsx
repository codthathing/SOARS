
"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import HomeHeader from "@/src/components/home/HomeHeader";
import ResourceCard from "@/src/components/common/ResourceCard";
import type { Save } from "@/src/store/store";

interface Collection {
  id: string;
  title: string;
}

export default function CollectionDetailsPage() {
  const { id } = useParams<{ id: string }>();

  const [collection, setCollection] = useState<Collection | null>(null);
  const [resources, setResources] = useState<Save[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadCollection = async () => {
      try {
        const response = await fetch("/api/resources", {
          cache: "no-store",
        });
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error || "Unable to load collection.");
        }

        const found = (data.collections ?? []).find(
          (item: Collection) => item.id === id
        );

        if (!found) throw new Error("Collection not found.");

        setCollection(found);
        setResources(
          (data.resources ?? []).filter(
            (resource: Save & { collection_id: string }) =>
              resource.collection_id === id
          )
        );
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Unable to load collection."
        );
      } finally {
        setLoading(false);
      }
    };

    if (id) loadCollection();
  }, [id]);

  return (
    <>
      <HomeHeader
        topic={collection?.title ?? "collection"}
        showAvatar={false}
        showArrowLeft
      />

      <section className="flex h-full flex-col gap-y-4 overflow-y-auto px-6 py-4 md:gap-y-8 md:p-7 lg:gap-y-5">
        {loading ? (
          <p className="text-sm text-charcoal-black">Loading collection...</p>
        ) : error ? (
          <p className="text-sm text-red-600">{error}</p>
        ) : (
          <>
            <p className="text-sm font-light text-charcoal-black">
              {resources.length}{" "}
              {resources.length === 1 ? "resource" : "resources"}
            </p>

            {resources.length > 0 ? (
              <ResourceCard
                resources={resources}
                className="lg:grid-cols-3"
              />
            ) : (
              <p className="text-sm text-charcoal-black">
                This collection is empty.
              </p>
            )}
          </>
        )}
      </section>
    </>
  );
}
