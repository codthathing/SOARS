"use client";
import { Badge } from "@/src/components/ui/badge";
import { Button } from "@/src/components/ui/button";
import { Card, CardHeader, CardContent, CardTitle, CardDescription } from "@/src/components/ui/card";
import { Check, FolderIcon, Globe, LinkIcon, Plus, X, FileText } from "lucide-react";
import { usePreviewHook } from "@/src/hooks/usePreviewHook";
import { formatFileSize } from "@/src/utils/formatFileSize";


export default function Page() {
  const { handleSaveResource, removeTag, addTag, savingDetails, resourceDetails, setResourceDetails, showNewTag, setShowNewTag, newTag, setNewTag } = usePreviewHook();

  if (!resourceDetails.draft) return null;

  const { metadata, type, file, note } = resourceDetails.draft;

  const displayTitle = resourceDetails.draft.userTitle?.trim() || metadata?.title || file?.title || note?.title;

  return (
    <div className="overflow-y-auto flex flex-col gap-y-4 md:gap-y-10 lg:gap-y-5">
      {type === "link" && metadata && (
        <div className="bg-soft-lavender/30 p-4 rounded-lg flex gap-x-4 items-center md:p-5 md:rounded-xl">
          <LinkIcon className="text-charcoal-black/90 size-4 md:size-5" />
          <a href={metadata.url} target="_blank" rel="noopener noreferrer" className="text-sm text-charcoal-black md:text-xl underline underline-offset-4 truncate">{metadata.url}</a>
        </div>
      )}

      <div className="flex flex-col gap-y-2.5 bg-white rounded-xl py-4 px-5">
        <p className="text-xs md:text-base first-letter:capitalize text-charcoal-black">auto-generated preview</p>
        <Card className="flex flex-row items-center border-none shadow-none gap-x-3 lg:gap-x-4 p-0">
          <CardHeader className="flex items-center justify-end p-0 w-12 h-fit">
            <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-soft-lavender overflow-hidden">{type === "link" && metadata?.favicon ? <img src={metadata.favicon} alt="" className="w-6 h-6 object-contain" /> : type === "file" || type === "note" ? <FileText className="size-6 text-brownish-amber" /> : <Globe size={16} className="text-brownish-amber" />}</div>
          </CardHeader>
          <CardContent className="flex flex-col flex-1 gap-y-1 px-0 lg:gap-y-3 min-w-0">
            <CardTitle className="line-clamp-1 capitalize md:text-lg">{displayTitle}</CardTitle>
            {type === "link" && metadata?.description && (
              <CardDescription className="flex items-center gap-x-1">
                <span className="leading-none md:text-base lg:text-sm line-clamp-2">
                  {metadata.hostname} · {metadata.description}
                </span>
              </CardDescription>
            )}
            {type === "file" && resourceDetails.draft.file && <CardDescription className="text-xs md:text-sm">PDF · {formatFileSize(resourceDetails.draft.file.size_bytes)}</CardDescription>}
            {type === "note" && <CardDescription className="text-xs md:text-sm">Text note</CardDescription>}
          </CardContent>
        </Card>
      </div>

      <textarea value={resourceDetails.summary} name="summary" onChange={(e) => setResourceDetails((prev) => ({...prev, summary: e.target.value}))} className="outline-none bg-soft-lavender/30 text-charcoal-black p-4 md:p-5 rounded-lg md:rounded-xl text-sm md:text-xl resize-y min-h-24" placeholder="Add a note (optional)" />

      <div className="flex flex-col gap-y-2.5">
        <h3 className="text-sm text-charcoal-black capitalize md:text-base">tags</h3>
        <div className="flex flex-wrap gap-2">
          {resourceDetails.tags.map((tag) => (
            <Badge key={tag} className="bg-brownish-amber/20 text-brownish-amber md:text-base px-2 md:px-3.5 lg:px-3 flex items-center gap-x-1.5">
              <span>#{tag}</span>
              <button type="button" onClick={() => removeTag(tag)} aria-label={`Remove ${tag} tag`}>
                <X className="size-2.5 cursor-pointer" />
              </button>
            </Badge>
          ))}

          {showNewTag ? (
            <div className="flex items-center gap-x-2 bg-transparent text-charcoal-black font-light rounded-lg md:rounded-xl border border-soft-lavender md:text-base px-2 md:px-3.5 lg:px-3">
              <input type="text" placeholder="New tag" value={newTag} onChange={(e) => setNewTag(e.target.value)} className="bg-transparent border-none outline-none w-24" autoFocus onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  addTag();
                }
              }}/>
              <button type="button" onClick={addTag}>
                <Plus className="size-3 cursor-pointer shrink-0" />
              </button>
              <button type="button" onClick={() => {
                setShowNewTag(false);
                setNewTag("");
              }}>
                <X className="size-3 cursor-pointer shrink-0" />
              </button>
            </div>
          ) : (
            <button type="button" onClick={() => setShowNewTag(true)} className="bg-transparent text-charcoal-black font-light border border-soft-lavender rounded-lg md:rounded-xl md:text-base px-2 md:px-3.5 lg:px-3">+ Add tag</button>
          )}
        </div>
      </div>

      <div className="flex flex-col gap-y-2.5">
        <h3 className="text-sm text-charcoal-black capitalize md:text-base">collection</h3>
        <div className="rounded-xl overflow-hidden flex flex-col w-1/4 relative">
          <button type="button" aria-label="Use All resources collection" className="absolute top-2 right-2 z-10" onClick={() => setResourceDetails((prev) => ({...prev, collection: { type: "default", collectionId: null, title: "All resources" }}))}>
            <X className="size-4 cursor-pointer" />
          </button>
          <div className="flex items-center justify-center py-7 md:py-8 lg:py-3 md:flex-1 bg-emerald-green">
            <FolderIcon className="size-8 md:size-10 lg:size-5 text-charcoal-black" />
          </div>
          <div className="p-2.5 md:p-2.5 flex flex-col bg-white">
            <h1 className="font-semibold capitalize text-base md:text-lg lg:text-xs text-charcoal-black">{resourceDetails.collection.title}</h1>
            <span className={`text-sm md:text-base lg:text-[10px] font-light capitalize ${resourceDetails.collection.type === "new" ? "text-brownish-amber" : "text-charcoal-black"}`}>{resourceDetails.collection.type === "existing" ? "Already Exists" : resourceDetails.collection.type === "new" ? "New Collection" : "Default Collection"}</span>
          </div>
        </div>
      </div>

      {savingDetails.error && <p className="text-sm text-red-500">{savingDetails.error}</p>}

      <Button onClick={handleSaveResource} disabled={savingDetails.saving} className="w-full flex items-center gap-x-1 md:gap-x-2.5 capitalize bg-brownish-amber hover:bg-brownish-amber cursor-pointer text-white text-base p-6 md:text-2xl md:px-3 md:py-8 lg:text-xl lg:px-5 lg:py-6.5 disabled:opacity-50">
        <Check className="size-4 md:size-5.5" />
        <span>{savingDetails.saving ? "saving resource..." : "save resource"}</span>
      </Button>
    </div>
  );
}
