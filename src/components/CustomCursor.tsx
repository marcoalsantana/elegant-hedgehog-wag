"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { usePathname } from "next/navigation";

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  
  useEffect(() => {
    const cursor = cursorRef.current;
    if (!cursor) return;
    
    const mm = gsap.matchMedia();
    
    mm.add("(min-width: 768px)", () => {
      const moveCursor = (e: MouseEvent) => {
        gsap.to(cursor, {
          x: e.clientX,
          y: e.clientY,
          duration: 0.2,
          ease: "power3.out"
        });
      };
      
      const handleMouseOver = (e: MouseEvent) => {
        const target = e.target as HTMLElement;
        if (target.closest('a, button, input, textarea, select, [role="button"]')) {
          gsap.to(cursor, { scale: 1.5, opacity: 0.5, duration: 0.6, ease: "power3.out" });
        }
      };
      
      const handleMouseOut = (e: MouseEvent) => {
        const target = e.target as HTMLElement;
        if (target.closest('a, button, input, textarea, select, [role="button"]')) {
          gsap.to(cursor, { scale: 1, opacity: 1, duration: 0.6, ease: "power3.out" });
        }
      };

      window.addEventListener("mousemove", moveCursor);
      document.addEventListener("mouseover", handleMouseOver);
      document.addEventListener("mouseout", handleMouseOut);

      const style = document.createElement('style');
      style.innerHTML = `* { cursor: none !important; }`;
      document.head.appendChild(style);

      return () => {
        window.removeEventListener("mousemove", moveCursor);
        document.removeEventListener("mouseover", handleMouseOver);
        document.removeEventListener("mouseout", handleMouseOut);
        document.head.removeChild(style);
      };
    });

    return () => mm.revert();
  }, [pathname]);

  return (
    <div 
      ref={cursorRef} 
      className="fixed top-0 left-0 w-4 h-4 bg-white rounded-full pointer-events-none z-[9999] mix-blend-difference transform -translate-x-1/2 -translate-y-1/2 hidden md:block"
    />
  );
}
