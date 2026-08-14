import {Card, CardDescription, CardHeader, CardTitle} from "@/src/components/ui/card";
import {Bookmark, Folder, Star, Archive} from "lucide-react";

type IconName = keyof typeof ICON_MAP;

const ICON_MAP = { "bookmark": Bookmark, "directory": Folder, "star": Star, "archive": Archive };

const categories: { id: number; icon: IconName; count: number; title: string }[] = [
  { id: 0, icon: "bookmark", count: 248, title: "total saves" },
  { id: 1, icon: "directory", count: 12, title: "collections" },
  { id: 3, icon: "star", count: 34, title: "favorites" },
  { id: 2, icon: "archive", count: 57, title: "archives" },
]

export default function HomeCategories() {
  return (
    <div className={"grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-x-2"}>
      {categories.map(({ id, icon, count, title }) => {
        const Icon = ICON_MAP[icon];

        return (
          <Card key={id} className={"flex-1"}>
            <CardHeader className={"w-full flex flex-col md:gap-y-3 lg:gap-y-3.5"}>
              <div className={"w-10 h-10 rounded-xl flex items-center justify-center bg-brownish-amber/20"}><Icon size={18} className={"text-brownish-amber"} /></div>
              <CardTitle className={"md:text-2xl lg:text-xl"}>{count}</CardTitle>
              <CardDescription className={"md:text-base lg:text-base capitalize"}>{title}</CardDescription>
            </CardHeader>
          </Card>
        )
      })}
    </div>
  );
}