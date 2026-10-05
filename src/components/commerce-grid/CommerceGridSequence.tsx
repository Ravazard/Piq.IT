import React, { useState, useEffect, useRef } from 'react';

interface SequenceStep {
  title: string;
  desktopDesc: string;
  mobileDesc: string;
}

const SEQUENCE_STEPS: SequenceStep[] = [
  {
    title: 'Commerce Audit',
    desktopDesc:
      'We assess your existing channels, operations and customer journey to identify gaps, inefficiencies and growth opportunities',
    mobileDesc:
      'We assess your existing channels, operations and customer journey to identify gaps, inefficiencies and growth opportunities',
  },
  {
    title: 'Grid Integration',
    desktopDesc:
      'Connect inventory, catalogue, orders and fulfilment across marketplaces, brand stores, omnichannel and quick commerce',
    mobileDesc:
      'Connect inventory, catalogue, orders and fulfilment across marketplaces, brand stores, omnichannel and quick commerce',
  },
  {
    title: 'Channel Orchestration',
    desktopDesc:
      'Coordinate inventory and orders across channels to improve availability, fulfilment speed and sales',
    mobileDesc:
      'Coordinate inventory and orders across channels to improve availability, fulfilment speed and sales',
  },
  {
    title: 'Growth & Profitability',
    desktopDesc:
      'Optimise pricing, inventory, returns and channel performance to help brands grow efficiently and profitably',
    mobileDesc:
      'Optimise pricing, inventory, returns and channel performance to help brands grow efficiently and profitably',
  },
];

export const CommerceGridSequence: React.FC = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [activeStep, setActiveStep] = useState<number>(0);

  const containerRef = useRef<HTMLDivElement>(null);
  const firstDotRef = useRef<HTMLDivElement>(null);
  const lastDotRef = useRef<HTMLDivElement>(null);
  const [desktopTrack, setDesktopTrack] = useState<{ top: number; height: number; left?: number }>({
    top: 68,
    height: 410,
    left: 9,
  });

  const mobileContainerRef = useRef<HTMLDivElement>(null);
  const firstMobileDotRef = useRef<HTMLDivElement>(null);
  const lastMobileDotRef = useRef<HTMLDivElement>(null);
  const [mobileTrack, setMobileTrack] = useState<{ top: number; height: number; left?: number }>({
    top: 15,
    height: 350,
    left: 9,
  });

  const mobileStepRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 900);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    if (!isMobile) return;

    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const vh = window.innerHeight || document.documentElement.clientHeight;
          const focusY = vh * 0.45;

          let closestIdx = -1;
          let minDistance = Infinity;

          mobileStepRefs.current.forEach((el, idx) => {
            if (!el) return;
            const rect = el.getBoundingClientRect();
            const elCenter = rect.top + rect.height / 2;
            const dist = Math.abs(elCenter - focusY);

            if (dist < minDistance) {
              minDistance = dist;
              closestIdx = idx;
            }
          });

          if (closestIdx !== -1 && minDistance < vh * 0.4) {
            setActiveStep(closestIdx);
          }

          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, [isMobile]);

  useEffect(() => {
    const updateGeometry = () => {
      if (!isMobile && containerRef.current && firstDotRef.current && lastDotRef.current) {
        const cRect = containerRef.current.getBoundingClientRect();
        const fRect = firstDotRef.current.getBoundingClientRect();
        const lRect = lastDotRef.current.getBoundingClientRect();

        const startY = fRect.top + fRect.height / 2 - cRect.top;
        const endY = lRect.top + lRect.height / 2 - cRect.top;
        const startX = fRect.left + fRect.width / 2 - cRect.left;
        setDesktopTrack({
          top: startY,
          height: Math.max(0, endY - startY),
          left: startX - 1.5,
        });
      }

      if (
        isMobile &&
        mobileContainerRef.current &&
        firstMobileDotRef.current &&
        lastMobileDotRef.current
      ) {
        const cRect = mobileContainerRef.current.getBoundingClientRect();
        const fRect = firstMobileDotRef.current.getBoundingClientRect();
        const lRect = lastMobileDotRef.current.getBoundingClientRect();

        const startY = fRect.top + fRect.height / 2 - cRect.top;
        const endY = lRect.top + lRect.height / 2 - cRect.top;
        const startX = fRect.left + fRect.width / 2 - cRect.left;
        setMobileTrack({
          top: startY,
          height: Math.max(0, endY - startY),
          left: startX - 1.5,
        });
      }
    };

    updateGeometry();
    window.addEventListener('resize', updateGeometry);
    const timer = setTimeout(updateGeometry, 80);
    return () => {
      window.removeEventListener('resize', updateGeometry);
      clearTimeout(timer);
    };
  }, [isMobile]);

  return (
    <section
      id="operating-sequence"
      style={{
        position: 'relative',
        width: '100%',
        backgroundImage:
          'linear-gradient(133.18deg, rgb(255, 249, 240) 60.8%, rgb(235, 226, 215) 155.3%)',
        padding: isMobile ? '70px 24px 80px' : '100px 71px 130px',
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
            background: 'rgba(197, 66, 43, 0.08)',
            color: '#c5422b',
            fontFamily: "'Montserrat', sans-serif",
            fontSize: isMobile ? '14px' : '16px',
            fontWeight: 600,
            marginBottom: '20px',
          }}
        >
          Our Process
        </div>

        <h2
          style={{
            fontFamily: "'Montserrat', sans-serif",
            fontWeight: 600,
            fontSize: isMobile ? '36px' : '60px',
            lineHeight: 1.1,
            letterSpacing: '-2.3321px',
            margin: '0 0 16px 0',
            maxWidth: '1000px',
          }}
        >
          <span style={{ color: '#000000' }}>From</span>{' '}
          <span style={{ color: '#c5422b' }}>Fragmented Channels</span>{' '}
          <span style={{ color: '#000000' }}>to</span>
          <br />
          <span style={{ color: '#c5422b' }}>Unified Commerce</span>
        </h2>

        {!isMobile && (
          <div
            ref={containerRef}
            style={{
              display: 'flex',
              position: 'relative',
              width: '100%',
              paddingLeft: '50px',
              boxSizing: 'border-box',
            }}
          >
            <div
              style={{
                position: 'absolute',
                left: desktopTrack.left !== undefined ? `${desktopTrack.left}px` : '9px',
                top: `${desktopTrack.top}px`,
                height: `${desktopTrack.height}px`,
                width: '3px',
                background: 'rgba(73, 32, 32, 0.2)',
                borderRadius: '3px',
                pointerEvents: 'none',
              }}
            >
              <div
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: `${(activeStep / (SEQUENCE_STEPS.length - 1)) * 100}%`,
                  background: '#c5422b',
                  boxShadow: '0 0 10px rgba(197, 66, 43, 0.65)',
                  borderRadius: '3px',
                  transition: 'height 0.35s ease',
                }}
              />
            </div>

            <div style={{ width: '100%', display: 'flex', flexDirection: 'column' }}>
              {SEQUENCE_STEPS.map((step, idx) => {
                const isActive = activeStep === idx;
                return (
                  <div
                    key={step.title}
                    onMouseEnter={() => setActiveStep(idx)}
                    style={{
                      position: 'relative',
                      display: 'grid',
                      gridTemplateColumns: '380px 1fr',
                      alignItems: 'center',
                      padding: '48px 0',
                      borderBottom:
                        idx < SEQUENCE_STEPS.length - 1
                          ? '1px solid rgba(73, 32, 32, 0.12)'
                          : 'none',
                      cursor: 'pointer',
                      transition: 'background 0.3s ease',
                    }}
                  >
                    <div
                      ref={
                        idx === 0
                          ? firstDotRef
                          : idx === SEQUENCE_STEPS.length - 1
                            ? lastDotRef
                            : undefined
                      }
                      style={{
                        position: 'absolute',
                        left: '-49px',
                        top: '50%',
                        transform: isActive
                          ? 'translateY(-50%) scale(1.15)'
                          : 'translateY(-50%) scale(1)',
                        width: '18px',
                        height: '18px',
                        borderRadius: '50%',
                        backgroundColor: isActive ? '#c5422b' : '#492020',
                        boxShadow: isActive ? '0 0 16px rgba(197, 66, 43, 0.65)' : 'none',
                        transition:
                          'background-color 0.3s ease, box-shadow 0.3s ease, transform 0.3s ease',
                        transformOrigin: 'center',
                        zIndex: 2,
                      }}
                    />

                    <h3
                      style={{
                        fontFamily: "'Montserrat', sans-serif",
                        fontWeight: 600,
                        fontSize: '36px',
                        lineHeight: 1.15,
                        letterSpacing: '-1.5px',
                        color: '#c5422b',
                        margin: 0,
                        paddingRight: '32px',
                        transition: 'transform 0.3s ease',
                        transform: isActive ? 'translateX(6px)' : 'translateX(0)',
                      }}
                    >
                      {step.title}
                    </h3>

                    <p
                      style={{
                        fontFamily: "'Montserrat', sans-serif",
                        fontWeight: 300,
                        fontSize: '20px',
                        lineHeight: 1.45,
                        color: '#341413',
                        margin: 0,
                        maxWidth: '780px',
                        opacity: isActive ? 1 : 0.82,
                        transition: 'opacity 0.3s ease',
                      }}
                    >
                      {step.desktopDesc}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {isMobile && (
          <div
            ref={mobileContainerRef}
            style={{
              display: 'flex',
              flexDirection: 'column',
              position: 'relative',
              paddingLeft: '32px',
              width: '100%',
              boxSizing: 'border-box',
            }}
          >
            <div
              style={{
                position: 'absolute',
                top: `${mobileTrack.top}px`,
                height: `${mobileTrack.height}px`,
                left: mobileTrack.left !== undefined ? `${mobileTrack.left}px` : '9px',
                width: '3px',
                backgroundColor: 'rgba(73, 32, 32, 0.2)',
                borderRadius: '3px',
                pointerEvents: 'none',
              }}
            >
              <div
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: `${(activeStep / (SEQUENCE_STEPS.length - 1)) * 100}%`,
                  background: '#c5422b',
                  boxShadow: '0 0 8px rgba(197, 66, 43, 0.65)',
                  borderRadius: '3px',
                  transition: 'height 0.35s ease',
                }}
              />
            </div>

            {SEQUENCE_STEPS.map((step, idx) => {
              const isActive = activeStep === idx;
              return (
                <div
                  key={step.title}
                  ref={(el) => {
                    mobileStepRefs.current[idx] = el;
                  }}
                  onClick={() => setActiveStep(idx)}
                  style={{
                    position: 'relative',
                    marginBottom: idx < SEQUENCE_STEPS.length - 1 ? '40px' : '0',
                    paddingLeft: '14px',
                    cursor: 'pointer',
                  }}
                >
                  <div
                    ref={
                      idx === 0
                        ? firstMobileDotRef
                        : idx === SEQUENCE_STEPS.length - 1
                          ? lastMobileDotRef
                          : undefined
                    }
                    style={{
                      position: 'absolute',
                      top: '6px',
                      left: '-32px',
                      width: '18px',
                      height: '18px',
                      borderRadius: '50%',
                      backgroundColor: isActive ? '#c5422b' : '#492020',
                      boxShadow: isActive ? '0 0 12px rgba(197, 66, 43, 0.65)' : 'none',
                      transition: 'background-color 0.3s ease, box-shadow 0.3s ease',
                      zIndex: 2,
                    }}
                  />

                  <h3
                    style={{
                      fontFamily: "'Montserrat', sans-serif",
                      fontWeight: 600,
                      fontSize: '26px',
                      lineHeight: 1.15,
                      letterSpacing: '-0.8px',
                      color: '#c5422b',
                      margin: '0 0 10px 0',
                    }}
                  >
                    {step.title}
                  </h3>

                  <p
                    style={{
                      fontFamily: "'Montserrat', sans-serif",
                      fontWeight: 300,
                      fontSize: '16px',
                      lineHeight: 1.45,
                      letterSpacing: '-0.3px',
                      color: '#341413',
                      margin: 0,
                      opacity: isActive ? 1 : 0.85,
                    }}
                  >
                    {step.mobileDesc}
                  </p>

                  {idx < SEQUENCE_STEPS.length - 1 && (
                    <div
                      style={{
                        marginTop: '32px',
                        height: '1px',
                        backgroundColor: 'rgba(73, 32, 32, 0.12)',
                        width: '100%',
                      }}
                    />
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
};
