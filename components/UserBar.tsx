"use client";
import { useState } from "react";
import Link from "next/link";
import { useUser } from "@/lib/UserContext";
import { useLang } from "@/lib/LangContext";

const IconAnnonces = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="3" width="7" height="7" rx="1" />
    <rect x="14" y="3" width="7" height="7" rx="1" />
    <rect x="3" y="14" width="7" height="7" rx="1" />
    <rect x="14" y="14" width="7" height="7" rx="1" />
  </svg>
);

const IconFavoris = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
  </svg>
);

const IconMessages = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
  </svg>
);

const IconChevron = ({ open }: { open: boolean }) => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
    style={{ transform: open ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 0.2s" }}>
    <polyline points="6 9 12 15 18 9" />
  </svg>
);

const IconLogout = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
    <polyline points="16 17 21 12 16 7" />
    <line x1="21" y1="12" x2="9" y2="12" />
  </svg>
);

const labels = {
  fr: { annonces: "Mes annonces", favoris: "Favoris", messages: "Messages", profile: "Mon profil", logout: "Déconnexion" },
  ar: { annonces: "إعلاناتي", favoris: "المفضلة", messages: "رسائل", profile: "حسابي", logout: "خروج" },
};

export default function UserBar() {
  const { user, logout } = useUser();
  const { lang } = useLang();
  const [dropOpen, setDropOpen] = useState(false);
  const [hovered, setHovered] = useState<string | null>(null);
  const t = labels[lang];

  if (!user) return null;

  const initial = user.name.trim()[0]?.toUpperCase() ?? "?";

  const items = [
    { key: "annonces", href: "/mes-annonces", icon: <IconAnnonces />, label: t.annonces, color: "#e53935", bg: "#fff5f5" },
    { key: "favoris",  href: "/favoris",      icon: <IconFavoris />,  label: t.favoris,  color: "#e91e8c", bg: "#fdf0f8", badge: 0 },
    { key: "messages", href: "/messages",     icon: <IconMessages />, label: t.messages, color: "#1976d2", bg: "#f0f6ff", badge: 2 },
  ];

  return (
    <>
      <style>{`
        @keyframes slideDown {
          from { opacity: 0; transform: translateY(-8px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .userbar-drop {
          animation: slideDown 0.18s ease;
        }
      `}</style>

      <div style={{
        position: "sticky",
        top: 64,
        zIndex: 99,
        background: "rgba(255,255,255,0.96)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
        borderBottom: "1px solid rgba(229,57,53,0.12)",
        boxShadow: "0 2px 16px rgba(0,0,0,0.06)",
      }}>
        {/* red accent line at top */}
        <div style={{ height: 3, background: "linear-gradient(90deg,#ff5252,#e53935,#c62828)", borderRadius: "0 0 3px 3px", position: "absolute", top: 0, left: 0, right: 0 }} />

        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 32px", height: 52, display: "flex", alignItems: "center", justifyContent: "space-between" }}>

          {/* Left: action items */}
          <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
            {items.map(item => (
              <Link
                key={item.key}
                href={item.href}
                style={{
                  display: "flex", alignItems: "center", gap: 8,
                  padding: "6px 14px", borderRadius: 50,
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
                <span style={{ color: hovered === item.key ? item.color : "#888", transition: "color 0.18s" }}>
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
                    boxShadow: `0 0 0 2px white`,
                  }}>{item.badge}</span>
                ) : null}
              </Link>
            ))}
          </div>

          {/* Right: user avatar pill */}
          <div style={{ position: "relative" }}>
            <button
              onClick={() => setDropOpen(o => !o)}
              style={{
                display: "flex", alignItems: "center", gap: 10,
                padding: "5px 14px 5px 6px",
                borderRadius: 50,
                border: "1.5px solid",
                borderColor: dropOpen ? "#e53935" : "rgba(0,0,0,0.10)",
                background: dropOpen ? "#fff5f5" : "#fff",
                cursor: "pointer",
                transition: "all 0.18s",
                boxShadow: dropOpen ? "0 2px 12px rgba(229,57,53,0.15)" : "0 1px 4px rgba(0,0,0,0.08)",
              }}
            >
              {/* avatar */}
              <div style={{
                width: 30, height: 30, borderRadius: "50%",
                background: "linear-gradient(135deg,#ff5252,#c62828)",
                color: "#fff", fontWeight: 800, fontSize: 14,
                display: "flex", alignItems: "center", justifyContent: "center",
                boxShadow: "0 2px 8px rgba(229,57,53,0.4)",
                flexShrink: 0,
              }}>{initial}</div>

              <span style={{ fontSize: 13, fontWeight: 700, color: "#1a1a2e", maxWidth: 100, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                {user.name.split(" ")[0]}
              </span>
              <IconChevron open={dropOpen} />
            </button>

            {dropOpen && (
              <div
                className="userbar-drop"
                style={{
                  position: "absolute",
                  top: "calc(100% + 8px)",
                  right: 0,
                  background: "#fff",
                  borderRadius: 14,
                  boxShadow: "0 8px 32px rgba(0,0,0,0.14)",
                  border: "1px solid rgba(0,0,0,0.08)",
                  minWidth: 200,
                  overflow: "hidden",
                  zIndex: 200,
                }}
              >
                {/* user info header */}
                <div style={{ padding: "14px 16px", background: "linear-gradient(135deg,#fff5f5,#fff)", borderBottom: "1px solid #f5f5f5" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <div style={{
                      width: 36, height: 36, borderRadius: "50%",
                      background: "linear-gradient(135deg,#ff5252,#c62828)",
                      color: "#fff", fontWeight: 800, fontSize: 16,
                      display: "flex", alignItems: "center", justifyContent: "center",
                    }}>{initial}</div>
                    <div>
                      <div style={{ fontWeight: 700, fontSize: 14, color: "#1a1a2e" }}>{user.name}</div>
                      <div style={{ fontSize: 11, color: "#aaa", marginTop: 1 }}>{user.email}</div>
                    </div>
                  </div>
                </div>

                {/* menu items */}
                <DropItem label={t.profile} href="/profil" />
                <DropItem label={t.annonces} href="/mes-annonces" />

                <div style={{ borderTop: "1px solid #f5f5f5", padding: "6px 0" }}>
                  <button
                    onClick={() => { setDropOpen(false); logout(); }}
                    style={{
                      width: "100%", textAlign: lang === "ar" ? "right" : "left",
                      padding: "10px 16px", background: "none", border: "none",
                      fontSize: 14, color: "#e53935", cursor: "pointer", fontWeight: 600,
                      display: "flex", alignItems: "center", gap: 8,
                    }}
                  >
                    <IconLogout />
                    {t.logout}
                  </button>
                </div>
              </div>
            )}

            {/* overlay to close dropdown */}
            {dropOpen && (
              <div
                style={{ position: "fixed", inset: 0, zIndex: 199 }}
                onClick={() => setDropOpen(false)}
              />
            )}
          </div>
        </div>
      </div>
    </>
  );
}

function DropItem({ label, href }: { label: string; href: string }) {
  const [h, setH] = useState(false);
  return (
    <Link
      href={href}
      style={{
        display: "block", padding: "10px 16px", fontSize: 14,
        color: h ? "#e53935" : "#333",
        background: h ? "#fff5f5" : "transparent",
        textDecoration: "none", transition: "all 0.12s", fontWeight: 500,
      }}
      onMouseEnter={() => setH(true)}
      onMouseLeave={() => setH(false)}
    >
      {label}
    </Link>
  );
}
