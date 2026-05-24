"use client";
import { useState } from "react";

const categories = [
  { icon: "📱", label: "Téléphones" },
  { icon: "🔑", label: "Clés" },
  { icon: "👜", label: "Portefeuilles" },
  { icon: "📄", label: "Documents" },
  { icon: "🐾", label: "Animaux" },
  { icon: "📦", label: "Autre" },
];

const annonces = [
  { id: 1, titre: "iPhone 13", lieu: "Tunis", temps: "Il y a 2h", type: "perdu", categorie: "Téléphones", image: "https://images.unsplash.com/photo-1632661674596-df8be070a5c5?w=300&h=200&fit=crop" },
  { id: 2, titre: "Portefeuille", lieu: "Sfax", temps: "Il y a 9h", type: "trouve", categorie: "Portefeuilles", image: "https://images.unsplash.com/photo-1627123424574-724758594e93?w=300&h=200&fit=crop" },
  { id: 3, titre: "Clé de voiture perdue", lieu: "Ariana", temps: "Il y a 3h", type: "perdu", categorie: "Clés", image: "/cle-voiture.jpg" },
  { id: 4, titre: "Sac Trouvé", lieu: "La Marsa", temps: "Il y a 4h", type: "trouve", categorie: "Portefeuilles", image: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=300&h=200&fit=crop" },
  { id: 5, titre: "Chat Perdu", lieu: "Sousse", temps: "Il y a 5h", type: "perdu", categorie: "Animaux", image: "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=300&h=200&fit=crop" },
  { id: 6, titre: "Carte d'identité", lieu: "Sfax", temps: "Il y a 2h", type: "trouve", categorie: "Documents", image: "/carte-identite.png" },
  { id: 7, titre: "Cahier de révision", lieu: "Univ. de Carthage", temps: "Il y a 6h", type: "perdu", categorie: "Documents", image: "https://images.unsplash.com/photo-1769794371008-954a71d95ce8?w=300&h=200&fit=crop" },
  { id: 8, titre: "AirPods Perdus", lieu: "Nabeul", temps: "Il y a 6h", type: "trouve", categorie: "Téléphones", image: "https://images.unsplash.com/photo-1606220588913-b3aacb4d2f46?w=300&h=200&fit=crop" },
];

export default function Home() {
  const [search, setSearch] = useState("");
  const [ville, setVille] = useState("");
  const [filtreCategorie, setFiltreCategorie] = useState("Tous");
  const [filtreType, setFiltreType] = useState("tous");
  const [derniers7jours, setDerniers7jours] = useState(false);
  const [vue, setVue] = useState<"grille" | "liste">("grille");
  const [tri, setTri] = useState("recent");

  const annoncesFiltrees = annonces.filter((a) => {
    const matchSearch = a.titre.toLowerCase().includes(search.toLowerCase()) || a.lieu.toLowerCase().includes(search.toLowerCase());
    const matchVille = ville === "" || a.lieu.toLowerCase().includes(ville.toLowerCase());
    const matchCat = filtreCategorie === "Tous" || a.categorie === filtreCategorie;
    const matchType = filtreType === "tous" || a.type === filtreType;
    return matchSearch && matchVille && matchCat && matchType;
  });

  return (
    <div style={{ fontFamily: "'Segoe UI', sans-serif", minHeight: "100vh", background: "#f6f6f6", color: "#1a1a2e" }}>

      {/* NAVBAR */}
      <nav style={{ background: "#fff", borderBottom: "1px solid #e8e8e8", padding: "0 32px", display: "flex", alignItems: "center", justifyContent: "space-between", height: 64, position: "sticky", top: 0, zIndex: 100, boxShadow: "0 1px 4px rgba(0,0,0,0.08)" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <svg width="42" height="42" viewBox="0 0 42 42" fill="none" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="logoGrad" x1="0" y1="0" x2="42" y2="42" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#ff5252"/>
                <stop offset="100%" stopColor="#c62828"/>
              </linearGradient>
            </defs>
            <rect width="42" height="42" rx="13" fill="url(#logoGrad)"/>
            <circle cx="18" cy="18" r="8" stroke="white" strokeWidth="2.8" fill="none"/>
            <line x1="24" y1="24" x2="31" y2="31" stroke="white" strokeWidth="2.8" strokeLinecap="round"/>
          </svg>
          <div>
            <div style={{ fontWeight: 800, fontSize: 20, color: "#1a1a2e", lineHeight: 1, letterSpacing: "-0.5px" }}>Amena</div>
            <div style={{ fontSize: 10, color: "#888" }}>Lost & Found Tunisia</div>
          </div>
        </div>
        <div style={{ display: "flex", gap: 28, alignItems: "center" }}>
          <a href="#" style={{ color: "#e53935", fontWeight: 600, fontSize: 14, textDecoration: "none", borderBottom: "2px solid #e53935", paddingBottom: 2 }}>Accueil</a>
          <a href="#" style={{ color: "#555", fontSize: 14, textDecoration: "none" }}>Objets Perdus</a>
          <a href="#" style={{ color: "#555", fontSize: 14, textDecoration: "none" }}>Objets Trouvés</a>
          <a href="#" style={{ color: "#555", fontSize: 14, textDecoration: "none" }}>Aide</a>
          <div style={{ display: "flex", alignItems: "center", gap: 0, border: "2px solid #e53935", borderRadius: 8, overflow: "hidden" }}>
            <a href="#" style={{ color: "#e53935", fontSize: 13, textDecoration: "none", fontWeight: 600, padding: "7px 14px", borderRight: "1px solid #e53935" }}>Créer un compte</a>
            <a href="#" style={{ color: "#e53935", fontSize: 13, textDecoration: "none", fontWeight: 600, padding: "7px 14px" }}>Se Connecter</a>
          </div>
        </div>
      </nav>

      {/* HERO */}
      <div style={{ position: "relative", padding: "60px 24px 80px", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, backgroundImage: "url('https://images.unsplash.com/photo-1726428977637-ba8fc5a5047d?w=1600&fit=crop')", backgroundSize: "cover", backgroundPosition: "center" }} />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, rgba(10,20,80,0.5) 0%, rgba(10,20,80,0.35) 50%, rgba(10,20,80,0.55) 100%)" }} />
        <div style={{ position: "relative", maxWidth: 860, margin: "0 auto", textAlign: "center" }}>
          <h1 style={{ fontSize: 46, fontWeight: 800, color: "#fff", marginBottom: 10, lineHeight: 1.2 }}>Rien n&apos;est vraiment perdu.</h1>
          <p style={{ fontSize: 17, color: "rgba(255,255,255,0.85)", marginBottom: 32 }}>Retrouvez vos objets perdus ou ceux que vous avez trouvés</p>

          {/* Deux barres principales */}
          <div style={{ display: "flex", gap: 18, maxWidth: 860, margin: "0 auto", flexWrap: "wrap" }}>
            {/* Barre 1 : Déposer une annonce */}
            <div style={{ flex: 1, minWidth: 280, background: "linear-gradient(135deg, #ff5252 0%, #c62828 100%)", borderRadius: 20, display: "flex", flexDirection: "column", boxShadow: "0 12px 40px rgba(229,57,53,0.45)", overflow: "hidden" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 12, padding: "18px 20px 10px 20px" }}>
                <div style={{ width: 36, height: 36, borderRadius: 10, background: "rgba(255,255,255,0.2)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18, flexShrink: 0 }}>📢</div>
                <div style={{ textAlign: "left" }}>
                  <div style={{ color: "#fff", fontWeight: 800, fontSize: 15 }}>Déposer une annonce</div>
                  <div style={{ color: "rgba(255,255,255,0.8)", fontSize: 12 }}>Signalez un objet perdu ou trouvé</div>
                </div>
              </div>
              <div style={{ padding: "0 12px 12px 12px" }}>
                <button style={{ width: "100%", background: "rgba(255,255,255,0.25)", color: "#fff", border: "2px solid rgba(255,255,255,0.5)", borderRadius: 12, padding: "12px", fontWeight: 700, fontSize: 14, cursor: "pointer" }}>
                  Publier maintenant
                </button>
              </div>
            </div>

            {/* Barre 2 : Recherche avec localisation */}
            <div style={{ flex: 1.4, minWidth: 320, background: "rgba(255,255,255,0.97)", borderRadius: 20, display: "flex", flexDirection: "column", boxShadow: "0 12px 40px rgba(0,0,0,0.2)", overflow: "hidden" }}>
              <div style={{ display: "flex", alignItems: "center", padding: "14px 16px 8px 16px", gap: 8 }}>
                <div style={{ width: 32, height: 32, borderRadius: 8, background: "#e3f2fd", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16, flexShrink: 0 }}>🔍</div>
                <input
                  type="text"
                  placeholder="Recherche intelligente par IA"
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
        </div>
      </div>

      {/* CATÉGORIES RAPIDES — inspiré LeBonCoin */}
      <div style={{ background: "#fff", borderBottom: "1px solid #ebebeb", padding: "0 32px" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", display: "flex", gap: 4, overflowX: "auto", padding: "12px 0" }}>
          {[{ icon: "🗂️", label: "Tous" }, ...categories].map((cat) => (
            <button
              key={cat.label}
              onClick={() => setFiltreCategorie(cat.label)}
              style={{
                display: "flex", flexDirection: "column", alignItems: "center", gap: 5,
                padding: "10px 20px", borderRadius: 12, flexShrink: 0,
                border: filtreCategorie === cat.label ? "2px solid #e53935" : "2px solid transparent",
                background: filtreCategorie === cat.label ? "#fff5f5" : "transparent",
                cursor: "pointer"
              }}
            >
              <span style={{ fontSize: 24 }}>{cat.icon}</span>
              <span style={{ fontSize: 12, color: filtreCategorie === cat.label ? "#e53935" : "#555", fontWeight: filtreCategorie === cat.label ? 700 : 500, whiteSpace: "nowrap" }}>{cat.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* CONTENU PRINCIPAL */}
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "28px 32px", display: "flex", gap: 28 }}>

        {/* SIDEBAR FILTRES */}
        <aside style={{ width: 220, flexShrink: 0 }}>
          <div style={{ background: "#fff", borderRadius: 14, padding: "20px", boxShadow: "0 1px 8px rgba(0,0,0,0.07)", border: "1px solid #ebebeb" }}>
            <div style={{ fontWeight: 700, fontSize: 15, marginBottom: 20, display: "flex", alignItems: "center", gap: 8 }}>
              <span style={{ fontSize: 16 }}>☰</span> Filtres
            </div>

            <div style={{ fontWeight: 600, fontSize: 13, marginBottom: 10, color: "#333" }}>Catégorie</div>
            {["Tous", ...categories.map(c => c.label)].map((cat) => (
              <div key={cat} onClick={() => setFiltreCategorie(cat)} style={{ display: "flex", alignItems: "center", gap: 8, padding: "7px 4px", cursor: "pointer", fontSize: 13, marginBottom: 1 }}>
                <div style={{ width: 15, height: 15, borderRadius: 3, border: `2px solid ${filtreCategorie === cat ? "#e53935" : "#ccc"}`, background: filtreCategorie === cat ? "#e53935" : "#fff", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  {filtreCategorie === cat && <span style={{ color: "#fff", fontSize: 9, fontWeight: 700, lineHeight: 1 }}>✓</span>}
                </div>
                <span style={{ color: filtreCategorie === cat ? "#e53935" : "#555", fontWeight: filtreCategorie === cat ? 600 : 400 }}>
                  {cat === "Tous" ? "Tous" : `${categories.find(c => c.label === cat)?.icon} ${cat}`}
                </span>
              </div>
            ))}

            <div style={{ borderTop: "1px solid #f0f0f0", margin: "14px 0" }} />

            <div style={{ fontWeight: 600, fontSize: 13, marginBottom: 10, color: "#333" }}>Type</div>
            {[["tous", "Tous"], ["perdu", "Perdu"], ["trouve", "Trouvé"]].map(([val, label]) => (
              <div key={val} onClick={() => setFiltreType(val)} style={{ display: "flex", alignItems: "center", gap: 8, padding: "7px 4px", cursor: "pointer", marginBottom: 1 }}>
                <div style={{ width: 15, height: 15, borderRadius: "50%", border: `2px solid ${filtreType === val ? "#e53935" : "#ccc"}`, background: filtreType === val ? "#e53935" : "transparent", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  {filtreType === val && <div style={{ width: 5, height: 5, borderRadius: "50%", background: "#fff" }} />}
                </div>
                <span style={{ fontSize: 13, color: filtreType === val ? "#e53935" : "#555", fontWeight: filtreType === val ? 600 : 400 }}>{label}</span>
              </div>
            ))}

            <div style={{ borderTop: "1px solid #f0f0f0", margin: "14px 0" }} />

            <div onClick={() => setDerniers7jours(!derniers7jours)} style={{ display: "flex", alignItems: "center", gap: 8, padding: "7px 4px", cursor: "pointer", fontSize: 13 }}>
              <div style={{ width: 15, height: 15, borderRadius: 3, border: `2px solid ${derniers7jours ? "#e53935" : "#ccc"}`, background: derniers7jours ? "#e53935" : "#fff", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                {derniers7jours && <span style={{ color: "#fff", fontSize: 9, fontWeight: 700, lineHeight: 1 }}>✓</span>}
              </div>
              <span style={{ color: derniers7jours ? "#e53935" : "#555", fontWeight: derniers7jours ? 600 : 400 }}>Derniers 7 jours</span>
            </div>
          </div>
        </aside>

        {/* GRILLE / LISTE ANNONCES */}
        <main style={{ flex: 1 }}>
          {/* Barre tri + vue */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
            <div>
              <h2 style={{ fontSize: 20, fontWeight: 700, margin: 0 }}>
                Annonces <span style={{ color: "#e53935" }}>récemment déposées</span>
              </h2>
              <p style={{ fontSize: 13, color: "#888", margin: "4px 0 0" }}>{annoncesFiltrees.length} annonce{annoncesFiltrees.length > 1 ? "s" : ""} trouvée{annoncesFiltrees.length > 1 ? "s" : ""}</p>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
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
              <a href="#" style={{ color: "#e53935", fontSize: 13, textDecoration: "none", fontWeight: 600 }}>Voir tout →</a>
            </div>
          </div>

          {annoncesFiltrees.length === 0 ? (
            <div style={{ textAlign: "center", padding: 60, color: "#888", fontSize: 16 }}>Aucune annonce trouvée.</div>
          ) : vue === "grille" ? (
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: 20 }}>
              {annoncesFiltrees.map((annonce) => (
                <div key={annonce.id} style={{ background: "#fff", borderRadius: 16, overflow: "hidden", boxShadow: "0 1px 8px rgba(0,0,0,0.08)", border: "1px solid #ebebeb", cursor: "pointer", transition: "transform 0.2s, box-shadow 0.2s" }}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.transform = "translateY(-4px)"; (e.currentTarget as HTMLElement).style.boxShadow = "0 12px 28px rgba(0,0,0,0.12)"; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform = "translateY(0)"; (e.currentTarget as HTMLElement).style.boxShadow = "0 1px 8px rgba(0,0,0,0.08)"; }}
                >
                  <div style={{ position: "relative", height: 190, overflow: "hidden" }}>
                    <img src={annonce.image} alt={annonce.titre} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                    <div style={{ position: "absolute", top: 10, left: 10, background: annonce.type === "perdu" ? "#e53935" : "#2e7d32", color: "#fff", fontSize: 11, fontWeight: 700, padding: "4px 10px", borderRadius: 20 }}>
                      {annonce.type === "perdu" ? "Perdu" : "Trouvé"}
                    </div>
                    <div style={{ position: "absolute", top: 10, right: 10, width: 32, height: 32, borderRadius: "50%", background: "#fff", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 2px 8px rgba(0,0,0,0.15)", fontSize: 16 }}>♡</div>
                  </div>
                  <div style={{ padding: "14px 16px" }}>
                    <div style={{ fontWeight: 700, fontSize: 15, marginBottom: 5, color: "#1a1a2e" }}>{annonce.titre}</div>
                    <div style={{ fontSize: 12, color: "#999", display: "flex", alignItems: "center", gap: 4, marginBottom: 6 }}>
                      <span>📍</span>{annonce.lieu} · {annonce.temps}
                    </div>
                    <div style={{ fontSize: 12, color: "#e53935", fontWeight: 600 }}>{annonce.categorie}</div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {annoncesFiltrees.map((annonce) => (
                <div key={annonce.id} style={{ background: "#fff", borderRadius: 14, overflow: "hidden", boxShadow: "0 1px 8px rgba(0,0,0,0.07)", border: "1px solid #ebebeb", display: "flex", cursor: "pointer", transition: "box-shadow 0.2s" }}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.boxShadow = "0 6px 20px rgba(0,0,0,0.12)"; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.boxShadow = "0 1px 8px rgba(0,0,0,0.07)"; }}
                >
                  <div style={{ width: 180, height: 130, flexShrink: 0, position: "relative" }}>
                    <img src={annonce.image} alt={annonce.titre} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                    <div style={{ position: "absolute", top: 8, left: 8, background: annonce.type === "perdu" ? "#e53935" : "#2e7d32", color: "#fff", fontSize: 10, fontWeight: 700, padding: "3px 8px", borderRadius: 20 }}>
                      {annonce.type === "perdu" ? "Perdu" : "Trouvé"}
                    </div>
                  </div>
                  <div style={{ padding: "18px 20px", flex: 1 }}>
                    <div style={{ fontWeight: 700, fontSize: 16, marginBottom: 6, color: "#1a1a2e" }}>{annonce.titre}</div>
                    <div style={{ fontSize: 13, color: "#999", marginBottom: 8, display: "flex", alignItems: "center", gap: 4 }}>
                      <span>📍</span>{annonce.lieu} · {annonce.temps}
                    </div>
                    <span style={{ fontSize: 12, background: "#fff5f5", color: "#e53935", fontWeight: 600, padding: "3px 10px", borderRadius: 20 }}>{annonce.categorie}</span>
                  </div>
                  <div style={{ padding: "18px 16px", display: "flex", alignItems: "center" }}>
                    <div style={{ width: 36, height: 36, borderRadius: "50%", background: "#f5f5f5", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18, cursor: "pointer" }}>♡</div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </main>
      </div>

      {/* SECTION FEATURES */}
      <div style={{ background: "#fff", padding: "48px 32px", borderTop: "1px solid #ebebeb" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <h2 style={{ textAlign: "center", fontSize: 22, fontWeight: 700, marginBottom: 32, color: "#1a1a2e" }}>Comment ça marche ?</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 24 }}>
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

      {/* FOOTER */}
      <footer style={{ background: "#1a1a2e", color: "#aaa", padding: "36px 32px", textAlign: "center" }}>
        <div style={{ display: "flex", justifyContent: "center", gap: 28, marginBottom: 18 }}>
          <a href="#" style={{ color: "#aaa", textDecoration: "none", fontSize: 14 }}>FAQ</a>
          <a href="#" style={{ color: "#aaa", textDecoration: "none", fontSize: 14 }}>Contact</a>
          <a href="#" style={{ color: "#aaa", textDecoration: "none", fontSize: 14 }}>Conditions</a>
        </div>
        <div style={{ display: "flex", justifyContent: "center", gap: 16, marginBottom: 18 }}>
          {["f", "t", "in"].map((s) => (
            <div key={s} style={{ width: 36, height: 36, borderRadius: "50%", border: "1px solid #444", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14, cursor: "pointer", color: "#aaa" }}>{s}</div>
          ))}
        </div>
        <div style={{ fontSize: 13 }}>© 2026 <strong style={{ color: "#fff" }}>Amena</strong> – Tous droits réservés.</div>
      </footer>
    </div>
  );
}
