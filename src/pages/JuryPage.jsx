import React from 'react';
import { useTranslation } from 'react-i18next';
import { Award, Quote, CheckCircle2 } from 'lucide-react';

const JuryPage = () => {
    const { t } = useTranslation();

    const juryMembers = [
        { name: "Aiko Sato", role: "Productrice / France", image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=600" },
        { name: "Julie Masson", role: "Réalisatrice", image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=600" },
        { name: "Marc Aubin", role: "Directeur de la Photo", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=600" },
        { name: "Aiko Sato", role: "Productrice / France", image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=600" },
        { name: "Julie Masson", role: "Réalisatrice", image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=600" },
        { name: "Marc Aubin", role: "Directeur de la Photo", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=600" }
    ];

    const notationCriteria = [
        { id: 1, title: "Originalité IA", desc: "Niveau d'innovation et d'utilisation créative des outils IA." },
        { id: 2, title: "Esthétique Visuelle", desc: "Qualité artistique et cohérence de l'univers visuel généré." },
        { id: 3, title: "Qualité Narrative", desc: "La force de l'histoire et son impact émotionnel sur l'audience." },
        { id: 4, title: "Émotion & Impact", desc: "La capacité du film à toucher le spectateur durablement." }
    ];

    return (
        <main className="bg-white min-h-screen">

            {/* SECTION PRÉSIDENT DU JURY */}
            <section className="bg-mars-dark py-20 px-6">
                <div className="max-w-6xl mx-auto">
                    <div className="flex items-center gap-4 text-accent mb-8">
                        <Award size={40} strokeWidth={1} />
                        <span className="text-lg font-bold uppercase tracking-[0.2em]">
                            {t ? t('program.infos', 'Les membres du jury') : 'Les membres du jury'}
                        </span>
                    </div>

                    <h1 className="text-white text-5xl md:text-7xl font-black uppercase tracking-tighter mb-12 leading-[0.9]">
                        UN JURY <br />
                        <span className="text-primary">D'EXCEPTION</span> <br />
                        <span className="text-white">POUR LE FUTUR</span>
                    </h1>

                    <div className="grid lg:grid-cols-2 gap-12 items-center">
                        {/* Photo Président */}
                        <div className="relative group overflow-hidden rounded-[40px] aspect-4/5 md:aspect-video lg:aspect-4/5 bg-slate-800">
                            <img
                                src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=800"
                                className="w-full h-full object-cover grayscale opacity-80 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700"
                                alt="Julien Valros"
                            />
                            <div className="absolute inset-0 bg-linear-to-t from-mars-dark via-transparent to-transparent" />
                            <div className="absolute bottom-10 left-10">
                                <span className="text-accent font-bold uppercase tracking-widest text-xs mb-2 block">Président du Jury</span>
                                <h2 className="text-white text-4xl font-black uppercase">Julien Valros</h2>
                            </div>
                        </div>

                        {/* Citation & Bio */}
                        <div className="space-y-8">
                            <div className="bg-white/5 border border-white/10 p-10 rounded-[40px] relative">
                                <Quote className="text-primary mb-6" size={48} />
                                <p className="text-2xl md:text-3xl text-white font-medium leading-tight italic mb-8">
                                    "Nous ne jugeons pas seulement des films, mais des visions d'avenirs souhaitables créées avec des outils qui nous dépassent encore. C'est le début d'une nouvelle ère."
                                </p>
                                <p className="text-light-gray text-lg">
                                    Réalisateur multi-récompensé, Julien Valros apporte son regard expert sur les nouvelles formes de narration numérique.
                                </p>
                            </div>
                            <button className="bg-accent text-white px-10 py-5 rounded-2xl font-black uppercase tracking-widest hover:scale-105 transition-transform  shadow-accent/20">
                                Voir sa biographie
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            {/* SECTION LES MEMBRES DU JURY */}
            <section className="py-24 px-6">
                <div className="max-w-6xl mx-auto">
                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
                        <div>
                            <h2 className="text-mars-dark text-5xl font-black uppercase tracking-tighter leading-none">
                                LES MEMBRES <br />
                                <span className="text-primary">DU JURY</span>
                            </h2>
                        </div>
                        <p className="text-light-gray font-medium max-w-md">
                            Des experts, créateurs et visionnaires réunis pour délibérer sur la sélection officielle.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                        {juryMembers.map((member, index) => (
                            <div key={index} className="group relative aspect-3/4 overflow-hidden rounded-4xl bg-mars-light">
                                <img src={member.image} className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-500" alt={member.name} />
                                <div className="absolute inset-0 bg-linear-to-t from-mars-dark via-transparent to-transparent opacity-80" />
                                <div className="absolute bottom-8 left-8 right-8">
                                    <span className="text-accent font-bold uppercase tracking-widest text-[10px] mb-1 block">
                                        {member.role}
                                    </span>
                                    <h3 className="text-white text-2xl font-black uppercase tracking-tighter">
                                        {member.name}
                                    </h3>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* SECTION CHARTE DE NOTATION (DARK) */}
            <section className="px-6 mb-20">
                <div className="max-w-6xl mx-auto">
                    <div className="bg-mars-dark rounded-[40px] p-10 md:p-16 shadow-2xl border border-white/5 relative overflow-hidden">

                        {/* Header de la Card */}
                        <div className="mb-16 relative z-10">
                            <h2 className="text-white text-5xl font-black uppercase tracking-tighter mb-6 leading-tight">
                                LA CHARTE <br />
                                <span className="text-accent">DE NOTATION</span>
                            </h2>
                            <p className="text-light-gray max-w-2xl text-lg font-medium">
                                Le jury s'engage à évaluer chaque court-métrage selon quatre piliers fondamentaux pour garantir l'équité entre les participants.
                            </p>
                        </div>

                        <div className="grid gap-4 relative z-10">
                            {notationCriteria.map((item) => (
                                <div
                                    key={item.id}
                                    className="bg-white/5 border border-white/5 p-8 rounded-3xl flex flex-col md:flex-row md:items-center gap-6 group hover:bg-white/10 transition-all duration-300"
                                >
                                    {/* Numéro stylisé */}
                                    <div className="w-14 h-14 shrink-0 bg-primary rounded-xl flex items-center justify-center text-white font-black text-2xl shadow-lg shadow-primary/20 group-hover:scale-110 transition-transform">
                                        {item.id}
                                    </div>

                                    {/* Texte */}
                                    <div className="flex-1">
                                        <h4 className="text-white text-xl font-black uppercase mb-1 tracking-tight group-hover:text-primary transition-colors">
                                            {item.title}
                                        </h4>
                                        <p className="text-light-gray text-sm leading-relaxed">
                                            {item.desc}
                                        </p>
                                    </div>

                                    <CheckCircle2
                                        className="hidden md:block ml-auto text-white/5 group-hover:text-primary transition-colors"
                                        size={32}
                                    />
                                </div>
                            ))}
                        </div>

                        {/* Décoration de fond */}
                        <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-accent/5 blur-[120px] rounded-full pointer-events-none"></div>
                    </div>
                </div>
            </section>
        </main>
    );
};

export default JuryPage;