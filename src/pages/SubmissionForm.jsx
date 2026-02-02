import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useForm } from 'react-hook-form';
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
            film: { lang: 'FR' },
            tech: { isHybrid: false, hasSubs: false }
        }
    });

    const onSubmit = async (data) => {
        setIsSubmitting(true);
        try {
            // Simulation API
            console.log("Données valides envoyées :", data);
            await new Promise(resolve => setTimeout(resolve, 2000));
            alert("Dossier envoyé avec succès !");
        } catch (error) {
            console.error(error);
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