import OnboardImage from "@/src/components/onboarding/OnboardImage";
import OnboardingButtons from "@/src/components/onboarding/OnboardingButtons";
import Image from "next/image";

const onboardingDetails: { id: number; image: string; topic: string; text: string }[] = [
  { id: 0, image: "/assets/laptop_subimp.jpg", topic: "Save your course links", text: "Quickly store important links for easy access anytime." },
  { id: 1, image: "/assets/laptop_subimp.jpg", topic: "Organize with clarity", text: "Categorize links neatly, keeping your learning resources well-structured." },
  { id: 2, image: "/assets/laptop_subimp.jpg", topic: "Archive for later", text: "Safely archive old links, revisit whenever knowledge is needed." },
  { id: 3, image: "/assets/laptop_subimp.jpg", topic: "Share effortlessly", text: "Easily share saved resources with friends, classmates, or colleagues." },
];

export function generateStaticParams() {
  return onboardingDetails.map(({ id }) => ({ id: id.toString() }));
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const detail = onboardingDetails.find(({ id: index }) => Number(id) === index);

  return { title: detail?.topic, description: detail?.text };
}

function getPresentDetail(no: number) {
  const onboardingDetail = onboardingDetails.find(({ id }) => id === no);

  if (!onboardingDetail) {
    throw new Error(`Onboarding detail with ID ${no} not found`);
  }

  return onboardingDetail;
}

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const index = Number((await params).id);
  const presentOnboardingDetail = getPresentDetail(index);

  return (
    <section className="h-screen grid grid-cols-1 grid-rows-[65%_35%] relative">
      <div className="relative flex justify-center items-end after:content-[''] after:absolute after:left-0 after:bottom-0 after:z-10 after:w-full after:shadow-[0_20px_100px_200px_white]">
        <Image className="inset-0 w-full h-full absolute bg-cover" src={presentOnboardingDetail.image} alt="Onboarding Immage" width={75} height={100} />
        <OnboardImage presentOnboardingDetail={presentOnboardingDetail} />
      </div>
      <div className="z-30 flex flex-col justify-between px-6">
        <article className="text-center flex flex-col gap-y-2">
          <h1 className="font-bold text-xl capitalize">{presentOnboardingDetail.topic}</h1>
          <p>{presentOnboardingDetail.text}</p>
        </article>
        <OnboardingButtons currentIndex={index} />
      </div>
    </section>
  );
}
