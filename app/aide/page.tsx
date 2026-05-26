"use client";
import { useState } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useLang } from "@/lib/LangContext";
import { tr } from "@/lib/translations";

export default function AidePage() {
  const [open, setOpen] = useState<number | null>(null);
  const { lang } = useLang();
  const t = tr[lang].aide;

  return (
    <div style={{ minHeight: "100vh", background: "#f7f7f8" }}>
      <Navbar />
      <div style={{ maxWidth: 760, margin: "0 auto", padding: "48px 24px" }}>
        <div style={{ fontSize: 13, color: "#888", marginBottom: 24, display: "flex", gap: 6 }}>
          <Link href="/" style={{ color: "#e53935", textDecoration: "none", fontWeight: 600 }}>{t.crumb_home}</Link>
          <span>›</span><span>{t.crumb}</span>
        </div>

        <div style={{ textAlign: "center", marginBottom: 48 }}>
          <div style={{ fontSize: 48, marginBottom: 16 }}>🙋</div>
          <h1 style={{ fontSize: 28, fontWeight: 800, color: "#1a1a2e", marginBottom: 10 }}>{t.title}</h1>
          <p style={{ color: "#999", fontSize: 15 }}>{t.sub}</p>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 12, marginBottom: 48 }}>
          {t.faqs.map((faq, i) => (
            <div key={i} style={{ background: "#fff", borderRadius: 14, border: "1px solid #eee", overflow: "hidden" }}>
              <button
                onClick={() => setOpen(open === i ? null : i)}
                style={{ width: "100%", display: "flex", justifyContent: "space-between", alignItems: "center", padding: "18px 22px", background: "none", border: "none", cursor: "pointer", textAlign: "left", gap: 12 }}
              >
                <span style={{ fontWeight: 700, fontSize: 15, color: "#1a1a2e" }}>{faq.q}</span>
                <span style={{ color: "#e53935", fontSize: 20, flexShrink: 0, fontWeight: 300 }}>{open === i ? "−" : "+"}</span>
              </button>
              {open === i && (
                <div style={{ padding: "0 22px 20px", fontSize: 14, color: "#666", lineHeight: 1.7, borderTop: "1px solid #f5f5f5" }}>
                  <div style={{ paddingTop: 14 }}>{faq.r}</div>
                </div>
              )}
            </div>
          ))}
        </div>

        <div style={{ background: "#fff", borderRadius: 16, padding: "32px", textAlign: "center", border: "1px solid #eee" }}>
          <div style={{ fontSize: 32, marginBottom: 12 }}>📩</div>
          <h2 style={{ fontSize: 18, fontWeight: 700, color: "#1a1a2e", marginBottom: 8 }}>{t.not_found}</h2>
          <p style={{ color: "#aaa", fontSize: 14, marginBottom: 20 }}>{t.not_found_desc}</p>
          <Link href="/contact" style={{ display: "inline-block", background: "#e53935", color: "#fff", textDecoration: "none", borderRadius: 10, padding: "12px 28px", fontWeight: 700, fontSize: 14 }}>
            {t.contact_btn}
          </Link>
        </div>
      </div>
      <Footer />
    </div>
  );
}
