"use client";
import { useEffect, useRef } from "react";
import anime from "animejs";

export default function Outro() {
  const sectionRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (!textRef.current || !sectionRef.current) return;

    const text = textRef.current.textContent || "";
    
    if (!textRef.current.hasAttribute('data-split')) {
        // Wrap each word to prevent line breaks in the middle of words
        const words = text.split(' ').map(word => {
            const letters = word.replace(/([^\s])/g, "<span class='letter inline-block opacity-0' style='transform-origin: 50% 100%;'>$&</span>");
            return `<span class="inline-block whitespace-nowrap">${letters}</span>`;
        }).join(' ');
        
        textRef.current.innerHTML = words;
        textRef.current.setAttribute('data-split', 'true');
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            anime.timeline({ loop: false })
              .add({
                targets: '.outro-text .letter',
                translateY: [40, 0],
                translateZ: 0,
                opacity: [0, 1],
                easing: "easeOutExpo",
                duration: 1200,
                delay: (el, i) => 30 * i
              });
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.5 }
    );

    observer.observe(sectionRef.current);

    return () => observer.disconnect();
  }, []);

  return (
    <section 
      ref={sectionRef}
      className="relative w-screen h-screen flex flex-col justify-center items-center px-10 md:px-24 shrink-0 overflow-hidden border-x border-[#222]"
    >
      <div className="relative z-10 w-full max-w-6xl text-center flex flex-col items-center gap-8">
        <h2 
          ref={textRef}
          className="outro-text text-5xl md:text-7xl lg:text-[7vw] font-black tracking-tighter uppercase break-normal w-full leading-[0.9]"
        >
          D.O.D.O — Designed for Outcomes, Driven by Optimization
        </h2>
      </div>
    </section>
  );
}
