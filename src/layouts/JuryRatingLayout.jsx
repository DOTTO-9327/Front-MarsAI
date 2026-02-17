import React, { useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { ChevronLeft, Search } from 'lucide-react';

const JuryRatingLayout = () => {
  const navigate = useNavigate();

  // 1. Liste des films diversifiée
  const [movies] = useState([
    {
      id: 1,
      title: "SYNTHETICA : L'AUBE",
      director: "LIAM WILSON",
      country: "CANADA",
      year: "2026",
      thumbnail: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=800"
    },
    {
      id: 2,
      title: "LES DERNIERS GÉANTS",
      director: "ELENA ROSSI",
      country: "ITALIE",
      year: "2025",
      thumbnail: "https://images.unsplash.com/photo-1440404653325-ab127d49abc1?q=80&w=800"
    },
    {
      id: 3,
      title: "NEON DREAMS",
      director: "AKIRA SATO",
      country: "JAPON",
      year: "2026",
      thumbnail: "https://images.unsplash.com/photo-1542204172-3c1f81d33451?q=80&w=800"
    },
    {
      id: 4,
      title: "SOUS LE SABLE",
      director: "AMIRA BENALI",
      country: "MAROC",
      year: "2024",
      thumbnail: "https://images.unsplash.com/photo-1478720568477-152d9b164e26?q=80&w=800"
    },
    {
      id: 5,
      title: "ÉCHO SILENCIEUX",
      director: "MARC DUBOIS",
      country: "FRANCE",
      year: "2026",
      thumbnail: "https://images.unsplash.com/photo-1485846234645-a62644f84728?q=80&w=800"
    }
  ]);

  // 2. État du film sélectionné (par défaut le premier)
  const [selectedMovie, setSelectedMovie] = useState(movies[0]);

  return (
    <div className="flex h-screen bg-[#F8F9FA] overflow-hidden font-sans">
      {/* SIDEBAR : FILE DE VISIONNAGE */}
      <aside className="w-80 bg-white border-r border-slate-200 flex flex-col shadow-xl z-20">
        <div className="p-6 border-b border-slate-100">
          <button 
            onClick={() => navigate('/admin/jury')}
            className="flex items-center gap-2 text-slate-400 font-bold uppercase text-[10px] tracking-widest hover:text-primary transition-colors mb-6"
          >
            <ChevronLeft size={16} strokeWidth={3} /> Retour
          </button>
          
          <div className="flex justify-between items-center mb-4">
            <h5 className="font-black uppercase tracking-tighter text-mars-dark">File de visionnage</h5>
            <span className="bg-accent text-white text-[10px] font-black px-2 py-1 rounded-full">{movies.length} FILMS</span>
          </div>

          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-300" size={16} />
            <input 
              type="text" 
              placeholder="Rechercher un film..." 
              className="w-full pl-10 pr-4 py-2 bg-slate-50 border-none rounded-xl text-sm outline-none focus:ring-2 focus:ring-primary/10"
            />
          </div>

          <div className="flex gap-2 mt-4">
            {['À voir', 'Notés', 'Tous'].map((tab, i) => (
              <button key={tab} className={`flex-1 py-2 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all ${i === 0 ? 'bg-primary text-white shadow-md' : 'bg-slate-50 text-slate-400 hover:bg-slate-100'}`}>
                {tab}
              </button>
            ))}
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {movies.map((movie) => (
            <article 
              key={movie.id}
              onClick={() => setSelectedMovie(movie)}
              className={`p-3 rounded-2xl flex gap-3 cursor-pointer transition-all border-2 ${selectedMovie.id === movie.id ? 'bg-primary border-primary shadow-lg shadow-primary/20' : 'bg-white border-transparent hover:border-slate-100'}`}
            >
              <img src={movie.thumbnail} className="w-16 h-16 rounded-xl object-cover" alt={movie.title} />
              <div className="flex flex-col justify-center">
                <h3 className={`text-[10px] font-black uppercase leading-tight ${selectedMovie.id === movie.id ? 'text-white' : 'text-mars-dark'}`}>{movie.title}</h3>
                <p className={`text-[8px] font-bold mt-1 ${selectedMovie.id === movie.id ? 'text-white/70' : 'text-slate-400'}`}>{movie.director} — {movie.country}</p>
              </div>
            </article>
          ))}
        </div>
      </aside>

      {/* MAIN CONTENT AREA */}
      <main className="flex-1 flex flex-col overflow-hidden">
        <header className="h-16 bg-white border-b border-slate-100 px-8 flex items-center justify-between">
          <div className="flex items-center gap-4">
             <div className="bg-primary px-3 py-1 rounded text-white font-black text-xs">MARS.A.I</div>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-right">
              <p className="text-xs font-black uppercase leading-none">Paul Michel</p>
              <p className="text-[10px] font-bold text-accent uppercase tracking-widest">Jury</p>
            </div>
            <img src="https://i.pravatar.cc/150?u=paul" className="w-10 h-10 rounded-xl border-2 border-white shadow-sm" alt="Profile" />
          </div>
        </header>

        <div className="flex-1 overflow-y-auto bg-slate-50">
          {/* On passe le film sélectionné via le contexte de l'Outlet */}
          <Outlet context={{ selectedMovie }} />
        </div>
      </main>
    </div>
  );
};

export default JuryRatingLayout;