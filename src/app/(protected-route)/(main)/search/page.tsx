
"use client";

import { useEffect, useState } from "react";
import Filters from "@/src/components/common/FilterTabs";
import HomeHeader from "@/src/components/home/HomeHeader";
import SearchInput from "@/src/components/search/SearchInput";
import SearchSaves from "@/src/components/search/SearchSaves";
import type { Save } from "@/src/store/store";

interface Collection {
  id: string;
  title: string;
}

const searchFilters = [
  { id: 0, text: "all" },
  { id: 1, text: "links" },
  { id: 2, text: "files" },
  { id: 3, text: "notes" },
  { id: 4, text: "collections" },
];

export default function SearchPage() {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");
  const [resources, setResources] = useState<Save[]>([]);
  const [collections, setCollections] = useState<Collection[]>([]);
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
          throw new Error(data.error || "Unable to load resources.");
        }

        setResources(data.resources ?? []);
        setCollections(data.collections ?? []);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Unable to load resources."
        );
      } finally {
        setLoading(false);
      }
    };

    loadResources();
  }, []);

  return (
    <>
      <HomeHeader topic="search" showAvatar showArrowLeft={false} />

      <section className="flex h-full flex-col gap-y-4 overflow-y-auto px-6 py-4 md:gap-y-8 md:p-7 lg:gap-y-5">
        <SearchInput value={search} setValue={setSearch} />

        <Filters filters={searchFilters} value={filter} onChange={setFilter} />

        <div className="text-sm font-light text-charcoal-black">
          {loading
            ? "Loading..."
            : error
              ? error
              : filter === "collections"
                ? `${collections.filter((collection) =>
                    collection.title.toLowerCase().includes(search.toLowerCase())
                  ).length} collections`
                : `${resources.filter((resource) => {
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

                    return (
                      matchesType &&
                      searchable.includes(search.toLowerCase())
                    );
                  }).length} results`}
        </div>

        {!loading && !error && (
          <SearchSaves
            resources={resources}
            collections={collections}
            search={search}
            filter={filter}
          />
        )}
      </section>
    </>
  );
}
