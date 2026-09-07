"use client";
import {Archive, Bookmark, Folder, Home, Plus, Search, Settings, Star, Tags, Trash} from "lucide-react";
import {useState} from "react";
import Image from "next/image";
import {Progress} from "@/src/components/ui/progress";
import { usePathname, useRouter } from "next/navigation";

type FooterIconName = keyof typeof FOOTER_ICON_MAP;

const FOOTER_ICON_MAP = { "home": Home, "bookmarks": Bookmark, "search": Search, "settings": Settings, "collections": Folder, "tags": Tags, "favorites": Star, "archive": Archive, "trash": Trash };

const footer: { id: number; text: FooterIconName; path: string; order?: string }[] = [
  { id: 1, text: "home", path: "/home", order: "order-1 md:order-none" },
  { id: 2, text: "bookmarks", path: "/bookmarks", order: "order-2 md:order-none" },
  { id: 4, text: "search", path: "/search", order: "order-4 md:order-none" },
  { id: 5, text: "settings", path: "/settings", order: "order-5 md:order-none" },
  { id: 6, text: "collections", path: "/collections" },
  { id: 7, text: "tags", path: "/tags" },
  { id: 8, text: "favorites", path: "/favorites" },
  { id: 9, text: "archive", path: "/archive" },
  { id: 0, text: "trash", path: "/trash" },
];

export default function HomeFooter() {
  const [showOtherOptions, setShowOtherOptions] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  return (
    <footer className={"bg-stone-50 relative md:order-1 md:py-6 md:px-4 md:flex md:flex-col lg:p-6"}>
      <div className={"md:flex-1 md:flex md:flex-col md:gap-y-10 lg:gap-y-7"}>
        <div className={"hidden md:flex items-center md:gap-x-4"}>
          <Image src={"/app-logo.svg"} alt={"App logo"} width={50} height={100} className={"md:w-5 md:h-10"} />
          <span className={"font-bold uppercase tracking-wider md:text-xl"}>SOARS</span>
        </div>
        <div className={"p-4 flex justify-between items-center md:flex-col md:p-0 md:gap-y-4 md:h-fit lg:gap-y-2"}>
          <div onClick={() => setShowOtherOptions(!showOtherOptions)} className={`cursor-pointer p-2 rounded-lg bg-brownish-amber order-3 shadow-lg relative ${showOtherOptions ? "before:content-[''] before:[clip-path:polygon(50%_0,100%_50%,0_50%)] before:absolute before:left-0 before:right-0 before:mx-auto before:w-10 before:h-10 before:bg-stone-50 before:-top-9" : ""} md:hidden`}><Plus className={`size-8 transition-transform ease-linear duration-100 ${showOtherOptions ? "rotate-45" : ""} text-white font-extrabold`} /></div>
          {footer.map(({ id, text, path, order }) => {
            const Icon = FOOTER_ICON_MAP[text];

            return (
              <div key={id} onClick={() => router.push(path)} className={`cursor-pointer ${(text === "collections" || text === "tags" || text === "favorites" || text === "archive" || text === "trash") ? "hidden md:flex" : "flex"} ${(text === "settings") ? "flex md:hidden" : ""} ${order ? order : ""} flex-col items-center gap-y-0.5 md:flex-row md:py-2.5 md:px-4 md:rounded-lg md:gap-x-2.5 lg:gap-x-2 lg:px-3 md:w-full ${pathname.includes(path) ? "text-brownish-amber md:bg-brownish-amber/20 md:text-brownish-amber" : ""}`}>
                <Icon className={"size-5 md:size-7 lg:size-5"} />
                <span className={"capitalize leading-none text-sm md:text-xl lg:text-sm"}>{text}</span>
              </div>
            );
          })}
        </div>
      </div>
      <section className={"hidden md:flex flex-col gap-y-4"}>
        <div className={"bg-soft-lavender p-2.5 rounded-md flex flex-col gap-y-2.5"}>
          <h1 className={"font-bold text-xl capitalize lg:text-base"}>storage</h1>
          <Progress value={62} className="bg-white" indicatorClassName={"bg-brownish-amber"} />
          <span className={"font-light lg:text-sm"}>6.2 GB of 10GB</span>
        </div>
        <div className={`cursor-pointer flex items-center py-2.5 px-4 rounded-lg gap-x-2.5 w-full`}>
          <Settings className={"size-7"} />
          <span className={"capitalize leading-none text-xl lg:text-base"}>settings</span>
        </div>
      </section>
      {showOtherOptions && <div
        className={"absolute w-[87.5%] p-4 -top-24 bg-white/75 border border-brownish-amber rounded-2xl left-0 right-0 mx-auto flex justify-between md:hidden"}>
        {footer.slice(4, 9).map(({id, text}) => {
          const Icon = FOOTER_ICON_MAP[text];

          return (
            <div key={id} className={`cursor-pointer flex flex-col items-center gap-y-0.5`}>
              <Icon className={"size-5"}/>
              <span className={"capitalize leading-none text-sm"}>{text}</span>
            </div>
          );
        })}
      </div>}
    </footer>
  );
}