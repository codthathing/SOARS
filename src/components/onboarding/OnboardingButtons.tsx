"use client";
import { useRouter } from "next/navigation";

interface OnboardingButtonsProps {
  title: string;
  details: {
    id: number;
    image: string;
    title: string;
    topic: string;
    text: string
  }[]
}

export default function OnboardingButtons({ title, details }: OnboardingButtonsProps) {
  const router = useRouter();
  const { id: index } = details.find(x => x.title === title)!;

  return (
    <section className="flex justify-between mb-6 items-center">
      <span className="cursor-pointer text-brownish-amber text-sm md:text-xl lg:text-base" onClick={() => router.push("/sign-in")}>Skip</span>
      <div className="flex gap-x-1">
        {[0, 1, 2, 3].map((x) => (
          <div key={x} className={`w-2 h-2 rounded-full ${x === index ? "bg-brownish-amber" : "bg-soft-lavender"}`} />
        ))}
      </div>
      <span
        onClick={() => {
          if (index < 3) {
            router.push(`/onboarding/${details.find(x => x.id === index + 1)?.title}`);
          } else {
            router.push("/sign-in");
          }
        }}
        className="font-bold text-sm text-brownish-amber cursor-pointer md:text-xl lg:text-base"
      >
        {index < 3 ? "Next" : "Login"}
      </span>
    </section>
  );
}
