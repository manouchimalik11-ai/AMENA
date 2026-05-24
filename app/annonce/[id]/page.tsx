import { annonces } from "@/lib/data";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AnnonceActions from "@/components/AnnonceActions";
import { notFound } from "next/navigation";
import Link from "next/link";

export default async function AnnoncePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const annonce = annonces.find((a) => a.id === parseInt(id));
  if (!annonce) notFound();

  const typeColor = annonce.type === "perdu" ? "#e53935" : "#2e7d32";
  const typeLabel = annonce.type === "perdu" ? "Perdu" : "Trouvé";

  return (
    <div style={{ fontFamily: "'Segoe UI', sans-serif", minHeight: "100vh", background: "#f6f6f6", color: "#1a1a2e" }}>
      <Navbar />

      <div style={{ maxWidth: 900, margin: "0 auto", padding: "32px 24px" }}>
        {/* Breadcrumb */}
        <div style={{ fontSize: 13, color: "#888", marginBottom: 20, display: "flex", alignItems: "center", gap: 6 }}>
          <Link href="/" style={{ color: "#e53935", textDecoration: "none", fontWeight: 600 }}>Accueil</Link>
          <span>›</span>
          <span>{annonce.categorie}</span>
          <span>›</span>
          <span>{annonce.titre}</span>
        </div>

        <div style={{ background: "#fff", borderRadius: 20, overflow: "hidden", boxShadow: "0 2px 20px rgba(0,0,0,0.09)", border: "1px solid #ebebeb" }}>
          {/* Image */}
          <div style={{ position: "relative", height: 360, overflow: "hidden" }}>
            <img src={annonce.image} alt={annonce.titre} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
            <div style={{ position: "absolute", top: 20, left: 20, background: typeColor, color: "#fff", fontSize: 14, fontWeight: 700, padding: "6px 16px", borderRadius: 30 }}>
              {typeLabel}
            </div>
          </div>

          {/* Contenu */}
          <div style={{ padding: "32px 36px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 16, marginBottom: 20 }}>
              <div>
                <h1 style={{ fontSize: 28, fontWeight: 800, margin: 0, marginBottom: 8, color: "#1a1a2e" }}>{annonce.titre}</h1>
                <div style={{ display: "flex", alignItems: "center", gap: 16, flexWrap: "wrap" }}>
                  <span style={{ fontSize: 14, color: "#888", display: "flex", alignItems: "center", gap: 4 }}>📍 {annonce.lieu}</span>
                  <span style={{ fontSize: 14, color: "#888" }}>🕒 {annonce.temps}</span>
                  <span style={{ background: "#fff5f5", color: "#e53935", fontSize: 13, fontWeight: 600, padding: "4px 12px", borderRadius: 20 }}>{annonce.categorie}</span>
                </div>
              </div>
              {/* Boutons Favori + Partager rendus par le composant client */}
              <AnnonceActions annonce={annonce} />
            </div>

            <div style={{ borderTop: "1px solid #f0f0f0", paddingTop: 24, marginBottom: 28 }}>
              <h2 style={{ fontSize: 16, fontWeight: 700, marginBottom: 12, color: "#1a1a2e" }}>Description</h2>
              <p style={{ fontSize: 15, color: "#555", lineHeight: 1.8, margin: 0 }}>{annonce.description}</p>
            </div>
          </div>
        </div>

        {/* Retour */}
        <div style={{ marginTop: 24, textAlign: "center" }}>
          <Link href="/" style={{ color: "#888", fontSize: 14, textDecoration: "none" }}>← Retour aux annonces</Link>
        </div>
      </div>

      <Footer />
    </div>
  );
}
