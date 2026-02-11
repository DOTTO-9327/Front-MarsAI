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

  // Initialisation de React Hook Form
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      director: { lang: 'FR', gender: 'M' },
      film: { lang: 'FR', duration: 60 },
      tech: { isHybrid: false, hasSubs: false },
    },
  })

  // --- SOUMISSION DU FORMULAIRE ---
  const onSubmit = async (data) => {
    setIsSubmitting(true)

    // Notification de chargement
    const loadingToast = toast.loading('Envoi du dossier en cours...')

    try {
      // CRÉATION DE L'OBJET FORMDATA
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

      // Réseaux Sociaux
      formData.append('facebook_url', data.director.social?.facebook || '')
      formData.append('instagram_url', data.director.social?.instagram || '')
      formData.append('twitter_url', data.director.social?.twitter || '')
      formData.append('youtube_url', data.director.social?.youtube || '')

      // --- MAPPING FILM ---
      formData.append('original_title', data.film.titleOriginal)
      formData.append('english_title', data.film.titleEnglish)
      formData.append('original_language', data.film.lang)
      formData.append('duration', data.film.duration)
      // formData.append('youtube_url_movie', data.film.youtube);
      
      if (data.film.videofile && data.film.videofile.length > 0) {
        formData.append('video_file', data.film.videofile[0])
      }
      formData.append('original_synopsis', data.film.synopsisFr)
      formData.append('english_synopsis', data.film.synopsisEn)

      // --- MAPPING TECH ---
      formData.append('is_hybrid', data.tech.isHybrid ? '1' : '0')
      formData.append('hasSubs', data.tech.hasSubs ? '1' : '0')
      formData.append('ia_tools', data.tech.toolsUsed)
      formData.append('creative_process', data.tech.creativeProcess)

      // --- FICHIER IMAGE ---
      if (data.tech.cover && data.tech.cover.length > 0) {
        formData.append('cover_image', data.tech.cover[0])
      }

      // --- ÉQUIPE ---
      if (data.team && data.team.length > 0) {
        formData.append('team', JSON.stringify(data.team))
      }

      // ============================================================
      // MODE SIMULATION (TEST SANS BACKEND)
      // ============================================================

    //   console.group("Données prêtes à l'envoi (FormData)")
    //   for (let pair of formData.entries()) {
    //     console.log(
    //       `%c${pair[0]}:`,
    //       'color: #3b82f6; font-weight: bold;',
    //       pair[1]
    //     )
    //   }
    //   console.groupEnd()

      // Simulation d'attente réseau (2 secondes)
    //   await new Promise((resolve) => setTimeout(resolve, 2000))

      // Pour tester le cas d'erreur, décommenter la ligne ci-dessous :
      // throw new Error("Simulation d'erreur serveur (500)");

      // ============================================================
      // VRAI APPEL API (À DÉCOMMENTER QUAND L'API EST PRÊTE)
      // ============================================================
      
            const response = await fetch('http://localhost:3000/submission', {
              method: 'POST',
              body: formData, // Le navigateur gère le Content-Type automatiquement
            })

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || "Erreur serveur");
            }
            
      // ============================================================

      // SUCCÈS
      toast.update(loadingToast, {
        render: 'Dossier envoyé avec succès ! 🎉',
        type: 'success',
        isLoading: false,
        autoClose: 5000,
        closeButton: true,
      })

      // Optionnel : Reset du formulaire après succès
      // reset();
    } catch (error) {
      console.error("Erreur d'envoi:", error)

      // ERREUR
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

  // --- B. GESTION DES ERREURS DE VALIDATION ---
  const onError = (errors) => {
    if (errors.tech?.cover) {
      toast.error("L'affiche du film est obligatoire !", {
        position: 'bottom-center',
        theme: 'colored',
      })
    } else if (Object.keys(errors).length > 0) {
      toast.warn('Veuillez corriger les champs en rouge.', {
        position: 'bottom-center',
        theme: 'colored',
      })
    }
  }

  return (
    <div className="bg-mars-light text-mars-dark selection:bg-primary w-full pt-20 pb-20 font-sans selection:text-white">
      <ToastContainer />

      <div className="animate-fade-in-up mx-auto max-w-6xl space-y-12 px-6">
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

          <TeamSection t={t} register={register} />

          <SubmitActions t={t} isSubmitting={isSubmitting} />
        </form>
      </div>
    </div>
  )
}

export default SubmissionPage
