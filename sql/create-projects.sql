CREATE TABLE IF NOT EXISTS projetos (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  titulo TEXT NOT NULL,
  descricao TEXT NOT NULL,
  categoria TEXT NOT NULL,
  imagem_url TEXT NOT NULL,
  criado_em TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

ALTER TABLE projetos ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public read access" ON projetos
  FOR SELECT USING (true);

CREATE POLICY "Anyone can insert projects" ON projetos
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Anyone can update projects" ON projetos
  FOR UPDATE USING (true);

CREATE POLICY "Anyone can delete projects" ON projetos
  FOR DELETE USING (true);