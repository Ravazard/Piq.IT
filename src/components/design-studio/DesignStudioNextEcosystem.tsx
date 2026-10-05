import React, { useState, useEffect } from 'react';
import iconArrowRight from '../../assets/icon-arrow-right-white.svg';

export interface DesignStudioNextEcosystemProps {
  onNavigate?: (page: string) => void;
}

export const DesignStudioNextEcosystem: React.FC<DesignStudioNextEcosystemProps> = ({
  onNavigate,
}) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 900);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleExplore = () => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
    if (onNavigate) {
      onNavigate('Sourcing Hub');
    } else {
      window.location.hash = 'sourcing-hub';
    }
  };

  return (
    <section
      id="next-in-ecosystem"
      style={{
        position: 'relative',
        width: '100%',
        backgroundColor: '#fff9f0',
        padding: isMobile ? '50px 24px 60px' : '65px 148px 75px',
        boxSizing: 'border-box',
        overflow: 'hidden',
      }}
    >
      <div
        style={{
          maxWidth: '1240px',
          margin: '0 auto',
          width: '100%',
          display: 'flex',
          flexDirection: isMobile ? 'column' : 'row',
          alignItems: isMobile ? 'flex-start' : 'center',
          justifyContent: 'space-between',
          gap: isMobile ? '24px' : '40px',
        }}
      >
        <div>
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              padding: '6px 20px',
              borderRadius: '36px',
              border: '1px solid #c5422b',
              background: 'rgba(197, 66, 43, 0.08)',
              color: '#c5422b',
              fontFamily: "'Montserrat', sans-serif",
              fontSize: isMobile ? '13px' : '15px',
              fontWeight: 600,
              marginBottom: '14px',
            }}
          >
            Next in Ecosystem
          </div>

          <h2
            style={{
              fontFamily: "'Montserrat', sans-serif",
              fontWeight: 600,
              fontSize: isMobile ? '32px' : '60px',
              lineHeight: 1.1,
              letterSpacing: '-2.3321px',
              color: '#000000',
              margin: 0,
            }}
          >
            Sourcing Hub
          </h2>
        </div>

        <button
          onClick={handleExplore}
          style={{
            minWidth: isMobile ? '156px' : '200px',
            height: isMobile ? '40px' : '49px',
            borderRadius: '50px',
            background: 'linear-gradient(to right, #c5422b, #492020)',
            border: 'none',
            color: '#ffffff',
            fontFamily: "'Montserrat', sans-serif",
            fontSize: isMobile ? '14px' : '16px',
            fontWeight: 600,
            cursor: 'pointer',
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '12px',
            padding: '0 28px',
            boxShadow: '0 8px 30px rgba(197, 66, 43, 0.35)',
            transition: 'transform 0.25s ease, box-shadow 0.25s ease',
            flexShrink: 0,
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-2px)';
            e.currentTarget.style.boxShadow = '0 12px 36px rgba(197, 66, 43, 0.5)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = '0 8px 30px rgba(197, 66, 43, 0.35)';
          }}
        >
          <span>Explore</span>
          <img
            src={iconArrowRight}
            alt="→"
            style={{ width: '18px', height: '14px', objectFit: 'contain' }}
          />
        </button>
      </div>
    </section>
  );
};
