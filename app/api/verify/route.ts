import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const PENDING_FILE = path.join(process.cwd(), "data", "pending.json");

function getPending(): Record<string, { name: string; email: string; expires: number }> {
  try {
    return JSON.parse(fs.readFileSync(PENDING_FILE, "utf-8"));
  } catch {
    return {};
  }
}

function savePending(data: object) {
  fs.writeFileSync(PENDING_FILE, JSON.stringify(data, null, 2));
}

export async function GET(req: NextRequest) {
  const token = req.nextUrl.searchParams.get("token");

  if (!token) {
    return NextResponse.json({ error: "Token manquant" }, { status: 400 });
  }

  const pending = getPending();
  const entry = pending[token];

  if (!entry) {
    return NextResponse.json({ error: "Lien invalide ou déjà utilisé" }, { status: 400 });
  }

  if (Date.now() > entry.expires) {
    delete pending[token];
    savePending(pending);
    return NextResponse.json({ error: "Lien expiré — inscrivez-vous à nouveau" }, { status: 400 });
  }

  delete pending[token];
  savePending(pending);

  return NextResponse.json({ name: entry.name, email: entry.email });
}
