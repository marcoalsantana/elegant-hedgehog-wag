import { useEffect, useState } from 'react';
import { getAllProjetos, type Projeto } from '@/lib/database';
import { MadeWithDyad } from '@/components/made-with-dyad';
import { Building2 } from 'lucide-react';

export default function Index() {
  const [projetos, setProjetos] = useState<Projeto[]>([]);
  const [loading, setLoading] = useState(true);

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
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-stone-50">
      {/* Header */}
      <header className="border-b border-stone-200 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center gap-3">
            <Building2 className="w-8 h-8 text-amber-700" />
            <h1 className="text-3xl font-bold text-stone-900 tracking-tight">
              Atelier de Arquitetura
            </h1>
          </div>
          <p className="text-stone-500 mt-1">
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
        ) : projetos.length === 0 ? (
          <div className="text-center py-20">
            <Building2 className="w-16 h-16 text-stone-300 mx-auto mb-4" />
            <p className="text-stone-400 text-lg">Nenhum projeto cadastrado ainda.</p>
            <p className="text-stone-400 text-sm mt-1">Acesse /admin para adicionar projetos.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projetos.map((projeto) => (
              <div
                key={projeto.id}
                className="bg-white rounded-xl shadow-sm border border-stone-200 overflow-hidden hover:shadow-md transition-shadow"
              >
                <div className="aspect-[4/3] bg-stone-100">
                  <img
                    src={projeto.imagem_url}
                    alt={projeto.titulo}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODAwIiBoZWlnaHQ9IjQwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iODAwIiBoZWlnaHQ9IjQwMCIgZmlsbD0iI2ZmZiIvPjx0ZXh0IHg9IjE1MCIgeT0iNDAiIGZvbnQtZmFtaWx5PSJzYW5zLXNlcmlmIiBmb250LXNpemU9IjI0IiBmaWxsPSIjMzMzIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIj5JbWFnZW48L3RleHQ+PC9zdmc+';
                    }}
                  />
                </div>
                <div className="p-5">
                  <span className="inline-block px-3 py-1 text-xs font-medium bg-amber-50 text-amber-800 rounded-full mb-3">
                    {projeto.categoria}
                  </span>
                  <h2 className="text-xl font-semibold text-stone-900 mb-2">
                    {projeto.titulo}
                  </h2>
                  <p className="text-stone-500 text-sm leading-relaxed">
                    {projeto.descricao}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      <footer className="border-t border-stone-200 bg-white mt-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <MadeWithDyad />
        </div>
      </footer>
    </div>
  );
}