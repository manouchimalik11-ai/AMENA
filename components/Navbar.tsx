"use client";
import { useState } from "react";
import Link from "next/link";
import { useLang } from "@/lib/LangContext";
import { tr } from "@/lib/translations";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { lang, setLang } = useLang();
  const t = tr[lang].nav;

  const langToggle = (
    <div style={{ display: "flex", alignItems: "center", border: "1px solid #e0e0e0", borderRadius: 8, overflow: "hidden", fontSize: 13, flexShrink: 0 }}>
      <button
        onClick={() => setLang("fr")}
        style={{ padding: "6px 11px", fontWeight: lang === "fr" ? 700 : 400, color: lang === "fr" ? "#e53935" : "#888", background: lang === "fr" ? "#fff5f5" : "#fff", border: "none", cursor: "pointer" }}
      >
        FR
      </button>
      <div style={{ width: 1, height: 18, background: "#e0e0e0" }} />
      <button
        onClick={() => setLang("ar")}
        style={{ padding: "6px 11px", fontWeight: lang === "ar" ? 700 : 400, color: lang === "ar" ? "#e53935" : "#888", background: lang === "ar" ? "#fff5f5" : "#fff", border: "none", cursor: "pointer" }}
      >
        AR
      </button>
    </div>
  );

  return (
    <nav style={{ background: "#fff", borderBottom: "1px solid #e8e8e8", position: "sticky", top: 0, zIndex: 100, boxShadow: "0 1px 4px rgba(0,0,0,0.08)" }}>
      <div style={{ padding: "0 32px", display: "flex", alignItems: "center", justifyContent: "space-between", height: 64 }}>
        {/* Logo */}
        <Link href="/" style={{ display: "flex", alignItems: "center", gap: 10, textDecoration: "none" }}>
          <svg width="44" height="44" viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="logoGrad" x1="0" y1="0" x2="44" y2="44" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#FF5252" />
                <stop offset="60%" stopColor="#D32F2F" />
                <stop offset="100%" stopColor="#B71C1C" />
              </linearGradient>
              <filter id="logoShadow" x="-10%" y="-10%" width="120%" height="120%">
                <feDropShadow dx="0" dy="2" stdDeviation="2" floodColor="#B71C1C" floodOpacity="0.4" />
              </filter>
            </defs>
            <rect width="44" height="44" rx="14" fill="url(#logoGrad)" filter="url(#logoShadow)" />
            <rect width="44" height="22" rx="14" fill="white" fillOpacity="0.07" />
            <circle cx="18" cy="18" r="10.5" stroke="white" strokeWidth="2.5" fill="none" />
            <path d="M18 21.5 C15.8 19.8 13.5 18.2 13.5 15.8 A4.5 4.5 0 0 1 22.5 15.8 C22.5 18.2 20.2 19.8 18 21.5Z" fill="white" />
            <circle cx="18" cy="14.8" r="1.6" fill="url(#logoGrad)" />
            <line x1="26.5" y1="26.5" x2="34" y2="34" stroke="white" strokeWidth="2.8" strokeLinecap="round" />
          </svg>
          <div>
            <div style={{ fontWeight: 800, fontSize: 20, color: "#1a1a2e", lineHeight: 1, letterSpacing: "-0.5px", fontFamily: "var(--font-geist-sans)" }}>Amena</div>
            <div style={{ fontSize: 10, color: "#aaa", letterSpacing: "0.5px", textTransform: "uppercase", fontWeight: 500 }}>{t.logo_sub}</div>
          </div>
        </Link>

        {/* Desktop nav */}
        <div className="nav-desktop">
          <Link href="/" style={{ color: "#e53935", fontWeight: 600, fontSize: 14, textDecoration: "none", borderBottom: "2px solid #e53935", paddingBottom: 2 }}>{t.home}</Link>
          <Link href="/?type=perdu" style={{ color: "#555", fontSize: 14, textDecoration: "none" }}>{t.lost}</Link>
          <Link href="/?type=trouve" style={{ color: "#555", fontSize: 14, textDecoration: "none" }}>{t.found}</Link>
          <Link href="/aide" style={{ color: "#555", fontSize: 14, textDecoration: "none" }}>{t.help}</Link>
          <Link href="/boost" style={{ background: "linear-gradient(135deg,#f59e0b,#d97706)", color: "#fff", fontSize: 13, fontWeight: 800, textDecoration: "none", padding: "7px 14px", borderRadius: 8, boxShadow: "0 2px 8px rgba(245,158,11,0.35)" }}>{t.boost}</Link>
          {langToggle}
          <div style={{ display: "flex", alignItems: "center", border: "2px solid #e53935", borderRadius: 8, overflow: "hidden" }}>
            <Link href="/inscription" style={{ color: "#e53935", fontSize: 13, textDecoration: "none", fontWeight: 600, padding: "7px 14px", borderRight: "1px solid #e53935" }}>{t.register}</Link>
            <Link href="/connexion" style={{ color: "#e53935", fontSize: 13, textDecoration: "none", fontWeight: 600, padding: "7px 14px" }}>{t.login}</Link>
          </div>
        </div>

        {/* Mobile hamburger */}
        <button
          className="nav-hamburger"
          onClick={() => setMenuOpen(!menuOpen)}
          style={{ background: "none", border: "none", cursor: "pointer", padding: 8, flexDirection: "column", gap: 5 }}
          aria-label="Menu"
        >
          <span style={{ width: 24, height: 2, background: "#333", display: "block" }} />
          <span style={{ width: 24, height: 2, background: "#333", display: "block", marginTop: 5 }} />
          <span style={{ width: 24, height: 2, background: "#333", display: "block", marginTop: 5 }} />
        </button>
      </div>

      {/* Mobile dropdown menu */}
      {menuOpen && (
        <div style={{ background: "#fff", borderTop: "1px solid #f0f0f0", padding: "16px 24px", display: "flex", flexDirection: "column", gap: 16 }}>
          <Link href="/" style={{ color: "#e53935", fontWeight: 600, fontSize: 15, textDecoration: "none" }} onClick={() => setMenuOpen(false)}>{t.home}</Link>
          <Link href="/?type=perdu" style={{ color: "#555", fontSize: 15, textDecoration: "none" }} onClick={() => setMenuOpen(false)}>{t.lost}</Link>
          <Link href="/?type=trouve" style={{ color: "#555", fontSize: 15, textDecoration: "none" }} onClick={() => setMenuOpen(false)}>{t.found}</Link>
          <Link href="/aide" style={{ color: "#555", fontSize: 15, textDecoration: "none" }} onClick={() => setMenuOpen(false)}>{t.help}</Link>
          <Link href="/boost" style={{ color: "#d97706", fontSize: 15, fontWeight: 700, textDecoration: "none" }} onClick={() => setMenuOpen(false)}>{t.boost}</Link>
          <div style={{ paddingTop: 4 }}>{langToggle}</div>
          <div style={{ display: "flex", gap: 12, paddingTop: 8, borderTop: "1px solid #f0f0f0" }}>
            <Link href="/inscription" style={{ flex: 1, textAlign: "center", color: "#e53935", fontSize: 14, fontWeight: 600, textDecoration: "none", padding: "10px", border: "2px solid #e53935", borderRadius: 8 }} onClick={() => setMenuOpen(false)}>{t.register}</Link>
            <Link href="/connexion" style={{ flex: 1, textAlign: "center", color: "#fff", fontSize: 14, fontWeight: 600, textDecoration: "none", padding: "10px", background: "#e53935", borderRadius: 8 }} onClick={() => setMenuOpen(false)}>{t.login}</Link>
          </div>
        </div>
      )}
    </nav>
  );
}
