"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    const timeout = setTimeout(() => {
      router.push("/sign-in");
    }, 3000);

    return () => clearTimeout(timeout);
  }, []);

  return (
    <div className="flex h-dvh items-center justify-center bg-zinc-100">
      <main className="flex flex-col items-center gap-y-0">
        <Image src={"/assets/app-logo.svg"} alt="App Logo" width={65} height={100} className="w-15 h-40" />
        <p className="text-2xl font-sans dark:bg-black">SOARS</p>
      </main>
    </div>
  );
}
