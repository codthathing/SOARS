export type ResourceType = "link" | "file" | "note";

export interface UserResource {
  id: string;
  u_id: string;
  collection_id: string;
  type: ResourceType;
  title: string;
  summary: string;
  tags: string[];
  created_at: string;
  updated_at: string;

  // Link-specific fields
  url?: string;
  hostname?: string;
  description?: string;
  image?: string;
  favicon?: string;

  // File-specific fields
  original_filename?: string;
  storage_key?: string;
  mime_type?: string;
  size_bytes?: number;
  checksum?: string;
  text?: string;

  // Note-specific fields
  slug?: string;
  content?: string;
}

export interface Resource {
  id: string;
  u_id: string;
  collection_id: string;
  type: ResourceType;
  title: string;
  summary: string;
  created_at: string;
  updated_at: string;
}

export interface ResourceTag {
  id: string;
  resource_id: string;
  tag_id: string;
}

export interface Link {
  id: string;
  url: string;
  hostname: string;
  description: string;
  image: string;
  favicon: string;
}

export interface File {
  id: string;
  original_filename: string;
  storage_key: string;
  mime_type: string;
  size_bytes: number;
  checksum: string;
  text: string;
}

export interface Note {
  id: string;
  slug: string;
  content: string;
}

export interface Tag {
  id: string;
  u_id: string;
  text: string;
  created_at: string;
}

export interface Collection {
  id: string;
  u_id: string;
  title: string;
  created_at: string;
}

type IconName = "bookmark" | "directory" | "star" | "archive";

export interface Category {
  id: number;
  icon: IconName;
  count: number;
  title: string;
}

export interface Database {
  resources: Resource[];
  collections: Collection[];
  tags: Tag[];
}