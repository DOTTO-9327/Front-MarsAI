import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useForm } from 'react-hook-form'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import HeaderSection from '../components/submission/HeaderSection'
import DirectorSection from '../components/submission/DirectorSection'
import FilmSection from '../components/submission/FilmSection'
import TechSection from '../components/submission/TechSection'
import TeamSection from '../components/submission/TeamSection'
import SubmitActions from '../components/submission/SubmitActions'

const SubmissionPage = () => {
  const { t } = useTranslation('submission')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    control, // <-- CRUCIAL : nécessaire pour piloter le tableau dynamique
    formState: { errors },
  } = useForm({
    defaultValues: {
      director: { lang: 'FR', gender: 'M' },
      film: { lang: 'FR', duration: 60 },
      tech: { isHybrid: false, hasSubs: false },
      team: [],
    },
  })

  const onSubmit = async (data) => {
    setIsSubmitting(true)
    const loadingToast = toast.loading('Envoi du dossier en cours...')

    try {
      const formData = new FormData()

      // --- MAPPING RÉALISATEUR ---
      formData.append('firstname', data.director.firstname)
      formData.append('lastname', data.director.lastname)
      formData.append('email', data.director.email)
      formData.append('gender', data.director.gender)
      formData.append('birthdate', data.director.birthdate)
      formData.append('phone', data.director.phone)
      formData.append('country', data.director.country)
      formData.append('city', data.director.city || '')
      formData.append('job', data.director.job || '')
      formData.append('facebook_url', data.director.social?.facebook || '')
      formData.append('instagram_url', data.director.social?.instagram || '')
      formData.append('twitter_url', data.director.social?.twitter || '')
      formData.append('youtube_url', data.director.social?.youtube || '')

      // --- MAPPING FILM ---
      formData.append('original_title', data.film.titleOriginal)
      formData.append('english_title', data.film.titleEnglish)
      formData.append('original_language', data.film.lang)
      formData.append('duration', data.film.duration)
      if (data.film.videofile?.[0]) {
        formData.append('video_file', data.film.videofile[0])
      }
      formData.append('original_synopsis', data.film.synopsisFr)
      formData.append('english_synopsis', data.film.synopsisEn)

      // --- MAPPING TECH ---
      formData.append('is_hybrid', data.tech.isHybrid ? '1' : '0')
      formData.append('hasSubs', data.tech.hasSubs ? '1' : '0')
      formData.append('ia_tools', data.tech.toolsUsed)
      formData.append('creative_process', data.tech.creativeProcess)
      if (data.tech.cover?.[0]) {
        formData.append('cover_image', data.tech.cover[0])
      }

      // --- ÉQUIPE (Tableau dynamique envoyé en JSON) ---
      if (data.team && data.team.length > 0) {
        // formData.append('team', JSON.stringify(data.team))

        if (data.team && data.team.length > 0) {
          data.team.forEach((member, index) => {
            Object.keys(member).forEach((key) => {
              formData.append(`team[${index}][${key}]`, member[key] || '')
            })
          })
        }
      }

      console.log('📋 Données brutes du formulaire:', data)
      console.log('📤 FormData (paires clés/valeurs):', [...formData])

      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/submission`,
        {
          method: 'POST',
          body: formData,
        }
      )

      console.log('📥 Statut HTTP réponse:', response.status, response.statusText)

      if (!response.ok) {
        const errorData = await response.json()
        console.error('❌ Détails de l\'erreur renvoyée par le backend:', errorData)
        const detailedMsg = errorData.error || (errorData.errors ? JSON.stringify(errorData.errors) : null) || errorData.message || 'Erreur serveur'
        throw new Error(detailedMsg)
      }

      toast.update(loadingToast, {
        render: 'Dossier envoyé avec succès ! 🎉',
        type: 'success',
        isLoading: false,
        autoClose: 5000,
        closeButton: true,
      })
    } catch (error) {
      console.error('💥 Erreur capturée dans onSubmit:', error)
      toast.update(loadingToast, {
        render: `Erreur : ${error.message}`,
        type: 'error',
        isLoading: false,
        autoClose: 5000,
        closeButton: true,
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const onError = (errors) => {
    if (errors.tech?.cover) {
      toast.error("L'affiche du film est obligatoire !")
    } else {
      toast.warn('Veuillez corriger les champs en rouge.')
    }
  }

  return (
    <div className="bg-mars-light text-mars-dark selection:bg-primary w-full pt-20 pb-20 font-sans">
      <ToastContainer />
      <div className="mx-auto max-w-6xl space-y-12 px-6">
        <HeaderSection t={t} />
        <form onSubmit={handleSubmit(onSubmit, onError)} className="space-y-12">
          <DirectorSection t={t} register={register} errors={errors} />
          <FilmSection
            t={t}
            register={register}
            errors={errors}
            watch={watch}
            setValue={setValue}
          />
          <TechSection
            t={t}
            register={register}
            errors={errors}
            watch={watch}
            setValue={setValue}
          />

          {/* Passage de control à TeamSection */}
          <TeamSection t={t} register={register} control={control} />

          <SubmitActions t={t} isSubmitting={isSubmitting} />
        </form>
      </div>
    </div>
  )
}

export default SubmissionPage
