import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import {
    ArrowLeft, User, Mail, Briefcase, Clock,
    MapPin, UserCheck, ShieldCheck, ChevronRight
} from 'lucide-react';

const BookingSubmission = () => {
    const navigate = useNavigate();
    const { register, handleSubmit, formState: { errors } } = useForm();

    const onSubmit = (data) => {
        console.log("Données d'inscription :", data);
        // Logique d'envoi vers l'API /bookings ici
    };

    return (
        <main className="min-h-screen bg-mars-light py-16">
            <div className="max-w-6xl mx-auto space-y-8">

                {/* BOUTON RETOUR */}
                <nav>
                    <button
                        onClick={() => navigate('/programme')} 
                        className="text-md group flex items-center gap-2 font-bold uppercase tracking-widest text-primary transition-all mb-12"
                    >
                        <ArrowLeft size={18} strokeWidth={3} />
                        Modifier mon choix
                    </button>
                </nav>

                {/* SECTION 1 : FORMULAIRE RÉSERVATION */}
                <section className="bg-white rounded-4xl p-10 md:p-14 shadow-sm border border-slate-100 animate-in fade-in duration-500">
                    <div className="flex items-center gap-4 mb-10">
                        <div className="w-12 h-12 bg-mars-light rounded-xl flex items-center justify-center text-primary">
                            <UserCheck size={24} />
                        </div>
                        <h2 className="text-xl font-black uppercase tracking-widest text-mars-dark">
                            Réserver ma place
                        </h2>
                    </div>

                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                        <div className="grid md:grid-cols-2 gap-6">
                            {/* NOM */}
                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase text-mars-dark tracking-widest ml-1">Nom*</label>
                                <div className="relative group">
                                    <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-primary transition-colors" size={18} />
                                    <input
                                        {...register("lastname", { required: true })}
                                        type="text" placeholder="NOM"
                                        className="w-full pl-12 pr-4 py-4 bg-mars-light border-none rounded-2xl font-bold text-sm outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                                    />
                                </div>
                            </div>

                            {/* PRÉNOM */}
                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase text-mars-dark tracking-widest ml-1">Prénom*</label>
                                <div className="relative group">
                                    <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-primary transition-colors" size={18} />
                                    <input
                                        {...register("firstname", { required: true })}
                                        type="text" placeholder="PRÉNOM"
                                        className="w-full pl-12 pr-4 py-4 bg-mars-light border-none rounded-2xl font-bold text-sm outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="grid md:grid-cols-2 gap-6">
                            {/* EMAIL */}
                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase text-mars-dark tracking-widest ml-1">Adresse E-mail*</label>
                                <div className="relative group">
                                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-primary transition-colors" size={18} />
                                    <input
                                        {...register("email", { required: true })}
                                        type="email" placeholder="EMAIL@EXEMPLE.COM"
                                        className="w-full pl-12 pr-4 py-4 bg-mars-light border-none rounded-2xl font-bold text-sm outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                                    />
                                </div>
                            </div>

                            {/* PROFESSION */}
                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase text-mars-dark tracking-widest ml-1">Profession / Spécialité</label>
                                <div className="relative">
                                    <input
                                        {...register("job")}
                                        type="text"
                                        className="w-full px-5 py-4 bg-mars-light border-none rounded-2xl font-bold text-sm outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* CHECKBOX RGPD */}
                        <div className="flex items-start gap-4 pt-4">
                            <input
                                type="checkbox"
                                required
                                className="mt-1 w-5 h-5 rounded border-slate-200 text-primary focus:ring-primary/20 cursor-pointer"
                            />
                            <p className="text-[9px] font-black text-slate-400 uppercase leading-relaxed tracking-widest">
                                J'accepte les conditions générales de participation et le règlement de protection des données.
                            </p>
                        </div>

                        <button type="submit" className="w-full bg-mars-dark hover:bg-black text-white font-black uppercase tracking-widest py-6 rounded-2xl shadow-xl transition-all active:scale-95 cursor-pointer mt-4">
                            Valider mon inscription
                        </button>
                    </form>
                </section>

                {/* SECTION 2 : RÉCAPITULATIF ÉVÉNEMENT (BLEU) */}
                <section className="bg-primary rounded-4xl p-10 md:p-14 text-white shadow-2xl animate-in slide-in-from-bottom-6 duration-700">
                    <p className="text-xs font-bold uppercase tracking-[0.3em] mb-4 text-white">
                        Événement sélectionné
                    </p>
                    <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tighter mb-12">
                        Génération Vidéo : Les bases
                    </h2>

                    <div className="space-y-8">
                        {/* HORAIRE */}
                        <div className="flex items-center gap-6">
                            <div className="w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center border border-white/20">
                                <Clock size={28} />
                            </div>
                            <div>
                                <p className="text-[10px] font-black uppercase tracking-widest text-light-gray mb-1">Horaire</p>
                                <p className="text-xl font-black uppercase text-white">14h30 — 13 Juin</p>
                            </div>
                        </div>

                        {/* LIEU */}
                        <div className="flex items-center gap-6">
                            <div className="w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center border border-white/20">
                                <MapPin size={28} />
                            </div>
                            <div>
                                <p className="text-[10px] font-black uppercase tracking-widest opacity-60 mb-1 text-light-gray">Lieu</p>
                                <p className="text-xl font-black uppercase text-white">Studio 1 — La Plateforme_</p>
                            </div>
                        </div>

                    </div>
                </section>

            </div>
        </main>
    );
};

export default BookingSubmission;