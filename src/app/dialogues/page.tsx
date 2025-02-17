"use client";

import SearchSection from "@/components/dialogues/search-section";
import DialoguesLayout from "./layout";
import SEO from "@/components/SEO";
import DialogueNav from "@/components/layout/navbars/dialogueNav";
import ArticleCard from "@/components/dialogues/article-card";
import { useAuth } from "../lib/utils/authContext";
import { AuthGuard } from "../lib/utils/authGuard";

export default function Dialogues() {
  const { user } = useAuth(); // Access user data

  return (
    <AuthGuard>
      <DialoguesLayout>
        <SEO
          title="About Us - Your Company Name"
          description="Learn more about our company, mission, and team."
          canonicalUrl="https://www.yourwebsite.com/about"
          ogTitle="About Your Company"
          ogDescription="Discover the story behind our innovative solutions"
          ogImage="https://www.yourwebsite.com/about-og-image.jpg"
        />
        <main className="mx-6 flex-1">
          <DialogueNav />
          <div className="flex flex-col gap-4">
            <div className="w-full pt-24">
              <SearchSection />
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div className="col-span-2 h-full space-y-6 border-r border-muted-foreground/30 pr-4">
                <ArticleCard
                  author={{
                    name: "JOSHUA WANZA",
                    avatar: "https://github.com/shadcn.png",
                  }}
                  title="Parenting With Chronic Illness"
                  description="Balancing caregiving and work felt impossible—until I discovered strategies shared by others who've been there."
                  tags={["Caregiving", "Balance"]}
                  readTime="6 Min Read"
                  date="March 15"
                  image="https://images.pexels.com/photos/1471843/pexels-photo-1471843.jpeg?auto=compress&cs=tinysrgb&w=600"
                />
              </div>
              <div className="col-span-1 h-full border border-black bg-black p-5"></div>
            </div>
          </div>
        </main>
      </DialoguesLayout>
    </AuthGuard>
  );
}
