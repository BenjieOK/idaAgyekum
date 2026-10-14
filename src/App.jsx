import { useEffect, useRef, useState } from 'react';
import Navigation from './components/Navigation.jsx';
import Contact from './components/Contact.jsx';
import Snackbar from './components/Snackbar.jsx';
import {
  Hero, Stats, About, Consultancy, Approach, Programmes, Speaking,
  Testimonials, Work, Footer,
} from './components/PortfolioSections.jsx';

export default function App() {
  const [notification, setNotification] = useState(null);
  const pageRef = useRef(null);

  useEffect(() => {
    const elements = pageRef.current.querySelectorAll('.reveal');
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches ||
        !('IntersectionObserver' in window)) {
      elements.forEach(element => element.classList.add('visible'));
      return;
    }
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.05 });
    elements.forEach(element => observer.observe(element));
    return () => observer.disconnect();
  }, []);

  function notify(message) {
    setNotification({ message, id: Date.now() });
  }

  return (
    <div ref={pageRef}>
      <a className="skip-link" href="#main-content">Skip to content</a>
      <Navigation />
      <main id="main-content">
        <Hero />
        <Stats />
        <Consultancy />
        <Programmes />
        <Approach />
        <About />
        <Speaking />
        <Testimonials />
        <Work />
        <Contact onNotify={notify} />
      </main>
      <Footer />
      <Snackbar notification={notification} onDismiss={() => setNotification(null)} />
    </div>
  );
}
