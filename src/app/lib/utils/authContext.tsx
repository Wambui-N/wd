"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import { supabase } from "./supabaseClient";
import { useRouter } from "next/navigation";

// Match your actual database schema
interface Profile {
  id: number;
  user_id: string;
  username: string;
  bio?: string;
  avatar?: string;
  created_at: string;
}

interface User {
  id: string;
  email?: string;
  user_metadata?: Record<string, any>;
}

interface AuthContextType {
  user: User | null;
  profile: Profile | null;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  // Fetch user profile data
  const fetchProfile = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("user_id", userId)
        .maybeSingle(); // <-- Use .maybeSingle() here

      if (error) {
        console.error("Error fetching profile:", error);
        throw error;
      }

      console.log("Fetched profile:", data);
      setProfile(data);
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error("Error in fetchProfile:", error.message);
      } else {
        console.error("Unknown error in fetchProfile:", error);
      }
      setProfile(null);
    }
  };

  useEffect(() => {
    const getUser = async () => {
      try {
        const {
          data: { user },
        } = await supabase.auth.getUser();
        setUser(user);
        if (user) {
          await fetchProfile(user.id);
        }
      } catch (error) {
        console.error("Error in getUser:", error);
      } finally {
        setLoading(false);
      }
    };

    getUser();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        console.log("Auth state changed:", event, session?.user?.id);
        setUser(session?.user || null);

        if (session?.user) {
          await fetchProfile(session.user.id);

          // Redirect to /dialogues after successful registration or sign-in
          const currentPath = window.location.pathname;
          if (currentPath === "/register" || currentPath === "/login") {
            router.push("/dialogues");
          }
        } else {
          setProfile(null);
          // Only redirect to /register if not on the home page
          if (window.location.pathname !== "/") {
            router.push("/register");
          }
        }
      },
    );

    return () => {
      subscription.unsubscribe();
    };
  }, [router]);

  const generateUniqueUsername = async (
    baseUsername: string,
  ): Promise<string> => {
    let username = baseUsername;
    let counter = 1;

    while (true) {
      const { data, error } = await supabase
        .from("profiles")
        .select("username")
        .eq("username", username)
        .maybeSingle(); // <-- Use .maybeSingle() here

      if (error || !data) {
        return username;
      }

      username = `${baseUsername}${counter}`;
      counter++;
    }
  };

  const signIn = async (email: string, password: string) => {
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (error) throw error;
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error("Error in signIn:", error.message);
      } else {
        console.error("Unknown error in signIn:", error);
      }
      throw error;
    }
  };

  const signUp = async (email: string, password: string) => {
    let authData = null;
    let username = null;

    try {
      console.log("1. Starting signup process for:", email);

      // Step 1: Create auth user
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
      });

      console.log("2. Auth signup response:", { data, error });

      if (error) {
        console.error("3a. Auth signup error:", {
          message: error.message,
          status: error.status,
          details: (error as any).details,
        });
        throw error;
      }

      if (!data?.user?.id) {
        console.error("3b. Invalid user data:", data);
        throw new Error("Invalid user data received from auth signup");
      }

      authData = data;
      console.log("3c. Auth signup successful. User ID:", data.user.id);

      // Step 2: Generate unique username
      const baseUsername = email.split("@")[0];
      console.log("4. Generating username from base:", baseUsername);

      try {
        username = await generateUniqueUsername(baseUsername);
        console.log("5. Generated unique username:", username);
      } catch (usernameError) {
        console.error("5a. Username generation error:", usernameError);
        throw usernameError;
      }

      // Step 3: Create profile
      console.log("6. Creating profile:", {
        user_id: data.user.id,
        username,
      });

      // First check if profile already exists
      const { data: existingProfile, error: existingProfileError } = await supabase
        .from("profiles")
        .select("*")
        .eq("user_id", data.user.id)
        .maybeSingle(); // <-- Use .maybeSingle() here

      if (existingProfileError) {
        console.error("7a. Error checking existing profile:", existingProfileError);
        throw existingProfileError;
      }

      if (existingProfile) {
        console.log("7a. Profile already exists:", existingProfile);
        return existingProfile;
      }

      // Attempt to insert the profile
      const { data: profileData, error: profileError } = await supabase
        .from("profiles")
        .insert([
          {
            user_id: data.user.id,
            username,
            created_at: new Date().toISOString(),
          },
        ])
        .select()
        .single(); // <-- Keep .single() here since we expect exactly one row to be inserted

      if (profileError) {
        console.error("7b. Profile creation error:", profileError);
        throw profileError;
      }

      console.log("8. Profile created successfully:", profileData);

      // Redirect to /dialogues after successful sign-up
      router.push("/dialogues");
      return profileData;
    } catch (error: unknown) {
      // Type guard for error object
      if (error instanceof Error) {
        console.error("Signup error details:", {
          name: error.name,
          message: error.message,
          stack: error.stack,
        });
      } else if (typeof error === "object" && error !== null) {
        // Handle Supabase error object
        const supabaseError = error as {
          message?: string;
          details?: string;
          hint?: string;
          code?: string;
        };
        console.error("Supabase error details:", {
          message: supabaseError.message,
          details: supabaseError.details,
          hint: supabaseError.hint,
          code: supabaseError.code,
        });
      } else {
        console.error("Unknown error type:", error);
      }
      throw error;
    }
  };

  const signOut = async () => {
    try {
      await supabase.auth.signOut();
      setUser(null);
      setProfile(null);
      router.push("/login");
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error("Error in signOut:", error.message);
      } else {
        console.error("Unknown error in signOut:", error);
      }
      throw error;
    }
  };

  const value = {
    user,
    profile,
    signIn,
    signUp,
    signOut,
    loading,
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-b-2 border-gray-900"></div>
      </div>
    );
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};