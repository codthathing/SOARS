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
    <section className="flex flex-col h-screen px-6 justify-center items-center">
      <AuthPageDetails image="/assets/laptop_subimp.jpg" title="sign up" text="Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequatur, reiciendis perspiciatis provident." />
      <AuthOption />
      <AuthSignUpForm>
        <AuthInputField type="text" name="name" placeholder="Name" />
        <AuthInputField type="email" name="email" placeholder="Email/Mobile Number" />
        <AuthInputField type="text" name="password" placeholder="Password" />
        <div className="flex items-center gap-x-1.5 text-xs">
          <input type="checkbox" name="agreement" className="w-3 h-3 accent-brownish-amber" />
          <span className="text-charcoal-black">I agree to the <span className="text-brownish-amber">Terms of Service</span> and <span className="text-brownish-amber capitalize">privacy policy</span>.</span>
        </div>
      </AuthSignUpForm>
      <p className="self-start text-sm text-charcoal-black">Do you have account? <AuthNavigateText text="sign in" link="/sign-in" className="text-brownish-amber" /></p>
    </section>
  );
}
