"use client";
import { useRouter } from "next/navigation";

export default function AuthButton({ buttonText, buttonLink }: { buttonText: string; buttonLink?: string }) {
  const router = useRouter();

  return <input type="button" value={buttonText} onClick={() => router.push(buttonLink || "")} className="capitalize text-white shadow-[0_4px_9px_rgba(0,0,0,0.25)] bg-brownish-amber text-base w-full border-none outline-none py-3 rounded-md" />;
}
