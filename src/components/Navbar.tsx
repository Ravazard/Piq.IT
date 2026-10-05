import React, { useState, useEffect } from 'react';
import logo from '../assets/logo.png';
import menuIcon from '../assets/icon-menu-list.svg';
import closeIcon from '../assets/icon-close-x.svg';

interface NavTab {
  name: string;
  targetId: string;
  isBold?: boolean;
}

const NAV_TABS: NavTab[] = [
  { name: 'Home', targetId: 'hero', isBold: true },
  { name: 'Design Studio', targetId: 'ecosystem' },
  { name: 'Sourcing Hub', targetId: 'ecosystem' },
  { name: 'Content Lab', targetId: 'ecosystem' },
  { name: 'Commerce Grid', targetId: 'ecosystem' },
];

export interface NavbarProps {
  activeTab?: string;
  onTabClick?: (tabName: string) => void;
  onGetInTouchClick?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab: controlledActiveTab,
  onTabClick,
  onGetInTouchClick,
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [internalActiveTab, setInternalActiveTab] = useState('Home');
  const activeTab = controlledActiveTab !== undefined ? controlledActiveTab : internalActiveTab;
  const [isMobile, setIsMobile] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 900);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);

    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 100);

    return () => {
      window.removeEventListener('resize', checkMobile);
      clearTimeout(timer);
    };
  }, []);

  const handleTabClick = (tab: NavTab) => {
    setInternalActiveTab(tab.name);
    setIsDrawerOpen(false);
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
    setIsDrawerOpen(false);
    if (onGetInTouchClick) {
      onGetInTouchClick();
      return;
    }
    const element = document.getElementById('book-consultation');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <nav
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          padding: isMobile ? '20px 24px 0' : '40px 71px 0',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          zIndex: 20,
          boxSizing: 'border-box',
        }}
      >
        <div
          style={{
            width: isMobile ? '74px' : '97px',
            height: isMobile ? '32px' : '42px',
            position: 'relative',
            cursor: 'pointer',
            transform: isMobile
              ? 'none'
              : isLoaded
              ? 'translateX(0)'
              : 'translateX(45px)',
            opacity: isLoaded ? 1 : 0,
            transition: isMobile
              ? 'opacity 0.6s ease'
              : 'transform 1.0s cubic-bezier(0.22, 1, 0.36, 1) 0.65s, opacity 1.0s ease 0.65s',
          }}
          onClick={() => {
            if (onTabClick) {
              onTabClick('Home');
            } else {
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }
          }}
        >
          <img
            src={logo}
            alt="PiqIt Logo"
            style={{
              width: '144.23%',
              height: '166.67%',
              position: 'absolute',
              left: '-21.15%',
              top: '-20%',
              maxWidth: 'none',
              display: 'block',
            }}
          />
        </div>

        {!isMobile && (
          <div
            style={{
              display: 'flex',
              gap: '36px',
              alignItems: 'center',
              whiteSpace: 'nowrap',
            }}
          >
            {NAV_TABS.map((tab, index) => {
              const dominoDelay = 0.12 + index * 0.11;
              const isSelected = activeTab === tab.name;

              return (
                <div
                  key={tab.name}
                  onClick={() => handleTabClick(tab)}
                  style={{
                    fontFamily: "'Montserrat', sans-serif",
                    fontSize: '18px',
                    fontWeight: isSelected ? 700 : 500,
                    color: isSelected ? '#c5422b' : 'rgba(255, 255, 255, 0.9)',
                    cursor: 'pointer',
                    position: 'relative',
                    padding: '4px 0',
                    transform: isLoaded ? 'translateY(0)' : 'translateY(12px)',
                    opacity: isLoaded ? 1 : 0,
                    transition: `transform 0.8s cubic-bezier(0.22, 1, 0.36, 1) ${dominoDelay}s, opacity 0.8s ease ${dominoDelay}s, color 0.2s ease`,
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = '#c5422b';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = isSelected
                      ? '#c5422b'
                      : 'rgba(255, 255, 255, 0.9)';
                  }}
                >
                  {tab.name}
                </div>
              );
            })}
          </div>
        )}

        {!isMobile && (
          <button
            onClick={handleGetInTouch}
            className="btn btn-primary"
            style={{
              minWidth: '158px',
              width: 'auto',
              height: '49px',
              padding: '0 24px',
              whiteSpace: 'nowrap',
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
              borderRadius: '50px',
              fontSize: '16px',
              fontWeight: 600,
              fontFamily: "'Montserrat', sans-serif",
              cursor: 'pointer',
              transform: isLoaded ? 'translateX(0)' : 'translateX(-45px)',
              opacity: isLoaded ? 1 : 0,
              transition:
                'transform 1.0s cubic-bezier(0.22, 1, 0.36, 1) 0.65s, opacity 1.0s ease 0.65s, box-shadow 0.25s ease',
            }}
          >
            Get in Touch
          </button>
        )}

        {isMobile && (
          <button
            onClick={() => setIsDrawerOpen(true)}
            aria-label="Open Navigation Menu"
            style={{
              background: 'transparent',
              border: 'none',
              padding: '4px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '36px',
              height: '36px',
              opacity: isLoaded ? 1 : 0,
              transition: 'opacity 0.6s ease',
            }}
          >
            <img src={menuIcon} alt="Menu" style={{ width: '32px', height: '32px' }} />
          </button>
        )}
      </nav>

      {isMobile && (
        <>
          <div
            onClick={() => setIsDrawerOpen(false)}
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              width: '100vw',
              height: '100vh',
              backgroundColor: 'rgba(0, 0, 0, 0.5)',
              zIndex: 998,
              opacity: isDrawerOpen ? 1 : 0,
              pointerEvents: isDrawerOpen ? 'auto' : 'none',
              transition: 'opacity 0.35s ease',
            }}
          />

          <div
            style={{
              position: 'fixed',
              top: 0,
              right: 0,
              width: '276px',
              maxWidth: '85vw',
              height: '100vh',
              backgroundColor: 'rgba(0, 0, 0, 0.65)',
              backdropFilter: 'blur(16px)',
              WebkitBackdropFilter: 'blur(16px)',
              zIndex: 999,
              display: 'flex',
              flexDirection: 'column',
              padding: '25px 24px',
              boxSizing: 'border-box',
              transform: isDrawerOpen ? 'translateX(0)' : 'translateX(100%)',
              transition: 'transform 0.4s cubic-bezier(0.22, 1, 0.36, 1)',
              boxShadow: isDrawerOpen ? '-10px 0 30px rgba(0, 0, 0, 0.5)' : 'none',
            }}
          >
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                width: '100%',
              }}
            >
              <button
                onClick={handleGetInTouch}
                style={{
                  background: '#c5422b',
                  color: '#ffffff',
                  border: 'none',
                  borderRadius: '72px',
                  height: '38px',
                  padding: '0 20px',
                  fontFamily: "'Montserrat', sans-serif",
                  fontSize: '15px',
                  fontWeight: 600,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  letterSpacing: '-0.5px',
                  whiteSpace: 'nowrap',
                  flexShrink: 0,
                }}
              >
                Get in Touch
              </button>

              <button
                onClick={() => setIsDrawerOpen(false)}
                aria-label="Close Navigation Menu"
                style={{
                  background: 'transparent',
                  border: 'none',
                  padding: 0,
                  cursor: 'pointer',
                  width: '32px',
                  height: '32px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <img src={closeIcon} alt="Close" style={{ width: '32px', height: '32px' }} />
              </button>
            </div>

            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '20px',
                marginTop: '45px',
              }}
            >
              {NAV_TABS.map((tab) => {
                const isSelected = activeTab === tab.name;
                return (
                  <div
                    key={tab.name}
                    onClick={() => handleTabClick(tab)}
                    style={{
                      fontFamily: "'Montserrat', sans-serif",
                      fontSize: '18px',
                      fontWeight: isSelected ? 700 : 500,
                      color: isSelected ? '#c5422b' : '#ededed',
                      cursor: 'pointer',
                      transition: 'color 0.2s ease',
                    }}
                  >
                    {tab.name}
                  </div>
                );
              })}
            </div>

            <div
              style={{
                width: '100%',
                height: '1px',
                backgroundColor: 'rgba(255, 255, 255, 0.15)',
                marginTop: '32px',
              }}
            />
          </div>
        </>
      )}
    </>
  );
};
