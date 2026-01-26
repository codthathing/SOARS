"use client";
import { FormikProps } from "formik";

export default function AuthButton({ buttonText, formik }: { buttonText: string; formik: FormikProps<{ [key: string]: any }> }) {
  return <input type="submit" value={buttonText} disabled={formik.isSubmitting || !(formik.isValid && formik.dirty)} className="capitalize text-white shadow-[0_4px_9px_rgba(0,0,0,0.25)] disabled:bg-brownish-amber/50 bg-brownish-amber text-base w-full border-none outline-none py-3 rounded-md" />;
}
