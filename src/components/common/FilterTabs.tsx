
"use client";

import { Badge } from "../ui/badge";

interface Filter {
  id: number;
  text: string;
}

interface FiltersProps {
  filters: Filter[];
  value: string;
  onChange: (value: string) => void;
}

export default function Filters({
  filters,
  value,
  onChange,
}: FiltersProps) {
  return (
    <div className="flex flex-wrap gap-2.5">
      {filters.map(({ id, text }) => (
        <Badge
          key={id}
          onClick={() => onChange(text)}
          className={`cursor-pointer px-4 capitalize md:text-base ${
            text === value
              ? "bg-brownish-amber text-white"
              : "bg-brownish-amber/20 text-brownish-amber"
          }`}
        >
          {text}
        </Badge>
      ))}
    </div>
  );
}
