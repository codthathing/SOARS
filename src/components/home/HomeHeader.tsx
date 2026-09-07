import { Bell } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

export default function HomeHeader({ topic }: { topic: string }) {
  return (
    <header className={"border-b border-soft-lavender py-4 flex justify-between items-center px-6 md:p-7"}>
      <h1 className={"font-bold capitalize text-base md:text-2xl"}>{topic}</h1>
      <div className={"flex items-center gap-x-4"}>
        <Bell className={"size-4 md:size-6 lg:size-5"} />
        <Avatar>
          <AvatarImage src={"/man-coffee.jpg"} />
          <AvatarFallback>DP</AvatarFallback>
        </Avatar>
      </div>
    </header>
  );
}
