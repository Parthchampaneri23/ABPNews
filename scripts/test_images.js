const axios = require('axios');
const cheerio = require('cheerio');

async function testScrapeImages() {
  const urls = [
    'https://news.abplive.com/',
    'https://news.abplive.com/news/india',
    'https://news.abplive.com/news/world',
    'https://news.abplive.com/business',
    'https://news.abplive.com/entertainment',
    'https://news.abplive.com/sports'
  ];

  for (const url of urls) {
    console.log('Testing page:', url);
    try {
      const { data: html } = await axios.get(url, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
        }
      });
      const $ = cheerio.load(html);
      
      const images = [];
      $('img').each((i, el) => {
        const src = $(el).attr('src') || $(el).attr('data-src') || $(el).attr('data-original');
        if (src && (src.includes('abplive') || src.includes('static') || src.includes('uploads') || src.includes('cdn'))) {
          images.push(src.startsWith('//') ? 'https:' + src : src);
        }
      });

      console.log(`Found ${images.length} real ABP images on ${url}`);
      console.log('Sample images:', images.slice(0, 5));
    } catch (err) {
      console.error('Error fetching', url, err.message);
    }
  }
}

testScrapeImages();
