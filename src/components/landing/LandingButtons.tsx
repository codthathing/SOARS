"use client";
import {Button} from "@/src/components/ui/button";
import {useRouter} from "next/navigation";

export default function LandingButtons() {
  const router = useRouter();

  return (
    <div className={"flex gap-x-2.5 md:gap-x-3 lg:gap-x-5"}>
      <Button onClick={() => router.push("/home")} className={"capitalize bg-brownish-amber/50 hover:bg-brownish-amber cursor-pointer text-white text-base p-6 md:text-2xl md:px-3 md:py-8 lg:text-xl lg:px-5 lg:py-6.5"}>get started free</Button>
      <Button variant={"outline"} className={"cursor-pointer capitalize text-base p-6 md:text-2xl md:px-3 md:py-8 lg:text-xl lg:px-5 lg:py-6.5"}>see features</Button>
    </div>
  )
}