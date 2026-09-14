import Filters from "@/src/components/common/FilterTabs";
import HomeHeader from "@/src/components/home/HomeHeader";
import SearchInput from "@/src/components/search/SearchInput";
import SearchSaves from "@/src/components/search/SearchSaves";

const searchFilters = [
  { id: 0, text: "all" },
  { id: 1, text: "links" },
  { id: 2, text: "files" },
  { id: 3, text: "notes" },
  { id: 4, text: "collections" },
];

export default function SearchPage() {
  return (
    <>
      <HomeHeader topic="search" showAvatar showArrowLeft={false} />
      <section className={"flex flex-col px-6 py-4 gap-y-4 h-full overflow-y-auto md:p-7 md:gap-y-8 lg:gap-y-5"}>
        <SearchInput />
        <Filters filters={searchFilters} />
        <SearchSaves />
      </section>
    </>
  );
}
