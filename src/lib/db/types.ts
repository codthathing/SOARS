
export type ResourceType = "link" | "file" | "note";

export interface Resource {
  id: string;
  u_id: string;
  collection_id: string;
  type: ResourceType;

  title: string;
  summary: string;
  tags: string[]; // IDs of tags

  // Link-specific fields
  url?: string;
  hostname?: string;
  description?: string;
  image?: string;
  favicon?: string;

  // File-specific fields
  size?: number;
  data?: string;

  // Note-specific fields
  text?: string;

  created_at: string;
  updated_at: string;
}

export interface Tag {
  id: string;
  u_id: string;
  text: string;
  created_at: string;
}

export interface Database {
  resources: Resource[];
  collections: Collection[];
  tags: Tag[];
}

export interface Collection {
  id: string;
  u_id: string;
  title: string;
  created_at: string;
}



