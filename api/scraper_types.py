from abc import ABC, abstractmethod
from typing import List


class PageContent:
    def __init__(self, url: str, bodyContent: str, sections: List[str] = None):
        self.url = url
        self.bodyContent = bodyContent
        self.sections = sections if sections else []


class ScraperBaseClass(ABC):
    @abstractmethod
    def scrape(self, urls: List[str]) -> List[PageContent]:
        pass

    @abstractmethod
    def scrapeInternalLinks(self, url: str) -> List[str]:
        pass
