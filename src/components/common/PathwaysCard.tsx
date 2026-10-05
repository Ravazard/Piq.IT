import React, { useState, useEffect, useRef } from 'react';
import { useMobileCardState } from '../../hooks/useMobileScrollActive';

export interface WireframeItem {
  src: string;
  width: string;
  height: string;
  bottom?: string | number;
  right?: string | number;
  left?: string | number;
  top?: string | number;
  transform?: string;
  opacity?: number;
}

export interface PathwaysCardProps {
  id: string;
  tag: string;
  bgImage: string;
  bgImageStyle?: React.CSSProperties;
  subheading: React.ReactNode;
  description: React.ReactNode;
  pointers: string[];
  wireframes?: WireframeItem[];
  isVisible?: boolean;
  entranceDelay?: number;
  width?: string;
  height?: string;
  borderRadius?: string;
  style?: React.CSSProperties;
}

export const PathwaysCard: React.FC<PathwaysCardProps> = ({
  tag,
  bgImage,
  bgImageStyle,
  subheading,
  description,
  pointers,
  wireframes = [],
  isVisible = true,
  entranceDelay = 0,
  width = '398px',
  height = '441px',
  borderRadius = '20px',
  style,
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [cardInView, setCardInView] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    if (!isMobile) {
      setCardInView(isVisible);
      return;
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setCardInView(true);
        }
      },
      { threshold: 0.08 }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => observer.disconnect();
  }, [isMobile, isVisible]);

  const { isActive: isTextVisual, toggle: toggleCard } = useMobileCardState(cardRef, isMobile, {
    isHovered,
  });

  const cardWidth = isMobile ? '100%' : width;
  const cardHeight = isMobile ? '440px' : height;
  const showCard = isMobile ? cardInView : isVisible;

  const handleCardClick = () => {
    toggleCard();
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
        borderRadius: isMobile ? '20px' : borderRadius,
        position: 'relative',
        boxSizing: 'border-box',
        transform: showCard
          ? 'translateX(0) translateY(0)'
          : isMobile
          ? 'translateY(35px)'
          : 'translateX(-80px)',
        opacity: showCard ? 1 : 0,
        transition: showCard
          ? `transform 0.55s cubic-bezier(0.16, 1, 0.3, 1) ${isMobile ? 0.05 : entranceDelay}s, opacity 0.5s ease ${isMobile ? 0.05 : entranceDelay}s`
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
          isolation: 'isolate',
          userSelect: 'none',
          cursor: 'pointer',
          boxShadow: isTextVisual
            ? '0 24px 48px rgba(0,0,0,0.32)'
            : '0 8px 30px rgba(0,0,0,0.08)',
          transform: (isMobile ? isTextVisual : isHovered) ? 'translateY(-6px)' : 'translateY(0)',
          transition: 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.4s ease',
        }}
      >
        <img
          src={bgImage}
          alt={tag}
          style={{
            width: '100%',
            height: '100%',
            position: 'absolute',
            top: 0,
            left: 0,
            borderRadius: isMobile ? '20px' : borderRadius,
            clipPath: isMobile ? 'inset(0 round 20px)' : `inset(0 round ${borderRadius})`,
            objectFit: 'cover',
            transform: (isMobile ? isTextVisual : isHovered) ? 'scale(1.05)' : 'scale(1)',
            transition: 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
            pointerEvents: 'none',
            ...bgImageStyle,
          }}
          draggable={false}
        />

        <div
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            width: '100%',
            height: isMobile ? '220px' : '220px',
            borderRadius: `0 0 ${isMobile ? '20px' : borderRadius} ${isMobile ? '20px' : borderRadius}`,
            background:
              'linear-gradient(180deg, rgba(0, 0, 0, 0.00) 0%, rgba(0, 0, 0, 0.6) 100%)',
            backdropFilter: 'blur(11.75px)',
            WebkitBackdropFilter: 'blur(11.75px)',
            WebkitMaskImage: 'linear-gradient(180deg, transparent 0%, black 100%)',
            maskImage: 'linear-gradient(180deg, transparent 0%, black 100%)',
            opacity: isTextVisual ? 0 : 1,
            transition: 'opacity 0.4s ease',
            zIndex: 1,
            pointerEvents: 'none',
          }}
        />

        <div
          style={{
            position: 'absolute',
            bottom: isMobile ? '24px' : '32px',
            left: isMobile ? '22px' : '34px',
            display: 'flex',
            flexDirection: 'column',
            gap: isMobile ? '4px' : '6px',
            fontSize: isMobile ? '15px' : '16px',
            fontWeight: 500,
            lineHeight: isMobile ? '24px' : '26px',
            letterSpacing: '-0.24px',
            color: '#ffffff',
            textTransform: 'capitalize',
            zIndex: 2,
            opacity: isTextVisual ? 0 : 1,
            transform: isTextVisual ? 'translateY(40px)' : 'translateY(0)',
            transition:
              'opacity 0.35s ease, transform 0.45s cubic-bezier(0.16, 1, 0.3, 1)',
            pointerEvents: 'none',
          }}
        >
          {pointers.map((pointer, i) => (
            <p key={i} style={{ margin: 0, whiteSpace: 'nowrap' }}>
              {pointer}
            </p>
          ))}
        </div>

        <div
          style={{
            position: 'absolute',
            inset: 0,
            borderRadius: isMobile ? '20px' : borderRadius,
            clipPath: isMobile ? 'inset(0 round 20px)' : `inset(0 round ${borderRadius})`,
            overflow: 'hidden',
            background: 'linear-gradient(180deg, #5e2828 0%, #2d1212 100%)',
            opacity: isTextVisual ? 1 : 0,
            transition: 'opacity 0.45s cubic-bezier(0.16, 1, 0.3, 1)',
            zIndex: 2,
            pointerEvents: 'none',
          }}
        >
          {wireframes.map((wf, idx) => (
            <div
              key={idx}
              style={{
                position: 'absolute',
                bottom: wf.bottom,
                right: wf.right,
                left: wf.left,
                top: wf.top,
                width: isMobile ? '180px' : wf.width,
                height: isMobile ? '120px' : wf.height,
                transform: wf.transform,
                opacity: isTextVisual ? (wf.opacity ?? 0.85) : 0,
                transition: 'opacity 0.5s ease 0.1s',
                pointerEvents: 'none',
              }}
            >
              <img
                src={wf.src}
                alt=""
                style={{
                  width: '100%',
                  height: '100%',
                  display: 'block',
                }}
                draggable={false}
              />
            </div>
          ))}
        </div>

        <p
          style={{
            position: 'absolute',
            top: isMobile ? '22px' : '37px',
            left: isMobile ? '20px' : '34px',
            fontSize: isMobile ? '28px' : '32px',
            fontWeight: 500,
            lineHeight: 1.1,
            letterSpacing: '-2.3321px',
            color: '#c5422b',
            textShadow: '0px 4px 16px rgba(0,0,0,0.25)',
            margin: 0,
            zIndex: 3,
            pointerEvents: 'none',
          }}
        >
          {tag}
        </p>

        <div
          style={{
            position: 'absolute',
            top: isMobile ? '80px' : '104px',
            left: isMobile ? '20px' : '34px',
            width: isMobile ? '260px' : '330px',
            fontSize: isMobile ? '28px' : '42px',
            fontWeight: 600,
            lineHeight: 1.1,
            letterSpacing: '-1.5px',
            color: '#fff9f0',
            zIndex: 3,
            opacity: isTextVisual ? 1 : 0,
            transform: isTextVisual ? 'translateY(0)' : 'translateY(24px)',
            transition:
              'opacity 0.45s ease 0.05s, transform 0.45s cubic-bezier(0.16, 1, 0.3, 1) 0.05s',
            pointerEvents: 'none',
          }}
        >
          {subheading}
        </div>

        <div
          style={{
            position: 'absolute',
            top: isMobile ? '200px' : '237px',
            left: isMobile ? '20px' : '34px',
            width: isMobile ? '260px' : '295px',
            fontSize: isMobile ? '15px' : '16px',
            fontWeight: 500,
            lineHeight: 1.5,
            color: '#ffffff',
            textTransform: 'capitalize',
            zIndex: 3,
            opacity: isTextVisual ? 1 : 0,
            transform: isTextVisual ? 'translateY(0)' : 'translateY(24px)',
            transition:
              'opacity 0.5s ease 0.1s, transform 0.5s cubic-bezier(0.16, 1, 0.3, 1) 0.1s',
            pointerEvents: 'none',
          }}
        >
          {description}
        </div>
      </div>
    </div>
  );
};
