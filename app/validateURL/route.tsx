// pages/api/validateURLs.ts
import type { NextApiRequest, NextApiResponse } from "next";
import fetch from "node-fetch";

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

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    const { urls }: { urls: string[] } = req.body;

    if (!urls || !Array.isArray(urls)) {
      return res.status(400).json({ error: "URLs should be an array" });
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

    return res.status(200).json(validationResults);
  } else {
    res.status(405).end(); // Method Not Allowed
  }
};
