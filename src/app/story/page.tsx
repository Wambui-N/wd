import SEO from "@/components/SEO";
import HomeNav from "@/components/layout/navbars/homeNav";
import Welcome from "@/components/sections/welcome";
import FoundersInspo from "@/components/sections/foundersInspo";
import WhoWeAre from "@/components/sections/whoWeAre";
import TalkingPoints from "@/components/sections/talkingPoints";
import Footer from "@/components/layout/footer";

export default function OurStory() {
  return (
    <>
      <SEO
        title="About Us - Your Company Name"
        description="Learn more about our company, mission, and team."
        canonicalUrl="https://www.yourwebsite.com/about"
        ogTitle="About Your Company"
        ogDescription="Discover the story behind our innovative solutions"
        ogImage="https://www.yourwebsite.com/about-og-image.jpg"
      />
      <main className="">
        <HomeNav />

        {/* Hero Section */}
        <section className="relative flex h-screen flex-col items-end justify-end bg-hero-bg bg-cover pb-12 pt-24 lg:h-[50vh]">
          <div className="responsive">
            <div className="place-items-start">
              <h1 className="text-6xl capitalize">Our Story</h1>
            </div>
          </div>
        </section>

        <Welcome />
        <FoundersInspo />
        <WhoWeAre />
        <TalkingPoints />
        <Footer />
      </main>
    </>
  );
}
