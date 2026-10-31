
"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import HomeHeader from "@/src/components/home/HomeHeader";
import { Badge } from "@/src/components/ui/badge";
import { Button } from "@/src/components/ui/button";
import {
  Card,
  CardContent,
  CardTitle,
  CardDescription,
} from "@/src/components/ui/card";
import {
  Globe,
  File,
  NotepadText,
  Download,
  ExternalLink,
  Folder,
  CalendarDays,
} from "lucide-react";

type ResourceType = "link" | "file" | "note";

interface Resource {
  id: string;
  u_id: string;
  collection_id: string;
  type: ResourceType;
  title: string;
  summary: string;
  tags: string[];
  url?: string;
  hostname?: string;
  description?: string;
  size?: number;
  data?: string;
  text?: string;
  created_at: string;
  updated_at: string;
}

interface Collection {
  id: string;
  title: string;
}

interface ResourcesResponse {
  resources?: Resource[];
  collections?: Collection[];
}

const formatFileSize = (bytes: number) => {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
};

export default function ResourcePage() {
  const params = useParams<{ id: string }>();
  const id = params.id;

  const [resource, setResource] = useState<Resource | null>(null);
  const [collections, setCollections] = useState<Collection[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchResource = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await fetch("/api/resources", {
          cache: "no-store",
        });

        const data: ResourcesResponse | Resource[] = await response.json();

        if (!response.ok) {
          throw new Error("Unable to load your resources.");
        }

        const resources = Array.isArray(data)
          ? data
          : data.resources ?? [];

        const foundResource = resources.find((item) => item.id === id);

        if (!foundResource) {
          throw new Error("This resource could not be found.");
        }

        setResource(foundResource);

        if (!Array.isArray(data)) {
          setCollections(data.collections ?? []);
        }
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Something went wrong."
        );
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchResource();
  }, [id]);

  const collectionTitle =
    collections.find((item) => item.id === resource?.collection_id)?.title ??
    "Uncategorized";

  const handleOpen = () => {
    if (resource?.type === "link" && resource.url) {
      window.open(resource.url, "_blank", "noopener,noreferrer");
    }
  };

  const handleViewFile = () => {
    if (resource) {
      window.open(`/api/resources/${resource.id}/file`, "_blank");
    }
  };

  const handleDownloadFile = () => {
    if (resource) {
      const link = document.createElement("a");
      link.href = `/api/resources/${resource.id}/file?download=1`;
      link.download = "";
      document.body.appendChild(link);
      link.click();
      link.remove();
    }
  };

  const ResourceIcon =
    resource?.type === "file"
      ? File
      : resource?.type === "note"
        ? NotepadText
        : Globe;

  return (
    <>
      <HomeHeader
        topic="resource"
        showAvatar={false}
        showArrowLeft={true}
      />

      <section className="flex h-full flex-col gap-y-5 overflow-y-auto px-6 py-4 md:h-auto md:flex-row md:gap-x-7 md:p-7">
        {loading ? (
          <div className="flex w-full items-center justify-center py-20 text-sm text-charcoal-black">
            Loading resource...
          </div>
        ) : error || !resource ? (
          <div className="flex w-full flex-col items-center justify-center gap-y-3 py-20 text-center">
            <p className="text-sm text-charcoal-black">
              {error || "Resource not found."}
            </p>
            <Button
              onClick={() => window.location.reload()}
              className="bg-brownish-amber text-white hover:bg-brownish-amber"
            >
              Try again
            </Button>
          </div>
        ) : (
          <>
            <div className="flex h-55 shrink-0 items-center justify-center rounded-xl bg-soft-lavender md:h-auto md:w-2/4 md:items-start md:pt-20">
              <ResourceIcon className="size-15 text-brownish-amber" />
            </div>

            <div className="flex flex-col gap-y-5 md:w-2/4 md:gap-y-7.5 lg:gap-y-5">
              <div>
                <Badge className="bg-brownish-amber/20 px-4 capitalize text-brownish-amber md:text-base">
                  {resource.type}
                </Badge>

                <Card className="mt-3 border-none bg-transparent py-0 shadow-none">
                  <CardContent className="flex flex-col gap-y-2 bg-none px-0 lg:gap-y-3">
                    <CardTitle className="line-clamp-2 capitalize md:text-lg">
                      {resource.title}
                    </CardTitle>

                    {resource.type === "link" && (
                      <CardDescription className="flex items-center gap-x-1 break-all">
                        <Globe className="size-4 shrink-0" />
                        <span className="leading-none md:text-base lg:text-sm">
                          {resource.hostname || resource.url}
                        </span>
                      </CardDescription>
                    )}

                    {resource.type === "file" && (
                      <CardDescription className="flex items-center gap-x-1">
                        <File className="size-4" />
                        <span className="leading-none md:text-base lg:text-sm">
                          PDF ·{" "}
                          {resource.size
                            ? formatFileSize(resource.size)
                            : "File"}
                        </span>
                      </CardDescription>
                    )}

                    {resource.type === "note" && (
                      <CardDescription className="flex items-center gap-x-1">
                        <NotepadText className="size-4" />
                        <span className="leading-none md:text-base lg:text-sm">
                          Personal note
                        </span>
                      </CardDescription>
                    )}
                  </CardContent>
                </Card>
              </div>

              <div className="flex flex-wrap gap-2">
                {resource.type === "link" && (
                  <Button
                    onClick={handleOpen}
                    className="flex-1 cursor-pointer bg-brownish-amber text-white hover:bg-brownish-amber md:rounded-xl md:px-6 md:py-6 md:text-xl lg:px-5 lg:text-base"
                  >
                    Open <ExternalLink className="ml-2 size-4" />
                  </Button>
                )}

                {resource.type === "file" && (
                  <>
                    <Button
                      onClick={handleViewFile}
                      className="flex-1 cursor-pointer bg-brownish-amber/20 text-brownish-amber hover:bg-brownish-amber/20 md:rounded-xl md:px-6 md:py-6 md:text-xl lg:px-5 lg:text-base"
                    >
                      View
                    </Button>

                    <Button
                      onClick={handleDownloadFile}
                      className="flex-1 cursor-pointer border border-soft-lavender bg-transparent text-charcoal-black hover:bg-transparent md:px-6 md:py-6 md:text-xl lg:px-5 lg:text-base"
                    >
                      Download <Download className="ml-2 size-4" />
                    </Button>
                  </>
                )}
              </div>

              <div className="flex flex-col gap-y-1.5 rounded-xl bg-brownish-amber/20 p-4">
                <h3 className="text-xs font-semibold capitalize text-charcoal-black md:text-sm">
                  {resource.type === "note" ? "My notes" : "AI summary"}
                </h3>

                <p className="whitespace-pre-wrap text-sm text-charcoal-black md:text-base">
                  {resource.type === "note"
                    ? resource.text || "No note content available."
                    : resource.summary || "No summary available."}
                </p>
              </div>

              {resource.type !== "note" && resource.description && (
                <div className="flex flex-col gap-y-1.5">
                  <h3 className="text-sm capitalize text-charcoal-black md:text-base">
                    Description
                  </h3>
                  <p className="text-sm text-charcoal-black md:text-base">
                    {resource.description}
                  </p>
                </div>
              )}

              <div className="flex flex-col gap-y-2.5">
                <h3 className="text-sm capitalize text-charcoal-black md:text-base">
                  Tags
                </h3>

                <div className="flex flex-wrap gap-2">
                  {(resource.tags ?? []).length > 0 ? (
                    resource.tags.map((tag) => (
                      <Badge
                        key={tag}
                        className="bg-brownish-amber/20 px-4 text-brownish-amber md:text-base"
                      >
                        #{tag}
                      </Badge>
                    ))
                  ) : (
                    <span className="text-sm text-charcoal-black">
                      No tags
                    </span>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <Card className="py-4">
                  <CardContent className="flex flex-col gap-y-1.5 px-4">
                    <CardTitle className="flex items-center gap-x-1 text-sm font-light text-charcoal-black md:text-lg lg:text-sm">
                      <Folder className="size-3.5" />
                      Collection
                    </CardTitle>
                    <CardDescription className="wrap-break-word text-sm font-bold capitalize text-charcoal-black md:text-lg lg:text-sm">
                      {collectionTitle}
                    </CardDescription>
                  </CardContent>
                </Card>

                <Card className="py-4">
                  <CardContent className="flex flex-col gap-y-1.5 px-4">
                    <CardTitle className="flex items-center gap-x-1 text-sm font-light text-charcoal-black md:text-lg lg:text-sm">
                      <CalendarDays className="size-3.5" />
                      Saved
                    </CardTitle>
                    <CardDescription className="text-sm font-bold capitalize text-charcoal-black md:text-lg lg:text-sm">
                      {resource.created_at
                        ? new Date(resource.created_at).toLocaleDateString()
                        : "-"}
                    </CardDescription>
                  </CardContent>
                </Card>
              </div>
            </div>
          </>
        )}
      </section>
    </>
  );
}
