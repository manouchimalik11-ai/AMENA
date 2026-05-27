"use client";
import { useState } from "react";
import { annonces, categories } from "@/lib/data";
import { GOVERNORATES } from "@/lib/geo";
import { useLang } from "@/lib/LangContext";
import { tr } from "@/lib/translations";
import AnnonceCard from "@/components/AnnonceCard";

interface Props {
  initialQuery: string;
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

function RadioRow({ active, label, onClick }: { active: boolean; label: string; onClick: () => void }) {
  return (
    <div onClick={onClick} style={{ display: "flex", alignItems: "center", gap: 8, padding: "5px 4px", cursor: "pointer" }}>
      <div style={{ width: 15, height: 15, borderRadius: "50%", border: `2px solid ${active ? "#e53935" : "#d0d0d0"}`, background: active ? "#e53935" : "transparent", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, transition: "all 0.15s" }}>
        {active && <div style={{ width: 5, height: 5, borderRadius: "50%", background: "#fff" }} />}
      </div>
      <span style={{ fontSize: 13, color: active ? "#e53935" : "#555", fontWeight: active ? 600 : 400 }}>{label}</span>
    </div>
  );
}

function CheckRow({ active, label, onClick }: { active: boolean; label: string; onClick: () => void }) {
  return (
    <div onClick={onClick} style={{ display: "flex", alignItems: "center", gap: 8, padding: "5px 4px", cursor: "pointer" }}>
      <div style={{ width: 15, height: 15, borderRadius: 3, border: `2px solid ${active ? "#e53935" : "#d0d0d0"}`, background: active ? "#e53935" : "#fff", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, transition: "all 0.15s" }}>
        {active && <span style={{ color: "#fff", fontSize: 9, fontWeight: 700, lineHeight: 1 }}>✓</span>}
      </div>
      <span style={{ fontSize: 13, color: active ? "#e53935" : "#555", fontWeight: active ? 600 : 400 }}>{label}</span>
    </div>
  );
}

function StyledSelect({ value, onChange, children }: { value: string; onChange: (v: string) => void; children: React.ReactNode }) {
  return (
    <div style={{ position: "relative" }}>
      <select
        value={value}
        onChange={e => onChange(e.target.value)}
        style={{ width: "100%", border: value ? "1.5px solid #e53935" : "1.5px solid #e8e8e8", borderRadius: 10, padding: "9px 28px 9px 12px", fontSize: 13, color: value ? "#1a1a2e" : "#999", background: value ? "#fff8f8" : "#fafafa", outline: "none", cursor: "pointer", appearance: "none", fontWeight: value ? 600 : 400 }}
      >
        {children}
      </select>
      <svg width="10" height="10" viewBox="0 0 24 24" fill="none" style={{ position: "absolute", right: 10, top: "50%", transform: "translateY(-50%)", pointerEvents: "none" }}>
        <path d="M6 9l6 6 6-6" stroke={value ? "#e53935" : "#aaa"} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </div>
  );
}

export default function RechercheClient({ initialQuery }: Props) {
  const { lang } = useLang();
  const t = tr[lang];

  const [keyword, setKeyword] = useState(initialQuery);
  const [lieuSpec, setLieuSpec] = useState("");
  const [gouvernorat, setGouvernorat] = useState("");
  const [ville, setVille] = useState("");
  const [date, setDate] = useState("");
  const [categorie, setCategorie] = useState("all");
  const [type, setType] = useState("tous");
  const [filtersOpen, setFiltersOpen] = useState(false);

  const selectedGov = GOVERNORATES.find(g => g.key === gouvernorat);

  const dateOptions = [
    { key: "", label: t.sidebar.date_all },
    { key: "24h", label: t.sidebar.date_24h },
    { key: "48h", label: t.sidebar.date_48h },
    { key: "7j", label: t.sidebar.date_7j },
    { key: "14j", label: t.sidebar.date_14j },
    { key: "1m", label: t.sidebar.date_1m },
    { key: "1m+", label: t.sidebar.date_old },
  ];

  const filtered = annonces.filter(a => {
    const s = keyword.toLowerCase();
    const matchKw = !s
      || a.titre.fr.toLowerCase().includes(s)
      || a.titre.ar.includes(keyword)
      || a.lieu.toLowerCase().includes(s)
      || a.description.fr.toLowerCase().includes(s)
      || a.description.ar.includes(keyword);

    const matchLieu = !lieuSpec || a.lieu.toLowerCase().includes(lieuSpec.toLowerCase());

    const gov = gouvernorat ? GOVERNORATES.find(g => g.key === gouvernorat) : null;
    const matchVille = !gov
      || (ville ? a.lieu === ville
        : gov.cities.some(c => c.toLowerCase() === a.lieu.toLowerCase()) || gov.fr.toLowerCase() === a.lieu.toLowerCase());

    const h = a.heuresEcoulees;
    const matchDate = !date
      || (date === "24h" && h <= 24)
      || (date === "48h" && h <= 48)
      || (date === "7j" && h <= 168)
      || (date === "14j" && h <= 336)
      || (date === "1m" && h <= 720)
      || (date === "1m+" && h > 720);

    const matchCat = categorie === "all" || a.categorie === categorie;
    const matchType = type === "tous" || a.type === type;

    return matchKw && matchLieu && matchVille && matchDate && matchCat && matchType;
  });

  const activeFilters = [
    keyword, lieuSpec, gouvernorat, date,
    categorie !== "all" ? categorie : "",
    type !== "tous" ? type : "",
  ].filter(Boolean).length;

  function clearAll() {
    setKeyword("");
    setLieuSpec("");
    setGouvernorat("");
    setVille("");
    setDate("");
    setCategorie("all");
    setType("tous");
  }

  const FiltersPanel = (
    <div style={{ background: "#fff", borderRadius: 14, padding: 20, boxShadow: "0 1px 8px rgba(0,0,0,0.07)", border: "1px solid #ebebeb" }}>
      <div style={{ fontWeight: 700, fontSize: 14, color: "#1a1a2e", marginBottom: 18, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <span style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M3 6h18M7 12h10M11 18h2" stroke="#e53935" strokeWidth="2.5" strokeLinecap="round" /></svg>
          {t.sidebar.filters}
        </span>
        {activeFilters > 0 && (
          <button onClick={clearAll} style={{ background: "none", border: "none", color: "#e53935", fontSize: 12, fontWeight: 700, cursor: "pointer", padding: "2px 6px" }}>
            {t.recherche.clear}
          </button>
        )}
      </div>

      {/* Mots-clés */}
      <SectionTitle label={t.recherche.kw_label} />
      <div style={{ position: "relative", marginBottom: 4 }}>
        <input
          type="text"
          value={keyword}
          onChange={e => setKeyword(e.target.value)}
          placeholder={t.recherche.kw_ph}
          style={{ width: "100%", boxSizing: "border-box", border: keyword ? "1.5px solid #e53935" : "1.5px solid #e8e8e8", borderRadius: 10, padding: "9px 30px 9px 12px", fontSize: 13, outline: "none", background: keyword ? "#fff8f8" : "#fafafa", color: keyword ? "#1a1a2e" : "#999", fontWeight: keyword ? 600 : 400 }}
        />
        {keyword && (
          <button onClick={() => setKeyword("")} style={{ position: "absolute", right: 8, top: "50%", transform: "translateY(-50%)", background: "none", border: "none", cursor: "pointer", color: "#bbb", fontSize: 18, lineHeight: 1 }}>×</button>
        )}
      </div>

      <Divider />

      {/* Emplacement spécifique */}
      <SectionTitle label={t.recherche.lieu_label} />
      <div style={{ position: "relative", marginBottom: 4 }}>
        <input
          type="text"
          value={lieuSpec}
          onChange={e => setLieuSpec(e.target.value)}
          placeholder={t.recherche.lieu_ph}
          style={{ width: "100%", boxSizing: "border-box", border: lieuSpec ? "1.5px solid #e53935" : "1.5px solid #e8e8e8", borderRadius: 10, padding: "9px 30px 9px 12px", fontSize: 13, outline: "none", background: lieuSpec ? "#fff8f8" : "#fafafa", color: lieuSpec ? "#1a1a2e" : "#999", fontWeight: lieuSpec ? 600 : 400 }}
        />
        {lieuSpec && (
          <button onClick={() => setLieuSpec("")} style={{ position: "absolute", right: 8, top: "50%", transform: "translateY(-50%)", background: "none", border: "none", cursor: "pointer", color: "#bbb", fontSize: 18, lineHeight: 1 }}>×</button>
        )}
      </div>

      <Divider />

      {/* Gouvernorat + Ville */}
      <SectionTitle label={t.sidebar.gov_label} />
      <div style={{ marginBottom: selectedGov ? 8 : 0 }}>
        <StyledSelect value={gouvernorat} onChange={v => { setGouvernorat(v); setVille(""); }}>
          <option value="">{t.sidebar.gov_all}</option>
          {GOVERNORATES.map(g => (
            <option key={g.key} value={g.key}>{g[lang]}</option>
          ))}
        </StyledSelect>
      </div>
      {selectedGov && (
        <div style={{ marginTop: 8 }}>
          <div style={{ fontSize: 12, color: "#888", fontWeight: 500, marginBottom: 6 }}>
            {t.sidebar.city_label} <span style={{ color: "#e53935", fontWeight: 700 }}>· {selectedGov[lang]}</span>
          </div>
          <StyledSelect value={ville} onChange={setVille}>
            <option value="">{t.sidebar.city_all}</option>
            {[...selectedGov.cities].sort((a, b) => a.localeCompare(b, "fr")).map(c => (
              <option key={c} value={c}>{c}</option>
            ))}
          </StyledSelect>
        </div>
      )}

      <Divider />

      {/* Date */}
      <SectionTitle label={t.sidebar.date_label} />
      {dateOptions.map(({ key, label }) => (
        <RadioRow key={key} active={date === key} label={label} onClick={() => setDate(key)} />
      ))}

      <Divider />

      {/* Catégorie */}
      <SectionTitle label={t.sidebar.category} />
      <CheckRow active={categorie === "all"} label={t.sidebar.all} onClick={() => setCategorie("all")} />
      {categories.map(cat => (
        <CheckRow key={cat.key} active={categorie === cat.key} label={`${cat.icon} ${cat[lang]}`} onClick={() => setCategorie(cat.key)} />
      ))}

      <Divider />

      {/* Type */}
      <SectionTitle label={t.sidebar.type} />
      {([ ["tous", t.sidebar.type_all], ["perdu", t.sidebar.type_lost], ["trouve", t.sidebar.type_found] ] as [string, string][]).map(([val, label]) => (
        <RadioRow key={val} active={type === val} label={label} onClick={() => setType(val)} />
      ))}
    </div>
  );

  return (
    <div>
      {/* Header */}
      <div style={{ background: "linear-gradient(135deg, #1a1a2e 0%, #2d1f3d 100%)", padding: "36px 24px 32px" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <h1 style={{ color: "#fff", fontSize: 26, fontWeight: 800, marginBottom: 20, display: "flex", alignItems: "center", gap: 10 }}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
              <circle cx="11" cy="11" r="7" stroke="#ff5252" strokeWidth="2.5" />
              <path d="M16.5 16.5L21 21" stroke="#ff5252" strokeWidth="2.5" strokeLinecap="round" />
            </svg>
            {t.recherche.title}
          </h1>

          {/* Barre principale */}
          <div style={{ display: "flex", gap: 10, maxWidth: 860 }}>
            <div style={{ flex: 1, background: "#fff", borderRadius: 14, display: "flex", alignItems: "center", padding: "6px 16px", gap: 10, boxShadow: "0 4px 20px rgba(0,0,0,0.3)" }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" style={{ color: "#bbb", flexShrink: 0 }}>
                <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2" />
                <path d="M16.5 16.5L21 21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
              <input
                type="text"
                value={keyword}
                onChange={e => setKeyword(e.target.value)}
                placeholder={t.recherche.kw_ph}
                style={{ flex: 1, border: "none", outline: "none", fontSize: 15, padding: "11px 0", background: "transparent", color: "#222", fontWeight: keyword ? 500 : 400 }}
              />
              {keyword && (
                <button onClick={() => setKeyword("")} style={{ background: "none", border: "none", cursor: "pointer", color: "#bbb", fontSize: 20, lineHeight: 1, flexShrink: 0 }}>×</button>
              )}
            </div>
          </div>

          {/* Indicateur filtres actifs */}
          {activeFilters > 0 && (
            <div style={{ marginTop: 14, display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap" }}>
              <span style={{ color: "rgba(255,255,255,0.55)", fontSize: 13 }}>
                {activeFilters} {t.recherche.active_filters}
              </span>
              <button onClick={clearAll} style={{ background: "rgba(255,82,82,0.18)", border: "1px solid rgba(255,82,82,0.35)", borderRadius: 100, padding: "4px 14px", color: "#ff8a80", fontSize: 12, cursor: "pointer", fontWeight: 600 }}>
                {t.recherche.clear}
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Body */}
      <div style={{ maxWidth: 1240, margin: "0 auto", padding: "28px 24px" }}>

        {/* Toggle mobile */}
        <button
          className="sidebar-mobile-toggle"
          onClick={() => setFiltersOpen(!filtersOpen)}
          style={{ marginBottom: 12 }}
        >
          <span>☰ {t.sidebar.filters}{activeFilters > 0 ? ` (${activeFilters})` : ""}</span>
          <span>{filtersOpen ? "▲" : "▼"}</span>
        </button>

        <div style={{ display: "flex", gap: 28, alignItems: "flex-start" }}>

          {/* Filtres desktop */}
          <aside style={{ width: 260, flexShrink: 0 }} className="sidebar-wrapper">
            <div className={`sidebar-content${filtersOpen ? " open" : ""}`}>
              {FiltersPanel}
            </div>
          </aside>

          {/* Résultats */}
          <main style={{ flex: 1, minWidth: 0 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
              <div>
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 2 }}>
                  <div style={{ width: 4, height: 20, background: "linear-gradient(180deg,#ff5252,#c62828)", borderRadius: 4 }} />
                  <h2 style={{ fontSize: 18, fontWeight: 800, margin: 0, color: "#1a1a2e" }}>
                    {filtered.length} {filtered.length > 1 ? t.listing.results : t.listing.result}
                  </h2>
                </div>
                {keyword && (
                  <div style={{ fontSize: 13, color: "#aaa", paddingLeft: 12 }}>
                    {t.recherche.for} «{keyword}»
                  </div>
                )}
              </div>
            </div>

            {filtered.length === 0 ? (
              <div style={{ textAlign: "center", padding: "80px 20px", color: "#bbb" }}>
                <div style={{ fontSize: 52, marginBottom: 16 }}>🔍</div>
                <div style={{ fontSize: 18, fontWeight: 700, color: "#888", marginBottom: 8 }}>{t.recherche.no_results}</div>
                <div style={{ fontSize: 14, color: "#bbb", marginBottom: 20 }}>{t.recherche.no_results_desc}</div>
                {activeFilters > 0 && (
                  <button onClick={clearAll} style={{ background: "#e53935", color: "#fff", border: "none", borderRadius: 10, padding: "11px 28px", fontWeight: 700, fontSize: 14, cursor: "pointer" }}>
                    {t.recherche.clear}
                  </button>
                )}
              </div>
            ) : (() => {
              const boosted = filtered.filter(a => a.boosted && a.type === "perdu");
              const regular = filtered.filter(a => !a.boosted || a.type !== "perdu");
              return (
                <>
                  {boosted.length > 0 && (
                    <div style={{ marginBottom: 28 }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 14 }}>
                        <span style={{ background: "linear-gradient(135deg,#f59e0b,#d97706)", color: "#fff", fontSize: 11, fontWeight: 800, padding: "4px 12px", borderRadius: 20 }}>⚡ {t.listing.boosted_section}</span>
                        <div style={{ flex: 1, height: 1, background: "linear-gradient(90deg,#f59e0b22,transparent)" }} />
                      </div>
                      <div className="annonces-grid">
                        {boosted.map(a => <AnnonceCard key={a.id} annonce={a} vue="grille" />)}
                      </div>
                    </div>
                  )}
                  {regular.length > 0 && (
                    <div>
                      {boosted.length > 0 && (
                        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 14 }}>
                          <span style={{ fontSize: 12, fontWeight: 700, color: "#aaa" }}>{t.listing.regular_section}</span>
                          <div style={{ flex: 1, height: 1, background: "#f0f0f0" }} />
                        </div>
                      )}
                      <div className="annonces-grid">
                        {regular.map(a => <AnnonceCard key={a.id} annonce={a} vue="grille" />)}
                      </div>
                    </div>
                  )}
                </>
              );
            })()}
          </main>
        </div>
      </div>
    </div>
  );
}
