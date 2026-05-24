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
    <div style={{ fontFamily: "'Segoe UI', sans-serif", minHeight: "100vh", background: "#f6f6f6", color: "#1a1a2e" }}>
      <Navbar />

      {/* HERO */}
      <div style={{ position: "relative", padding: "60px 24px 80px", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, backgroundImage: "url('https://images.unsplash.com/photo-1726428977637-ba8fc5a5047d?w=1600&fit=crop')", backgroundSize: "cover", backgroundPosition: "center" }} />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, rgba(10,20,80,0.5) 0%, rgba(10,20,80,0.35) 50%, rgba(10,20,80,0.55) 100%)" }} />
        <div style={{ position: "relative", maxWidth: 860, margin: "0 auto", textAlign: "center" }}>
          <h1 className="hero-title" style={{ fontSize: 46, fontWeight: 800, color: "#fff", marginBottom: 10, lineHeight: 1.2 }}>Rien n&apos;est vraiment perdu.</h1>
          <p style={{ fontSize: 17, color: "rgba(255,255,255,0.85)", marginBottom: 32 }}>Retrouvez vos objets perdus ou ceux que vous avez trouvés</p>

          <div className="hero-bars" style={{ maxWidth: 860, margin: "0 auto" }}>
            {/* Barre Déposer une annonce */}
            <div style={{ flex: 1, minWidth: 280, background: "linear-gradient(135deg, #ff5252 0%, #c62828 100%)", borderRadius: 20, display: "flex", flexDirection: "column", boxShadow: "0 12px 40px rgba(229,57,53,0.45)", overflow: "hidden" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 12, padding: "18px 20px 10px 20px" }}>
                <div style={{ width: 36, height: 36, borderRadius: 10, background: "rgba(255,255,255,0.2)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18, flexShrink: 0 }}>📢</div>
                <div style={{ textAlign: "left" }}>
                  <div style={{ color: "#fff", fontWeight: 800, fontSize: 15 }}>Déposer une annonce</div>
                  <div style={{ color: "rgba(255,255,255,0.8)", fontSize: 12 }}>Signalez un objet perdu ou trouvé</div>
                </div>
              </div>
              <div style={{ padding: "0 12px 12px 12px" }}>
                <Link href="/publier" style={{ display: "block", width: "100%", background: "rgba(255,255,255,0.25)", color: "#fff", border: "2px solid rgba(255,255,255,0.5)", borderRadius: 12, padding: "12px", fontWeight: 700, fontSize: 14, cursor: "pointer", textAlign: "center", textDecoration: "none" }}>
                  Publier maintenant
                </Link>
              </div>
            </div>

            {/* Barre Recherche */}
            <div style={{ flex: 1.4, minWidth: 320, background: "rgba(255,255,255,0.97)", borderRadius: 20, display: "flex", flexDirection: "column", boxShadow: "0 12px 40px rgba(0,0,0,0.2)", overflow: "hidden" }}>
              <div style={{ display: "flex", alignItems: "center", padding: "14px 16px 8px 16px", gap: 8 }}>
                <div style={{ width: 32, height: 32, borderRadius: 8, background: "#e3f2fd", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16, flexShrink: 0 }}>🔍</div>
                <input
                  type="text"
                  placeholder="Rechercher un objet..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  style={{ flex: 1, border: "none", outline: "none", fontSize: 14, color: "#333", background: "transparent", fontWeight: 500, minWidth: 0 }}
                />
                <div style={{ width: 1, height: 24, background: "#e0e0e0", flexShrink: 0 }} />
                <div style={{ width: 32, height: 32, borderRadius: 8, background: "#fff3e0", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16, flexShrink: 0 }}>📍</div>
                <input
                  type="text"
                  placeholder="Ville..."
                  value={ville}
                  onChange={(e) => setVille(e.target.value)}
                  style={{ width: 90, border: "none", outline: "none", fontSize: 14, color: "#333", background: "transparent", fontWeight: 500, minWidth: 0 }}
                />
              </div>
              <div style={{ padding: "0 12px 12px 12px" }}>
                <button style={{ width: "100%", background: "linear-gradient(135deg, #1a73e8, #0d47a1)", color: "#fff", border: "none", borderRadius: 12, padding: "12px", fontWeight: 700, fontSize: 14, cursor: "pointer", boxShadow: "0 4px 14px rgba(26,115,232,0.4)" }}>
                  Rechercher
                </button>
              </div>
            </div>
          </div>

          {/* Catégories rapides */}
          <div style={{ display: "flex", gap: 10, justifyContent: "center", marginTop: 28, flexWrap: "wrap" }}>
            {categories.map((cat) => (
              <button
                key={cat.label}
                onClick={() => setFiltreCategorie(filtreCategorie === cat.label ? "Tous" : cat.label)}
                style={{
                  background: filtreCategorie === cat.label ? "#fff" : "rgba(255,255,255,0.18)",
                  color: filtreCategorie === cat.label ? "#e53935" : "#fff",
                  border: "none", borderRadius: 30, padding: "8px 16px", fontSize: 13, fontWeight: 600, cursor: "pointer",
                  display: "flex", alignItems: "center", gap: 6, transition: "all 0.2s"
                }}
              >
                {cat.icon} {cat.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* CONTENU PRINCIPAL */}
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "28px 32px" }}>
        <div className="main-layout">

          {/* SIDEBAR */}
          <aside className="sidebar-wrapper">
            {/* Toggle mobile */}
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

          {/* GRILLE / LISTE ANNONCES */}
          <main style={{ flex: 1 }}>
            {/* Barre tri + vue */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20, flexWrap: "wrap", gap: 12 }}>
              <div>
                <h2 style={{ fontSize: 20, fontWeight: 700, margin: 0 }}>
                  Annonces <span style={{ color: "#e53935" }}>récemment déposées</span>
                </h2>
                <p style={{ fontSize: 13, color: "#888", margin: "4px 0 0" }}>{annoncesFiltrees.length} annonce{annoncesFiltrees.length > 1 ? "s" : ""} trouvée{annoncesFiltrees.length > 1 ? "s" : ""}</p>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap" }}>
                <select
                  value={tri}
                  onChange={(e) => setTri(e.target.value)}
                  style={{ border: "1px solid #ddd", borderRadius: 8, padding: "7px 12px", fontSize: 13, color: "#555", cursor: "pointer", background: "#fff", outline: "none" }}
                >
                  <option value="recent">Plus récent</option>
                  <option value="pertinence">Pertinence</option>
                </select>
                <div style={{ display: "flex", border: "1px solid #ddd", borderRadius: 8, overflow: "hidden" }}>
                  <button onClick={() => setVue("grille")} style={{ padding: "7px 12px", border: "none", background: vue === "grille" ? "#fff5f5" : "#fff", color: vue === "grille" ? "#e53935" : "#888", cursor: "pointer", fontSize: 16 }}>⊞</button>
                  <button onClick={() => setVue("liste")} style={{ padding: "7px 12px", border: "none", borderLeft: "1px solid #ddd", background: vue === "liste" ? "#fff5f5" : "#fff", color: vue === "liste" ? "#e53935" : "#888", cursor: "pointer", fontSize: 16 }}>☰</button>
                </div>
                <Link href="/publier" style={{ color: "#fff", background: "#e53935", fontSize: 13, textDecoration: "none", fontWeight: 600, padding: "8px 16px", borderRadius: 8 }}>+ Publier</Link>
              </div>
            </div>

            {annoncesFiltrees.length === 0 ? (
              <div style={{ textAlign: "center", padding: 60, color: "#888", fontSize: 16 }}>
                <div style={{ fontSize: 48, marginBottom: 16 }}>🔍</div>
                Aucune annonce trouvée.
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

      {/* COMMENT ÇA MARCHE */}
      <div style={{ background: "#fff", padding: "48px 32px", borderTop: "1px solid #ebebeb" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <h2 style={{ textAlign: "center", fontSize: 22, fontWeight: 700, marginBottom: 32, color: "#1a1a2e" }}>Comment ça marche ?</h2>
          <div className="features-grid">
            {[
              { icon: "📢", titre: "Publiez une annonce", desc: "Déclarez facilement vos objets perdus ou trouvés en quelques clics." },
              { icon: "🔍", titre: "Recherchez & Trouvez", desc: "Cherchez par ville, catégorie et description." },
              { icon: "🛡️", titre: "Récupérez en Sécurité", desc: "Échangez en toute confiance et sécurité." },
            ].map((f) => (
              <div key={f.titre} style={{ background: "#f8f9ff", borderRadius: 16, padding: "32px 24px", textAlign: "center", border: "1px solid #ebebeb" }}>
                <div style={{ fontSize: 40, marginBottom: 14 }}>{f.icon}</div>
                <div style={{ fontWeight: 700, fontSize: 16, marginBottom: 10, color: "#1a1a2e" }}>{f.titre}</div>
                <div style={{ fontSize: 14, color: "#777", lineHeight: 1.7 }}>{f.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
