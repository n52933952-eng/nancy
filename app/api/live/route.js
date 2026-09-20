import { NextResponse } from "next/server";
import { fetchLiveContent } from "@/lib/content";

export const dynamic = "force-dynamic";

export async function GET() {
  const live = await fetchLiveContent();
  if (!live) return NextResponse.json({ missing: true });
  return NextResponse.json(live);
}
