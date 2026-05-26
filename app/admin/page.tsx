"use client";

import { useEffect, useState } from "react";

type Project = {
  id: string;
  titulo: string;
  descricao: string;
  categoria: string;
  imagem_url: string;
};

export default function Admin() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [form, setForm] = useState({
    titulo: "",
    descricao: "",
    categoria: "",
    imagem_url: "",
  });
  const [idEmEdicao, setIdEmEdicao] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  // URL base do Supabase
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
  const headers = {
    apikey: supabaseKey,
    Authorization: `Bearer ${supabaseKey}`,
    "Prefer": "resolution=merge",
  };

  // Carregar projetos ao montar o componente
  useEffect(() => {
    carregarProjetos();
  }, []);

  // Função para carregar projetos (GET)
  const carregarProjetos = async () => {
    try {
      const response = await fetch(
        `${supabaseUrl}/rest/v1/projetos`,
        { headers }
      );
      if (!response.ok) throw new Error("Falha ao carregar projetos");
      const data = await response.json();
      setProjects(data as Project[]);
    } catch (error) {
      console.error("Erro ao carregar projetos:", error);
    } finally {
      setLoading(false);
    }
  };

  // Função para salvar (POST) ou atualizar (PATCH) um projeto
  const salvarProjeto = async (e: React.FormEvent) => {
    e.preventDefault();
    const { titulo, descricao, categoria, imagem_url } = form;

    try {
      if (idEmEdicao === null) {
        // CREATE - POST
        const response = await fetch(
          `${supabaseUrl}/rest/v1/projetos`,
          {
            method: "POST",
            headers,
            body: JSON.stringify({ titulo, descricao, categoria, imagem_url }),
          }
        );
        if (!response.ok) throw new Error("Erro ao criar projeto");
      } else {
        // UPDATE - PATCH with ?id=eq.<id>
        const response = await fetch(
          `${supabaseUrl}/rest/v1/projetos?id=eq.${idEmEdicao}`,
          {
            method: "PATCH",
            headers,
            body: JSON.stringify({ titulo, descricao, categoria, imagem_url }),
          }
        );
        if (!response.ok) throw new Error("Erro ao atualizar projeto");
      }
      // Resetar estado após salvar
      setIdEmEdicao(null);
      setForm({ titulo: "", descricao: "", categoria: "", imagem_url: "" });
      carregarProjetos(); // recarregar lista
    } catch (error) {
      console.error("Erro ao salvar projeto:", error);
    }
  };

  // Função para deletar um projeto (DELETE)
  const deletarProjeto = async (id: string) => {
    try {
      const response = await fetch(
        `${supabaseUrl}/rest/v1/projetos?id=eq.${id}`,
        { method: "DELETE", headers }
      );
      if (!response.ok) throw new Error("Erro ao excluir projeto");
      carregarProjetos();
    } catch (error) {
      console.error("Erro ao excluir projeto:", error);
    }
  };

  // Manter o formulário sincronizado ao clicar em "Editar"
  const handleEditClick = (project: Project) => {
    setIdEmEdicao(project.id);
    setForm({
      titulo: project.titulo,
      descricao: project.descricao,
      categoria: project.categoria,
      imagem_url: project.imagem_url,
    });
  };

  // Cancelar edição
  const cancelarEdicao = () => {
    setIdEmEdicao(null);
    setForm({ titulo: "", descricao: "", categoria: "", imagem_url: "" });
  };

  // Renderização do formulário
  const renderForm = () => (
    <div className="w-full max-w-2xl bg-[#2d3748] p-6 rounded-xl shadow-lg mb-8">
      <h2 className="text-xl font-semibold text-white mb-4">
        {idEmEdicao ? "Editar Projeto" : "Novo Projeto"}
      </h2>
      <form onSubmit={salvarProjeto} className="space-y-4">
        {/* Título */}
        <div>
          <label className="block text-sm font-medium text-stone-300 mb-1">
            Título
          </label>
          <input
            type="text"
            value={form.titulo}
            onChange={(e) => setForm({ ...form, titulo: e.target.value })}
            required
            className="w-full px-3 py-2 bg-[#4a5568] border border-[#64748b] rounded-md text-white focus:ring-amber-400"
          />
        </div>

        {/* Descrição */}
        <div>
          <label className="block text-sm font-medium text-stone-300 mb-1">
            Descrição
          </label>
          <textarea
            value={form.descricao}
            onChange={(e) => setForm({ ...form, descricao: e.target.value })}
            rows={3}
            required
            className="w-full px-3 py-2 bg-[#4a5568] border border-[#64748b] rounded-md text-white focus:ring-amber-400"
          />
        </div>

        {/* Categoria */}
        <div>
          <label className="block text-sm font-medium text-stone-300 mb-1">
            Categoria
          </label>
          <input
            type="text"
            value={form.categoria}
            onChange={(e) => setForm({ ...form, categoria: e.target.value })}
            required
            className="w-full px-3 py-2 bg-[#4a5568] border border-[#64748b] rounded-md text-white focus:ring-amber-400"
          />
        </div>

        {/* URL da Imagem */}
        <div>
          <label className="block text-sm font-medium text-stone-300 mb-1">
            URL da Imagem
          </label>
          <input
            type="text"
            value={form.imagem_url}
            onChange={(e) => setForm({ ...form, imagem_url: e.target.value })}
            required
            className="w-full px-3 py-2 bg-[#4a5568] border border-[#64748b] rounded-md text-white focus:ring-amber-400"
          />
        </div>

        {/* Botão de ação */}
        <div className="flex justify-end gap-2">
          <button
            type="button"
            onClick={cancelarEdicao}
            className="px-4 py-2 bg-[#6b7280] text-white rounded-md hover:bg-[#4b5563] transition-colors"
          >
            Cancelar
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-amber-600 text-white rounded-md hover:bg-amber-700 transition-colors"
          >
            {idEmEdicao ? "Salvar Alterações" : "Publicar Projeto"}
          </button>
        </div>
      </form>
    </div>
  );

  // Renderização da lista de projetos
  const renderProjectsList = () => (
    <div className="w-full max-w-4xl">
      <div className="space-y-4">
        {projects.map((project) => (
          <div
            key={project.id}
            className="flex items-center justify-between p-4 bg-[#2d3748] rounded-xl shadow-sm border border-[#4a5568]"
          >
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-12 h-12 bg-[#1e293b] rounded-md overflow-hidden">
                <img
                  src={project.imagem_url}
                  alt={project.titulo}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src =
                      "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTYwIiBoZWlnaHQ9IjEyIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxyZWN0IHdpZHRoPSIxNjAiIGhlaWdodD0iMTIiIGZpbGw9IiNmZmYiLz48dGV4dCB4PSIxNTAiIHk9IjEyIiBmb250LWZhbWlseT0ic2Fuc2xlciI+SW1hZ2U8L3RleHQ+PC9zdmc+";
                  }}
                />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm text-stone-300 font-medium">{project.titulo}</p>
                <p className="text-xs text-stone-400 line-clamp-2">{project.descricao}</p>
                <span className="inline-block px-2 py-1 text-xs font-medium bg-amber-600 text-amber-200 rounded-full">
                  {project.categoria}
                </span>
              </div>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => handleEditClick(project)}
                className="text-amber-400 hover:text-amber-800"
              >
                <span className="w-4 h-4">✏️</span>
              </button>
              <button
                onClick={() => {
                  setShowDeleteConfirm(true);
                  setDeleteId(project.id);
                }}
                className="text-red-400 hover:text-red-800"
              >
                <span className="w-4 h-4">🗑️</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  // Modal de confirmação de exclusão
  const renderDeleteModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-[#2d3748] p-6 rounded-xl shadow-lg w-full max-w-md">
        <h3 className="text-xl font-semibold text-white mb-2">
          Excluir Projeto
        </h3>
        <p className="text-stone-300 mb-4">
          Tem certeza de que deseja excluir este projeto?
        </p>
        <div className="flex justify-end space-x-2">
          <button
            onClick={() => setShowDeleteConfirm(false)}
            className="px-4 py-2 bg-[#6b7280] text-white rounded-md hover:bg-[#4b5563]"
          >
            Cancelar
          </button>
          <button
            onClick={() => {
              deletarProjeto(deleteId!);
              setShowDeleteConfirm(false);
            }}
            className="px-4 py-2 bg-amber-600 text-white rounded-md hover:bg-amber-700"
          >
            Excluir
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#1e293b] text-white flex flex-col items-center">
      <header className="w-full bg-[#111827] border-b border-[#334155] py-4">
        <h1 className="text-3xl font-bold text-center text-amber-300">
          Gerenciamento de Projetos
        </h1>
      </header>

      {renderForm()}

      {renderProjectsList()}

      {showDeleteConfirm && renderDeleteModal()}
    </div>
  );
}