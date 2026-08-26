"use client";
import * as Yup from "yup";
import { ReactNode } from "react";
import { Form, Formik } from "formik";
import { useFormSubmitBasic } from "@/src/hooks/useFormSubmit";

const validationSchema = Yup.object().shape({
  password: Yup.string().required("Kindly enter a password.").min(8, "Password must be at least 8 characters."),
  confirmPassword: Yup.string().required("Kindly confirm your new password").oneOf([Yup.ref("password")], "Passwords must match.")
});

const initialValues = {  password: "", confirmPassword: "" };

export default function AuthResetPasswordForm({ children }: { children: ReactNode; }) {
  const submitAction = useFormSubmitBasic();

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={async (_values, { resetForm, setSubmitting }) => submitAction("/auth/sign-in", resetForm, setSubmitting)}
      validationSchema={validationSchema}
      validateOnBlur={false}
      validateOnChange={true}
    >
      {(formik) => {
        return (
          <Form className="flex flex-col w-full gap-y-8 mt-4 mb-2.5 md:gap-y-10">
            <main className="flex flex-col w-full gap-y-3 md:gap-y-4">{children}</main>
            <input type="submit" value={"submitting..."} disabled={formik.isSubmitting || !(formik.isValid && formik.dirty)} className="capitalize text-white shadow-[0_4px_9px_rgba(0,0,0,0.25)] disabled:bg-brownish-amber/50 bg-brownish-amber text-base w-full border-none outline-none py-3 rounded-md md:text-xl lg:text-base" />
          </Form>
        );
      }}
    </Formik>
  );
}