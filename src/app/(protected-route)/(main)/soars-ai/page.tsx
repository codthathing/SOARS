import HomeHeader from "@/src/components/home/HomeHeader";
import { Button } from "@/src/components/ui/button";

export default function page() {
  return (
    <>
      <HomeHeader topic="soarsAI" showAvatar={true} showArrowLeft={false} />
      <section className={"flex flex-col px-6 py-4 gap-y-4 h-full overflow-y-hidden md:p-7 md:gap-y-10 lg:gap-y-5"}>
        <div className="flex-1 overflow-y-auto"></div>
        <div className="bg-white w-full rounded-2xl p-4 flex items-center gap-x-4">
          <input type="text" className="bg-soft-lavender/20 border border-charcoal-black rounded-lg p-2 w-full" placeholder="Enter chat" />
          <Button className="bg-brownish-amber text-white text-sm capitalize">enter</Button>
        </div>
      </section>
    </>
  )
}