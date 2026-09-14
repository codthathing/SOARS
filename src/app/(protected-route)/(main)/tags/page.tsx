import Input from "@/src/components/common/Input";
import HomeHeader from "@/src/components/home/HomeHeader";
import TagsOptions from "@/src/components/tags/TagsOptions";
import TagsSaves from "@/src/components/tags/TagsSaves";

export default function TagsPage() {
  return (
    <>
      <HomeHeader topic="Tags" showAvatar showArrowLeft={false} />
      <section className={"flex flex-col px-6 py-4 gap-y-4 h-full overflow-y-auto md:p-7 md:gap-y-8 lg:gap-y-5"}>
        <Input placeholder="Search or create a tag" />
        <TagsOptions />
        <TagsSaves />
      </section>
    </>
  );
}
