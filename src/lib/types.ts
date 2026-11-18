import { Dispatch, SetStateAction, FormEvent } from "react";
import { UserResource, Tag, Collection } from "./db/types";

export interface ResourceDraft {
  type: "link" | "file" | "note";

  metadata?: {
    url: string;
    hostname: string;
    title: string;
    description?: string;
    image?: string;
    favicon?: string;
  };

  file?: {
    id: string;
    title: string;
    original_filename: string;
    size_bytes: number;
    storagePath: string;
    text: string;
    checksum: string;
    mime_type: string;
  };

  note?: {
    content: string;
    slug: string;
    title: string;
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

  userTitle?: string;
}

export type SelectedCollection = {
  type: "existing" | "new" | "default";
  collectionId: string | null;
  title: string;
};

export interface ResourceDetails {
  draft: ResourceDraft | null; 
  tags: string[];
  summary: string;
  collection: SelectedCollection;
}

export interface SaveResourceData {
  resource: UserResource;
  newTags: Tag[];
  newCollection?: Collection;
}

export interface FileDetails {
  error: string;
  loading: boolean;
  original_filename: string;
  size_bytes: string;
  file: globalThis.File | undefined;
  title: string;
}

export interface AIResource {
  id: string;
  type: "link" | "file" | "note";
  title: string;
  summary: string;
  tags: string[];
  collection: string;
  reason: string;
  url?: string;
  viewUrl?: string;
  downloadUrl?: string;
}

export interface ChatMessage {
  role: "user" | "assistant";
  content: string;
  resources?: AIResource[];
}

export interface PromptField {
  setPrompt: Dispatch<SetStateAction<string>>;
  prompt: string;
  loading: boolean;
  handleSubmit: (e: FormEvent<HTMLFormElement>) => Promise<void>;
}