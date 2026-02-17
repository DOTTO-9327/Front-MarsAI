import { useParams, useNavigate, useLocation } from 'react-router-dom';
import {
    ArrowLeft, User, Globe, BookOpen, Cpu, Copy, Loader2, Play,
    Instagram, Youtube, Facebook, Linkedin, Twitter
} from 'lucide-react';
import { useState, useEffect } from 'react';

const MovieDetail = () => {
    const { title } = useParams();
    const location = useLocation();
    const navigate = useNavigate();

    // Récupération de l'ID depuis la navigation (state)
    const id = location.state?.movieId;

    const [movie, setMovie] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const serverUrl = 'http://localhost:3000/';

    useEffect(() => {
        // Redirection si l'ID est perdu (refresh page sans passer par la galerie)
        if (!id) {
            navigate('/galerie');
            return;
        }

        const fetchMovieDetail = async () => {
            try {
                setLoading(true);
                const response = await fetch(`${import.meta.env.VITE_API_URL}/movie/${id}`);
                if (!response.ok) throw new Error('Film introuvable');
                const result = await response.json();
                setMovie(result.data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        fetchMovieDetail();
    }, [id, navigate]);

    // Fonction de copie du lien direct
    const copyToClipboard = () => {
        const url = window.location.href;
        navigator.clipboard.writeText(url);
        // Vous pouvez remplacer l'alert par un toast de notification si vous en avez un
        alert("Lien copié dans le presse-papier !");
    };

    if (loading) return (
        <div className="flex h-screen items-center justify-center bg-white">
            <Loader2 className="animate-spin text-primary" size={48} />
        </div>
    );

    if (error) return <div className="p-10 text-center text-red-500 font-bold">Erreur : {error}</div>;
    if (!movie) return null;

    return (
        <main className="mx-auto max-w-6xl px-6 py-16 pb-24 min-h-screen bg-white animate-in fade-in duration-500">

            {/* BOUTON RETOUR */}
            <nav className="mb-8">
                <button
                    onClick={() => navigate(-1)}
                    className="text-md group flex items-center gap-2 font-bold uppercase tracking-widest text-primary transition-all mb-12"
                >
                    <ArrowLeft className="w-6 h-6 transition-transform group-hover:-translate-x-2" />
                    Retour Galerie
                </button>
            </nav>

            {/* SECTION 1 : PLAYER VIDEO / HERO */}
            <section className="relative group mb-12 aspect-video w-full overflow-hidden rounded-[40px] shadow-2xl bg-mars-dark">
                <img
                    src={`${serverUrl}${movie.cover_image}`}
                    className="h-full w-full object-cover"
                    alt={movie.original_title}
                />
                {/* Overlay avec Bouton Play Central */}
                <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/10 transition-all duration-500">
                    <button className="flex h-24 w-24 items-center justify-center rounded-full bg-accent text-white shadow-2xl transition-transform hover:scale-110 cursor-pointer">
                        <Play size={36} fill="currentColor" className="ml-2" />
                    </button>
                </div>
            </section>

            {/* SECTION 2 : INFOS PRINCIPALES & PARTAGE */}
            <section className="mb-12 rounded-[40px] bg-mars-light p-10 md:p-14 border border-slate-100 shadow-sm">
                <div className="flex flex-col gap-12 lg:flex-row lg:items-start lg:justify-between">

                    {/* Colonne Gauche : Titre et Meta-données */}
                    <div className="flex-1">
                        <h1 className="mb-8 text-4xl font-black uppercase tracking-tight text-mars-dark">
                            {movie.original_title}
                        </h1>

                        <div className="flex flex-wrap gap-12 md:gap-20">
                            {/* Bloc Réalisateur */}
                            <div className="flex items-center gap-5">
                                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white shadow-sm border border-slate-100 text-accent">
                                    <User size={32} />
                                </div>
                                <div>
                                    <p className="text-[10px] font-bold uppercase text-light-gray tracking-[0.2em] mb-1">Réalisateur</p>
                                    <p className="text-2xl font-black text-mars-dark tracking-tight leading-none">
                                        {movie.firstname} {movie.lastname}
                                    </p>
                                </div>
                            </div>

                            {/* Bloc Origine */}
                            <div className="flex items-center gap-5">
                                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white shadow-sm border border-slate-100 text-primary">
                                    <Globe size={32} />
                                </div>
                                <div>
                                    <p className="text-[10px] font-bold uppercase text-light-gray tracking-[0.2em] mb-1">Origine</p>
                                    <p className="text-2xl font-black text-mars-dark tracking-tight leading-none">
                                        {movie.original_language || 'France'}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Colonne Droite : Module de Partage */}
                    <aside className="w-full lg:w-96 flex flex-col gap-8 bg-white/50 p-8 rounded-4xl border border-white">
                        <div>
                            <p className="mb-6 text-xs font-black uppercase tracking-[0.2em] text-mars-dark">Partager ce film</p>
                            <div className="flex flex-wrap gap-4">
                                <SocialIcon icon={<Twitter size={22} fill="currentColor" />} label="X/Twitter" />
                                <SocialIcon icon={<Linkedin size={22} fill="currentColor" />} label="Linkedin" />
                                <SocialIcon icon={<Instagram size={22} />} label="Instagram" />
                                <SocialIcon icon={<Youtube size={22} fill="currentColor" />} label="Youtube" />
                                <SocialIcon icon={<Facebook size={22} fill="currentColor" />} label="Facebook" />
                            </div>
                        </div>

                        {/* Lien Direct de Partage */}
                        <div>
                            <p className="mb-3 text-[10px] font-bold uppercase text-light-gray tracking-widest">Lien Direct</p>
                            <div className="flex items-center gap-2 overflow-hidden rounded-2xl bg-white border border-slate-200 p-2 pl-4">
                                <span className="flex-1 truncate font-mono text-[11px] text-slate-400">
                                    {window.location.origin}/movie/{title}
                                </span>
                                <button
                                    onClick={copyToClipboard}
                                    className="flex items-center gap-2 rounded-xl bg-mars-dark px-5 py-3 text-[10px] font-black uppercase tracking-widest text-white transition-all hover:bg-black hover:scale-[1.02] active:scale-95 cursor-pointer shadow-md"
                                >
                                    <Copy size={14} />
                                    Copier
                                </button>
                            </div>
                        </div>
                    </aside>
                </div>
            </section>

            {/* SECTION 3 : SYNOPSIS & TECH STACK */}
            <section className="rounded-[40px] bg-mars-dark p-10 md:p-16 text-white shadow-2xl relative overflow-hidden">
                {/* Synopsis */}
                <div className="mb-16 relative z-10">
                    <div className="mb-8 flex items-center gap-4">
                        <BookOpen className="text-accent" size={32} strokeWidth={2.5} />
                        <h3 className="text-sm font-black uppercase tracking-[0.2em] text-accent">Synopsis</h3>
                    </div>
                    <p className="max-w-3xl text-lg font-medium leading-relaxed text-gray-300 italic opacity-90">
                        {movie.original_synopsis || "Le synopsis de cette œuvre sera bientôt disponible."}
                    </p>
                </div>

                {/* Tech Stack */}
                <div className="pt-10 border-t border-white/10 relative z-10">
                    <div className="mb-8 flex items-center gap-4">
                        <Cpu className="text-primary" size={32} strokeWidth={2.5} />
                        <h3 className="text-sm font-black uppercase tracking-[0.2em] text-primary">Tech Stack & IA</h3>
                    </div>
                    <div className="flex flex-wrap gap-4">
                        {movie.ia_tools ? movie.ia_tools.split(',').map(tech => (
                            <span
                                key={tech}
                                className="rounded-xl border border-white/10 bg-white/5 px-6 py-3 text-[11px] font-black uppercase tracking-widest hover:bg-primary transition-all cursor-default"
                            >
                                {tech.trim()}
                            </span>
                        )) : <span className="text-slate-500 italic uppercase text-[10px] tracking-widest">Outils non renseignés</span>}
                    </div>
                </div>

                {/* Décoration de fond */}
                <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-primary/10 blur-[120px] rounded-full pointer-events-none"></div>
            </section>
        </main>
    );
};

// Sous-composant pour les icônes sociales (réutilisable)
const SocialIcon = ({ icon, label }) => (
    <div className="group flex flex-col items-center gap-2">
        <button
            aria-label={label}
            className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white text-mars-dark shadow-sm border border-slate-100 transition-all duration-300 hover:bg-mars-dark hover:text-white hover:-translate-y-1 cursor-pointer"
        >
            {icon}
        </button>
        <span className="text-[8px] font-black uppercase tracking-tighter text-light-gray group-hover:text-mars-dark transition-colors">{label}</span>
    </div>
);

export default MovieDetail;