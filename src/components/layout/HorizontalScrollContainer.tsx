"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface Props {
  children: React.ReactNode;
  isReady: boolean;
}

export default function HorizontalScrollContainer({ children, isReady }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isReady) return;

    const container = containerRef.current;
    const scrollContent = scrollRef.current;

    if (!container || !scrollContent) return;

    let mm = gsap.matchMedia();

    mm.add("(min-width: 768px)", () => {
      // DESKTOP: Horizontal Scroll
      const getScrollAmount = () => {
        const containerWidth = scrollContent.scrollWidth;
        return -(containerWidth - window.innerWidth);
      };

      const tween = gsap.to(scrollContent, {
        x: getScrollAmount,
        ease: "none",
        scrollTrigger: {
          trigger: container,
          start: "top top",
          end: () => `+=${scrollContent.scrollWidth - window.innerWidth}`,
          pin: true,
          scrub: true,
          invalidateOnRefresh: true,
          anticipatePin: 1,
        },
      });

      return () => {
        tween.kill();
      };
    });

    // MOBILE: Natural vertical scroll (no extra logic needed here, CSS handles it)

    return () => {
      mm.revert();
    };
  }, [isReady]);

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  if (isMobile) {
    return (
      <div className="flex flex-col w-full bg-black relative z-10">
        {children}
      </div>
    );
  }

  return (
    <div ref={containerRef} className="h-screen w-full overflow-hidden bg-black relative">
      <div 
        ref={scrollRef} 
        className="scroll-content-inner h-full w-max flex flex-row items-center relative z-10"
      >
        {children}
      </div>
    </div>
  );
}
