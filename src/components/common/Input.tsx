import { SearchIcon } from "lucide-react";
import { Dispatch, SetStateAction } from "react";

export default function Input({ value, setValue, placeholder } : {value?: string; setValue?: Dispatch<SetStateAction<string>>; placeholder: string }) {
  return (
    <div className="w-full flex items-center gap-x-4 md:gap-x-5 lg:gap-x-3.5 bg-soft-lavender/30 text-charcoal-black px-4 py-2.5 md:px-5 md:py-3.5 rounded-lg md:rounded-xl text-sm md:text-xl lg:text-lg">
      <SearchIcon className="size-4 md:size-5 text-charcoal-black/50" />
      <input type="text" className="outline-none bg-transparent flex-1" {...((value !== undefined && setValue !== undefined) && ({ value: value, onChange: (e) => setValue(e.target.value) }))} placeholder={placeholder} />
    </div>
  );
}
