import React, { useState, useEffect, useRef } from 'react';
import vecC1 from '../../assets/commerce-grid-vec-c1.svg';
import vecC2 from '../../assets/commerce-grid-vec-c2.svg';
import vecC3 from '../../assets/commerce-grid-vec-c3.svg';
import vecC4 from '../../assets/commerce-grid-vec-c4.svg';

interface CommerceGridCardProps {
  id: string;
  title: React.ReactNode;
  description: string;
  graphics: React.ReactNode;
  isMobile: boolean;
  isVisible: boolean;
  entranceDelay: number;
}

const CommerceGridCard: React.FC<CommerceGridCardProps> = ({
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
        height: isMobile ? '400px' : '463px',
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
          backgroundColor: '#fff9f0',
          borderRadius: '30px',
          boxSizing: 'border-box',
          overflow: 'hidden',
          boxShadow: isHovered
            ? '0 30px 64px rgba(0, 0, 0, 0.42), 0 12px 28px rgba(197, 66, 43, 0.35)'
            : '0 8px 28px rgba(0, 0, 0, 0.15)',
          transform: isHovered
            ? 'scale(1.05) translateY(-8px)'
            : 'scale(1) translateY(0)',
          border: isHovered
            ? '1px solid rgba(197, 66, 43, 0.5)'
            : '1px solid rgba(0, 0, 0, 0.04)',
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
            top: isMobile ? '24px' : '30px',
            left: isMobile ? '22px' : '28px',
            zIndex: 2,
            fontFamily: "'Montserrat', sans-serif",
            fontWeight: 600,
            fontSize: isMobile ? '28px' : '36px',
            lineHeight: 1.1,
            letterSpacing: '-1.5px',
            color: '#000000',
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
            top: isMobile ? '135px' : '158px',
            left: isMobile ? '22px' : '28px',
            width: isMobile ? '260px' : '230px',
            zIndex: 2,
            fontFamily: "'Montserrat', sans-serif",
            fontWeight: 400,
            fontSize: isMobile ? '16px' : '18px',
            lineHeight: 1.25,
            letterSpacing: '-0.36px',
            color: '#000000',
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

export const CommerceGridCapabilities: React.FC = () => {
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
          ? 'linear-gradient(83.51deg, rgb(52, 20, 19) 36.44%, rgb(170, 57, 37) 206.63%)'
          : 'linear-gradient(121.6deg, rgb(73, 32, 32) 1.69%, rgb(168, 57, 37) 98.11%)',
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
            background: 'rgba(197, 66, 43, 0.15)',
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
            fontWeight: 600,
            fontSize: isMobile ? '36px' : '60px',
            lineHeight: 1.12,
            letterSpacing: '-2.3321px',
            margin: '0 0 54px 0',
            maxWidth: '1000px',
          }}
        >
          <span style={{ color: '#fff9f0' }}>One </span>
          <span style={{ color: '#c5422b' }}>Platform </span>
          <span style={{ color: '#fff9f0' }}>to </span>
          <br />
          <span style={{ color: '#fff9f0' }}>Sell </span>
          <span style={{ color: '#c5422b' }}>Everywhere</span>
        </h2>

        <div
          ref={cardsGridRef}
          style={{
            display: isMobile ? 'flex' : 'grid',
            flexDirection: isMobile ? 'column' : undefined,
            gridTemplateColumns: isMobile ? undefined : 'repeat(4, 1fr)',
            gap: isMobile ? '28px' : '24px',
            alignItems: isMobile ? 'center' : 'stretch',
            width: '100%',
          }}
        >
          <CommerceGridCard
            id="card-sell-everywhere"
            title={
              <>
                <p style={{ margin: 0, lineHeight: 1.1 }}>Sell Across</p>
                <p style={{ margin: 0, lineHeight: 1.1 }}>Every Channel</p>
              </>
            }
            description="Amazon, Myntra, Nykaa, Tata CLiQ, AJIO and your own website, connected through one inventory and order flow"
            graphics={
              <div
                style={{
                  position: 'absolute',
                  left: '0px',
                  top: '354px',
                  width: '278px',
                  height: '109px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  pointerEvents: 'none',
                  zIndex: 1,
                }}
              >
                <div style={{ transform: 'scaleY(-1)', flexShrink: 0 }}>
                  <div style={{ width: '278px', height: '109px', position: 'relative' }}>
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

          <CommerceGridCard
            id="card-marketplace-management"
            title={
              <>
                <p style={{ margin: 0, lineHeight: 1.1 }}>Marketplace</p>
                <p style={{ margin: 0, lineHeight: 1.1 }}>Management</p>
              </>
            }
            description="We build your online store, set up repeat-purchase flows and handle fulfilment, all planned around your margins"
            graphics={
              <div
                style={{
                  position: 'absolute',
                  left: '90px',
                  top: '394px',
                  width: '204px',
                  height: '80px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  pointerEvents: 'none',
                  zIndex: 1,
                }}
              >
                <div style={{ transform: 'rotate(180deg)', flexShrink: 0 }}>
                  <div style={{ width: '204px', height: '80px', position: 'relative' }}>
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

          <CommerceGridCard
            id="card-brand-commerce"
            title={
              <>
                <p style={{ margin: 0, lineHeight: 1.1 }}>Brand</p>
                <p style={{ margin: 0, lineHeight: 1.1 }}>Commerce</p>
              </>
            }
            description="Launch and manage your brand website with storefront, inventory, orders and fulfilment built around your business"
            graphics={
              <div
                style={{
                  position: 'absolute',
                  left: '183px',
                  top: '341px',
                  width: '122px',
                  height: '139px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  pointerEvents: 'none',
                  zIndex: 1,
                }}
              >
                <div style={{ transform: 'scaleY(-1)', flexShrink: 0 }}>
                  <div style={{ width: '122px', height: '139px', position: 'relative' }}>
                    <img
                      src={vecC3}
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
            entranceDelay={0.36}
          />

          <CommerceGridCard
            id="card-omnichannel-fulfilment"
            title={
              <>
                <p style={{ margin: 0, lineHeight: 1.1 }}>Omnichannel</p>
                <p style={{ margin: 0, lineHeight: 1.1 }}>Fulfilment</p>
              </>
            }
            description="Connect stores, warehouses and dark stores to fulfil online and offline orders through one commerce network"
            graphics={
              <div
                style={{
                  position: 'absolute',
                  left: '65px',
                  top: '357px',
                  width: '270px',
                  height: '106px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  pointerEvents: 'none',
                  zIndex: 1,
                }}
              >
                <div style={{ transform: 'rotate(180deg)', flexShrink: 0 }}>
                  <div style={{ width: '270px', height: '106px', position: 'relative' }}>
                    <img
                      src={vecC4}
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
            entranceDelay={0.54}
          />
        </div>
      </div>
    </section>
  );
};
