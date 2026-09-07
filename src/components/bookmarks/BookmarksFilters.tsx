"use client";
import { useState } from "react";
import { Badge } from "../ui/badge";

const bookmarkFilters = [
  {id: 0, text: "all"},
  {id: 1, text: "links"},
  {id: 2, text: "files"},
  {id: 3, text: "notes"},
]

export default function BookmarksFilters() {
  const [filterText, setFilterText] = useState("all");

  return <div className="flex gap-x-2.5">{bookmarkFilters.map(({id, text}) => <Badge key={id} onClick={() => setFilterText(text)} className={`${text === filterText ? "bg-brownish-amber text-white" : "bg-brownish-amber/20 text-brownish-amber"} md:text-base capitalize px-4`}>{text}</Badge>)}</div>
}