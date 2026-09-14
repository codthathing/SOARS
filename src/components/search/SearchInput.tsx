"use client";
import { useState } from "react";
import Input from "../common/Input";

export default function SearchInput() {
  const [search, setSearch] = useState("");

  return (
    <>
      <Input value={search} setValue={setSearch} placeholder="Search resource name" />
      <div className="flex justify-between">
        <span className={`text-charcoal-black text-sm font-light ${search ? "visible" : "invisible"}`}>24 results for "{search}"</span>
        <span className="text-charcoal-black text-sm font-light capitalize justify-self-end">sort:relevant</span>
      </div>
    </>
  );
}
