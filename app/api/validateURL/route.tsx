// pages/api/validateURLs.ts
import fetch from "node-fetch";
import { NextResponse } from "next/server";

// Check if URL is syntactically correct
function isValidURL(url: string): boolean {
  try {
    new URL(url);
    return true;
  } catch (e) {
    return false;
  }
}

// Check if URL points to an actual webpage
async function isWebPageURL(url: string): Promise<boolean> {
  if (!isValidURL(url)) {
    return false;
  }

  try {
    const response = await fetch(url, {
      method: "HEAD", // Fetch only headers
    });

    if (response.status !== 200) {
      return false;
    }

    const contentType = response.headers.get("Content-Type");

    if (contentType && contentType.startsWith("text/html")) {
      return true;
    }

    return false;
  } catch (e) {
    console.error(e);
    return false;
  }
}

export async function POST(req: Request) {
  const data = await req.json();
  console.log(data);
  const { urls }: { urls: string[] } = data;
  console.log(urls);

  if (!urls || !Array.isArray(urls)) {
    return NextResponse.json({ data: null, error: "URLs should be an array" });
  }

  const validationResults = await Promise.all(
    urls.map(async (url) => {
      const isValid = await isWebPageURL(url);
      return {
        url,
        isValid,
      };
    })
  );

  return NextResponse.json({ data: validationResults, error: null });
}
