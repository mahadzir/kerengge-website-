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

const workCards = [
  {
    image: '/images/komik-gilagila-halaman-penuh-01.jpg',
    title: 'Majalah Gila-Gila',
    description: 'Berkarya di majalah humor ikonik Malaysia sejak era 1980-an bersama legenda seperti Ujang, Rejabhad, Don, Tazidi, dan Jaafar Taib.',
    tags: ['Kartun', 'Humor'],
  },
  {
    image: '/images/komik-berwarna-01.jpg',
    title: 'Komik Bebas',
    description: "Menerbitkan karya kartun bebas termasuk '3 Segi 4 Segi' dan 'Diari Rang Bujang' yang menjadi pilihan pembaca Gila-Gila.",
    tags: ['Komik', 'Bebas'],
  },
  {
    image: '/images/kerengge-talk-02.jpg',
    title: 'Pendidikan & Tugasan',
    description: 'Kini aktif dalam bidang pendidikan seni, berkongsi ilmu dengan generasi muda kartunis Malaysia.',
    tags: ['Pendidikan', 'Mentor'],
  },
];

export default function Works() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const inView = useInView(sectionRef);

  return (
    <section
      id="karya"
      ref={sectionRef}
      style={{ paddingTop: 'var(--space-3xl)', paddingBottom: 'var(--space-3xl)' }}
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
          KARYA-KARYA UTAMA
        </h2>

        {/* Character Spotlight */}
        <div
          className="panel-card"
          style={{
            padding: 'var(--space-lg)',
            opacity: inView ? 1 : 0,
            transform: inView ? 'translateY(0)' : 'translateY(60px)',
            transition: 'all 700ms var(--ease-out-expo)',
          }}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 items-center" style={{ gap: 'var(--space-lg)' }}>
            <div className="flex justify-center">
              <img
                src="/images/produksi-gg-kerengge.jpg"
                alt="Produksi Gila-Gila Dengan Kerengge — 3 Segi 4 Segi"
                className="w-full max-w-[300px] h-auto"
                style={{
                  display: 'block',
                  animation: 'bob 4s ease-in-out infinite alternate',
                  filter: 'drop-shadow(4px 4px 0px rgba(0,0,0,0.2))',
                }}
              />
            </div>
            <div>
              <h3
                className="font-display mb-4"
                style={{ fontSize: '1.75rem', color: 'var(--c-accent)', fontFamily: "'Bangers', Impact, sans-serif", textTransform: 'uppercase' }}
              >
                Tiga Segi Empat Segi
              </h3>
              <p
                className="text-lg leading-relaxed"
                style={{ color: 'var(--c-text)', fontFamily: "'Fredoka', sans-serif", fontSize: '1.125rem', lineHeight: 1.6 }}
              >
                Watak paling popular hasil tangan Kerengge. Dengan bentuk kepala yang unik —
                tiga segi dan empat segi — watak ini telah mencuri hati ribuan pembaca Gila-Gila.
                Melalui watak ini, Kerengge menyampaikan cerita rakyat Malaysia dengan humor
                sinis yang menusuk jiwa.
              </p>
            </div>
          </div>

          <div
            className="relative mt-8 hidden md:block"
            style={{
              background: 'var(--c-panel-bg)',
              border: '3px solid var(--c-panel-border)',
              borderRadius: '20px',
              padding: 'var(--space-sm) var(--space-md)',
              maxWidth: '350px',
              marginLeft: 'auto',
            }}
          >
            <p className="italic text-sm" style={{ fontFamily: "'Fredoka', sans-serif", fontWeight: 500, fontStyle: 'italic', color: 'var(--c-text)' }}>
              Tahukah anda? Kerengge pernah melukis logo Wings untuk album Hukum Karma!
            </p>
            <div style={{ position: 'absolute', top: '-20px', left: '30px', width: 0, height: 0, borderLeft: '15px solid transparent', borderRight: '15px solid transparent', borderBottom: '20px solid var(--c-panel-border)' }} />
          </div>
        </div>

        {/* Works Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mt-16" style={{ gap: 'var(--space-md)' }}>
          {workCards.map((card, i) => (
            <div
              key={card.title}
              className="panel-card overflow-hidden"
              style={{
                opacity: inView ? 1 : 0,
                transform: inView ? 'translateY(0)' : 'translateY(40px)',
                transition: `all 600ms var(--ease-out-expo) ${300 + i * 100}ms`,
              }}
            >
              <div className="overflow-hidden" style={{ borderBottom: '3px solid var(--c-panel-border)' }}>
                <img
                  src={card.image}
                  alt={card.title}
                  className="w-full h-auto transition-transform duration-400 hover:scale-105"
                  style={{ aspectRatio: '4/3', objectFit: 'cover', display: 'block' }}
                  loading="lazy"
                />
              </div>
              <div style={{ padding: 'var(--space-md)' }}>
                <h4 className="font-display mb-2" style={{ fontSize: '1.25rem', color: 'var(--c-text)', fontFamily: "'Bangers', Impact, sans-serif", textTransform: 'uppercase' }}>
                  {card.title}
                </h4>
                <p className="mb-4" style={{ color: 'var(--c-text)', fontFamily: "'Fredoka', sans-serif", fontSize: '1rem', lineHeight: 1.5 }}>
                  {card.description}
                </p>
                <div className="flex flex-wrap" style={{ gap: '0.5rem' }}>
                  {card.tags.map((tag) => (
                    <span key={tag} className="inline-block uppercase tracking-wider" style={{ background: 'var(--c-text)', color: 'var(--c-bg)', padding: '4px 12px', fontFamily: "'Fredoka', sans-serif", fontWeight: 500, fontSize: '0.75rem', letterSpacing: '0.1em' }}>
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Quote */}
        <div
          className="relative mx-auto mt-16"
          style={{
            maxWidth: '700px',
            background: 'var(--c-panel-bg)',
            border: '3px solid var(--c-panel-border)',
            borderRadius: '20px',
            padding: 'var(--space-lg)',
            opacity: inView ? 1 : 0,
            transform: inView ? 'scale(1)' : 'scale(0.9)',
            transition: 'all 500ms var(--ease-out-back) 600ms',
          }}
        >
          <p className="text-center italic" style={{ fontFamily: "'Fredoka', sans-serif", fontWeight: 500, fontStyle: 'italic', fontSize: 'clamp(1.25rem, 3vw, 1.75rem)', color: 'var(--c-text)', lineHeight: 1.4 }}>
            "Saya percaya setiap stroke berus ada jiwanya sendiri. Kartun bukan sekadar lukisan — ia adalah suara rakyat."
          </p>
          <div style={{ position: 'absolute', bottom: '-20px', left: '50%', transform: 'translateX(-50%)', width: 0, height: 0, borderLeft: '20px solid transparent', borderRight: '20px solid transparent', borderTop: '20px solid var(--c-panel-border)' }} />
        </div>
      </div>
    </section>
  );
}
