import React from 'react';
import '../index.css';

export const BrandShowcase: React.FC = () => {
  const logoModules = import.meta.glob('../assets/logos/*.png', { eager: true, query: '?url', import: 'default' });
  const logos = Object.values(logoModules) as string[];

  return (
    <section 
      style={{ 
        width: '100%', 
        backgroundColor: '#fff9f0',
        height: '352px',
        padding: '65px 0',
        position: 'relative',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        boxSizing: 'border-box'
      }}
    >
      <h2 
        style={{ 
          textAlign: 'center', 
          color: '#492020', 
          fontSize: '24px', 
          fontWeight: 600,
          fontFamily: "'Montserrat', sans-serif",
          margin: '0 0 42px 0'
        }}
      >
        Trusted by Global Brands
      </h2>

      <div 
        style={{ 
          width: '100%', 
          overflow: 'hidden',
          WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 6%, black 94%, transparent 100%)',
          maskImage: 'linear-gradient(to right, transparent 0%, black 6%, black 94%, transparent 100%)'
        }}
      >
        <div 
          className="marquee-container"
          style={{ 
            display: 'flex', 
            alignItems: 'center',
            gap: '80px', 
            width: 'max-content', 
            animation: 'marquee 65s linear infinite' 
          }}
        >
          {[...logos, ...logos].map((logo, index) => (
            <div 
              key={index} 
              style={{
                width: '185px',
                height: '185px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
                backgroundColor: 'transparent',
              
              }}
            >
              <img 
                src={logo} 
                alt={`Brand Logo ${index}`} 
                style={{ 
                  width: '100%',
                  height: '100%',
                  objectFit: 'contain',
                  pointerEvents: 'none'
                }} 
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
