import type { NextApiRequest, NextApiResponse } from "next";
import supabase from "@/lib/utils/supabaseClient";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "GET") {
    return res.status(405).end();
  }

  const { data } = await supabase.auth.getSession();
  console.log(data);
  const user = data.session.user;

  if (!user) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  const { data: documents, error } = await supabase
    .from("documents")
    .select("*")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false });

  if (error) {
    return res.status(500).json({ error: error.message });
  }

  return res.status(200).json(documents);
};
