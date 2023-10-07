import asyncio
from typing import List

import aiohttp
from bs4 import BeautifulSoup

# from scraper_types import PageContent, ScraperBaseClass
from scraper.scraper_types import PageContent, ScraperBaseClass


class ScraperBS4(ScraperBaseClass):
    def __init__(self) -> None:
        super().__init__()
        self.session = aiohttp.ClientSession()

    async def scrape(self, urls: List[str]) -> List[PageContent]:
        tasks = [self.fetch_page(url) for url in urls]
        pages: List[PageContent] = await asyncio.gather(*tasks)

        return pages

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
        statuses = await self.getStatuses(urls)

        valid_urls = []

        for i in range(len(urls)):
            if statuses[i] == 200:
                valid_urls.append(urls[i])

        return valid_urls

    async def getStatuses(self, urls: List[str]) -> List[int]:
        # Fetch all pages and store if they return a status of 200 then put true into the list
        tasks = [self.fetch_status(url) for url in urls]
        statuses = await asyncio.gather(*tasks)

        return statuses

    async def fetch_status(self, url: str) -> int:
        async with self.session.get(url) as response:
            return response.status

    async def fetch_page(self, url: str) -> PageContent:
        async with self.session.get(url) as response:
            page = PageContent()
            await page.setResponse(response)
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
