import { useTranslation } from "react-i18next";
import { Loader2, Clock } from "lucide-react";

const ConferenceList = ({ events, isLoading }) => {
  const { t } = useTranslation('program');

  // Filtrage : Uniquement les événements SANS réservation obligatoire
  const freeEvents = events.filter(event => 
    (event.registration_required === 0 || event.registration_required === false) && 
    event.status === 'PUBLISHED'
  ).sort((a, b) => new Date(a.start_at) - new Date(b.start_at));

  if (isLoading) return (
    <div className="flex justify-center py-20">
      <Loader2 className="animate-spin text-primary" size={40} />
    </div>
  );

  return (
    <section className="mb-16 mt-28">
      <h2 className="text-4xl tracking-tight text-mars-dark mb-10 inline-block border-b-[5px] border-primary pb-4 font-black uppercase italic">
        {t('section.conferenceProgram')}
      </h2>

      <div className="flex flex-col gap-6">
        {freeEvents.length > 0 ? freeEvents.map((item) => (
          <article
            key={item.id}
            className="bg-mars-light rounded-4xl px-8 py-6 md:py-8 flex flex-col md:flex-row md:items-center gap-4 md:gap-10 shadow-sm border border-transparent hover:border-primary/10 hover:shadow-lg transition-all duration-300 group"
          >
            {/* Heure formatée */}
            <div className="text-primary text-3xl font-black tracking-tighter min-w-30">
              {new Date(item.start_at).toLocaleTimeString('fr-FR', { 
                hour: '2-digit', 
                minute: '2-digit' 
              })}
            </div>

            {/* Contenu Texte */}
            <div className="flex flex-col justify-center border-l-0 md:border-l-2 md:border-slate-200 md:pl-8 py-1">
              {/* Tag Dynamique (Lieu ou Type) */}
              <span className="text-accent text-[0.65rem] font-black uppercase tracking-[0.2em] mb-2">
                {item.location || "MAIN STAGE"}
              </span>

              {/* Titre */}
              <h3 className="text-mars-dark text-xl md:text-2xl font-black uppercase leading-tight group-hover:text-primary transition-colors italic tracking-tight">
                {item.title}
              </h3>
              
              {/* Description courte si elle existe */}
              <p className="text-slate-500 text-sm mt-2 line-clamp-2 font-medium">
                {item.description}
              </p>
            </div>
          </article>
        )) : (
          <div className="p-10 text-center border-2 border-dashed border-slate-100 rounded-3xl">
             <p className="text-slate-400 font-bold uppercase tracking-widest text-xs">Aucune conférence en accès libre programmée pour le moment.</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default ConferenceList;