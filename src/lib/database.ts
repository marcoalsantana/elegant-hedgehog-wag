import { supabase } from '@/integrations/supabase/client';

export interface Projeto {
  id: string;
  titulo: string;
  descricao: string;
  categoria: string;
  imagem_url: string;
  criado_em: string;
}

export async function getAllProjetos(): Promise<Projeto[]> {
  const { data, error } = await supabase
    .from('projetos')
    .select('*')
    .order('criado_em', { ascending: false });

  if (error) throw error;
  return data as Projeto[];
}

export async function createProjeto(projeto: Omit<Projeto, 'id' | 'criado_em'>): Promise<Projeto> {
  const { data, error } = await supabase
    .from('projetos')
    .insert([projeto])
    .select()
    .single();

  if (error) throw error;
  return data as Projeto;
}

export async function updateProjeto(id: string, projeto: Partial<Omit<Projeto, 'id' | 'criado_em'>>): Promise<Projeto> {
  const { data, error } = await supabase
    .from('projetos')
    .update(projeto)
    .eq('id', id)
    .select()
    .single();

  if (error) throw error;
  return data as Projeto;
}

export async function deleteProjeto(id: string): Promise<void> {
  const { error } = await supabase
    .from('projetos')
    .delete()
    .eq('id', id);

  if (error) throw error;
}