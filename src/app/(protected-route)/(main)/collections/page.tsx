import HomeHeader from "@/src/components/home/HomeHeader";
import { Button } from "@/src/components/ui/button";
import { FolderIcon, PlusIcon } from "lucide-react";

export default function CollectionsPage() {
  return (
    <>
      <HomeHeader topic="collections" showAvatar showArrowLeft={false} />
      <section className={"flex flex-col px-6 py-4 gap-y-4 h-full overflow-y-auto md:p-7 md:gap-y-8 lg:gap-y-5"}>
        <div className="flex justify-between">
          <span className="text-charcoal-black text-sm font-light">6 collections</span>
          <Button className={"capitalize bg-brownish-amber md:text-xl md:p-6 lg:text-base lg:px-5"}>+ save</Button>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-y-2.5 md:gap-4">
          <div className="border border-soft-lavender rounded-xl flex flex-col gap-y-2 md:gap-y-2.5 lg:gap-y-2 justify-center items-center py-7 md:p-0">
            <PlusIcon className="size-4 md:size-6 lg:size-5 text-charcoal-black" />
            <span className="first-letter:capitalize text-charcoal-black text-xs md:text-base font-light">create collection</span>
          </div>
          <div className="rounded-xl overflow-hidden flex flex-col">
            <div className="flex items-center justify-center py-7 md:py-8 lg:py-6 md:flex-1 bg-emerald-green"><FolderIcon className="size-8 md:size-10 lg:size-8 text-charcoal-black" /></div>
            <div className="p-2.5 md:p-3 flex flex-col bg-white">
              <h1 className="font-semibold capitalize text-base md:text-lg lg:text-base text-charcoal-black">design inspiration</h1>
              <span className="text-charcoal-black text-sm md:text-base lg:text-sm font-light">42 items</span>
            </div>
          </div>
          <div className="rounded-xl overflow-hidden flex flex-col">
            <div className="flex items-center justify-center py-7 md:py-8 lg:py-6 md:flex-1 bg-soft-lavender"><FolderIcon className="size-8 md:size-10 lg:size-8 text-charcoal-black" /></div>
            <div className="p-2.5 md:p-3 flex flex-col bg-white">
              <h1 className="font-semibold capitalize text-base md:text-lg lg:text-base text-charcoal-black">design inspiration</h1>
              <span className="text-charcoal-black text-sm md:text-base lg:text-sm font-light">42 items</span>
            </div>
          </div>
          <div className="rounded-xl overflow-hidden flex flex-col">
            <div className="flex items-center justify-center py-7 md:py-8 lg:py-6 md:flex-1 bg-brownish-amber"><FolderIcon className="size-8 md:size-10 lg:size-8 text-charcoal-black" /></div>
            <div className="p-2.5 md:p-3 flex flex-col bg-white">
              <h1 className="font-semibold capitalize text-base md:text-lg lg:text-base text-charcoal-black">design inspiration</h1>
              <span className="text-charcoal-black text-sm md:text-base lg:text-sm font-light">42 items</span>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}