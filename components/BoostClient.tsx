"use client";
import { useState } from "react";
import Link from "next/link";
import { useLang } from "@/lib/LangContext";
import { tr } from "@/lib/translations";

const PLANS = [
  { key: "starter", daysKey: "days_7" as const, priceKey: "price_7" as const, features: [true, true, false, false, false] },
  { key: "pro",     daysKey: "days_14" as const, priceKey: "price_14" as const, features: [true, true, true, true, false], recommended: true },
  { key: "max",     daysKey: "days_30" as const, priceKey: "price_30" as const, features: [true, true, true, true, true] },
];

const PAYMENT_METHODS = ["pay_card", "pay_konnect", "pay_paymee", "pay_d17"] as const;

const METHOD_ICONS: Record<string, string> = {
  pay_card: "💳",
  pay_konnect: "🔵",
  pay_paymee: "🟢",
  pay_d17: "🟡",
};

export default function BoostClient() {
  const { lang } = useLang();
  const t = tr[lang].boost;
  const tCommon = tr[lang];

  const [selectedPlan, setSelectedPlan] = useState("pro");
  const [annonceId, setAnnonceId] = useState("");
  const [payMethod, setPayMethod] = useState("pay_card");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const plan = PLANS.find(p => p.key === selectedPlan)!;
  const price = t[plan.priceKey];
  const features = [t.f_top, t.f_badge, t.f_search, t.f_notif, t.f_stats];

  function handlePay() {
    if (!annonceId.trim()) return;
    setLoading(true);
    setTimeout(() => { setLoading(false); setSuccess(true); }, 1800);
  }

  if (success) {
    return (
      <div style={{ minHeight: "60vh", display: "flex", alignItems: "center", justifyContent: "center", padding: 32 }}>
        <div style={{ background: "#fff", borderRadius: 24, padding: "52px 48px", textAlign: "center", maxWidth: 480, boxShadow: "0 8px 40px rgba(0,0,0,0.10)", border: "1px solid #ebebeb" }}>
          <div style={{ fontSize: 56, marginBottom: 20 }}>🎉</div>
          <div style={{ fontSize: 24, fontWeight: 900, color: "#1a1a2e", marginBottom: 12 }}>{t.success_title}</div>
          <div style={{ fontSize: 15, color: "#777", lineHeight: 1.7, marginBottom: 32 }}>{t.success_desc}</div>
          <Link href="/" style={{ display: "inline-block", background: "linear-gradient(135deg,#ff5252,#c62828)", color: "#fff", textDecoration: "none", fontWeight: 700, fontSize: 15, padding: "14px 36px", borderRadius: 12, boxShadow: "0 4px 16px rgba(229,57,53,0.3)" }}>
            {t.success_btn}
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div>
      {/* Hero */}
      <div style={{ background: "linear-gradient(135deg, #1a1a2e 0%, #2d1f3d 60%, #3d1a1a 100%)", padding: "52px 24px 56px", textAlign: "center" }}>
        <div style={{ display: "inline-block", background: "rgba(245,158,11,0.18)", color: "#fbbf24", fontSize: 12, fontWeight: 800, padding: "5px 16px", borderRadius: 100, letterSpacing: "0.8px", marginBottom: 18, textTransform: "uppercase", border: "1px solid rgba(245,158,11,0.3)" }}>
          ⚡ {t.hero_tag}
        </div>
        <h1 style={{ fontSize: 36, fontWeight: 900, color: "#fff", margin: "0 0 14px", letterSpacing: "-0.8px", lineHeight: 1.15 }}>
          {t.hero_title}
        </h1>
        <p style={{ fontSize: 16, color: "rgba(255,255,255,0.55)", margin: 0, maxWidth: 540, marginLeft: "auto", marginRight: "auto", lineHeight: 1.7 }}>
          {t.hero_sub}
        </p>

        {/* Bénéfices */}
        <div style={{ display: "flex", justifyContent: "center", gap: 20, marginTop: 40, flexWrap: "wrap" }}>
          {[
            { icon: "🚀", title: t.b1_title, desc: t.b1_desc },
            { icon: "⚡", title: t.b2_title, desc: t.b2_desc },
            { icon: "🔍", title: t.b3_title, desc: t.b3_desc },
          ].map((b, i) => (
            <div key={i} style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 16, padding: "22px 24px", maxWidth: 220, textAlign: "left" }}>
              <div style={{ fontSize: 28, marginBottom: 10 }}>{b.icon}</div>
              <div style={{ color: "#fff", fontWeight: 700, fontSize: 14, marginBottom: 6 }}>{b.title}</div>
              <div style={{ color: "rgba(255,255,255,0.45)", fontSize: 13, lineHeight: 1.6 }}>{b.desc}</div>
            </div>
          ))}
        </div>
      </div>

      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "52px 24px" }}>

        {/* Tarifs */}
        <h2 style={{ textAlign: "center", fontSize: 24, fontWeight: 800, color: "#1a1a2e", marginBottom: 32 }}>{t.plans_title}</h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 20, marginBottom: 56 }}>
          {PLANS.map(p => {
            const active = selectedPlan === p.key;
            const planLabel = t[`plan_${p.key}` as keyof typeof t] as string;
            const days = t[p.daysKey];
            const px = t[p.priceKey];
            return (
              <div
                key={p.key}
                onClick={() => setSelectedPlan(p.key)}
                style={{
                  background: active ? "linear-gradient(135deg,#fff8e1,#fff)" : "#fff",
                  border: active ? "2px solid #f59e0b" : p.recommended ? "2px solid #e0e0e0" : "1px solid #ebebeb",
                  borderRadius: 20, padding: "28px 24px", cursor: "pointer", position: "relative",
                  boxShadow: active ? "0 8px 32px rgba(245,158,11,0.18)" : "0 1px 8px rgba(0,0,0,0.06)",
                  transition: "all 0.2s",
                }}
              >
                {p.recommended && (
                  <div style={{ position: "absolute", top: -12, left: "50%", transform: "translateX(-50%)", background: "linear-gradient(135deg,#f59e0b,#d97706)", color: "#fff", fontSize: 11, fontWeight: 800, padding: "4px 14px", borderRadius: 100, whiteSpace: "nowrap" }}>
                    ★ {t.recommended}
                  </div>
                )}
                <div style={{ fontWeight: 800, fontSize: 16, color: "#1a1a2e", marginBottom: 6 }}>{planLabel}</div>
                <div style={{ fontSize: 13, color: "#aaa", marginBottom: 20 }}>{days}</div>
                <div style={{ display: "flex", alignItems: "baseline", gap: 4, marginBottom: 24 }}>
                  <span style={{ fontSize: 38, fontWeight: 900, color: active ? "#d97706" : "#1a1a2e", lineHeight: 1 }}>{px}</span>
                  <span style={{ fontSize: 14, color: "#aaa", fontWeight: 600 }}>{t.currency}</span>
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                  {features.map((f, i) => (
                    <div key={i} style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 13, color: p.features[i] ? "#333" : "#ccc" }}>
                      <span style={{ color: p.features[i] ? "#22c55e" : "#ddd", fontWeight: 700, flexShrink: 0 }}>{p.features[i] ? "✓" : "✗"}</span>
                      {f}
                    </div>
                  ))}
                </div>
                {active && (
                  <div style={{ marginTop: 18, textAlign: "center", fontSize: 12, color: "#d97706", fontWeight: 700 }}>✓ Sélectionné</div>
                )}
              </div>
            );
          })}
        </div>

        {/* Formulaire + paiement */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 32, alignItems: "start" }}>

          {/* Commande */}
          <div style={{ background: "#fff", borderRadius: 20, padding: "32px 28px", boxShadow: "0 2px 16px rgba(0,0,0,0.07)", border: "1px solid #ebebeb" }}>
            <h3 style={{ fontSize: 18, fontWeight: 800, color: "#1a1a2e", marginBottom: 4 }}>{t.order_title}</h3>
            <p style={{ fontSize: 13, color: "#e53935", fontWeight: 600, marginBottom: 24, display: "flex", alignItems: "center", gap: 6 }}>
              <span>⚠</span> {t.order_sub}
            </p>

            {/* ID Annonce */}
            <div style={{ marginBottom: 20 }}>
              <label style={{ fontSize: 13, fontWeight: 700, color: "#555", display: "block", marginBottom: 8 }}>{t.annonce_label}</label>
              <input
                type="text"
                value={annonceId}
                onChange={e => setAnnonceId(e.target.value)}
                placeholder={t.annonce_ph}
                style={{ width: "100%", boxSizing: "border-box", border: annonceId ? "1.5px solid #f59e0b" : "1.5px solid #e8e8e8", borderRadius: 10, padding: "11px 14px", fontSize: 14, outline: "none", background: "#fafafa", color: "#1a1a2e", fontWeight: annonceId ? 600 : 400 }}
              />
            </div>

            {/* Moyen de paiement */}
            <div style={{ marginBottom: 24 }}>
              <label style={{ fontSize: 13, fontWeight: 700, color: "#555", display: "block", marginBottom: 10 }}>{t.payment_label}</label>
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                {PAYMENT_METHODS.map(m => (
                  <div
                    key={m}
                    onClick={() => setPayMethod(m)}
                    style={{ display: "flex", alignItems: "center", gap: 12, padding: "12px 14px", border: payMethod === m ? "1.5px solid #f59e0b" : "1.5px solid #e8e8e8", borderRadius: 10, cursor: "pointer", background: payMethod === m ? "#fff8e1" : "#fafafa", transition: "all 0.15s" }}
                  >
                    <div style={{ width: 16, height: 16, borderRadius: "50%", border: `2px solid ${payMethod === m ? "#f59e0b" : "#d0d0d0"}`, background: payMethod === m ? "#f59e0b" : "transparent", flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
                      {payMethod === m && <div style={{ width: 5, height: 5, borderRadius: "50%", background: "#fff" }} />}
                    </div>
                    <span style={{ fontSize: 20 }}>{METHOD_ICONS[m]}</span>
                    <span style={{ fontSize: 14, fontWeight: payMethod === m ? 700 : 500, color: payMethod === m ? "#92400e" : "#444" }}>{t[m as keyof typeof t] as string}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Total */}
            <div style={{ background: "linear-gradient(135deg,#fff8e1,#fffbf0)", border: "1px solid #f59e0b33", borderRadius: 12, padding: "14px 16px", display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
              <span style={{ fontSize: 14, fontWeight: 600, color: "#555" }}>{t.total_label}</span>
              <span style={{ fontSize: 24, fontWeight: 900, color: "#d97706" }}>{price} <span style={{ fontSize: 14 }}>{t.currency}</span></span>
            </div>

            <button
              onClick={handlePay}
              disabled={loading || !annonceId.trim()}
              style={{ width: "100%", background: !annonceId.trim() ? "#e0e0e0" : loading ? "#f59e0b" : "linear-gradient(135deg,#f59e0b,#d97706)", color: "#fff", border: "none", borderRadius: 12, padding: "14px", fontWeight: 800, fontSize: 15, cursor: !annonceId.trim() ? "not-allowed" : "pointer", boxShadow: annonceId.trim() ? "0 4px 16px rgba(245,158,11,0.35)" : "none", transition: "all 0.2s", display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}
            >
              {loading ? (
                <><span style={{ display: "inline-block", width: 16, height: 16, border: "2px solid rgba(255,255,255,0.4)", borderTopColor: "#fff", borderRadius: "50%", animation: "spin 0.8s linear infinite" }} /> {t.processing}</>
              ) : (
                <>⚡ {t.pay_btn} — {price} {t.currency}</>
              )}
            </button>
          </div>

          {/* FAQ */}
          <div>
            <h3 style={{ fontSize: 18, fontWeight: 800, color: "#1a1a2e", marginBottom: 20 }}>{t.faq_title}</h3>
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {(t.faq as { q: string; r: string }[]).map((item, i) => (
                <div key={i} style={{ background: "#fff", borderRadius: 14, padding: "18px 20px", border: "1px solid #ebebeb", boxShadow: "0 1px 6px rgba(0,0,0,0.04)" }}>
                  <div style={{ fontWeight: 700, fontSize: 14, color: "#1a1a2e", marginBottom: 6 }}>{item.q}</div>
                  <div style={{ fontSize: 13, color: "#777", lineHeight: 1.65 }}>{item.r}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}
