"use client";

interface HeroProps {
  onOpenResume?: (type: "CV" | "Resume", fileUrl: string) => void;
}

export default function Hero({ onOpenResume }: HeroProps) {
  return (
    <section className="relative w-full md:w-screen min-h-screen flex flex-col justify-center px-6 md:px-24 shrink-0 border-b md:border-b-0 md:border-r border-[#222] overflow-hidden section-mobile-fix">
      {/* Portrait Background */}
      <div className="absolute inset-0 z-0 pointer-events-none flex justify-end items-end md:items-center">
        <div 
          className="relative w-[120%] h-[70%] md:w-[60%] md:h-full opacity-50 md:opacity-70 mix-blend-lighten"
          style={{
            maskImage: 'radial-gradient(ellipse at center, rgba(0,0,0,1) 20%, rgba(0,0,0,0) 70%)',
            WebkitMaskImage: 'radial-gradient(ellipse at center, rgba(0,0,0,1) 20%, rgba(0,0,0,0) 70%)'
          }}
        >
          {/* Using standard img tag temporarily to prevent Next.js from crashing when portrait.jpg is missing */}
          <img 
            src="/portrait.jpg" 
            alt="Vibek Tamang Portrait"
            className="w-full h-full object-cover object-top md:object-center grayscale"
          />
        </div>
      </div>

      <div className="relative z-10 w-full max-w-5xl">
        <h1 className="text-6xl md:text-[9vw] font-black tracking-tighter leading-[0.85] uppercase break-words w-full">
          Vibek<br />
          <span style={{ WebkitTextStroke: '1px white', color: 'transparent' }} >Tamang</span>
        </h1>
        <div className="mt-12 md:mt-24 w-full md:w-1/2 ml-auto border-t border-white/50 pt-6 backdrop-blur-sm">
          <p className="text-sm md:text-lg font-medium tracking-widest uppercase text-gray-300 drop-shadow-md">
            AI & Machine Learning Engineer
          </p>
          <p className="text-xs md:text-sm font-medium tracking-widest uppercase text-gray-400 mt-2 drop-shadow-md">
            Computer Vision | Cybersecurity Enthusiast
          </p>
          <div className="mt-8 flex flex-wrap gap-4 pointer-events-auto">
            <button 
              onClick={() => onOpenResume?.("CV", "/cv.pdf")}
              className="px-6 py-3 border border-white text-white text-xs md:text-sm tracking-widest uppercase hover:bg-white hover:text-black transition-all duration-300 ease-out cursor-pointer relative z-10"
            >
              View CV
            </button>
            <button 
              onClick={() => onOpenResume?.("Resume", "/resume.pdf")}
              className="px-6 py-3 border border-white text-white text-xs md:text-sm tracking-widest uppercase hover:bg-white hover:text-black transition-all duration-300 ease-out cursor-pointer relative z-10"
            >
              View Resume
            </button>
          </div>
        </div>
      </div>

      {/* Ghost Typography Layer - Revealed by Spotlight */}
      <div className="absolute left-10 md:left-24 bottom-1/4 z-0 pointer-events-none select-none">
        <h2 
          className="text-[40vw] md:text-[25vw] font-black leading-none opacity-[0.03] uppercase"
          style={{ WebkitTextStroke: '2px white', color: 'transparent' }}
        >
          Dodo
        </h2>
      </div>
    </section>
  );
}
