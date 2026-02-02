import CompetitionSection from "../components/sections/CompetitionSection"
import FormatSelection from "../components/sections/FormatSection"
import HeroSection from "../components/sections/HeroSection"
import ObjectivesSection from "../components/sections/ObjectivesSection"
import ProjectSection from "../components/sections/ProjectSection"

const Homepage = () => {
  return (
    <>
      <HeroSection />
      <ProjectSection />
      <CompetitionSection />
      <ObjectivesSection />
      <FormatSelection />
    </>
  )
}

export default Homepage