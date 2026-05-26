"use client";
import { categories } from "@/lib/data";
import { useLang } from "@/lib/LangContext";
import { tr } from "@/lib/translations";

interface Props {
  filtreCategorie: string;
  setFiltreCategorie: (v: string) => void;
  filtreType: string;
  setFiltreType: (v: string) => void;
  derniers7jours: boolean;
  setDerniers7jours: (v: boolean) => void;
}

export default function Sidebar({ filtreCategorie, setFiltreCategorie, filtreType, setFiltreType, derniers7jours, setDerniers7jours }: Props) {
  const { lang } = useLang();
  const t = tr[lang].sidebar;

  return (
    <div style={{ background: "#fff", borderRadius: 14, padding: "20px", boxShadow: "0 1px 8px rgba(0,0,0,0.07)", border: "1px solid #ebebeb" }}>
      <div style={{ fontWeight: 700, fontSize: 15, marginBottom: 20, display: "flex", alignItems: "center", gap: 8 }}>
        <span style={{ fontSize: 16 }}>☰</span> {t.filters}
      </div>

      <div style={{ fontWeight: 600, fontSize: 13, marginBottom: 10, color: "#333" }}>{t.category}</div>
      {[{ key: "all", label: t.all, icon: "" }, ...categories.map((c) => ({ key: c.key, label: c[lang], icon: c.icon }))].map((cat) => (
        <div key={cat.key} onClick={() => setFiltreCategorie(cat.key)} style={{ display: "flex", alignItems: "center", gap: 8, padding: "7px 4px", cursor: "pointer", fontSize: 13, marginBottom: 1 }}>
          <div style={{ width: 15, height: 15, borderRadius: 3, border: `2px solid ${filtreCategorie === cat.key ? "#e53935" : "#ccc"}`, background: filtreCategorie === cat.key ? "#e53935" : "#fff", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
            {filtreCategorie === cat.key && <span style={{ color: "#fff", fontSize: 9, fontWeight: 700, lineHeight: 1 }}>✓</span>}
          </div>
          <span style={{ color: filtreCategorie === cat.key ? "#e53935" : "#555", fontWeight: filtreCategorie === cat.key ? 600 : 400 }}>
            {cat.icon ? `${cat.icon} ${cat.label}` : cat.label}
          </span>
        </div>
      ))}

      <div style={{ borderTop: "1px solid #f0f0f0", margin: "14px 0" }} />

      <div style={{ fontWeight: 600, fontSize: 13, marginBottom: 10, color: "#333" }}>{t.type}</div>
      {([["tous", t.type_all], ["perdu", t.type_lost], ["trouve", t.type_found]] as [string, string][]).map(([val, label]) => (
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
        <span style={{ color: derniers7jours ? "#e53935" : "#555", fontWeight: derniers7jours ? 600 : 400 }}>{t.last7}</span>
      </div>
    </div>
  );
}
