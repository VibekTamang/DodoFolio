"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import HorizontalScrollContainer from "@/components/layout/HorizontalScrollContainer";
import Preloader from "@/components/layout/Preloader";

const allProjects = [
  { id: 1, title: "POYO - Pocket Yoga", year: "2024", type: "AI/CV App", desc: "Best Project Award. AI-powered yoga app that evaluates poses in real time with CV." },
  { id: 2, title: "EcoVision", year: "2025", type: "IoT/ML", desc: "AI-powered IoT plastic bottle recycling application for sustainable behavior." },
  { id: 3, title: "COP28 Bhutan", year: "2023", type: "Digital Platform", desc: "Digital platform for Bhutan's COP28 participation under Ministry of Energy." },
  { id: 4, title: "Citrix Bleed", year: "2023", type: "Cybersecurity", desc: "CVE-2023-4966 simulation with a Flask-based mock server and Docker/VMware." },
  { id: 5, title: "Rainfall Prediction", year: "2024", type: "Machine Learning", desc: "ML-based rainfall prediction web app featuring a user-friendly prediction system." },
  { id: 6, title: "GCIT AI Chatbot", year: "2026", type: "AI Capstone", desc: "RAG-powered chatbot integrating institutional data for student convenience." },
];

export default function ProjectsPage() {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <main className="relative w-full bg-[#050505] min-h-screen text-white">
      {!isLoaded && <Preloader onComplete={() => setIsLoaded(true)} />}

      <HorizontalScrollContainer isReady={isLoaded}>
        
        {/* Intro Section */}
        <section className="w-screen h-screen shrink-0 flex flex-col justify-between p-8 md:p-16 border-r border-[#222]">
          <nav className="flex justify-between items-center w-full">
            <Link href="/" className="flex items-center gap-2 text-white/50 hover:text-white transition-colors uppercase tracking-widest text-sm">
              <ArrowLeft size={16} /> Back to Portfolio
            </Link>
            <div className="text-xs tracking-[0.3em] text-white/30 uppercase">
              Archive
            </div>
          </nav>

          <div className="flex flex-col justify-center flex-1">
            <h1 className="text-6xl md:text-[8vw] font-black uppercase tracking-tighter mb-6 leading-none">
              All<br />Projects
            </h1>
            <p className="text-white/40 max-w-xl text-lg md:text-xl font-light">
              A comprehensive archive of all my featured work, side projects, and experiments in AI, Web, and Cybersecurity.
            </p>
          </div>
        </section>

        {/* 2-Row Horizontal Grid Section */}
        <section className="h-screen flex items-center px-10 md:px-24 shrink-0">
          <div className="grid grid-rows-2 grid-flow-col gap-6 h-[75vh]">
            {allProjects.map((project) => (
              <div 
                key={project.id}
                className="relative w-[85vw] md:w-[40vw] border border-[#222] hover:border-white transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] overflow-hidden bg-[#0a0a0a] cursor-pointer group"
              >
                <div className="absolute inset-0 p-8 flex flex-col justify-between z-10">
                  <div className="flex justify-between items-start w-full">
                    <span className="text-xs uppercase tracking-widest text-white/40 group-hover:text-white transition-colors">{project.year}</span>
                    <span className="text-xs uppercase tracking-widest border border-[#333] group-hover:border-white px-3 py-1 transition-colors">{project.type}</span>
                  </div>
                  
                  <div className="transform transition-transform duration-500 translate-y-4 group-hover:translate-y-0">
                    <h3 className="font-black uppercase tracking-tighter text-3xl md:text-5xl text-white/70 group-hover:text-white transition-colors duration-500">
                      {project.title}
                    </h3>
                    
                    <div className="mt-4 overflow-hidden transition-all duration-500 max-h-0 opacity-0 group-hover:max-h-32 group-hover:opacity-100">
                      <p className="text-white/50 text-sm md:text-base mb-4 line-clamp-2">{project.desc}</p>
                      <button className="flex items-center gap-2 text-sm uppercase tracking-widest hover:pl-2 transition-all text-white">
                        View Details <ArrowRight size={16} />
                      </button>
                    </div>
                  </div>
                </div>
                
                {/* Grain overlay for brutalist feel */}
                <div className="absolute inset-0 opacity-[0.03] pointer-events-none mix-blend-difference" 
                     style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")' }}>
                </div>
              </div>
            ))}
          </div>
        </section>

      </HorizontalScrollContainer>
    </main>
  );
}
