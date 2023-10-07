import asyncio

from summarizer import generateCompanySummary

if __name__ == "__main__":
    asyncio.run(generateCompanySummary("https://www.airtable.com"))
