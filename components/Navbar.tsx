"use client";
import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLang } from "@/lib/LangContext";
import { tr } from "@/lib/translations";
import { useUser } from "@/lib/UserContext";

const IconAnnonces = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="3" width="7" height="7" rx="1" />
    <rect x="14" y="3" width="7" height="7" rx="1" />
    <rect x="3" y="14" width="7" height="7" rx="1" />
    <rect x="14" y="14" width="7" height="7" rx="1" />
  </svg>
);

const IconFavoris = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
  </svg>
);

const IconMessages = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
  </svg>
);

const IconLogout = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
    <polyline points="16 17 21 12 16 7" />
    <line x1="21" y1="12" x2="9" y2="12" />
  </svg>
);

const IconChevron = ({ open }: { open: boolean }) => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
    style={{ transform: open ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 0.2s" }}>
    <polyline points="6 9 12 15 18 9" />
  </svg>
);

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropOpen, setDropOpen] = useState(false);
  const [hovered, setHovered] = useState<string | null>(null);
  const pathname = usePathname();
  const { lang, setLang } = useLang();
  const { user, logout } = useUser();
  const t = tr[lang].nav;

  const tl = {
    fr: { annonces: "Mes annonces", favoris: "Favoris", messages: "Messages", profile: "Mon profil", logout: "Déconnexion" },
    ar: { annonces: "إعلاناتي", favoris: "المفضلة", messages: "رسائل", profile: "حسابي", logout: "خروج" },
  }[lang];

  const navItems = [
    { key: "annonces", href: "/mes-annonces", icon: <IconAnnonces />, label: tl.annonces, color: "#b85c25", bg: "#fef0e6" },
    { key: "favoris",  href: "/favoris",      icon: <IconFavoris />,  label: tl.favoris,  color: "#b85c25", bg: "#fef0e6" },
    { key: "messages", href: "/messages",     icon: <IconMessages />, label: tl.messages, color: "#b85c25", bg: "#fef0e6", badge: 2 },
  ];

  const initial = user?.name.trim()[0]?.toUpperCase() ?? "?";

  const langToggle = (
    <div style={{ display: "flex", alignItems: "center", border: "1px solid #e0e0e0", borderRadius: 8, overflow: "hidden", fontSize: 13, flexShrink: 0 }}>
      <button onClick={() => setLang("fr")} style={{ padding: "6px 11px", fontWeight: lang === "fr" ? 700 : 400, color: lang === "fr" ? "#b85c25" : "#888", background: lang === "fr" ? "#fef0e6" : "#fff", border: "none", cursor: "pointer" }}>FR</button>
      <div style={{ width: 1, height: 18, background: "#e0e0e0" }} />
      <button onClick={() => setLang("ar")} style={{ padding: "6px 11px", fontWeight: lang === "ar" ? 700 : 400, color: lang === "ar" ? "#b85c25" : "#888", background: lang === "ar" ? "#fef0e6" : "#fff", border: "none", cursor: "pointer" }}>AR</button>
    </div>
  );

  const userSection = user ? (
    <div style={{ position: "relative" }}>
      <button
        onClick={() => setDropOpen(o => !o)}
        style={{
          display: "flex", alignItems: "center", gap: 8,
          padding: "5px 12px 5px 6px", borderRadius: 50,
          background: "#fef0e6", border: `1.5px solid ${dropOpen ? "#6b2f0e" : "#b85c25"}`,
          cursor: "pointer", transition: "all 0.18s",
          boxShadow: dropOpen ? "0 2px 12px rgba(21,101,192,0.18)" : "none",
        }}
      >
        <div style={{ width: 28, height: 28, borderRadius: "50%", background: "linear-gradient(135deg,#1976d2,#6b2f0e)", color: "#fff", fontWeight: 800, fontSize: 13, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
          {initial}
        </div>
        <span style={{ fontSize: 13, fontWeight: 700, color: "#6b2f0e", maxWidth: 120, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
          {user.name.split(" ")[0]}
        </span>
        <IconChevron open={dropOpen} />
      </button>

      {dropOpen && (
        <>
          <div style={{
            position: "absolute", top: "calc(100% + 8px)", right: 0,
            background: "#fff", borderRadius: 14,
            boxShadow: "0 8px 32px rgba(0,0,0,0.14)",
            border: "1px solid rgba(0,0,0,0.08)",
            minWidth: 200, overflow: "hidden", zIndex: 200,
            animation: "navDropDown 0.18s ease",
          }}>
            <div style={{ padding: "14px 16px", background: "linear-gradient(135deg,#fef0e6,#fff)", borderBottom: "1px solid #f5f5f5" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <div style={{ width: 36, height: 36, borderRadius: "50%", background: "linear-gradient(135deg,#1976d2,#6b2f0e)", color: "#fff", fontWeight: 800, fontSize: 16, display: "flex", alignItems: "center", justifyContent: "center" }}>{initial}</div>
                <div>
                  <div style={{ fontWeight: 700, fontSize: 14, color: "#1a1a2e" }}>{user.name}</div>
                  <div style={{ fontSize: 11, color: "#aaa", marginTop: 1 }}>{user.email}</div>
                </div>
              </div>
            </div>
            <DropItem label={tl.profile} href="/profil" onClose={() => setDropOpen(false)} />
            <DropItem label={tl.annonces} href="/mes-annonces" onClose={() => setDropOpen(false)} />
            <div style={{ borderTop: "1px solid #f5f5f5", padding: "6px 0" }}>
              <button
                onClick={() => { setDropOpen(false); logout(); }}
                style={{ width: "100%", textAlign: "left", padding: "10px 16px", background: "none", border: "none", fontSize: 14, color: "#b85c25", cursor: "pointer", fontWeight: 600, display: "flex", alignItems: "center", gap: 8 }}
              >
                <IconLogout />{tl.logout}
              </button>
            </div>
          </div>
          <div style={{ position: "fixed", inset: 0, zIndex: 199 }} onClick={() => setDropOpen(false)} />
        </>
      )}
    </div>
  ) : (
    <div style={{ display: "flex", alignItems: "center", border: "1px solid #e0e0e0", borderRadius: 8, overflow: "hidden", fontSize: 13, flexShrink: 0 }}>
      <Link href="/inscription" style={{ padding: "7px 14px", fontWeight: 700, color: pathname === "/inscription" ? "#b85c25" : "#888", background: pathname === "/inscription" ? "#fef0e6" : "#fff", textDecoration: "none", display: "block" }}>{t.register}</Link>
      <div style={{ width: 1, height: 18, background: "#e0e0e0" }} />
      <Link href="/connexion" style={{ padding: "7px 14px", fontWeight: 700, color: pathname === "/connexion" ? "#b85c25" : "#888", background: pathname === "/connexion" ? "#fef0e6" : "#fff", textDecoration: "none", display: "block" }}>{t.login}</Link>
    </div>
  );

  return (
    <>
      <style>{`
        @keyframes navDropDown {
          from { opacity: 0; transform: translateY(-8px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      <nav style={{ background: "#fff", borderBottom: "1px solid #e8e8e8", position: "sticky", top: 0, zIndex: 100, boxShadow: "0 1px 4px rgba(0,0,0,0.08)" }}>
        {/* Main row */}
        <div style={{ padding: "0 32px", display: "flex", alignItems: "center", justifyContent: "space-between", height: 72 }}>
          {/* Logo */}
          <Link href="/" style={{ display: "flex", alignItems: "center", textDecoration: "none", cursor: "pointer" }}>
            <img src="/logo.png" alt="Tunisia Lost & Found" style={{ height: 56, width: "auto", filter: "brightness(1.4)" }} />
          </Link>

          {/* Desktop nav */}
          <div className="nav-desktop">
            <NavLink href="/" active={pathname === "/"}>{t.home}</NavLink>
            <NavLink href="/aide" active={pathname === "/aide"}>{t.help}</NavLink>
            <Link href="/boost" style={{ background: "#fff", color: "#d97706", fontSize: 13, fontWeight: 700, textDecoration: "none", padding: "7px 14px", borderRadius: 8, border: "1.5px solid #f59e0b" }}>{t.boost}</Link>
            {langToggle}
            {userSection}
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

        {/* Sub-bar: 3 boutons utilisateur (desktop, seulement si connecté) */}
        {user && (
          <div className="nav-desktop" style={{
            borderTop: "1px solid rgba(229,57,53,0.10)",
            background: "#fff",
            padding: "0 32px",
            height: 44,
            alignItems: "center",
            gap: 4,
            justifyContent: "flex-end",
          }}>
            {navItems.map(item => (
              <Link
                key={item.key}
                href={item.href}
                style={{
                  display: "flex", alignItems: "center", gap: 7,
                  padding: "5px 14px", borderRadius: 50,
                  fontSize: 13, fontWeight: 600,
                  textDecoration: "none",
                  color: hovered === item.key ? item.color : "#555",
                  background: hovered === item.key ? item.bg : "transparent",
                  transition: "all 0.18s ease",
                  position: "relative",
                }}
                onMouseEnter={() => setHovered(item.key)}
                onMouseLeave={() => setHovered(null)}
              >
                <span style={{ color: hovered === item.key ? item.color : "#999", transition: "color 0.18s" }}>
                  {item.icon}
                </span>
                {item.label}
                {item.badge ? (
                  <span style={{
                    position: "absolute", top: 2, right: 2,
                    background: item.color, color: "#fff",
                    fontSize: 10, fontWeight: 800,
                    borderRadius: "50%", width: 16, height: 16,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    boxShadow: "0 0 0 2px #fff",
                  }}>{item.badge}</span>
                ) : null}
              </Link>
            ))}
          </div>
        )}

        {/* Mobile dropdown menu */}
        {menuOpen && (
          <div style={{ background: "#fff", borderTop: "1px solid #f0f0f0", padding: "16px 24px", display: "flex", flexDirection: "column", gap: 16 }}>
            <Link href="/" style={{ color: "#b85c25", fontWeight: 600, fontSize: 15, textDecoration: "none" }} onClick={() => setMenuOpen(false)}>{t.home}</Link>
            <Link href="/aide" style={{ color: "#555", fontSize: 15, textDecoration: "none" }} onClick={() => setMenuOpen(false)}>{t.help}</Link>
            <Link href="/boost" style={{ color: "#d97706", fontSize: 15, fontWeight: 700, textDecoration: "none" }} onClick={() => setMenuOpen(false)}>{t.boost}</Link>
            <div style={{ paddingTop: 4 }}>{langToggle}</div>
            {user ? (
              <div style={{ paddingTop: 8, borderTop: "1px solid #f0f0f0", display: "flex", flexDirection: "column", gap: 12 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <div style={{ width: 36, height: 36, borderRadius: "50%", background: "linear-gradient(135deg,#1976d2,#6b2f0e)", color: "#fff", fontWeight: 800, fontSize: 16, display: "flex", alignItems: "center", justifyContent: "center" }}>
                    {initial}
                  </div>
                  <div>
                    <div style={{ fontWeight: 700, fontSize: 14, color: "#1a1a2e" }}>{user.name}</div>
                    <div style={{ fontSize: 11, color: "#aaa" }}>{user.email}</div>
                  </div>
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                  {navItems.map(item => (
                    <Link key={item.key} href={item.href} onClick={() => setMenuOpen(false)}
                      style={{ display: "flex", alignItems: "center", gap: 10, padding: "10px 12px", borderRadius: 10, fontSize: 14, fontWeight: 600, color: item.color, background: item.bg, textDecoration: "none", position: "relative" }}>
                      {item.icon}{item.label}
                      {item.badge ? <span style={{ marginLeft: "auto", background: item.color, color: "#fff", fontSize: 10, fontWeight: 800, borderRadius: "50%", width: 18, height: 18, display: "flex", alignItems: "center", justifyContent: "center" }}>{item.badge}</span> : null}
                    </Link>
                  ))}
                </div>
                <button onClick={() => { logout(); setMenuOpen(false); }} style={{ background: "#fef0e6", color: "#b85c25", border: "1px solid #fde8e8", borderRadius: 8, padding: "10px", fontWeight: 600, fontSize: 14, cursor: "pointer" }}>
                  {tl.logout}
                </button>
              </div>
            ) : (
              <div style={{ display: "flex", gap: 12, paddingTop: 8, borderTop: "1px solid #f0f0f0" }}>
                <Link href="/inscription" style={{ flex: 1, textAlign: "center", color: "#b85c25", fontSize: 14, fontWeight: 600, textDecoration: "none", padding: "10px", border: "2px solid #b85c25", borderRadius: 8 }} onClick={() => setMenuOpen(false)}>{t.register}</Link>
                <Link href="/connexion" style={{ flex: 1, textAlign: "center", color: "#fff", fontSize: 14, fontWeight: 600, textDecoration: "none", padding: "10px", background: "#b85c25", borderRadius: 8 }} onClick={() => setMenuOpen(false)}>{t.login}</Link>
              </div>
            )}
          </div>
        )}
      </nav>
    </>
  );
}

function NavLink({ href, active, children }: { href: string; active: boolean; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      style={{
        color: active ? "#b85c25" : "#555",
        fontWeight: 700,
        fontSize: 13,
        textDecoration: "none",
        padding: "7px 14px",
        borderRadius: 8,
        background: active ? "#fef0e6" : "transparent",
        transition: "color 0.15s, background 0.15s",
      }}
    >
      {children}
    </Link>
  );
}

function DropItem({ label, href, onClose }: { label: string; href: string; onClose: () => void }) {
  const [h, setH] = useState(false);
  return (
    <Link
      href={href}
      onClick={onClose}
      style={{ display: "block", padding: "10px 16px", fontSize: 14, color: h ? "#b85c25" : "#333", background: h ? "#fef0e6" : "transparent", textDecoration: "none", transition: "all 0.12s", fontWeight: 500 }}
      onMouseEnter={() => setH(true)}
      onMouseLeave={() => setH(false)}
    >
      {label}
    </Link>
  );
}
