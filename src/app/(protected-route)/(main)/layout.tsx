import HomeFooter from "@/src/components/home/HomeFooter";
import ProtectedLayoutWrapper from "@/src/components/layout/ProtectedLayoutWrapper";
import { getUserFromSession } from "@/src/utils/getUserFromSession";
import { ReactNode } from "react";

export default async function PageLayout({ children }: { children: ReactNode }) {
  const data = await getUserFromSession();

  return (
    <ProtectedLayoutWrapper userData={data}>
      <section className={"flex flex-col h-dvh md:grid md:grid-cols-[25%_75%] bg-light-gray"}>
        <div className={"flex-1 flex flex-col overflow-hidden md:order-2"}>
          {children}
        </div>
        <HomeFooter />
      </section>
    </ProtectedLayoutWrapper>
  );
}
