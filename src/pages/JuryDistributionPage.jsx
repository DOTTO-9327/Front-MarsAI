import { Zap } from 'lucide-react';
import JuryMemberCard from '../components/admin/JuryMemberCard';

const JuryDistributionPage = () => {
    const juryMembers = [
        { id: 1, name: "Alice Martin", activity: "il y a 2h", progress: 85, total: 100, current: 85 },
        { id: 2, name: "Thomas Durand", activity: "Terminé", progress: 100, total: 100, current: 100 },
        { id: 3, name: "Amine Mansouri", activity: "il y a 2h", progress: 50, total: 100, current: 50 },
        { id: 4, name: "Elena Vargas", activity: "il y a 2h", progress: 50, total: 100, current: 50 },
    ];

    return (
        <main className="min-h-screen bg-mars-light py-6">
            <div className="max-w-6xl mx-auto">

                <header className="mb-12">
                    <h3 className="mb-4 font-black text-5xl tracking-tighter uppercase">
                        Distribution & Jury
                    </h3>
                    <p className="max-w-2xl text-light-gray font-medium text-lg leading-snug mb-10">
                        Gérez les lots de visionnage pour chaque membre du comité.
                    </p>
                </header>

                <section className="space-y-8 mb-12" aria-label="Membres du jury">
                    {juryMembers.map((member) => (
                        <JuryMemberCard key={member.id} member={member} />
                    ))}
                </section>

                {/* Section Distribution Automatique */}
                <section className="bg-mars-dark rounded-[2.5rem] p-12 text-white shadow-2xl relative overflow-hidden">
                    <div className="relative z-10">
                        <div className="flex items-center gap-3 mb-6">
                            <Zap className="text-accent fill-accent" size={24} />
                        </div>
                        <h2 className="text-4xl font-black uppercase tracking-tighter mb-4 leading-tight">
                            Distribution Automatique
                        </h2>
                        <p className="text-slate-400 text-sm font-medium leading-relaxed max-w-2xl mb-10 uppercase tracking-wide">
                            L'algorithme répartit les 600 films entre les jurés actifs. Chaque film sera assigné à exactement 2 membres pour garantir une double évaluation.
                        </p>
                        <div className="flex flex-col gap-4">
                            <button className="w-full bg-primary hover:bg-blue-700 text-white font-black uppercase tracking-widest py-5 rounded-2xl  transition-all active:scale-95">
                                Lancer l'attribution
                            </button>
                            <button className="w-full bg-transparent border-2 border-white/10 hover:border-white/30 text-white font-black uppercase tracking-widest py-5 rounded-2xl transition-all">
                                Mode Manuel
                            </button>
                        </div>
                    </div>
                    <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-primary/5 blur-[120px] rounded-full" />
                </section>
            </div>
        </main>
    );
};

export default JuryDistributionPage;