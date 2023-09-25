import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  // Parse the request body
  const requestBody = await req.json();
  const email = requestBody.email;

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL as string,
    process.env.NEXT_SERVER_ROLE_KEY as string
  );

  const { data, error } = await supabase
    .from("email-list")
    .insert([{ email: email }]);

  if (error) {
    console.error(`[ERROR] ${error.message}`);
    return NextResponse.json({
      message: "Error",
    });
  }

  console.log("[INFO] Added email to waitlist:", data);

  return NextResponse.json({
    message: "Success",
  });
}
