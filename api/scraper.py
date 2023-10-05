from api.scrapy_crawler import ScrapyScraper
from typing import List


def scrapeInternalLinks(url: str) -> List[str]:
    scraper = ScrapyScraper()

    return scraper.scrapeInternalLinks(url)
