"use client";
import { useState } from "react";
import Link from "next/link";
import Footer from "@/components/Footer";
import { useLang } from "@/lib/LangContext";
import { tr } from "@/lib/translations";
import { useUser } from "@/lib/UserContext";

export default function ConnexionPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const { lang } = useLang();
  const t = tr[lang].connexion;
  const { login } = useUser();

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email || !password) { setError(t.err_fields); return; }
    login({ name: email.split("@")[0], email });
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div style={{ minHeight: "100vh", background: "#f7f7f8" }}>
        <div style={{ maxWidth: 480, margin: "80px auto", padding: "0 24px", textAlign: "center" }}>
          <div style={{ background: "#fff", borderRadius: 20, padding: "60px 40px", boxShadow: "0 2px 20px rgba(0,0,0,0.09)" }}>
            <div style={{ fontSize: 56, marginBottom: 16 }}>👋</div>
            <h1 style={{ fontSize: 24, fontWeight: 800, color: "#1a1a2e", marginBottom: 12 }}>{t.ok_title}</h1>
            <p style={{ color: "#888", marginBottom: 28 }}>{t.ok_desc}</p>
            <Link href="/" style={{ display: "inline-block", background: "#e53935", color: "#fff", textDecoration: "none", borderRadius: 12, padding: "13px 32px", fontWeight: 700 }}>
              {t.ok_btn}
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div style={{ minHeight: "100vh", background: "#f7f7f8" }}>
      <div style={{ maxWidth: 460, margin: "0 auto", padding: "48px 24px" }}>
        <div style={{ fontSize: 13, color: "#888", marginBottom: 24, display: "flex", gap: 6 }}>
          <Link href="/" style={{ color: "#e53935", textDecoration: "none", fontWeight: 600 }}>{t.crumb_home}</Link>
          <span>›</span><span>{t.crumb}</span>
        </div>
        <div style={{ background: "#fff", borderRadius: 20, padding: "40px", boxShadow: "0 2px 20px rgba(0,0,0,0.08)" }}>
          <h1 style={{ fontSize: 24, fontWeight: 800, color: "#1a1a2e", marginBottom: 6 }}>{t.title}</h1>
          <p style={{ color: "#aaa", fontSize: 14, marginBottom: 28 }}>{t.sub}</p>
          <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            {error && <div style={{ background: "#fff5f5", color: "#e53935", borderRadius: 10, padding: "10px 14px", fontSize: 13 }}>{error}</div>}
            <div>
              <label style={{ fontWeight: 600, fontSize: 13, color: "#333", display: "block", marginBottom: 6 }}>{t.email}</label>
              <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder={t.email_ph} required
                style={{ width: "100%", border: "2px solid #eee", borderRadius: 10, padding: "12px 14px", fontSize: 14, outline: "none", boxSizing: "border-box" }}
                onFocus={e => (e.target.style.borderColor = "#e53935")} onBlur={e => (e.target.style.borderColor = "#eee")} />
            </div>
            <div>
              <label style={{ fontWeight: 600, fontSize: 13, color: "#333", display: "block", marginBottom: 6 }}>{t.password}</label>
              <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder={t.password_ph} required
                style={{ width: "100%", border: "2px solid #eee", borderRadius: 10, padding: "12px 14px", fontSize: 14, outline: "none", boxSizing: "border-box" }}
                onFocus={e => (e.target.style.borderColor = "#e53935")} onBlur={e => (e.target.style.borderColor = "#eee")} />
            </div>
            <div style={{ textAlign: "right" }}>
              <Link href="#" style={{ color: "#e53935", fontSize: 13, textDecoration: "none" }}>{t.forgot}</Link>
            </div>
            <button type="submit" style={{ background: "linear-gradient(135deg,#ff5252,#c62828)", color: "#fff", border: "none", borderRadius: 12, padding: "14px", fontWeight: 700, fontSize: 15, cursor: "pointer" }}>
              {t.submit}
            </button>
            <p style={{ textAlign: "center", fontSize: 13, color: "#aaa", margin: 0 }}>
              {t.no_account}{" "}
              <Link href="/inscription" style={{ color: "#e53935", fontWeight: 600, textDecoration: "none" }}>{t.register_link}</Link>
            </p>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
}
