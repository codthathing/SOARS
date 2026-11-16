"use client";
import { selectAllResources, useAppSelector } from "@/src/store/store";
import ResourceCard from "../common/ResourceCard";

export default function HomeSaves() {
  const resources = useAppSelector(selectAllResources);

  const recentSaves = [...resources].sort((a, b) => new Date(b.created_at ?? 0).getTime() - new Date(a.created_at ?? 0).getTime()).slice(0, 6);

  return <ResourceCard resources={recentSaves} />;
}
