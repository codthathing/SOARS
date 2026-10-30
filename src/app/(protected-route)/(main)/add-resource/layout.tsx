import HomeHeader from "@/src/components/home/HomeHeader";
import { ReactNode } from "react";

export default function layout({children}: {children: ReactNode}) {
  return (
    <>
      <HomeHeader topic="add resource" showAvatar={true} showArrowLeft={false} />
      <section className={"flex flex-col px-6 py-4 gap-y-4 h-full overflow-y-hidden md:p-7 md:gap-y-10 lg:gap-y-5 lg:w-4/5 mx-auto"}>
        {children}
      </section>
    </>
  )
}