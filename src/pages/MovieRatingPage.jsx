import React, { useState, useEffect } from 'react';
import { Play, Star, Info } from 'lucide-react';
import { useOutletContext } from 'react-router-dom';

const MovieRatingPage = () => {
  // Récupération du film sélectionné dans le layout parent
  const { selectedMovie } = useOutletContext();
  const [rating, setRating] = useState(0);

  // Réinitialiser la note quand le film change
  useEffect(() => {
    setRating(0);
  }, [selectedMovie]);

  return (
    <div className="p-12 max-w-6xl mx-auto animate-in fade-in duration-500">
      
      {/* Header Info */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-mars-dark rounded-full flex items-center justify-center text-white">
                <Info size={18} />
            </div>
            <div>
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Visionnage en cours</p>
                <p className="text-sm font-black text-mars-dark uppercase">Session Jury 2026</p>
            </div>
        </div>
        <div className="bg-white border border-slate-200 px-4 py-2 rounded-xl flex items-center gap-4">
            <div className="text-center">
                <p className="text-xs font-black text-mars-dark">150</p>
                <p className="text-[8px] font-bold text-slate-400 uppercase">Restants</p>
            </div>
            <div className="w-px h-6 bg-slate-100"></div>
            <div className="text-center">
                <p className="text-xs font-black text-accent">15 JUIN</p>
                <p className="text-[8px] font-bold text-slate-400 uppercase">Deadline</p>
            </div>
        </div>
      </div>

      {/* Player Video Dynamique */}
      <div className="aspect-video w-full rounded-[40px] overflow-hidden shadow-2xl relative group mb-12 bg-mars-dark">
        <img 
          key={selectedMovie.id}
          src={selectedMovie.thumbnail} 
          className="w-full h-full object-cover opacity-60 group-hover:opacity-80 transition-all duration-700" 
          alt={selectedMovie.title} 
        />
        <div className="absolute inset-0 bg-black/20 flex items-center justify-center group-hover:bg-black/10 transition-all">
          <div className="w-20 h-20 bg-accent rounded-full flex items-center justify-center text-white shadow-xl cursor-pointer hover:scale-110 transition-transform">
            <Play fill="currentColor" size={32} className="ml-1" />
          </div>
        </div>
        <div className="absolute bottom-8 left-8 flex gap-2">
            <span className="bg-white/20 backdrop-blur-md text-white text-[10px] font-black px-4 py-2 rounded-full uppercase tracking-widest border border-white/30">
                {selectedMovie.country}
            </span>
            <span className="bg-white/20 backdrop-blur-md text-white text-[10px] font-black px-4 py-2 rounded-full uppercase tracking-widest border border-white/30">
                {selectedMovie.year}
            </span>
        </div>
      </div>

      {/* Zone de Notation Dynamique */}
      <section className="bg-white rounded-[3rem] p-12 shadow-sm border border-slate-100">
        <div className="flex justify-between items-start mb-10">
          <div>
            <h2 className="text-5xl font-black uppercase tracking-tighter text-mars-dark mb-2 leading-none">
                {selectedMovie.title}
            </h2>
            <p className="text-primary font-bold text-lg uppercase tracking-widest">
                {selectedMovie.director}
            </p>
          </div>
          <div className="flex items-center gap-2 bg-slate-50 px-6 py-3 rounded-2xl">
            <Star className="text-accent" fill="currentColor" size={20} />
            <p className="font-black text-mars-dark tracking-tighter text-xl uppercase">Sélection officielle</p>
          </div>
        </div>

        <div className="space-y-12">
          <div>
            <div className="flex justify-between items-end mb-6">
              <div>
                <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest mb-1">Système de notation</p>
                <p className="text-sm font-black text-mars-dark uppercase tracking-tight">Qualité globale & Artistique</p>
              </div>
              <p className="text-7xl font-black text-mars-dark tracking-tighter">
                {rating}<span className="text-2xl text-slate-200">/10</span>
              </p>
            </div>
            
            <input 
              type="range" min="0" max="10" step="1" 
              value={rating} 
              onChange={(e) => setRating(e.target.value)}
              className="w-full h-4 bg-slate-100 rounded-full appearance-none cursor-pointer accent-primary" 
            />
            
            <div className="flex justify-between mt-6 px-1">
               {[...Array(11).keys()].map(n => (
                 <div key={n} className="flex flex-col items-center gap-2">
                    <div className={`w-1 h-1 rounded-full ${rating >= n ? 'bg-primary' : 'bg-slate-200'}`}></div>
                    <span className={`text-[10px] font-black ${rating == n ? 'text-primary scale-125' : 'text-slate-300'} transition-all`}>
                        {n}
                    </span>
                 </div>
               ))}
            </div>
          </div>

          <div className="flex gap-4 pt-4">
            <button className="flex-2 bg-primary text-white font-black uppercase tracking-widest py-6 rounded-3xl shadow-2xl shadow-primary/30 hover:bg-primary/90 transition-all hover:-translate-y-1 active:scale-95">
              Valider la sélection
            </button>
            <button className="flex-1 bg-mars-dark text-white font-black uppercase tracking-widest py-6 rounded-3xl hover:bg-black transition-all">
              Suivant
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default MovieRatingPage;