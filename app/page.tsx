"use client";

import React, { useState, useRef, useEffect } from "react";
import { Play, Pause, Sparkles, Zap } from "lucide-react";

export default function Home() {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);
  const [stars, setStars] = useState<{ id: number; top: string; left: string; delay: string }[]>([]);

  useEffect(() => {
    // Generate random stars on mount
    const newStars = Array.from({ length: 60 }).map((_, i) => ({
      id: i,
      top: `${Math.random() * 100}%`,
      left: `${Math.random() * 100}%`,
      delay: `${Math.random() * 3}s`,
    }));
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setStars(newStars);
  }, []);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play().catch((error) => {
          console.error("Audio playback failed:", error);
        });
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-[#1a1a2e] flex items-center justify-center font-sans">
      {/* Cosmic Gradient Background Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#1a1a2e] via-black to-black opacity-90" />
      
      {/* Ambient Glows */}
      <div className="absolute top-1/4 -left-20 w-96 h-96 bg-indigo-600/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-purple-900/20 rounded-full blur-[120px] pointer-events-none" />

      {/* Star Field */}
      {stars.map((star) => (
        <div
          key={star.id}
          className="absolute w-[2px] h-[2px] bg-white rounded-full animate-pulse"
          style={{
            top: star.top,
            left: star.left,
            animationDelay: star.delay,
            opacity: 0.4,
          }}
        />
      ))}

      {/* Glassmorphism Card */}
      <main className="relative z-10 w-full max-w-md p-10 mx-4 rounded-[2.5rem] bg-white/5 backdrop-blur-xl border border-white/10 shadow-2xl flex flex-col items-center text-center">
        {/* Profile Icon Section */}
        <div className="mb-8 p-5 rounded-3xl bg-gradient-to-br from-indigo-500/20 to-purple-500/20 border border-white/10 shadow-inner">
          <Sparkles className="w-12 h-12 text-indigo-300 animate-pulse" />
        </div>

        <h1 className="text-5xl font-extrabold mb-3 tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-indigo-300 via-purple-200 to-indigo-100">
          전소연
        </h1>

        <p className="text-xl text-white/70 font-light mb-10 tracking-tight">
          시바코 파이팅✨
        </p>

        {/* Interests Section */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          <div className="flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-indigo-500/10 border border-indigo-400/20 text-indigo-200 text-sm font-medium">
            <span className="text-lg">🔮</span> 시너지
          </div>
          <div className="flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-purple-500/10 border border-purple-400/20 text-purple-200 text-sm font-medium">
            <Zap className="w-4 h-4 text-yellow-400" /> 바이브코딩
          </div>
        </div>

        {/* Music Player Controller */}
        <div className="w-full pt-10 border-t border-white/5">
          <div className="flex flex-col items-center gap-5">
            <span className="text-[10px] uppercase tracking-[0.3em] text-indigo-400/60 font-black">
              Orbital Sound Controller
            </span>
            <button
              onClick={togglePlay}
              className="group relative flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-tr from-indigo-600 via-indigo-500 to-purple-500 text-white shadow-[0_0_30px_rgba(79,70,229,0.4)] hover:scale-105 transition-all duration-500 focus:outline-none ring-1 ring-white/20"
            >
              <div className="absolute inset-0 rounded-full bg-white animate-ping opacity-0 group-hover:opacity-10 transition-opacity" />
              {isPlaying ? (
                <Pause className="w-8 h-8 fill-current" />
              ) : (
                <Play className="w-8 h-8 fill-current ml-1" />
              )}
            </button>
            <audio
              ref={audioRef}
              src="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"
              onEnded={() => setIsPlaying(false)}
            />
          </div>
        </div>
      </main>
    </div>
  );
}
