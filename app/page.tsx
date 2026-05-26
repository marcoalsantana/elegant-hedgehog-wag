"use client";

import { Building2 } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-stone-50">
      <h1 className="text-4xl font-bold text-stone-900 mb-6">
        Agência de Arquitetura de Luxo
      </h1>
      <button className="flex items-center gap-2 px-6 py-3 bg-amber-700 text-white rounded-md hover:bg-amber-800 transition-colors">
        <Building2 className="w-5 h-5" />
        Conheça nossos projetos
      </button>
    </div>
  );
}