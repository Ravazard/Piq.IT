import React, { useState, useEffect } from 'react';
import heroBgDesktop from '../../assets/content-lab-hero.png';
import heroBgMobile from '../../assets/content-lab-hero-mobile.png';
import { Navbar } from '../Navbar';

export interface ContentLabHeroProps {
  onNavigate?: (page: string) => void;
  onConsultationClick?: () => void;
}

export const ContentLabHero: React.FC<ContentLabHeroProps> = ({
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

  const handleStartCreating = () => {
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
      id="content-lab-hero"
      style={{
        position: 'relative',
        width: '100%',
        height: isMobile ? '826px' : '815px',
        minHeight: isMobile ? '826px' : '815px',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        boxSizing: 'border-box',
        backgroundColor: '#000000',
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
          src={isMobile ? heroBgMobile : heroBgDesktop}
          alt="Content Lab - ⁠Content That Moves Commerce"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            objectPosition: 'center center',
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
          height: isMobile ? '93px' : '163px',
          background: 'linear-gradient(180deg, rgba(0, 0, 0, 0.75) 0%, rgba(0, 0, 0, 0) 100%)',
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
          height: isMobile ? '324px' : '402px',
          background:
            'linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.45) 45%, rgba(0, 0, 0, 0.9) 82%, #000000 100%)',
          backdropFilter: 'blur(1px)',
          WebkitBackdropFilter: 'blur(1px)',
          zIndex: 2,
          pointerEvents: 'none',
        }}
      />

      <div style={{ position: 'relative', zIndex: 10, width: '100%' }}>
        <Navbar
          activeTab="Content Lab"
          onTabClick={onNavigate}
          onGetInTouchClick={handleGetInTouch}
        />
      </div>

      <div
        style={{
          position: 'absolute',
          bottom: isMobile ? '89px' : '75px',
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
            fontSize: isMobile ? 'clamp(32px, 8.8vw, 40px)' : 'clamp(44px, 5.16vw, 72px)',
            lineHeight: 1.1,
            letterSpacing: isMobile ? '-1.5px' : '-2.3321px',
            color: '#ffffff',
            margin: 0,
            maxWidth: isMobile ? '340px' : '1200px',
            textShadow: '0 4px 24px rgba(0, 0, 0, 0.6)',
            whiteSpace: isMobile ? 'normal' : 'nowrap',
          }}
        >
          {isMobile ? (
            <>
              Content That
              <br />
              Moves Commerce
            </>
          ) : (
            'Content That Moves Commerce'
          )}
        </h1>

        <p
          style={{
            fontFamily: "'Montserrat', sans-serif",
            fontWeight: 300,
            fontSize: isMobile ? '16px' : 'clamp(18px, 2.3vw, 32px)',
            lineHeight: isMobile ? 1.25 : 1.1,
            letterSpacing: isMobile ? '-1.5px' : '-2.3321px',
            color: '#ffffff',
            margin: '10px 0 0 0',
            maxWidth: isMobile ? '309px' : '1300px',
            textShadow: '0 2px 16px rgba(0, 0, 0, 0.6)',
            whiteSpace: isMobile ? 'normal' : 'nowrap',
          }}
        >
          Creating compelling imagery, videos and digital experiences that drive engagement
        </p>

        <button
          onClick={handleStartCreating}
          style={{
            marginTop: isMobile ? '36px' : '40px',
            width: isMobile ? '170px' : '207px',
            height: isMobile ? '38px' : '49px',
            borderRadius: '74px',
            background: isMobile
              ? 'linear-gradient(to right, #b23b27 0%, #371615 142.35%)'
              : 'linear-gradient(90.06deg, rgb(178, 59, 39) 0%, rgb(55, 22, 21) 219.28%)',
            border: 'none',
            color: '#ffffff',
            fontFamily: "'Montserrat', sans-serif",
            fontSize: isMobile ? '16px' : '18px',
            fontWeight: isMobile ? 500 : 600,
            cursor: 'pointer',
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0px 10px 43.3px 0px rgba(0, 0, 0, 0.2)',
            transition: 'transform 0.25s ease, box-shadow 0.25s ease',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-2px)';
            e.currentTarget.style.boxShadow = '0px 14px 48px 0px rgba(178, 59, 39, 0.45)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = '0px 10px 43.3px 0px rgba(0, 0, 0, 0.2)';
          }}
        >
          Start Creating
        </button>
      </div>
    </section>
  );
};
