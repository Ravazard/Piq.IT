import React, { useState, useEffect, useRef } from 'react';
import imgTrendIntelligence from '../../assets/design-studio-trend-intelligence.png';
import imgDataDriven from '../../assets/design-studio-data-driven.png';
import imgTechPacks from '../../assets/design-studio-tech-packs.png';
import imgVirtualSampling from '../../assets/design-studio-virtual-sampling.png';

import iconTrend from '../../assets/design-studio-icon-trend.svg';
import iconDataDesign from '../../assets/design-studio-icon-data-design.svg';
import iconTechPacks from '../../assets/design-studio-icon-tech-packs.svg';
import iconVirtualSampling from '../../assets/design-studio-icon-virtual-sampling.svg';
import pattern1 from '../../assets/design-studio-pattern-1.svg';
import iconArrowCircle from '../../assets/icon-arrow-circle-orange.svg';
import { useMobileCardState } from '../../hooks/useMobileScrollActive';

interface DesignStudioCapabilityCardProps {
  id: string;
  frontImage: string;
  frontTitle: React.ReactNode;
  frontTopIcon?: string;
  frontImagePosition?: string;
  backTitle: React.ReactNode;
  backDescription: string;
  backIcon: string;
  backPattern?: string;
  isMobile: boolean;
  isVisible: boolean;
  entranceDelay: number;
  initialFlipped?: boolean;
}

const DesignStudioCapabilityCard: React.FC<DesignStudioCapabilityCardProps> = ({
  frontImage,
  frontTitle,
  frontTopIcon,
  frontImagePosition = 'center center',
  backTitle,
  backDescription,
  backIcon,
  backPattern = pattern1,
  isMobile,
  isVisible,
  entranceDelay,
  initialFlipped = false,
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [mobileInView, setMobileInView] = useState(false);

  const { isActive, toggle: toggleCard } = useMobileCardState(cardRef, isMobile, {
    isHovered,
    initialActive: initialFlipped,
  });

  useEffect(() => {
    if (!isMobile) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setMobileInView(true);
        } else if (entry.boundingClientRect.top > window.innerHeight) {
          setMobileInView(false);
        }
      },
      { threshold: 0.15 }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => observer.disconnect();
  }, [isMobile]);

  const showEntrance = isMobile ? mobileInView : isVisible;

  const handleCardClick = () => {
    toggleCard();
  };

  const handleGoButtonClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleCard();
  };

  return (
    <div
      ref={cardRef}
      style={{
        position: 'relative',
        width: '100%',
        maxWidth: isMobile ? '324px' : 'none',
        boxSizing: 'border-box',
        transform: showEntrance
          ? 'translateX(0)'
          : isMobile
            ? 'translateX(-70px)'
            : 'translateX(-140px)',
        opacity: 1,
        transition: showEntrance
          ? `transform 0.9s cubic-bezier(0.16, 1, 0.3, 1) ${isMobile ? 0.05 : entranceDelay}s`
          : 'none',
      }}
    >
      <div
        onClick={handleCardClick}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        style={{
          position: 'relative',
          width: '100%',
          maxWidth: isMobile ? '324px' : 'none',
          height: isMobile ? '350px' : '348px',
          borderRadius: '20px',
          overflow: 'hidden',
          boxShadow: isActive
            ? '0 24px 50px rgba(0, 0, 0, 0.35), 0 8px 20px rgba(197, 66, 43, 0.25)'
            : '0 8px 28px rgba(0, 0, 0, 0.15)',
          transform: isActive ? 'translateY(-8px) scale(1.015)' : 'translateY(0) scale(1)',
          border: isActive
            ? '1px solid rgba(197, 66, 43, 0.45)'
            : '1px solid rgba(255, 255, 255, 0.06)',
          transition:
            'transform 0.45s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.45s ease, border-color 0.35s ease',
          cursor: 'pointer',
          userSelect: 'none',
          boxSizing: 'border-box',
        }}
      >
        <img
          src={frontImage}
          alt=""
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            objectPosition: frontImagePosition,
            transform: isActive ? 'scale(1.06)' : 'scale(1)',
            transition: 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
            pointerEvents: 'none',
          }}
          draggable={false}
        />

        {frontTopIcon && isMobile && (
          <div
            style={{
              position: 'absolute',
              top: '20px',
              left: '20px',
              width: '54px',
              height: '54px',
              zIndex: 2,
              opacity: isActive ? 0 : 1,
              transition: 'opacity 0.4s ease',
              pointerEvents: 'none',
            }}
          >
            <img
              src={frontTopIcon}
              alt=""
              style={{ width: '100%', height: '100%', objectFit: 'contain' }}
              draggable={false}
            />
          </div>
        )}

        <div
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            width: '100%',
            height: isMobile ? '130px' : '124px',
            backdropFilter: 'blur(11.75px)',
            WebkitBackdropFilter: 'blur(11.75px)',
            background: 'linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.92) 100%)',
            padding: '24px',
            boxSizing: 'border-box',
            display: 'flex',
            alignItems: 'flex-end',
            justifyContent: 'space-between',
            opacity: isActive ? 0 : 1,
            transition: 'opacity 0.4s ease',
            zIndex: 1,
            pointerEvents: 'none',
          }}
        >
          <h3
            style={{
              fontFamily: "'Montserrat', sans-serif",
              fontWeight: 600,
              fontSize: isMobile ? '32px' : '36px',
              lineHeight: 1.1,
              letterSpacing: '-2.3321px',
              color: '#fff9f0',
              margin: 0,
              maxWidth: isMobile ? '200px' : '230px',
            }}
          >
            {frontTitle}
          </h3>

          {isMobile && (
            <div
              onClick={handleGoButtonClick}
              style={{
                cursor: 'pointer',
                pointerEvents: 'auto',
                flexShrink: 0,
              }}
            >
              <img
                src={iconArrowCircle}
                alt="Toggle details"
                style={{ width: '48px', height: '48px', display: 'block' }}
              />
            </div>
          )}
        </div>

        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundColor: '#fff9f0',
            borderRadius: '20px',
            opacity: isActive ? 1 : 0,
            transition: 'opacity 0.45s cubic-bezier(0.16, 1, 0.3, 1)',
            zIndex: 2,
            padding: '26px 24px',
            boxSizing: 'border-box',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            pointerEvents: 'none',
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <img
              src={backIcon}
              alt=""
              style={{ width: '55px', height: '55px', objectFit: 'contain' }}
              draggable={false}
            />
            {backPattern && (
              <img
                src={backPattern}
                alt=""
                style={{
                  width: '160px',
                  height: '65px',
                  objectFit: 'contain',
                  opacity: isActive ? 0.95 : 0.65,
                  transform: isActive ? 'scale(1.08)' : 'scale(1)',
                  transition: 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.4s ease',
                  marginRight: '-10px',
                  marginTop: '-10px',
                }}
                draggable={false}
              />
            )}
          </div>

          <div style={{ marginTop: 'auto' }}>
            <h3
              style={{
                fontFamily: "'Montserrat', sans-serif",
                fontWeight: 600,
                fontSize: isMobile ? '32px' : '36px',
                lineHeight: 1.1,
                letterSpacing: '-2.3321px',
                color: '#492020',
                margin: '0 0 16px 0',
                maxWidth: '240px',
              }}
            >
              {backTitle}
            </h3>
            <p
              style={{
                fontFamily: "'Montserrat', sans-serif",
                fontWeight: 400,
                fontSize: '15px',
                lineHeight: 1.35,
                letterSpacing: '-0.3px',
                color: '#492020',
                margin: 0,
                opacity: 0.9,
              }}
            >
              {backDescription}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export const DesignStudioCapabilities: React.FC = () => {
  const cardsGridRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 900);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    if (isMobile) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        } else if (entry.boundingClientRect.top > window.innerHeight) {
          setIsVisible(false);
        }
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    );

    if (cardsGridRef.current) {
      observer.observe(cardsGridRef.current);
    }

    return () => observer.disconnect();
  }, [isMobile]);

  return (
    <section
      id="core-capabilities"
      style={{
        position: 'relative',
        width: '100%',
        background: isMobile
          ? 'linear-gradient(85.75deg, rgb(52, 20, 19) 36.44%, rgb(170, 57, 37) 206.63%)'
          : 'linear-gradient(120.66deg, rgb(52, 20, 19) 18.01%, rgb(170, 57, 37) 100%)',
        padding: isMobile ? '70px 24px 80px' : '100px 71px 110px',
        boxSizing: 'border-box',
        overflow: 'hidden',
      }}
    >
      <div style={{ maxWidth: '1360px', margin: '0 auto', width: '100%' }}>
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            padding: '8px 24px',
            borderRadius: '36px',
            border: '1px solid #c5422b',
            background: 'rgba(197, 66, 43, 0.12)',
            color: '#fff9f0',
            fontFamily: "'Montserrat', sans-serif",
            fontSize: isMobile ? '14px' : '16px',
            fontWeight: 600,
            marginBottom: '20px',
          }}
        >
          Our Expertise
        </div>

        <h2
          style={{
            fontFamily: "'Montserrat', sans-serif",
            fontWeight: 700,
            fontSize: isMobile ? '36px' : '60px',
            lineHeight: 1.15,
            letterSpacing: '-2.3321px',
            color: '#ffffff',
            margin: '0 0 54px 0',
            maxWidth: '900px',
          }}
        >
          From Concept To <span style={{ color: '#c5422b' }}>Collection</span>
          <br />
          Shaped By <span style={{ color: '#c5422b' }}>Intelligence</span>
        </h2>

        <div
          ref={cardsGridRef}
          style={{
            display: isMobile ? 'flex' : 'grid',
            flexDirection: isMobile ? 'column' : undefined,
            gridTemplateColumns: isMobile ? undefined : 'repeat(4, 1fr)',
            gap: isMobile ? '32px' : '24px',
            alignItems: isMobile ? 'center' : 'stretch',
            width: '100%',
          }}
        >
          <DesignStudioCapabilityCard
            id="card-trend-intelligence"
            frontImage={imgTrendIntelligence}
            frontImagePosition={isMobile ? '78% center' : '72% center'}
            frontTitle="Trend Intelligence"
            backTitle="Trend Intelligence"
            backDescription="Spotting what’s next to shape for meaningful market ready designs"
            backIcon={iconTrend}
            isMobile={isMobile}
            isVisible={isVisible}
            entranceDelay={0}
          />

          <DesignStudioCapabilityCard
            id="card-data-driven"
            frontImage={imgDataDriven}
            frontImagePosition={isMobile ? '82% center' : '78% center'}
            frontTitle="Data-Driven Design"
            backTitle="Data-Driven Design"
            backDescription="Data and insight, turned into design that works"
            backIcon={iconDataDesign}
            isMobile={isMobile}
            isVisible={isVisible}
            entranceDelay={0.18}
          />

          <DesignStudioCapabilityCard
            id="card-tech-packs"
            frontImage={imgTechPacks}
            frontImagePosition={isMobile ? '67% 20%' : '64% 20%'}
            frontTitle={isMobile ? 'Tech Pack Synthesis' : 'Tech Packs'}
            backTitle={isMobile ? 'Tech Pack Synthesis' : 'Tech Pack'}
            backDescription="Seamless development of clear, detailed, production-ready tech packs"
            backIcon={iconTechPacks}
            isMobile={isMobile}
            isVisible={isVisible}
            entranceDelay={0.36}
          />

          <DesignStudioCapabilityCard
            id="card-virtual-sampling"
            frontImage={imgVirtualSampling}
            frontImagePosition={isMobile ? '22% center' : '10% center'}
            frontTitle={isMobile ? 'Design Visualization' : (
              <>
                Virtual <br />
                Sampling
              </>
            )}
            backTitle={isMobile ? 'Design Visualization' : (
              <>
                Virtual <br />
                Sampling
              </>
            )}
            backDescription="See your ideas come to life, in real time"
            backIcon={iconVirtualSampling}
            isMobile={isMobile}
            isVisible={isVisible}
            entranceDelay={0.54}
          />
        </div>
      </div>
    </section>
  );
};

