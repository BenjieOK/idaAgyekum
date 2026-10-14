import { useEffect, useState } from 'react';
import { CalendarDays, Mail, MapPin, Podcast, Send } from 'lucide-react';
import { BOOKING_URL } from '../booking.js';

const services = [
  'Programme design & strategy',
  'Programme delivery & partnerships',
  'Wellbeing advisory & training',
  'EZRA - 1:1 Coaching (Adults)',
  'EZRA - Coaching for Young People',
  'ZION - School Wellbeing Programme',
  'Speaking / Talks',
  'Workshops for Organisations',
  'Something Else',
];

export default function Contact({ onNotify }) {
  const [form, setForm] = useState({ name: '', email: '', service: '', message: '' });
  const [draftUrl, setDraftUrl] = useState('');

  useEffect(() => {
    function readEnquiry() {
      const [section, query = ''] = window.location.hash.slice(1).split('?');
      if (section !== 'contact') return;
      const service = new URLSearchParams(query).get('service');
      if (!services.includes(service)) return;
      setForm(current => ({ ...current, service }));
      setDraftUrl('');
      document.getElementById('contact')?.scrollIntoView({ behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth' });
    }
    readEnquiry();
    window.addEventListener('hashchange', readEnquiry);
    return () => window.removeEventListener('hashchange', readEnquiry);
  }, []);

  function update(event) {
    const { name, value } = event.target;
    setForm(current => ({ ...current, [name]: value }));
    setDraftUrl('');
  }

  function submit(event) {
    event.preventDefault();
    const subject = `Website Enquiry: ${form.service || 'General'}`;
    const body = `Name: ${form.name.trim()}\nEmail: ${form.email.trim()}\nInterested in: ${form.service}\n\nMessage:\n${form.message.trim()}`;
    const url = `mailto:idasagyekum@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setDraftUrl(url);
    onNotify('Opening your email app. Send the draft there to complete your enquiry.');
    window.location.href = url;
  }

  return (
    <section id="contact">
      <div className="contact-info reveal">
        <span className="section-label">Get In Touch</span>
        <h2>Tell me what<br />you have <em>in mind.</em></h2>
        <p>Share a little about your organisation, your project or the support you're looking for. We can explore the right way to work together.</p>
        <a href={BOOKING_URL} className="btn-primary contact-booking" target="_blank" rel="noopener noreferrer"><CalendarDays size={18} />Book a 20-minute call</a>
        <div className="contact-detail">
          <div className="contact-detail-icon"><Mail size={16} /></div>
          <a href="mailto:idasagyekum@gmail.com">idasagyekum@gmail.com</a>
        </div>
        <div className="contact-detail">
          <div className="contact-detail-icon"><MapPin size={16} /></div>
          <span>London, UK (&amp; Global via Online)</span>
        </div>
        <div className="contact-detail">
          <div className="contact-detail-icon"><Podcast size={16} /></div>
          <a href="https://open.spotify.com/show/4FYpoxaem9sDS2bNVO6mwK" target="_blank" rel="noopener noreferrer">Coaching Conversations Podcast</a>
        </div>
      </div>
      <div className="contact-form-wrap reveal">
        <h3 className="form-title">Your enquiry</h3>
        <form id="contactForm" onSubmit={submit}>
          <div className="form-group">
            <label htmlFor="fname">Your Name</label>
            <input type="text" id="fname" name="name" autoComplete="name" placeholder="First and last name" required
              value={form.name} onChange={update} />
          </div>
          <div className="form-group">
            <label htmlFor="femail">Email Address</label>
            <input type="email" id="femail" name="email" autoComplete="email" placeholder="your@email.com" required
              value={form.email} onChange={update} />
          </div>
          <div className="form-group">
            <label htmlFor="fservice">I'm interested in</label>
            <select id="fservice" name="service" value={form.service} onChange={update}>
              <option value="">Select a service...</option>
              {services.map(service => <option key={service}>{service}</option>)}
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="fmessage">Your Message</label>
            <textarea id="fmessage" name="message" placeholder="Tell me about your goals, your audience and any timescales..."
              value={form.message} onChange={update} />
          </div>
          <button type="submit" className="form-submit"><Send size={16} aria-hidden="true" />Send Message</button>
          {draftUrl && <p className="email-fallback">Email app didn't open? <a href={draftUrl}>Open your email draft</a> or email <a href="mailto:idasagyekum@gmail.com">idasagyekum@gmail.com</a>.</p>}
        </form>
      </div>
    </section>
  );
}
