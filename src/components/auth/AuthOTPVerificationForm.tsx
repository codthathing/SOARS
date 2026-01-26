"use client";
import * as Yup from "yup";
import { ReactNode } from "react";
import AuthForm from "./AuthForm";

const validationSchema = Yup.object().shape({
  otp: Yup.string()
    .required("Please enter the OTP code")
    .length(6, "OTP must be 6 digits")
    .matches(/^\d+$/, "OTP must contain only numbers"),
});

const initialValues = { otp: "" };

export default function AuthOTPVerificationForm({ children }: { children: ReactNode; }) {

  return <AuthForm validationSchema={validationSchema} initialValues={initialValues} buttonText="reset password" buttonLink="/reset-password">{children}</AuthForm>
}
