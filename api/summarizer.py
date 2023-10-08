import asyncio
from typing import List

# Model deps
from models.linkModel import link_chain
from models.summarizeModel import PageSummary, summarize_chain

# Scraper deps
from api.scraper.scraper_bs4 import ScraperBS4
from scraper.scraper_types import PageContent

"""
    Generates the company summary in markdown:
    
    Getting all valid links
    1.) Scrape links from main page
    2.) Filter for duplicates
    3.) Remove main page link if it exists
    4.) Filter for only valid link (ones that return status 200)
    
    Prioritizing links to scrape
    1.) Choose <=10 links to use in the summary - LinkPrioritizationModel
    2.) Add main page link to prioritizedLinks
    
    Scrape pages
    1.) Scrape all prioritized links (using a headless browser
        want JS to load and hydrate)* not anymore
    2.) Clean up scraped data to only include body text(possibly metadata?)
    
    Page summaries
    1.) Summarize all pages in 2-3 paragraphs - PageSummaryModel
    2.) Include which sections this page will be useful for
    
    Section Generation
    1.) Format each sections prompt with relevant page summaries
    2.) Generate sections concurrently as markdown
    
    Document Stitching
    1.) Stitch together sections in order
    
    Cleanup
    1.) Clean up the whole markdown document to make it easier to read
    
    Return
"""


async def generateCompanySummary(company_url: str):
    # ------------ GETTING ALL VALID LINKS --------------
    # create scraper object
    scraper = ScraperBS4()

    # Scrape links from main page
    main_page_internal_links = await scraper.scrapeInternalLinks(company_url)

    # Remove duplicates and main page link if it exists
    unique_links = list(set(main_page_internal_links))
    if company_url in unique_links:
        unique_links.remove(company_url)

    # Keep all links that return status 200 & filter out duplicates from redirects
    valid_links = await scraper.filterValidLinks(unique_links)

    # ------------ PRIORITIZING LINKS TO SCRAPE --------------
    prioritizedLinks = await getPrioritizedLinks(company_url, valid_links)
    prioritizedLinks.append(company_url)

    # ------------ SCRAPE PAGES --------------
    # Scrape and clean body content for each page
    # Also truncates if too large
    pages = await scraper.scrape(prioritizedLinks)

    # ------------ PAGE SUMMARIES --------------
    # Summarize all pages in 2-3 paragraphs - PageSummaryModel
    page_summaries = await summarizePages(pages)


async def summarizePages(pages: List[PageContent]):
    # ------------ PAGE SUMMARIES --------------
    # Summarize all pages in 2-3 paragraphs - PageSummaryModel
    # Include which sections this page will be useful for
    tasks = [
        summarize_chain.arun(page_url=page.url, page_text=page.text) for page in pages
    ]
    pageSummaries: List[PageSummary] = await asyncio.gather(*tasks)

    pass


async def summarizePage(page: PageContent) -> PageContent:
    pageSummary: PageSummary = summarize_chain.arun(
        page_url=page.url, page_text=page.text
    )


async def getPrioritizedLinks(url: str, links: List[str], num_links=10):
    links_input = "\n".join(links)

    link_resp = link_chain.run(url=url, links=links_input, num_links=num_links)

    return link_resp
