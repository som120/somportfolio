import { Navigation } from './components/Navigation'
import { HeroSection } from './components/HeroSection'
import { AboutSection } from './components/AboutSection'
import { SkillsSection } from './components/SkillsSection'
import { ProjectsSection } from './components/ProjectsSection'
import { ContactSection } from './components/ContactSection'
import { AnalyticsDashboard } from './components/AnalyticsDashboard'
import { useAnalytics } from './hooks/useAnalytics'

export default function App() {
  // Initialize analytics tracking
  useAnalytics();

  return (
    <div className="dark min-h-screen bg-black text-white">
      <Navigation />
      <main>
        <HeroSection />
        <AboutSection />
        <SkillsSection />
        <ProjectsSection />
        <ContactSection />
      </main>
      <AnalyticsDashboard />
    </div>
  )
}