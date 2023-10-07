import asyncio
from typing import Dict, List

import aiohttp
import tiktoken
from bs4 import BeautifulSoup

ENCODING_NAME = "c100k_base"

# from scraper_types import PageContent, ScraperBaseClass
from scraper.scraper_types import HeaderContent, PageContent, ScraperBaseClass


class ScraperBS4(ScraperBaseClass):
    def __init__(self) -> None:
        super().__init__()
        self.session = aiohttp.ClientSession()

    async def scrape(self, urls: List[str], token_limit=10000) -> List[PageContent]:
        tasks = [self.fetch_page(url) for url in urls]
        raw_pages: List[PageContent] = await asyncio.gather(*tasks)

        cleaned_pages = self.cleanPages(raw_pages, token_limit)

        return cleaned_pages

    async def scrapeInternalLinks(self, raw_url: str) -> List[str]:
        url = raw_url
        if url[-1] == "/":
            url = url[:-1]

        internal_links = []

        response = await self.fetch_page(url)

        html_content = response.bodyContent

        soup = BeautifulSoup(html_content, "html.parser")
        links = soup.find_all("a")

        protocol, hostname = await self.splitUrl(url)

        for link in links:
            if link.has_attr("href"):
                if hostname in link["href"]:
                    internal_links.append(link["href"])
                elif link["href"].startswith("/"):
                    internal_links.append(url + link["href"])

        return internal_links

    async def filterValidLinks(self, urls: List[str]) -> List[str]:
        headers = await self.getHeaders(urls)

        valid_urls = []

        for header in headers:
            if header.status == 200 and header.url not in valid_urls:
                valid_urls.append(header.url)

        return valid_urls

    async def cleanPages(
        self, pages: List[PageContent], token_limit: int
    ) -> List[PageContent]:
        # Clean up bodyContent for each page
        tasks = [self.cleanPage(page, token_limit) for page in pages]
        cleaned_pages: List[PageContent] = await asyncio.gather(*tasks)

        return cleaned_pages

    async def cleanPage(self, page: PageContent, token_limit: int) -> PageContent:
        soup = BeautifulSoup(page.bodyContent, "html.parser")

        allowed_tags = ["p", "h1", "h2", "h3", "h4", "h5", "h6", "ul", "ol", "li"]

    def numTokensFromString(string: str, encoding_name: str = ENCODING_NAME) -> int:
        encoding = tiktoken.get_encoding(encoding_name)
        num_tokens = len(encoding.encode(string))
        return num_tokens

    async def getHeaders(self, urls: List[str]) -> List[HeaderContent]:
        # Fetch all pages and store if they return a status of 200 then put true into the list
        tasks = [self.fetchHeader(url) for url in urls]
        headers = await asyncio.gather(*tasks)

        return headers

    # returns the header from the url
    async def fetchHeader(self, url: str) -> HeaderContent:
        async with self.session.get(url) as response:
            header = HeaderContent()
            header.status = response.status
            header.url = response.url.__str__()
            return header

    async def fetch_page(self, url: str) -> PageContent:
        async with self.session.get(url) as response:
            page = PageContent()
            page.url = response.url.__str__()
            page.status = response.status
            page.bodyContent = await response.text()
            return page

    async def splitUrl(self, url: str) -> str:
        hostname = None
        protocol = None

        if "www" in url:
            splits = url.split("www.")
            protocol = splits[0]
            hostname = splits[1]
        else:
            splits = url.split("//")
            protocol = splits[0]
            hostname = splits[1]

        return protocol, hostname

    async def close_session(self):
        if self.session:
            await self.session.close()
