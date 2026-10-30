import { Button } from "@/src/components/ui/button";
import HomeCategories from "@/src/components/home/HomeCategories";
import HomeSaves from "@/src/components/home/HomeSaves";
import Link from "next/link";
import HomeHeader from "@/src/components/home/HomeHeader";

export default function HomePage() {
  return (
    <>
      <HomeHeader topic="home" showAvatar={true} showArrowLeft={false} />
      <section className={"flex flex-col px-6 py-4 gap-y-4 h-full overflow-y-auto md:p-7 md:gap-y-10 lg:gap-y-5"}>
        <div className={"p-4 bg-brownish-amber/20 rounded-lgmd:p-5 lg:p-4"}>
          <Link href={"/add-resource/link"}><Button className={"capitalize bg-brownish-amber md:text-xl md:p-6 lg:text-base lg:px-5 w-full hover:bg-brownish-amber cursor-pointer"}>+ add resource</Button></Link>
        </div>
        <HomeCategories />
        <div className={"flex flex-col gap-y-4 md:gap-y-4"}>
          <div className={"flex justify-between capitalize md:text-xl lg:text-base"}>
            <h1 className={"font-bold"}>recent saves</h1>
            <Link className={"text-brownish-amber"} href={"/recent-saves"}>view all</Link>
          </div>
          <HomeSaves />
        </div>
      </section>
    </>
  );
}
