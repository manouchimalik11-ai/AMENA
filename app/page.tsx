"use client";
import { useState } from "react";
import Link from "next/link";
import { annonces, categories } from "@/lib/data";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Sidebar from "@/components/Sidebar";
import AnnonceCard from "@/components/AnnonceCard";

export default function Home() {
  const [search, setSearch] = useState("");
  const [ville, setVille] = useState("");
  const [filtreCategorie, setFiltreCategorie] = useState("Tous");
  const [filtreType, setFiltreType] = useState("tous");
  const [derniers7jours, setDerniers7jours] = useState(false);
  const [vue, setVue] = useState<"grille" | "liste">("grille");
  const [tri, setTri] = useState("recent");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const annoncesFiltrees = annonces.filter((a) => {
    const matchSearch = a.titre.toLowerCase().includes(search.toLowerCase()) || a.lieu.toLowerCase().includes(search.toLowerCase());
    const matchVille = ville === "" || a.lieu.toLowerCase().includes(ville.toLowerCase());
    const matchCat = filtreCategorie === "Tous" || a.categorie === filtreCategorie;
    const matchType = filtreType === "tous" || a.type === filtreType;
    return matchSearch && matchVille && matchCat && matchType;
  });

  return (
    <div style={{ fontFamily: "var(--font-geist-sans), 'Segoe UI', sans-serif", minHeight: "100vh", background: "#f7f7f8", color: "#1a1a2e" }}>
      <Navbar />

      {/* ── HERO ── */}
      <section style={{ position: "relative", padding: "72px 24px 90px", overflow: "hidden" }}>
        {/* Image de fond */}
        <div style={{ position: "absolute", inset: 0, backgroundImage: "url('https://images.unsplash.com/photo-1726428977637-ba8fc5a5047d?w=1600&fit=crop')", backgroundSize: "cover", backgroundPosition: "center" }} />
        {/* Dégradé overlay */}
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(160deg, rgba(10,15,60,0.72) 0%, rgba(20,10,50,0.55) 60%, rgba(180,20,20,0.45) 100%)" }} />
        {/* Grain texture subtil */}
        <div style={{ position: "absolute", inset: 0, opacity: 0.04, backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")" }} />

        <div style={{ position: "relative", maxWidth: 820, margin: "0 auto", textAlign: "center" }}>

          {/* Badge */}
          <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(255,255,255,0.12)", backdropFilter: "blur(8px)", border: "1px solid rgba(255,255,255,0.22)", borderRadius: 100, padding: "6px 16px", marginBottom: 24 }}>
            <span style={{ fontSize: 14 }}>🇹🇳</span>
            <span style={{ color: "rgba(255,255,255,0.9)", fontSize: 13, fontWeight: 600, letterSpacing: "0.3px" }}>Plateforme nationale de retrouvailles</span>
          </div>

          {/* Titre */}
          <h1 className="hero-title" style={{ fontSize: 52, fontWeight: 900, color: "#fff", marginBottom: 16, lineHeight: 1.12, letterSpacing: "-1px" }}>
            Rien n&apos;est<br />
            <span style={{ background: "linear-gradient(90deg, #ff8a80, #ff5252)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>vraiment perdu.</span>
          </h1>
          <p style={{ fontSize: 17, color: "rgba(255,255,255,0.78)", marginBottom: 40, maxWidth: 500, margin: "0 auto 40px", lineHeight: 1.6 }}>
            Retrouvez vos objets égarés ou aidez quelqu&apos;un à récupérer le sien.
          </p>

          {/* Barre de recherche unifiée */}
          <div style={{ background: "#fff", borderRadius: 18, boxShadow: "0 20px 60px rgba(0,0,0,0.3)", overflow: "hidden", display: "flex", flexDirection: "column" }}>
            <div style={{ display: "flex", alignItems: "center", padding: "6px 6px 6px 20px", gap: 0 }} className="search-bar-inner">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" style={{ color: "#aaa", flexShrink: 0 }}>
                <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2" />
                <path d="M16.5 16.5L21 21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
              <input
                type="text"
                placeholder="Rechercher un objet perdu ou trouvé..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                style={{ flex: 1, border: "none", outline: "none", fontSize: 15, color: "#222", background: "transparent", fontWeight: 500, padding: "14px 12px", minWidth: 0 }}
              />
              <div style={{ width: 1, height: 28, background: "#eee", flexShrink: 0, margin: "0 4px" }} />
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" style={{ color: "#e53935", flexShrink: 0, marginLeft: 8 }}>
                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" fill="currentColor" />
              </svg>
              <input
                type="text"
                placeholder="Ville..."
                value={ville}
                onChange={(e) => setVille(e.target.value)}
                style={{ width: 100, border: "none", outline: "none", fontSize: 14, color: "#333", background: "transparent", fontWeight: 500, padding: "14px 10px", minWidth: 0 }}
              />
              <button style={{ background: "linear-gradient(135deg, #ff5252, #c62828)", color: "#fff", border: "none", borderRadius: 12, padding: "14px 28px", fontWeight: 700, fontSize: 15, cursor: "pointer", flexShrink: 0, whiteSpace: "nowrap" }}>
                Rechercher
              </button>
            </div>
          </div>

          {/* Catégories rapides */}
          <div style={{ display: "flex", gap: 8, justifyContent: "center", marginTop: 20, flexWrap: "wrap" }}>
            {categories.map((cat) => (
              <button
                key={cat.label}
                onClick={() => setFiltreCategorie(filtreCategorie === cat.label ? "Tous" : cat.label)}
                style={{
                  background: filtreCategorie === cat.label ? "#fff" : "rgba(255,255,255,0.14)",
                  color: filtreCategorie === cat.label ? "#e53935" : "rgba(255,255,255,0.88)",
                  border: filtreCategorie === cat.label ? "none" : "1px solid rgba(255,255,255,0.2)",
                  borderRadius: 100, padding: "7px 15px", fontSize: 13, fontWeight: 600, cursor: "pointer",
                  display: "flex", alignItems: "center", gap: 5, transition: "all 0.18s",
                  backdropFilter: "blur(6px)"
                }}
              >
                {cat.icon} {cat.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ── BARRE STATS ── */}
      <div style={{ background: "#fff", borderBottom: "1px solid #f0f0f0", padding: "18px 32px" }}>
        <div style={{ maxWidth: 900, margin: "0 auto", display: "flex", justifyContent: "center", gap: 0, flexWrap: "wrap" }}>
          {[
            { icon: "📋", val: "8", label: "Annonces actives" },
            { icon: "📍", val: "10", label: "Villes couvertes" },
            { icon: "🔁", val: "94%", label: "Taux de retrouvaille" },
            { icon: "✅", val: "100%", label: "Gratuit" },
          ].map((s, i) => (
            <div key={s.label} style={{ display: "flex", alignItems: "center", gap: 10, padding: "6px 32px", borderRight: i < 3 ? "1px solid #f0f0f0" : "none", flexShrink: 0 }}>
              <span style={{ fontSize: 20 }}>{s.icon}</span>
              <div>
                <div style={{ fontWeight: 800, fontSize: 18, color: "#1a1a2e", lineHeight: 1 }}>{s.val}</div>
                <div style={{ fontSize: 11, color: "#999", marginTop: 2, fontWeight: 500 }}>{s.label}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── CONTENU PRINCIPAL ── */}
      <div style={{ maxWidth: 1240, margin: "0 auto", padding: "36px 32px" }}>
        <div className="main-layout">

          {/* SIDEBAR */}
          <aside className="sidebar-wrapper">
            <button className="sidebar-mobile-toggle" onClick={() => setSidebarOpen(!sidebarOpen)}>
              <span>☰ Filtres</span>
              <span>{sidebarOpen ? "▲" : "▼"}</span>
            </button>
            <div className={`sidebar-content${sidebarOpen ? " open" : ""}`}>
              <Sidebar
                filtreCategorie={filtreCategorie}
                setFiltreCategorie={setFiltreCategorie}
                filtreType={filtreType}
                setFiltreType={setFiltreType}
                derniers7jours={derniers7jours}
                setDerniers7jours={setDerniers7jours}
              />
            </div>
          </aside>

          {/* ANNONCES */}
          <main style={{ flex: 1, minWidth: 0 }}>
            {/* En-tête section */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24, flexWrap: "wrap", gap: 12 }}>
              <div>
                <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 4 }}>
                  <div style={{ width: 4, height: 22, background: "linear-gradient(180deg,#ff5252,#c62828)", borderRadius: 4 }} />
                  <h2 style={{ fontSize: 20, fontWeight: 800, margin: 0, color: "#1a1a2e" }}>Annonces récentes</h2>
                </div>
                <p style={{ fontSize: 13, color: "#aaa", margin: 0, paddingLeft: 14 }}>
                  {annoncesFiltrees.length} résultat{annoncesFiltrees.length > 1 ? "s" : ""}
                  {filtreCategorie !== "Tous" ? ` · ${filtreCategorie}` : ""}
                  {filtreType !== "tous" ? ` · ${filtreType === "perdu" ? "Perdus" : "Trouvés"}` : ""}
                </p>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <select
                  value={tri}
                  onChange={(e) => setTri(e.target.value)}
                  style={{ border: "1px solid #e8e8e8", borderRadius: 10, padding: "8px 12px", fontSize: 13, color: "#555", cursor: "pointer", background: "#fff", outline: "none" }}
                >
                  <option value="recent">Plus récent</option>
                  <option value="pertinence">Pertinence</option>
                </select>
                <div style={{ display: "flex", border: "1px solid #e8e8e8", borderRadius: 10, overflow: "hidden", background: "#fff" }}>
                  <button onClick={() => setVue("grille")} title="Grille" style={{ padding: "8px 13px", border: "none", background: vue === "grille" ? "#fff0f0" : "transparent", color: vue === "grille" ? "#e53935" : "#aaa", cursor: "pointer", fontSize: 15, transition: "all 0.15s" }}>⊞</button>
                  <button onClick={() => setVue("liste")} title="Liste" style={{ padding: "8px 13px", border: "none", borderLeft: "1px solid #e8e8e8", background: vue === "liste" ? "#fff0f0" : "transparent", color: vue === "liste" ? "#e53935" : "#aaa", cursor: "pointer", fontSize: 15, transition: "all 0.15s" }}>☰</button>
                </div>
                <Link href="/publier" style={{ display: "inline-flex", alignItems: "center", gap: 6, color: "#fff", background: "linear-gradient(135deg,#ff5252,#c62828)", fontSize: 13, textDecoration: "none", fontWeight: 700, padding: "8px 16px", borderRadius: 10, boxShadow: "0 4px 12px rgba(229,57,53,0.3)" }}>
                  + Publier
                </Link>
              </div>
            </div>

            {annoncesFiltrees.length === 0 ? (
              <div style={{ textAlign: "center", padding: "80px 20px", color: "#bbb" }}>
                <div style={{ fontSize: 52, marginBottom: 16 }}>🔍</div>
                <div style={{ fontSize: 18, fontWeight: 700, color: "#888", marginBottom: 8 }}>Aucune annonce trouvée</div>
                <div style={{ fontSize: 14, color: "#bbb" }}>Essayez d&apos;autres filtres ou <Link href="/publier" style={{ color: "#e53935", textDecoration: "none", fontWeight: 600 }}>publiez une annonce</Link></div>
              </div>
            ) : vue === "grille" ? (
              <div className="annonces-grid">
                {annoncesFiltrees.map((annonce) => (
                  <AnnonceCard key={annonce.id} annonce={annonce} vue="grille" />
                ))}
              </div>
            ) : (
              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                {annoncesFiltrees.map((annonce) => (
                  <AnnonceCard key={annonce.id} annonce={annonce} vue="liste" />
                ))}
              </div>
            )}
          </main>
        </div>
      </div>

      {/* ── COMMENT ÇA MARCHE ── */}
      <section style={{ background: "#fff", padding: "64px 32px", borderTop: "1px solid #f0f0f0" }}>
        <div style={{ maxWidth: 1000, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 52 }}>
            <div style={{ display: "inline-block", background: "#fff0f0", color: "#e53935", fontSize: 12, fontWeight: 700, padding: "5px 14px", borderRadius: 100, letterSpacing: "0.8px", marginBottom: 14, textTransform: "uppercase" }}>Simple & Rapide</div>
            <h2 style={{ fontSize: 28, fontWeight: 800, color: "#1a1a2e", margin: 0, letterSpacing: "-0.5px" }}>Comment ça marche ?</h2>
            <p style={{ color: "#999", fontSize: 15, marginTop: 10 }}>Trois étapes pour retrouver ou signaler un objet</p>
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
                titre: "Publiez une annonce",
                desc: "Décrivez l'objet, sa localisation et ajoutez une photo en moins de 2 minutes.",
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
                titre: "Recherchez & Filtrez",
                desc: "Cherchez par mot-clé, ville ou catégorie pour trouver ce qui correspond.",
              },
              {
                num: "03",
                icon: (
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
                    <path d="M9 12l2 2 4-4" stroke="#e53935" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z" stroke="#e53935" strokeWidth="2" />
                  </svg>
                ),
                titre: "Récupérez en sécurité",
                desc: "Contactez le déclarant directement et organisez la remise en toute confiance.",
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

      {/* ── CTA BANNER ── */}
      <section style={{ background: "linear-gradient(135deg, #1a1a2e 0%, #2d1b4e 50%, #3d0f0f 100%)", padding: "60px 32px", textAlign: "center", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: -60, right: -60, width: 240, height: 240, borderRadius: "50%", background: "rgba(229,57,53,0.12)" }} />
        <div style={{ position: "absolute", bottom: -40, left: -40, width: 180, height: 180, borderRadius: "50%", background: "rgba(255,255,255,0.04)" }} />
        <div style={{ position: "relative", maxWidth: 600, margin: "0 auto" }}>
          <div style={{ fontSize: 36, marginBottom: 16 }}>🙌</div>
          <h2 style={{ fontSize: 26, fontWeight: 800, color: "#fff", marginBottom: 12, letterSpacing: "-0.5px" }}>
            Vous avez trouvé un objet ?
          </h2>
          <p style={{ color: "rgba(255,255,255,0.65)", fontSize: 15, marginBottom: 32, lineHeight: 1.65 }}>
            Aidez quelqu&apos;un à retrouver son bien. Publiez une annonce gratuitement en moins de 2 minutes.
          </p>
          <Link href="/publier" style={{ display: "inline-flex", alignItems: "center", gap: 10, background: "linear-gradient(135deg,#ff5252,#c62828)", color: "#fff", textDecoration: "none", borderRadius: 14, padding: "16px 36px", fontWeight: 800, fontSize: 16, boxShadow: "0 8px 30px rgba(229,57,53,0.5)", letterSpacing: "0.2px" }}>
            📢 Déposer une annonce gratuite
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
