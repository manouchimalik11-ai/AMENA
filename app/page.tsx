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
      <section style={{ background: "#f7f7f8" }}>
        {/* Affiche */}
        <div style={{ width: "100%", lineHeight: 0 }}>
          <img src="/affiche-amena.png" alt="Amena – Rien n'est vraiment perdu" style={{ width: "100%", display: "block", objectFit: "cover" }} />
        </div>

        {/* Deux cartes d'action */}
        <div style={{ background: "linear-gradient(160deg, #0a0f3c 0%, #1a0a32 60%, #3d1010 100%)", padding: "36px 24px 44px" }}>
          <div className="hero-actions" style={{ display: "flex", gap: 16, justifyContent: "center", maxWidth: 700, margin: "0 auto", alignItems: "stretch" }}>

            <Link href="/publier?type=perdu" style={{ textDecoration: "none", flex: 1, maxWidth: 300 }}>
              <div style={{ background: "linear-gradient(145deg, #ff5252 0%, #b71c1c 100%)", borderRadius: 22, padding: "28px 26px", boxShadow: "0 16px 48px rgba(183,28,28,0.55)", cursor: "pointer", textAlign: "left", height: "100%", boxSizing: "border-box", position: "relative", overflow: "hidden" }}>
                <div style={{ position: "absolute", top: -20, right: -20, width: 110, height: 110, borderRadius: "50%", background: "rgba(255,255,255,0.08)" }} />
                <div style={{ width: 48, height: 48, borderRadius: 14, background: "rgba(255,255,255,0.18)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 18 }}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <circle cx="12" cy="12" r="9" stroke="white" strokeWidth="2"/>
                    <path d="M12 8v4M12 16h.01" stroke="white" strokeWidth="2.5" strokeLinecap="round"/>
                  </svg>
                </div>
                <div style={{ color: "#fff", fontWeight: 800, fontSize: 18, marginBottom: 6, letterSpacing: "-0.3px" }}>{t.hero.lost_title}</div>
                <div style={{ color: "rgba(255,255,255,0.72)", fontSize: 13, lineHeight: 1.5, marginBottom: 18 }}>{t.hero.lost_desc}</div>
                <div style={{ display: "inline-flex", alignItems: "center", gap: 6, background: "rgba(255,255,255,0.2)", borderRadius: 100, padding: "7px 16px", color: "#fff", fontWeight: 700, fontSize: 13 }}>
                  {t.hero.post}
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M5 12h14M13 6l6 6-6 6" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </div>
              </div>
            </Link>

            <div style={{ display: "flex", alignItems: "center", flexShrink: 0 }}>
              <div style={{ background: "rgba(255,255,255,0.25)", borderRadius: 100, padding: "6px 12px", color: "#fff", fontSize: 12, fontWeight: 700, letterSpacing: "0.5px" }}>{t.hero.or}</div>
            </div>

            <Link href="/publier?type=trouve" style={{ textDecoration: "none", flex: 1, maxWidth: 300 }}>
              <div style={{ background: "linear-gradient(145deg, #2e7d32 0%, #1b5e20 100%)", borderRadius: 22, padding: "28px 26px", boxShadow: "0 16px 48px rgba(27,94,32,0.55)", cursor: "pointer", textAlign: "left", height: "100%", boxSizing: "border-box", position: "relative", overflow: "hidden" }}>
                <div style={{ position: "absolute", top: -20, right: -20, width: 110, height: 110, borderRadius: "50%", background: "rgba(255,255,255,0.08)" }} />
                <div style={{ width: 48, height: 48, borderRadius: 14, background: "rgba(255,255,255,0.18)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 18 }}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path d="M9 12l2 2 4-4" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                    <circle cx="12" cy="12" r="9" stroke="white" strokeWidth="2"/>
                  </svg>
                </div>
                <div style={{ color: "#fff", fontWeight: 800, fontSize: 18, marginBottom: 6, letterSpacing: "-0.3px" }}>{t.hero.found_title}</div>
                <div style={{ color: "rgba(255,255,255,0.72)", fontSize: 13, lineHeight: 1.5, marginBottom: 18 }}>{t.hero.found_desc}</div>
                <div style={{ display: "inline-flex", alignItems: "center", gap: 6, background: "rgba(255,255,255,0.2)", borderRadius: 100, padding: "7px 16px", color: "#fff", fontWeight: 700, fontSize: 13 }}>
                  {t.hero.post}
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M5 12h14M13 6l6 6-6 6" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </div>
              </div>
            </Link>

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
                <Link href="/publier" style={{ display: "inline-flex", alignItems: "center", gap: 6, color: "#fff", background: "linear-gradient(135deg,#ff5252,#c62828)", fontSize: 13, textDecoration: "none", fontWeight: 700, padding: "8px 16px", borderRadius: 10, boxShadow: "0 4px 12px rgba(229,57,53,0.3)" }}>
                  {t.listing.publish}
                </Link>
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

      {/* ── COMMENT ÇA MARCHE ── */}
      <section style={{ background: "#fff", padding: "64px 32px", borderTop: "1px solid #f0f0f0" }}>
        <div style={{ maxWidth: 1000, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 52 }}>
            <div style={{ display: "inline-block", background: "#fff0f0", color: "#e53935", fontSize: 12, fontWeight: 700, padding: "5px 14px", borderRadius: 100, letterSpacing: "0.8px", marginBottom: 14, textTransform: "uppercase" }}>{t.how.tag}</div>
            <h2 style={{ fontSize: 28, fontWeight: 800, color: "#1a1a2e", margin: 0, letterSpacing: "-0.5px" }}>{t.how.title}</h2>
            <p style={{ color: "#999", fontSize: 15, marginTop: 10 }}>{t.how.sub}</p>
          </div>
          <div className="features-grid" style={{ gap: 20 }}>
            {[
              {
                num: "01",
                icon: (
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
                    <path d="M12 20h9" stroke="#e53935" strokeWidth="2" strokeLinecap="round" />
                    <path d="M16.5 3.5a2.121 2.121 0 013 3L7 19l-4 1 1-4L16.5 3.5z" stroke="#e53935" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                ),
                titre: t.how.s1_title,
                desc: t.how.s1_desc,
              },
              {
                num: "02",
                icon: (
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
                    <circle cx="11" cy="11" r="8" stroke="#e53935" strokeWidth="2" />
                    <path d="M16.5 16.5L21 21" stroke="#e53935" strokeWidth="2" strokeLinecap="round" />
                    <path d="M8 11h6M11 8v6" stroke="#e53935" strokeWidth="2" strokeLinecap="round" />
                  </svg>
                ),
                titre: t.how.s2_title,
                desc: t.how.s2_desc,
              },
              {
                num: "03",
                icon: (
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
                    <path d="M9 12l2 2 4-4" stroke="#e53935" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z" stroke="#e53935" strokeWidth="2" />
                  </svg>
                ),
                titre: t.how.s3_title,
                desc: t.how.s3_desc,
              },
            ].map((f) => (
              <div key={f.num} style={{ background: "#fafafa", borderRadius: 20, padding: "36px 28px", border: "1px solid #eeeeee", position: "relative", overflow: "hidden" }}>
                <div style={{ position: "absolute", top: 20, right: 24, fontSize: 48, fontWeight: 900, color: "#f0f0f0", lineHeight: 1, userSelect: "none" }}>{f.num}</div>
                <div style={{ width: 56, height: 56, borderRadius: 16, background: "#fff0f0", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 20, boxShadow: "0 4px 12px rgba(229,57,53,0.12)" }}>
                  {f.icon}
                </div>
                <div style={{ fontWeight: 800, fontSize: 16, marginBottom: 10, color: "#1a1a2e" }}>{f.titre}</div>
                <div style={{ fontSize: 14, color: "#888", lineHeight: 1.75 }}>{f.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

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
