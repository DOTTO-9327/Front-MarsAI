import React from 'react';
import { ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const JuryMemberCard = ({ member }) => {
  const navigate = useNavigate();

  // --- CALCULS LOGIQUES ---
  // On calcule le pourcentage de progression 
  const progressPercentage = member.total > 0 
    ? Math.round((member.current / member.total) * 100) 
    : 0;

  // Un membre a terminé s'il a au moins 1 film assigné ET que current == total
  const isFinished = member.total > 0 && member.current === member.total;

  return (
    <article 
      onClick={() => navigate('/admin/jury/rating')}
      className="bg-white rounded-[2.5rem] p-8 shadow-sm border-2 border-slate-50 flex flex-col md:flex-row items-start md:items-center justify-between group hover:shadow-xl hover:border-primary/10 transition-all cursor-pointer gap-6 md:gap-0"
    >
      <div className="flex items-center gap-6 flex-1 w-full">
        
        {/* AVATAR DYNAMIQUE */}
        <div className={`shrink-0 w-16 h-16 rounded-2xl flex items-center justify-center font-black text-2xl text-white transition-colors shadow-md ${
          isFinished ? 'bg-green-500' : member.bgColor
        }`}>
          {member.initial}
        </div>

        {/* INFORMATIONS ET BARRE DE PROGRESSION */}
        <div className="flex-1 w-full pr-0 md:pr-8">
          <div className="flex justify-between items-end mb-3">
            <div>
              <h2 className="text-mars-dark text-xl font-black uppercase leading-tight mb-1">
                {member.name}
              </h2>
              <p className={`text-[11px] font-bold uppercase tracking-widest ${
                isFinished ? 'text-green-500' : 'text-light-gray'
              }`}>
                Statut : {isFinished ? 'Mission terminée' : member.activity}
              </p>
            </div>
            
            <div className="text-right">
              <span className={`font-black text-xl ${isFinished ? 'text-green-500' : 'text-mars-dark'}`}>
                {progressPercentage}%
              </span>
              <p className="text-[10px] font-black text-light-gray uppercase tracking-widest mt-1">
                {member.current} / {member.total} Films
              </p>
            </div>
          </div>

          {/* JAUGE DE PROGRESSION */}
          <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden">
            <div 
              className={`h-full transition-all duration-1000 ease-out ${isFinished ? 'bg-green-500' : 'bg-primary'}`} 
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
        </div>
      </div>

      {/* BOUTON D'ACTION LATÉRAL */}
      <button className="hidden md:flex shrink-0 w-14 h-14 rounded-2xl bg-slate-50 text-slate-400 items-center justify-center group-hover:bg-primary group-hover:text-white transition-all shadow-sm">
        <ChevronRight size={28} strokeWidth={3} />
      </button>
    </article>
  );
};

export default JuryMemberCard;