"use client";

import { useAppSelector } from "@/src/store/store";
import ResourceCard from "../common/ResourceCard";

export default function HomeSaves() {
  const saves = useAppSelector((state) => state.saves);

  const recentSaves = [...saves]
    .sort(
      (a, b) =>
        new Date(b.created_at ?? 0).getTime() -
        new Date(a.created_at ?? 0).getTime()
    )
    .slice(0, 6);

  return <ResourceCard resources={recentSaves} />;
}