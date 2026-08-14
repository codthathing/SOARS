import {Avatar, AvatarFallback, AvatarImage} from "@/src/components/ui/avatar";
import {Input} from "@/src/components/ui/input";
import {Button} from "@/src/components/ui/button";
import {Bell} from "lucide-react";
import HomeCategories from "@/src/components/home/HomeCategories";
import HomeSaves from "@/src/components/home/HomeSaves";
import HomeFooter from "@/src/components/home/HomeFooter";

export default function HomePage() {
  return (
    <section className={"flex flex-col h-dvh md:grid md:grid-cols-[25%_75%] bg-light-gray"}>
      <div className={"flex-1 flex flex-col overflow-hidden md:order-2"}>
        <header className={"border-b border-soft-lavender py-4 flex justify-between items-center px-6 md:p-7"}>
          <h1 className={"font-bold capitalize text-base md:text-2xl"}>home</h1>
          <div className={"flex items-center gap-x-4"}>
            <Bell className={"size-4 md:size-6 lg:size-5"} />
            <Avatar>
              <AvatarImage src={"/man-coffee.jpg"} />
              <AvatarFallback>DP</AvatarFallback>
            </Avatar>
          </div>
        </header>
        <section className={"flex flex-col px-6 py-4 gap-y-4 h-full overflow-y-auto md:p-7 md:gap-y-10 lg:gap-y-5"}>
          <div className={"p-4 bg-brownish-amber/20 rounded-lg flex items-center justify-between gap-x-4 md:gap-x-5 md:p-5 lg:p-4 lg:gap-x-4"}>
            <Input className={"bg-white w-full md:text-xl md:p-6 lg:px-4 lg:py-6 lg:text-base"} placeholder={"Paste a link, add a note..."} />
            <Button className={"capitalize bg-brownish-amber md:text-xl md:p-6 lg:text-base lg:px-5"}>+ save</Button>
          </div>
          <HomeCategories />
          <div className={"flex flex-col gap-y-4 md:gap-y-4"}>
            <div className={"flex justify-between capitalize md:text-xl lg:text-base"}>
              <h1 className={"font-bold"}>recent saves</h1>
              <span className={"text-brownish-amber"}>view all</span>
            </div>
            <HomeSaves />
          </div>
        </section>
      </div>
      <HomeFooter />
    </section>
  )
}