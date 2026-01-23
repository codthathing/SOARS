import AuthForm from "@/src/components/auth/AuthForm";
import AuthNavigateText from "@/src/components/auth/AuthNavigateText";
import AuthOption from "@/src/components/auth/AuthOption";
import AuthPageDetails from "@/src/components/auth/AuthPageDetails";
import { Eye } from "lucide-react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sign-Up",
};

export default function Page() {
  return (
    <section className="flex flex-col h-screen px-6 justify-center items-center">
      <AuthPageDetails image="/assets/laptop_subimp.jpg" title="sign up" text="Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequatur, reiciendis perspiciatis provident." />
      <AuthOption />
      <AuthForm buttonText="create account">
        <div className="flex gap-x-3 items-center px-3 py-1 bg-gray-200 rounded-md">
          <input type="text" name="name" placeholder="Name" className="border-none outline-none w-full p-2" id="" />
        </div>
        <div className="flex gap-x-3 items-center px-3 py-1 bg-gray-200 rounded-md">
          <input type="text" name="email" placeholder="Email/Mobile Number" className="border-none outline-none w-full p-2" id="" />
        </div>
        <div className="flex gap-x-3 items-center px-3 py-1 bg-gray-200 rounded-md">
          <input type="text" name="password" placeholder="Password" className="border-none outline-none w-full p-2" id="" />
          <Eye className="cursor-pointer w-4.5" />
        </div>
        <div className="flex items-center gap-x-1.5 text-xs">
          <input type="checkbox" name="agreement" className="w-3 h-3" />
          <span>
            I agree to the <span className="text-blue-500">Terms of Service</span> and <span className="text-blue-500 capitalize">privacy policy</span>.
          </span>
        </div>
      </AuthForm>
      <p className="self-start">
        Do you have account? <AuthNavigateText text="sign in" link="/sign-in" className="text-blue-600" />
      </p>
    </section>
  );
}
