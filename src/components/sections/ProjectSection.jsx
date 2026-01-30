import React from 'react';
import { Film, BookOpen, Users, Lightbulb } from 'lucide-react';

const ProjectSection = () => {
  const features = [
    {
      icon: <Film className="w-8 h-8 text-accent" />,
      title: "1 MINUTE",
      description: "FORMAT ULTRA-COURT POUR MAXIMISER L'IMPACT CRÉATIF."
    },
    {
      icon: <BookOpen className="w-8 h-8 text-accent" />,
      title: "GRATUITÉ",
      description: "CONFÉRENCES ET WORKSHOPS ACCESSIBLES À TOUS."
    },
    {
      icon: <Users className="w-8 h-8 text-accent" />,
      title: "POUR TOUS",
      description: "PROFESSIONNELS, ÉTUDIANTS ET CURIEUX."
    },
    {
      icon: <Lightbulb className="w-8 h-8 text-accent" />,
      title: "EXPERTISE",
      description: "RENCONTREZ LES LEADERS MONDIAUX DE L'IA."
    }
  ];

  return (
    <section className="bg-mars-light py-24 px-6">
      <div className="max-w-7xl mx-auto">
        
        <div className="w-16 h-1.5 bg-primary mb-12"></div>

        <header className="mb-20">
          <h2 className="text-mars-dark mb-8 tracking-tighter uppercase">
            LE PROJET MARS.A.I
          </h2>
          <p className="text-lg md:text-xl text-mars-dark/80 max-w-4xl font-medium leading-relaxed">
            Un événement hybride unique en France, réunissant la fine fleur de l'IA générative 
            et de la création cinématographique.
          </p>
        </header>

        {/* Grille de cartes */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((item, index) => (
            <article 
              key={index} 
              className="bg-white p-10 rounded-[32px] shadow-sm hover:shadow-xl transition-shadow duration-300 flex flex-col items-start gap-6"
            >
              <div className="p-0">
                {item.icon}
              </div>
              <div>
                <h3 className="text-3xl font-extrabold text-mars-dark mb-3 tracking-tight uppercase">
                  {item.title}
                </h3>
                <p className="text-xs font-bold text-mars-dark/60 leading-normal tracking-wider uppercase">
                  {item.description}
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