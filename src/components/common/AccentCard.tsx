import React from 'react';
import ellipseWhiteDot from '../../assets/ellipse-white-dot.svg';

export interface AccentCardProps {
  headline: React.ReactNode;
  body: React.ReactNode;
  hasDot?: boolean;
  dotSrc?: string;
  dotSize?: number | string;
  dotPosition?: { top: number | string; right: number | string };
  wireframeSrc?: string;
  wireframeWidth?: number | string;
  wireframeHeight?: number | string;
  wireframeTransform?: string;
  wireframeOpacity?: number;
  borderRadius?: string;
  padding?: string;
  headlineMarginBottom?: string | number;
  headlineMaxWidth?: string | number;
  bodyFontSize?: string;
  bodyLetterSpacing?: string;
  bodyTextTransform?: 'capitalize' | 'none' | 'uppercase' | 'lowercase';
  bodyMaxWidth?: string | number;
  bodyColor?: string;
  backgroundColor?: string;
  width?: string;
  height?: string;
  style?: React.CSSProperties;
  children?: React.ReactNode;
}

export const AccentCard: React.FC<AccentCardProps> = ({
  headline,
  body,
  hasDot = false,
  dotSrc = ellipseWhiteDot,
  dotSize = '22px',
  dotPosition = { top: '18px', right: '18px' },
  wireframeSrc,
  wireframeWidth = '312px',
  wireframeHeight = '124px',
  wireframeTransform = 'rotate(180deg)',
  wireframeOpacity = 0.85,
  borderRadius = '25px',
  padding = '37px 35px 0 35px',
  headlineMarginBottom = '85px',
  headlineMaxWidth = '308px',
  bodyFontSize = '24px',
  bodyLetterSpacing = '-0.36px',
  bodyTextTransform = 'none',
  bodyMaxWidth = '333px',
  bodyColor = '#ffffff',
  backgroundColor = 'var(--color-accent)',
  width = '398px',
  height = '584px',
  style,
  children,
}) => {
  const cardStyle: React.CSSProperties = {
    width,
    height,
    minWidth: width,
    maxWidth: width,
    minHeight: height,
    maxHeight: height,
    flexShrink: 0,
    borderRadius,
    backgroundColor,
    padding,
    color: '#fff9f0',
    position: 'relative',
    overflow: 'hidden',
    userSelect: 'none',
    boxShadow: '0 8px 30px rgba(0,0,0,0.06)',
    ...style,
  };

  return (
    <div style={cardStyle}>
      {hasDot && (
        <div
          style={{
            position: 'absolute',
            top: dotPosition.top,
            right: dotPosition.right,
            width: dotSize,
            height: dotSize,
            zIndex: 4,
          }}
        >
          <img
            src={dotSrc}
            alt=""
            style={{ width: '100%', height: '100%', display: 'block' }}
            draggable={false}
          />
        </div>
      )}

      <h3
        style={{
          fontFamily: "'Montserrat', sans-serif",
          fontSize: '42px',
          fontWeight: 500,
          lineHeight: 1.1,
          letterSpacing: '-2.3321px',
          color: '#fff9f0',
          maxWidth: headlineMaxWidth,
          marginBottom: headlineMarginBottom,
        }}
      >
        {headline}
      </h3>

      <p
        style={{
          fontFamily: "'Montserrat', sans-serif",
          fontSize: bodyFontSize,
          fontWeight: 300,
          lineHeight: 1.1,
          letterSpacing: bodyLetterSpacing,
          textTransform: bodyTextTransform,
          color: bodyColor,
          maxWidth: bodyMaxWidth,
          position: 'relative',
          zIndex: 3,
        }}
      >
        {body}
      </p>

      {wireframeSrc && (
        <div
          style={{
            position: 'absolute',
            bottom: 0,
            right: 0,
            width: wireframeWidth,
            height: wireframeHeight,
            pointerEvents: 'none',
            transform: wireframeTransform,
            zIndex: 1,
            opacity: wireframeOpacity,
          }}
        >
          <img
            src={wireframeSrc}
            alt=""
            style={{ width: '100%', height: '100%', objectFit: 'contain' }}
            draggable={false}
          />
        </div>
      )}

      {children}
    </div>
  );
};
