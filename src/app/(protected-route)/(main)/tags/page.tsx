"use client";
import { useMemo, useState } from "react";
import HomeHeader from "@/src/components/home/HomeHeader";
import Input from "@/src/components/common/Input";
import TagsOptions from "@/src/components/tags/TagsOptions";
import TagsSaves from "@/src/components/tags/TagsSaves";
import { selectAllResources, selectAllTags, useAppSelector } from "@/src/store/store";

export default function TagsPage() {
  const [search, setSearch] = useState("");
  const [selectedTag, setSelectedTag] = useState("");

  const resources = useAppSelector(selectAllResources);
  const allTags = useAppSelector(selectAllTags);

  const tags = useMemo(() => {
    const counts = new Map<string, number>();

    resources.forEach((resource) => {
      new Set(resource.tags ?? []).forEach((tag) => {
        counts.set(tag, (counts.get(tag) ?? 0) + 1);
      });
    });

    return allTags.map(({ text }) => ({ text, count: counts.get(text) ?? 0 })).sort((a, b) => b.count - a.count);
  }, [resources, allTags]);

  const visibleTags = tags.filter((tag) => tag.text.toLowerCase().includes(search.trim().toLowerCase()));

  const taggedResources = useMemo(() => resources.filter((resource) => (resource.tags ?? []).includes(selectedTag) ), [resources, selectedTag]);

  return (
    <>
      <HomeHeader topic="Tags" showAvatar showArrowLeft={false} />

      <section className="flex h-full flex-col gap-y-4 overflow-y-auto px-6 py-4 md:gap-y-8 md:p-7 lg:gap-y-5">
        <Input value={search} setValue={setSearch} placeholder="Search tags" />

        <TagsOptions tags={visibleTags} selectedTag={selectedTag} onSelect={setSelectedTag} />

        {selectedTag && <TagsSaves resources={taggedResources} selectedTag={selectedTag} />}
      </section>
    </>
  );
}
