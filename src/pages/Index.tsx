import { MadeWithDyad } from "@/components/made-with-dyad";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
      <h1 className="text-5xl font-bold text-primary mb-6">meu microsaas</h1>
      <p className="text-lg text-muted-foreground mb-8">
        Bem‑vindo ao seu micro‑SaaS. Comece a construir algo incrível!
      </p>
      <MadeWithDyad />
    </div>
  );
};

export default Index;