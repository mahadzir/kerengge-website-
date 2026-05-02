import { useRef, useState, useEffect } from 'react';

function useInView(ref: React.RefObject<HTMLElement | null>) {
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { setInView(true); observer.disconnect(); }
    }, { threshold: 0.1 });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);
  return inView;
}

export default function Video() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const inView = useInView(sectionRef);

  return (
    <section
      ref={sectionRef}
      style={{ paddingTop: 'var(--space-3xl)', paddingBottom: 'var(--space-3xl)' }}
    >
      <div className="section-container">
        <h2
          className="text-center mb-12 font-display"
          style={{ fontSize: 'clamp(2rem, 6vw, 3.5rem)', color: 'var(--c-text)', fontFamily: "'Bangers', Impact, sans-serif", letterSpacing: '0.02em', textTransform: 'uppercase' }}
        >
          VIDEO TUTORIAL
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 items-center" style={{ gap: 'var(--space-xl)' }}>
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
              <div style={{ position: 'relative', paddingBottom: '56.25%', height: 0 }}>
                <iframe
                  src="https://www.youtube.com/embed/C6KuKkFPKag"
                  title="TEKNIK melukis KARIKATUR | Kartunis Kerengge"
                  style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', border: 0 }}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  loading="lazy"
                />
              </div>
            </div>
          </div>

          <div
            style={{
              opacity: inView ? 1 : 0,
              transform: inView ? 'translateX(0)' : 'translateX(60px)',
              transition: 'all 600ms var(--ease-out-expo) 200ms',
            }}
          >
            <h3 className="font-display mb-4" style={{ fontSize: 'clamp(1.25rem, 3vw, 1.5rem)', color: 'var(--c-text)', fontFamily: "'Bangers', Impact, sans-serif", textTransform: 'uppercase' }}>
              Teknik Melukis Karikatur
            </h3>
            <p className="text-lg leading-relaxed" style={{ color: 'var(--c-text)', fontFamily: "'Fredoka', sans-serif", fontSize: '1.125rem', lineHeight: 1.6 }}>
              Saksikan sendiri teknik karikatur Kartunis Kerengge dalam aksi. Dalam video ini,
              Kerengge menunjukkan proses melukis karikatur daripada mula hingga akhir —
              daripada garisan asas hingga penambahan detail yang memberi jiwa kepada setiap
              watak. Sebuah tutorial berharga untuk semua peminat seni kartun.
            </p>
            <p className="mt-4" style={{ color: 'var(--c-muted)', fontFamily: "'Fredoka', sans-serif" }}>
              Video ini menunjukkan gaya stroke berus yang khas dan proses kreatif di sebalik
              setiap kartun yang dihasilkan.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
