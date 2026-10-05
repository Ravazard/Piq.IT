import React, { useRef, useState, useEffect } from 'react';
import buildBg from '../assets/pathways/pathways-build-bg.png';
import enterBg from '../assets/pathways/pathways-enter-bg.png';
import scaleBg from '../assets/pathways/pathways-scale-bg.png';
import vector5 from '../assets/pathways/pathways-vector5.svg';
import vector6 from '../assets/pathways/pathways-vector6.svg';
import vector7 from '../assets/pathways/pathways-vector7.svg';
import vector8 from '../assets/pathways/pathways-vector8.svg';
import vector9 from '../assets/pathways/pathways-vector9.svg';
import { PathwaysCard } from './common';

export const ExpansionPathways: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  const [isSectionVisible, setIsSectionVisible] = useState(false);
  const [lineProgress, setLineProgress] = useState(false);
  const [dot1Active, setDot1Active] = useState(false);
  const [dot2Active, setDot2Active] = useState(false);
  const [dot3Active, setDot3Active] = useState(false);
  const [cardsVisible, setCardsVisible] = useState(false);

  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeftState, setScrollLeftState] = useState(0);
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
          setIsSectionVisible(true);
        }
      },
      { threshold: 0.05 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isSectionVisible) return;

    if (isMobile) {
      setCardsVisible(true);
      return;
    }

    const t1 = setTimeout(() => {
      setLineProgress(true);
      setDot1Active(true);
    }, 100);

    const t2 = setTimeout(() => {
      setDot2Active(true);
    }, 450);

    const t3 = setTimeout(() => {
      setDot3Active(true);
    }, 800);

    const t4 = setTimeout(() => {
      setCardsVisible(true);
    }, 200);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
    };
  }, [isSectionVisible, isMobile]);

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!scrollRef.current) return;
    setIsDragging(true);
    setStartX(e.pageX - scrollRef.current.offsetLeft);
    setScrollLeftState(scrollRef.current.scrollLeft);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !scrollRef.current) return;
    e.preventDefault();
    const x = e.pageX - scrollRef.current.offsetLeft;
    const walk = (x - startX) * 1.5;
    scrollRef.current.scrollLeft = scrollLeftState - walk;
  };

  const handleMouseUpOrLeave = () => {
    setIsDragging(false);
  };

  const handleWheel = (e: React.WheelEvent) => {
    if (!scrollRef.current) return;
    if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
      const atStart = scrollRef.current.scrollLeft <= 0;
      const atEnd =
        scrollRef.current.scrollLeft + scrollRef.current.clientWidth >=
        scrollRef.current.scrollWidth - 1;

      if ((e.deltaY > 0 && !atEnd) || (e.deltaY < 0 && !atStart)) {
        scrollRef.current.scrollLeft += e.deltaY;
      }
    }
  };

  const handleBookDemo = () => {
    const el = document.getElementById('book-consultation');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="pathways"
      ref={sectionRef}
      style={{
        backgroundImage:
          'linear-gradient(127.53829562964903deg, rgb(255, 249, 240) 48.005%, rgb(153, 149, 144) 153.14%)',
        padding: isMobile ? '60px 20px 80px 20px' : '100px 71px 120px 71px',
        overflow: 'hidden',
        position: 'relative',
        width: '100%',
        boxSizing: 'border-box',
      }}
    >
      <div
        style={{
          maxWidth: '1254px',
          margin: '0 auto',
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            marginBottom: isMobile ? '32px' : '50px',
          }}
        >
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              border: '1px solid #c5422b',
              borderRadius: '36px',
              padding: isMobile ? '8px 24px' : '11px 32px',
              color: '#c5422b',
              fontSize: isMobile ? '16px' : '24px',
              fontWeight: 600,
              letterSpacing: '-1px',
              width: 'fit-content',
              marginBottom: isMobile ? '20px' : '36px',
              userSelect: 'none',
            }}
          >
            Growth Journey
          </div>

          <div>
            {isMobile ? (
              <h2
                style={{
                  fontFamily: "'Montserrat', sans-serif",
                  fontSize: 'clamp(32px, 8vw, 44px)',
                  fontWeight: 600,
                  lineHeight: 1.1,
                  letterSpacing: '-1.5px',
                  color: '#000000',
                  margin: 0,
                }}
              >
                From <span style={{ color: '#c5422b' }}>Building</span>
                <br />
                Your Brand
                <br />
                to <span style={{ color: '#c5422b' }}>Scaling</span>
                <br />
                Your Business
              </h2>
            ) : (
              <h2
                style={{
                  fontFamily: "'Montserrat', sans-serif",
                  fontSize: '60px',
                  fontWeight: 600,
                  lineHeight: 1.1,
                  letterSpacing: '-2.3321px',
                  color: '#000000',
                  margin: 0,
                }}
              >
                From <span style={{ color: '#c5422b' }}>Building</span> Your Brand
                <br />
                to <span style={{ color: '#c5422b' }}>Scaling</span> Your Business
              </h2>
            )}
          </div>
        </div>

        {!isMobile && (
          <div
            style={{
              position: 'relative',
              width: '100%',
              maxWidth: '1254px',
              height: '31px',
              marginBottom: '35px',
            }}
          >
            <div
              style={{
                position: 'absolute',
                left: '199px',
                right: '199px',
                top: '50%',
                height: '1px',
                backgroundColor: 'rgba(0,0,0,0.18)',
                transform: 'translateY(-50%)',
              }}
            />

            <div
              style={{
                position: 'absolute',
                left: '199px',
                right: '199px',
                top: '50%',
                height: '2px',
                backgroundColor: '#c5422b',
                transformOrigin: 'left center',
                transform: lineProgress ? 'scaleX(1)' : 'scaleX(0)',
                transition: 'transform 1.2s cubic-bezier(0.4, 0, 0.2, 1)',
              }}
            />

            <div
              style={{
                position: 'absolute',
                left: '199px',
                top: '50%',
                width: '31px',
                height: '31px',
                borderRadius: '50%',
                backgroundColor: '#c5422b',
                transform: `translate(-50%, -50%) scale(${dot1Active ? 1 : 0})`,
                transition: 'transform 0.45s cubic-bezier(0.34, 1.56, 0.64, 1)',
                zIndex: 3,
              }}
            />

            <div
              style={{
                position: 'absolute',
                left: '627px',
                top: '50%',
                width: '31px',
                height: '31px',
                borderRadius: '50%',
                backgroundColor: '#c5422b',
                transform: `translate(-50%, -50%) scale(${dot2Active ? 1 : 0})`,
                transition: 'transform 0.45s cubic-bezier(0.34, 1.56, 0.64, 1)',
                zIndex: 3,
              }}
            />

            <div
              style={{
                position: 'absolute',
                left: '1055px',
                top: '50%',
                width: '31px',
                height: '31px',
                borderRadius: '50%',
                backgroundColor: '#c5422b',
                transform: `translate(-50%, -50%) scale(${dot3Active ? 1 : 0})`,
                transition: 'transform 0.45s cubic-bezier(0.34, 1.56, 0.64, 1)',
                zIndex: 3,
              }}
            />
          </div>
        )}

        <div
          ref={scrollRef}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUpOrLeave}
          onMouseLeave={handleMouseUpOrLeave}
          onWheel={handleWheel}
          style={{
            display: 'flex',
            flexDirection: isMobile ? 'column' : 'row',
            alignItems: 'center',
            gap: isMobile ? '24px' : '30px',
            overflowX: isMobile ? 'visible' : 'auto',
            overflowY: 'visible',
            paddingBottom: '20px',
            cursor: isDragging ? 'grabbing' : 'default',
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
          }}
        >
          <PathwaysCard
            id="pathways-build"
            tag="Build"
            bgImage={buildBg}
            
            pointers={[
              'Trend & Product Insights',
              'AI-powered design',
              'Product Development',
            ]}
            subheading="Build What’s Next"
            description="Turn ideas into market-ready products with fashion expertise, AI-powered design, sourcing and content"
            wireframes={[
              {
                src: vector5,
                width: '312px',
                height: '123px',
                left: '104px',
                top: '329px',
                transform: 'rotate(180deg)',
              },
              {
                src: vector6,
                width: '119px',
                height: '136px',
                left: '-8px',
                top: '293px',
                transform: 'rotate(180deg)',
              },
            ]}
            isVisible={cardsVisible}
            entranceDelay={0}
          />

          <PathwaysCard
            id="pathways-enter"
            tag="Enter"
            bgImage={enterBg}
            bgImageStyle={{
              objectPosition: 'top center',
            }}
            pointers={[
              'Market Entry',
              'Compliance & IOR',
              'Marketplace Onboarding',
            ]}
            subheading={
              <>
                Enter New<br />
                Markets
              </>
            }
            description="Launch and grow with marketplace access, local operations, warehousing and distribution infrastructure"
            wireframes={[
              {
                src: vector7,
                width: '312px',
                height: '123px',
                left: '104px',
                top: '329px',
                transform: 'rotate(180deg)',
              },
            ]}
            isVisible={cardsVisible}
            entranceDelay={0.2}
          />

          <PathwaysCard
            id="pathways-scale"
            tag="Scale"
            bgImage={scaleBg}
            pointers={[
              'Channel Optimisation',
              'Inventory & Fulfilment',
              'Marketplace Growth',
            ]}
            subheading={
              <>
                Scale Across <br />
                Channels
              </>
            }
            description="Grow seamlessly across marketplaces, Brand Website, omnichannel and quick commerce with one connected commerce ecosystem"
            wireframes={[
              {
                src: vector8,
                width: '312px',
                height: '123px',
                left: '104px',
                top: '329px',
                transform: 'rotate(180deg)',
              },
              {
                src: vector9,
                width: '119px',
                height: '136px',
                left: '-8px',
                top: '293px',
                transform: 'rotate(180deg)',
              },
            ]}
            isVisible={cardsVisible}
            entranceDelay={0.4}
          />
        </div>

        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            marginTop: isMobile ? '40px' : '56px',
          }}
        >
          <button
            onClick={handleBookDemo}
            style={{
              width: '182px',
              height: '49px',
              borderRadius: '74px',
              background: 'linear-gradient(to right, #c5422b, #5f2015)',
              boxShadow: '0px 10px 43.3px 0px rgba(0, 0, 0, 0.2)',
              border: 'none',
              color: '#ffffff',
              fontSize: '18px',
              fontWeight: 600,
              fontFamily: "'Montserrat', sans-serif",
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'transform 0.25s ease, box-shadow 0.25s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.boxShadow =
                '0px 14px 48px 0px rgba(0, 0, 0, 0.28)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow =
                '0px 10px 43.3px 0px rgba(0, 0, 0, 0.2)';
            }}
          >
            Book a Demo
          </button>
        </div>
      </div>
    </section>
  );
};
