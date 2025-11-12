import { Navigation } from "./components/Navigation";
import { HeroSection } from "./components/HeroSection";
import { AboutSection } from "./components/AboutSection";
import { SkillsSection } from "./components/SkillsSection";
import { ProjectsSection } from "./components/ProjectsSection";
import { ContactSection } from "./components/ContactSection";
import { AnalyticsDashboard } from "./components/AnalyticsDashboard";
import { useAnalytics } from "./hooks/useAnalytics";
import { SmoothCursor } from "@/components/ui/smooth-cursor";

export default function App() {
  // Initialize analytics tracking
  useAnalytics();

  return (
    // Hide system cursor across the app
    <div className="relative cursor-none dark min-h-screen bg-black text-white overflow-hidden">
      {/* 🧠 Custom smooth physics-based cursor */}
      <SmoothCursor />

      {/* 🔝 Navigation always visible */}
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
  );
}
