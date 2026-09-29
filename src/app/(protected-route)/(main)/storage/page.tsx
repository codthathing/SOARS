import HomeHeader from "@/src/components/home/HomeHeader";
import StoragePricingCard from "@/src/components/storage/StoragePricingCard";
import { Progress } from "@/src/components/ui/progress";

const storageDetails = [
  {id: 0, style: "bg-brownish-amber/50", text: "files", size: 4.1},
  {id: 1, style: "bg-brownish-amber/20", text: "notes", size: 1.3},
  {id: 2, style: "bg-soft-lavender", text: "other", size: 0.8},
]

export default function StoragePage() {
  return (
    <>
      <HomeHeader topic="storage & plans" showAvatar showArrowLeft={false} />
      <section className={"flex flex-col px-6 py-4 gap-y-4 h-full overflow-y-auto md:p-7 md:gap-y-8 lg:gap-y-5"}>
        <div className={"bg-white p-3 lg:p-3 rounded-md flex flex-col gap-y-3 lg:gap-y-3"}>
          <div className="flex justify-between">
            <h1 className={"font-bold text-lg capitalize lg:text-base"}>storage</h1>
            <span className={"text-charcoal-black text-xs lg:text-sm"}>6.2 GB of 10GB</span>
          </div>
          <Progress value={62} className="bg-soft-lavender/50" indicatorClassName={"bg-brownish-amber"} />
          <div className="flex gap-x-4 lg:gap-x-5">{storageDetails.map(({id, style, text, size}) => <div key={id} className="flex items-center gap-x-1.5 lg:gap-x-1"><div className={`w-2.5 h-2.5 lg:w-3 lg:h-3 rounded-full ${style}`}/><span className="text-charcoal-black capitalize text-xs md:text-base lg:text-sm">{text} {size} GB</span></div>)}</div>
        </div>
        <StoragePricingCard />
      </section>
    </>
  );
}
