"use client";

import { useRef } from "react";
import { 
  Phone, 
  Mail, 
  MessageCircle,
  ExternalLink
} from "lucide-react";

// Raw SVG strings for reliable icons
const SVG_ICONS = {
  Linkedin: (props: React.SVGProps<SVGSVGElement>) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
  ),
  Instagram: (props: React.SVGProps<SVGSVGElement>) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
  ),
  Github: (props: React.SVGProps<SVGSVGElement>) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>
  )
};

const CONTACT_LINKS = [
  { name: "LinkedIn",   icon: SVG_ICONS.Linkedin,      href: "https://linkedin.com/", value: "Connect with me" },
  { name: "Instagram",  icon: SVG_ICONS.Instagram,     href: "https://instagram.com/", value: "@yourhandle" },
  { name: "WhatsApp",   icon: MessageCircle, href: "https://wa.me/1234567890", value: "Chat with me" },
  { name: "Phone",      icon: Phone,         href: "tel:+1234567890", value: "+1 (234) 567-890" },
  { name: "Gmail",      icon: Mail,          href: "mailto:your.email@gmail.com", value: "your.email@gmail.com" },
  { name: "Behance",    icon: ExternalLink,  href: "https://behance.net/", value: "View Portfolio" },
  { name: "GitHub",     icon: SVG_ICONS.Github,        href: "https://github.com/", value: "Explore Code" },
];

interface ContactProps {
  onOpenResume?: (type: "CV" | "Resume", fileUrl: string) => void;
}

export default function Contact({ onOpenResume }: ContactProps) {
  const sectionRef = useRef<HTMLElement>(null);

  return (
    <section 
      ref={sectionRef}
      className="relative w-full md:w-screen min-h-screen shrink-0 bg-[#0a0a0a] border-l border-[#222] overflow-hidden flex flex-col md:flex-row section-mobile-fix"
    >
      {/* ── Left Side: Massive Typography ── */}
      <div className="flex-1 flex flex-col justify-center px-10 md:px-20 relative z-10">
        <h2 className="text-[12vw] md:text-[8vw] font-black uppercase leading-[0.8] tracking-tighter text-transparent bg-clip-text" style={{ WebkitTextStroke: "2px rgba(255,255,255,0.1)" }}>
          LET&apos;S
        </h2>
        <h2 className="text-[12vw] md:text-[8vw] font-black uppercase leading-[0.8] tracking-tighter text-white">
          TALK.
        </h2>
        
        <p className="mt-12 text-white/40 text-lg md:text-xl font-light tracking-wide max-w-md">
          Open for opportunities, collaborations, or just a chat about the future of tech and design.
        </p>

        <div className="mt-12 flex flex-wrap gap-4 pointer-events-auto">
          <button 
            onClick={() => onOpenResume?.("CV", "/cv.pdf")}
            className="px-6 py-3 border border-white text-white text-sm tracking-widest uppercase hover:bg-white hover:text-black transition-colors cursor-pointer"
          >
            View CV
          </button>
          <button 
            onClick={() => onOpenResume?.("Resume", "/resume.pdf")}
            className="px-6 py-3 border border-white text-white text-sm tracking-widest uppercase hover:bg-white hover:text-black transition-colors cursor-pointer"
          >
            View Resume
          </button>
        </div>

        {/* Decorative Grid Lines */}
        <div className="absolute top-0 left-20 w-[1px] h-full bg-white/5 pointer-events-none" />
        <div className="absolute top-0 left-1/2 w-[1px] h-full bg-white/5 pointer-events-none" />
      </div>

      {/* ── Right Side: Brutalist Interactive Links ── */}
      <div className="flex-1 flex flex-col justify-center border-t md:border-t-0 md:border-l border-[#222] bg-[#0c0c0c]">
        <div className="w-full flex flex-col h-full md:h-auto justify-center">
          {CONTACT_LINKS.map((link, idx) => {
            const Icon = link.icon;
            return (
              <a 
                key={link.name} 
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative flex items-center justify-between px-10 py-6 border-b border-[#222] hover:bg-white transition-colors duration-500 overflow-hidden"
              >
                {/* Background Fill Animation */}
                <div className="absolute inset-0 bg-white translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] z-0" />

                <div className="relative z-10 flex items-center gap-6">
                  <span className="text-white/20 group-hover:text-black/20 text-xs font-mono">
                    0{idx + 1}
                  </span>
                  <div className="flex items-center gap-4 text-white group-hover:text-black transition-colors duration-500">
                    <Icon strokeWidth={1.5} size={28} className="group-hover:-rotate-12 transition-transform duration-500" />
                    <span className="text-3xl md:text-5xl font-bold uppercase tracking-tight">
                      {link.name}
                    </span>
                  </div>
                </div>

                <div className="relative z-10 flex items-center gap-4">
                  <span className="hidden md:block text-sm text-white/40 group-hover:text-black/60 font-medium tracking-widest uppercase transition-colors duration-500">
                    {link.value}
                  </span>
                  <div className="w-10 h-10 rounded-full border border-white/20 group-hover:border-black/20 flex items-center justify-center -rotate-45 group-hover:rotate-0 transition-all duration-500">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-white group-hover:text-black transition-colors duration-500">
                      <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
}
