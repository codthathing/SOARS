import AuthBackIcon from "@/src/components/auth/AuthBackIcon";
import AuthInputField from "@/src/components/auth/AuthInputField";
import AuthPageDetails from "@/src/components/auth/AuthPageDetails";
import AuthResetPasswordForm from "@/src/components/auth/AuthResetPasswordForm";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Reset Password",
};

export default function Page() {
  return (
    <section className="flex flex-col h-dvh px-6 pt-6 items-center">
      <AuthBackIcon />
      <div className="flex w-fit gap-x-2 my-14">
        {[0, 1, 2].map((x) => <div key={x} className={`w-6 border ${x === 2 ? "border-brownish-amber" : "border-soft-lavender"}`} />)}
      </div>
      <AuthPageDetails image="/password-reset.png" title="reset password" text="Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequatur, reiciendis perspiciatis provident." />
      <AuthResetPasswordForm>
        <AuthInputField type="password" name="password" placeholder="Password" />
        <AuthInputField type="password" name="confirmPassword" placeholder="Confirm Password" />
      </AuthResetPasswordForm>
    </section>
  );
}
