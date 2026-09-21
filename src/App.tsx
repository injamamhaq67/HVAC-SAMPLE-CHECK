import React from 'react';
import { AppointmentProvider } from './context/AppointmentContext';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ServiceCategories } from './components/ServiceCategories';
import { About } from './components/About';
import { Services } from './components/Services';
import { ServiceAreas } from './components/ServiceAreas';
import { Testimonials } from './components/Testimonials';
import { Team } from './components/Team';
import { Partners } from './components/Partners';
import { FinalCTA } from './components/FinalCTA';
import { Footer } from './components/Footer';
import { AppointmentModal } from './components/AppointmentModal';
import { SuccessPopup } from './components/SuccessPopup';
import { MobileStickyCTA } from './components/MobileStickyCTA';

export const App: React.FC = () => {
  return (
    <AppointmentProvider>
      <div className="min-h-screen bg-brand-lightBg text-slate-800 flex flex-col font-sans selection:bg-brand-yellow selection:text-brand-navy">
        {/* Sticky Header Navbar */}
        <Navbar />

        {/* Main Content Sections */}
        <main className="flex-1">
          <Hero />
          <ServiceCategories />
          <About />
          <Services />
          <ServiceAreas />
          <Testimonials />
          <Team />
          <Partners />
          <FinalCTA />
        </main>

        {/* Footer */}
        <Footer />

        {/* Modals & Overlays */}
        <AppointmentModal />
        <SuccessPopup />
        <MobileStickyCTA />
      </div>
    </AppointmentProvider>
  );
};

export default App;
