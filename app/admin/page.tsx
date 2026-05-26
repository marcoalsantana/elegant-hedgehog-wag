"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button, Card, CardContent, CardHeader, CardTitle, Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/ui";
import { Plus, Edit2, Trash2, Building2 } from "lucide-react";

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
      // toast.success("Projeto atualizado!"); // assuming toast is available globally
    } else {
      const { error } = await supabase
        .from("projetos")
        .insert({ titulo, descricao, categoria, imagem_url });
      if (error) {
        console.error("Erro ao criar projeto:", error);
        return;
      }
      // toast.success("Projeto criado!");
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
    // toast.success("Projeto excluído!");
    fetchProjects();
  };

  return (
    <div className="min-h-screen bg-stone-50">
      <header className="border-b border-stone-200 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Building2 className="w-8 h-8 text-amber-700" />
              <h1 className="text-2xl font-bold text-stone-900">Painel de Gerenciamento</h1>
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
                        <img                          src={project.imagem_url}
                          alt={project.titulo}
                          className="w-16 h-12 object-cover rounded"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src =
                              "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTYwIiBoZWlnaHQ9IjEyIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxyZWN0IHdpZHRoPSIxNjAiIGhlaWdodD0iMTIiIGZpbGw9IiNmZmYiLz48dGV4dCB4PSIxNTAiIHk9IjEyIiBmb250LWZhbWlseT0ic2Fuc2xlciI+SW1hZ2U8L3RleHQ+PC9zdmc+";
                          }}
                        />
                      </TableCell>
                      <TableCell className="font-medium">{project.titulo}</TableCell>
                      <TableCell>
                        <span className="inline-block px-2 py-1 text-xs font-medium bg-amber-50 text-amber-800 rounded-full">
                          {project.categoria}
                        </span>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => {
                              setEditingId(project.id);
                              setForm({
                                titulo: project.titulo,
                                descricao: project.descricao,
                                categoria: project.categoria,
                                imagem_url: project.imagem_url,
                              });
                            }}
                          >
                            <Edit2 className="w-4 h-4" />
                          </Button>
                          <Button                            variant="destructive"
                            size="sm"
                            onClick={() => handleDelete(project.id)}
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>

              {/* Form Modal */}
              {editingId && (
                <form onSubmit={handleSubmit} className="space-y-4 mt-8 p-6 border rounded-lg">
                  <div>
                    <label className="block text-sm font-medium text-stone-700">Título</label>
                    <input
                      type="text"
                      value={form.titulo}
                      onChange={(e) => setForm({ ...form, titulo: e.target.value })}
                      required
                      className="mt-1 block w-full rounded-md border border-stone-300 shadow-sm focus:ring-primary-500 focus:border-primary-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-stone-700">Descrição</label>
                    <textarea                      value={form.descricao}
                      onChange={(e) => setForm({ ...form, descricao: e.target.value })}
                      rows={3}
                      required
                      className="mt-1 block w-full rounded-md border border-stone-300 shadow-sm focus:ring-primary-500 focus:border-primary-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-stone-700">Categoria</label>
                    <input
                      type="text"
                      value={form.categoria}
                      onChange={(e) => setForm({ ...form, categoria: e.target.value })}
                      required
                      className="mt-1 block w-full rounded-md border border-stone-300 shadow-sm focus:ring-primary-500 focus:border-primary-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-stone-700">URL da Imagem</label>
                    <input                      type="text"
                      value={form.imagem_url}
                      onChange={(e) => setForm({ ...form, imagem_url: e.target.value })}
                      required
                      className="mt-1 block w-full rounded-md border border-stone-300 shadow-sm focus:ring-primary-500 focus:border-primary-500"
                    />
                  </div>
                  <div className="flex justify-end gap-2 pt-4">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => {
                        setEditingId(null);
                        setForm({ titulo: "", descricao: "", categoria: "", imagem_url: "" });
                      }}
                    >
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