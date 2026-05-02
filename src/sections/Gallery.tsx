import { useState, useEffect, useRef } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

function useInView(ref: React.RefObject<HTMLElement | null>, options?: IntersectionObserverInit) {
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { setInView(true); observer.disconnect(); }
    }, { threshold: 0.1, ...options });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);
  return inView;
}

const galleryImages = [
  { src: '/images/kerengge-booth-drawing.jpg', alt: 'Kerengge sedang melukis dan menandatangani komik' },
  { src: '/images/kerengge-mari-berkenalan.jpg', alt: 'Mari Berkenalan Hanafiah Ibrahim — Profil majalah Bambino' },
  { src: '/images/kerengge-dbp-2019.jpg', alt: 'Kerengge di Minggu Penulisan Komik DBP 2019' },
  { src: '/images/kerengge-utusan-article.jpg', alt: 'Artikel Utusan Malaysia — Menjual budaya dan warisan dalam kartun' },
  { src: '/images/kerengge-gilagila-117.jpg', alt: 'Gila Gila 117 (1983) — Itu Ini Begitu Begini oleh Kerengge' },
  { src: '/images/tokoh-kartunis-2023.jpg', alt: 'Anugerah Tokoh Kartunis 2023' },
  { src: '/images/poster-sehari-bersama-2016.jpg', alt: 'Sehari Bersama Kartunis Kerengge — BKRR Kelantan 2016' },
  { src: '/images/komik-strip-01.jpg', alt: 'Komik Strip oleh Kerengge' },
  { src: '/images/komik-strip-02.jpg', alt: 'Komik Strip Silat oleh Kerengge' },
  { src: '/images/komik-strip-03.jpg', alt: 'Komik Strip Aksi oleh Kerengge' },
  { src: '/images/auta-leman.jpg', alt: 'AUTA LEMAN — Kartunis: Kerengge' },
  { src: '/images/komik-berwarna-01.jpg', alt: 'Komik Berwarna oleh Kerengge' },
  { src: '/images/komik-berwarna-02.jpg', alt: 'Komik Berwarna Komputer oleh Kerengge (1992)' },
  { src: '/images/macam-macam-suratkhabar.jpg', alt: 'Macam-Macam — Strip surat khabar oleh Kerengge' },
  { src: '/images/jimat-air-01.jpg', alt: 'Jimat Air 01 — Kartun Kerengge (2006)' },
  { src: '/images/blog-jimat-air-02.jpg', alt: 'Jimat Air 02 — Kartun Kerengge' },
  { src: '/images/blog-jimat-air-03.jpg', alt: 'Jimat Air 03 — Kartun Kerengge' },
  { src: '/images/komik-gilagila-halaman-penuh-01.jpg', alt: 'Halaman Penuh Gila-Gila oleh Kerengge' },
  { src: '/images/komik-gilagila-halaman-penuh-02.jpg', alt: 'Bersambung Sambung Sambungan — Gila-Gila' },
  { src: '/images/komik-gilagila-kampu-elektrik.jpg', alt: 'Kampu Elektrik — Gila-Gila oleh Kerengge' },
  { src: '/images/komik-gilagila-membuli.jpg', alt: 'Membuli — Panel Gila-Gila oleh Kerengge' },
  { src: '/images/komik-gilagila-ragging.jpg', alt: 'Ragging — Panel Gila-Gila oleh Kerengge' },
  { src: '/images/blog-guru-lesen.jpg', alt: 'Siapa Yang Memandu Tu? — Kartun Kerengge' },
  { src: '/images/blog-katun-racist.jpg', alt: 'Katun Racist — Kartun Kerengge' },
  { src: '/images/blog-idea.jpg', alt: 'Idea — Kartun Kerengge' },
];

export default function Gallery() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const inView = useInView(sectionRef);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentImage, setCurrentImage] = useState(0);

  const openLightbox = (index: number) => { setCurrentImage(index); setLightboxOpen(true); document.body.style.overflow = 'hidden'; };
  const closeLightbox = () => { setLightboxOpen(false); document.body.style.overflow = ''; };
  const goNext = () => setCurrentImage((prev) => (prev + 1) % galleryImages.length);
  const goPrev = () => setCurrentImage((prev) => (prev - 1 + galleryImages.length) % galleryImages.length);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (!lightboxOpen) return;
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowRight') goNext();
      if (e.key === 'ArrowLeft') goPrev();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [lightboxOpen]);

  return (
    <>
      <section
        id="galeri"
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
            GALERI KARYA
          </h2>
        </div>

        <div className="section-container">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4" style={{ gap: 'var(--space-md)' }}>
            {galleryImages.map((img, i) => (
              <div
                key={i}
                className="overflow-hidden cursor-pointer"
                style={{
                  border: '3px solid var(--c-panel-border)',
                  opacity: inView ? 1 : 0,
                  transform: inView ? 'translateY(0)' : 'translateY(40px)',
                  transition: `all 600ms var(--ease-out-expo) ${i * 80}ms`,
                }}
                onClick={() => openLightbox(i)}
              >
                <img
                  src={img.src}
                  alt={img.alt}
                  className="w-full h-auto transition-transform duration-400 hover:scale-105"
                  style={{ aspectRatio: '4/3', objectFit: 'cover', display: 'block' }}
                  loading="lazy"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox */}
      {lightboxOpen && (
        <div className="fixed inset-0 z-[1000] flex items-center justify-center" style={{ background: 'rgba(0,0,0,0.95)' }} onClick={closeLightbox}>
          <button className="absolute top-4 right-4 text-white p-2 hover:opacity-70" onClick={closeLightbox}><X size={32} /></button>
          <button className="absolute left-4 top-1/2 -translate-y-1/2 text-white p-2 hover:opacity-70" onClick={(e) => { e.stopPropagation(); goPrev(); }}><ChevronLeft size={40} /></button>
          <button className="absolute right-4 top-1/2 -translate-y-1/2 text-white p-2 hover:opacity-70" onClick={(e) => { e.stopPropagation(); goNext(); }}><ChevronRight size={40} /></button>
          <div className="max-w-[90vw] max-h-[90vh] flex flex-col items-center">
            <img
              src={galleryImages[currentImage].src}
              alt={galleryImages[currentImage].alt}
              className="max-w-full max-h-[85vh] object-contain"
              style={{ border: '3px solid white' }}
              onClick={(e) => e.stopPropagation()}
            />
            <p className="text-white mt-4 text-center text-lg" style={{ fontFamily: "'Fredoka', sans-serif" }}>
              {galleryImages[currentImage].alt}
            </p>
          </div>
        </div>
      )}
    </>
  );
}
