import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import FilmCard from '../components/ui/FilmCard';
import { Loader2, ArrowLeft, ChevronDown } from 'lucide-react';

const MovieGallery = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();

    const [films, setFilms] = useState([]);
    const [filteredFilms, setFilteredFilms] = useState([]);
    const [loading, setLoading] = useState(true);

    // États pour les filtres de la maquette
    const [selectedTypeIA, setSelectedTypeIA] = useState("");
    const [selectedPays, setSelectedPays] = useState("");
    const [selectedStatut, setSelectedStatut] = useState("");

    const serverUrl = 'http://localhost:3000/';

    useEffect(() => {
        const fetchGallery = async () => {
            try {
                setLoading(true);
                const response = await fetch(`${import.meta.env.VITE_API_URL}/movie`);
                const result = await response.json();

                // On affiche les films validés
                const validated = result.data.filter(
                    f => f.status?.toUpperCase() === 'VALIDÉ' || f.status?.toUpperCase() === 'APPROVED'
                );

                setFilms(validated);
                setFilteredFilms(validated);
            } catch (error) {
                console.error("Erreur Galerie:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchGallery();
    }, []);

    // Logique de filtrage basée sur les Select de la maquette
    useEffect(() => {
        let temp = films;

        if (selectedTypeIA) {
            temp = temp.filter(f => f.ia_tools?.includes(selectedTypeIA));
        }
        if (selectedPays) {
            temp = temp.filter(f => f.original_language === selectedPays);
        }

        setFilteredFilms(temp);
    }, [selectedTypeIA, selectedPays, films]);

    // Extraction des options pour les filtres
    const typeIAOptions = [...new Set(films.flatMap(f => f.ia_tools ? f.ia_tools.split(',').map(t => t.trim()) : []))];
    const paysOptions = [...new Set(films.map(f => f.original_language))];

    return (
        <div className="min-h-screen bg-white py-16">
            <div className="max-w-6xl mx-auto">

                {/* Bouton Retour (Maquette) */}
                <button
                    onClick={() => navigate('/')}
                    className="text-md group flex items-center gap-2 font-bold uppercase tracking-widest text-primary transition-all mb-12"
                >
                    <ArrowLeft className="w-6 h-6 transition-transform group-hover:-translate-x-2" />
                    <span className="relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-primary after:transition-all group-hover:after:w-full">
                        {t ? t('nav.back', 'Retour Accueil') : 'Retour Accueil'}
                    </span>
                </button>

                {/* Titre de la Galerie (Maquette) */}
                <div className="mb-12">
                    <h2 className="text-mars-dark mb-6">
                        LA GALERIE <br />
                        <span className="text-accent">DES FILMS</span>
                    </h2>
                    <p className="text-mars-dark font-light text-lg max-w-2xl leading-snug">
                        Explorez l'intégralité de la sélection officielle. Des visions uniques, des courts-métrages pionniers créés avec l'Intelligence Artificielle.
                    </p>
                </div>

                {/* Barre de Filtres Select (Maquette) */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-16">
                    {/* Filtre Type IA */}
                    <div className="relative">
                        <select
                            onChange={(e) => setSelectedTypeIA(e.target.value)}
                            className="w-full bg-mars-light border-none rounded-xl py-4 px-6 appearance-none font-bold text-light-gray text-sm cursor-pointer outline-none focus:ring-2 focus:ring-primary/20"
                        >
                            <option value="">Type d'IA</option>
                            {typeIAOptions.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                        </select>
                        <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-light-gray pointer-events-none" size={18} />
                    </div>

                    {/* Filtre Pays */}
                    <div className="relative">
                        <select
                            onChange={(e) => setSelectedPays(e.target.value)}
                            className="w-full bg-mars-light border-none rounded-xl py-4 px-6 appearance-none font-bold text-light-gray text-sm cursor-pointer outline-none focus:ring-2 focus:ring-primary/20"
                        >
                            <option value="">Pays d'origine</option>
                            {paysOptions.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                        </select>
                        <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-light-gray pointer-events-none" size={18} />
                    </div>

                    {/* Filtre Statut */}
                    <div className="relative">
                        <select
                            onChange={(e) => setSelectedStatut(e.target.value)}
                            className="w-full bg-mars-light border-none rounded-xl py-4 px-6 appearance-none font-bold text-light-gray text-sm cursor-pointer outline-none focus:ring-2 focus:ring-primary/20"
                        >
                            <option value="">Statut</option>
                            <option value="Selection">Sélection Officielle</option>
                            <option value="Winner">Lauréats</option>
                        </select>
                        <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-light-gray pointer-events-none" size={18} />
                    </div>
                </div>

                {/* Grille de Films */}
                {loading ? (
                    <div className="flex flex-col items-center justify-center py-40">
                        <Loader2 className="animate-spin text-primary w-12 h-12 mb-4" />
                    </div>
                ) : (
                    <>
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12">
                            {filteredFilms.map((film) => (
                                <FilmCard
                                    key={film.id}
                                    title={film.original_title}
                                    director={`${film.firstname} ${film.lastname}`}
                                    country={film.original_language || "FR"}
                                    thumbnail={`${serverUrl}${film.cover_image}`}
                                    tags={film.ia_tools ? film.ia_tools.split(',') : ["AI"]}
                                    onClick={() => {
                                        const slug = film.original_title
                                            .toLowerCase()
                                            .trim()
                                            .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
                                            .replace(/[^\w\s-]/g, '')
                                            .replace(/[\s_]+/g, '-')
                                            .replace(/^-+|-+$/g, '');

                                        navigate(`/movie/${slug}`, { state: { movieId: film.id } });
                                    }}
                                />
                            ))}
                        </div>

                        {/* Pagination (Maquette) */}
                        <div className="mt-20 flex flex-col items-center gap-6">
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
                                PAGE 1 SUR 2 - {filteredFilms.length} FILMS TROUVÉS
                            </span>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default MovieGallery;