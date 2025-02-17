"use client";

import { useAuth } from "@/app/lib/utils/authContext";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const { signUp } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const isValidEmail = (email: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleRegister = async () => {
    if (!isValidEmail(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters long.");
      return;
    }

    setIsLoading(true);
    try {
      await signUp(email, password);
      setSuccessMessage(
        "Registration successful! Please check your email to verify your account.",
      );
      setError("");
      setTimeout(() => {
        router.push("/login");
      }, 3000);
    } catch (err: any) {
      console.error("Registration error:", err);
      setError(err.message || "Failed to register");
      setSuccessMessage("");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="w-full max-w-md rounded-lg bg-white p-8 shadow-lg">
        <h1 className="mb-6 text-center text-2xl font-semibold">Register</h1>

        <div className="mb-4">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-md border border-gray-300 p-3 focus:outline-none focus:ring-2 focus:ring-primary"
            aria-label="Email"
          />
        </div>

        <div className="mb-6">
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full rounded-md border border-gray-300 p-3 focus:outline-none focus:ring-2 focus:ring-primary"
            aria-label="Password"
          />
        </div>

        <button
          onClick={handleRegister}
          className={`w-full rounded-md bg-primary py-3 text-foreground hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-primary ${
            isLoading ? "cursor-not-allowed opacity-50" : ""
          }`}
          disabled={isLoading}
        >
          {isLoading ? "Registering..." : "Register"}
        </button>

        {error && <p className="mb-4 text-center text-orange">{error}</p>}
        {successMessage && (
          <p className="mb-4 text-center text-primary">{successMessage}</p>
        )}

        <div className="mt-4 text-center">
          <p className="text-sm text-gray-600">
            Already have an account?{" "}
            <a href="/login" className="text-primary hover:underline">
              Log in here
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
