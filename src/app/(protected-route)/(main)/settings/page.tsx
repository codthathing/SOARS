import HomeHeader from "@/src/components/home/HomeHeader";
import SettingsOptions from "@/src/components/settings/SettingsOptions";
import SettingsProfile from "@/src/components/settings/SettingsProfile";

export default function SettingsPage() {
  return (
    <>
      <HomeHeader topic="Settings" showAvatar showArrowLeft={false} />
      <section className={"flex flex-col px-6 py-4 gap-y-4 h-full overflow-y-auto md:p-7 md:gap-y-8 lg:gap-y-5 lg:w-3/5"}>
        <SettingsProfile />
        <SettingsOptions />
        <span className="text-sm md:text-base lg:text-sm text-deep-red capitalize self-center font-semibold">sign out</span>
      </section>
    </>
  )
}