"use client";
import { useState } from "react";
import { Annonce } from "@/lib/data";

export default function AnnonceActions({ annonce }: { annonce: Annonce }) {
  const [favori, setFavori] = useState(false);
  const [copied, setCopied] = useState(false);
  const [contactOpen, setContactOpen] = useState(false);
  const [msg, setMsg] = useState("");
  const [sent, setSent] = useState(false);

  const typeColor = annonce.type === "perdu" ? "#e53935" : "#2e7d32";

  function handleShare() {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  function handleSendMsg(e: React.FormEvent) {
    e.preventDefault();
    if (!msg.trim()) return;
    setSent(true);
  }

  return (
    <>
      {/* Boutons Favori + Partager */}
      <div style={{ display: "flex", gap: 10 }}>
        <button
          onClick={() => setFavori(!favori)}
          title={favori ? "Retirer des favoris" : "Ajouter aux favoris"}
          style={{ padding: "10px 16px", border: "2px solid #ebebeb", borderRadius: 10, background: favori ? "#fff5f5" : "#fff", cursor: "pointer", fontSize: 20, color: favori ? "#e53935" : "#bbb", transition: "all 0.2s" }}
        >
          {favori ? "♥" : "♡"}
        </button>
        <button
          onClick={handleShare}
          style={{ padding: "10px 16px", border: "2px solid #ebebeb", borderRadius: 10, background: copied ? "#f0fff4" : "#fff", cursor: "pointer", fontSize: 14, color: copied ? "#2e7d32" : "#555", fontWeight: 600, transition: "all 0.2s" }}
        >
          {copied ? "✓ Lien copié !" : "🔗 Partager"}
        </button>
      </div>

      {/* Bouton Contacter */}
      <div style={{ background: annonce.type === "perdu" ? "#fff5f5" : "#f1f8f1", borderRadius: 14, padding: "24px", border: `1px solid ${annonce.type === "perdu" ? "#ffd0d0" : "#c8e6c9"}` }}>
        <div style={{ fontWeight: 700, fontSize: 16, marginBottom: 6, color: typeColor }}>
          {annonce.type === "perdu" ? "Vous avez trouvé cet objet ?" : "C'est votre objet ?"}
        </div>
        <p style={{ fontSize: 14, color: "#666", marginBottom: 16, lineHeight: 1.6 }}>
          {annonce.type === "perdu"
            ? "Aidez le propriétaire à retrouver son bien. Contactez-le directement."
            : "Si cet objet vous appartient, contactez le déclarant pour le récupérer."}
        </p>

        {!contactOpen && !sent && (
          <button
            onClick={() => setContactOpen(true)}
            style={{ background: typeColor, color: "#fff", border: "none", borderRadius: 10, padding: "12px 28px", fontSize: 15, fontWeight: 700, cursor: "pointer", boxShadow: `0 4px 14px ${typeColor}55` }}
          >
            📩 Contacter
          </button>
        )}

        {contactOpen && !sent && (
          <form onSubmit={handleSendMsg} style={{ display: "flex", flexDirection: "column", gap: 12, marginTop: 4 }}>
            <textarea
              value={msg}
              onChange={e => setMsg(e.target.value)}
              placeholder="Écrivez votre message au déclarant..."
              required
              rows={3}
              style={{ border: "2px solid #ddd", borderRadius: 10, padding: "12px", fontSize: 14, fontFamily: "inherit", resize: "vertical", outline: "none" }}
              onFocus={e => (e.target.style.borderColor = typeColor)}
              onBlur={e => (e.target.style.borderColor = "#ddd")}
            />
            <div style={{ display: "flex", gap: 10 }}>
              <button type="submit" style={{ background: typeColor, color: "#fff", border: "none", borderRadius: 10, padding: "11px 24px", fontSize: 14, fontWeight: 700, cursor: "pointer" }}>
                Envoyer le message
              </button>
              <button type="button" onClick={() => setContactOpen(false)} style={{ background: "none", border: "2px solid #ddd", borderRadius: 10, padding: "11px 18px", fontSize: 14, color: "#888", cursor: "pointer" }}>
                Annuler
              </button>
            </div>
          </form>
        )}

        {sent && (
          <div style={{ background: "#f0fff4", border: "1px solid #c8e6c9", borderRadius: 10, padding: "14px 18px", color: "#2e7d32", fontWeight: 600, fontSize: 14 }}>
            ✓ Message envoyé ! Le déclarant vous répondra bientôt.
          </div>
        )}
      </div>
    </>
  );
}
