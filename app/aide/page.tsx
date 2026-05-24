"use client";
import { useState } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const faqs = [
  { q: "Comment déposer une annonce ?", r: "Cliquez sur \"Déposer une annonce\" depuis la page d'accueil ou dans la barre de navigation. Remplissez le formulaire avec le titre, la catégorie, le lieu et une description, puis publiez." },
  { q: "Est-ce que le service est gratuit ?", r: "Oui, Amena est entièrement gratuit. Il n'y a aucun frais pour déposer ou consulter des annonces." },
  { q: "Comment retrouver mon objet perdu ?", r: "Utilisez la barre de recherche sur la page d'accueil. Filtrez par catégorie, ville ou type (perdu/trouvé). Si vous ne trouvez pas, déposez une annonce pour que quelqu'un puisse vous contacter." },
  { q: "Comment contacter le déclarant d'une annonce ?", r: "Ouvrez la page de détail de l'annonce et cliquez sur \"Contacter\". Un formulaire vous permettra d'envoyer un message directement." },
  { q: "Puis-je modifier ou supprimer mon annonce ?", r: "La gestion des annonces sera disponible dans votre espace personnel après connexion. Cette fonctionnalité arrive bientôt." },
  { q: "Quelles villes sont couvertes ?", r: "Amena couvre toutes les villes de Tunisie : Tunis, Sfax, Sousse, Nabeul, Ariana, La Marsa, Carthage, et bien d'autres." },
  { q: "Comment signaler une annonce suspecte ?", r: "Utilisez le formulaire de contact disponible sur la page Contact pour signaler tout abus. Notre équipe traitera votre signalement dans les plus brefs délais." },
];

export default function AidePage() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <div style={{ fontFamily: "'Segoe UI', sans-serif", minHeight: "100vh", background: "#f7f7f8" }}>
      <Navbar />
      <div style={{ maxWidth: 760, margin: "0 auto", padding: "48px 24px" }}>
        <div style={{ fontSize: 13, color: "#888", marginBottom: 24, display: "flex", gap: 6 }}>
          <Link href="/" style={{ color: "#e53935", textDecoration: "none", fontWeight: 600 }}>Accueil</Link>
          <span>›</span><span>Aide & FAQ</span>
        </div>

        <div style={{ textAlign: "center", marginBottom: 48 }}>
          <div style={{ fontSize: 48, marginBottom: 16 }}>🙋</div>
          <h1 style={{ fontSize: 28, fontWeight: 800, color: "#1a1a2e", marginBottom: 10 }}>Centre d&apos;aide</h1>
          <p style={{ color: "#999", fontSize: 15 }}>Trouvez des réponses aux questions fréquentes</p>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 12, marginBottom: 48 }}>
          {faqs.map((faq, i) => (
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
          <h2 style={{ fontSize: 18, fontWeight: 700, color: "#1a1a2e", marginBottom: 8 }}>Vous n&apos;avez pas trouvé votre réponse ?</h2>
          <p style={{ color: "#aaa", fontSize: 14, marginBottom: 20 }}>Notre équipe est disponible pour vous aider.</p>
          <Link href="/contact" style={{ display: "inline-block", background: "#e53935", color: "#fff", textDecoration: "none", borderRadius: 10, padding: "12px 28px", fontWeight: 700, fontSize: 14 }}>
            Contacter l&apos;équipe
          </Link>
        </div>
      </div>
      <Footer />
    </div>
  );
}
