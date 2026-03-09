import React, { useState, useEffect } from 'react';
import { Zap, Loader2, CalendarX } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const WorkshopGrid = () => {
    const [workshops, setWorkshops] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const { t } = useTranslation('program');

    useEffect(() => {
        const fetchWorkshops = async () => {
            try {
                setLoading(true);
                const response = await fetch(`${import.meta.env.VITE_API_URL}/event`);
                const result = await response.json();
                
                if (result.success) {
                    // FILTRE : On ne garde que les événements avec réservation obligatoire
                    const onlyBookable = result.data.filter(
                        ws => ws.registration_required === 1 || ws.registration_required === true
                    );
                    setWorkshops(onlyBookable);
                }
            } catch (error) {
                console.error("Erreur lors du chargement des workshops:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchWorkshops();
    }, []);

    const handleBooking = (workshop) => {
        navigate('/reserver', {
            state: {
                workshopData: workshop
            }
        });
    };

    if (loading) return (
        <div className="flex justify-center py-32">
            <Loader2 className="animate-spin text-primary" size={48} />
        </div>
    );

    return (
        <section className="bg-mars-dark rounded-[3rem] md:rounded-[4rem] p-8 md:p-16 text-white relative overflow-hidden mb-16 shadow-2xl border border-white/5">
            
            {/* Background Decor */}
            <div className="absolute -top-24 -left-24 w-96 h-96 bg-primary/5 rounded-full blur-[100px] pointer-events-none" />
            <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-accent/5 rounded-full blur-[100px] pointer-events-none" />

            <header className="relative z-10 mb-16">
                <div className="flex items-center gap-3 text-accent mb-6">
                    <Zap size={24} fill="currentColor" className="animate-pulse" />
                    <span className="text-xs md:text-sm font-black uppercase tracking-[0.3em]">
                        {t('workshops.badge', 'Ateliers Pratiques')}
                    </span>
                </div>

                <h2 className="leading-[0.9] uppercase mb-8 font-black italic tracking-tighter">
                    WORKSHOPS<br />
                    <span className="text-primary">IA CRÉATIVE</span>
                </h2>

                <p className="text-slate-400 text-sm md:text-base font-bold tracking-widest max-w-2xl leading-relaxed uppercase opacity-80">
                    {t('workshops.desc', "Passez de la théorie à la pratique avec les meilleurs experts. Attention, places limitées.")}
                </p>
            </header>

            {/* Grille des workshops filtrés */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative z-10">
                {workshops.length > 0 ? (
                    workshops.map((ws) => (
                        <article
                            key={ws.id}
                            className="bg-white/3 border border-white/10 p-8 md:p-12 rounded-[2.5rem] hover:border-primary/50 hover:bg-white/[0.07] transition-all duration-500 group flex flex-col h-full"
                        >
                            {/* Horaire */}
                            <div className="flex items-center gap-2 text-accent text-sm font-black uppercase tracking-widest mb-6">
                                <span className="w-2 h-2 rounded-full bg-accent" />
                                {new Date(ws.start_at).toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' }).replace(':', 'H')}
                            </div>

                            {/* Titre & Lieu */}
                            <div className="mb-12">
                                <h3 className="text-2xl md:text-3xl text-white font-black uppercase leading-none mb-4 group-hover:text-primary transition-colors">
                                    {ws.title}
                                </h3>
                                <p className="text-slate-500 text-[11px] font-black uppercase tracking-[0.2em] flex items-center gap-2">
                                    <span className="w-4 h-px bg-slate-700" />
                                    {ws.location}
                                </p>
                            </div>

                            {/* Footer de la carte */}
                            <div className="mt-auto pt-8 border-t border-white/5">
                                <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-widest mb-6">
                                    <span className="text-slate-500 italic">Statut</span>
                                    <span className={ws.total_capacity > 0 ? "text-primary" : "text-red-500"}>
                                        {ws.total_capacity > 0 
                                            ? `${ws.total_capacity} places disponibles` 
                                            : "Session complète"}
                                    </span>
                                </div>

                                <button
                                    onClick={() => handleBooking(ws)}
                                    disabled={ws.total_capacity <= 0}
                                    className={`w-full py-5 text-xs font-black uppercase tracking-[0.2em] rounded-2xl transition-all duration-300 shadow-xl 
                                        ${ws.total_capacity > 0 
                                            ? "bg-white text-mars-dark hover:bg-primary hover:text-white hover:scale-[1.02] cursor-pointer" 
                                            : "bg-slate-800 text-slate-500 cursor-not-allowed"}`}
                                >
                                    {ws.total_capacity > 0 
                                        ? t('button.Reservemyplace', 'Réserver ma place') 
                                        : 'Complet'}
                                </button>
                            </div>
                        </article>
                    ))
                ) : (
                    <div className="col-span-full py-20 flex flex-col items-center justify-center border-2 border-dashed border-white/10 rounded-[3rem]">
                        <CalendarX size={48} className="text-slate-600 mb-4" />
                        <p className="text-slate-500 uppercase font-black tracking-widest italic text-center">
                            Aucun atelier nécessitant une réservation<br/>n'est programmé pour le moment.
                        </p>
                    </div>
                )}
            </div>
        </section>
    );
};

export default WorkshopGrid;