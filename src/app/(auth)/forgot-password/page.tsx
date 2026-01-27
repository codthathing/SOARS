import AuthBackIcon from "@/src/components/auth/AuthBackIcon";
import AuthForgotPasswordForm from "@/src/components/auth/AuthForgotPasswordForm";
import AuthInputField from "@/src/components/auth/AuthInputField";
import AuthPageDetails from "@/src/components/auth/AuthPageDetails";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Forgot Password",
};

export default function Page() {
  return (
    <section className="flex flex-col h-dvh px-6 pt-6 items-center">
      <AuthBackIcon />
      <div className="flex w-fit gap-x-2 my-14">
        {[0, 1, 2].map((x) => <div key={x} className={`w-6 border ${x === 0 ? "border-brownish-amber" : "border-soft-lavender"}`} />)}
      </div>
      <AuthPageDetails image="/forgot-password.png" title="forgot password" text="Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequatur, reiciendis perspiciatis provident." />
      <AuthForgotPasswordForm>
        <AuthInputField type="email" name="email" placeholder="Email/Mobile Number" />
      </AuthForgotPasswordForm>
    </section>
  );
}
