"use client";
import { useFormikContext } from "formik";
import { ChangeEvent, ClipboardEvent, KeyboardEvent, useEffect, useRef, useState } from "react";

export default function AuthOTP() {
  const [confirmInput, setConfirmInput] = useState<string[]>(Array(6).fill(""));
  const confirmRefs = useRef<HTMLInputElement[]>([]);
  const { setFieldValue, setFieldTouched, errors, touched } = useFormikContext<{ otp: string }>();

  const handleConfirmInput = async (e: ChangeEvent<HTMLInputElement>, index: number) => {
    const value = e.target.value;
    
    if (value.length <= 1 && /^\d*$/.test(value)) {
      const newConfirmInput = [...confirmInput];
      newConfirmInput[index] = value;
      setConfirmInput(newConfirmInput);

      const otpValue = newConfirmInput.join("");
      await setFieldValue("otp", otpValue);
      await setFieldTouched("otp", true);

      if (value && index < confirmInput.length - 1) {
        confirmRefs.current[index + 1].focus();
      }
    }
  };

  const handleKeyDown = async (e: KeyboardEvent<HTMLInputElement>, index: number) => {
    if (e.key === "Backspace") {
      const newConfirmInput = [...confirmInput];
      
      if (!confirmInput[index] && index > 0) {
        confirmRefs.current[index - 1].focus();
      } else {
        newConfirmInput[index] = "";
        setConfirmInput(newConfirmInput);
        await setFieldValue("otp", newConfirmInput.join(""));

      }
    } else if (e.key === "ArrowLeft" && index > 0) {
      confirmRefs.current[index - 1]?.focus();
    } else if (e.key === "ArrowRight" && index < 5) {
      confirmRefs.current[index + 1]?.focus();
    }
  };

  const handlePaste = async (e: ClipboardEvent) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text").slice(0, 6);

    if (/^\d+$/.test(pastedData)) {
      const newInput = pastedData.split("").concat(Array(6 - pastedData.length).fill(""));
      setConfirmInput(newInput);
      await setFieldValue("otp", pastedData);
      await setFieldTouched("otp", true);

      const nextIndex = Math.min(pastedData.length, 5);
      confirmRefs.current[nextIndex]?.focus();
    }
  };

  useEffect(() => {
    confirmRefs.current[0]?.focus();
  }, []);

  return (
    <div className="w-full flex flex-col gap-y-0.5">
      <div className="flex justify-center items-center gap-x-3">
        {confirmInput.map((value, index) => (
          <input
            key={index}
            name={`otp-${index}`}
            type="text"
            inputMode="numeric"
            pattern="\d*"
            value={value}
            onChange={(e: ChangeEvent<HTMLInputElement>) => handleConfirmInput(e, index)}
            onKeyDown={(e: KeyboardEvent<HTMLInputElement>) => handleKeyDown(e, index)}
            onPaste={(e: ClipboardEvent<HTMLInputElement>) => handlePaste(e)}
            ref={(el) => {
              if (el) confirmRefs.current[index] = el;
            }}
            className="text-center bg-light-gray text-sm rounded-sm outline-none border-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-inner-spin-button]:m-0 w-10 h-10 md:w-14 md:h-14 lg:w-12 lg:h-12 md:text-base"
            maxLength={1}
            autoComplete="off"
          />
        ))}
      </div>
      {errors.otp && touched.otp && <p className="text-xs text-red-500 self-center">{errors.otp}</p>}
    </div>
  );
}