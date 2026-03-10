import React, { useState, useEffect } from 'react';
import ProgramHeader from '../components/program/ProgramHeader';
import ConferenceList from '../components/program/ConferenceList';
import AccessSection from '../components/program/AccessSection';
import WorkshopGrid from '../components/program/WorkshopGrid';

const ProgrammePage = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/event`);
        const result = await response.json();
        if (result.success) {
          setEvents(result.data);
        }
      } catch (error) {
        console.error("Erreur programme:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchEvents();
  }, []);

  return (
    <main className="bg-white py-16 px-4 md:px-8 font-sans min-h-screen">
      <div className="max-w-6xl mx-auto space-y-16">
        <ProgramHeader />
        
        {/* On passe tous les events, le composant filtrera tout seul */}
        <ConferenceList events={events} isLoading={loading} />
        
        <AccessSection />
        
        {/* On peut aussi passer les events ici pour afficher les workshops plus tard */}
        <WorkshopGrid events={events} />
      </div>
    </main>
  );
};

export default ProgrammePage;