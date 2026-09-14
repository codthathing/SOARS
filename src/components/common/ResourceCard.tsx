import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/src/components/ui/card";
import { Globe, LinkIcon, MoreVertical, NotepadText, Star, File } from "lucide-react";
import { Badge } from "@/src/components/ui/badge";
import { useRouter } from "next/navigation";

const SAVES_ICON_MAP = { link: LinkIcon, file: File, note: NotepadText };

type SavesIconName = "link" | "file" | "note";

interface ResourceCardInterface {
  resources: {
    id: number;
    type: SavesIconName;
    link?: string;
    size?: string;
    edited?: string;
    title: string;
    favorite: boolean;
    tags: string[];
  }[];
  className?: string;
  path?: string;
  navigate?: boolean;
}

export default function ResourceCard({ resources, className, path, navigate = false }: ResourceCardInterface) {
  const router = useRouter();

  return (
    <div className={`flex flex-col gap-y-4 md:grid md:grid-cols-2 ${className} md:gap-2`}>
      {resources.map(({ id, type, link, size, edited, title, favorite, tags }) => {
        const Icon = SAVES_ICON_MAP[type];

        return (
          <Card key={id} {...(navigate && ({ onClick: () => router.push(`/${path}/${id}`) }))} className={"flex flex-row gap-x-3 lg:gap-x-4"}>
            <CardHeader className={"flex items-center justify-end p-0 w-14 h-fit"}>
              <div className={"w-10 h-10 rounded-xl flex items-center justify-center bg-soft-lavender"}>
                <Icon size={16} className={"text-brownish-amber"} />
              </div>
            </CardHeader>
            <CardContent className={"flex flex-col flex-1 gap-y-2 px-0 lg:gap-y-3"}>
              <CardTitle className={"line-clamp-1 capitalize md:text-base"}>{title}</CardTitle>
              <CardDescription className={"flex items-center gap-x-1"}>
                <Globe size={14} />
                <span className={"leading-none md:text-xs lg:text-sm"}>
                  {link && `${link}.com`}
                  {size && `${size} · PDF`}
                  {edited && `Note · edited ${edited} ago`}
                </span>
              </CardDescription>
              <div className={"flex flex-wrap gap-2"}>
                {tags.map((tag) => (
                  <Badge key={tag} className={"bg-brownish-amber/20 text-brownish-amber md:text-xs lg:text-sm"}>#{tag}</Badge>
                ))}
              </div>
            </CardContent>
            <CardFooter className={"h-fit md:w-5 md:p-0 lg:w-7"}>{favorite ? <Star fill={"currentColor"} className={"size-3 text-brownish-amber lg:size-4"} /> : <MoreVertical className={"size-3 lg:size-4"} />}</CardFooter>
          </Card>
        );
      })}
    </div>
  );
}
