import { ChevronDown } from 'lucide-react'

function BtnPagination({ page, onPageChange, totalInPage }) {
  return (
    <div className="mt-20 flex flex-col items-center gap-6">
      <div className="flex items-center gap-2">
        <button
          onClick={() => onPageChange(page - 1)}
          disabled={page === 1}
          className={`flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border border-slate-200 transition-colors ${
            page === 1
              ? 'cursor-not-allowed opacity-50'
              : 'text-light-gray hover:bg-mars-light'
          }`}
        >
          <ChevronDown className="rotate-90" size={18} />
        </button>

        <button className="bg-primary shadow-primary/30 flex h-10 w-10 cursor-default items-center justify-center rounded-full text-sm font-black text-white shadow-lg">
          {page}
        </button>
   
       
        <button
          onClick={() => onPageChange(page + 1)}
          disabled={totalInPage < 20}
          className={`flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border border-slate-200 transition-colors ${
            totalInPage < 20
              ? 'cursor-not-allowed opacity-50'
              : 'text-light-gray hover:bg-mars-light'
          }`}
        >
          <ChevronDown className="-rotate-90" size={18} />
        </button>
      </div>

      <span className="text-light-gray text-[10px] font-black tracking-[0.2em] uppercase">
        PAGE {page} - {totalInPage} FILMS SUR CETTE PAGE
      </span>
    </div>
  )
}

export default BtnPagination