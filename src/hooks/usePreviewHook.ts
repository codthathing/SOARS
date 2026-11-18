import { useEffect, useState } from "react";
import { ResourceDetails, ResourceDraft, SaveResourceData } from "../lib/types";
import { useAppDispatch, addResource, addTags, addCollection } from "../store/store";
import { useRouter } from "next/navigation";

export const usePreviewHook = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [showNewTag, setShowNewTag] = useState(false);
  const [newTag, setNewTag] = useState("");
  const [savingDetails, setSavingDetails] = useState({ saving: false, error: "" });
  const [resourceDetails, setResourceDetails] = useState<ResourceDetails>({ draft: null, tags: [], summary: "", collection: { type: "default", collectionId: null, title: "All resources" } });


  useEffect(() => {
    const storedDraft = sessionStorage.getItem("soars-resource-draft");

    if (!storedDraft) {
      router.replace("/add-resource/link");
      return;
    }

    try {
      const parsedDraft = JSON.parse(storedDraft) as ResourceDraft;

      if (!parsedDraft.analysis || !["link", "file", "note"].includes(parsedDraft.type)) throw new Error("Invalid resource draft");

      if (parsedDraft.type === "note" && typeof parsedDraft.note?.content !== "string") throw new Error("Invalid note draft");

      if (parsedDraft.type === "file" && !parsedDraft.file) throw new Error("Invalid file draft");

      if (parsedDraft.type === "link" && !parsedDraft.metadata) throw new Error("Invalid link draft");

      setResourceDetails({ draft: parsedDraft, tags: parsedDraft.analysis.tags, summary: parsedDraft.analysis.summary, collection: parsedDraft.analysis.collection });
    } catch {
      sessionStorage.removeItem("soars-resource-draft");
      router.replace("/add-resource/link");
    }
  }, [router]);

  
  const handleSaveResource = async () => {
    if (!resourceDetails.draft || savingDetails.saving) return;

    setSavingDetails({ saving: true, error: "" });

    try {
      const response = await fetch("/api/resources", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          type: resourceDetails.draft.type,
          title: resourceDetails.draft.userTitle?.trim() || resourceDetails.draft.metadata?.title || resourceDetails.draft.file?.title || resourceDetails.draft.note?.title,
          summary: resourceDetails.summary,
          tags: resourceDetails.tags,
          collection: resourceDetails.collection,

          ...(resourceDetails.draft.type === "link" && {
            metadata: {
              url: resourceDetails.draft.metadata?.url,
              hostname: resourceDetails.draft.metadata?.hostname,
              description: resourceDetails.draft.metadata?.description,
              image: resourceDetails.draft.metadata?.image,
              favicon: resourceDetails.draft.metadata?.favicon,
            },
          }),

          ...(resourceDetails.draft.type === "file" && {
            file: {
              id: resourceDetails.draft.file?.id,
              original_filename: resourceDetails.draft.file?.original_filename,
              mime_type: resourceDetails.draft.file?.mime_type,
              checksum: resourceDetails.draft.file?.checksum,
              size_bytes: resourceDetails.draft.file?.size_bytes,
              text: resourceDetails.draft.file?.text,
            },
          }),

          ...(resourceDetails.draft.type === "note" && {
            note: {
              content: resourceDetails.draft.note?.content,
              slug: resourceDetails.draft.note?.slug
            }
          }),
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Unable to save resource.");
      }

      const { resource, newTags, newCollection } = data as SaveResourceData;

      dispatch(addResource(resource));
      if (newTags.length > 0) dispatch(addTags(newTags));
      if (newCollection) dispatch(addCollection(newCollection));

      sessionStorage.removeItem("soars-resource-draft");
      router.push("/home");
    } catch (error) {
      console.error("Save resource error:", error);

      setSavingDetails((prev) => ({...prev, error: error instanceof Error ? error.message : "Something went wrong while saving."}));
    } finally {
      setSavingDetails((prev) => ({...prev, saving: false}));
    }
  };

    
  const removeTag = (tagToRemove: string) => setResourceDetails((prev) => ({...prev, tags: prev.tags.filter((tag) => tag !== tagToRemove)}));

  
  const addTag = () => {
    const trimmedTag = newTag.trim().toLowerCase();

    if (!trimmedTag) return;

    if (resourceDetails.tags.some((tag) => tag.toLowerCase() === trimmedTag)) {
      setNewTag("");
      setShowNewTag(false);
      return;
    }

    setResourceDetails((prev) => ({...prev, tags: [...prev.tags, trimmedTag]}));
    setNewTag("");
    setShowNewTag(false);
  };

  return { handleSaveResource, removeTag, addTag, savingDetails, resourceDetails, setResourceDetails, showNewTag, setShowNewTag, newTag, setNewTag };
}
