"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { X, Download, FileText } from "lucide-react";

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
  type: "CV" | "Resume";
  fileUrl: string;
}

export default function ResumeModal({ isOpen, onClose, type, fileUrl }: ResumeModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      
      const tl = gsap.timeline();
      tl.to(overlayRef.current, {
        display: "flex",
        opacity: 1,
        duration: 0.4,
        ease: "power2.out"
      })
      .fromTo(contentRef.current, 
        { y: 50, opacity: 0, scale: 0.95 },
        { y: 0, opacity: 1, scale: 1, duration: 0.6, ease: "back.out(1.2)" },
        "-=0.2"
      );
    } else {
      document.body.style.overflow = "unset";
      gsap.to(overlayRef.current, {
        opacity: 0,
        duration: 0.3,
        ease: "power2.in",
        onComplete: () => {
          if (overlayRef.current) overlayRef.current.style.display = "none";
        }
      });
    }
  }, [isOpen]);

  if (!isOpen && !overlayRef.current) return null;

  return (
    <div 
      ref={overlayRef}
      className="fixed inset-0 z-[200] hidden items-center justify-center bg-black px-4"
      style={{ opacity: 0 }}
      onClick={(e) => {
        if (e.target === overlayRef.current) onClose();
      }}
    >
      {/* Cinematic Grid Background */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div className="absolute inset-0" style={{
          backgroundImage: `
            linear-gradient(rgba(255, 255, 255, 0.05) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255, 255, 255, 0.05) 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px'
        }} />
      </div>

      <div 
        ref={contentRef}
        className="relative w-full max-w-4xl max-h-[90vh] bg-black border border-white/10 rounded-2xl overflow-hidden flex flex-col shadow-2xl"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-white/10 bg-black/50 backdrop-blur-xl">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-white/5 rounded-lg border border-white/10">
              <FileText className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold tracking-tight text-white uppercase">{type} Preview</h2>
              <p className="text-xs text-white/40 tracking-widest uppercase">Digital Document System v1.0</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-2 hover:bg-white/10 rounded-full transition-colors text-white/60 hover:text-white"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Content Preview (Themed View) */}
        <div className="flex-1 overflow-y-auto p-8 md:p-12 custom-scrollbar">
          <div className="max-w-2xl mx-auto space-y-12">
            {/* Branding Header */}
            <div className="text-center space-y-4">
              <h1 className="text-4xl md:text-6xl font-black tracking-tighter uppercase">
                Vibek <span className="text-white/30" style={{ WebkitTextStroke: '1px rgba(255,255,255,0.3)', color: 'transparent' }}>Tamang</span>
              </h1>
              <div className="h-px w-24 bg-white mx-auto" />
              <p className="text-sm md:text-base tracking-[0.3em] uppercase text-white/60 font-medium">
                AI & Machine Learning Engineer
              </p>
            </div>

            {/* Content Mockup - This is where the custom branding shines */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-8">
              <div className="space-y-6">
                <div className="space-y-2">
                  <h3 className="text-xs tracking-[0.3em] uppercase text-white font-bold">Experience</h3>
                  <div className="space-y-4">
                    {[1, 2].map((i) => (
                      <div key={i} className="p-4 border border-white/5 bg-white/[0.02] rounded-lg">
                        <div className="h-4 w-3/4 bg-white/10 rounded animate-pulse mb-2" />
                        <div className="h-3 w-1/2 bg-white/5 rounded animate-pulse" />
                      </div>
                    ))}
                  </div>
                </div>
                <div className="space-y-2">
                  <h3 className="text-xs tracking-[0.3em] uppercase text-white font-bold">Education</h3>
                  <div className="p-4 border border-white/5 bg-white/[0.02] rounded-lg">
                    <div className="h-4 w-2/3 bg-white/10 rounded animate-pulse mb-2" />
                    <div className="h-3 w-1/3 bg-white/5 rounded animate-pulse" />
                  </div>
                </div>
              </div>
              <div className="space-y-6">
                <div className="space-y-2">
                  <h3 className="text-xs tracking-[0.3em] uppercase text-white font-bold">Core Skills</h3>
                  <div className="flex flex-wrap gap-2">
                    {['Neural Networks', 'Python', 'React', 'Three.js', 'GSAP', 'Next.js'].map((skill) => (
                      <span key={skill} className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-[10px] tracking-widest uppercase text-white/60">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="p-6 border border-white/10 bg-gradient-to-br from-white/[0.05] to-transparent rounded-xl">
                  <p className="text-sm italic text-white/50 leading-relaxed">
                    "Pushing the boundaries of human-AI interaction through cinematic digital experiences."
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer / Download Action */}
        <div className="p-6 border-t border-white/10 bg-black/50 backdrop-blur-xl flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-white/40 tracking-widest uppercase">
            Click download to receive the full high-fidelity PDF
          </p>
          <a 
            href={fileUrl}
            download
            className="w-full md:w-auto flex items-center justify-center gap-3 px-8 py-4 bg-white text-black text-xs font-bold tracking-[0.2em] uppercase hover:bg-gray-200 transition-all transform hover:scale-[1.02] active:scale-[0.98] group"
          >
            <Download className="w-4 h-4 group-hover:animate-bounce" />
            Download Full {type}
          </a>
        </div>
      </div>

      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.02);
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.1);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(255, 255, 255, 0.2);
        }
      `}</style>
    </div>
  );
}
