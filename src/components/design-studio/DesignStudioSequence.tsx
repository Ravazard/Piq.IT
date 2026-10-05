import React, { useState, useEffect, useRef } from 'react';
import wireframe1 from '../../assets/design-studio-wireframe-1.svg';
import wireframe2 from '../../assets/design-studio-wireframe-2.svg';
import wireframe3 from '../../assets/design-studio-wireframe-3.svg';
import wireframe4 from '../../assets/design-studio-wireframe-4.svg';
import wireframe5 from '../../assets/design-studio-wireframe-5.svg';
import connectorSvg from '../../assets/design-studio-connector.svg';
import { useMobileCardState } from '../../hooks/useMobileScrollActive';

interface SequenceStep {
  title: string;
  desktopDesc: string;
  mobileDesc: string;
  wireframes?: string[];
}

const MobileSequenceCard: React.FC<{
  step: SequenceStep;
  isMobile: boolean;
}> = ({ step, isMobile }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const { isActive, toggle: toggleCard } = useMobileCardState(cardRef, isMobile);

  return (
    <div
      ref={cardRef}
      onClick={toggleCard}
      style={{
        position: 'relative',
        width: '100%',
        maxWidth: '324px',
        minHeight: '363px',
        borderRadius: '30px',
        cursor: 'pointer',
        background: isActive
          ? 'linear-gradient(to bottom, #6a2a2a, #3c1919)'
          : 'linear-gradient(to bottom, #562424, #341818)',
        padding: '28px 24px',
        boxSizing: 'border-box',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        boxShadow: isActive
          ? '0 24px 50px rgba(197, 66, 43, 0.45), 0 0 24px rgba(197, 66, 43, 0.25)'
          : '0 16px 40px rgba(52, 24, 24, 0.35)',
        transform: isActive ? 'translateY(-6px) scale(1.02)' : 'translateY(0) scale(1)',
        border: isActive
          ? '1px solid rgba(197, 66, 43, 0.65)'
          : '1px solid transparent',
        transition:
          'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.4s ease, border-color 0.35s ease, background 0.4s ease',
      }}
    >
      <h3
        style={{
          fontFamily: "'Montserrat', sans-serif",
          fontWeight: 700,
          fontSize: '32px',
          lineHeight: 1.1,
          letterSpacing: '-1.5px',
          color: '#ffffff',
          margin: '0 0 16px 0',
          textTransform: 'capitalize',
        }}
      >
        {step.title}
      </h3>

      <p
        style={{
          fontFamily: "'Montserrat', sans-serif",
          fontWeight: 300,
          fontSize: '17px',
          lineHeight: 1.35,
          letterSpacing: '-0.4px',
          color: 'rgba(255, 255, 255, 0.92)',
          margin: 0,
          maxWidth: '240px',
          zIndex: 2,
        }}
      >
        {step.mobileDesc}
      </p>

      {step.wireframes && step.wireframes.length > 0 && (
        <div
          style={{
            position: 'absolute',
            right: '-10px',
            bottom: '-10px',
            display: 'flex',
            alignItems: 'flex-end',
            pointerEvents: 'none',
            opacity: isActive ? 1 : 0.85,
            zIndex: 1,
            transform: isActive ? 'scale(1.05)' : 'scale(1)',
            transition: 'transform 0.4s ease, opacity 0.4s ease',
          }}
        >
          {step.wireframes.map((wf, wIdx) => (
            <img
              key={wIdx}
              src={wf}
              alt=""
              style={{
                maxWidth: '180px',
                maxHeight: '120px',
                objectFit: 'contain',
                marginLeft: wIdx > 0 ? '-30px' : '0',
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
};

const SEQUENCE_STEPS: SequenceStep[] = [
  {
    title: 'Spot Trends',
    desktopDesc: 'We track global trends in your category and spot rising styles before they peak',
    mobileDesc: 'We track global trends in your category and spot rising styles before they peak',
    wireframes: [wireframe1, wireframe2],
  },
  {
    title: 'Plan Your Collection',
    desktopDesc: 'We turn designer instinct and data into a balanced capsule of statement, core, and carryover styles',
    mobileDesc: 'Every style is documented with factory-grade detail: measurements, trims, construction, and tolerances',
    wireframes: [wireframe3],
  },
  {
    title: 'Build Tech Packs',
    desktopDesc: 'Every style is documented with factory-grade detail: measurements, trims, construction, and tolerances',
    mobileDesc: 'We turn designer instinct and data into a balanced capsule of statement, core, and carryover styles',
    wireframes: [wireframe4],
  },
  {
    title: 'Test Before You Make',
    desktopDesc: 'We test virtual samples with models and consumer panels, and lock in the winners before production, so you only make what sells',
    mobileDesc: 'Virtual prototypes tested against fit models and consumer panels. Winning designs are locked in before production, so you only make what works',
    wireframes: [wireframe3, wireframe5],
  },
];

export const DesignStudioSequence: React.FC = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [activeStep, setActiveStep] = useState<number>(0);

  const containerRef = useRef<HTMLDivElement>(null);
  const firstDotRef = useRef<HTMLDivElement>(null);
  const lastDotRef = useRef<HTMLDivElement>(null);
  const [desktopTrack, setDesktopTrack] = useState<{ top: number; height: number }>({
    top: 68,
    height: 410,
  });

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 900);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    const updateGeometry = () => {
      if (!isMobile && containerRef.current && firstDotRef.current && lastDotRef.current) {
        const cRect = containerRef.current.getBoundingClientRect();
        const fRect = firstDotRef.current.getBoundingClientRect();
        const lRect = lastDotRef.current.getBoundingClientRect();

        const startY = fRect.top + fRect.height / 2 - cRect.top;
        const endY = lRect.top + lRect.height / 2 - cRect.top;
        setDesktopTrack({ top: startY, height: Math.max(0, endY - startY) });
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
        backgroundColor: '#fff9f0',
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
            color: '#000000',
            margin: '0 0 70px 0',
            maxWidth: '900px',
          }}
        >
          {isMobile ? (
            <>
              Turn <span style={{ color: '#c5422b' }}>Ideas</span>
              <br />
              into
              <br />
              <span style={{ color: '#c5422b' }}>Bestsellers</span>
            </>
          ) : (
            <>
              Turn <span style={{ color: '#c5422b' }}>Ideas</span> into
              <span style={{ color: '#c5422b' }}> Bestsellers</span>
            </>
          )}
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
                left: '10px',
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
                      borderBottom: idx < SEQUENCE_STEPS.length - 1 ? '1px solid rgba(73, 32, 32, 0.12)' : 'none',
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
                        transition: 'background-color 0.3s ease, box-shadow 0.3s ease, transform 0.3s ease',
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
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              width: '100%',
            }}
          >
            {SEQUENCE_STEPS.map((step, idx) => (
              <React.Fragment key={step.title}>
                <MobileSequenceCard step={step} isMobile={isMobile} />

                {idx < SEQUENCE_STEPS.length - 1 && (
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      height: '110px',
                      margin: '6px 0',
                    }}
                  >
                    <img
                      src={connectorSvg}
                      alt=""
                      style={{
                        height: '100%',
                        width: 'auto',
                        objectFit: 'contain',
                      }}
                    />
                  </div>
                )}
              </React.Fragment>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};
