import React, { useState, useEffect } from 'react';
import { CommerceGridHero } from './CommerceGridHero';
import { CommerceGridCapabilities } from './CommerceGridCapabilities';
import { CommerceGridSequence } from './CommerceGridSequence';
import { CommerceGridBanner } from './CommerceGridBanner';
import { CommerceGridNextEcosystem } from './CommerceGridNextEcosystem';
import { Footer } from '../Footer';
import { BookConsultation } from '../BookConsultation';

export interface CommerceGridPageProps {
  onNavigate?: (page: string) => void;
}

export const CommerceGridPage: React.FC<CommerceGridPageProps> = ({ onNavigate }) => {
  const [showConsultationModal, setShowConsultationModal] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setShowConsultationModal(false);
      }
    };
    if (showConsultationModal) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [showConsultationModal]);

  const handleOpenConsultation = () => {
    setShowConsultationModal(true);
  };

  const handleCloseConsultation = () => {
    setShowConsultationModal(false);
  };

  return (
    <div
      className="commerce-grid-page"
      style={{ position: 'relative', width: '100%', overflowX: 'hidden' }}
    >
      <main>
        <CommerceGridHero
          onNavigate={onNavigate}
          onGetInTouch={handleOpenConsultation}
        />

        <CommerceGridCapabilities />

        <CommerceGridSequence />

        <CommerceGridBanner onBookConsultation={handleOpenConsultation} />

        <CommerceGridNextEcosystem onNavigate={onNavigate} />

        <Footer
          onTabClick={onNavigate}
          onGetInTouchClick={handleOpenConsultation}
        />
      </main>

      {showConsultationModal && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 1000,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'rgba(0, 0, 0, 0.78)',
            backdropFilter: 'blur(10px)',
            WebkitBackdropFilter: 'blur(10px)',
            padding: '24px 16px',
            boxSizing: 'border-box',
          }}
          onClick={handleCloseConsultation}
        >
          <div
            style={{
              position: 'relative',
              width: '100%',
              maxWidth: '1080px',
              maxHeight: '92vh',
              overflowY: 'auto',
              borderRadius: '24px',
              boxShadow: '0 24px 64px rgba(0, 0, 0, 0.65)',
              border: '1px solid rgba(197, 66, 43, 0.35)',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={handleCloseConsultation}
              aria-label="Close consultation modal"
              style={{
                position: 'absolute',
                top: '10px',
                right: '10px',
                zIndex: 20,
                width: '42px',
                height: '42px',
                borderRadius: '50%',
                background: 'rgba(0, 0, 0, 0.55)',
                border: '1px solid rgba(255, 255, 255, 0.25)',
                color: '#ffffff',
                fontSize: '18px',
                fontWeight: 600,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'background 0.2s ease, transform 0.2s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'rgba(197, 66, 43, 0.85)';
                e.currentTarget.style.transform = 'scale(1.05)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'rgba(0, 0, 0, 0.55)';
                e.currentTarget.style.transform = 'scale(1)';
              }}
            >
              ✕
            </button>
            <BookConsultation
              isModal={true}
              onClose={handleCloseConsultation}
              defaultService="Commerce Grid"
            />
          </div>
        </div>
      )}
    </div>
  );
};
