import { ChevronDown } from 'lucide-react'

function BtnPagination({ page, onPageChange, totalPages, totalItems }) {
  // On ne rend rien s'il n'y a qu'une seule page ou aucune donnée
  if (!totalPages || totalPages <= 1) return null;

  // Calcul des numéros de page à afficher (logique simple)
  const pages = [];
  for (let i = 1; i <= totalPages; i++) {
    // On affiche tout si peu de pages, sinon on peut limiter (optionnel)
    pages.push(i);
  }

  return (
    <div className="mt-16 flex flex-col items-center gap-6">
      <div className="flex items-center gap-2">
        {/* BOUTON PRÉCÉDENT */}
        <button
          onClick={() => onPageChange(page - 1)}
          disabled={page === 1}
          className={`w-10 h-10 flex items-center justify-center rounded-full border border-slate-200 transition-colors ${page === 1
              ? 'opacity-30 cursor-not-allowed'
              : 'text-light-gray hover:bg-mars-light cursor-pointer'
            }`}
        >
          <ChevronDown className="rotate-90" size={18} />
        </button>

        {/* NUMÉROS DE PAGE DYNAMIQUES */}
        {pages.map((p) => (
          <button
            key={p}
            onClick={() => onPageChange(p)}
            className={`w-10 h-10 flex items-center justify-center rounded-full font-black text-sm transition-all ${page === p
                ? 'bg-primary text-white shadow-lg shadow-primary/30'
                : 'border border-slate-200 text-light-gray hover:bg-mars-light cursor-pointer'
              }`}
          >
            {p}
          </button>
        ))}

        {/* BOUTON SUIVANT */}
        <button
          onClick={() => onPageChange(page + 1)}
          disabled={page === totalPages}
          className={`w-10 h-10 flex items-center justify-center rounded-full border border-slate-200 transition-colors ${page === totalPages
              ? 'opacity-30 cursor-not-allowed'
              : 'text-light-gray hover:bg-mars-light cursor-pointer'
            }`}
        >
          <ChevronDown className="-rotate-90" size={18} />
        </button>
      </div>

      {/* TEXTE D'INFORMATION */}
      <span className="text-[10px] font-black uppercase tracking-[0.2em] text-light-gray">
        PAGE {page} SUR {totalPages} — {totalItems} FILMS TROUVÉS
      </span>
    </div>
  )
}

export default BtnPagination