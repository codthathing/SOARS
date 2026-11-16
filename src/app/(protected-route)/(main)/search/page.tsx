"use client";
import { useMemo, useState } from "react";
import Filters from "@/src/components/common/FilterTabs";
import HomeHeader from "@/src/components/home/HomeHeader";
import SearchInput from "@/src/components/search/SearchInput";
import SearchSaves from "@/src/components/search/SearchSaves";
import { selectAllCollections, selectAllResources, useAppSelector } from "@/src/store/store";

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

  const resources = useAppSelector(selectAllResources);
  const collections = useAppSelector(selectAllCollections);

  const query = search.trim().toLowerCase();

  const matchingCollections = useMemo(() => collections.filter((collection) => collection.title.toLowerCase().includes(query)), [collections, query]);

  const matchingResources = useMemo(() =>
    resources.filter((resource) => {
      const matchesType = (filter === "all") || (resource.type === filter.slice(0, -1));

      const searchable = [resource.title, resource.summary, resource.url, resource.hostname, ...(resource.tags ?? [])].filter(Boolean).join(" ").toLowerCase();

      return matchesType && searchable.includes(query);
    }),
  [resources, filter, query]);

  const resultCount = (filter === "collections") ? matchingCollections.length : matchingResources.length;

  return (
    <>
      <HomeHeader topic="search" showAvatar showArrowLeft={false} />

      <section className="flex h-full flex-col gap-y-4 overflow-y-auto px-6 py-4 md:gap-y-8 md:p-7 lg:gap-y-5">
        <SearchInput value={search} setValue={setSearch} />

        <Filters filters={searchFilters} value={filter} onChange={setFilter} />

        <div className="text-sm font-light text-charcoal-black">
          {filter === "collections" ? `${resultCount} collections` : `${resultCount} results`}
        </div>

        <SearchSaves resources={matchingResources} collections={matchingCollections} filter={filter} />
      </section>
    </>
  );
}
