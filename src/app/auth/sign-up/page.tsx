import AuthInputField from "@/src/components/auth/AuthInputField";
import AuthNavigateText from "@/src/components/auth/AuthNavigateText";
import AuthOption from "@/src/components/auth/AuthOption";
import AuthPageDetails from "@/src/components/auth/AuthPageDetails";
import AuthSignUpForm from "@/src/components/auth/AuthSignUpForm";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sign-Up",
};

export default function Page() {
  return (
    <section className="flex flex-col h-dvh px-6 justify-center items-center md:gap-y-3 lg:w-[65%] lg:mx-auto lg:gap-y-1">
      <AuthPageDetails image="/sign-up.png" title="sign up" text="Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequatur, reiciendis perspiciatis provident." />
      <AuthOption />
      <AuthSignUpForm>
        <AuthInputField type="text" name="name" placeholder="Name" />
        <AuthInputField type="email" name="email" placeholder="Email/Mobile Number" />
        <AuthInputField type="password" name="password" placeholder="Password" />
        <div className="flex items-center gap-x-1.5 text-xs md:text-base">
          <input type="checkbox" name="agreement" className="w-3 h-3 md:w-4 md:h-4 accent-brownish-amber" />
          <span className="text-charcoal-black md:text-base lg:text-xs">I agree to the <span className="text-brownish-amber">Terms of Service</span> and <span className="text-brownish-amber capitalize">privacy policy</span>.</span>
        </div>
      </AuthSignUpForm>
      <p className="self-start text-sm text-charcoal-black md:text-xl lg:text-sm">Do you have account? <AuthNavigateText text="sign in" link="/sign-in" className="text-brownish-amber" /></p>
    </section>
  );
}
