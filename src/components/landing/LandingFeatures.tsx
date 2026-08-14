import {Card, CardDescription, CardHeader, CardTitle} from "@/src/components/ui/card";
import {Archive, Bookmark, Folder, Share} from "lucide-react";

type IconName = keyof typeof ICON_MAP;

const ICON_MAP = { "bookmark": Bookmark, "directory": Folder, "archive": Archive, "share": Share };

const features: { id: number; icon: IconName; title: string; description: string }[] = [
  { id: 0, icon: "bookmark", title: "Save anything", description: "Link, files, and notes captured in one tap." },
  { id: 1, icon: "directory", title: "Organize clearly", description: "Collections and tags keep everything findable." },
  { id: 2, icon: "archive", title: "Archive for later", description: "Tuck away resources without losing them." },
  { id: 3, icon: "share", title: "Share effortlessly", description: "Send public links to friends and teammates." },
]

export default function LandingFeatures() {
  return (
    <section className={"flex flex-col gap-y-4 mt-8 px-6 mb-4 md:flex-row md:gap-x-4 md:mt-30 lg:mt-25 lg:px-10 lg:gap-x-6"}>
      {features.map(({ id, icon, title, description }) => {
        const Icon = ICON_MAP[icon];

        return (
          <Card key={id} className={"flex-1"}>
            <CardHeader className={"w-full flex flex-col md:gap-y-5 lg:gap-y-3.5"}>
              <div className={"w-10 h-10 rounded-xl flex items-center justify-center bg-amber-200"}><Icon size={18} className={"text-brownish-amber"} /></div>
              <CardTitle className={"md:text-2xl lg:text-xl"}>{title}</CardTitle>
              <CardDescription className={"md:text-xl lg:text-base"}>{description}</CardDescription>
            </CardHeader>
          </Card>
        )
      })}
    </section>
  )
}