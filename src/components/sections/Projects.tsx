"use client";
import { useState } from "react";
import { ArrowRight } from "lucide-react";

import Link from "next/link";

const projects = [
  { 
    id: 1, 
    title: "POYO - Pocket Yoga", 
    year: "2024", 
    type: "AI/CV App", 
    desc: "Best Project Award. AI-powered yoga app that evaluates poses in real time with CV.",
    logo: "/poyo-logo.svg",
    images: ["/poyo-hero.svg", "/carousel-1.png"]
  },
  { id: 2, title: "EcoVision", year: "2025", type: "IoT/ML", desc: "AI-powered IoT plastic bottle recycling application for sustainable behavior." },
  { id: 3, title: "COP28 Bhutan", year: "2023", type: "Digital Platform", desc: "Digital platform for Bhutan's COP28 participation under Ministry of Energy." },
];

export default function Projects() {
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <section className="w-full md:w-[130vw] min-h-screen py-20 md:py-0 flex flex-col md:flex-row items-center justify-start px-6 md:px-24 shrink-0 border-b md:border-b-0 md:border-r border-[#222] relative group">
      <div className="flex flex-col justify-center w-full max-w-full md:max-w-[75vw]">
      <div className="flex justify-between items-end mb-16">
        <h2 className="text-4xl md:text-6xl font-bold uppercase tracking-tighter">
          Projects
        </h2>
        <Link href="/projects" className="hidden md:flex items-center gap-2 text-white/50 hover:text-white uppercase tracking-widest text-sm transition-colors border-b border-transparent hover:border-white pb-1">
          View All Projects <ArrowRight size={16} />
        </Link>
      </div>
      
      <div className="flex flex-col md:flex-row w-full h-auto md:h-[60vh] gap-6 md:gap-4">
        {projects.map((project) => (
          <div 
            key={project.id}
            onMouseEnter={() => setHovered(project.id)}
            onMouseLeave={() => setHovered(null)}
            className={`relative border border-white transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] overflow-hidden bg-[#050505] cursor-pointer min-h-[300px] md:min-h-0
              ${hovered === project.id ? 'md:flex-[3]' : hovered === null ? 'md:flex-1' : 'md:flex-[0.5]'}`}
          >
            {/* Background Image Logic */}
            {project.logo && (
              <div className={`absolute inset-0 flex items-center justify-center transition-all duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] ${hovered === project.id ? 'opacity-0 scale-110 blur-md' : 'opacity-30 scale-100 blur-0'}`}>
                <img src={project.logo} alt={`${project.title} Logo`} className="w-1/2 object-contain" />
              </div>
            )}
            
            {project.images && (
              <div className={`absolute inset-0 flex transition-all duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] ${hovered === project.id ? 'opacity-100 scale-100 blur-0' : 'opacity-0 scale-95 blur-sm'}`}>
                <div className="w-1/2 h-full overflow-hidden">
                  <img src={project.images[0]} alt="UI View 1" className="w-full h-full object-cover opacity-60 hover:opacity-100 transition-opacity duration-700" />
                </div>
                <div className="w-1/2 h-full overflow-hidden">
                  <img src={project.images[1]} alt="UI View 2" className="w-full h-full object-cover opacity-60 hover:opacity-100 transition-opacity duration-700" />
                </div>
                {/* Gradient overlay to ensure text readability */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/70 to-[#050505]/20 pointer-events-none"></div>
              </div>
            )}

            <div className="absolute inset-0 p-6 flex flex-col justify-between z-10 pointer-events-none">
              <div className="flex justify-between items-start w-full">
                <span className="text-xs uppercase tracking-widest text-gray-500 drop-shadow-md">{project.year}</span>
                <span className="text-xs uppercase tracking-widest border border-white/20 px-2 py-1 drop-shadow-md backdrop-blur-sm bg-black/20">{project.type}</span>
              </div>
              
              <div className={`transform transition-transform duration-500 ${hovered === project.id ? 'translate-y-0' : 'translate-y-4'}`}>
                <h3 className={`font-black uppercase tracking-tighter transition-all duration-500 
                  ${hovered === project.id ? 'text-3xl md:text-6xl text-white' : 'text-xl md:text-2xl text-white/50'}`}>
                  {project.title}
                </h3>
                
                <div className={`mt-4 overflow-hidden transition-all duration-500 ${hovered === project.id ? 'max-h-32 opacity-100' : 'max-h-0 opacity-0'}`}>
                  <p className="text-gray-300 text-sm mb-4 line-clamp-3 drop-shadow-md">{project.desc}</p>
                  <button className="flex items-center gap-2 text-sm uppercase tracking-widest hover:pl-2 transition-all pointer-events-auto">
                    View Case <ArrowRight size={16} />
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
      </div>
      
      {/* Section Number Indicator */}
      <div className="hidden md:flex flex-col justify-center items-center h-full ml-20">
        <div className="text-[15vw] xl:text-[20vw] font-black opacity-5 tracking-tighter pointer-events-none group-hover:opacity-10 transition-opacity duration-1000 leading-none">
          03
        </div>
      </div>
    </section>
  );
}
