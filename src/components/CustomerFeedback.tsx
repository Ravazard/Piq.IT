import React, { useRef, useState, useEffect } from 'react';
import gapDenimImg from '../assets/feedback/feedback-gap-denim.png';
import johnPlayersImg from '../assets/feedback/feedback-john-players.png';
import leeCooperImg from '../assets/feedback/feedback-lee-cooper.png';
import peterEnglandModelImg from '../assets/feedback/feedback-peter-england-model.png';
import peterEnglandWordmarkImg from '../assets/feedback/feedback-peter-england-wordmark.png';
import tommyHilfigerImg from '../assets/feedback/feedback-tommy-hilfiger.png';
import calvinKleinImg from '../assets/feedback/feedback-calvin-klein.png';
import { useMobileCardState } from '../hooks/useMobileScrollActive';

interface FeedbackCardData {
  id: string;
  authorName: string;
  authorTitle: string;
  headline: string;
  highlightText?: string;
  highlightSecondary?: string;
  supportingText?: string;
  metricLabel?: string;
  metricValue?: string;
}

const desktopCards: FeedbackCardData[] = [
  {
    id: 'gap',
    authorName: 'Parag Dani',
    authorTitle: 'CEO, GAP India',
    headline:
      'With Piqit, we have seen sharp improvements in sales performance, merchandising efficiency, and marketplace execution',
    highlightText:
      'A truly reliable partner that understands both fashion and technology.',
  },
  {
    id: 'jplc',
    authorName: 'Deepak Kohal',
    authorTitle: 'Business Head, JPLC',
    headline:
      "E-commerce wasn't new to us, but Piqit brought new dimensions to the way we approached online growth",
    highlightText:
      "Just five months after our launch, we'd touched ₹1 crore in business — through smart marketing, sharp merchandising, and the right sales strategy, not discounts.",
    highlightSecondary: "It's been a great partnership so far",
  },
  {
    id: 'pe',
    authorName: 'Shreyas Upadhya',
    authorTitle: 'Marketing - Peter England',
    headline: 'PIQIT reimagined the way we create and scale content.',
    supportingText:
      'They take raw product shoots and quickly turn them into a steady stream of high-converting, ad-ready assets across all our digital channels.',
    highlightSecondary:
      'A massive shoutout to the PIQIT team. They understand performance marketing, brand aesthetics, and platform specs, and working with them feels like an extension of our own team. Their speed and proactive problem-solving have been a game-changer for keeping our campaigns on track.',
  },
  {
    id: 'pvh',
    authorName: 'Donna R',
    authorTitle:
      'Senior Manager – Program and Catalog,\nPVH (Tommy Hilfiger and Calvin Klein)',
    headline: 'PIQIT became the backbone of our catalog execution.',
    supportingText:
      'The PIQIT team has been instrumental throughout this journey. They consistently delivered the numbers they committed to, moved with real speed and agility, and went the extra mile over the weekend to support us.',
    metricLabel: 'The result speaks for itself:',
    metricValue: '2834 styles live at launch!',
  },
];

const mobileCards: FeedbackCardData[] = [
  desktopCards[2],
  desktopCards[0],
  desktopCards[3],
  desktopCards[1],
];

export const CustomerFeedback: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const [hoveredCardId, setHoveredCardId] = useState<string | null>(null);

  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeftState, setScrollLeftState] = useState(0);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

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

  const updateScrollButtons = () => {
    if (!scrollRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
    setCanScrollLeft(scrollLeft > 10);
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
  };

  const handleScrollPrev = () => {
    if (!scrollRef.current) return;
    scrollRef.current.scrollBy({ left: -606, behavior: 'smooth' });
  };

  const handleScrollNext = () => {
    if (!scrollRef.current) return;
    scrollRef.current.scrollBy({ left: 606, behavior: 'smooth' });
  };

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
    const walk = (x - startX) * 1.4;
    scrollRef.current.scrollLeft = scrollLeftState - walk;
    updateScrollButtons();
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
        updateScrollButtons();
      }
    }
  };

  const renderDesktopVisual = (id: string, isHovered: boolean) => {
    const zoomTransform = isHovered ? 'scale(1.0)' : 'scale(1.08)';
    const transition = 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)';

    if (id === 'gap') {
      return (
        <div
          style={{
            position: 'absolute',
            left: '20px',
            top: '18px',
            width: '190px',
            height: '337px',
            borderRadius: '15px',
            overflow: 'hidden',
            backgroundColor: '#ffffff',
          }}
        >
          <img
            src={gapDenimImg}
            alt="GAP Denim"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              display: 'block',
              transform: zoomTransform,
              transition,
            }}
            draggable={false}
          />
        </div>
      );
    }

    if (id === 'jplc') {
      return (
        <div
          style={{
            position: 'absolute',
            left: '20px',
            top: '20px',
            width: '190px',
            height: '334px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
          }}
        >
          <div
            style={{
              width: '190px',
              height: '159px',
              borderRadius: '15px',
              backgroundColor: '#e50019',
              overflow: 'hidden',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '16px',
              boxSizing: 'border-box',
            }}
          >
            <img
              src={johnPlayersImg}
              alt="John Players"
              style={{
                width: '100%',
                maxHeight: '42px',
                objectFit: 'contain',
                transform: zoomTransform,
                transition,
              }}
              draggable={false}
            />
          </div>
          <div
            style={{
              width: '190px',
              height: '159px',
              borderRadius: '15px',
              overflow: 'hidden',
              backgroundColor: '#cecece',
            }}
          >
            <img
              src={leeCooperImg}
              alt="Lee Cooper"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                transform: zoomTransform,
                transition,
              }}
              draggable={false}
            />
          </div>
        </div>
      );
    }

    if (id === 'pe') {
      return (
        <div
          style={{
            position: 'absolute',
            left: '20px',
            top: '20px',
            width: '190px',
            height: '334px',
            borderRadius: '15px',
            overflow: 'hidden',
            backgroundColor: '#cecece',
          }}
        >
          <img
            src={peterEnglandModelImg}
            alt="Peter England Model"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              transform: zoomTransform,
              transition,
            }}
            draggable={false}
          />
          <div
            style={{
              position: 'absolute',
              left: '16px',
              top: '142px',
              width: '158px',
              height: '53px',
              pointerEvents: 'none',
              transform: zoomTransform,
              transition,
            }}
          >
            <img
              src={peterEnglandWordmarkImg}
              alt="Peter England"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'contain',
              }}
              draggable={false}
            />
          </div>
        </div>
      );
    }

    if (id === 'pvh') {
      return (
        <div
          style={{
            position: 'absolute',
            left: '20px',
            top: '20px',
            width: '190px',
            height: '334px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
          }}
        >
          <div
            style={{
              width: '190px',
              height: '159px',
              borderRadius: '15px',
              overflow: 'hidden',
              backgroundColor: '#cecece',
            }}
          >
            <img
              src={tommyHilfigerImg}
              alt="Tommy Hilfiger"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                transform: zoomTransform,
                transition,
              }}
              draggable={false}
            />
          </div>
          <div
            style={{
              width: '190px',
              height: '159px',
              borderRadius: '15px',
              overflow: 'hidden',
              backgroundColor: '#cecece',
            }}
          >
            <img
              src={calvinKleinImg}
              alt="Calvin Klein"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                transform: zoomTransform,
                transition,
              }}
              draggable={false}
            />
          </div>
        </div>
      );
    }

    return null;
  };

  const renderMobileVisual = (id: string, isActive: boolean) => {
    const zoomTransform = isActive ? 'scale(1.06)' : 'scale(1.0)';
    const transition = 'transform 0.45s cubic-bezier(0.16, 1, 0.3, 1)';

    if (id === 'pe') {
      return (
        <div
          style={{
            width: '100%',
            height: '110px',
            borderRadius: '15px',
            overflow: 'hidden',
            position: 'relative',
            backgroundColor: '#cecece',
          }}
        >
          <img
            src={peterEnglandModelImg}
            alt="Peter England"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              objectPosition: 'center 20%',
              transform: zoomTransform,
              transition,
            }}
          />
          <div
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: '140px',
              height: '42px',
              pointerEvents: 'none',
            }}
          >
            <img
              src={peterEnglandWordmarkImg}
              alt="Peter England"
              style={{ width: '100%', height: '100%', objectFit: 'contain' }}
            />
          </div>
        </div>
      );
    }

    if (id === 'gap') {
      return (
        <div
          style={{
            width: '100%',
            height: '110px',
            borderRadius: '15px',
            overflow: 'hidden',
            backgroundColor: '#cecece',
          }}
        >
          <img
            src={gapDenimImg}
            alt="GAP"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              objectPosition: 'center 40%',
              transform: zoomTransform,
              transition,
            }}
          />
        </div>
      );
    }

    if (id === 'pvh') {
      return (
        <div style={{ display: 'flex', gap: '8px', width: '100%', height: '110px' }}>
          <div
            style={{
              flex: 1,
              height: '110px',
              borderRadius: '15px',
              overflow: 'hidden',
              backgroundColor: '#cecece',
            }}
          >
            <img
              src={tommyHilfigerImg}
              alt="Tommy Hilfiger"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                transform: zoomTransform,
                transition,
              }}
            />
          </div>
          <div
            style={{
              flex: 1,
              height: '110px',
              borderRadius: '15px',
              overflow: 'hidden',
              backgroundColor: '#cecece',
            }}
          >
            <img
              src={calvinKleinImg}
              alt="Calvin Klein"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                transform: zoomTransform,
                transition,
              }}
            />
          </div>
        </div>
      );
    }

    if (id === 'jplc') {
      return (
        <div style={{ display: 'flex', gap: '8px', width: '100%', height: '110px' }}>
          <div
            style={{
              flex: 1,
              height: '110px',
              borderRadius: '15px',
              backgroundColor: '#e50019',
              overflow: 'hidden',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '10px',
              boxSizing: 'border-box',
            }}
          >
            <img
              src={johnPlayersImg}
              alt="John Players"
              style={{
                width: '100%',
                maxHeight: '32px',
                objectFit: 'contain',
                transform: zoomTransform,
                transition,
              }}
            />
          </div>
          <div
            style={{
              flex: 1,
              height: '110px',
              borderRadius: '15px',
              overflow: 'hidden',
              backgroundColor: '#cecece',
            }}
          >
            <img
              src={leeCooperImg}
              alt="Lee Cooper"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                transform: zoomTransform,
                transition,
              }}
            />
          </div>
        </div>
      );
    }

    return null;
  };

  return (
    <section
      id="feedback"
      ref={sectionRef}
      style={{
        background: isMobile
          ? '#fff9f0'
          : 'linear-gradient(148.214deg, rgb(255, 249, 240) 65.5%, rgb(153, 149, 144) 209%)',
        padding: isMobile ? '57px 20px 80px 20px' : '75px 0 90px 71px',
        overflow: 'hidden',
        position: 'relative',
        width: '100%',
        boxSizing: 'border-box',
      }}
    >
      <div
        style={{
          maxWidth: isMobile ? '350px' : '100%',
          margin: isMobile ? '0 auto' : '0',
          width: '100%',
          boxSizing: 'border-box',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: isMobile ? '36px' : '36px',
            paddingRight: isMobile ? '0' : '71px',
            transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
            opacity: isVisible ? 1 : 0,
            transition:
              'transform 0.8s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.8s ease',
          }}
        >
          <h2
            style={{
              fontFamily: "'Montserrat', sans-serif",
              fontSize: isMobile ? '36px' : '60px',
              fontWeight: 600,
              lineHeight: 1.1,
              letterSpacing: isMobile ? '-2.33px' : '-0.9px',
              color: '#000000',
              textAlign: isMobile ? 'left' : 'left',
              margin: 0,
            }}
          >
            {isMobile ? (
              <>
                The <span style={{ color: '#c5422b' }}>Piqit</span>
                <br />
                Experience
              </>
            ) : (
              <>
                The <span style={{ color: '#c5422b' }}>Piqit</span> Experience
              </>
            )}
          </h2>

          {!isMobile && (
            <div style={{ display: 'flex', gap: '14px', alignItems: 'center' }}>
              <button
                onClick={handleScrollPrev}
                disabled={!canScrollLeft}
                aria-label="Previous card"
                style={{
                  width: '48px',
                  height: '48px',
                  borderRadius: '50%',
                  border: '1.5px solid #552624',
                  backgroundColor: 'transparent',
                  color: canScrollLeft ? '#552624' : 'rgba(85,38,36,0.3)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: canScrollLeft ? 'pointer' : 'default',
                  transition: 'all 0.25s ease',
                  boxShadow: canScrollLeft ? '0 4px 14px rgba(0,0,0,0.06)' : 'none',
                }}
                onMouseEnter={(e) => {
                  if (canScrollLeft) {
                    e.currentTarget.style.backgroundColor = '#552624';
                    e.currentTarget.style.color = '#ffffff';
                  }
                }}
                onMouseLeave={(e) => {
                  if (canScrollLeft) {
                    e.currentTarget.style.backgroundColor = 'transparent';
                    e.currentTarget.style.color = '#552624';
                  }
                }}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="15 18 9 12 15 6" />
                </svg>
              </button>
              <button
                onClick={handleScrollNext}
                disabled={!canScrollRight}
                aria-label="Next card"
                style={{
                  width: '48px',
                  height: '48px',
                  borderRadius: '50%',
                  border: '1.5px solid #552624',
                  backgroundColor: 'transparent',
                  color: canScrollRight ? '#552624' : 'rgba(85,38,36,0.3)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: canScrollRight ? 'pointer' : 'default',
                  transition: 'all 0.25s ease',
                  boxShadow: canScrollRight ? '0 4px 14px rgba(0,0,0,0.06)' : 'none',
                }}
                onMouseEnter={(e) => {
                  if (canScrollRight) {
                    e.currentTarget.style.backgroundColor = '#552624';
                    e.currentTarget.style.color = '#ffffff';
                  }
                }}
                onMouseLeave={(e) => {
                  if (canScrollRight) {
                    e.currentTarget.style.backgroundColor = 'transparent';
                    e.currentTarget.style.color = '#552624';
                  }
                }}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="9 18 15 12 9 6" />
                </svg>
              </button>
            </div>
          )}
        </div>

        {isMobile ? (
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '28px',
              width: '100%',
              alignItems: 'center',
            }}
          >
            {mobileCards.map((card, index) => (
              <MobileFeedbackCardItem
                key={card.id}
                card={card}
                index={index}
                renderVisual={renderMobileVisual}
                sectionVisible={isVisible}
              />
            ))}
          </div>
        ) : (
          <div
            ref={scrollRef}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUpOrLeave}
            onMouseLeave={() => {
              handleMouseUpOrLeave();
              setHoveredCardId(null);
            }}
            onWheel={handleWheel}
            onScroll={updateScrollButtons}
            style={{
              display: 'flex',
              flexDirection: 'row',
              gap: '36px',
              overflowX: 'auto',
              overflowY: 'visible',
              paddingTop: '100px',
              paddingBottom: '140px',
              marginTop: '-75px',
              marginBottom: '-80px',
              marginLeft: '-71px',
              paddingLeft: '87px',
              paddingRight: '120px',
              WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 6%, black 94%, transparent 100%)',
              maskImage: 'linear-gradient(to right, transparent 0%, black 6%, black 94%, transparent 100%)',
              cursor: isDragging ? 'grabbing' : 'default',
              scrollbarWidth: 'none',
              msOverflowStyle: 'none',
              WebkitOverflowScrolling: 'touch',
              width: 'calc(100% + 71px)',
              boxSizing: 'border-box',
              userSelect: isDragging ? 'none' : 'auto',
            }}
          >
            {desktopCards.map((card, index) => {
              const isHovered = hoveredCardId === card.id;
              const hasAnotherHovered = hoveredCardId !== null && !isHovered;
              const entranceDelay = 0.15 + index * 0.1;

              const transformOrigin =
                index === 0
                  ? 'left center'
                  : index === desktopCards.length - 1
                  ? 'right center'
                  : 'center center';

              const cardTransform = isVisible
                ? isHovered
                  ? 'scale(1.18) translateY(-10px)'
                  : hasAnotherHovered
                  ? 'scale(0.96)'
                  : 'scale(1.0) translateY(0)'
                : 'translateY(40px)';

              const cardShadow = isHovered
                ? '0 32px 75px rgba(0, 0, 0, 0.22), 0 12px 28px rgba(0, 0, 0, 0.12), 0 0 0 1px rgba(0, 0, 0, 0.04)'
                : '0 4px 24px rgba(0, 0, 0, 0.06)';

              const cardOpacity = isVisible
                ? hasAnotherHovered
                  ? 0.4
                  : 1
                : 0;

              const cardFilter = hasAnotherHovered ? 'blur(1px)' : 'none';

              return (
                <div
                  key={card.id}
                  onMouseEnter={() => setHoveredCardId(card.id)}
                  onMouseLeave={() => setHoveredCardId(null)}
                  style={{
                    width: '574px',
                    minWidth: '574px',
                    height: '374px',
                    borderRadius: '20px',
                    backgroundColor: '#ffffff',
                    position: 'relative',
                    overflow: 'hidden',
                    zIndex: isHovered ? 50 : 1,
                    transformOrigin,
                    boxShadow: cardShadow,
                    transform: cardTransform,
                    opacity: cardOpacity,
                    filter: cardFilter,
                    transition: isVisible
                      ? 'transform 0.45s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.45s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.35s ease, filter 0.35s ease'
                      : `transform 0.85s cubic-bezier(0.16, 1, 0.3, 1) ${entranceDelay}s, opacity 0.85s ease ${entranceDelay}s`,
                    flexShrink: 0,
                    cursor: 'default',
                  }}
                >
                  {renderDesktopVisual(card.id, isHovered)}

                  <div
                    style={{
                      marginLeft: '239px',
                      padding: '31px 24px 28px 0',
                      height: '100%',
                      boxSizing: 'border-box',
                      display: 'flex',
                      flexDirection: 'column',
                      position: 'relative',
                    }}
                  >
                    <span
                      style={{
                        position: 'absolute',
                        right: '24px',
                        top: '9px',
                        fontFamily: "'Montserrat', sans-serif",
                        fontWeight: 600,
                        fontSize: '70px',
                        lineHeight: 1.1,
                        letterSpacing: '-1.5px',
                        color: '#c5422b',
                        userSelect: 'none',
                        pointerEvents: 'none',
                        transform: isHovered ? 'scale(1.06)' : 'scale(1.0)',
                        transition: 'transform 0.45s cubic-bezier(0.16, 1, 0.3, 1)',
                      }}
                    >
                      “
                    </span>

                    <div style={{ maxWidth: '240px' }}>
                      <div
                        style={{
                          fontFamily: "'Montserrat', sans-serif",
                          fontWeight: 600,
                          fontSize: '18px',
                          color: '#000000',
                          lineHeight: 1.2,
                        }}
                      >
                        {card.authorName}
                      </div>
                      <div
                        style={{
                          fontFamily: "'Montserrat', sans-serif",
                          fontWeight: 400,
                          fontSize: '12px',
                          color: '#000000',
                          marginTop: '4px',
                          lineHeight: 1.25,
                          whiteSpace: 'pre-line',
                        }}
                      >
                        {card.authorTitle}
                      </div>
                    </div>

                    <div
                      style={{
                        marginTop: card.id === 'pvh' || card.id === 'pe' ? '24px' : '22px',
                        fontFamily: "'Montserrat', sans-serif",
                        fontWeight: 500,
                        fontSize: '24px',
                        lineHeight: 1.1,
                        letterSpacing: '-1.5px',
                        color: '#000000',
                        maxWidth: '290px',
                      }}
                    >
                      {card.headline}
                    </div>

                    {card.id === 'gap' && (
                      <div
                        style={{
                          marginTop: 'auto',
                          fontFamily: "'Montserrat', sans-serif",
                          fontWeight: 400,
                          fontSize: '14px',
                          lineHeight: 'normal',
                          color: '#c5422b',
                          maxWidth: '264px',
                        }}
                      >
                        {card.highlightText}
                      </div>
                    )}

                    {card.id === 'jplc' && (
                      <div
                        style={{
                          marginTop: 'auto',
                          fontFamily: "'Montserrat', sans-serif",
                          fontWeight: 400,
                          fontSize: '14px',
                          lineHeight: 'normal',
                          color: '#c5422b',
                          maxWidth: '295px',
                        }}
                      >
                        <p style={{ margin: '0 0 6px 0' }}>{card.highlightText}</p>
                        <p style={{ margin: 0 }}>{card.highlightSecondary}</p>
                      </div>
                    )}

                    {card.id === 'pe' && (
                      <div style={{ marginTop: 'auto' }}>
                        <p
                          style={{
                            margin: '0 0 10px 0',
                            fontFamily: "'Montserrat', sans-serif",
                            fontWeight: 400,
                            fontSize: '14px',
                            lineHeight: 'normal',
                            color: '#000000',
                            maxWidth: '295px',
                          }}
                        >
                          {card.supportingText}
                        </p>
                        <p
                          style={{
                            margin: 0,
                            fontFamily: "'Montserrat', sans-serif",
                            fontWeight: 400,
                            fontSize: '10px',
                            lineHeight: 'normal',
                            color: '#000000',
                            maxWidth: '295px',
                          }}
                        >
                          {card.highlightSecondary}
                        </p>
                      </div>
                    )}

                    {card.id === 'pvh' && (
                      <div style={{ marginTop: 'auto' }}>
                        <p
                          style={{
                            margin: '0 0 12px 0',
                            fontFamily: "'Montserrat', sans-serif",
                            fontWeight: 400,
                            fontSize: '14px',
                            lineHeight: 'normal',
                            color: '#000000',
                            maxWidth: '295px',
                          }}
                        >
                          {card.supportingText}
                        </p>
                        <div
                          style={{
                            fontFamily: "'Montserrat', sans-serif",
                            fontWeight: 400,
                            fontSize: '14px',
                            color: '#000000',
                          }}
                        >
                          {card.metricLabel}
                        </div>
                        <div
                          style={{
                            fontFamily: "'Montserrat', sans-serif",
                            fontWeight: 500,
                            fontSize: '24px',
                            lineHeight: 1.1,
                            letterSpacing: '-1.5px',
                            color: '#000000',
                            marginTop: '2px',
                          }}
                        >
                          {card.metricValue}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
};

interface MobileCardItemProps {
  card: FeedbackCardData;
  index: number;
  renderVisual: (id: string, isActive: boolean) => React.ReactNode;
  sectionVisible: boolean;
}

const MobileFeedbackCardItem: React.FC<MobileCardItemProps> = ({
  card,
  index,
  renderVisual,
  sectionVisible,
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
        }
      },
      { threshold: 0.15 }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const { isActive, toggle } = useMobileCardState(cardRef, true);
  const visible = sectionVisible || inView;

  return (
    <div
      ref={cardRef}
      onClick={toggle}
      style={{
        width: '100%',
        maxWidth: '311px',
        backgroundColor: '#ffffff',
        borderRadius: '20px',
        padding: '12px 14px 20px 14px',
        boxSizing: 'border-box',
        overflow: 'hidden',
        position: 'relative',
        zIndex: isActive ? 10 : 1,
        transformOrigin: 'center center',
        boxShadow: isActive
          ? '0 18px 45px rgba(0, 0, 0, 0.16), 0 4px 14px rgba(0, 0, 0, 0.08)'
          : '0 4px 20px rgba(0, 0, 0, 0.06)',
        transform: visible
          ? isActive
            ? 'scale(1.04) translateY(-4px)'
            : 'scale(1.0) translateY(0)'
          : 'translateY(30px)',
        opacity: visible ? 1 : 0,
        transition:
          `transform 0.45s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.4s ease, opacity 0.6s ease ${index * 0.08}s`,
      }}
    >
      <div style={{ marginBottom: '16px' }}>{renderVisual(card.id, isActive)}</div>

      <div
        style={{
          fontFamily: "'Montserrat', sans-serif",
          fontWeight: 500,
          fontSize: '24px',
          lineHeight: 1.15,
          letterSpacing: '-1.2px',
          color: '#000000',
          marginBottom: '14px',
        }}
      >
        {card.headline}
      </div>

      {card.id === 'gap' && (
        <div
          style={{
            fontFamily: "'Montserrat', sans-serif",
            fontWeight: 400,
            fontSize: '16px',
            color: '#c5422b',
            lineHeight: 1.35,
            marginBottom: '20px',
          }}
        >
          {card.highlightText}
        </div>
      )}

      {card.id === 'jplc' && (
        <div
          style={{
            fontFamily: "'Montserrat', sans-serif",
            fontWeight: 400,
            fontSize: '16px',
            color: '#c5422b',
            lineHeight: 1.35,
            marginBottom: '20px',
          }}
        >
          <p style={{ margin: '0 0 6px 0' }}>{card.highlightText}</p>
          <p style={{ margin: 0 }}>{card.highlightSecondary}</p>
        </div>
      )}

      {card.id === 'pe' && (
        <div style={{ marginBottom: '20px' }}>
          <p
            style={{
              margin: '0 0 10px 0',
              fontFamily: "'Montserrat', sans-serif",
              fontWeight: 400,
              fontSize: '16px',
              color: '#000000',
              lineHeight: 1.35,
            }}
          >
            {card.supportingText}
          </p>
          <p
            style={{
              margin: 0,
              fontFamily: "'Montserrat', sans-serif",
              fontWeight: 400,
              fontSize: '12px',
              color: '#000000',
              lineHeight: 1.35,
            }}
          >
            {card.highlightSecondary}
          </p>
        </div>
      )}

      {card.id === 'pvh' && (
        <div style={{ marginBottom: '20px' }}>
          <p
            style={{
              margin: '0 0 12px 0',
              fontFamily: "'Montserrat', sans-serif",
              fontWeight: 400,
              fontSize: '16px',
              color: '#000000',
              lineHeight: 1.35,
            }}
          >
            {card.supportingText}
          </p>
          <div
            style={{
              fontFamily: "'Montserrat', sans-serif",
              fontWeight: 400,
              fontSize: '16px',
              color: '#000000',
              marginBottom: '2px',
            }}
          >
            {card.metricLabel}
          </div>
          <div
            style={{
              fontFamily: "'Montserrat', sans-serif",
              fontWeight: 500,
              fontSize: '24px',
              lineHeight: 1.15,
              letterSpacing: '-1.2px',
              color: '#000000',
            }}
          >
            {card.metricValue}
          </div>
        </div>
      )}

      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-end',
          borderTop: '1px solid rgba(0,0,0,0.06)',
          paddingTop: '14px',
        }}
      >
        <div style={{ maxWidth: '210px' }}>
          <div
            style={{
              fontFamily: "'Montserrat', sans-serif",
              fontWeight: 600,
              fontSize: '20px',
              color: '#000000',
              lineHeight: 1.2,
            }}
          >
            {card.authorName}
          </div>
          <div
            style={{
              fontFamily: "'Montserrat', sans-serif",
              fontWeight: 400,
              fontSize: '14px',
              color: '#000000',
              marginTop: '4px',
              lineHeight: 1.25,
              whiteSpace: 'pre-line',
            }}
          >
            {card.authorTitle}
          </div>
        </div>

        <span
          style={{
            fontFamily: "'Montserrat', sans-serif",
            fontWeight: 600,
            fontSize: '56px',
            lineHeight: 0.8,
            color: '#c5422b',
            userSelect: 'none',
          }}
        >
          “
        </span>
      </div>
    </div>
  );
};
