"use client";
import { Form, Formik } from "formik";
import { useRouter } from "next/navigation";
import { ReactNode } from "react";
import * as Yup from "yup";
import AuthButton from "./AuthButton";

export default function AuthForm({ children, initialValues, validationSchema, buttonText, buttonLink }: { children: ReactNode; initialValues: { [key: string]: any }; validationSchema: Yup.ObjectSchema<{ [key: string]: any }, Yup.AnyObject, {[key: string]: undefined}, "">; buttonText: string; buttonLink?: string }) {
  const router = useRouter();

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={(values, { resetForm, setSubmitting }) => {
        console.log(values);
        router.push(buttonLink || "");
        setSubmitting(false);
        resetForm();
      }}
      validationSchema={validationSchema}
      validateOnBlur={false}
      validateOnChange={true}
    >
      {(formik) => {
        return (
          <Form className="flex flex-col w-full gap-y-8 mt-4 mb-2.5">
            <main className="flex flex-col w-full gap-y-3">{children}</main>
            <AuthButton buttonText={buttonText} formik={formik} />
          </Form>
        );
      }}
    </Formik>
  );
}