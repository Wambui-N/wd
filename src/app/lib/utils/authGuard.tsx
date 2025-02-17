// app/shared/utils/authGuard.tsx
"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useAuth } from "./authContext";

interface AuthGuardProps {
  children: React.ReactNode;
}

export const AuthGuard = ({ children }: AuthGuardProps) => {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (loading) return; // Wait until auth state is determined

    const currentPath = window.location.pathname;

    // Only enforce authentication for routes starting with /dialogues
    if (currentPath.startsWith("/dialogues") && !user) {
      router.push("/register"); // Redirect to register if not authenticated
    }
  }, [user, loading, router]);

  // Optional: Show a loading spinner while checking auth state
  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-b-2 border-gray-900"></div>
      </div>
    );
  }

  return <>{children}</>;
};