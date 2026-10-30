"use client";

import { MoreVertical } from "lucide-react";
import { CardFooter } from "../ui/card";
import { useState } from "react";

export default function ResourceCardOption({ type }: { type: string }) {
  const [showOptions, setShowOptions] = useState(false);

  return (
    <CardFooter className={"h-fit md:w-5 md:p-0 lg:w-7 relative"}>
      {/* {favorite ? 
                <Star fill={"currentColor"} className={"size-3 text-brownish-amber lg:size-4"} /> :  */}
      <MoreVertical className={"size-3 lg:size-4 cursor-pointer"} onClick={() => setShowOptions((prev) => !prev)} />
      {showOptions && <div className="bg-white border border-black flex flex-col gap-y-2 divide-y divide-black px-4 py-2.5 absolute top-5 right-4.5">
        {(type === "file" || type === "note") && <span className={`cursor-pointer ${type === "file" ? "pb-2" : ""}`}>View</span>}
        {type === "link" && <span className="cursor-pointer">Open</span>}
        {type === "file" && <span className="cursor-pointer">Download</span>}
      </div>}
      {/* } */}
    </CardFooter>
  );
}
