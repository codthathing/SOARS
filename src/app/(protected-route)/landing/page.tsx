import Image from "next/image";
import {Badge} from "@/src/components/ui/badge";
import LandingButtons from "@/src/components/landing/LandingButtons";
import LandingFeatures from "@/src/components/landing/LandingFeatures";
import LandingMenus from "@/src/components/landing/LandingMenus";

export default function HomePage() {
  return (
    <section className={"h-dvh flex flex-col"}>
      <header className={"flex justify-between items-center border-b border-light-gray px-6 py-4 md:px-10 md:py-8 lg:py-6 lg:px-10"}>
        <div className={"flex items-center gap-x-3 md:gap-x-4"}>
          <Image src={"/app-logo.svg"} alt={"App logo"} width={50} height={100} className={"w-3 h-8 md:w-5 md:h-10"} />
          <span className={"font-bold uppercase text-base tracking-wider md:text-xl"}>SOARS</span>
        </div>
        <LandingMenus />
      </header>
      <div className={"flex-1 overflow-y-auto"}>
        <section className={"md:flex gap-x-10 items-center px-6 mt-10 md:mt-35 lg:mt-30 lg:gap-x-40 lg:px-10"}>
          <div className={"flex flex-col gap-y-5 md:gap-y-6.5"}>
            <Badge className={"text-brownish-amber bg-amber-200 py-1 px-4 text-base md:text-2xl md:px-6 md:py-1.5 lg:text-base lg:px-4 lg:py-1"}>Personal library</Badge>
            <h1 className={"font-bold text-4xl tracking-wide md:text-5xl md:font-extrabold lg:text-6xl"}><span className={"text-charcoal-black"}>Save it once.</span><br/><span className={"text-brownish-amber"}>Find it forever.</span></h1>
            <p className={"text-base font-light md:text-xl"}>SOARS is your personal library for saving, organizing, archiving, and sharing every link and file that matters.</p>
            <LandingButtons />
          </div>
          <Image src={"/man-coffee.jpg"} alt={"Man Coffee"} width={100} height={100} className={"hidden md:block shrink-0 border-25 border-soft-lavender rounded-2xl w-90 h-90 lg:w-130"} />
        </section>
        <LandingFeatures />
      </div>
    </section>
  );
}