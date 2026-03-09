import { useEffect, useState } from 'react';
import { ChevronRight, Trophy, ChevronDown, Loader2 } from 'lucide-react';
import Searchbar from '../components/admin/searchbar';
import BtnPagination from '../components/ui/BtnPagination';
import { useAuth } from '../context/AuthContext';

const OfficialLeaderboard = () => {
  const [results, setResults] = useState([]);
  const [pagination, setPagination] = useState(null);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const { token } = useAuth();

  /**
   * Gestion dynamique de l'URL de l'image (Identique à CardMovie)
   */
  const getFinalImageUrl = (path) => {
    if (!path) return 'https://placehold.co/400x600?text=No+Cover';
    if (path.startsWith('http')) return path;
    
    const baseUrl = import.meta.env.VITE_API_URL || 'http://localhost:3000';
    const cleanPath = path.startsWith('/') ? path : `/${path}`;
    return `${baseUrl}${cleanPath}`;
  };

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${import.meta.env.VITE_API_URL}/movie/leaderboard?page=${page}`, {
          headers: { Authorization: `Bearer ${token}` }
        });

        if (!response.ok) throw new Error("Erreur lors de la récupération du classement");

        const result = await response.json();
        setResults(result.data || []);
        setPagination(result.pagination || null);
      } catch (error) {
        console.error("Erreur leaderboard:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchLeaderboard();
  }, [page, token]);

  const topPerformer = results[0];

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-mars-light">
      <Loader2 className="animate-spin text-primary" size={40} />
    </div>
  );

  return (
    <main className="min-h-screen bg-mars-light py-6">
      <div className="max-w-6xl mx-auto px-4">

        {/* Header */}
        <header className="mb-10">
          <h3 className="mb-4 font-black text-5xl tracking-tighter uppercase italic">
            Leaderboard Officiel
          </h3>
          <p className="max-w-2xl text-light-gray font-medium text-lg leading-snug">
            Classement des votes du jury pour la finale de Marseille.
          </p>
        </header>

        {/* Top Performer Highlight Card */}
        {topPerformer && page === 1 && (
          <section className="bg-white rounded-[2.5rem] p-8 mb-10 shadow-sm border border-slate-100 flex items-center gap-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="w-24 h-24 bg-amber-50 rounded-3xl flex items-center justify-center border-2 border-amber-100 shadow-inner shrink-0">
              <Trophy className="text-amber-500" size={48} strokeWidth={1.5} />
            </div>
            <div className="flex-1">
              <div className="flex items-baseline gap-2">
                <span className="text-5xl font-black text-mars-dark tracking-tighter">
                  {topPerformer.average > 0 ? topPerformer.average.toString().replace('.', ',') : "0,0"}
                </span>
                <span className="text-xl font-bold text-light-gray">/10</span>
              </div>
              <p className="text-[10px] font-black uppercase tracking-[0.2em] text-light-gray mb-3">Meilleure note actuelle</p>
              <div className="flex items-center gap-3">
                <span className="px-3 py-1 bg-amber-100 text-amber-700 rounded-lg text-[10px] font-black uppercase tracking-wider">
                  {topPerformer.title}
                </span>
                <span className="text-sm font-bold text-mars-dark italic">Par {topPerformer.firstname} {topPerformer.lastname}</span>
              </div>
            </div>
            {/* Image du Top Performer avec la nouvelle fonction */}
            <div className="hidden md:block">
                <img 
                    src={getFinalImageUrl(topPerformer.thumbnail)} 
                    alt={topPerformer.title}
                    className="h-24 w-36 rounded-2xl object-cover shadow-md border-2 border-white"
                />
            </div>
          </section>
        )}

        {/* Table Container */}
        <section className="bg-white rounded-[3rem] p-10 shadow-sm border border-slate-100">

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
            {results.length > 0 ? (
              results.map((item, idx) => {
                const rank = (page - 1) * (pagination?.limit || 20) + (idx + 1);

                return (
                  <article
                    key={item.id}
                    className="grid grid-cols-[60px_1fr_120px_100px_180px_60px] gap-4 items-center px-6 py-4 rounded-3xl hover:bg-mars-light/50 transition-all group cursor-pointer border border-transparent hover:border-slate-100"
                  >
                    <span className={`text-sm font-black ${rank <= 3 ? 'text-primary' : 'text-mars-dark'}`}>
                      #{rank}
                    </span>

                    <div className="flex items-center gap-4">
                      {/* UTILISATION DE getFinalImageUrl ICI */}
                      <img
                        src={getFinalImageUrl(item.thumbnail)}
                        className="w-20 h-14 object-cover rounded-xl bg-slate-100 shadow-sm transition-transform group-hover:scale-105"
                        alt={item.title}
                        onError={(e) => { e.target.src = 'https://placehold.co/400x600?text=Image+Error' }}
                      />
                      <div>
                        <h3 className="text-sm font-black text-mars-dark uppercase leading-tight tracking-tight">{item.title}</h3>
                        <p className="text-[11px] font-bold text-light-gray">{item.firstname} {item.lastname}</p>
                      </div>
                    </div>

                    <span className="text-xs font-bold text-mars-dark uppercase">{item.country || 'FR'}</span>

                    <div className="flex items-center gap-1">
                      <span className="text-sm font-black text-mars-dark">
                        {item.average > 0 ? item.average.toString().replace('.', ',') : "—"}
                      </span>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {(() => {
                        let toolsArray = [];
                        try {
                          if (Array.isArray(item.ia_tools)) {
                            toolsArray = item.ia_tools;
                          } else if (item.ia_tools) {
                            if (item.ia_tools.startsWith('[')) {
                              toolsArray = JSON.parse(item.ia_tools);
                            } else {
                              toolsArray = item.ia_tools.split(',').map(t => t.trim());
                            }
                          }
                        } catch (e) {
                          toolsArray = [item.ia_tools];
                        }

                        return toolsArray.slice(0, 2).map((tool, i) => (
                          <span key={i} className="px-3 py-1 bg-slate-100 text-slate-500 rounded-lg text-[8px] font-black uppercase tracking-wider">
                            {tool}
                          </span>
                        ));
                      })()}
                    </div>

                    <button className="w-10 h-10 rounded-xl bg-slate-50 text-slate-400 flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-all shadow-sm">
                      <ChevronRight size={18} strokeWidth={3} />
                    </button>
                  </article>
                );
              })
            ) : (
              <div className="py-20 text-center text-light-gray font-bold italic">
                Aucun résultat disponible pour le moment.
              </div>
            )}
          </div>

          {/* Pagination */}
          {pagination && pagination.totalPages > 1 && (
            <BtnPagination
              page={page}
              totalPages={pagination.totalPages}
              totalItems={pagination.totalItems}
              onPageChange={(p) => setPage(p)}
            />
          )}
        </section>
      </div>
    </main>
  );
};

export default OfficialLeaderboard;