import React from 'react';

export interface VisualCardProps {
  bgImage: string;
  bgImageStyle?: React.CSSProperties;
  iconSrc?: string;
  iconBlendMode?: 'normal' | 'color-dodge' | 'lighten' | 'screen' | 'overlay';
  iconPosition?: { top?: string | number; left?: string | number; width?: string | number; height?: string | number };
  gradientHeight?: string | number;
  gradientBackground?: string;
  backdropBlur?: boolean | string | number;
  contentPosition?: 'center' | 'bottom-left';
  title?: React.ReactNode;
  titleStyle?: React.CSSProperties;
  width?: string;
  height?: string;
  borderRadius?: string;
  backgroundColor?: string;
  style?: React.CSSProperties;
  children?: React.ReactNode;
}

export const VisualCard: React.FC<VisualCardProps> = ({
  bgImage,
  bgImageStyle,
  iconSrc,
  iconBlendMode = 'normal',
  iconPosition = { top: '27px', left: '24px', width: '50px', height: '50px' },
  gradientHeight = '208px',
  gradientBackground = 'linear-gradient(180deg, rgba(0, 0, 0, 0.00) 0%, #000 100%)',
  backdropBlur = '11.75px',
  contentPosition = 'center',
  title,
  titleStyle,
  width = '398px',
  height = '584px',
  borderRadius = '20px',
  backgroundColor = '#000',
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
    position: 'relative',
    overflow: 'hidden',
    userSelect: 'none',
    boxShadow: '0 8px 30px rgba(0,0,0,0.06)',
    ...style,
  };

  const getBlurFilter = () => {
    if (!backdropBlur) return undefined;
    const blurVal =
      typeof backdropBlur === 'number'
        ? `${backdropBlur}px`
        : typeof backdropBlur === 'string'
        ? backdropBlur.includes('px')
          ? backdropBlur
          : `${backdropBlur}px`
        : '11.75px';
    return `blur(${blurVal})`;
  };

  const blurFilter = getBlurFilter();

  return (
    <div style={cardStyle}>
      <img
        src={bgImage}
        alt=""
        style={{
          width: '100%',
          height: '100%',
          position: 'absolute',
          top: 0,
          left: 0,
          objectFit: 'cover',
          ...bgImageStyle,
        }}
        draggable={false}
      />

      {iconSrc && (
        <div
          style={{
            position: 'absolute',
            top: iconPosition.top,
            left: iconPosition.left,
            width: iconPosition.width,
            height: iconPosition.height,
            zIndex: 2,
          }}
        >
          <img
            src={iconSrc}
            alt=""
            style={{
              width: '100%',
              height: '100%',
              mixBlendMode: iconBlendMode,
              objectFit: 'cover',
            }}
            draggable={false}
          />
        </div>
      )}

      <div
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          width: '100%',
          height: gradientHeight,
          borderRadius: '0 0 20px 20px',
          background: gradientBackground,
          ...(blurFilter
            ? {
                backdropFilter: blurFilter,
                WebkitBackdropFilter: blurFilter,
                WebkitMaskImage: 'linear-gradient(180deg, transparent 0%, black 100%)',
                maskImage: 'linear-gradient(180deg, transparent 0%, black 100%)',
              }
            : {}),
          zIndex: 1,
        }}
      />

      {contentPosition === 'center' ? (
        <div
          style={{
            position: 'absolute',
            bottom: '40px',
            left: 0,
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center',
            zIndex: 2,
          }}
        >
          {title && (
            <h3
              style={{
                fontSize: '42px',
                color: 'white',
                fontWeight: 500,
                lineHeight: 1.1,
                letterSpacing: '-2.33px',
                marginBottom: '26px',
                ...titleStyle,
              }}
            >
              {title}
            </h3>
          )}
          {children}
        </div>
      ) : (
        <div
          style={{
            position: 'absolute',
            bottom: '40px',
            left: '35px',
            right: '35px',
            zIndex: 2,
          }}
        >
          {title && (
            <h3
              style={{
                fontSize: '42px',
                color: 'white',
                fontWeight: 500,
                lineHeight: 1.1,
                letterSpacing: '-2px',
                ...titleStyle,
              }}
            >
              {title}
            </h3>
          )}
          {children}
        </div>
      )}
    </div>
  );
};
