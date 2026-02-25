import { useTranslation } from "react-i18next";

const ConferenceList = ({ agenda }) => {
  const { t } = useTranslation('program');

  return (
    <section className="mb-16 mt-28">
      <h2 className="text-4xl tracking-tight text-mars-dark mb-10 inline-block border-b-[5px] border-primary pb-4">
        {t('section.conferenceProgram')}
      </h2>

      {/* Liste des cartes */}
      <div className="flex flex-col gap-10">
        {agenda.map((item, idx) => (
          <article
            key={idx}
            className="bg-mars-light rounded-4xl px-8 py-6 md:py-8 flex flex-col md:flex-row md:items-center gap-4 md:gap-10 shadow-sm border border-transparent hover:border-primary/10 hover:shadow-lg transition-all duration-300 group"
          >
            {/* Heure */}
            <div className="text-primary text-3xl md:text-3xl font-black tracking-tight min-w-27.5">
              {item.time}
            </div>

            {/* Contenu Texte */}
            <div className="flex flex-col justify-center border-l-0 md:border-l-2 md:border-slate-100 md:pl-8 py-1">
              {/* Tag */}
              <span className="text-accent text-[0.65rem] font-bold uppercase tracking-[0.2em] mb-2">
                {item.tag}
              </span>

              {/* Titre */}
              <h3 className="text-mars-dark text-lg md:text-xl font-extrabold uppercase leading-tight group-hover:text-primary transition-colors">
                {item.title}
              </h3>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};

export default ConferenceList;