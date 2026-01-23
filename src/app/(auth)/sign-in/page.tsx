import AuthForm from "@/src/components/auth/AuthForm";
import AuthNavigateText from "@/src/components/auth/AuthNavigateText";
import AuthOption from "@/src/components/auth/AuthOption";
import AuthPageDetails from "@/src/components/auth/AuthPageDetails";
import { Eye } from "lucide-react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sign-In",
};

export default function Page() {
  return (
    <section className="flex flex-col h-screen px-6 justify-center items-center">
      <AuthPageDetails image="/assets/laptop_subimp.jpg" title="sign in" text="Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequatur, reiciendis perspiciatis provident." />
      <AuthOption />
      <AuthForm buttonText="log in">
        <div className="flex gap-x-3 items-center px-3 py-1 bg-gray-200 rounded-md">
          <input type="text" name="email" placeholder="Email/Mobile Number" className="border-none outline-none w-full p-2" id="" />
        </div>
        <div className="flex gap-x-3 items-center px-3 py-1 bg-gray-200 rounded-md">
          <input type="text" name="password" placeholder="Password" className="border-none outline-none w-full p-2" id="" />
          <Eye className="cursor-pointer w-4.5" />
        </div>
        <AuthNavigateText text="forgot password?" link="/forgot-password" className="text-xs self-end" />
      </AuthForm>
      <p className="self-start">
        Dom't have account? <AuthNavigateText text="sign up" link="/sign-up" className="text-blue-600" />
      </p>
    </section>
  );
}
