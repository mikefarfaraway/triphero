import { NextResponse } from "next/server";
import { getRelatedSpots, getSpotById } from "@/lib/content";

type RouteContext = {
  params: Promise<{
    id: string;
  }>;
};

export async function GET(_: Request, { params }: RouteContext) {
  const { id } = await params;
  const spot = getSpotById(id);

  if (!spot) {
    return NextResponse.json({ message: "Spot not found" }, { status: 404 });
  }

  return NextResponse.json(getRelatedSpots(id));
}
