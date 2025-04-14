import { getHistoricalDNS } from "@/hooks/hackerreport/getHistoricalDNS";
import { NextResponse } from "next/server";

export async function GET(request) {
  const searchParams = request.nextUrl.searchParams;
  const domain = searchParams.get("domain");
  const type = searchParams.get("type");

  if (!domain || !type) {
    return NextResponse.json(
      { error: "Missing required parameters" },
      { status: 400 }
    );
  }

  try {
    const records = await getHistoricalDNS(domain, type);
    return NextResponse.json({ records });
  } catch (error) {
    console.error("Error fetching DNS records:", error);
    return NextResponse.json(
      { error: "Failed to fetch DNS records" },
      { status: 500 }
    );
  }
}
