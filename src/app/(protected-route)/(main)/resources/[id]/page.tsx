"use client";
import { useState } from "react";
import { useParams } from "next/navigation";
import HomeHeader from "@/src/components/home/HomeHeader";
import { Badge } from "@/src/components/ui/badge";
import { Button } from "@/src/components/ui/button";
import { Card, CardContent, CardTitle, CardDescription } from "@/src/components/ui/card";
import { Globe, File, NotepadText, Download, ExternalLink, Folder, CalendarDays } from "lucide-react";
import { selectAllCollections, selectAllResources, useAppSelector } from "@/src/store/store";
import { UserResource } from "@/src/lib/db/types";
import { useResourceOptions } from "@/src/hooks/useResourceOptions";
import { formatFileSize } from "@/src/utils/formatFileSize";

export default function ResourcePage() {
  const resources = useAppSelector(selectAllResources);
  const collections = useAppSelector(selectAllCollections);
  const [error, setError] = useState<string>("");

  const params = useParams<{ id: string }>();
  const id = params.id;

  let resource: UserResource | undefined = undefined;

  try {
    resource = resources.find((resource) => resource.id === id);

    if (!resource) {
      throw new Error("This resource could not be found.");
    }
  } catch (error) {
    setError(error instanceof Error ? error.message : "Something went wrong.");
  }

  const collectionTitle = collections.find((item) => item.id === resource?.collection_id)?.title ?? "Uncategorized";

  const { handleOpen, handleView, handleDownload } = useResourceOptions();

  const ResourceIcon = resource?.type === "file" ? File : resource?.type === "note" ? NotepadText : Globe;

  return (
    <>
      <HomeHeader topic="resource" showAvatar={false} showArrowLeft={true} />

      <section className="flex h-full flex-col gap-y-5 overflow-y-auto px-6 py-4 md:h-auto md:flex-row md:gap-x-7 md:p-7">
        {(error || !resource) ? (
          <div className="flex w-full flex-col items-center justify-center gap-y-3 py-20 text-center">
            <p className="text-sm text-charcoal-black">{error || "Resource not found."}</p>
            <Button onClick={() => window.location.reload()} className="bg-brownish-amber text-white hover:bg-brownish-amber">Try again</Button>
          </div>
        ) : (
          <>
            <div className="flex h-55 shrink-0 items-center justify-center rounded-xl bg-soft-lavender md:h-auto md:w-2/4 md:items-start md:pt-20"><ResourceIcon className="size-15 text-brownish-amber" /></div>

            <div className="flex flex-col gap-y-5 md:w-2/4 md:gap-y-7.5 lg:gap-y-5">
              <div>
                <Badge className="bg-brownish-amber/20 px-4 capitalize text-brownish-amber md:text-base">{resource.type}</Badge>
                <Card className="mt-3 border-none bg-transparent py-0 shadow-none">
                  <CardContent className="flex flex-col gap-y-2 bg-none px-0 lg:gap-y-3">
                    <CardTitle className="line-clamp-2 capitalize md:text-lg">{resource.title}</CardTitle>

                    {resource.type === "link" && (
                      <CardDescription className="flex items-center gap-x-1 break-all">
                        <Globe className="size-4 shrink-0" />
                        <span className="leading-none md:text-base lg:text-sm">{resource.hostname || resource.url}</span>
                      </CardDescription>
                    )}

                    {resource.type === "file" && (
                      <CardDescription className="flex items-center gap-x-1">
                        <File className="size-4" />
                        <span className="leading-none md:text-base lg:text-sm">PDF · {resource.size_bytes ? formatFileSize(resource.size_bytes) : "File"}</span>
                      </CardDescription>
                    )}

                    {resource.type === "note" && (
                      <CardDescription className="flex items-center gap-x-1">
                        <NotepadText className="size-4" />
                        <span className="leading-none md:text-base lg:text-sm">Personal note</span>
                      </CardDescription>
                    )}
                  </CardContent>
                </Card>
              </div>

              <div className="flex flex-wrap gap-2">
                {resource.type === "link" && (<Button onClick={() => handleOpen(resource.url)} className="flex-1 cursor-pointer bg-brownish-amber text-white hover:bg-brownish-amber md:rounded-xl md:px-6 md:py-6 md:text-xl lg:px-5 lg:text-base">Open <ExternalLink className="ml-2 size-4" /></Button>)}
                {resource.type === "file" && (
                  <>
                    <Button onClick={() => handleView(resource.type, resource.id)} className="flex-1 cursor-pointer bg-brownish-amber/20 text-brownish-amber hover:bg-brownish-amber/20 md:rounded-xl md:px-6 md:py-6 md:text-xl lg:px-5 lg:text-base">View</Button>
                    <Button onClick={() => handleDownload(resource.id)} className="flex-1 cursor-pointer border border-soft-lavender bg-transparent text-charcoal-black hover:bg-transparent md:px-6 md:py-6 md:text-xl lg:px-5 lg:text-base">Download <Download className="ml-2 size-4" /></Button>
                  </>
                )}
              </div>

              <div className="flex flex-col gap-y-1.5 rounded-xl bg-brownish-amber/20 p-4">
                <h3 className="text-xs font-semibold capitalize text-charcoal-black md:text-sm">{resource.type === "note" ? "My notes" : "AI summary"}</h3>
                <p className="whitespace-pre-wrap text-sm text-charcoal-black md:text-base">{resource.type === "note" ? resource.content || "No note content available." : resource.summary || "No summary available."}</p>
              </div>

              {resource.type !== "note" && resource.description && (
                <div className="flex flex-col gap-y-1.5">
                  <h3 className="text-sm capitalize text-charcoal-black md:text-base">Description</h3>
                  <p className="text-sm text-charcoal-black md:text-base">{resource.description}</p>
                </div>
              )}

              <div className="flex flex-col gap-y-2.5">
                <h3 className="text-sm capitalize text-charcoal-black md:text-base">Tags</h3>
                <div className="flex flex-wrap gap-2">
                  {(resource.tags ?? []).length > 0 ? (
                    resource.tags.map((tag) => (<Badge key={tag} className="bg-brownish-amber/20 px-4 text-brownish-amber md:text-base">#{tag}</Badge>))
                  ) : (
                    <span className="text-sm text-charcoal-black">No tags</span>
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
                    <CardDescription className="wrap-break-word text-sm font-bold capitalize text-charcoal-black md:text-lg lg:text-sm">{collectionTitle}</CardDescription>
                  </CardContent>
                </Card>
                <Card className="py-4">
                  <CardContent className="flex flex-col gap-y-1.5 px-4">
                    <CardTitle className="flex items-center gap-x-1 text-sm font-light text-charcoal-black md:text-lg lg:text-sm">
                      <CalendarDays className="size-3.5" />
                      Saved
                    </CardTitle>
                    <CardDescription className="text-sm font-bold capitalize text-charcoal-black md:text-lg lg:text-sm">{resource.created_at ? new Date(resource.created_at).toLocaleDateString() : "-"}</CardDescription>
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
