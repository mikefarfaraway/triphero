import { NextResponse } from "next/server";
import { getAllSpots } from "@/lib/content";

export async function GET() {
  return NextResponse.json(getAllSpots());
}
