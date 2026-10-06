import React, { useState, useEffect } from 'react';
import heroBg from '../assets/hero-bg.png';
import { Navbar } from './Navbar';

export interface HeroProps {
  onTabClick?: (tabName: string) => void;
}

export const Hero: React.FC<HeroProps> = ({ onTabClick }) => {
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
    }, 150);

    return () => {
      window.removeEventListener('resize', checkMobile);
      clearTimeout(timer);
    };
  }, []);

  const handleExploreClick = () => {
    const element = document.getElementById('next-gen') || document.getElementById('ecosystem');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleGetInTouchClick = () => {
    const element = document.getElementById('book-consultation');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="hero"
      style={{
        position: 'relative',
        width: '100%',
        height: isMobile ? '821px' : '805px',
        backgroundColor: 'black',
        overflow: 'hidden',
      }}
    >
      <img
        src={heroBg}
        alt=""
        style={{
          position: 'absolute',
          top: 0,
          left: isMobile ? 'calc(50% - 60px)' : 'calc(50% - 160px)',
          transform: 'translateX(-50%)',
          width: isMobile ? '1468px' : 'max(1658px, calc(100% + 300px))',
          height: '100.63%',
          maxWidth: 'none',
          objectFit: 'cover',
          objectPosition: 'center top',
          pointerEvents: 'none',
        }}
      />

      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: isMobile ? '93px' : '163px',
          background: 'linear-gradient(180deg, #000000 0%, rgba(0, 0, 0, 0) 100%)',
          backdropFilter: isMobile ? 'none' : 'blur(11.75px)',
          WebkitBackdropFilter: isMobile ? 'none' : 'blur(11.75px)',
          WebkitMaskImage: isMobile ? 'none' : 'linear-gradient(180deg, black 0%, transparent 100%)',
          maskImage: isMobile ? 'none' : 'linear-gradient(180deg, black 0%, transparent 100%)',
          pointerEvents: 'none',
        }}
      />

      <div
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          width: '100%',
          height: isMobile ? '452px' : '520px',
          background:
            'linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.3) 25%, rgba(0, 0, 0, 0.75) 44%, #000000 47%)',
          backdropFilter: 'blur(30px)',
          WebkitBackdropFilter: 'blur(30px)',
          WebkitMaskImage:
            'linear-gradient(180deg, transparent 30%, black 99%)',
          maskImage:
            'linear-gradient(180deg, transparent 30%, black 99%)',
          pointerEvents: 'none',
        }}
      />

      <Navbar onTabClick={onTabClick} />

      <div
        style={{
          position: 'absolute',
          top: isMobile ? '509px' : '509px',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          zIndex: 10,
          padding: '0 20px',
          boxSizing: 'border-box',
        }}
      >
        <h1
          style={{
            color: 'white',
            fontFamily: "'Montserrat', sans-serif",
            fontSize: isMobile ? 'clamp(32px, 8.5vw, 40px)' : '72px',
            fontWeight: 600,
            lineHeight: 1.1,
            letterSpacing: isMobile ? '-1.5px' : '-2.3321px',
            textAlign: 'center',
            whiteSpace: isMobile ? 'normal' : 'nowrap',
            maxWidth: isMobile ? '380px' : '1088px',
            margin: 0,
            transform: isLoaded ? 'translateY(0)' : 'translateY(36px)',
            opacity: isLoaded ? 1 : 0,
            transition:
              'transform 1.1s cubic-bezier(0.22, 1, 0.36, 1) 0.3s, opacity 1.1s ease 0.3s',
          }}
        >
          {isMobile ? (
            <>
              Global Retail<br />
              Services Platform<br />
              For Fashion &amp;<br />
              Lifestyle Brands
            </>
          ) : (
            <>
              Global Retail Services Platform <br />
              For Fashion &amp; Lifestyle Brands
            </>
          )}
        </h1>

        <div
          style={{
            display: 'flex',
            flexDirection: isMobile ? 'column' : 'row',
            alignItems: 'center',
            gap: isMobile ? '11px' : '31px',
            marginTop: isMobile ? '28px' : '32px',
            transform: isLoaded ? 'translateY(0)' : 'translateY(24px)',
            opacity: isLoaded ? 1 : 0,
            transition:
              'transform 1.0s cubic-bezier(0.22, 1, 0.36, 1) 0.6s, opacity 1.0s ease 0.6s',
          }}
        >
          <button
            onClick={handleExploreClick}
            style={{
              width: isMobile ? '170px' : '214px',
              height: isMobile ? '38px' : '49px',
              borderRadius: '74px',
              backgroundImage:
                'linear-gradient(90.06deg, rgb(178, 59, 39) 0%, rgb(55, 22, 21) 241.5%)',
              border: 'none',
              outline: 'none',
              cursor: 'pointer',
              fontFamily: "'Montserrat', sans-serif",
              fontSize: isMobile ? '15px' : '18px',
              fontWeight: 600,
              color: '#ffffff',
              boxShadow: '0px 10px 43.3px 0px rgba(0, 0, 0, 0.2)',
              transition:
                'transform 0.2s ease, box-shadow 0.2s ease, filter 0.2s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.boxShadow =
                '0px 14px 45px rgba(178, 59, 39, 0.4)';
              e.currentTarget.style.filter = 'brightness(1.08)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow =
                '0px 10px 43.3px 0px rgba(0, 0, 0, 0.2)';
              e.currentTarget.style.filter = 'brightness(1)';
            }}
          >
            Explore Services
          </button>

          <button
            onClick={handleGetInTouchClick}
            style={{
              width: isMobile ? '170px' : '153px',
              height: isMobile ? '38px' : '49px',
              borderRadius: '74px',
              backgroundColor: isMobile
                ? 'rgba(255, 255, 255, 0.23)'
                : 'rgba(255, 255, 255, 0.12)',
              backdropFilter: 'blur(10px)',
              WebkitBackdropFilter: 'blur(10px)',
              border: '1px solid rgba(255, 255, 255, 0.15)',
              outline: 'none',
              cursor: 'pointer',
              fontFamily: "'Montserrat', sans-serif",
              fontSize: isMobile ? '15px' : '18px',
              fontWeight: 600,
              color: '#ffffff',
              boxShadow: '0px 10px 43.3px 0px rgba(0, 0, 0, 0.2)',
              whiteSpace: 'nowrap',
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition:
                'transform 0.2s ease, box-shadow 0.2s ease, background-color 0.2s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.backgroundColor =
                'rgba(255, 255, 255, 0.28)';
              e.currentTarget.style.boxShadow =
                '0px 14px 45px rgba(255, 255, 255, 0.15)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.backgroundColor = isMobile
                ? 'rgba(255, 255, 255, 0.23)'
                : 'rgba(255, 255, 255, 0.12)';
              e.currentTarget.style.boxShadow =
                '0px 10px 43.3px 0px rgba(0, 0, 0, 0.2)';
            }}
          >
            Get in Touch
          </button>
        </div>
      </div>
    </section>
  );
};
