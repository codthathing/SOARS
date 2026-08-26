import { Metadata } from "next";
import { ReactNode } from "react";
import Image from "next/image";

export const metadata: Metadata = {
  title: {
    default: "Authentication Page",
    template: "%s Page - SOARS",
  },
};

export default function layout({ children }: { children: ReactNode }) {
  return (
    <div className={"h-dvh md:grid md:grid-cols-[45%_55%] lg:grid-cols-[40%_60%]"}>
      <section className={"hidden md:flex flex-col bg-soft-lavender z-20"}>
        <header className={"md:p-10"}>
          <div className={"flex items-center gap-x-3 md:gap-x-4"}>
            <Image src={"/app-logo.svg"} alt={"App logo"} width={50} height={100} className={"w-3 h-8 md:w-5 md:h-10"} />
            <span className={"font-bold uppercase text-base tracking-wider md:text-xl"}>SOARS</span>
          </div>
        </header>
        <div className={"flex-1 flex items-center justify-center"}>
          <Image src={"/app-logo.svg"} alt={"App logo"} width={50} height={100} className={"md:w-27.5 md:h-55 lg:w-17.5 lg:h-47.5"} />
        </div>
        <footer className={"md:p-8 flex flex-col md:gap-y-4 lg:gap-y-2.5"}>
          <h1 className={"font-bold md:text-3xl text-brownish-amber lg:text-2xl"}>Your personal library</h1>
          <p className={"md:text-2xl font-light lg:text-base"}>Save, organize, archive & share links and files - all in one place</p>
        </footer>
      </section>
      {children}
    </div>
  );
}
