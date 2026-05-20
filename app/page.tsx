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
  { id: 3, titre: "Clés Perdues", lieu: "Ariana", temps: "Il y a 3h", type: "perdu", categorie: "Clés", image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=300&h=200&fit=crop" },
  { id: 4, titre: "Sac Trouvé", lieu: "La Marsa", temps: "Il y a 4h", type: "trouve", categorie: "Portefeuilles", image: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=300&h=200&fit=crop" },
  { id: 5, titre: "Chat Perdu", lieu: "Sousse", temps: "Il y a 5h", type: "perdu", categorie: "Animaux", image: "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=300&h=200&fit=crop" },
  { id: 6, titre: "Carte d'identité", lieu: "Sfax", temps: "Il y a 2h", type: "trouve", categorie: "Documents", image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=300&h=200&fit=crop" },
  { id: 7, titre: "AirPods", lieu: "Nabeul", temps: "Il y a 6h", type: "perdu", categorie: "Téléphones", image: "https://images.unsplash.com/photo-1606220588913-b3aacb4d2f46?w=300&h=200&fit=crop" },
  { id: 8, titre: "AirPods Perdus", lieu: "Nabeul", temps: "Il y a 6h", type: "trouve", categorie: "Téléphones", image: "https://images.unsplash.com/photo-1606220588913-b3aacb4d2f46?w=300&h=200&fit=crop" },
];

export default function Home() {
  const [search, setSearch] = useState("");
  const [filtreCategorie, setFiltreCategorie] = useState("Tous");
  const [filtreType, setFiltreType] = useState("tous");
  const [derniers7jours, setDerniers7jours] = useState(false);

  const annoncesFiltrees = annonces.filter((a) => {
    const matchSearch = a.titre.toLowerCase().includes(search.toLowerCase()) || a.lieu.toLowerCase().includes(search.toLowerCase());
    const matchCat = filtreCategorie === "Tous" || a.categorie === filtreCategorie;
    const matchType = filtreType === "tous" || a.type === filtreType;
    return matchSearch && matchCat && matchType;
  });

  return (
    <div style={{ fontFamily: "'Segoe UI', sans-serif", minHeight: "100vh", background: "#f5f7fa", color: "#1a1a2e" }}>

      {/* NAVBAR */}
      <nav style={{ background: "#fff", borderBottom: "1px solid #e8e8e8", padding: "0 24px", display: "flex", alignItems: "center", justifyContent: "space-between", height: 64, position: "sticky", top: 0, zIndex: 100, boxShadow: "0 2px 8px rgba(0,0,0,0.06)" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{ width: 38, height: 38, background: "#e53935", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontSize: 20, fontWeight: 800 }}>A</div>
          <div>
            <div style={{ fontWeight: 700, fontSize: 18, color: "#1a1a2e", lineHeight: 1 }}>Amena</div>
            <div style={{ fontSize: 10, color: "#888" }}>Lost & Find Tunisie</div>
          </div>
        </div>
        <div style={{ display: "flex", gap: 28, alignItems: "center" }}>
          <a href="#" style={{ color: "#1a73e8", fontWeight: 600, fontSize: 14, textDecoration: "none", borderBottom: "2px solid #1a73e8", paddingBottom: 2 }}>Accueil</a>
          <a href="#" style={{ color: "#555", fontSize: 14, textDecoration: "none" }}>Objets Perdus</a>
          <a href="#" style={{ color: "#555", fontSize: 14, textDecoration: "none" }}>Objets Trouvés</a>
          <a href="#" style={{ color: "#555", fontSize: 14, textDecoration: "none" }}>Aide</a>
          <a href="#" style={{ color: "#555", fontSize: 14, textDecoration: "none" }}>Se Connecter</a>
          <button style={{ background: "#e53935", color: "#fff", border: "none", borderRadius: 8, padding: "10px 18px", fontWeight: 600, fontSize: 14, cursor: "pointer" }}>
            Déposer une Annonce
          </button>
        </div>
      </nav>

      {/* HERO */}
      <div style={{ position: "relative", padding: "70px 24px 90px", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, backgroundImage: "url('https://images.unsplash.com/photo-1726428977637-ba8fc5a5047d?w=1600&fit=crop')", backgroundSize: "cover", backgroundPosition: "center" }} />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, rgba(10,20,80,0.5) 0%, rgba(10,20,80,0.35) 50%, rgba(10,20,80,0.55) 100%)" }} />
        <div style={{ position: "relative", maxWidth: 800, margin: "0 auto", textAlign: "center" }}>
          <h1 style={{ fontSize: 48, fontWeight: 800, color: "#fff", marginBottom: 12, lineHeight: 1.2 }}>Rien n&apos;est vraiment perdu.</h1>
          <p style={{ fontSize: 18, color: "rgba(255,255,255,0.85)", marginBottom: 36 }}>Retrouvez vos objets perdus ou à ceux que vous avez trouvés</p>

          {/* Barre de recherche */}
          <div style={{ background: "#fff", borderRadius: 16, padding: "8px 8px 8px 20px", display: "flex", alignItems: "center", gap: 12, boxShadow: "0 8px 32px rgba(0,0,0,0.25)", maxWidth: 620, margin: "0 auto 20px" }}>
            <span style={{ fontSize: 20 }}>🔍</span>
            <input
              type="text"
              placeholder="Recherche intelligente par IA"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={{ flex: 1, border: "none", outline: "none", fontSize: 16, color: "#333", background: "transparent" }}
            />
            <button style={{ background: "#2e7d32", color: "#fff", border: "none", borderRadius: 10, padding: "12px 22px", fontWeight: 600, fontSize: 14, cursor: "pointer", display: "flex", alignItems: "center", gap: 8, whiteSpace: "nowrap" }}>
              📷 Télécharge une photo
            </button>
          </div>

          {/* Tags rapides */}
          <div style={{ display: "flex", gap: 10, justifyContent: "center", flexWrap: "wrap" }}>
            {["📱 Téléphones", "🔑 Clés", "👜 Portefeuilles"].map((tag) => (
              <button key={tag} style={{ background: "rgba(255,255,255,0.2)", color: "#fff", border: "1px solid rgba(255,255,255,0.4)", borderRadius: 20, padding: "8px 18px", fontSize: 14, cursor: "pointer", backdropFilter: "blur(4px)" }}>
                {tag}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* CONTENU PRINCIPAL */}
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "32px 24px", display: "flex", gap: 28 }}>

        {/* SIDEBAR FILTRES */}
        <aside style={{ width: 220, flexShrink: 0 }}>
          <div style={{ background: "#fff", borderRadius: 14, padding: "20px", boxShadow: "0 2px 12px rgba(0,0,0,0.06)" }}>
            <div style={{ fontWeight: 700, fontSize: 15, marginBottom: 20, display: "flex", alignItems: "center", gap: 8 }}>
              <span style={{ fontSize: 16 }}>☰</span> Filtres
            </div>

            <div style={{ fontWeight: 600, fontSize: 13, marginBottom: 10, color: "#333" }}>Catégorie</div>
            {["Tous", ...categories.map(c => c.label)].map((cat) => (
              <div
                key={cat}
                onClick={() => setFiltreCategorie(cat)}
                style={{ display: "flex", alignItems: "center", gap: 8, padding: "7px 4px", cursor: "pointer", fontSize: 13, marginBottom: 1 }}
              >
                <div style={{
                  width: 15, height: 15, borderRadius: 3, border: `2px solid ${filtreCategorie === cat ? "#1a73e8" : "#ccc"}`,
                  background: filtreCategorie === cat ? "#1a73e8" : "#fff",
                  display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0
                }}>
                  {filtreCategorie === cat && <span style={{ color: "#fff", fontSize: 9, fontWeight: 700, lineHeight: 1 }}>✓</span>}
                </div>
                <span style={{ color: filtreCategorie === cat ? "#1a73e8" : "#555", fontWeight: filtreCategorie === cat ? 600 : 400 }}>
                  {cat === "Tous" ? "Tous" : `${categories.find(c => c.label === cat)?.icon} ${cat}`}
                </span>
              </div>
            ))}

            <div style={{ borderTop: "1px solid #f0f0f0", margin: "14px 0" }} />

            <div style={{ fontWeight: 600, fontSize: 13, marginBottom: 10, color: "#333" }}>Type</div>
            {[["tous", "Tous"], ["perdu", "Perdu"], ["trouve", "Trouvé"]].map(([val, label]) => (
              <div key={val} onClick={() => setFiltreType(val)} style={{ display: "flex", alignItems: "center", gap: 8, padding: "7px 4px", cursor: "pointer", marginBottom: 1 }}>
                <div style={{
                  width: 15, height: 15, borderRadius: "50%", border: `2px solid ${filtreType === val ? "#1a73e8" : "#ccc"}`,
                  background: filtreType === val ? "#1a73e8" : "transparent",
                  display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0
                }}>
                  {filtreType === val && <div style={{ width: 5, height: 5, borderRadius: "50%", background: "#fff" }} />}
                </div>
                <span style={{ fontSize: 13, color: filtreType === val ? "#1a73e8" : "#555", fontWeight: filtreType === val ? 600 : 400 }}>{label}</span>
              </div>
            ))}

            <div style={{ borderTop: "1px solid #f0f0f0", margin: "14px 0" }} />

            <div
              onClick={() => setDerniers7jours(!derniers7jours)}
              style={{ display: "flex", alignItems: "center", gap: 8, padding: "7px 4px", cursor: "pointer", fontSize: 13 }}
            >
              <div style={{
                width: 15, height: 15, borderRadius: 3, border: `2px solid ${derniers7jours ? "#1a73e8" : "#ccc"}`,
                background: derniers7jours ? "#1a73e8" : "#fff",
                display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0
              }}>
                {derniers7jours && <span style={{ color: "#fff", fontSize: 9, fontWeight: 700, lineHeight: 1 }}>✓</span>}
              </div>
              <span style={{ color: derniers7jours ? "#1a73e8" : "#555", fontWeight: derniers7jours ? 600 : 400 }}>Derniers 7 jours</span>
            </div>
          </div>
        </aside>

        {/* GRILLE ANNONCES */}
        <main style={{ flex: 1 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
            <h2 style={{ fontSize: 22, fontWeight: 700 }}>
              Objets <span style={{ color: "#1a73e8" }}>récents</span>
            </h2>
            <a href="#" style={{ color: "#1a73e8", fontSize: 14, textDecoration: "none", fontWeight: 500 }}>Voir tous les objets →</a>
          </div>

          {annoncesFiltrees.length === 0 ? (
            <div style={{ textAlign: "center", padding: 60, color: "#888", fontSize: 16 }}>
              Aucun objet trouvé pour cette recherche.
            </div>
          ) : (
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: 18 }}>
              {annoncesFiltrees.map((annonce) => (
                <div
                  key={annonce.id}
                  style={{ background: "#fff", borderRadius: 14, overflow: "hidden", boxShadow: "0 2px 12px rgba(0,0,0,0.07)", cursor: "pointer", transition: "transform 0.2s, box-shadow 0.2s" }}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.transform = "translateY(-4px)"; (e.currentTarget as HTMLElement).style.boxShadow = "0 8px 24px rgba(0,0,0,0.13)"; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform = "translateY(0)"; (e.currentTarget as HTMLElement).style.boxShadow = "0 2px 12px rgba(0,0,0,0.07)"; }}
                >
                  <div style={{ height: 150, overflow: "hidden" }}>
                    <img src={annonce.image} alt={annonce.titre} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                  </div>
                  <div style={{ padding: "14px" }}>
                    <div style={{ fontWeight: 700, fontSize: 15, marginBottom: 4 }}>{annonce.titre}</div>
                    <div style={{ fontSize: 12, color: "#888", marginBottom: 12 }}>{annonce.lieu} · {annonce.temps}</div>
                    <button style={{
                      width: "100%", border: "none", borderRadius: 8, padding: "10px 0", fontWeight: 700, fontSize: 13, cursor: "pointer",
                      background: annonce.type === "perdu" ? "#e53935" : "#2e7d32",
                      color: "#fff"
                    }}>
                      {annonce.type === "perdu" ? "Perdu" : "Trouvé"}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </main>
      </div>

      {/* SECTION FEATURES */}
      <div style={{ background: "#fff", padding: "48px 24px", marginTop: 16 }}>
        <div style={{ maxWidth: 1000, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 24 }}>
          {[
            { icon: "📢", titre: "Publiez une annonce", desc: "Déclarez facilement vos objets perdus ou trouvés en quelques clics." },
            { icon: "🔍", titre: "Recherchez & Trouvez", desc: "Cherchez par ville, catégorie et description." },
            { icon: "🛡️", titre: "Récupérez en Sécurité", desc: "Échangez en toute confiance et sécurité." },
          ].map((f) => (
            <div key={f.titre} style={{ background: "#f8f9ff", borderRadius: 14, padding: "28px 24px", textAlign: "center" }}>
              <div style={{ fontSize: 36, marginBottom: 12 }}>{f.icon}</div>
              <div style={{ fontWeight: 700, fontSize: 16, marginBottom: 8 }}>{f.titre}</div>
              <div style={{ fontSize: 14, color: "#666", lineHeight: 1.6 }}>{f.desc}</div>
            </div>
          ))}
        </div>
      </div>

      {/* SECTION PARTENAIRES */}
      <div style={{ background: "#f5f7fa", padding: "48px 24px" }}>
        <div style={{ maxWidth: 1000, margin: "0 auto", textAlign: "center" }}>
          <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 32, color: "#1a1a2e" }}>Nos Partenaires</h2>
          <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: 32, flexWrap: "wrap" }}>
            {[
              { nom: "Taxis Tunisie", bg: "#e53935", color: "#fff" },
              { nom: "La Poste TN", bg: "#ffc107", color: "#333" },
              { nom: "Topnet", bg: "#1a73e8", color: "#fff" },
              { nom: "Orange TN", bg: "#ff6f00", color: "#fff" },
            ].map((p) => (
              <div key={p.nom} style={{
                background: p.bg, color: p.color, borderRadius: 12, padding: "14px 28px",
                fontWeight: 700, fontSize: 14, boxShadow: "0 2px 10px rgba(0,0,0,0.12)",
                minWidth: 120, textAlign: "center", cursor: "pointer"
              }}>
                {p.nom}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* FOOTER */}
      <footer style={{ background: "#1a1a2e", color: "#aaa", padding: "32px 24px", textAlign: "center" }}>
        <div style={{ display: "flex", justifyContent: "center", gap: 24, marginBottom: 16 }}>
          <a href="#" style={{ color: "#aaa", textDecoration: "none", fontSize: 14 }}>FAQ</a>
          <a href="#" style={{ color: "#aaa", textDecoration: "none", fontSize: 14 }}>Contact</a>
          <a href="#" style={{ color: "#aaa", textDecoration: "none", fontSize: 14 }}>Conditions</a>
        </div>
        <div style={{ display: "flex", justifyContent: "center", gap: 16, marginBottom: 16 }}>
          {["f", "t", "in"].map((s) => (
            <div key={s} style={{ width: 36, height: 36, borderRadius: "50%", border: "1px solid #444", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14, cursor: "pointer", color: "#aaa" }}>{s}</div>
          ))}
        </div>
        <div style={{ fontSize: 13 }}>© 2024 <strong style={{ color: "#fff" }}>Amena</strong> – Tous droits réservés.</div>
      </footer>
    </div>
  );
}
