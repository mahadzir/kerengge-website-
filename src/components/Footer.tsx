import { Instagram, Facebook, Youtube } from 'lucide-react';

export default function Footer() {
  const scrollToSection = (href: string) => {
    if (href === '#top') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    const el = document.querySelector(href);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const navLinks = [
    { label: 'Kisah', href: '#kisah' },
    { label: 'Karya', href: '#karya' },
    { label: 'Galeri', href: '#galeri' },
    { label: 'Hubungi', href: '#hubungi' },
  ];

  return (
    <footer
      style={{
        background: 'var(--c-text)',
        color: 'var(--c-bg)',
        paddingTop: 'var(--space-2xl)',
        paddingBottom: 'var(--space-lg)',
      }}
    >
      <div className="section-container">
        <div className="grid grid-cols-1 md:grid-cols-3" style={{ gap: 'var(--space-xl)' }}>
          {/* Left: Logo + tagline + social */}
          <div>
            <h3
              className="text-2xl"
              style={{
                fontFamily: "'Bangers', Impact, sans-serif",
                letterSpacing: '0.02em',
                textTransform: 'uppercase',
              }}
            >
              KERENGGE
            </h3>
            <p
              className="mt-2 text-base"
              style={{ color: 'var(--c-bg)', opacity: 0.8 }}
            >
              Mengukir Senyum, Mewarisi Budaya
            </p>
            <div className="flex items-center mt-4" style={{ gap: 'var(--space-sm)' }}>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center rounded transition-all duration-200 hover:scale-110"
                style={{
                  width: '48px',
                  height: '48px',
                  color: 'var(--c-bg)',
                  border: '2px solid var(--c-bg)',
                }}
                aria-label="Instagram"
              >
                <Instagram size={22} />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center rounded transition-all duration-200 hover:scale-110"
                style={{
                  width: '48px',
                  height: '48px',
                  color: 'var(--c-bg)',
                  border: '2px solid var(--c-bg)',
                }}
                aria-label="Facebook"
              >
                <Facebook size={22} />
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center rounded transition-all duration-200 hover:scale-110"
                style={{
                  width: '48px',
                  height: '48px',
                  color: 'var(--c-bg)',
                  border: '2px solid var(--c-bg)',
                }}
                aria-label="YouTube"
              >
                <Youtube size={22} />
              </a>
            </div>
          </div>

          {/* Center: Nav links */}
          <div>
            <h4
              className="text-base font-bold uppercase tracking-widest mb-4"
              style={{
                fontFamily: "'Fredoka', sans-serif",
                letterSpacing: '0.05em',
                color: 'var(--c-bg)',
              }}
            >
              Navigasi
            </h4>
            <ul className="flex flex-col" style={{ gap: 'var(--space-sm)' }}>
              {navLinks.map((link) => (
                <li key={link.href}>
                  <button
                    onClick={() => scrollToSection(link.href)}
                    className="text-base transition-colors duration-200 hover:opacity-70"
                    style={{
                      color: 'var(--c-bg)',
                      fontFamily: "'Fredoka', sans-serif",
                      background: 'none',
                      border: 'none',
                      cursor: 'pointer',
                      padding: 0,
                    }}
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Right: Newsletter CTA */}
          <div>
            <h4
              className="text-base font-bold uppercase tracking-widest mb-4"
              style={{
                fontFamily: "'Fredoka', sans-serif",
                letterSpacing: '0.05em',
                color: 'var(--c-bg)',
              }}
            >
              Langgani Kemas Kini
            </h4>
            <p className="text-sm mb-4" style={{ color: 'var(--c-bg)', opacity: 0.7 }}>
              Dapatkan perkembangan terkini tentang karya dan acara Kerengge.
            </p>
            <div className="flex flex-col sm:flex-row" style={{ gap: 'var(--space-xs)' }}>
              <input
                type="email"
                placeholder="alamat emel anda"
                className="flex-1"
                style={{
                  border: '2px solid var(--c-bg)',
                  background: 'transparent',
                  color: 'var(--c-bg)',
                  padding: '10px 16px',
                  fontFamily: "'Fredoka', sans-serif",
                  fontSize: '0.875rem',
                  borderRadius: '0px',
                }}
              />
              <button
                className="font-bold text-sm uppercase tracking-wider transition-all duration-200 hover:opacity-80"
                style={{
                  background: 'var(--c-bg)',
                  color: 'var(--c-text)',
                  padding: '10px 20px',
                  fontFamily: "'Fredoka', sans-serif",
                  borderRadius: '0px',
                  border: 'none',
                  cursor: 'pointer',
                }}
              >
                Daftar
              </button>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          className="mt-8 pt-4 text-center text-sm"
          style={{
            borderTop: '1px solid rgba(242, 201, 76, 0.2)',
            color: 'var(--c-bg)',
            opacity: 0.6,
            fontFamily: "'Fredoka', sans-serif",
            fontWeight: 500,
            fontSize: '0.875rem',
          }}
        >
          &copy; 2025 Kartunis Kerengge. Dibuat dengan kasih sayang.
        </div>
      </div>
    </footer>
  );
}
