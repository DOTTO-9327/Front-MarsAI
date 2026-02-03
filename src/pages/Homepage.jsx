import CompetitionSection from "../components/sections/CompetitionSection"
import FormatSelection from "../components/sections/FormatSection"
import HeroSection from "../components/sections/HeroSection"
import ObjectivesSection from "../components/sections/ObjectivesSection"
import ProgrammeSection from "../components/sections/ProgrammeSection"
import ProjectSection from "../components/sections/ProjectSection"
import VenueSection from "../components/sections/VenueSection"

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
    </>
  )
}

export default Homepage