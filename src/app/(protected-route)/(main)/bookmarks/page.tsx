import BookmarksSaves from "@/src/components/bookmarks/BookmarksSaves";
import Filters from "@/src/components/common/FilterTabs";
import Input from "@/src/components/common/Input";
import HomeHeader from "@/src/components/home/HomeHeader";
import { Filter } from "lucide-react";

const bookmarkFilters = [
  {id: 0, text: "all"},
  {id: 1, text: "links"},
  {id: 2, text: "files"},
  {id: 3, text: "notes"},
]

export default function BookmarksPage() {
  return (
    <>
      <HomeHeader topic="bookmarks" showAvatar={true} showArrowLeft={false} />
      <section className={"flex flex-col px-6 py-4 gap-y-4 h-full overflow-y-auto md:p-7 md:gap-y-8 lg:gap-y-5"}>
        <div className="flex gap-x-2.5 lg:gap-x-4">
          <Input placeholder="Search bookmarks" />
          <div className="flex items-center gap-x-2 bg-transparent text-charcoal-black border border-soft-lavender px-4 py-2.5 md:px-5 md:py-3.5 lg:px-6.5 rounded-lg md:rounded-xl"><Filter className="size-4 md:size-5 lg:size-4.5" /><span className="capitalize font-bold text-sm md:text-xl lg:text-lg">filter</span></div>
        </div>
        <Filters filters={bookmarkFilters} />
        <BookmarksSaves />
      </section>
    </>
  )
}