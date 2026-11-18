import { useState } from "react";
import { useAppDispatch, addCollection } from "../store/store";
import { useRouter } from "next/navigation";

export const useCreateCollection = () => {
  const [collection, setCollection] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const router = useRouter();
  const dispatch = useAppDispatch();

  const handleCreate = async () => {
    const title = collection.trim();

    if (!title || loading) return;

    try {
      setLoading(true);
      setError("");

      const response = await fetch("/api/collections", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Unable to create collection.");
      }

      dispatch(addCollection(data.collection));      
      router.push("/collections");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return { collection, setCollection, loading, error, handleCreate };
}