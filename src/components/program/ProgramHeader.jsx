import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { MapPin, ArrowLeft, Sparkles } from 'lucide-react';

const ProgramHeader = () => {
    const navigate = useNavigate();
    const { t } = useTranslation('program');


    return (
        <header className="mb-12 max-w-7xl mx-auto">
            {/* Bouton Retour Accueil */}
            <button
                onClick={() => navigate('/')}
                className="text-md group flex items-center gap-2 font-bold uppercase tracking-widest text-primary transition-all mb-12"
            >
                <ArrowLeft className="w-6 h-6 transition-transform group-hover:-translate-x-2" />
                <span className="relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-primary after:transition-all group-hover:after:w-full">
                    {t('header.button')}
                </span>
            </button>

            {/* Badge Infos Pratiques */}
            <div className="flex items-center gap-4 text-accent mb-8">
                <Sparkles size={40} strokeWidth={1} />
                <span className="text-lg font-bold uppercase tracking-[0.2em]">
                    {t('header.infosPratiques')}
                </span>
            </div>

            {/* Grand Titre */}
            <h2 className="text-5xl md:text-7xl font-black text-mars-dark leading-none mb-12">
                13 JUIN 2026<br />
                <span className="text-primary">MARSEILLE</span>
            </h2>

            {/* Carte Lieu (Alignée à gauche) */}
            <div className="bg-mars-light rounded-4xl p-8 flex flex-col items-start text-left border border-slate-100 shadow-sm transition-all duration-300 hover:shadow-md">
                <div className="bg-white p-4 rounded-2xl shadow-sm text-primary mb-8">
                    <MapPin size={32} strokeWidth={1.5} />
                </div>
                <div className="space-y-2">
                    <h3 className="text-2xl md:text-3xl font-black uppercase tracking-tight text-mars-dark">
                        {t ? t('venue.name', 'LA PLATEFORME_') : 'LA PLATEFORME_'}
                    </h3>

                    <p className="text-gray-500 text-sm font-bold leading-relaxed tracking-widest max-w-4xl">
                        {t('section.descriptionPlaceEvent')}
                    </p>
                </div>
            </div>
        </header>
    );
};

export default ProgramHeader;