
"use client";

import Input from "../common/Input";
import type { Dispatch, SetStateAction } from "react";

interface SearchInputProps {
  value: string;
  setValue: Dispatch<SetStateAction<string>>;
}

export default function SearchInput({
  value,
  setValue,
}: SearchInputProps) {
  return (
    <Input
      value={value}
      setValue={setValue}
      placeholder="Search resource name"
    />
  );
}
