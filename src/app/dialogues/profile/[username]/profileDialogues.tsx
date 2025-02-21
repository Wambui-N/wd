import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

// Define a type for the dialogue items
type DialogueItem = {
  title: any;
  id: any;
  created_at: any;
};

// Define a type for the dialogues state
type DialoguesState = {
  liked: DialogueItem[];
  saved: DialogueItem[];
  published: DialogueItem[];
  drafts: DialogueItem[];
};

const ProfileDialogues = ({ userId }: { userId: string }) => {
  const [dialogues, setDialogues] = useState<DialoguesState>({
    liked: [],
    saved: [],
    published: [],
    drafts: [],
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDialogues = async () => {
      if (!userId) return;

      // Fetch liked dialogues
      const { data: liked } = await supabase
        .from("likes")
        .select("dialogue_id, dialogues(title, id, created_at)")
        .eq("user_id", userId);

      // Fetch saved dialogues
      const { data: saved } = await supabase
        .from("saves")
        .select("dialogue_id, dialogues(title, id, created_at)")
        .eq("user_id", userId);

      // Fetch published dialogues
      const { data: published } = await supabase
        .from("dialogues")
        .select("id, title, created_at")
        .eq("author_id", userId)
        .eq("status", "published");

      // Fetch drafts
      const { data: drafts } = await supabase
        .from("dialogues")
        .select("id, title, created_at")
        .eq("author_id", userId)
        .eq("status", "draft");

      setDialogues({
        liked: liked?.flatMap((item) => item.dialogues) || [],
        saved: saved?.flatMap((item) => item.dialogues) || [],
        published: published ?? [],
        drafts: drafts ?? [],
      });

      setLoading(false);
    };

    fetchDialogues();
  }, [userId]);

  if (loading) return <p>Loading dialogues...</p>;

  return (
    <div className="mt-6">
      <Tabs defaultValue="published">
        <TabsList className="flex space-x-4 border-b">
          <TabsTrigger value="published">Published</TabsTrigger>
          <TabsTrigger value="drafts">Drafts</TabsTrigger>
          <TabsTrigger value="liked">Liked</TabsTrigger>
          <TabsTrigger value="saved">Saved</TabsTrigger>
        </TabsList>

        <TabsContent value="published">
          <DialogueList dialogues={dialogues.published} />
        </TabsContent>
        <TabsContent value="drafts">
          <DialogueList dialogues={dialogues.drafts} />
        </TabsContent>
        <TabsContent value="liked">
          <DialogueList dialogues={dialogues.liked} />
        </TabsContent>
        <TabsContent value="saved">
          <DialogueList dialogues={dialogues.saved} />
        </TabsContent>
      </Tabs>
    </div>
  );
};
// Reusable component for displaying dialogue lists
const DialogueList = ({ dialogues }: { dialogues: any[] }) => {
  if (!dialogues.length)
    return <p className="text-gray-500">No dialogues found.</p>;

  return (
    <ul className="list-disc pl-5">
      {dialogues.map((dialogue) => (
        <li key={dialogue.id}>
          <a
            href={`/dialogues/${dialogue.id}`}
            className="text-blue-500 hover:underline"
          >
            {dialogue.title}
          </a>{" "}
          - {new Date(dialogue.created_at).toLocaleDateString()}
        </li>
      ))}
    </ul>
  );
};

export default ProfileDialogues;
