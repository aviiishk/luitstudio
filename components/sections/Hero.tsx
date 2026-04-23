"use client";

import { useEffect, useRef } from "react";
import { ArrowRight, Globe, X } from "lucide-react";

export default function Hero() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const opacityRef = useRef(0);

  // 🎬 Smooth fade logic
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    let raf: number;

    const fade = (target: number, duration = 500) => {
      const start = performance.now();
      const initial = opacityRef.current;

      const animate = (time: number) => {
        const progress = Math.min((time - start) / duration, 1);
        const value = initial + (target - initial) * progress;

        opacityRef.current = value;
        video.style.opacity = value.toString();

        if (progress < 1) raf = requestAnimationFrame(animate);
      };

      raf = requestAnimationFrame(animate);
    };

    video.oncanplay = () => {
      video.play();
      fade(1);
    };

    video.ontimeupdate = () => {
      if (video.duration - video.currentTime <= 0.55) {
        fade(0);
      }
    };

    video.onended = () => {
      video.style.opacity = "0";
      setTimeout(() => {
        video.currentTime = 0;
        video.play();
        fade(1);
      }, 100);
    };

    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <section className="relative min-h-screen bg-black text-white overflow-hidden flex flex-col">

      {/* 🎥 BACKGROUND VIDEO */}
      <video
        ref={videoRef}
        className="absolute inset-0 w-full h-full object-cover object-bottom opacity-0"
        src="/hero/hero.mp4"
        muted
        playsInline
        preload="auto"
        autoPlay
      />

      {/* 🧊 NAVBAR */}

      {/* 🧠 HERO CONTENT */}
      <div className="relative z-10 flex-1 flex flex-col items-center justify-center text-center px-6 -translate-y-[20%]">

        <h1 className="text-6xl md:text-8xl lg:text-9xl tracking-tight font-serif">
          Know it then <span className="italic">all</span>
        </h1>

        {/* ✉️ INPUT */}
        <div className="mt-8 w-full max-w-xl liquid-glass rounded-full pl-6 pr-2 py-2 flex items-center gap-3">
          <input
            placeholder="Enter your email"
            className="bg-transparent outline-none w-full text-white placeholder:text-white/40"
          />

          <button className="bg-white text-black p-3 rounded-full">
            <ArrowRight size={18} />
          </button>
        </div>

        <p className="mt-4 text-sm text-white/70 max-w-md">
          Stay updated with the latest insights and never miss out.
        </p>

        <button className="mt-6 liquid-glass px-8 py-3 rounded-full text-sm hover:bg-white/5">
          Manifesto
        </button>
      </div>

      {/* 🌐 SOCIAL */}
      <div className="relative z-10 flex justify-center gap-4 pb-12">
        {[ ArrowRight, Globe, X, ].map((Icon, i) => (
          <button
            key={i}
            className="liquid-glass p-4 rounded-full text-white/80 hover:text-white"
          >
            <Icon size={18} />
          </button>
        ))}
      </div>
    </section>
  );
}