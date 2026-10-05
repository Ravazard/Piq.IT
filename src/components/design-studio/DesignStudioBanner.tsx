import React, { useState, useEffect } from 'react';

export interface DesignStudioBannerProps {
  onConsultationClick?: () => void;
}

export const DesignStudioBanner: React.FC<DesignStudioBannerProps> = ({
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
    const element = document.getElementById('book-consultation') || document.getElementById('footer');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="consultation-banner"
      style={{
        position: 'relative',
        width: '100%',
        backgroundImage: isMobile
          ? 'linear-gradient(52.48deg, rgb(52, 20, 19) 36.44%, rgb(170, 57, 37) 206.63%)'
          : 'linear-gradient(152.83deg, rgb(52, 20, 19) 18.01%, rgb(170, 57, 37) 100%)',
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
          flexDirection: isMobile ? 'column' : 'row',
          alignItems: isMobile ? 'flex-start' : 'center',
          justifyContent: 'space-between',
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
            color: '#ffffff',
            margin: 0,
          }}
        >
          <span style={{ color: '#c5422b' }}>Bold</span> ideas you
          <br />
          can trust to <span style={{ color: '#c5422b' }}>Sell</span>
        </h2>

        <button
          onClick={handleClick}
          style={{
            height: isMobile ? '42px' : '49px',
            padding: isMobile ? '0 28px' : '0 36px',
            borderRadius: '74px',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            border: '1px solid rgba(255, 255, 255, 0.15)',
            color: '#ffffff',
            fontFamily: "'Montserrat', sans-serif",
            fontSize: isMobile ? '15px' : '16px',
            fontWeight: 600,
            cursor: 'pointer',
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 10px 43.3px rgba(0, 0, 0, 0.25)',
            transition:
              'transform 0.25s ease, background-color 0.25s ease, border-color 0.25s ease, box-shadow 0.25s ease',
            flexShrink: 0,
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
            e.currentTarget.style.boxShadow = '0 10px 43.3px rgba(0, 0, 0, 0.25)';
          }}
        >
          Get Started
        </button>
      </div>
    </section>
  );
};
