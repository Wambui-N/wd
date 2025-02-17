"use client";

import { AuthProvider, useAuth } from "@/app/lib/utils/authContext";
import { AuthGuard } from "@/app/lib/utils/authGuard";

export default function SettingsPage() {
  const { user } = useAuth(); // Access user data

  return (
    <AuthGuard>
      <h1>Settings</h1>
      {/* Your settings content goes here */}
    </AuthGuard>
  );
}
