"use client";
import { useRouter } from "next/navigation";

interface AuthNavigateTextProps {
  text: string;
  link: string;
  className: string
}

export default function AuthNavigateText({ text, link, className }: AuthNavigateTextProps) {
  const router = useRouter();

  return (
    <span className={`capitalize cursor-pointer ${className}`} onClick={() => router.push(link)}>{text}</span>
  )
}