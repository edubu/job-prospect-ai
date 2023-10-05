from langchain.chains import LLMChain, SequentialChain
from langchain.prompts import PromptTemplate
from langchain.llms import OpenAI
import os
from api.config import OPENAI_API_KEY

os.environ['OPENAI_API_KEY'] = OPENAI_API_KEY


# prompt templates
titleTemplate = PromptTemplate(
    input_variables=['topic'],
    template='write me a youtube video title about {topic}'
)
