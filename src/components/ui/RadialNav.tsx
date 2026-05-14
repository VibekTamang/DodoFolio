"use client";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

const NAV_ITEMS = [
  { id: '00', title: 'Home', desc: 'Landing Page', detail: 'EST. 2026 / CORE SYSTEM', angle: 6.5, offset: 0 },
  { id: '01', title: 'Profile', desc: 'Background & Ethos', detail: 'CS STUDENT / AI SPECIALIST', angle: 0, offset: 100 },
  { id: '02', title: 'Experience', desc: 'Journey & Education', detail: '2022-2026 / LEADERSHIP', angle: -6.5, offset: 220 },
  { id: '03', title: 'Projects', desc: 'Selected Works', detail: 'ECOVISION / GCIT CHATBOT', angle: -13, offset: 340 },
  { id: '04', title: 'System Core', desc: 'Skills & Tools', detail: 'CV / DEEP LEARNING / CYBER', angle: -19.5, offset: 470 },
  { id: '05', title: 'Showcase', desc: 'Interactive Models', detail: '3D PARTICLES / RENDER', angle: -26, offset: 690 },
  { id: 'CT', title: 'Contact', desc: 'Get in touch', detail: 'REMOTE / WORLDWIDE', angle: -32.5, offset: 790 },
];

export default function RadialNav() {
  const wheelRef = useRef<HTMLDivElement>(null);
  const menuContentRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(-1);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const onUpdate = (self: globalThis.ScrollTrigger) => {
      const progress = self.progress;
      const w = window.innerWidth;
      
      const scrollContent = document.querySelector('.scroll-content-inner');
      if (!scrollContent) return;
      
      const scrollWidth = scrollContent.scrollWidth;
      const maxScroll = scrollWidth - w;
      const scrollOffset = progress * maxScroll;
      
      // Calculate wheel rotation based on offset segments
      let currentIdx = 0;
      for (let i = 0; i < NAV_ITEMS.length - 1; i++) {
        const startScroll = (NAV_ITEMS[i].offset / 100) * w;
        const endScroll = (NAV_ITEMS[i+1].offset / 100) * w;
        if (scrollOffset >= startScroll && scrollOffset <= endScroll) {
          currentIdx = i;
          break;
        }
        if (i === NAV_ITEMS.length - 2 && scrollOffset > endScroll) {
          currentIdx = NAV_ITEMS.length - 1;
        }
      }

      let wheelRotation = 0;
      if (currentIdx < NAV_ITEMS.length - 1) {
        const startItem = NAV_ITEMS[currentIdx];
        const endItem = NAV_ITEMS[currentIdx + 1];
        
        const startScroll = (startItem.offset / 100) * w;
        const endScroll = (endItem.offset / 100) * w;
        
        if (endScroll - startScroll !== 0) {
          const segmentProgress = (scrollOffset - startScroll) / (endScroll - startScroll);
          const startRot = -startItem.angle;
          const endRot = -endItem.angle;
          wheelRotation = startRot + (endRot - startRot) * segmentProgress;
        } else {
          wheelRotation = -startItem.angle;
        }
      } else {
        wheelRotation = -NAV_ITEMS[NAV_ITEMS.length - 1].angle;
      }
      
      if (wheelRef.current) {
        gsap.set(wheelRef.current, { rotation: wheelRotation });
      }

      let closestIdx = -1;
      let minDiff = 999;
      NAV_ITEMS.forEach((item, idx) => {
        const currentItemAngle = wheelRotation + item.angle;
        if (Math.abs(currentItemAngle) < minDiff) {
          minDiff = Math.abs(currentItemAngle);
          closestIdx = idx;
        }
      });
      
      if (minDiff < 4) {
        setActiveIndex(closestIdx);
      } else {
        setActiveIndex(-1);
      }
    };

    // Wait slightly for HorizontalScrollContainer to pin the layout
    const timer = setTimeout(() => {
      const st = ScrollTrigger.create({
        trigger: document.body,
        start: "top top",
        end: "bottom bottom",
        onUpdate: onUpdate,
      });

      return () => {
        st.kill();
      };
    }, 200);

    return () => clearTimeout(timer);
  }, []);

  // Animate menu reveal
  useEffect(() => {
    if (!menuContentRef.current) return;
    
    if (isOpen) {
      gsap.to(menuContentRef.current, {
        x: 0,
        opacity: 1,
        duration: 0.9,
        ease: "expo.inOut"
      });
      // Cinematic scale-up bloom
      if (wheelRef.current) {
        gsap.fromTo(wheelRef.current, 
          { scale: 0.7, opacity: 0 }, 
          { scale: 1, opacity: 1, duration: 1.1, ease: "expo.out" }
        );
      }
    } else {
      gsap.to(menuContentRef.current, {
        x: -50,
        opacity: 0,
        duration: 0.7,
        ease: "expo.inOut"
      });
      if (wheelRef.current) {
        gsap.to(wheelRef.current, { scale: 0.9, opacity: 0, duration: 0.6, ease: "expo.in" });
      }
    }
  }, [isOpen]);

  const handleNavClick = (offsetVw: number) => {
    const w = window.innerWidth;
    const targetY = (offsetVw / 100) * w;
    
    // Close menu on click
    setIsOpen(false);
    
    if ((window as any).lenis) {
      (window as any).lenis.scrollTo(targetY, {
        duration: 0.8,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t))
      });
    } else {
      window.scrollTo({ top: targetY, behavior: 'smooth' });
    }
  };

  return (
    <>
      {/* Permanent Overlay Container */}
      <div className="fixed inset-0 z-40 pointer-events-none">
        
        {/* Backdrop Overlay - Blurs background when menu is open */}
        <div 
          className={`absolute inset-0 bg-black/40 backdrop-blur-md transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
          onClick={() => setIsOpen(false)}
        />
        
        {/* Toggle Button - High Visibility Top Right */}
        <button 
          onClick={() => setIsOpen(!isOpen)}
          className={`absolute top-8 right-10 w-16 h-16 rounded-full border-2 flex items-center justify-center pointer-events-auto transition-all duration-500 hover:scale-110 z-50 shadow-[0_0_20px_rgba(255,255,255,0.1)] ${
            isOpen 
              ? 'bg-white border-white' 
              : 'bg-black/60 border-white/40 hover:border-white'
          }`}
          aria-label="Toggle Menu"
        >
          <div className="relative w-8 h-8 flex flex-col justify-center items-center gap-2">
            <span className={`w-full h-0.5 transition-all duration-500 ${isOpen ? 'bg-black rotate-45 translate-y-2.5' : 'bg-white'}`} />
            <span className={`w-full h-0.5 transition-all duration-500 ${isOpen ? 'opacity-0' : 'bg-white'}`} />
            <span className={`w-full h-0.5 transition-all duration-500 ${isOpen ? 'bg-black -rotate-45 -translate-y-2.5' : 'bg-white'}`} />
          </div>
        </button>

        {/* Menu Content Wrapper */}
        <div 
          ref={menuContentRef} 
          className="absolute inset-0 opacity-0 pointer-events-none"
          style={{ transform: 'translateX(-100px)' }}
        >
          {/* Subtle left gradient */}
          <div className="absolute inset-y-0 left-0 w-[500px] bg-gradient-to-r from-black/95 via-black/60 to-transparent" />

          {/* Logo/Title */}
          <div className="absolute top-8 left-10 font-black tracking-tighter text-4xl text-white pointer-events-auto">
            D.O.D.O
          </div>

          {/* Selection Framing Lines - Tightened Gap */}
          <div className={`absolute top-1/2 left-0 w-full h-[140px] -translate-y-1/2 pointer-events-none transition-opacity duration-300 ${activeIndex !== -1 ? 'opacity-100' : 'opacity-0'}`}>
            <div className="absolute top-0 left-0 w-1/3 h-[1px] bg-gradient-to-r from-white/60 to-transparent shadow-[0_0_15px_rgba(255,255,255,0.3)] border-t border-dashed border-white/30" />
            <div className="absolute bottom-0 left-0 w-1/3 h-[1px] bg-gradient-to-r from-white/60 to-transparent shadow-[0_0_15px_rgba(255,255,255,0.3)] border-t border-dashed border-white/30" />
          </div>

          {/* Navigation Instruction - Refined with Separator */}
          <div className="absolute bottom-20 left-24 flex flex-col items-start pointer-events-auto">
            <div className="w-10 h-[1px] bg-white/20 mb-4" />
            <div className="text-[8px] font-bold uppercase tracking-[0.4em] text-white/30 mb-1">Command Center</div>
            <div className="text-[11px] text-white/80 tracking-wider font-medium uppercase italic">
              {isOpen ? 'Select Destination' : 'System Standby'}
            </div>
          </div>

          {/* Wheel Container - Balanced Bulge Geometry */}
          <div 
            className="absolute top-1/2 left-[-1550px] md:left-[-1450px]"
            style={{ width: '1700px', height: '1700px', marginTop: '-850px' }}
          >
            <div 
              ref={wheelRef}
              className="w-full h-full rounded-full border-2 border-white/5"
              style={{ 
                transformOrigin: 'center center',
                borderStyle: 'dashed'
              }}
            >
              {NAV_ITEMS.map((item, idx) => {
                const isActive = activeIndex === idx;
                
                return (
                  <div 
                    key={item.id}
                    className={`absolute ${isOpen ? 'pointer-events-auto' : 'pointer-events-none'}`}
                    style={{
                      left: '850px', 
                      top: '850px',
                      transform: `rotate(${item.angle}deg)`,
                    }}
                  >
                    <div 
                      className="absolute cursor-pointer"
                      onClick={() => handleNavClick(item.offset)}
                      style={{ 
                        transform: 'translateX(760px) md:translateX(780px) translateY(-50%)' 
                      }}
                    >
                      <div className={`flex items-center gap-4 md:gap-6 ${isActive ? 'opacity-100' : 'opacity-40'} transition-all duration-300 ease-out group`}>
                        
                        {/* Number */}
                        <span className={`font-black uppercase tracking-tighter transition-all duration-300 origin-left ${
                          isActive 
                            ? 'text-4xl md:text-6xl leading-none text-white ml-2 scale-110' 
                            : 'text-3xl md:text-5xl text-white/30 ml-0 group-hover:text-white group-hover:scale-[1.1] group-hover:ml-4'
                        }`}>
                          {item.id}
                        </span>

                        {/* Label */}
                        <div className={`flex flex-col whitespace-nowrap transition-all duration-300 origin-left ${
                          isActive 
                            ? 'opacity-100 ml-4 scale-110' 
                            : 'opacity-40 ml-2 scale-90 group-hover:opacity-100 group-hover:ml-6 group-hover:scale-110'
                        }`}>
                          <span className="text-lg font-bold tracking-widest text-white uppercase">{item.title}</span>
                          <span className="text-xs text-white/60 tracking-wider font-medium uppercase mt-0.5">{item.desc}</span>
                        </div>

                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
