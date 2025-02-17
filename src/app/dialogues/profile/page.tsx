"use client";

import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button"; // Optional: Add buttons or form styling
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"; // For user avatar
import { supabase } from "@/app/lib/utils/supabaseClient"; // For Supabase client
import { AuthGuard } from "@/app/lib/utils/authGuard";
import { User } from "@supabase/supabase-js";

const ProfilePage = () => {
  interface Profile {
    username: string;
  }

  const [profile, setProfile] = useState<Profile | null>(null);
  const [isEditing, setIsEditing] = useState(false); // Added state for editing mode
  const [newEmail, setNewEmail] = useState(""); // Added state for new email
  const [newPassword, setNewPassword] = useState(""); // Added state for new password
  const [user, setUser] = useState<User | null>(null); // Use the User type

  useEffect(() => {
    const fetchUser = async () => {
      const { data } = await supabase.auth.getUser(); // Await user data
      setUser(data?.user); // Set user state, ensuring it's a User or null
    };

    fetchUser();
  }, []);

  useEffect(() => {
    const fetchProfile = async () => {
      if (user) {
        // Query the profile table based on the user ID
        const { data, error } = await supabase
          .from("profile")
          .select("username")
          .eq("user_id", user.id) // Access user.id after resolving user
          .limit(1) // Limit to 1 row instead of using .single()
          .single(); // Fetch only one row

        if (error) {
          console.error("Error fetching profile:", error.message);
        } else if (data) {
          setProfile(data as any);
        } else {
          console.warn("No profile found for user:", user.id);
          setProfile(null); // Handle case where no profile is found
        }
      }
    };

    fetchProfile(); // Call fetchProfile after user is set
  }, [user]); // Dependency on user

  console.log(profile?.username);

  // const handleUpdateProfile = async () => {
  //   if (!newEmail || !newPassword) {
  //     alert("Please provide a valid email and password");
  //     return;
  //   }

  //   const { error } = await supabase.auth.updateUser({
  //     email: newEmail,
  //     password: newPassword,
  //   });

  //   if (error) {
  //     alert(error.message);
  //   } else {
  //     alert("Profile updated successfully!");
  //     setIsEditing(false); // Exit editing mode
  //   }
  // };

  // const handleSignOut = async () => {
  //   await signOut();
  // };

  // if (!user) {
  //   return <div>You are not logged in</div>;
  // }

  return (
    <AuthGuard>
      <div className="profile-page container mx-auto p-6">
        <h1 className="mb-4 text-2xl font-semibold">Profile</h1>

        <div className="profile-header mb-6 flex items-center gap-4">
          <Avatar className="bg-orange">
            <AvatarImage
              src={
                user?.user_metadata?.avatar_url ||
                "https://github.com/shadcn.png"
              }
            />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <div>
            <h2 className="text-xl font-medium">{profile?.username}</h2>
            <p className="text-gray-500">{user?.email || "N/A"}</p>
          </div>
        </div>

        {isEditing ? (
          <div className="edit-form space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium">
                Email
              </label>
              <input
                type="email"
                id="email"
                className="input-field"
                value={newEmail}
                onChange={(e) => setNewEmail(e.target.value)}
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium">
                New Password
              </label>
              <input
                type="password"
                id="password"
                className="input-field"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
            </div>

            {/* <Button onClick={handleUpdateProfile}>Update Profile</Button> */}
            <Button variant="outline" onClick={() => setIsEditing(false)}>
              Cancel
            </Button>
          </div>
        ) : (
          <div>
            <Button onClick={() => setIsEditing(true)}>Edit Profile</Button>
          </div>
        )}

        <div className="mt-6">
          {/* <Button variant="destructive" onClick={handleSignOut}>
            Sign Out
          </Button> */}
        </div>
      </div>
    </AuthGuard>
  );
};

export default ProfilePage;

