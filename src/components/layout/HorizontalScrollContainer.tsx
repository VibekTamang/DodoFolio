"use client";

import { useEffect, useRef } from "react";
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

    // We calculate how much to scroll based on the total width minus viewport width
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
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, [isReady]);

  return (
    <div ref={containerRef} className="h-screen w-full overflow-hidden bg-transparent relative">
      <div 
        ref={scrollRef} 
        className="scroll-content-inner h-full w-max flex flex-row items-center relative z-10"
      >
        {children}
      </div>
    </div>
  );
}
