"use client";
import * as Yup from "yup";
import { ReactNode } from "react";
import { Form, Formik } from "formik";
import { useFormSubmit } from "@/src/hooks/useFormSubmit";
import { fetchUserEmail } from "@/src/store/store";

const validationSchema = Yup.object().shape({
  email: Yup.string().email("Kindly enter correct email format.").required("Kindly enter your email."),
  password: Yup.string().required("Kindly enter your correct password.").min(8, "Password is at least 8 characters."),
});

const initialValues = { email: "", password: "" };

export default function AuthSignInForm({ children }: { children: ReactNode; }) {
  const submitAction = useFormSubmit();

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={async (values, { resetForm, setSubmitting }) => await submitAction(fetchUserEmail({email: values.email, password: values.password}), "/landing", resetForm, setSubmitting)}
      validationSchema={validationSchema}
      validateOnBlur={false}
      validateOnChange={true}
    >
      {(formik) => {
        return (
          <Form className="flex flex-col w-full gap-y-8 mt-4 mb-2.5 md:gap-y-10">
            <main className="flex flex-col w-full gap-y-3 md:gap-y-4">{children}</main>
            <input type="submit" value={"log in"} disabled={formik.isSubmitting || !(formik.isValid && formik.dirty)} className="capitalize text-white shadow-[0_4px_9px_rgba(0,0,0,0.25)] disabled:bg-brownish-amber/50 bg-brownish-amber text-base w-full border-none outline-none py-3 rounded-md md:text-xl lg:text-base" />
          </Form>
        );
      }}
    </Formik>
  )
}
