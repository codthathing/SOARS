"use client";

import { useEffect } from "react";
import {
  useAppDispatch,
  useAppSelector,
  setSaves,
  Save,
} from "@/src/store/store";
import { setCollectionCount } from "@/src/store/store";

export default function AddResourceHydrator() {
  const dispatch = useAppDispatch();
  const userId = useAppSelector((state) => state.user.id);

  useEffect(() => {
    if (!userId) return;

    const fetchResources = async () => {
      try {
        const response = await fetch("/api/resources", {
          cache: "no-store",
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error || "Unable to fetch resources.");
        }

        const resources: Save[] = data.resources.map(
          (resource: Save) => ({
            ...resource,
            favorite: resource.favorite ?? false,
          })
        );

        dispatch(setSaves(resources));
        dispatch(setCollectionCount(data.collections.length));
      } catch (error) {
        console.error("Resource hydration error:", error);
      }
    };

    fetchResources();
  }, [userId, dispatch]);

  return null;
}