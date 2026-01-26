"use client";
import * as Yup from "yup";
import { ReactNode } from "react";
import AuthForm from "./AuthForm";

const validationSchema = Yup.object().shape({
  password: Yup.string().required("Kindly enter a password.").min(8, "Password must be at least 8 characters."),
  confirmPassword: Yup.string().required("Kindly confirm your new password").oneOf([Yup.ref("password")], "Passwords must match.")
});

const initialValues = {  password: "", confirmPassword: "" };

export default function AuthResetPasswordForm({ children }: { children: ReactNode; }) {
  return <AuthForm validationSchema={validationSchema} initialValues={initialValues} buttonText="submitting..." buttonLink="/sign-in">{children}</AuthForm>
}