import React, { useState, useEffect, useRef } from 'react';
import arrowRightSvg from '../../assets/ecosystem/arrow-right.svg';
import { useMobileCardState } from '../../hooks/useMobileScrollActive';

export interface EcosystemCardProps {
  id: string;
  title: React.ReactNode;
  bgImage: string;
  pointers?: string[];
  description: React.ReactNode;
  exploreUrl?: string;
  isVisible?: boolean;
  entranceDelay?: number;
  width?: string;
  height?: string;
  borderRadius?: string;
  style?: React.CSSProperties;
}

export const EcosystemCard: React.FC<EcosystemCardProps> = ({
  title,
  bgImage,
  pointers = [],
  description,
  exploreUrl = '#',
  isVisible = true,
  entranceDelay = 0,
  width = '288px',
  height = '599px',
  borderRadius = '20px',
  style,
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const { isActive: isDescriptionActive, toggle: toggleCard } = useMobileCardState(
    cardRef,
    isMobile,
    { isHovered }
  );

  const cardWidth = isMobile ? '100%' : width;
  const cardHeight = isMobile ? '539px' : height;

  const handleCardClick = () => {
    if (isMobile) {
      toggleCard();
    } else if (exploreUrl && exploreUrl !== '#') {
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
      window.location.hash = exploreUrl.replace(/^#/, '');
    }
  };

  return (
    <div
      ref={cardRef}
      style={{
        width: cardWidth,
        height: cardHeight,
        minWidth: isMobile ? '0' : cardWidth,
        maxWidth: isMobile ? '324px' : cardWidth,
        minHeight: cardHeight,
        maxHeight: cardHeight,
        flexShrink: 0,
        position: 'relative',
        boxSizing: 'border-box',
        transform: isVisible
          ? 'translate(0, 0)'
          : isMobile
          ? 'translateY(40px)'
          : 'translateX(-80px)',
        opacity: isMobile ? (isVisible ? 1 : 0) : 1,
        transition: isVisible
          ? `transform 0.85s cubic-bezier(0.16, 1, 0.3, 1) ${entranceDelay}s, opacity 0.85s ease ${entranceDelay}s`
          : 'none',
        ...style,
      }}
    >
      <div
        onClick={handleCardClick}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        style={{
          width: '100%',
          height: '100%',
          borderRadius: isMobile ? '20px' : borderRadius,
          position: 'relative',
          overflow: 'hidden',
          userSelect: 'none',
          cursor: 'pointer',
          boxShadow: isDescriptionActive
            ? '0 24px 48px rgba(0,0,0,0.36)'
            : '0 8px 30px rgba(0,0,0,0.12)',
          transform: isDescriptionActive ? 'translateY(-6px)' : 'translateY(0)',
          transition:
            'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.4s ease',
        }}
      >
        <img
          src={bgImage}
          alt=""
          style={{
            width: '100%',
            height: '100%',
            position: 'absolute',
            top: 0,
            left: 0,
            objectFit: 'cover',
            transform: isDescriptionActive ? 'scale(1.05)' : 'scale(1)',
            transition: 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
            pointerEvents: 'none',
          }}
          draggable={false}
        />

        <div
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            width: '100%',
            height: isMobile ? '291px' : '370px',
            borderRadius: `0 0 ${isMobile ? '20px' : borderRadius} ${isMobile ? '20px' : borderRadius}`,
            background:
              'linear-gradient(180deg, rgba(0, 0, 0, 0.00) 0%, rgba(0, 0, 0, 0.49) 100%)',
            backdropFilter: 'blur(11.75px)',
            WebkitBackdropFilter: 'blur(11.75px)',
            WebkitMaskImage: 'linear-gradient(180deg, transparent 0%, black 100%)',
            maskImage: 'linear-gradient(180deg, transparent 0%, black 100%)',
            pointerEvents: 'none',
            zIndex: 1,
          }}
        />

        <a
          href={exploreUrl}
          onClick={(e) => {
            if (exploreUrl === '#') {
              e.preventDefault();
            } else {
              window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
              document.documentElement.scrollTop = 0;
              document.body.scrollTop = 0;
            }
            e.stopPropagation();
          }}
          style={{
            position: 'absolute',
            top: isMobile ? '18px' : '21px',
            right: isMobile ? '18px' : '21px',
            height: isMobile ? '48px' : '64px',
            width: isDescriptionActive
              ? isMobile
                ? '145px'
                : '221px'
              : isMobile
              ? '48px'
              : '64px',
            borderRadius: isDescriptionActive ? '74px' : '50%',
            backgroundColor: '#c5422b',
            boxShadow: isDescriptionActive
              ? '0px 10px 43.3px 0px rgba(0,0,0,0.2)'
              : '0px 4px 20px 0px rgba(0,0,0,0.15)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: isDescriptionActive ? 'space-between' : 'center',
            padding: isDescriptionActive
              ? isMobile
                ? '0 16px 0 20px'
                : '0 24px 0 28px'
              : '0',
            textDecoration: 'none',
            zIndex: 10,
            overflow: 'hidden',
            boxSizing: 'border-box',
            transition:
              'width 0.4s cubic-bezier(0.16, 1, 0.3, 1), border-radius 0.4s ease, box-shadow 0.4s ease, padding 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
          }}
        >
          <span
            style={{
              fontFamily: "'Montserrat', sans-serif",
              fontSize: isMobile ? '16px' : '20px',
              fontWeight: 600,
              color: '#ffffff',
              whiteSpace: 'nowrap',
              letterSpacing: '-0.5px',
              opacity: isDescriptionActive ? 1 : 0,
              width: isDescriptionActive ? 'auto' : 0,
              overflow: 'hidden',
              transform: isDescriptionActive ? 'translateX(0)' : 'translateX(-20px)',
              transition:
                'opacity 0.3s ease 0.08s, transform 0.35s ease 0.08s, width 0.35s ease',
            }}
          >
            Explore
          </span>

          <div
            style={{
              width: isMobile ? '24px' : '32px',
              height: isMobile ? '19px' : '26px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
              transform: isDescriptionActive ? 'rotate(-45deg)' : 'rotate(0deg)',
              transition: 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
            }}
          >
            <img
              src={arrowRightSvg}
              alt=""
              style={{
                width: isMobile ? '24px' : '32px',
                height: isMobile ? '19px' : '26px',
                display: 'block',
              }}
              draggable={false}
            />
          </div>
        </a>

        <div
          style={{
            position: 'absolute',
            bottom: isMobile ? '24px' : '28px',
            left: isMobile ? '20px' : '28px',
            right: isMobile ? '20px' : '28px',
            display: 'flex',
            flexDirection: 'column',
            zIndex: 2,
            opacity: isDescriptionActive ? 0 : 1,
            transform: isDescriptionActive ? 'translateY(160px)' : 'translateY(0)',
            transition:
              'opacity 0.3s ease, transform 0.45s cubic-bezier(0.16, 1, 0.3, 1)',
            pointerEvents: 'none',
          }}
        >
          {pointers && pointers.length > 0 && (
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '6px',
                marginBottom: isMobile ? '18px' : '24px',
              }}
            >
              {pointers.map((pointer, i) => (
                <div
                  key={i}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                  }}
                >
                  <div
                    style={{
                      width: '6px',
                      height: '6px',
                      borderRadius: '50%',
                      backgroundColor: '#ffffff',
                      flexShrink: 0,
                    }}
                  />
                  <span
                    style={{
                      fontFamily: "'Montserrat', sans-serif",
                      fontSize: '16px',
                      fontWeight: 600,
                      lineHeight: '24px',
                      letterSpacing: '-0.24px',
                      color: '#ffffff',
                      whiteSpace: 'nowrap',
                      textTransform: 'capitalize',
                    }}
                  >
                    {pointer}
                  </span>
                </div>
              ))}
            </div>
          )}

          <div
            style={{
              fontFamily: "'Montserrat', sans-serif",
              fontSize: isMobile ? '36px' : '42px',
              fontWeight: 600,
              lineHeight: 1.1,
              letterSpacing: '-1.5px',
              color: '#fff9f0',
              margin: 0,
            }}
          >
            {title}
          </div>
        </div>

        <div
          style={{
            position: 'absolute',
            bottom: isMobile ? '24px' : '31px',
            left: isMobile ? '20px' : '28px',
            right: isMobile ? '20px' : '28px',
            zIndex: 3,
            opacity: isDescriptionActive ? 1 : 0,
            transform: isDescriptionActive ? 'translateY(0)' : 'translateY(60px)',
            transition:
              'opacity 0.4s ease 0.05s, transform 0.45s cubic-bezier(0.16, 1, 0.3, 1) 0.05s',
            pointerEvents: 'none',
          }}
        >
          <div
            style={{
              fontFamily: "'Montserrat', sans-serif",
              fontSize: isMobile ? '20px' : '22px',
              fontWeight: 500,
              lineHeight: 1.1,
              letterSpacing: '-1.5px',
              color: '#ffffff',
              margin: 0,
            }}
          >
            {description}
          </div>
        </div>
      </div>
    </div>
  );
};
