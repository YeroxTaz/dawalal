import React, { useState, useEffect } from "react";
import logoDawalal from "./assets/logo-dawalal.png";

// ============================================================
//  DAWALAL - Plateforme de gestion des examens de conduite
//  Application de démonstration (données simulées en mémoire)
//  Version modernisée
// ============================================================

const C = {
  green: "#0F4D2E",        // vert profond signature
  greenDeep: "#0A3A22",    // vert très foncé (hover)
  emerald: "#16A34A",      // vert émeraude accent
  emeraldSoft: "#DCFCE7",  // vert pâle
  mint: "#F0FAF4",         // fond menthe très doux
  bg: "#F6F8F6",           // fond général
  card: "#FFFFFF",
  ink: "#0F1B14",          // texte principal
  inkSoft: "#5B6B61",      // texte secondaire
  line: "#E6EDE8",         // bordures
  amber: "#D97706",
  amberSoft: "#FEF3C7",
  red: "#DC2626",
  redSoft: "#FEE2E2",
  blue: "#2563EB",
  blueSoft: "#DBEAFE",
  wave: "#1DC8FF",
  orange: "#FF7900",
};

const FONT = "'Inter', 'Segoe UI', system-ui, -apple-system, sans-serif";

// ---- Icônes SVG (remplacent les emojis) ----------------------------------

function Icon({ name, size = 20, color = "currentColor", stroke = 2 }) {
  const common = { width: size, height: size, viewBox: "0 0 24 24", fill: "none", stroke: color, strokeWidth: stroke, strokeLinecap: "round", strokeLinejoin: "round" };
  const paths = {
    user: <><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></>,
    clipboard: <><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" /><rect x="8" y="2" width="8" height="4" rx="1" /></>,
    settings: <><circle cx="12" cy="12" r="3" /><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" /></>,
    check: <polyline points="20 6 9 17 4 12" />,
    arrowRight: <><line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" /></>,
    chart: <><line x1="18" y1="20" x2="18" y2="10" /><line x1="12" y1="20" x2="12" y2="4" /><line x1="6" y1="20" x2="6" y2="14" /></>,
    folder: <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" />,
    building: <><rect x="4" y="2" width="16" height="20" rx="2" /><line x1="9" y1="6" x2="9" y2="6" /><line x1="15" y1="6" x2="15" y2="6" /><line x1="9" y1="10" x2="9" y2="10" /><line x1="15" y1="10" x2="15" y2="10" /><line x1="9" y1="14" x2="9" y2="14" /><line x1="15" y1="14" x2="15" y2="14" /><path d="M10 22v-4h4v4" /></>,
    calendar: <><rect x="3" y="4" width="18" height="18" rx="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" /></>,
    bell: <><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" /><path d="M13.73 21a2 2 0 0 1-3.46 0" /></>,
    camera: <><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" /><circle cx="12" cy="13" r="4" /></>,
    fingerprint: <><path d="M2 12C2 6.5 6.5 2 12 2a10 10 0 0 1 8 4" /><path d="M5 19.5C5.5 18 6 15 6 12c0-.7.12-1.37.34-2" /><path d="M17.29 21.02c.12-.6.43-2.3.5-3.02" /><path d="M12 10a2 2 0 0 0-2 2c0 1.02-.1 2.51-.26 4" /><path d="M8.65 22c.21-.66.45-1.32.57-2" /><path d="M14 13.12c0 2.38 0 6.38-1 8.88" /><path d="M2 16h.01" /><path d="M21.8 16c.2-2 .131-5.354 0-6" /><path d="M9 6.8a6 6 0 0 1 9 5.2c0 .47 0 1.17-.02 2" /></>,
    file: <><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" /></>,
    clock: <><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></>,
    upload: <><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="17 8 12 3 7 8" /><line x1="12" y1="3" x2="12" y2="15" /></>,
    logout: <><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" /><polyline points="16 17 21 12 16 7" /><line x1="21" y1="12" x2="9" y2="12" /></>,
    shield: <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />,
    creditCard: <><rect x="1" y="4" width="22" height="16" rx="2" /><line x1="1" y1="10" x2="23" y2="10" /></>,
    mapPin: <><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" /></>,
    globe: <><circle cx="12" cy="12" r="10" /><line x1="2" y1="12" x2="22" y2="12" /><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" /></>,
    award: <><circle cx="12" cy="8" r="7" /><polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88" /></>,
  };
  return <svg {...common} style={{ display: "block", flexShrink: 0 }}>{paths[name]}</svg>;
}

// ---- Données simulées -----------------------------------------------------

const REGIONS = ["Dakar", "Thiès", "Saint-Louis", "Ziguinchor", "Kaolack", "Tambacounda", "Kolda", "Diourbel", "Louga", "Matam", "Fatick", "Sédhiou", "Kédougou", "Kaffrine"];

const CENTRES = [
  { id: 4001, nom: "Centre d'examen de Dakar", region: "Dakar", capacite: 50 },
  { id: 4002, nom: "Centre d'examen de Thiès", region: "Thiès", capacite: 35 },
  { id: 4003, nom: "Centre d'examen de Saint-Louis", region: "Saint-Louis", capacite: 30 },
  { id: 4004, nom: "Centre d'examen de Kaolack", region: "Kaolack", capacite: 25 },
];

const CRENEAUX = [
  { id: 1, date: "2026-07-10", heure: "08h00", centre: 4001, dispo: true },
  { id: 2, date: "2026-07-10", heure: "10h00", centre: 4001, dispo: true },
  { id: 3, date: "2026-07-11", heure: "08h00", centre: 4001, dispo: false },
  { id: 4, date: "2026-07-12", heure: "09h00", centre: 4002, dispo: true },
];

const CANDIDATS_CONVOQUES = [
  { id: 1001, nom: "Mamadou Ndiaye", region: "Dakar", type: "Code de la route", heure: "08h00", verifie: false, resultat: null },
  { id: 1002, nom: "Fatou Sarr", region: "Dakar", type: "Code de la route", heure: "08h00", verifie: false, resultat: null },
  { id: 1003, nom: "Ousmane Baldé", region: "Dakar", type: "Conduite", heure: "10h00", verifie: false, resultat: null },
  { id: 1004, nom: "Awa Diop", region: "Dakar", type: "Conduite", heure: "10h00", verifie: false, resultat: null },
];

const DOSSIERS_ADMIN = [
  { id: 2001, candidat: "Mamadou Ndiaye", region: "Dakar", type: "Code de la route", statut: "En attente", date: "2026-06-15" },
  { id: 2002, candidat: "Fatou Sarr", region: "Dakar", type: "Code de la route", statut: "En attente", date: "2026-06-16" },
  { id: 2003, candidat: "Ousmane Baldé", region: "Kolda", type: "Conduite", statut: "Validé", date: "2026-06-14" },
  { id: 2004, candidat: "Awa Diop", region: "Thiès", type: "Conduite", statut: "Validé", date: "2026-06-13" },
  { id: 2005, candidat: "Cheikh Fall", region: "Saint-Louis", type: "Code de la route", statut: "Rejeté", date: "2026-06-12" },
];

// ---- Helpers UI -----------------------------------------------------------

const SHADOW_SM = "0 1px 2px rgba(15,77,46,0.04), 0 1px 3px rgba(15,77,46,0.06)";
const SHADOW_MD = "0 2px 8px rgba(15,77,46,0.06), 0 8px 24px rgba(15,77,46,0.05)";
const SHADOW_LG = "0 8px 30px rgba(15,77,46,0.10), 0 2px 8px rgba(15,77,46,0.06)";

function statutColor(s) {
  if (s === "Validé" || s === "Confirmée" || s === "Admis" || s === "Permis disponible") return C.emerald;
  if (s === "En attente" || s === "Examen passé") return C.amber;
  if (s === "Rejeté" || s === "Échoué" || s === "Ajourné") return C.red;
  return C.inkSoft;
}
function statutBg(s) {
  if (s === "Validé" || s === "Confirmée" || s === "Admis" || s === "Permis disponible") return C.emeraldSoft;
  if (s === "En attente" || s === "Examen passé") return C.amberSoft;
  if (s === "Rejeté" || s === "Échoué" || s === "Ajourné") return C.redSoft;
  return C.line;
}

function Badge({ children, color, bg }) {
  return (
    <span style={{
      background: bg || (color + "18"), color, fontWeight: 600, fontSize: 12.5,
      padding: "4px 11px", borderRadius: 999, whiteSpace: "nowrap", letterSpacing: 0.1,
      display: "inline-flex", alignItems: "center", gap: 5,
    }}>{children}</span>
  );
}

function Btn({ children, onClick, variant = "primary", small, disabled, full, icon }) {
  const [hover, setHover] = useState(false);
  const base = {
    fontFamily: FONT, fontWeight: 600, fontSize: small ? 13.5 : 15,
    padding: small ? "8px 15px" : "12px 22px", borderRadius: 11, cursor: disabled ? "not-allowed" : "pointer",
    border: "none", transition: "all .2s cubic-bezier(.4,0,.2,1)", width: full ? "100%" : "auto",
    opacity: disabled ? 0.45 : 1, display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 8,
    letterSpacing: 0.1,
  };
  const styles = {
    primary: { ...base, background: hover && !disabled ? C.greenDeep : C.green, color: "#fff", boxShadow: hover && !disabled ? SHADOW_MD : SHADOW_SM, transform: hover && !disabled ? "translateY(-1px)" : "none" },
    accent: { ...base, background: hover && !disabled ? "#15893f" : C.emerald, color: "#fff", boxShadow: hover && !disabled ? "0 6px 18px rgba(22,163,74,0.3)" : SHADOW_SM, transform: hover && !disabled ? "translateY(-1px)" : "none" },
    outline: { ...base, background: hover ? C.mint : "#fff", color: C.green, border: `1.5px solid ${hover ? C.green : C.line}` },
    ghost: { ...base, background: hover ? C.line : "transparent", color: C.inkSoft },
    danger: { ...base, background: hover ? C.redSoft : "#fff", color: C.red, border: `1.5px solid ${hover ? C.red : "#F0C4BF"}` },
    amber: { ...base, background: hover && !disabled ? "#c2690a" : C.amber, color: "#fff", boxShadow: hover && !disabled ? "0 6px 18px rgba(217,119,6,0.3)" : SHADOW_SM, transform: hover && !disabled ? "translateY(-1px)" : "none" },
  };
  return (
    <button style={styles[variant]} onClick={disabled ? undefined : onClick}
      onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}>
      {children}{icon && <Icon name={icon} size={small ? 15 : 17} />}
    </button>
  );
}

function Card({ children, style, hover: enableHover, onClick }) {
  const [h, setH] = useState(false);
  return (
    <div
      onClick={onClick}
      onMouseEnter={() => enableHover && setH(true)}
      onMouseLeave={() => enableHover && setH(false)}
      style={{
        background: C.card, borderRadius: 18, border: `1px solid ${C.line}`,
        boxShadow: h ? SHADOW_LG : SHADOW_SM, padding: 26,
        transition: "all .25s cubic-bezier(.4,0,.2,1)",
        transform: h ? "translateY(-3px)" : "none",
        ...style,
      }}>{children}</div>
  );
}

function Field({ label, children }) {
  return (
    <div style={{ marginBottom: 18 }}>
      <label style={{ display: "block", fontSize: 13, fontWeight: 600, color: C.ink, marginBottom: 7, letterSpacing: 0.1 }}>{label}</label>
      {children}
    </div>
  );
}

const inputStyle = {
  width: "100%", padding: "11px 14px", borderRadius: 11, border: `1.5px solid ${C.line}`,
  fontSize: 14.5, fontFamily: FONT, boxSizing: "border-box", outline: "none", background: "#fff",
  color: C.ink, transition: "border-color .2s, box-shadow .2s",
};

function Input(props) {
  const [foc, setFoc] = useState(false);
  return <input {...props} onFocus={() => setFoc(true)} onBlur={() => setFoc(false)}
    style={{ ...inputStyle, borderColor: foc ? C.emerald : C.line, boxShadow: foc ? `0 0 0 3px ${C.emeraldSoft}` : "none", ...props.style }} />;
}
function Select(props) {
  const [foc, setFoc] = useState(false);
  return <select {...props} onFocus={() => setFoc(true)} onBlur={() => setFoc(false)}
    style={{ ...inputStyle, borderColor: foc ? C.emerald : C.line, boxShadow: foc ? `0 0 0 3px ${C.emeraldSoft}` : "none", cursor: "pointer", ...props.style }}>{props.children}</select>;
}

function Stepper({ steps, current }) {
  return (
    <div style={{ display: "flex", alignItems: "center", marginBottom: 30, flexWrap: "wrap", gap: 4 }}>
      {steps.map((s, i) => (
        <React.Fragment key={i}>
          <div style={{ display: "flex", alignItems: "center", gap: 9 }}>
            <div style={{
              width: 32, height: 32, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center",
              fontWeight: 700, fontSize: 13.5, flexShrink: 0, transition: "all .3s",
              background: i < current ? C.emerald : i === current ? C.green : "#fff",
              color: i <= current ? "#fff" : C.inkSoft,
              border: i > current ? `1.5px solid ${C.line}` : "none",
              boxShadow: i === current ? "0 0 0 4px " + C.emeraldSoft : "none",
            }}>{i < current ? <Icon name="check" size={16} color="#fff" /> : i + 1}</div>
            <span style={{ fontSize: 13.5, fontWeight: i === current ? 700 : 500, color: i === current ? C.green : C.inkSoft }}>{s}</span>
          </div>
          {i < steps.length - 1 && <div style={{ width: 30, height: 2, background: i < current ? C.emerald : C.line, margin: "0 6px", borderRadius: 2, transition: "background .3s" }} />}
        </React.Fragment>
      ))}
    </div>
  );
}

// ============================================================
//  LOGO + EN-TÊTE
// ============================================================

function Logo({ size = 26, light }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 11 }}>
      <div style={{
        width: size + 12, height: size + 12, borderRadius: 11,
        background: light ? "rgba(255,255,255,0.16)" : `linear-gradient(135deg, ${C.green}, ${C.emerald})`,
        display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
        boxShadow: light ? "none" : "0 4px 12px rgba(22,163,74,0.25)",
        border: light ? "1px solid rgba(255,255,255,0.3)" : "none",
        overflow: "hidden",
      }}>
        <img src={logoDawalal} alt="DAWALAL" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
      </div>
      <span style={{ fontWeight: 800, fontSize: size, color: light ? "#fff" : C.green, letterSpacing: -0.8 }}>DAWALAL</span>
    </div>
  );
}

function Avatar({ name, size = 34 }) {
  const initials = (name || "U").split(" ").map(w => w[0]).slice(0, 2).join("").toUpperCase();
  return (
    <div style={{
      width: size, height: size, borderRadius: "50%", flexShrink: 0,
      background: `linear-gradient(135deg, ${C.emerald}, ${C.green})`,
      color: "#fff", display: "flex", alignItems: "center", justifyContent: "center",
      fontWeight: 700, fontSize: size * 0.4, letterSpacing: 0.3,
    }}>{initials}</div>
  );
}

function TopBar({ role, onLogout, userName }) {
  return (
    <div style={{
      background: "rgba(255,255,255,0.85)", backdropFilter: "blur(12px)", WebkitBackdropFilter: "blur(12px)",
      borderBottom: `1px solid ${C.line}`, padding: "14px 30px",
      display: "flex", alignItems: "center", justifyContent: "space-between", position: "sticky", top: 0, zIndex: 20,
    }}>
      <Logo size={22} />
      <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
        <Badge color={C.emerald} bg={C.emeraldSoft}>{role}</Badge>
        <div style={{ display: "flex", alignItems: "center", gap: 9 }}>
          <Avatar name={userName} size={32} />
          <span style={{ fontSize: 14, fontWeight: 600, color: C.ink }}>{userName}</span>
        </div>
        <Btn variant="ghost" small onClick={onLogout} icon="logout">Quitter</Btn>
      </div>
    </div>
  );
}

// ============================================================
//  PAGE D'ACCUEIL
// ============================================================

function HomePage({ onSelectRole }) {
  return (
    <div style={{ minHeight: "100vh", background: C.bg, fontFamily: FONT }}>
      {/* Hero */}
      <div style={{
        background: `radial-gradient(120% 120% at 15% 0%, ${C.emerald} 0%, ${C.green} 45%, ${C.greenDeep} 100%)`,
        padding: "22px 30px 90px", position: "relative", overflow: "hidden",
      }}>
        {/* halo décoratif */}
        <div style={{ position: "absolute", top: -120, right: -80, width: 420, height: 420, borderRadius: "50%", background: "radial-gradient(circle, rgba(255,255,255,0.10) 0%, transparent 70%)" }} />
        <div style={{ position: "absolute", bottom: -160, left: "30%", width: 380, height: 380, borderRadius: "50%", background: "radial-gradient(circle, rgba(22,163,74,0.25) 0%, transparent 70%)" }} />

        <div style={{ maxWidth: 1140, margin: "0 auto", position: "relative" }}>
          <Logo size={26} light />
          <div style={{ marginTop: 66, maxWidth: 680 }}>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 7, background: "rgba(255,255,255,0.12)", border: "1px solid rgba(255,255,255,0.2)", borderRadius: 999, padding: "6px 14px", marginBottom: 22 }}>
              <span style={{ width: 7, height: 7, borderRadius: "50%", background: "#4ADE80", boxShadow: "0 0 8px #4ADE80" }} />
              <span style={{ color: "#D1FAE5", fontSize: 13, fontWeight: 600 }}>Service public numérique · Sénégal</span>
            </div>
            <h1 style={{ color: "#fff", fontSize: 50, fontWeight: 800, lineHeight: 1.05, margin: 0, letterSpacing: -1.8 }}>
              Votre permis de conduire,<br /><span style={{ color: "#86EFAC" }}>entièrement en ligne.</span>
            </h1>
            <p style={{ color: "#CFF3DD", fontSize: 19, marginTop: 22, lineHeight: 1.55, maxWidth: 560 }}>
              Inscrivez-vous, payez et suivez votre dossier sans vous déplacer. Une plateforme simple, sécurisée et accessible dans tout le Sénégal.
            </p>
            <div style={{ display: "flex", gap: 36, marginTop: 40 }}>
              {[["14", "régions couvertes"], ["100 %", "en ligne"], ["FR · Wolof", "langues"]].map(([n, l]) => (
                <div key={l}>
                  <div style={{ color: "#fff", fontSize: 30, fontWeight: 800, letterSpacing: -0.5 }}>{n}</div>
                  <div style={{ color: "#9DD9B4", fontSize: 13, marginTop: 2 }}>{l}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Cartes d'accès */}
      <div style={{ maxWidth: 1140, margin: "-56px auto 0", padding: "0 30px 70px", position: "relative" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 22 }}>
          {[
            { role: "Candidat", desc: "Inscrivez-vous à un examen, payez et suivez votre dossier en temps réel.", icon: "user", key: "candidat" },
            { role: "Examinateur", desc: "Vérifiez les identités et saisissez les résultats des épreuves.", icon: "clipboard", key: "examinateur" },
          ].map((c) => (
            <Card key={c.key} hover style={{ cursor: "pointer", padding: 30 }} onClick={() => onSelectRole(c.key)}>
              <div style={{ width: 54, height: 54, borderRadius: 15, background: C.mint, color: C.green, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 18 }}>
                <Icon name={c.icon} size={26} color={C.green} />
              </div>
              <h3 style={{ margin: 0, fontSize: 21, color: C.ink, fontWeight: 700, letterSpacing: -0.4 }}>Espace {c.role}</h3>
              <p style={{ color: C.inkSoft, fontSize: 14.5, marginTop: 9, lineHeight: 1.55, minHeight: 44 }}>{c.desc}</p>
              <div style={{ marginTop: 18 }}>
                <Btn full onClick={() => onSelectRole(c.key)} icon="arrowRight">Accéder</Btn>
              </div>
            </Card>
          ))}
        </div>

        {/* Étapes */}
        <div style={{ marginTop: 72 }}>
          <div style={{ textAlign: "center", marginBottom: 8 }}>
            <span style={{ color: C.emerald, fontWeight: 700, fontSize: 13.5, letterSpacing: 1, textTransform: "uppercase" }}>Le parcours</span>
          </div>
          <h2 style={{ fontSize: 30, color: C.ink, fontWeight: 800, textAlign: "center", letterSpacing: -0.8, margin: "0 0 36px" }}>Comment ça marche ?</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(230px, 1fr))", gap: 20 }}>
            {[
              ["01", "Je m'inscris", "Création de compte et dépôt du dossier en quelques minutes.", "file"],
              ["02", "Je paie", "Paiement sécurisé via Wave ou Orange Money.", "creditCard"],
              ["03", "Je passe l'examen", "Convocation et vérification biométrique au centre.", "fingerprint"],
              ["04", "Je reçois mon permis", "Notification par SMS dès que le permis est prêt.", "bell"],
            ].map(([n, t, d, ic]) => (
              <Card key={n} hover style={{ padding: 24 }}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 14 }}>
                  <div style={{ width: 44, height: 44, borderRadius: 12, background: C.mint, display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <Icon name={ic} size={21} color={C.green} />
                  </div>
                  <span style={{ fontSize: 26, fontWeight: 800, color: C.line, letterSpacing: -1 }}>{n}</span>
                </div>
                <h4 style={{ margin: "0 0 6px", fontSize: 17, color: C.ink, fontWeight: 700 }}>{t}</h4>
                <p style={{ color: C.inkSoft, fontSize: 13.5, margin: 0, lineHeight: 1.55 }}>{d}</p>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function LoginScreen({ role, onLogin, onBack }) {
  const labels = { candidat: "Candidat", examinateur: "Examinateur", admin: "Administrateur" };
  const icons = { candidat: "user", examinateur: "clipboard", admin: "settings" };
  const [pwd, setPwd] = useState("");
  const [identifiant, setIdentifiant] = useState("");
  const [erreur, setErreur] = useState("");
  const [mode, setMode] = useState("connexion"); // "connexion" ou "inscription"

  // Champs du formulaire de création de compte
  const [compte, setCompte] = useState({ nom: "", prenom: "", telephone: "", naissance: "", motDePasse: "" });

  function handleLogin() {
    if (!identifiant.trim() || !pwd.trim()) {
      setErreur("Veuillez renseigner l'identifiant et le mot de passe.");
      return;
    }
    setErreur("");
    onLogin(pwd, identifiant);
  }

  function calculerAge(dateStr) {
    if (!dateStr) return null;
    const naissance = new Date(dateStr);
    const aujourdhui = new Date();
    let age = aujourdhui.getFullYear() - naissance.getFullYear();
    const m = aujourdhui.getMonth() - naissance.getMonth();
    if (m < 0 || (m === 0 && aujourdhui.getDate() < naissance.getDate())) age--;
    return age;
  }

  function handleCreerCompte() {
    if (!compte.nom.trim() || !compte.prenom.trim() || !compte.telephone.trim() || !compte.naissance || !compte.motDePasse.trim()) {
      setErreur("Veuillez renseigner tous les champs.");
      return;
    }
    const age = calculerAge(compte.naissance);
    if (age === null || age < 18) {
      setErreur("Vous n'avez pas l'âge autorisé pour vous inscrire au permis de conduire.");
      return;
    }
    setErreur("");
    // Connexion avec le nom complet saisi
    onLogin(compte.motDePasse, `${compte.prenom.trim()} ${compte.nom.trim()}`);
  }

  function basculerMode(nouveauMode) {
    setMode(nouveauMode);
    setErreur("");
  }

  return (
    <div style={{ minHeight: "100vh", background: `radial-gradient(120% 100% at 50% 0%, ${C.mint} 0%, ${C.bg} 50%)`, fontFamily: FONT, display: "flex", alignItems: "center", justifyContent: "center", padding: 20 }}>
      <Card style={{ width: 420, maxWidth: "100%", padding: 34 }}>
        <div style={{ textAlign: "center", marginBottom: 22 }}>
          <div style={{ width: 56, height: 56, borderRadius: 15, background: `linear-gradient(135deg, ${C.green}, ${C.emerald})`, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 16px", boxShadow: "0 6px 18px rgba(22,163,74,0.25)" }}>
            <Icon name={icons[role]} size={26} color="#fff" />
          </div>
          <h2 style={{ fontSize: 23, color: C.ink, margin: "0 0 4px", fontWeight: 700, letterSpacing: -0.4 }}>
            {mode === "inscription" ? "Créer un compte" : `Espace ${labels[role]}`}
          </h2>
          <p style={{ color: C.inkSoft, fontSize: 14, margin: 0 }}>
            {mode === "inscription" ? "Renseignez vos informations" : "Connectez-vous pour continuer"}
          </p>
        </div>

        {mode === "connexion" && (
          <>
            <Field label={role === "candidat" ? "Nom complet" : "Identifiant"}>
              <Input placeholder={role === "candidat" ? "ex : Moussa Ndiaye" : "identifiant"} value={identifiant} onChange={(e) => { setIdentifiant(e.target.value); setErreur(""); }} />
            </Field>
            <Field label="Mot de passe">
              <Input type="password" value={pwd} onChange={(e) => { setPwd(e.target.value); setErreur(""); }} placeholder="••••••••" />
            </Field>
          </>
        )}

        {mode === "inscription" && (
          <>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
              <Field label="Prénom"><Input placeholder="Moussa" value={compte.prenom} onChange={(e) => { setCompte({ ...compte, prenom: e.target.value }); setErreur(""); }} /></Field>
              <Field label="Nom"><Input placeholder="Ndiaye" value={compte.nom} onChange={(e) => { setCompte({ ...compte, nom: e.target.value }); setErreur(""); }} /></Field>
            </div>
            <Field label="Téléphone"><Input placeholder="+221 77 123 45 67" value={compte.telephone} onChange={(e) => { setCompte({ ...compte, telephone: e.target.value }); setErreur(""); }} /></Field>
            <Field label="Date de naissance"><Input type="date" value={compte.naissance} onChange={(e) => { setCompte({ ...compte, naissance: e.target.value }); setErreur(""); }} /></Field>
            <Field label="Mot de passe"><Input type="password" placeholder="••••••••" value={compte.motDePasse} onChange={(e) => { setCompte({ ...compte, motDePasse: e.target.value }); setErreur(""); }} /></Field>
          </>
        )}

        {erreur && (
          <div style={{ display: "flex", gap: 9, alignItems: "center", background: C.redSoft, borderRadius: 11, padding: "11px 13px", fontSize: 13, color: C.red, marginBottom: 18, fontWeight: 500, lineHeight: 1.4 }}>
            <Icon name="shield" size={16} color={C.red} />
            <span>{erreur}</span>
          </div>
        )}
        {role === "candidat" && mode === "connexion" && !erreur && (
          <div style={{ display: "flex", gap: 9, alignItems: "flex-start", background: C.mint, borderRadius: 11, padding: "11px 13px", fontSize: 12.5, color: C.green, marginBottom: 18, lineHeight: 1.5 }}>
            <Icon name="shield" size={16} color={C.emerald} />
            <span>Un code de confirmation vous sera envoyé par SMS (OTP).</span>
          </div>
        )}

        {mode === "connexion" ? (
          <Btn full onClick={handleLogin} icon="arrowRight">Se connecter</Btn>
        ) : (
          <Btn full onClick={handleCreerCompte} icon="arrowRight">Créer mon compte</Btn>
        )}

        {role === "candidat" && (
          <p style={{ textAlign: "center", fontSize: 13.5, color: C.inkSoft, marginBottom: 0, marginTop: 16 }}>
            {mode === "connexion" ? (
              <>Pas encore de compte ? <span style={{ color: C.emerald, fontWeight: 600, cursor: "pointer" }} onClick={() => basculerMode("inscription")}>Créer un compte</span></>
            ) : (
              <>Déjà un compte ? <span style={{ color: C.emerald, fontWeight: 600, cursor: "pointer" }} onClick={() => basculerMode("connexion")}>Se connecter</span></>
            )}
          </p>
        )}
        <div style={{ textAlign: "center", marginTop: 16 }}>
          <Btn variant="ghost" small onClick={onBack}>← Retour à l'accueil</Btn>
        </div>
      </Card>
    </div>
  );
}

// ============================================================
//  ESPACE CANDIDAT
// ============================================================

function Tabs({ tabs, active, onChange }) {
  return (
    <div style={{ display: "flex", gap: 4, marginBottom: 26, borderBottom: `1px solid ${C.line}` }}>
      {tabs.map((t) => (
        <button key={t.key} onClick={() => onChange(t.key)}
          style={{
            background: "none", border: "none", padding: "13px 18px", fontFamily: FONT, fontSize: 14.5, fontWeight: 600,
            cursor: "pointer", color: active === t.key ? C.green : C.inkSoft,
            borderBottom: active === t.key ? `2.5px solid ${C.emerald}` : "2.5px solid transparent", marginBottom: -1,
            transition: "color .2s",
          }}>{t.label}</button>
      ))}
    </div>
  );
}

function CandidatSpace({ onLogout, userName, monInscription, onInscription }) {
  const [tab, setTab] = useState("dashboard");
  const [inscriptionStep, setInscriptionStep] = useState(0);
  const [form, setForm] = useState({ centre: "", creneau: "", type: "Code de la route", mode: "Wave" });

  function finaliser() {
    const nomComplet = userName && userName.trim() ? userName.trim() : "Candidat";
    const centreObj = CENTRES.find((c) => String(c.id) === String(form.centre));
    const creneauObj = CRENEAUX.find((cr) => cr.id === form.creneau);
    onInscription({
      nom: nomComplet, region: centreObj ? centreObj.region : "Dakar", type: form.type,
      heure: creneauObj ? creneauObj.heure : "08h00", centre: centreObj ? centreObj.nom : "", mode: form.mode,
    });
    setTab("dashboard");
  }

  return (
    <div style={{ minHeight: "100vh", background: C.bg, fontFamily: FONT }}>
      <TopBar role="Candidat" userName={userName} onLogout={onLogout} />
      <div style={{ maxWidth: 1000, margin: "0 auto", padding: "26px 30px" }}>
        <Tabs active={tab} onChange={(k) => { setTab(k); if (k === "inscription") setInscriptionStep(0); }}
          tabs={[{ key: "dashboard", label: "Tableau de bord" }, { key: "inscription", label: "Nouvelle inscription" }, { key: "resultats", label: "Mes résultats" }]} />
        {tab === "dashboard" && <CandidatDashboard userName={userName} monInscription={monInscription} onNew={() => { setTab("inscription"); setInscriptionStep(0); }} />}
        {tab === "inscription" && <CandidatInscription userName={userName} step={inscriptionStep} setStep={setInscriptionStep} form={form} setForm={setForm} onFinish={finaliser} />}
        {tab === "resultats" && <CandidatResultats monInscription={monInscription} />}
      </div>
    </div>
  );
}

function StatCard({ label, value, color, icon, sub }) {
  return (
    <Card style={{ padding: 20 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
        <div style={{ fontSize: 12.5, color: C.inkSoft, fontWeight: 600, textTransform: "uppercase", letterSpacing: 0.5 }}>{label}</div>
        {icon && <div style={{ width: 34, height: 34, borderRadius: 10, background: (color || C.green) + "14", display: "flex", alignItems: "center", justifyContent: "center" }}><Icon name={icon} size={17} color={color || C.green} /></div>}
      </div>
      <div style={{ fontSize: 28, color: color || C.ink, fontWeight: 800, marginTop: 8, letterSpacing: -0.5 }}>{value}</div>
      {sub && <div style={{ fontSize: 12.5, color: C.emerald, marginTop: 2, fontWeight: 500 }}>{sub}</div>}
    </Card>
  );
}

function CandidatDashboard({ userName, monInscription, onNew }) {
  const prenom = (userName || "").split(" ")[0] || "Candidat";

  if (!monInscription) {
    return (
      <div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 22, flexWrap: "wrap", gap: 12 }}>
          <div>
            <h1 style={{ fontSize: 27, color: C.ink, margin: 0, fontWeight: 800, letterSpacing: -0.6 }}>Bonjour {prenom} 👋</h1>
            <p style={{ color: C.inkSoft, fontSize: 14.5, margin: "6px 0 0" }}>Vous n'avez aucun dossier en cours.</p>
          </div>
          <Btn onClick={onNew} icon="arrowRight">Nouvelle inscription</Btn>
        </div>
        <Card style={{ textAlign: "center", padding: "56px 24px" }}>
          <div style={{ width: 64, height: 64, borderRadius: 18, background: C.mint, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 16px" }}>
            <Icon name="file" size={30} color={C.green} />
          </div>
          <h3 style={{ fontSize: 19, color: C.ink, margin: "0 0 6px", fontWeight: 700 }}>Aucune inscription pour le moment</h3>
          <p style={{ color: C.inkSoft, fontSize: 14.5, maxWidth: 380, margin: "0 auto 20px", lineHeight: 1.55 }}>
            Lancez votre première inscription à un examen de conduite. Cela ne prend que quelques minutes.
          </p>
          <Btn onClick={onNew} icon="arrowRight">Commencer mon inscription</Btn>
        </Card>
      </div>
    );
  }

  const statutAdmin = monInscription.statut || "En attente";
  const dossierValide = statutAdmin === "Validé" || statutAdmin === "Confirmée";
  const examenPasse = !!monInscription.resultat;
  const permisDispo = monInscription.resultat === "Admis";
  const etapes = [
    { label: "Dossier soumis", done: true },
    { label: "Paiement effectué", done: true },
    { label: "Dossier validé", done: dossierValide || examenPasse || permisDispo },
    { label: "Examen passé", done: examenPasse || permisDispo },
    { label: "Permis disponible", done: permisDispo },
  ];
  let statut;
  if (permisDispo) statut = "Permis disponible";
  else if (monInscription.resultat === "Ajourné") statut = "Ajourné";
  else if (examenPasse) statut = "Examen passé";
  else if (dossierValide) statut = "Validé";
  else if (statutAdmin === "Rejeté") statut = "Rejeté";
  else statut = "En attente";

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 22, flexWrap: "wrap", gap: 12 }}>
        <div>
          <h1 style={{ fontSize: 27, color: C.ink, margin: 0, fontWeight: 800, letterSpacing: -0.6 }}>Bonjour {prenom} 👋</h1>
          <p style={{ color: C.inkSoft, fontSize: 14.5, margin: "6px 0 0" }}>Voici l'état de votre dossier en cours.</p>
        </div>
        <Btn onClick={onNew} icon="arrowRight">Nouvelle inscription</Btn>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(190px, 1fr))", gap: 16, marginBottom: 22 }}>
        <StatCard label="Dossier" value={"#" + monInscription.dossierId} color={C.green} icon="folder" />
        <StatCard label="Type d'examen" value={monInscription.type} color={C.blue} icon="file" />
        <StatCard label="Centre" value={monInscription.region} color={C.emerald} icon="mapPin" />
        <StatCard label="Statut" value={statut} color={statutColor(statut)} icon="clock" />
      </div>

      <Card>
        <h3 style={{ margin: "0 0 4px", fontSize: 18, color: C.ink, fontWeight: 700 }}>Suivi de votre dossier</h3>
        <p style={{ color: C.inkSoft, fontSize: 13.5, marginTop: 0, marginBottom: 26 }}>Progression en temps réel de votre demande.</p>
        <div style={{ position: "relative" }}>
          {etapes.map((e, i) => (
            <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 16, paddingBottom: i < etapes.length - 1 ? 24 : 0, position: "relative" }}>
              {i < etapes.length - 1 && (
                <div style={{ position: "absolute", left: 15, top: 30, bottom: 0, width: 2, background: e.done ? C.emerald : C.line, transition: "background .3s" }} />
              )}
              <div style={{
                width: 32, height: 32, borderRadius: "50%", flexShrink: 0, zIndex: 1,
                background: e.done ? C.emerald : "#fff", border: `2px solid ${e.done ? C.emerald : C.line}`,
                display: "flex", alignItems: "center", justifyContent: "center", transition: "all .3s",
                boxShadow: e.done ? "0 2px 8px rgba(22,163,74,0.25)" : "none",
              }}>{e.done && <Icon name="check" size={16} color="#fff" />}</div>
              <div style={{ paddingTop: 5 }}>
                <div style={{ fontSize: 15, fontWeight: 600, color: e.done ? C.ink : C.inkSoft }}>{e.label}</div>
                {e.done && <div style={{ fontSize: 12.5, color: C.emerald, marginTop: 2, fontWeight: 500 }}>Terminé</div>}
              </div>
            </div>
          ))}
        </div>
      </Card>

      <Card style={{ marginTop: 16, background: `linear-gradient(120% 100% at 0% 0%, ${C.mint}, #fff)`, border: `1px solid ${C.emeraldSoft}` }}>
        <div style={{ display: "flex", gap: 14, alignItems: "center" }}>
          <div style={{ width: 44, height: 44, borderRadius: 12, background: "#fff", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: SHADOW_SM }}>
            <Icon name={permisDispo ? "award" : "bell"} size={21} color={C.emerald} />
          </div>
          <div>
            <div style={{ fontWeight: 700, color: C.green, fontSize: 15 }}>{permisDispo ? "Permis disponible" : "Notifications activées"}</div>
            <div style={{ fontSize: 13.5, color: C.inkSoft, marginTop: 1 }}>{permisDispo ? "Vous avez reçu un message vous informant que votre permis est disponible. Vous pouvez désormais vous rendre au centre pour le récupérer." : "Vous recevrez un SMS à chaque étape importante de votre dossier."}</div>
          </div>
        </div>
      </Card>
    </div>
  );
}

function CandidatInscription({ userName, step, setStep, form, setForm, onFinish }) {
  const steps = ["Dossier", "Centre & créneau", "Paiement", "Confirmation"];
  const creneauxList = CRENEAUX.filter((c) => String(c.centre) === String(form.centre));
  const parts = (userName || "").trim().split(" ");
  const nomSaisi = parts.length > 1 ? parts.slice(1).join(" ") : "";
  const prenomSaisi = parts[0] || "";
  const [fichiers, setFichiers] = useState({});

  function handleFichier(piece, e) {
    const file = e.target.files && e.target.files[0];
    if (file) setFichiers((prev) => ({ ...prev, [piece]: file.name }));
  }

  return (
    <Card style={{ padding: 30 }}>
      <Stepper steps={steps} current={step} />

      {step === 0 && (
        <div>
          <h3 style={{ margin: "0 0 4px", fontSize: 20, color: C.ink, fontWeight: 700, letterSpacing: -0.3 }}>Votre dossier de candidature</h3>
          <p style={{ color: C.inkSoft, fontSize: 13.5, marginTop: 0, marginBottom: 24 }}>Renseignez vos informations et téléversez vos pièces.</p>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 18 }}>
            <Field label="Nom"><Input key={nomSaisi} defaultValue={nomSaisi} /></Field>
            <Field label="Prénom"><Input key={prenomSaisi} defaultValue={prenomSaisi} /></Field>
            <Field label="Téléphone"><Input defaultValue="+221 77 123 45 67" /></Field>
            <Field label="Région"><Select defaultValue="Dakar">{REGIONS.map((r) => <option key={r}>{r}</option>)}</Select></Field>
            <Field label="Type d'examen">
              <Select value={form.type} onChange={(e) => setForm({ ...form, type: e.target.value })}><option>Code de la route</option><option>Conduite</option></Select>
            </Field>
            <Field label="Langue de l'interface"><Select defaultValue="Français"><option>Français</option><option>Wolof</option></Select></Field>
          </div>
          <div style={{ marginTop: 6 }}>
            <label style={{ display: "block", fontSize: 13, fontWeight: 600, marginBottom: 10, color: C.ink }}>Pièces justificatives</label>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 14 }}>
              {["Carte d'identité (CNI)", "Photo d'identité", "Certificat médical"].map((p) => {
                const nomFichier = fichiers[p];
                return (
                  <label key={p} style={{ display: "block", border: `1.5px solid ${nomFichier ? C.emerald : C.emeraldSoft}`, borderRadius: 14, padding: 18, textAlign: "center", background: C.mint, cursor: "pointer", transition: "all .2s" }}>
                    <input type="file" accept="image/*,.pdf" style={{ display: "none" }} onChange={(e) => handleFichier(p, e)} />
                    <div style={{ width: 38, height: 38, borderRadius: 10, background: "#fff", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 10px", boxShadow: SHADOW_SM }}>
                      <Icon name={nomFichier ? "check" : "upload"} size={18} color={C.emerald} />
                    </div>
                    <div style={{ fontSize: 12.5, color: C.ink, fontWeight: 600, lineHeight: 1.3 }}>{p}</div>
                    {nomFichier ? (
                      <div style={{ fontSize: 11, color: C.emerald, marginTop: 6, fontWeight: 600, wordBreak: "break-all", lineHeight: 1.3 }} title={nomFichier}>{nomFichier.length > 22 ? nomFichier.slice(0, 19) + "..." : nomFichier}</div>
                    ) : (
                      <div style={{ fontSize: 11.5, color: C.inkSoft, marginTop: 6, fontWeight: 500 }}>Cliquer pour choisir</div>
                    )}
                  </label>
                );
              })}
            </div>
          </div>
          <div style={{ marginTop: 26, textAlign: "right" }}><Btn onClick={() => setStep(1)} icon="arrowRight">Continuer</Btn></div>
        </div>
      )}

      {step === 1 && (
        <div>
          <h3 style={{ margin: "0 0 4px", fontSize: 20, color: C.ink, fontWeight: 700, letterSpacing: -0.3 }}>Centre et créneau d'examen</h3>
          <p style={{ color: C.inkSoft, fontSize: 13.5, marginTop: 0, marginBottom: 24 }}>Choisissez le lieu et la date qui vous conviennent.</p>
          <Field label="Centre d'examen">
            <Select value={form.centre} onChange={(e) => setForm({ ...form, centre: e.target.value, creneau: "" })}>
              <option value="">Sélectionnez un centre</option>
              {CENTRES.map((c) => <option key={c.id} value={c.id}>{c.nom}</option>)}
            </Select>
          </Field>
          {form.centre && (
            <div>
              <label style={{ display: "block", fontSize: 13, fontWeight: 600, marginBottom: 10, color: C.ink }}>Créneaux disponibles</label>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(160px, 1fr))", gap: 12 }}>
                {creneauxList.map((cr) => (
                  <div key={cr.id} onClick={() => cr.dispo && setForm({ ...form, creneau: cr.id })}
                    style={{
                      border: `1.5px solid ${form.creneau === cr.id ? C.emerald : C.line}`,
                      background: form.creneau === cr.id ? C.mint : cr.dispo ? "#fff" : C.bg,
                      borderRadius: 14, padding: 16, cursor: cr.dispo ? "pointer" : "not-allowed", opacity: cr.dispo ? 1 : 0.5,
                      transition: "all .2s", boxShadow: form.creneau === cr.id ? `0 0 0 3px ${C.emeraldSoft}` : "none",
                    }}>
                    <div style={{ fontWeight: 700, color: C.ink, fontSize: 14.5 }}>{cr.date}</div>
                    <div style={{ color: C.inkSoft, fontSize: 13, marginTop: 2, display: "flex", alignItems: "center", gap: 4 }}><Icon name="clock" size={13} color={C.inkSoft} /> {cr.heure}</div>
                    <div style={{ marginTop: 8 }}>{cr.dispo ? <Badge color={C.emerald} bg={C.emeraldSoft}>Disponible</Badge> : <Badge color={C.red} bg={C.redSoft}>Complet</Badge>}</div>
                  </div>
                ))}
              </div>
            </div>
          )}
          <div style={{ marginTop: 26, display: "flex", justifyContent: "space-between" }}>
            <Btn variant="outline" onClick={() => setStep(0)}>← Retour</Btn>
            <Btn disabled={!form.creneau} onClick={() => setStep(2)} icon="arrowRight">Continuer</Btn>
          </div>
        </div>
      )}

      {step === 2 && (
        <div>
          <h3 style={{ margin: "0 0 4px", fontSize: 20, color: C.ink, fontWeight: 700, letterSpacing: -0.3 }}>Paiement des frais d'examen</h3>
          <p style={{ color: C.inkSoft, fontSize: 13.5, marginTop: 0, marginBottom: 24 }}>Réglez en toute sécurité via mobile money.</p>
          <div style={{ background: `linear-gradient(120% 100% at 0% 0%, ${C.mint}, #fff)`, border: `1px solid ${C.emeraldSoft}`, borderRadius: 14, padding: 20, marginBottom: 22, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span style={{ fontSize: 15, color: C.ink }}>Frais d'inscription · {form.type}</span>
            <span style={{ fontSize: 26, fontWeight: 800, color: C.green, letterSpacing: -0.5 }}>15 000 FCFA</span>
          </div>
          <label style={{ display: "block", fontSize: 13, fontWeight: 600, marginBottom: 10, color: C.ink }}>Mode de paiement</label>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 14, marginBottom: 22 }}>
            {[["Wave", C.wave, "W"], ["Orange Money", C.orange, "O"], ["Carte bancaire", C.blue, "card"]].map(([m, col, ic]) => (
              <div key={m} onClick={() => setForm({ ...form, mode: m })}
                style={{
                  border: `1.5px solid ${form.mode === m ? C.emerald : C.line}`,
                  background: form.mode === m ? C.mint : "#fff",
                  borderRadius: 14, padding: 18, textAlign: "center", cursor: "pointer", transition: "all .2s",
                  boxShadow: form.mode === m ? `0 0 0 3px ${C.emeraldSoft}` : "none",
                }}>
                <div style={{ width: 38, height: 38, borderRadius: 10, background: col, margin: "0 auto 9px", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontWeight: 800, fontSize: 14 }}>
                  {ic === "card" ? <Icon name="creditCard" size={18} color="#fff" /> : ic}
                </div>
                <div style={{ fontSize: 13, fontWeight: 600, color: C.ink }}>{m}</div>
              </div>
            ))}
          </div>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <Btn variant="outline" onClick={() => setStep(1)}>← Retour</Btn>
            <Btn variant="amber" onClick={() => setStep(3)}>Payer 15 000 FCFA</Btn>
          </div>
        </div>
      )}

      {step === 3 && (
        <div style={{ textAlign: "center", padding: "20px 0" }}>
          <div style={{ width: 76, height: 76, borderRadius: "50%", background: C.emeraldSoft, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 18px", boxShadow: "0 8px 24px rgba(22,163,74,0.2)" }}>
            <Icon name="check" size={38} color={C.emerald} stroke={2.5} />
          </div>
          <h3 style={{ fontSize: 23, color: C.ink, margin: "0 0 8px", fontWeight: 700, letterSpacing: -0.4 }}>Inscription confirmée</h3>
          <p style={{ color: C.inkSoft, fontSize: 14.5, maxWidth: 430, margin: "0 auto 6px", lineHeight: 1.55 }}>
            Votre paiement a été validé et votre inscription est enregistrée. Un SMS de confirmation vient de vous être envoyé.
          </p>
          <div style={{ background: C.bg, borderRadius: 14, padding: 18, maxWidth: 380, margin: "22px auto", textAlign: "left", border: `1px solid ${C.line}` }}>
            {[["Type d'examen", form.type], ["Montant payé", "15 000 FCFA"], ["Mode", form.mode]].map(([k, v]) => (
              <div key={k} style={{ display: "flex", justifyContent: "space-between", fontSize: 13.5, padding: "5px 0" }}><span style={{ color: C.inkSoft }}>{k}</span><b style={{ color: C.ink }}>{v}</b></div>
            ))}
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13.5, padding: "5px 0", alignItems: "center" }}><span style={{ color: C.inkSoft }}>Statut</span><Badge color={C.emerald} bg={C.emeraldSoft}>Confirmée</Badge></div>
          </div>
          <div style={{ display: "flex", gap: 10, justifyContent: "center" }}>
            <Btn variant="outline" icon="file">Télécharger le reçu</Btn>
            <Btn onClick={onFinish} icon="arrowRight">Mon tableau de bord</Btn>
          </div>
        </div>
      )}
    </Card>
  );
}

function CandidatResultats({ monInscription }) {
  if (!monInscription || !monInscription.resultat) {
    return (
      <div>
        <h1 style={{ fontSize: 25, color: C.ink, margin: "0 0 6px", fontWeight: 800, letterSpacing: -0.5 }}>Mes résultats</h1>
        <p style={{ color: C.inkSoft, fontSize: 14.5, marginTop: 0, marginBottom: 22 }}>Consultez les résultats de vos examens passés.</p>
        <Card style={{ textAlign: "center", padding: "56px 24px" }}>
          <div style={{ width: 64, height: 64, borderRadius: 18, background: C.amberSoft, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 16px" }}>
            <Icon name="clock" size={30} color={C.amber} />
          </div>
          <h3 style={{ fontSize: 19, color: C.ink, margin: "0 0 6px", fontWeight: 700 }}>Aucun résultat disponible</h3>
          <p style={{ color: C.inkSoft, fontSize: 14.5, maxWidth: 390, margin: "0 auto", lineHeight: 1.55 }}>
            {monInscription ? "Votre examen n'a pas encore été corrigé. Vous serez notifié par SMS dès que le résultat sera disponible." : "Vous n'avez encore passé aucun examen."}
          </p>
        </Card>
      </div>
    );
  }

  const admis = monInscription.resultat === "Admis";
  return (
    <div>
      <h1 style={{ fontSize: 25, color: C.ink, margin: "0 0 6px", fontWeight: 800, letterSpacing: -0.5 }}>Mes résultats</h1>
      <p style={{ color: C.inkSoft, fontSize: 14.5, marginTop: 0, marginBottom: 22 }}>Consultez les résultats de vos examens passés.</p>
      <Card style={{ marginBottom: 14 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
            <div style={{ width: 44, height: 44, borderRadius: 12, background: statutBg(monInscription.resultat), display: "flex", alignItems: "center", justifyContent: "center" }}>
              <Icon name={admis ? "award" : "file"} size={21} color={statutColor(monInscription.resultat)} />
            </div>
            <div>
              <div style={{ fontSize: 17, fontWeight: 700, color: C.ink }}>{monInscription.type}</div>
              <div style={{ fontSize: 13.5, color: C.inkSoft, marginTop: 2 }}>Dossier #{monInscription.dossierId} · {monInscription.region}</div>
            </div>
          </div>
          <div style={{ textAlign: "right" }}>
            {monInscription.score && <div style={{ fontSize: 13, color: C.inkSoft }}>Score : <b style={{ color: C.ink }}>{monInscription.score}</b></div>}
            <div style={{ marginTop: 6 }}><Badge color={statutColor(monInscription.resultat)} bg={statutBg(monInscription.resultat)}>{monInscription.resultat}</Badge></div>
          </div>
        </div>
      </Card>
      <Card style={{ background: admis ? `linear-gradient(120% 100% at 0% 0%, ${C.mint}, #fff)` : "#FFF7F6", border: `1px solid ${admis ? C.emeraldSoft : "#F5D3CE"}` }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <Icon name={admis ? "award" : "file"} size={22} color={admis ? C.emerald : C.red} />
          <div>
            <div style={{ fontWeight: 700, color: admis ? C.green : C.red, fontSize: 15 }}>{admis ? "Félicitations !" : "Examen non réussi"}</div>
            <div style={{ fontSize: 13.5, color: C.inkSoft, marginTop: 2 }}>
              {admis ? "Vous avez réussi votre examen. Consultez les prochaines étapes depuis votre tableau de bord." : "Vous pouvez vous réinscrire à une prochaine session depuis l'onglet Nouvelle inscription."}
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}

// ============================================================
//  ESPACE EXAMINATEUR
// ============================================================

function ExaminateurSpace({ onLogout, userName, convoques, onVerifie, onResultat }) {
  const [selected, setSelected] = useState(null);
  const [view, setView] = useState("liste");
  const candidats = convoques;
  const stats = { total: candidats.length, verifies: candidats.filter((c) => c.verifie).length, saisis: candidats.filter((c) => c.resultat).length };

  return (
    <div style={{ minHeight: "100vh", background: C.bg, fontFamily: FONT }}>
      <TopBar role="Examinateur" userName={userName} onLogout={onLogout} />
      <div style={{ maxWidth: 1000, margin: "0 auto", padding: "26px 30px" }}>
        <h1 style={{ fontSize: 25, color: C.ink, margin: "0 0 4px", fontWeight: 800, letterSpacing: -0.5 }}>Session du 10 juillet 2026</h1>
        <p style={{ color: C.inkSoft, fontSize: 14.5, marginTop: 0, marginBottom: 22, display: "flex", alignItems: "center", gap: 6 }}><Icon name="mapPin" size={15} color={C.inkSoft} /> Centre d'examen de Dakar</p>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16, marginBottom: 24 }}>
          <StatCard label="Candidats convoqués" value={stats.total} color={C.blue} icon="user" />
          <StatCard label="Identités vérifiées" value={stats.verifies} color={C.emerald} icon="fingerprint" />
          <StatCard label="Résultats saisis" value={stats.saisis} color={C.green} icon="check" />
        </div>

        {view === "liste" && (
          <Card style={{ padding: 0, overflow: "hidden" }}>
            <div style={{ padding: "18px 24px", borderBottom: `1px solid ${C.line}` }}>
              <h3 style={{ margin: 0, fontSize: 17, color: C.ink, fontWeight: 700 }}>Liste des candidats convoqués</h3>
            </div>
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr style={{ background: C.bg }}>
                  {["Candidat", "Type", "Heure", "Identité", "Résultat", "Action"].map((h) => (
                    <th key={h} style={{ textAlign: "left", padding: "13px 24px", fontSize: 12, color: C.inkSoft, fontWeight: 700, textTransform: "uppercase", letterSpacing: 0.4 }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {candidats.map((c) => (
                  <tr key={c.id} style={{ borderTop: `1px solid ${C.line}` }}>
                    <td style={{ padding: "15px 24px" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 11 }}>
                        <Avatar name={c.nom} size={34} />
                        <div>
                          <div style={{ fontWeight: 600, color: C.ink, fontSize: 14.5 }}>{c.nom}</div>
                          <div style={{ fontSize: 12.5, color: C.inkSoft }}>#{c.id} · {c.region}</div>
                        </div>
                      </div>
                    </td>
                    <td style={{ padding: "15px 24px", fontSize: 13.5, color: C.ink }}>{c.type}</td>
                    <td style={{ padding: "15px 24px", fontSize: 13.5, color: C.ink }}>{c.heure}</td>
                    <td style={{ padding: "15px 24px" }}>{c.verifie ? <Badge color={C.emerald} bg={C.emeraldSoft}>Vérifiée</Badge> : <Badge color={C.amber} bg={C.amberSoft}>En attente</Badge>}</td>
                    <td style={{ padding: "15px 24px" }}>{c.resultat ? <Badge color={statutColor(c.resultat)} bg={statutBg(c.resultat)}>{c.resultat}</Badge> : <span style={{ color: C.inkSoft, fontSize: 13 }}>-</span>}</td>
                    <td style={{ padding: "15px 24px" }}>
                      {!c.verifie ? <Btn small variant="outline" onClick={() => { setSelected(c); setView("verif"); }}>Vérifier</Btn>
                        : !c.resultat ? <Btn small onClick={() => { setSelected(c); setView("resultat"); }}>Saisir résultat</Btn>
                          : <span style={{ color: C.emerald, fontSize: 13, fontWeight: 600, display: "inline-flex", alignItems: "center", gap: 4 }}><Icon name="check" size={14} color={C.emerald} /> Terminé</span>}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Card>
        )}

        {view === "verif" && selected && (
          <Card style={{ maxWidth: 500, margin: "0 auto", padding: 30 }}>
            <h3 style={{ margin: "0 0 4px", fontSize: 20, color: C.ink, textAlign: "center", fontWeight: 700 }}>Vérification biométrique</h3>
            <p style={{ color: C.inkSoft, fontSize: 13.5, textAlign: "center", marginTop: 0, marginBottom: 24 }}>Candidat : <b style={{ color: C.ink }}>{selected.nom}</b></p>
            <div style={{ display: "flex", gap: 20, justifyContent: "center", marginBottom: 22 }}>
              {[["camera", "Photo CNI"], ["fingerprint", "Empreinte digitale"]].map(([ic, lab]) => (
                <div key={lab} style={{ textAlign: "center" }}>
                  <div style={{ width: 118, height: 138, borderRadius: 14, background: C.mint, border: `1.5px solid ${C.emeraldSoft}`, display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <Icon name={ic} size={42} color={C.emerald} stroke={1.5} />
                  </div>
                  <div style={{ fontSize: 12.5, color: C.inkSoft, marginTop: 9 }}>{lab}</div>
                </div>
              ))}
            </div>
            <div style={{ display: "flex", gap: 9, alignItems: "flex-start", background: C.mint, borderRadius: 11, padding: "12px 14px", fontSize: 13, color: C.green, marginBottom: 22, lineHeight: 1.5 }}>
              <Icon name="shield" size={16} color={C.emerald} />
              <span>Comparez l'identité du candidat avec les données enregistrées lors de l'inscription.</span>
            </div>
            <div style={{ display: "flex", gap: 10 }}>
              <Btn variant="outline" full onClick={() => { setView("liste"); setSelected(null); }}>Annuler</Btn>
              <Btn variant="accent" full onClick={() => { onVerifie(selected.id); setView("liste"); setSelected(null); }} icon="check">Confirmer l'identité</Btn>
            </div>
          </Card>
        )}

        {view === "resultat" && selected && (
          <ResultatForm selected={selected} onCancel={() => { setView("liste"); setSelected(null); }}
            onSubmit={(mention, score) => { onResultat(selected.id, mention, score); setView("liste"); setSelected(null); }} />
        )}
      </div>
    </div>
  );
}

function ResultatForm({ selected, onCancel, onSubmit }) {
  const [score, setScore] = useState("32");
  const isCode = selected.type === "Code de la route";
  return (
    <Card style={{ maxWidth: 500, margin: "0 auto", padding: 30 }}>
      <h3 style={{ margin: "0 0 4px", fontSize: 20, color: C.ink, textAlign: "center", fontWeight: 700 }}>Saisie du résultat</h3>
      <p style={{ color: C.inkSoft, fontSize: 13.5, textAlign: "center", marginTop: 0, marginBottom: 10 }}>{selected.nom} · {selected.type}</p>
      <div style={{ textAlign: "center", marginBottom: 20 }}><Badge color={C.emerald} bg={C.emeraldSoft}><Icon name="check" size={13} color={C.emerald} /> Identité vérifiée</Badge></div>
      {isCode && <Field label="Score obtenu (sur 40)"><Input value={score} onChange={(e) => setScore(e.target.value)} placeholder="ex : 32" /></Field>}
      <label style={{ display: "block", fontSize: 13, fontWeight: 600, marginBottom: 10, color: C.ink }}>Décision</label>
      <div style={{ display: "flex", gap: 10, marginBottom: 22 }}>
        <Btn variant="accent" full onClick={() => onSubmit("Admis", isCode ? `${score}/40` : null)}>Admis</Btn>
        <Btn variant="danger" full onClick={() => onSubmit("Ajourné", isCode ? `${score}/40` : null)}>Ajourné</Btn>
      </div>
      <Btn variant="ghost" full small onClick={onCancel}>← Retour à la liste</Btn>
    </Card>
  );
}

// ============================================================
//  ESPACE ADMINISTRATEUR
// ============================================================

function AdminSpace({ onLogout, userName, dossiers, onUpdateDossier }) {
  const [page, setPage] = useState("dashboard");
  const menu = [
    { key: "dashboard", label: "Tableau de bord", icon: "chart" },
    { key: "dossiers", label: "Dossiers", icon: "folder" },
    { key: "centres", label: "Centres", icon: "building" },
    { key: "creneaux", label: "Planning", icon: "calendar" },
  ];

  return (
    <div style={{ minHeight: "100vh", background: C.bg, fontFamily: FONT, display: "flex", flexDirection: "column" }}>
      <TopBar role="Administrateur" userName={userName} onLogout={onLogout} />
      <div style={{ display: "flex", flex: 1 }}>
        <div style={{ width: 230, background: "#fff", borderRight: `1px solid ${C.line}`, padding: "22px 14px", flexShrink: 0 }}>
          {menu.map((m) => (
            <button key={m.key} onClick={() => setPage(m.key)}
              style={{
                display: "flex", alignItems: "center", gap: 11, width: "100%", textAlign: "left",
                padding: "12px 14px", borderRadius: 11, border: "none", cursor: "pointer", marginBottom: 4,
                fontFamily: FONT, fontSize: 14.5, fontWeight: 600, transition: "all .2s",
                background: page === m.key ? C.mint : "transparent",
                color: page === m.key ? C.green : C.inkSoft,
              }}>
              <Icon name={m.icon} size={18} color={page === m.key ? C.emerald : C.inkSoft} />{m.label}
            </button>
          ))}
        </div>
        <div style={{ flex: 1, padding: "30px 34px", overflow: "auto" }}>
          {page === "dashboard" && <AdminDashboard dossiers={dossiers} />}
          {page === "dossiers" && <AdminDossiers dossiers={dossiers} onUpdate={onUpdateDossier} />}
          {page === "centres" && <AdminCentres />}
          {page === "creneaux" && <AdminCreneaux />}
        </div>
      </div>
    </div>
  );
}

function Bar({ label, value, max, color }) {
  return (
    <div style={{ marginBottom: 15 }}>
      <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13.5, marginBottom: 6 }}>
        <span style={{ color: C.ink, fontWeight: 600 }}>{label}</span><span style={{ color: C.inkSoft }}>{value}</span>
      </div>
      <div style={{ height: 9, background: C.bg, borderRadius: 6, overflow: "hidden" }}>
        <div style={{ width: `${(parseFloat(value) / max) * 100}%`, height: "100%", background: color, borderRadius: 6, transition: "width .6s cubic-bezier(.4,0,.2,1)" }} />
      </div>
    </div>
  );
}

function AdminDashboard({ dossiers }) {
  const enAttente = dossiers.filter((d) => d.statut === "En attente").length;
  const regionsData = [["Dakar", 540, C.green], ["Thiès", 280, C.emerald], ["Saint-Louis", 190, C.amber], ["Kaolack", 140, C.blue], ["Autres", 98, C.inkSoft]];
  const maxR = Math.max(...regionsData.map((r) => r[1]));

  return (
    <div>
      <h1 style={{ fontSize: 27, color: C.ink, margin: "0 0 4px", fontWeight: 800, letterSpacing: -0.6 }}>Tableau de bord</h1>
      <p style={{ color: C.inkSoft, fontSize: 14.5, marginTop: 0, marginBottom: 24 }}>Vue d'ensemble de la plateforme · Juillet 2026</p>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 16, marginBottom: 24 }}>
        <StatCard label="Candidats inscrits" value="1 248" color={C.blue} icon="user" sub="+12 % ce mois" />
        <StatCard label="Dossiers en attente" value={String(enAttente)} color={C.amber} icon="folder" sub="À traiter" />
        <StatCard label="Examens cette semaine" value="86" color={C.emerald} icon="calendar" sub="4 centres" />
        <StatCard label="Taux de réussite" value="41 %" color={C.green} icon="award" sub="+6 pts" />
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1.4fr 1fr", gap: 16 }}>
        <Card>
          <h3 style={{ margin: "0 0 20px", fontSize: 17, color: C.ink, fontWeight: 700 }}>Candidats par région</h3>
          {regionsData.map(([r, n, col]) => <Bar key={r} label={r} value={String(n)} max={maxR} color={col} />)}
        </Card>
        <Card>
          <h3 style={{ margin: "0 0 20px", fontSize: 17, color: C.ink, fontWeight: 700 }}>Répartition des examens</h3>
          <Bar label="Code de la route" value="68 %" max={100} color={C.emerald} />
          <Bar label="Conduite" value="32 %" max={100} color={C.amber} />
          <div style={{ marginTop: 20, padding: 16, background: `linear-gradient(120% 100% at 0% 0%, ${C.mint}, #fff)`, borderRadius: 12, border: `1px solid ${C.emeraldSoft}` }}>
            <div style={{ fontSize: 12.5, color: C.inkSoft, fontWeight: 600 }}>Délai moyen de traitement</div>
            <div style={{ fontSize: 23, color: C.green, fontWeight: 800, marginTop: 2, letterSpacing: -0.5 }}>68 heures</div>
          </div>
        </Card>
      </div>
    </div>
  );
}

function AdminDossiers({ dossiers, onUpdate }) {
  return (
    <div>
      <h1 style={{ fontSize: 27, color: C.ink, margin: "0 0 4px", fontWeight: 800, letterSpacing: -0.6 }}>Gestion des dossiers</h1>
      <p style={{ color: C.inkSoft, fontSize: 14.5, marginTop: 0, marginBottom: 22 }}>Validez ou rejetez les candidatures soumises.</p>
      <Card style={{ padding: 0, overflow: "hidden" }}>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ background: C.bg }}>
              {["Dossier", "Candidat", "Région", "Type", "Date", "Statut", "Actions"].map((h) => (
                <th key={h} style={{ textAlign: "left", padding: "13px 20px", fontSize: 12, color: C.inkSoft, fontWeight: 700, textTransform: "uppercase", letterSpacing: 0.4 }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {dossiers.map((d) => (
              <tr key={d.id} style={{ borderTop: `1px solid ${C.line}` }}>
                <td style={{ padding: "14px 20px", fontSize: 13.5, fontWeight: 700, color: C.green }}>#{d.id}</td>
                <td style={{ padding: "14px 20px", fontSize: 14, color: C.ink, fontWeight: 600 }}>{d.candidat}</td>
                <td style={{ padding: "14px 20px", fontSize: 13.5, color: C.ink }}>{d.region}</td>
                <td style={{ padding: "14px 20px", fontSize: 13.5, color: C.ink }}>{d.type}</td>
                <td style={{ padding: "14px 20px", fontSize: 13.5, color: C.inkSoft }}>{d.date}</td>
                <td style={{ padding: "14px 20px" }}><Badge color={statutColor(d.statut)} bg={statutBg(d.statut)}>{d.statut}</Badge></td>
                <td style={{ padding: "14px 20px" }}>
                  {d.statut === "En attente" ? (
                    <div style={{ display: "flex", gap: 8 }}>
                      <Btn small variant="accent" onClick={() => onUpdate(d.id, "Validé")}>Valider</Btn>
                      <Btn small variant="danger" onClick={() => onUpdate(d.id, "Rejeté")}>Rejeter</Btn>
                    </div>
                  ) : <span style={{ fontSize: 13, color: C.inkSoft }}>-</span>}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </div>
  );
}

function AdminCentres() {
  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 22, flexWrap: "wrap", gap: 12 }}>
        <div>
          <h1 style={{ fontSize: 27, color: C.ink, margin: "0 0 4px", fontWeight: 800, letterSpacing: -0.6 }}>Centres d'examen</h1>
          <p style={{ color: C.inkSoft, fontSize: 14.5, margin: 0 }}>Gérez les centres répartis sur le territoire.</p>
        </div>
        <Btn icon="arrowRight">Ajouter un centre</Btn>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(270px, 1fr))", gap: 16 }}>
        {CENTRES.map((c) => (
          <Card key={c.id} hover>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
              <div style={{ width: 44, height: 44, borderRadius: 12, background: C.mint, display: "flex", alignItems: "center", justifyContent: "center" }}><Icon name="building" size={21} color={C.green} /></div>
              <Badge color={C.emerald} bg={C.emeraldSoft}>Actif</Badge>
            </div>
            <h3 style={{ margin: "16px 0 4px", fontSize: 16, color: C.ink, fontWeight: 700 }}>{c.nom}</h3>
            <div style={{ fontSize: 13.5, color: C.inkSoft }}>Région : {c.region}</div>
            <div style={{ fontSize: 13.5, color: C.inkSoft, marginTop: 2 }}>Capacité : {c.capacite} candidats/jour</div>
            <div style={{ display: "flex", gap: 8, marginTop: 16 }}>
              <Btn small variant="outline">Modifier</Btn>
              <Btn small variant="ghost">Détails</Btn>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}

function AdminCreneaux() {
  const rows = [
    ["2026-07-10", "08h00", "Dakar", "Code", 50, 50, "Complet"],
    ["2026-07-10", "10h00", "Dakar", "Conduite", 30, 22, "Ouvert"],
    ["2026-07-11", "08h00", "Thiès", "Code", 35, 18, "Ouvert"],
    ["2026-07-12", "09h00", "Saint-Louis", "Conduite", 25, 25, "Complet"],
  ];
  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 22, flexWrap: "wrap", gap: 12 }}>
        <div>
          <h1 style={{ fontSize: 27, color: C.ink, margin: "0 0 4px", fontWeight: 800, letterSpacing: -0.6 }}>Planning des examens</h1>
          <p style={{ color: C.inkSoft, fontSize: 14.5, margin: 0 }}>Planifiez les créneaux par centre et par date.</p>
        </div>
        <Btn icon="arrowRight">Nouveau créneau</Btn>
      </div>
      <Card style={{ padding: 0, overflow: "hidden" }}>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ background: C.bg }}>
              {["Date", "Heure", "Centre", "Type", "Capacité", "Inscrits", "Statut"].map((h) => (
                <th key={h} style={{ textAlign: "left", padding: "13px 20px", fontSize: 12, color: C.inkSoft, fontWeight: 700, textTransform: "uppercase", letterSpacing: 0.4 }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, i) => (
              <tr key={i} style={{ borderTop: `1px solid ${C.line}` }}>
                <td style={{ padding: "14px 20px", fontSize: 13.5, fontWeight: 600, color: C.ink }}>{row[0]}</td>
                <td style={{ padding: "14px 20px", fontSize: 13.5, color: C.ink }}>{row[1]}</td>
                <td style={{ padding: "14px 20px", fontSize: 13.5, color: C.ink }}>{row[2]}</td>
                <td style={{ padding: "14px 20px", fontSize: 13.5, color: C.ink }}>{row[3]}</td>
                <td style={{ padding: "14px 20px", fontSize: 13.5, color: C.inkSoft }}>{row[4]}</td>
                <td style={{ padding: "14px 20px", fontSize: 13.5, color: C.ink, fontWeight: 600 }}>{row[5]}</td>
                <td style={{ padding: "14px 20px" }}><Badge color={row[6] === "Complet" ? C.red : C.emerald} bg={row[6] === "Complet" ? C.redSoft : C.emeraldSoft}>{row[6]}</Badge></td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </div>
  );
}

// ============================================================
//  ROOT
// ============================================================

const API = "http://localhost:4000/api";

export default function App() {
  const [screen, setScreen] = useState("home");
  const [role, setRole] = useState(null);
  const [userName, setUserName] = useState("");
  const [convoques, setConvoques] = useState([]);
  const [dossiers, setDossiers] = useState([]);
  const [monInscription, setMonInscription] = useState(null);

  // Charger les données depuis le backend
  async function chargerConvoques() {
    try { const r = await fetch(`${API}/candidats`); setConvoques(await r.json()); } catch (e) { console.error(e); }
  }
  async function chargerDossiers() {
    try { const r = await fetch(`${API}/dossiers`); setDossiers(await r.json()); } catch (e) { console.error(e); }
  }
  async function chargerMonInscription(nom) {
    try { const r = await fetch(`${API}/inscriptions/${encodeURIComponent(nom)}`); const data = await r.json(); setMonInscription(data); } catch (e) { console.error(e); }
  }

  // Recharger les données quand on entre dans un espace
  useEffect(() => {
    if (screen === "examinateur") chargerConvoques();
    if (screen === "admin") chargerDossiers();
    if (screen === "candidat" && userName) chargerMonInscription(userName);
  }, [screen, userName]);

  async function enregistrerInscription(data) {
    try {
      const r = await fetch(`${API}/inscriptions`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const inscription = await r.json();
      setMonInscription(inscription);
    } catch (e) { console.error(e); }
  }

  async function setVerifie(id) {
    try {
      await fetch(`${API}/candidats/${id}/verifier`, { method: "PUT" });
      chargerConvoques();
    } catch (e) { console.error(e); }
  }

  async function setResultat(id, mention, score) {
    try {
      await fetch(`${API}/candidats/${id}/resultat`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ mention, score }),
      });
      chargerConvoques();
      if (userName) chargerMonInscription(userName);
    } catch (e) { console.error(e); }
  }

  async function updateDossier(id, statut) {
    try {
      await fetch(`${API}/dossiers/${id}/statut`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ statut }),
      });
      chargerDossiers();
      if (userName) chargerMonInscription(userName);
    } catch (e) { console.error(e); }
  }

  function selectRole(r) { setRole(r); setScreen("login"); }
  function login(pwd, identifiant) {
    const nom = (identifiant && identifiant.trim()) ? identifiant.trim() : "Utilisateur";
    if (role === "candidat" && pwd === "root") { setUserName("Admin DAWALAL"); setScreen("admin"); return; }
    setUserName(nom);
    setScreen(role);
  }
  function logout() { setScreen("home"); setRole(null); setUserName(""); setMonInscription(null); }

  if (screen === "home") return <HomePage onSelectRole={selectRole} />;
  if (screen === "login") return <LoginScreen role={role} onLogin={login} onBack={() => setScreen("home")} />;
  if (screen === "candidat") return <CandidatSpace onLogout={logout} userName={userName} monInscription={monInscription} onInscription={enregistrerInscription} />;
  if (screen === "examinateur") return <ExaminateurSpace onLogout={logout} userName={userName} convoques={convoques} onVerifie={setVerifie} onResultat={setResultat} />;
  if (screen === "admin") return <AdminSpace onLogout={logout} userName={userName} dossiers={dossiers} onUpdateDossier={updateDossier} />;
  return null;
}
