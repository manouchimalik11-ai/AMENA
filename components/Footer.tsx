import Link from "next/link";

export default function Footer() {
  return (
    <footer style={{ background: "#1a1a2e", color: "#aaa", padding: "36px 32px", textAlign: "center" }}>
      <div style={{ display: "flex", justifyContent: "center", gap: 28, marginBottom: 18, flexWrap: "wrap" }}>
        <Link href="/aide" style={{ color: "#aaa", textDecoration: "none", fontSize: 14 }}>FAQ</Link>
        <Link href="/contact" style={{ color: "#aaa", textDecoration: "none", fontSize: 14 }}>Contact</Link>
        <Link href="/conditions" style={{ color: "#aaa", textDecoration: "none", fontSize: 14 }}>Conditions</Link>
        <Link href="/publier" style={{ color: "#ff7070", textDecoration: "none", fontSize: 14, fontWeight: 600 }}>Déposer une annonce</Link>
      </div>
      <div style={{ display: "flex", justifyContent: "center", gap: 16, marginBottom: 18 }}>
        {["f", "t", "in"].map((s) => (
          <div key={s} style={{ width: 36, height: 36, borderRadius: "50%", border: "1px solid #444", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14, cursor: "pointer", color: "#aaa" }}>{s}</div>
        ))}
      </div>
      <div style={{ fontSize: 13 }}>© 2026 <strong style={{ color: "#fff" }}>Amena</strong> – Tous droits réservés.</div>
    </footer>
  );
}
