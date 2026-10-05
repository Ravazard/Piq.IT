import { useState, useEffect } from 'react';
import './index.css';
import { Hero } from './components/Hero';
import { BrandShowcase } from './components/BrandShowcase';
import { NextGenInfrastructure } from './components/NextGenInfrastructure';
import { ExpansionPathways } from './components/ExpansionPathways';
import { ConnectedEcosystem } from './components/ConnectedEcosystem';
import { CustomerFeedback } from './components/CustomerFeedback';
import { BookConsultation } from './components/BookConsultation';
import { Footer } from './components/Footer';
import { DesignStudioPage } from './components/design-studio';
import { SourcingHubPage } from './components/sourcing-hub';
import { ContentLabPage } from './components/content-lab';
import { CommerceGridPage } from './components/commerce-grid';

type Page = 'home' | 'design-studio' | 'sourcing-hub' | 'content-lab' | 'commerce-grid';

function App() {
  const [currentPage, setCurrentPage] = useState<Page>(() => {
    if (typeof window !== 'undefined') {
      const hash = window.location.hash.toLowerCase();
      if (hash.includes('design-studio') || hash.includes('designstudio')) {
        return 'design-studio';
      }
      if (hash.includes('sourcing-hub') || hash.includes('sourcinghub')) {
        return 'sourcing-hub';
      }
      if (hash.includes('content-lab') || hash.includes('contentlab')) {
        return 'content-lab';
      }
      if (hash.includes('commerce-grid') || hash.includes('commercegrid')) {
        return 'commerce-grid';
      }
    }
    return 'home';
  });

  const scrollToTopInstant = () => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  };

  useEffect(() => {
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }
  }, []);

  useEffect(() => {
    scrollToTopInstant();
    const raf = requestAnimationFrame(() => {
      scrollToTopInstant();
    });
    return () => cancelAnimationFrame(raf);
  }, [currentPage]);

  useEffect(() => {
    const handleHashChange = () => {
      scrollToTopInstant();
      const hash = window.location.hash.toLowerCase();
      if (hash.includes('design-studio') || hash.includes('designstudio')) {
        setCurrentPage('design-studio');
      } else if (hash.includes('sourcing-hub') || hash.includes('sourcinghub')) {
        setCurrentPage('sourcing-hub');
      } else if (hash.includes('content-lab') || hash.includes('contentlab')) {
        setCurrentPage('content-lab');
      } else if (hash.includes('commerce-grid') || hash.includes('commercegrid')) {
        setCurrentPage('commerce-grid');
      } else if (hash.includes('home') || hash === '' || hash === '#') {
        setCurrentPage('home');
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const handleNavigate = (pageName: string) => {
    scrollToTopInstant();
    const normalized = pageName.toLowerCase().replace(/\s+/g, '-');
    if (normalized === 'design-studio' || normalized === 'designstudio') {
      setCurrentPage('design-studio');
      window.location.hash = 'design-studio';
    } else if (normalized === 'sourcing-hub' || normalized === 'sourcinghub') {
      setCurrentPage('sourcing-hub');
      window.location.hash = 'sourcing-hub';
    } else if (normalized === 'content-lab' || normalized === 'contentlab') {
      setCurrentPage('content-lab');
      window.location.hash = 'content-lab';
    } else if (normalized === 'commerce-grid' || normalized === 'commercegrid') {
      setCurrentPage('commerce-grid');
      window.location.hash = 'commerce-grid';
    } else if (normalized === 'home') {
      setCurrentPage('home');
      window.location.hash = '';
    } else {
      setCurrentPage('home');
      window.location.hash = '';
      setTimeout(() => {
        const elem = document.getElementById('ecosystem');
        if (elem) elem.scrollIntoView({ behavior: 'smooth' });
      }, 50);
    }
  };

  return (
    <div className="app-container">
      {currentPage === 'home' ? (
        <main>
          <Hero onTabClick={handleNavigate} />
          <BrandShowcase />
          <NextGenInfrastructure />
          <ExpansionPathways />
          <ConnectedEcosystem />
          <CustomerFeedback />
          <BookConsultation />
          <Footer onTabClick={handleNavigate} />
        </main>
      ) : currentPage === 'design-studio' ? (
        <DesignStudioPage onNavigate={handleNavigate} />
      ) : currentPage === 'sourcing-hub' ? (
        <SourcingHubPage onNavigate={handleNavigate} />
      ) : currentPage === 'content-lab' ? (
        <ContentLabPage onNavigate={handleNavigate} />
      ) : (
        <CommerceGridPage onNavigate={handleNavigate} />
      )}
    </div>
  );
}

export default App;
