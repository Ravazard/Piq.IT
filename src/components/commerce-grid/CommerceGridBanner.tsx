import React, { useState, useEffect } from 'react';

interface CommerceGridBannerProps {
  onBookConsultation?: () => void;
}

export const CommerceGridBanner: React.FC<CommerceGridBannerProps> = ({
  onBookConsultation,
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

  return (
    <section
      style={{
        position: 'relative',
        width: '100%',
        minHeight: isMobile ? '260px' : '313px',
        backgroundImage:
          'linear-gradient(152.68deg, rgb(52, 20, 19) 18.01%, rgb(170, 57, 37) 100%)',
        display: 'flex',
        alignItems: 'center',
        padding: isMobile ? '50px 24px' : '60px 71px',
        boxSizing: 'border-box',
        overflow: 'hidden',
      }}
    >
      <div
        style={{
          maxWidth: '1360px',
          margin: '0 auto',
          width: '100%',
          display: 'flex',
          flexDirection: isMobile ? 'column' : 'row',
          alignItems: isMobile ? 'flex-start' : 'center',
          justifyContent: 'space-between',
          gap: isMobile ? '32px' : '40px',
        }}
      >
        <h2
          style={{
            fontFamily: "'Montserrat', sans-serif",
            fontWeight: 700,
            fontSize: isMobile ? '36px' : '56px',
            lineHeight: 1.15,
            letterSpacing: '-2.3321px',
            color: '#ffffff',
            margin: 0,
            maxWidth: '650px',
          }}
        >
          One <span style={{ color: '#c5422b' }}>Grid</span> to 
          <span style={{ color: '#c5422b' }}> Power</span>
          <br />
          <span style={{ color: '#c5422b' }}>Every</span> Channel
        </h2>

        <button
          onClick={onBookConsultation}
          style={{
            height: '49px',
            padding: '0 36px',
            borderRadius: '74px',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            color: '#ffffff',
            fontFamily: "'Montserrat', sans-serif",
            fontSize: '18px',
            fontWeight: 600,
            cursor: 'pointer',
            boxShadow: '0 10px 43.3px rgba(0, 0, 0, 0.25)',
            transition:
              'transform 0.25s ease, background-color 0.25s ease, border-color 0.25s ease, box-shadow 0.25s ease',
            flexShrink: 0,
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-2px) scale(1.02)';
            e.currentTarget.style.backgroundColor = 'rgba(0, 0, 0, 0.75)';
            e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.5)';
            e.currentTarget.style.boxShadow = '0 14px 48px rgba(0, 0, 0, 0.4)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0) scale(1)';
            e.currentTarget.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
            e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.2)';
            e.currentTarget.style.boxShadow = '0 10px 43.3px rgba(0, 0, 0, 0.25)';
          }}
        >
          Get Started
        </button>
      </div>
    </section>
  );
};
