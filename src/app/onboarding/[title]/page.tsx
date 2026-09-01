import OnboardImage from "@/src/components/onboarding/OnboardImage";
import OnboardingButtons from "@/src/components/onboarding/OnboardingButtons";
import Image from "next/image";
import {Metadata} from "next";

const onboardingDetails: { id: number; image: string; title: string; topic: string; text: string }[] = [
  { id: 0, image: "/save-image.png", title: "save", topic: "Save your course links", text: "Quickly store important links for easy access anytime." },
  { id: 1, image: "/organize-image.png", title: "organize", topic: "Organize with clarity", text: "Categorize links neatly, keeping your learning resources well-structured." },
  { id: 2, image: "/archive-image.png", title: "archive", topic: "Archive for later", text: "Safely archive old links, revisit whenever knowledge is needed." },
  { id: 3, image: "/share-image.png", title: "share", topic: "Share effortlessly", text: "Easily share saved resources with friends, classmates, or colleagues." },
];

export function generateStaticParams() {
  return onboardingDetails.map(({ title }) => ({ title }));
}

export async function generateMetadata({params}: { params: Promise<{ title: string }> }): Promise<Metadata> {
  const { title } = await params;
  const detail = onboardingDetails.find(({title: text}) =>text === title);

  return {title: detail?.topic, description: detail?.text};
}

function getPresentDetail(titleText: string) {
  const onboardingDetail = onboardingDetails.find(({ title }) => title === titleText);

  if (!onboardingDetail) {
    throw new Error(`Onboarding detail with Title ${titleText} not found`);
  }

  return onboardingDetail;
}

export default async function Page({ params }: { params: Promise<{ title: string }> }) {
  const { title } = await params;
  const presentOnboardingDetail = getPresentDetail(title);

  return (
    <section className="h-full grid grid-cols-1 grid-rows-[65%_35%] relative">
      <div className="relative flex justify-center items-end after:content-[''] after:absolute after:left-0 after:bottom-0 after:z-10 after:w-full after:shadow-[0_20px_100px_200px_white]">
        <Image className="inset-0 w-full h-full absolute bg-cover" src={presentOnboardingDetail.image} alt="Onboarding Immage" width={75} height={100} />
        <OnboardImage presentOnboardingDetail={presentOnboardingDetail} />
      </div>
      <div className="z-30 flex flex-col justify-between px-6">
        <article className="text-center flex flex-col gap-y-2">
          <h1 className="font-bold text-xl capitalize text-brownish-amber md:text-2xl">{presentOnboardingDetail.topic}</h1>
          <p className="text-sm text-charcoal-black md:text-base">{presentOnboardingDetail.text}</p>
        </article>
        <OnboardingButtons title={title} details={onboardingDetails} />
      </div>
    </section>
  );
}
