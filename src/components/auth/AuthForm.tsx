import { ReactNode } from "react";
import AuthButton from "./AuthButton";

export default function AuthForm({ children, buttonText, buttonLink }: { children: ReactNode; buttonText: string; buttonLink?: string }) {
  return (
    <form className="flex flex-col w-full gap-y-8 mt-4 mb-2.5">
      <main className="flex flex-col w-full gap-y-3">
        {children}
      </main>
      <AuthButton buttonText={buttonText} buttonLink={buttonLink} />
    </form>
  );
}
