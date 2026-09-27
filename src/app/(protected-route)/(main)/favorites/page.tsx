import FavoriteSaves from "@/src/components/favorites/FavoritesSaves";
import HomeHeader from "@/src/components/home/HomeHeader";
import { StarIcon } from "lucide-react";

export default function FavoritesPage() {
  return (
    <>
      <HomeHeader topic="Favorites" showAvatar showArrowLeft={false} />
      <section className={"flex flex-col px-6 py-4 gap-y-4 h-full overflow-y-auto md:p-7 md:gap-y-8 lg:gap-y-5"}>
        <div className="flex items-center gap-x-1 md:gap-x-2">
          <StarIcon fill="currentColor" className="size-3 md:size-4.5 text-brownish-amber" />
          <span className="text-charcoal-black text-xs md:text-base lg:text-sm font-light first-letter:capitalize">your starred resources</span>
        </div>
        <FavoriteSaves />
      </section>
    </>
  )
}