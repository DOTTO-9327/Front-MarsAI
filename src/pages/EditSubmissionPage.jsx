import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useForm } from 'react-hook-form'
import { ToastContainer, toast } from 'react-toastify'
import { AlertCircle, Lock, Loader2, Save, Undo2 } from 'lucide-react'
import 'react-toastify/dist/ReactToastify.css'

import DirectorSection from '../components/submission/DirectorSection'
import FilmSection from '../components/submission/FilmSection'
import TechSection from '../components/submission/TechSection'
import TeamSection from '../components/submission/TeamSection'

/**
 * INTERFACE DE MODIFICATION (TEST VIA ID)
 * --------------------------------------------------------
 * Cette version utilise l'ID de la BDD pour faciliter les tests.
 */
const EditSubmissionPage = () => {
    const { id } = useParams() // On utilise l'ID pour le test
    const navigate = useNavigate()
    const { t } = useTranslation('submission')
    
    const [loading, setLoading] = useState(true)
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [submissionStatus, setSubmissionStatus] = useState('PENDING')
    const [adminComment, setAdminComment] = useState('')

    const {
        register,
        handleSubmit,
        watch,
        setValue,
        control,
        reset,
        formState: { errors },
    } = useForm()

    // 1. CHARGEMENT DES DONNÉES PAR ID
    useEffect(() => {
        const fetchSubmissionData = async () => {
            try {
                setLoading(true)
                // On appelle l'API avec l'ID de test
                const response = await fetch(`${import.meta.env.VITE_API_URL}/submission/${id}`)
                
                if (!response.ok) {
                    throw new Error("Impossible de trouver ce film avec l'ID fourni.")
                }

                const result = await response.json()
                const data = result.data

                // Mapping des données SQL vers le formulaire
                reset({
                    director: {
                        firstname: data.firstname,
                        lastname: data.lastname,
                        email: data.email,
                        gender: data.gender,
                        birthdate: data.birthdate ? data.birthdate.split('T')[0] : '',
                        phone: data.phone,
                        country: data.country,
                        city: data.city,
                        job: data.job,
                        social: {
                            facebook: data.facebook_url,
                            instagram: data.instagram_url,
                            twitter: data.twitter_url,
                            youtube: data.youtube_url
                        }
                    },
                    film: {
                        titleOriginal: data.original_title,
                        titleEnglish: data.english_title,
                        lang: data.original_language,
                        duration: data.duration,
                        synopsisFr: data.original_synopsis,
                        synopsisEn: data.english_synopsis
                    },
                    tech: {
                        isHybrid: data.is_hybrid === 1,
                        hasSubs: data.hasSubs === 1,
                        toolsUsed: data.ia_tools,
                        creativeProcess: data.creative_process
                    },
                    team: data.team ? JSON.parse(data.team) : []
                })

                setSubmissionStatus(data.status)
                setAdminComment(data.admin_comment)

            } catch (error) {
                toast.error(error.message)
            } finally {
                setLoading(false)
            }
        }

        if (id) fetchSubmissionData()
    }, [id, reset])

    // 2. LOGIQUE DE VERROUILLAGE (Désactivable pour tes tests si besoin)
    const isLocked = !['PENDING', 'NEEDS_CHANGES'].includes(submissionStatus?.toUpperCase())

    const onSubmit = async (data) => {
        setIsSubmitting(true)
        const loadingToast = toast.loading('Mise à jour en cours...')

        try {
            const formData = new FormData()
            
            // On envoie l'ID pour que le back sache quel film mettre à jour
            formData.append('id', id)

            formData.append('firstname', data.director.firstname)
            formData.append('lastname', data.director.lastname)
            formData.append('email', data.director.email)
            formData.append('original_title', data.film.titleOriginal)
            formData.append('duration', data.film.duration)
            formData.append('is_hybrid', data.tech.isHybrid ? '1' : '0')
            formData.append('hasSubs', data.tech.hasSubs ? '1' : '0')
            formData.append('ia_tools', data.tech.toolsUsed)
            formData.append('creative_process', data.tech.creativeProcess)

            if (data.film.videofile?.[0]) formData.append('video_file', data.film.videofile[0])
            if (data.tech.cover?.[0]) formData.append('cover_image', data.tech.cover[0])
            
            if (data.team?.length > 0) formData.append('team', JSON.stringify(data.team))

            const response = await fetch(`${import.meta.env.VITE_API_URL}/submission/update`, {
                method: 'PUT',
                body: formData,
            })

            if (!response.ok) throw new Error("Erreur lors de la sauvegarde.")

            toast.update(loadingToast, {
                render: 'Modifications de test enregistrées !',
                type: 'success',
                isLoading: false,
                autoClose: 3000,
            })

        } catch (error) {
            toast.update(loadingToast, {
                render: `Erreur : ${error.message}`,
                type: 'error',
                isLoading: false,
                autoClose: 3000,
            })
        } finally {
            setIsSubmitting(false)
        }
    }

    if (loading) return (
        <div className="min-h-screen bg-mars-light flex items-center justify-center">
            <Loader2 className="w-10 h-10 text-primary animate-spin" />
        </div>
    )

    return (
        <div className="bg-mars-light text-mars-dark w-full pt-28 pb-20 font-sans">
            <ToastContainer />
            <div className="mx-auto max-w-6xl space-y-8 px-6">
                
                {/* HEADER TEST */}
                <div className="bg-white p-8 rounded-[2.5rem] border border-slate-200 shadow-sm flex justify-between items-center">
                    <div className="flex items-center gap-4">
                        <div className="bg-primary/10 text-primary p-3 rounded-xl">
                            <Save size={24} />
                        </div>
                        <div>
                            <h1 className="text-xl font-black uppercase italic">Mode Edition <span className="text-primary">(ID: {id})</span></h1>
                            <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Test de l'interface E07-C</p>
                        </div>
                    </div>
                    <button onClick={() => navigate('/')} className="text-[10px] font-black uppercase text-primary flex items-center gap-2">
                        <Undo2 size={14} /> Accueil
                    </button>
                </div>

                {/* RETOUR ADMIN */}
                {adminComment && (
                    <div className="bg-red-50 border border-red-100 p-6 rounded-[2rem] flex items-start gap-4">
                        <AlertCircle className="text-red-500 shrink-0" />
                        <div>
                            <span className="text-[10px] font-black text-red-500 uppercase">Message Modération :</span>
                            <p className="text-sm font-bold italic mt-1">"{adminComment}"</p>
                        </div>
                    </div>
                )}

                {/* FORMULAIRE */}
                <form onSubmit={handleSubmit(onSubmit)} className={`space-y-12 ${isLocked ? 'opacity-50 pointer-events-none' : ''}`}>
                    {isLocked && (
                        <div className="bg-mars-dark text-white p-3 rounded-xl text-center text-[10px] font-black uppercase tracking-widest">
                            Film verrouillé (Statut: {submissionStatus})
                        </div>
                    )}
                    <DirectorSection t={t} register={register} errors={errors} />
                    <FilmSection t={t} register={register} errors={errors} watch={watch} setValue={setValue} />
                    <TechSection t={t} register={register} errors={errors} watch={watch} setValue={setValue} />
                    <TeamSection t={t} register={register} control={control} />

                    <div className="flex justify-center pt-8">
                        <button 
                            type="submit" 
                            disabled={isSubmitting || isLocked}
                            className="w-full md:w-96 bg-primary text-white py-6 rounded-[2rem] font-black uppercase tracking-widest shadow-xl shadow-primary/20 hover:scale-105 transition-all disabled:opacity-50"
                        >
                            {isSubmitting ? "Sauvegarde..." : "Mettre à jour le film"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default EditSubmissionPage