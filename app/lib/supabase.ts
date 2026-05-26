"use client";

import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || "",
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ""
);

export { supabase };
＜/dyad-write>

＜dyad-write path="app/page.tsx" description="Public home page with project cards and dark theme">
"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { Building2 } from "lucide-react";

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
      const { data, error } = await supabase
        .from("projetos")
        .select("id, titulo, descricao, categoria, imagem_url")
        .order("criado_em", { ascending: false });

      if (error) {
        console.error("Erro ao buscar projetos:", error);
        return;
      }
      setProjects(data as Project[]);
      setLoading(false);
    };

    fetchProjects();
  }, []);

  return (
    <div className="min-h-screen bg-stone-900 text-stone-100">
      {/* Header */}
      <header className="border-b border-stone-700 bg-stone-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center gap-3">
            <Building2 className="w-8 h-8 text-amber-700" />
            <h1 className="text-3xl font-bold text-stone-100 tracking-tight">
              Atelier de Arquitetura
            </h1>
          </div>
          <p className="text-stone-400 mt-1">
            Projetos de luxo e alto padrão
          </p>
        </div>
      </header>

      {/* Projects Grid */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {loading ? (
          <div className="text-center py-20">
            <p className="text-stone-400 text-lg">Carregando projetos...</p>
          </div>
        ) : projects.length === 0 ? (
          <div className="text-center py-20">
            <Building2 className="w-16 h-16 text-stone-600 mx-auto mb-4" />
            <p className="text-stone-400 text-lg">Nenhum projeto publicado ainda.</p>
            <p className="text-stone-400 text-sm mt-1">Acesse /admin para adicionar projetos.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project) => (
              <div
                key={project.id}
                className="bg-stone-800 rounded-xl shadow-sm border border-stone-700 overflow-hidden hover:shadow-md transition-shadow"
              >
                <div className="aspect-[4/3] bg-stone-700">
                  <img
                    src={project.imagem_url}
                    alt={project.titulo}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src =
                        "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODAwIiBoZWlnaHQ9IjQwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iODAwIiBoZWlnaHQ9IjQwMCIgZmlsbD0iI2ZmZiIvPjx0ZXh0IHg9IjE1MCIgeT0iNDAiIGZvbnQtZmFtaWx5PSJzYW5zLXNlcmlmIiBmb250LXNpemU9IjI0IiBmaWxsPSIjMzMzIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIj5JbWFnZW48L3RleHQ+PC9zdmc+";
                    }}
                  />
                </div>
                <div className="p-5">
                  <span className="inline-block px-3 py-1 text-xs font-medium bg-amber-900 text-amber-200 rounded-full mb-3">
                    {project.categoria}
                  </span>
                  <h2 className="text-xl font-semibold text-stone-100 mb-2">
                    {project.titulo}
                  </h2>
                  <p className="text-stone-400 text-sm leading-relaxed">
                    {project.descricao}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      <footer className="border-t border-stone-700 bg-stone-800 mt-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <MadeWithDyad />
        </div>
      </footer>
    </div>
  );
}
＜/dyad-write>

<dyad-write path="app/components/MadeWithDyad.tsx" description="Footer component">
export default function MadeWithDyad() {
  return (
    <div className="flex items-center justify-center gap-2 text-stone-500 text-sm">
      <span>Feito com</span>
      <span className="text-amber-700">♥</span>
      <span>por Dyad</span>
    </div>
  );
}
＜/dyad-write>

＜dyad-chat-summary>Created Supabase client, updated home page with dark theme and project cards＜/dyad-chat-summary></think>
<dyad-write path="app/admin/page.tsx" description="Admin page with CRUD operations for projects">
"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { Plus, Edit2, Trash2, Building2 } from "lucide-react";

type Project = {
  id: string;
  titulo: string;
  descricao: string;
  categoria: string;
  imagem_url: string;
};

export default function Admin() from "lucide-react";

type Project = {
  id: string;
  titulo: string;
  descricao: string;
  categoria: string;
  imagem_url: string;
};

export default function Admin() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState({
    titulo: "",
    descricao: "",
    categoria: "",
    imagem_url: "",
  });

  const fetchProjects = async () => {
    const { data, error } = await supabase
      .from("projetos")
      .select("id, titulo, descricao, categoria, imagem_url")
      .order("criado_em", { ascending: false });

    if (error) {
      console.error("Erro ao carregar projetos:", error);
      return;
    }
    setProjects(data as Project[]);
    setLoading(false);
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const { titulo, descricao, categoria, imagem_url } = form;

    if (editingId) {
      const { error } = await supabase
        .from("projetos")
        .update({ titulo, descricao, categoria, imagem_url })
        .eq("id", editingId);
      if (error) {
        console.error("Erro ao atualizar projeto:", error);
        return;
      }
    } else {
      const { error } = await supabase
        .from("projetos")
        .insert({ titulo, descricao, categoria, imagem_url });
      if (error) {
        console.error("Erro ao criar projeto:", error);
        return;
      }
    }
    setEditingId(null);
    setForm({ titulo: "", descricao: "", categoria: "", imagem_url: "" });
    fetchProjects();
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Tem certeza que deseja excluir este projeto?")) return;
    const { error } = await supabase.from("projetos").delete().eq("id", id);
    if (error) {
      console.error("Erro ao excluir projeto:", error);
      return;
    }
    fetchProjects();
  };

  return (
    <div className="min-h-screen bg-stone-900 text-stone-100">
      <header className="border-b border-stone-700 bg-stone-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Building2 className="w-8 h-8 text-amber-700" />
              <h1 className="text-2xl font-bold text-stone-100">Painel de Gerenciamento</h1>
            </div>
            <Button onClick={() => setEditingId(null)} className="bg-amber-700 hover:bg-amber-800">
              {editingId ? "Cancelar" : "Novo Projeto"}
            </Button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {loading ? (
          <p className="text-center text-stone-400 py-20">Carregando...</p>
        ) : (
          <Card>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Imagem</TableHead>
                    <TableHead>Título</TableHead>
                    <TableHead>Categoria</TableHead>
                    <TableHead className="text-right">Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {projects.map((project) => (
                    <TableRow key={project.id}>
                      <TableCell>
                        <img src={project.imagem_url} alt={project.titulo} className="w-16 h-12 object-cover rounded" onError={(e) => {
                          (e.target as HTMLImageElement).src = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTYwIiBoZWlnaHQ9IjEyIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxyZWN0IHdpZHRoPSIxNjAiIGhlaWdodD0iMTIiIGZpbGw9IiNmZmYiLz48dGV4dCB4PSIxNTAiIHk9IjEyIiBmb250LWZhbWlseT0ic2Fuc2xlciI+SW1hZ2U8L3RleHQ+PC9zdmc+";
                        }} />
                      </TableCell>
                      <TableCell className="font-medium">{project.titulo}</TableCell>
                      <TableCell>
                        <span className="inline-block px-2 py-1 text-xs font-medium bg-amber-900 text-amber-200 rounded-full">
                          {project.categoria}
                        </span>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button variant="outline" size="sm" onClick={() => {
                            setEditingId(project.id);
                            setForm({
                              titulo: project.titulo,
                              descricao: project.descricao,
                              categoria: project.categoria,
                              imagem_url: project.imagem_url,
                            });
                          }}>
                            <Edit2 className="w-4 h-4" />
                          </Button>
                          <Button variant="destructive" size="sm" onClick={() => handleDelete(project.id)}>
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>

              {editingId && (
                <form onSubmit={handleSubmit} className="space-y-4 mt-8 p-6 border rounded-lg">
                  <div>
                    <label className="block text-sm font-medium text-stone-700">Título</label>
                    <input type="text" value={form.titulo} onChange={(e) => setForm({ ...form, titulo: e.target.value })} required className="mt-1 block w-full rounded-md border border-stone-300 shadow-sm focus:ring-primary-500 focus:border-primary-500" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-stone-700">Descrição</label>
                    <textarea value={form.descricao} onChange={(e) => setForm({ ...form, descricao: e.target.value })} rows={3} required className="mt-1 block w-full rounded-md border border-stone-300 shadow-sm focus:ring-primary-500 focus:border-primary-500" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-stone-700">Categoria</label>
                    <input type="text" value={form.categoria} onChange={(e) => setForm({ ...form, categoria: e.target.value })} required className="mt-1 block w-full rounded-md border border-stone-300 shadow-sm focus:ring-primary-500 focus:border-primary-500" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-stone-700">URL da Imagem</label>
                    <input type="text" value={form.imagem_url} onChange={(e) => setForm({ ...form, imagem_url: e.target.value })} required className="mt-1 block w-full rounded-md border border-stone-300 shadow-sm focus:ring-primary-500 focus:border-primary-500" />
                  </div>
                  <div className="flex justify-end gap-2 pt-4">
                    <Button type="button" variant="outline" onClick={() => {
                      setEditingId(null);
                      setForm({ titulo: "", descricao: "", categoria: "", imagem_url: "" });
                    }}>
                      Cancelar
                    </Button>
                    <Button type="submit" className="bg-amber-700 hover:bg-amber-800">
                      {editingId ? "Atualizar" : "Criar"}
                    </Button>
                  </div>
                </form>
              )}
            </CardContent>
          </Card>
        )}
      </main>
    </div>
  );
}