
"use client";

import ResourceCard from "../common/ResourceCard";
import type { Save } from "@/src/store/store";

interface TagsSavesProps {
  resources: Save[];
  selectedTag: string;
}

export default function TagsSaves({
  resources,
  selectedTag,
}: TagsSavesProps) {
  if (!selectedTag) return null;

  if (resources.length === 0) {
    return (
      <p className="text-sm text-charcoal-black">
        No resources have this tag.
      </p>
    );
  }

  return (
    <ResourceCard
      resources={resources}
      className="lg:grid-cols-3"
    />
  );
}
