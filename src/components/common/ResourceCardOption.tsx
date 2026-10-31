
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { MoreVertical } from "lucide-react";
import { CardFooter } from "../ui/card";
import type { Save } from "@/src/store/store";

interface ResourceCardOptionProps {
  id: string;
  type: Save["type"];
  url?: string;
}

export default function ResourceCardOption({
  id,
  type,
  url,
}: ResourceCardOptionProps) {
  const [showOptions, setShowOptions] = useState(false);
  const router = useRouter();

  const handleOpen = () => {
    if (!url) return;

    window.open(url, "_blank", "noopener,noreferrer");
    setShowOptions(false);
  };

  const handleView = () => {
    if (type === "file") {
      window.open(`/api/resources/${id}/file`, "_blank");
    } else {
      router.push(`/resources/${id}`);
    }

    setShowOptions(false);
  };

  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = `/api/resources/${id}/file?download=1`;
    link.download = "";
    document.body.appendChild(link);
    link.click();
    link.remove();

    setShowOptions(false);
  };

  return (
    <CardFooter className="relative h-fit md:w-5 md:p-0 lg:w-7">
      <button
        type="button"
        aria-label="Resource options"
        aria-expanded={showOptions}
        onClick={() => setShowOptions((prev) => !prev)}
        className="cursor-pointer rounded-md p-1 hover:bg-soft-lavender"
      >
        <MoreVertical className="size-3 lg:size-4" />
      </button>

      {showOptions && (
        <>
          <button
            type="button"
            aria-label="Close resource options"
            className="fixed inset-0 z-10 cursor-default"
            onClick={() => setShowOptions(false)}
          />

          <div className="absolute right-4.5 top-7 z-20 flex min-w-28 flex-col gap-y-2 rounded-lg border border-soft-lavender bg-white px-4 py-2.5 text-sm shadow-md">
            {type === "link" && (
              <button
                type="button"
                onClick={handleOpen}
                disabled={!url}
                className="cursor-pointer text-left capitalize disabled:cursor-not-allowed disabled:opacity-40"
              >
                Open
              </button>
            )}

            {(type === "file" || type === "note") && (
              <button
                type="button"
                onClick={handleView}
                className="cursor-pointer text-left capitalize"
              >
                View
              </button>
            )}

            {type === "file" && (
              <button
                type="button"
                onClick={handleDownload}
                className="cursor-pointer border-t border-soft-lavender pt-2 text-left capitalize"
              >
                Download
              </button>
            )}
          </div>
        </>
      )}
    </CardFooter>
  );
}
