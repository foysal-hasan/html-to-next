import { getHistoricalDNS } from "@/hooks/hackerreport/getHistoricalDNS";
import { NextResponse } from "next/server";

export async function GET(request, { params }) {
  const { domain, type } = params;

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
