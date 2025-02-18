"use client";

import React, { useState } from "react";
import { createClient } from "@supabase/supabase-js";
import { AlertCircle } from "lucide-react";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

interface SignupFormProps {
  onLogin: () => void;
}

const SignupForm: React.FC<SignupFormProps> = ({ onLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const { error } = await supabase.auth.signUp({ email, password });

    if (error) setError(error.message);

    setLoading(false);
  };

  return (
    <form onSubmit={handleSignup} className="space-y-6">
      {error && (
        <div className="rounded-md bg-red-50 p-3 text-red-700 flex items-center">
          <AlertCircle className="h-4 w-4 mr-2" />
          {error}
        </div>
      )}

      <input
        type="email"
        required
        placeholder="Email"
        className="w-full p-2 border rounded"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        required
        placeholder="Password"
        className="w-full p-2 border rounded"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-blue-600 text-white py-2 rounded disabled:opacity-50"
      >
        {loading ? "Creating account..." : "Sign up"}
      </button>

      <button onClick={onLogin} className="text-blue-600 hover:underline block w-full text-center">
        Already have an account? Sign in
      </button>
    </form>
  );
};

export default SignupForm;
