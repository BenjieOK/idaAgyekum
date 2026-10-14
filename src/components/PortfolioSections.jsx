import { ArrowUpRight, ArrowRight, Check, Mail, Podcast } from 'lucide-react';
import { BOOKING_URL } from '../booking.js';

export function Hero() {
  return (
    <section id="hero" aria-labelledby="hero-heading">
      <img className="hero-photo" src="/images/ida-portrait.jpg" alt="Ida Agyekum, youth development and mental wellbeing consultant" fetchPriority="high" decoding="async" />
      <div className="hero-content">
        <span className="hero-eyebrow">Consultant · Programme designer · Coach</span>
        <h1 id="hero-heading">Ida <em>Agyekum</em></h1>
        <p className="hero-positioning">Youth development &amp;<br />mental wellbeing consultancy.</p>
        <p className="hero-description">Helping organisations create programmes that strengthen wellbeing and prepare young people for life, work and entrepreneurship.</p>
        <div className="hero-actions">
          <a href={BOOKING_URL} className="btn-primary" target="_blank" rel="noopener noreferrer">Book a call <ArrowUpRight size={18} /></a>
          <a href="#consultancy" className="text-link">Explore consultancy <ArrowRight size={18} /></a>
        </div>
        <p className="hero-location">Based in London. Working across the UK and internationally.</p>
      </div>
    </section>
  );
}

export function Stats() {
  return (
<div className={"stats-bar"}>
<div className={"stat-item"}>
<span className={"stat-num"}>{"20+"}</span>
<span className={"stat-label"}>{"Years of experience"}</span>
</div>
<div className={"stat-item"}>
<span className={"stat-num"}>{"UK & global"}</span>
<span className={"stat-label"}>{"Projects & partnerships"}</span>
</div>
<div className={"stat-item"}>
<span className={"stat-num"}>{"Strategy to delivery"}</span>
<span className={"stat-label"}>{"An end-to-end approach"}</span>
</div>
</div>
  );
}

export function About() {
  return (
<section id={"about"}>
<div className={"about-image-wrap reveal"}>
<img src={"/images/ida-coaching.jpg"} alt={"Ida Agyekum in a coaching session"} loading={"lazy"} decoding={"async"} />
<div className={"about-badge"}>
<strong>{"London"}</strong>
<span>Based. Working internationally.</span>
</div>
</div>
<div className={"about-content reveal"}>
<span className={"section-label"}>{"About Ida"}</span>
<h2 className="section-title">Professional experience.<br /><em>Personal understanding.</em></h2>
<p>{"\n          Ida's story begins long before her professional journey in a classroom\n          where she often felt alone, even while surrounded by friends.\n          Outwardly bright and bubbly, she struggled with reading, writing, and\n          processing information in ways she couldn't explain. The combination\n          of dyslexia, anxiety, and grief shaped her early years and deepened\n          her empathy for those who feel overlooked.\n        "}</p>
<p>{"\n          Today, Ida is a mental wellbeing consultant, coach, and mentor, known\n          for blending lived experience with professional expertise in a way\n          that is both compassionate and transformative. She is the founder of\n          Developing You for Others — a wellbeing service dedicated to building\n          confidence, emotional resilience, and healthier self-relationships.\n        "}</p>
<p>Alongside her coaching practice, Ida designs and delivers youth development initiatives with strategic partners. Her work connects mental wellbeing with personal growth, employability and enterprise, from the first conversation through to delivery and evaluation.</p>
<div className={"about-pillars"}>
<div className={"pillar-item"}>
<div className={"pillar-dot"}></div>
<span>{"Youth Development"}</span>
</div>
<div className={"pillar-item"}>
<div className={"pillar-dot"}></div>
<span>{"Human Rights"}</span>
</div>
<div className={"pillar-item"}>
<div className={"pillar-dot"}></div>
<span>{"Girls' Empowerment"}</span>
</div>
<div className={"pillar-item"}>
<div className={"pillar-dot"}></div>
<span>{"Trauma-Informed Practice"}</span>
</div>
<div className={"pillar-item"}>
<div className={"pillar-dot"}></div>
<span>{"Emotional Literacy"}</span>
</div>
<div className={"pillar-item"}>
<div className={"pillar-dot"}></div>
<span>{"Cultural Sensitivity"}</span>
</div>
</div>
<a href={"#contact"} className={"btn-primary"}>{"Work With Ida"}</a>
</div>
</section>
  );
}

export function Consultancy() {
  const offers = [
    { number: '01', title: 'Programme design & strategy', description: 'Turn a vision into a practical programme that puts young people and their wellbeing at the centre.', items: ['Needs assessment and stakeholder engagement', 'Programme structure and delivery roadmap', 'Outcomes framework and evaluation plan'], enquiry: 'Programme design & strategy' },
    { number: '02', title: 'Programme delivery & partnerships', description: 'Bring the right people together and move a programme from concept into thoughtful, coordinated delivery.', items: ['Project planning and delivery coordination', 'Strategic partner engagement', 'Facilitation, review and learning'], enquiry: 'Programme delivery & partnerships' },
    { number: '03', title: 'Wellbeing advisory & training', description: 'Embed mental wellbeing into existing youth engagement, employability and entrepreneurship initiatives.', items: ['Programme review and recommendations', 'Team workshops and practical resources', 'Ongoing advisory support'], enquiry: 'Wellbeing advisory & training' },
  ];
  return (
    <section id="consultancy" aria-labelledby="consultancy-heading">
      <div className="section-heading-row">
        <div><span className="section-label reveal">For organisations &amp; strategic partners</span>
          <h2 id="consultancy-heading" className="section-title reveal">From a shared vision<br />to <em>meaningful outcomes.</em></h2></div>
        <p className="section-intro reveal">Specialist support for charities, schools, public-sector commissioners and organisations investing in young people. Each engagement is shaped around your context, capacity and goals.</p>
      </div>
      <div className="consultancy-offers">
        {offers.map(offer => (
          <article className="consultancy-offer reveal" key={offer.number}>
            <span className="offer-number">{offer.number}</span>
            <h3>{offer.title}</h3><p>{offer.description}</p>
            <ul>{offer.items.map(item => <li key={item}><Check size={16} aria-hidden="true" />{item}</li>)}</ul>
            <a className="text-link" href={`#contact?service=${encodeURIComponent(offer.enquiry)}`}>Discuss this service <ArrowUpRight size={17} /></a>
          </article>
        ))}
      </div>
      <div className="delivery-process reveal">
        <div><span className="section-label">A considered process</span><h3>Clarity at every stage.</h3></div>
        <ol>{[
          ['Discover', 'Understand your young people, partners and priorities.'],
          ['Design', 'Agree the programme, responsibilities and intended outcomes.'],
          ['Deliver', 'Coordinate partners and put the plan into practice.'],
          ['Evaluate', 'Review progress, gather feedback and shape what comes next.'],
        ].map(([title, description], index) => <li key={title}><span className="process-number">0{index + 1}</span><h4>{title}</h4><p>{description}</p></li>)}</ol>
      </div>
      <div className="impact-line reveal"><h3>What progress can look like</h3><p>Wellbeing &amp; confidence <span>/</span> Engagement &amp; retention <span>/</span> Skills development <span>/</span> Education &amp; employment progression <span>/</span> Stronger partnerships</p></div>
    </section>
  );
}

export function Approach() {
  return (
<section id={"approach"}>
<span className={"section-label reveal"}>{"My Approach"}</span>
<h2 className="section-title reveal">Human understanding.<br /><em>Thoughtful programme design.</em></h2>
<p className={"approach-intro reveal"}>{"\n        Every person I work with is met with deep respect, cultural sensitivity,\n        and a clear understanding that healing is not linear. My approach\n        centres the whole person — not just the presenting challenge.\n      "}</p>
<div className={"approach-grid"}>
<div className={"approach-card reveal"}>
<div className={"approach-num"}>{"01"}</div>
<h3>{"Trauma-Informed"}</h3>
<p>{"\n            All support is grounded in trauma-informed practice, recognising how\n            past experiences shape present behaviours and emotional responses.\n          "}</p>
</div>
<div className={"approach-card reveal"}>
<div className={"approach-num"}>{"02"}</div>
<h3>{"Culturally Sensitive"}</h3>
<p>{"\n            With over two decades working across multicultural and marginalised\n            communities in the UK and Africa, I meet you where you are.\n          "}</p>
</div>
<div className={"approach-card reveal"}>
<div className={"approach-num"}>{"03"}</div>
<h3>{"Emotionally Safe"}</h3>
<p>{"\n            Creating genuinely safe spaces where people can speak honestly, feel\n            heard, and begin to heal without fear of judgement.\n          "}</p>
</div>
<div className={"approach-card reveal"}>
<div className={"approach-num"}>{"04"}</div>
<h3>{"Dyslexia-Informed"}</h3>
<p>{"\n            As someone who navigated dyslexia personally, I ensure my programmes\n            are fully accessible for all learning and thinking styles.\n          "}</p>
</div>
<div className={"approach-card reveal"}>
<div className={"approach-num"}>{"05"}</div>
<h3>{"Lived Experience"}</h3>
<p>{"\n            My work is not theoretical. It is shaped by real experience of\n            grief, anxiety, resilience, and healing and so is my empathy.\n          "}</p>
</div>
<div className={"approach-card reveal"}>
<div className={"approach-num"}>{"06"}</div>
<h3>{"Generational Healing"}</h3>
<p>{"\n            I believe in breaking cycles, helping individuals, families, and\n            communities heal together and pass on strength, not struggle.\n          "}</p>
</div>
</div>
</section>
  );
}

export function Programmes() {
  return (
<section id={"programmes"}>
<span className={"section-label reveal"}>{"Coaching & Mentoring Programmes"}</span>
<h2 className="section-title reveal">Signature programmes.<br /><em>Support with purpose.</em></h2>
<p className={"programmes-intro reveal"}>{"\n        Ida provides trauma-informed, emotionally safe support for individuals,\n        young people, schools, organisations, and community groups. Each\n        programme centres emotional literacy, identity, and confidence.\n      "}</p>
<div className={"programme-cards"}>
<div className={"prog-card prog-card-zion reveal"}>
<span className={"prog-badge"}>{"Schools Only"}</span>
<h3>{"ZION"}</h3>
<p className={"prog-subtitle"}>{"School Wellbeing & Identity Programme"}</p>
<p>{"\n            A 6-week emotional wellbeing and identity-building programme for\n            students aged 11–18. Designed to help young people feel safe,\n            confident, and ready to thrive academically and socially.\n          "}</p>
<ul className={"prog-features"}>
<li>{"Emotional regulation & resilience"}</li>
<li>{"Confidence and identity building"}</li>
<li>{"Behaviour linked to unmet needs"}</li>
<li>{"Communication and engagement"}</li>
<li>{"Parent workshops available"}</li>
</ul>
<a href="#contact?service=ZION%20-%20School%20Wellbeing%20Programme" className="prog-cta">Enquire for schools <ArrowUpRight size={17} /></a>
<div className={"prog-card-bg"}>{"Z"}</div>
</div>
<div className={"prog-card prog-card-ezra reveal"}>
<span className={"prog-badge"}>{"Adults & Young People"}</span>
<h3>{"EZRA"}</h3>
<p className={"prog-subtitle"}>{"1:1 Coaching & Small Groups"}</p>
<p>{"\n            A trauma-informed coaching pathway helping individuals understand\n            their triggers, uncover emotional root causes, heal deeply, and step\n            into their identity and purpose.\n          "}</p>
<ul className={"prog-features"}>
<li>{"1:1 coaching programmes"}</li>
<li>{"Small group coaching"}</li>
<li>{"Deep-dive intensive sessions"}</li>
<li>{"Anxiety & confidence support"}</li>
<li>{"Emotional literacy mentoring"}</li>
</ul>
<a href={BOOKING_URL} className="prog-cta" target="_blank" rel="noopener noreferrer">Book a 20-minute call <ArrowUpRight size={17} /></a>
<div className={"prog-card-bg"}>{"E"}</div>
</div>
<div className={"prog-card prog-card-talks reveal"} style={{"gridColumn":"1 / -1"}}>
<span className={"prog-badge"}>{"Schools, Organisations & Events"}</span>
<h3>{"Talks & Speaking"}</h3>
<p className={"prog-subtitle"}>{"\n            Powerful talks that inspire, educate, and draw from lived experience\n          "}</p>
<p>{"\n            Ida delivers honest, relatable, and deeply impactful talks that\n            blend her personal journey with trauma-informed insight. Known for\n            being authentic — not scripted — her sessions leave lasting\n            impressions.\n          "}</p>
<a href={"#speaking"} className={"prog-cta"}>{"See Speaking Topics →"}</a>
<div className={"prog-card-bg"}>{"T"}</div>
</div>
</div>
<div className={"framework-block reveal"}>
<div>
<h3 className={"framework-title"}>{"The ZION Framework"}</h3>
<p className={"framework-tagline"}>{"\n            A simple, powerful pathway that helps young people feel safe,\n            confident, and ready to learn.\n          "}</p>
<div className={"framework-steps"}>
<div className={"framework-step"}>
<span className={"step-letter"}>{"Z"}</span>
<div className={"step-text"}><strong>{"Zone of Safety"}</strong></div>
</div>
<div className={"framework-step"}>
<span className={"step-letter"}>{"I"}</span>
<div className={"step-text"}><strong>{"Identity"}</strong></div>
</div>
<div className={"framework-step"}>
<span className={"step-letter"}>{"O"}</span>
<div className={"step-text"}><strong>{"Ownership"}</strong></div>
</div>
<div className={"framework-step"}>
<span className={"step-letter"}>{"N"}</span>
<div className={"step-text"}><strong>{"New Direction"}</strong></div>
</div>
</div>
</div>
<div>
<h3 className={"framework-title"}>{"The EZRA Framework"}</h3>
<p className={"framework-tagline"}>{"\n            A simple, powerful 1:1 coaching pathway for understanding your\n            triggers, healing deeply, and rising into your true identity.\n          "}</p>
<div className={"framework-steps"}>
<div className={"framework-step"}>
<span className={"step-letter"}>{"E"}</span>
<div className={"step-text"}><strong>{"Explore the Trigger"}</strong></div>
</div>
<div className={"framework-step"}>
<span className={"step-letter"}>{"Z"}</span>
<div className={"step-text"}><strong>{"Zero In on the Root"}</strong></div>
</div>
<div className={"framework-step"}>
<span className={"step-letter"}>{"R"}</span>
<div className={"step-text"}>
<strong>{"Restore Through Healing"}</strong>
</div>
</div>
<div className={"framework-step"}>
<span className={"step-letter"}>{"A"}</span>
<div className={"step-text"}><strong>{"Activate Growth"}</strong></div>
</div>
</div>
</div>
</div>
</section>
  );
}

export function Speaking() {
  return (
<section id={"speaking"}>
<div className={"speaking-grid"}>
<div>
<span className={"section-label reveal"}>{"Speaking & Workshops"}</span>
<h2 className={"section-title reveal"}>{"\n            Talks that"}<br />{"move "}<em>{"rooms"}</em>
</h2>
<p className={"speaking-desc reveal"}>{"\n            Ida's talks are known for their raw honesty, warmth, and depth.\n            Whether addressing a school assembly, corporate team, or community\n            event, she brings insight that connects, challenges, and transforms.\n          "}</p>
<h4 style={{"fontSize":"0.72rem","fontWeight":"600","letterSpacing":"0.2em","textTransform":"uppercase","color":"var(--amber)","marginBottom":"1rem"}} className={"reveal"}>{"\n            Speaking Topics\n          "}</h4>
<ul className={"speaking-topics reveal"}>
<li>{"Emotional wellbeing"}</li>
<li>{"Identity & confidence"}</li>
<li>{"Dyslexia-informed emotional literacy"}</li>
<li>{"Generational trauma & healing"}</li>
<li>{"Behaviour, triggers & emotional safety"}</li>
<li>{"Youth empowerment & resilience"}</li>
<li>{"Ida's personal journey & lived experience"}</li>
<li>{"Leadership & self-awareness"}</li>
</ul>
<a href={"#contact"} className={"btn-primary reveal"}>{"Enquire About Booking"}</a>
</div>
<div>
<div className={"podcast-card reveal"}>
<div className="podcast-tag"><Podcast size={16} /> The podcast</div>
<h3>{"Coaching Conversations with Ida"}</h3>
<p>{"\n              Ida hosts a podcast exploring everyday wellbeing challenges with a\n              global audience. Her grounded, relatable style has built a\n              community of listeners seeking clarity, healing, and practical\n              tools for everyday life.\n            "}</p>
<div className={"podcast-regions"}>
<span className={"region-tag"}>{"Europe"}</span>
<span className={"region-tag"}>{"Africa"}</span>
<span className={"region-tag"}>{"North America"}</span>
<span className={"region-tag"}>{"Asia"}</span>
</div>
<a href="https://open.spotify.com/show/4FYpoxaem9sDS2bNVO6mwK" target="_blank" className="podcast-listen-btn" rel="noopener noreferrer"><Podcast size={17} />Listen on Spotify <ArrowUpRight size={17} /></a>
<div className={"prev-engagements"}>
<h4>{"Recent Engagements"}</h4>
<ul className={"engagement-list"}>
<li>{"WaterAid conversations"}</li>
<li>{"Talks with Lady Emma"}</li>
<li>{"Free Your Mind collaboration"}</li>
<li>{"Transitions Everywhere with Summie Yeung"}</li>
<li>{"The Breakthrough Podcast"}</li>
</ul>
</div>
</div>
</div>
</div>
</section>
  );
}

export function Testimonials() {
  return (
<section id={"testimonials"}>
<div className={"testimonials-header"}>
<span className={"section-label"}>{"Testimonials"}</span>
<h2 className="section-title">In their <em>own words.</em></h2>
</div>
<div className={"testimonials-grid"}>
<div className={"testimonial-card reveal"}>
<p className={"testimonial-text"}>{"\n            Ida's ability to believe in you more than you believe in yourself is\n            exactly the boost I needed that I could create the life I was meant\n            to have. Truly grateful for her heart and her spirit. She is a\n            blessing.\n          "}</p>
<div className={"testimonial-author"}>{"Kwame"}</div>
<div className={"testimonial-role"}>{"1 to 1 Coaching"}</div>
</div>
<div className={"testimonial-card reveal"}>
<p className={"testimonial-text"}>{"\n            I really enjoyed today's session on discovering your full potential.\n            It was powerful, uplifting, and exactly what young teenage girls\n            need. The atmosphere was full of encouragement, honesty, and growth.\n            I left feeling inspired, motivated, and grateful.\n          "}</p>
<div className={"testimonial-author"}>{"S.Y."}</div>
<div className={"testimonial-role"}>{"ZION School Programme"}</div>
</div>
<div className={"testimonial-card reveal"}>
<p className={"testimonial-text"}>{"\n            I found the segment on the different parts of the brain particularly\n            impactful. The clear explanation of how each region functions during\n            trauma provided valuable insight and enhanced my understanding of\n            trauma responses.\n          "}</p>
<div className={"testimonial-author"}>{"Participant"}</div>
<div className={"testimonial-role"}>{"Speaking Engagement"}</div>
</div>
<div className={"testimonial-card reveal"}>
<p className={"testimonial-text"}>{"\n            Ida has encouraged me to start up my cooking business, something I\n            have been procrastinating about for years! Something about her\n            motivation and inspiration gave me the push I needed and most\n            importantly to keep going. She's a very kind hearted individual who\n            only wants the best for people.\n          "}</p>
<div className={"testimonial-author"}>{"Cerise"}</div>
<div className={"testimonial-role"}>{"EZRA Coaching Programme"}</div>
</div>
</div>
</section>
  );
}

export function Work() {
  return (
<section id={"work"}>
<span className={"section-label"}>{"Work With Me"}</span>
<h2 className="section-title">Let's build something<br /><em>that makes a difference.</em></h2>
<p className="work-desc">Developing a new initiative, strengthening an existing programme or looking for individual support? Let's talk about where you are and what you want to achieve.</p>
<div className={"work-options"}>
<div className={"work-option"}>
<span className={"work-option-title"}>{"Individuals"}</span>
<span className={"work-option-sub"}>{"EZRA 1:1 Coaching"}</span>
</div>
<div className={"work-option"}>
<span className={"work-option-title"}>{"Schools"}</span>
<span className={"work-option-sub"}>{"ZION Programme"}</span>
</div>
<div className={"work-option"}>
<span className={"work-option-title"}>{"Organisations"}</span>
<span className={"work-option-sub"}>{"Workshops & Talks"}</span>
</div>
<div className={"work-option"}>
<span className={"work-option-title"}>{"Events"}</span>
<span className={"work-option-sub"}>{"Speaking Engagements"}</span>
</div>
</div>
<a href={BOOKING_URL} className="work-cta-big" target="_blank" rel="noopener noreferrer">Book a 20-minute call <ArrowUpRight size={18} /></a>
<p className={"work-note"}>{"\n        No pressure. Just a conversation to explore what's possible for you.\n      "}</p>
</section>
  );
}

export function Footer() {
  return (
<footer>
<div className={"footer-top"}>
<div className={"footer-brand"}>
<h3>{"Ida Agyekum"}</h3>
<p>Youth development and mental wellbeing consultancy. Thoughtful programmes, purposeful partnerships and support that puts people first.</p>
</div>
<div className={"footer-col"}>
<h4>{"Services"}</h4>
<ul>
<li><a href={BOOKING_URL} target="_blank" rel="noopener noreferrer">Book a call</a></li>
<li><a href="#consultancy">Youth development consultancy</a></li>
<li><a href={"#programmes"}>{"ZION School Programme"}</a></li>
<li><a href={"#programmes"}>{"EZRA 1:1 Coaching"}</a></li>
<li><a href={"#speaking"}>{"Speaking & Talks"}</a></li>
<li><a href={"#speaking"}>{"Workshops"}</a></li>
<li>
<a href={"https://open.spotify.com/show/4FYpoxaem9sDS2bNVO6mwK"} target={"_blank"} rel={"noopener noreferrer"}>{"Podcast"}</a>
</li>
</ul>
</div>
<div className={"footer-col"}>
<h4>{"Navigate"}</h4>
<ul>
<li><a href={"#about"}>{"About Ida"}</a></li>
<li><a href={"#approach"}>{"My Approach"}</a></li>
<li><a href={"#programmes"}>{"Programmes"}</a></li>
<li><a href={"#speaking"}>{"Speaking"}</a></li>
<li><a href={"#contact"}>{"Contact"}</a></li>
</ul>
</div>
<div className={"footer-col"}>
<h4>{"Mission"}</h4>
<ul>
<li><a href={"#approach"}>{"Break cycles of generational trauma"}</a></li>
<li><a href={"#approach"}>{"Normalise generational healing"}</a></li>
<li><a href={"#approach"}>{"Empower future leaders"}</a></li>
</ul>
</div>
</div>
<div className={"footer-bottom"}>
<div className={"footer-copy"}>{"\n          © 2026 "}<span>{"Ida Agyekum"}</span>{". All rights reserved.\n        "}</div>
<div className={"footer-social"}>
<a href="mailto:idasagyekum@gmail.com" className="social-link" aria-label="Email Ida" title="Email Ida"><Mail size={18} /></a>
<a href={"https://open.spotify.com/show/4FYpoxaem9sDS2bNVO6mwK"} target={"_blank"} className={"social-link"} aria-label={"Podcast"} rel={"noopener noreferrer"}>
<Podcast size={18} />
</a>
</div>
</div>
</footer>
  );
}
