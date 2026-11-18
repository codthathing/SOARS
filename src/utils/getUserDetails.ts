import "server-only";
import { fetchResources } from "../lib/services/fetch-resources";
import { getUserFromSession } from "./getUserFromSession"

export const getUserDetails = async () => {
  const user = await getUserFromSession();
  const { collections, tags, resources, categories } = await fetchResources(user.id);

  return { user, resources, categories, collections, tags };
}