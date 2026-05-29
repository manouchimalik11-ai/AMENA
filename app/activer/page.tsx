"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useUser } from "@/lib/UserContext";
import Footer from "@/components/Footer";

export default function ActiverPage() {
  const [status, setStatus] = useState<"loading" | "success" | "error">("loading");
  const [errorMsg, setErrorMsg] = useState("");
  const [userName, setUserName] = useState("");
  const router = useRouter();
  const { login } = useUser();

  useEffect(() => {
    const token = new URLSearchParams(window.location.search).get("token");
    if (!token) { setStatus("error"); setErrorMsg("Lien invalide."); return; }

    fetch(`/api/verify?token=${token}`)
      .then(r => r.json())
      .then(data => {
        if (data.error) { setStatus("error"); setErrorMsg(data.error); return; }
        login({ name: data.name, email: data.email });
        setUserName(data.name);
        setStatus("success");
        setTimeout(() => router.push("/"), 3000);
      })
      .catch(() => { setStatus("error"); setErrorMsg("Une erreur est survenue."); });
  }, []);

  return (
    <div style={{ minHeight: "100vh", background: "#f7f7f8", display: "flex", flexDirection: "column" }}>
      <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", padding: "40px 24px" }}>
        <div style={{ maxWidth: 480, width: "100%", background: "#fff", borderRadius: 24, padding: "60px 40px", boxShadow: "0 4px 32px rgba(0,0,0,0.10)", textAlign: "center" }}>

          {status === "loading" && (
            <>
              <div style={{ width: 56, height: 56, border: "4px solid #f0f0f0", borderTop: "4px solid #e53935", borderRadius: "50%", margin: "0 auto 24px", animation: "spin 0.8s linear infinite" }} />
              <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
              <h2 style={{ fontSize: 20, fontWeight: 700, color: "#1a1a2e", margin: "0 0 8px" }}>Vérification en cours…</h2>
              <p style={{ color: "#aaa", margin: 0, fontSize: 14 }}>Veuillez patienter</p>
            </>
          )}

          {status === "success" && (
            <>
              <div style={{ fontSize: 64, marginBottom: 20 }}>🎉</div>
              <h1 style={{ fontSize: 26, fontWeight: 800, color: "#1a1a2e", margin: "0 0 12px" }}>
                Compte activé !
              </h1>
              <p style={{ color: "#666", fontSize: 15, lineHeight: 1.7, margin: "0 0 28px" }}>
                Bienvenue sur Amena, <strong>{userName}</strong> !<br />
                Vous allez être redirigé automatiquement…
              </p>
              <Link href="/" style={{ display: "inline-block", background: "linear-gradient(135deg,#ff5252,#c62828)", color: "#fff", textDecoration: "none", borderRadius: 12, padding: "13px 32px", fontWeight: 700, fontSize: 15 }}>
                Aller à l&apos;accueil →
              </Link>
            </>
          )}

          {status === "error" && (
            <>
              <div style={{ fontSize: 56, marginBottom: 20 }}>⚠️</div>
              <h1 style={{ fontSize: 22, fontWeight: 800, color: "#1a1a2e", margin: "0 0 12px" }}>Lien invalide</h1>
              <p style={{ color: "#888", fontSize: 14, lineHeight: 1.7, margin: "0 0 28px" }}>{errorMsg}</p>
              <Link href="/inscription" style={{ display: "inline-block", background: "#e53935", color: "#fff", textDecoration: "none", borderRadius: 12, padding: "12px 28px", fontWeight: 700 }}>
                Créer un nouveau compte
              </Link>
            </>
          )}

        </div>
      </div>
      <Footer />
    </div>
  );
}
