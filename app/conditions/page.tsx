"use client";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useLang } from "@/lib/LangContext";
import { tr } from "@/lib/translations";

export default function ConditionsPage() {
  const { lang } = useLang();
  const t = tr[lang].conditions;

  return (
    <div style={{ minHeight: "100vh", background: "#f7f7f8" }}>
      <Navbar />
      <div style={{ maxWidth: 740, margin: "0 auto", padding: "48px 24px" }}>
        <div style={{ fontSize: 13, color: "#888", marginBottom: 24, display: "flex", gap: 6 }}>
          <Link href="/" style={{ color: "#e53935", textDecoration: "none", fontWeight: 600 }}>{t.crumb_home}</Link>
          <span>›</span><span>{t.crumb}</span>
        </div>
        <div style={{ background: "#fff", borderRadius: 20, padding: "44px 40px", boxShadow: "0 2px 20px rgba(0,0,0,0.08)" }}>
          <h1 style={{ fontSize: 26, fontWeight: 800, color: "#1a1a2e", marginBottom: 8 }}>{t.title}</h1>
          <p style={{ color: "#bbb", fontSize: 13, marginBottom: 36 }}>{t.updated}</p>
          <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
            {t.sections.map(s => (
              <div key={s.titre}>
                <h2 style={{ fontSize: 16, fontWeight: 700, color: "#1a1a2e", marginBottom: 8 }}>{s.titre}</h2>
                <p style={{ fontSize: 14, color: "#666", lineHeight: 1.75, margin: 0 }}>{s.texte}</p>
              </div>
            ))}
          </div>
          <div style={{ marginTop: 40, paddingTop: 28, borderTop: "1px solid #f0f0f0", textAlign: "center" }}>
            <p style={{ color: "#aaa", fontSize: 13, marginBottom: 16 }}>{t.questions}</p>
            <Link href="/contact" style={{ color: "#e53935", fontWeight: 600, textDecoration: "none", fontSize: 14 }}>{t.contact}</Link>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
