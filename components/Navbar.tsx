"use client";
import { useState } from "react";
import Link from "next/link";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

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
            {/* Background with shadow */}
            <rect width="44" height="44" rx="14" fill="url(#logoGrad)" filter="url(#logoShadow)" />
            {/* Shine overlay */}
            <rect width="44" height="22" rx="14" fill="white" fillOpacity="0.07" />
            {/* Magnifying glass ring */}
            <circle cx="18" cy="18" r="10.5" stroke="white" strokeWidth="2.5" fill="none" />
            {/* Location pin inside the glass */}
            <path d="M18 21.5 C15.8 19.8 13.5 18.2 13.5 15.8 A4.5 4.5 0 0 1 22.5 15.8 C22.5 18.2 20.2 19.8 18 21.5Z" fill="white" />
            {/* Pin head dot */}
            <circle cx="18" cy="14.8" r="1.6" fill="url(#logoGrad)" />
            {/* Handle */}
            <line x1="26.5" y1="26.5" x2="34" y2="34" stroke="white" strokeWidth="2.8" strokeLinecap="round" />
          </svg>
          <div>
            <div style={{ fontWeight: 800, fontSize: 20, color: "#1a1a2e", lineHeight: 1, letterSpacing: "-0.5px", fontFamily: "var(--font-geist-sans)" }}>Amena</div>
            <div style={{ fontSize: 10, color: "#aaa", letterSpacing: "0.5px", textTransform: "uppercase", fontWeight: 500 }}>Lost & Found Tunisia</div>
          </div>
        </Link>

        {/* Desktop nav */}
        <div className="nav-desktop">
          <Link href="/" style={{ color: "#e53935", fontWeight: 600, fontSize: 14, textDecoration: "none", borderBottom: "2px solid #e53935", paddingBottom: 2 }}>Accueil</Link>
          <Link href="/?type=perdu" style={{ color: "#555", fontSize: 14, textDecoration: "none" }}>Objets Perdus</Link>
          <Link href="/?type=trouve" style={{ color: "#555", fontSize: 14, textDecoration: "none" }}>Objets Trouvés</Link>
          <Link href="#" style={{ color: "#555", fontSize: 14, textDecoration: "none" }}>Aide</Link>
          <div style={{ display: "flex", alignItems: "center", border: "2px solid #e53935", borderRadius: 8, overflow: "hidden" }}>
            <Link href="#" style={{ color: "#e53935", fontSize: 13, textDecoration: "none", fontWeight: 600, padding: "7px 14px", borderRight: "1px solid #e53935" }}>Créer un compte</Link>
            <Link href="#" style={{ color: "#e53935", fontSize: 13, textDecoration: "none", fontWeight: 600, padding: "7px 14px" }}>Se Connecter</Link>
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
          <Link href="/" style={{ color: "#e53935", fontWeight: 600, fontSize: 15, textDecoration: "none" }} onClick={() => setMenuOpen(false)}>Accueil</Link>
          <Link href="/?type=perdu" style={{ color: "#555", fontSize: 15, textDecoration: "none" }} onClick={() => setMenuOpen(false)}>Objets Perdus</Link>
          <Link href="/?type=trouve" style={{ color: "#555", fontSize: 15, textDecoration: "none" }} onClick={() => setMenuOpen(false)}>Objets Trouvés</Link>
          <Link href="#" style={{ color: "#555", fontSize: 15, textDecoration: "none" }} onClick={() => setMenuOpen(false)}>Aide</Link>
          <div style={{ display: "flex", gap: 12, paddingTop: 8, borderTop: "1px solid #f0f0f0" }}>
            <Link href="#" style={{ flex: 1, textAlign: "center", color: "#e53935", fontSize: 14, fontWeight: 600, textDecoration: "none", padding: "10px", border: "2px solid #e53935", borderRadius: 8 }}>Créer un compte</Link>
            <Link href="#" style={{ flex: 1, textAlign: "center", color: "#fff", fontSize: 14, fontWeight: 600, textDecoration: "none", padding: "10px", background: "#e53935", borderRadius: 8 }}>Se Connecter</Link>
          </div>
        </div>
      )}
    </nav>
  );
}
