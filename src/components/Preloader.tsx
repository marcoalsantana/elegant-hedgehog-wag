"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

export default function Preloader() {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLHeadingElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    document.body.style.overflow = "hidden";

    const tl = gsap.timeline({
      onComplete: () => {
        setIsLoaded(true);
        document.body.style.overflow = "auto";
      }
    });

    tl.to(textRef.current, {
      opacity: 1,
      y: 0,
      duration: 1.2,
      ease: "power3.out"
    })
    .to(textRef.current, {
      opacity: 0,
      y: -20,
      duration: 0.8,
      ease: "power3.in",
      delay: 0.5
    })
    .to(containerRef.current, {
      yPercent: -100,
      duration: 1.2,
      ease: "expo.inOut"
    });

    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  if (isLoaded) return null;

  return (
    <div 
      ref={containerRef}
      className="fixed inset-0 z-[1000] flex items-center justify-center bg-black"
    >
      <h1 
        ref={textRef}
        className="text-4xl md:text-6xl font-light tracking-widest text-white opacity-0 translate-y-10"
      >
        OBRA
      </h1>
    </div>
  );
}
