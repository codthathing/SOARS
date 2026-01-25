import AuthBackIcon from "@/src/components/auth/AuthBackIcon";
import AuthForm from "@/src/components/auth/AuthForm";
import AuthOTP from "@/src/components/auth/AuthOTP";
import AuthPageDetails from "@/src/components/auth/AuthPageDetails";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "OTP Verification",
};

export default function Page() {
  return (
    <section className="flex flex-col h-screen px-6 pt-6 items-center">
      <AuthBackIcon />
      <div className="flex w-fit gap-x-2 my-14">
        {[0, 1, 2].map((x) => (
          <div key={x} className={`w-6 border ${x === 1 ? "border-brownish-amber" : "border-soft-lavender"}`} />
        ))}
      </div>
      <AuthPageDetails image="/assets/laptop_subimp.jpg" title="enter OTP" text="Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequatur, reiciendis perspiciatis provident." />
      <AuthForm buttonText="reset password" buttonLink="/reset-password">
        <AuthOTP />
      </AuthForm>
      <p className="self-start text-sm text-charcoal-black">
        Didn't get OTP? <span className="capitalize text-brownish-amber">resend OTP</span>
      </p>
    </section>
  );
}
