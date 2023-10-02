import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export const dynamic = "force-dynamic";

export async function GET(req: Request) {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL as string,
    process.env.SUPABASE_SERVER_ROLE_KEY as string
  );

  const {
    data: { users },
    error,
  } = await supabase.auth.admin.listUsers();
  if (error) {
    console.error(`[ERROR] ${error.message}`);
  }

  const userCount = users?.length;

  return NextResponse.json({
    userCount: userCount,
  });
}
