import { useAuth } from "@/app/lib/utils/authContext";

const MyComponent = () => {
  const { user, profile, signIn, signUp, signOut } = useAuth();

  // Use the auth functions and data
};
