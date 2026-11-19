import configPromise from "@payload-config";
import { getPayload } from "payload";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

// Lightweight health/keep-alive endpoint. Pinged by an external cron
// (GitHub Actions) to stop free-tier hosts from sleeping and keep the DB warm.
export async function GET() {
  try {
    const payload = await getPayload({ config: configPromise });
    await payload.count({ collection: "users" });
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}
