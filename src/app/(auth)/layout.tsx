import { Metadata } from "next";
import { ReactNode } from "react";

export const metadata: Metadata = {
  title: {
    default: "Authentication Page",
    template: "%s Page - SOARS",
  },
};

export default function layout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
