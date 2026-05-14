"use client";
import { useState, useCallback } from "react";

const FRAME_W = 380; // px — width of the fixed dashed frame / active card
const FRAME_H = 520; // px — height of the active card
const THUMB_W = 160; // px — width of non-active (thumbnail) cards
const THUMB_H = 300; // px — height of non-active cards
const GAP     = 20;  // px — gap between cards in the strip

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

  const goTo = useCallback((idx: number) => {
    setCurrent(((idx % SLIDES.length) + SLIDES.length) % SLIDES.length);
  }, []);

  const prev = () => goTo(current - 1);
  const next = () => goTo(current + 1);

  // Strip translate:
  // Cards before current are THUMB_W wide; card[current] is FRAME_W wide.
  // Left edge of card[current] = current * (THUMB_W + GAP)
  // We center it: stripX = -(left_of_current + FRAME_W / 2)
  const stripX = -(current * (THUMB_W + GAP) + FRAME_W / 2);

  return (
    <section
      className="relative w-screen h-screen flex shrink-0 overflow-hidden border-r border-[#222] bg-[#050505]"
    >
      {/* ── 05 Watermark ── */}
      <div className="absolute top-1/2 right-20 -translate-y-1/2 text-[15vw] xl:text-[20vw] font-black opacity-5 tracking-tighter pointer-events-none z-0">
        05
      </div>

      {/* ── Overlaid text — pinned to left ── */}
      <div
        className="absolute left-10 md:left-16 z-30 flex flex-col justify-center h-full pointer-events-none"
        style={{ width: "220px" }}
      >
        <span className="text-xs uppercase tracking-widest text-white/30 font-medium mb-4">
          Domains of Work
        </span>
        <h2 className="text-4xl md:text-6xl font-bold uppercase tracking-tighter leading-none text-white/50">
          SO
        </h2>
        <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter leading-none text-white">
          IMMERSIVE
        </h2>
        <p className="text-sm md:text-base font-light text-white/50 mt-4 leading-relaxed">
          Every field explored with full depth.
        </p>
      </div>

      {/* ── Left edge fade ── */}
      <div
        className="absolute left-0 top-0 bottom-0 z-20 pointer-events-none"
        style={{ width: "320px", background: "linear-gradient(to right, #050505 40%, transparent 100%)" }}
      />

      {/* ── Right edge fade ── */}
      <div
        className="absolute right-0 top-0 bottom-0 z-20 pointer-events-none"
        style={{ width: "160px", background: "linear-gradient(to left, #050505 0%, transparent 100%)" }}
      />

      {/* ── Fixed dashed frame — centered on page ── */}
      <div
        className="absolute z-10 pointer-events-none"
        style={{
          width:     `${FRAME_W}px`,
          height:    `${FRAME_H}px`,
          top:       "50%",
          left:      "50%",
          transform: "translate(-50%, -50%)",
          border:    "1.5px dashed rgba(255,255,255,0.32)",
        }}
      />

      {/* ── Nav buttons — anchored below the frame ── */}
      <div
        className="absolute z-30 flex gap-2"
        style={{
          top:       `calc(50% + ${FRAME_H / 2}px + 24px)`,
          left:      "50%",
          transform: "translateX(-50%)",
        }}
      >
        <button
          onClick={prev}
          aria-label="Previous"
          className="w-9 h-9 flex items-center justify-center rounded-lg transition-colors hover:bg-white/20"
          style={{
            background:    "rgba(0,0,0,0.6)",
            border:        "1px solid rgba(255,255,255,0.16)",
            backdropFilter:"blur(10px)",
          }}
        >
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round">
            <path d="M15 18l-6-6 6-6" />
          </svg>
        </button>
        <button
          onClick={next}
          aria-label="Next"
          className="w-9 h-9 flex items-center justify-center rounded-lg transition-colors hover:bg-white/20"
          style={{
            background:    "rgba(0,0,0,0.6)",
            border:        "1px solid rgba(255,255,255,0.16)",
            backdropFilter:"blur(10px)",
          }}
        >
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round">
            <path d="M9 18l6-6-6-6" />
          </svg>
        </button>
      </div>

      {/* ── Caption bar — anchored to bottom of the frame ── */}
      <div
        className="absolute z-30 flex items-center gap-3 px-4 py-3"
        style={{
          width:         `${FRAME_W}px`,
          bottom:        `calc(50% - ${FRAME_H / 2}px)`,
          left:          "50%",
          transform:     "translateX(-50%)",
          background:    "rgba(0,0,0,0.82)",
          backdropFilter:"blur(14px)",
          borderTop:     "1px solid rgba(255,255,255,0.08)",
          pointerEvents: "none",
        }}
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="shrink-0">
          <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
          <line x1="12" y1="9" x2="12" y2="13" />
          <line x1="12" y1="17" x2="12.01" y2="17" />
        </svg>
        <p className="text-[9px] font-bold text-white uppercase tracking-[0.18em] leading-none">
          {SLIDES[current].caption}
        </p>
      </div>

      {/* ── The sliding filmstrip ── */}
      {/*
        Positioned: left=50% so strip's left edge = viewport center
        translateX = stripX which centers card[current] under the frame
      */}
      <div
        className="absolute top-1/2 flex items-center"
        style={{
          left:      "50%",
          transform: `translate(${stripX}px, -50%)`,
          transition:"transform 0.65s cubic-bezier(0.22, 1, 0.36, 1)",
          gap:       `${GAP}px`,
        }}
      >
        {SLIDES.map((slide, i) => (
          <div
            key={i}
            onClick={() => goTo(i)}
            className="relative shrink-0"
            style={{
              width:      i === current ? `${FRAME_W}px` : `${THUMB_W}px`,
              height:     i === current ? `${FRAME_H}px` : `${THUMB_H}px`,
              cursor:     i === current ? "default" : "pointer",
              opacity:    i === current ? 1 : 0.38,
              transition: "width 0.55s cubic-bezier(0.22,1,0.36,1), height 0.55s cubic-bezier(0.22,1,0.36,1), opacity 0.5s ease",
              flexShrink: 0,
              overflow: "hidden",
            }}
          >
            <img
              src={slide.img}
              alt={`Slide ${i + 1}`}
              className="w-full h-full object-cover"
              draggable={false}
              style={{
                // When this card just became active, run the zoom-in animation
                animation: i === current ? "frameIn 0.6s cubic-bezier(0.22,1,0.36,1) forwards" : "none",
              }}
              key={i === current ? `active-${current}` : `thumb-${i}`}
            />
          </div>
        ))}
      </div>

      {/* ── Dot indicators ── */}
      <div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center gap-3"
      >
        <div className="flex items-center gap-2">
          {SLIDES.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              aria-label={`Slide ${i + 1}`}
              className="rounded-full transition-all duration-300"
              style={{
                width:      i === current ? "22px" : "6px",
                height:     "6px",
                background: i === current ? "white" : "rgba(255,255,255,0.2)",
              }}
            />
          ))}
        </div>
        <p className="text-[9px] uppercase tracking-[0.35em] text-white/20">
          {String(current + 1).padStart(2, "0")} / {String(SLIDES.length).padStart(2, "0")}
        </p>
      </div>

      <style>{`
        @keyframes frameIn {
          0%   { transform: scale(0.94); }
          100% { transform: scale(1);    }
        }
      `}</style>
    </section>
  );
}
