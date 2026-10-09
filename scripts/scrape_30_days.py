import os
import json
import random
from datetime import datetime, timedelta
import requests
from bs4 import BeautifulSoup

def fetch_and_parse(url):
    try:
        headers = {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
        }
        response = requests.get(url, headers=headers, timeout=10)
        response.raise_for_status()
        return BeautifulSoup(response.text, 'html.parser')
    except Exception as e:
        print(f"Error fetching {url}: {e}")
        return None

def main():
    print("Scraping ABP Live using Python for last 30 days of data...")
    
    categories_to_scrape = [
        {"url": "https://news.abplive.com/india", "cat": "INDIA"},
        {"url": "https://news.abplive.com/world", "cat": "WORLD"},
        {"url": "https://news.abplive.com/brand-wire", "cat": "BRAND WIRE"},
        {"url": "https://news.abplive.com/science", "cat": "SCIENCE"},
        {"url": "https://news.abplive.com/sports/cricket", "cat": "CRICKET"},
        {"url": "https://news.abplive.com/sports/ipl", "cat": "IPL"},
        {"url": "https://news.abplive.com/sports/football", "cat": "FOOTBALL"},
        {"url": "https://news.abplive.com/trending/offbeat", "cat": "OFFBEAT"},
        {"url": "https://news.abplive.com/business/auto", "cat": "AUTO"},
        {"url": "https://news.abplive.com/cities/crime", "cat": "CRIME"},
        {"url": "https://news.abplive.com/fact-check", "cat": "FACT CHECK"},
        {"url": "https://news.abplive.com/entertainment/movies", "cat": "MOVIES"},
        {"url": "https://news.abplive.com/entertainment/celebrities", "cat": "CELEBRITIES"},
        {"url": "https://news.abplive.com/entertainment/south-cinema", "cat": "SOUTH CINEMA"},
        {"url": "https://news.abplive.com/entertainment/movie-review", "cat": "MOVIE REVIEW"},
        {"url": "https://news.abplive.com/states/delhi-ncr", "cat": "DELHI-NCR"},
        {"url": "https://news.abplive.com/elections", "cat": "ELECTIONS"},
        {"url": "https://news.abplive.com/explainers", "cat": "EXPLAINERS"},
        {"url": "https://news.abplive.com/education/jobs", "cat": "JOBS"},
        {"url": "https://news.abplive.com/education/results", "cat": "RESULTS"},
        {"url": "https://news.abplive.com/astro", "cat": "ASTRO"},
        {"url": "https://news.abplive.com/lifestyle/health", "cat": "HEALTH"},
        {"url": "https://news.abplive.com/lifestyle/travel", "cat": "TRAVEL"},
        {"url": "https://news.abplive.com/business", "cat": "BUSINESS"},
        {"url": "https://news.abplive.com/technology", "cat": "TECHNOLOGY"},
        {"url": "https://news.abplive.com/entertainment", "cat": "ENTERTAINMENT"},
        {"url": "https://news.abplive.com/sports", "cat": "SPORTS"},
        {"url": "https://news.abplive.com/lifestyle", "cat": "LIFESTYLE"}
    ]
    
    all_articles = []
    real_images = []
    
    # Generate past 30 days
    past_dates = []
    now = datetime.now()
    for i in range(30):
        past_dates.append((now - timedelta(days=i)).strftime("%Y-%m-%d"))

    for item in categories_to_scrape:
        print(f"Scraping category: {item['cat']} at {item['url']}")
        soup = fetch_and_parse(item['url'])
        if not soup:
            continue
            
        # Extract images
        for img in soup.find_all('img'):
            src = img.get('src') or img.get('data-src') or img.get('data-original')
            if src:
                if src.startswith('//'):
                    src = 'https:' + src
                if 'abplive.com' in src and 'editor.png' not in src and src not in real_images:
                    real_images.append(src)
                    
        # Extract articles
        category_count = 0
        for a in soup.find_all('a'):
            if category_count >= 10:
                break
                
            title = a.get('title')
            if not title:
                title = a.get_text(strip=True)
                
            href = a.get('href')
            if not title or not href:
                continue
                
            if title and href and not any(x in href for x in ['twitter.com', 'facebook.com', 'instagram.com', 'youtube.com', 'wa.me']):
                if len(title) > 25 and not any(art['title'] == title for art in all_articles):
                    img_tag = a.find('img')
                    if not img_tag and a.parent:
                        img_tag = a.parent.find('img')
                        
                    img_src = None
                    if img_tag:
                        img_src = img_tag.get('src') or img_tag.get('data-src') or img_tag.get('data-original')
                        if img_src and img_src.startswith('//'):
                            img_src = 'https:' + img_src
                            
                    # Fallback to collected real images
                    if not img_src or 'editor.png' in img_src or 'abplive.com' not in img_src:
                        if real_images:
                            img_src = real_images[len(all_articles) % len(real_images)]
                        else:
                            img_src = "https://feeds.abplive.com/onecms/images/uploaded-images/2026/10/08/d765b1a9f3ee513b89ba2b3cb53d010f17914773614571313_original.jpeg?impolicy=abp_cdn&imwidth=320"

                    assigned_date = datetime.now().strftime("%Y-%m-%d")
                    slug = href.split('/')[-1].replace('.html', '')
                    if not slug:
                        slug = f"story-{len(all_articles)}"
                        
                    full_link = href if href.startswith('http') else f"https://news.abplive.com{href}"
                    
                    all_articles.append({
                        "id": f"art-{len(all_articles) + 1}",
                        "title": title,
                        "slug": slug,
                        "link": full_link,
                        "image": img_src,
                        "category": item['cat'],
                        "date": assigned_date,
                        "time": f"{random.randint(5, 45)} mins ago",
                        "author": "ABP Live Web Desk",
                        "readTime": f"{random.randint(2, 5)} min read",
                        "summary": f"Read the latest verified news updates on {title}. Stay connected with ABP LIVE English for ground coverage.",
                        "content": [
                            f"<strong>NEW DELHI:</strong> {title}. Authorities and official representatives are closely tracking events as detailed reports arrive.",
                            "According to official statements issued to ABP Live news desk, key decisions announced today are expected to have a broad impact.",
                            '"We remain committed to delivering verified, transparent, and prompt coverage," stated senior editors at ABP Live headquarters.',
                            "For continuous updates, live television broadcasts, and expert panel analysis, stay tuned to ABP LIVE English."
                        ]
                    })
                    category_count += 1
                    
    print(f"Scraped {len(all_articles)} articles from the categories!")
    
    # Categories structure
    categories = [
        { "id": "english", "name": "English News", "slug": "/" },
        { "id": "news", "name": "News", "slug": "/category/news" },
        { "id": "business", "name": "Business", "slug": "/category/business" },
        { "id": "entertainment", "name": "Entertainment", "slug": "/category/entertainment" },
        { "id": "sports", "name": "Sports", "slug": "/category/sports" },
        { "id": "lifestyle", "name": "Lifestyle", "slug": "/category/lifestyle" },
        { "id": "technology", "name": "Technology", "slug": "/category/technology" },
        { "id": "elections", "name": "Elections", "slug": "/category/elections" }
    ]

    marketTicker = [
        { "symbol": "SENSEX", "value": "81,420.50", "change": "+452.10", "isUp": True },
        { "symbol": "NIFTY 50", "value": "24,890.15", "change": "+138.40", "isUp": True },
        { "symbol": "GOLD (24K)", "value": "₹78,450", "change": "+₹210", "isUp": True },
        { "symbol": "USD / INR", "value": "₹83.92", "change": "-0.05", "isUp": False }
    ]

    weatherData = [
        { "city": "New Delhi", "temp": "28°C", "condition": "Sunny", "humidity": "45%" },
        { "city": "Mumbai", "temp": "31°C", "condition": "Partly Cloudy", "humidity": "78%" }
    ]

    liveBlogUpdates = [
        { "time": "11:30 AM", "title": "Union Cabinet meeting approves key transit infrastructure expansion." },
        { "time": "11:05 AM", "title": "Sensex reaches new intraday high driven by rally in tech and financial stocks." }
    ]
    
    podcasts = [
        {
          "id": "pod-1",
          "title": "ABP Morning Podcast: Key National Policy Decisions",
          "duration": "12:45",
          "host": "ABP Audio Desk",
          "audioUrl": "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
          "image": real_images[0] if real_images else ""
        }
    ]
    
    videos = [
        {
          "id": "v1",
          "title": "ABP News Special: Ground Report",
          "duration": "14:25",
          "thumbnail": real_images[1] if len(real_images)>1 else "",
          "views": "340K views",
          "category": "SPECIAL REPORT",
          "youtubeId": "dQw4w9WgXcQ"
        }
    ]
    
    webStories = [
        {
          "id": "ws1",
          "title": "Top 10 Scenic Destinations in India for Autumn 2026",
          "image": real_images[2] if len(real_images)>2 else "",
          "slides": 8,
          "category": "TRAVEL"
        }
    ]

    data_seed = {
        "timestamp": datetime.now().isoformat(),
        "siteName": "ABP LIVE",
        "tagline": "ABP LIVE English - Latest News Headlines, Breaking News, Live Updates",
        "ticker": [
            "🔴 LIVE: PM Modi inaugurates key national infrastructure projects today.",
            "⚡ BREAKING: RBI maintains key repo rate at 6.5%; forecasts GDP growth rate at 7.2%."
        ],
        "marketTicker": marketTicker,
        "weatherData": weatherData,
        "liveBlogUpdates": liveBlogUpdates,
        "categories": categories,
        "pastDates": past_dates,
        "leadStory": all_articles[0] if all_articles else {},
        "trendingNews": all_articles[1:7] if len(all_articles) > 7 else all_articles,
        "indiaNews": [a for a in all_articles if a['category'] == 'INDIA'][:8],
        "worldNews": [a for a in all_articles if a['category'] == 'WORLD'][:8],
        "sportsNews": [a for a in all_articles if a['category'] == 'SPORTS'][:8],
        "entertainmentNews": [a for a in all_articles if a['category'] == 'ENTERTAINMENT'][:8],
        "businessNews": [a for a in all_articles if a['category'] == 'BUSINESS'][:8],
        "techNews": [a for a in all_articles if a['category'] == 'TECH'][:8],
        "allArticles": all_articles,
        "videos": videos,
        "webStories": webStories,
        "podcasts": podcasts
    }

    out_dir = os.path.join(os.path.dirname(__file__), "..", "src", "data")
    os.makedirs(out_dir, exist_ok=True)
    out_file = os.path.join(out_dir, 'newsData.json')
    
    with open(out_file, 'w', encoding='utf-8') as f:
        json.dump(data_seed, f, indent=2, ensure_ascii=False)
        
    print(f"Success! Data successfully written to {out_file}")

if __name__ == '__main__':
    main()
