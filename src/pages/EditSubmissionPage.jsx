import React, { useEffect, useState } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useForm } from 'react-hook-form'
import { ToastContainer, toast } from 'react-toastify'
import { 
    AlertCircle, 
    Loader2, 
    Save, 
    Undo2, 
    CheckCircle2, 
    Clock, 
    RefreshCcw, 
    XCircle,
    Lock,
    FileWarning
} from 'lucide-react'
import 'react-toastify/dist/ReactToastify.css'

import DirectorSection from '../components/submission/DirectorSection'
import FilmSection from '../components/submission/FilmSection'
import TechSection from '../components/submission/TechSection'
import TeamSection from '../components/submission/TeamSection'

const EditSubmissionPage = () => {
    const { token } = useParams()
    const navigate = useNavigate()
    const { t } = useTranslation('submission')
    
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null) 
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [submissionStatus, setSubmissionStatus] = useState('PENDING')
    const [adminComment, setAdminComment] = useState('')
    const [movieId, setMovieId] = useState(null)

    const {
        register,
        handleSubmit,
        watch,
        setValue,
        control,
        reset,
        formState: { errors },
    } = useForm()

    const statusTranslations = {
        'PENDING': 'EN ATTENTE',
        'APPROVED': 'VALIDÉ',
        'REJECTED': 'REFUSÉ',
        'CHANGES_REQUESTED': 'À MODIFIER'
    }

    const getStatusTheme = (status) => {
        const s = status?.toUpperCase()
        switch(s) {
            case 'APPROVED': return { bg: 'bg-green-500/10 border-green-500/20 text-green-600', icon: <CheckCircle2 size={16} />, label: 'Validé' }
            case 'REJECTED': return { bg: 'bg-red-500/10 border-red-500/20 text-red-600', icon: <XCircle size={16} />, label: 'Refusé' }
            case 'CHANGES_REQUESTED': return { bg: 'bg-blue-500/10 border-blue-500/20 text-blue-600', icon: <RefreshCcw size={16} className="animate-spin-slow" />, label: 'À modifier' }
            default: return { bg: 'bg-orange-500/10 border-orange-500/20 text-orange-600', icon: <Clock size={16} />, label: 'En attente' }
        }
    }

    useEffect(() => {
        const fetchSubmissionData = async () => {
            if (!token || token === 'undefined') {
                setError("Le jeton d'accès est manquant.")
                setLoading(false)
                return
            }

            try {
                setLoading(true)
                const response = await fetch(`${import.meta.env.VITE_API_URL}/movie/edit-access/${token}`)
                
                if (!response.ok) {
                    const errorData = await response.json().catch(() => ({}))
                    throw new Error(errorData.message || "Lien de modification invalide ou expiré.")
                }

                const result = await response.json()
                const data = result.data

                setMovieId(data.id) 
                setSubmissionStatus(data.status)
                setAdminComment(data.last_comment || '') 

                reset({
                    director: {
                        firstname: data.firstname, lastname: data.lastname, email: data.email,
                        gender: data.gender, birthdate: data.birthdate ? data.birthdate.split('T')[0] : '',
                        phone: data.phone, country: data.country, city: data.city, job: data.job,
                        social: {
                            facebook: data.facebook_url, instagram: data.instagram_url,
                            twitter: data.twitter_url, youtube: data.youtube_url
                        }
                    },
                    film: {
                        titleOriginal: data.original_title, titleEnglish: data.english_title,
                        lang: data.original_language, duration: data.duration,
                        synopsisFr: data.original_synopsis, synopsisEn: data.english_synopsis
                    },
                    tech: {
                        isHybrid: data.is_hybrid === 1, hasSubs: data.hasSubs === 1,
                        toolsUsed: data.ia_tools, creativeProcess: data.creative_process
                    },
                    team: data.team ? (typeof data.team === 'string' ? JSON.parse(data.team) : data.team) : []
                })

            } catch (err) {
                setError(err.message)
            } finally {
                setLoading(false)
            }
        }
        fetchSubmissionData()
    }, [token, reset])

    // --- RENDU : CHARGEMENT ---
    if (loading) return (
        <div className="min-h-screen bg-mars-light flex items-center justify-center">
            <Loader2 className="w-10 h-10 text-primary animate-spin" />
        </div>
    )

    // --- RENDU : PAGE D'ERREUR (Si token invalide) ---
    if (error) return (
        <div className="min-h-screen bg-mars-light flex items-center justify-center px-6 font-sans">
            <div className="max-w-md w-full bg-white p-10 rounded-[3rem] shadow-xl border border-slate-200 text-center space-y-6">
                <div className="bg-red-50 w-20 h-20 rounded-full flex items-center justify-center mx-auto text-red-500">
                    <FileWarning size={40} />
                </div>
                <div className="space-y-2">
                    <h1 className="text-2xl font-black uppercase italic tracking-tight text-slate-900">Accès refusé</h1>
                    <p className="text-slate-500 font-medium">
                        {error}
                    </p>
                </div>
                <div className="pt-4">
                    <Link 
                        to="/" 
                        className="inline-flex items-center gap-2 bg-mars-dark text-white px-8 py-4 rounded-full font-black uppercase text-[10px] tracking-widest hover:scale-105 transition-transform"
                    >
                        <Undo2 size={16} /> Retour au site
                    </Link>
                </div>
            </div>
        </div>
    )

    const isLocked = ['APPROVED', 'REJECTED'].includes(submissionStatus?.toUpperCase())
    const theme = getStatusTheme(submissionStatus)

    const onSubmit = async (data) => {
        if (isLocked) return
        setIsSubmitting(true)
        const loadingToast = toast.loading('Mise à jour du film...')

        try {
            const formData = new FormData()
            
            const response = await fetch(`${import.meta.env.VITE_API_URL}/movie/update`, {
                method: 'PUT',
                body: formData,
            })

            if (!response.ok) throw new Error("Erreur lors de la sauvegarde.")
            toast.update(loadingToast, { render: 'Modifications enregistrées !', type: 'success', isLoading: false, autoClose: 3000 })
        } catch (err) {
            toast.update(loadingToast, { render: `Erreur : ${err.message}`, type: 'error', isLoading: false, autoClose: 3000 })
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <div className="bg-mars-light text-mars-dark w-full pt-28 pb-20 font-sans">
            <ToastContainer />
            <div className="mx-auto max-w-6xl space-y-8 px-6">
                
                {/* HEADER */}
                <div className="bg-white p-8 rounded-[2.5rem] border border-slate-200 shadow-sm flex flex-col md:flex-row justify-between items-center gap-6">
                    <div className="flex items-center gap-5">
                        <div className={`p-4 rounded-2xl ${theme.bg}`}>
                            {theme.icon}
                        </div>
                        <div>
                            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Gestion de dossier</span>
                            <div className="flex items-center gap-3 mt-1">
                                <h1 className="text-2xl font-black uppercase italic tracking-tighter">Edition du projet</h1>
                                <span className={`flex items-center gap-2 px-4 py-1.5 rounded-full border text-[11px] font-black uppercase tracking-widest shadow-sm ${theme.bg}`}>
                                    {theme.icon}
                                    {theme.label}
                                </span>
                            </div>
                        </div>
                    </div>
                    <button onClick={() => navigate('/')} className="group text-[10px] font-black uppercase text-slate-400 flex items-center gap-2 hover:text-primary transition-all">
                        <Undo2 size={14} className="group-hover:-translate-x-1 transition-transform" /> Retour Accueil
                    </button>
                </div>

                {/* NOTE DE L'ADMIN */}
                {adminComment && (
                    <div className="bg-white border-l-4 border-l-primary p-8 rounded-[2.5rem] shadow-sm flex items-start gap-6">
                        <div className="bg-primary/10 p-3 rounded-full text-primary shrink-0">
                            <AlertCircle size={24} />
                        </div>
                        <div>
                            <h4 className="text-[11px] font-black text-primary uppercase tracking-[0.2em] mb-2">Note du comité de sélection</h4>
                            <p className="text-lg font-medium italic text-slate-600 leading-relaxed">
                                "{adminComment}"
                            </p>
                        </div>
                    </div>
                )}

                {/* FORMULAIRE */}
                <form onSubmit={handleSubmit(onSubmit)} className={`space-y-12 transition-all duration-700 ${isLocked ? 'opacity-40 grayscale pointer-events-none' : ''}`}>
                    {isLocked && (
                        <div className="bg-mars-dark text-white p-6 rounded-4xl flex items-center justify-center gap-4 shadow-xl">
                            <Lock size={20} className="text-primary" />
                            <p className="text-[11px] font-black uppercase tracking-[0.2em]">
                                Ce dossier est verrouillé (Statut: {theme.label}).
                            </p>
                        </div>
                    )}
                    
                    <DirectorSection t={t} register={register} errors={errors} />
                    <FilmSection t={t} register={register} errors={errors} watch={watch} setValue={setValue} />
                    <TechSection t={t} register={register} errors={errors} watch={watch} setValue={setValue} />
                    <TeamSection t={t} register={register} control={control} />

                    {!isLocked && (
                        <div className="flex justify-center pt-8">
                            <button type="submit" disabled={isSubmitting} className="w-full md:w-96 bg-primary text-white py-6 rounded-[2.5rem] font-black uppercase tracking-widest shadow-xl shadow-primary/20 hover:scale-105 active:scale-95 transition-all">
                                {isSubmitting ? "Sauvegarde..." : "Mettre à jour mon dossier"}
                            </button>
                        </div>
                    )}
                </form>
            </div>
        </div>
    )
}

export default EditSubmissionPage