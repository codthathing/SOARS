"use client";
import * as Yup from "yup";
import { ReactNode } from "react";
import AuthForm from "./AuthForm";

const validationSchema = Yup.object().shape({
  email: Yup.string().email("Kindly enter correct email format.").required("Kindly enter your email."),
  password: Yup.string().required("Kindly enter your correct password.").min(8, "Password is at least 8 characters."),
});

const initialValues = { email: "", password: "" };

export default function AuthSignInForm({ children }: { children: ReactNode; }) {

  return <AuthForm validationSchema={validationSchema} initialValues={initialValues} buttonText="log in">{children}</AuthForm>
}
