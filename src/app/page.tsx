"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    const timeout = setTimeout(() => {
      router.push("/onboarding/save");
    }, 3000);

    return () => clearTimeout(timeout);
  }, [router]);

  return (
    <div className="flex h-dvh items-center justify-center bg-light-gray">
      <main className="flex flex-col items-center gap-y-0 md:gap-y-4 lg:gap-y-0">
        <Image src={"/app-logo.svg"} alt="App Logo" width={65} height={100} className="w-15 h-40 md:w-27.5 md:h-55 lg:w-17.5 lg:h-47.5" />
        <p className="text-2xl font-sans dark:bg-black md:text-5xl lg:text-3xl">SOARS</p>
      </main>
    </div>
  );
}
