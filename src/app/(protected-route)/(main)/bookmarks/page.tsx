import BookmarksFilters from "@/src/components/bookmarks/BookmarksFilters";
import HomeHeader from "@/src/components/home/HomeHeader";
import HomeSaves from "@/src/components/home/HomeSaves";
import { Filter, SearchIcon } from "lucide-react";

export default function BookmarksPage() {
  return (
    <>
      <HomeHeader topic="bookmarks" showAvatar={true} showArrowLeft={false} />
      <section className={"flex flex-col px-6 py-4 gap-y-4 h-full overflow-y-auto md:p-7 md:gap-y-8 lg:gap-y-5"}>
        <div className="flex gap-x-2.5 lg:gap-x-4">
          <div className="flex-1 flex items-center gap-x-4 md:gap-x-5 lg:gap-x-3.5 bg-soft-lavender/30 text-charcoal-black px-4 py-2.5 md:px-5 md:py-3.5 rounded-lg md:rounded-xl text-sm md:text-xl lg:text-lg">
            <SearchIcon className="size-4 md:size-5 text-charcoal-black/50" />
            <input type="text" className="outline-none bg-transparent" placeholder="Search bookmarks" />
          </div>
          <div className="flex items-center gap-x-2 bg-transparent text-charcoal-black border border-soft-lavender px-4 py-2.5 md:px-5 md:py-3.5 lg:px-6.5 rounded-lg md:rounded-xl"><Filter className="size-4 md:size-5 lg:size-4.5" /><span className="capitalize font-bold text-sm md:text-xl lg:text-lg">filter</span></div>
        </div>
        <BookmarksFilters />
        <HomeSaves className="lg:grid-cols-3" />
      </section>
    </>
  )
}