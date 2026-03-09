import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useLocation } from 'react-router-dom';
import { 
    ArrowLeft, User, Mail, Clock, MapPin, 
    UserCheck, Loader2 
} from 'lucide-react';
import { toast, ToastContainer } from 'react-toastify';

const BookingSubmission = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Récupération de l'event passé via l'état de navigation
    // On ajoute une sécurité au cas où l'utilisateur arrive sur la page sans avoir cliqué
    const event = location.state?.workshopData;

    const { register, handleSubmit, formState: { errors } } = useForm();

    // Si pas d'event, on redirige ou on affiche un message
    if (!event) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-mars-light p-4">
                <p className="font-black uppercase tracking-widest text-slate-400 mb-6">Aucun événement sélectionné</p>
                <button onClick={() => navigate('/programme')} className="bg-primary text-white px-8 py-4 rounded-2xl font-black uppercase tracking-widest text-xs">
                    Retour au programme
                </button>
            </div>
        );
    }

    const onSubmit = async (data) => {
        setIsSubmitting(true);
        const toastId = toast.loading("Finalisation de votre réservation...");

        try {
            const payload = {
                ...data,
                event_id: event.id, // On lie l'inscription à l'ID de l'event
            };

            const response = await fetch(`${import.meta.env.VITE_API_URL}/booking`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });

            const result = await response.json();

            if (result.success) {
                toast.update(toastId, { 
                    render: "Réservation confirmée ! À bientôt à MARS.A.I", 
                    type: "success", 
                    isLoading: false, 
                    autoClose: 3000 
                });
                // Redirection après succès
                setTimeout(() => navigate('/programme'), 2000);
            } else {
                throw new Error(result.message || "Erreur lors de la réservation");
            }
        } catch (error) {
            toast.update(toastId, { 
                render: error.message, 
                type: "error", 
                isLoading: false, 
                autoClose: 3000 
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <main className="min-h-screen bg-mars-light py-16 px-4">
            <ToastContainer />
            <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-8 items-start">
                
                <div className="space-y-8 order-2 lg:order-1">
                    {/* BOUTON RETOUR */}
                    <button
                        onClick={() => navigate('/programme')} 
                        className="group flex items-center gap-2 font-black uppercase tracking-widest text-primary hover:text-mars-dark transition-all mb-4"
                    >
                        <ArrowLeft size={18} strokeWidth={3} />
                        Modifier mon choix
                    </button>

                    {/* SECTION 1 : FORMULAIRE RÉSERVATION */}
                    <section className="bg-white rounded-4xl p-8 md:p-12 shadow-sm border border-slate-100 animate-in fade-in slide-in-from-left-4 duration-500">
                        <div className="flex items-center gap-4 mb-10">
                            <div className="w-12 h-12 bg-mars-light rounded-xl flex items-center justify-center text-primary">
                                <UserCheck size={24} />
                            </div>
                            <h2 className="text-xl font-black uppercase tracking-widest text-mars-dark">
                                Inscription
                            </h2>
                        </div>

                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                            <div className="grid md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase text-mars-dark tracking-widest ml-1">Nom*</label>
                                    <div className="relative group">
                                        <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-primary" size={18} />
                                        <input
                                            {...register("lastname", { required: "Nom requis" })}
                                            className="w-full pl-12 pr-4 py-4 bg-mars-light border-none rounded-2xl font-bold text-sm outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                                            placeholder="NOM"
                                        />
                                    </div>
                                    {errors.lastname && <p className="text-[9px] text-red-500 font-bold uppercase">{errors.lastname.message}</p>}
                                </div>

                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase text-mars-dark tracking-widest ml-1">Prénom*</label>
                                    <div className="relative group">
                                        <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-primary" size={18} />
                                        <input
                                            {...register("firstname", { required: "Prénom requis" })}
                                            className="w-full pl-12 pr-4 py-4 bg-mars-light border-none rounded-2xl font-bold text-sm outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                                            placeholder="PRÉNOM"
                                        />
                                    </div>
                                    {errors.firstname && <p className="text-[9px] text-red-500 font-bold uppercase">{errors.firstname.message}</p>}
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase text-mars-dark tracking-widest ml-1">Adresse E-mail*</label>
                                <div className="relative group">
                                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-primary" size={18} />
                                    <input
                                        {...register("email", { 
                                            required: "Email requis",
                                            pattern: { value: /^\S+@\S+$/i, message: "Format email invalide" }
                                        })}
                                        className="w-full pl-12 pr-4 py-4 bg-mars-light border-none rounded-2xl font-bold text-sm outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                                        placeholder="EMAIL@EXEMPLE.COM"
                                    />
                                </div>
                                {errors.email && <p className="text-[9px] text-red-500 font-bold uppercase">{errors.email.message}</p>}
                            </div>

                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase text-mars-dark tracking-widest ml-1">Profession / Spécialité</label>
                                <input
                                    {...register("job")}
                                    className="w-full px-5 py-4 bg-mars-light border-none rounded-2xl font-bold text-sm outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                                    placeholder="DESIGNER, RÉALISATEUR, ÉTUDIANT..."
                                />
                            </div>

                            <div className="flex items-start gap-4 pt-4">
                                <input type="checkbox" required className="mt-1 w-5 h-5 accent-primary" />
                                <p className="text-[9px] font-black text-slate-400 uppercase leading-relaxed tracking-widest">
                                    J'accepte les conditions générales de participation et le règlement de protection des données de MARS.A.I.
                                </p>
                            </div>

                            <button 
                                type="submit" 
                                disabled={isSubmitting}
                                className="w-full bg-mars-dark hover:bg-black text-white font-black uppercase tracking-[0.2em] py-4 rounded-2xl shadow-xl transition-all active:scale-95 disabled:opacity-50 flex items-center justify-center gap-3"
                            >
                                {isSubmitting ? <Loader2 className="animate-spin" size={20} /> : "Valider mon inscription"}
                            </button>
                        </form>
                    </section>
                </div>

                {/* SECTION 2 : RÉCAPITULATIF ÉVÉNEMENT (DYNAMIQUE) */}
                <aside className="lg:sticky lg:top-8 order-1 lg:order-2">
                    <section className="bg-primary rounded-[3rem] p-10 md:p-14 text-white shadow-2xl animate-in slide-in-from-right-4 duration-700">
                        <p className="text-[10px] font-black uppercase tracking-[0.3em] mb-4 text-white/60">
                            Session sélectionnée
                        </p>
                        <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter leading-[0.9] mb-12 italic">
                            {event.title}
                        </h2>

                        <div className="space-y-10">
                            <div className="flex items-center gap-6">
                                <div className="w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center border border-white/20">
                                    <Clock size={28} />
                                </div>
                                <div>
                                    <p className="text-[10px] font-black uppercase tracking-widest text-white/50 mb-1">Date & Heure</p>
                                    <p className="text-xl font-black uppercase text-white">
                                        {new Date(event.start_at).toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' }).replace(':', 'H')} — {new Date(event.start_at).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long' })}
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-center gap-6">
                                <div className="w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center border border-white/20">
                                    <MapPin size={28} />
                                </div>
                                <div>
                                    <p className="text-[10px] font-black uppercase tracking-widest text-white/50 mb-1">Lieu</p>
                                    <p className="text-xl font-black uppercase text-white">{event.location}</p>
                                </div>
                            </div>
                        </div>

                        <div className="mt-16 pt-8 border-t border-white/10">
                            <p className="text-[11px] font-medium leading-relaxed text-white/80 italic">
                                {event.description}
                            </p>
                        </div>
                    </section>
                </aside>

            </div>
        </main>
    );
};

export default BookingSubmission;