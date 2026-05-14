"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";

interface PreloaderProps {
  onComplete: () => void;
}

export default function Preloader({ onComplete }: PreloaderProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const logoContainerRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const simpleLoaderRef = useRef<HTMLDivElement>(null);
  
  const circleRef = useRef<SVGCircleElement>(null);
  const markTopRef = useRef<SVGPathElement>(null);
  const markBottomRef = useRef<SVGPathElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const sweepRef = useRef<HTMLDivElement>(null);
  const ambientLightRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const hasVisited = typeof window !== "undefined" ? sessionStorage.getItem("dodo_has_visited") : null;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        onComplete: () => {
          if (!hasVisited && typeof window !== "undefined") {
            sessionStorage.setItem("dodo_has_visited", "true");
          }
          onComplete();
        }
      });

      if (hasVisited) {
        // --- SECONDARY VISIT: Simple Fast Loading Animation ---
        if (containerRef.current) gsap.set(containerRef.current, { opacity: 1 });
        if (logoContainerRef.current) gsap.set(logoContainerRef.current, { display: "none" });
        if (gridRef.current) gsap.set(gridRef.current, { display: "none" });
        if (sweepRef.current) gsap.set(sweepRef.current, { display: "none" });
        if (simpleLoaderRef.current) gsap.set(simpleLoaderRef.current, { opacity: 0, display: "flex", y: 20 });
        
        tl.to(simpleLoaderRef.current, {
          opacity: 1,
          y: 0,
          duration: 0.4,
          ease: "power2.out"
        })
        .to(simpleLoaderRef.current, {
          opacity: 0,
          y: -20,
          duration: 0.3,
          ease: "power2.in",
          delay: 0.4
        })
        .to(containerRef.current, {
          opacity: 0,
          duration: 0.3,
          ease: "power2.inOut"
        });
      } else {
        // --- FIRST VISIT: Cinematic Logo Animation ---
        if (simpleLoaderRef.current) gsap.set(simpleLoaderRef.current, { display: "none" });
        if (containerRef.current) gsap.set(containerRef.current, { opacity: 1 });
        if (logoContainerRef.current) gsap.set(logoContainerRef.current, { opacity: 1 });

        const circle = circleRef.current;
        const length = circle ? circle.getTotalLength() : 1500;
        
        if (markTopRef.current) gsap.set(markTopRef.current, { transformOrigin: "50% 50%", y: -150, opacity: 0, scale: 0.8 });
        if (markBottomRef.current) gsap.set(markBottomRef.current, { transformOrigin: "50% 50%", y: 150, opacity: 0, scale: 0.8 });
        
        if (circleRef.current) {
          gsap.set(circleRef.current, { 
              strokeDasharray: length, 
              strokeDashoffset: length,
              transformOrigin: "50% 50%",
              rotation: -90
          });
        }

        tl.to(gridRef.current, {
            opacity: 0.8,
            duration: 3,
            ease: "power2.inOut"
        }, 0);

        tl.to(circleRef.current, {
            strokeDashoffset: 0,
            duration: 1.8,
            ease: "power3.inOut"
        }, 0.5);

        tl.to(markTopRef.current, {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 1.2,
            ease: "back.out(1.5)"
        }, 1.4);

        tl.to(markBottomRef.current, {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 1.2,
            ease: "back.out(1.5)"
        }, 1.6);

        tl.to(sweepRef.current, {
            opacity: 1,
            duration: 0.2
        }, 2.0)
        .to(sweepRef.current, {
            y: "-150vh",
            duration: 1.5,
            ease: "power2.inOut"
        }, 2.0)
        .to(sweepRef.current, {
            opacity: 0,
            duration: 0.2
        }, 3.3);

        tl.to(ambientLightRef.current, {
            opacity: 1,
            duration: 2.5,
            ease: "power2.inOut"
        }, 2.3);

        tl.to(logoContainerRef.current, {
            y: -15,
            duration: 2,
            ease: "sine.inOut",
            yoyo: true,
            repeat: 0
        }, 3.0);

        tl.to(containerRef.current, {
          opacity: 0,
          duration: 0.5,
          ease: "power2.inOut"
        }, ">-0.5");
      }
    }, containerRef);

    const handleMouseMove = (e: MouseEvent) => {
      if (hasVisited) return;
      const xAxis = (window.innerWidth / 2 - e.pageX) / 60;
      const yAxis = (window.innerHeight / 2 - e.pageY) / 60;
      
      gsap.to(logoContainerRef.current, {
          rotationY: xAxis,
          rotationX: -yAxis,
          duration: 1.5,
          ease: "power2.out",
          transformPerspective: 1000
      });

      gsap.to(gridRef.current, {
          x: -xAxis * 2,
          y: -yAxis * 2,
          duration: 1.5,
          ease: "power2.out"
      });
    };

    if (!hasVisited && typeof window !== "undefined") {
      document.addEventListener('mousemove', handleMouseMove);
    }

    return () => {
      ctx.revert();
      if (!hasVisited && typeof window !== "undefined") {
        document.removeEventListener('mousemove', handleMouseMove);
      }
    };
  }, [onComplete]);

  return (
    <div 
      ref={containerRef} 
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black pointer-events-none overflow-hidden"
    >
      <div ref={simpleLoaderRef} className="hidden flex-col items-center gap-4 z-50">
        <div className="w-12 h-12 border-2 border-white/20 border-t-white rounded-full animate-spin"></div>
        <span className="text-white/50 text-xs tracking-[0.3em] font-mono">LOADING</span>
      </div>

      <style jsx>{`
        .grid-bg {
          position: absolute;
          top: 0;
          left: 0;
          width: 100vw;
          height: 100vh;
          background-image: 
              linear-gradient(rgba(255, 255, 255, 0.03) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255, 255, 255, 0.03) 1px, transparent 1px);
          background-size: 50px 50px;
          background-position: center;
          opacity: 0;
          z-index: 0;
          transform: perspective(1000px) rotateX(60deg) translateY(-100px) translateZ(-200px);
        }
        .sweep {
          position: absolute;
          top: 50%;
          left: 50%;
          width: 200vw;
          height: 2px;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.8), transparent);
          transform: translate(-50%, -50%) rotate(-45deg) translateY(150vh);
          opacity: 0;
          pointer-events: none;
          z-index: 20;
          box-shadow: 0 0 20px 5px rgba(255,255,255,0.4);
        }
        .ambient-light {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 70%;
          height: 70%;
          background: radial-gradient(circle, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0) 60%);
          border-radius: 50%;
          filter: blur(50px);
          opacity: 0;
          z-index: 1;
          pointer-events: none;
        }
      `}</style>

      <div ref={gridRef} className="grid-bg"></div>
      <div ref={sweepRef} className="sweep"></div>

      <div 
        ref={logoContainerRef} 
        className="w-[120px] md:w-[180px] relative z-10 flex items-center justify-center"
      >
        <div ref={ambientLightRef} className="ambient-light"></div>
        <svg 
          ref={svgRef}
          id="dodo-logo" 
          viewBox="0 0 540 770" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-auto overflow-visible"
        >
          <g id="logo-mark">
            <path ref={markTopRef} id="mark-top" style={{willChange: 'transform, opacity, filter'}} d="M495 0C511.569 0 525 13.4315 525 30V75C525 91.5685 511.569 105 495 105H450C433.431 105 420 91.5685 420 75V30C420 13.4315 433.431 7.24793e-07 450 0L495 0Z" fill="white"/>
            <circle ref={circleRef} id="mark-circle" style={{willChange: 'stroke-dashoffset'}} cx="262.5" cy="335.5" r="212.5" stroke="white" strokeWidth="100"/>
            <path ref={markBottomRef} id="mark-bottom" style={{willChange: 'transform, opacity, filter'}} d="M495 567C511.569 567 525 580.431 525 597V642C525 658.569 511.569 672 495 672H450C445.551 672 440 677.551 440 682V727C440 743.569 426.569 757 410 757H45C28.4315 757 15 743.569 15 727L15 682C15 665.431 28.4315 652 45 652H410C414.449 652 420 646.449 420 642V597C420 580.431 433.431 567 450 567H495Z" fill="white"/>
          </g>
        </svg>
      </div>
    </div>
  );
}
