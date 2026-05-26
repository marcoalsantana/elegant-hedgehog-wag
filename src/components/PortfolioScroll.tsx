"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { Projeto, getProjetos } from "@/lib/supabase";

gsap.registerPlugin(ScrollTrigger);

export default function PortfolioScroll() {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollWrapperRef = useRef<HTMLDivElement>(null);
  const [projetos, setProjetos] = useState<Projeto[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getProjetos().then(data => {
      setProjetos(data);
      setLoading(false);
    }).catch((err) => {
      console.error(err);
      setLoading(false);
    });
  }, []);

  useEffect(() => {
    if (loading || projetos.length === 0) return;

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      mm.add("(min-width: 768px)", () => {
        const items = gsap.utils.toArray('.portfolio-item') as HTMLElement[];
        
        gsap.to(items, {
          y: 0,
          opacity: 1,
          stagger: 0.2,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: scrollWrapperRef.current,
            start: "top 80%",
          }
        });
      });

      mm.add("(max-width: 767px)", () => {
        const items = gsap.utils.toArray('.portfolio-item') as HTMLElement[];
        items.forEach(item => {
          gsap.to(item, {
            y: 0,
            opacity: 1,
            duration: 1.2,
            ease: "power3.out",
            scrollTrigger: {
              trigger: item,
              start: "top 80%",
            }
          });
        });
      });
    }, containerRef);

    return () => ctx.revert();
  }, [loading, projetos]);

  return (
    <section id="portfolio" ref={containerRef} className="relative w-full min-h-screen bg-black py-20 overflow-hidden">
      <div className="container mx-auto px-4 h-full flex flex-col justify-center">
        <h2 className="text-4xl md:text-6xl font-light mb-16 text-center text-white">Nossas Obras</h2>
        
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="w-10 h-10 border-t-2 border-white rounded-full animate-spin" />
          </div>
        ) : (
          <div ref={scrollWrapperRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projetos.map((p) => (
              <article 
                key={p.id} 
                className="portfolio-item relative group overflow-hidden opacity-0 translate-y-32 bg-zinc-900"
              >
                <div className="w-full aspect-[4/5] overflow-hidden">
                  <img 
                    src={p.imagem_url || "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=2070&auto=format&fit=crop"} 
                    alt={p.titulo} 
                    className="w-full h-full object-cover transition-transform duration-[2000ms] ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:scale-110"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-[800ms] flex flex-col justify-end p-6">
                  <span className="text-xs tracking-widest uppercase mb-2 text-white/70">{p.categoria}</span>
                  <h3 className="text-2xl font-bold text-white mb-2">{p.titulo}</h3>
                  <p className="text-sm font-light text-white/80 line-clamp-3">{p.descricao}</p>
                </div>
              </article>
            ))}
            {projetos.length === 0 && (
              <p className="text-center text-white/50 col-span-full py-20">Nenhum projeto encontrado. Adicione no painel /admin.</p>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
