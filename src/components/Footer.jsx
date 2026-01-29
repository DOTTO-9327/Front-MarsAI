import React from 'react';

const Footer = ({ setView }) => {
  return (
    <footer className="py-24 bg-mars-dark text-white">
      <div className="max-w-7xl mx-auto px-6 text-center">
        
        {/* Logo Section */}
        <div className="flex items-center justify-center gap-2 mb-8">
          <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
            <span className="font-bold text-white text-xl">M</span>
          </div>
          <span className="text-2xl font-black tracking-tighter text-white">
            MARS.A.I
          </span>
        </div>

        {/* Navigation Links */}
        <nav className="flex justify-center gap-8 mb-8 text-[10px] font-bold uppercase tracking-widest text-slate-500">
          <button 
            onClick={() => setView('home')} 
            className="hover:text-white transition-colors duration-300"
          >
            Accueil
          </button>
          <button 
            onClick={() => setView('galerie')} 
            className="hover:text-white transition-colors duration-300"
          >
            Galerie
          </button>
          <button 
            onClick={() => setView('infos')} 
            className="hover:text-white transition-colors duration-300"
          >
            Infos
          </button>
        </nav>

        {/* Copyright Section */}
        <p className="text-slate-500 text-[10px] font-bold uppercase tracking-[0.2em]">
          © 2025 — CONÇU POUR UN FUTUR SOUHAITABLE
        </p>
        
      </div>
    </footer>
  );
};

export default Footer;