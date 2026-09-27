import { Globe, RotateCcw, X } from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../ui/card";


const trashDetails = [
  {id: 0, title: "a complete guide to flexbox", description: "css-tricks.com to CSS flexbox layout"},
  {id: 1, title: "a complete guide to flexbox", description: "css-tricks.com to CSS flexbox layout"},
  {id: 2, title: "a complete guide to flexbox", description: "css-tricks.com to CSS flexbox layout"},
  {id: 3, title: "a complete guide to flexbox", description: "css-tricks.com to CSS flexbox layout"},
]


export default function TrashItem() {
  return (
    <div className="flex flex-col gap-y-2.5 md:gap-y-4.5 lg:gap-y-3.5">
      {trashDetails.map(({id, title, description}) => {
        return (
          <Card key={id} className={"flex flex-row items-center border-none shadow-none gap-x-2 md:gap-x-4 p-2.5 md:p-4"}>
            <CardHeader className={"flex items-center justify-end p-0 w-12 h-fit"}>
              <div className={"w-12 h-12 rounded-xl flex items-center justify-center bg-soft-lavender"}><Globe size={16} className={"text-brownish-amber"} /></div>
            </CardHeader>
            <CardContent className={"flex flex-col flex-1 gap-y-0.5 px-0 lg:gap-y-1"}>
              <CardTitle className={"line-clamp-1 capitalize text-sm md:text-lg"}>{title}</CardTitle>
              <CardDescription className={"flex items-center gap-x-1"}>
                <span className={"leading-none md:text-base text-xs lg:text-sm"}>{description}</span>
              </CardDescription>
            </CardContent>
            <CardFooter className="justify-self-end flex items-center gap-x-2 md:gap-x-4 px-0">
              <div className="bg-brownish-amber/10 text-brownish-amber py-1.5 px-2.5 md:px-4 md:py-2 flex items-center gap-x-1 md:gap-x-1.5 rounded-md md:rounded-lg">
                <RotateCcw className="size-3 md:size-4" />
                <span className="text-xs md:text-sm capitalize">restore</span>
              </div>
              <X className="size-3 md:size-4 text-charcoal-black" />
            </CardFooter>
          </Card>
        )
      })}
    </div>
  )
}