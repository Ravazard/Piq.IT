import React, { useRef, useState, useEffect } from 'react';
import piqitLogoWhite from '../assets/piqit-logo-white.png';

export interface FooterProps {
  onTabClick?: (tabName: string) => void;
  onGetInTouchClick?: () => void;
  className?: string;
  style?: React.CSSProperties;
}

const FOOTER_TABS = [
  { name: 'Home', targetId: 'hero' },
  { name: 'Design Studio', targetId: 'ecosystem' },
  { name: 'Sourcing Hub', targetId: 'ecosystem' },
  { name: 'Content lab', targetId: 'ecosystem' },
  { name: 'Commerce Grid', targetId: 'ecosystem' },
];

const STRIPE_GRADIENTS = [
  'linear-gradient(199.17deg, rgb(55, 20, 20) 4.31%, rgb(0, 0, 0) 77.22%)',
  'linear-gradient(189.68deg, rgb(56, 22, 21) 0.25%, rgb(0, 0, 0) 100.2%)',
  'linear-gradient(189.75deg, rgb(85, 38, 36) 8.44%, rgb(0, 0, 0) 100%)',
  'linear-gradient(185.78deg, rgb(135, 50, 35) 0.93%, rgb(0, 0, 0) 97.96%)',
  'linear-gradient(180deg, #c5422b 0%, #000000 100%)',
  'linear-gradient(182.67deg, rgb(197, 66, 43) 7.59%, rgb(0, 0, 0) 99.56%)',
  'linear-gradient(185.78deg, rgb(135, 50, 35) 0.93%, rgb(0, 0, 0) 97.96%)',
  'linear-gradient(189.75deg, rgb(85, 38, 36) 8.44%, rgb(0, 0, 0) 100%)',
  'linear-gradient(189.68deg, rgb(56, 22, 21) 0.25%, rgb(0, 0, 0) 100.2%)',
  'linear-gradient(199.17deg, rgb(55, 20, 20) 4.31%, rgb(0, 0, 0) 77.22%)',
];

export const Footer: React.FC<FooterProps> = ({
  onTabClick,
  onGetInTouchClick,
  className = '',
  style = {},
}) => {
  const footerRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.15 }
    );

    if (footerRef.current) {
      observer.observe(footerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const handleTabClick = (tab: { name: string; targetId: string }) => {
    if (onTabClick) {
      onTabClick(tab.name);
      return;
    }
    const element = document.getElementById(tab.targetId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleGetInTouch = () => {
    if (onGetInTouchClick) {
      onGetInTouchClick();
      return;
    }
    const consultationElem = document.getElementById('book-consultation');
    if (consultationElem) {
      consultationElem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer
      ref={footerRef}
      id="footer"
      className={className}
      style={{
        position: 'relative',
        width: '100%',
        minHeight: isMobile ? '860px' : '743px',
        overflow: 'hidden',
        boxSizing: 'border-box',
        backgroundColor: '#000000',
        ...style,
      }}
    >
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          width: '100%',
          height: '100%',
          pointerEvents: 'none',
          zIndex: 0,
        }}
      >
        {STRIPE_GRADIENTS.map((gradient, index) => (
          <div
            key={index}
            style={{
              flex: 1,
              height: '100%',
              backgroundImage: gradient,
            }}
          />
        ))}
      </div>

      <div
        style={{
          position: 'relative',
          zIndex: 1,
          maxWidth: '1256px',
          margin: '0 auto',
          padding: isMobile ? '60px 24px 35px 24px' : '75px 24px 35px 24px',
          boxSizing: 'border-box',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          minHeight: isMobile ? '860px' : '743px',
        }}
      >
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            flexDirection: isMobile ? 'column' : 'row',
            flexWrap: 'wrap',
            gap: isMobile ? '28px' : '40px',
          }}
        >
          <div
            style={{
              flex: isMobile ? 'none' : '1 1 550px',
              maxWidth: isMobile ? '100%' : '805px',
              transform: isVisible ? 'translateY(0)' : 'translateY(28px)',
              opacity: isVisible ? 1 : 0,
              transition:
                'transform 1.2s cubic-bezier(0.22, 1, 0.36, 1), opacity 1.2s ease',
            }}
          >
            <h2
              style={{
                fontFamily: "'Montserrat', sans-serif",
                fontSize: isMobile ? 'clamp(32px, 8vw, 44px)' : '64px',
                fontWeight: 700,
                lineHeight: 1.1,
                color: '#ffffff',
                margin: '0 0 16px 0',
                letterSpacing: isMobile ? '-1px' : '-1.5px',
                textTransform: 'capitalize',
              }}
            >
              Let's start the conversation
            </h2>

            <p
              style={{
                fontFamily: "'Montserrat', sans-serif",
                fontSize: '14px',
                fontWeight: 400,
                lineHeight: 1.45,
                color: '#ffffff',
                maxWidth: isMobile ? '100%' : '395px',
                margin: isMobile ? '0 0 24px 0' : '0 0 40px 0',
                opacity: 0.9,
              }}
            >
              Starting Fresh, Entering India, or Already Here, We'll Make Your Next Move Count
            </p>

            <button
              onClick={handleGetInTouch}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: isMobile ? '170px' : 'auto',
                height: isMobile ? '40px' : '43.3px',
                padding: isMobile ? '0 20px' : '0 32px',
                backgroundColor: '#c5422b',
                borderRadius: '50px',
                border: 'none',
                outline: 'none',
                cursor: 'pointer',
                fontFamily: "'Montserrat', sans-serif",
                fontSize: isMobile ? '16px' : '18px',
                fontWeight: 500,
                color: '#ffffff',
                textTransform: 'capitalize',
                boxShadow: '0px 10px 43.3px 0px rgba(0, 0, 0, 0.2)',
                transition:
                  'transform 0.25s ease, box-shadow 0.25s ease, background-color 0.2s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow =
                  '0px 14px 45px rgba(197, 66, 43, 0.4)';
                e.currentTarget.style.backgroundColor = '#b23b27';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow =
                  '0px 10px 43.3px 0px rgba(0, 0, 0, 0.2)';
                e.currentTarget.style.backgroundColor = '#c5422b';
              }}
            >
              Get in Touch
            </button>
          </div>

          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: isMobile ? '18px' : '29px',
              paddingTop: isMobile ? '16px' : '10px',
              minWidth: isMobile ? '100%' : '200px',
            }}
          >
            {FOOTER_TABS.map((tab, index) => {
              const tabDelay = index * 0.15;

              return (
                <div
                  key={tab.name}
                  onClick={() => handleTabClick(tab)}
                  style={{
                    fontFamily: "'Montserrat', sans-serif",
                    fontSize: isMobile ? '18px' : '20px',
                    fontWeight: 400,
                    letterSpacing: '-0.3px',
                    color: '#ffffff',
                    cursor: 'pointer',
                    userSelect: 'none',
                    transform: isVisible
                      ? 'translateY(0)'
                      : 'translateY(24px)',
                    opacity: isVisible ? 1 : 0,
                    transition: `transform 1.0s cubic-bezier(0.22, 1, 0.36, 1) ${tabDelay}s, opacity 1.0s ease ${tabDelay}s, color 0.25s ease`,
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = '#c5422b';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = '#ffffff';
                  }}
                >
                  {tab.name}
                </div>
              );
            })}
          </div>
        </div>

        <div
          style={{
            display: 'flex',
            justifyContent: isMobile ? 'flex-start' : 'center',
            alignItems: 'center',
            margin: isMobile ? '36px 0 20px 0' : '40px 0 25px 0',
            transform: isVisible ? 'translateY(0)' : 'translateY(16px)',
            opacity: isVisible ? 1 : 0,
            transition:
              'transform 1.2s cubic-bezier(0.22, 1, 0.36, 1) 0.4s, opacity 1.2s ease 0.4s',
          }}
        >
          <img
            src={piqitLogoWhite}
            alt="Piqit Logo"
            style={{
              width: isMobile ? '140px' : '172px',
              height: isMobile ? '70px' : '86px',
              objectFit: 'contain',
              display: 'block',
              pointerEvents: 'none',
            }}
            draggable={false}
          />
        </div>

        <div>
          <div
            style={{
              width: '100%',
              height: '1px',
              backgroundColor: '#818181',
              opacity: 0.6,
              marginBottom: '13px',
            }}
          />

          <div
            style={{
              fontFamily: "'Open Sans', 'Montserrat', sans-serif",
              fontSize: isMobile ? '13px' : '18px',
              fontWeight: 400,
              color: '#ffffff',
              lineHeight: 1.5,
              display: 'flex',
              alignItems: 'center',
              flexWrap: 'wrap',
              gap: '6px',
            }}
          >
            <span>© 2026 Piqit. All rights reserved. | Developed with</span>
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="#c5422b"
              style={{
                display: 'inline-block',
                verticalAlign: 'middle',
                filter: 'drop-shadow(0 0 6px rgba(197, 66, 43, 0.4))',
              }}
              aria-label="love"
            >
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
            </svg>
            <span>by</span>
            <a
              href="https://www.astraix.in"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                color: '#ffffff',
                textDecoration: 'none',
                fontWeight: 600,
                transition: 'color 0.2s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = '#c5422b';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = '#ffffff';
              }}
            >
              Astraix
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
