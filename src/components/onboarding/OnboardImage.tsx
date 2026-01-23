"use client";

export default function OnboardImage({ presentOnboardingDetail }: { presentOnboardingDetail: { image: string; [key: string]: any } }) {
  return (
    <div style={{ "--before-bg-image": `url('${presentOnboardingDetail.image}')` } as React.CSSProperties & { "--before-bg-image": string }} className={`relative border-[0.5px] border-[rgba(255,255,255,0.5)] rounded-[80px] w-[65%] h-90 mb-6 z-20 after:content-[''] after:absolute after:inset-2 after:border after:border-white after:rounded-[80px] before:content-[''] before:absolute before:inset-4 before:border-[17.5px] before:border-white before:rounded-[80px]`}>
      <style jsx>
        {`
          div::before {
            background-image: var(--before-bg-image);
            background-size: cover;
            background-repeat: no-repeat;
            background-position: center;
          }
        `}
      </style>
    </div>
  );
}
