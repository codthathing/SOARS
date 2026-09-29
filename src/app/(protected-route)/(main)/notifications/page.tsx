import HomeHeader from "@/src/components/home/HomeHeader";
import NotificationsItem from "@/src/components/notifications/NotificationsItem";

export default function page() {
  return (
    <>
      <HomeHeader topic="notifications" showAvatar showArrowLeft={false} />
      <section className={"flex flex-col px-6 py-4 gap-y-4 h-full overflow-y-auto md:p-7 md:gap-y-8 lg:gap-y-5 lg:w-4/5"}>
        <div className="flex justify-between items-center">
          <p className="bg-brownish-amber text-white py-1.25 px-3 md:py-1 lg:px-2.75 capitalize rounded-3xl text-xs md:text-sm">all</p>
          <span className="text-brownish-amber text-xs md:text-sm first-letter:capitalize">mark all read</span>
        </div>
        <NotificationsItem />
      </section>
    </>
  )
}