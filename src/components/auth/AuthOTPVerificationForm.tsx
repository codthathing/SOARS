"use client";
import * as Yup from "yup";
import { ReactNode } from "react";
import { Form, Formik } from "formik";
import { useFormSubmitBasic } from "@/src/hooks/useFormSubmit";

const validationSchema = Yup.object().shape({
  otp: Yup.string()
    .required("Please enter the OTP code")
    .length(6, "OTP must be 6 digits")
    .matches(/^\d+$/, "OTP must contain only numbers"),
});

const initialValues = { otp: "" };

export default function AuthOTPVerificationForm({ children }: { children: ReactNode; }) {
  const submitAction = useFormSubmitBasic();

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={async (_values, { resetForm, setSubmitting }) => submitAction("/auth/reset-password", resetForm, setSubmitting)}
      validationSchema={validationSchema}
      validateOnBlur={false}
      validateOnChange={true}
    >
      {(formik) => {
        return (
          <Form className="flex flex-col w-full gap-y-8 mt-4 mb-2.5 md:gap-y-10">
            <main className="flex flex-col w-full gap-y-3 md:gap-y-4">{children}</main>
            <input type="submit" value={"reset password"} disabled={formik.isSubmitting || !(formik.isValid && formik.dirty)} className="capitalize text-white shadow-[0_4px_9px_rgba(0,0,0,0.25)] disabled:bg-brownish-amber/50 bg-brownish-amber text-base w-full border-none outline-none py-3 rounded-md md:text-xl lg:text-base" />
          </Form>
        );
      }}
    </Formik>
  );
}
