"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useAuth } from "./authContext";
import { Alert, AlertDescription } from "@/components/ui/alert";

interface AuthGuardProps {
  children: React.ReactNode;
  requireAuth?: boolean; // Optional prop to explicitly require authentication
  redirectPath?: string; // Optional custom redirect path
}

export const AuthGuard = ({ 
  children, 
  requireAuth = false, 
  redirectPath = "/authentication"
}: AuthGuardProps) => {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [showAlert, setShowAlert] = useState(false);

  useEffect(() => {
    if (loading) return;

    const currentPath = window.location.pathname;
    const isAuthPath = currentPath === "/authentication";
    
    // Handle protected routes
    const isProtectedRoute = currentPath.startsWith("/dialogues") || requireAuth;
    
    if (isProtectedRoute && !user) {
      setShowAlert(true);
      // Use setTimeout to show the alert before redirecting
      setTimeout(() => {
        router.push(redirectPath);
      }, 2000);
      return;
    }

    // Redirect logged-in users away from auth pages
    if (user && isAuthPath) {
      router.push("/dialogues");
      return;
    }
  }, [user, loading, router, requireAuth, redirectPath]);

  // Loading state with improved spinner
  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-gray-200 border-b-gray-900"></div>
          <p className="text-sm text-gray-600">Checking authentication...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      {showAlert && (
        <Alert variant="destructive" className="fixed top-4 right-4 w-96 z-50">
          <AlertDescription>
            You need to be logged in to access this page. Redirecting...
          </AlertDescription>
        </Alert>
      )}
      {children}
    </>
  );
};