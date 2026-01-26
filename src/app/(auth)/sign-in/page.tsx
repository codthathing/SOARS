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
    <section className="flex flex-col h-screen px-6 justify-center items-center">
      <AuthPageDetails image="/assets/sign-in.png" title="sign in" text="Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequatur, reiciendis perspiciatis provident." />
      <AuthOption />
      <AuthSignInForm>
        <AuthInputField type="email" name="email" placeholder="Email/Mobile Number" />
        <AuthInputField type="password" name="password" placeholder="Password" />
        <AuthNavigateText text="forgot password?" link="/forgot-password" className="text-xs self-end text-charcoal-black" />
      </AuthSignInForm>
      <p className="self-start text-sm text-charcoal-black">Don't have account? <AuthNavigateText text="sign up" link="/sign-up" className="text-brownish-amber" /></p>
    </section>
  );
}
