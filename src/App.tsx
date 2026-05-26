import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import AdminPage from './pages/AdminPage';

export default function App() {
  return (
    <Router>
      <div className="min-h-screen bg-stone-900 text-stone-100">
        {/* Header with navigation */}
        <header className="border-b border-stone-700 bg-stone-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <nav className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="text-amber-700 text-2xl">🏗️</span>
                <h1 className="text-xl font-bold text-stone-100">Atelier de Arquitetura</h1>
              </div>
              <div className="flex gap-4">
                <Link to="/" className="px-3 py-1 text-sm font-medium rounded-md hover:bg-stone-700 transition-colors">
                  Página Pública
                </Link>
                <Link to="/admin" className="px-3 py-1 text-sm font-medium rounded-md hover:bg-stone-700 transition-colors">
                  Painel Admin
                </Link>
              </div>
            </nav>
          </div>
        </header>

        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/admin" element={<AdminPage />} />
          </Routes>
        </main>

        <footer className="border-t border-stone-700 mt-12">
          <div className="max-w-7xl mx-auto px-4 py-6 text-center text-stone-500 text-sm">
            <p>Feito com ♥ por Dyad</p>
          </div>
        </footer>
      </div>
    </Router>
  );
}