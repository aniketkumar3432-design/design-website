import { useState, useEffect, useRef } from "react";

// ====== EDIT YOUR DETAILS HERE ======
const BRAND = "ACTIVACORE";
const EMAIL = "harikothapalli22@gmail.com";
const PHONE = "+91 9000875176";
const WHATSAPP = "+919000875176"; 
const FORM_URL = "https://formspree.io/f/YOUR_FORM_ID";

const services = [
 {
    icon: "🎨",
    title: "Social Media Design",
    text: "Eye-catching social media creatives that strengthen your brand and engage your audience."
  },
 {
    icon: "🎯",
    title: "Meta & Google Ads",
    text: "Targeted ad campaigns designed to reach the right audience, generate leads, and drive sales."
  },
  {
    icon: "✨",
    title: "Logo Design",
    text: "Unique and memorable logos that reflect your brand identity and make a lasting impression."
  },
  {
    icon: "🖼️",
    title: "Banner & Poster Design",
    text: "Creative banners and posters that grab attention and communicate your message effectively."
  },
  {
    icon: "📄",
    title: "Flyer Design",
    text: "Professional flyers that promote your products, services, events, and special offers."
  },
  {
    icon: "📘",
    title: "Brochure Design",
    text: "Well-designed brochures that showcase your business and present your services beautifully."
  },
  {
    icon: "📚",
    title: "Catalog Design",
    text: "Organized, visually appealing catalogs that highlight your products and make them stand out."
  },
  {
    icon: "💻",
    title: "Website & App Design",
    text: "Modern, user-friendly website and app designs that deliver seamless digital experiences."
  },
];
const steps = [
  { n: "01", title: "Discover", text: "We learn your business, audience and goals." },
  { n: "02", title: "Strategy", text: "A clear plan with channels, content and budget." },
  { n: "03", title: "Execute", text: "We launch campaigns and content on schedule." },
  { n: "04", title: "Optimize", text: "We track results and improve every month." },
];
const results = [
  { n: 250, suffix: "%", label: "Avg. traffic growth" },
  { n: 3, suffix: "x", label: "More qualified leads" },
  { n: 50, suffix: "+", label: "Projects delivered" },
  { n: 95, suffix: "%", label: "Client retention" },
];
const plans = [
  { name: "Starter", price: "₹15,000", items: ["Social media (2 platforms)", "12 posts / month", "Monthly report"] },
  { name: "Growth", price: "₹35,000", featured: true, items: ["SEO + Social media", "Google / Meta ads management", "Weekly reporting", "Dedicated manager"] },
  { name: "Scale", price: "Custom", items: ["Full-funnel marketing", "Website + automation", "Priority support"] },
];
const testimonials = [
  { name: "Client Name", role: "Founder, Brand", text: "Replace with a real review. Short and specific works best." },
  { name: "Client Name", role: "Owner, Business", text: "Replace with a real review. Mention real results if possible." },
  { name: "Client Name", role: "CEO, Company", text: "Replace with a real review. Add client photos later." },
];
const faqs = [
  { q: "How soon will I see results?", a: "Ads can bring leads within days. SEO and organic growth usually take 3 to 6 months to build." },
  { q: "Do I need a long-term contract?", a: "No. Our plans are monthly and you can pause or cancel anytime." },
  { q: "Do you work with small businesses?", a: "Yes. Startups and local businesses are our main focus." },
  { q: "How will I know what's happening?", a: "You get a clear report every month, and weekly updates on the Growth plan." },
];

const css = `
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');
:root{--blue:#2563eb;--blue2:#1e40af;--dark:#0b1220;--text:#1f2937;--muted:#64748b;--bg:#f8fafc;--line:#e5e7eb}
*{box-sizing:border-box;margin:0;padding:0}
html{scroll-behavior:smooth}
body{font-family:Inter,system-ui,sans-serif;color:var(--text);background:#fff;line-height:1.6}
.container{max-width:1100px;margin:0 auto;padding:0 20px}
a{text-decoration:none;color:inherit}
header{position:sticky;top:0;z-index:20;background:rgba(255,255,255,.92);backdrop-filter:blur(10px);transition:.3s}
header.scrolled{box-shadow:0 4px 20px rgba(0,0,0,.07)}
.nav{display:flex;align-items:center;justify-content:space-between;height:68px}
.logo{font-weight:800;font-size:1.35rem;color:var(--dark)}.logo span{color:var(--blue)}
.links{display:flex;gap:28px;align-items:center}
.links a:not(.btn){font-size:.95rem;color:var(--muted);transition:.2s}.links a:not(.btn):hover{color:var(--blue)}
.btn{display:inline-block;background:var(--blue);color:#fff!important;padding:12px 26px;border-radius:10px;font-weight:600;border:0;cursor:pointer;font-size:1rem;transition:.2s}
.btn:hover{background:var(--blue2);transform:translateY(-2px);box-shadow:0 8px 20px rgba(37,99,235,.3)}
.btn.ghost{background:transparent;color:var(--blue)!important;border:1.5px solid var(--blue)}
.btn.ghost:hover{background:var(--blue);color:#fff!important}
.btn:disabled{opacity:.6;cursor:wait}
.menu{display:none;background:none;border:0;font-size:1.6rem;cursor:pointer}
.hero{position:relative;overflow:hidden;background:radial-gradient(circle at 80% 20%,#2563eb55,transparent 45%),linear-gradient(135deg,#0b1220,#172554);color:#fff;padding:110px 0 100px}
.hero-grid{display:grid;grid-template-columns:1.2fr .8fr;gap:40px;align-items:center}
.pill{display:inline-block;background:#ffffff1a;border:1px solid #ffffff33;padding:6px 16px;border-radius:99px;font-size:.85rem;margin-bottom:20px}
.hero h1{font-size:clamp(2.2rem,5vw,3.6rem);line-height:1.12;font-weight:800}
.hero h1 em{font-style:normal;background:linear-gradient(90deg,#60a5fa,#a5b4fc);-webkit-background-clip:text;background-clip:text;color:transparent}
.hero p{margin:20px 0 32px;max-width:520px;color:#cbd5e1;font-size:1.1rem}
.row{display:flex;gap:14px;flex-wrap:wrap}
.hero .btn.ghost{color:#fff!important;border-color:#ffffff88}
.hero .btn.ghost:hover{background:#fff;color:var(--dark)!important}
.visual{position:relative;height:320px}
.fcard{position:absolute;background:#ffffff14;border:1px solid #ffffff2e;backdrop-filter:blur(10px);border-radius:16px;padding:18px 22px;animation:float 5s ease-in-out infinite}
.fcard b{display:block;font-size:1.7rem}.fcard span{font-size:.85rem;color:#cbd5e1}
.fc1{top:10px;left:10px}.fc2{top:120px;right:0;animation-delay:1s}.fc3{bottom:0;left:40px;animation-delay:2s}
@keyframes float{50%{transform:translateY(-14px)}}
.marquee{background:var(--dark);color:#94a3b8;overflow:hidden;white-space:nowrap;padding:16px 0;font-weight:600;font-size:.9rem}
.marquee div{display:inline-block;animation:scroll 25s linear infinite}
.marquee span{margin:0 28px}
@keyframes scroll{to{transform:translateX(-50%)}}
section{padding:90px 0}.alt{background:var(--bg)}
.tag{color:var(--blue);font-weight:700;font-size:.82rem;letter-spacing:.1em;text-transform:uppercase}
h2{font-size:clamp(1.7rem,3.5vw,2.4rem);margin:8px 0 12px;color:var(--dark);line-height:1.2}
.sub{color:var(--muted);max-width:560px;margin-bottom:44px}
.grid{display:grid;gap:22px}
.g3{grid-template-columns:repeat(auto-fit,minmax(290px,1fr))}
.g4{grid-template-columns:repeat(auto-fit,minmax(220px,1fr))}
.card{position:relative;background:#fff;border:1px solid var(--line);border-radius:16px;padding:30px;transition:.25s}
.card:hover{transform:translateY(-6px);box-shadow:0 16px 36px rgba(15,23,42,.1);border-color:#bfdbfe}
.icon{width:52px;height:52px;display:grid;place-items:center;font-size:1.5rem;background:#eff6ff;border-radius:12px;margin-bottom:16px}
.card h3{margin-bottom:6px;color:var(--dark)}.card p{color:var(--muted);font-size:.96rem}
.step b{font-size:2.2rem;color:#bfdbfe;font-weight:800}
.results{background:linear-gradient(135deg,var(--blue),#4f46e5);color:#fff;padding:70px 0}
.rgrid{display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:30px;text-align:center}
.rgrid b{font-size:2.8rem;font-weight:800;display:block}.rgrid span{opacity:.85}
.price{font-size:2.2rem;font-weight:800;color:var(--dark);margin:8px 0 16px}
.price small{font-size:.9rem;color:var(--muted);font-weight:400}
.card ul{list-style:none;margin-bottom:24px}.card li{padding:5px 0;color:var(--muted)}.card li:before{content:"✓  ";color:var(--blue);font-weight:700}
.featured{border:2px solid var(--blue);box-shadow:0 16px 40px rgba(37,99,235,.15)}
.badge{position:absolute;top:-13px;right:22px;background:var(--blue);color:#fff;font-size:.75rem;padding:4px 14px;border-radius:99px;font-weight:600}
.stars{color:#f59e0b;margin-bottom:10px}
.faq{max-width:760px}
.fq{border:1px solid var(--line);border-radius:12px;margin-bottom:12px;background:#fff;overflow:hidden}
.fq button{width:100%;text-align:left;background:none;border:0;padding:18px 22px;font:inherit;font-weight:600;color:var(--dark);cursor:pointer;display:flex;justify-content:space-between}
.fq p{padding:0 22px;color:var(--muted);max-height:0;overflow:hidden;transition:.3s}
.fq.open p{max-height:140px;padding-bottom:18px}
.cta{background:var(--dark);color:#fff;text-align:center;border-radius:24px;padding:60px 24px}
.cta h2{color:#fff}.cta p{color:#94a3b8;margin:0 auto 26px;max-width:480px}
.contact{display:grid;grid-template-columns:1fr 1fr;gap:50px}
.info p{margin:8px 0;color:var(--muted)}
form{display:grid;gap:14px;background:#fff;border:1px solid var(--line);padding:28px;border-radius:16px;box-shadow:0 10px 30px rgba(0,0,0,.05)}
input,textarea,select{padding:13px 14px;border:1px solid var(--line);border-radius:10px;font:inherit;width:100%;background:#fff}
input:focus,textarea:focus,select:focus{outline:2px solid var(--blue);border-color:transparent}
.hp{position:absolute;left:-9999px}
.ok{background:#dcfce7;color:#166534;padding:22px;border-radius:12px;font-weight:600}
.err{color:#b91c1c;font-size:.9rem}
footer{background:var(--dark);color:#94a3b8;padding:36px 0;font-size:.9rem}
.foot{display:flex;justify-content:space-between;flex-wrap:wrap;gap:12px}
.wa{position:fixed;right:20px;bottom:20px;width:56px;height:56px;border-radius:50%;background:#25d366;display:grid;place-items:center;font-size:1.7rem;box-shadow:0 8px 24px rgba(0,0,0,.25);z-index:30;transition:.2s}
.wa:hover{transform:scale(1.1)}
.rv{opacity:0;transform:translateY(28px);transition:opacity .7s,transform .7s}.rv.in{opacity:1;transform:none}
@media(max-width:800px){
 .menu{display:block}
 .links{display:none;position:absolute;top:68px;left:0;right:0;background:#fff;flex-direction:column;padding:22px;border-bottom:1px solid var(--line)}
 .links.open{display:flex}
 .hero-grid,.contact{grid-template-columns:1fr}.visual{display:none}
 .hero{padding:70px 0}section{padding:64px 0}
}`;

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

export default function App() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [faq, setFaq] = useState(0);
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [form, setForm] = useState({ name: "", email: "", phone: "", service: "SEO", message: "", _gotcha: "" });

  useEffect(() => {
    const f = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", f);
    return () => window.removeEventListener("scroll", f);
  }, []);

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

  const nav = [["Services", "#services"], ["Process", "#process"], ["Pricing", "#pricing"], ["FAQ", "#faq"]];
  const ticker = [...services, ...services].map((s, i) => <span key={i}>✦ {s.title}</span>);

  return (
    <>
      <style>{css}</style>

      <header className={scrolled ? "scrolled" : ""}>
        <div className="container nav">
          <a href="#top" className="logo">{BRAND}<span>.</span></a>
          <nav className={"links" + (open ? " open" : "")} onClick={() => setOpen(false)}>
            {nav.map(([t, h]) => <a key={t} href={h}>{t}</a>)}
            <a href="#contact" className="btn">Get a Free Quote</a>
          </nav>
          <button className="menu" onClick={() => setOpen(!open)} aria-label="Menu">{open ? "✕" : "☰"}</button>
        </div>
      </header>

      <section className="hero" id="top" style={{ padding: "110px 0 100px" }}>
        <div className="container hero-grid">
          <div>
            <span className="pill">🚀 Digital marketing for growing brands</span>
            <h1>We turn clicks into <em>customers</em></h1>
            <p>SEO, social media and performance ads, planned simply and measured clearly. Get more leads without the guesswork.</p>
            <div className="row">
              <a href="#contact" className="btn">Book a Free Consultation</a>
              <a href="#services" className="btn ghost">Our Services</a>
            </div>
          </div>
          <div className="visual">
            <div className="fcard fc1"><b>+250%</b><span>Organic traffic</span></div>
            <div className="fcard fc2"><b>3x</b><span>More leads</span></div>
            <div className="fcard fc3"><b>4.9 ★</b><span>Client rating</span></div>
          </div>
        </div>
      </section>

      <div className="marquee"><div>{ticker}{ticker}</div></div>

      <section id="services">
        <div className="container">
          <Reveal><div className="tag">What we do</div><h2>Services built for growth</h2>
            <p className="sub">Everything you need to get found online and turn visitors into customers.</p></Reveal>
          <div className="grid g3">
            {services.map((s) => (
              <Reveal key={s.title}><div className="card">
                <div className="icon">{s.icon}</div><h3>{s.title}</h3><p>{s.text}</p>
              </div></Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="results">
        <div className="container rgrid">
          {results.map((r) => <div key={r.label}><Counter to={r.n} suffix={r.suffix} /><span>{r.label}</span></div>)}
        </div>
      </section>

      <section id="process">
        <div className="container">
          <Reveal><div className="tag">How we work</div><h2>A simple 4-step process</h2>
            <p className="sub">No confusing jargon. Just a clear plan and steady results.</p></Reveal>
          <div className="grid g4">
            {steps.map((s) => (
              <Reveal key={s.n}><div className="card step"><b>{s.n}</b><h3>{s.title}</h3><p>{s.text}</p></div></Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="alt" id="pricing">
        <div className="container">
          <Reveal><div className="tag">Pricing</div><h2>Transparent monthly packages</h2>
            <p className="sub">No long-term lock-in. Edit prices to match your offer.</p></Reveal>
          <div className="grid g3">
            {plans.map((p) => (
              <Reveal key={p.name}><div className={"card" + (p.featured ? " featured" : "")}>
                {p.featured && <span className="badge">Most popular</span>}
                <h3>{p.name}</h3>
                <div className="price">{p.price}{p.price !== "Custom" && <small>/mo</small>}</div>
                <ul>{p.items.map((i) => <li key={i}>{i}</li>)}</ul>
                <a href="#contact" className={"btn" + (p.featured ? "" : " ghost")}>Get Started</a>
              </div></Reveal>
            ))}
          </div>
        </div>
      </section>

      <section id="reviews">
        <div className="container">
          <Reveal><div className="tag">Testimonials</div><h2>What clients say</h2>
            <p className="sub">Add real reviews once you have your first clients.</p></Reveal>
          <div className="grid g3">
            {testimonials.map((t, i) => (
              <Reveal key={i}><div className="card">
                <div className="stars">★★★★★</div><p>“{t.text}”</p>
                <h3 style={{ marginTop: 14, fontSize: "1rem" }}>{t.name}</h3>
                <p style={{ fontSize: ".85rem" }}>{t.role}</p>
              </div></Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="alt" id="faq">
        <div className="container faq">
          <Reveal><div className="tag">FAQ</div><h2>Common questions</h2><p className="sub" style={{ marginBottom: 28 }}>Quick answers before you get in touch.</p></Reveal>
          {faqs.map((f, i) => (
            <div key={i} className={"fq" + (faq === i ? " open" : "")}>
              <button onClick={() => setFaq(faq === i ? -1 : i)}>{f.q}<span>{faq === i ? "−" : "+"}</span></button>
              <p>{f.a}</p>
            </div>
          ))}
        </div>
      </section>

      <section style={{ paddingBottom: 0 }}>
        <div className="container"><Reveal><div className="cta">
          <h2>Ready to grow your business?</h2>
          <p>Get a free marketing plan tailored to your goals. No obligation.</p>
          <a href="#contact" className="btn">Get My Free Plan</a>
        </div></Reveal></div>
      </section>

      <section id="contact">
        <div className="container contact">
          <div className="info">
            <div className="tag">Contact</div>
            <h2>Let's talk about your goals</h2>
            <p>Tell us about your project and we'll reply within 24 hours.</p>
            <p>📧 {EMAIL}</p><p>📞 {PHONE}</p>
          </div>
          {sent ? (
            <div className="ok">✅ Thanks {form.name}! We've received your message and will reply soon.</div>
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
          <span>© {new Date().getFullYear()} {BRAND}. All rights reserved.</span>
          <span>{EMAIL}</span>
        </div>
      </footer>

      <a className="wa" href={`https://wa.me/${WHATSAPP}`} target="_blank" rel="noreferrer" aria-label="WhatsApp">💬</a>
    </>
  );
}
