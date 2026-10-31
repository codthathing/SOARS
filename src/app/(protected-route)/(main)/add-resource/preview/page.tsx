"use client";

import { Badge } from "@/src/components/ui/badge";
import { Button } from "@/src/components/ui/button";
import {
  Card,
  CardHeader,
  CardContent,
  CardTitle,
  CardDescription,
} from "@/src/components/ui/card";
import {
  Check,
  FolderIcon,
  Globe,
  LinkIcon,
  Plus,
  X,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface Collection {
  id: string;
  u_id: string;
  title: string;
  created_at: string;
}

interface ResourceDraft {
  type: "link" | "file" | "note";
  metadata: {
    url: string;
    hostname: string;
    title: string;
    description?: string;
    image?: string;
    favicon?: string;
  };
  analysis: {
    summary: string;
    tags: string[];
    collection: {
      type: "existing" | "new";
      collectionId: string | null;
      title: string;
    };
  };
  collections: Collection[];
  userTitle?: string;
}

type SelectedCollection = {
  type: "existing" | "new" | "default";
  collectionId: string | null;
  title: string;
};

export default function Page() {
  const router = useRouter();

  const [draft, setDraft] = useState<ResourceDraft | null>(null);
  const [tags, setTags] = useState<string[]>([]);
  const [note, setNote] = useState("");
  const [newTag, setNewTag] = useState("");
  const [showNewTag, setShowNewTag] = useState(false);

  const [selectedCollection, setSelectedCollection] =
    useState<SelectedCollection>({
      type: "default",
      collectionId: null,
      title: "All resources",
    });

  useEffect(() => {
    const storedDraft = sessionStorage.getItem("soars-resource-draft");

    if (!storedDraft) {
      router.replace("/add-resource/link");
      return;
    }

    try {
      const parsedDraft = JSON.parse(storedDraft) as ResourceDraft;

      setDraft(parsedDraft);
      setTags(parsedDraft.analysis.tags || []);
      setNote(parsedDraft.analysis.summary || "");

      const recommendation = parsedDraft.analysis.collection;

      if (recommendation?.type === "existing" && recommendation.collectionId) {
        setSelectedCollection({
          type: "existing",
          collectionId: recommendation.collectionId,
          title: recommendation.title,
        });
      } else if (recommendation?.type === "new" && recommendation.title) {
        setSelectedCollection({
          type: "new",
          collectionId: null,
          title: recommendation.title,
        });
      }
    } catch {
      sessionStorage.removeItem("soars-resource-draft");
      router.replace("/add-resource/link");
    }
  }, [router]);

  const removeTag = (tagToRemove: string) => {
    setTags((prev) => prev.filter((tag) => tag !== tagToRemove));
  };

  const addTag = () => {
    const trimmedTag = newTag.trim().toLowerCase();

    if (!trimmedTag) return;

    if (tags.some((tag) => tag.toLowerCase() === trimmedTag)) {
      setNewTag("");
      setShowNewTag(false);
      return;
    }

    setTags((prev) => [...prev, trimmedTag]);
    setNewTag("");
    setShowNewTag(false);
  };

  if (!draft) {
    return null;
  }

  const { metadata, analysis, type } = draft;

  const displayTitle = draft.userTitle?.trim() || metadata.title;

  return (
    <div className="overflow-y-auto flex flex-col gap-y-4 md:gap-y-10 lg:gap-y-5">
      {/* Only display the original URL for link resources */}
      {type === "link" && (
        <div className="bg-soft-lavender/30 p-4 rounded-lg flex gap-x-4 items-center md:p-5 md:rounded-xl">
          <LinkIcon className="text-charcoal-black/90 size-4 md:size-5" />

          <a
            href={metadata.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-charcoal-black md:text-xl underline underline-offset-4 truncate"
          >
            {metadata.url}
          </a>
        </div>
      )}

      <div className="flex flex-col gap-y-2.5 bg-white rounded-xl py-4 px-5">
        <p className="text-xs md:text-base first-letter:capitalize text-charcoal-black">
          auto-generated preview
        </p>

        <Card className="flex flex-row items-center border-none shadow-none gap-x-3 lg:gap-x-4 p-0">
          <CardHeader className="flex items-center justify-end p-0 w-12 h-fit">
            <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-soft-lavender overflow-hidden">
              {metadata.favicon ? (
                <img
                  src={metadata.favicon}
                  alt=""
                  className="w-6 h-6 object-contain"
                />
              ) : (
                <Globe size={16} className="text-brownish-amber" />
              )}
            </div>
          </CardHeader>

          <CardContent className="flex flex-col flex-1 gap-y-1 px-0 lg:gap-y-3 min-w-0">
            <CardTitle className="line-clamp-1 capitalize md:text-lg">
              {displayTitle}
            </CardTitle>

            {/* Description is only available for link resources */}
            {type === "link" && metadata.description && (
              <CardDescription className="flex items-center gap-x-1">
                <span className="leading-none md:text-base lg:text-sm line-clamp-2">
                  {metadata.hostname} · {metadata.description}
                </span>
              </CardDescription>
            )}

            {type === "link" && (
              <a
                href={metadata.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-brownish-amber hover:underline w-fit"
              >
                {metadata.hostname}
              </a>
            )}
          </CardContent>
        </Card>
      </div>

      <textarea
        value={note}
        onChange={(e) => setNote(e.target.value)}
        className="outline-none bg-soft-lavender/30 text-charcoal-black p-4 md:p-5 rounded-lg md:rounded-xl text-sm md:text-xl resize-y min-h-24"
        placeholder="Add a note (optional)"
      />

      <div className="flex flex-col gap-y-2.5">
        <h3 className="text-sm text-charcoal-black capitalize md:text-base">
          tags
        </h3>

        <div className="flex flex-wrap gap-2">
          {tags.map((tag) => (
            <Badge
              key={tag}
              className="bg-brownish-amber/20 text-brownish-amber md:text-base px-2 md:px-3.5 lg:px-3 flex items-center gap-x-1.5"
            >
              <span>#{tag}</span>

              <button
                type="button"
                onClick={() => removeTag(tag)}
                aria-label={`Remove ${tag} tag`}
              >
                <X className="size-2.5 cursor-pointer" />
              </button>
            </Badge>
          ))}

          {showNewTag ? (
            <div className="flex items-center gap-x-2 bg-transparent text-charcoal-black font-light rounded-lg md:rounded-xl border border-soft-lavender md:text-base px-2 md:px-3.5 lg:px-3">
              <input
                type="text"
                placeholder="New tag"
                value={newTag}
                onChange={(e) => setNewTag(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    addTag();
                  }
                }}
                className="bg-transparent border-none outline-none w-24"
                autoFocus
              />

              <button type="button" onClick={addTag}>
                <Plus className="size-3 cursor-pointer shrink-0" />
              </button>

              <button
                type="button"
                onClick={() => {
                  setShowNewTag(false);
                  setNewTag("");
                }}
              >
                <X className="size-3 cursor-pointer shrink-0" />
              </button>
            </div>
          ) : (
            <button
              type="button"
              onClick={() => setShowNewTag(true)}
              className="bg-transparent text-charcoal-black font-light border border-soft-lavender rounded-lg md:rounded-xl md:text-base px-2 md:px-3.5 lg:px-3"
            >
              + Add tag
            </button>
          )}
        </div>
      </div>

      <div className="flex flex-col gap-y-2.5">
        <h3 className="text-sm text-charcoal-black capitalize md:text-base">
          collection
        </h3>

        <div className="rounded-xl overflow-hidden flex flex-col w-1/4 relative">
          <button
            type="button"
            onClick={() =>
              setSelectedCollection({
                type: "default",
                collectionId: null,
                title: "All resources",
              })
            }
            aria-label="Use All resources collection"
            className="absolute top-2 right-2 z-10"
          >
            <X className="size-4 cursor-pointer" />
          </button>

          <div className="flex items-center justify-center py-7 md:py-8 lg:py-3 md:flex-1 bg-emerald-green">
            <FolderIcon className="size-8 md:size-10 lg:size-5 text-charcoal-black" />
          </div>

          <div className="p-2.5 md:p-2.5 flex flex-col bg-white">
            <h1 className="font-semibold capitalize text-base md:text-lg lg:text-xs text-charcoal-black">
              {selectedCollection.title}
            </h1>

          <span
            className={`text-sm md:text-base lg:text-[10px] font-light capitalize ${
              selectedCollection.type === "new"
                ? "text-brownish-amber"
                : "text-charcoal-black"
            }`}
          >
            {selectedCollection.type === "existing"
              ? "Already Exists"
              : selectedCollection.type === "new"
                ? "New Collection"
                : "Default Collection"}
          </span>
          </div>
        </div>
      </div>

      <Button
        className="w-full flex items-center gap-x-1 md:gap-x-2.5 capitalize bg-brownish-amber/50 hover:bg-brownish-amber cursor-pointer text-white text-base p-6 md:text-2xl md:px-3 md:py-8 lg:text-xl lg:px-5 lg:py-6.5"
        disabled
      >
        <Check className="size-4 md:size-5.5" />
        <span>save resource</span>
      </Button>
    </div>
  );
}