import { useState, useEffect, useRef } from "react";

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
// Selected portfolio projects from Hari_Designs.pdf
const portfolio = [
  {
    cat: "Healthcare Campaign",
    title: "Icon Hospital — Awareness Creative",
    text: "A healthcare awareness design combining clear messaging, medical imagery, and a recognizable orange-and-teal brand palette.",
    image: "/portfolio/icon-hospital-awareness.png",
    alt: "Icon Hospital breast cancer awareness campaign",
  },
  {
    cat: "Food & Beverage",
    title: "Appam House — Delivery Campaign",
    text: "A vibrant food promotion featuring appetizing visuals, delivery messaging, and a clear call to action to encourage online orders.",
    image: "/portfolio/appam-house-delivery.png",
    alt: "Appam House food delivery campaign",
  },
  {
    cat: "Restaurant Marketing",
    title: "Jamie's Burger — Order Online",
    text: "A high-contrast ordering campaign featuring a mobile mockup, burger imagery, and a delivery-focused message.",
    image: "/portfolio/jamies-burger-ordering.png",
    alt: "Jamie's Burger online ordering campaign",
  },
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
const testimonials = [
  { name: "Client Name", role: "Founder, Brand", text: "Replace with a real review. Short and specific works best." },
  { name: "Client Name", role: "Owner, Business", text: "Replace with a real review. Mention real results if possible." },
  { name: "Client Name", role: "CEO, Company", text: "Replace with a real review. Add client photos later." },
];

const css = `
@import url('https://fonts.googleapis.com/css2?family=Roboto+Condensed:wght@400;700&family=Caveat:wght@700&display=swap');
:root{
  --red:#dc2626;--red2:#b91c1c;--redsoft:#fef2f2;
  --ink:#0f172a;--text:#1e293b;--muted:#475569;
  --bg:#ffffff;--alt:#f8fafc;--line:#e2e8f0;
  --font:"Aptos Narrow","Aptos",Aptos-Narrow,"Roboto Condensed","Arial Narrow",system-ui,sans-serif;
}
*{box-sizing:border-box;margin:0;padding:0}
html{scroll-behavior:smooth}
body{font-family:var(--font);font-weight:700;color:var(--text);background:var(--bg);line-height:1.5;font-size:15px}
input,textarea,select,button{font-family:var(--font);font-weight:700}
.container{max-width:1160px;margin-left:30px;margin-right:30px;padding:0}
a{text-decoration:none;color:inherit}
section[id]{scroll-margin-top:65px}

/* Header */
header{position:sticky;top:0;z-index:20;background:rgba(255,255,255,.96);backdrop-filter:blur(10px);border-bottom:1px solid var(--line);transition:.3s}
header.scrolled{box-shadow:0 4px 18px rgba(15,23,42,.08)}
.nav{display:flex;align-items:center;justify-content:space-between;height:65px;max-width:none}
.logo{display:flex;align-items:center;gap:12px}
.logo img{width:42px;height:42px;border-radius:6px;display:block}
.divider{width:2px;height:42px;background:var(--red);display:block}
.lockup{display:flex;flex-direction:column;line-height:1}
.word{color:var(--red);font-size:1.4rem;letter-spacing:.01em}
.tagline{color:var(--ink);font-size:.65rem;letter-spacing:.22em;margin-top:6px}
.links{display:flex;gap:26px;align-items:center;font-size:.95rem}
.links a:not(.btn):hover{color:var(--red)}
.links a.active{color:var(--red);position:relative}
.links a.active::after{content:"";position:absolute;left:0;right:0;bottom:-8px;height:2px;background:var(--red)}
.btn{display:inline-block;background:var(--red);color:#fff!important;padding:8px 18px;border-radius:8px;border:1.5px solid var(--red);cursor:pointer;font-size:.9rem;transition:.2s}
.btn:hover{background:var(--red2);border-color:var(--red2);transform:translateY(-2px);box-shadow:0 8px 20px rgba(220,38,38,.28)}
.btn.ghost{background:#fff;color:var(--ink)!important;border:1.5px solid var(--ink)}
.btn.ghost:hover{background:var(--red2);color:#fff!important;border-color:var(--red2);box-shadow:0 8px 20px rgba(220,38,38,.2)}
.btn:disabled{opacity:.6;cursor:wait}
.menu{display:none;background:none;border:0;font-size:1.5rem;cursor:pointer;color:var(--ink)}
.btn:focus-visible,a:focus-visible,button:focus-visible{outline:3px solid #fca5a5;outline-offset:2px}

/* Hero: two halves. Left = text, right = BIGGER image */
section.hero{position:relative;background:#fff;padding:0;min-height:max(520px,31vw);display:flex;align-items:center;overflow:hidden}
.hero .container{position:static;flex:1;min-width:0;max-width:none;margin-right:0}
.hero-grid{display:block}
.hero-copy{position:relative;z-index:3;width:44%;max-width:640px;padding:30px 0}
.btn.nav-cta{padding:10px 22px;border-radius:99px;font-size:.9rem;box-shadow:0 8px 20px rgba(220,38,38,.25)}
.kicker{display:block;font-size:.8rem;letter-spacing:.3em;color:var(--ink);margin-bottom:14px}
.btn.big{padding:14px 26px;border-radius:99px;font-size:1rem;box-shadow:0 10px 24px rgba(220,38,38,.3)}
.watch{display:inline-flex;align-items:center;gap:12px;color:var(--ink);font-size:.95rem}
.watch i{width:46px;height:46px;border-radius:50%;background:#fff;box-shadow:0 6px 18px rgba(15,23,42,.15);display:grid;place-items:center;font-style:normal;font-size:1rem;color:var(--ink);transition:.2s}
.watch:hover i{transform:scale(1.08)}
.pill{display:inline-block;background:var(--redsoft);color:var(--red2);border:1px solid #fecaca;padding:5px 14px;border-radius:99px;font-size:.82rem;margin-bottom:14px}
.hero h1{font-size:clamp(2.1rem,3.8vw,3.5rem);line-height:1.04;color:var(--ink)}
.hero h1 span{display:block}
.hero h1 em{font-style:normal;color:var(--red)}
.hero p{margin:16px 0 24px;max-width:460px;color:var(--muted);font-size:1rem}
.row{display:flex;gap:12px;flex-wrap:wrap}
.hero-stats{display:flex;gap:30px;margin-top:30px;flex-wrap:wrap}
.hero-stats div b{display:block;font-size:1.4rem;color:var(--ink);line-height:1.1}
.hero-stats div span{font-size:.82rem;color:var(--muted)}

.hero-media{position:absolute;right:0;top:0;bottom:0;width:70%}
.hero-media>img{display:block;width:100%;height:100%;object-fit:cover;object-position:right bottom;-webkit-mask-image:linear-gradient(to right,transparent 0,#000 28%);mask-image:linear-gradient(to right,transparent 0,#000 28%)}
.note{font-family:"Caveat","Segoe Script","Comic Sans MS",cursive;font-weight:700;color:var(--ink);line-height:1.05;font-size:clamp(.95rem,1.6vw,1.45rem);text-align:left}
.note em{font-style:normal;color:var(--red);border-bottom:3px solid var(--red);border-radius:2px}

/* Hero animated overlay: small, tidy chips placed on empty areas of the image */
.fx{position:absolute;inset:0;z-index:1;pointer-events:none}
.fx>*{position:absolute;animation:fxIn .8s ease-out var(--d,0s) both,fxFloat var(--t,5s) ease-in-out calc(var(--d,0s) + .8s) infinite}
@keyframes fxIn{from{opacity:0;transform:translateY(16px) scale(.92)}to{opacity:1;transform:none}}
@keyframes fxFloat{0%,100%{transform:translateY(0)}50%{transform:translateY(-5px)}}
.fcard{display:flex;align-items:center;gap:7px;background:rgba(255,255,255,.95);border:1px solid #fff;border-radius:10px;padding:5px 10px 5px 6px;box-shadow:0 6px 16px rgba(15,23,42,.10);backdrop-filter:blur(6px)}
.fcard .fi{width:22px;height:22px;border-radius:7px;background:var(--redsoft);display:grid;place-items:center;font-size:.72rem}
.fcard small{display:block;font-size:.6rem;color:var(--muted);line-height:1.1}
.fcard b{font-size:.82rem;color:var(--ink);line-height:1.15}
.spark{width:26px;height:13px;margin-left:2px}
.spark path{fill:none;stroke:#16a34a;stroke-width:2.5;stroke-linecap:round;stroke-linejoin:round;stroke-dasharray:80;animation:draw 4s ease-in-out infinite}
@keyframes draw{0%{stroke-dashoffset:80}55%,100%{stroke-dashoffset:0}}
.soc{width:34px;height:30px;border-radius:10px;box-shadow:0 6px 14px rgba(15,23,42,.16);background:#fff}
.soc svg{width:100%;height:100%;display:block;border-radius:10px}
.ai{width:56px;height:56px;object-fit:cover;border-radius:14px;box-shadow:0 6px 14px rgba(15,23,42,.16)}
@media(max-width:900px){.fx{display:none}}
@media(prefers-reduced-motion:reduce){.fx>*,.fx *{animation:none!important}}

/* Marquee */
.marquee{background:var(--redsoft);color:var(--red2);overflow:hidden;white-space:nowrap;padding:12px 0;font-size:.85rem;border-top:1px solid #fecaca;border-bottom:1px solid #fecaca}
.marquee div{display:inline-block;animation:scroll 28s linear infinite}
.marquee span{margin:0 26px}
@keyframes scroll{to{transform:translateX(-50%)}}

/* Sections */
section{padding:76px 0}
.alt{background:var(--alt)}
.tag{color:var(--red);font-size:.8rem;letter-spacing:.08em;text-transform:uppercase}
h2{font-size:clamp(1.5rem,2.8vw,2rem);margin:8px 0 12px;color:var(--ink);line-height:1.15}
.sub{color:var(--muted);max-width:560px;margin-bottom:38px}
.grid{display:grid;gap:20px}
.g3{grid-template-columns:repeat(auto-fit,minmax(270px,1fr))}
.g4{grid-template-columns:repeat(auto-fit,minmax(220px,1fr))}
.card{position:relative;background:#fff;border:1px solid var(--line);border-radius:14px;padding:26px;transition:.25s;box-shadow:0 2px 10px rgba(15,23,42,.04)}
.card:hover{transform:translateY(-5px);box-shadow:0 16px 34px rgba(15,23,42,.1);border-color:var(--red)}
.card h3{margin-bottom:6px;color:var(--ink);font-size:1.05rem}
.card p{color:var(--muted);font-size:.92rem}
.step b{font-size:1.9rem;color:var(--red)}

/* About */
.about{background:linear-gradient(180deg,#fff,var(--alt))}
.about p.txt{color:var(--text);max-width:780px;font-size:1rem}

/* Service / portfolio cards */
.work{position:relative;min-height:210px;border-radius:14px;display:flex;flex-direction:column;justify-content:flex-end;padding:20px;border:1px solid var(--line);background:linear-gradient(160deg,#fff,var(--redsoft));transition:.25s;overflow:hidden;height:100%;box-shadow:0 2px 10px rgba(15,23,42,.04)}
.work:hover{transform:translateY(-5px);border-color:var(--red);box-shadow:0 16px 34px rgba(220,38,38,.15)}
.work .ic{position:absolute;top:16px;right:18px;font-size:2rem}
.work span{color:var(--red);font-size:.75rem;letter-spacing:.08em;text-transform:uppercase}
.work h3{color:var(--ink);margin-bottom:6px;font-size:1.05rem}
.work p{color:var(--muted);font-size:.88rem}

/* Portfolio cards */
.portfolio-card{height:100%;overflow:hidden;background:#fff;border:1px solid var(--line);border-radius:14px;box-shadow:0 2px 10px rgba(15,23,42,.04);transition:transform .25s,box-shadow .25s,border-color .25s}
.portfolio-card:hover{transform:translateY(-5px);border-color:var(--red);box-shadow:0 16px 34px rgba(220,38,38,.15)}
.portfolio-image{aspect-ratio:4/3;overflow:hidden;background:#f1f5f9}
.portfolio-image img{display:block;width:100%;height:100%;object-fit:cover;transition:transform .4s}
.portfolio-card:hover .portfolio-image img{transform:scale(1.04)}
.portfolio-copy{padding:20px}
.portfolio-copy>span{color:var(--red);font-size:.75rem;letter-spacing:.08em;text-transform:uppercase}
.portfolio-copy h3{color:var(--ink);font-size:1.05rem;margin:7px 0}
.portfolio-copy p{color:var(--muted);font-size:.88rem}

/* Results */
.results{background:linear-gradient(135deg,#dc2626,#b91c1c);color:#fff;padding:20px 0}
.rgrid{display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:30px;text-align:center}
.rgrid b{font-size:2.2rem;display:block}
.rgrid span{opacity:.92;font-size:.9rem}
.stars{color:#f59e0b;margin-bottom:10px}

/* CTA */
.cta{background:var(--redsoft);border:1px solid #fecaca;color:var(--ink);text-align:center;border-radius:20px;padding:50px 24px}
.cta p{color:var(--muted);margin:0 auto 22px;max-width:480px}

/* Contact */
.contact{display:grid;grid-template-columns:1fr 1fr;gap:50px}
.info p{margin:8px 0;color:var(--muted)}
form{display:grid;gap:12px;background:#fff;border:1px solid var(--line);padding:24px;border-radius:14px;box-shadow:0 10px 30px rgba(15,23,42,.06)}
input,textarea,select{padding:11px 13px;border:1px solid #cbd5e1;border-radius:8px;font-size:.92rem;width:100%;background:#fff;color:var(--ink)}
input::placeholder,textarea::placeholder{color:#94a3b8}
input:focus,textarea:focus,select:focus{outline:2px solid var(--red);border-color:transparent}
.hp{position:absolute;left:-9999px}
.ok{background:#dcfce7;color:#166534;padding:22px;border-radius:12px}
.err{color:var(--red2);font-size:.88rem}

/* Footer */
footer{background:var(--alt);border-top:1px solid var(--line);color:var(--muted);padding:30px 0;font-size:.85rem}
.foot{display:flex;justify-content:space-between;flex-wrap:wrap;gap:12px}
.wa{position:fixed;right:20px;bottom:20px;width:52px;height:52px;border-radius:50%;background:#25d366;display:grid;place-items:center;font-size:1.5rem;box-shadow:0 8px 24px rgba(0,0,0,.2);z-index:30;transition:.2s}
.wa:hover{transform:scale(1.1)}
.rv{opacity:0;transform:translateY(24px);transition:opacity .7s,transform .7s}
.rv.in{opacity:1;transform:none}
@media(prefers-reduced-motion:reduce){.rv{opacity:1;transform:none;transition:none}.marquee div{animation:none}}

/* Tablet & mobile */
@media(max-width:900px){
  section.hero{display:block;min-height:auto}
  .hero .container{margin-right:30px}
  .hero-copy{width:auto;max-width:none}
  .hero-media{position:relative;width:100%;height:auto}
  .hero-media>img{height:auto;-webkit-mask-image:none;mask-image:none}
}
@media(max-width:800px){
  .menu{display:block}
  .links{display:none;position:absolute;top:65px;left:0;right:0;background:#fff;flex-direction:column;padding:22px;border-bottom:1px solid var(--line);box-shadow:0 12px 24px rgba(15,23,42,.08)}
  .links.open{display:flex}
  .contact{grid-template-columns:1fr}
  .hero-stats{gap:24px;margin-top:24px}
  section{padding:56px 0}
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

// Social icons: small row on the empty left wall of the image, evenly spaced
const SOCIALS = [
  { k: "ig", l: "12%", t: "36%", d: ".5s", tt: "5s", svg: (
    <svg viewBox="0 0 48 48"><defs><linearGradient id="igrad" x1="0" y1="1" x2="1" y2="0"><stop offset="0" stopColor="#feda75"/><stop offset=".35" stopColor="#fa7e1e"/><stop offset=".6" stopColor="#d62976"/><stop offset="1" stopColor="#4f5bd5"/></linearGradient></defs><rect width="48" height="48" fill="url(#igrad)"/><rect x="12" y="12" width="24" height="24" rx="7" fill="none" stroke="#fff" strokeWidth="3"/><circle cx="24" cy="24" r="6" fill="none" stroke="#fff" strokeWidth="3"/><circle cx="31.5" cy="16.5" r="1.8" fill="#fff"/></svg>) },
  { k: "fb", l: "20%", t: "31%", d: ".7s", tt: "6s", svg: (
    <svg viewBox="0 0 48 48"><rect width="48" height="48" fill="#1877f2"/><path d="M26.5 40V26h4.6l.8-5.4h-5.4v-3.5c0-1.6.8-2.8 3-2.8h2.5V9.7c-.5-.1-2.2-.3-4-.3-4.2 0-6.9 2.5-6.9 7v4H16V26h4.1v14z" fill="#fff"/></svg>) },
  { k: "yt", l: "24%", t: "46%", d: ".9s", tt: "5.5s", svg: (
    <svg viewBox="0 0 48 48"><rect width="48" height="48" fill="#ff0000"/><polygon points="19,15 19,33 34,24" fill="#fff"/></svg>) },
  { k: "ads", l: "14%", t: "50%", d: "1.1s", tt: "6.5s", svg: (
    <svg viewBox="0 0 48 48"><rect width="48" height="48" fill="#fff"/><path d="M19 9 7 31l7 4 12-22z" fill="#fbbc04"/><path d="M29 9l12 22-7 4-12-22z" fill="#4285f4"/><circle cx="11" cy="37" r="5" fill="#34a853"/></svg>) },
  { k: "li", l: "21%", t: "62%", d: "1.3s", tt: "5s", svg: (
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
      {/* Top-left: Website Traffic */}
      <div className="fcard" style={{ left: "40%", top: "5%", "--d": ".2s", "--t": "6s" }}>
        <div className="fi">📈</div><div><small>Website Traffic</small><b><CountUp to={248} prefix="+" suffix="%" /></b></div><Spark />
      </div>
      {/* Top-middle/right, above the head: Leads Generated */}
      <div className="fcard" style={{ right: "15%", top: "4%", "--d": ".4s", "--t": "5.5s" }}>
        <div className="fi">👥</div><div><small>Leads Generated</small><b><CountUp to={320} prefix="+" suffix="%" /></b></div><Spark />
      </div>
      {/* Left, under Website Traffic: Revenue Growth */}
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

export default function App() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [form, setForm] = useState({ name: "", email: "", phone: "", service: "Digital Marketing", message: "", _gotcha: "" });

  useEffect(() => {
    const f = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", f);
    return () => window.removeEventListener("scroll", f);
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

  const nav = [ ["About", "#about"],["Services", "#services"], ["Portfolio", "#portfolio"], ["Contact", "#contact"],["Reviews", "#reviews"]];
  const ticker = [...services, ...services].map((s, i) => <span key={i}>✦ {s.title}</span>);

  return (
    <>
      <style>{css}</style>

      <header className={scrolled ? "scrolled" : ""}>
        <div className="container nav">
          <a href="#top" onClick={goHome} className="logo" aria-label={BRAND}><img src={LOGO} alt="" /><span className="divider"></span><span className="lockup"><span className="word">{BRAND}</span><span className="tagline">DIGITAL MARKETING</span></span></a>
          <nav className={"links" + (open ? " open" : "")} onClick={() => setOpen(false)}>
            <a href="#top" onClick={goHome} className="active">Home</a>
            {nav.map(([t, h]) => <a key={t} href={h}>{t}</a>)}
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
            <h2>Shaping the future of digital growth</h2>
            <p className="txt">Based in Bangalore and serving businesses to increase their visibility, we help brands grow faster through SEO, performance marketing, social media, branding, content, websites and intelligent automation. Every strategy is designed to drive visibility, generate leads and deliver measurable business results.</p>
          </Reveal>
        </div>
      </section>

      <section id="services">
        <div className="container">
          <Reveal><div className="tag">What we do</div><h2>Services built for growth</h2>
            <p className="sub">Everything you need to get found online and turn visitors into customers.</p></Reveal>
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
          <Reveal><div className="tag">Portfolio</div><h2>Our recent work</h2>
            <p className="sub">A glimpse of the creatives, campaigns and designs we have delivered.</p></Reveal>
          <div className="grid g3">
            {portfolio.map((p) => (
              <Reveal key={p.title}>
                <article className="portfolio-card">
                  <div className="portfolio-image">
                    <img src={p.image} alt={p.alt} loading="lazy" />
                  </div>
                  <div className="portfolio-copy">
                    <span>{p.cat}</span>
                    <h3>{p.title}</h3>
                    <p>{p.text}</p>
                  </div>
                </article>
              </Reveal>
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

      <section className="alt" id="reviews">
        <div className="container">
          <Reveal><div className="tag">Testimonials</div><h2>What clients say</h2>
            <p className="sub">Add real reviews once you have your first clients.</p></Reveal>
          <div className="grid g3">
            {testimonials.map((t, i) => (
              <Reveal key={i}><div className="card">
                <div className="stars">★★★★★</div><p>“{t.text}”</p>
                <h3 style={{ marginTop: 14, fontSize: ".95rem" }}>{t.name}</h3>
                <p style={{ fontSize: ".82rem" }}>{t.role}</p>
              </div></Reveal>
            ))}
          </div>
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