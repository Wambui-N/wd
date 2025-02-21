import { useState } from "react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/lib/supabaseClient";

const ProfileDetails = ({ profile }: { profile: any }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [username, setUsername] = useState(profile.username);

  const handleUpdateProfile = async () => {
    const { error } = await supabase
      .from("profiles")
      .update({ username })
      .eq("id", profile.id);

    if (error) {
      alert("Error updating profile: " + error.message);
    } else {
      alert("Profile updated successfully!");
      setIsEditing(false);
    }
  };

  return (
    <div className="mt-6">
      {isEditing ? (
        <div>
          <input
            type="text"
            className="border p-2 rounded w-full"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <Button onClick={handleUpdateProfile}>Save</Button>
          <Button variant="outline" onClick={() => setIsEditing(false)}>Cancel</Button>
        </div>
      ) : (
        <Button onClick={() => setIsEditing(true)}>Edit Profile</Button>
      )}
    </div>
  );
};

export default ProfileDetails;
