"use client";

import { useEffect, useRef, useState } from "react";
import { Volume2, VolumeX } from "lucide-react";

export default function SoundManager() {
  const [isSoundOn, setIsSoundOn] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);

  const bgmRef = useRef<HTMLAudioElement | null>(null);
  const hoverAudioRef = useRef<HTMLAudioElement | null>(null);
  const clickAudioRef = useRef<HTMLAudioElement | null>(null);

  // Initialize audio objects
  useEffect(() => {
    // Only initialize in browser
    if (typeof window !== "undefined") {
      bgmRef.current = new Audio("/sounds/bgm.wav");
      bgmRef.current.loop = true;
      bgmRef.current.volume = 0.3; // Background music should be quiet

      hoverAudioRef.current = new Audio("/sounds/hover.wav");
      hoverAudioRef.current.volume = 0.5;

      clickAudioRef.current = new Audio("/sounds/click.wav");
      clickAudioRef.current.volume = 0.8;
    }
  }, []);

  // Handle BGM playback
  useEffect(() => {
    if (isSoundOn) {
      bgmRef.current?.play().catch(() => {
        // Autoplay policy might block it until user interacts
        console.log("Audio play blocked by browser. User interaction required.");
      });
    } else {
      bgmRef.current?.pause();
    }
  }, [isSoundOn]);

  // Global Hover & Click listeners
  useEffect(() => {
    const handleMouseOver = (e: MouseEvent) => {
      if (!isSoundOn) return;
      const target = e.target as HTMLElement;
      
      // Check if target is interactive
      if (
        target.tagName === "A" || 
        target.tagName === "BUTTON" || 
        target.closest("a") || 
        target.closest("button") ||
        window.getComputedStyle(target).cursor === "pointer"
      ) {
        // Reset time to allow rapid re-triggering
        if (hoverAudioRef.current) {
          hoverAudioRef.current.currentTime = 0;
          hoverAudioRef.current.play().catch(() => {});
        }
      }
    };

    const handleClick = (e: MouseEvent) => {
      if (!hasInteracted) setHasInteracted(true);
      
      if (!isSoundOn) return;
      const target = e.target as HTMLElement;
      
      if (
        target.tagName === "A" || 
        target.tagName === "BUTTON" || 
        target.closest("a") || 
        target.closest("button") ||
        window.getComputedStyle(target).cursor === "pointer"
      ) {
        if (clickAudioRef.current) {
          clickAudioRef.current.currentTime = 0;
          clickAudioRef.current.play().catch(() => {});
        }
      }
    };

    document.addEventListener("mouseover", handleMouseOver);
    document.addEventListener("click", handleClick);

    return () => {
      document.removeEventListener("mouseover", handleMouseOver);
      document.removeEventListener("click", handleClick);
    };
  }, [isSoundOn, hasInteracted]);

  return (
    <button
      onClick={() => setIsSoundOn(!isSoundOn)}
      className="fixed bottom-6 right-6 z-[100] flex items-center gap-3 px-4 py-3 bg-black/80 backdrop-blur-md border border-[#333] text-white rounded-full hover:bg-white hover:text-black transition-all duration-300 pointer-events-auto group"
    >
      <div className="flex items-center gap-2 overflow-hidden w-0 group-hover:w-16 transition-all duration-300">
        <span className="text-xs tracking-widest font-mono uppercase whitespace-nowrap">
          {isSoundOn ? "SOUND" : "MUTE"}
        </span>
      </div>
      {isSoundOn ? <Volume2 size={18} /> : <VolumeX size={18} />}
    </button>
  );
}
