import { Search } from 'lucide-react'

const searchbar = () => {
  return (
    <div className="relative flex w-full  items-center">
      <div className="absolute left-4 text-slate-400">
        <Search size={20} />
      </div>
      <input
        className="h-14 w-full rounded-2xl border border-transparent bg-gray-100 py-2 pr-4 pl-12 text-sm text-slate-700 shadow-sm transition-all duration-300 placeholder:text-slate-400 hover:bg-gray-200 focus:border-slate-200 focus:bg-white focus:outline-none"
        placeholder="Rechercher un film ou un réalisateur"
      />
    </div>
  )
}

export default searchbar
