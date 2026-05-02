import { useEffect, useRef, useState } from 'react';

function useInView(ref: React.RefObject<HTMLElement | null>, options?: IntersectionObserverInit) {
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { setInView(true); observer.disconnect(); }
    }, { threshold: 0.15, ...options });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);
  return inView;
}

export default function About() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const inView = useInView(sectionRef);

  const stats = [
    { number: '40+', label: 'Tahun Berkarya' },
    { number: 'Gila-Gila', label: 'Majalah Ikonik' },
    { number: '2023', label: 'Anugerah Tokoh Kartunis' },
  ];

  return (
    <section
      id="kisah"
      ref={sectionRef}
      style={{ paddingTop: 'var(--space-3xl)', paddingBottom: 'var(--space-3xl)' }}
    >
      <div className="section-container">
        {/* Section Heading */}
        <h2
          className="text-center mb-12 font-display"
          style={{
            fontSize: 'clamp(2rem, 6vw, 3.5rem)',
            color: 'var(--c-text)',
            fontFamily: "'Bangers', Impact, sans-serif",
            letterSpacing: '0.02em',
            textTransform: 'uppercase',
          }}
        >
          KISAH KERENGGE
        </h2>

        {/* Two-column layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 items-center" style={{ gap: 'var(--space-xl)' }}>
          {/* Left: Portrait — Foto Kerengge dengan Gelibat */}
          <div
            style={{
              opacity: inView ? 1 : 0,
              transform: inView ? 'translateX(0)' : 'translateX(-60px)',
              transition: 'all 600ms var(--ease-out-expo)',
            }}
          >
            <div
              className="overflow-hidden"
              style={{
                border: '3px solid var(--c-panel-border)',
                boxShadow: '8px 8px 0px var(--c-panel-border)',
              }}
            >
              <img
                src="/images/kerengge-foto-gelibat.jpg"
                alt="Mohamad Hanafiah Ibrahim (Kerengge) memegang majalah Gelibat"
                className="w-full h-auto"
                style={{ display: 'block', maxHeight: '500px', objectFit: 'cover', objectPosition: 'top' }}
              />
            </div>
            {/* Second photo — Talk */}
            <div
              className="mt-4 overflow-hidden"
              style={{
                border: '3px solid var(--c-panel-border)',
                boxShadow: '8px 8px 0px var(--c-panel-border)',
                opacity: inView ? 1 : 0,
                transform: inView ? 'translateY(0)' : 'translateY(30px)',
                transition: 'all 600ms var(--ease-out-expo) 300ms',
              }}
            >
              <img
                src="/images/kerengge-talk-01.jpg"
                alt="Kerengge sedang beri ceramah/talk"
                className="w-full h-auto"
                style={{ display: 'block', maxHeight: '280px', objectFit: 'cover' }}
              />
            </div>
          </div>

          {/* Right: Bio content */}
          <div
            style={{
              opacity: inView ? 1 : 0,
              transform: inView ? 'translateX(0)' : 'translateX(60px)',
              transition: 'all 600ms var(--ease-out-expo) 200ms',
            }}
          >
            <p
              className="font-bold text-xl mb-2"
              style={{ color: 'var(--c-accent)', fontFamily: "'Fredoka', sans-serif", fontWeight: 700 }}
            >
              Mohamad Hanafiah Ibrahim
            </p>
            <h3
              className="font-display mb-6"
              style={{
                fontSize: 'clamp(1.5rem, 4vw, 2rem)',
                color: 'var(--c-text)',
                fontFamily: "'Bangers', Impact, sans-serif",
                textTransform: 'uppercase',
              }}
            >
              Kartunis Legenda Gila-Gila
            </h3>
            <p
              className="text-lg leading-relaxed"
              style={{
                color: 'var(--c-text)',
                fontFamily: "'Fredoka', sans-serif",
                fontSize: '1.125rem',
                lineHeight: 1.6,
              }}
            >
              Kerengge, nama yang sinonim dengan majalah Gila-Gila dan era keemasan kartun Malaysia.
              Bermula sebagai seorang pemuda yang menyambung leher dengan melukis kartun di Kuantan,
              beliau membuktikan bahawa seni kartun bukan sekadar hiburan — ia adalah medium
              untuk menyampaikan budaya, warisan, dan kebijaksanaan rakyat Malaysia. Dengan gaya
              stroke berus yang unik dan humor berunsur sinis, Kerengge telah mengukir nama sebagai
              salah seorang kartunis paling berpengaruh dalam sejarah komik tanah air.
            </p>

            {/* Quote bubble */}
            <div
              className="mt-8 relative"
              style={{
                background: 'var(--c-panel-bg)',
                border: '3px solid var(--c-panel-border)',
                borderRadius: '20px',
                padding: 'var(--space-md) var(--space-lg)',
                opacity: inView ? 1 : 0,
                transform: inView ? 'scale(1)' : 'scale(0.9)',
                transition: 'all 500ms var(--ease-out-back) 400ms',
              }}
            >
              <p
                className="italic text-lg"
                style={{
                  fontFamily: "'Fredoka', sans-serif",
                  fontWeight: 500,
                  fontStyle: 'italic',
                  color: 'var(--c-text)',
                }}
              >
                "Dalam kartun, kita boleh ketawa sambil belajar. Itu yang buat seni ini istimewa."
              </p>
              <div
                style={{
                  position: 'absolute',
                  bottom: '-20px',
                  left: '30px',
                  width: 0,
                  height: 0,
                  borderLeft: '20px solid transparent',
                  borderRight: '20px solid transparent',
                  borderTop: '20px solid var(--c-panel-border)',
                }}
              />
            </div>
          </div>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 mt-12" style={{ gap: 'var(--space-md)' }}>
          {stats.map((stat, i) => (
            <div
              key={stat.label}
              className="panel-card text-center"
              style={{
                padding: 'var(--space-md)',
                opacity: inView ? 1 : 0,
                transform: inView ? 'translateY(0)' : 'translateY(40px)',
                transition: `all 600ms var(--ease-out-expo) ${600 + i * 100}ms`,
              }}
            >
              <div
                className="font-display"
                style={{
                  fontSize: 'clamp(2rem, 5vw, 3rem)',
                  color: 'var(--c-accent)',
                  fontFamily: "'Bangers', Impact, sans-serif",
                }}
              >
                {stat.number}
              </div>
              <div
                className="uppercase tracking-wider mt-1"
                style={{
                  fontSize: '0.875rem',
                  color: 'var(--c-muted)',
                  fontFamily: "'Fredoka', sans-serif",
                  fontWeight: 500,
                }}
              >
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
