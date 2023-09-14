import { NextResponse } from "next/server";

function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function POST(req: Request) {
  const requestUrl = new URL(req.url);
  console.log("MADE IT HERE");

  await delay(3000);

  return NextResponse.json({ redirectTo: requestUrl.origin + "/dashboard" });
}
