"use client";
import { UserResource } from "@/src/lib/db/types";
import ResourceCard from "../common/ResourceCard";


export default function BookmarksSaves() {
  const bookmarks: UserResource[] = [];

  return <ResourceCard resources={bookmarks} className="lg:grid-cols-3" />
}