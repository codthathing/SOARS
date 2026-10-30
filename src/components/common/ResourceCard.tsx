import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/src/components/ui/card";
import { Globe, LinkIcon, MoreVertical, NotepadText, Star, File } from "lucide-react";
import { Badge } from "@/src/components/ui/badge";
import { useRouter } from "next/navigation";
import ResourceCardOption from "./ResourceCardOption";

const SAVES_ICON_MAP = { link: LinkIcon, file: File, note: NotepadText };

type SavesIconName = "link" | "file" | "note";

interface ResourceCardInterface {
  resources: {
    id: number;
    type: SavesIconName;
    url?: string;
    size?: string;
    edited?: string;
    title: string;
    favorite: boolean;
    tags: string[];
  }[];
  className?: string;
}

export default function ResourceCard({ resources, className }: ResourceCardInterface) {
  const router = useRouter();

  return (
    <div className={`flex flex-col gap-y-4 md:grid md:grid-cols-2 ${className} md:gap-2`}>
      {resources.map(({ id, type, url, size, title, favorite, tags }) => {
        const Icon = SAVES_ICON_MAP[type];

        return (
          <Card key={id} className={"flex flex-row gap-x-3 lg:gap-x-4"}>
            <CardHeader className={"flex items-center justify-end p-0 w-14 h-fit"}>
              <div className={"w-10 h-10 rounded-xl flex items-center justify-center bg-soft-lavender"}>
                <Icon size={16} className={"text-brownish-amber"} />
              </div>
            </CardHeader>
            <CardContent onClick={() => router.push(`/resources/1`)} className={"flex cursor-pointer flex-col flex-1 gap-y-2 px-0 lg:gap-y-3"}>
              <CardTitle className={"line-clamp-1 capitalize md:text-base"}>{title}</CardTitle>
              <CardDescription className={"flex items-center gap-x-1"}>
                <Globe size={14} />
                <span className={"leading-none md:text-xs lg:text-sm"}>
                  {type === "link" && `${url}`}
                  {type === "file" && `${size} · PDF`}
                  {type === "note" && `Note`}
                  {/* {edited && `Note · edited ${edited} ago`} */}
                </span>
              </CardDescription>
              <div className={"flex flex-wrap gap-2"}>
                {tags.map((tag) => (
                  <Badge key={tag} className={"bg-brownish-amber/20 text-brownish-amber md:text-xs lg:text-sm"}>#{tag}</Badge>
                ))}
              </div>
            </CardContent>
            <ResourceCardOption type={type} />
          </Card>
        );
      })}
    </div>
  );
}
