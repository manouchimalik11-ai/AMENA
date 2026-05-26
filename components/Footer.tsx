"use client";
import Link from "next/link";
import { useLang } from "@/lib/LangContext";
import { tr } from "@/lib/translations";

export default function Footer() {
  const { lang } = useLang();
  const t = tr[lang].footer;

  return (
    <footer style={{ background: "#1a1a2e", color: "#aaa", padding: "36px 32px", textAlign: "center" }}>
      <div style={{ display: "flex", justifyContent: "center", gap: 28, marginBottom: 18, flexWrap: "wrap" }}>
        <Link href="/aide" style={{ color: "#aaa", textDecoration: "none", fontSize: 14 }}>{t.faq}</Link>
        <Link href="/contact" style={{ color: "#aaa", textDecoration: "none", fontSize: 14 }}>{t.contact}</Link>
        <Link href="/conditions" style={{ color: "#aaa", textDecoration: "none", fontSize: 14 }}>{t.conditions}</Link>
        <Link href="/publier" style={{ color: "#ff7070", textDecoration: "none", fontSize: 14, fontWeight: 600 }}>{t.post}</Link>
      </div>
      <div style={{ display: "flex", justifyContent: "center", gap: 16, marginBottom: 18 }}>
        {["f", "t", "in"].map((s) => (
          <div key={s} style={{ width: 36, height: 36, borderRadius: "50%", border: "1px solid #444", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14, cursor: "pointer", color: "#aaa" }}>{s}</div>
        ))}
      </div>
      <div style={{ fontSize: 13 }}>© 2026 <strong style={{ color: "#fff" }}>Amena</strong> – {t.rights}</div>
    </footer>
  );
}
