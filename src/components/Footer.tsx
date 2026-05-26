export default function Footer() {
  return (
    <footer className="w-full bg-zinc-950 py-12 border-t border-white/5">
      <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between text-center md:text-left gap-6">
        <div>
          <h2 className="text-2xl font-bold tracking-widest text-white mb-2">OBRA</h2>
          <p className="text-sm font-light text-white/50">Arquitetura de alto padrão e design cinematográfico.</p>
        </div>
        
        <div className="text-sm font-light text-white/50 space-y-2">
          <p>📍 São Paulo, SP - Brasil</p>
          <p>✉️ contato@agenciaobra.com.br</p>
        </div>
        
        <div className="text-xs text-white/30 uppercase tracking-widest">
          &copy; {new Date().getFullYear()} Agência Obra. Todos os direitos reservados.
        </div>
      </div>
    </footer>
  );
}
