"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { MoreVertical } from "lucide-react";
import { CardFooter } from "../ui/card";
import { UserResource } from "@/src/lib/db/types";
import { useResourceOptions } from "@/src/hooks/useResourceOptions";

interface ResourceCardOptionProps {
  id: string;
  type: UserResource["type"];
  url?: string;
}

export default function ResourceCardOption({ id, type, url }: ResourceCardOptionProps) {
  const { handleOpen, handleView, handleDownload, showOptions, setShowOptions, handleAction } = useResourceOptions();

  return (
    <CardFooter className="relative h-fit md:w-5 md:p-0 lg:w-7 shrink-0">
      <button type="button" aria-label="Resource options" aria-expanded={showOptions} onClick={() => setShowOptions((prev) => !prev)} className="cursor-pointer rounded-md p-1 hover:bg-soft-lavender">
        <MoreVertical className="size-3 lg:size-4" />
      </button>

      {showOptions && (
        <>
          <button type="button" aria-label="Close resource options" className="fixed inset-0 z-10 cursor-default" onClick={() => setShowOptions(false)} />
          <div className="absolute right-4.5 top-7 z-20 flex min-w-28 flex-col gap-y-2 rounded-lg border border-soft-lavender bg-white px-4 py-2.5 text-sm shadow-md">
            {type === "link" && (<button type="button" onClick={() => handleAction(() => handleOpen(url))} disabled={!url} className="cursor-pointer text-left capitalize disabled:cursor-not-allowed disabled:opacity-40">Open</button>)}
            {(type === "file" || type === "note") && (<button type="button" onClick={() => handleAction(() => handleView(type, id))} className="cursor-pointer text-left capitalize">View</button>)}
            {type === "file" && (<button type="button" onClick={() => handleAction(() => handleDownload(id))} className="cursor-pointer border-t border-soft-lavender pt-2 text-left capitalize">Download</button>)}
          </div>
        </>
      )}
    </CardFooter>
  );
}
