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

  // Call the FastAPI company summary generation endpoint
  const generatorResponse = await fetch(
    `${process.env.FASTAPI_URL as string}/generateCompanySummary`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "no-cache",
      },
      body: JSON.stringify({ company_url: companyURL.origin }),
    }
  );

  const generatorResponseData = await generatorResponse.json();

  console.log(generatorResponseData);

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
