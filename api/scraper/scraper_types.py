from abc import ABC, abstractmethod
from typing import List

from aiohttp import ClientResponse


class PageContent:
    def __init__(self) -> None:
        self.summary = None
        self.sections = []

    async def setResponse(self, response: ClientResponse):
        self.url = response.url
        self.status = response.status
        self.bodyContent = await response.text()

    async def setSummary(self, summary: str):
        self.summary = summary

    async def setSections(self, sections: List[str]):
        self.sections = sections


class ScraperBaseClass(ABC):
    @abstractmethod
    async def scrape(self, urls: List[str]) -> List[PageContent]:
        pass

    @abstractmethod
    async def scrapeInternalLinks(self, url: str) -> List[str]:
        pass

    @abstractmethod
    async def filterValidLinks(self, urls: List[str]) -> List[str]:
        pass
