"use client";
import { useState, useCallback, useEffect } from "react";

interface Slide {
  img: string;
  caption: string;
}

const SLIDES: Slide[] = [
  { img: "/carousel-1.png", caption: "HEY @VIBEK, CAN YOU MAP THIS NETWORK?" },
  { img: "/carousel-2.png", caption: "HEY @VIBEK, DO YOU EVEN SLEEP BRO?"    },
  { img: "/carousel-3.png", caption: "HEY @VIBEK, CAN YOU HACK MY WIFI?"     },
  { img: "/carousel-4.png", caption: "HEY @VIBEK, HOW MUCH DATA IS TOO MUCH?"},
];

export default function ModelShowcase() {
  const [current, setCurrent] = useState(0);
  const [dims, setDims] = useState({
    frameW: 380,
    frameH: 520,
    thumbW: 160,
    thumbH: 300,
    gap: 20
  });

  useEffect(() => {
    const updateDims = () => {
      const isMobile = window.innerWidth < 768;
      if (isMobile) {
        setDims({
          frameW: window.innerWidth * 0.8,
          frameH: (window.innerWidth * 0.8) * 1.3,
          thumbW: 100,
          thumbH: 150,
          gap: 10
        });
      } else {
        setDims({
          frameW: 380,
          frameH: 520,
          thumbW: 160,
          thumbH: 300,
          gap: 20
        });
      }
    };

    updateDims();
    window.addEventListener("resize", updateDims);
    return () => window.removeEventListener("resize", updateDims);
  }, []);

  const goTo = useCallback((idx: number) => {
    setCurrent(((idx % SLIDES.length) + SLIDES.length) % SLIDES.length);
  }, []);

  const prev = () => goTo(current - 1);
  const next = () => goTo(current + 1);

  const stripX = -(current * (dims.thumbW + dims.gap) + dims.frameW / 2);

  return (
    <section
      className="relative w-full md:w-screen min-h-screen py-24 md:py-0 flex shrink-0 overflow-hidden border-b md:border-b-0 md:border-r border-[#222] bg-[#050505] section-mobile-fix"
    >
      {/* ── 05 Watermark ── */}
      <div className="absolute top-1/2 right-4 md:right-20 -translate-y-1/2 text-[15vw] xl:text-[20vw] font-black opacity-5 tracking-tighter pointer-events-none z-0">
        05
      </div>

      {/* ── Overlaid text — pinned to left ── */}
      <div
        className="absolute left-6 md:left-16 top-10 md:top-0 z-30 flex flex-col justify-center h-auto md:h-full pointer-events-none"
        style={{ width: "220px" }}
      >
        <span className="text-[10px] md:text-xs uppercase tracking-widest text-white/30 font-medium mb-2 md:mb-4">
          Domains of Work
        </span>
        <h2 className="text-3xl md:text-6xl font-bold uppercase tracking-tighter leading-none text-white/50">
          SO
        </h2>
        <h2 className="text-3xl md:text-6xl font-black uppercase tracking-tighter leading-none text-white">
          IMMERSIVE
        </h2>
        <p className="text-xs md:text-base font-light text-white/50 mt-2 md:mt-4 leading-relaxed">
          Every field explored with full depth.
        </p>
      </div>

      {/* ── Edges fade ── */}
      <div
        className="absolute left-0 top-0 bottom-0 z-20 pointer-events-none hidden md:block"
        style={{ width: "320px", background: "linear-gradient(to right, #050505 40%, transparent 100%)" }}
      />
      <div
        className="absolute right-0 top-0 bottom-0 z-20 pointer-events-none"
        style={{ width: "100px md:160px", background: "linear-gradient(to left, #050505 0%, transparent 100%)" }}
      />

      {/* ── Fixed dashed frame — centered on page ── */}
      <div
        className="absolute z-10 pointer-events-none"
        style={{
          width:     `${dims.frameW}px`,
          height:    `${dims.frameH}px`,
          top:       "50%",
          left:      "50%",
          transform: "translate(-50%, -50%)",
          border:    "1.5px dashed rgba(255,255,255,0.32)",
        }}
      />

      {/* ── Nav buttons ── */}
      <div
        className="absolute z-30 flex gap-2"
        style={{
          top:       `calc(50% + ${dims.frameH / 2}px + 24px)`,
          left:      "50%",
          transform: "translateX(-50%)",
        }}
      >
        <button onClick={prev} className="w-9 h-9 flex items-center justify-center rounded-lg bg-black/60 border border-white/10 backdrop-blur-md">
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5"><path d="M15 18l-6-6 6-6" /></svg>
        </button>
        <button onClick={next} className="w-9 h-9 flex items-center justify-center rounded-lg bg-black/60 border border-white/10 backdrop-blur-md">
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5"><path d="M9 18l6-6-6-6" /></svg>
        </button>
      </div>

      {/* ── Caption bar ── */}
      <div
        className="absolute z-30 flex items-center gap-3 px-4 py-3"
        style={{
          width:         `${dims.frameW}px`,
          bottom:        `calc(50% - ${dims.frameH / 2}px)`,
          left:          "50%",
          transform:     "translateX(-50%)",
          background:    "rgba(0,0,0,0.82)",
          backdropFilter:"blur(14px)",
          borderTop:     "1px solid rgba(255,255,255,0.08)",
          pointerEvents: "none",
        }}
      >
        <p className="text-[8px] md:text-[9px] font-bold text-white uppercase tracking-[0.18em] leading-none">
          {SLIDES[current].caption}
        </p>
      </div>

      {/* ── Sliding filmstrip ── */}
      <div
        className="absolute top-1/2 flex items-center"
        style={{
          left:      "50%",
          transform: `translate(${stripX}px, -50%)`,
          transition:"transform 0.65s cubic-bezier(0.22, 1, 0.36, 1)",
          gap:       `${dims.gap}px`,
        }}
      >
        {SLIDES.map((slide, i) => (
          <div
            key={i}
            onClick={() => goTo(i)}
            className="relative shrink-0 overflow-hidden"
            style={{
              width:      i === current ? `${dims.frameW}px` : `${dims.thumbW}px`,
              height:     i === current ? `${dims.frameH}px` : `${dims.thumbH}px`,
              cursor:     i === current ? "default" : "pointer",
              opacity:    i === current ? 1 : 0.38,
              transition: "all 0.55s cubic-bezier(0.22,1,0.36,1)",
            }}
          >
            <img src={slide.img} className="w-full h-full object-cover" />
          </div>
        ))}
      </div>

      {/* ── Dot indicators ── */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center gap-3">
        <div className="flex items-center gap-2">
          {SLIDES.map((_, i) => (
            <button key={i} onClick={() => goTo(i)} className="rounded-full transition-all duration-300"
              style={{ width: i === current ? "22px" : "6px", height: "6px", background: i === current ? "white" : "rgba(255,255,255,0.2)" }} />
          ))}
        </div>
      </div>
    </section>
  );
}
