import React from 'react';
import { useTranslation } from 'react-i18next';
import { ArrowRight } from 'lucide-react';
import Button from '../ui/Button';
import { useNavigate } from 'react-router-dom';

const FormatSelection = () => {
    const navigate = useNavigate();
    const { t } = useTranslation();
    
    const steps = [
        {
            title: t('project.features.0.title'),       
            subtitle: t('project.features.0.desc'),     
            description: t('project.features.0.desc') 
        },
        {
            title: t('project.features.1.title'), 
            subtitle: t('project.features.1.desc'), 
            description: t('project.features.1.desc')
        },
    ];

    return (
        <section className="bg-mars-light py-20 px-4 md:px-8 font-sans">
            <div className="max-w-7xl mx-auto">

                <header className="text-center mb-16 space-y-4 animate-fade-in-up">
                    <h2 className="text-4xl md:text-6xl font-black text-mars-dark uppercase tracking-tight">
                        {t('format.title')}
                    </h2>
                    <p className="text-gray-500 uppercase tracking-widest text-sm md:text-base font-medium">
                        {t('format.subtitle')}
                    </p>
                </header>

                {/* Grille des cartes */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
                    {[0, 1, 2, 3].map((index) => (
                        <article
                            key={index}
                            className="bg-white rounded-4xl p-8 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col items-start h-full border border-transparent hover:border-primary/10"
                        >
                            <h3 className="text-primary text-3xl font-bold mb-3 uppercase leading-none">
                                {t(`format.steps.${index}.title`)}
                            </h3>
                            <span className="text-accent text-xs font-bold uppercase tracking-widest mb-4 block">
                                {t(`format.steps.${index}.subtitle`)}
                            </span>
                            <p className="text-gray-500 text-[0.7rem] font-bold uppercase leading-relaxed tracking-wide">
                                {t(`format.steps.${index}.description`)}
                            </p>
                        </article>
                    ))}
                </div>

                <div className="flex justify-center">
                    <Button
                        variant="primary"
                        size="default"
                        icon={ArrowRight}
                        onClick={() => navigate('/soumettre')}
                    >
                        {t('hero.cta')} 
                    </Button>
                </div>

            </div>
        </section>
    );
};

export default FormatSelection;