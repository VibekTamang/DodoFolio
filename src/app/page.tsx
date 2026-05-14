"use client";
import { useState, useEffect } from "react";
import HorizontalScrollContainer from "@/components/layout/HorizontalScrollContainer";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Journey from "@/components/sections/Journey";
import Projects from "@/components/sections/Projects";
import Skills from "@/components/sections/Skills";
import NeuralBackground from "@/components/canvas/NeuralBackground";
import Preloader from "@/components/layout/Preloader";

import Outro from "@/components/sections/Outro";
import ModelShowcase from "@/components/sections/ModelShowcase";
import Contact from "@/components/sections/Contact";
import SoundManager from "@/components/ui/SoundManager";
import ResumeModal from "@/components/ui/ResumeModal";
import Footer from "@/components/ui/Footer";
import RadialNav from "@/components/ui/RadialNav";
import InteractiveBackground from "@/components/ui/InteractiveBackground";

export default function Home() {
  const [isLoaded, setIsLoaded] = useState(false);

  // Stop/Start Lenis scroll based on loader state
  useEffect(() => {
    if (typeof window !== "undefined" && (window as any).lenis) {
      if (!isLoaded) {
        (window as any).lenis.stop();
      } else {
        (window as any).lenis.start();
      }
    }
  }, [isLoaded]);

  const [modalConfig, setModalConfig] = useState<{
    isOpen: boolean;
    type: "CV" | "Resume";
    fileUrl: string;
  }>({
    isOpen: false,
    type: "CV",
    fileUrl: "/cv.pdf"
  });

  const openResumeModal = (type: "CV" | "Resume", fileUrl: string) => {
    setModalConfig({ isOpen: true, type, fileUrl });
  };

  const closeResumeModal = () => {
    setModalConfig(prev => ({ ...prev, isOpen: false }));
  };

  return (
    <main className="relative w-full bg-black min-h-screen text-white">
      {!isLoaded && <Preloader onComplete={() => setIsLoaded(true)} />}

      <ResumeModal 
        isOpen={modalConfig.isOpen}
        onClose={closeResumeModal}
        type={modalConfig.type}
        fileUrl={modalConfig.fileUrl}
      />

      {/* 3D Background Layer - High Fidelity Particle Field */}
      <InteractiveBackground />

      {/* Global Sound Manager */}
      <SoundManager />

      {/* Global Footer & Navigation */}
      {isLoaded && (
        <>
          <RadialNav />
          <Footer />
        </>
      )}

      {/* Horizontal Scroll Content */}
      <HorizontalScrollContainer isReady={isLoaded}>
        <Hero onOpenResume={openResumeModal} />
        <About />
        <Journey />
        <Projects />
        <Skills />
        <Outro />
        <ModelShowcase />
        <Contact onOpenResume={openResumeModal} />
      </HorizontalScrollContainer>
    </main>
  );
}
