import AuthBackIcon from "@/src/components/auth/AuthBackIcon";
import AuthForm from "@/src/components/auth/AuthForm";
import AuthPageDetails from "@/src/components/auth/AuthPageDetails";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Forgot Password",
};

export default function Page() {
  return (
    <section className="flex flex-col h-screen px-6 pt-6 items-center">
      <AuthBackIcon />
      <div className="flex w-fit gap-x-2 my-14">
        {[0, 1, 2].map((x) => <div key={x} className={`w-6 border ${x === 0 ? "border-blue-500" : "border-gray-200"}`} />)}
      </div>
      <AuthPageDetails image="/assets/laptop_subimp.jpg" title="forgot password" text="Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequatur, reiciendis perspiciatis provident." />
      <AuthForm buttonText="continue" buttonLink="/otp-verification">
        <div className="flex gap-x-3 items-center px-3 py-1 bg-gray-200 rounded-md">
          <input type="text" name="email" placeholder="Email/Mobile Number" className="border-none outline-none w-full p-2" id="" />
        </div>
      </AuthForm>
    </section>
  );
}
