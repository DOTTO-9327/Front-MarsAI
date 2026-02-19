import React, { useState, useEffect } from 'react';
import { Star, Info, Loader2, CheckCircle2 } from 'lucide-react';
import { useOutletContext } from 'react-router-dom';

/**
 * Composant MovieRatingPage
 * -------------------------
 * Interface permettant à un membre du jury de visionner un film assigné
 * et de soumettre sa note (de 0 à 10).
 */
const MovieRatingPage = () => {
    // Récupérer les props passées par le layout parent (JuryRatingLayout)
    const { selectedMovie, handleMovieRated, getFinalImageUrl: getMediaUrl } = useOutletContext();
    // rating : Stocke la valeur actuelle du curseur de la note.
    const [rating, setRating] = useState(0);
    // isSaving : Verrouille le bouton pendant l'appel API pour éviter les doubles clics.
    const [isSaving, setIsSaving] = useState(false);
    // saved : Affiche la pastille verte "Note enregistrée" si la note est validée en BDD.
    const [saved, setSaved] = useState(false);

    // Ce useEffect se déclenche à chaque fois que l'utilisateur clique sur un nouveau film dans la sidebar.
    // Il permet de pré-remplir la note si le film a déjà été évalué, ou de réinitialiser à 0 sinon.
    useEffect(() => {
        // Si la DB renvoie une note on l'applique. Sinon, on remet à 0.
        setRating(selectedMovie.note !== null ? selectedMovie.note : 0);
        // On met à jour l'état de sauvegarde visuel
        setSaved(selectedMovie.note !== null);
    }, [selectedMovie]);

    // SAUVEGARDER LA NOTE
    // Déclenchée lors du clic sur le bouton "Valider la note".
    const handleSaveRating = async () => {
        setIsSaving(true);
        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/admin/rating/${selectedMovie.rating_id}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ note: rating })
            });

            const result = await response.json();

            if (result.success) {
                setSaved(true);
                // On notifie le composant parent (sidebar) pour mettre à jour la liste (ajout pastille verte)
                // parseInt pour s'assurer que le parent manipule un entier
                handleMovieRated(selectedMovie.rating_id, parseInt(rating));
            }
        } catch (err) {
            console.error("Erreur de sauvegarde", err);
        } finally {
            setIsSaving(false);
        }
    };

    return (
        <div className="p-4 md:p-12 max-w-6xl mx-auto animate-in fade-in duration-500">

            {/* --- EN-TÊTE D'INFORMATION --- */}
            <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-mars-dark rounded-full flex items-center justify-center text-white">
                        <Info size={18} />
                    </div>
                    <div>
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Visionnage en cours</p>
                        <p className="text-sm font-black text-mars-dark uppercase">Session Jury 2026</p>
                    </div>
                </div>
            </div>

            {/* --- LECTEUR VIDÉO --- */}
            <div className="aspect-video w-full rounded-[40px] overflow-hidden shadow-2xl relative group mb-12 bg-black border-4 border-white">
                {selectedMovie.video_local_path ? (
                    <video
                        key={selectedMovie.movie_id}
                        controls
                        controlsList="nodownload" // Sécurité pour masquer le bouton télécharger.
                        className="h-full w-full object-contain bg-black"
                        poster={getMediaUrl(selectedMovie.thumbnail)}
                        preload="metadata"
                    >
                        <source src={getMediaUrl(selectedMovie.video_local_path)} type="video/mp4" />
                        Votre navigateur ne supporte pas la lecture de vidéos.
                    </video>
                ) : (
                    <div className="flex h-full w-full items-center justify-center bg-mars-dark relative">
                        <img
                            src={getMediaUrl(selectedMovie.thumbnail)}
                            className="absolute inset-0 h-full w-full object-cover opacity-30 blur-sm"
                            alt="Affiche de fond"
                        />
                        <div className="relative z-10 text-center bg-black/50 p-6 rounded-3xl backdrop-blur-md">
                            <p className="font-black uppercase tracking-widest text-white mb-2">Vidéo non disponible</p>
                            <p className="text-xs text-slate-300">Le fichier source n'a pas été trouvé sur le serveur.</p>
                        </div>
                    </div>
                )}

                {/* Badges Overlay */}
                <div className="absolute top-8 left-8 flex gap-2 pointer-events-none">
                    <span className="bg-black/50 backdrop-blur-md text-white text-[10px] font-black px-4 py-2 rounded-full uppercase tracking-widest border border-white/10">
                        {selectedMovie.country || 'FR'}
                    </span>
                    <span className="bg-black/50 backdrop-blur-md text-white text-[10px] font-black px-4 py-2 rounded-full uppercase tracking-widest border border-white/10">
                        {selectedMovie.year || '2026'}
                    </span>
                </div>
            </div>

            {/* --- ZONE DE NOTATION --- */}
            <section className="bg-white rounded-[3rem] p-8 md:p-12 shadow-sm border border-slate-100 relative overflow-hidden">

                {/* Titre et Badge de Sauvegarde */}
                <div className="flex flex-col md:flex-row justify-between items-start mb-10 gap-6">
                    <div className="relative z-10">
                        <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tighter text-mars-dark mb-2 leading-none">
                            {selectedMovie.title}
                        </h2>
                        <p className="text-primary font-bold text-lg uppercase tracking-widest">
                            {selectedMovie.director}
                        </p>
                    </div>

                    {/* Affiche le message de succès si la DB confirme la sauvegarde */}
                    {saved && (
                        <div className="relative z-10 flex items-center gap-2 bg-green-50 px-6 py-3 rounded-2xl border border-green-100 animate-in zoom-in">
                            <CheckCircle2 className="text-green-500" size={20} />
                            <p className="font-black text-green-600 tracking-tighter text-xl uppercase">Note enregistrée</p>
                        </div>
                    )}
                </div>

                <div className="space-y-12 relative z-10">
                    <div>
                        {/* Affichage visuel de la note actuelle */}
                        <div className="flex justify-between items-end mb-6">
                            <div>
                                <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest mb-1">Système de notation</p>
                                <p className="text-sm font-black text-mars-dark uppercase tracking-tight">Qualité globale & Artistique</p>
                            </div>
                            <p className="text-7xl font-black text-mars-dark tracking-tighter">
                                {rating}<span className="text-2xl text-slate-200">/10</span>
                            </p>
                        </div>

                        {/* Slider natif HTML5 de type range */}
                        <input
                            type="range" min="0" max="10" step="1"
                            value={rating}
                            onChange={(e) => {
                                setRating(e.target.value);
                                setSaved(false);
                            }}
                            className="w-full h-4 bg-slate-100 rounded-full appearance-none cursor-pointer accent-primary mb-6"
                        />

                        {/* Réglette personnalisée : Points d'arrêt de 0 à 10 générés dynamiquement */}
                        <div className="flex justify-between mt-6 px-1">
                            {[...Array(11).keys()].map(n => (
                                <div key={n} className="flex flex-col items-center gap-2">
                                    {/* Le point change de couleur si la note actuelle est supérieure ou égale */}
                                    <div className={`w-2 h-2 rounded-full transition-colors duration-300 ${rating >= n ? 'bg-primary' : 'bg-slate-200'}`}></div>
                                    {/* Le chiffre de la note actuelle est mis en évidence  */}
                                    <span className={`text-[10px] font-black transition-all duration-300 ${rating == n ? 'text-primary scale-125' : 'text-slate-300'}`}>
                                        {n}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Bouton de soumission */}
                    <div className="flex gap-4 pt-4">
                        <button
                            onClick={handleSaveRating}
                            disabled={isSaving}
                            className="w-full md:w-auto flex items-center justify-center gap-2 bg-primary text-white font-black uppercase tracking-widest py-6 px-12 rounded-3xl shadow-2xl shadow-primary/30 hover:bg-primary/90 transition-all hover:-translate-y-1 active:scale-95 disabled:opacity-75 disabled:cursor-not-allowed"
                        >
                            {isSaving ? <Loader2 className="animate-spin" size={20} /> : <Star fill="currentColor" size={20} />}
                            {isSaving ? 'Enregistrement...' : 'Valider la note'}
                        </button>
                    </div>
                </div>

                <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-primary/5 blur-[100px] rounded-full pointer-events-none"></div>
            </section>
        </div>
    );
};

export default MovieRatingPage;