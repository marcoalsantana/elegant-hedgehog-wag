"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const scrollIndicatorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 3.5 });

      tl.to(titleRef.current, {
        opacity: 1,
        y: 0,
        duration: 1.5,
        ease: "expo.out"
      })
      .to(subtitleRef.current, {
        opacity: 1,
        y: 0,
        duration: 1.5,
        ease: "expo.out"
      }, "-=1.0")
      .to(scrollIndicatorRef.current, {
        opacity: 1,
        duration: 1,
        ease: "power3.out"
      }, "-=0.5");

      gsap.to(scrollIndicatorRef.current, {
        scrollTrigger: {
          trigger: scrollIndicatorRef.current,
          start: "top 80%",
          end: "bottom 20%",
          scrub: true
        },
        opacity: 0,
        y: 50,
        duration: 0.6
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <section className="relative w-full h-screen flex flex-col items-center justify-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-black/40 z-10" />
        <img 
          src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2070&auto=format&fit=crop" 
          alt="Luxury Architecture" 
          className="w-full h-full object-cover scale-105"
        />
      </div>

      <div className="relative z-20 text-center px-4">
        <h1 
          ref={titleRef} 
          className="text-6xl md:text-8xl lg:text-9xl font-bold tracking-tighter text-white opacity-0 translate-y-20 mix-blend-difference"
        >
          OBRA
        </h1>
        <p 
          ref={subtitleRef}
          className="mt-6 text-xl md:text-2xl font-light tracking-wide text-white/90 opacity-0 translate-y-10"
        >
          Arquitetura Cinematográfica
        </p>
      </div>

      <div 
        ref={scrollIndicatorRef}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center opacity-0"
      >
        <span className="text-sm font-light uppercase tracking-widest mb-2 text-white/80">Scroll</span>
        <div className="w-[1px] h-12 bg-white/30 overflow-hidden">
          <div className="w-full h-full bg-white origin-top animate-[pulse_2s_ease-in-out_infinite]" />
        </div>
      </div>
    </section>
  );
}
