import AddResourceTypesButtons from "@/src/components/add-resource/AddResourceTypesButtons";
import HomeHeader from "@/src/components/home/HomeHeader";
import { Badge } from "@/src/components/ui/badge";
import { Button } from "@/src/components/ui/button";
import { Card, CardHeader, CardContent, CardTitle, CardDescription } from "@/src/components/ui/card";
import { Check, Globe, Icon, LinkIcon } from "lucide-react";

export default function AddResourcePage() {
  return (
    <>
      <HomeHeader topic="add resource" showAvatar={true} showArrowLeft={false} />
      <section className={"flex flex-col px-6 py-4 gap-y-4 h-full overflow-y-auto md:p-7 md:gap-y-10 lg:gap-y-5 lg:w-4/5 mx-auto"}>
        <AddResourceTypesButtons />
        <div className="bg-soft-lavender/30 p-4 rounded-lg flex gap-x-4 items-center md:p-5 md:rounded-xl">
          <LinkIcon className="text-charcoal-black/90 size-4 md:size-5" />
          <span className="text-sm text-charcoal-black md:text-xl">https://css-tricks.com/complete-guide-flexbox</span>
        </div>
        <div className="flex flex-col gap-y-2.5 bg-white rounded-xl py-4 px-5">
          <p className="text-xs md:text-base first-letter:capitalize text-charcoal-black">auto-generated preview</p>
          <Card className={"flex flex-row items-center border-none shadow-none gap-x-3 lg:gap-x-4 p-0"}>
            <CardHeader className={"flex items-center justify-end p-0 w-12 h-fit"}>
              <div className={"w-12 h-12 rounded-xl flex items-center justify-center bg-soft-lavender"}><Globe size={16} className={"text-brownish-amber"} /></div>
            </CardHeader>
            <CardContent className={"flex flex-col flex-1 gap-y-1 px-0 lg:gap-y-3"}>
              <CardTitle className={"line-clamp-1 capitalize md:text-lg"}>a complete guide to flexbox</CardTitle>
              <CardDescription className={"flex items-center gap-x-1"}>
                <span className={"leading-none md:text-base lg:text-sm"}>css-tricks.com · Our comprehensive guide to CSS flexbox layout</span>
              </CardDescription>
            </CardContent>
          </Card>
        </div>
        <input type="text" className="outline-none bg-soft-lavender/30 text-charcoal-black p-4 md:p-5 rounded-lg md:rounded-xl text-sm md:text-xl" placeholder="Add a note (optional)" />
        <div className="flex flex-col gap-y-2.5">
          <h3 className="text-sm text-charcoal-black capitalize md:text-base">tags</h3>
          <div className={"flex flex-wrap gap-2"}>
            <Badge className={"bg-brownish-amber/20 text-brownish-amber md:text-base"}>#{"dev"}</Badge>
            <Badge className={"bg-brownish-amber/20 text-brownish-amber md:text-base"}>#{"reading"}</Badge>
          </div>
        </div>
        <Button className={"w-full flex items-center gap-x-1 md:gap-x-2.5 capitalize bg-brownish-amber/50 hover:bg-brownish-amber cursor-pointer text-white text-base p-6 md:text-2xl md:px-3 md:py-8 lg:text-xl lg:px-5 lg:py-6.5"}><Check className="size-4 md:size-5.5"/> <span>save resource</span></Button>
      </section>
    </>
  )
}