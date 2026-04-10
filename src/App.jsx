import { useState, useEffect, useRef } from "react";
// ─── DATA ──────────────────────────────────────────────────────────────────
const SKILLS = [
{ cat: "Programming", icon: "⌨️", items: [{ name: "SQL", pct: 92 }, { name: "Python (Pandas, NumPy)", pct: 82 }] },
{ cat: "Data Engineering", icon: "🔧", items: [{ name: "ETL / ELT Pipelines", pct: 88 }, { name: "Data Modeling", pct: 84 }, { name: "Data Reconciliation", pct: 90 }] },
{ cat: "Databases", icon: "🗄️", items: [{ name: "Oracle SQL", pct: 91 }, { name: "PostgreSQL", pct: 80 }, { name: "MySQL", pct: 78 }] },
{ cat: "Cloud", icon: "☁️", items: [{ name: "AWS", pct: 74 }, { name: "Azure", pct: 72 }, { name: "Oracle Cloud (OCI)", pct: 76 }] },
{ cat: "Tools & Platforms", icon: "🛠️", items: [{ name: "Oracle EBS / Financials", pct: 89 }, { name: "Oracle BI Publisher", pct: 78 }, { name: "Git / VS Code", pct: 82 }] },
];
const CERTS = [
{ name: "AWS Certified Cloud Practitioner", org: "Amazon Web Services", color: "#FF9900", icon: "☁️" },
{ name: "Azure Fundamentals", org: "Microsoft", color: "#0078D4", icon: "⬡" },
{ name: "Azure AI Fundamentals", org: "Microsoft", color: "#0078D4", icon: "🤖" },
{ name: "OCI AI Foundations Associate", org: "Oracle", color: "#C74634", icon: "🔴" },
{ name: "Oracle Financials – Certified Foundations", org: "Oracle", color: "#C74634", icon: "💹" },
{ name: "Oracle SCM – Certified Foundations", org: "Oracle", color: "#C74634", icon: "📦" },
{ name: "MTA: Python Programming", org: "Microsoft", color: "#0078D4", icon: "🐍" },
{ name: "Generative AI Fundamentals", org: "Oracle", color: "#C74634", icon: "✨" },
{ name: "Academic Process Mining", org: "Celonis", color: "#36BDBA", icon: "📊" },
{ name: "Business English Certificate", org: "Cambridge English", color: "#003B71", icon: "🎓" },
];
const PROJECTS = [
{
id: 1,
title: "Log Data ETL & Monitoring Pipeline",
tagline: "Production-grade log intelligence system",
emoji: "🔄",
accent: "#3B82F6",
problem: "Application and Oracle EBS log data was scattered and unstructured, making it nearly impossible to detect recurring failures or slow-running jobs in time.",
solution: "Built an automated Python-SQL ETL pipeline that extracts, transforms, and loads log data into structured MySQL tables with daily cron-based scheduling.",
impact: ["Reduced error detection time significantly", "Identified recurring failure patterns automatically", "Improved overall application health visibility"],
tech: ["Python", "SQL", "MySQL", "Oracle EBS", "Cron Jobs", "ETL"],
github: "#",
demo: "#",
},
{
id: 2,
title: "Stock Performance Analytics",
tagline: "High-performance market intelligence dashboard",
emoji: "📈",
accent: "#10B981",
problem: "Analyzing comparative stock performance across large time-series datasets was slow, manual, and lacked real-time KPI visibility.",
solution: "Engineered a PostgreSQL data warehouse with advanced indexing (BTREE/BRIN), automated REST API ingestion pipelines, and a Streamlit dashboard for live analytics.",
impact: ["Handled large-scale stock market time-series data", "Automated daily incremental updates via batch pipelines", "Enabled fast KPI dashboards with SQL views"],
tech: ["PostgreSQL", "Python", "Streamlit", "REST API", "SQL Window Functions", "CTEs"],
github: "#",
demo: "#",
},
];
const EXPERIENCE = [
{
role: "Data Engineer",
company: "Cognizant Technology Solutions",
period: "May 2024 – Present",
location: "Pune",
type: "Full-time",
color: "#3B82F6",
points: [
"Managed high-volume financial transaction data in Oracle EBS Financials production environment",
"Designed data quality validations for PAN, IFSC, and beneficiary bank details to reduce payment failures",
"Troubleshot production incidents related to data workflows, batch jobs, and approval processes",
"Optimized complex SQL queries for invoice, supplier, and payment data analysis",
"Executed bulk data migration with minimal business impact",
"Built structured reporting datasets for unpaid invoices, payment aging, and financial reconciliation",
],
},
{
role: "Data Engineer Trainee",
company: "Cognizant Technology Solutions",
period: "Jan 2024 – Apr 2024",
location: "Chennai",
type: "Trainee",
color: "#8B5CF6",
points: [
"Engineered staging tables, transformation logic, and validation rules for large-scale enterprise data migration",
"Performed data cleansing and standardization using Python (Pandas)",
"Developed optimized SQL reporting datasets for financial reporting and business intelligence",
"Designed ETL mappings to integrate data from multiple source systems into centralized platforms",
"Supported end-to-end data lifecycle: ingestion, validation, reporting, and reconciliation",
],
},
];
// ─── HOOKS ─────────────────────────────────────────────────────────────────
function useInView(ref, threshold = 0.15) {
const [visible, setVisible] = useState(false);
useEffect(() => {
if (!ref.current) return;
const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold });
obs.observe(ref.current);
return () => obs.disconnect();
}, [ref, threshold]);
return visible;
}
function useCounter(target, visible, duration = 1800) {
const [count, setCount] = useState(0);
useEffect(() => {
if (!visible) return;
let start = 0;
const step = target / (duration / 16);
const id = setInterval(() => {
start += step;
if (start >= target) { setCount(target); clearInterval(id); }
else setCount(Math.floor(start));
}, 16);
return () => clearInterval(id);
}, [visible, target, duration]);
return count;
}
// ─── COMPONENTS ────────────────────────────────────────────────────────────
function AnimBar({ pct, color, dark }) {
const ref = useRef();
const vis = useInView(ref, 0.3);
return (
<div ref={ref} style={{ background: dark ? "#1E293B" : "#E2E8F0", borderRadius: 99, height: 6, overflow: "hidden" }}>
<div style={{
height: "100%", borderRadius: 99,
background: `linear-gradient(90deg, ${color}, ${color}cc)`,
width: vis ? `${pct}%` : "0%",
transition: "width 1.2s cubic-bezier(.4,0,.2,1)",
boxShadow: `0 0 8px ${color}66`,
}} />
</div>
);
}
function StatCounter({ value, label, suffix = "", dark }) {
const ref = useRef();
const vis = useInView(ref);
const count = useCounter(value, vis);
return (
<div ref={ref} style={{ textAlign: "center" }}>
<div style={{ fontSize: "clamp(2rem,5vw,3.5rem)", fontFamily: "'Playfair Display', Georgia, serif", fontWeight: 700, color: "#3B82F6", lineHeight: 1 }}>
{count}{suffix}
</div>
<div style={{ fontSize: "0.8rem", letterSpacing: "0.1em", textTransform: "uppercase", color: dark ? "#94A3B8" : "#64748B", marginTop: 6 }}>{label}</div>
</div>
);
}
function ProjectModal({ p, onClose, dark }) {
useEffect(() => {
const handler = (e) => e.key === "Escape" && onClose();
document.addEventListener("keydown", handler);
return () => document.removeEventListener("keydown", handler);
}, [onClose]);
const bg = dark ? "#0F172A" : "#FFFFFF";
const text = dark ? "#E2E8F0" : "#1E293B";
const subtle = dark ? "#1E293B" : "#F1F5F9";
return (
<div onClick={onClose} style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.7)", backdropFilter: "blur(8px)", zIndex: 1000, display: "flex", alignItems: "center", justifyContent: "center", padding: "1rem" }}>
<div onClick={e => e.stopPropagation()} style={{ background: bg, borderRadius: 20, maxWidth: 640, width: "100%", padding: "2.5rem", position: "relative", boxShadow: `0 0 60px ${p.accent}33`, border: `1px solid ${p.accent}44`, maxHeight: "90vh", overflowY: "auto", color: text }}>
<button onClick={onClose} style={{ position: "absolute", top: 16, right: 16, background: subtle, border: "none", borderRadius: 8, width: 32, height: 32, cursor: "pointer", color: text, fontSize: "1.2rem", display: "flex", alignItems: "center", justifyContent: "center" }}>×</button>
<div style={{ fontSize: "2.5rem", marginBottom: "0.5rem" }}>{p.emoji}</div>
<h2 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: "1.6rem", marginBottom: 4 }}>{p.title}</h2>
<p style={{ color: p.accent, fontSize: "0.85rem", marginBottom: "1.5rem", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.08em" }}>{p.tagline}</p>
{[["🎯 Problem", p.problem], ["💡 Solution", p.solution]].map(([label, text]) => (
<div key={label} style={{ marginBottom: "1.2rem" }}>
<div style={{ fontWeight: 700, marginBottom: 6, color: p.accent }}>{label}</div>
<p style={{ lineHeight: 1.7, opacity: 0.9 }}>{text}</p>
</div>
))}
<div style={{ marginBottom: "1.2rem" }}>
<div style={{ fontWeight: 700, marginBottom: 8, color: p.accent }}>📊 Impact</div>
{p.impact.map((imp, i) => (
<div key={i} style={{ display: "flex", gap: 8, marginBottom: 6 }}>
<span style={{ color: p.accent, fontWeight: 700 }}>→</span>
<span style={{ opacity: 0.9 }}>{imp}</span>
</div>
))}
</div>
<div style={{ marginBottom: "2rem" }}>
<div style={{ fontWeight: 700, marginBottom: 10, color: p.accent }}>🛠️ Tech Stack</div>
<div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
{p.tech.map(t => (
<span key={t} style={{ background: `${p.accent}22`, color: p.accent, padding: "4px 12px", borderRadius: 99, fontSize: "0.8rem", fontWeight: 600, border: `1px solid ${p.accent}44` }}>{t}</span>
))}
</div>
</div>
<div style={{ display: "flex", gap: 12 }}>
<a href={p.github} style={{ flex: 1, background: p.accent, color: "#fff", textAlign: "center", padding: "10px 0", borderRadius: 10, textDecoration: "none", fontWeight: 700, fontSize: "0.9rem" }}>GitHub →</a>
<a href={p.demo} style={{ flex: 1, background: subtle, color: text, textAlign: "center", padding: "10px 0", borderRadius: 10, textDecoration: "none", fontWeight: 700, fontSize: "0.9rem", border: `1px solid ${dark ? "#334155" : "#E2E8F0"}` }}>Live Demo →</a>
</div>
</div>
</div>
);
}
// ─── MAIN EXPORT ──────────────────────────────────────────────────────────
export default function Portfolio() {
const [dark, setDark] = useState(true);
const [activeSection, setActiveSection] = useState("home");
const [projectFilter, setProjectFilter] = useState("All");
const [modalProject, setModalProject] = useState(null);
const [menuOpen, setMenuOpen] = useState(false);
const bg = dark ? "#050D1A" : "#F8FAFC";
const surface = dark ? "#0F172A" : "#FFFFFF";
const surface2 = dark ? "#1E293B" : "#F1F5F9";
const text = dark ? "#E2E8F0" : "#1E293B";
const subtle = dark ? "#94A3B8" : "#64748B";
const border = dark ? "#1E293B" : "#E2E8F0";
const accent = "#3B82F6";
const techTags = ["All", ...new Set(PROJECTS.flatMap(p => p.tech))];
const filtered = projectFilter === "All" ? PROJECTS : PROJECTS.filter(p => p.tech.includes(projectFilter));
const navLinks = ["Home", "About", "Experience", "Skills", "Projects", "Certifications", "Contact"];
const scrollTo = (id) => {
document.getElementById(id.toLowerCase())?.scrollIntoView({ behavior: "smooth" });
setMenuOpen(false);
};
// Scroll spy
useEffect(() => {
const handler = () => {
for (const id of navLinks.map(l => l.toLowerCase())) {
const el = document.getElementById(id);
if (!el) continue;
const rect = el.getBoundingClientRect();
if (rect.top <= 120 && rect.bottom > 120) { setActiveSection(id); break; }
}
};
window.addEventListener("scroll", handler);
return () => window.removeEventListener("scroll", handler);
}, []);
// ── Section refs for animation
const statsRef = useRef(); const statsVis = useInView(statsRef);
const sectionStyle = { padding: "5rem 0", transition: "background 0.3s" };
const container = { maxWidth: 1100, margin: "0 auto", padding: "0 1.5rem" };
const sectionTitle = {
fontFamily: "'Playfair Display', Georgia, serif",
fontSize: "clamp(2rem,4vw,2.8rem)",
fontWeight: 700, marginBottom: "0.5rem", color: text,
};
const sectionSub = { color: subtle, marginBottom: "3rem", fontSize: "1rem" };
return (
<div style={{ fontFamily: "'DM Sans', sans-serif", background: bg, color: text, transition: "background 0.4s, color 0.4s", overflowX: "hidden" }}>
<style>{`
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700;900&family=DM+Sans:wght@300;400;500;600;700&display=swap');
* { box-sizing: border-box; margin: 0; padding: 0; }
::-webkit-scrollbar { width: 6px; }
::-webkit-scrollbar-track { background: transparent; }
::-webkit-scrollbar-thumb { background: #3B82F6; border-radius: 99px; }
html { scroll-behavior: smooth; }
a { color: inherit; }
.fade-in { opacity: 0; transform: translateY(30px); animation: fadeUp 0.7s ease forwards; }
@keyframes fadeUp { to { opacity: 1; transform: translateY(0); } }
.hover-lift { transition: transform 0.25s, box-shadow 0.25s; }
.hover-lift:hover { transform: translateY(-4px); }
.nav-link:hover { color: #3B82F6 !important; }
.cert-card:hover { transform: translateY(-6px) scale(1.02); }
.cert-card { transition: transform 0.25s, box-shadow 0.25s; }
@keyframes float { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-12px)} }
@keyframes pulse-ring { 0%{transform:scale(1);opacity:0.6} 100%{transform:scale(1.8);opacity:0} }
@keyframes grid-move { 0%{transform:translateY(0)} 100%{transform:translateY(40px)} }
@keyframes shimmer { 0%{background-position:200% center} 100%{background-position:-200% center} }
.shimmer-text {
background: linear-gradient(90deg,#3B82F6,#60A5FA,#93C5FD,#3B82F6);
background-size: 200% auto;
-webkit-background-clip: text;
-webkit-text-fill-color: transparent;
animation: shimmer 3s linear infinite;
}
`}</style>
{/* ── NAV */}
<nav style={{
position: "fixed", top: 0, left: 0, right: 0, zIndex: 900,
background: dark ? "rgba(5,13,26,0.85)" : "rgba(248,250,252,0.85)",
backdropFilter: "blur(20px)",
borderBottom: `1px solid ${border}`,
transition: "background 0.4s",
}}>
<div style={{ ...container, display: "flex", alignItems: "center", justifyContent: "space-between", height: 64 }}>
<div style={{ fontFamily: "'Playfair Display', serif", fontWeight: 900, fontSize: "1.3rem", cursor: "pointer" }} onClick={() => scrollTo("home")}>
<span className="shimmer-text">AS</span>
</div>
{/* Desktop nav */}
<div style={{ display: "flex", gap: "2rem", alignItems: "center" }} className="desktop-nav">
{navLinks.map(l => (
<button key={l} className="nav-link" onClick={() => scrollTo(l)} style={{
background: "none", border: "none", cursor: "pointer",
fontSize: "0.85rem", fontWeight: 600, letterSpacing: "0.05em",
color: activeSection === l.toLowerCase() ? accent : subtle,
transition: "color 0.2s", fontFamily: "'DM Sans', sans-serif",
}}>{l}</button>
))}
<button onClick={() => setDark(d => !d)} style={{
background: surface2, border: `1px solid ${border}`, borderRadius: 8,
padding: "6px 12px", cursor: "pointer", fontSize: "1rem", color: text,
}}>{dark ? "☀️" : "🌙"}</button>
</div>
{/* Mobile hamburger */}
<div style={{ display: "flex", gap: 12, alignItems: "center" }}>
<button onClick={() => setDark(d => !d)} style={{ background: "none", border: "none", cursor: "pointer", fontSize: "1.2rem", display: "none" }} className="mobile-dark">{dark ? "☀️" : "🌙"}</button>
<button onClick={() => setMenuOpen(m => !m)} style={{ background: "none", border: "none", cursor: "pointer", color: text, fontSize: "1.5rem", display: "none" }} className="hamburger">☰</button>
</div>
</div>
{/* Mobile dropdown */}
{menuOpen && (
<div style={{ background: surface, padding: "1rem 1.5rem", borderTop: `1px solid ${border}` }}>
{navLinks.map(l => (
<button key={l} onClick={() => scrollTo(l)} style={{ display: "block", width: "100%", textAlign: "left", background: "none", border: "none", padding: "10px 0", cursor: "pointer", color: text, fontSize: "1rem", fontFamily: "'DM Sans', sans-serif" }}>{l}</button>
))}
</div>
)}
<style>{`
@media (max-width: 768px) {
.desktop-nav { display: none !important; }
.mobile-dark, .hamburger { display: flex !important; }
}
`}</style>
</nav>
{/* ── HERO */}
<section id="home" style={{ minHeight: "100vh", display: "flex", alignItems: "center", position: "relative", overflow: "hidden", paddingTop: 64 }}>
{/* Background grid */}
<div style={{ position: "absolute", inset: 0, opacity: dark ? 0.04 : 0.06, backgroundImage: `linear-gradient(${border} 1px, transparent 1px), linear-gradient(90deg, ${border} 1px, transparent 1px)`, backgroundSize: "60px 60px", animation: "grid-move 8s linear infinite" }} />
{/* Glows */}
<div style={{ position: "absolute", top: "20%", left: "10%", width: 400, height: 400, borderRadius: "50%", background: "rgba(59,130,246,0.12)", filter: "blur(80px)", animation: "float 6s ease-in-out infinite" }} />
<div style={{ position: "absolute", bottom: "15%", right: "5%", width: 300, height: 300, borderRadius: "50%", background: "rgba(139,92,246,0.1)", filter: "blur(60px)", animation: "float 8s ease-in-out infinite 2s" }} />
<div style={{ ...container, position: "relative", zIndex: 1 }}>
<div className="fade-in" style={{ animationDelay: "0.1s" }}>
<div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: `${accent}18`, border: `1px solid ${accent}44`, borderRadius: 99, padding: "6px 16px", marginBottom: "1.5rem" }}>
<span style={{ width: 8, height: 8, borderRadius: "50%", background: "#22C55E", boxShadow: "0 0 0 3px #22C55E33", animation: "pulse-ring 2s ease-out infinite", display: "inline-block" }} />
<span style={{ fontSize: "0.8rem", color: accent, fontWeight: 600 }}>Available for opportunities</span>
</div>
</div>
<h1 className="fade-in" style={{ animationDelay: "0.2s", fontFamily: "'Playfair Display', Georgia, serif", fontSize: "clamp(2.8rem,7vw,5.5rem)", fontWeight: 900, lineHeight: 1.05, marginBottom: "1rem", color: text }}>
Apoorva<br />
<span className="shimmer-text">Shrivastava</span>
</h1>
<div className="fade-in" style={{ animationDelay: "0.35s" }}>
<p style={{ fontSize: "clamp(1rem,2.5vw,1.4rem)", color: subtle, maxWidth: 560, lineHeight: 1.65, marginBottom: "2.5rem", fontWeight: 400 }}>
<span style={{ color: accent, fontWeight: 600 }}>Data Engineer</span> · Building reliable data pipelines & ensuring financial data integrity with Oracle EBS, SQL & cloud technologies
</p>
</div>
<div className="fade-in" style={{ animationDelay: "0.5s", display: "flex", gap: 12, flexWrap: "wrap" }}>
{[
{ label: "View Projects", action: () => scrollTo("projects"), primary: true },
{ label: "⬇ Resume", action: () => {}, primary: false },
{ label: "Contact Me", action: () => scrollTo("contact"), primary: false },
].map(btn => (
<button key={btn.label} onClick={btn.action} style={{
padding: "12px 24px", borderRadius: 10, fontWeight: 700, fontSize: "0.9rem",
cursor: "pointer", fontFamily: "'DM Sans', sans-serif",
background: btn.primary ? accent : "transparent",
color: btn.primary ? "#fff" : text,
border: `2px solid ${btn.primary ? accent : border}`,
transition: "all 0.2s",
}}
onMouseEnter={e => { if (!btn.primary) { e.target.style.borderColor = accent; e.target.style.color = accent; } else { e.target.style.opacity = "0.85"; } }}
onMouseLeave={e => { if (!btn.primary) { e.target.style.borderColor = border; e.target.style.color = text; } else { e.target.style.opacity = "1"; } }}
>{btn.label}</button>
))}
</div>
{/* Tech pills */}
<div className="fade-in" style={{ animationDelay: "0.65s", display: "flex", gap: 8, flexWrap: "wrap", marginTop: "3rem" }}>
{["Oracle EBS", "SQL", "Python", "ETL", "AWS", "Azure"].map(t => (
<span key={t} style={{ background: surface2, border: `1px solid ${border}`, borderRadius: 8, padding: "4px 12px", fontSize: "0.78rem", color: subtle, fontWeight: 500 }}>{t}</span>
))}
</div>
</div>
{/* Scroll indicator */}
<div style={{ position: "absolute", bottom: 32, left: "50%", transform: "translateX(-50%)", display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}>
<span style={{ fontSize: "0.7rem", letterSpacing: "0.15em", color: subtle, textTransform: "uppercase" }}>Scroll</span>
<div style={{ width: 1.5, height: 40, background: `linear-gradient(${accent}, transparent)` }} />
</div>
</section>
{/* ── STATS BAR */}
<div ref={statsRef} style={{ background: `linear-gradient(135deg, ${accent}, #8B5CF6)`, padding: "3rem 0" }}>
<div style={{ ...container, display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))", gap: "2rem" }}>
{[{ v: 2, s: "+", l: "Years Experience" }, { v: 10, s: "+", l: "Certifications" }, { v: 2, s: "", l: "Projects Built" }, { v: 100, s: "%", l: "Financial Data Focus" }].map(c => (
<StatCounter key={c.l} value={c.v} suffix={c.s} label={c.l} dark={true} />
))}
</div>
</div>
{/* ── ABOUT */}
<section id="about" style={{ ...sectionStyle, background: bg }}>
<div style={container}>
<p style={{ color: accent, fontWeight: 700, fontSize: "0.8rem", letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: 8 }}>About Me</p>
<h2 style={sectionTitle}>Turning raw data into<br /><span className="shimmer-text">reliable intelligence</span></h2>
<div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "3rem", alignItems: "start", marginTop: "3rem" }}>
<div>
<p style={{ color: subtle, lineHeight: 1.9, marginBottom: "1.5rem", fontSize: "1rem" }}>
I'm a Data Engineer with 2+ years of hands-on experience working with high-volume, production-scale financial data in Oracle EBS environments. My work sits at the intersection of data quality, systems reliability, and financial accuracy.
</p>
<p style={{ color: subtle, lineHeight: 1.9, fontSize: "1rem" }}>
From designing validation frameworks for PAN and IFSC data to building end-to-end ETL pipelines, I care deeply about ensuring every byte of data is trustworthy before it influences a business decision.
</p>
<div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginTop: "2rem" }}>
{[{ label: "Education", value: "B.Tech CS — ITM Gwalior" }, { label: "CGPA", value: "9.15 / 10.0" }, { label: "Currently at", value: "Cognizant" }, { label: "Domain", value: "Financial Data / P2P" }].map(item => (
<div key={item.label} style={{ background: surface2, borderRadius: 12, padding: "1rem", border: `1px solid ${border}` }}>
<div style={{ fontSize: "0.7rem", color: accent, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 4 }}>{item.label}</div>
<div style={{ fontWeight: 600, color: text, fontSize: "0.9rem" }}>{item.value}</div>
</div>
))}
</div>
</div>
<div style={{ display: "grid", gridTemplateColumns: "1fr", gap: 12 }}>
{[
{ icon: "🔍", title: "Data Quality & Validation", desc: "Designing frameworks to validate, cleanse, and standardize financial data at scale" },
{ icon: "🔄", title: "ETL Pipeline Engineering", desc: "Building robust, automated pipelines from ingestion through transformation to reporting" },
{ icon: "📊", title: "Financial Reconciliation", desc: "Ensuring accuracy across AP, P2P, invoice, and payment modules in Oracle EBS" },
{ icon: "🔧", title: "Root Cause Analysis", desc: "Diagnosing and resolving complex data workflow issues in production environments" },
].map(card => (
<div key={card.title} className="hover-lift" style={{ background: surface, border: `1px solid ${border}`, borderRadius: 14, padding: "1.2rem 1.5rem", display: "flex", gap: 14, alignItems: "flex-start" }}>
<span style={{ fontSize: "1.5rem", flexShrink: 0 }}>{card.icon}</span>
<div>
<div style={{ fontWeight: 700, marginBottom: 4, color: text }}>{card.title}</div>
<div style={{ fontSize: "0.85rem", color: subtle, lineHeight: 1.6 }}>{card.desc}</div>
</div>
</div>
))}
</div>
</div>
</div>
<style>{`@media(max-width:768px){#about .grid-2{grid-template-columns:1fr !important;}}`}</style>
</section>
{/* ── EXPERIENCE */}
<section id="experience" style={{ ...sectionStyle, background: dark ? "#080F1F" : "#F1F5F9" }}>
<div style={container}>
<p style={{ color: accent, fontWeight: 700, fontSize: "0.8rem", letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: 8 }}>Work History</p>
<h2 style={sectionTitle}>Experience</h2>
<p style={sectionSub}>My professional journey in data engineering</p>
<div style={{ position: "relative" }}>
<div style={{ position: "absolute", left: 20, top: 0, bottom: 0, width: 2, background: `linear-gradient(${accent}, #8B5CF6)`, borderRadius: 99 }} />
<div style={{ display: "flex", flexDirection: "column", gap: "2.5rem" }}>
{EXPERIENCE.map((exp, i) => (
<div key={i} style={{ paddingLeft: "3.5rem", position: "relative" }}>
<div style={{ position: "absolute", left: 11, top: 4, width: 20, height: 20, borderRadius: "50%", background: exp.color, border: `3px solid ${dark ? "#080F1F" : "#F1F5F9"}`, boxShadow: `0 0 0 4px ${exp.color}33` }} />
<div style={{ background: surface, border: `1px solid ${border}`, borderRadius: 16, padding: "1.8rem" }}>
<div style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 8, marginBottom: "1rem" }}>
<div>
<h3 style={{ fontWeight: 800, fontSize: "1.15rem", marginBottom: 2, color: text }}>{exp.role}</h3>
<div style={{ color: exp.color, fontWeight: 700, fontSize: "0.9rem" }}>{exp.company}</div>
</div>
<div style={{ textAlign: "right" }}>
<div style={{ background: `${exp.color}18`, color: exp.color, border: `1px solid ${exp.color}44`, borderRadius: 8, padding: "4px 12px", fontSize: "0.78rem", fontWeight: 700, display: "inline-block" }}>{exp.type}</div>
<div style={{ color: subtle, fontSize: "0.8rem", marginTop: 6 }}>{exp.period} · {exp.location}</div>
</div>
</div>
<ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 8 }}>
{exp.points.map((pt, j) => (
<li key={j} style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
<span style={{ color: exp.color, fontWeight: 900, flexShrink: 0, marginTop: 1 }}>→</span>
<span style={{ color: subtle, fontSize: "0.9rem", lineHeight: 1.65 }}>{pt}</span>
</li>
))}
</ul>
</div>
</div>
))}
{/* Education node */}
<div style={{ paddingLeft: "3.5rem", position: "relative" }}>
<div style={{ position: "absolute", left: 11, top: 4, width: 20, height: 20, borderRadius: "50%", background: "#10B981", border: `3px solid ${dark ? "#080F1F" : "#F1F5F9"}`, boxShadow: "0 0 0 4px #10B98133" }} />
<div style={{ background: surface, border: `1px solid ${border}`, borderRadius: 16, padding: "1.5rem" }}>
<div style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 8 }}>
<div>
<h3 style={{ fontWeight: 800, fontSize: "1.1rem", color: text }}>B.Tech — Computer Science</h3>
<div style={{ color: "#10B981", fontWeight: 700, fontSize: "0.9rem", marginTop: 2 }}>ITM Group of Institutions, Gwalior</div>
</div>
<div style={{ textAlign: "right" }}>
<div style={{ color: text, fontWeight: 800, fontSize: "1.1rem" }}>9.15</div>
<div style={{ color: subtle, fontSize: "0.8rem" }}>CGPA · 2019–2023</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</section>
{/* ── SKILLS */}
<section id="skills" style={{ ...sectionStyle, background: bg }}>
<div style={container}>
<p style={{ color: accent, fontWeight: 700, fontSize: "0.8rem", letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: 8 }}>Capabilities</p>
<h2 style={sectionTitle}>Skills & Expertise</h2>
<p style={sectionSub}>Technologies I work with professionally</p>
<div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "1.5rem" }}>
{SKILLS.map(cat => (
<div key={cat.cat} style={{ background: surface, border: `1px solid ${border}`, borderRadius: 16, padding: "1.8rem" }}>
<div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: "1.5rem" }}>
<span style={{ fontSize: "1.5rem" }}>{cat.icon}</span>
<h3 style={{ fontWeight: 800, color: text, fontSize: "1rem" }}>{cat.cat}</h3>
</div>
<div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
{cat.items.map(item => (
<div key={item.name}>
<div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6, fontSize: "0.85rem" }}>
<span style={{ color: text, fontWeight: 600 }}>{item.name}</span>
<span style={{ color: accent, fontWeight: 700 }}>{item.pct}%</span>
</div>
<AnimBar pct={item.pct} color={accent} dark={dark} />
</div>
))}
</div>
</div>
))}
</div>
</div>
</section>
{/* ── PROJECTS */}
<section id="projects" style={{ ...sectionStyle, background: dark ? "#080F1F" : "#F1F5F9" }}>
<div style={container}>
<p style={{ color: accent, fontWeight: 700, fontSize: "0.8rem", letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: 8 }}>Portfolio</p>
<h2 style={sectionTitle}>Featured Projects</h2>
<p style={sectionSub}>Real-world solutions built with production-grade engineering</p>
{/* Filter */}
<div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: "2.5rem" }}>
{techTags.slice(0, 10).map(t => (
<button key={t} onClick={() => setProjectFilter(t)} style={{
padding: "6px 16px", borderRadius: 99, fontSize: "0.8rem", fontWeight: 600, cursor: "pointer", fontFamily: "'DM Sans', sans-serif",
background: projectFilter === t ? accent : surface,
color: projectFilter === t ? "#fff" : subtle,
border: `1px solid ${projectFilter === t ? accent : border}`,
transition: "all 0.2s",
}}>{t}</button>
))}
</div>
<div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(340px, 1fr))", gap: "1.5rem" }}>
{filtered.map(p => (
<div key={p.id} className="hover-lift" onClick={() => setModalProject(p)} style={{
background: surface, border: `1px solid ${border}`, borderRadius: 20, padding: "2rem", cursor: "pointer",
position: "relative", overflow: "hidden",
}}>
<div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 3, background: `linear-gradient(90deg, ${p.accent}, ${p.accent}88)` }} />
<div style={{ fontSize: "2.5rem", marginBottom: "1rem" }}>{p.emoji}</div>
<h3 style={{ fontWeight: 800, fontSize: "1.15rem", color: text, marginBottom: 6 }}>{p.title}</h3>
<p style={{ color: p.accent, fontSize: "0.8rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "1rem" }}>{p.tagline}</p>
<p style={{ color: subtle, fontSize: "0.88rem", lineHeight: 1.7, marginBottom: "1.5rem" }}>{p.problem.slice(0, 120)}...</p>
<div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: "1.5rem" }}>
{p.tech.slice(0, 4).map(t => (
<span key={t} style={{ background: `${p.accent}18`, color: p.accent, padding: "3px 10px", borderRadius: 99, fontSize: "0.75rem", fontWeight: 600 }}>{t}</span>
))}
{p.tech.length > 4 && <span style={{ color: subtle, fontSize: "0.75rem", padding: "3px 8px" }}>+{p.tech.length - 4} more</span>}
</div>
<div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
<span style={{ color: accent, fontWeight: 700, fontSize: "0.85rem" }}>View Details →</span>
<div style={{ display: "flex", gap: 8 }}>
<span style={{ fontSize: "1.1rem" }}>🔗</span>
<span style={{ fontSize: "1.1rem" }}>🚀</span>
</div>
</div>
</div>
))}
</div>
</div>
</section>
{/* ── CERTIFICATIONS */}
<section id="certifications" style={{ ...sectionStyle, background: bg }}>
<div style={container}>
<p style={{ color: accent, fontWeight: 700, fontSize: "0.8rem", letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: 8 }}>Credentials</p>
<h2 style={sectionTitle}>Certifications</h2>
<p style={sectionSub}>Validated expertise across cloud, data, and AI platforms</p>
<div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))", gap: "1rem" }}>
{CERTS.map((cert, i) => (
<div key={i} className="cert-card" style={{
background: surface, border: `1px solid ${border}`, borderRadius: 14,
padding: "1.4rem", position: "relative", overflow: "hidden",
}}>
<div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 2, background: cert.color }} />
<div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: "0.8rem" }}>
<div style={{ width: 36, height: 36, borderRadius: 10, background: `${cert.color}20`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.2rem", border: `1px solid ${cert.color}44` }}>{cert.icon}</div>
<div style={{ fontSize: "0.7rem", fontWeight: 700, color: cert.color, textTransform: "uppercase", letterSpacing: "0.08em" }}>{cert.org}</div>
</div>
<h4 style={{ fontWeight: 700, fontSize: "0.88rem", color: text, lineHeight: 1.4 }}>{cert.name}</h4>
</div>
))}
</div>
</div>
</section>
{/* ── CURRENTLY WORKING ON */}
<section style={{ ...sectionStyle, background: dark ? "#080F1F" : "#F1F5F9" }}>
<div style={container}>
<div style={{ background: surface, border: `1px solid ${border}`, borderRadius: 20, padding: "2.5rem", display: "flex", flexWrap: "wrap", gap: "2rem", alignItems: "center", justifyContent: "space-between" }}>
<div>
<div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "#22C55E18", border: "1px solid #22C55E44", borderRadius: 99, padding: "5px 14px", marginBottom: "1rem" }}>
<span style={{ width: 7, height: 7, borderRadius: "50%", background: "#22C55E", display: "inline-block" }} />
<span style={{ fontSize: "0.75rem", color: "#22C55E", fontWeight: 700 }}>Currently Working On</span>
</div>
<h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.6rem", color: text, marginBottom: "0.5rem" }}>Expanding into Prompt Engineering</h3>
<p style={{ color: subtle, lineHeight: 1.7, maxWidth: 500 }}>Actively learning prompt engineering patterns and how to leverage Generative AI tools in data engineering workflows — bridging classical ETL with modern LLM capabilities.</p>
</div>
<div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
{["Prompt Engineering", "Generative AI Integration", "LLM-assisted Data Pipelines"].map(t => (
<div key={t} style={{ display: "flex", alignItems: "center", gap: 10 }}>
<span style={{ color: accent, fontWeight: 900 }}>▸</span>
<span style={{ color: text, fontWeight: 600, fontSize: "0.9rem" }}>{t}</span>
</div>
))}
</div>
</div>
</div>
</section>
{/* ── CONTACT */}
<section id="contact" style={{ ...sectionStyle, background: bg }}>
<div style={{ ...container, maxWidth: 700 }}>
<p style={{ color: accent, fontWeight: 700, fontSize: "0.8rem", letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: 8, textAlign: "center" }}>Get In Touch</p>
<h2 style={{ ...sectionTitle, textAlign: "center" }}>Let's work together</h2>
<p style={{ ...sectionSub, textAlign: "center" }}>Open to data engineering roles, collaborations, and consulting</p>
<div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem", marginBottom: "2rem" }}>
{[
{ icon: "✉️", label: "Email", value: "apoorvashrivastava.25@gmail.com", href: "mailto:apoorvashrivastava.25@gmail.com" },
{ icon: "💼", label: "LinkedIn", value: "linkedin.com/in/apoorva-shrivastava", href: "https://linkedin.com/in/apoorva-shrivastava-742a411aa" },
].map(c => (
<a key={c.label} href={c.href} target="_blank" rel="noopener noreferrer" style={{ textDecoration: "none" }}>
<div className="hover-lift" style={{ background: surface, border: `1px solid ${border}`, borderRadius: 14, padding: "1.5rem", display: "flex", gap: 14, alignItems: "center" }}>
<span style={{ fontSize: "1.8rem" }}>{c.icon}</span>
<div>
<div style={{ fontSize: "0.7rem", color: accent, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 3 }}>{c.label}</div>
<div style={{ color: text, fontWeight: 600, fontSize: "0.85rem", wordBreak: "break-all" }}>{c.value}</div>
</div>
</div>
</a>
))}
</div>
{/* Contact form */}
<div style={{ background: surface, border: `1px solid ${border}`, borderRadius: 20, padding: "2rem" }}>
<h3 style={{ fontWeight: 800, marginBottom: "1.5rem", color: text }}>Send a Message</h3>
<div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem", marginBottom: "1rem" }}>
{["Your Name", "Your Email"].map(pl => (
<input key={pl} placeholder={pl} style={{ background: surface2, border: `1px solid ${border}`, borderRadius: 10, padding: "12px 16px", color: text, fontSize: "0.9rem", fontFamily: "'DM Sans', sans-serif", outline: "none", width: "100%" }} />
))}
</div>
<input placeholder="Subject" style={{ background: surface2, border: `1px solid ${border}`, borderRadius: 10, padding: "12px 16px", color: text, fontSize: "0.9rem", fontFamily: "'DM Sans', sans-serif", outline: "none", width: "100%", marginBottom: "1rem" }} />
<textarea placeholder="Your message..." rows={4} style={{ background: surface2, border: `1px solid ${border}`, borderRadius: 10, padding: "12px 16px", color: text, fontSize: "0.9rem", fontFamily: "'DM Sans', sans-serif", outline: "none", width: "100%", resize: "vertical", marginBottom: "1rem" }} />
<button style={{ background: `linear-gradient(135deg, ${accent}, #8B5CF6)`, color: "#fff", border: "none", borderRadius: 10, padding: "13px 28px", fontWeight: 700, fontSize: "0.9rem", cursor: "pointer", fontFamily: "'DM Sans', sans-serif", width: "100%" }}>
Send Message →
</button>
</div>
</div>
</section>
{/* ── FOOTER */}
<footer style={{ background: dark ? "#030810" : "#E2E8F0", padding: "2rem 0", borderTop: `1px solid ${border}` }}>
<div style={{ ...container, display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "1rem" }}>
<div style={{ fontFamily: "'Playfair Display', serif", fontWeight: 900, fontSize: "1.2rem" }}>
<span className="shimmer-text">Apoorva Shrivastava</span>
</div>
<div style={{ color: subtle, fontSize: "0.8rem" }}>Data Engineer · Oracle EBS · SQL · ETL · Cloud</div>
<div style={{ color: subtle, fontSize: "0.8rem" }}>Built with ♥ · {new Date().getFullYear()}</div>
</div>
</footer>
{/* ── MODAL */}
{modalProject && <ProjectModal p={modalProject} onClose={() => setModalProject(null)} dark={dark} />}
</div>
);
}