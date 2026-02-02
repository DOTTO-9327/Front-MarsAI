import { useTranslation } from 'react-i18next';
import FilmCard from '../ui/FilmCard';
import { Play, ArrowRight } from 'lucide-react';

const CompetitionSection = ({ setView }) => {
    const { t } = useTranslation();

    const featuredFilms = [
        {
            title: "Synthetica",
            director: "Elena Novak",
            country: "France",
            tags: ["Cinematic"],
            thumbnail: "https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?auto=format&fit=crop&q=80"
        },
        {
            title: "Synthetica",
            director: "Elena Novak",
            country: "France",
            tags: ["Cinematic"],
            thumbnail: "https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?auto=format&fit=crop&q=80"
        },
        {
            title: "Synthetica",
            director: "Elena Novak",
            country: "France",
            tags: ["Cinematic"],
            thumbnail: "https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?auto=format&fit=crop&q=80"
        }
    ];

    return (
        <section id="galerie" className="py-26 bg-white">
            <div className="max-w-7xl mx-auto px-6">

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

                <div className="grid md:grid-cols-3 gap-8">
                    {featuredFilms.map((film, i) => (
                        <FilmCard
                            key={i}
                            {...film}
                            onClick={() => console.log(`Lecture de ${film.title}`)}
                        />
                    ))}
                </div>

                <button
                    onClick={() => setView('galerie')}
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