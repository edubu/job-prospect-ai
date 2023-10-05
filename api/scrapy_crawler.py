import scrapy
from scrapy.crawler import CrawlerProcess

from api.scraper_types import ScraperBaseClass, PageContent
from typing import List


class LinkSpider(scrapy.Spider):
    name = 'link_spider'
    found_links = []

    def __init__(self, start_url: str, *args, **kwargs):
        super(LinkSpider, self).__init__(*args, **kwargs)
        self.start_url = start_url
        self.start_urls = [start_url]
        self.found_links = []

    def parse(self, response):
        # Extract all links
        all_links = response.css('a::attr(href)').getall()

        # Filter out external links
        internal_links = [
            link for link in all_links if link.startswith(self.start_url)]

        # Append to the found_links
        LinkSpider.found_links.extend(internal_links)


class BodyContentSpider(scrapy.Spider):
    name = "simple_spider"
    scraped_pages = []

    def __init__(self, urls=None, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.start_urls = urls

    def parse(self, response):
        body_content = response.xpath('//body//text()').extract()
        cleaned_body = ' '.join([text.strip()
                                for text in body_content if text.strip()])
        page_content = PageContent(
            url=response.url, bodyContent=cleaned_body)
        BodyContentSpider.scraped_pages.append(page_content)


class ScrapyScraper(ScraperBaseClass):
    def scrape(self, urls: List[str]) -> List[PageContent]:
        process = CrawlerProcess({
            'USER_AGENT': 'Mozilla/5.0'
        })

        process.crawl(BodyContentSpider, urls=urls)
        process.start()
        return BodyContentSpider.scraped_pages

    def scrapeInternalLinks(self, url: str) -> List[str]:
        # Create and configure the crawler process
        process = CrawlerProcess({
            'USER_AGENT': 'Mozilla/4.0 (compatible; MSIE 7.0; Windows NT 5.1)',
            'LOG_LEVEL': 'ERROR',  # Reduce log output on console
        })

        process.crawl(LinkSpider, start_url=url)
        process.start()  # The script will block here until crawling is finished

        return LinkSpider.found_links
