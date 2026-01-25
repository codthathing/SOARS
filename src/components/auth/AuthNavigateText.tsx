"use client";
import { useRouter } from "next/navigation";

export default function AuthNavigateText({ text, link, className }: { text: string; link: string; className: string }) {
  const router = useRouter();

  return (
    <span className={`capitalize cursor-pointer ${className}`} onClick={() => router.push(link)}>{text}</span>
  )
}