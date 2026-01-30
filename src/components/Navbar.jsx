import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation(); // Récupère l'URL actuelle

  // Détermine si on est sur la homepage
  const isHomePage = location.pathname === '/';

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 100);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // La navbar est transparente seulement sur Home et quand on n'a pas scrollé
  const isTransparent = isHomePage && !isScrolled;

  return (
    <nav className={`fixed w-full z-50 transition-all duration-500 ${isTransparent
        ? 'bg-transparent py-6'
        : 'bg-white/95 backdrop-blur-md py-3 border-b border-slate-200 shadow-sm'
      }`}>
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">

        {/* LOGO */}
        <Link to="/" className="flex items-center gap-2">
          <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center shadow-lg">
            <span className="font-bold text-white text-xl">M</span>
          </div>
          <span className={`text-2xl font-black tracking-tighter transition-colors duration-300 ${isTransparent ? 'text-white' : 'text-slate-900'
            }`}>
            MARS.A.I
          </span>
        </Link>

        {/* MENU DESKTOP */}
        <div className="hidden md:flex items-center gap-8">
          {[
            { name: 'Galerie', path: '/galerie' },
            { name: 'Programme & Infos', path: '/programme' },
            { name: 'Jury', path: '/jury' }
          ].map((item) => (
            <Link
              key={item.name}
              to={item.path}
              className={`text-[10px] font-bold uppercase tracking-[0.2em] transition-colors ${isTransparent ? 'text-white/80 hover:text-white' : 'text-slate-600 hover:text-primary'
                }`}
            >
              {item.name}
            </Link>
          ))}

          {/* Bouton Soumettre & Flag */}
          <div className="flex items-center gap-4 border-l border-slate-300/30 pl-6">
            <button className="bg-primary text-white px-6 py-2 rounded-full text-[10px] font-bold uppercase tracking-widest hover:scale-105 transition-transform">
              Soumettre
            </button>
            <button className="text-xl">🇬🇧</button>
          </div>
        </div>

        {/* Mobile Burger */}
        <button
          className={`md:hidden ${isTransparent ? 'text-white' : 'text-slate-900'}`}
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X /> : <Menu />}
        </button>
      </div>
    </nav>
  );
};

export default Navbar;