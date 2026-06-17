"use client";
import { useState, useEffect } from "react";
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
  const [activeStep, setActiveStep] = useState(0);
  const router = useRouter();

  useEffect(() => {
    const timer = setInterval(() => setActiveStep(s => (s + 1) % 3), 3500);
    return () => clearInterval(timer);
  }, []);
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
      <section style={{ position: "relative", padding: "72px 48px 90px 64px", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, backgroundImage: "url('/hero-cover.png')", backgroundSize: "cover", backgroundPosition: "center" }} />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(160deg, rgba(10,15,60,0.38) 0%, rgba(20,10,50,0.22) 60%, rgba(21,101,192,0.18) 100%)" }} />
        <div style={{ position: "absolute", inset: 0, opacity: 0.04, backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")" }} />

        <div style={{ position: "relative" }}>

          {/* Deux boutons d'action — centrés sur toute la largeur */}
          <div style={{ display: "flex", gap: 20, justifyContent: "center", alignItems: "stretch" }}>

            <Link href="/publier?type=perdu" style={{ textDecoration: "none", flex: "0 0 300px" }}>
              <div style={{
                display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", gap: 10,
                background: "rgba(180,20,20,0.28)",
                backdropFilter: "blur(18px)",
                border: "2px solid rgba(255,82,82,0.65)",
                borderTop: "4px solid #ff5252",
                borderRadius: 22,
                padding: "24px 24px 20px",
                boxShadow: "0 12px 40px rgba(0,0,0,0.28), inset 0 1px 0 rgba(255,255,255,0.12)",
                cursor: "pointer",
                height: "100%", boxSizing: "border-box",
              }}>
                <div style={{ width: 56, height: 56, borderRadius: 18, background: "linear-gradient(135deg, #ff5252, #b71c1c)", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 6px 20px rgba(255,82,82,0.45)" }}>
                  <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
                    <circle cx="12" cy="12" r="9" stroke="white" strokeWidth="2"/>
                    <path d="M12 8v4M12 16h.01" stroke="white" strokeWidth="2.5" strokeLinecap="round"/>
                  </svg>
                </div>
                <div style={{ color: "#fff", fontWeight: 800, fontSize: 16, lineHeight: 1.3 }}>{t.hero.lost_title}</div>
                <div style={{ color: "rgba(255,255,255,0.55)", fontSize: 12.5, lineHeight: 1.5 }}>{t.hero.lost_desc}</div>
                <div style={{ marginTop: 4, background: "rgba(255,82,82,0.35)", borderRadius: 100, padding: "9px 24px", color: "#fff", fontSize: 13, fontWeight: 700, letterSpacing: "0.3px", border: "1px solid rgba(255,82,82,0.5)" }}>
                  Publier →
                </div>
              </div>
            </Link>

            <div style={{ display: "flex", alignItems: "center", color: "rgba(255,255,255,0.4)", fontSize: 13, fontWeight: 600, flexShrink: 0 }}>{t.hero.or}</div>

            <Link href="/publier?type=trouve" style={{ textDecoration: "none", flex: "0 0 300px" }}>
              <div style={{
                display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", gap: 10,
                background: "rgba(20,80,20,0.28)",
                backdropFilter: "blur(18px)",
                border: "2px solid rgba(76,175,80,0.65)",
                borderTop: "4px solid #4caf50",
                borderRadius: 22,
                padding: "24px 24px 20px",
                boxShadow: "0 12px 40px rgba(0,0,0,0.28), inset 0 1px 0 rgba(255,255,255,0.12)",
                cursor: "pointer",
                height: "100%", boxSizing: "border-box",
              }}>
                <div style={{ width: 56, height: 56, borderRadius: 18, background: "linear-gradient(135deg, #43a047, #1b5e20)", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 6px 20px rgba(67,160,71,0.45)" }}>
                  <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
                    <path d="M9 12l2 2 4-4" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                    <circle cx="12" cy="12" r="9" stroke="white" strokeWidth="2"/>
                  </svg>
                </div>
                <div style={{ color: "#fff", fontWeight: 800, fontSize: 16, lineHeight: 1.3 }}>{t.hero.found_title}</div>
                <div style={{ color: "rgba(255,255,255,0.55)", fontSize: 12.5, lineHeight: 1.5 }}>{t.hero.found_desc}</div>
                <div style={{ marginTop: 4, background: "rgba(76,175,80,0.35)", borderRadius: 100, padding: "9px 24px", color: "#fff", fontSize: 13, fontWeight: 700, letterSpacing: "0.3px", border: "1px solid rgba(76,175,80,0.5)" }}>
                  Publier →
                </div>
              </div>
            </Link>

          </div>
        </div>
      </section>

      {/* ── CONTENU PRINCIPAL ── */}
      <div style={{ maxWidth: 1240, margin: "0 auto", padding: "36px 32px" }}>

        {/* Barre de recherche */}
        <div style={{ marginBottom: 28 }}>
          <div style={{ background: "#fff", borderRadius: 16, boxShadow: "0 2px 12px rgba(0,0,0,0.07)", border: "1px solid #ebebeb", overflow: "hidden" }}>
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
                style={{ background: "linear-gradient(135deg, #1976d2, #0d47a1)", color: "#fff", border: "none", borderRadius: 12, padding: "13px 24px", fontWeight: 700, fontSize: 14, cursor: "pointer", flexShrink: 0, whiteSpace: "nowrap" }}
              >
                {t.hero.search_btn}
              </button>
            </div>
          </div>
        </div>

        <div className="main-layout" style={{ display: "block" }}>

          {/* ANNONCES */}
          <main style={{ flex: 1, minWidth: 0 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24, flexWrap: "wrap", gap: 12 }}>
              <div>
                <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 4 }}>
                  <div style={{ width: 4, height: 22, background: "linear-gradient(180deg,#1976d2,#0d47a1)", borderRadius: 4 }} />
                  <h2 style={{ fontSize: 20, fontWeight: 800, margin: 0, color: "#1a1a2e" }}>{t.listing.title}</h2>
                </div>
                <p style={{ fontSize: 13, color: "#aaa", margin: 0, paddingLeft: 14 }}>
                  {annoncesFiltrees.length} {annoncesFiltrees.length > 1 ? t.listing.results : t.listing.result}
                  {catLabel ? ` · ${catLabel}` : ""}
                  {filtreType !== "tous" ? ` · ${filtreType === "perdu" ? t.sidebar.type_lost : t.sidebar.type_found}` : ""}
                </p>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <div style={{ display: "flex", border: "1px solid #e8e8e8", borderRadius: 10, overflow: "hidden", background: "#fff" }}>
                  <button onClick={() => setVue("grille")} title="Grille" style={{ padding: "8px 13px", border: "none", background: vue === "grille" ? "#e8f4fc" : "transparent", color: vue === "grille" ? "#1565C0" : "#aaa", cursor: "pointer", fontSize: 15, transition: "all 0.15s" }}>⊞</button>
                  <button onClick={() => setVue("liste")} title="Liste" style={{ padding: "8px 13px", border: "none", borderLeft: "1px solid #e8e8e8", background: vue === "liste" ? "#e8f4fc" : "transparent", color: vue === "liste" ? "#1565C0" : "#aaa", cursor: "pointer", fontSize: 15, transition: "all 0.15s" }}>☰</button>
                </div>
              </div>
            </div>

            {annoncesFiltrees.length === 0 ? (
              <div style={{ textAlign: "center", padding: "80px 20px", color: "#bbb" }}>
                <div style={{ fontSize: 52, marginBottom: 16 }}>🔍</div>
                <div style={{ fontSize: 18, fontWeight: 700, color: "#888", marginBottom: 8 }}>{t.listing.empty_title}</div>
                <div style={{ fontSize: 14, color: "#bbb" }}>
                  {t.listing.empty_desc}{" "}
                  <Link href="/publier" style={{ color: "#1565C0", textDecoration: "none", fontWeight: 600 }}>{t.listing.empty_link}</Link>
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
      {(() => {
        const steps = [
          { titre: t.how.s1_title, desc: t.how.s1_desc, img: "/publier-hero.jpg" },
          { titre: t.how.s2_title, desc: t.how.s2_desc, img: "https://images.pexels.com/photos/1092671/pexels-photo-1092671.jpeg?auto=compress&cs=tinysrgb&w=1000&fit=crop" },
          { titre: t.how.s3_title, desc: t.how.s3_desc, img: "https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=1000&fit=crop" },
        ];
        const step = steps[activeStep];
        return (
          <section style={{ background: "linear-gradient(135deg, #1976d2, #0d47a1)", padding: "64px 32px" }}>
            <div style={{ maxWidth: 900, margin: "0 auto" }}>
              <div style={{ textAlign: "center", marginBottom: 36 }}>
                <div style={{ fontSize: 11, fontWeight: 700, color: "rgba(255,255,255,0.6)", letterSpacing: "1.5px", textTransform: "uppercase" }}>{t.how.title}</div>
              </div>
              <div style={{ display: "flex", gap: 0, alignItems: "stretch", borderRadius: 18, overflow: "hidden", border: "1px solid rgba(255,255,255,0.2)", boxShadow: "0 8px 40px rgba(0,0,0,0.25)" }}>
                <div style={{ flex: 2, minHeight: 240, position: "relative", overflow: "hidden" }}>
                  {steps.map((s, i) => (
                    <img key={i} src={s.img} alt="" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", opacity: activeStep === i ? 1 : 0, transition: "opacity 0.7s ease" }} />
                  ))}
                  <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to right, transparent 60%, rgba(13,42,110,0.9) 100%)" }} />
                </div>
                <div style={{ flex: 1, padding: "28px 24px", textAlign: "left", background: "rgba(255,255,255,0.08)", backdropFilter: "blur(12px)", display: "flex", flexDirection: "column", justifyContent: "center" }}>
                  <div style={{ fontWeight: 800, fontSize: 16, color: "#fff", marginBottom: 10 }}>{step.titre}</div>
                  <div style={{ fontSize: 13, color: "rgba(255,255,255,0.7)", lineHeight: 1.7 }}>{step.desc}</div>
                  <div style={{ display: "flex", gap: 6, marginTop: 20 }}>
                    {steps.map((_, i) => (
                      <div key={i} onClick={() => setActiveStep(i)} style={{ width: activeStep === i ? 22 : 6, height: 6, borderRadius: 3, background: activeStep === i ? "#fff" : "rgba(255,255,255,0.3)", transition: "all 0.35s ease", cursor: "pointer" }} />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </section>
        );
      })()}

      {/* ── COMPTEUR D'IMPACT ── */}
      <section style={{ background: "linear-gradient(135deg, #1976d2, #0d47a1)", padding: "64px 32px" }}>
        <div style={{ maxWidth: 1000, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 48 }}>
            <div style={{ display: "inline-block", background: "rgba(255,255,255,0.15)", color: "#fff", fontSize: 12, fontWeight: 700, padding: "5px 14px", borderRadius: 100, letterSpacing: "0.8px", marginBottom: 14, textTransform: "uppercase", border: "1px solid rgba(255,255,255,0.3)" }}>
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
                  <span style={{ background: "linear-gradient(90deg, #90caf9, #fff)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
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
