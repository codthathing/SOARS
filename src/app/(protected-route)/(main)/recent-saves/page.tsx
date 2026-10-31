"use client";

import HomeHeader from "@/src/components/home/HomeHeader";
import ResourceCard from "@/src/components/common/ResourceCard";
import { useAppSelector } from "@/src/store/store";

export default function RecentSavesPage() {
  const saves = useAppSelector((state) => state.saves);

  const recentSaves = [...saves]
    .sort(
      (a, b) =>
        new Date(b.created_at ?? 0).getTime() -
        new Date(a.created_at ?? 0).getTime()
    )
    .slice(0, 20);

  return (
    <>
      <HomeHeader
        topic="recent saves"
        showAvatar={false}
        showArrowLeft={true}
      />

      <section className="flex flex-col px-6 py-4 gap-y-4 h-full overflow-y-auto md:p-7 md:gap-y-10 lg:gap-y-5">
        {recentSaves.length > 0 ? (
          <ResourceCard resources={recentSaves} />
        ) : (
          <p className="text-center text-sm text-gray-500">
            You haven't saved any resources yet.
          </p>
        )}
      </section>
    </>
  );
}