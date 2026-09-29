import { Archive, Bell, Folder, Link, Link2, Star, X } from "lucide-react"
import { Card, CardHeader, CardContent, CardTitle, CardFooter } from "../ui/card"

const ICONS_MAP = {"share": Link2, "star": Star, "folder": Folder, "archive": Archive, "bell": Bell};

type IconName = keyof typeof ICONS_MAP;

const notificationsDetails: {id: number; text: string; icon: IconName; time: string; seen: boolean}[] = [
  {id: 0, text: "ada shared “Design Inspiration” with you", icon: "share", time: "2h", seen: false},
  {id: 1, text: "your saved item reached 100 views", icon: "star", time: "5h", seen: true},
  {id: 2, text: "“dev Resources” collection updated", icon: "folder", time: "1d", seen: true},
  {id: 3, text: "12 items were auto-archived", icon: "archive", time: "2d", seen: false},
  {id: 4, text: "welcome to SOARS Pro trial", icon: "bell", time: "3d", seen: true},
]

export default function NotificationsItem() {
  return (
    <div className="flex flex-col gap-y-2 md:gap-y-4.5 lg:gap-y-3.5">
      {notificationsDetails.map(({id, text, icon, time, seen}) => {
        const Icon = ICONS_MAP[icon];

        return (
          <Card key={id} className={`flex flex-row items-center border-none shadow-none gap-x-2 md:gap-x-4 p-2.5 md:p-4 border border-soft-lavender ${seen ? "bg-white" : "bg-brownish-amber/20"}`}>
            <CardHeader className={"flex items-center justify-end p-0 w-12 h-fit"}>
              <div className={"w-12 h-12 rounded-xl flex items-center justify-center bg-white"}><Icon size={16} className={"text-brownish-amber"} /></div>
            </CardHeader>
            <CardContent className={"flex flex-col flex-1 gap-y-0.5 px-0 lg:gap-y-1"}>
              <CardTitle className={"line-clamp-1 first-letter:capitalize text-sm md:text-lg text-charcoal-black"}>{text}</CardTitle>
            </CardContent>
            <CardFooter className="justify-self-end flex items-center gap-x-2 md:gap-x-4 px-0">
              <span className="text-xs md:text-sm text-charcoal-black">{time} ago</span>
              {!seen && <div className="h-2 w-2 bg-brownish-amber rounded-full" />}
            </CardFooter>
          </Card>
        )
      })}
    </div>
  )
}