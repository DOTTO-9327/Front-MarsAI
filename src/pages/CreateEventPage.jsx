import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Loader2, PlusCircle, Undo2, Calendar, MapPin, Users, Ticket } from 'lucide-react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const CreateEventPage = () => {
    const navigate = useNavigate();
    const { token } = useAuth();

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
        const toastId = toast.loading("Création en cours...");

        try {
            const payload = {
                ...formData,
                registration_required: formData.registration_required ? 1 : 0,
                total_capacity: parseInt(formData.total_capacity) || 0,
                price: parseFloat(formData.price) || 0
            };

            const response = await fetch(`${import.meta.env.VITE_API_URL}/event`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify(payload)
            });

            const result = await response.json();

            if (result.success) {
                toast.update(toastId, { render: "Événement créé avec succès !", type: "success", isLoading: false, autoClose: 3000 });
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

    return (
        <main className="min-h-screen bg-mars-light py-6 px-4">
            <ToastContainer />
            <div className="max-w-4xl mx-auto">

                {/* Header */}
                <div className="flex items-center justify-between mb-10">
                    <div>
                        <h1 className="text-4xl font-black uppercase italic tracking-tighter">Créer un événement</h1>
                        <p className="text-slate-400 font-bold uppercase tracking-widest text-[10px] mt-2">Nouvelle session au programme</p>
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
                                type="text" name="title" required placeholder="Ex: Masterclass IA & Scénario"
                                value={formData.title} onChange={handleChange}
                                className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-6 py-4 font-bold text-mars-dark focus:border-primary focus:ring-0 outline-none placeholder:font-normal"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Statut initial</label>
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
                                type="text" name="location" required placeholder="Ex: Studio 1 — La Plateforme_"
                                value={formData.location} onChange={handleChange}
                                className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-6 py-4 font-bold text-mars-dark focus:border-primary outline-none placeholder:font-normal"
                            />
                        </div>
                    </div>

                    {/* Description */}
                    <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Description</label>
                        <textarea
                            name="description" rows="4" required placeholder="Détaillez le contenu de la session..."
                            value={formData.description} onChange={handleChange}
                            className="w-full bg-slate-50 border border-slate-100 rounded-3xl px-6 py-4 font-medium text-slate-600 focus:border-primary outline-none resize-none placeholder:font-normal"
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
                            <div className="grid md:grid-cols-2 gap-6 bg-primary/5 p-6 rounded-4xl border border-primary/20 animate-in fade-in slide-in-from-top-2">
                                <div className="space-y-2">
                                    <label className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-primary">
                                        <Users size={14} /> Capacité totale
                                    </label>
                                    <input
                                        type="number" name="total_capacity" min="1" required={formData.registration_required}
                                        value={formData.total_capacity} onChange={handleChange}
                                        className="w-full bg-white border border-primary/20 rounded-2xl px-6 py-4 font-bold text-mars-dark focus:border-primary outline-none"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-primary">
                                        <Ticket size={14} /> Prix (0 pour gratuit)
                                    </label>
                                    <input
                                        type="number" step="0.01" name="price" min="0" required={formData.registration_required}
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
                            className="bg-mars-dark text-white flex items-center gap-3 px-10 py-5 rounded-2xl font-black uppercase tracking-widest text-[11px] shadow-xl hover:bg-black hover:scale-105 active:scale-95 transition-all disabled:opacity-50"
                        >
                            {saving ? <Loader2 className="animate-spin" size={20} /> : <PlusCircle size={20} />}
                            {saving ? "Création..." : "Créer l'événement"}
                        </button>
                    </div>
                </form>

            </div>
        </main>
    );
};

export default CreateEventPage;