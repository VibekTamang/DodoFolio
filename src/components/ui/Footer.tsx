"use client";

export default function Footer() {
  return (
    <footer className="fixed bottom-0 left-0 w-full z-[100] pointer-events-none">
      {/* High-Visibility Solid Minimal Separator Line */}
      <div className="w-full h-[1px] bg-white/65 relative z-20" />

      {/* Glassmorphic Background Bar */}
      <div className="absolute inset-0 bg-black/50 backdrop-blur-md z-0" />

      <div className="px-10 py-3 flex flex-col md:flex-row justify-between items-center relative z-10">
        {/* Left: Copyright */}
        <div className="text-[7px] md:text-[8px] font-medium tracking-[0.4em] text-white/40 uppercase">
          © 2026 VIBEK TAMANG. ALL EDITIONS RESERVED.
        </div>

        {/* Right: Tech Stack */}
        <div className="hidden md:flex items-center gap-4 text-[7px] font-bold tracking-[0.4em] text-white/30 uppercase">
          <span>Next.js 15</span>
          <span>GSAP</span>
          <span>Tailwind CSS V4</span>
        </div>
      </div>
    </footer>
  );
}
