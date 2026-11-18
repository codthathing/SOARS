"use client";
import HomeHeader from "@/src/components/home/HomeHeader";
import { useSoarsHook } from "@/src/hooks/useSoarsHook";
import SoarsDefaultSection from "@/src/components/soars/SoarsDefaultSection";
import SoarsLoading from "@/src/components/soars/SoarsLoading";
import SoarsError from "@/src/components/soars/SoarsError";
import SoarsMessages from "@/src/components/soars/SoarsMessages";
import SoarsPromptField from "@/src/components/soars/SoarsPromptField";

export default function Page() {
  const { handleSubmit, prompt, setPrompt, messages, error, loading } = useSoarsHook();

  return (
    <>
      <HomeHeader topic="soarsAI" showAvatar={true} showArrowLeft={false} />

      <section className="flex flex-col px-6 py-4 gap-y-4 h-full overflow-y-hidden md:p-7 md:gap-y-10 lg:gap-y-5">
        <div className="flex-1 overflow-y-auto flex flex-col gap-y-5 pb-4">
          <SoarsDefaultSection chatLength={messages.length} setPrompt={setPrompt} />
          <SoarsMessages messages={messages} />
          <SoarsLoading loading={loading} />
          <SoarsError error={error} />
        </div>
        <SoarsPromptField handleSubmit={handleSubmit} prompt={prompt} setPrompt={setPrompt} loading={loading} />
      </section>
    </>
  );
}
