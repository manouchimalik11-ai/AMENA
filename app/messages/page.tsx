"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@/lib/UserContext";
import Footer from "@/components/Footer";

export default function MessagesPage() {
  const { user } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (user === null) router.push("/connexion");
  }, [user]);

  if (!user) return null;

  return (
    <div style={{ minHeight: "100vh", background: "#f7f7f8" }}>
      <div style={{ maxWidth: 900, margin: "0 auto", padding: "48px 24px" }}>
        <div style={{ marginBottom: 32 }}>
          <h1 style={{ fontSize: 26, fontWeight: 800, color: "#1a1a2e", margin: "0 0 6px" }}>Messages</h1>
          <p style={{ color: "#aaa", fontSize: 14, margin: 0 }}>Vos conversations avec les déclarants</p>
        </div>

        <div style={{ background: "#fff", borderRadius: 20, padding: "80px 40px", textAlign: "center", boxShadow: "0 2px 16px rgba(0,0,0,0.07)" }}>
          <div style={{ fontSize: 56, marginBottom: 16 }}>💬</div>
          <h2 style={{ fontSize: 20, fontWeight: 700, color: "#1a1a2e", margin: "0 0 10px" }}>Aucun message pour le moment</h2>
          <p style={{ color: "#aaa", fontSize: 14, margin: 0, lineHeight: 1.7 }}>
            Quand vous contacterez un déclarant,<br />vos échanges apparaîtront ici.
          </p>
        </div>
      </div>
      <Footer />
    </div>
  );
}
