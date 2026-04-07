import { NextResponse } from "next/server";
import { getProfileBundle } from "@/lib/content";

export async function GET() {
  return NextResponse.json(getProfileBundle());
}
