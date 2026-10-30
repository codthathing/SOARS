import HomeHeader from "@/src/components/home/HomeHeader";

export default function page() {
  return (
    <>
      <HomeHeader topic="recent saves" showAvatar={true} showArrowLeft={false} />
      <section className={"flex flex-col px-6 py-4 gap-y-4 h-full overflow-y-auto md:p-7 md:gap-y-10 lg:gap-y-5"}>

      </section>
    </>
  )
}