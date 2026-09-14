"use client";
import { useState } from "react";
import { Badge } from "../ui/badge";

export default function Filters({ filters }: { filters: {id: number; text: string}[] }) {
  const [filterText, setFilterText] = useState("all");

  return <div className="flex gap-x-2.5">{filters.map(({id, text}) => <Badge key={id} onClick={() => setFilterText(text)} className={`${text === filterText ? "bg-brownish-amber text-white" : "bg-brownish-amber/20 text-brownish-amber"} md:text-base capitalize px-4`}>{text}</Badge>)}</div>
}