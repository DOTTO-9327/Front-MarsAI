import { useTranslation } from 'react-i18next';
import ProgramHeader from '../components/program/ProgramHeader';
import ConferenceList from '../components/program/ConferenceList';
import AccessSection from '../components/program/AccessSection';
import WorkshopGrid from '../components/program/WorkshopGrid';

const ProgrammePage = () => {
  const { t } = useTranslation();

  const agenda = [
    { time: "09:30", tag: "SOCIAL", title: "Accueil & Café Networking" },
    { time: "10:30", tag: "KEYNOTE", title: "Conférence d'ouverture : L'IA au service du Cinéma" },
    { time: "13:00", tag: "BREAK", title: "Déjeuner Libre" },
    { time: "14:30", tag: "CINÉMA", title: "Projection Sélection Officielle" },
    { time: "16:30", tag: "TALK", title: "Table Ronde : Futurs Souhaitables" },
    { time: "19:00", tag: "AWARDS", title: "Grand Prix & Cérémonie de Clôture" },
    { time: "21:00", tag: "PARTY", title: "MARS.A.I Night – DJ Set Immersif" },
];

  const workshops = [
    { time: "10:00", title: "Génération Vidéo : Les Bases" },
    { time: "14:00", title: "IA & Scénario : Co-écriture" },
  ];

  return (
    <main className="bg-white py-16 px-4 md:px-8 font-sans min-h-screen">
      <div className="max-w-6xl mx-auto space-y-16">
        <ProgramHeader t={t} />
        <ConferenceList t={t} agenda={agenda} />
        <AccessSection />
        <WorkshopGrid />
      </div>
    </main>
  );
};

export default ProgrammePage;