"use client";
import ResourceCard from "../common/ResourceCard";
import { UserResource } from "@/src/lib/db/types";

export default function ArchiveSaves() {
  const archives: UserResource[] = [];

  return <ResourceCard resources={archives} className="lg:grid-cols-3" />
}