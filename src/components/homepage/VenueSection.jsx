import React from 'react';
import { useTranslation } from 'react-i18next';
import { MapPin } from 'lucide-react';
import Lieu from '../../assets/lieu.webp';

const VenueSection = () => {
    const { t } = useTranslation();

    return (
        <section className="w-full bg-mars-light py-16 px-4 md:px-8 lg:px-16 font-sans">
            <div className="max-w-6xl mx-auto">

                {/* Header: Titre et Description */}
                <header className="flex flex-col md:flex-row justify-between items-start gap-8 mb-16">
                    <div className="space-y-4">
                        <div className="flex items-center gap-2 text-primary font-bold text-xl uppercase tracking-widest mb-16">
                            <MapPin size={40} strokeWidth={1.5} />
                            <span>{t('venue.badge')}</span>
                        </div>
                        <h2 className="text-6xl md:text-8xl leading-[0.9] text-dark-mars tracking-tighter font-black uppercase">
                            {t('venue.title_main')} <br />
                            <span className="text-light-gray">{t('venue.title_accent')}</span>
                        </h2>
                        <p className="text-light-gray font-bold text-md uppercase tracking-widest pt-4">
                            {t('venue.subtitle')}
                        </p>
                    </div>

                    <div className="max-w-xs md:text-right self-start md:self-auto">
                        <p className="text-md font-medium leading-relaxed tracking-tight">
                            {t('venue.description')}
                        </p>
                    </div>
                </header>

                {/* Grid: Salle des Sucres & Salle Plaza */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
                    {/* Salle des Sucres */}
                    <article className="bg-white p-10 rounded-[2.5rem] shadow-sm flex flex-col justify-between min-h-40">
                        <div className="space-y-6">
                            <h3 className="text-2xl font-black uppercase text-primary tracking-tight">
                                {t('venue.rooms.sucres.title')}
                            </h3>
                            <p className="text-gray-500 leading-relaxed max-w-sm">
                                {t('venue.rooms.sucres.desc')}
                            </p>
                        </div>
                        <div className="w-16 h-1 bg-primary rounded-full mt-6" />
                    </article>

                    {/* Salle Plaza */}
                    <article className="bg-white p-10 rounded-[2.5rem] shadow-sm flex flex-col justify-between min-h-40">
                        <div className="space-y-6">
                            <h3 className="text-2xl font-black uppercase text-accent tracking-tight">
                                {t('venue.rooms.plaza.title')}
                            </h3>
                            <p className="text-gray-500 leading-relaxed max-w-sm">
                                {t('venue.rooms.plaza.desc')}
                            </p>
                        </div>
                        <div className="w-16 h-1 bg-accent rounded-full mt-6" />
                    </article>
                </div>

                {/* Hero Image Section */}
                <div className="relative rounded-[2.5rem] overflow-hidden bg-black aspect-16/8 md:aspect-21/9">
                    <img
                        src={Lieu}
                        alt={t('venue.image_alt')}
                        className="w-full h-full object-cover opacity-80"
                    />
                    {/* Overlay de texte sur l'image */}
                    <div className="absolute inset-0 flex flex-col justify-end p-8 md:p-12 bg-linear-to-t from-black/80 via-transparent to-transparent">
                        <div className="space-y-2">
                            <span className="text-white/70 text-[10px] font-bold uppercase tracking-[0.2em]">
                                {t('venue.location')}
                            </span>
                            <h3 className="text-2xl md:text-4xl font-black text-white uppercase tracking-tight">
                                {t('venue.image_title')}
                            </h3>
                        </div>
                    </div>
                </div>

            </div>
        </section>
    );
};

export default VenueSection;