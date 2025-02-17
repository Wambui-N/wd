"use client";

import "../globals.css";
import { AuthProvider } from "../lib/utils/authContext";

export default function DialoguesLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <AuthProvider>{children}</AuthProvider>;
}
