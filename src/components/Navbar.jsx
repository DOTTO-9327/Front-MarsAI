import React, { useState, useEffect } from 'react';
import { Menu, X, Globe } from 'lucide-react'; // Ajout de Globe au cas où
import { Link } from 'react-router-dom';

const Navbar = ({ currentView, setView }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Galerie', id: 'galerie', view: 'galerie' },
    { name: 'Programme & Infos', id: 'infos', view: 'infos' },
    { name: 'Jury', id: 'jury', view: 'jury' }
  ];

  const handleNavClick = (link) => {
    setView(link.view);
    setIsMenuOpen(false);
    if (link.view === 'home' && link.id !== 'home') {
      setTimeout(() => {
        const el = document.getElementById(link.id);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const isDarkNav = !isScrolled && currentView === 'home';

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${isScrolled || currentView !== 'home'
        ? 'bg-white/95 backdrop-blur-md py-3 border-b border-slate-200 shadow-sm'
        : 'bg-transparent py-6'
      }`}>
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">

        {/* LOGO */}
        <Link
          to="/"
          className="flex items-center gap-2 cursor-pointer outline-none"
          onClick={() => handleNavClick({ view: 'home', id: 'home' })}
        >
          <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center shadow-lg">
            <span className="font-bold text-white text-xl">M</span>
          </div>
          <span className={`text-2xl font-black tracking-tighter transition-colors ${isDarkNav ? 'text-white' : 'text-slate-900'
            }`}>
            MARS.A.I
          </span>
        </Link>

        {/* MENU DESKTOP */}
        <div className="hidden md:flex items-center gap-6"> {/* Réduction gap pour laisser place au drapeau */}
          {navLinks.map((item) => (
            <button
              key={item.name}
              onClick={() => handleNavClick(item)}
              className={`text-[10px] font-bold transition-colors uppercase tracking-[0.2em] ${isDarkNav
                  ? 'text-white/80 hover:text-white'
                  : 'text-mars-dark hover:text-primary'
                }`}
            >
              {item.name}
            </button>
          ))}

          <div className="flex items-center gap-4 border-l border-slate-300/30 pl-6">
            <button className="bg-primary text-white px-6 py-2 rounded-full text-[10px] font-bold uppercase tracking-widest hover:bg-[#1d568c] transition-all shadow-md">
              Soumettre
            </button>

            {/* DRAPEAU ANGLAIS */}
            <button
              className={`flex items-center justify-center w-8 h-8 rounded-full border transition-all ${isDarkNav ? 'border-white/20 hover:bg-white/10' : 'border-slate-200 hover:bg-slate-100'
                }`}
              title="Change to English"
              onClick={() => console.log("Switch to EN")}
            >
              <span className="text-lg">🇬🇧</span>
            </button>
          </div>
        </div>

        {/* TOGGLE MOBILE */}
        <div className="flex items-center gap-4 md:hidden">
          {/* Drapeau aussi visible sur mobile à côté du burger */}
          <button className="text-xl">🇬🇧</button>
          <button
            className={`p-2 rounded-lg ${isDarkNav ? 'text-white' : 'text-mars-dark'}`}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* MENU MOBILE ... (le reste reste inchangé) */}
    </nav>
  );
};

export default Navbar;