import React, { useState, useEffect } from 'react';
import arrowRightIcon from '../../assets/icon-arrow-right-white.svg';

export interface ContentLabNextEcosystemProps {
  onNavigate?: (page: string) => void;
}

export const ContentLabNextEcosystem: React.FC<ContentLabNextEcosystemProps> = ({
  onNavigate,
}) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
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
      onNavigate('Commerce Grid');
    } else {
      window.location.hash = 'commerce-grid';
    }
  };

  return (
    <section
      id="next-ecosystem"
      style={{
        position: 'relative',
        width: '100%',
        backgroundColor: '#fff9f0',
        padding: isMobile ? '60px 24px' : '80px 71px',
        boxSizing: 'border-box',
        overflow: 'hidden',
      }}
    >
      <div
        style={{
          maxWidth: '1254px',
          margin: '0 auto',
          width: '100%',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: isMobile ? 'flex-start' : 'center',
          flexDirection: isMobile ? 'column' : 'row',
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
              fontSize: '14px',
              fontWeight: 600,
              marginBottom: '16px',
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
            Commerce Grid
          </h2>
        </div>

        <button
          onClick={handleExplore}
          className="btn btn-primary"
          style={{
            width: isMobile ? '156px' : '231px',
            height: isMobile ? '38px' : '49px',
            borderRadius: '74px',
            fontFamily: "'Montserrat', sans-serif",
            fontSize: isMobile ? '16px' : '18px',
            fontWeight: 600,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '12px',
            boxShadow: '0 10px 43.3px rgba(0, 0, 0, 0.2)',
            transition: 'transform 0.25s ease, box-shadow 0.25s ease',
            flexShrink: 0,
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-2px)';
            e.currentTarget.style.boxShadow = '0 12px 36px rgba(197, 66, 43, 0.5)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = '0 10px 43.3px rgba(0, 0, 0, 0.2)';
          }}
        >
          <span>Explore</span>
          <img
            src={arrowRightIcon}
            alt=""
            style={{ width: '16px', height: '16px', objectFit: 'contain' }}
          />
        </button>
      </div>
    </section>
  );
};
