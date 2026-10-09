'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Search, X, Clock, ArrowRight } from 'lucide-react';
import { Article, getArticleUrl } from '@/lib/getNewsData';

interface SearchModalProps {
 isOpen: boolean;
 onClose: () => void;
 articles: Article[];
}

export default function SearchModal({ isOpen, onClose, articles }: SearchModalProps) {
 const [query, setQuery] = useState('');

 if (!isOpen) return null;

 const filtered = query.trim() === '' 
 ? articles.slice(0, 6)
 : articles.filter(a => 
 a.title.toLowerCase().includes(query.toLowerCase()) || 
 a.category.toLowerCase().includes(query.toLowerCase()) ||
 a.summary.toLowerCase().includes(query.toLowerCase())
 );

 return (
 <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-start justify-center pt-16 px-4 animate-fadeIn">
 <div className="bg-white rounded-2xl w-full max-w-2xl overflow-hidden shadow-2xl border border-gray-200 ">
 
 {/* SEARCH INPUT */}
 <div className="p-4 border-b border-gray-200 flex items-center space-x-3 bg-gray-50 ">
 <Search className="w-5 h-5 text-red-600 shrink-0" />
 <input 
 type="text"
 value={query}
 onChange={(e) => setQuery(e.target.value)}
 placeholder="Search breaking news, cricket, politics, tech..."
 autoFocus
 className="w-full bg-transparent text-sm sm:text-base font-semibold text-gray-900 focus:outline-none placeholder-gray-400"
 />
 {query && (
 <button onClick={() => setQuery('')} className="text-gray-400 hover:text-gray-600">
 <X className="w-4 h-4" />
 </button>
 )}
 <button 
 onClick={onClose}
 className="text-xs font-bold text-gray-500 hover:text-gray-900 bg-gray-200 px-2.5 py-1 rounded-md"
 >
 ESC
 </button>
 </div>

 {/* RESULTS CONTAINER */}
 <div className="max-h-[60vh] overflow-y-auto p-4 space-y-3">
 <div className="flex items-center justify-between text-xs font-bold text-gray-500 uppercase tracking-wider pb-1">
 <span>{query ? `Search Results (${filtered.length})` : 'Popular / Recent News'}</span>
 </div>

 {filtered.length === 0 ? (
 <div className="py-8 text-center text-gray-500 text-sm">
 No news articles found matching &quot;{query}&quot;. Try searching for &quot;India&quot;, &quot;Cricket&quot;, or &quot;Business&quot;.
 </div>
 ) : (
 filtered.map((item) => (
 <Link 
 key={item.id}
 href={getArticleUrl(item)}
 onClick={onClose}
 className="flex items-start space-x-3 p-2.5 rounded-xl hover:bg-gray-100 transition-colors group"
 >
 <div className="w-16 h-12 rounded-lg overflow-hidden shrink-0 bg-gray-200 ">
 <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
 </div>
 <div className="flex-1 min-w-0">
 <span className="text-[10px] font-bold text-red-600 uppercase tracking-wide">
 {item.category}
 </span>
 <h4 className="text-xs sm:text-sm font-bold text-gray-900 group-hover:text-red-600 transition-colors line-clamp-2 leading-snug">
 {item.title}
 </h4>
 <span className="text-[11px] text-gray-400 flex items-center space-x-1 pt-0.5">
 <Clock className="w-3 h-3 text-gray-400" />
 <span>{item.time}</span>
 </span>
 </div>
 </Link>
 ))
 )}
 </div>

 </div>
 </div>
 );
}
