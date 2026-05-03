import { useEffect, useRef, useState } from 'react';

export default function Hero() {
  const heroRef = useRef<HTMLDivElement>(null);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setRevealed(true), 300);
    return () => clearTimeout(timer);
  }, []);

  const scrollToKisah = () => {
    const el = document.querySelector('#kisah');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const panelImages = [
    '/images/komik-strip-01.jpg',
    '/images/komik-strip-02.jpg',
    '/images/komik-strip-03.jpg',
    '/images/komik-berwarna-01.jpg',
    '/images/komik-berwarna-02.jpg',
    '/images/macam-macam-suratkhabar.jpg',
  ];

  return (
    <section
      id="top"
      ref={heroRef}
      className="relative overflow-hidden"
      style={{ minHeight: '100dvh' }}
    >
      {/* Background comic panels */}
      <div className="absolute inset-0 overflow-hidden" style={{ zIndex: 0 }}>
        {panelImages.map((img, i) => (
          <div
            key={i}
            className="absolute"
            style={{
              backgroundImage: `url(${img})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              border: '4px solid var(--c-text)',
              boxShadow: '0 0 20px rgba(0,0,0,0.5)',
              opacity: 0.12,
              width: `${25 + (i % 3) * 10}%`,
              height: `${25 + (i % 2) * 15}%`,
              left: `${(i * 17) % 80}%`,
              top: `${(i * 13) % 70}%`,
              transform: `rotate(${(i % 2 === 0 ? -1 : 1) * (5 + i * 3)}deg)`,
            }}
          />
        ))}
      </div>

      {/* Main hero content */}
      <div
        className="relative flex flex-col items-center justify-center text-center"
        style={{ zIndex: 1, minHeight: '100dvh', padding: 'var(--space-xl)' }}
      >
        {/* Hero main image — REAL PHOTO of Kerengge drawing at booth */}
        <div
          className="mb-6 overflow-hidden"
          style={{
            border: '4px solid var(--c-text)',
            boxShadow: '8px 8px 0px var(--c-text)',
            maxWidth: '380px',
            width: '100%',
            opacity: revealed ? 1 : 0,
            transform: revealed ? 'scale(1)' : 'scale(0.9)',
            transition: 'all 800ms var(--ease-out-expo)',
          }}
        >
          <img
            src="/images/kerengge-booth-drawing.jpg"
            alt="Mohamad Hanafiah Ibrahim (Kerengge) sedang melukis dan menandatangani komik"
            className="w-full h-auto"
            style={{ display: 'block' }}
          />
        </div>

        {/* Headline */}
        <h1
          className="font-display"
          style={{
            fontSize: 'clamp(3rem, 10vw, 7rem)',
            lineHeight: 0.9,
            color: 'var(--c-text)',
            textShadow: '4px 4px 0px var(--c-accent)',
            opacity: revealed ? 1 : 0,
            transform: revealed ? 'translateY(0)' : 'translateY(40px)',
            transition: 'all 800ms var(--ease-out-expo) 200ms',
          }}
        >
          LEGENDA KARTUN MALAYSIA
        </h1>

        {/* Subheadline */}
        <p
          className="mt-6"
          style={{
            fontSize: 'clamp(1.25rem, 3vw, 1.75rem)',
            fontFamily: "'Fredoka', sans-serif",
            fontWeight: 500,
            color: 'var(--c-text)',
            maxWidth: '600px',
            opacity: revealed ? 1 : 0,
            transform: revealed ? 'translateY(0)' : 'translateY(40px)',
            transition: 'all 800ms var(--ease-out-expo) 400ms',
          }}
        >
          Mohamad Hanafiah Ibrahim — Kerengge
        </p>

        {/* CTA Button */}
        <div
          className="mt-8"
          style={{
            opacity: revealed ? 1 : 0,
            transform: revealed ? 'translateY(0)' : 'translateY(40px)',
            transition: 'all 800ms var(--ease-out-expo) 600ms',
          }}
        >
          <button onClick={scrollToKisah} className="btn-primary">
            Jelajahi Kisahnya
          </button>
        </div>

        {/* Floating decorative element — Tokoh Kartunis 2023 */}
        <div
          className="absolute hidden md:block"
          style={{
            bottom: '8%',
            right: '3%',
            width: '140px',
            zIndex: 2,
            opacity: revealed ? 0.9 : 0,
            transition: 'opacity 1000ms ease 800ms',
          }}
        >
          <img
            src="/images/tokoh-kartunis-2023.jpg"
            alt="Anugerah Tokoh Kartunis 2023"
            className="w-full h-auto"
            style={{
              display: 'block',
              border: '3px solid var(--c-text)',
              boxShadow: '4px 4px 0px rgba(0,0,0,0.3)',
            }}
          />
        </div>

        {/* Floating decorative element — Produksi GG */}
        <div
          className="absolute hidden md:block"
          style={{
            top: '12%',
            left: '2%',
            width: '130px',
            zIndex: 2,
            opacity: revealed ? 0.85 : 0,
            transition: 'opacity 1000ms ease 900ms',
          }}
        >
          <img
            src="/images/produksi-gg-kerengge.jpg"
            alt="Produksi Gila-Gila Dengan Kerengge"
            className="w-full h-auto"
            style={{
              display: 'block',
              border: '3px solid var(--c-text)',
              boxShadow: '4px 4px 0px rgba(0,0,0,0.3)',
            }}
          />
        </div>
      </div>
    </section>
  );
}
