import { useState, useEffect, useRef } from "react";
import "./App.css";

// ====== EDIT YOUR DETAILS HERE ======
const BRAND = "ACTIVACORE";
const LOGO = "/logo.png";
const HERO_IMG = "/hero.png"; // image shown on the RIGHT side of the hero (public folder)
const AI_VIDEO = "/ai.mp4";   // the animation that replaces the "AI" badge (public folder)
const EMAIL = "harikothapalli22@gmail.com";
const PHONE = "+91 9000875176";
const WHATSAPP = "+919000875176";
const FORM_URL = "https://formspree.io/f/YOUR_FORM_ID";

const services = [
  { icon: "📈", title: "Digital Marketing", text: "Complete digital marketing strategies that boost your online visibility and drive measurable growth." },
  { icon: "📱", title: "Social Media Marketing", text: "Engaging social media campaigns that build your brand, grow your audience and drive results." },
  { icon: "✍️", title: "Content Marketing", text: "Valuable, well-crafted content that attracts, informs and converts your ideal customers." },
  { icon: "🎯", title: "Lead Generation", text: "Targeted campaigns that bring in qualified leads and turn interest into sales." },
  { icon: "💻", title: "Website Design & Development", text: "Modern, fast and user-friendly websites that deliver seamless digital experiences." },
  { icon: "🏷️", title: "Branding Identity", text: "A strong, consistent brand identity that makes your business memorable and trusted." },
  { icon: "🎨", title: "Graphic Design", text: "Creative visuals, posters, flyers and brochures that communicate your message clearly." },
  { icon: "✨", title: "Logo Design", text: "Unique and memorable logos that reflect your brand and leave a lasting impression." },
];

// Portfolio projects from Hari_Designs.pdf  ->  put the images in  public/portfolio/
const portfolio = [
  { cat: "Healthcare Campaign", title: "Icon Hospital — Awareness Creative", text: "Clear awareness messaging with striking medical imagery in the hospital's orange-and-teal palette.", image: "/portfolio/icon-hospital-awareness.jpg", alt: "Icon Hospital breast cancer awareness campaign" },
  { cat: "Food & Beverage", title: "Appam House — Delivery Campaign", text: "Appetizing visuals, delivery messaging and a clear call to action to drive online orders.", image: "/portfolio/appam-house-delivery.jpg", alt: "Appam House food delivery campaign" },
  { cat: "Restaurant Marketing", title: "Jamie's Burger — Order Online", text: "A high-contrast ordering campaign with a mobile mockup and a delivery-focused message.", image: "/portfolio/jamies-burger-ordering.jpg", alt: "Jamie's Burger online ordering campaign" },
  { cat: "Salon Festival Post", title: "Naturals — Eid Mubarak", text: "An elegant festive greeting that keeps the salon brand front and centre.", image: "/portfolio/naturals-eid.jpg", alt: "Naturals salon Eid Mubarak creative" },
  { cat: "Healthcare Education", title: "Sri Maruthi — Heart Health Myth & Fact", text: "A simple myth-vs-fact layout that builds trust with doctor credentials and booking details.", image: "/portfolio/sri-maruthi-heart-health.jpg", alt: "Sri Maruthi Hospitals heart health myth and fact post" },
  { cat: "School Awareness", title: "Birla Open Minds — Technology Day", text: "A clean, illustrated awareness post for a national day with campus contact details.", image: "/portfolio/birla-technology-day.jpg", alt: "Birla Open Minds National Technology Day post" },
  { cat: "Healthcare Education", title: "Medigo Hospitals — Myth & Fact", text: "Bold myth-and-fact blocks with doctor details and clear appointment numbers.", image: "/portfolio/medigo-myth-fact.jpg", alt: "Medigo Hospitals myth and fact post" },
  { cat: "Hospitality", title: "Hotel Regalia — Flavors That Speak", text: "A dark, moody food creative that makes the restaurant feel premium.", image: "/portfolio/regalia-flavors.jpg", alt: "Hotel Regalia Andhra chicken curry creative" },
  { cat: "Insurance", title: "Insurance Master — Term Plan Benefits", text: "A numbered benefits layout with a family photo to explain the offer at a glance.", image: "/portfolio/insurance-master-term-plan.jpg", alt: "Insurance Master term plan benefits post" },
  { cat: "Doctor Introduction", title: "Icon Hospital — Welcome Post", text: "A friendly welcome post introducing a new specialist with qualifications and contact info.", image: "/portfolio/icon-welcome-doctor.jpg", alt: "Icon Hospital welcome new doctor post" },
  { cat: "Festival Greeting", title: "Naturals Kavali — Happy Ugadi", text: "A festive word-art mango leaf built from the salon's own services.", image: "/portfolio/naturals-ugadi.jpg", alt: "Naturals Kavali Ugadi creative" },
  { cat: "Festival Greeting", title: "Sri Maruthi — Eid Mubarak", text: "A stethoscope and crescent concept that ties the festival to the hospital brand.", image: "/portfolio/sri-maruthi-eid.jpg", alt: "Sri Maruthi Hospitals Eid Mubarak post" },
  { cat: "Recruitment", title: "Softress — We're Hiring", text: "A search-bar style hiring post that lists open roles and how to apply.", image: "/portfolio/softress-hiring.jpg", alt: "Softress hiring announcement" },
];

const steps = [
  { n: "01", title: "Discover", text: "We learn your business, audience and goals." },
  { n: "02", title: "Strategy", text: "A clear plan with channels, content and budget." },
  { n: "03", title: "Execute", text: "We launch campaigns and content on schedule." },
  { n: "04", title: "Optimize", text: "We track results and improve every month." },
];
const results = [
  { n: 200, suffix: "%", label: "Avg. traffic growth" },
  { n: 3, suffix: "x", label: "More qualified leads" },
  { n: 50, suffix: "+", label: "Projects delivered" },
  { n: 95, suffix: "%", label: "Client retention" },
];
// SAMPLE content for layout only. When you get real reviews, replace name/role/text and delete `sample: true`.
const testimonials = [
  { sample: true, name: "Prateek S.", role: "Founder, Retail Brand", text: "Sample text: the team understood our goals quickly and the campaigns were clear, consistent and on time." },
  { sample: true, name: "Aniket R.", role: "Owner, Local Business", text: "Sample text: our social media looks far more professional now and enquiries have been steady." },
  { sample: true, name: "Sneha K.", role: "Marketing Head, Company", text: "Sample text: creative designs, quick turnaround and easy communication throughout the project." },
];


function Reveal({ children, className = "" }) {
  const ref = useRef(null);
  const [on, setOn] = useState(false);
  useEffect(() => {
    const io = new IntersectionObserver(([e]) => e.isIntersecting && (setOn(true), io.disconnect()), { threshold: 0.12 });
    io.observe(ref.current);
    return () => io.disconnect();
  }, []);
  return <div ref={ref} className={`rv ${on ? "in" : ""} ${className}`}>{children}</div>;
}

function Counter({ to, suffix }) {
  const ref = useRef(null);
  const [v, setV] = useState(0);
  useEffect(() => {
    const io = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return;
      io.disconnect();
      const t0 = performance.now();
      const tick = (t) => {
        const p = Math.min((t - t0) / 1500, 1);
        setV(Math.round(to * (1 - Math.pow(1 - p, 3))));
        if (p < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    });
    io.observe(ref.current);
    return () => io.disconnect();
  }, [to]);
  return <b ref={ref}>{v}{suffix}</b>;
}

// Portfolio: one row, 4 small cards visible, arrow buttons scroll left / right
function PortfolioCarousel({ items }) {
  const track = useRef(null);
  const [edge, setEdge] = useState({ start: true, end: false });

  const update = () => {
    const el = track.current;
    if (!el) return;
    setEdge({
      start: el.scrollLeft <= 4,
      end: el.scrollLeft + el.clientWidth >= el.scrollWidth - 4,
    });
  };

  useEffect(() => {
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  const go = (dir) => {
    const el = track.current;
    const card = el.querySelector(".portfolio-card");
    const step = card ? card.offsetWidth + 16 : el.clientWidth;
    el.scrollBy({ left: dir * step, behavior: "smooth" });
  };

  return (
    <div className="carousel">
      <button className="arrow prev" onClick={() => go(-1)} hidden={edge.start} aria-label="Previous projects">‹</button>
      <div className="track" ref={track} onScroll={update}>
        {items.map((p) => (
          <article className="portfolio-card" key={p.title}>
            <div className="portfolio-image">
              <img src={p.image} alt={p.alt} loading="lazy" />
            </div>
            <div className="portfolio-copy">
              <span>{p.cat}</span>
              <h3>{p.title}</h3>
              <p>{p.text}</p>
            </div>
          </article>
        ))}
      </div>
      <button className="arrow next" onClick={() => go(1)} hidden={edge.end} aria-label="Next projects">›</button>
    </div>
  );
}

// Social icons: small row on the empty left wall of the image (LinkedIn shifted up a little)
const SOCIALS = [
  { k: "ig", l: "18%", t: "36%", d: ".5s", tt: "5s", svg: (
    <svg viewBox="0 0 48 48"><defs><linearGradient id="igrad" x1="0" y1="1" x2="1" y2="0"><stop offset="0" stopColor="#feda75"/><stop offset=".35" stopColor="#fa7e1e"/><stop offset=".6" stopColor="#d62976"/><stop offset="1" stopColor="#4f5bd5"/></linearGradient></defs><rect width="48" height="48" fill="url(#igrad)"/><rect x="12" y="12" width="24" height="24" rx="7" fill="none" stroke="#fff" strokeWidth="3"/><circle cx="24" cy="24" r="6" fill="none" stroke="#fff" strokeWidth="3"/><circle cx="31.5" cy="16.5" r="1.8" fill="#fff"/></svg>) },
  { k: "fb", l: "26%", t: "31%", d: ".7s", tt: "6s", svg: (
    <svg viewBox="0 0 48 48"><rect width="48" height="48" fill="#1877f2"/><path d="M26.5 40V26h4.6l.8-5.4h-5.4v-3.5c0-1.6.8-2.8 3-2.8h2.5V9.7c-.5-.1-2.2-.3-4-.3-4.2 0-6.9 2.5-6.9 7v4H16V26h4.1v14z" fill="#fff"/></svg>) },
  { k: "yt", l: "30%", t: "46%", d: ".9s", tt: "5.5s", svg: (
    <svg viewBox="0 0 48 48"><rect width="48" height="48" fill="#ff0000"/><polygon points="19,15 19,33 34,24" fill="#fff"/></svg>) },
  { k: "ads", l: "20%", t: "50%", d: "1.1s", tt: "6.5s", svg: (
    <svg viewBox="0 0 48 48"><rect width="48" height="48" fill="#fff"/><path d="M19 9 7 31l7 4 12-22z" fill="#fbbc04"/><path d="M29 9l12 22-7 4-12-22z" fill="#4285f4"/><circle cx="11" cy="37" r="5" fill="#34a853"/></svg>) },
  { k: "li", l: "27%", t: "57%", d: "1.3s", tt: "5s", svg: (
    <svg viewBox="0 0 48 48"><rect width="48" height="48" fill="#0a66c2"/><text x="24" y="33" fontSize="23" fontWeight="700" fill="#fff" textAnchor="middle" fontFamily="Arial,sans-serif">in</text></svg>) },
];

function CountUp({ to, decimals = 0, prefix = "", suffix = "", delay = 700 }) {
  const [v, setV] = useState(0);
  useEffect(() => {
    let raf;
    const timer = setTimeout(() => {
      const t0 = performance.now();
      const tick = (t) => {
        const p = Math.min((t - t0) / 1800, 1);
        setV(to * (1 - Math.pow(1 - p, 3)));
        if (p < 1) raf = requestAnimationFrame(tick);
      };
      raf = requestAnimationFrame(tick);
    }, delay);
    return () => { clearTimeout(timer); cancelAnimationFrame(raf); };
  }, [to, delay]);
  return <>{prefix}{v.toFixed(decimals)}{suffix}</>;
}

function HeroFX() {
  const Spark = () => <svg className="spark" viewBox="0 0 46 22"><path d="M2 19 L12 12 L20 15 L32 6 L44 2" /></svg>;
  return (
    <div className="fx" aria-hidden="true">
      {/* Website Traffic */}
      <div className="fcard" style={{ left: "40%", top: "5%", "--d": ".2s", "--t": "6s" }}>
        <div className="fi">📈</div><div><small>Website Traffic</small><b><CountUp to={248} prefix="+" suffix="%" /></b></div><Spark />
      </div>
      {/* Leads Generated */}
      <div className="fcard" style={{ right: "15%", top: "4%", "--d": ".4s", "--t": "5.5s" }}>
        <div className="fi">👥</div><div><small>Leads Generated</small><b><CountUp to={320} prefix="+" suffix="%" /></b></div><Spark />
      </div>
      {/* Revenue Growth */}
      <div className="fcard" style={{ right: "6%", top: "21%", "--d": ".6s", "--t": "6.5s" }}>
        <div className="fi">💰</div><div><small>Revenue Growth</small><b><CountUp to={4.8} decimals={1} prefix="+" suffix="%" /></b></div><Spark />
      </div>
      {SOCIALS.map((x) => (
        <div key={x.k} className="soc" style={{ left: x.l, top: x.t, "--d": x.d, "--t": x.tt }}>{x.svg}</div>
      ))}
      {/* Video replaces the old "AI" badge */}
      <video className="ai" src={AI_VIDEO} autoPlay loop muted playsInline onError={(e) => { e.currentTarget.style.display = "none"; }} style={{ right: "3%", top: "42%", "--d": "1.5s", "--t": "7s" }} />
      {/* Handwritten notes */}
      <div className="note" style={{ left: "33%", top: "20%", "--d": "1.7s", "--t": "6s" }}>Strategy<br />+<br />Creativity<br />=<br /><em>Growth</em></div>
      <div className="note" style={{ left: "78%", top: "45%", "--d": "1.9s", "--t": "6.5s" }}>Smarter Marketing<br /><em>Better Results</em></div>
    </div>
  );
}

// Section ids in page order (used to highlight the nav link of the section you are in)
const SECTION_IDS = ["top", "about", "services", "portfolio", "results", "process", "reviews", "cta", "contact"];

export default function App() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("top");
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [form, setForm] = useState({ name: "", email: "", phone: "", service: "Digital Marketing", message: "", _gotcha: "" });

  useEffect(() => {
    const f = () => {
      setScrolled(window.scrollY > 10);
      // the last section whose top has passed just under the sticky header
      let cur = "top";
      for (const id of SECTION_IDS) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= 120) cur = id;
      }
      // short last section: when the page bottom is reached, Contact is active
      if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4) cur = "contact";
      setActive(cur);
    };
    f();
    window.addEventListener("scroll", f, { passive: true });
    window.addEventListener("resize", f);
    return () => {
      window.removeEventListener("scroll", f);
      window.removeEventListener("resize", f);
    };
  }, []);

  // Home: do nothing if already at the top, otherwise scroll smoothly to the very top
  const goHome = (e) => {
    e.preventDefault();
    if (window.scrollY > 0) window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const change = (e) => setForm({ ...form, [e.target.name]: e.target.value });
  const submit = async (e) => {
    e.preventDefault();
    if (form._gotcha) return; // bot trap
    setLoading(true); setError("");
    try {
      const res = await fetch(FORM_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(form),
      });
      res.ok ? setSent(true) : setError("Something went wrong. Please email us directly.");
    } catch { setError("Network error. Please try again."); }
    setLoading(false);
  };

  // [label, section id]
  const nav = [["About", "about"], ["Services", "services"], ["Portfolio", "portfolio"], ["Contact", "contact"], ["Reviews", "reviews"]];
  const ticker = [...services, ...services].map((s, i) => <span key={i}>✦ {s.title}</span>);

  return (
    <>
      <header className={scrolled ? "scrolled" : ""}>
        <div className="container nav">
          <a href="#top" onClick={goHome} className="logo" aria-label={BRAND}><img src={LOGO} alt="" /><span className="divider"></span><span className="lockup"><span className="word">{BRAND}</span><span className="tagline">DIGITAL MARKETING</span></span></a>
          <nav className={"links" + (open ? " open" : "")} onClick={() => setOpen(false)}>
            <a href="#top" onClick={goHome} className={active === "top" ? "active" : ""} aria-current={active === "top" ? "page" : undefined}>Home</a>
            {nav.map(([t, id]) => (
              <a key={id} href={`#${id}`} className={active === id ? "active" : ""} aria-current={active === id ? "page" : undefined}>{t}</a>
            ))}
            <a href="#contact" className="btn nav-cta">Let's Grow Together →</a>
          </nav>
          <button className="menu" onClick={() => setOpen(!open)} aria-label="Menu">{open ? "✕" : "☰"}</button>
        </div>
      </header>

      <section className="hero" id="top">
        <div className="container">
          <div className="hero-grid">
            {/* LEFT HALF: text */}
            <div className="hero-copy">
              <span className="pill">🚀 Helping brands grow smarter, faster and stronger</span>
              <h1>We Turn Clicks Into <em>Smart Ideas For Your Brands</em></h1>
              <p>SEO, social media and performance ads, planned simply and measured clearly. Get more leads without the guesswork.</p>
              <div className="row">
                <a href="#contact" className="btn">Unlock Your Growth</a>
                <a href="#services" className="btn ghost">Our Services</a>
              </div>
              <div className="hero-stats">
                <div><b>+250%</b><span>Organic traffic</span></div>
                <div><b>3x</b><span>More leads</span></div>
                <div><b>4.9 ★</b><span>Client rating</span></div>
              </div>
            </div>

            {/* RIGHT HALF: bigger image + small animated overlay */}
            <div className="hero-media">
              <img src={HERO_IMG} alt="Digital marketing professional working on a laptop" />
              <HeroFX />
            </div>
          </div>
        </div>
      </section>

      <div className="marquee"><div>{ticker}{ticker}</div></div>

      <section className="about" id="about">
        <div className="container">
          <Reveal>
            <div className="tag">About Us</div>
            <h2>Shaping The Future Of Digital Growth</h2>
            <p className="txt">Based in Bangalore and serving businesses to increase their visibility, we help brands grow faster through SEO, performance marketing, social media, branding, content, websites and intelligent automation. Every strategy is designed to drive visibility, generate leads and deliver measurable business results.</p>
          </Reveal>
        </div>
      </section>

      <section id="services">
        <div className="container">
          <Reveal><div className="tag">What we do</div><h2>Services Built For Growth</h2>
            <p className="sub">Everything You Need To Get Found Online and Turn Visitors Into Customers.</p></Reveal>
          <div className="grid g4">
            {services.map((s) => (
              <Reveal key={s.title}><div className="work">
                <div className="ic">{s.icon}</div><span>Service</span><h3>{s.title}</h3><p>{s.text}</p>
              </div></Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="alt" id="portfolio">
        <div className="container">
          <Reveal><div className="tag">Portfolio</div><h2>Our Recent Work</h2>
            <p className="sub">A Glimpse Of The Creatives, Campaigns and Designs We Have Delivered.</p></Reveal>
          <Reveal><PortfolioCarousel items={portfolio} /></Reveal>
        </div>
      </section>

      <section className="results" id="results">
        <div className="container rgrid">
          {results.map((r) => <div key={r.label}><Counter to={r.n} suffix={r.suffix} /><span>{r.label}</span></div>)}
        </div>
      </section>

      <section id="process">
        <div className="container">
          <Reveal><div className="tag">How We Work</div><h2>A Simple 4-Step Process</h2>
            <p className="sub">No Confusing Jargon. Just A Clear Plan and Steady Results.</p></Reveal>
          <div className="grid g4">
            {steps.map((s) => (
              <Reveal key={s.n}><div className="card step"><b>{s.n}</b><h3>{s.title}</h3><p>{s.text}</p></div></Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="alt" id="reviews">
        <div className="container">
          <Reveal><div className="tag">Testimonials</div><h2>What Clients Say</h2>
            <p className="sub">Add Real Reviews Once You Have Your First Clients.</p></Reveal>
          <div className="grid g3">
            {testimonials.map((t, i) => (
              <Reveal key={i}><div className="card review">
                {t.sample && <span className="sample">Sample</span>}
                <div className="stars">★★★★★</div><p>“{t.text}”</p>
                <div className="who">
                  <div className="avatar">{t.name.split(" ").map((w) => w[0]).join("").slice(0, 2)}</div>
                  <div><h3>{t.name}</h3><small>{t.role}</small></div>
                </div>
              </div></Reveal>
            ))}
          </div>
        </div>
      </section>

      <section id="cta" style={{ paddingBottom: 0 }}>
        <div className="container"><Reveal><div className="cta">
          <h2>Ready to grow your business?</h2>
          <p>Get A Free Marketing Plan Tailored To Your Goals. No Obligation.</p>
          <a href="#contact" className="btn">Get My Free Plan</a>
        </div></Reveal></div>
      </section>

      <section id="contact">
        <div className="container contact">
          <div className="info">
            <div className="tag">Contact</div>
            <h2>Let's Talk About Your Goals</h2>
            <p>Tell Us About Your Project and We'll Reply Within 24 Hours.</p>
            <p>📧 {EMAIL}</p><p>📞 {PHONE}</p>
          </div>
          {sent ? (
            <div className="ok">✅ Thanks {form.name}! We've Received Your Message And Will Reply Soon.</div>
          ) : (
            <form onSubmit={submit}>
              <input name="name" placeholder="Your name" required value={form.name} onChange={change} />
              <input name="email" type="email" placeholder="Email address" required value={form.email} onChange={change} />
              <input name="phone" type="tel" placeholder="Phone (optional)" value={form.phone} onChange={change} />
              <select name="service" value={form.service} onChange={change}>
                {services.map((s) => <option key={s.title}>{s.title}</option>)}
              </select>
              <textarea name="message" rows="4" placeholder="Tell us about your goals" value={form.message} onChange={change} />
              <input className="hp" name="_gotcha" tabIndex="-1" autoComplete="off" value={form._gotcha} onChange={change} />
              {error && <div className="err">{error}</div>}
              <button className="btn" type="submit" disabled={loading}>{loading ? "Sending..." : "Send Message"}</button>
            </form>
          )}
        </div>
      </section>

      <footer>
        <div className="container foot">
          <span>© {new Date().getFullYear()} {BRAND}. All Rights Reserved.</span>
          <span>{EMAIL}</span>
        </div>
      </footer>

      <a className="wa" href={`https://wa.me/${WHATSAPP}`} target="_blank" rel="noreferrer" aria-label="WhatsApp">💬</a>
    </>
  );
}