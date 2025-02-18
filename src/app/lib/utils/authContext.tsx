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
import { Alert, AlertDescription } from "@/components/ui/alert";

// Enhanced type definitions
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

interface AuthError {
  message: string;
  code?: string;
  details?: string;
}

interface AuthState {
  user: User | null;
  profile: Profile | null;
  loading: boolean;
  error: AuthError | null;
}

interface AuthContextType extends AuthState {
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string) => Promise<Profile | null>;
  signOut: () => Promise<void>;
  updateProfile: (updates: Partial<Profile>) => Promise<void>;
  resetAuthError: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    profile: null,
    loading: true,
    error: null,
  });
  const router = useRouter();

  const updateAuthState = (updates: Partial<AuthState>) => {
    setAuthState(current => ({ ...current, ...updates }));
  };

  const resetAuthError = () => {
    updateAuthState({ error: null });
  };

  // Enhanced profile fetching with better error handling
  const fetchProfile = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("user_id", userId)
        .maybeSingle();

      if (error) throw error;

      updateAuthState({ profile: data, error: null });
      return data;
    } catch (error) {
      const authError = {
        message: error instanceof Error ? error.message : 'Failed to fetch profile',
        code: 'PROFILE_FETCH_ERROR'
      };
      updateAuthState({ error: authError, profile: null });
      console.error("Profile fetch error:", authError);
    }
  };

  // Enhanced username generation with retries
  const generateUniqueUsername = async (baseUsername: string, maxAttempts = 10): Promise<string> => {
    for (let attempt = 0; attempt < maxAttempts; attempt++) {
      const username = attempt === 0 ? baseUsername : `${baseUsername}${attempt}`;
      
      const { data, error } = await supabase
        .from("profiles")
        .select("username")
        .eq("username", username)
        .maybeSingle();
      
      if (!data && !error) return username;
    }
    throw new Error(`Could not generate unique username after ${maxAttempts} attempts`);
  };

  // Enhanced sign-in with better error handling
  const signIn = async (email: string, password: string) => {
    try {
      updateAuthState({ loading: true, error: null });
      
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;
      
      // Auth state change listener will handle the rest
    } catch (error) {
      const authError = {
        message: error instanceof Error ? error.message : 'Failed to sign in',
        code: 'SIGN_IN_ERROR'
      };
      updateAuthState({ error: authError, loading: false });
      throw error;
    }
  };

  // Enhanced sign-up with transaction-like behavior
  const signUp = async (email: string, password: string): Promise<Profile | null> => {
    try {
      updateAuthState({ loading: true, error: null });

      // 1. Create auth user
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email,
        password,
      });

      if (authError) throw authError;
      if (!authData?.user?.id) throw new Error("Invalid user data received");

      // 2. Generate unique username
      const baseUsername = email.split("@")[0];
      const username = await generateUniqueUsername(baseUsername);

      // 3. Create or verify profile
      const { data: existingProfile } = await supabase
        .from("profiles")
        .select("*")
        .eq("user_id", authData.user.id)
        .maybeSingle();

      if (existingProfile) return existingProfile;

      const { data: profile, error: profileError } = await supabase
        .from("profiles")
        .insert([{
          user_id: authData.user.id,
          username,
          created_at: new Date().toISOString(),
        }])
        .select()
        .single();

      if (profileError) throw profileError;

      updateAuthState({ error: null });
      return profile;
    } catch (error) {
      const authError = {
        message: error instanceof Error ? error.message : 'Failed to sign up',
        code: 'SIGN_UP_ERROR',
        details: error instanceof Error ? error.stack : undefined
      };
      updateAuthState({ error: authError, loading: false });
      throw error;
    }
  };

  // Enhanced sign-out
  const signOut = async () => {
    try {
      updateAuthState({ loading: true, error: null });
      await supabase.auth.signOut();
      updateAuthState({ 
        user: null, 
        profile: null, 
        loading: false, 
        error: null 
      });
      router.push("/authentication");
    } catch (error) {
      const authError = {
        message: error instanceof Error ? error.message : 'Failed to sign out',
        code: 'SIGN_OUT_ERROR'
      };
      updateAuthState({ error: authError, loading: false });
      throw error;
    }
  };

  // New: Profile update function
  const updateProfile = async (updates: Partial<Profile>) => {
    if (!authState.user?.id) throw new Error("No authenticated user");
    
    try {
      updateAuthState({ loading: true, error: null });
      
      const { error } = await supabase
        .from("profiles")
        .update(updates)
        .eq("user_id", authState.user.id);

      if (error) throw error;

      await fetchProfile(authState.user.id);
    } catch (error) {
      const authError = {
        message: error instanceof Error ? error.message : 'Failed to update profile',
        code: 'PROFILE_UPDATE_ERROR'
      };
      updateAuthState({ error: authError, loading: false });
      throw error;
    }
  };

  useEffect(() => {
    const initializeAuth = async () => {
      try {
        // Get initial user
        const { data: { user }, error: userError } = await supabase.auth.getUser();
        if (userError) throw userError;
        
        if (user) {
          updateAuthState({ user });
          await fetchProfile(user.id);
        }
      } catch (error) {
        console.error("Auth initialization error:", error);
      } finally {
        updateAuthState({ loading: false });
      }
    };

    initializeAuth();

    // Set up auth state change listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        updateAuthState({ user: session?.user || null });

        if (session?.user) {
          await fetchProfile(session.user.id);
          const currentPath = window.location.pathname;
          if (currentPath === "/authentication") {
            router.push("/dialogues");
          }
        } else {
          updateAuthState({ profile: null });
          if (window.location.pathname !== "/") {
            router.push("/authentication");
          }
        }
      }
    );

    return () => {
      subscription.unsubscribe();
    };
  }, [router]);

  // Loading state
  if (authState.loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-gray-200 border-b-gray-900"></div>
          <p className="text-sm text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  const value: AuthContextType = {
    ...authState,
    signIn,
    signUp,
    signOut,
    updateProfile,
    resetAuthError,
  };

  return (
    <AuthContext.Provider value={value}>
      {authState.error && (
        <Alert variant="destructive" className="fixed top-4 right-4 w-96 z-50">
          <AlertDescription>{authState.error.message}</AlertDescription>
        </Alert>
      )}
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};