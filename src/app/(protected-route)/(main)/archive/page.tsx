import ArchiveSaves from "@/src/components/archive/ArchiveSaves";
import HomeHeader from "@/src/components/home/HomeHeader";
import { Archive } from "lucide-react";

export default function ArchivePage() {
  return (
    <>
      <HomeHeader topic="Archive" showAvatar showArrowLeft={false} />
      <section className={"flex flex-col px-6 py-4 gap-y-4 h-full overflow-y-auto md:p-7 md:gap-y-8 lg:gap-y-5"}>
        <div className="bg-brownish-amber/20 p-4 flex items-center gap-x-2.5 md:gap-x-3 rounded-xl">
          <Archive className="size-4 md:size-4.5 text-brownish-amber" />
          <p className="text-xs text-charcoal-black md:text-sm">Archived items are hidden from your main library but never deleted.</p>
        </div>
        <ArchiveSaves />
      </section>
    </>
  )
}