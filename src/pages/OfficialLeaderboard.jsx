// import { useState } from 'react';
import { ChevronRight, Trophy, ChevronDown } from 'lucide-react';
import Searchbar from '../components/admin/searchbar';

const OfficialLeaderboard = () => {
  // const [searchTerm, setSearchTerm] = useState("");

  // Données fictives
  const results = [
    { rank: 1, title: "SYNTHETICA : L'AUBE", director: "Jean Dupond", country: "France", average: 9.4, tools: ["CHATGPT", "KREA.AI"], thumbnail: "/api/placeholder/120/80" },
    { rank: 2, title: "SYNTHETICA : L'AUBE", director: "Julien Dupond", country: "France", average: 9.2, tools: ["CHATGPT", "KREA.AI"], thumbnail: "/api/placeholder/120/80" },
    { rank: 3, title: "SYNTHETICA : L'AUBE", director: "Julien Dupond", country: "France", average: 9.2, tools: ["CHATGPT", "KREA.AI"], thumbnail: "/api/placeholder/120/80" },
    { rank: 4, title: "SYNTHETICA : L'AUBE", director: "Julien Dupond", country: "France", average: 9.2, tools: ["CHATGPT", "KREA.AI"], thumbnail: "/api/placeholder/120/80" },
    { rank: 5, title: "SYNTHETICA : L'AUBE", director: "Julien Dupond", country: "France", average: 9.2, tools: ["CHATGPT", "KREA.AI"], thumbnail: "/api/placeholder/120/80" },
    { rank: 6, title: "SYNTHETICA : L'AUBE", director: "Julien Dupond", country: "France", average: 9.2, tools: ["CHATGPT", "KREA.AI"], thumbnail: "/api/placeholder/120/80" },
    { rank: 7, title: "SYNTHETICA : L'AUBE", director: "Julien Dupond", country: "France", average: 9.2, tools: ["CHATGPT", "KREA.AI"], thumbnail: "/api/placeholder/120/80" },
  ];

  return (
    <main className="min-h-screen bg-mars-light py-6">
      <div className="max-w-6xl mx-auto">
        
        {/* Header Management */}
        <header className="mb-10">
          <h3 className="mb-4 font-black text-5xl tracking-tighter uppercase">
            Leaderboard Officiel
          </h3>
          <p className="max-w-2xl text-light-gray font-medium text-lg leading-snug mb-10">
            Classement des votes du jury pour la finale de Marseille.
          </p>
        </header>

        {/* Top Performer Highlight Card */}
        <section className="bg-white rounded-[2.5rem] p-8 mb-10 shadow-sm border border-slate-100 flex items-center gap-8">
          <div className="w-24 h-24 bg-amber-50 rounded-3xl flex items-center justify-center border-2 border-amber-100">
            <Trophy className="text-amber-500" size={48} strokeWidth={1.5} />
          </div>
          <div>
            <div className="flex items-baseline gap-2">
              <span className="text-5xl font-black text-mars-dark tracking-tighter">9,4</span>
              <span className="text-xl font-bold text-light-gray">/10</span>
            </div>
            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-light-gray mb-3">Meilleure note</p>
            <div className="flex items-center gap-3">
               <span className="px-3 py-1 bg-amber-100 text-amber-700 rounded-lg text-[10px] font-black uppercase">Synthetica</span>
               <span className="text-sm font-bold text-mars-dark">Par {results[0].director}</span>
            </div>
          </div>
        </section>

        {/* Table Container */}
        <section className="bg-white rounded-[3rem] p-10 shadow-sm border border-slate-100">
          
          {/* Search Bar */}
          <div className="relative mb-12">
            <Searchbar />
          </div>

          {/* Table Header */}
          <div className="grid grid-cols-[60px_1fr_120px_100px_180px_60px] gap-4 px-6 mb-6">
            {["Rang", "Film & Auteur", "Pays", "Moyenne", "Outils IA", ""].map((head) => (
              <span key={head} className="text-[10px] font-black text-light-gray uppercase tracking-widest">
                {head}
              </span>
            ))}
          </div>

          {/* Results List */}
          <div className="space-y-4">
            {results.map((item, idx) => (
              <article 
                key={idx}
                className="grid grid-cols-[60px_1fr_120px_100px_180px_60px] gap-4 items-center px-6 py-4 rounded-3xl hover:bg-mars-light/50 transition-colors group cursor-pointer"
              >
                <span className="text-sm font-black text-mars-dark">{item.rank}</span>

                <div className="flex items-center gap-4">
                  <img src={item.thumbnail} className="w-20 h-14 object-cover rounded-xl bg-slate-100" alt={item.title} />
                  <div>
                    <h3 className="text-sm font-black text-mars-dark uppercase leading-tight tracking-tight">{item.title}</h3>
                    <p className="text-[11px] font-bold text-light-gray">{item.director}</p>
                  </div>
                </div>

                <span className="text-xs font-bold text-mars-dark">{item.country}</span>
                <span className="text-sm font-black text-mars-dark">{item.average}</span>

                <div className="flex flex-wrap gap-2">
                  {item.tools.map(tool => (
                    <span key={tool} className="px-3 py-1 bg-slate-200 text-slate-500 rounded-lg text-[8px] font-black uppercase tracking-wider">
                      {tool}
                    </span>
                  ))}
                </div>

                <button className="w-10 h-10 rounded-xl bg-slate-50 text-slate-400 flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-all">
                  <ChevronRight size={18} strokeWidth={3} />
                </button>
              </article>
            ))}
          </div>
        </section>
        {/* SYSTÈME DE PAGINATION */}
          <div className="mt-16 flex flex-col items-center gap-6">
              <div className="flex items-center gap-2">
                  <button className="w-10 h-10 flex items-center justify-center rounded-full border border-slate-200 text-light-gray hover:bg-mars-light transition-colors">
                      <ChevronDown className="rotate-90" size={18} />
                  </button>
                  <button className="w-10 h-10 flex items-center justify-center rounded-full bg-primary text-white font-black text-sm shadow-lg shadow-primary/30">1</button>
                  <button className="w-10 h-10 flex items-center justify-center rounded-full border border-slate-200 text-light-gray font-bold text-sm hover:bg-mars-light transition-colors">2</button>
                  <button className="w-10 h-10 flex items-center justify-center rounded-full border border-slate-200 text-light-gray hover:bg-mars-light transition-colors">
                      <ChevronDown className="-rotate-90" size={18} />
                  </button>
              </div>
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-light-gray">
                  PAGE 1 SUR 2 - {results.length} FILMS TROUVÉS
              </span>
          </div>
      </div>
    </main>
  );
};

export default OfficialLeaderboard;