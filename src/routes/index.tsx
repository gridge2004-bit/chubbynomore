import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Nav, PromoBanner } from "@/components/home/Nav";
import { Hero } from "@/components/home/Hero";
import { TrustMarquee, TrustedCare, WeightLossScale } from "@/components/home/Trust";
import { MedicalTeam } from "@/components/home/MedicalTeam";
import { SwitchingCare, HowItWorks, WhyChoose } from "@/components/home/Story";
import { EmotionalTransformation } from "@/components/home/EmotionalTransformation";
import { MedicationOptions } from "@/components/home/MedicationOptions";
import { WhoQualifies, WhoNotFor } from "@/components/home/Qualify";
import { FinalCTA, Footer } from "@/components/home/Footer";
import { Testimonials } from "@/components/home/Testimonials";
import { FAQ } from "@/components/home/FAQ";
import { StickyMobileCTA } from "@/components/home/StickyMobileCTA";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Online GLP-1 Weight Loss Program | Chubby No More" },
      { name: "description", content: "Online GLP-1 weight-management care with licensed-provider review. Explore compounded semaglutide and compounded tirzepatide options." },
      { property: "og:title", content: "Online GLP-1 Weight Loss Program | Chubby No More" },
      { property: "og:description", content: "Licensed-provider-reviewed online GLP-1 weight-management care with compounded semaglutide and tirzepatide options." },
      { property: "og:site_name", content: "Chubby No More" },
      { property: "og:url", content: "https://chubbynomore.com/" },
      { name: "twitter:title", content: "Online GLP-1 Weight Loss Program | Chubby No More" },
      { name: "twitter:description", content: "Licensed-provider-reviewed online GLP-1 weight-management care with compounded semaglutide and tirzepatide options." },
      { property: "og:image", content: "https://chubbynomore.com/__l5e/assets-v1/b99e2d31-702f-4a98-b1b7-9bca6ef9f964/cnm-social.jpg" },
      { name: "twitter:image", content: "https://chubbynomore.com/__l5e/assets-v1/b99e2d31-702f-4a98-b1b7-9bca6ef9f964/cnm-social.jpg" },
    ],
    links: [{ rel: "canonical", href: "https://chubbynomore.com/" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebSite",
          name: "Chubby No More",
          alternateName: ["ChubbyNoMore", "CNM", "chubbynomore.com"],
          url: "https://chubbynomore.com/",
        }),
      },
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Organization",
          name: "Chubby No More",
          alternateName: "ChubbyNoMore",
          url: "https://chubbynomore.com/",
          logo: "https://chubbynomore.com/icon-512x512.png",
        }),
      },
    ],
  }),
  component: Index,
});


function Index() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="min-h-screen w-full max-w-full overflow-x-hidden bg-white text-[#103942]">
      <PromoBanner />
      <Nav scrolled={scrolled} />
      <Hero />
      <TrustMarquee />
      <MedicalTeam />
      <SwitchingCare />
      <HowItWorks />
      <WhyChoose />
      <EmotionalTransformation />
      <MedicationOptions />

      <WeightLossScale />
      <WhoQualifies />
      <WhoNotFor />

      <TrustedCare />
      <FinalCTA />
      <Testimonials />
      <FAQ />
      <Footer />
      <div className="h-20 md:hidden" aria-hidden="true" />
      <StickyMobileCTA />
    </div>
  );
}

