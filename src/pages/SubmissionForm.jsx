import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useForm } from 'react-hook-form';

// Composants
import HeaderSection from '../components/submission/HeaderSection';
import DirectorSection from '../components/submission/DirectorSection';
import FilmSection from '../components/submission/FilmSection';
import TechSection from '../components/submission/TechSection';
import TeamSection from '../components/submission/TeamSection';
import SubmitActions from '../components/submission/SubmitActions';

const SubmissionPage = () => {
    const { t } = useTranslation();
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Initialisation de React Hook Form
    const {
        register,
        handleSubmit,
        watch,
        setValue,
        formState: { errors }
    } = useForm({
        defaultValues: {
            director: { lang: 'FR', gender: 'M' },
            film: { lang: 'FR', duration: 60 },
            tech: { isHybrid: false, hasSubs: false }
        }
    });

    const onSubmit = async (data) => {
        setIsSubmitting(true);

        try {
            // --- 1. MAPPING DES DONNÉES (Pour correspondre à ta BDD SQL) ---
            // Transformation de l'objet imbriqué de RHF en objet pour notre API
            const sqlPayload = {
                // Table DIRECTOR
                firstname: data.director.firstname,
                lastname: data.director.lastname,
                email: data.director.email,
                gender: data.director.gender,
                birthdate: data.director.birthdate,
                country: data.director.country,
                city: data.director.city || null,
                job: data.director.job || null,
                phone: data.director.phone,
                facebook_url: data.director.social?.facebook || null,
                instagram_url: data.director.social?.instagram || null,
                twitter_url: data.director.social?.twitter || null,
                youtube_url: data.director.social?.youtube || null, 

                // Table MOVIE
                original_title: data.film.titleOriginal,
                english_title: data.film.titleEnglish,
                youtube_url: data.film.youtube, 
                duration: parseInt(data.film.duration, 10),
                original_language: data.film.lang,
                original_synopsis: data.film.synopsisFr,
                english_synopsis: data.film.synopsisEn,
                is_hybrid: data.tech.isHybrid,
                hasSubs: data.tech.hasSubs,
                ia_tools: data.tech.toolsUsed,
                creative_process: data.tech.creativeProcess,

                // Intégrer objet FormData pour l'image
                cover_image_file: data.tech.cover ? data.tech.cover[0] : null
            };

            // Simulation API
            console.log("Payload prêt pour l'API (SQL) :", sqlPayload);

            // Simuler un délai réseau
            await new Promise(resolve => setTimeout(resolve, 2000));

            alert("Dossier envoyé avec succès !");
            // navigate('/succes'); 

        } catch (error) {
            console.error("Erreur lors de l'envoi", error);
            alert("Une erreur est survenue.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="w-full bg-mars-light text-mars-dark font-sans pb-20 selection:bg-primary selection:text-white pt-20">
            <div className="max-w-6xl mx-auto px-6 space-y-12 animate-fade-in-up">

                <HeaderSection t={t} />

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-12">

                    <DirectorSection
                        t={t}
                        register={register}
                        errors={errors}
                    />

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

                    <TeamSection
                        t={t}
                        register={register}
                    />

                    <SubmitActions
                        t={t}
                        isSubmitting={isSubmitting}
                    />

                </form>
            </div>
        </div>
    );
};

export default SubmissionPage;