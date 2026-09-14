"use client";
import { useState } from "react";

const tags = [
  { id: 0, text: "design", count: 42 },
  { id: 1, text: "dev", count: 38 },
  { id: 2, text: "reading", count: 27 },
  { id: 3, text: "work", count: 24 },
  { id: 4, text: "ideas", count: 19 },
  { id: 5, text: "learning", count: 16 },
  { id: 6, text: "finance", count: 11 },
  { id: 7, text: "travel", count: 8 },
];

export default function TagsOptions() {
  const [currentFilterOption, setCurrentFilterOption] = useState("design");

  return (
    <>
      <div className="rounded-xl bg-white p-4 flex flex-wrap gap-2.5 lg:gap-2.5 lg:p-4">
        {tags.map(({ id, text, count }) => (
          <div key={id} className={`text-sm md:text-base lg:text-sm px-2 lg:px-4 lg:py-1 flex items-center gap-x-0.75 lg:gap-x-1.5 rounded-xl ${text === currentFilterOption ? "bg-brownish-amber text-white font-semibold" : "bg-brownish-amber/20 text-brownish-amber font-light"}`} onClick={() => setCurrentFilterOption(text)}>
            <span>#{text}</span>
            <span className={`px-1 text-xs lg:px-2 rounded-lg lg:text-xs ${text === currentFilterOption ? "bg-soft-lavender/40" : "bg-brownish-amber/15"}`}>{count}</span>
          </div>
        ))}
      </div>
      <h1 className="text-base lg:text-base font-semibold first-letter:capitalize">tagged "#{currentFilterOption}"</h1>
    </>
  );
}
