import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import {ReactNode} from "react";
import PageLayoutWrapper from "@/src/components/layout/PageLayoutWrapper";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "SOARS - Save, Organize, Archive, Share",
  description: "A app where students, workers, potential grinders, and everyone can save link to resources they are using or plan to use.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en">
      <PageLayoutWrapper className={`${geistSans.variable} ${geistMono.variable} antialiased`}>{children}</PageLayoutWrapper>
    </html>
  );
}
