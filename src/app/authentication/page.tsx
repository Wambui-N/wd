'use client'

import { useState } from "react";
import ForgotPasswordForm from "@/components/auth/forgotPasswordForm";
import LoginForm from "@/components/auth/loginForm";
import SignupForm from "@/components/auth/signupForm";

const AuthenticationPage = () => {
  const [authState, setAuthState] = useState<"login" | "signup" | "forgot">(
    "login",
  );

  return (
    <>
      {authState === "login" && (
        <LoginForm
          onForgot={() => setAuthState("forgot")}
          onSignup={() => setAuthState("signup")} // Implemented onSignup
        />
      )}
      {authState === "signup" && (
        <SignupForm onLogin={() => setAuthState("login")} />
      )}
      {authState === "forgot" && (
        <ForgotPasswordForm onBack={() => setAuthState("login")} />
      )}
    </>
  );
};

export default AuthenticationPage;
