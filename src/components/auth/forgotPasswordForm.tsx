"use client";

import React, { useState } from "react";
import { createClient } from "@supabase/supabase-js";
import { AlertCircle, ArrowLeft } from "lucide-react";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

interface ForgotPasswordFormProps {
  onBack: () => void;
}

const ForgotPasswordForm: React.FC<ForgotPasswordFormProps> = ({ onBack }) => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setMessage("");
    setLoading(true);

    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/auth/reset-password`,
    });

    if (error) setError(error.message);
    else setMessage("Check your email for a reset link.");

    setLoading(false);
  };

  return (
    <form onSubmit={handleForgotPassword} className="space-y-6">
      <button
        onClick={onBack}
        className="mb-4 inline-flex items-center text-sm text-gray-500 hover:text-gray-700"
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to login
      </button>

      {error && (
        <div className="rounded-md bg-red-50 p-3 text-red-700 flex items-center">
          <AlertCircle className="h-4 w-4 mr-2" />
          {error}
        </div>
      )}
      {message && (
        <div className="rounded-md bg-green-50 p-3 text-green-700">{message}</div>
      )}

      <input
        type="email"
        required
        placeholder="Email"
        className="w-full p-2 border rounded"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-blue-600 text-white py-2 rounded disabled:opacity-50"
      >
        {loading ? "Sending link..." : "Send reset link"}
      </button>
    </form>
  );
};

export default ForgotPasswordForm;
