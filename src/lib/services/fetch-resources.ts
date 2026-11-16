import { Resource, Link, File, Note, Collection, Tag, ResourceTag, UserResource, Category } from "../db/types";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

const api = async <T>(path: string, options?: RequestInit): Promise<T> => {
  if (!BASE_URL) throw new Error("NEXT_PUBLIC_API_URL is not set");

  const response = await fetch(`${BASE_URL}${path}`, { cache: "no-store", ...options });

  if (!response.ok) throw new Error("Something went wrong, kindly try again!");

  return response.json();
}

export const fetchResources = async (user_id: string) => {
  const userResources = await api<Resource[]>(`/resources?u_id=${user_id}`);
  
  const modifiedResources: UserResource[] = await Promise.all(userResources.map(async (resource) => {
    const resourceDetail = await api<File | Note | Link>(`/${resource.type}s/${resource.id}`);

    const resourceTagIds = await api<ResourceTag[]>(`/resource_tags?resource_id=${resource.id}`);
    const resourceTags = await Promise.all(resourceTagIds.map(async ({tag_id}) => {
      const { text } = await api<Tag>(`/tags/${tag_id}`);

      return text;
    }))
    
    return {...resource, ...resourceDetail, tags: resourceTags};
  }))

  const tags = await api<Tag[]>(`/tags?u_id=${user_id}`);
  const collections = await api<Collection[]>(`/collections?u_id=${user_id}`);

  const categories: Category[] = [
    { id: 0, icon: "bookmark", count: userResources.length, title: "total saves" },
    { id: 1, icon: "directory", count: collections.length, title: "collections" },
  ];

  return { resources: modifiedResources, categories, tags, collections }
}
