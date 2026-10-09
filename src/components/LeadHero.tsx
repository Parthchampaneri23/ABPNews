'use client';

import React from 'react';
import Link from 'next/link';
import { Clock, TrendingUp, ChevronRight, Flame } from 'lucide-react';
import { Article } from '@/lib/getNewsData';

interface LeadHeroProps {
  leadStory: Article;
  trendingNews: Article[];
}

export default function LeadHero({ leadStory, trendingNews }: LeadHeroProps) {
  const topTrending = trendingNews.slice(0, 5);

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* LEFT MAIN FEATURED HERO (8 Columns - Light Card) */}
        <div className="lg:col-span-8 bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-200 group">
          <div className="relative w-full aspect-[16/9] sm:aspect-[21/10] overflow-hidden bg-gray-900">
            <img 
              src={leadStory.image} 
              alt={leadStory.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
            
            {/* BADGES */}
            <div className="absolute top-4 left-4 flex items-center space-x-2">
              <span className="bg-[#E30613] text-white font-extrabold text-xs px-3 py-1 rounded-full uppercase tracking-wider shadow-md">
                {leadStory.category || 'TOP STORY'}
              </span>
              <span className="bg-amber-400 text-gray-950 font-bold text-xs px-2.5 py-1 rounded-full flex items-center space-x-1 shadow-md">
                <Flame className="w-3 h-3 fill-current" />
                <span>BREAKING</span>
              </span>
            </div>

            {/* OVERLAY CONTENT */}
            <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 text-white space-y-2">
              <div className="flex items-center space-x-3 text-xs text-gray-200">
                <span className="flex items-center space-x-1 font-semibold">
                  <Clock className="w-3.5 h-3.5 text-amber-400" />
                  <span>{leadStory.time}</span>
                </span>
                <span>•</span>
                <span className="font-bold text-amber-300">{leadStory.author}</span>
                <span>•</span>
                <span>{leadStory.readTime}</span>
              </div>

              <Link href={`/article/${leadStory.id}`}>
                <h1 className="text-xl sm:text-2xl md:text-3xl font-extrabold leading-tight hover:text-amber-300 transition-colors line-clamp-3 text-white">
                  {leadStory.title}
                </h1>
              </Link>

              <p className="hidden sm:block text-xs sm:text-sm text-gray-200 line-clamp-2 leading-relaxed">
                {leadStory.summary}
              </p>

              <div className="pt-2 flex items-center justify-between">
                <Link 
                  href={`/article/${leadStory.id}`}
                  className="inline-flex items-center space-x-1.5 text-xs font-bold text-white bg-[#E30613] hover:bg-red-700 px-4 py-2 rounded-lg transition-colors shadow-md"
                >
                  <span>READ FULL STORY</span>
                  <ChevronRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT TRENDING SIDEBAR (4 Columns - Light Card) */}
        <div className="lg:col-span-4 bg-white rounded-2xl p-4 sm:p-5 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between pb-3 mb-4 border-b border-gray-200">
            <div className="flex items-center space-x-2">
              <div className="p-1.5 bg-red-100 rounded-md">
                <TrendingUp className="w-5 h-5 text-[#E30613]" />
              </div>
              <h2 className="text-base font-extrabold text-gray-900 uppercase tracking-wider">
                Trending Headlines
              </h2>
            </div>
            <span className="text-xs font-bold text-[#E30613] bg-red-50 px-2 py-0.5 rounded border border-red-200">
              LIVE
            </span>
          </div>

          <div className="space-y-3">
            {topTrending.map((item, index) => (
              <div key={item.id} className="flex items-start space-x-3 group border-b border-gray-100 pb-3 last:border-0 last:pb-0">
                <span className="text-2xl font-black text-[#E30613]/30 group-hover:text-[#E30613] transition-colors w-6 shrink-0 leading-none">
                  0{index + 1}
                </span>

                <div className="flex-1 space-y-1">
                  <span className="text-[10px] font-bold text-[#E30613] uppercase tracking-wide">
                    {item.category}
                  </span>
                  <Link href={`/article/${item.id}`}>
                    <h3 className="text-xs sm:text-sm font-bold text-gray-900 group-hover:text-[#E30613] transition-colors leading-snug line-clamp-2">
                      {item.title}
                    </h3>
                  </Link>
                  <span className="text-[11px] text-gray-500 block pt-0.5">
                    {item.time}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
