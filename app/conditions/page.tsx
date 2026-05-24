import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function ConditionsPage() {
  const sections = [
    { titre: "1. Objet", texte: "Les présentes conditions générales d'utilisation régissent l'accès et l'utilisation de la plateforme Amena, service gratuit de mise en relation pour la recherche d'objets perdus et trouvés en Tunisie." },
    { titre: "2. Accès au service", texte: "L'accès à Amena est gratuit et ouvert à toute personne résidant en Tunisie. L'inscription n'est pas obligatoire pour consulter les annonces, mais est requise pour en déposer." },
    { titre: "3. Responsabilité des annonces", texte: "Chaque utilisateur est responsable du contenu qu'il publie. Les annonces doivent être véridiques et ne pas contenir d'informations trompeuses, inappropriées ou illicites. Amena se réserve le droit de supprimer toute annonce ne respectant pas ces règles." },
    { titre: "4. Protection des données", texte: "Les informations personnelles collectées (nom, e-mail) sont utilisées uniquement dans le cadre du service Amena. Elles ne sont ni vendues ni transmises à des tiers. Vous disposez d'un droit d'accès, de modification et de suppression de vos données." },
    { titre: "5. Propriété intellectuelle", texte: "Le nom, le logo et le contenu éditorial d'Amena sont la propriété de leurs auteurs. Toute reproduction sans autorisation est interdite." },
    { titre: "6. Limitation de responsabilité", texte: "Amena est une plateforme de mise en relation. Nous ne pouvons garantir la véracité des annonces publiées ni être tenus responsables des échanges entre utilisateurs. Nous recommandons de toujours effectuer les remises en lieu public." },
    { titre: "7. Modifications", texte: "Amena se réserve le droit de modifier les présentes conditions à tout moment. Les utilisateurs seront informés des changements importants via la plateforme." },
  ];

  return (
    <div style={{ fontFamily: "'Segoe UI', sans-serif", minHeight: "100vh", background: "#f7f7f8" }}>
      <Navbar />
      <div style={{ maxWidth: 740, margin: "0 auto", padding: "48px 24px" }}>
        <div style={{ fontSize: 13, color: "#888", marginBottom: 24, display: "flex", gap: 6 }}>
          <Link href="/" style={{ color: "#e53935", textDecoration: "none", fontWeight: 600 }}>Accueil</Link>
          <span>›</span><span>Conditions d&apos;utilisation</span>
        </div>
        <div style={{ background: "#fff", borderRadius: 20, padding: "44px 40px", boxShadow: "0 2px 20px rgba(0,0,0,0.08)" }}>
          <h1 style={{ fontSize: 26, fontWeight: 800, color: "#1a1a2e", marginBottom: 8 }}>Conditions d&apos;utilisation</h1>
          <p style={{ color: "#bbb", fontSize: 13, marginBottom: 36 }}>Dernière mise à jour : mai 2026</p>
          <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
            {sections.map(s => (
              <div key={s.titre}>
                <h2 style={{ fontSize: 16, fontWeight: 700, color: "#1a1a2e", marginBottom: 8 }}>{s.titre}</h2>
                <p style={{ fontSize: 14, color: "#666", lineHeight: 1.75, margin: 0 }}>{s.texte}</p>
              </div>
            ))}
          </div>
          <div style={{ marginTop: 40, paddingTop: 28, borderTop: "1px solid #f0f0f0", textAlign: "center" }}>
            <p style={{ color: "#aaa", fontSize: 13, marginBottom: 16 }}>Des questions sur nos conditions ?</p>
            <Link href="/contact" style={{ color: "#e53935", fontWeight: 600, textDecoration: "none", fontSize: 14 }}>Contacter l&apos;équipe →</Link>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
