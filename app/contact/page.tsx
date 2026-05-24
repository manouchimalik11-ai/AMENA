"use client";
import { useState } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function ContactPage() {
  const [nom, setNom] = useState("");
  const [email, setEmail] = useState("");
  const [sujet, setSujet] = useState("");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!nom || !email || !sujet || !message) return;
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div style={{ fontFamily: "'Segoe UI', sans-serif", minHeight: "100vh", background: "#f7f7f8" }}>
        <Navbar />
        <div style={{ maxWidth: 480, margin: "80px auto", padding: "0 24px", textAlign: "center" }}>
          <div style={{ background: "#fff", borderRadius: 20, padding: "60px 40px", boxShadow: "0 2px 20px rgba(0,0,0,0.09)" }}>
            <div style={{ fontSize: 56, marginBottom: 16 }}>✉️</div>
            <h1 style={{ fontSize: 24, fontWeight: 800, color: "#1a1a2e", marginBottom: 12 }}>Message envoyé !</h1>
            <p style={{ color: "#888", marginBottom: 28 }}>Nous avons bien reçu votre message. Notre équipe vous répondra dans les 24h.</p>
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
      <div style={{ maxWidth: 600, margin: "0 auto", padding: "48px 24px" }}>
        <div style={{ fontSize: 13, color: "#888", marginBottom: 24, display: "flex", gap: 6 }}>
          <Link href="/" style={{ color: "#e53935", textDecoration: "none", fontWeight: 600 }}>Accueil</Link>
          <span>›</span><span>Contact</span>
        </div>
        <div style={{ background: "#fff", borderRadius: 20, padding: "40px", boxShadow: "0 2px 20px rgba(0,0,0,0.08)" }}>
          <h1 style={{ fontSize: 24, fontWeight: 800, color: "#1a1a2e", marginBottom: 6 }}>Nous contacter</h1>
          <p style={{ color: "#aaa", fontSize: 14, marginBottom: 28 }}>Une question, un problème ? On vous répond sous 24h.</p>
          <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 18 }}>
            <div style={{ display: "flex", gap: 14 }} className="contact-row">
              {[
                { label: "Nom complet", val: nom, set: setNom, type: "text", ph: "Ahmed Ben Ali" },
                { label: "E-mail", val: email, set: setEmail, type: "email", ph: "votre@email.com" },
              ].map(f => (
                <div key={f.label} style={{ flex: 1 }}>
                  <label style={{ fontWeight: 600, fontSize: 13, color: "#333", display: "block", marginBottom: 6 }}>{f.label}</label>
                  <input type={f.type} value={f.val} onChange={e => f.set(e.target.value)} placeholder={f.ph} required
                    style={{ width: "100%", border: "2px solid #eee", borderRadius: 10, padding: "11px 13px", fontSize: 14, outline: "none", boxSizing: "border-box" }}
                    onFocus={e => (e.target.style.borderColor = "#e53935")} onBlur={e => (e.target.style.borderColor = "#eee")} />
                </div>
              ))}
            </div>
            <div>
              <label style={{ fontWeight: 600, fontSize: 13, color: "#333", display: "block", marginBottom: 6 }}>Sujet</label>
              <select value={sujet} onChange={e => setSujet(e.target.value)} required
                style={{ width: "100%", border: "2px solid #eee", borderRadius: 10, padding: "11px 13px", fontSize: 14, outline: "none", background: "#fff", color: sujet ? "#333" : "#aaa" }}>
                <option value="">Choisir un sujet...</option>
                <option>Question générale</option>
                <option>Problème avec une annonce</option>
                <option>Signaler un abus</option>
                <option>Suggestion d&apos;amélioration</option>
                <option>Autre</option>
              </select>
            </div>
            <div>
              <label style={{ fontWeight: 600, fontSize: 13, color: "#333", display: "block", marginBottom: 6 }}>Message</label>
              <textarea value={message} onChange={e => setMessage(e.target.value)} placeholder="Décrivez votre demande..." required rows={5}
                style={{ width: "100%", border: "2px solid #eee", borderRadius: 10, padding: "11px 13px", fontSize: 14, outline: "none", resize: "vertical", boxSizing: "border-box", fontFamily: "inherit" }}
                onFocus={e => (e.target.style.borderColor = "#e53935")} onBlur={e => (e.target.style.borderColor = "#eee")} />
            </div>
            <button type="submit" style={{ background: "linear-gradient(135deg,#ff5252,#c62828)", color: "#fff", border: "none", borderRadius: 12, padding: "14px", fontWeight: 700, fontSize: 15, cursor: "pointer" }}>
              📩 Envoyer le message
            </button>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
}
