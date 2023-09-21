import { SupabaseClient } from "@supabase/supabase-js";
import { ErrorGeneratorTypes } from "../utils/errorTypes";

interface IPrepSheetProps {
  companyURL: URL;
  jobURL: URL;
  supabase: SupabaseClient;
  options: Record<string, boolean>;
}

export interface IPrepSheetResponse {
  message: string;
  error: ErrorGeneratorTypes;
}

export const createPrepSheet = async ({
  companyURL,
  jobURL,
  supabase,
  options,
}: IPrepSheetProps): Promise<IPrepSheetResponse> => {
  const userResponse = await supabase.auth.getUser();
  const user = userResponse?.data.user;

  // Check if user already has the job prep sheet
  if (await userHasPrepSheet(companyURL, jobURL, supabase)) {
    const response: IPrepSheetResponse = {
      message: "User already has a prep sheet for this job.",
      error: ErrorGeneratorTypes.USER_ALREADY_OWNS,
    };

    return response;
  }

  return { message: "testing", error: ErrorGeneratorTypes.NONE_TYPE };
};

const userHasPrepSheet = async (
  companyURL: URL,
  jobURL: URL,
  supabase: SupabaseClient
) => {
  const userResponse = await supabase.auth.getUser();
  const user = userResponse?.data.user;

  const { data: prepSheets, error } = await supabase
    .from("documents")
    .select("*")
    .eq();

  if (error) {
    throw new Error(`Unable to get user's prep sheets: ${error}`);
  }

  return prepSheets.length > 0;
};
