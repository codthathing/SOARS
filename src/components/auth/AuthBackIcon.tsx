"use client";
import { ArrowLeftIcon } from "lucide-react";
import { useRouter } from "next/navigation";

export default function AuthBackIcon() {
  const router = useRouter();

  return <ArrowLeftIcon onClick={() => router.back()} className="w-4.5 self-start" />;
}
