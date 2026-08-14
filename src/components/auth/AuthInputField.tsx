"use client";
import { ErrorMessage, Field } from "formik";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";

interface AuthInputFieldProps {
  type: string;
  name: string;
  placeholder: string
}

export default function AuthInputField({ type, name, placeholder }: AuthInputFieldProps) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="w-full flex flex-col gap-y-0.5">
      <main className="flex gap-x-3 items-center px-3 py-1 md:px-3.5 md:py-1.5 has-focus:border has-focus:border-brownish-amber has-focus:bg-soft-lavender bg-light-gray rounded-md">
        <Field type={type === "password" ? (showPassword ? "text" : "password") : type} name={name} placeholder={placeholder} className="shadow-inset-default focus:shadow-inset-focus border-none text-charcoal-black outline-none w-full p-2 md:p-2.5 lg:p-2 text-sm md:text-xl lg:text-base" />
        {type === "password" && <>{showPassword ? <EyeOff onClick={() => setShowPassword(false)} className="cursor-pointer w-4.5 md:w-6 text-charcoal-black" /> : <Eye onClick={() => setShowPassword(true)} className="cursor-pointer w-4.5 md:w-6 lg:w-4.5 text-charcoal-black" />}</>}
      </main>
      <ErrorMessage name={name} component={"p"} className="text-[8px] text-red-500" />
    </div>
  );
}
