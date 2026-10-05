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
        background: 'linear-gradient(52.5deg, rgb(52, 20, 19) 36.44%, rgb(170, 57, 37) 206.63%)',
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
            fontSize: isMobile ? '32px' : '56px',
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
            width: isMobile ? '180px' : '231px',
            height: isMobile ? '42px' : '49px',
            borderRadius: '50px',
            backgroundColor: '#000000',
            border: '1px solid rgba(255, 255, 255, 0.15)',
            color: '#ffffff',
            fontFamily: "'Montserrat', sans-serif",
            fontSize: isMobile ? '14px' : '16px',
            fontWeight: 600,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 8px 30px rgba(0, 0, 0, 0.4)',
            transition: 'transform 0.25s ease, background 0.25s ease',
            flexShrink: 0,
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-2px)';
            e.currentTarget.style.backgroundColor = '#1e0c0b';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.backgroundColor = '#000000';
          }}
        >
          Get Started
        </button>
      </div>
    </section>
  );
};
