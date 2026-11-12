import { getUserFromSession } from "./getUserFromSession"

export const getUserDetails = async () => {
  const user = await getUserFromSession();

  return { user };
}