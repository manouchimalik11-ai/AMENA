"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useUser } from "@/lib/UserContext";
import Footer from "@/components/Footer";

export default function MesAnnoncesPage() {
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
          <h1 style={{ fontSize: 26, fontWeight: 800, color: "#1a1a2e", margin: "0 0 6px" }}>Mes annonces</h1>
          <p style={{ color: "#aaa", fontSize: 14, margin: 0 }}>Gérez vos annonces publiées sur Amena</p>
        </div>

        <div style={{ background: "#fff", borderRadius: 20, padding: "80px 40px", textAlign: "center", boxShadow: "0 2px 16px rgba(0,0,0,0.07)" }}>
          <div style={{ fontSize: 56, marginBottom: 16 }}>📋</div>
          <h2 style={{ fontSize: 20, fontWeight: 700, color: "#1a1a2e", margin: "0 0 10px" }}>Aucune annonce pour le moment</h2>
          <p style={{ color: "#aaa", fontSize: 14, margin: "0 0 28px" }}>Vous n&apos;avez pas encore publié d&apos;annonce.</p>
          <Link href="/publier" style={{ display: "inline-block", background: "linear-gradient(135deg,#ff5252,#c62828)", color: "#fff", textDecoration: "none", borderRadius: 12, padding: "13px 28px", fontWeight: 700, fontSize: 14 }}>
            + Déposer une annonce
          </Link>
        </div>
      </div>
      <Footer />
    </div>
  );
}
