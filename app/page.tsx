"use client";

import { useEffect, useState } from "react";

type Project = {
  id: string;
  titulo: string;
  descricao: string;
  categoria: string;
  imagem_url: string;
};

export default function Home() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      const url = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/rest/v1/projetos`;
      const headers = {
        apikey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!}`,
      };
      try {
        const response = await fetch(url, { headers });
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setProjects(data as Project[]);
        setLoading(false);
      } catch (error) {
        console.error("Erro ao buscar projetos:", error);
        setLoading(false);
      }
    };
    fetchProjects();
  }, []);

  return (
    <div className="min-h-screen bg-[#1e293b] text-white flex flex-col items-center justify-center">
      <h1 className="text-4xl font-bold text-white mb-6 tracking-tight">
        Agência de Arquitetura de Luxo
      </h1>
      <button className="flex items-center gap-2 px-6 py-3 bg-amber-600 text-white rounded-md hover:bg-amber-700 transition-colors">
        <span className="w-5 h-5">🏗️</span>
        Conheça nossos projetos
      </button>

      {loading ? (
        <p className="text-lg text-stone-400">Carregando projetos...</p>
      ) : projects.length === 0 ? (
        <p className="text-center text-stone-400 py-10">Nenhum projeto publicado</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
          {projects.map((project) => (
            <div
              key={project.id}
              className="bg-[#2d3748] rounded-xl shadow-lg border border-[#4a5568] overflow-hidden"
            >
              <div className="aspect-[4/3] bg-[#1e293b]">
                <img                  src={project.imagem_url}
                  alt={project.titulo}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src =
                      "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTYwIiBoZWlnaHQ9IjEyIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxyZWN0IHdpZHRoPSIxNjAiIGhlaWdodD0iMTIiIGZpbGw9IiNmZmYiLz48dGV4dCB4PSIxNTAiIHk9IjEyIiBmb250LWZhbWlseT0ic2Fuc2xlciI+SW1hZ2U8L3RleHQ+PC9zdmc+";
                  }}
                />
              </div>
              <div className="p-5">
                <span className="inline-block px-3 py-1 text-xs font-medium bg-amber-500 text-amber-200 rounded-full mb-2">
                  {project.categoria}
                </span>
                <h2 className="text-xl font-semibold text-white mb-1">{project.titulo}</h2>
                <p className="text-stone-300 text-sm leading-relaxed">{project.descricao}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}