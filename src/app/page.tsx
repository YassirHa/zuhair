import NavBar from '@/components/caravane/NavBar'
import JourneyTrail from '@/components/caravane/JourneyTrail'
import Hero from '@/components/caravane/Hero'
import PresentationSection from '@/components/caravane/PresentationSection'
import NeedsSection from '@/components/caravane/NeedsSection'
import ObjectiveSection from '@/components/caravane/ObjectiveSection'
import BudgetSection from '@/components/caravane/BudgetSection'
import PartnerSection from '@/components/caravane/PartnerSection'
import SummarySection from '@/components/caravane/SummarySection'
import Footer from '@/components/caravane/Footer'
import MotionProvider from '@/components/caravane/MotionProvider'
import { LanguageProvider } from '@/components/caravane/i18n/LanguageContext'

export default function CaravanePage() {
  return (
    <MotionProvider>
      <LanguageProvider>
        <NavBar />
        <JourneyTrail />
        <main>
          <Hero />
          <PresentationSection />
          <NeedsSection />
          <ObjectiveSection />
          <BudgetSection />
          <PartnerSection />
          <SummarySection />
        </main>
        <Footer />
      </LanguageProvider>
    </MotionProvider>
  )
}
