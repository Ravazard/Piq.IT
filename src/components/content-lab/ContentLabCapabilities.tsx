import React, { useState, useEffect, useRef } from 'react';
import vecC1 from '../../assets/content-lab-vector-c1.svg';
import vecC2 from '../../assets/content-lab-vector-c2.svg';
import vecC3V8 from '../../assets/content-lab-vector-c3-v8.svg';
import vecC3V7 from '../../assets/content-lab-vector-c3-v7.svg';

interface ContentLabCardProps {
  id: string;
  title: React.ReactNode;
  description: string;
  graphics: React.ReactNode;
  isMobile: boolean;
  isVisible: boolean;
  entranceDelay: number;
}

const ContentLabCard: React.FC<ContentLabCardProps> = ({
  title,
  description,
  graphics,
  isMobile,
  isVisible,
  entranceDelay,
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [mobileInView, setMobileInView] = useState(false);

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

  return (
    <div
      ref={cardRef}
      style={{
        position: 'relative',
        width: '100%',
        maxWidth: isMobile ? '340px' : 'none',
        height: isMobile ? '430px' : '470px',
        boxSizing: 'border-box',
        transform: showEntrance
          ? 'translateX(0)'
          : isMobile
            ? 'translateX(-80px)'
            : 'translateX(-160px)',
        opacity: 1,
        transition: showEntrance
          ? `transform 0.95s cubic-bezier(0.16, 1, 0.3, 1) ${isMobile ? 0.05 : entranceDelay}s`
          : 'none',
        zIndex: isHovered ? 20 : 1,
      }}
    >
      <div
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        style={{
          position: 'relative',
          width: '100%',
          height: '100%',
          backgroundColor: '#c5422b',
          borderRadius: '20px',
          border: isHovered
            ? '1px solid rgba(255, 249, 240, 0.45)'
            : '1px solid rgba(255, 249, 240, 0.12)',
          overflow: 'hidden',
          boxSizing: 'border-box',
          boxShadow: isHovered
            ? '0 30px 64px rgba(0, 0, 0, 0.48), 0 12px 28px rgba(197, 66, 43, 0.4), 0 0 0 1px rgba(255, 249, 240, 0.25)'
            : '0 8px 30px rgba(0, 0, 0, 0.2)',
          transform: isHovered
            ? 'scale(1.05) translateY(-8px)'
            : 'scale(1) translateY(0)',
          transition:
            'transform 0.45s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.45s cubic-bezier(0.16, 1, 0.3, 1), border-color 0.35s ease',
          cursor: 'pointer',
          userSelect: 'none',
        }}
      >
        <div
          style={{
            transform: isHovered ? 'scale(1.04)' : 'scale(1)',
            transition: 'transform 0.55s cubic-bezier(0.16, 1, 0.3, 1)',
          }}
        >
          {graphics}
        </div>

        <div
          style={{
            position: 'absolute',
            top: isMobile ? '24px' : '26px',
            left: isMobile ? '20px' : '24px',
            zIndex: 2,
            fontFamily: "'Montserrat', sans-serif",
            fontWeight: 500,
            fontSize: isMobile ? '34px' : '42px',
            lineHeight: 1.1,
            letterSpacing: '-2.3321px',
            color: '#fff9f0',
            transform: isHovered ? 'translateX(2px)' : 'translateX(0)',
            transition: 'transform 0.35s ease',
            pointerEvents: 'none',
          }}
        >
          {title}
        </div>

        <div
          style={{
            position: 'absolute',
            top: isMobile ? '160px' : '204px',
            left: isMobile ? '20px' : '24px',
            width: isMobile ? '260px' : '240px',
            zIndex: 2,
            fontFamily: "'Montserrat', sans-serif",
            fontWeight: 300,
            fontSize: isMobile ? '18px' : '24px',
            lineHeight: 1.12,
            letterSpacing: '-0.36px',
            color: '#ffffff',
            textTransform: 'capitalize',
            opacity: 0.95,
            pointerEvents: 'none',
          }}
        >
          {description}
        </div>
      </div>
    </div>
  );
};

export const ContentLabCapabilities: React.FC = () => {
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
        backgroundImage: isMobile
          ? 'linear-gradient(84.55deg, rgb(52, 20, 19) 36.44%, rgb(170, 57, 37) 206.63%)'
          : 'linear-gradient(121.62deg, rgb(52, 20, 19) 18.01%, rgb(170, 57, 37) 100%)',
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
            color: '#c5422b',
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
            maxWidth: '1000px',
          }}
        >
          <span style={{ color: '#c5422b' }}>Launch-ready </span>
          product content
          <br /> without the
          <span style={{ color: '#c5422b' }}> back-and-forth</span>
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
          <ContentLabCard
            id="card-product-imaging"
            title={
              <>
                <p style={{ margin: 0, lineHeight: 1.1 }}>Product</p>
                <p style={{ margin: 0, lineHeight: 1.1 }}>Imaging</p>
              </>
            }
            description="From flat-lay to on-model imagery, creating accurate, consistent visuals built for every commerce channel"
            graphics={
              <div
                style={{
                  position: 'absolute',
                  left: '183px',
                  top: '290px',
                  width: '123px',
                  height: '312px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  pointerEvents: 'none',
                  zIndex: 1,
                }}
              >
                <div style={{ transform: 'rotate(-90deg) scaleY(-1)', flexShrink: 0 }}>
                  <div style={{ width: '312px', height: '123px', position: 'relative' }}>
                    <img
                      src={vecC1}
                      alt=""
                      style={{ width: '100%', height: '100%', display: 'block' }}
                      draggable={false}
                    />
                  </div>
                </div>
              </div>
            }
            isMobile={isMobile}
            isVisible={isVisible}
            entranceDelay={0}
          />

          <ContentLabCard
            id="card-campaign-creatives"
            title={
              <>
                <p style={{ margin: 0, lineHeight: 1.1 }}>Campaign</p>
                <p style={{ margin: 0, lineHeight: 1.1 }}>Creatives</p>
              </>
            }
            description="Turning audience insight into campaign imagery that converts, with every visual staying true to the product"
            graphics={
              <div
                style={{
                  position: 'absolute',
                  left: '25px',
                  top: '453px',
                  width: '312px',
                  height: '123px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  pointerEvents: 'none',
                  zIndex: 1,
                }}
              >
                <div style={{ transform: 'rotate(180deg)', flexShrink: 0 }}>
                  <div style={{ width: '312px', height: '123px', position: 'relative' }}>
                    <img
                      src={vecC2}
                      alt=""
                      style={{ width: '100%', height: '100%', display: 'block' }}
                      draggable={false}
                    />
                  </div>
                </div>
              </div>
            }
            isMobile={isMobile}
            isVisible={isVisible}
            entranceDelay={0.18}
          />

          <ContentLabCard
            id="card-video-content"
            title={
              <>
                <p style={{ margin: 0, lineHeight: 1.1 }}>{`Video &`}</p>
                <p style={{ margin: 0, lineHeight: 1.1 }}>Content</p>
              </>
            }
            description="AI-powered videos, UGC, PDP content and digital creatives designed to engage audiences and bring products to life"
            graphics={
              <>
                <div
                  style={{
                    position: 'absolute',
                    left: '176px',
                    top: '440px',
                    width: '119px',
                    height: '136px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    pointerEvents: 'none',
                    zIndex: 1,
                  }}
                >
                  <div style={{ transform: 'scaleY(-1)', flexShrink: 0 }}>
                    <div style={{ width: '119px', height: '136px', position: 'relative' }}>
                      <img
                        src={vecC3V8}
                        alt=""
                        style={{ width: '100%', height: '100%', display: 'block' }}
                        draggable={false}
                      />
                    </div>
                  </div>
                </div>

                <div
                  style={{
                    position: 'absolute',
                    left: '-15px',
                    top: '347px',
                    width: '110px',
                    height: '278px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    pointerEvents: 'none',
                    zIndex: 1,
                  }}
                >
                  <div style={{ transform: 'rotate(-90deg)', flexShrink: 0 }}>
                    <div style={{ width: '278px', height: '110px', position: 'relative' }}>
                      <img
                        src={vecC3V7}
                        alt=""
                        style={{ width: '100%', height: '100%', display: 'block' }}
                        draggable={false}
                      />
                    </div>
                  </div>
                </div>
              </>
            }
            isMobile={isMobile}
            isVisible={isVisible}
            entranceDelay={0.36}
          />

          <ContentLabCard
            id="card-smart-product-listing"
            title={
              <>
                <p style={{ margin: 0, lineHeight: 1.1 }}>Smart</p>
                <p style={{ margin: 0, lineHeight: 1.1 }}>Product</p>
                <p style={{ margin: 0, lineHeight: 1.1 }}>Listing</p>
              </>
            }
            description="Generate accurate product attributes for commerce-ready catalogue"
            graphics={
              <>
                <div
                  style={{
                    position: 'absolute',
                    left: '-9px',
                    top: '331px',
                    width: '110px',
                    height: '278px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    pointerEvents: 'none',
                    zIndex: 1,
                  }}
                >
                  <div style={{ transform: 'rotate(-90deg)', flexShrink: 0 }}>
                    <div style={{ width: '278px', height: '110px', position: 'relative' }}>
                      <img
                        src={vecC3V7}
                        alt=""
                        style={{ width: '100%', height: '100%', display: 'block' }}
                        draggable={false}
                      />
                    </div>
                  </div>
                </div>

                <div
                  style={{
                    position: 'absolute',
                    left: '111px',
                    top: '500px',
                    width: '312px',
                    height: '123px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    pointerEvents: 'none',
                    zIndex: 1,
                  }}
                >
                  <div style={{ transform: 'rotate(180deg)', flexShrink: 0 }}>
                    <div style={{ width: '312px', height: '123px', position: 'relative' }}>
                      <img
                        src={vecC2}
                        alt=""
                        style={{ width: '100%', height: '100%', display: 'block' }}
                        draggable={false}
                      />
                    </div>
                  </div>
                </div>
              </>
            }
            isMobile={isMobile}
            isVisible={isVisible}
            entranceDelay={0.54}
          />
        </div>
      </div>
    </section>
  );
};
