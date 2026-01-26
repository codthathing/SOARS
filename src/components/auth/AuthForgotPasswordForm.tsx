"use client";
import * as Yup from "yup";
import { ReactNode } from "react";
import AuthForm from "./AuthForm";

const validationSchema = Yup.object().shape({
  email: Yup.string().email("Kindly enter correct email format.").required("Kindly enter your email."),
});

const initialValues = { email: "" };

export default function AuthForgotPasswordForm({ children }: { children: ReactNode; }) {

  return <AuthForm validationSchema={validationSchema} initialValues={initialValues} buttonText="continue" buttonLink="/otp-verification">{children}</AuthForm>
}
