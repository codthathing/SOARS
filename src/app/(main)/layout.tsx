import ProtectedLayoutWrapper from "@/src/components/layout/ProtectedLayoutWrapper";
import { getUserFromSession } from "@/src/utils/getUserFromSession";
import { ReactNode } from "react";

export default async function PageLayout({ children }: { children: ReactNode }) {
  const data = await getUserFromSession();
  
  return <ProtectedLayoutWrapper userData={data}>{children}</ProtectedLayoutWrapper>;
}
