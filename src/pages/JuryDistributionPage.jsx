import { useState, useEffect } from 'react';
import { Zap, UserPlus, X, ShieldCheck, Loader2 } from 'lucide-react';
import JuryMemberCard from '../components/admin/JuryMemberCard';

const JuryDistributionPage = () => {
    // --- ÉTATS ---
    const [juryMembers, setJuryMembers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showForm, setShowForm] = useState(false);
    const [status, setStatus] = useState({ type: '', msg: '' });
    const [formData, setFormData] = useState({
        firstname: '',
        lastname: '',
        email: '',
        password: '',
        role: 'JURY'
    });

    // --- CHARGEMENT DES DONNÉES ---
    const fetchStaff = async () => {
        try {
            setLoading(true);
            const response = await fetch(`${import.meta.env.VITE_API_URL}/admin/staff`);
            const result = await response.json();
            
            if (result.success) {
                const formattedStaff = result.data.map(member => ({
                    id: member.id,
                    name: `${member.firstname} ${member.lastname}`,
                    role: member.role,
                    activity: "Actif", 
                    progress: 0,       // À lier plus tard avec la table rating
                    total: 0, 
                    current: 0 
                }));
                setJuryMembers(formattedStaff);
            }
        } catch (err) {
            console.error("Erreur lors de la récupération du staff:", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchStaff();
    }, []);

    // --- ACTIONS ---
    const handleAddMember = async (e) => {
        e.preventDefault();
        setStatus({ type: 'info', msg: 'Création du compte...' });

        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/admin/staff`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });

            const result = await response.json();

            if (result.success) {
                setStatus({ type: 'success', msg: 'Membre ajouté avec succès !' });
                setFormData({ firstname: '', lastname: '', email: '', password: '', role: 'JURY' });
                
                await fetchStaff();

                setTimeout(() => {
                    setShowForm(false);
                    setStatus({ type: '', msg: '' });
                }, 2000);
            } else {
                throw new Error(result.message || "Erreur lors de l'ajout");
            }
        } catch (err) {
            setStatus({ type: 'error', msg: err.message });
        }
    };

    return (
        <main className="min-h-screen bg-mars-light py-6">
            <div className="max-w-6xl mx-auto px-4 md:px-0">

                <header className="mb-12 flex flex-col md:flex-row justify-between items-start gap-6">
                    <div>
                        <h3 className="mb-4 font-black text-5xl tracking-tighter uppercase">
                            Distribution & Jury
                        </h3>
                        <p className="max-w-2xl text-light-gray font-medium text-lg leading-snug">
                            Gérez les lots de visionnage pour chaque membre du comité.
                        </p>
                    </div>

                    <button 
                        onClick={() => {
                            setShowForm(!showForm);
                            setStatus({ type: '', msg: '' });
                        }}
                        className={`flex items-center gap-3 px-8 py-4 rounded-2xl font-black text-xs tracking-widest uppercase transition-all shadow-xl ${
                            showForm ? 'bg-black text-white' : 'bg-primary text-white hover:scale-105 active:scale-95'
                        }`}
                    >
                        {showForm ? <><X size={18} /> Annuler</> : <><UserPlus size={18} /> Nouveau Membre</>}
                    </button>
                </header>

                {/* FORMULAIRE D'AJOUT */}
                {showForm && (
                    <section className="mb-12 bg-white rounded-[2.5rem] p-10 shadow-sm border-2 border-primary/5 animate-in fade-in slide-in-from-top-4">
                        <div className="flex items-center gap-3 mb-8">
                            <div className="p-3 bg-primary/10 rounded-xl text-primary">
                                <ShieldCheck size={24} />
                            </div>
                            <h4 className="font-black text-2xl uppercase tracking-tight">Enregistrer un collaborateur</h4>
                        </div>

                        <form onSubmit={handleAddMember} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            <div className="flex flex-col gap-2">
                                <label className="text-[10px] font-black uppercase tracking-widest text-light-gray ml-2">Prénom</label>
                                <input 
                                    type="text" required className="bg-gray-50 border-none rounded-2xl p-4 text-sm focus:ring-2 ring-primary outline-none"
                                    value={formData.firstname} onChange={e => setFormData({...formData, firstname: e.target.value})}
                                />
                            </div>
                            <div className="flex flex-col gap-2">
                                <label className="text-[10px] font-black uppercase tracking-widest text-light-gray ml-2">Nom</label>
                                <input 
                                    type="text" required className="bg-gray-50 border-none rounded-2xl p-4 text-sm focus:ring-2 ring-primary outline-none"
                                    value={formData.lastname} onChange={e => setFormData({...formData, lastname: e.target.value})}
                                />
                            </div>
                            <div className="flex flex-col gap-2">
                                <label className="text-[10px] font-black uppercase tracking-widest text-light-gray ml-2">Email Pro</label>
                                <input 
                                    type="email" required className="bg-gray-50 border-none rounded-2xl p-4 text-sm focus:ring-2 ring-primary outline-none"
                                    value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})}
                                />
                            </div>
                            <div className="flex flex-col gap-2">
                                <label className="text-[10px] font-black uppercase tracking-widest text-light-gray ml-2">Mot de passe provisoire</label>
                                <input 
                                    type="password" required className="bg-gray-50 border-none rounded-2xl p-4 text-sm focus:ring-2 ring-primary outline-none"
                                    value={formData.password} onChange={e => setFormData({...formData, password: e.target.value})}
                                />
                            </div>
                            <div className="flex flex-col gap-2">
                                <label className="text-[10px] font-black uppercase tracking-widest text-light-gray ml-2">Rôle / Accès</label>
                                <select 
                                    className="bg-gray-50 border-none rounded-2xl p-4 text-sm font-bold focus:ring-2 ring-primary outline-none appearance-none"
                                    value={formData.role} onChange={e => setFormData({...formData, role: e.target.value})}
                                >
                                    <option value="JURY">MEMBRE DU JURY</option>
                                    <option value="ADMIN">ADMINISTRATEUR</option>
                                </select>
                            </div>
                            <div className="flex items-end">
                                <button type="submit" className="w-full bg-black text-white h-13 rounded-2xl font-black uppercase tracking-widest text-[11px] hover:bg-primary transition-all shadow-lg">
                                    Créer le compte
                                </button>
                            </div>
                        </form>

                        {status.msg && (
                            <div className={`mt-6 p-4 rounded-xl font-bold text-xs uppercase tracking-widest text-center ${status.type === 'error' ? 'bg-red-50 text-red-500' : 'bg-green-50 text-green-500'}`}>
                                {status.msg}
                            </div>
                        )}
                    </section>
                )}

                {/* LISTE DES MEMBRES */}
                <section className="space-y-8 mb-12" aria-label="Membres du jury">
                    {loading ? (
                        <div className="flex flex-col items-center justify-center py-20 gap-4">
                            <Loader2 className="animate-spin text-primary" size={40} />
                            <p className="font-black text-xs uppercase tracking-widest text-light-gray">Récupération de l'équipe...</p>
                        </div>
                    ) : juryMembers.length > 0 ? (
                        juryMembers.map((member) => (
                            <JuryMemberCard key={member.id} member={member} />
                        ))
                    ) : (
                        <div className="bg-white rounded-[2.5rem] p-20 text-center border-2 border-dashed border-gray-100">
                            <p className="text-light-gray font-bold italic">Aucun membre trouvé en base de données.</p>
                        </div>
                    )}
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
                            L'algorithme répartit les films entre les jurés actifs. Chaque film sera assigné à exactement 2 membres pour garantir une double évaluation.
                        </p>
                        <div className="flex flex-col md:flex-row gap-4">
                            <button className="flex-1 bg-primary hover:bg-blue-700 text-white font-black uppercase tracking-widest py-5 rounded-2xl transition-all active:scale-95">
                                Lancer l'attribution
                            </button>
                            <button className="flex-1 bg-transparent border-2 border-white/10 hover:border-white/30 text-white font-black uppercase tracking-widest py-5 rounded-2xl transition-all">
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