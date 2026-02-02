import CompetitionSection from "../components/sections/CompetitionSection"
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
    </>
  )
}

export default Homepage