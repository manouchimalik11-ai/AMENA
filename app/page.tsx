"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { annonces, categories } from "@/lib/data";
import Footer from "@/components/Footer";
import Sidebar from "@/components/Sidebar";
import AnnonceCard from "@/components/AnnonceCard";
import { useLang } from "@/lib/LangContext";
import { tr } from "@/lib/translations";
import { GOVERNORATES } from "@/lib/geo";

export default function Home() {
  const [search, setSearch] = useState("");
  const [filtreCategorie, setFiltreCategorie] = useState("all");
  const [filtreType, setFiltreType] = useState("tous");
  const [gouvernoratSelectionne, setGouvernoratSelectionne] = useState("");
  const [villeSelectionnee, setVilleSelectionnee] = useState("");
  const [filtreDate, setFiltreDate] = useState("");
  const [vue, setVue] = useState<"grille" | "liste">("grille");
  const [tri, setTri] = useState("recent");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const router = useRouter();
  const { lang } = useLang();
  const t = tr[lang];

  const annoncesFiltrees = annonces.filter((a) => {
    const s = search.toLowerCase();
    const matchSearch = !s || a.titre.fr.toLowerCase().includes(s) || a.titre.ar.includes(search) || a.lieu.toLowerCase().includes(s);
    const gov = gouvernoratSelectionne ? GOVERNORATES.find(g => g.key === gouvernoratSelectionne) : null;
    const matchVille = !gov
      || (villeSelectionnee ? a.lieu === villeSelectionnee
        : gov.cities.some(c => c.toLowerCase() === a.lieu.toLowerCase()) || gov.fr.toLowerCase() === a.lieu.toLowerCase());
    const matchCat = filtreCategorie === "all" || a.categorie === filtreCategorie;
    const matchType = filtreType === "tous" || a.type === filtreType;
    const h = a.heuresEcoulees;
    const matchDate = !filtreDate
      || (filtreDate === "24h" && h <= 24)
      || (filtreDate === "48h" && h <= 48)
      || (filtreDate === "7j"  && h <= 168)
      || (filtreDate === "14j" && h <= 336)
      || (filtreDate === "1m"  && h <= 720)
      || (filtreDate === "1m+" && h > 720);
    return matchSearch && matchVille && matchCat && matchType && matchDate;
  });

  const catLabel = filtreCategorie !== "all"
    ? categories.find((c) => c.key === filtreCategorie)?.[lang] || filtreCategorie
    : "";

  return (
    <div style={{ minHeight: "100vh", background: "#f7f7f8", color: "#1a1a2e" }}>

      {/* ── HERO ── */}
      <section style={{ position: "relative", padding: "72px 24px 90px", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, backgroundImage: "url('https://images.unsplash.com/photo-1726428977637-ba8fc5a5047d?w=1600&fit=crop')", backgroundSize: "cover", backgroundPosition: "center" }} />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(160deg, rgba(10,15,60,0.72) 0%, rgba(20,10,50,0.55) 60%, rgba(180,20,20,0.45) 100%)" }} />
        <div style={{ position: "absolute", inset: 0, opacity: 0.04, backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")" }} />

        <div style={{ position: "relative", maxWidth: 900, margin: "0 auto", textAlign: "center" }}>
          <h1 className="hero-title" style={{ fontSize: 52, fontWeight: 900, color: "#fff", marginBottom: 16, lineHeight: 1.12, letterSpacing: "-1px", textTransform: "uppercase" }}>
            <span style={{ color: "#fff" }}>{t.hero.title_line1}</span>
            <span style={{ background: "linear-gradient(90deg, #ff8a80, #ff5252)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>{t.hero.title_line2}</span>
          </h1>
          <p style={{ fontSize: 18, color: "rgba(255,255,255,0.85)", margin: "0 auto 36px", lineHeight: 1.6, fontFamily: "var(--font-geist-sans), sans-serif", fontWeight: 400, letterSpacing: "0.3px", whiteSpace: "nowrap" }}>
            {t.hero.subtitle}
          </p>

          {/* Comment ça marche — dans le hero */}
          <div style={{ marginBottom: 36 }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: "rgba(255,255,255,0.5)", letterSpacing: "1.5px", textTransform: "uppercase", marginBottom: 16 }}>{t.how.title}</div>
            <div className="features-grid" style={{ gap: 12 }}>
              {[
                {
                  icon: (
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                      <path d="M12 20h9" stroke="#ff8a80" strokeWidth="2" strokeLinecap="round" />
                      <path d="M16.5 3.5a2.121 2.121 0 013 3L7 19l-4 1 1-4L16.5 3.5z" stroke="#ff8a80" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  ),
                  titre: t.how.s1_title,
                  desc: t.how.s1_desc,
                },
                {
                  icon: (
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                      <circle cx="11" cy="11" r="8" stroke="#ff8a80" strokeWidth="2" />
                      <path d="M16.5 16.5L21 21" stroke="#ff8a80" strokeWidth="2" strokeLinecap="round" />
                      <path d="M8 11h6M11 8v6" stroke="#ff8a80" strokeWidth="2" strokeLinecap="round" />
                    </svg>
                  ),
                  titre: t.how.s2_title,
                  desc: t.how.s2_desc,
                },
                {
                  icon: (
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                      <path d="M9 12l2 2 4-4" stroke="#ff8a80" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      <path d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z" stroke="#ff8a80" strokeWidth="2" />
                    </svg>
                  ),
                  titre: t.how.s3_title,
                  desc: t.how.s3_desc,
                },
              ].map((f, i) => (
                <div key={i} style={{ background: "rgba(255,255,255,0.10)", backdropFilter: "blur(10px)", border: "1px solid rgba(255,255,255,0.18)", borderRadius: 16, padding: "20px 18px", textAlign: "left" }}>
                  <div style={{ width: 40, height: 40, borderRadius: 12, background: "rgba(255,138,128,0.15)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 12 }}>
                    {f.icon}
                  </div>
                  <div style={{ fontWeight: 700, fontSize: 13, color: "#fff", marginBottom: 6 }}>{f.titre}</div>
                  <div style={{ fontSize: 12, color: "rgba(255,255,255,0.55)", lineHeight: 1.6 }}>{f.desc}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Deux boutons d'action */}
          <div style={{ display: "flex", gap: 12, justifyContent: "center", marginBottom: 28, alignItems: "center" }}>

            <Link href="/publier?type=perdu" style={{ textDecoration: "none" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10, background: "linear-gradient(135deg, #ff5252, #c62828)", borderRadius: 14, padding: "14px 24px", boxShadow: "0 4px 20px rgba(183,28,28,0.45)", cursor: "pointer", transition: "transform 0.15s, box-shadow 0.15s" }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <circle cx="12" cy="12" r="9" stroke="white" strokeWidth="2"/>
                  <path d="M12 8v4M12 16h.01" stroke="white" strokeWidth="2.5" strokeLinecap="round"/>
                </svg>
                <span style={{ color: "#fff", fontWeight: 700, fontSize: 15 }}>{t.hero.lost_title}</span>
              </div>
            </Link>

            <span style={{ color: "rgba(255,255,255,0.5)", fontSize: 13, fontWeight: 600 }}>{t.hero.or}</span>

            <Link href="/publier?type=trouve" style={{ textDecoration: "none" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10, background: "linear-gradient(135deg, #2e7d32, #1b5e20)", borderRadius: 14, padding: "14px 24px", boxShadow: "0 4px 20px rgba(27,94,32,0.45)", cursor: "pointer", transition: "transform 0.15s, box-shadow 0.15s" }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <path d="M9 12l2 2 4-4" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                  <circle cx="12" cy="12" r="9" stroke="white" strokeWidth="2"/>
                </svg>
                <span style={{ color: "#fff", fontWeight: 700, fontSize: 15 }}>{t.hero.found_title}</span>
              </div>
            </Link>

          </div>

          {/* Barre de recherche */}
          <div style={{ background: "#fff", borderRadius: 16, boxShadow: "0 8px 32px rgba(0,0,0,0.2)", overflow: "hidden" }}>
            <div className="search-bar-inner" style={{ display: "flex", alignItems: "center", padding: "6px 6px 6px 20px" }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" style={{ color: "#bbb", flexShrink: 0 }}>
                <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2" />
                <path d="M16.5 16.5L21 21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
              <input
                type="text"
                placeholder={t.hero.search_ph}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                style={{ flex: 1, border: "none", outline: "none", fontSize: 15, color: "#222", background: "transparent", fontWeight: 500, padding: "14px 12px", minWidth: 0 }}
              />
              <button
                onClick={() => router.push(`/recherche${search ? `?q=${encodeURIComponent(search)}` : ""}`)}
                style={{ background: "linear-gradient(135deg, #ff5252, #c62828)", color: "#fff", border: "none", borderRadius: 12, padding: "13px 24px", fontWeight: 700, fontSize: 14, cursor: "pointer", flexShrink: 0, whiteSpace: "nowrap" }}
              >
                {t.hero.search_btn}
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ── CONTENU PRINCIPAL ── */}
      <div style={{ maxWidth: 1240, margin: "0 auto", padding: "36px 32px" }}>
        <div className="main-layout">

          {/* SIDEBAR */}
          <aside className="sidebar-wrapper">
            <button className="sidebar-mobile-toggle" onClick={() => setSidebarOpen(!sidebarOpen)}>
              <span>☰ {t.sidebar.filters}</span>
              <span>{sidebarOpen ? "▲" : "▼"}</span>
            </button>
            <div className={`sidebar-content${sidebarOpen ? " open" : ""}`}>
              <Sidebar
                filtreCategorie={filtreCategorie}
                setFiltreCategorie={setFiltreCategorie}
                filtreType={filtreType}
                setFiltreType={setFiltreType}
                gouvernoratSelectionne={gouvernoratSelectionne}
                setGouvernoratSelectionne={setGouvernoratSelectionne}
                villeSelectionnee={villeSelectionnee}
                setVilleSelectionnee={setVilleSelectionnee}
                filtreDate={filtreDate}
                setFiltreDate={setFiltreDate}
              />
            </div>
          </aside>

          {/* ANNONCES */}
          <main style={{ flex: 1, minWidth: 0 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24, flexWrap: "wrap", gap: 12 }}>
              <div>
                <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 4 }}>
                  <div style={{ width: 4, height: 22, background: "linear-gradient(180deg,#ff5252,#c62828)", borderRadius: 4 }} />
                  <h2 style={{ fontSize: 20, fontWeight: 800, margin: 0, color: "#1a1a2e" }}>{t.listing.title}</h2>
                </div>
                <p style={{ fontSize: 13, color: "#aaa", margin: 0, paddingLeft: 14 }}>
                  {annoncesFiltrees.length} {annoncesFiltrees.length > 1 ? t.listing.results : t.listing.result}
                  {catLabel ? ` · ${catLabel}` : ""}
                  {filtreType !== "tous" ? ` · ${filtreType === "perdu" ? t.sidebar.type_lost : t.sidebar.type_found}` : ""}
                </p>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <select
                  value={tri}
                  onChange={(e) => setTri(e.target.value)}
                  style={{ border: "1px solid #e8e8e8", borderRadius: 10, padding: "8px 12px", fontSize: 13, color: "#555", cursor: "pointer", background: "#fff", outline: "none" }}
                >
                  <option value="recent">{t.listing.sort_recent}</option>
                  <option value="pertinence">{t.listing.sort_relevance}</option>
                </select>
                <div style={{ display: "flex", border: "1px solid #e8e8e8", borderRadius: 10, overflow: "hidden", background: "#fff" }}>
                  <button onClick={() => setVue("grille")} title="Grille" style={{ padding: "8px 13px", border: "none", background: vue === "grille" ? "#fff0f0" : "transparent", color: vue === "grille" ? "#e53935" : "#aaa", cursor: "pointer", fontSize: 15, transition: "all 0.15s" }}>⊞</button>
                  <button onClick={() => setVue("liste")} title="Liste" style={{ padding: "8px 13px", border: "none", borderLeft: "1px solid #e8e8e8", background: vue === "liste" ? "#fff0f0" : "transparent", color: vue === "liste" ? "#e53935" : "#aaa", cursor: "pointer", fontSize: 15, transition: "all 0.15s" }}>☰</button>
                </div>
              </div>
            </div>

            {annoncesFiltrees.length === 0 ? (
              <div style={{ textAlign: "center", padding: "80px 20px", color: "#bbb" }}>
                <div style={{ fontSize: 52, marginBottom: 16 }}>🔍</div>
                <div style={{ fontSize: 18, fontWeight: 700, color: "#888", marginBottom: 8 }}>{t.listing.empty_title}</div>
                <div style={{ fontSize: 14, color: "#bbb" }}>
                  {t.listing.empty_desc}{" "}
                  <Link href="/publier" style={{ color: "#e53935", textDecoration: "none", fontWeight: 600 }}>{t.listing.empty_link}</Link>
                </div>
              </div>
            ) : (() => {
              const boosted = annoncesFiltrees.filter(a => a.boosted && a.type === "perdu");
              const regular = annoncesFiltrees.filter(a => !a.boosted || a.type !== "perdu");
              return (
                <>
                  {boosted.length > 0 && (
                    <div style={{ marginBottom: 28 }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 14 }}>
                        <span style={{ background: "linear-gradient(135deg,#f59e0b,#d97706)", color: "#fff", fontSize: 11, fontWeight: 800, padding: "4px 12px", borderRadius: 20 }}>⚡ {t.listing.boosted_section}</span>
                        <div style={{ flex: 1, height: 1, background: "linear-gradient(90deg,#f59e0b22,transparent)" }} />
                      </div>
                      {vue === "grille" ? (
                        <div className="annonces-grid">
                          {boosted.map(a => <AnnonceCard key={a.id} annonce={a} vue="grille" />)}
                        </div>
                      ) : (
                        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                          {boosted.map(a => <AnnonceCard key={a.id} annonce={a} vue="liste" />)}
                        </div>
                      )}
                    </div>
                  )}
                  {regular.length > 0 && (
                    <div>
                      {boosted.length > 0 && (
                        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 14 }}>
                          <span style={{ fontSize: 12, fontWeight: 700, color: "#aaa" }}>{t.listing.regular_section}</span>
                          <div style={{ flex: 1, height: 1, background: "#f0f0f0" }} />
                        </div>
                      )}
                      {vue === "grille" ? (
                        <div className="annonces-grid">
                          {regular.map(a => <AnnonceCard key={a.id} annonce={a} vue="grille" />)}
                        </div>
                      ) : (
                        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                          {regular.map(a => <AnnonceCard key={a.id} annonce={a} vue="liste" />)}
                        </div>
                      )}
                    </div>
                  )}
                </>
              );
            })()}
          </main>
        </div>
      </div>

      {/* ── COMPTEUR D'IMPACT ── */}
      <section style={{ background: "linear-gradient(135deg, #1a1a2e 0%, #2d1f3d 60%, #3d1a1a 100%)", padding: "64px 32px" }}>
        <div style={{ maxWidth: 1000, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 48 }}>
            <div style={{ display: "inline-block", background: "rgba(255,82,82,0.18)", color: "#ff8a80", fontSize: 12, fontWeight: 700, padding: "5px 14px", borderRadius: 100, letterSpacing: "0.8px", marginBottom: 14, textTransform: "uppercase", border: "1px solid rgba(255,82,82,0.25)" }}>
              {t.impact.tag}
            </div>
            <h2 style={{ fontSize: 26, fontWeight: 800, color: "#fff", margin: "0 0 10px", letterSpacing: "-0.5px" }}>{t.impact.title}</h2>
            <p style={{ color: "rgba(255,255,255,0.5)", fontSize: 15, margin: 0 }}>{t.impact.sub}</p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 2 }}>
            {[
              { num: t.impact.s1_num, label: t.impact.s1_label, icon: "🎯" },
              { num: t.impact.s2_num, label: t.impact.s2_label, icon: "📋" },
              { num: t.impact.s3_num, label: t.impact.s3_label, icon: "🗺️" },
              { num: t.impact.s4_num, label: t.impact.s4_label, icon: "👥" },
            ].map((stat, i) => (
              <div key={i} style={{ textAlign: "center", padding: "28px 16px", borderLeft: i > 0 ? "1px solid rgba(255,255,255,0.08)" : "none" }}>
                <div style={{ fontSize: 28, marginBottom: 8 }}>{stat.icon}</div>
                <div style={{ fontSize: 36, fontWeight: 900, color: "#fff", letterSpacing: "-1px", lineHeight: 1, marginBottom: 8 }}>
                  <span style={{ background: "linear-gradient(90deg, #ff8a80, #ff5252)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                    {stat.num}
                  </span>
                </div>
                <div style={{ fontSize: 13, color: "rgba(255,255,255,0.45)", fontWeight: 500, textTransform: "uppercase", letterSpacing: "0.6px" }}>
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
