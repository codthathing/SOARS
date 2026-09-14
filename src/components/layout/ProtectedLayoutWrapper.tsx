"use client";
import {  makeStore } from "@/src/store/store";
import { ReactNode } from "react";
import { Provider } from "react-redux";

export default function ProtectedLayoutWrapper({ children, userData }: { children: ReactNode; userData:  {id: string; email: string} }) {
  return (
    <Provider store={makeStore(userData)}>{children}</Provider>
  )
}