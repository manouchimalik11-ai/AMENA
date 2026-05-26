"use client";
import { useState } from "react";
import { Annonce } from "@/lib/data";
import { useLang } from "@/lib/LangContext";
import { tr } from "@/lib/translations";

export default function AnnonceActions({ annonce }: { annonce: Annonce }) {
  const [favori, setFavori] = useState(false);
  const [copied, setCopied] = useState(false);
  const [contactOpen, setContactOpen] = useState(false);
  const [msg, setMsg] = useState("");
  const [sent, setSent] = useState(false);
  const { lang } = useLang();
  const t = tr[lang].actions;

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
      <div style={{ display: "flex", gap: 10 }}>
        <button
          onClick={() => setFavori(!favori)}
          title={favori ? t.fav_remove : t.fav_add}
          style={{ padding: "10px 16px", border: "2px solid #ebebeb", borderRadius: 10, background: favori ? "#fff5f5" : "#fff", cursor: "pointer", fontSize: 20, color: favori ? "#e53935" : "#bbb", transition: "all 0.2s" }}
        >
          {favori ? "♥" : "♡"}
        </button>
        <button
          onClick={handleShare}
          style={{ padding: "10px 16px", border: "2px solid #ebebeb", borderRadius: 10, background: copied ? "#f0fff4" : "#fff", cursor: "pointer", fontSize: 14, color: copied ? "#2e7d32" : "#555", fontWeight: 600, transition: "all 0.2s" }}
        >
          {copied ? t.copied : t.share}
        </button>
      </div>

      <div style={{ background: annonce.type === "perdu" ? "#fff5f5" : "#f1f8f1", borderRadius: 14, padding: "24px", border: `1px solid ${annonce.type === "perdu" ? "#ffd0d0" : "#c8e6c9"}` }}>
        <div style={{ fontWeight: 700, fontSize: 16, marginBottom: 6, color: typeColor }}>
          {annonce.type === "perdu" ? t.lost_q : t.found_q}
        </div>
        <p style={{ fontSize: 14, color: "#666", marginBottom: 16, lineHeight: 1.6 }}>
          {annonce.type === "perdu" ? t.lost_hint : t.found_hint}
        </p>

        {!contactOpen && !sent && (
          <button
            onClick={() => setContactOpen(true)}
            style={{ background: typeColor, color: "#fff", border: "none", borderRadius: 10, padding: "12px 28px", fontSize: 15, fontWeight: 700, cursor: "pointer", boxShadow: `0 4px 14px ${typeColor}55` }}
          >
            {t.contact_btn}
          </button>
        )}

        {contactOpen && !sent && (
          <form onSubmit={handleSendMsg} style={{ display: "flex", flexDirection: "column", gap: 12, marginTop: 4 }}>
            <textarea
              value={msg}
              onChange={e => setMsg(e.target.value)}
              placeholder={t.msg_ph}
              required
              rows={3}
              style={{ border: "2px solid #ddd", borderRadius: 10, padding: "12px", fontSize: 14, fontFamily: "inherit", resize: "vertical", outline: "none" }}
              onFocus={e => (e.target.style.borderColor = typeColor)}
              onBlur={e => (e.target.style.borderColor = "#ddd")}
            />
            <div style={{ display: "flex", gap: 10 }}>
              <button type="submit" style={{ background: typeColor, color: "#fff", border: "none", borderRadius: 10, padding: "11px 24px", fontSize: 14, fontWeight: 700, cursor: "pointer" }}>
                {t.send}
              </button>
              <button type="button" onClick={() => setContactOpen(false)} style={{ background: "none", border: "2px solid #ddd", borderRadius: 10, padding: "11px 18px", fontSize: 14, color: "#888", cursor: "pointer" }}>
                {t.cancel}
              </button>
            </div>
          </form>
        )}

        {sent && (
          <div style={{ background: "#f0fff4", border: "1px solid #c8e6c9", borderRadius: 10, padding: "14px 18px", color: "#2e7d32", fontWeight: 600, fontSize: 14 }}>
            {t.sent}
          </div>
        )}
      </div>
    </>
  );
}
