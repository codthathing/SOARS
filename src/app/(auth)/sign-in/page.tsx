import AuthNavigateText from "@/src/components/auth/AuthNavigateText";
import AuthOption from "@/src/components/auth/AuthOption";
import AuthPageDetails from "@/src/components/auth/AuthPageDetails";
import { Metadata } from "next";
import AuthInputField from "@/src/components/auth/AuthInputField";
import AuthSignInForm from "@/src/components/auth/AuthSignInForm";

export const metadata: Metadata = {
  title: "Sign-In",
};

export default function Page() {
  return (
    <section className="flex flex-col h-dvh px-6 justify-center items-center md:gap-y-3 lg:w-[65%] lg:mx-auto lg:gap-y-1">
      <AuthPageDetails image="/sign-in.png" title="sign in" text="Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequatur, reiciendis perspiciatis provident." />
      <AuthOption />
      <AuthSignInForm>
        <AuthInputField type="email" name="email" placeholder="Email/Mobile Number" />
        <AuthInputField type="password" name="password" placeholder="Password" />
        <AuthNavigateText text="forgot password?" link="/forgot-password" className="text-xs self-end text-charcoal-black md:text-base lg:text-xs" />
      </AuthSignInForm>
      <p className="self-start text-sm text-charcoal-black md:text-xl lg:text-sm">Don&apos;t have account? <AuthNavigateText text="sign up" link="/sign-up" className="text-brownish-amber" /></p>
    </section>
  );
}
