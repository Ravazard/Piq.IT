import React, { useState, useEffect } from 'react';
import arrowIcon from '../../assets/commerce-grid-arrow.svg';

interface CommerceGridNextEcosystemProps {
  onNavigate?: (tabName: string) => void;
}

export const CommerceGridNextEcosystem: React.FC<CommerceGridNextEcosystemProps> = ({
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

  const handleExplore = (e: React.MouseEvent) => {
    e.preventDefault();
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
    if (onNavigate) {
      onNavigate('design-studio');
    } else {
      window.location.hash = 'design-studio';
    }
  };

  return (
    <section
      id="next-ecosystem"
      style={{
        position: 'relative',
        width: '100%',
        backgroundColor: '#fff9f0',
        padding: isMobile ? '50px 24px 60px' : '60px 71px 70px',
        boxSizing: 'border-box',
        overflow: 'hidden',
      }}
    >
      <div style={{ maxWidth: '1360px', margin: '0 auto', width: '100%' }}>
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            padding: '8px 24px',
            borderRadius: '36px',
            border: '1px solid #c5422b',
            background: 'rgba(197, 66, 43, 0.08)',
            color: '#c5422b',
            fontFamily: "'Montserrat', sans-serif",
            fontSize: isMobile ? '14px' : '16px',
            fontWeight: 600,
            marginBottom: '20px',
          }}
        >
          Next in Ecosystem
        </div>

        <div
          style={{
            display: 'flex',
            flexDirection: isMobile ? 'column' : 'row',
            alignItems: isMobile ? 'flex-start' : 'center',
            justifyContent: 'space-between',
            gap: isMobile ? '24px' : '40px',
          }}
        >
          <h2
            style={{
              fontFamily: "'Montserrat', sans-serif",
              fontWeight: 600,
              fontSize: isMobile ? '36px' : '60px',
              lineHeight: 1.1,
              letterSpacing: '-2.3321px',
              color: '#000000',
              margin: 0,
            }}
          >
            Design Studio
          </h2>

          <a
            href="#design-studio"
            onClick={handleExplore}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '12px',
              height: '49px',
              padding: '0 32px',
              borderRadius: '74px',
              background: 'linear-gradient(to right, #351514, #a83925)',
              color: '#ffffff',
              fontFamily: "'Montserrat', sans-serif",
              fontSize: '18px',
              fontWeight: 600,
              textDecoration: 'none',
              boxShadow: '0 10px 43.3px rgba(0, 0, 0, 0.2)',
              transition: 'transform 0.25s ease, box-shadow 0.25s ease',
              flexShrink: 0,
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-2px) scale(1.02)';
              e.currentTarget.style.boxShadow = '0 14px 48px rgba(168, 57, 37, 0.35)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0) scale(1)';
              e.currentTarget.style.boxShadow = '0 10px 43.3px rgba(0, 0, 0, 0.2)';
            }}
          >
            <span>Explore</span>
            <img
              src={arrowIcon}
              alt=""
              style={{ width: '22px', height: '16px', display: 'block' }}
            />
          </a>
        </div>
      </div>
    </section>
  );
};
