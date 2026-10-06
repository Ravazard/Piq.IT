import React, { useState, useEffect } from 'react';

export interface SourcingHubBannerProps {
  onConsultationClick?: () => void;
}

export const SourcingHubBanner: React.FC<SourcingHubBannerProps> = ({
  onConsultationClick,
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

  const handleClick = () => {
    if (onConsultationClick) {
      onConsultationClick();
      return;
    }
    const elem = document.getElementById('book-consultation');
    if (elem) elem.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="consultation-banner"
      style={{
        position: 'relative',
        width: '100%',
        background: isMobile
          ? 'linear-gradient(52.48deg, rgb(52, 20, 19) 36.44%, rgb(170, 57, 37) 206.63%)'
          : 'linear-gradient(151.43deg, rgb(52, 20, 19) 18.01%, rgb(170, 57, 37) 100%)',
        padding: isMobile ? '60px 24px' : '75px clamp(24px, 5vw, 71px)',
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
          gap: isMobile ? '32px' : '40px',
        }}
      >
        <h2
          style={{
            fontFamily: "'Montserrat', sans-serif",
            fontWeight: 600,
            fontSize: isMobile ? '32px' : '60px',
            lineHeight: 1.15,
            letterSpacing: '-2.3321px',
            color: '#c5422b',
            margin: 0,
            maxWidth: '800px',
          }}
        >
          Full <span style={{ color: '#fff9f0' }}>visibility</span>  
          <br />
          <span style={{ color: '#fff9f0' }}>from </span>
          Source <span style={{ color: '#fff9f0' }}>to</span> Shipment
        </h2>

        <button
          onClick={handleClick}
          style={{
            width: isMobile ? '150px' : '162px',
            height: isMobile ? '44px' : '49px',
            padding: 0,
            borderRadius: '74px',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            border: '1px solid rgba(255, 255, 255, 0.15)',
            color: '#ffffff',
            fontFamily: "'Montserrat', sans-serif",
            fontSize: isMobile ? '16px' : '18px',
            fontWeight: 600,
            lineHeight: 1,
            cursor: 'pointer',
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
            boxShadow: '0 10px 43.3px rgba(0, 0, 0, 0.2)',
            transition:
              'transform 0.25s ease, background-color 0.25s ease, border-color 0.25s ease, box-shadow 0.25s ease',
            flexShrink: 0,
            outline: 'none',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-2px) scale(1.02)';
            e.currentTarget.style.backgroundColor = 'rgba(0, 0, 0, 0.75)';
            e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.35)';
            e.currentTarget.style.boxShadow = '0 14px 48px rgba(0, 0, 0, 0.4)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0) scale(1)';
            e.currentTarget.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
            e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.15)';
            e.currentTarget.style.boxShadow = '0 10px 43.3px rgba(0, 0, 0, 0.2)';
          }}
        >
          Get Started
        </button>
      </div>
    </section>
  );
};
