"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import gsap from "gsap";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header 
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 border-b ${
        scrolled ? "bg-black/80 backdrop-blur-md py-4 border-white/10" : "bg-transparent py-6 border-transparent"
      }`}
    >
      <div className="container mx-auto px-4 flex items-center justify-between">
        <Link href="/" className="text-2xl font-bold tracking-widest text-white hover:opacity-80 transition-opacity">
          OBRA
        </Link>
        <nav className="hidden md:flex items-center gap-8 text-sm font-light uppercase tracking-widest">
          <Link href="/" className="text-white/80 hover:text-white transition-colors">Home</Link>
          <button 
            onClick={() => {
              const portfolio = document.getElementById('portfolio');
              if (portfolio) portfolio.scrollIntoView({ behavior: 'smooth' });
            }} 
            className="text-white/80 hover:text-white transition-colors"
          >
            Portfólio
          </button>
          <Link href="/admin" className="px-4 py-2 bg-white text-black font-medium hover:bg-white/90 transition-colors rounded-sm">
            Admin
          </Link>
        </nav>
        {/* Mobile menu button could be added here */}
        <div className="md:hidden">
          <Link href="/admin" className="px-4 py-2 bg-white text-black text-xs font-medium hover:bg-white/90 transition-colors rounded-sm">
            Admin
          </Link>
        </div>
      </div>
    </header>
  );
}
