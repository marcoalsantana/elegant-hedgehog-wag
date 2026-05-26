export interface Projeto {
  id?: string;
  titulo: string;
  descricao: string;
  categoria: string;
  imagem_url: string;
}

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

function getHeaders() {
  return {
    'apikey': SUPABASE_ANON_KEY || '',
    'Authorization': `Bearer ${SUPABASE_ANON_KEY || ''}`,
    'Content-Type': 'application/json',
    'Prefer': 'return=representation'
  };
}

export async function getProjetos(): Promise<Projeto[]> {
  const res = await fetch(`${SUPABASE_URL}/rest/v1/projetos?select=*`, {
    headers: getHeaders(),
    cache: 'no-store'
  });
  if (!res.ok) throw new Error('Failed to fetch projetos');
  return res.json();
}

export async function getProjeto(id: string): Promise<Projeto> {
  const res = await fetch(`${SUPABASE_URL}/rest/v1/projetos?id=eq.${id}&select=*`, {
    headers: getHeaders(),
    cache: 'no-store'
  });
  if (!res.ok) throw new Error('Failed to fetch projeto');
  const data = await res.json();
  return data[0];
}

export async function createProjeto(projeto: Projeto): Promise<Projeto> {
  const res = await fetch(`${SUPABASE_URL}/rest/v1/projetos`, {
    method: 'POST',
    headers: getHeaders(),
    body: JSON.stringify(projeto)
  });
  if (!res.ok) throw new Error('Failed to create projeto');
  const data = await res.json();
  return data[0];
}

export async function updateProjeto(id: string, projeto: Partial<Projeto>): Promise<Projeto> {
  const res = await fetch(`${SUPABASE_URL}/rest/v1/projetos?id=eq.${id}`, {
    method: 'PATCH',
    headers: getHeaders(),
    body: JSON.stringify(projeto)
  });
  if (!res.ok) throw new Error('Failed to update projeto');
  const data = await res.json();
  return data[0];
}

export async function deleteProjeto(id: string): Promise<void> {
  const res = await fetch(`${SUPABASE_URL}/rest/v1/projetos?id=eq.${id}`, {
    method: 'DELETE',
    headers: getHeaders()
  });
  if (!res.ok) throw new Error('Failed to delete projeto');
}
