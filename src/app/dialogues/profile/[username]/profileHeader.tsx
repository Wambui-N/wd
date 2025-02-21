import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

const ProfileHeader = ({ profile }: { profile: any }) => {
  return (
    <div className="flex items-center gap-4">
      <Avatar>
        <AvatarImage src={profile.avatar_url || "/default-avatar.png"} />
        <AvatarFallback>{profile.username?.charAt(0).toUpperCase()}</AvatarFallback>
      </Avatar>
      <div>
        <h2 className="text-xl font-semibold">{profile.username}</h2>
        <p className="text-orange">{profile.email}</p>
      </div>
    </div>
  );
};

export default ProfileHeader;
