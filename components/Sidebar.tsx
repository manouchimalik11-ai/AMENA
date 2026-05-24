"use client";
import { categories } from "@/lib/data";

interface Props {
  filtreCategorie: string;
  setFiltreCategorie: (v: string) => void;
  filtreType: string;
  setFiltreType: (v: string) => void;
  derniers7jours: boolean;
  setDerniers7jours: (v: boolean) => void;
}

export default function Sidebar({ filtreCategorie, setFiltreCategorie, filtreType, setFiltreType, derniers7jours, setDerniers7jours }: Props) {
  return (
    <div style={{ background: "#fff", borderRadius: 14, padding: "20px", boxShadow: "0 1px 8px rgba(0,0,0,0.07)", border: "1px solid #ebebeb" }}>
      <div style={{ fontWeight: 700, fontSize: 15, marginBottom: 20, display: "flex", alignItems: "center", gap: 8 }}>
        <span style={{ fontSize: 16 }}>☰</span> Filtres
      </div>

      <div style={{ fontWeight: 600, fontSize: 13, marginBottom: 10, color: "#333" }}>Catégorie</div>
      {["Tous", ...categories.map((c) => c.label)].map((cat) => (
        <div key={cat} onClick={() => setFiltreCategorie(cat)} style={{ display: "flex", alignItems: "center", gap: 8, padding: "7px 4px", cursor: "pointer", fontSize: 13, marginBottom: 1 }}>
          <div style={{ width: 15, height: 15, borderRadius: 3, border: `2px solid ${filtreCategorie === cat ? "#e53935" : "#ccc"}`, background: filtreCategorie === cat ? "#e53935" : "#fff", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
            {filtreCategorie === cat && <span style={{ color: "#fff", fontSize: 9, fontWeight: 700, lineHeight: 1 }}>✓</span>}
          </div>
          <span style={{ color: filtreCategorie === cat ? "#e53935" : "#555", fontWeight: filtreCategorie === cat ? 600 : 400 }}>
            {cat === "Tous" ? "Tous" : `${categories.find((c) => c.label === cat)?.icon} ${cat}`}
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
  );
}
