import newsData from '@/data/newsData.json';

export interface Article {
  id: string;
  title: string;
  slug: string;
  link: string;
  image: string;
  category: string;
  date?: string;
  time: string;
  author: string;
  readTime: string;
  summary: string;
  content: string[];
}

export interface VideoItem {
  id: string;
  title: string;
  duration: string;
  thumbnail: string;
  views: string;
  category: string;
  youtubeId: string;
}

export interface WebStory {
  id: string;
  title: string;
  image: string;
  slides: number;
  category: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
}

export interface MarketItem {
  symbol: string;
  value: string;
  change: string;
  isUp: boolean;
}

export interface WeatherItem {
  city: string;
  temp: string;
  condition: string;
  humidity: string;
}

export interface LiveBlogItem {
  time: string;
  title: string;
}

export interface PodcastItem {
  id: string;
  title: string;
  duration: string;
  host: string;
  audioUrl: string;
  image: string;
}

export interface NewsDataset {
  timestamp: string;
  siteName: string;
  tagline: string;
  ticker: string[];
  marketTicker: MarketItem[];
  weatherData: WeatherItem[];
  liveBlogUpdates: LiveBlogItem[];
  categories: Category[];
  pastDates: string[];
  leadStory: Article;
  editorsPicks?: Article[];
  topStories?: Article[];
  trendingNews: Article[];
  indiaNews: Article[];
  worldNews: Article[];
  sportsNews: Article[];
  entertainmentNews: Article[];
  businessNews: Article[];
  techNews: Article[];
  allArticles: Article[];
  videos: VideoItem[];
  webStories: WebStory[];
  podcasts: PodcastItem[];
}

export function getNewsData(): NewsDataset {
  return newsData as NewsDataset;
}

export function getArticleByIdOrSlug(idOrSlug: string): Article | undefined {
  const data = getNewsData();
  return data.allArticles.find(a => a.id === idOrSlug || a.slug === idOrSlug || a.id === `art-${idOrSlug}`) || data.leadStory;
}

export function getArticlesByCategory(categorySlug: string): Article[] {
  const data = getNewsData();
  if (!categorySlug || categorySlug === 'home' || categorySlug === 'all') {
    return data.allArticles;
  }

  // Exact or contains match on the category
  const slugUpper = categorySlug.toUpperCase();
  
  return data.allArticles.filter(a => 
    a.category.toUpperCase() === slugUpper || 
    slugUpper.includes(a.category.toUpperCase()) ||
    a.category.toUpperCase().includes(slugUpper)
  );
}

export function getArticlesByDateRange(daysLimit: number, categorySlug?: string): Article[] {
  const data = getNewsData();
  let filtered = data.allArticles;

  if (categorySlug && categorySlug !== 'all') {
    const catUpper = categorySlug.toUpperCase();
    filtered = filtered.filter(a => a.category.toUpperCase().includes(catUpper));
  }

  if (daysLimit > 0) {
    const now = new Date();
    const cutoffDate = new Date(now);
    cutoffDate.setDate(cutoffDate.getDate() - daysLimit);
    
    filtered = filtered.filter(a => {
      if (!a.date) return true;
      const articleDate = new Date(a.date);
      return articleDate >= cutoffDate;
    });
  }

  return filtered;
}

// trigger reload