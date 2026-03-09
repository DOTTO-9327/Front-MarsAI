import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Loader2, Save, Undo2, Calendar, MapPin, Users, Ticket } from 'lucide-react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const EditEventPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { token } = useAuth();

    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    const [formData, setFormData] = useState({
        title: '',
        description: '',
        location: '',
        start_at: '',
        status: 'PUBLISHED',
        registration_required: false,
        total_capacity: 0,
        price: 0
    });

    // Charger les données de l'événement
    useEffect(() => {
        const fetchEvent = async () => {
            try {
                const response = await fetch(`${import.meta.env.VITE_API_URL}/event/${id}`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                const result = await response.json();

                if (result.success && result.data) {
                    const event = result.data;

                    // Formater la date pour l'input type="datetime-local" (YYYY-MM-DDTHH:mm)
                    let formattedDate = '';
                    if (event.start_at) {
                        const d = new Date(event.start_at);
                        // Ajustement au fuseau horaire local pour l'affichage dans l'input
                        const tzOffset = d.getTimezoneOffset() * 60000;
                        formattedDate = new Date(d.getTime() - tzOffset).toISOString().slice(0, 16);
                    }

                    setFormData({
                        title: event.title || '',
                        description: event.description || '',
                        location: event.location || '',
                        start_at: formattedDate,
                        status: event.status || 'active',
                        registration_required: event.registration_required === 1 || event.registration_required === true,
                        total_capacity: event.total_capacity || 0,
                        price: event.price || 0
                    });
                } else {
                    toast.error("Événement introuvable.");
                }
            } catch (error) {
                toast.error("Erreur de chargement.");
            } finally {
                setLoading(false);
            }
        };

        fetchEvent();
    }, [id, token]);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSaving(true);
        const toastId = toast.loading("Sauvegarde en cours...");

        try {
            // Convertir le booléen en 1 ou 0 pour MySQL
            const payload = {
                ...formData,
                registration_required: formData.registration_required ? 1 : 0
            };

            const response = await fetch(`${import.meta.env.VITE_API_URL}/event/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify(payload)
            });

            const result = await response.json();

            if (result.success) {
                toast.update(toastId, { render: "Événement mis à jour !", type: "success", isLoading: false, autoClose: 3000 });
                // Redirection après 1.5s
                setTimeout(() => navigate('/admin/evenements'), 1500);
            } else {
                throw new Error(result.message);
            }
        } catch (error) {
            toast.update(toastId, { render: `Erreur: ${error.message}`, type: "error", isLoading: false, autoClose: 3000 });
        } finally {
            setSaving(false);
        }
    };

    if (loading) return (
        <div className="min-h-screen flex items-center justify-center bg-mars-light">
            <Loader2 className="animate-spin text-primary" size={48} />
        </div>
    );

    return (
        <main className="min-h-screen bg-mars-light py-6 px-4">
            <ToastContainer />
            <div className="max-w-4xl mx-auto">

                {/* Header */}
                <div className="flex items-center justify-between mb-10">
                    <div>
                        <h1 className="text-4xl font-black uppercase italic tracking-tighter">Éditer l'événement</h1>
                        <p className="text-slate-400 font-bold uppercase tracking-widest text-[10px] mt-2">ID: {id}</p>
                    </div>
                    <button
                        onClick={() => navigate('/admin/evenements')}
                        className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-mars-dark transition-colors"
                    >
                        <Undo2 size={16} /> Retour au planning
                    </button>
                </div>

                {/* Formulaire */}
                <form onSubmit={handleSubmit} className="bg-white rounded-[3rem] p-10 shadow-sm border border-slate-50 space-y-8">

                    {/* Titre & Statut */}
                    <div className="grid md:grid-cols-3 gap-6">
                        <div className="md:col-span-2 space-y-2">
                            <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Titre de l'événement</label>
                            <input
                                type="text" name="title" required
                                value={formData.title} onChange={handleChange}
                                className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-6 py-4 font-bold text-mars-dark focus:border-primary focus:ring-0 outline-none"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Statut</label>
                            <select
                                name="status"
                                value={formData.status} onChange={handleChange}
                                className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-6 py-4 font-bold text-mars-dark focus:border-primary outline-none appearance-none cursor-pointer"
                            >
                                <option value="PUBLISHED">PUBLISHED (Actif)</option>
                                <option value="DRAFT">DRAFT (Brouillon)</option>
                                <option value="CANCELLED">CANCELLED (Annulé)</option>
                            </select>
                        </div>
                    </div>

                    {/* Date & Lieu */}
                    <div className="grid md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-slate-400">
                                <Calendar size={14} /> Date et Heure
                            </label>
                            <input
                                type="datetime-local" name="start_at" required
                                value={formData.start_at} onChange={handleChange}
                                className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-6 py-4 font-bold text-mars-dark focus:border-primary outline-none"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-slate-400">
                                <MapPin size={14} /> Lieu (Salle / Espace)
                            </label>
                            <input
                                type="text" name="location" required
                                value={formData.location} onChange={handleChange}
                                className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-6 py-4 font-bold text-mars-dark focus:border-primary outline-none"
                            />
                        </div>
                    </div>

                    {/* Description */}
                    <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Description</label>
                        <textarea
                            name="description" rows="4" required
                            value={formData.description} onChange={handleChange}
                            className="w-full bg-slate-50 border border-slate-100 rounded-3xl px-6 py-4 font-medium text-slate-600 focus:border-primary outline-none resize-none"
                        ></textarea>
                    </div>

                    <hr className="border-slate-100" />

                    {/* Paramètres de Réservation */}
                    <div className="space-y-6">
                        <label className="flex items-center gap-3 cursor-pointer p-4 rounded-2xl border border-slate-100 bg-slate-50 hover:bg-slate-100 transition-colors w-fit">
                            <input
                                type="checkbox" name="registration_required"
                                checked={formData.registration_required} onChange={handleChange}
                                className="w-5 h-5 accent-primary cursor-pointer"
                            />
                            <span className="text-sm font-black uppercase tracking-widest text-mars-dark">
                                Réservation obligatoire (Type Workshop)
                            </span>
                        </label>

                        {/* Afficher ces champs seulement si la réservation est cochée */}
                        {formData.registration_required && (
                            <div className="grid md:grid-cols-2 gap-6 bg-primary/5 p-6 rounded-4xl border border-primary/20">
                                <div className="space-y-2">
                                    <label className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-primary">
                                        <Users size={14} /> Capacité totale
                                    </label>
                                    <input
                                        type="number" name="total_capacity" min="1"
                                        value={formData.total_capacity} onChange={handleChange}
                                        className="w-full bg-white border border-primary/20 rounded-2xl px-6 py-4 font-bold text-mars-dark focus:border-primary outline-none"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-primary">
                                        <Ticket size={14} /> Prix (0 pour gratuit)
                                    </label>
                                    <input
                                        type="number" step="0.01" name="price" min="0"
                                        value={formData.price} onChange={handleChange}
                                        className="w-full bg-white border border-primary/20 rounded-2xl px-6 py-4 font-bold text-mars-dark focus:border-primary outline-none"
                                    />
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Bouton Sauvegarder */}
                    <div className="pt-6 flex justify-end">
                        <button
                            type="submit" disabled={saving}
                            className="bg-primary text-white flex items-center gap-3 px-10 py-5 rounded-2xl font-black uppercase tracking-widest text-[11px] shadow-xl shadow-primary/30 hover:scale-105 active:scale-95 transition-all disabled:opacity-50"
                        >
                            {saving ? <Loader2 className="animate-spin" size={20} /> : <Save size={20} />}
                            {saving ? "Enregistrement..." : "Enregistrer les modifications"}
                        </button>
                    </div>
                </form>

            </div>
        </main>
    );
};

export default EditEventPage;