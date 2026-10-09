import json
import re

json_path = "d:/abpnews/abpnews-website/src/data/newsData.json"

with open(json_path, "r", encoding="utf-8") as f:
    data = json.load(f)

# Categories list to clean prefixes from titles
prefixes = [
    "Election", "Elections", "India", "World", "Sports", "Business", 
    "Entertainment", "Tech", "Technology", "Lifestyle", "Crime", "Automobiles"
]

def clean_text(text):
    if not text or not isinstance(text, str):
        return text
    for p in prefixes:
        pattern = re.compile(rf"^{p}([A-Z])", re.IGNORECASE)
        match = pattern.match(text)
        if match:
            # Replace prefix with capitalized first char of real title
            text = text[len(p):]
    return text.strip()

# Clean lead story
if "leadStory" in data and data["leadStory"]:
    data["leadStory"]["title"] = clean_text(data["leadStory"]["title"])
    data["leadStory"]["summary"] = clean_text(data["leadStory"]["summary"])

# Clean all articles
if "allArticles" in data:
    for art in data["allArticles"]:
        art["title"] = clean_text(art["title"])
        art["summary"] = clean_text(art["summary"])
        if "content" in art and isinstance(art["content"], list):
            art["content"] = [clean_text(c) for c in art["content"]]

# Clean other lists if present
for key in ["trendingNews", "indiaNews", "worldNews", "sportsNews", "entertainmentNews", "businessNews", "techNews"]:
    if key in data and isinstance(data[key], list):
        for art in data[key]:
            art["title"] = clean_text(art["title"])
            art["summary"] = clean_text(art["summary"])

with open(json_path, "w", encoding="utf-8") as f:
    json.dump(data, f, indent=2, ensure_ascii=False)

print("Successfully cleaned article titles and content in newsData.json!")
