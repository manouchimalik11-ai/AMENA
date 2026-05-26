"use client";
import Link from "next/link";
import { Annonce, categories } from "@/lib/data";
import { useLang } from "@/lib/LangContext";
import { tr } from "@/lib/translations";
import AnnonceActions from "@/components/AnnonceActions";

export default function AnnonceDetail({ annonce }: { annonce: Annonce }) {
  const { lang } = useLang();
  const t = tr[lang].annonce;
  const typeColor = annonce.type === "perdu" ? "#e53935" : "#2e7d32";
  const typeLabel = annonce.type === "perdu" ? t.lost : t.found;
  const catLabel = categories.find((c) => c.key === annonce.categorie)?.[lang] || annonce.categorie;

  return (
    <div style={{ maxWidth: 900, margin: "0 auto", padding: "32px 24px" }}>
      {/* Breadcrumb */}
      <div style={{ fontSize: 13, color: "#888", marginBottom: 20, display: "flex", alignItems: "center", gap: 6 }}>
        <Link href="/" style={{ color: "#e53935", textDecoration: "none", fontWeight: 600 }}>{tr[lang].publier.crumb_home}</Link>
        <span>›</span>
        <span>{catLabel}</span>
        <span>›</span>
        <span>{annonce.titre[lang]}</span>
      </div>

      <div style={{ background: "#fff", borderRadius: 20, overflow: "hidden", boxShadow: "0 2px 20px rgba(0,0,0,0.09)", border: "1px solid #ebebeb" }}>
        {/* Image */}
        <div style={{ position: "relative", height: 360, overflow: "hidden" }}>
          <img src={annonce.image} alt={annonce.titre[lang]} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
          <div style={{ position: "absolute", top: 20, left: 20, background: typeColor, color: "#fff", fontSize: 14, fontWeight: 700, padding: "6px 16px", borderRadius: 30 }}>
            {typeLabel}
          </div>
        </div>

        {/* Contenu */}
        <div style={{ padding: "32px 36px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 16, marginBottom: 20 }}>
            <div>
              <h1 style={{ fontSize: 28, fontWeight: 800, margin: 0, marginBottom: 8, color: "#1a1a2e" }}>{annonce.titre[lang]}</h1>
              <div style={{ display: "flex", alignItems: "center", gap: 16, flexWrap: "wrap" }}>
                <span style={{ fontSize: 14, color: "#888", display: "flex", alignItems: "center", gap: 4 }}>📍 {annonce.lieu}</span>
                <span style={{ fontSize: 14, color: "#888" }}>🕒 {annonce.temps[lang]}</span>
                <span style={{ background: "#fff5f5", color: "#e53935", fontSize: 13, fontWeight: 600, padding: "4px 12px", borderRadius: 20 }}>{catLabel}</span>
              </div>
            </div>
            <AnnonceActions annonce={annonce} />
          </div>

          <div style={{ borderTop: "1px solid #f0f0f0", paddingTop: 24, marginBottom: 28 }}>
            <h2 style={{ fontSize: 16, fontWeight: 700, marginBottom: 12, color: "#1a1a2e" }}>{t.description}</h2>
            <p style={{ fontSize: 15, color: "#555", lineHeight: 1.8, margin: 0 }}>{annonce.description[lang]}</p>
          </div>
        </div>
      </div>

      <div style={{ marginTop: 24, textAlign: "center" }}>
        <Link href="/" style={{ color: "#888", fontSize: 14, textDecoration: "none" }}>{t.back}</Link>
      </div>
    </div>
  );
}
