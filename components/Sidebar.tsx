"use client";
import { categories } from "@/lib/data";
import { TUNISIAN_CITIES } from "@/lib/geo";
import { useLang } from "@/lib/LangContext";
import { tr } from "@/lib/translations";

const RADIUS_OPTIONS = [10, 25, 50, 100];

interface Props {
  filtreCategorie: string;
  setFiltreCategorie: (v: string) => void;
  filtreType: string;
  setFiltreType: (v: string) => void;
  villeSelectionnee: string;
  setVilleSelectionnee: (v: string) => void;
  rayon: number;
  setRayon: (v: number) => void;
  filtreDate: string;
  setFiltreDate: (v: string) => void;
}

function SectionTitle({ label }: { label: string }) {
  return (
    <div style={{ fontWeight: 700, fontSize: 12, color: "#999", letterSpacing: "0.8px", textTransform: "uppercase", marginBottom: 10 }}>
      {label}
    </div>
  );
}

function Divider() {
  return <div style={{ borderTop: "1px solid #f0f0f0", margin: "16px 0" }} />;
}

export default function Sidebar({
  filtreCategorie, setFiltreCategorie,
  filtreType, setFiltreType,
  villeSelectionnee, setVilleSelectionnee,
  rayon, setRayon,
  filtreDate, setFiltreDate,
}: Props) {
  const { lang } = useLang();
  const t = tr[lang].sidebar;

  const dateOptions = [
    { key: "", label: t.date_all },
    { key: "24h", label: t.date_24h },
    { key: "48h", label: t.date_48h },
    { key: "7j", label: t.date_7j },
    { key: "14j", label: t.date_14j },
    { key: "1m", label: t.date_1m },
    { key: "1m+", label: t.date_old },
  ];

  return (
    <div style={{ background: "#fff", borderRadius: 14, padding: "20px", boxShadow: "0 1px 8px rgba(0,0,0,0.07)", border: "1px solid #ebebeb" }}>

      {/* Header */}
      <div style={{ fontWeight: 700, fontSize: 15, marginBottom: 20, display: "flex", alignItems: "center", gap: 8, color: "#1a1a2e" }}>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
          <path d="M3 6h18M7 12h10M11 18h2" stroke="#e53935" strokeWidth="2.5" strokeLinecap="round"/>
        </svg>
        {t.filters}
      </div>

      {/* ── VILLE ── */}
      <SectionTitle label={t.city_label} />
      <div style={{ position: "relative", marginBottom: villeSelectionnee ? 12 : 0 }}>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" style={{ position: "absolute", left: 10, top: "50%", transform: "translateY(-50%)", color: "#aaa", pointerEvents: "none" }}>
          <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" fill="#e53935" opacity="0.7"/>
          <circle cx="12" cy="9" r="2.5" fill="white"/>
        </svg>
        <select
          value={villeSelectionnee}
          onChange={e => {
            setVilleSelectionnee(e.target.value);
            if (!e.target.value) setRayon(25);
          }}
          style={{
            width: "100%", border: "1.5px solid #e8e8e8", borderRadius: 10,
            padding: "9px 10px 9px 30px", fontSize: 13, color: villeSelectionnee ? "#1a1a2e" : "#999",
            background: "#fafafa", outline: "none", cursor: "pointer", appearance: "none",
          }}
        >
          <option value="">{t.city_all}</option>
          {TUNISIAN_CITIES.map(c => <option key={c} value={c}>{c}</option>)}
        </select>
        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" style={{ position: "absolute", right: 10, top: "50%", transform: "translateY(-50%)", pointerEvents: "none" }}>
          <path d="M6 9l6 6 6-6" stroke="#aaa" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </div>

      {/* Rayon — visible uniquement si une ville est sélectionnée */}
      {villeSelectionnee && (
        <div style={{ marginBottom: 4 }}>
          <div style={{ fontSize: 12, color: "#888", marginBottom: 8, fontWeight: 500 }}>{t.radius_label}</div>
          <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
            {RADIUS_OPTIONS.map(r => (
              <button
                key={r}
                onClick={() => setRayon(r)}
                style={{
                  padding: "5px 10px", borderRadius: 20, fontSize: 12, fontWeight: 600, cursor: "pointer",
                  border: `1.5px solid ${rayon === r ? "#e53935" : "#e0e0e0"}`,
                  background: rayon === r ? "#fff0f0" : "#fff",
                  color: rayon === r ? "#e53935" : "#888",
                  transition: "all 0.15s",
                }}
              >
                {r} {t.km}
              </button>
            ))}
          </div>
        </div>
      )}

      <Divider />

      {/* ── DATE ── */}
      <SectionTitle label={t.date_label} />
      <div style={{ display: "flex", flexDirection: "column", gap: 1 }}>
        {dateOptions.map(({ key, label }) => (
          <div
            key={key}
            onClick={() => setFiltreDate(key)}
            style={{ display: "flex", alignItems: "center", gap: 8, padding: "6px 4px", cursor: "pointer" }}
          >
            <div style={{
              width: 15, height: 15, borderRadius: "50%",
              border: `2px solid ${filtreDate === key ? "#e53935" : "#ccc"}`,
              background: filtreDate === key ? "#e53935" : "transparent",
              display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
            }}>
              {filtreDate === key && <div style={{ width: 5, height: 5, borderRadius: "50%", background: "#fff" }} />}
            </div>
            <span style={{ fontSize: 13, color: filtreDate === key ? "#e53935" : "#555", fontWeight: filtreDate === key ? 600 : 400 }}>
              {label}
            </span>
          </div>
        ))}
      </div>

      <Divider />

      {/* ── CATÉGORIE ── */}
      <SectionTitle label={t.category} />
      {[{ key: "all", label: t.all, icon: "" }, ...categories.map(c => ({ key: c.key, label: c[lang], icon: c.icon }))].map(cat => (
        <div key={cat.key} onClick={() => setFiltreCategorie(cat.key)} style={{ display: "flex", alignItems: "center", gap: 8, padding: "6px 4px", cursor: "pointer", marginBottom: 1 }}>
          <div style={{
            width: 15, height: 15, borderRadius: 3,
            border: `2px solid ${filtreCategorie === cat.key ? "#e53935" : "#ccc"}`,
            background: filtreCategorie === cat.key ? "#e53935" : "#fff",
            display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
          }}>
            {filtreCategorie === cat.key && <span style={{ color: "#fff", fontSize: 9, fontWeight: 700, lineHeight: 1 }}>✓</span>}
          </div>
          <span style={{ fontSize: 13, color: filtreCategorie === cat.key ? "#e53935" : "#555", fontWeight: filtreCategorie === cat.key ? 600 : 400 }}>
            {cat.icon ? `${cat.icon} ${cat.label}` : cat.label}
          </span>
        </div>
      ))}

      <Divider />

      {/* ── TYPE ── */}
      <SectionTitle label={t.type} />
      {([["tous", t.type_all], ["perdu", t.type_lost], ["trouve", t.type_found]] as [string, string][]).map(([val, label]) => (
        <div key={val} onClick={() => setFiltreType(val)} style={{ display: "flex", alignItems: "center", gap: 8, padding: "6px 4px", cursor: "pointer", marginBottom: 1 }}>
          <div style={{
            width: 15, height: 15, borderRadius: "50%",
            border: `2px solid ${filtreType === val ? "#e53935" : "#ccc"}`,
            background: filtreType === val ? "#e53935" : "transparent",
            display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
          }}>
            {filtreType === val && <div style={{ width: 5, height: 5, borderRadius: "50%", background: "#fff" }} />}
          </div>
          <span style={{ fontSize: 13, color: filtreType === val ? "#e53935" : "#555", fontWeight: filtreType === val ? 600 : 400 }}>
            {label}
          </span>
        </div>
      ))}
    </div>
  );
}
