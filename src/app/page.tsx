import Footer from "@/components/layout/footer";
import HomeNav from "@/components/layout/navbars/homeNav";
import Navbar3 from "@/components/layout/navbars/homeNav";
import Cta from "@/components/sections/cta";
import Hero from "@/components/sections/hero";
import Ideals from "@/components/sections/ideals";
import ValueProp from "@/components/sections/valueProp";
import WhatWeArent from "@/components/sections/whatWeArent";
import SEO from "@/components/SEO";
import TextAnimatedDecoration from "@/components/ui/TextAnimatedDecoration";

export default function HomePage() {
  return (
    <>
      <SEO
        title="Your Company Name"
        description="Learn more about our company, mission, and team."
        canonicalUrl="https://www.yourwebsite.com/about"
        ogTitle="About Your Company"
        ogDescription="Discover the story behind our innovative solutions"
        ogImage="https://www.yourwebsite.com/about-og-image.jpg"
      />
      <main>
        <HomeNav />
        <Hero />
        <ValueProp />
        {/* TODO: Add favourite entries */}
        <Ideals />
        <WhatWeArent />
        <Cta />
        <Footer />
      </main>
    </>
  );
}
