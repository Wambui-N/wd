"use client";

import { AuthProvider, useAuth } from "@/lib/authContext";
import { AuthGuard } from "@/lib/authGuard";

export default function SettingsPage() {
  const { user } = useAuth(); // Access user data

  return (
    <AuthGuard>
      <h1>Settings</h1>
      {/* Your settings content goes here */}
    </AuthGuard>
  );
}
