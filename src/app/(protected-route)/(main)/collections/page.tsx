import Link from "next/link";
import HomeHeader from "@/src/components/home/HomeHeader";
import { PlusIcon } from "lucide-react";
import CollectionsSection from "@/src/components/collections/CollectionsSection";

export default function CollectionsPage() {
  return (
    <>
      <HomeHeader topic="collections" showAvatar showArrowLeft={false} />

      <section className="flex h-full flex-col gap-y-4 overflow-y-auto px-6 py-4 md:gap-y-8 md:p-7 lg:gap-y-5">
        <CollectionsSection>
          <Link href="/collections/new" className="flex shrink-0 cursor-pointer flex-col items-center justify-center gap-y-2 rounded-xl border border-soft-lavender py-9.5 md:py-11 lg:py-9 md:gap-y-2.5">
            <PlusIcon className="size-4 text-charcoal-black md:size-6 lg:size-5" />
            <span className="text-xs font-light capitalize text-charcoal-black md:text-base">create collection</span>
          </Link>
        </CollectionsSection>
      </section>
    </>
  );
}
