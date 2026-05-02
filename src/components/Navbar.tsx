import { useState, useEffect } from 'react';
import { Menu, X, Sun, Moon } from 'lucide-react';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const html = document.documentElement;
    if (isDark) {
      html.setAttribute('data-theme', 'dark');
    } else {
      html.setAttribute('data-theme', 'light');
    }
  }, [isDark]);

  const toggleTheme = () => setIsDark(!isDark);

  const navLinks = [
    { label: 'Kisah', href: '#kisah' },
    { label: 'Karya', href: '#karya' },
    { label: 'Galeri', href: '#galeri' },
    { label: 'Hubungi', href: '#hubungi' },
  ];

  const scrollToSection = (href: string) => {
    setMobileOpen(false);
    if (href === '#top') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    const el = document.querySelector(href);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <nav
        className="fixed top-0 left-0 right-0 z-[100] transition-all duration-300"
        style={{
          background: scrolled ? 'var(--c-bg)' : 'transparent',
          borderBottom: scrolled ? '3px solid var(--c-panel-border)' : '3px solid transparent',
          backdropFilter: scrolled ? 'blur(8px)' : 'none',
        }}
      >
        <div className="section-container flex items-center justify-between" style={{ height: '64px' }}>
          {/* Logo */}
          <button
            onClick={() => scrollToSection('#top')}
            className="font-display text-2xl tracking-wider transition-transform duration-200 hover:scale-105"
            style={{ color: 'var(--c-text)', fontFamily: "'Bangers', Impact, sans-serif" }}
          >
            <span className="inline-flex items-center gap-2">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" style={{ color: 'var(--c-text)' }}>
                <path d="M12 2C8 6 4 8 4 12c0 3 2 5 4 6.5V22l4-2 4 2v-3.5c2-1.5 4-3.5 4-6.5 0-4-4-6-8-10z" />
              </svg>
              KERENGGE
            </span>
          </button>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center" style={{ gap: 'var(--space-lg)' }}>
            {navLinks.map((link) => (
              <button
                key={link.href}
                onClick={() => scrollToSection(link.href)}
                className="relative font-bold text-sm uppercase tracking-widest transition-colors duration-200 hover:text-[var(--c-accent)]"
                style={{
                  color: 'var(--c-text)',
                  fontFamily: "'Fredoka', sans-serif",
                  letterSpacing: '0.05em',
                  paddingBottom: '4px',
                  borderBottom: '3px solid transparent',
                }}
                onMouseEnter={(e) => {
                  (e.target as HTMLElement).style.borderBottom = '3px solid var(--c-accent)';
                }}
                onMouseLeave={(e) => {
                  (e.target as HTMLElement).style.borderBottom = '3px solid transparent';
                }}
              >
                {link.label}
              </button>
            ))}
          </div>

          {/* Right side: theme toggle + mobile menu */}
          <div className="flex items-center" style={{ gap: 'var(--space-sm)' }}>
            <button
              onClick={toggleTheme}
              className="flex items-center justify-center rounded transition-colors duration-200"
              style={{
                width: '40px',
                height: '40px',
                color: 'var(--c-text)',
              }}
              aria-label="Toggle theme"
              title="Toggle theme"
            >
              {isDark ? <Sun size={20} /> : <Moon size={20} />}
            </button>

            <button
              className="md:hidden flex items-center justify-center"
              style={{
                width: '48px',
                height: '48px',
                color: 'var(--c-text)',
              }}
              onClick={() => setMobileOpen(true)}
              aria-label="Open menu"
            >
              <Menu size={24} />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-[1000] flex flex-col items-center justify-center"
          style={{ background: 'var(--c-bg)' }}
        >
          <button
            onClick={() => setMobileOpen(false)}
            className="absolute top-4 right-4"
            style={{
              width: '48px',
              height: '48px',
              color: 'var(--c-text)',
            }}
            aria-label="Close menu"
          >
            <X size={28} />
          </button>
          <div className="flex flex-col items-center" style={{ gap: 'var(--space-lg)' }}>
            <button
              onClick={() => scrollToSection('#top')}
              className="font-display text-4xl"
              style={{
                color: 'var(--c-text)',
                fontFamily: "'Bangers', Impact, sans-serif",
              }}
            >
              KERENGGE
            </button>
            {navLinks.map((link) => (
              <button
                key={link.href}
                onClick={() => scrollToSection(link.href)}
                className="font-display text-3xl"
                style={{
                  color: 'var(--c-text)',
                  fontFamily: "'Bangers', Impact, sans-serif",
                }}
              >
                {link.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
