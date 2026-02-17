import React from 'react';
import { useTranslation } from 'react-i18next';
import { Handshake } from 'lucide-react';
import PartnerLogo from '../../assets/StatCard.png'; 

const PartnersSection = () => {
    const { t } = useTranslation();

    // Génération d'un tableau de 12 pour remplir la grille de la maquette
    const partners = Array(12).fill({ name: 'Partner', src: PartnerLogo });

    return (
        <section className="w-full bg-[#F3F4F6] py-24 px-4 md:px-8 lg:px-16 font-sans">
            <div className="max-w-6xl mx-auto">

                {/* Header Section */}
                <header className="flex flex-col items-center text-center mb-16 space-y-6">
                    <div className="flex items-center gap-4 text-primary font-bold text-xl uppercase tracking-[0.2em]">
                        <Handshake size={40} strokeWidth={1.5} />
                        <span>{t('partners.badge')}</span>
                    </div>

                    <h2 className="text-5xl md:text-7xl font-black uppercase tracking-tighter text-mars-dark leading-none">
                        {t('partners.title_main')} <span className="text-accent">{t('partners.title_accent')}</span>
                    </h2>
                </header>

                {/* Logos Grid */}
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
                    {partners.map((logo, index) => (
                        <div
                            key={index}
                            className="bg-white/50 border border-gray-100 rounded-2xl p-6 md:p-10 flex items-center justify-center aspect-square md:aspect-video grayscale hover:grayscale-0 transition-all duration-500 hover:bg-white hover:shadow-xl hover:shadow-gray-200/50 group"
                        >
                            <img
                                src={logo.src}
                                alt={`${logo.name} ${index + 1}`}
                                className="max-w-full max-h-full object-contain transform group-hover:scale-110 transition-transform duration-500"
                            />
                        </div>
                    ))}
                </div>

            </div>
        </section>
    );
};

export default PartnersSection;