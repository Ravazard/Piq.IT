import React from 'react';

export const Manifesto: React.FC = () => {
  return (
    <section style={{ backgroundColor: 'white', padding: '100px 20px', textAlign: 'center' }}>
      <div style={{ display: 'inline-block', border: '1px solid var(--color-accent)', borderRadius: '36px', padding: '12px 32px', color: 'var(--color-accent)', fontSize: '24px', fontWeight: 600, marginBottom: '40px' }}>
        The Manifesto
      </div>
      
      <h2 style={{ fontSize: '60px', color: 'rgba(0,0,0,0.55)', fontWeight: 600, lineHeight: 1.1, letterSpacing: '-2.33px', maxWidth: '1025px', margin: '0 auto', marginBottom: '30px' }}>
        <span style={{ color: 'black' }}>One Platform</span> Every <br/>
        Stage of <span style={{ color: 'black' }}>Fashion Retail</span>
      </h2>

      <p style={{ fontSize: '24px', fontWeight: 300, color: 'black', maxWidth: '553px', margin: '0 auto', lineHeight: 1.1, letterSpacing: '-1.5px' }}>
        Piqit connects the entire retail lifecycle through one AI-powered ecosystem for faster launch, smarter operations and global scaling
      </p>
    </section>
  );
};
