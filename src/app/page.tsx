'use client';

import React, { useState } from 'react';
import Header from '@/components/Header';
import LeadHero from '@/components/LeadHero';
import NewsGrid from '@/components/NewsGrid';
import LiveBlogWidget from '@/components/LiveBlogWidget';
import ArchiveFilter from '@/components/ArchiveFilter';
import VideoSection from '@/components/VideoSection';
import WebStories from '@/components/WebStories';
import LiveTVModal from '@/components/LiveTVModal';
import SearchModal from '@/components/SearchModal';
import Footer from '@/components/Footer';
import { getNewsData, VideoItem } from '@/lib/getNewsData';

export default function HomePage() {
  const newsData = getNewsData();
  const [isLiveTVOpen, setIsLiveTVOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const handlePlayVideo = (video: VideoItem) => {
    setIsLiveTVOpen(true);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-gray-100 flex flex-col font-sans">
      
      {/* 1. HEADER & TICKER */}
      <Header 
        categories={newsData.categories}
        ticker={newsData.ticker}
        marketTicker={newsData.marketTicker}
        weatherData={newsData.weatherData}
        onOpenLiveTV={() => setIsLiveTVOpen(true)}
        onOpenSearch={() => setIsSearchOpen(true)}
      />

      {/* MAIN CONTENT */}
      <main className="flex-1 space-y-4 pb-12">
        
        {/* 2. LEAD HERO & TRENDING STORIES */}
        <LeadHero 
          leadStory={newsData.leadStory}
          trendingNews={newsData.trendingNews}
        />

        {/* 3. LIVE BLOG TIMELINE & ABP PODCASTS */}
        <LiveBlogWidget 
          updates={newsData.liveBlogUpdates}
          podcasts={newsData.podcasts}
        />

        {/* 4. INDIA NEWS SECTION */}
        <NewsGrid 
          title="India News"
          categorySlug="india"
          articles={newsData.indiaNews}
          variant="grid"
        />

        {/* 5. LAST 30 DAYS NEWS ARCHIVE FILTER */}
        <ArchiveFilter 
          categories={newsData.categories}
          allArticles={newsData.allArticles}
        />

        {/* 6. VIDEO HUB SECTION */}
        <VideoSection 
          videos={newsData.videos}
          onPlayVideo={handlePlayVideo}
        />

        {/* 7. WORLD & BUSINESS SECTIONS */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <NewsGrid 
              title="World News"
              categorySlug="world"
              articles={newsData.worldNews}
              variant="featured-left"
            />
            <NewsGrid 
              title="Business & Economy"
              categorySlug="business"
              articles={newsData.businessNews}
              variant="featured-left"
            />
          </div>
        </div>

        {/* 8. WEB STORIES SECTION */}
        <WebStories 
          stories={newsData.webStories}
        />

        {/* 9. SPORTS & ENTERTAINMENT SECTIONS */}
        <NewsGrid 
          title="Sports & Cricket"
          categorySlug="sports"
          articles={newsData.sportsNews}
          variant="grid"
        />

        <NewsGrid 
          title="Entertainment & Showbiz"
          categorySlug="entertainment"
          articles={newsData.entertainmentNews}
          variant="grid"
        />

      </main>

      {/* 10. FOOTER */}
      <Footer categories={newsData.categories} />

      {/* MODALS */}
      <LiveTVModal 
        isOpen={isLiveTVOpen}
        onClose={() => setIsLiveTVOpen(false)}
      />

      <SearchModal 
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        articles={newsData.allArticles}
      />

    </div>
  );
}
