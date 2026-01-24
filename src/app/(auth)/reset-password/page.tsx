import AuthBackIcon from "@/src/components/auth/AuthBackIcon";
import AuthForm from "@/src/components/auth/AuthForm";
import AuthPageDetails from "@/src/components/auth/AuthPageDetails";
import {  Eye } from "lucide-react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Reset Password",
};

export default function Page() {
  return (
    <section className="flex flex-col h-screen px-6 pt-6 items-center">
      <AuthBackIcon />
      <div className="flex w-fit gap-x-2 my-14">
        {[0, 1, 2].map((x) => (
          <div key={x} className={`w-6 border ${x === 2 ? "border-blue-500" : "border-gray-200"}`} />
        ))}
      </div>
      <AuthPageDetails image="/assets/laptop_subimp.jpg" title="reset password" text="Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequatur, reiciendis perspiciatis provident." />
      <AuthForm buttonText="submitting..." buttonLink="/sign-in">
        <div className="flex gap-x-3 items-center px-3 py-1 bg-gray-200 rounded-md">
          <input type="text" name="password" placeholder="Password" className="border-none outline-none w-full p-2" id="" />
          <Eye className="cursor-pointer w-4.5" />
        </div>
        <div className="flex gap-x-3 items-center px-3 py-1 bg-gray-200 rounded-md">
          <input type="text" name="confirm-password" placeholder="Confirm Password" className="border-none outline-none w-full p-2" id="" />
          <Eye className="cursor-pointer w-4.5" />
        </div>
      </AuthForm>
    </section>
  );
}
