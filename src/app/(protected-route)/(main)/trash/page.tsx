import HomeHeader from "@/src/components/home/HomeHeader";
import TrashItem from "@/src/components/trash/TrashItem";
import { Trash2Icon } from "lucide-react";

export default function TrashPage() {
  return (
    <>
      <HomeHeader topic="Trash" showAvatar showArrowLeft={false} />
      <section className={"flex flex-col px-6 py-4 gap-y-4 h-full overflow-y-auto md:p-7 md:gap-y-8 lg:gap-y-5"}>
        <div className="bg-light-red p-4 flex items-center justify-between gap-x-2.5 md:gap-x-3 rounded-xl">
          <div className="flex items-center gap-x-2 5 md:gap-x-3">
            <Trash2Icon className="size-4 md:size-4.5 text-deep-red" />
            <span className="text-xs text-deep-red md:text-sm">Items are permanently deleted after 30 days.</span>
          </div>
          <span className="text-deep-red font-semibold capitalize shrink-0 text-xs md:text-sm">empty trash</span>
        </div>
        <TrashItem />
      </section>
    </>
  )
}