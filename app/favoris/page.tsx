"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useUser } from "@/lib/UserContext";
import Footer from "@/components/Footer";

export default function FavorisPage() {
  const { user } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (user === null) router.push("/connexion");
  }, [user]);

  if (!user) return null;

  return (
    <div style={{ minHeight: "100vh", background: "#f7f7f8" }}>
      <div style={{ maxWidth: 800, margin: "0 auto", padding: "48px 24px" }}>
        <div style={{ marginBottom: 32 }}>
          <h1 style={{ fontSize: 26, fontWeight: 800, color: "#1a1a2e", margin: "0 0 6px" }}>Mes favoris</h1>
          <p style={{ color: "#aaa", fontSize: 14, margin: 0 }}>Les annonces que vous avez sauvegardées</p>
        </div>

        <div style={{ background: "#fff", borderRadius: 20, padding: "80px 40px", textAlign: "center", boxShadow: "0 2px 16px rgba(0,0,0,0.07)" }}>
          <div style={{ fontSize: 56, marginBottom: 16 }}>🤍</div>
          <h2 style={{ fontSize: 20, fontWeight: 700, color: "#1a1a2e", margin: "0 0 10px" }}>Aucun favori pour le moment</h2>
          <p style={{ color: "#aaa", fontSize: 14, margin: "0 0 28px" }}>Parcourez les annonces et ajoutez-en à vos favoris.</p>
          <Link href="/" style={{ display: "inline-block", background: "linear-gradient(135deg,#ff5252,#c62828)", color: "#fff", textDecoration: "none", borderRadius: 12, padding: "13px 28px", fontWeight: 700, fontSize: 14 }}>
            Parcourir les annonces
          </Link>
        </div>
      </div>
      <Footer />
    </div>
  );
}
