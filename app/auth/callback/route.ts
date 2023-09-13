import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const code = searchParams.get("code");
  const next = searchParams.get("next") ?? "/";

  if (code) {
    const supabase = createRouteHandlerClient({ cookies: () => cookies() });
    const { error } = await supabase.auth.exchangeCodeForSession(code);
    if (!error) {
      return NextResponse.redirect(new URL(`/${next.slice(1)}`, req.url));
    }
  }

  // return the user to an error page with instructions
  return NextResponse.redirect(new URL("/auth/auth-code-error", req.url));
}
