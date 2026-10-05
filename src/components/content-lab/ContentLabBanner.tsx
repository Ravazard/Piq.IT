import React, { useState, useEffect } from 'react';

export interface ContentLabBannerProps {
  onConsultationClick?: () => void;
}

export const ContentLabBanner: React.FC<ContentLabBannerProps> = ({
  onConsultationClick,
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
        backgroundImage: isMobile
          ? 'linear-gradient(52.48deg, rgb(52, 20, 19) 36.44%, rgb(170, 57, 37) 206.63%)'
          : 'linear-gradient(152.68deg, rgb(52, 20, 19) 18.01%, rgb(170, 57, 37) 100%)',
        padding: isMobile ? '60px 24px' : '75px 71px',
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
            lineHeight: 1.1,
            letterSpacing: '-2.3321px',
            color: '#c5422b',
            margin: 0,
            maxWidth: '800px',
          }}
        >
          <span style={{ color: '#ffffff' }}>Shoot </span>
          <span>Once</span>
          <br />
          <span style={{ color: '#ffffff' }}>Create </span>
          <span>Endlessly</span>
        </h2>

        <button
          onClick={handleClick}
          style={{
            width: isMobile ? '170px' : '231px',
            height: isMobile ? '38px' : '49px',
            borderRadius: '74px',
            backgroundColor: isMobile ? 'rgba(255, 236, 236, 0.12)' : 'rgba(0, 0, 0, 0.5)',
            border: '1px solid rgba(255, 255, 255, 0.15)',
            color: '#ffffff',
            fontFamily: "'Montserrat', sans-serif",
            fontSize: isMobile ? '16px' : '18px',
            fontWeight: 600,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 10px 43.3px rgba(0, 0, 0, 0.2)',
            transition: 'transform 0.25s ease, background-color 0.25s ease',
            flexShrink: 0,
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-2px)';
            e.currentTarget.style.backgroundColor = isMobile
              ? 'rgba(255, 236, 236, 0.24)'
              : 'rgba(0, 0, 0, 0.7)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.backgroundColor = isMobile
              ? 'rgba(255, 236, 236, 0.12)'
              : 'rgba(0, 0, 0, 0.5)';
          }}
        >
          Get Started
        </button>
      </div>
    </section>
  );
};
