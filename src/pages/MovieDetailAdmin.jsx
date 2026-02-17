import { useParams, useNavigate, useLocation } from 'react-router-dom'
import { ArrowLeft, User, Globe, BookOpen, Cpu, Copy, Loader2, ChevronDown } from 'lucide-react'
import { useState, useEffect } from 'react'

const MovieDetailAdmin = () => {
    const { title } = useParams() // Le nom du film dans l'URL
    const location = useLocation()
    const navigate = useNavigate()
    
    // On récupère l'ID passé par CardMovie via le state
    const id = location.state?.movieId
    
    const [movie, setMovie] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [updating, setUpdating] = useState(false)

    const serverUrl = 'http://localhost:3000/'

    const statusTranslations = {
        'PENDING': 'EN ATTENTE',
        'APPROVED': 'VALIDÉ',
        'REJECTED': 'REFUSÉ',
        'EN ATTENTE': 'EN ATTENTE',
        'VALIDÉ': 'VALIDÉ',
        'REFUSÉ': 'REFUSÉ'
    }

    useEffect(() => {
        // Sécurité : si on arrive sur la page sans ID (ex: refresh F5), 
        // on redirige vers la liste car le state est perdu
        if (!id) {
            navigate('/admin/movie')
            return
        }

        const fetchMovieDetail = async () => {
            try {
                setLoading(true)
                const response = await fetch(`${import.meta.env.VITE_API_URL}/movie/${id}`)
                if (!response.ok) throw new Error('Film introuvable')
                const result = await response.json()
                setMovie(result.data)
            } catch (err) {
                setError(err.message)
            } finally {
                setLoading(false)
            }
        }
        fetchMovieDetail()
    }, [id, navigate])

    const handleStatusChange = async (newStatus) => {
        try {
            setUpdating(true)
            const response = await fetch(`${import.meta.env.VITE_API_URL}/movie/${id}/status`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ status: newStatus }),
            })
            if (!response.ok) throw new Error('Erreur API')
            setMovie(prev => ({ ...prev, status: newStatus }))
        } catch (err) {
            alert("Erreur de mise à jour")
        } finally {
            setUpdating(false)
        }
    }

    if (loading) return <div className="flex h-96 items-center justify-center"><Loader2 className="animate-spin text-primary" size={40} /></div>
    if (error) return <p className="p-10 text-center text-red-500 font-bold">Erreur : {error}</p>
    if (!movie) return null

    const getStatusTheme = (status) => {
        const s = status?.toUpperCase()
        if (s === 'VALIDÉ' || s === 'APPROVED') {
            return {
                container: 'bg-green-50 border-green-200 text-green-700',
                select: 'border-green-300 text-green-800'
            }
        }
        if (s === 'REFUSÉ' || s === 'REJECTED') {
            return {
                container: 'bg-red-50 border-red-200 text-red-700',
                select: 'border-red-300 text-red-800'
            }
        }
        return {
            container: 'bg-orange-50 border-orange-200 text-orange-700',
            select: 'border-orange-300 text-orange-800'
        }
    }

    const theme = getStatusTheme(movie.status)
    const displayStatus = statusTranslations[movie.status?.toUpperCase()] || movie.status

    return (
        <div className="mx-auto max-w-5xl py-6 min-h-screen">
            <button onClick={() => navigate(-1)} className="mb-6 flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-primary hover:opacity-70 transition-all">
                <ArrowLeft size={16} /> Retour Liste des films
            </button>

            {/* Hero Section */}
            <div className="relative mb-8 aspect-video w-full overflow-hidden rounded-[40px] shadow-2xl bg-mars-dark border border-gray-100">
                <img src={`${serverUrl}${movie.cover_image}`} className="h-full w-full object-cover" alt={movie.original_title} />
                <div className="absolute inset-0 flex items-center justify-center bg-black/10">
                    <div className="flex h-20 w-20 items-center justify-center rounded-full bg-accent text-white shadow-xl transition-transform hover:scale-110">
                        <div className="ml-1 h-0 w-0 border-b-10 border-l-18 border-t-10 border-b-transparent border-l-white border-t-transparent"></div>
                    </div>
                </div>
            </div>

            <div className="mb-8 rounded-[40px] bg-white p-10 shadow-sm border border-gray-100">
                <div className="flex flex-col items-start justify-between gap-8 md:flex-row">
                    <div className="flex-1">
                        <h1 className="mb-8 text-4xl font-black uppercase tracking-tight text-mars-dark">{movie.original_title}</h1>
                        <div className="flex flex-wrap gap-12">
                            <div className="flex items-center gap-4">
                                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gray-50 border border-gray-100"><User className="text-accent" size={24} /></div>
                                <div>
                                    <p className="text-[10px] font-bold uppercase text-light-gray tracking-widest">Réalisateur</p>
                                    <p className="font-bold text-mars-dark">
                                        {movie.firstname && movie.lastname 
                                            ? `${movie.firstname} ${movie.lastname}` 
                                            : `Réalisateur #${movie.director_id}`}
                                    </p>
                                </div>
                            </div>
                            <div className="flex items-center gap-4">
                                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gray-50 border border-gray-100"><Globe className="text-primary" size={24} /></div>
                                <div>
                                    <p className="text-[10px] font-bold uppercase text-light-gray tracking-widest">Origine</p>
                                    <p className="font-bold text-mars-dark">{movie.original_language || 'France'}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className={`w-full rounded-3xl p-6 md:w-72 border transition-all duration-300 relative ${theme.container}`}>
                        <label className="mb-3 block text-[10px] font-black uppercase tracking-widest opacity-80">
                            Statut actuel : {updating ? 'Mise à jour...' : displayStatus}
                        </label>
                        
                        <div className="relative">
                            <select
                                value="" 
                                onChange={(e) => handleStatusChange(e.target.value)}
                                disabled={updating}
                                className={`w-full cursor-pointer appearance-none rounded-2xl border-2 bg-white/90 p-4 text-sm font-black outline-none transition-all shadow-sm pr-10 hover:bg-white ${theme.select}`}
                            >
                                <option value="" disabled>MODIFIER LE STATUT</option>
                                <option value="EN ATTENTE" className="text-orange-700 font-bold">⏳ EN ATTENTE</option>
                                <option value="VALIDÉ" className="text-green-700 font-bold">✅ VALIDÉ</option>
                                <option value="REFUSÉ" className="text-red-700 font-bold">❌ REFUSÉ</option>
                            </select>
                            <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none opacity-50" size={18} />
                        </div>
                    </div>
                </div>

                <div className="mt-12 pt-8 border-t border-gray-50">
                    <p className="mb-3 text-[10px] font-bold uppercase text-light-gray tracking-widest">URL du film</p>
                    <div className="flex gap-2">
                        <input readOnly value={`${window.location.origin}/movie/${movie.id}`} className="flex-1 rounded-2xl border border-gray-100 bg-gray-50 px-5 py-4 font-mono text-xs text-gray-400 outline-none" />
                        <button onClick={() => navigator.clipboard.writeText(`${window.location.origin}/movie/${movie.id}`)} className="rounded-2xl bg-mars-dark px-8 py-4 text-xs font-bold uppercase text-white hover:bg-black transition-all active:scale-95 flex items-center gap-2 shadow-lg">
                            <Copy size={14} /> Copier
                        </button>
                    </div>
                </div>
            </div>

            <div className="rounded-[40px] bg-mars-dark p-12 text-white shadow-2xl">
                <div className="mb-12">
                    <div className="mb-6 flex items-center gap-3">
                        <BookOpen className="text-accent" size={24} />
                        <h3 className="text-sm font-black uppercase tracking-[0.2em] text-accent">Synopsis</h3>
                    </div>
                    <p className="max-w-3xl text-lg font-medium leading-relaxed text-gray-300 italic opacity-90">
                        "{movie.original_synopsis || "Aucun synopsis disponible."}"
                    </p>
                </div>

                <div>
                    <div className="mb-6 flex items-center gap-3">
                        <Cpu className="text-primary" size={24} />
                        <h3 className="text-sm font-black uppercase tracking-[0.2em] text-primary">Tech Stack & IA</h3>
                    </div>
                    <div className="flex flex-wrap gap-4">
                        {movie.ia_tools ? movie.ia_tools.split(',').map(tech => (
                            <span key={tech} className="rounded-xl border border-white/10 bg-white/5 px-6 py-3 text-[11px] font-black uppercase tracking-widest hover:bg-primary transition-all cursor-default">
                                {tech.trim()}
                            </span>
                        )) : <span className="text-gray-500 italic">Non renseigné</span>}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MovieDetailAdmin