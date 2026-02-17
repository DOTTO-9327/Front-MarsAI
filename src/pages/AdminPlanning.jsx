import React, { useState } from 'react';
import {
    Users,
    Zap,
    Download,
    Edit3,
    Clock,
    MapPin,
    User as CoachIcon,
    Calendar
} from 'lucide-react';

const AdminPlanning = () => {
    const [activeTab, setActiveTab] = useState('VENDREDI 17 MAI');

    const stats = [
        { label: 'Réservations totales', value: '245', sub: '+12 aujourd\'hui', icon: <Users size={32} className="text-primary" /> },
        { label: 'Taux de remplissage', value: '78%', sub: 'Global Workshops', icon: <Zap size={32} className="text-accent fill-accent" /> }
    ];

    // Données fictives
    const workshops = [
        {
            id: 1,
            time: '10:00 - 12:00',
            title: 'MASTERCLASS: PROMPT ENGINEERING VIDEO',
            coach: 'Jean dupond AI Lab',
            desc: 'Apprenez à maîtriser la cohérence temporelle avec Runway Gen-3.',
            registrations: 12,
            location: 'AUDITORIUM MUCEM'
        },
        {
            id: 2,
            time: '14:00 - 16:00',
            title: 'ATELIER: MUSIQUE & IA GÉNÉRATIVE',
            coach: 'Sora Music Team',
            desc: 'Composition assistée par IA pour vos courts-métrages.',
            registrations: 16,
            location: 'STUDIO 1 - FRICHE BELLE DE MAI'
        }
    ];

    return (
        <main className="min-h-screen bg-mars-light py-6">
            <div className="max-w-6xl mx-auto">

                {/* HEADER SECTION */}
                <header className="mb-12">
                    <h3 className="mb-4 font-black text-5xl tracking-tighter uppercase">
                        Planning & Workshops
                    </h3>
                    <p className="text-light-gray font-medium text-lg leading-snug max-w-2xl">
                        Gérez l'agenda du festival à Marseille et le flux des participants.
                    </p>
                </header>

                {/* TOP STATS CARDS */}
                <section className="grid md:grid-cols-2 gap-6 mb-12">
                    {stats.map((stat, idx) => (
                        <div key={idx} className="bg-white rounded-[2.5rem] p-10 flex items-center gap-8 shadow-sm border border-slate-50">
                            <div className="w-20 h-20 bg-mars-light rounded-3xl flex items-center justify-center">
                                {stat.icon}
                            </div>
                            <div>
                                <p className="text-[10px] font-black uppercase tracking-widest text-light-gray mb-1">
                                    {stat.label}
                                </p>
                                <p className="text-5xl font-black text-mars-dark mb-1 leading-none">{stat.value}</p>
                                <p className="text-[11px] font-bold text-accent uppercase tracking-wide">
                                    {stat.sub}
                                </p>
                            </div>
                        </div>
                    ))}
                </section>

                {/* DATE TABS */}
                <nav className="bg-slate-200/50 p-2 rounded-2xl flex gap-2 mb-10 w-fit">
                    {['VENDREDI 17 MAI', 'SAMEDI 18 MAI'].map((date) => (
                        <button
                            key={date}
                            onClick={() => setActiveTab(date)}
                            className={`px-8 py-3 rounded-xl text-[11px] font-black transition-all ${activeTab === date
                                    ? 'bg-white text-mars-dark shadow-sm'
                                    : 'text-light-gray hover:text-mars-dark'
                                }`}
                        >
                            {date}
                        </button>
                    ))}
                </nav>

                {/* WORKSHOP CARDS LIST */}
                <section className="space-y-8">
                    {workshops.map((workshop) => (
                        <article key={workshop.id} className="bg-white rounded-[3rem] p-12 shadow-sm border border-slate-50">
                            <div className="flex items-center gap-2 text-light-gray font-bold text-xs mb-4">
                                <Clock size={16} />
                                <span>{workshop.time}</span>
                            </div>

                            <h2 className="text-3xl font-black text-mars-dark uppercase tracking-tight mb-4">
                                {workshop.title}
                            </h2>

                            <p className="text-light-gray font-medium text-lg mb-6">
                                {workshop.desc}
                            </p>

                            <div className="space-y-2 mb-10">
                                <p className="text-[10px] font-black text-mars-dark uppercase tracking-widest">
                                    Nombre d'inscriptions : {workshop.registrations}
                                </p>
                                <div className="flex items-center gap-2 text-[10px] font-black text-primary uppercase tracking-widest">
                                    <MapPin size={14} />
                                    <span>{workshop.location}</span>
                                </div>
                            </div>

                            {/* ACTION BUTTONS */}
                            <div className="flex flex-col sm:flex-row gap-4 border-t border-slate-100 pt-10">
                                <button className="flex-1 border-2 border-slate-100 hover:border-primary/20 hover:bg-slate-50 text-mars-dark font-black uppercase tracking-widest text-[11px] py-5 rounded-2xl transition-all flex items-center justify-center gap-3">
                                    <Download size={18} />
                                    Liste Participants
                                </button>
                                <button className="flex-1 bg-mars-dark hover:bg-black text-white font-black uppercase tracking-widest text-[11px] py-5 rounded-2xl transition-all flex items-center justify-center gap-3 shadow-xl">
                                    <Edit3 size={18} />
                                    Modifier
                                </button>
                            </div>
                        </article>
                    ))}
                </section>

            </div>
        </main>
    );
};

export default AdminPlanning;