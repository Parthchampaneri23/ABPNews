const fs = require('fs');
const path = require('path');

const jsonPath = path.join(__dirname, '../src/data/newsData.json');
const raw = fs.readFileSync(jsonPath, 'utf8');
const data = JSON.parse(raw);

const prefixes = [
  "Election", "Elections", "India", "World", "Sports", "Business", 
  "Entertainment", "Tech", "Technology", "Lifestyle", "Crime", "Automobiles"
];

function cleanText(text) {
  if (!text || typeof text !== 'string') return text;
  let cleaned = text;
  for (const p of prefixes) {
    const regex = new RegExp(`^${p}([A-Z])`);
    if (regex.test(cleaned)) {
      cleaned = cleaned.substring(p.length);
    }
  }
  return cleaned.trim();
}

if (data.leadStory) {
  data.leadStory.title = cleanText(data.leadStory.title);
  data.leadStory.summary = cleanText(data.leadStory.summary);
}

if (data.allArticles && Array.isArray(data.allArticles)) {
  data.allArticles.forEach(art => {
    art.title = cleanText(art.title);
    art.summary = cleanText(art.summary);
    if (art.content && Array.isArray(art.content)) {
      art.content = art.content.map(c => cleanText(c));
    }
  });
}

["trendingNews", "indiaNews", "worldNews", "sportsNews", "entertainmentNews", "businessNews", "techNews"].forEach(key => {
  if (data[key] && Array.isArray(data[key])) {
    data[key].forEach(art => {
      art.title = cleanText(art.title);
      art.summary = cleanText(art.summary);
    });
  }
});

fs.writeFileSync(jsonPath, JSON.stringify(data, null, 2), 'utf8');
console.log('Successfully cleaned titles in newsData.json using Node.js!');
