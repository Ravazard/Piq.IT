import React, { useState, useEffect, useRef } from 'react';
import card1Img from '../../assets/sourcing-hub-card1.png';
import card2Img from '../../assets/sourcing-hub-card2.png';
import card3Img from '../../assets/sourcing-hub-card3.png';
import card4Img from '../../assets/sourcing-hub-card4.png';
import pattern1 from '../../assets/design-studio-pattern-1.svg';
import pattern2 from '../../assets/sourcing-hub-pattern-2.svg';
import { useMobileCardState } from '../../hooks/useMobileScrollActive';

interface SourcingCapabilityCardProps {
  id: string;
  title: string;
  description: string;
  image: string;
  pattern: string;
  imagePosition: 'top' | 'bottom';
  isMobile: boolean;
  isVisible: boolean;
  entranceDelay: number;
}

const SourcingCapabilityCard: React.FC<SourcingCapabilityCardProps> = ({
  title,
  description,
  image,
  pattern,
  imagePosition,
  isMobile,
  isVisible,
  entranceDelay,
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [mobileInView, setMobileInView] = useState(false);

  const { isActive, toggle: toggleCard } = useMobileCardState(cardRef, isMobile, {
    isHovered,
  });

  const handleCardClick = () => {
    if (isMobile) {
      toggleCard();
    }
  };

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

  const textBlock = (
    <div
      style={{
        padding: '28px 24px',
        boxSizing: 'border-box',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        position: 'relative',
        zIndex: 2,
        flex: 1,
      }}
    >
      <img
        src={pattern}
        alt=""
        style={{
          position: 'absolute',
          top: imagePosition === 'bottom' ? '12px' : 'auto',
          bottom: imagePosition === 'top' ? '12px' : 'auto',
          right: '12px',
          width: '120px',
          height: '60px',
          objectFit: 'contain',
          opacity: isActive ? 0.95 : 0.6,
          transform: isActive ? 'scale(1.08)' : 'scale(1)',
          transition: 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.4s ease',
          pointerEvents: 'none',
        }}
        draggable={false}
      />

      <h3
        style={{
          fontFamily: "'Montserrat', sans-serif",
          fontWeight: 600,
          fontSize: isMobile ? '30px' : '34px',
          lineHeight: 1.15,
          letterSpacing: '-2px',
          color: '#492020',
          margin: '0 0 14px 0',
          position: 'relative',
          zIndex: 3,
        }}
      >
        {title}
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
          position: 'relative',
          zIndex: 3,
        }}
      >
        {description}
      </p>
    </div>
  );

  const imageBlock = (
    <div
      style={{
        width: '100%',
        height: isMobile ? '280px' : '290px',
        overflow: 'hidden',
        borderRadius: '20px',
        position: 'relative',
        flexShrink: 0,
      }}
    >
      <img
        src={image}
        alt={title}
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          transform: isActive ? 'scale(1.06)' : 'scale(1)',
          transition: 'transform 0.65s cubic-bezier(0.16, 1, 0.3, 1)',
          pointerEvents: 'none',
        }}
        draggable={false}
      />
    </div>
  );

  return (
    <div
      ref={cardRef}
      style={{
        position: 'relative',
        width: '100%',
        maxWidth: isMobile ? '340px' : 'none',
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
          maxWidth: isMobile ? '340px' : 'none',
          minHeight: isMobile ? 'auto' : '583px',
          borderRadius: '20px',
          background: '#fff9f0',
          overflow: 'hidden',
          boxShadow: isActive
            ? '0 24px 50px rgba(0, 0, 0, 0.42), 0 8px 20px rgba(197, 66, 43, 0.25)'
            : '0 8px 30px rgba(0, 0, 0, 0.2)',
          transform: isActive ? 'translateY(-8px) scale(1.015)' : 'translateY(0) scale(1)',
          border: isActive
            ? '1px solid rgba(197, 66, 43, 0.45)'
            : '1px solid rgba(0, 0, 0, 0.04)',
          transition:
            'transform 0.45s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.45s ease, border-color 0.35s ease',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          boxSizing: 'border-box',
          cursor: 'pointer',
        }}
      >
        {imagePosition === 'top' ? (
          <>
            {imageBlock}
            {textBlock}
          </>
        ) : (
          <>
            {textBlock}
            {imageBlock}
          </>
        )}
      </div>
    </div>
  );
};

export const SourcingHubCapabilities: React.FC = () => {
  const cardsGridRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 960);
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
            fontWeight: 600,
            fontSize: isMobile ? '36px' : '60px',
            lineHeight: 1.1,
            letterSpacing: '-2.3321px',
            color: '#fff9f0',
            margin: '0 0 54px 0',
            maxWidth: '1000px',
          }}
        >
          <span style={{ color: '#c5422b' }}>Sourcing</span> that fits
          <br />
          how you <span style={{ color: '#c5422b' }}>Work</span>
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
          <SourcingCapabilityCard
            id="card-build-products"
            title="Build Products"
            description="From one tech pack to full seasonal ranges, small batches to large volumes, matched to the right factory"
            image={card1Img}
            pattern={pattern1}
            imagePosition="bottom"
            isMobile={isMobile}
            isVisible={isVisible}
            entranceDelay={0}
          />

          <SourcingCapabilityCard
            id="card-production-management"
            title="Run Production"
            description="We keep manufacturing on time and on budget, with clear costing and capacity planning"
            image={card2Img}
            pattern={pattern2}
            imagePosition="top"
            isMobile={isMobile}
            isVisible={isVisible}
            entranceDelay={0.18}
          />

          <SourcingCapabilityCard
            id="card-quality-assurance"
            title="Check
Quality"
            description="Ispections during and after production to AQL 2.5, with photo proof, so quality stays consistent and every issue is traceable"
            image={card3Img}
            pattern={pattern1}
            imagePosition="bottom"
            isMobile={isMobile}
            isVisible={isVisible}
            entranceDelay={0.36}
          />

          <SourcingCapabilityCard
            id="card-supplier-network"
            title="Find Suppliers"
            description="Direct access to certified, sustainable textile mills across India, China, Bangladesh, Cambodia and Vietnam. No middlemen"
            image={card4Img}
            pattern={pattern2}
            imagePosition="top"
            isMobile={isMobile}
            isVisible={isVisible}
            entranceDelay={0.54}
          />
        </div>
      </div>
    </section>
  );
};
