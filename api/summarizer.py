
"""
    Generates the company summary in markdown:
    
    Getting all valid links
    1.) Scrape links from main page
    2.) Remove duplicates and main page link
    3.) Filter for duplicates
    4.) Remove main page link
    4.) Filter for only valid link (ones that return status 200)
    
    Prioritizing links to scrape
    1.) Choose <=10 links to use in the summary - LinkPrioritizationModel
    2.) Add main page link to prioritizedLinks
    
    Scrape pages
    1.) Scrape all prioritized links using a headless browser
        (want JS to load and hydrate)
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


def generateCompanySummary(company_url: str):
    # Scrape link from main page
    pass
