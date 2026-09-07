import HomeHeader from "@/src/components/home/HomeHeader";
import { Badge } from "@/src/components/ui/badge";
import { Button } from "@/src/components/ui/button";
import { Card, CardContent, CardTitle, CardDescription } from "@/src/components/ui/card";
import { Globe, Share, Star } from "lucide-react";

const resourceButtons = [
  {id: 0, text: "open", style: "bg-brownish-amber text-white" },
  {id: 1, text: "favorite", style: "bg-brownish-amber/20 text-brownish-amber", Icon: Star },
  {id: 2, text: "share", style: "border border-soft-lavender md:col-start-1 md:col-span-2 lg:col-auto bg-transparent text-charcoal-black", Icon: Share },
]

const resourceDetails = [
  {id: 0, topic: "saved", description: "aug 2, 2026"},
  {id: 1, topic: "collection", description: "dev resources"},
  {id: 2, topic: "size", description: "-"},
  {id: 3, topic: "views", description: "12"},
]

export default function ResourcePage() {
  return (
    <>
      <HomeHeader topic="resource" showAvatar={false} showArrowLeft={true} />
      <section className={"flex flex-col md:flex-row px-6 py-4 gap-y-5 overflow-y-auto md:p-7 md:gap-x-7 h-full md:h-auto"}>
        <div className="md:w-2/4 flex shrink-0 justify-center items-center h-55 md:h-auto md:items-start md:pt-20 rounded-xl bg-soft-lavender"><Globe className="size-15 text-brownish-amber" /></div>
        <div className="md:w-2/4 flex flex-col gap-y-5 md:gap-y-7.5 lg:gap-y-5">
          <Badge className={"bg-brownish-amber/20 text-brownish-amber md:text-base capitalize px-4"}>link</Badge>
          <Card className="bg-transparent border-none shadow-none py-0">
            <CardContent className={"flex flex-col flex-1 gap-y-2 px-0 lg:gap-y-3 bg-none"}>
              <CardTitle className={"line-clamp-1 capitalize md:text-lg"}>a complete guide to flexbox</CardTitle>
              <CardDescription className={"flex items-center gap-x-1"}>
                <Globe className="size-4"/>
                <span className={"leading-none md:text-base lg:text-sm"}>css-tricks.com</span>
              </CardDescription>
            </CardContent>
          </Card>
          <div className="grid grid-cols-3 md:grid-cols-2 lg:grid-cols-3 gap-x-2 md:gap-2.5 lg:gap-x-2">{resourceButtons.map(({id, text, style, Icon}) => <Button key={id} className={`capitalize ${style} flex-1 md:text-xl md:rounded-xl md:py-6 md:px-6 lg:text-base lg:px-5`}>{Icon && <Icon className="size-3 md:size-4.5" />}<span>{text}</span></Button>)}</div>
          <div className="bg-brownish-amber/20 p-4 flex flex-col gap-y-1.5 rounded-xl">
            <h3 className="text-charcoal-black font-semibold first-letter:capitalize text-xs md:text-sm">my notes</h3>
            <p className="text-sm text-charcoal-black md:text-base">Great reference for the align/justify properties — bookmarked for the dashboard rebuild.</p>
          </div>
          <div className="flex flex-col gap-y-2.5">
            <h3 className="text-sm text-charcoal-black capitalize md:text-base">tags</h3>
            <div className={"flex flex-wrap gap-2"}>
              <Badge className={"bg-brownish-amber/20 text-brownish-amber md:text-base px-4"}>#{"dev"}</Badge>
              <Badge className={"bg-brownish-amber/20 text-brownish-amber md:text-base px-4"}>#{"reading"}</Badge>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {resourceDetails.map(({ id, topic, description }) => {
              return (
                <Card key={id} className="py-4">
                  <CardContent className="px-4 flex flex-col gap-y-1.5">
                    <CardTitle className="text-charcoal-black font-light md:text-lg lg:text-sm">{topic}</CardTitle>
                    <CardDescription className="text-charcoal-black font-bold capitalize md:text-lg lg:text-sm">{description}</CardDescription>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </section>
    </>
  )
}