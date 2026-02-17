import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import FilmCard from '../ui/FilmCard';
import { Play, ArrowRight, Loader2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const CompetitionSection = ({ setView }) => {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const [films, setFilms] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCompetitionFilms = async () => {
            try {
                // On récupère tous les films
                const response = await fetch(`${import.meta.env.VITE_API_URL}/movie`);
                const result = await response.json();
                
                // On ne garde que les films 'VALIDÉ' et on en prend 3 pour l'accueil
                const validatedFilms = result.data
                    .filter(f => f.status?.toUpperCase() === 'VALIDÉ' || f.status?.toUpperCase() === 'APPROVED')
                    .slice(0, 3);
                
                setFilms(validatedFilms);
            } catch (error) {
                console.error("Erreur lors du chargement de la compétition:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchCompetitionFilms();
    }, []);

    return (
        <section id="galerie" className="py-26 bg-white">
            <div className="max-w-6xl mx-auto px-6">

                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
                    <div className="max-w-2xl">
                        <div className="flex items-center gap-3 text-accent mb-4">
                            <Play className="w-5 h-5 fill-current" />
                            <span className="font-bold uppercase tracking-[0.3em] text-lg">{t('competition.badge')}</span>
                        </div>
                        <h2 className="text-mars-dark mb-6">
                            {t('competition.title_main')} <span className="text-primary">{t('competition.title_accent')}</span>
                        </h2>
                        <p className="text-slate-500 font-medium text-lg">
                            {t('competition.description')}
                        </p>
                    </div>
                </div>

                {loading ? (
                    <div className="flex justify-center py-20">
                        <Loader2 className="animate-spin text-primary w-12 h-12" />
                    </div>
                ) : (
                    <div className="grid md:grid-cols-3 gap-8">
                        {films.map((film) => (
                            <FilmCard
                                key={film.id}
                                title={film.original_title}
                                director={`${film.firstname} ${film.lastname}`}
                                country={film.original_language || "France"}
                                thumbnail={`http://localhost:3000/${film.cover_image}`}
                                tags={film.ia_tools ? film.ia_tools.split(',') : ["AI"]}
                                onClick={() => {
                                    const slug = film.original_title.toLowerCase().trim().replace(/[\s_]+/g, '-');
                                    navigate(`/movie/${slug}`, { state: { movieId: film.id } });
                                }}
                            />
                        ))}
                    </div>
                )}

                <button
                    onClick={() => navigate('/galerie')}
                    className="text-xl group flex items-center gap-2 font-bold uppercase tracking-widest text-primary transition-all mt-12"
                >
                    {t('competition.cta')}
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
                </button>

            </div>
        </section>
    );
};

export default CompetitionSection;