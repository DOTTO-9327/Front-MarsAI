import { useState, useEffect } from 'react';
import { Menu, X, Globe } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const isHomePage = location.pathname === '/';

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 100);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  const isTransparent = isHomePage && !isScrolled && !isMenuOpen;

  const navLinks = [
    { name: 'Galerie', path: '/galerie' },
    { name: 'Programme & Infos', path: '/programme' },
    { name: 'Jury', path: '/jury' }
  ];

  return (
    <nav className={`fixed w-full z-50 transition-all duration-500 ${isTransparent
        ? 'bg-transparent'
        : 'bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-sm'
      } py-4`}>
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">

        {/* LOGO */}
        <Link to="/" className="flex items-center gap-2 z-50">
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
          {navLinks.map((item) => (
            <Link
              key={item.name}
              to={item.path}
              className={`text-[10px] font-bold uppercase tracking-[0.2em] transition-colors ${isTransparent ? 'text-white/80 hover:text-white' : 'text-slate-600 hover:text-primary'
                }`}
            >
              {item.name}
            </Link>
          ))}

          <div className="flex items-center gap-4 border-l border-slate-300/30 pl-6">
            <button className="bg-primary text-white px-6 py-2 rounded-full text-[10px] font-bold uppercase tracking-widest hover:scale-105 transition-transform">
              Soumettre
            </button>
            <button className="text-xl">🇬🇧</button>
          </div>
        </div>

        {/* ZONE DROITE MOBILE (Drapeau + Burger) */}
        <div className="flex md:hidden items-center gap-4">
          <button className="text-xl pt-1">🇬🇧</button> {/* Le drapeau mobile */}

          <button
            className={`z-50 p-2 transition-colors ${isTransparent ? 'text-white' : 'text-slate-900'
              }`}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* MENU MOBILE (DROPDOWN) */}
      {isMenuOpen && (
        <div className="absolute top-full left-0 w-full bg-white border-b border-slate-200 p-6 flex flex-col gap-4 md:hidden shadow-2xl animate-in fade-in slide-in-from-top-4">
          {navLinks.map((item) => (
            <Link
              key={item.name}
              to={item.path}
              className="text-left text-lg font-bold text-dark-mars py-2 border-b border-slate-50 last:border-0 hover:text-primary transition-colors"
            >
              {item.name}
            </Link>
          ))}
          <button className="bg-primary text-white px-6 py-4 rounded-xl font-bold uppercase text-sm tracking-widest mt-2">
            Soumettre un film
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;