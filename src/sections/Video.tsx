import { useRef, useState, useEffect } from 'react';
import { Instagram, ExternalLink } from 'lucide-react';

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

const instagramPosts = [
  '/images/kerengge-booth-drawing.jpg',
  '/images/kerengge-mari-berkenalan.jpg',
  '/images/tokoh-kartunis-2023.jpg',
  '/images/poster-sehari-bersama-2016.jpg',
  '/images/kerengge-dbp-2019.jpg',
  '/images/auta-leman.jpg',
  '/images/komik-berwarna-01.jpg',
  '/images/komik-berwarna-02.jpg',
  '/images/macam-macam-suratkhabar.jpg',
];

export default function InstagramSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const inView = useInView(sectionRef);

  return (
    <section
      id="instagram"
      ref={sectionRef}
      style={{ paddingTop: 'var(--space-3xl)', paddingBottom: 'var(--space-3xl)', background: 'var(--c-bg-alt)' }}
    >
      <div className="section-container">
        {/* Instagram Header */}
        <div className="text-center mb-12">
          <div
            className="inline-flex items-center justify-center mb-4"
            style={{
              width: '72px',
              height: '72px',
              borderRadius: '50%',
              background: 'linear-gradient(45deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%)',
              opacity: inView ? 1 : 0,
              transform: inView ? 'scale(1)' : 'scale(0.8)',
              transition: 'all 500ms var(--ease-out-back)',
            }}
          >
            <Instagram size={36} color="white" />
          </div>
          <h2
            className="font-display"
            style={{
              fontSize: 'clamp(2rem, 6vw, 3.5rem)',
              color: 'var(--c-text)',
              textShadow: '3px 3px 0px var(--c-accent)',
              fontFamily: "'Bangers', Impact, sans-serif",
              letterSpacing: '0.02em',
              textTransform: 'uppercase',
              opacity: inView ? 1 : 0,
              transform: inView ? 'translateY(0)' : 'translateY(30px)',
              transition: 'all 600ms var(--ease-out-expo) 100ms',
            }}
          >
            IKUTI KERENGGE
          </h2>
          <p
            className="mt-3"
            style={{
              fontSize: '1.125rem',
              fontFamily: "'Fredoka', sans-serif",
              color: 'var(--c-muted)',
              opacity: inView ? 1 : 0,
              transition: 'opacity 500ms ease 200ms',
            }}
          >
            @encik.kerengge — Aktiviti dan karya terkini di Instagram
          </p>
        </div>

        {/* Instagram Grid Preview */}
        <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5" style={{ gap: 'var(--space-sm)' }}>
          {instagramPosts.map((img, i) => (
            <a
              key={i}
              href="https://www.instagram.com/encik.kerengge"
              target="_blank"
              rel="noopener noreferrer"
              className="overflow-hidden relative group"
              style={{
                border: '3px solid var(--c-panel-border)',
                opacity: inView ? 1 : 0,
                transform: inView ? 'scale(1)' : 'scale(0.9)',
                transition: `all 400ms var(--ease-out-expo) ${i * 80}ms`,
              }}
            >
              <img
                src={img}
                alt={`Kerengge Instagram post ${i + 1}`}
                className="w-full h-auto transition-transform duration-300 group-hover:scale-110"
                style={{ aspectRatio: '1/1', objectFit: 'cover', display: 'block' }}
                loading="lazy"
              />
              <div
                className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{ background: 'rgba(220, 39, 67, 0.7)' }}
              >
                <Instagram size={28} color="white" />
              </div>
            </a>
          ))}
        </div>

        {/* Follow Button */}
        <div
          className="text-center mt-10"
          style={{
            opacity: inView ? 1 : 0,
            transform: inView ? 'translateY(0)' : 'translateY(20px)',
            transition: 'all 600ms var(--ease-out-expo) 500ms',
          }}
        >
          <a
            href="https://www.instagram.com/encik.kerengge?igsh=MWVmZDgycTloMHBycw=="
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary inline-flex items-center"
            style={{
              background: 'linear-gradient(45deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%)',
              borderColor: 'transparent',
              gap: '0.5rem',
            }}
          >
            <Instagram size={20} />
            Follow @encik.kerengge
            <ExternalLink size={16} />
          </a>
        </div>
      </div>
    </section>
  );
}
