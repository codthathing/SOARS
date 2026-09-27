import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/src/components/ui/card";

export default function SettingsProfile() {
  return (
    <Card className={"flex flex-row items-center border-none shadow-none gap-x-2 md:gap-x-4 p-2.5 md:p-4"}>
      <CardHeader className={"flex items-center justify-end p-0 w-12 h-fit"}>
        <div className={"w-12 h-12 rounded-full flex items-center justify-center bg-brownish-amber/50 text-white"}>A</div>
      </CardHeader>
      <CardContent className={"flex flex-col flex-1 gap-y-0.5 px-0 lg:gap-y-1"}>
        <CardTitle className={"line-clamp-1 capitalize text-sm md:text-lg"}>ada lovelace</CardTitle>
        <CardDescription className={"flex items-center gap-x-1"}>
          <span className={"leading-none md:text-base text-xs lg:text-sm"}>ada@soars.app</span>
        </CardDescription>
      </CardContent>
      <CardFooter className="justify-self-end flex items-center gap-x-2 md:gap-x-4 px-0">
        <div className="bg-brownish-amber/10 text-brownish-amber py-1.5 px-2.5 md:px-4 md:py-2 flex items-center justify-center rounded-md md:rounded-lg">
          <span className="text-xs md:text-sm capitalize">edit</span>
        </div>
      </CardFooter>
    </Card>
  )
}