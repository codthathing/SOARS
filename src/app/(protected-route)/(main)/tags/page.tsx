
"use client";

import { useEffect, useMemo, useState } from "react";
import Input from "@/src/components/common/Input";
import HomeHeader from "@/src/components/home/HomeHeader";
import TagsOptions from "@/src/components/tags/TagsOptions";
import TagsSaves from "@/src/components/tags/TagsSaves";
import type { Save } from "@/src/store/store";

export default function TagsPage() {
  const [search, setSearch] = useState("");
  const [selectedTag, setSelectedTag] = useState("");
  const [resources, setResources] = useState<Save[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadResources = async () => {
      try {
        const response = await fetch("/api/resources", {
          cache: "no-store",
        });
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error || "Unable to load tags.");
        }

        setResources(data.resources ?? []);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Unable to load tags.");
      } finally {
        setLoading(false);
      }
    };

    loadResources();
  }, []);

  const tags = useMemo(() => {
    const counts = new Map<string, number>();

    resources.forEach((resource) => {
      (resource.tags ?? []).forEach((tag) => {
        counts.set(tag, (counts.get(tag) ?? 0) + 1);
      });
    });

    return Array.from(counts.entries())
      .map(([text, count]) => ({ text, count }))
      .sort((a, b) => b.count - a.count);
  }, [resources]);

  const visibleTags = tags.filter((tag) =>
    tag.text.toLowerCase().includes(search.trim().toLowerCase())
  );

  return (
    <>
      <HomeHeader topic="Tags" showAvatar showArrowLeft={false} />

      <section className="flex h-full flex-col gap-y-4 overflow-y-auto px-6 py-4 md:gap-y-8 md:p-7 lg:gap-y-5">
        <Input
          value={search}
          setValue={setSearch}
          placeholder="Search tags"
        />

        {loading ? (
          <p className="text-sm text-charcoal-black">Loading tags...</p>
        ) : error ? (
          <p className="text-sm text-red-600">{error}</p>
        ) : (
          <>
            <TagsOptions
              tags={visibleTags}
              selectedTag={selectedTag}
              onSelect={setSelectedTag}
            />

            {selectedTag && (
              <TagsSaves
                resources={resources.filter((resource) =>
                  (resource.tags ?? []).includes(selectedTag)
                )}
                selectedTag={selectedTag}
              />
            )}
          </>
        )}
      </section>
    </>
  );
}
