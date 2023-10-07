from typing import List

from config import OPENAI_API_KEY
from langchain.chains import LLMChain
from langchain.chat_models import ChatOpenAI
from langchain.output_parsers import PydanticOutputParser
from langchain.prompts import PromptTemplate
from langchain.pydantic_v1 import BaseModel, Field, validator


# Output data structure
class PageSummary(BaseModel):
    summary: str = Field(description="The summary of the page")
    sections: List[str] = Field(description="The sections that this page is useful for")


# output parser
parser = PydanticOutputParser(pydantic_object=PageSummary)

# prompts
SUMMARIZE_PROMPT = """\
 You are a text summarization bot.
    Below is the text scraped from ${page_url}.
    {page_text}

    Summarize this text to fit within 2 paragraphs. Summarize the details that are most important based upon the url. 
    As Examples:
    - if you are summarizing a url of https://epic.com/solutions/eletronic-health-records, your summary will be explaining the solution of electronic health records that the company epic provides.
    - if you are summarizing a url of https://www.athenahealth.com/careers/locations, your summary will include a bulleted list of the locations that the company athenahealth has offices in.
    - if you are summarizing a url of https://www.athenahealth.com/about/who-we-are, your summary will include facts and details about the company athenhealth. Such as when it was founded, their culture, etc.
    
    In addition you should decide which sections of company summary this page will be useful for.
    Choose from the following sections:
    - Company Summary
    - Company History
    - Products and Services
    - Business Model
    - Target Audience
    - Key Competitors
    - Contact Information and Company Details
    
    {format_instructions}\n
"""

# prompt templates
summarize_template = PromptTemplate(
    input_variables=["page_url", "page_text"],
    template=SUMMARIZE_PROMPT,
    partial_variables={"format_instructions": parser.get_format_instructions()},
)

# LlMs
llm = OpenAI(
    openai_api_key=OPENAI_API_KEY, model_name="gpt-3.5-turbo-16k", temperature=0.3
)

# Chains
summarize_chain = LLMChain(llm=llm, prompt=summarize_template, output_parser=parser)
