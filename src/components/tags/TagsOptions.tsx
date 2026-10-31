
"use client";

interface Tag {
  text: string;
  count: number;
}

interface TagsOptionsProps {
  tags: Tag[];
  selectedTag: string;
  onSelect: (tag: string) => void;
}

export default function TagsOptions({
  tags,
  selectedTag,
  onSelect,
}: TagsOptionsProps) {
  return (
    <>
      <div className="flex flex-wrap gap-2.5 rounded-xl bg-white p-4 lg:gap-2.5 lg:p-4">
        {tags.map(({ text, count }) => (
          <button
            type="button"
            key={text}
            onClick={() => onSelect(selectedTag === text ? "" : text)}
            className={`flex cursor-pointer items-center gap-x-0.75 rounded-xl px-2 text-sm md:text-base lg:gap-x-1.5 lg:px-4 lg:py-1 lg:text-sm ${
              text === selectedTag
                ? "bg-brownish-amber font-semibold text-white"
                : "bg-brownish-amber/20 font-light text-brownish-amber"
            }`}
          >
            <span>#{text}</span>
            <span
              className={`rounded-lg px-1 text-xs lg:px-2 lg:text-xs ${
                text === selectedTag
                  ? "bg-soft-lavender/40"
                  : "bg-brownish-amber/15"
              }`}
            >
              {count}
            </span>
          </button>
        ))}

        {tags.length === 0 && (
          <p className="text-sm text-charcoal-black">No tags found.</p>
        )}
      </div>

      {selectedTag && (
        <h1 className="text-base font-semibold first-letter:capitalize lg:text-base">
          Tagged &quot;#{selectedTag}&quot;
        </h1>
      )}
    </>
  );
}
