import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import fs from "fs";
import path from "path";
import { Resend } from "resend";

const PENDING_FILE = path.join(process.cwd(), "data", "pending.json");

function getPending(): Record<string, { name: string; email: string; expires: number }> {
  try {
    return JSON.parse(fs.readFileSync(PENDING_FILE, "utf-8"));
  } catch {
    return {};
  }
}

function savePending(data: object) {
  fs.mkdirSync(path.dirname(PENDING_FILE), { recursive: true });
  fs.writeFileSync(PENDING_FILE, JSON.stringify(data, null, 2));
}

export async function POST(req: NextRequest) {
  const { name, email } = await req.json();

  if (!name || !email) {
    return NextResponse.json({ error: "Données manquantes" }, { status: 400 });
  }

  const token = crypto.randomBytes(32).toString("hex");
  const expires = Date.now() + 24 * 60 * 60 * 1000; // 24h

  const pending = getPending();
  pending[token] = { name, email, expires };
  savePending(pending);

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
  const activationLink = `${baseUrl}/activer?token=${token}`;

  const resend = new Resend(process.env.RESEND_API_KEY);

  const { error } = await resend.emails.send({
    from: "Amena <onboarding@resend.dev>",
    to: email,
    subject: "Activez votre compte Amena Tunisia",
    html: `
<!DOCTYPE html>
<html lang="fr">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#f7f7f8;font-family:'Segoe UI',Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f7f7f8;padding:40px 0;">
    <tr><td align="center">
      <table width="560" cellpadding="0" cellspacing="0" style="background:#fff;border-radius:20px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,0.10);">

        <!-- Header -->
        <tr>
          <td style="background:linear-gradient(135deg,#ff5252,#c62828);padding:36px 40px;text-align:center;">
            <div style="display:inline-flex;align-items:center;gap:12px;">
              <div style="width:48px;height:48px;background:rgba(255,255,255,0.2);border-radius:14px;display:inline-block;line-height:48px;text-align:center;font-size:24px;">🔍</div>
              <div>
                <div style="color:#fff;font-size:26px;font-weight:800;letter-spacing:-0.5px;">Amena</div>
                <div style="color:rgba(255,255,255,0.75);font-size:11px;letter-spacing:1px;text-transform:uppercase;">LOST &amp; FOUND TUNISIA</div>
              </div>
            </div>
          </td>
        </tr>

        <!-- Body -->
        <tr>
          <td style="padding:44px 40px 32px;">
            <h1 style="margin:0 0 8px;font-size:24px;font-weight:800;color:#1a1a2e;">Bienvenue, ${name} ! 🎉</h1>
            <p style="margin:0 0 28px;color:#777;font-size:15px;line-height:1.7;">
              Merci de vous être inscrit sur <strong>Amena Tunisia</strong>.<br>
              Pour activer votre compte et commencer à utiliser la plateforme, cliquez sur le bouton ci-dessous.
            </p>

            <div style="text-align:center;margin:32px 0;">
              <a href="${activationLink}"
                 style="display:inline-block;background:linear-gradient(135deg,#ff5252,#c62828);color:#fff;text-decoration:none;font-weight:700;font-size:16px;padding:16px 40px;border-radius:12px;box-shadow:0 4px 16px rgba(229,57,53,0.4);">
                ✅ Activer mon compte
              </a>
            </div>

            <p style="margin:28px 0 0;color:#aaa;font-size:13px;text-align:center;line-height:1.8;">
              Ce lien est valable <strong>24 heures</strong>.<br>
              Si vous n'avez pas créé de compte, ignorez cet email.
            </p>
          </td>
        </tr>

        <!-- Divider -->
        <tr><td style="padding:0 40px;"><div style="height:1px;background:#f0f0f0;"></div></td></tr>

        <!-- Link fallback -->
        <tr>
          <td style="padding:20px 40px 36px;">
            <p style="margin:0;font-size:12px;color:#bbb;line-height:1.8;">
              Si le bouton ne fonctionne pas, copiez ce lien dans votre navigateur :<br>
              <a href="${activationLink}" style="color:#e53935;word-break:break-all;">${activationLink}</a>
            </p>
          </td>
        </tr>

        <!-- Footer -->
        <tr>
          <td style="background:#f9f9f9;padding:20px 40px;text-align:center;border-top:1px solid #f0f0f0;">
            <p style="margin:0;font-size:12px;color:#ccc;">© 2026 Amena Tunisia — Tous droits réservés</p>
          </td>
        </tr>

      </table>
    </td></tr>
  </table>
</body>
</html>
    `.trim(),
  });

  if (error) {
    console.error("Resend error:", error);
    return NextResponse.json({ error: "Erreur lors de l'envoi de l'email" }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
