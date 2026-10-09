import React from 'react';
import Link from 'next/link';
import { Article, getArticleUrl } from '@/lib/getNewsData';

interface LeadHeroProps {
  leadStory: Article;
  trendingNews: Article[];
}

export default function LeadHero({ leadStory, trendingNews }: LeadHeroProps) {
  const leftGridStories = trendingNews.slice(0, 4);
  const rightTextStories = trendingNews.slice(4, 9);

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 py-6 bg-white">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* LEFT/MAIN COLUMN (2 columns wide) */}
        <div className="lg:col-span-2">
          {/* Lead Story */}
          <Link href={getArticleUrl(leadStory)} className="group block mb-4">
            <div className="w-full aspect-[16/9] overflow-hidden mb-4">
              <img 
                src={leadStory.image} 
                alt={leadStory.title} 
                className="w-full h-full object-cover" 
              />
            </div>
            <h1 className="text-2xl sm:text-[32px] font-bold text-gray-800 group-hover:text-[#E30613] leading-tight">
              {leadStory.title}
            </h1>
          </Link>

          {/* Pagination Dots (Aesthetic to match image) */}
          <div className="flex justify-center items-center space-x-1.5 mb-8">
            <span className="w-1.5 h-1.5 rounded-full bg-gray-400"></span>
            <span className="w-8 h-1.5 rounded-full bg-gray-500"></span>
            <span className="w-1.5 h-1.5 rounded-full bg-gray-400"></span>
            <span className="w-1.5 h-1.5 rounded-full bg-gray-400"></span>
            <span className="w-1.5 h-1.5 rounded-full bg-gray-400"></span>
          </div>

          {/* Grid of smaller stories (2 columns) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-8">
            {leftGridStories.map(item => (
              <div key={item.id} className="group">
                <span className="text-[11px] font-bold text-[#E30613] uppercase tracking-wide block mb-1.5">
                  {item.category}
                </span>
                <Link href={getArticleUrl(item)} className="flex space-x-3 items-start">
                  <div className="w-[100px] h-[65px] shrink-0 overflow-hidden rounded-sm">
                    <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                  </div>
                  <h3 className="text-[15px] font-semibold text-[#004b79] group-hover:text-[#E30613] leading-snug line-clamp-3">
                    {item.title}
                  </h3>
                </Link>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT COLUMN (1 column wide) */}
        <div className="lg:col-span-1 space-y-6 lg:pl-4">
          
          {/* Text List of stories */}
          <div className="space-y-5 pt-2">
            {rightTextStories.map(item => (
              <div key={item.id} className="group">
                <span className="text-[11px] font-bold text-[#E30613] uppercase tracking-wide block mb-1">
                  {item.category}
                </span>
                <Link href={getArticleUrl(item)}>
                  <h3 className="text-[17px] font-semibold text-[#004b79] group-hover:text-[#E30613] leading-snug line-clamp-3">
                    {item.title}
                  </h3>
                </Link>
              </div>
            ))}
          </div>

          {/* TRENDING SECTION */}
          <div className="pt-4">
            {/* Orange Header */}
            <div className="bg-gradient-to-r from-orange-400 to-amber-500 py-1.5 px-3 flex items-center mb-4">
              <svg className="w-5 h-5 text-white mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
              </svg>
              <h2 className="text-white font-extrabold text-sm uppercase tracking-wider m-0 leading-none mt-0.5">
                TRENDING
              </h2>
            </div>
            
            {/* Trending List */}
            <div className="space-y-4">
              {trendingNews.slice(0, 5).map((item, index) => (
                <div key={item.id} className="flex items-start space-x-3 group border-b border-gray-100 pb-4 last:border-0 last:pb-0">
                  <span className="text-3xl font-bold text-gray-300 group-hover:text-[#E30613] transition-colors shrink-0 leading-none mt-1">
                    {index + 1}
                  </span>
                  <div className="flex-1 space-y-1">
                    <span className="text-[10px] font-bold text-[#E30613] uppercase tracking-wide">
                      {item.category}
                    </span>
                    <Link href={getArticleUrl(item)}>
                      <h3 className="text-sm font-semibold text-[#004b79] group-hover:text-[#E30613] transition-colors leading-snug line-clamp-2">
                        {item.title}
                      </h3>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
