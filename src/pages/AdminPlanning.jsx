import React, { useState, useEffect } from 'react';
import {
    Users,
    Zap,
    Download,
    Edit3,
    Clock,
    MapPin,
    Loader2,
    Plus,
    Trash2,
    Calendar // Ajout de Calendar pour les séparateurs
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AdminPlanning = () => {
    const [workshops, setWorkshops] = useState([]);
    const [loading, setLoading] = useState(true);
    const { token } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                setLoading(true);
                const response = await fetch(`${import.meta.env.VITE_API_URL}/event`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                const result = await response.json();

                if (result.success) {
                    // On trie les workshops par date chronologique
                    const sortedData = result.data.sort((a, b) => new Date(a.start_at) - new Date(b.start_at));
                    setWorkshops(sortedData);
                }
            } catch (error) {
                console.error("Erreur chargement events:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchEvents();
    }, [token]);

    const formatDateLabel = (dateString) => {
        return new Date(dateString).toLocaleDateString('fr-FR', {
            weekday: 'long',
            day: 'numeric',
            month: 'long'
        }).toUpperCase();
    };

    const handleDelete = async (id) => {
        if (!window.confirm("⚠️ Supprimer cet événement ?")) return;
        const toastId = toast.loading("Suppression...");
        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/event/${id}`, {
                method: 'DELETE',
                headers: { Authorization: `Bearer ${token}` }
            });
            const result = await response.json();
            if (result.success) {
                toast.update(toastId, { render: "Supprimé !", type: "success", isLoading: false, autoClose: 2000 });
                setWorkshops(prev => prev.filter(w => w.id !== id));
            }
        } catch (error) {
            toast.update(toastId, { render: "Erreur", type: "error", isLoading: false, autoClose: 2000 });
        }
    };

    const totalCapacity = workshops
        .filter(w => w.registration_required === 1 || w.registration_required === true)
        .reduce((acc, curr) => acc + (curr.total_capacity || 0), 0);
    const totalEvents = workshops.length;

    if (loading) return (
        <div className="min-h-screen flex items-center justify-center bg-mars-light">
            <Loader2 className="animate-spin text-primary" size={48} />
        </div>
    );

    return (
        <main className="min-h-screen bg-mars-light py-6">
            <ToastContainer />
            <div className="max-w-6xl mx-auto px-4">

                <header className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
                    <div>
                        <h1 className="mb-4 font-black text-5xl tracking-tighter uppercase italic">
                            Planning & Workshops
                        </h1>
                        <p className="text-light-gray font-medium text-lg leading-snug max-w-2xl">
                            Gestion complète de l'agenda. Les événements sont classés par ordre chronologique.
                        </p>
                    </div>

                    <button
                        onClick={() => navigate('/admin/evenements/create')}
                        className="bg-primary hover:bg-primary/90 text-white font-black uppercase tracking-widest text-[11px] px-8 py-4 rounded-2xl transition-all flex items-center gap-3 shadow-lg shadow-primary/30 hover:scale-105 active:scale-95"
                    >
                        <Plus size={18} />
                        Créer un événement
                    </button>
                </header>

                <section className="grid md:grid-cols-2 gap-6 mb-12">
                    <div className="bg-white rounded-[2.5rem] p-10 flex items-center gap-8 shadow-sm border border-slate-50">
                        <div className="w-20 h-20 bg-mars-light rounded-3xl flex items-center justify-center">
                            <Users size={32} className="text-primary" />
                        </div>
                        <div>
                            <p className="text-[10px] font-black uppercase tracking-widest text-light-gray mb-1">Capacité Réservable</p>
                            <p className="text-5xl font-black text-mars-dark mb-1 leading-none">{totalCapacity}</p>
                            <p className="text-[11px] font-bold text-accent uppercase tracking-wide">Places totales</p>
                        </div>
                    </div>
                    <div className="bg-white rounded-[2.5rem] p-10 flex items-center gap-8 shadow-sm border border-slate-50">
                        <div className="w-20 h-20 bg-mars-light rounded-3xl flex items-center justify-center">
                            <Zap size={32} className="text-accent fill-accent" />
                        </div>
                        <div>
                            <p className="text-[10px] font-black uppercase tracking-widest text-light-gray mb-1">Total</p>
                            <p className="text-5xl font-black text-mars-dark mb-1 leading-none">{totalEvents}</p>
                            <p className="text-[11px] font-bold text-accent uppercase tracking-wide">Événements listés</p>
                        </div>
                    </div>
                </section>

                <section className="space-y-6">
                    {workshops.length > 0 ? workshops.map((workshop, index) => {
                        const isBookable = workshop.registration_required === 1 || workshop.registration_required === true;
                        
                        // Logique pour afficher le bandeau de date seulement quand elle change
                        const currentDate = formatDateLabel(workshop.start_at);
                        const previousDate = index > 0 ? formatDateLabel(workshops[index - 1].start_at) : null;
                        const showDateSeparator = currentDate !== previousDate;

                        return (
                            <React.Fragment key={workshop.id}>
                                {showDateSeparator && (
                                    <div className="flex items-center gap-4 py-8">
                                        <div className="h-px flex-1 bg-slate-200"></div>
                                        <div className="flex items-center gap-2 px-6 py-2 bg-mars-dark text-white rounded-full text-[11px] font-black tracking-widest uppercase italic">
                                            <Calendar size={14} />
                                            {currentDate}
                                        </div>
                                        <div className="h-px flex-1 bg-slate-200"></div>
                                    </div>
                                )}

                                <article className="bg-white rounded-[2.5rem] p-10 shadow-sm border border-slate-50 transition-all hover:shadow-md relative overflow-hidden">
                                    <div className={`absolute left-0 top-0 bottom-0 w-2 ${isBookable ? 'bg-primary' : 'bg-accent'}`} />

                                    <div className="flex items-center justify-between mb-4 pl-4">
                                        <div className="flex items-center gap-2 text-light-gray font-bold text-xs">
                                            <Clock size={16} className={isBookable ? 'text-primary' : 'text-accent'} />
                                            <span>
                                                {new Date(workshop.start_at).toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })}
                                            </span>
                                        </div>
                                        <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest ${isBookable ? 'bg-primary/10 text-primary' : 'bg-slate-100 text-slate-500'}`}>
                                            {isBookable ? 'Sur Réservation' : 'Entrée Libre'}
                                        </span>
                                    </div>

                                    <h2 className="text-2xl font-black text-mars-dark uppercase tracking-tight mb-4 pl-4">
                                        {workshop.title}
                                    </h2>

                                    <div className="space-y-3 mb-8 pl-4">
                                        <div className="flex items-center gap-4">
                                            {isBookable && (
                                                <span className="bg-mars-light text-mars-dark px-3 py-1 rounded-lg text-[10px] font-black uppercase border border-slate-200">
                                                    Capacité : {workshop.total_capacity}
                                                </span>
                                            )}
                                            <span className={`px-3 py-1 rounded-lg text-[10px] font-black uppercase ${
                                                workshop.status === 'PUBLISHED' ? 'bg-green-100 text-green-700' : 
                                                workshop.status === 'CANCELLED' ? 'bg-red-100 text-red-700' : 'bg-amber-100 text-amber-700'
                                            }`}>
                                                {workshop.status}
                                            </span>
                                            <div className="flex items-center gap-1 text-[10px] font-bold text-slate-400 uppercase ml-auto">
                                                <MapPin size={12} />
                                                {workshop.location}
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex gap-3 pl-4 border-t border-slate-50 pt-6">
                                        {isBookable && (
                                            <button className="p-4 border border-slate-100 hover:bg-slate-50 text-mars-dark rounded-xl transition-all">
                                                <Download size={18} />
                                            </button>
                                        )}
                                        <button
                                            onClick={() => navigate(`/admin/evenements/edit/${workshop.id}`)}
                                            className="flex-1 bg-mars-dark hover:bg-black text-white font-black uppercase tracking-widest text-[10px] py-4 rounded-xl transition-all flex items-center justify-center gap-3"
                                        >
                                            <Edit3 size={16} />
                                            Modifier
                                        </button>
                                        <button
                                            onClick={() => handleDelete(workshop.id)}
                                            className="p-4 bg-red-50 hover:bg-red-500 text-red-500 hover:text-white rounded-xl transition-all"
                                        >
                                            <Trash2 size={18} />
                                        </button>
                                    </div>
                                </article>
                            </React.Fragment>
                        );
                    }) : (
                        <div className="py-20 text-center bg-white rounded-[3rem] border-2 border-dashed border-slate-200">
                            <p className="text-light-gray font-black uppercase tracking-widest italic">Aucun événement programmé</p>
                        </div>
                    )}
                </section>
            </div>
        </main>
    );
};

export default AdminPlanning;