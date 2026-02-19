import React, { useState, useEffect } from 'react';
import { Outlet, useNavigate, useParams } from 'react-router-dom';
import { ChevronLeft, Search, Loader2 } from 'lucide-react';

/**
 * JuryRatingLayout - Layout Parent de l'Espace Jury
 * -----------------------------------------------
 * RÔLE : 
 * 1. Orchestrer la file de visionnage (sidebar gauche).
 * 2. Gérer l'état global du film sélectionné.
 * 3. Assurer la persistance du nom du juré dans le header.
 * * STRUCTURE : utilise un <Outlet /> pour injecter MovieRatingPage au centre.
 */
const JuryRatingLayout = () => {
    const navigate = useNavigate();
    // juryId est récupéré depuis l'URL (ex: /admin/jury/15/rating)
    const { juryId } = useParams();
    const [movies, setMovies] = useState([]);
    const [selectedMovie, setSelectedMovie] = useState(null); // Film actuellement affiché dans le player
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState('À voir'); // Gestion des onglets
    const [juryName, setJuryName] = useState(`Juré #${juryId}`);

    // --- LOGIQUE D'AFFICHAGE DE L'IMAGE ---
    const getFinalImageUrl = (path) => {
        if (!path) return 'https://placehold.co/400x600?text=No+Cover';

        // Si c'est une URL complète (S3 Scaleway), on la retourne telle quelle
        if (path.startsWith('http')) {
            return path;
        }

        // Sinon, on utilise la variable d'environnement
        const baseUrl = import.meta.env.VITE_API_URL || 'http://localhost:3000';
        // Si l'API renvoie /api, on nettoie pour pointer vers la racine du serveur
        const cleanBaseUrl = baseUrl.replace('/api', '');
        const cleanPath = path.startsWith('/') ? path : `/${path}`;

        // Si le path contient déjà "uploads", on évite de le doubler
        if (cleanPath.includes('uploads')) {
            return `${cleanBaseUrl}${cleanPath}`;
        }

        return `${cleanBaseUrl}/uploads${cleanPath}`;
    };

    useEffect(() => {
        // Récupération des films assignés
        const fetchAssignedMovies = async () => {
            try {
                const response = await fetch(`${import.meta.env.VITE_API_URL}/admin/jury/${juryId}/movies`);
                const result = await response.json();

                if (result.success && result.data.length > 0) {
                    const formattedMovies = result.data.map(m => ({
                        ...m,
                        director: `${m.firstname} ${m.lastname}`
                    }));
                    setMovies(formattedMovies);
                    const firstUnrated = formattedMovies.find(m => m.note === null) || formattedMovies[0];
                    setSelectedMovie(firstUnrated);
                }
            } catch (err) {
                console.error("Erreur de récupération des films :", err);
            } finally {
                setLoading(false);
            }
        };

        // Récupération des infos du juré pour le Header
        const fetchJuryInfo = async () => {
            try {
                const response = await fetch(`${import.meta.env.VITE_API_URL}/admin/staff`);
                const result = await response.json();
                if (result.success) {
                    const currentJury = result.data.find(member => member.id === parseInt(juryId));
                    if (currentJury) {
                        setJuryName(`${currentJury.firstname} ${currentJury.lastname}`);
                    }
                }
            } catch (err) {
                console.error("Erreur récupération infos jury :", err);
            }
        };

        if (juryId) {
            fetchAssignedMovies();
            fetchJuryInfo();
        }
    }, [juryId]);

    const filteredMovies = movies.filter(movie => {
        if (filter === 'À voir') return movie.note === null;
        if (filter === 'Notés') return movie.note !== null;
        return true;
    });

    const handleMovieRated = (ratingId, newNote) => {
        setMovies(prev => prev.map(m => m.rating_id === ratingId ? { ...m, note: newNote } : m));
    };

    return (
        <div className="flex h-screen bg-[#F8F9FA] overflow-hidden font-sans">
            <aside className="w-80 bg-white border-r border-slate-200 flex flex-col shadow-xl z-20">
                <div className="p-6 border-b border-slate-100">
                    <button
                        onClick={() => navigate('/admin/jury')}
                        className="flex items-center gap-2 text-slate-400 font-bold uppercase text-[10px] tracking-widest hover:text-primary transition-colors mb-6"
                    >
                        <ChevronLeft size={16} strokeWidth={3} /> Retour au Dashboard
                    </button>

                    <div className="flex justify-between items-center mb-4">
                        <h5 className="font-black uppercase tracking-tighter text-mars-dark">File de visionnage</h5>
                        <span className="bg-accent text-white text-[10px] font-black px-2 py-1 rounded-full">
                            {filteredMovies.length} FILMS
                        </span>
                    </div>

                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-300" size={16} />
                        <input
                            type="text"
                            placeholder="Rechercher un titre..."
                            className="w-full pl-10 pr-4 py-2 bg-slate-50 border-none rounded-xl text-sm outline-none focus:ring-2 focus:ring-primary/10"
                        />
                    </div>

                    <div className="flex gap-2 mt-4">
                        {['À voir', 'Notés', 'Tous'].map((tab) => (
                            <button
                                key={tab}
                                onClick={() => setFilter(tab)}
                                className={`flex-1 py-2 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all ${filter === tab ? 'bg-primary text-white shadow-md' : 'bg-slate-50 text-slate-400 hover:bg-slate-100'}`}
                            >
                                {tab}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="flex-1 overflow-y-auto p-4 space-y-3">
                    {loading ? (
                        <div className="flex justify-center py-10"><Loader2 className="animate-spin text-primary" /></div>
                    ) : filteredMovies.length === 0 ? (
                        <p className="text-center text-xs font-bold text-slate-400 mt-10">Aucun film dans cette catégorie.</p>
                    ) : (
                        filteredMovies.map((movie) => (
                            <article
                                key={movie.rating_id}
                                onClick={() => setSelectedMovie(movie)}
                                className={`p-3 rounded-2xl flex gap-3 cursor-pointer transition-all border-2 relative ${selectedMovie?.rating_id === movie.rating_id ? 'bg-primary border-primary shadow-lg shadow-primary/20' : 'bg-white border-transparent hover:border-slate-100'}`}
                            >
                                <img
                                    src={getFinalImageUrl(movie.thumbnail)}
                                    className="w-16 h-16 rounded-xl object-cover shrink-0"
                                    alt={movie.title}
                                    onError={(e) => { e.target.src = 'https://placehold.co/400x600?text=No+Cover' }}
                                />

                                <div className="flex flex-col justify-center overflow-hidden">
                                    <h3 className={`text-[10px] font-black uppercase leading-tight truncate ${selectedMovie?.rating_id === movie.rating_id ? 'text-white' : 'text-mars-dark'}`}>{movie.title}</h3>
                                    <p className={`text-[8px] font-bold mt-1 truncate ${selectedMovie?.rating_id === movie.rating_id ? 'text-white/70' : 'text-slate-400'}`}>{movie.director}</p>
                                </div>
                                {movie.note !== null && (
                                    <div className="absolute top-2 right-2 w-4 h-4 bg-green-500 rounded-full border-2 border-white flex items-center justify-center">
                                        <span className="text-[8px] text-white font-bold">{movie.note}</span>
                                    </div>
                                )}
                            </article>
                        ))
                    )}
                </div>
            </aside>

            <main className="flex-1 flex flex-col overflow-hidden">
                <header className="h-16 bg-white border-b border-slate-100 px-8 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <div className="bg-primary px-3 py-1 rounded text-white font-black text-xs">MARS.A.I</div>
                    </div>
                    <div className="flex items-center gap-4">
                        <div className="text-right">
                            <p className="text-xs font-black uppercase leading-none">{juryName}</p>
                            <p className="text-[10px] font-bold text-accent uppercase tracking-widest">Espace Notation</p>
                        </div>
                    </div>
                </header>

                <div className="flex-1 overflow-y-auto bg-slate-50">
                    {selectedMovie ? (
                        <Outlet context={{ selectedMovie, handleMovieRated, getFinalImageUrl }} />
                    ) : (
                        <div className="h-full flex items-center justify-center text-slate-400 font-bold uppercase tracking-widest">
                            Sélectionnez un film à gauche
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
};

export default JuryRatingLayout;