"use client";
import { UserResource } from "@/src/lib/db/types";
import ResourceCard from "../common/ResourceCard";

export default function FavoritesSaves() {
  const favorites: UserResource[] = [];

  return <ResourceCard resources={favorites} className="lg:grid-cols-3" />
}