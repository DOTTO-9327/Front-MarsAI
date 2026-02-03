import React from 'react';
import { Target, Zap, Rocket } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const ObjectivesSection = () => {
  const { t } = useTranslation();

  const objectives = [
    {
      icon: <Target className="w-12 h-12 text-accent" />,
      title: t('objectives.humain.title'),
      desc: t('objectives.humain.desc')
    },
    {
      icon: <Zap className="w-12 h-12 text-accent" />,
      title: t('objectives.challenge.title'),
      desc: t('objectives.challenge.desc')
    },
    {
      icon: <Rocket className="w-12 h-12 text-accent" />,
      title: t('objectives.futurs.title'),
      desc: t('objectives.futurs.desc')
    }
  ];

  return (
    <section className="bg-mars-dark py-24 px-6 md:px-12 text-white">
      <div className="max-w-7xl mx-auto">
        
        <header className="mb-20">
          <h2 className="tracking-tighter">
            {t('objectives.title_main')} <br />
            <span className="text-accent">{t('objectives.title_accent')}</span>
          </h2>
          <div className="w-16 h-1.5 bg-white mt-10" />
        </header>

        {/* Grille des objectifs */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {objectives.map((obj, idx) => (
            <article 
              key={idx} 
              className="bg-white/5 border border-white/10 p-10 rounded-4xl flex flex-col items-start hover:bg-white/10 transition-all duration-300 group"
            >
              <div className="mb-8 transform group-hover:scale-110 transition-transform duration-300">
                {obj.icon}
              </div>
              <h3 className="text-3xl font-black mb-6 tracking-tight leading-tight uppercase text-white">
                {obj.title}
              </h3>
              <p className="text-gray-400 font-medium leading-relaxed">
                {obj.desc}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ObjectivesSection;