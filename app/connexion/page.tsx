"use client";
import { useState } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function ConnexionPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email || !password) { setError("Veuillez remplir tous les champs."); return; }
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div style={{ fontFamily: "'Segoe UI', sans-serif", minHeight: "100vh", background: "#f7f7f8" }}>
        <Navbar />
        <div style={{ maxWidth: 480, margin: "80px auto", padding: "0 24px", textAlign: "center" }}>
          <div style={{ background: "#fff", borderRadius: 20, padding: "60px 40px", boxShadow: "0 2px 20px rgba(0,0,0,0.09)" }}>
            <div style={{ fontSize: 56, marginBottom: 16 }}>👋</div>
            <h1 style={{ fontSize: 24, fontWeight: 800, color: "#1a1a2e", marginBottom: 12 }}>Bienvenue !</h1>
            <p style={{ color: "#888", marginBottom: 28 }}>Vous êtes connecté avec succès.</p>
            <Link href="/" style={{ display: "inline-block", background: "#e53935", color: "#fff", textDecoration: "none", borderRadius: 12, padding: "13px 32px", fontWeight: 700 }}>
              Retour à l&apos;accueil
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div style={{ fontFamily: "'Segoe UI', sans-serif", minHeight: "100vh", background: "#f7f7f8" }}>
      <Navbar />
      <div style={{ maxWidth: 460, margin: "0 auto", padding: "48px 24px" }}>
        <div style={{ fontSize: 13, color: "#888", marginBottom: 24, display: "flex", gap: 6 }}>
          <Link href="/" style={{ color: "#e53935", textDecoration: "none", fontWeight: 600 }}>Accueil</Link>
          <span>›</span><span>Se connecter</span>
        </div>
        <div style={{ background: "#fff", borderRadius: 20, padding: "40px", boxShadow: "0 2px 20px rgba(0,0,0,0.08)" }}>
          <h1 style={{ fontSize: 24, fontWeight: 800, color: "#1a1a2e", marginBottom: 6 }}>Se connecter</h1>
          <p style={{ color: "#aaa", fontSize: 14, marginBottom: 28 }}>Accédez à votre espace Amena</p>
          <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            {error && <div style={{ background: "#fff5f5", color: "#e53935", borderRadius: 10, padding: "10px 14px", fontSize: 13 }}>{error}</div>}
            <div>
              <label style={{ fontWeight: 600, fontSize: 13, color: "#333", display: "block", marginBottom: 6 }}>Adresse e-mail</label>
              <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="votre@email.com" required
                style={{ width: "100%", border: "2px solid #eee", borderRadius: 10, padding: "12px 14px", fontSize: 14, outline: "none", boxSizing: "border-box" }}
                onFocus={e => (e.target.style.borderColor = "#e53935")} onBlur={e => (e.target.style.borderColor = "#eee")} />
            </div>
            <div>
              <label style={{ fontWeight: 600, fontSize: 13, color: "#333", display: "block", marginBottom: 6 }}>Mot de passe</label>
              <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="••••••••" required
                style={{ width: "100%", border: "2px solid #eee", borderRadius: 10, padding: "12px 14px", fontSize: 14, outline: "none", boxSizing: "border-box" }}
                onFocus={e => (e.target.style.borderColor = "#e53935")} onBlur={e => (e.target.style.borderColor = "#eee")} />
            </div>
            <div style={{ textAlign: "right" }}>
              <Link href="#" style={{ color: "#e53935", fontSize: 13, textDecoration: "none" }}>Mot de passe oublié ?</Link>
            </div>
            <button type="submit" style={{ background: "linear-gradient(135deg,#ff5252,#c62828)", color: "#fff", border: "none", borderRadius: 12, padding: "14px", fontWeight: 700, fontSize: 15, cursor: "pointer" }}>
              Se connecter
            </button>
            <p style={{ textAlign: "center", fontSize: 13, color: "#aaa", margin: 0 }}>
              Pas encore de compte ?{" "}
              <Link href="/inscription" style={{ color: "#e53935", fontWeight: 600, textDecoration: "none" }}>Créer un compte</Link>
            </p>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
}
