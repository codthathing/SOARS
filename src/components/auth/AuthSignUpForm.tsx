"use client";
import * as Yup from "yup";
import { ReactNode } from "react";
import AuthForm from "./AuthForm";

const validationSchema = Yup.object().shape({
  name: Yup.string().required("Kindly enter your name."),
  email: Yup.string().email("Kindly enter correct email format.").required("Kindly enter your email."),
  password: Yup.string().required("Kindly enter a password.").min(8, "Password must be at least 8 characters."),
});

const initialValues = { name: "", email: "", password: "" };

export default function AuthSignUpForm({ children }: { children: ReactNode; }) {
  return <AuthForm validationSchema={validationSchema} initialValues={initialValues} buttonText="creeate account">{children}</AuthForm>
}