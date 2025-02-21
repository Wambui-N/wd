"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";
import ProfileHeader from "./profileHeader";
import ProfileDetails from "./profileDetails";
import ProfileDialogues from "./profileDialogues";
import { AuthGuard } from "@/lib/authGuard";

const ProfilePage = () => {
  const { username } = useParams();
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      if (!username) return;
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("username", username)
        .single();

      if (error) {
        console.error("Error fetching profile:", error.message);
      } else {
        setProfile(data);
      }
      setLoading(false);
    };

    fetchProfile();
  }, [username]); // Added dependency array

  if (loading) return <p>Loading profile...</p>;
  if (!profile) return <p>Profile not found.</p>;

  return (
    <AuthGuard>
      <div className="container mx-auto p-6">
        <ProfileHeader profile={profile} />
        <ProfileDetails profile={profile} />
        <ProfileDialogues userId={profile.id} />
      </div>
    </AuthGuard>
  );
};

export default ProfilePage;
