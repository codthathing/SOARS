
"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/src/components/ui/card";

import {
  Globe,
  LinkIcon,
  NotepadText,
  File,
} from "lucide-react";

import { Badge } from "@/src/components/ui/badge";
import { useRouter } from "next/navigation";
import ResourceCardOption from "./ResourceCardOption";
import type { Save } from "@/src/store/store";

const SAVES_ICON_MAP = {
  link: LinkIcon,
  file: File,
  note: NotepadText,
};

interface ResourceCardInterface {
  resources: Save[];
  className?: string;
}

const formatFileSize = (bytes: number) => {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
};

export default function ResourceCard({
  resources,
  className,
}: ResourceCardInterface) {
  const router = useRouter();

  return (
    <div
      className={`flex flex-col gap-y-4 md:grid md:grid-cols-2 md:gap-2 ${className ?? ""}`}
    >
      {resources.map(
        ({ id, type, url, size, title, tags }) => {
          const Icon = SAVES_ICON_MAP[type];

          return (
            <Card
              key={id}
              className="flex flex-row gap-x-3 lg:gap-x-4"
            >
              <CardHeader className="flex h-fit w-14 items-center justify-end p-0">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-soft-lavender">
                  <Icon
                    size={16}
                    className="text-brownish-amber"
                  />
                </div>
              </CardHeader>

              <CardContent
                onClick={() => router.push(`/resources/${id}`)}
                className="flex flex-1 cursor-pointer flex-col gap-y-2 px-0 lg:gap-y-3"
              >
                <CardTitle className="line-clamp-1 capitalize md:text-base">
                  {title}
                </CardTitle>

                <CardDescription className="flex items-center gap-x-1">
                  <Globe size={14} />

                  <span className="leading-none md:text-xs lg:text-sm">
                    {type === "link" && url}
                    {type === "file" &&
                      `${size ? formatFileSize(size) : "PDF"} · PDF`}
                    {type === "note" && "Note"}
                  </span>
                </CardDescription>

                <div className="flex flex-wrap gap-2">
                  {(tags ?? []).map((tag) => (
                    <Badge
                      key={tag}
                      className="bg-brownish-amber/20 text-brownish-amber md:text-xs lg:text-sm"
                    >
                      #{tag}
                    </Badge>
                  ))}
                </div>
              </CardContent>

              <ResourceCardOption
                id={id}
                type={type}
                url={url}
              />
            </Card>
          );
        }
      )}
    </div>
  );
}
