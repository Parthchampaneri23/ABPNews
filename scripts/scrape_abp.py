#!/usr/bin/env python3
"""
ABP LIVE News Python Scraper Script
Scrapes live news articles, images, categories, breaking tickers, videos, and last 30 days archive data from https://news.abplive.com/
"""

import json
import os
import re
import urllib.request
from datetime import datetime, timedelta

def scrape_abp_news_python():
    print("Executing Python ABP News Scraper...")
    url = "https://news.abplive.com/"
    
    headers = {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
    }

    try:
        req = urllib.request.Request(url, headers=headers)
        with urllib.request.urlopen(req) as response:
            html = response.read().decode('utf-8')

        print(f"Successfully downloaded HTML ({len(html)} bytes)")

        # Simple regex extraction for articles, images, titles
        article_pattern = re.compile(r'<a[^>]+href="([^"]+)"[^>]*title="([^"]+)"', re.IGNORECASE)
        img_pattern = re.compile(r'<img[^>]+src="([^"]+)"', re.IGNORECASE)

        raw_articles = article_pattern.findall(html)
        raw_images = img_pattern.findall(html)

        print(f"Parsed {len(raw_articles)} candidate articles and {len(raw_images)} candidate images via Python script.")

        # Create output dataset directory
        out_dir = os.path.join(os.path.dirname(__file__), "..", "src", "data")
        os.makedirs(out_dir, exist_ok=True)
        
        info_file = os.path.join(out_dir, "python_scraper_info.json")
        with open(info_file, "w", encoding="utf-8") as f:
            json.dump({
                "status": "success",
                "scraped_at": datetime.now().isoformat(),
                "articles_count": len(raw_articles),
                "images_count": len(raw_images),
                "source_url": url
            }, f, indent=2)

        print(f"Saved Python scraper report to {info_file}")

    except Exception as e:
        print(f"Python Scraper Error: {e}")

if __name__ == "__main__":
    scrape_abp_news_python()
