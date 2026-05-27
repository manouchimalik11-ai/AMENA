"use client";
import { useState } from "react";
import Link from "next/link";
import { categories } from "@/lib/data";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useLang } from "@/lib/LangContext";
import { tr } from "@/lib/translations";

export default function PublierPage() {
  const [type, setType] = useState<"perdu" | "trouve">(() => {
    if (typeof window !== "undefined") {
      const t = new URLSearchParams(window.location.search).get("type");
      if (t === "trouve" || t === "perdu") return t;
    }
    return "perdu";
  });
  const [titre, setTitre] = useState("");
  const [categorie, setCategorie] = useState("");
  const [lieu, setLieu] = useState("");
  const [description, setDescription] = useState("");
  const [photo, setPhoto] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const { lang } = useLang();
  const t = tr[lang].publier;

  function handlePhoto(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => setPhoto(reader.result as string);
    reader.readAsDataURL(file);
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!titre || !categorie || !lieu || !description) return;
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div style={{ minHeight: "100vh", background: "#f6f6f6" }}>
        <Navbar />
        <div style={{ maxWidth: 560, margin: "80px auto", padding: "0 24px", textAlign: "center" }}>
          <div style={{ background: "#fff", borderRadius: 20, padding: "60px 40px", boxShadow: "0 2px 20px rgba(0,0,0,0.09)", border: "1px solid #ebebeb" }}>
            <div style={{ fontSize: 60, marginBottom: 20 }}>✅</div>
            <h1 style={{ fontSize: 24, fontWeight: 800, color: "#1a1a2e", marginBottom: 12 }}>{t.ok_title}</h1>
            <p style={{ fontSize: 15, color: "#777", lineHeight: 1.7, marginBottom: 32 }}>
              {t.ok_desc1} <strong>&ldquo;{titre}&rdquo;</strong> {t.ok_desc2}
            </p>
            <Link href="/" style={{ display: "inline-block", background: "#e53935", color: "#fff", textDecoration: "none", borderRadius: 12, padding: "14px 32px", fontWeight: 700, fontSize: 15 }}>
              {t.ok_btn}
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div style={{ minHeight: "100vh", background: "#f6f6f6" }}>
      <Navbar />

      <div style={{ maxWidth: 660, margin: "0 auto", padding: "40px 24px" }}>
        <div style={{ fontSize: 13, color: "#888", marginBottom: 24, display: "flex", alignItems: "center", gap: 6 }}>
          <Link href="/" style={{ color: "#e53935", textDecoration: "none", fontWeight: 600 }}>{t.crumb_home}</Link>
          <span>›</span>
          <span>{t.crumb}</span>
        </div>

        <div style={{ background: "#fff", borderRadius: 20, padding: "36px 40px", boxShadow: "0 2px 20px rgba(0,0,0,0.09)", border: "1px solid #ebebeb" }}>
          <h1 style={{ fontSize: 24, fontWeight: 800, color: "#1a1a2e", marginBottom: 6 }}>{t.title}</h1>
          <p style={{ fontSize: 14, color: "#888", marginBottom: 32 }}>{t.sub}</p>

          <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 22 }}>

            {/* Type */}
            <div>
              <label style={{ fontWeight: 700, fontSize: 14, color: "#333", display: "block", marginBottom: 10 }}>{t.type_label}</label>
              <div style={{ display: "flex", gap: 12 }}>
                {(["perdu", "trouve"] as const).map((tp) => (
                  <button
                    key={tp}
                    type="button"
                    onClick={() => setType(tp)}
                    style={{
                      flex: 1, padding: "14px", borderRadius: 12, fontWeight: 700, fontSize: 14, cursor: "pointer",
                      border: `2px solid ${type === tp ? (tp === "perdu" ? "#e53935" : "#2e7d32") : "#e0e0e0"}`,
                      background: type === tp ? (tp === "perdu" ? "#fff5f5" : "#f1f8f1") : "#fff",
                      color: type === tp ? (tp === "perdu" ? "#e53935" : "#2e7d32") : "#888",
                      transition: "all 0.2s"
                    }}
                  >
                    {tp === "perdu" ? t.lost_btn : t.found_btn}
                  </button>
                ))}
              </div>
            </div>

            {/* Titre */}
            <div>
              <label style={{ fontWeight: 700, fontSize: 14, color: "#333", display: "block", marginBottom: 8 }}>{t.titre_label}</label>
              <input
                type="text"
                value={titre}
                onChange={(e) => setTitre(e.target.value)}
                placeholder={t.titre_ph}
                required
                style={{ width: "100%", border: "2px solid #e0e0e0", borderRadius: 10, padding: "12px 14px", fontSize: 14, color: "#333", outline: "none", boxSizing: "border-box", transition: "border-color 0.2s" }}
                onFocus={(e) => (e.target.style.borderColor = "#e53935")}
                onBlur={(e) => (e.target.style.borderColor = "#e0e0e0")}
              />
            </div>

            {/* Catégorie */}
            <div>
              <label style={{ fontWeight: 700, fontSize: 14, color: "#333", display: "block", marginBottom: 10 }}>{t.cat_label}</label>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                {categories.map((cat) => (
                  <button
                    key={cat.key}
                    type="button"
                    onClick={() => setCategorie(cat.key)}
                    style={{
                      padding: "8px 16px", borderRadius: 30, fontSize: 13, fontWeight: 600, cursor: "pointer",
                      border: `2px solid ${categorie === cat.key ? "#e53935" : "#e0e0e0"}`,
                      background: categorie === cat.key ? "#fff5f5" : "#fff",
                      color: categorie === cat.key ? "#e53935" : "#666",
                      transition: "all 0.2s"
                    }}
                  >
                    {cat.icon} {cat[lang]}
                  </button>
                ))}
              </div>
            </div>

            {/* Lieu */}
            <div>
              <label style={{ fontWeight: 700, fontSize: 14, color: "#333", display: "block", marginBottom: 8 }}>{t.lieu_label}</label>
              <input
                type="text"
                value={lieu}
                onChange={(e) => setLieu(e.target.value)}
                placeholder={t.lieu_ph}
                required
                style={{ width: "100%", border: "2px solid #e0e0e0", borderRadius: 10, padding: "12px 14px", fontSize: 14, color: "#333", outline: "none", boxSizing: "border-box", transition: "border-color 0.2s" }}
                onFocus={(e) => (e.target.style.borderColor = "#e53935")}
                onBlur={(e) => (e.target.style.borderColor = "#e0e0e0")}
              />
            </div>

            {/* Description */}
            <div>
              <label style={{ fontWeight: 700, fontSize: 14, color: "#333", display: "block", marginBottom: 8 }}>{t.desc_label}</label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder={t.desc_ph}
                required
                rows={4}
                style={{ width: "100%", border: "2px solid #e0e0e0", borderRadius: 10, padding: "12px 14px", fontSize: 14, color: "#333", outline: "none", resize: "vertical", boxSizing: "border-box", fontFamily: "inherit", transition: "border-color 0.2s" }}
                onFocus={(e) => (e.target.style.borderColor = "#e53935")}
                onBlur={(e) => (e.target.style.borderColor = "#e0e0e0")}
              />
            </div>

            {/* Photo */}
            <div>
              <label style={{ fontWeight: 700, fontSize: 14, color: "#333", display: "block", marginBottom: 8 }}>{t.photo_label}</label>
              <label style={{ display: "block", cursor: "pointer" }}>
                <input type="file" accept="image/*" onChange={handlePhoto} style={{ display: "none" }} />
                {photo ? (
                  <div style={{ position: "relative", borderRadius: 10, overflow: "hidden", height: 180 }}>
                    <img src={photo} alt="Aperçu" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                    <div style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.3)", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontWeight: 600, fontSize: 14 }}>
                      {t.photo_change}
                    </div>
                  </div>
                ) : (
                  <div style={{ border: "2px dashed #e0e0e0", borderRadius: 10, padding: "28px", textAlign: "center", color: "#999" }}>
                    <div style={{ fontSize: 32, marginBottom: 8 }}>📷</div>
                    <div style={{ fontSize: 14, fontWeight: 500 }}>{t.photo_add}</div>
                    <div style={{ fontSize: 12, marginTop: 4 }}>{t.photo_info}</div>
                  </div>
                )}
              </label>
            </div>

            {/* Submit */}
            <button
              type="submit"
              style={{ background: "linear-gradient(135deg, #ff5252, #c62828)", color: "#fff", border: "none", borderRadius: 12, padding: "16px", fontWeight: 700, fontSize: 16, cursor: "pointer", boxShadow: "0 4px 20px rgba(229,57,53,0.4)", marginTop: 8 }}
            >
              {t.submit}
            </button>
          </form>
        </div>
      </div>

      <Footer />
    </div>
  );
}
