"use client";
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
    <div className="flex h-dvh items-center justify-center bg-zinc-100 font-sans dark:bg-black">
      {/* S - Saving Files
      O - Organization
      AR - Archiving
      S - Sharing */}
      SOARS
    </div>
  );
}
