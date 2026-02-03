import CompetitionSection from "../components/homepage/CompetitionSection"
import FormatSelection from "../components/homepage/FormatSection"
import HeroSection from "../components/homepage/HeroSection"
import ObjectivesSection from "../components/homepage/ObjectivesSection"
import PartnersSection from "../components/homepage/PartnersSection"
import ProgrammeSection from "../components/homepage/ProgrammeSection"
import ProjectSection from "../components/homepage/ProjectSection"
import StatsSection from "../components/homepage/StatsSection"
import VenueSection from "../components/homepage/VenueSection"

const Homepage = () => {
  return (
    <>
      <HeroSection />
      <ProjectSection />
      <CompetitionSection />
      <ObjectivesSection />
      <FormatSelection />
      <ProgrammeSection />
      <VenueSection />
      <StatsSection />
      <PartnersSection />
    </>
  )
}

export default Homepage