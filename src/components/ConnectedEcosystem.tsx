import React, { useRef, useState, useEffect } from 'react';
import designStudioBg from '../assets/ecosystem/ecosystem-design-studio.png';
import sourcingHubBg from '../assets/ecosystem/ecosystem-sourcing-hub.png';
import contentLabBg from '../assets/ecosystem/ecosystem-content-lab.png';
import commerceGridBg from '../assets/ecosystem/ecosystem-commerce-grid.png';
import { EcosystemCard } from './common';

export const ConnectedEcosystem: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeftState, setScrollLeftState] = useState(0);

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
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!scrollRef.current || isMobile) return;
    setIsDragging(true);
    setStartX(e.pageX - scrollRef.current.offsetLeft);
    setScrollLeftState(scrollRef.current.scrollLeft);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !scrollRef.current || isMobile) return;
    e.preventDefault();
    const x = e.pageX - scrollRef.current.offsetLeft;
    const walk = (x - startX) * 1.5;
    scrollRef.current.scrollLeft = scrollLeftState - walk;
  };

  const handleMouseUpOrLeave = () => {
    setIsDragging(false);
  };

  const handleWheel = (e: React.WheelEvent) => {
    if (!scrollRef.current || isMobile) return;
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

  return (
    <section
      id="ecosystem"
      ref={sectionRef}
      style={{
        backgroundImage: isMobile
          ? 'linear-gradient(85.53deg, rgb(52, 20, 19) 36.44%, rgb(170, 57, 37) 206.63%)'
          : 'linear-gradient(116.94deg, rgb(54, 21, 20) 16.02%, rgb(176, 59, 39) 98.64%)',
        padding: isMobile ? '60px 24px 80px 24px' : '100px 71px 120px 71px',
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
        <div style={{ marginBottom: isMobile ? '40px' : '60px' }}>
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
              letterSpacing: isMobile ? '-1px' : '-1.5px',
              width: 'fit-content',
              marginBottom: isMobile ? '20px' : '36px',
              userSelect: 'none',
            }}
          >
            Unified Ecosystem
          </div>

          {isMobile ? (
            <h2
              style={{
                fontFamily: "'Montserrat', sans-serif",
                fontSize: '36px',
                fontWeight: 600,
                lineHeight: 1.1,
                letterSpacing: '-2.3321px',
                color: '#ffffff',
                margin: 0,
              }}
            >
              From <span style={{ color: '#c5422b' }}>Concept </span>to
              <br />
              <span style={{ color: '#c5422b' }}>Commerce</span>
              <br />
              Built to <span style={{ color: '#c5422b' }}>Scale</span>
            </h2>
          ) : (
            <h2
              style={{
                fontFamily: "'Montserrat', sans-serif",
                fontSize: '60px',
                fontWeight: 600,
                lineHeight: 1.1,
                letterSpacing: '-2.3321px',
                color: '#ffffff',
                margin: 0,
              }}
            >
              From <span style={{ color: '#c5422b' }}>Concept </span>to
              <span style={{ color: '#c5422b' }}> Commerce</span>
              <br />
              Built to <span style={{ color: '#c5422b' }}>Scale</span>
            </h2>
          )}
        </div>

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
            alignItems: isMobile ? 'center' : 'stretch',
            gap: isMobile ? '46px' : '33px',
            overflowX: isMobile ? 'visible' : 'auto',
            overflowY: 'visible',
            paddingTop: isMobile ? '0' : '40px',
            paddingBottom: isMobile ? '0' : '80px',
            paddingLeft: isMobile ? '0' : '50px',
            paddingRight: isMobile ? '0' : '50px',
            margin: isMobile ? '0' : '-40px -50px -60px',
            width: isMobile ? 'auto' : 'calc(100% + 100px)',
            boxSizing: 'border-box',
            cursor: !isMobile && isDragging ? 'grabbing' : 'default',
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
          }}
        >
          <EcosystemCard
            id="ecosystem-design-studio"
            title={
              <>
                Design <br />
                Studio
              </>
            }
            bgImage={designStudioBg}
            description={
              <>
                Spot Trends
                <br />
                Design What Sells
              </>
            }
            exploreUrl="#design-studio"
            isVisible={isVisible}
            entranceDelay={0}
          />

          <EcosystemCard
            id="ecosystem-sourcing-hub"
            title={
              <>
                Sourcing <br />
                Hub
              </>
            }
            bgImage={sourcingHubBg}
            description={
              <>
                Source Better
                <br />
                Manufacture Smarter
              </>
            }
            exploreUrl="#sourcing-hub"
            isVisible={isVisible}
            entranceDelay={isMobile ? 0.1 : 0.18}
          />

          <EcosystemCard
            id="ecosystem-content-lab"
            title={
              <>
                Content <br />
                Lab
              </>
            }
            bgImage={contentLabBg}
            description={
              <>
                Create Faster
                <br />
                Sell Better
              </>
            }
            exploreUrl="#content-lab"
            isVisible={isVisible}
            entranceDelay={isMobile ? 0.2 : 0.36}
          />

          <EcosystemCard
            id="ecosystem-commerce-grid"
            title={
              <>
                Commerce <br />
                Grid
              </>
            }
            bgImage={commerceGridBg}
            description={
              <>
                Connect Every Channel
                <br />
                Sell Everywhere
              </>
            }
            exploreUrl="#commerce-grid"
            isVisible={isVisible}
            entranceDelay={isMobile ? 0.3 : 0.54}
          />
        </div>
      </div>
    </section>
  );
};
