import { supabase } from '@/integrations/supabase/client';

/**
 * Creates the "tarefas" table in Supabase with the following columns:
 * - id: UUID (primary key, auto-generated)
 * - titulo: text
 * - data_criacao: timestamp with time zone
 * - status: text
 * - data_conclusao: timestamp with time zone (nullable)
 */
export async function createTarefasTable() {
  const { error } = await supabase.rpc('exec_sql', {
    sql: `
      CREATE TABLE IF NOT EXISTS tarefas (
        id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
        titulo TEXT NOT NULL,
        data_criacao TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
        status TEXT NOT NULL DEFAULT 'pendente',
        data_conclusao TIMESTAMP WITH TIME ZONE
      );

      -- Enable Row Level Security
      ALTER TABLE tarefas ENABLE ROW LEVEL SECURITY;

      -- Policy: Users can view their own tasks
      CREATE POLICY "Users can view own tasks" ON tarefas
        FOR SELECT TO authenticated
        USING (auth.uid() = (SELECT auth.uid()));

      -- Policy: Users can insert their own tasks
      CREATE POLICY "Users can insert own tasks" ON tarefas
        FOR INSERT TO authenticated
        WITH CHECK (auth.uid() = (SELECT auth.uid()));

      -- Policy: Users can update their own tasks
      CREATE POLICY "Users can update own tasks" ON tarefas
        FOR UPDATE TO authenticated
        USING (auth.uid() = (SELECT auth.uid()));

      -- Policy: Users can delete their own tasks
      CREATE POLICY "Users can delete own tasks" ON tarefas
        FOR DELETE TO authenticated
        USING (auth.uid() = (SELECT auth.uid()));
    `
  });

  if (error) {
    console.error('Erro ao criar tabela tarefas:', error);
    throw error;
  }

  console.log('Tabela "tarefas" criada com sucesso!');
}

// Auto-run when module is imported (optional)
// createTarefasTable();