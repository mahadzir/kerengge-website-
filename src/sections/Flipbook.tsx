import { useRef, useState, useEffect } from 'react';

function useInView(ref: React.RefObject<HTMLElement | null>) {
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { setInView(true); observer.disconnect(); }
    }, { threshold: 0.15 });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);
  return inView;
}

const cards = [
  { title: '3 SEGI 4 SEGI', description: 'Watak ikonik hasil tangan Kerengge — bentuk kepala unik yang mencuri hati ribuan pembaca Gila-Gila', image: '/images/produksi-gg-kerengge.jpg' },
  { title: 'TOKOH KARTUNIS 2023', description: 'Anugerah tertinggi industri kartun Malaysia — pengiktirafan legasi sepanjang hayat', image: '/images/tokoh-kartunis-2023.jpg' },
  { title: 'KERENGGE AT WORK', description: 'Foto sebenar Kerengge sedang melukis dan menandatangani karya di booth', image: '/images/kerengge-booth-drawing.jpg' },
  { title: 'AUTA LEMAN', description: 'Siri kartun berwarna — Kartunis: Kerengge. Bergaya sendiri!', image: '/images/auta-leman.jpg' },
  { title: 'JIMAT AIR', description: 'Siri kartun 2006 — Kartun untuk kompeni air dengan humor tersendiri', image: '/images/jimat-air-01.jpg' },
  { title: 'GILA-GILA ERA KEEMASAN', description: 'Itu Ini Begitu Begini — Gila Gila 117, 15 Julai 1983. Karya klasik Kerengge', image: '/images/kerengge-gilagila-117.jpg' },
];

export default function Flipbook() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const inView = useInView(sectionRef);
  const trackRef = useRef<HTMLDivElement>(null);
  const [scrollHintVisible, setScrollHintVisible] = useState(true);
  const isDragging = useRef(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);

  const handleMouseDown = (e: React.MouseEvent) => {
    isDragging.current = true;
    startX.current = e.pageX - (trackRef.current?.offsetLeft || 0);
    scrollLeft.current = trackRef.current?.scrollLeft || 0;
    if (trackRef.current) trackRef.current.style.cursor = 'grabbing';
  };
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging.current || !trackRef.current) return;
    e.preventDefault();
    const x = e.pageX - (trackRef.current.offsetLeft || 0);
    const walk = (x - startX.current) * 1.5;
    trackRef.current.scrollLeft = scrollLeft.current - walk;
    if (scrollHintVisible) setScrollHintVisible(false);
  };
  const handleMouseUp = () => { isDragging.current = false; if (trackRef.current) trackRef.current.style.cursor = 'grab'; };
  const handleScroll = () => { if (scrollHintVisible) setScrollHintVisible(false); };

  return (
    <section
      id="flipbook"
      ref={sectionRef}
      style={{ paddingTop: 'var(--space-3xl)', paddingBottom: 'var(--space-3xl)', background: 'var(--c-bg-alt)', overflow: 'hidden' }}
    >
      <div className="section-container">
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
          ARKIB KERENGGE
        </h2>
      </div>

      <div
        ref={trackRef}
        className="flex overflow-x-auto select-none"
        style={{ gap: 'var(--space-lg)', paddingLeft: 'var(--space-xl)', paddingRight: 'var(--space-xl)', cursor: 'grab', scrollbarWidth: 'none' }}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onScroll={handleScroll}
      >
        {cards.map((card, i) => (
          <div
            key={card.title}
            className="flex-shrink-0 relative overflow-hidden"
            style={{
              width: '300px',
              height: '420px',
              border: '3px solid var(--c-panel-border)',
              boxShadow: '8px 8px 0px var(--c-panel-border)',
              transform: 'perspective(1000px) rotateY(-15deg)',
              transformOrigin: 'left center',
              transition: 'transform 300ms ease, box-shadow 300ms ease',
              opacity: inView ? 1 : 0,
              animation: inView ? `scaleIn 400ms var(--ease-out-back) ${i * 80}ms forwards` : 'none',
            }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.transform = 'perspective(1000px) rotateY(-5deg)'; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.transform = 'perspective(1000px) rotateY(-15deg)'; }}
          >
            <div className="absolute inset-0" style={{ backgroundImage: `url(${card.image})`, backgroundSize: 'cover', backgroundPosition: 'center' }} />
            <div
              className="absolute bottom-0 left-0 right-0 flex flex-col justify-end"
              style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.9) 0%, transparent 100%)', padding: 'var(--space-md)' }}
            >
              <h3 className="text-white font-bold text-base uppercase tracking-wider" style={{ fontFamily: "'Fredoka', sans-serif", fontWeight: 700 }}>
                {card.title}
              </h3>
              <p className="text-white text-sm mt-1" style={{ opacity: 0.8, fontFamily: "'Fredoka', sans-serif" }}>
                {card.description}
              </p>
            </div>
          </div>
        ))}
      </div>

      <p className="text-center mt-6" style={{ fontFamily: "'Fredoka', sans-serif", fontWeight: 500, fontSize: '0.875rem', color: 'var(--c-muted)', opacity: scrollHintVisible ? 1 : 0, transition: 'opacity 500ms' }}>
        Seret atau scroll horizontal
      </p>
    </section>
  );
}
