import { useEffect, useRef, useState } from 'react';
import { Menu, X } from 'lucide-react';
import { BOOKING_URL } from '../booking.js';

const links = [
  ['About', 'about'], ['Consultancy', 'consultancy'],
  ['Programmes', 'programmes'], ['Speaking', 'speaking'],
  ['Book a call', 'booking'],
];

export default function Navigation() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const toggleRef = useRef(null);
  const navRef = useRef(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    const onResize = () => {
      if (window.innerWidth > 900) setOpen(false);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onResize);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onResize);
    };
  }, []);

  useEffect(() => {
    if (!open) return;
    const dismiss = event => {
      if (event.key === 'Escape') {
        setOpen(false);
        toggleRef.current?.focus();
      }
    };
    const outside = event => {
      if (!navRef.current?.contains(event.target)) setOpen(false);
    };
    window.addEventListener('keydown', dismiss);
    window.addEventListener('pointerdown', outside);
    return () => {
      window.removeEventListener('keydown', dismiss);
      window.removeEventListener('pointerdown', outside);
    };
  }, [open]);

  return (
    <nav ref={navRef} className={scrolled ? 'site-nav scrolled' : 'site-nav'} aria-label="Main navigation">
      <a href="#hero" className="nav-logo" onClick={() => setOpen(false)}>
        <span className="nav-brand-name">Ida Agyekum<span className="brand-dot">.</span></span>
        <span className="nav-brand-description">Youth development &amp; mental wellbeing</span>
      </a>
      <button
        ref={toggleRef}
        className="menu-toggle"
        type="button"
        aria-label={open ? 'Close navigation' : 'Open navigation'}
        aria-expanded={open}
        aria-controls="navigation-links"
        title={open ? 'Close navigation' : 'Open navigation'}
        onClick={() => setOpen(value => !value)}
      >
        {open ? <X size={22} /> : <Menu size={22} />}
      </button>
      <ul id="navigation-links" className={`nav-links${open ? ' is-open' : ''}`}>
        {links.map(([label, id]) => (
          <li key={id}>
            <a href={id === 'booking' ? BOOKING_URL : `#${id}`} className={id === 'booking' ? 'nav-cta' : undefined}
              target={id === 'booking' ? '_blank' : undefined}
              rel={id === 'booking' ? 'noopener noreferrer' : undefined}
              onClick={() => setOpen(false)}>{label}</a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
