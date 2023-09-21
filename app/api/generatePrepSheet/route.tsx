import { NextResponse } from "next/server";
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import {
  createPrepSheet,
  IPrepSheetResponse,
} from "@/lib/documents/prepSheets";

export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  const requestUrl = new URL(req.url);

  // Parse the request body
  const requestBody = await req.json();
  const companyURL = new URL(requestBody.url);
  const jobURL = new URL(requestBody.jobURL);
  console.log(
    "[INFO] Prep sheet requested for",
    companyURL.origin,
    "for job",
    jobURL.origin
  );

  // create supabase client
  const supabase = createRouteHandlerClient({ cookies });

  // Set options for if a duplicate document is made
  const options = {
    replaceDocument: true,
  };

  // Call the prep
  const createPrepSheetResponse: IPrepSheetResponse = await createPrepSheet({
    companyURL,
    jobURL,
    supabase,
    options,
  });

  console.log("[INFO]", createPrepSheetResponse.message);

  return NextResponse.json({
    redirectTo: requestUrl.origin + "/dashboard",
    refresh: true,
  });
}
