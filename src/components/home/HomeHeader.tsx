"use client";
import { ArrowLeft, Bell } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { useRouter } from "next/navigation";

export default function HomeHeader({ topic, showAvatar, showArrowLeft }: { topic: string; showAvatar: boolean; showArrowLeft: boolean }) {
  const router = useRouter();

  return (
    <header className={"border-b border-soft-lavender py-4 flex justify-between items-center px-6 md:p-7"}>
      <h1 className={"font-bold capitalize text-base md:text-2xl"}>{topic}</h1>
      {showAvatar && <div className={"flex items-center gap-x-4"}>
        <Bell onClick={() => router.push("/notifications")} className={"size-4 md:size-6 lg:size-5 cursor-pointer"} />
        <Avatar>
          <AvatarImage src={"/man-coffee.jpg"} />
          <AvatarFallback>DP</AvatarFallback>
        </Avatar>
      </div>}
      {showArrowLeft && <ArrowLeft onClick={() => router.back()} className="cursor-pointer" />}
    </header>
  );
}
