"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@/lib/UserContext";
import Footer from "@/components/Footer";

export default function ProfilPage() {
  const { user, logout } = useUser();
  const router = useRouter();
  const [nom, setNom] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    if (user === null) { router.push("/connexion"); return; }
    setNom(user.name);
    setEmail(user.email);
  }, [user]);

  if (!user) return null;

  const initial = user.name.trim()[0]?.toUpperCase() ?? "?";

  return (
    <div style={{ minHeight: "100vh", background: "#f7f7f8" }}>
      <div style={{ maxWidth: 640, margin: "0 auto", padding: "48px 24px" }}>
        <div style={{ marginBottom: 32 }}>
          <h1 style={{ fontSize: 26, fontWeight: 800, color: "#1a1a2e", margin: "0 0 6px" }}>Mon profil</h1>
          <p style={{ color: "#aaa", fontSize: 14, margin: 0 }}>Gérez vos informations personnelles</p>
        </div>

        {/* Avatar card */}
        <div style={{ background: "#fff", borderRadius: 20, padding: "32px", boxShadow: "0 2px 16px rgba(0,0,0,0.07)", marginBottom: 20, display: "flex", alignItems: "center", gap: 20 }}>
          <div style={{ width: 72, height: 72, borderRadius: "50%", background: "linear-gradient(135deg,#ff5252,#c62828)", color: "#fff", fontWeight: 800, fontSize: 30, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, boxShadow: "0 4px 16px rgba(229,57,53,0.35)" }}>
            {initial}
          </div>
          <div>
            <div style={{ fontWeight: 800, fontSize: 20, color: "#1a1a2e" }}>{user.name}</div>
            <div style={{ fontSize: 14, color: "#aaa", marginTop: 4 }}>{user.email}</div>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 6, marginTop: 8, background: "#f0fdf4", border: "1px solid #bbf7d0", borderRadius: 20, padding: "4px 12px", fontSize: 12, color: "#16a34a", fontWeight: 600 }}>
              <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#22c55e", display: "inline-block" }} />
              Compte actif
            </div>
          </div>
        </div>

        {/* Info form */}
        <div style={{ background: "#fff", borderRadius: 20, padding: "32px", boxShadow: "0 2px 16px rgba(0,0,0,0.07)", marginBottom: 20 }}>
          <h2 style={{ fontSize: 16, fontWeight: 700, color: "#1a1a2e", margin: "0 0 20px" }}>Informations personnelles</h2>
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <div>
              <label style={{ fontWeight: 600, fontSize: 13, color: "#333", display: "block", marginBottom: 6 }}>Nom complet</label>
              <input value={nom} onChange={e => setNom(e.target.value)}
                style={{ width: "100%", border: "2px solid #eee", borderRadius: 10, padding: "12px 14px", fontSize: 14, outline: "none", boxSizing: "border-box" }}
                onFocus={e => (e.target.style.borderColor = "#e53935")} onBlur={e => (e.target.style.borderColor = "#eee")} />
            </div>
            <div>
              <label style={{ fontWeight: 600, fontSize: 13, color: "#333", display: "block", marginBottom: 6 }}>Adresse e-mail</label>
              <input value={email} readOnly
                style={{ width: "100%", border: "2px solid #eee", borderRadius: 10, padding: "12px 14px", fontSize: 14, outline: "none", boxSizing: "border-box", background: "#fafafa", color: "#aaa" }} />
            </div>
            <button style={{ background: "linear-gradient(135deg,#ff5252,#c62828)", color: "#fff", border: "none", borderRadius: 12, padding: "13px", fontWeight: 700, fontSize: 14, cursor: "pointer", marginTop: 4 }}>
              Enregistrer les modifications
            </button>
          </div>
        </div>

        {/* Danger zone */}
        <div style={{ background: "#fff", borderRadius: 20, padding: "24px 32px", boxShadow: "0 2px 16px rgba(0,0,0,0.07)", border: "1px solid #fde8e8" }}>
          <h2 style={{ fontSize: 15, fontWeight: 700, color: "#e53935", margin: "0 0 12px" }}>Déconnexion</h2>
          <p style={{ color: "#aaa", fontSize: 13, margin: "0 0 16px" }}>Vous serez déconnecté de toutes vos sessions.</p>
          <button
            onClick={() => { logout(); router.push("/"); }}
            style={{ background: "#fff5f5", color: "#e53935", border: "1.5px solid #fca5a5", borderRadius: 10, padding: "10px 20px", fontWeight: 700, fontSize: 14, cursor: "pointer" }}>
            Se déconnecter
          </button>
        </div>
      </div>
      <Footer />
    </div>
  );
}
