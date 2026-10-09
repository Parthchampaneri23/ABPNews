'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Calendar, Filter, Clock, ChevronRight } from 'lucide-react';
import { Article, Category, getArticleUrl } from '@/lib/getNewsData';

interface ArchiveFilterProps {
  categories: Category[];
  allArticles: Article[];
}

export default function ArchiveFilter({ categories, allArticles }: ArchiveFilterProps) {
  const [selectedDays, setSelectedDays] = useState<number>(30);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const filteredArticles = allArticles.filter((item) => {
    // category filter
    if (selectedCategory !== 'all' && !item.category.toLowerCase().includes(selectedCategory.toLowerCase())) {
      return false;
    }
    // date filter
    if (selectedDays > 0 && item.date) {
      const now = new Date();
      const cutoff = new Date(now);
      cutoff.setDate(cutoff.getDate() - selectedDays);
      const itemDate = new Date(item.date);
      if (itemDate < cutoff) return false;
    }
    return true;
  });

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
      
      {/* FILTER HEADER & CONTROL BAR */}
      <div className="bg-white dark:bg-gray-900 p-5 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-gray-100 dark:border-gray-800">
          <div className="flex items-center space-x-2">
            <div className="p-1.5 bg-red-600 text-white rounded-md">
              <Calendar className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-extrabold text-gray-900 dark:text-white uppercase tracking-wider">
                News Archive & Date Range Filter (Last 30 Days)
              </h3>
              <p className="text-xs text-gray-500">Filter news coverage from today back to the last 30 days</p>
            </div>
          </div>

          <span className="text-xs font-bold text-red-600 bg-red-50 dark:bg-red-950/60 px-3 py-1 rounded-full border border-red-200 dark:border-red-900 self-start sm:self-auto">
            {filteredArticles.length} Articles Available
          </span>
        </div>

        {/* CONTROL CONTROLS */}
        <div className="flex flex-wrap items-center gap-3 pt-1">
          <div className="flex items-center space-x-1 text-xs font-bold text-gray-500">
            <Filter className="w-4 h-4 text-red-600" />
            <span>Time Period:</span>
          </div>

          {[
            { label: 'All Time', days: 0 },
            { label: 'Today', days: 1 },
            { label: 'Last 7 Days', days: 7 },
            { label: 'Last 15 Days', days: 15 },
            { label: 'Last 30 Days', days: 30 }
          ].map((range) => (
            <button
              key={range.days}
              onClick={() => setSelectedDays(range.days)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                selectedDays === range.days
                  ? 'bg-red-600 text-white shadow-md'
                  : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
              }`}
            >
              {range.label}
            </button>
          ))}

          {/* Category Dropdown */}
          <div className="ml-auto flex items-center space-x-2">
            <span className="text-xs font-bold text-gray-500">Category:</span>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 font-semibold text-xs px-3 py-1.5 rounded-lg border border-gray-200 dark:border-gray-700 focus:outline-none cursor-pointer"
            >
              <option value="all">All Categories</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* FILTERED RESULTS GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 pt-6">
        {filteredArticles.slice(0, 6).map((item) => (
          <div 
            key={item.id}
            className="bg-white dark:bg-gray-900 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow border border-gray-100 dark:border-gray-800 flex flex-col group"
          >
            <div className="relative aspect-[16/10] overflow-hidden bg-gray-100 dark:bg-gray-800">
              <img src={item.image} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
              <span className="absolute top-3 left-3 bg-red-600 text-white font-bold text-[10px] px-2 py-0.5 rounded uppercase tracking-wider">
                {item.category}
              </span>
              {item.date && (
                <span className="absolute bottom-3 right-3 bg-black/80 text-white font-medium text-[10px] px-2 py-0.5 rounded">
                  {item.date}
                </span>
              )}
            </div>

            <div className="p-4 flex-1 flex flex-col justify-between space-y-2">
              <div className="space-y-1.5">
                <span className="text-[11px] text-gray-500 dark:text-gray-400 flex items-center space-x-1">
                  <Clock className="w-3 h-3 text-red-500" />
                  <span>{item.time}</span>
                </span>
                <Link href={getArticleUrl(item)}>
                  <h4 className="text-sm font-bold text-gray-900 dark:text-white group-hover:text-red-600 transition-colors line-clamp-2 leading-snug">
                    {item.title}
                  </h4>
                </Link>
              </div>

              <div className="pt-2 border-t border-gray-100 dark:border-gray-800 flex items-center justify-between text-xs">
                <span className="font-semibold text-gray-600 dark:text-gray-400">{item.author}</span>
                <Link href={getArticleUrl(item)} className="text-red-600 font-bold hover:underline">
                  Read &rarr;
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>

    </section>
  );
}
