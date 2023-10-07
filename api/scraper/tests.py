import asyncio
from typing import List

from scraper_bs4 import ScraperBS4


async def test_scrape_internal_links():
    try:
        url = "https://www.airtable.com"
        scraper = ScraperBS4()

        internal_links = await scraper.scrape_internal_links(url)
        print(internal_links)
    finally:
        await scraper.close_session()


async def test_validate_urls():
    try:
        url = "https://www.airtable.com"
        scraper = ScraperBS4()

        internal_links = await scraper.scrape_internal_links(url)

        link_statuses: List[bool] = await scraper.validate_urls(internal_links)

        print(link_statuses)
    finally:
        await scraper.close_session()


if __name__ == "__main__":
    asyncio.run(test_scrape_internal_links())
