import AuthBackIcon from "@/src/components/auth/AuthBackIcon";
import AuthOTP from "@/src/components/auth/AuthOTP";
import AuthOTPVerificationForm from "@/src/components/auth/AuthOTPVerificationForm";
import AuthPageDetails from "@/src/components/auth/AuthPageDetails";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "OTP Verification",
};

export default function Page() {
  return (
    <section className="flex flex-col h-dvh px-6 pt-6 items-center md:gap-y-3 lg:w-[65%] lg:mx-auto lg:gap-y-1">
      <AuthBackIcon />
      <div className="flex w-fit gap-x-2 my-14">
        {[0, 1, 2].map((x) => <div key={x} className={`w-6 border ${x === 1 ? "border-brownish-amber" : "border-soft-lavender"}`} />)}
      </div>
      <AuthPageDetails image="/otp-verification.png" title="enter OTP" text="Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequatur, reiciendis perspiciatis provident." />
      <AuthOTPVerificationForm>
        <AuthOTP />
      </AuthOTPVerificationForm>
      <p className="self-start text-sm text-charcoal-black md:text-xl lg:text-sm">Didn&apos;t get OTP? <span className="capitalize text-brownish-amber">resend OTP</span></p>
    </section>
  );
}
