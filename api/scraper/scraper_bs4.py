from scraper.scraper_types import HeaderContent, PageContent, ScraperBaseClass
import asyncio
from typing import Dict, List

import aiohttp
import tiktoken
from bs4 import BeautifulSoup

from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC

ENCODING_NAME = "c100k_base"

# from scraper_types import PageContent, ScraperBaseClass


class ScraperBS4(ScraperBaseClass):
    def __init__(self) -> None:
        super().__init__()
        # self.session = aiohttp.ClientSession()

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

        allowed_tags = ["p", "h1", "h2", "h3",
                        "h4", "h5", "h6", "ul", "ol", "li"]

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
        driver = webdriver.Chrome()
        try:
            driver.get(url)

            # Define a list of element locators (e.g., TAG_NAME, CSS_SELECTOR, XPATH)
            element_locators = [By.TAG_NAME('p'), By.TAG_NAME(
                'h1'), By.TAG_NAME('h2'), By.TAG_NAME('h3')]

            # Wait for each element type to load
            wait_timeout = 10  # Adjust the timeout as needed
            for locator in element_locators:
                WebDriverWait(driver, wait_timeout).until(
                    EC.presence_of_element_located(locator))

            # Find all 'h1', 'h2', 'h3', and 'p' elements
            elements_h1 = driver.find_elements_by_tag_name('h1')
            elements_h2 = driver.find_elements_by_tag_name('h2')
            elements_h3 = driver.find_elements_by_tag_name('h3')
            elements_p = driver.find_elements_by_tag_name('p')

            # Extract text from all matching elements
            h1_text = [element.text for element in elements_h1]
            h2_text = [element.text for element in elements_h2]
            h3_text = [element.text for element in elements_h3]
            p_text = [element.text for element in elements_p]

            h1s = "\n".join(h1_text)
            h2s = "\n".join(h2_text)
            h3s = "\n".join(h3_text)
            ps = "\n".join(p_text)

            page_text = f"{h1s}\n{h2s}\n{h3s}\n{ps}"

            # Construct PageContent object
            page = PageContent()
            page.title = driver.title
            page.bodyContent = page_text
            page.url = driver.current_url

            return page
        finally:
            driver.quit()

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
