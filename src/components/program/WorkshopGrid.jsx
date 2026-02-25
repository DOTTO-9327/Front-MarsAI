import React from 'react';
import { Zap } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const WorkshopGrid = () => {
    const navigate = useNavigate();
    const { t } = useTranslation('program');

    // Données des ateliers incluant les IDs et les lieux pour la page de soumission
    const workshops = [
        {
            id: "ws-1",
            time: "14h30",
            title: "GÉNÉRATION VIDÉO : LES BASES",
            coach: "Thomas Aubert",
            places: 10,
            location: "Studio 1 — La Plateforme_"
        },
        {
            id: "ws-2",
            time: "15h45",
            title: "IA & SCÉNARIO : CO-ÉCRITURE",
            coach: "Thomas Aubert",
            places: 8,
            location: "Studio 2 — La Plateforme_"
        },
        {
            id: "ws-3",
            time: "17h00",
            title: "POST-PROD IA & EFFETS SPÉCIAUX",
            coach: "Thomas Aubert",
            places: 10,
            location: "Studio 1 — La Plateforme_"
        },
        {
            id: "ws-4",
            time: "11h00",
            title: "ÉTHIQUE & DROIT DE L'IA",
            coach: "Thomas Aubert",
            places: 10,
            location: "Auditorium — La Plateforme_"
        }
    ];

    const handleBooking = (workshop) => {
        navigate('/reserver', {
            state: {
                workshopData: workshop
            }
        });
    };

    return (
        <section className="bg-mars-dark rounded-4xl p-8 md:p-16 text-white relative overflow-hidden mb-16 shadow-2xl">

            <header className="relative z-10 mb-12">
                <div className="flex items-center gap-3 text-accent mb-6">
                    <Zap size={30} fill="currentColor" />
                    <span className="text-xs md:text-lg font-bold uppercase tracking-[0.2em]">
                        {t ? t('workshops.badge', 'Ateliers Pratiques') : 'Ateliers Pratiques'}
                    </span>
                </div>

                <h2 className="text-5xl md:text-6xl leading-none uppercase mb-6">
                    WORKSHOPS<br />
                    <span className="text-primary">IA CRÉATIVE</span>
                </h2>

                <p className="text-slate-400 text-xs md:text-sm font-bold tracking-widest max-w-2xl leading-relaxed">
                    {t ? t('workshops.desc', "Passez de la théorie à la pratique avec les meilleurs experts internationaux. Attention, places très limitées (max 15 par session).") : "Passez de la théorie à la pratique avec les meilleurs experts internationaux. Attention, places très limitées (max 15 par session)."}
                </p>
            </header>

            {/* Grille des cartes */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative z-10">
                {workshops.map((ws, idx) => (
                    <article
                        key={ws.id}
                        className="bg-white/5 border border-white/10 p-8 md:p-10 rounded-3xl hover:border-primary/50 hover:bg-white/10 transition-all duration-300 group flex flex-col h-full"
                    >
                        {/* Horaire */}
                        <div className="text-accent text-sm font-bold uppercase tracking-widest mb-4">
                            {ws.time}
                        </div>

                        {/* Titre */}
                        <h3 className="text-xl text-white md:text-2xl uppercase leading-tight min-h-15">
                            {ws.title}
                        </h3>

                        {/* Disponibilité */}
                        <div className="mt-auto">
                            <div className="flex justify-between items-center text-[10px] font-bold uppercase tracking-widest mb-4">
                                <span className="text-gray-500">Disponibilité</span>
                                <span className="text-primary">{ws.places} Places Restantes</span>
                            </div>

                            {/* Bouton avec gestionnaire de clic corrigé */}
                            <button
                                onClick={() => handleBooking(ws)}
                                className="w-full py-4 bg-white text-mars-dark text-xs font-black uppercase tracking-widest rounded-xl hover:bg-primary hover:text-white hover:scale-[1.02] active:scale-95 transition-all duration-300 cursor-pointer shadow-lg"
                            >
                                {t('button.Reservemyplace')}
                            </button>
                        </div>
                    </article>
                ))}
            </div>
        </section>
    );
};

export default WorkshopGrid;