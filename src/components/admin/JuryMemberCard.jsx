import React from 'react';
import { ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const JuryMemberCard = ({ member }) => {
  const navigate = useNavigate();
  const isFinished = member.progress === 100;

  return (
    <article 
      onClick={() => navigate('/admin/jury/rating')}
      className="bg-white rounded-4xl p-8 shadow-sm border border-slate-100 flex items-center justify-between group hover:shadow-md transition-all cursor-pointer"
    >
      <div className="flex items-center gap-6 flex-1">
        {/* Avatar avec initiale */}
        <div className={`w-16 h-16 rounded-2xl flex items-center justify-center font-black text-2xl transition-colors ${
          isFinished ? 'bg-green-500 text-white' : 'bg-slate-100 text-slate-400 group-hover:bg-primary/10'
        }`}>
          {member.name.charAt(0)}
        </div>

        {/* Informations et Barre de progression */}
        <div className="flex-1">
          <div className="flex justify-between items-end mb-2">
            <div>
              <h2 className="text-mars-dark text-xl font-black uppercase leading-tight">
                {member.name}
              </h2>
              <p className={`text-xs font-bold uppercase tracking-widest ${
                isFinished ? 'text-green-500' : 'text-light-gray'
              }`}>
                Activité : {member.activity}
              </p>
            </div>
            <div className="text-right">
              <span className="text-mars-dark font-black text-sm">{member.progress}%</span>
              <p className="text-[10px] font-black text-light-gray uppercase tracking-widest">
                {member.current}/{member.total} Films
              </p>
            </div>
          </div>

          <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden">
            <div 
              className={`h-full transition-all duration-1000 ${isFinished ? 'bg-green-500' : 'bg-primary'}`} 
              style={{ width: `${member.progress}%` }}
            />
          </div>
        </div>
      </div>

      {/* Bouton d'action latéral */}
      <button className="ml-8 w-12 h-12 rounded-2xl bg-slate-50 text-slate-400 flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-all">
        <ChevronRight size={24} strokeWidth={3} />
      </button>
    </article>
  );
};

export default JuryMemberCard;