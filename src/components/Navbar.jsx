import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import frFlag from '../assets/fr.png';
import gbFlag from '../assets/gb.png';
import Button from './ui/Button';
import { useNavigate } from 'react-router-dom';


const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { t, i18n } = useTranslation();
  const location = useLocation();
  const navigate = useNavigate();

  const isHomePage = location.pathname === '/';

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 80);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  const isTransparent = isHomePage && !isScrolled && !isMenuOpen;

  const navLinks = [
    { name: t('nav.galerie'), path: '/galerie' },
    { name: t('nav.programme'), path: '/programme' },
    { name: t('nav.jury'), path: '/jury' }
  ];

  const toggleLanguage = () => {
    const newLang = i18n.language === 'fr' ? 'en' : 'fr';
    i18n.changeLanguage(newLang);
  };

  return (
    <nav className={`fixed w-full z-50 transition-all duration-500 py-4 ${isTransparent
      ? 'bg-transparent'
      : 'bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-sm'
      }`}>
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">

        {/* LOGO */}
        <Link to="/" className="flex items-center gap-2 z-50">
          <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center shadow-lg transition-transform hover:scale-105">
            <span className="font-bold text-white text-xl">M</span>
          </div>
          <span className={`text-2xl font-black tracking-tighter transition-colors duration-300 ${isTransparent ? 'text-white' : 'text-mars-dark'
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
            <Button
              variant="primary"
              onClick={() => navigate('/soumettre')}
            >
              Soumettre
            </Button>
            <button
              onClick={toggleLanguage}
              className="text-xl hover:scale-110 transition-transform pt-1"
              title="Changer de langue"
            >
              <img
                src={i18n.language === 'fr' ? gbFlag : frFlag}
                alt="Change language"
                className="w-full h-full object-cover"
              />
            </button>
          </div>
        </div>

        {/* ZONE DROITE MOBILE */}
        <div className="flex md:hidden items-center gap-4">
          <button
            onClick={toggleLanguage}
            className={`text-xl pt-1 transition-colors ${isTransparent ? 'text-white' : 'text-mars-dark'}`}
          >
            {i18n.language === 'fr' ? '🇬🇧' : '🇫🇷'}
          </button>

          <button
            className={`z-50 p-2 transition-colors ${isTransparent ? 'text-white' : 'text-mars-dark'
              }`}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* MENU MOBILE (DROPDOWN) */}
      <div className={`absolute top-full left-0 w-full bg-white border-b border-slate-200 p-8 flex flex-col gap-6 md:hidden shadow-2xl transition-all duration-300 origin-top ${isMenuOpen ? 'scale-y-100 opacity-100' : 'scale-y-0 opacity-0 pointer-events-none'
        }`}>
        {navLinks.map((item) => (
          <Link
            key={item.name}
            to={item.path}
            className="text-left text-2xl font-black text-mars-dark py-2 border-b border-slate-50 last:border-0 hover:text-primary transition-colors uppercase tracking-tighter"
          >
            {item.name}
          </Link>
        ))}
        <Button
          variant="primary"
          onClick={() => navigate('/soumettre')}
        >
          Soumettre
        </Button>
      </div>
    </nav>
  );
};

export default Navbar;