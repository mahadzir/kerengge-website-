import { useRef, useState, useEffect } from 'react';
import { Star } from 'lucide-react';

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

const timelineItems = [
  { year: '1980-an', title: 'Berkarya di Gila-Gila', description: 'Menyertai barisan kartunis Gila-Gila bersama legenda seperti Ujang, Rejabhad, Don, Tazidi, dan Jaafar Taib' },
  { year: '1983', title: 'Pereka Bambino', description: 'Menjadi pereka bentuk majalah Bambino sambil terus melukis untuk Gila-Gila' },
  { year: '2023', title: 'Anugerah Tokoh Kartunis', description: 'Menerima anugerah tertinggi industri kartun Malaysia — pengiktirafan legasi sepanjang hayat' },
  { year: 'Kini', title: 'Legasi di Langkawi', description: 'Menetap dan meneruskan karya di Langkawi, aktif dalam bidang pendidikan seni' },
];

export default function Awards() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const inView = useInView(sectionRef);

  return (
    <section
      id="anugerah"
      ref={sectionRef}
      style={{ paddingTop: 'var(--space-3xl)', paddingBottom: 'var(--space-3xl)', background: 'var(--c-bg-alt)' }}
    >
      <div className="section-container">
        <h2
          className="text-center mb-12 font-display"
          style={{ fontSize: 'clamp(2rem, 6vw, 3.5rem)', color: 'var(--c-text)', fontFamily: "'Bangers', Impact, sans-serif", letterSpacing: '0.02em', textTransform: 'uppercase' }}
        >
          ANUGERAH & PENGIKTIRAFAN
        </h2>

        {/* Featured Award */}
        <div
          className="panel-card"
          style={{ opacity: inView ? 1 : 0, transform: inView ? 'translateY(0)' : 'translateY(60px)', transition: 'all 700ms var(--ease-out-expo)' }}
        >
          <div className="grid grid-cols-1 lg:grid-cols-2" style={{ gap: 'var(--space-lg)' }}>
            <div className="relative">
              <div className="overflow-hidden" style={{ border: '3px solid var(--c-panel-border)', boxShadow: '4px 4px 0px var(--c-panel-border)' }}>
                <img
                  src="/images/tokoh-kartunis-2023.jpg"
                  alt="Anugerah Tokoh Kartunis 2023 — Kerengge"
                  className="w-full h-auto"
                  style={{ display: 'block' }}
                />
              </div>
              <div
                className="stamp-badge absolute"
                style={{
                  top: '-20px',
                  right: '-10px',
                  opacity: inView ? 1 : 0,
                  transform: inView ? 'rotate(-12deg) scale(1)' : 'rotate(-30deg) scale(0.5)',
                  transition: 'all 500ms var(--ease-out-back) 400ms',
                }}
              >
                <span className="relative z-10 text-sm">2023</span>
              </div>
            </div>

            <div className="flex flex-col justify-center" style={{ padding: 'var(--space-md)' }}>
              <h3 className="font-display mb-4" style={{ fontSize: 'clamp(1.5rem, 4vw, 2rem)', color: 'var(--c-text)', fontFamily: "'Bangers', Impact, sans-serif", textTransform: 'uppercase' }}>
                Anugerah Tokoh Kartunis 2023
              </h3>
              <p className="text-lg leading-relaxed" style={{ color: 'var(--c-text)', fontFamily: "'Fredoka', sans-serif", fontSize: '1.125rem', lineHeight: 1.6 }}>
                Pengiktirafan tertinggi yang diterima oleh Kerengge atas sumbangan dan jasa beliau
                dalam memajukan industri kartun Malaysia. Sebuah anugerah yang mengesahkan status
                beliau sebagai salah seorang legenda kartun tanah air. Antara karya yang dikenang:
                3 Segi 4 Segi, Diari Rang Bujang, Lembing Awang Pulang Ke Dayang, dan banyak lagi.
              </p>
              <p className="mt-4 text-base" style={{ color: 'var(--c-muted)', fontFamily: "'Fredoka', sans-serif" }}>
                Dikutip dari blog: "Garapan kartunnya yang tersendiri meletakkan beliau sebaris
                dengan generasi pertama kartunis Gila-Gila seperti Mishar, Jaafar Taib, Zainal Buang
                Hussein, Azman Yusof, Rejabhad, Don, Fatah dan ramai lagi."
              </p>
            </div>
          </div>
        </div>

        {/* Timeline */}
        <div className="relative mt-16" style={{ padding: '0 var(--space-md)' }}>
          <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 -translate-x-1/2" style={{ width: '3px', background: 'var(--c-panel-border)' }} />
          <div className="lg:hidden absolute left-4 top-0 bottom-0" style={{ width: '3px', background: 'var(--c-panel-border)' }} />

          <div className="flex flex-col" style={{ gap: 'var(--space-xl)' }}>
            {timelineItems.map((item, i) => (
              <div
                key={item.year}
                className={`relative flex items-start ${i % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'}`}
                style={{ opacity: inView ? 1 : 0, transform: inView ? 'translateY(0)' : 'translateY(30px)', transition: `all 600ms var(--ease-out-expo) ${500 + i * 150}ms` }}
              >
                <div className="absolute z-10 hidden lg:flex items-center justify-center" style={{ left: '50%', top: '20px', transform: 'translateX(-50%)', width: '48px', height: '48px', borderRadius: '50%', background: 'var(--c-text)', color: 'var(--c-bg)' }}>
                  <Star size={20} />
                </div>
                <div className="absolute z-10 lg:hidden flex items-center justify-center" style={{ left: '4px', top: '20px', transform: 'translateX(-50%)', width: '40px', height: '40px', borderRadius: '50%', background: 'var(--c-text)', color: 'var(--c-bg)' }}>
                  <Star size={16} />
                </div>

                <div className={`ml-12 lg:ml-0 lg:w-[45%] ${i % 2 === 0 ? 'lg:mr-auto lg:pr-8' : 'lg:ml-auto lg:pl-8'}`}>
                  <div className="panel-card" style={{ padding: 'var(--space-md)' }}>
                    <div className="font-bold mb-1" style={{ fontFamily: "'Fredoka', sans-serif", fontWeight: 700, fontSize: '1rem', color: 'var(--c-accent)' }}>
                      {item.year}
                    </div>
                    <h4 className="font-display mb-2" style={{ fontFamily: "'Bangers', Impact, sans-serif", fontSize: '1.25rem', color: 'var(--c-text)', textTransform: 'uppercase' }}>
                      {item.title}
                    </h4>
                    <p style={{ fontFamily: "'Fredoka', sans-serif", fontSize: '0.875rem', color: 'var(--c-muted)', lineHeight: 1.5 }}>
                      {item.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
