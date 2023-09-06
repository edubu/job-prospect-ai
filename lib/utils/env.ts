import fs from "fs";
import path from "path";

interface RequiredEnvVariables {
  GOOGLE_CLIENT_ID: string;
  GOOGLE_CLIENT_SECRET: string;
}

const checkFileExists = (filePath: string): boolean => {
  try {
    fs.accessSync(filePath, fs.constants.F_OK);
    return true;
  } catch (err) {
    return false;
  }
};

const validateEnvContent = (
  filePath: string,
  requiredVars: RequiredEnvVariables
): boolean => {
  const content = fs.readFileSync(filePath, "utf-8");
  let isValid = true;

  for (const key in requiredVars) {
    if (!content.includes(`${key}=`)) {
      console.error(`Error: ${key} is missing in ${filePath}`);
      isValid = false;
    }
  }

  return isValid;
};

export const validateEnv = () => {
  // The path needs to be adjusted since the script is inside lib/utils
  const rootDir = path.join(__dirname, "..", "..", "");

  const envFiles = [".env", "env.local"];
  let fileExists = false;

  for (const file of envFiles) {
    const filePath = path.join(rootDir, file);
    if (checkFileExists(filePath)) {
      fileExists = true;
      if (
        validateEnvContent(filePath, {
          GOOGLE_CLIENT_ID: "",
          GOOGLE_CLIENT_SECRET: "",
        })
      ) {
        console.log(`${file} is valid.`);
      } else {
        console.error(`${file} is missing required environment variables.`);
      }
    }
  }

  if (!fileExists) {
    console.error("Neither .env nor env.local exists in the directory.");
  }
};
