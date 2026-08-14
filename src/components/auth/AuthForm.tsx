"use client";
import { Form, Formik } from "formik";
import { useRouter } from "next/navigation";
import { ReactNode } from "react";
import * as Yup from "yup";

interface AuthForm {
  children: ReactNode;
  initialValues: { [_key: string]: unknown };
  validationSchema: Yup.ObjectSchema<{ [_key: string]: unknown }, Yup.AnyObject, {[_key: string]: undefined}, "">;
  buttonText: string;
  buttonLink?: string
}

export default function AuthForm({ children, initialValues, validationSchema, buttonText, buttonLink }: AuthForm) {
  const router = useRouter();

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={(_values, { resetForm, setSubmitting }) => {
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
          <Form className="flex flex-col w-full gap-y-8 mt-4 mb-2.5 md:gap-y-10">
            <main className="flex flex-col w-full gap-y-3 md:gap-y-4">{children}</main>
            <input type="submit" value={buttonText} disabled={formik.isSubmitting || !(formik.isValid && formik.dirty)} className="capitalize text-white shadow-[0_4px_9px_rgba(0,0,0,0.25)] disabled:bg-brownish-amber/50 bg-brownish-amber text-base w-full border-none outline-none py-3 rounded-md md:text-xl lg:text-base" />
          </Form>
        );
      }}
    </Formik>
  );
}