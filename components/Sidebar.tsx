"use client";
import { GOVERNORATES } from "@/lib/geo";
import { useLang } from "@/lib/LangContext";
import { tr } from "@/lib/translations";

interface Props {
  filtreCategorie: string;
  setFiltreCategorie: (v: string) => void;
  filtreType: string;
  setFiltreType: (v: string) => void;
  gouvernoratSelectionne: string;
  setGouvernoratSelectionne: (v: string) => void;
  villeSelectionnee: string;
  setVilleSelectionnee: (v: string) => void;
  filtreDate: string;
  setFiltreDate: (v: string) => void;
}

function SectionTitle({ label }: { label: string }) {
  return (
    <div style={{ fontWeight: 700, fontSize: 11, color: "#aaa", letterSpacing: "0.9px", textTransform: "uppercase", marginBottom: 10 }}>
      {label}
    </div>
  );
}

function Divider() {
  return <div style={{ borderTop: "1px solid #f0f0f0", margin: "16px 0" }} />;
}

function StyledSelect({ value, onChange, children }: {
  value: string;
  onChange: (v: string) => void;
  children: React.ReactNode;
}) {
  return (
    <div style={{ position: "relative" }}>
      <select
        value={value}
        onChange={e => onChange(e.target.value)}
        style={{
          width: "100%",
          border: value ? "1.5px solid #1565C0" : "1.5px solid #e8e8e8",
          borderRadius: 10,
          padding: "9px 28px 9px 12px",
          fontSize: 13,
          color: value ? "#1a1a2e" : "#999",
          background: value ? "#f0f7ff" : "#fafafa",
          outline: "none",
          cursor: "pointer",
          appearance: "none",
          fontWeight: value ? 600 : 400,
          transition: "border-color 0.15s, background 0.15s",
        }}
      >
        {children}
      </select>
      <svg
        width="10" height="10" viewBox="0 0 24 24" fill="none"
        style={{ position: "absolute", right: 10, top: "50%", transform: "translateY(-50%)", pointerEvents: "none" }}
      >
        <path d="M6 9l6 6 6-6" stroke={value ? "#1565C0" : "#aaa"} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </div>
  );
}

function RadioRow({ active, label, onClick }: { active: boolean; label: string; onClick: () => void }) {
  return (
    <div onClick={onClick} style={{ display: "flex", alignItems: "center", gap: 8, padding: "6px 4px", cursor: "pointer" }}>
      <div style={{
        width: 15, height: 15, borderRadius: "50%",
        border: `2px solid ${active ? "#1565C0" : "#d0d0d0"}`,
        background: active ? "#1565C0" : "transparent",
        display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
        transition: "all 0.15s",
      }}>
        {active && <div style={{ width: 5, height: 5, borderRadius: "50%", background: "#fff" }} />}
      </div>
      <span style={{ fontSize: 13, color: active ? "#1565C0" : "#555", fontWeight: active ? 600 : 400 }}>
        {label}
      </span>
    </div>
  );
}

function CheckRow({ active, label, onClick }: { active: boolean; label: string; onClick: () => void }) {
  return (
    <div onClick={onClick} style={{ display: "flex", alignItems: "center", gap: 8, padding: "6px 4px", cursor: "pointer" }}>
      <div style={{
        width: 15, height: 15, borderRadius: 3,
        border: `2px solid ${active ? "#1565C0" : "#d0d0d0"}`,
        background: active ? "#1565C0" : "#fff",
        display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
        transition: "all 0.15s",
      }}>
        {active && <span style={{ color: "#fff", fontSize: 9, fontWeight: 700, lineHeight: 1 }}>✓</span>}
      </div>
      <span style={{ fontSize: 13, color: active ? "#1565C0" : "#555", fontWeight: active ? 600 : 400 }}>
        {label}
      </span>
    </div>
  );
}

export default function Sidebar({
  filtreCategorie, setFiltreCategorie,
  filtreType, setFiltreType,
  gouvernoratSelectionne, setGouvernoratSelectionne,
  villeSelectionnee, setVilleSelectionnee,
  filtreDate, setFiltreDate,
}: Props) {
  const { lang } = useLang();
  const t = tr[lang].sidebar;

  const selectedGov = GOVERNORATES.find(g => g.key === gouvernoratSelectionne);

  const dateOptions = [
    { key: "", label: t.date_all },
    { key: "24h", label: t.date_24h },
    { key: "48h", label: t.date_48h },
    { key: "7j",  label: t.date_7j },
    { key: "14j", label: t.date_14j },
    { key: "1m",  label: t.date_1m },
    { key: "1m+", label: t.date_old },
  ];

  return (
    <div style={{ background: "#fff", borderRadius: 14, padding: "20px", boxShadow: "0 1px 8px rgba(0,0,0,0.07)", border: "1px solid #ebebeb" }}>

      {/* ── Header ── */}
      <div style={{ fontWeight: 700, fontSize: 15, marginBottom: 20, display: "flex", alignItems: "center", gap: 8, color: "#1a1a2e" }}>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
          <path d="M3 6h18M7 12h10M11 18h2" stroke="#1565C0" strokeWidth="2.5" strokeLinecap="round" />
        </svg>
        {t.filters}
      </div>

      {/* ── GOUVERNORAT ── */}
      <SectionTitle label={t.gov_label} />
      <StyledSelect
        value={gouvernoratSelectionne}
        onChange={v => {
          setGouvernoratSelectionne(v);
          setVilleSelectionnee("");
        }}
      >
        <option value="">{t.gov_all}</option>
        {GOVERNORATES.map(g => (
          <option key={g.key} value={g.key}>{g[lang]}</option>
        ))}
      </StyledSelect>

      {/* ── VILLE ── */}
      {!selectedGov && (
        <div style={{ marginTop: 8, fontSize: 12, color: "#bbb", fontStyle: "italic", paddingLeft: 2 }}>
          {t.gov_hint}
        </div>
      )}
      {selectedGov && (
        <div style={{ marginTop: 10 }}>
          <div style={{ fontSize: 12, color: "#888", fontWeight: 500, marginBottom: 6 }}>
            {t.city_label} <span style={{ color: "#1565C0", fontWeight: 700 }}>· {selectedGov[lang]}</span>
          </div>
          <StyledSelect
            value={villeSelectionnee}
            onChange={setVilleSelectionnee}
          >
            <option value="">{t.city_all}</option>
            {[...selectedGov.cities].sort((a, b) => a.localeCompare(b, "fr")).map(c => (
              <option key={c} value={c}>{c}</option>
            ))}
          </StyledSelect>
        </div>
      )}

      <Divider />

      {/* ── DATE ── */}
      <SectionTitle label={t.date_label} />
      {dateOptions.map(({ key, label }) => (
        <RadioRow key={key} active={filtreDate === key} label={label} onClick={() => setFiltreDate(key)} />
      ))}


    </div>
  );
}
