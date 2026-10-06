import React, { useState, useEffect } from 'react';
import heroBg from '../../assets/design-studio-hero.png';
import { Navbar } from '../Navbar';

export interface DesignStudioHeroProps {
  onNavigate?: (page: string) => void;
  onConsultationClick?: () => void;
}

export const DesignStudioHero: React.FC<DesignStudioHeroProps> = ({
  onNavigate,
  onConsultationClick,
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);

    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 120);

    return () => {
      window.removeEventListener('resize', checkMobile);
      clearTimeout(timer);
    };
  }, []);

  const handleStartDesigning = () => {
    if (onConsultationClick) {
      onConsultationClick();
      return;
    }
    const element = document.getElementById('consultation-banner') || document.getElementById('book-consultation');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleGetInTouch = () => {
    if (onConsultationClick) {
      onConsultationClick();
      return;
    }
    const element = document.getElementById('footer') || document.getElementById('book-consultation');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="design-studio-hero"
      style={{
        position: 'relative',
        width: '100%',
        height: isMobile ? '826px' : '788px',
        minHeight: isMobile ? '826px' : '788px',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        boxSizing: 'border-box',
        backgroundColor: '#000000'
      }}
    >
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          zIndex: 1,
          overflow: 'hidden',
        }}
      >
        <img
          src={heroBg}
          alt="Modern Fashion Design Studio"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            objectPosition: isMobile ? '37% top' : 'center center',
            transform: isLoaded ? 'scale(1)' : 'scale(1.05)',
            transition: 'transform 1.4s cubic-bezier(0.16, 1, 0.3, 1)',
          }}
        />
      </div>

      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: isMobile ? '93px' : '156px',
          background: 'linear-gradient(180deg, rgba(0, 0, 0, 0.72) 0%, rgba(0, 0, 0, 0) 100%)',
          backdropFilter: 'blur(1px)',
          WebkitBackdropFilter: 'blur(1px)',
          zIndex: 2,
          pointerEvents: 'none',
        }}
      />

      <div
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          width: '100%',
          height: isMobile ? '322px' : '348px',
          background: 'linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.45) 45%, rgba(0, 0, 0, 0.9) 82%, #000000 100%)',
          backdropFilter: 'blur(1px)',
          WebkitBackdropFilter: 'blur(1px)',
          zIndex: 2,
          pointerEvents: 'none',
        }}
      />

      <div style={{ position: 'relative', zIndex: 10, width: '100%' }}>
        <Navbar
          activeTab="Design Studio"
          onTabClick={onNavigate}
          onGetInTouchClick={handleGetInTouch}
        />
      </div>

      <div
        style={{
          position: 'absolute',
          bottom: isMobile ? '86px' : '54px',
          left: 0,
          right: 0,
          zIndex: 5,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
          padding: isMobile ? '0 20px' : '0 40px',
          boxSizing: 'border-box',
          opacity: isLoaded ? 1 : 0,
          transform: isLoaded ? 'translateY(0)' : 'translateY(24px)',
          transition: 'opacity 0.9s cubic-bezier(0.16, 1, 0.3, 1), transform 0.9s cubic-bezier(0.16, 1, 0.3, 1)',
        }}
      >
        <h1
          style={{
            fontFamily: "'Montserrat', sans-serif",
            fontWeight: 600,
            fontSize: isMobile ? 'clamp(32px, 8.8vw, 40px)' : 'clamp(44px, 5.1vw, 72px)',
            lineHeight: 1.1,
            letterSpacing: '-2.3321px',
            color: '#ffffff',
            margin: 0,
            maxWidth: isMobile ? '340px' : '1100px',
            textShadow: '0 4px 20px rgba(0, 0, 0, 0.6)',
            whiteSpace: isMobile ? 'normal' : 'nowrap',
          }}
        >
          {isMobile ? (
            <>
              Designing
              <br />
              What’s Next
            </>
          ) : (
            'Designing What’s Next'
          )}
        </h1>

        <p
          style={{
            fontFamily: "'Montserrat', sans-serif",
            fontWeight: 400,
            fontSize: isMobile ? '16px' : 'clamp(18px, 2.3vw, 32px)',
            lineHeight: 1.2,
            letterSpacing: isMobile ? '-0.8px' : '-1.5px',
            color: '#ffffff',
            margin: isMobile ? '12px 0 0 0' : '16px 0 0 0',
            maxWidth: isMobile ? '270px' : '900px',
            textShadow: '0 2px 14px rgba(0, 0, 0, 0.6)',
          }}
        >
          AI-powered fashion design, from trend to tech pack
        </p>

        <button
          onClick={handleStartDesigning}
          style={{
            marginTop: isMobile ? '24px' : '32px',
            width: isMobile ? '170px' : '207px',
            height: isMobile ? '38px' : '49px',
            borderRadius: '74px',
            background: isMobile
              ? 'linear-gradient(to right, #b23b27 0%, #371615 160.59%)'
              : 'linear-gradient(90.07deg, rgb(178, 59, 39) 0%, rgb(55, 22, 21) 189.57%)',
            border: 'none',
            color: '#ffffff',
            fontFamily: "'Montserrat', sans-serif",
            fontSize: isMobile ? '16px' : '18px',
            fontWeight: isMobile ? 500 : 600,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0px 10px 43.3px 0px rgba(0, 0, 0, 0.25)',
            transition: 'transform 0.25s ease, box-shadow 0.25s ease',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-2px)';
            e.currentTarget.style.boxShadow = '0px 14px 48px 0px rgba(178, 59, 39, 0.45)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = '0px 10px 43.3px 0px rgba(0, 0, 0, 0.25)';
          }}
        >
          Start Designing
        </button>
      </div>
    </section>
  );
};
