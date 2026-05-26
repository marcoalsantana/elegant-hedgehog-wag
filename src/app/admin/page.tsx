"use client";

import { useState, useEffect, useRef } from "react";
import { Projeto, getProjetos, createProjeto, updateProjeto, deleteProjeto } from "@/lib/supabase";
import gsap from "gsap";
import Link from "next/link";

export default function AdminPage() {
  const [projetos, setProjetos] = useState<Projeto[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    titulo: "",
    descricao: "",
    categoria: "",
    imagem_url: ""
  });
  
  const formRef = useRef<HTMLFormElement>(null);
  const feedbackRef = useRef<HTMLDivElement>(null);
  const [feedbackMsg, setFeedbackMsg] = useState("");

  const fetchProjetos = async () => {
    try {
      const data = await getProjetos();
      setProjetos(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjetos();
  }, []);

  const showFeedback = (msg: string, type: 'success' | 'error' | 'loading' = 'success') => {
    setFeedbackMsg(msg);
    const color = type === 'error' ? '#ef4444' : type === 'loading' ? '#eab308' : '#22c55e';
    
    gsap.fromTo(feedbackRef.current, 
      { opacity: 0, y: 20, backgroundColor: color },
      { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" }
    );

    if (type !== 'loading') {
      gsap.to(feedbackRef.current, {
        opacity: 0,
        y: -20,
        duration: 0.6,
        delay: 2.5,
        ease: "power3.in"
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    showFeedback("Salvando...", "loading");

    try {
      if (editingId) {
        await updateProjeto(editingId, formData);
        showFeedback("Projeto atualizado com sucesso!");
      } else {
        await createProjeto(formData);
        showFeedback("Projeto criado com sucesso!");
      }
      setFormData({ titulo: "", descricao: "", categoria: "", imagem_url: "" });
      setEditingId(null);
      fetchProjetos();
    } catch (err) {
      console.error(err);
      showFeedback("Erro ao salvar projeto.", "error");
    }
  };

  const handleEdit = (p: Projeto) => {
    setEditingId(p.id!);
    setFormData({
      titulo: p.titulo,
      descricao: p.descricao,
      categoria: p.categoria,
      imagem_url: p.imagem_url
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Tem certeza que deseja deletar este projeto?")) return;
    showFeedback("Deletando...", "loading");
    try {
      await deleteProjeto(id);
      showFeedback("Projeto deletado com sucesso!");
      fetchProjetos();
    } catch (err) {
      showFeedback("Erro ao deletar projeto.", "error");
    }
  };

  const inputClass = "w-full bg-transparent border-b border-white/20 px-0 py-3 text-white focus:outline-none focus:border-white transition-colors duration-300 font-light placeholder-white/30";

  return (
    <div className="min-h-screen bg-zinc-950 text-white pt-24 pb-20 px-4">
      <div className="max-w-4xl mx-auto relative">
        <Link href="/" className="inline-block text-white/50 hover:text-white transition-colors mb-8 text-sm uppercase tracking-widest font-light">
          &larr; Voltar para o site
        </Link>
        <h1 className="text-4xl font-light mb-12">Dashboard / Projetos</h1>

        {/* Form */}
        <div className="bg-zinc-900/50 p-8 rounded-lg mb-16 border border-white/5 relative">
          <h2 className="text-2xl font-light mb-8">{editingId ? "Editar Projeto" : "Novo Projeto"}</h2>
          
          <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <input 
                  type="text" 
                  placeholder="Título" 
                  required 
                  className={inputClass}
                  value={formData.titulo}
                  onChange={e => setFormData({...formData, titulo: e.target.value})}
                />
              </div>
              <div>
                <input 
                  type="text" 
                  placeholder="Categoria" 
                  required 
                  className={inputClass}
                  value={formData.categoria}
                  onChange={e => setFormData({...formData, categoria: e.target.value})}
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-xs font-light text-white/50 mb-2 uppercase tracking-widest">
                  Imagem do Projeto (Upload)
                </label>
                <input 
                  type="file" 
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (!file) return;
                    const reader = new FileReader();
                    reader.onloadend = () => {
                      setFormData({...formData, imagem_url: reader.result as string});
                    };
                    reader.readAsDataURL(file);
                  }}
                  required={!formData.imagem_url}
                  className="w-full text-sm text-white/50 file:mr-4 file:py-2 file:px-4 file:rounded-sm file:border-0 file:text-sm file:font-medium file:bg-white/10 file:text-white hover:file:bg-white/20 transition-all cursor-pointer"
                />
                {formData.imagem_url && (
                  <div className="mt-4 w-24 h-24 relative rounded border border-white/20 overflow-hidden">
                    <img src={formData.imagem_url} alt="Preview" className="w-full h-full object-cover" />
                  </div>
                )}
              </div>
              <div className="md:col-span-2">
                <textarea 
                  placeholder="Descrição" 
                  required 
                  rows={3}
                  className={`${inputClass} resize-none`}
                  value={formData.descricao}
                  onChange={e => setFormData({...formData, descricao: e.target.value})}
                />
              </div>
            </div>

            <div className="flex items-center gap-4 pt-4">
              <button 
                type="submit"
                className="bg-white text-black px-8 py-3 uppercase tracking-widest text-sm font-medium hover:bg-white/90 transition-colors"
              >
                {editingId ? "Salvar Alterações" : "Criar Projeto"}
              </button>
              {editingId && (
                <button 
                  type="button"
                  onClick={() => {
                    setEditingId(null);
                    setFormData({ titulo: "", descricao: "", categoria: "", imagem_url: "" });
                  }}
                  className="px-8 py-3 uppercase tracking-widest text-sm font-medium text-white/50 hover:text-white transition-colors"
                >
                  Cancelar
                </button>
              )}
            </div>
          </form>

          {/* Feedback Toast */}
          <div 
            ref={feedbackRef} 
            className="absolute top-8 right-8 px-6 py-3 rounded text-sm font-medium text-white opacity-0 pointer-events-none z-50"
          >
            {feedbackMsg}
          </div>
        </div>

        {/* List */}
        <div>
          <h2 className="text-2xl font-light mb-8">Projetos Existentes</h2>
          
          {loading ? (
            <div className="text-white/50">Carregando...</div>
          ) : projetos.length === 0 ? (
            <div className="text-white/50">Nenhum projeto encontrado.</div>
          ) : (
            <div className="space-y-4">
              {projetos.map(p => (
                <div key={p.id} className="flex flex-col md:flex-row items-center justify-between p-6 bg-zinc-900/30 border border-white/5 rounded hover:bg-zinc-900/50 transition-colors">
                  <div className="flex items-center gap-6 w-full md:w-auto mb-4 md:mb-0">
                    <img src={p.imagem_url} alt={p.titulo} className="w-16 h-16 object-cover rounded" />
                    <div>
                      <h3 className="text-lg font-medium">{p.titulo}</h3>
                      <p className="text-sm text-white/50">{p.categoria}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <button 
                      onClick={() => handleEdit(p)}
                      className="px-4 py-2 text-sm text-white/70 hover:text-white border border-white/10 hover:border-white/30 rounded transition-all"
                    >
                      Editar
                    </button>
                    <button 
                      onClick={() => handleDelete(p.id!)}
                      className="px-4 py-2 text-sm text-red-400/70 hover:text-red-400 border border-red-400/10 hover:border-red-400/30 rounded transition-all"
                    >
                      Deletar
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
