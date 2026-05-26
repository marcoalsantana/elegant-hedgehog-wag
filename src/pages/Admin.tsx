import { useEffect, useState } from 'react';
import { getAllProjetos, createProjeto, updateProjeto, deleteProjeto, type Projeto } from '@/lib/database';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Plus, Pencil, Trash2, Building2, X } from 'lucide-react';
import { toast } from 'sonner';

export default function Admin() {
  const [projetos, setProjetos] = useState<Projeto[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState({
    titulo: '',
    descricao: '',
    categoria: '',
    imagem_url: '',
  });

  useEffect(() => {
    loadProjetos();
  }, []);

  async function loadProjetos() {
    try {
      setLoading(true);
      const data = await getAllProjetos();
      setProjetos(data);
    } catch (error) {
      console.error('Erro ao carregar projetos:', error);
      toast.error('Erro ao carregar projetos');
    } finally {
      setLoading(false);
    }
  }

  function openCreateDialog() {
    setEditingId(null);
    setForm({ titulo: '', descricao: '', categoria: '', imagem_url: '' });
    setDialogOpen(true);
  }

  function openEditDialog(projeto: Projeto) {
    setEditingId(projeto.id);
    setForm({
      titulo: projeto.titulo,
      descricao: projeto.descricao,
      categoria: projeto.categoria,
      imagem_url: projeto.imagem_url,
    });
    setDialogOpen(true);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    try {
      if (editingId) {
        await updateProjeto(editingId, form);
        toast.success('Projeto atualizado com sucesso!');
      } else {
        await createProjeto(form);
        toast.success('Projeto criado com sucesso!');
      }
      setDialogOpen(false);
      loadProjetos();
    } catch (error) {
      console.error('Erro ao salvar projeto:', error);
      toast.error('Erro ao salvar projeto');
    }
  }

  async function handleDelete(id: string) {
    if (!confirm('Tem certeza que deseja excluir este projeto?')) return;

    try {
      await deleteProjeto(id);
      toast.success('Projeto excluído com sucesso!');
      loadProjetos();
    } catch (error) {
      console.error('Erro ao excluir projeto:', error);
      toast.error('Erro ao excluir projeto');
    }
  }

  return (
    <div className="min-h-screen bg-stone-50">
      {/* Header */}
      <header className="border-b border-stone-200 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Building2 className="w-8 h-8 text-amber-700" />
              <div>
                <h1 className="text-2xl font-bold text-stone-900">Painel de Gerenciamento</h1>
                <p className="text-stone-500 text-sm">Administração de projetos</p>
              </div>
            </div>
            <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
              <DialogTrigger asChild>
                <Button onClick={openCreateDialog} className="bg-amber-700 hover:bg-amber-800">
                  <Plus className="w-4 h-4 mr-2" />
                  Novo Projeto
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-lg">
                <DialogHeader>
                  <DialogTitle>
                    {editingId ? 'Editar Projeto' : 'Novo Projeto'}
                  </DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-4 mt-4">
                  <div>
                    <Label htmlFor="titulo">Título</Label>
                    <Input
                      id="titulo"
                      value={form.titulo}
                      onChange={(e) => setForm({ ...form, titulo: e.target.value })}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="descricao">Descrição</Label>
                    <Textarea
                      id="descricao"
                      value={form.descricao}
                      onChange={(e) => setForm({ ...form, descricao: e.target.value })}
                      rows={3}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="categoria">Categoria</Label>
                    <Input
                      id="categoria"
                      value={form.categoria}
                      onChange={(e) => setForm({ ...form, categoria: e.target.value })}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="imagem_url">URL da Imagem</Label>
                    <Input
                      id="imagem_url"
                      value={form.imagem_url}
                      onChange={(e) => setForm({ ...form, imagem_url: e.target.value })}
                      required
                    />
                  </div>
                  <div className="flex justify-end gap-3 pt-2">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setDialogOpen(false)}
                    >
                      <X className="w-4 h-4 mr-2" />
                      Cancelar
                    </Button>
                    <Button type="submit" className="bg-amber-700 hover:bg-amber-800">
                      {editingId ? 'Atualizar' : 'Criar'}
                    </Button>
                  </div>
                </form>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </header>

      {/* Table */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {loading ? (
          <p className="text-center text-stone-400 py-20">Carregando...</p>
        ) : projetos.length === 0 ? (
          <div className="text-center py-20">
            <Building2 className="w-16 h-16 text-stone-300 mx-auto mb-4" />
            <p className="text-stone-400 text-lg">Nenhum projeto cadastrado.</p>
            <p className="text-stone-400 text-sm mt-1">Clique em "Novo Projeto" para começar.</p>
          </div>
        ) : (
          <Card>
            <CardHeader>
              <CardTitle>Projetos Cadastrados</CardTitle>
            </CardHeader>
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
                  {projetos.map((projeto) => (
                    <TableRow key={projeto.id}>
                      <TableCell>
                        <img
                          src={projeto.imagem_url}
                          alt={projeto.titulo}
                          className="w-16 h-12 object-cover rounded"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTYwIiBoZWlnaHQ9IjEyIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxyZWN0IHdpZHRoPSIxNjAiIGhlaWdodD0iMTIiIGZpbGw9IiNmZmYiLz48dGV4dCB4PSIxNTAiIHk9IjEyIiBmb250LWZhbWlseT0ic2Fuc2xlciI+SW1hZ2U8L3RleHQ+PC9zdmc+';
                          }}
                        />
                      </TableCell>
                      <TableCell className="font-medium">{projeto.titulo}</TableCell>
                      <TableCell>
                        <span className="inline-block px-2 py-1 text-xs font-medium bg-amber-50 text-amber-800 rounded-full">
                          {projeto.categoria}
                        </span>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => openEditDialog(projeto)}
                          >
                            <Pencil className="w-4 h-4" />
                          </Button>
                          <Button
                            variant="destructive"
                            size="sm"
                            onClick={() => handleDelete(projeto.id)}
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        )}
      </main>
    </div>
  );
}