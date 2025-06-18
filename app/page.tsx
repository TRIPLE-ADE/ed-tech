import React from "react";

import {
  FloatingParticles,
  GradientBackground,
  Hero,
  Demo,
  Feature,
  Benefits,
  CTA,
  Testimonial,
} from "@/features/landing/components";
import { Footer, Header } from "@/components/layout";

export default function EnhancedThryXLanding() {
  return (
    <>
      <Header />
      <main className='relative overflow-hidden min-h-screen bg-background text-foreground'>
        <GradientBackground />
        <FloatingParticles />

        {/* Sections */}
        <Hero />
        <Demo />
        <Feature />
        <Benefits />
        <Testimonial />
        <CTA />
      </main>
      <Footer />
    </>
  );
}
