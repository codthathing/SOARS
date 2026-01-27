"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function OnboardingButtons({ currentIndex }: { currentIndex: number }) {
  const router = useRouter();

  return (
    <section className="flex justify-between mb-6 items-center">
      <span className="cursor-pointer text-brownish-amber text-sm" onClick={() => router.push("/sign-in")}>Skip</span>
      <div className="flex gap-x-1">
        {[0, 1, 2, 3].map((x) => (
          <div key={x} className={`w-2 h-2 rounded-full ${x === currentIndex ? "bg-brownish-amber" : "bg-soft-lavender"}`} />
        ))}
      </div>
      <span
        onClick={() => {
          if (currentIndex < 3) {            
            router.push(`/onboarding/${currentIndex + 1}`);
          } else {
            router.push("/sign-in");
          }
        }}
        className="font-bold text-sm text-brownish-amber cursor-pointer"
      >
        {currentIndex < 3 ? "Next" : "Login"}
      </span>
    </section>
  );
}
