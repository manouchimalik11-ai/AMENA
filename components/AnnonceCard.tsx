"use client";
import { useState } from "react";
import Link from "next/link";
import { Annonce, categories } from "@/lib/data";
import { useLang } from "@/lib/LangContext";
import { tr } from "@/lib/translations";

interface Props {
  annonce: Annonce;
  vue: "grille" | "liste";
}

export default function AnnonceCard({ annonce, vue }: Props) {
  const [favori, setFavori] = useState(false);
  const [hovered, setHovered] = useState(false);
  const { lang } = useLang();
  const t = tr[lang];

  const catLabel = categories.find((c) => c.key === annonce.categorie)?.[lang] || annonce.categorie;

  const badge = (
    <div style={{
      background: annonce.type === "perdu" ? "#e53935" : "#2e7d32",
      color: "#fff", fontSize: 11, fontWeight: 700, padding: "4px 10px", borderRadius: 20
    }}>
      {annonce.type === "perdu" ? t.badge.lost : t.badge.found}
    </div>
  );

  const heartBtn = (
    <button
      onClick={(e) => { e.preventDefault(); setFavori(!favori); }}
      style={{ width: 32, height: 32, borderRadius: "50%", background: "#fff", border: "none", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 2px 8px rgba(0,0,0,0.15)", fontSize: 16, cursor: "pointer", color: favori ? "#e53935" : "#bbb", transition: "color 0.2s" }}
      aria-label={favori ? t.actions.fav_remove : t.actions.fav_add}
    >
      {favori ? "♥" : "♡"}
    </button>
  );

  if (vue === "liste") {
    return (
      <Link href={`/annonce/${annonce.id}`} style={{ textDecoration: "none" }}>
        <div
          style={{
            background: "#fff", borderRadius: 14, overflow: "hidden",
            boxShadow: hovered ? "0 6px 20px rgba(0,0,0,0.12)" : "0 1px 8px rgba(0,0,0,0.07)",
            border: "1px solid #ebebeb", display: "flex", cursor: "pointer", transition: "box-shadow 0.2s"
          }}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
        >
          <div style={{ width: 180, height: 130, flexShrink: 0, position: "relative" }} className="card-list-img">
            <img src={annonce.image} alt={annonce.titre[lang]} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
            <div style={{ position: "absolute", top: 8, left: 8 }}>{badge}</div>
          </div>
          <div style={{ padding: "18px 20px", flex: 1 }}>
            <div style={{ fontWeight: 700, fontSize: 16, marginBottom: 6, color: "#1a1a2e" }}>{annonce.titre[lang]}</div>
            <div style={{ fontSize: 13, color: "#999", marginBottom: 8, display: "flex", alignItems: "center", gap: 4 }}>
              <span>📍</span>{annonce.lieu} · {annonce.temps[lang]}
            </div>
            <span style={{ fontSize: 12, background: "#fff5f5", color: "#e53935", fontWeight: 600, padding: "3px 10px", borderRadius: 20 }}>{catLabel}</span>
          </div>
          <div style={{ padding: "18px 16px", display: "flex", alignItems: "center" }}>
            {heartBtn}
          </div>
        </div>
      </Link>
    );
  }

  return (
    <Link href={`/annonce/${annonce.id}`} style={{ textDecoration: "none" }}>
      <div
        style={{
          background: "#fff", borderRadius: 16, overflow: "hidden",
          boxShadow: hovered ? "0 12px 28px rgba(0,0,0,0.12)" : "0 1px 8px rgba(0,0,0,0.08)",
          border: "1px solid #ebebeb", cursor: "pointer",
          transform: hovered ? "translateY(-4px)" : "translateY(0)",
          transition: "transform 0.2s, box-shadow 0.2s"
        }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <div style={{ position: "relative", height: 190, overflow: "hidden" }}>
          <img src={annonce.image} alt={annonce.titre[lang]} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
          <div style={{ position: "absolute", top: 10, left: 10 }}>{badge}</div>
          <div style={{ position: "absolute", top: 10, right: 10 }}>{heartBtn}</div>
        </div>
        <div style={{ padding: "14px 16px" }}>
          <div style={{ fontWeight: 700, fontSize: 15, marginBottom: 5, color: "#1a1a2e" }}>{annonce.titre[lang]}</div>
          <div style={{ fontSize: 12, color: "#999", display: "flex", alignItems: "center", gap: 4, marginBottom: 6 }}>
            <span>📍</span>{annonce.lieu} · {annonce.temps[lang]}
          </div>
          <div style={{ fontSize: 12, color: "#e53935", fontWeight: 600 }}>{catLabel}</div>
        </div>
      </div>
    </Link>
  );
}
