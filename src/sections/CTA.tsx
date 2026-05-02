import { useRef, useState, useEffect } from 'react';
import { Instagram, Facebook, Youtube } from 'lucide-react';

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

export default function CTA() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const inView = useInView(sectionRef);
  const [submitted, setSubmitted] = useState(false);
  const [email, setEmail] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) { setSubmitted(true); }
  };

  return (
    <section
      id="hubungi"
      ref={sectionRef}
      style={{ paddingTop: 'var(--space-3xl)', paddingBottom: 'var(--space-3xl)' }}
    >
      <div className="section-container text-center relative" style={{ maxWidth: '800px' }}>
        <h2
          className="font-display"
          style={{
            fontSize: 'clamp(2.5rem, 8vw, 5rem)',
            color: 'var(--c-text)',
            textShadow: '3px 3px 0px var(--c-panel-border)',
            opacity: inView ? 1 : 0,
            transform: inView ? 'translateY(0)' : 'translateY(40px)',
            transition: 'all 600ms var(--ease-out-expo)',
            fontFamily: "'Bangers', Impact, sans-serif",
            letterSpacing: '0.02em',
            textTransform: 'uppercase',
          }}
        >
          SOKONG SENI KARTUN LOKAL
        </h2>

        <p className="mx-auto mt-6" style={{ fontSize: '1.125rem', fontFamily: "'Fredoka', sans-serif", color: 'var(--c-muted)', maxWidth: '600px', opacity: inView ? 1 : 0, transition: 'opacity 500ms ease 200ms' }}>
          Ikuti perjalanan Kerengge dan sertai komuniti peminat kartun Malaysia.
          Setiap sokongan anda memastikan warisan ini kekal hidup.
        </p>

        <div className="flex items-center justify-center mt-8" style={{ gap: 'var(--space-md)', opacity: inView ? 1 : 0, transition: 'opacity 500ms ease 300ms' }}>
          {[
            { icon: Instagram, label: 'Instagram', href: 'https://instagram.com' },
            { icon: Facebook, label: 'Facebook', href: 'https://facebook.com' },
            { icon: Youtube, label: 'YouTube', href: 'https://youtube.com' },
          ].map((social, i) => (
            <a
              key={social.label}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center panel-card transition-all duration-300"
              style={{
                width: '64px', height: '64px', padding: 0,
                opacity: inView ? 1 : 0,
                transform: inView ? 'scale(1)' : 'scale(0.8)',
                transition: `all 400ms var(--ease-out-back) ${300 + i * 100}ms`,
              }}
              aria-label={social.label}
            >
              <social.icon size={28} style={{ color: 'var(--c-text)' }} />
            </a>
          ))}
        </div>

        <div className="mt-12" style={{ opacity: inView ? 1 : 0, transform: inView ? 'translateY(0)' : 'translateY(30px)', transition: 'all 600ms var(--ease-out-expo) 400ms' }}>
          <p className="uppercase tracking-wider mb-4" style={{ fontFamily: "'Fredoka', sans-serif", fontWeight: 500, fontSize: '0.875rem', color: 'var(--c-text)' }}>
            Daftar untuk kemas kini
          </p>

          {submitted ? (
            <p className="font-bold text-lg" style={{ color: 'var(--c-accent)', fontFamily: "'Fredoka', sans-serif" }}>
              Terima kasih! Anda telah didaftarkan.
            </p>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row items-center justify-center mx-auto" style={{ gap: 'var(--space-xs)', maxWidth: '500px' }}>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="alamat emel anda"
                required
                className="flex-1 w-full"
                style={{
                  border: '3px solid var(--c-panel-border)',
                  padding: '12px 16px',
                  fontFamily: "'Fredoka', sans-serif",
                  fontSize: '1rem',
                  background: 'var(--c-panel-bg)',
                  color: 'var(--c-text)',
                  borderRadius: '0px',
                }}
              />
              <button type="submit" className="btn-primary w-full sm:w-auto">Daftar</button>
            </form>
          )}
        </div>

        {/* Floating element */}
        <div
          className="absolute hidden lg:block"
          style={{
            bottom: '-30px',
            left: '-100px',
            width: '120px',
            opacity: inView ? 0.8 : 0,
            transition: 'opacity 1000ms ease 600ms',
          }}
        >
          <img
            src="/images/produksi-gg-kerengge.jpg"
            alt="Produksi Gila-Gila Dengan Kerengge"
            className="w-full h-auto"
            style={{ display: 'block', filter: 'drop-shadow(3px 3px 0px rgba(0,0,0,0.2))' }}
          />
        </div>
      </div>
    </section>
  );
}
