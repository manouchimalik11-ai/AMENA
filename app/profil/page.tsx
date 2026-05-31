"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@/lib/UserContext";
import Footer from "@/components/Footer";

const GOUVERNORATS = [
  "Ariana", "Béja", "Ben Arous", "Bizerte", "Gabès", "Gafsa",
  "Jendouba", "Kairouan", "Kasserine", "Kébili", "Le Kef", "Mahdia",
  "Manouba", "Médenine", "Monastir", "Nabeul", "Sfax", "Sidi Bouzid",
  "Siliana", "Sousse", "Tataouine", "Tozeur", "Tunis", "Zaghouan",
];

export default function ProfilPage() {
  const { user, loading, login, logout } = useUser();
  const router = useRouter();

  const [nom, setNom]       = useState("");
  const [phone, setPhone]   = useState("");
  const [city, setCity]     = useState("");
  const [saved, setSaved]   = useState(false);

  useEffect(() => {
    if (loading) return;
    if (!user) { router.push("/connexion"); return; }
    setNom(user.name);
    setPhone(user.phone ?? "");
    setCity(user.city ?? "");
  }, [user, loading]);

  if (loading || !user) return null;

  const initial = user.name.trim()[0]?.toUpperCase() ?? "?";

  function save() {
    if (!nom.trim()) return;
    login({ ...user!, name: nom.trim(), phone: phone.trim(), city });
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  }

  return (
    <div style={{ minHeight: "100vh", background: "#f7f7f8" }}>
      <div style={{ maxWidth: 620, margin: "0 auto", padding: "48px 20px 64px" }}>

        {/* Header */}
        <div style={{ marginBottom: 28 }}>
          <h1 style={{ fontSize: 24, fontWeight: 800, color: "#1a1a2e", margin: "0 0 4px" }}>Mon profil</h1>
          <p style={{ color: "#aaa", fontSize: 14, margin: 0 }}>Gérez vos informations personnelles</p>
        </div>

        {/* Avatar card */}
        <div style={{ background: "#fff", borderRadius: 20, padding: "28px 32px", boxShadow: "0 2px 16px rgba(0,0,0,0.07)", marginBottom: 16, display: "flex", alignItems: "center", gap: 20 }}>
          <div style={{
            width: 72, height: 72, borderRadius: "50%", flexShrink: 0,
            background: "linear-gradient(135deg,#ff5252,#c62828)",
            color: "#fff", fontWeight: 800, fontSize: 30,
            display: "flex", alignItems: "center", justifyContent: "center",
            boxShadow: "0 4px 16px rgba(229,57,53,0.3)",
          }}>
            {initial}
          </div>
          <div>
            <div style={{ fontWeight: 800, fontSize: 19, color: "#1a1a2e" }}>{user.name}</div>
            <div style={{ fontSize: 13, color: "#999", marginTop: 3 }}>{user.email}</div>
            {user.city && (
              <div style={{ fontSize: 12, color: "#666", marginTop: 3 }}>📍 {user.city}</div>
            )}
            <div style={{ display: "inline-flex", alignItems: "center", gap: 6, marginTop: 8, background: "#f0fdf4", border: "1px solid #bbf7d0", borderRadius: 20, padding: "3px 10px", fontSize: 12, color: "#16a34a", fontWeight: 600 }}>
              <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#22c55e", display: "inline-block" }} />
              Compte actif
            </div>
          </div>
        </div>

        {/* Informations personnelles */}
        <div style={{ background: "#fff", borderRadius: 20, padding: "28px 32px", boxShadow: "0 2px 16px rgba(0,0,0,0.07)", marginBottom: 16 }}>
          <h2 style={{ fontSize: 15, fontWeight: 700, color: "#1a1a2e", margin: "0 0 20px" }}>Informations personnelles</h2>
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>

            <Field label="Nom complet">
              <input
                value={nom} onChange={e => setNom(e.target.value)}
                placeholder="Votre nom"
                style={inputStyle}
                onFocus={e => (e.target.style.borderColor = "#e53935")}
                onBlur={e => (e.target.style.borderColor = "#eee")}
              />
            </Field>

            <Field label="Téléphone">
              <input
                value={phone} onChange={e => setPhone(e.target.value)}
                placeholder="+216 XX XXX XXX"
                type="tel"
                style={inputStyle}
                onFocus={e => (e.target.style.borderColor = "#e53935")}
                onBlur={e => (e.target.style.borderColor = "#eee")}
              />
            </Field>

            <Field label="Gouvernorat">
              <select
                value={city} onChange={e => setCity(e.target.value)}
                style={{ ...inputStyle, color: city ? "#1a1a2e" : "#aaa", appearance: "none", backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%23999' stroke-width='2'%3E%3Cpolyline points='6 9 12 15 18 9'/%3E%3C/svg%3E\")", backgroundRepeat: "no-repeat", backgroundPosition: "right 14px center", paddingRight: 36 }}
                onFocus={e => (e.target.style.borderColor = "#e53935")}
                onBlur={e => (e.target.style.borderColor = "#eee")}
              >
                <option value="">Sélectionner un gouvernorat</option>
                {GOUVERNORATS.map(g => <option key={g} value={g}>{g}</option>)}
              </select>
            </Field>

            <Field label="Adresse e-mail">
              <input
                value={user.email} readOnly
                style={{ ...inputStyle, background: "#fafafa", color: "#bbb", cursor: "default" }}
              />
            </Field>

            <button
              onClick={save}
              style={{
                background: saved ? "linear-gradient(135deg,#22c55e,#16a34a)" : "linear-gradient(135deg,#ff5252,#c62828)",
                color: "#fff", border: "none", borderRadius: 12,
                padding: "13px", fontWeight: 700, fontSize: 14,
                cursor: "pointer", marginTop: 4, transition: "background 0.3s",
              }}
            >
              {saved ? "✓ Modifications enregistrées" : "Enregistrer les modifications"}
            </button>
          </div>
        </div>

        {/* Déconnexion */}
        <div style={{ background: "#fff", borderRadius: 20, padding: "24px 32px", boxShadow: "0 2px 16px rgba(0,0,0,0.07)", border: "1px solid #fde8e8" }}>
          <h2 style={{ fontSize: 15, fontWeight: 700, color: "#e53935", margin: "0 0 8px" }}>Déconnexion</h2>
          <p style={{ color: "#aaa", fontSize: 13, margin: "0 0 16px" }}>Vous serez déconnecté de votre session.</p>
          <button
            onClick={() => { logout(); router.push("/"); }}
            style={{ background: "#fff5f5", color: "#e53935", border: "1.5px solid #fca5a5", borderRadius: 10, padding: "10px 20px", fontWeight: 700, fontSize: 14, cursor: "pointer" }}
          >
            Se déconnecter
          </button>
        </div>

      </div>
      <Footer />
    </div>
  );
}

const inputStyle: React.CSSProperties = {
  width: "100%", border: "2px solid #eee", borderRadius: 10,
  padding: "11px 14px", fontSize: 14, outline: "none",
  boxSizing: "border-box", transition: "border-color 0.15s",
  background: "#fff", color: "#1a1a2e",
};

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label style={{ fontWeight: 600, fontSize: 13, color: "#555", display: "block", marginBottom: 6 }}>
        {label}
      </label>
      {children}
    </div>
  );
}
