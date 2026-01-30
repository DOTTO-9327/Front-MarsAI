import React from 'react';
import { Film, BookOpen, Users, Lightbulb } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const ProjectSection = () => {
  const { t } = useTranslation();
  
  // Tableau des fonctionnalités traduit
  const translatedFeatures = t('project.features', { returnObjects: true });

  const icons = [
    <Film className="w-8 h-8 text-accent" />,
    <BookOpen className="w-8 h-8 text-accent" />,
    <Users className="w-8 h-8 text-accent" />,
    <Lightbulb className="w-8 h-8 text-accent" />
  ];

  return (
    <section className="bg-mars-light py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="w-16 h-1.5 bg-primary mb-12"></div>

        <header className="mb-20">
          <h2 className="text-4xl md:text-6xl font-extrabold text-mars-dark mb-8 tracking-tighter uppercase leading-none">
            {t('project.title')}
          </h2>
          <p className="text-lg md:text-xl text-mars-dark/80 max-w-4xl font-medium leading-relaxed">
            {t('project.intro')}
          </p>
        </header>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {translatedFeatures.map((item, index) => (
            <article 
              key={index} 
              className="bg-white p-10 rounded-4xl shadow-sm hover:shadow-xl transition-shadow duration-300 flex flex-col items-start gap-6"
            >
              <div className="p-0">
                {icons[index]} 
              </div>
              <div>
                <h3 className="text-3xl font-extrabold text-mars-dark mb-3 tracking-tight uppercase">
                  {item.title}
                </h3>
                <p className="text-xs font-bold text-mars-dark/60 leading-normal tracking-wider uppercase">
                  {item.desc}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectSection;