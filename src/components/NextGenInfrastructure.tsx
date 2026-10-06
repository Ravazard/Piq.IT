import React, { useRef, useState, useEffect } from 'react';
import card2Bg from '../assets/nextgen-card2-bg.png';
import card3Bg from '../assets/nextgen-card3-bg.png';
import card2Icon from '../assets/nextgen-card2-icon.png';
import card3Icon from '../assets/nextgen-card3-icon.png';
import fidenzaImg from '../assets/nextgen-fidenza.png';
import cubeWireframe from '../assets/cube-wireframe.svg';
import aiCubeWireframe from '../assets/ai-cube-wireframe.svg';
import commerceDiamondWireframe from '../assets/commerce-diamond-wireframe.svg';
import ellipseWhiteDot from '../assets/ellipse-white-dot.svg';
import { NextGenCard } from './common';

export const NextGenInfrastructure: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeftState, setScrollLeftState] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

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
      { threshold: 0.15 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!scrollRef.current) return;
    setIsDragging(true);
    setStartX(e.pageX - scrollRef.current.offsetLeft);
    setScrollLeftState(scrollRef.current.scrollLeft);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !scrollRef.current) return;
    e.preventDefault();
    const x = e.pageX - scrollRef.current.offsetLeft;
    const walk = (x - startX) * 1.5;
    scrollRef.current.scrollLeft = scrollLeftState - walk;
  };

  const handleMouseUpOrLeave = () => {
    setIsDragging(false);
  };

  const handleWheel = (e: React.WheelEvent) => {
    if (!scrollRef.current) return;
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
      id="next-gen"
      ref={sectionRef}
      style={{
        backgroundImage: isMobile
          ? 'linear-gradient(81.08deg, rgb(52, 20, 19) 36.441%, rgb(170, 57, 37) 206.63%)'
          : 'linear-gradient(121.16deg, rgb(52, 20, 19) 18.014%, rgb(170, 57, 37) 100%)',
        padding: isMobile
          ? '57px 20px 80px 20px'
          : '100px clamp(20px, 4.9vw, 71px) 120px clamp(20px, 4.9vw, 71px)',
        overflow: 'hidden',
        position: 'relative',
        width: '100%',
        boxSizing: 'border-box',
      }}
    >
      <div
        style={{
          maxWidth: isMobile ? '324px' : '1254px',
          margin: '0 auto',
          width: '100%',
          boxSizing: 'border-box',
        }}
      >
        <div style={{ marginBottom: isMobile ? '34px' : '60px' }}>
          <div
            style={{
              display: 'inline-block',
              border: '1px solid var(--color-accent)',
              borderRadius: '36px',
              padding: isMobile ? '8px 24px' : '12px 32px',
              color: 'var(--color-accent)',
              fontSize: isMobile ? '16px' : '24px',
              fontWeight: 600,
              letterSpacing: isMobile ? '-0.5px' : '-1px',
              marginBottom: isMobile ? '20px' : '40px',
            }}
          >
            The Piqit Engine
          </div>

          {isMobile ? (
            <h2
              style={{
                fontSize: '42px',
                fontWeight: 600,
                lineHeight: 1.1,
                letterSpacing: '-2.3321px',
                margin: 0,
                textAlign: 'left',
              }}
            >
              <span style={{ color: '#c5422b' }}>Reimagining</span>
              <br />
              <span style={{ color: '#ffffff' }}>How Fashion</span>
              <br />
              <span style={{ color: '#ffffff' }}>Brands </span>
              <span style={{ color: '#c5422b' }}>Design,</span>
              <br />
              <span style={{ color: '#c5422b' }}>Create </span>
              <span style={{ color: '#ffffff' }}>&amp;</span>
              <span style={{ color: '#c5422b' }}> Scale</span>
            </h2>
          ) : (
            <h2
              style={{
                fontSize: '60px',
                fontWeight: 600,
                lineHeight: 1.1,
                letterSpacing: '-2.3321px',
                margin: 0,
              }}
            >
              <span style={{ color: '#c5422b' }}>Reimagining </span>
              <span style={{ color: '#ffffff' }}>How Fashion Brands</span>
              <br />
              <span style={{ color: '#c5422b' }}>Design, Create </span>
              <span style={{ color: '#ffffff' }}>&amp;</span>
              <span style={{ color: '#c5422b' }}> Scale</span>
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
          className={isMobile ? undefined : 'nextgen-scroll-container'}
          style={{
            display: 'flex',
            flexDirection: isMobile ? 'column' : 'row',
            alignItems: isMobile ? 'center' : 'stretch',
            justifyContent: isMobile ? 'center' : 'flex-start',
            gap: isMobile ? '34px' : '30px',
            overflowX: isMobile ? 'visible' : 'auto',
            overflowY: 'hidden',
            paddingTop: isMobile ? '0' : '40px',
            paddingBottom: isMobile ? '0' : '80px',
            paddingLeft: isMobile ? '0' : '50px',
            paddingRight: isMobile ? '0' : '50px',
            margin: isMobile ? '0' : '-40px -50px -50px',
            cursor: !isMobile && isDragging ? 'grabbing' : !isMobile ? 'grab' : 'default',
            scrollbarWidth: isMobile ? 'none' : 'thin',
            scrollbarColor: 'var(--color-accent) rgba(0,0,0,0.06)',
            scrollBehavior: isDragging ? 'auto' : 'smooth',
            WebkitOverflowScrolling: 'touch',
            width: isMobile ? '100%' : 'calc(100% + 100px)',
            boxSizing: 'border-box',
          }}
        >
          <NextGenCard
            id="card-fashion"
            initialFlipped={false}
            bgImage={fidenzaImg}
            bgImageStyle={{
              width: '149.5%',
              height: '153%',
              top: '-32.3%',
              left: '-3.18%',
            }}
            title={isMobile ? 'Fashion Expertise' : <>Fashion <br /> Expertise</>}
            pointers={[
              'Insights · Assortments · Sales'
            ]}
            descriptionFontSize="24px"
            descriptionWidth="340px"
            descriptionLetterSpacing="-0.36px"
            descriptionTextTransform="none"
            description={
              isMobile ? (
                <>
                  Built on Fashion Expertise.<br />
                  Product, merchandising <br />and consumer <br />intelligence.
                </>
              ) : (
                <>
                  Built on Fashion Expertise.<br />
                  Product, merchandising<br />
                  and consumer<br />
                  intelligence.
                </>
              )
            }
            wireframeSrc={cubeWireframe}
            wireframeWidth="312px"
            wireframeHeight="123px"
            wireframeTransform="rotate(180deg)"
            dotSrc={ellipseWhiteDot}
            isVisible={isVisible}
            entranceDelay={0}
          />

          <NextGenCard
            id="card-ai"
            initialFlipped={false}
            bgImage={card2Bg}
            bgImageStyle={{
              width: '190.09%',
              height: '133.19%',
              top: '-5.34%',
              left: '-49.77%',
              maxWidth: 'none',
            }}
            topIconSrc={card2Icon}
            topIconBlendMode="color-dodge"
            topIconPosition={{ top: '27px', left: '24px', width: '50px', height: '50px' }}
            title={isMobile ? 'Artificial Intelligence' : <>Artificial <br /> Intelligence</>}
            pointers={[
              'Trends · Design · Content',
            ]}
            descriptionFontSize="24px"
            descriptionWidth="333px"
            descriptionLetterSpacing="-0.36px"
            descriptionTextTransform="none"
            description={
              isMobile ? (
                <>
                  Intelligence at Every Step.<br />
                  AI across trends, design,<br />
                  content and <br />
                  commerce.
                </>
              ) : (
                <>
                  Intelligence at Every Step.<br />
                  AI across trends, design,<br />
                  content and <br />
                  commerce.
                </>
              )
            }
            wireframeSrc={aiCubeWireframe}
            wireframeWidth="312px"
            wireframeHeight="124px"
            wireframeTransform="rotate(180deg)"
            dotSrc={ellipseWhiteDot}
            isVisible={isVisible}
            entranceDelay={0.15}
          />

          <NextGenCard
            id="card-commerce"
            initialFlipped={false}
            bgImage={card3Bg}
            bgImageStyle={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
            }}
            topIconSrc={card3Icon}
            topIconBlendMode="lighten"
            topIconPosition={{ top: '27px', left: '28px', width: '51px', height: '51px' }}
            title={<>Commerce <br /> Infrastructure</>}
            pointers={[
              'Fulfilment · Commerce · Operations',
            ]}
            descriptionFontSize="24px"
            descriptionWidth="333px"
            descriptionLetterSpacing="-0.36px"
            descriptionTextTransform="none"
            description={
              isMobile ? (
                <>
                 Everything Connected.<br />
                  Marketplaces, Fulfilment <br />
                  And Omnichannel  <br />
                  Commerce.
                </>
              ) : (
                <>
                  Everything Connected.<br />
                  Marketplaces,<br />Inventory, <br />
                  Fulfilment and <br />
                  Omnichannel<br /> Commerce.
                </>
              )
            }
            wireframeSrc={commerceDiamondWireframe}
            wireframeWidth="121px"
            wireframeHeight="137px"
            wireframeTransform="none"
            dotSrc={ellipseWhiteDot}
            isVisible={isVisible}
            entranceDelay={0.3}
          />
        </div>
      </div>
    </section>
  );
};
