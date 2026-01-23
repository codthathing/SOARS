"use client";
import { ChangeEvent, InputEvent, KeyboardEvent, Ref, useEffect, useRef, useState } from "react";

export default function AuthOTP() {
  const [confirmInput, setConfirmInput] = useState<any[]>(Array(6).fill(""));
  const confirmRefs = useRef<(HTMLInputElement)[]>([]);

  const handleConfirmInput = (e: ChangeEvent<HTMLInputElement>, index: number) => {
    const value = e.target.value;
    const newConfirmInput = [...confirmInput];
    newConfirmInput[index] = value;
    setConfirmInput(newConfirmInput);

    if (value && index < confirmInput.length - 1) {
      confirmRefs.current[index + 1].focus();
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>, index: number) => {
    if (e.key === "Backspace" && !confirmInput[index] && index > 0) {
      confirmRefs.current[index - 1].focus();
    }
  };

  const handleConfirmInputSubmit = (e: Event) => {
    e.preventDefault();
    const confirmCode = Number(confirmInput.join(""));
  };

  useEffect(() => {
    confirmRefs.current[0].focus();
  }, []);

  return (
    <div className="flex justify-center items-center gap-x-3">
      {confirmInput.map((value, index) => (
        <input key={index} type="number" value={value} onInput={(e: ChangeEvent<HTMLInputElement>) => (e.target.value = e.target.value.slice(0, 1))} onChange={(e) => handleConfirmInput(e, index)} onKeyDown={(e) => handleKeyDown(e, index)} ref={(el) => { confirmRefs.current[index] = el! }} className="text-center bg-[#F3F2ED] rounded-sm outline-none border-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-inner-spin-button]:m-0 w-10 h-10 text-xs md:w-14 md:h-14 lg:w-12 lg:h-12 md:text-base" maxLength={1} />
      ))}
    </div>
  );
}
