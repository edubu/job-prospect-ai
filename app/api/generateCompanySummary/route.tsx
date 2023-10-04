import { NextResponse } from "next/server";
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import {
  createCompanySummary,
  ICompanySummaryResponse,
} from "@/lib/documents/summaries";

export const maxDuration = 300;
export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  const requestUrl = new URL(req.url);

  // Parse the request body
  const requestBody = await req.json();
  const companyURL = new URL(requestBody.url);
  const documentName = requestBody.documentName;
  console.log("[INFO] Company Summary requested for", companyURL.origin);

  const companySummary: ICompanySummaryResponse = await createCompanySummary({
    companyURL,
  });
  // // create supabase client
  // const supabase = createRouteHandlerClient({ cookies });

  // // Call the company summarizer
  // const options = {
  //   replaceDocument: true,
  // };

  // const createCompanySummaryResponse: ICompanySummaryResponse =
  //   await createCompanySummary({ companyURL, documentName, supabase, options });

  // console.log("[INFO]", createCompanySummaryResponse.message);

  return NextResponse.json({
    redirectTo: requestUrl.origin + "/dashboard",
    refresh: true,
  });
}
