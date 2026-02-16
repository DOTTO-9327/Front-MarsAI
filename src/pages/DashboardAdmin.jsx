import { useEffect, useState } from 'react'
import { Film, Users, Globe, Zap } from 'lucide-react'

const DashboardAdmin = () => {
  const [stats, setStats] = useState({
    filmsEvaluated: 482,
    totalFilms: 600,
    juryFinalized: 8,
    totalJury: 12,
    countries: 124,
    workshopOccupancy: 72,
    activeAccounts: 182,
    newAccountsToday: 8
  })

  return (
    <div className="min-h-screen py-6">
      {/* En-tête de la page */}
      <div className="mb-10">
        <h2 className="mb-8 font-bold text-5xl">VUE D'ENSEMBLE</h2>
        <p className="max-w-2xl text-light-gray font-medium text-lg leading-snug">
          Analyse détaillée de la progression du festival et des indicateurs de performance.
        </p>
      </div>

      {/* Grille des Cartes Statistiques */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        
        {/* Card 1: Films Évalués */}
        <div className="bg-white rounded-[40px] p-8 shadow-sm flex flex-col justify-between h-70">
          <div className="flex justify-between items-start">
            <div className="p-3 bg-blue-50 rounded-xl text-primary">
              <Film size={28} />
            </div>
            <span className="bg-blue-50 text-primary text-[10px] font-black px-4 py-2 rounded-full tracking-widest uppercase">
              Objectif : {stats.totalFilms}
            </span>
          </div>
          <div>
            <div className="text-5xl font-black mb-1">{stats.filmsEvaluated}</div>
            <div className="text-[11px] font-black text-light-gray tracking-widest uppercase mb-6">
              Films évalués par le jury
            </div>
            <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
              <div 
                className="bg-primary h-full rounded-full transition-all duration-1000" 
                style={{ width: `${(stats.filmsEvaluated / stats.totalFilms) * 100}%` }}
              ></div>
            </div>
            <div className="mt-3 text-[10px] font-black tracking-widest uppercase">
              {((stats.filmsEvaluated / stats.totalFilms) * 100).toFixed(1)}% complété
            </div>
          </div>
        </div>

        {/* Card 2: Jury */}
        <div className="bg-white rounded-[40px] p-8 shadow-sm flex flex-col justify-between h-70">
          <div className="flex justify-between items-start">
            <div className="p-3 bg-red-50 rounded-xl text-accent">
              <Users size={28} />
            </div>
            <span className="bg-red-50 text-accent text-[10px] font-black px-4 py-2 rounded-full tracking-widest uppercase">
              Quota: 100/juré
            </span>
          </div>
          <div>
            <div className="text-5xl font-black mb-1">{String(stats.juryFinalized).padStart(2, '0')}/{stats.totalJury}</div>
            <div className="text-[11px] font-black text-light-gray tracking-widest uppercase mb-6">
              Jurés ayant finalisé leur lot
            </div>
            <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
              <div 
                className="bg-accent h-full rounded-full transition-all duration-1000" 
                style={{ width: `${(stats.juryFinalized / stats.totalJury) * 100}%` }}
              ></div>
            </div>
            <div className="mt-3 text-[10px] font-black tracking-widest uppercase text-accent">
              En cours de délibération
            </div>
          </div>
        </div>

        {/* Card 3: Pays */}
        <div className="bg-white rounded-[40px] p-8 shadow-sm flex flex-col justify-between h-70">
          <div className="p-3 bg-green-50 rounded-xl text-emerald-500 w-fit">
            <Globe size={28} />
          </div>
          <div>
            <div className="text-5xl font-black mb-1">{stats.countries}</div>
            <div className="text-[11px] font-black text-light-gray tracking-widest uppercase mb-10">
              Pays représentés
            </div>
            <div className="text-[10px] font-black tracking-widest uppercase">
              Top Zone: <span className="text-mars-dark">Europe</span>
            </div>
          </div>
        </div>

        {/* Card 4: Workshops (Dark Card) */}
        <div className="bg-mars-dark rounded-[40px] p-8 shadow-sm flex flex-col justify-between h-70 text-white relative overflow-hidden">
          <Zap className="absolute top-8 right-8 text-accent opacity-80" size={24} fill="currentColor" />
          <div className="p-3 bg-white/10 rounded-xl text-accent w-fit">
            <Users size={28} />
          </div>
          <div className="flex flex-col items-center sm:items-start">
            <div className="text-6xl font-black mb-1">{stats.workshopOccupancy}%</div>
            <div className="text-[11px] font-black text-white/40 tracking-widest uppercase mb-6">
              Taux d'occupation workshops
            </div>
            <button className="w-full bg-primary hover:bg-blue-600 text-white font-bold py-4 px-6 rounded-xl text-sm tracking-wide transition-colors uppercase">
              Voir les évènements
            </button>
          </div>
        </div>
      </div>

      {/* Card Large: Comptes Réalisateurs */}
      <div className="bg-white rounded-[40px] p-10 shadow-sm flex justify-between items-center">
        <div className="flex flex-col gap-6">
            <div className="p-3 bg-blue-50 rounded-xl text-primary w-fit">
                <Film size={28} />
            </div>
            <div>
                <div className="text-6xl font-black mb-1">{stats.activeAccounts}</div>
                <div className="text-[11px] font-black text-light-gray tracking-widest uppercase">
                    Comptes réalisateurs actifs
                </div>
            </div>
        </div>
        <div className="text-right">
            <div className="text-primary text-5xl font-black">+{stats.newAccountsToday}</div>
            <div className="text-[11px] font-black text-light-gray tracking-widest uppercase mt-2">
                Aujourd'hui
            </div>
        </div>
      </div>
    </div>
  )
}

export default DashboardAdmin