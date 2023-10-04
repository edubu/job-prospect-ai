import { OpenAI } from "langchain/llms/openai";
import { PromptTemplate } from "langchain/prompts";
import { CommaSeparatedListOutputParser } from "langchain/output_parsers";
import { RunnableSequence } from "langchain/schema/runnable";

// With a `CommaSeparatedListOutputParser`, we can parse a comma separated list.
const parser = new CommaSeparatedListOutputParser();

const chain = RunnableSequence.from([
  PromptTemplate.fromTemplate(".\n{format_instructions}"),
  new OpenAI({ temperature: 0 }),
  parser,
]);

const model = new OpenAI({
  // customize openai model that's used, `text-davinci-003` is the default
  modelName: "text-davinci-003",

  // `max_tokens` supports a magic -1 param where the max token length for the specified modelName
  //  is calculated and included in the request to OpenAI as the `max_tokens` param
  maxTokens: -1,

  // use `modelKwargs` to pass params directly to the openai call
  // note that they use snake_case instead of camelCase
  modelKwargs: {
    user: "me",
  },

  // for additional logging for debugging purposes
  verbose: true,

  temperature: 0.7,

  openAIApiKey: process.env.OPENAI_API_KEY as string,
});

export const prioritizeLinks = async (links: string[]): Promise<string[]> => {};
