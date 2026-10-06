import React, { useRef, useState, useEffect } from 'react';
import orangeGoBtn from '../../assets/icon-orange-go-btn.svg';
import { useMobileCardState } from '../../hooks/useMobileScrollActive';

export interface NextGenCardProps {
  id: string;
  initialFlipped?: boolean;
  bgImage: string;
  bgImageStyle?: React.CSSProperties;
  topIconSrc?: string;
  topIconBlendMode?: 'normal' | 'color-dodge' | 'lighten' | 'screen' | 'overlay';
  topIconPosition?: { top?: string | number; left?: string | number; width?: string | number; height?: string | number };
  title: React.ReactNode;
  pointers: string[];
  description: React.ReactNode;
  descriptionFontSize?: string;
  descriptionWidth?: string;
  descriptionLetterSpacing?: string;
  descriptionTextTransform?: 'none' | 'capitalize' | 'uppercase';
  descriptionStyle?: React.CSSProperties;
  wireframeSrc: string;
  wireframeWidth?: string;
  wireframeHeight?: string;
  wireframeTransform?: string;
  dotSrc?: string;
  isVisible?: boolean;
  entranceDelay?: number;
  width?: string;
  height?: string;
  borderRadius?: string;
  style?: React.CSSProperties;
}

export const NextGenCard: React.FC<NextGenCardProps> = ({
  id,
  bgImage,
  bgImageStyle,
  initialFlipped = false,
  topIconSrc,
  topIconBlendMode: _topIconBlendMode = 'normal',
  topIconPosition = { top: '27px', left: '24px', width: '50px', height: '50px' },
  title,
  pointers,
  description,
  descriptionFontSize = '30px',
  descriptionWidth = '270px',
  descriptionLetterSpacing = '-1.5px',
  descriptionTextTransform = 'none',
  descriptionStyle,
  wireframeSrc,
  wireframeWidth = '312px',
  wireframeHeight = '123px',
  wireframeTransform = 'rotate(180deg)',
  dotSrc: _dotSrc,
  isVisible = true,
  entranceDelay = 0,
  width = '398px',
  height = '455px',
  borderRadius = '20px',
  style,
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [cardVisible, setCardVisible] = useState(false);

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
      setCardVisible(isVisible);
      return;
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setCardVisible(true);
        }
      },
      { threshold: 0.12 }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => observer.disconnect();
  }, [isMobile, isVisible]);

  const { isActive, toggle: toggleCard } = useMobileCardState(cardRef, isMobile, {
    isHovered,
    initialActive: initialFlipped,
  });

  const cardWidth = isMobile ? '100%' : width;
  const cardHeight = isMobile ? '320px' : height;
  const showEntrance = isMobile ? cardVisible : isVisible;

  const handleCardClick = () => {
    toggleCard();
  };

  const handleGoButtonClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleCard();
  };

  const mobileDescriptionTop = id === 'card-commerce' ? '88px' : '68px';

  return (
    <div
      ref={cardRef}
      onClick={handleCardClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        width: cardWidth,
        height: cardHeight,
        maxWidth: isMobile ? '324px' : cardWidth,
        minWidth: isMobile ? '0' : cardWidth,
        minHeight: cardHeight,
        maxHeight: cardHeight,
        flexShrink: 0,
        borderRadius,
        position: 'relative',
        overflow: 'hidden',
        isolation: 'isolate',
        userSelect: 'none',
        cursor: 'pointer',
        boxSizing: 'border-box',
        boxShadow: isActive
          ? '0 20px 40px rgba(0,0,0,0.35)'
          : '0 8px 30px rgba(0,0,0,0.15)',
        transform: showEntrance
          ? isActive
            ? 'translateY(-4px)'
            : 'translate(0, 0)'
          : isMobile
          ? 'translateY(50px)'
          : 'translateX(-90px)',
        opacity: showEntrance ? 1 : 0,
        transition: showEntrance
          ? `transform 0.8s cubic-bezier(0.16, 1, 0.3, 1) ${isMobile ? 0.05 : entranceDelay}s, opacity 0.8s ease ${isMobile ? 0.05 : entranceDelay}s, box-shadow 0.4s ease`
          : 'none',
        ...style,
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
          borderRadius,
          clipPath: `inset(0 round ${borderRadius})`,
          objectFit: 'cover',
          transform: isActive ? 'scale(1.05)' : 'scale(1)',
          transition: 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
          pointerEvents: 'none',
          ...bgImageStyle,
        }}
        draggable={false}
      />

      {topIconSrc && !isMobile && (
        <div
          style={{
            position: 'absolute',
            top: topIconPosition.top,
            left: topIconPosition.left,
            width: topIconPosition.width,
            height: topIconPosition.height,
            zIndex: 2,
            opacity: isActive ? 0 : 1,
            transform: isActive ? 'scale(0.85)' : 'scale(1)',
            transition: 'opacity 0.35s ease, transform 0.4s ease',
            pointerEvents: 'none',
          }}
        >
       
        </div>
      )}

      <div
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          width: '100%',
          height: isMobile ? '140px' : '190px',
          borderRadius: '0 0 20px 20px',
          background: 'linear-gradient(180deg, rgba(0, 0, 0, 0.00) 0%, rgba(0, 0, 0, 0.85) 60%, #000000 100%)',
          backdropFilter: 'blur(11.75px)',
          WebkitBackdropFilter: 'blur(11.75px)',
          WebkitMaskImage: 'linear-gradient(180deg, transparent 0%, black 100%)',
          maskImage: 'linear-gradient(180deg, transparent 0%, black 100%)',
          opacity: isActive ? 0 : 1,
          transition: 'opacity 0.4s ease',
          zIndex: 1,
          pointerEvents: 'none',
        }}
      />

      <div
        style={{
          position: 'absolute',
          inset: 0,
          borderRadius,
          clipPath: `inset(0 round ${borderRadius})`,
          overflow: 'hidden',
          backgroundColor: '#c5422b',
          opacity: isActive ? 1 : 0,
          transition: 'opacity 0.45s cubic-bezier(0.16, 1, 0.3, 1)',
          zIndex: 2,
          pointerEvents: 'none',
        }}
      >
        

        <div
          style={{
            position: 'absolute',
            bottom: '0px',
            right: '0px',
            width: isMobile ? '160px' : wireframeWidth,
            height: isMobile ? '64px' : wireframeHeight,
            opacity: isActive ? 0.85 : 0,
            transform: isActive
              ? `${wireframeTransform} translateY(0)`
              : `${wireframeTransform} translateY(25px)`,
            transition:
              'opacity 0.5s ease 0.1s, transform 0.5s cubic-bezier(0.16, 1, 0.3, 1) 0.1s',
            pointerEvents: 'none',
          }}
        >
          <img
            src={wireframeSrc}
            alt=""
            style={{
              width: '100%',
              height: '100%',
              display: 'block',
            }}
            draggable={false}
          />
        </div>
      </div>

      <h3
        style={{
          position: 'absolute',
          top: isMobile ? (id === 'card-commerce' ? '18px' : '20px') : isActive ? '31px' : '240px',
          left: isMobile ? '20px' : '28px',
          width: isMobile ? 'calc(100% - 40px)' : '308px',
          fontSize: isMobile ? '26px' : '42px',
          fontWeight: 500,
          lineHeight: 1.12,
          letterSpacing: isMobile ? '-1.0px' : '-2.3321px',
          color: isActive ? '#fff9f0' : '#ffffff',
          zIndex: 3,
          margin: 0,
          transition:
            'top 0.48s cubic-bezier(0.16, 1, 0.3, 1), color 0.3s ease',
          pointerEvents: 'none',
        }}
      >
        {title}
      </h3>

      <div
        style={{
          position: 'absolute',
          top: isMobile ? (isActive ? '350px' : 'auto') : isActive ? '520px' : '365px',
          bottom: isMobile && !isActive ? '20px' : 'auto',
          left: isMobile ? '20px' : '28px',
          maxWidth: isMobile ? '210px' : 'none',
          display: 'flex',
          flexDirection: 'column',
          gap: isMobile ? '6px' : '8px',
          fontSize: isMobile ? '17px' : '20px',
          fontWeight: 400,
          lineHeight: isMobile ? 1.3 : 1.2,
          letterSpacing: isMobile ? '-0.4px' : '-1.2px',
          color: '#ffffff',
          zIndex: 3,
          opacity: isActive ? 0 : 1,
          transition: 'top 0.42s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.3s ease',
          pointerEvents: 'none',
        }}
      >
        {pointers.map((pointer, i) => (
          <p key={i} style={{ margin: 0 }}>
            {pointer}
          </p>
        ))}
      </div>

      <div
        style={{
          position: 'absolute',
          top: isMobile ? (isActive ? mobileDescriptionTop : '360px') : isActive ? '182px' : '520px',
          left: isMobile ? '20px' : '28px',
          width: isMobile ? 'calc(100% - 40px)' : descriptionWidth,
          maxWidth: isMobile ? '265px' : 'none',
          fontSize: isMobile ? '17px' : descriptionFontSize,
          fontWeight: 300,
          lineHeight: isMobile ? 1.38 : 1.25,
          letterSpacing: isMobile ? '-0.3px' : descriptionLetterSpacing,
          textTransform: descriptionTextTransform,
          color: '#fff9f0',
          zIndex: 3,
          opacity: isActive ? 1 : 0,
          transition:
            'top 0.5s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.4s ease 0.05s',
          pointerEvents: 'none',
          ...descriptionStyle,
        }}
      >
        {description}
      </div>

      {isMobile && !isActive && (
        <button
          onClick={handleGoButtonClick}
          aria-label="Toggle Card View"
          style={{
            position: 'absolute',
            bottom: '18px',
            right: '18px',
            width: '52px',
            height: '52px',
            background: 'transparent',
            border: 'none',
            padding: 0,
            cursor: 'pointer',
            zIndex: 10,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'transform 0.2s ease',
          }}
          onMouseDown={(e) => (e.currentTarget.style.transform = 'scale(0.92)')}
          onMouseUp={(e) => (e.currentTarget.style.transform = 'scale(1)')}
        >
          <img
            src={orangeGoBtn}
            alt="Go"
            style={{ width: '100%', height: '100%', display: 'block' }}
          />
        </button>
      )}
    </div>
  );
};
