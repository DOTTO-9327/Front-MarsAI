import { useTranslation } from 'react-i18next';
import { Globe, Film } from 'lucide-react';

const StatsSection = () => {
    const { t } = useTranslation();

    return (
        <section className="w-full bg-white py-24 px-4 md:px-8 lg:px-16 font-sans">
            <div className="max-w-6xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-12">

                {/* Texte de gauche */}
                <div className="flex-1 space-y-6">
                    <h2 className="text-5xl md:text-6xl leading-[1.1] tracking-tighter text-mars-dark uppercase">
                        {t('stats.title_main')}<br />
                        <span className="text-accent">{t('stats.title_accent')}</span>
                    </h2>
                    <p className="max-w-md text-gray-500 font-medium leading-relaxed text-lg ">
                        {t('stats.description')}
                    </p>
                </div>

                {/* Grille de Chiffres */}
                <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-6 w-full">

                    {/* Card: Pays */}
                    <article className="bg-white border border-gray-300 p-10 rounded-4xl shadow-2xl shadow-gray-100 flex flex-col gap-6 group hover:-translate-y-2 transition-transform duration-300">
                        <div className="text-accent">
                            <Globe size={48} strokeWidth={1.5} className="group-hover:rotate-12 transition-transform" />
                        </div>
                        <div className="space-y-1">
                            <p className="text-5xl font-black text-mars-dark tracking-tighter">
                                {t('stats.countries.number')}
                            </p>
                            <p className="text-light-gray font-bold text-xs uppercase tracking-widest">
                                {t('stats.countries.label')}
                            </p>
                        </div>
                    </article>

                    {/* Card: Films */}
                    <article className="bg-white border border-gray-300 p-10 rounded-4xl shadow-2xl shadow-gray-100 flex flex-col gap-6 group hover:-translate-y-2 transition-transform duration-300">
                        <div className="text-accent">
                            <Film size={48} strokeWidth={1.5} className="group-hover:rotate-12 transition-transform" />
                        </div>
                        <div className="space-y-1">
                            <p className="text-5xl font-black text-mars-dark tracking-tighter">
                                {t('stats.films.number')}
                            </p>
                            <p className="text-light-gray font-bold text-xs uppercase tracking-widest">
                                {t('stats.films.label')}
                            </p>
                        </div>
                    </article>

                </div>
            </div>
        </section>
    );
};

export default StatsSection;