"use client";

import * as Yup from "yup";
import { ReactNode, useState } from "react";
import { Formik, Form } from "formik";
import { useFormSubmit } from "@/src/hooks/useFormSubmit";

const validationSchema = Yup.object().shape({
  name: Yup.string().required("Kindly enter your name."),
  email: Yup.string()
    .email("Kindly enter correct email format.")
    .required("Kindly enter your email."),
  password: Yup.string()
    .required("Kindly enter a password.")
    .min(8, "Password must be at least 8 characters."),
});

const initialValues = {
  name: "",
  email: "",
  password: "",
};

export default function AuthSignUpForm({
  children,
}: {
  children: ReactNode;
}) {
  const submitAction = useFormSubmit();
  const [error, setError] = useState("");

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      validateOnBlur={false}
      validateOnChange={true}
      onSubmit={async (values, { resetForm, setSubmitting }) => {
        setError("");

        await submitAction(
          async () => {
            const response = await fetch("/api/auth/sign-up", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(values),
            });

const responseText = await response.text();

let data;

try {
  data = responseText ? JSON.parse(responseText) : {};
} catch {
  throw new Error("The server returned an invalid response.");
}

if (!response.ok) {
  throw new Error(data.error || "Unable to create account.");
}

            if (!response.ok) {
              throw new Error(data.error || "Unable to create account.");
            }
          },
          "/auth/sign-in",
          resetForm,
          setSubmitting,
          setError
        );
      }}
    >
      {(formik) => (
        <Form className="flex flex-col w-full gap-y-8 mt-4 mb-2.5 md:gap-y-10">
          <main className="flex flex-col w-full gap-y-3 md:gap-y-4">
            {children}
          </main>

          {error && (
            <p className="text-red-500 text-sm">{error}</p>
          )}

          <input
            type="submit"
            value="create account"
            disabled={
              formik.isSubmitting ||
              !(formik.isValid && formik.dirty)
            }
            className="capitalize text-white shadow-[0_4px_9px_rgba(0,0,0,0.25)] disabled:bg-brownish-amber/50 bg-brownish-amber text-base w-full border-none outline-none py-3 rounded-md md:text-xl lg:text-base"
          />
        </Form>
      )}
    </Formik>
  );
}