'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  Tv, Search, Menu, X, Globe, Smartphone, ChevronRight, 
  Pause, Play, Flame, Sun, ArrowUpRight, ArrowDownRight
} from 'lucide-react';
import { Category, MarketItem, WeatherItem } from '@/lib/getNewsData';

interface HeaderProps {
  categories: Category[];
  ticker: string[];
  marketTicker: MarketItem[];
  weatherData: WeatherItem[];
  onOpenLiveTV: () => void;
  onOpenSearch: () => void;
}

export default function Header({ categories, ticker, marketTicker, weatherData, onOpenLiveTV, onOpenSearch }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [currentLang, setCurrentLang] = useState('English');
  const [tickerPaused, setTickerPaused] = useState(false);
  const [currentDate, setCurrentDate] = useState('');
  const [selectedCityIdx, setSelectedCityIdx] = useState(0);

  useEffect(() => {
    const now = new Date();
    const options: Intl.DateTimeFormatOptions = { 
      weekday: 'long', year: 'numeric', month: 'short', day: 'numeric' 
    };
    setCurrentDate(now.toLocaleDateString('en-US', options));
  }, []);

  const languages = ['English', 'हिंदी', 'मराठी', 'বাংলা', 'ગુજરાતી', 'ਪੰਜਾਬੀ', 'தமிழ்', 'తెలుగు'];

  return (
    <header className="w-full bg-white border-b border-gray-200 shadow-sm sticky top-0 z-40">
      
      {/* 1. TOP UTILITY BAR (Charcoal #1A1A1A background with light text) */}
      <div className="bg-[#1A1A1A] text-gray-200 text-xs py-1.5 px-4 sm:px-6 flex flex-wrap items-center justify-between border-b border-gray-800 gap-2">
        
        {/* Left: Date & Weather */}
        <div className="flex items-center space-x-4">
          <span className="hidden sm:inline font-semibold text-gray-300">{currentDate}</span>
          
          {/* Weather Selector */}
          <div className="flex items-center space-x-1 bg-gray-800 border border-gray-700 px-2 py-0.5 rounded-full text-[11px]">
            <Sun className="w-3 h-3 text-amber-400" />
            <select 
              value={selectedCityIdx}
              onChange={(e) => setSelectedCityIdx(Number(e.target.value))}
              className="bg-transparent text-gray-200 font-semibold focus:outline-none cursor-pointer"
            >
              {weatherData.map((w, idx) => (
                <option key={w.city} value={idx} className="bg-gray-900 text-white">
                  {w.city}: {w.temp}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Center: Live Stock Market Ticker */}
        <div className="hidden lg:flex items-center space-x-4 text-[11px] font-semibold border-x border-gray-800 px-4">
          {marketTicker.map((item) => (
            <div key={item.symbol} className="flex items-center space-x-1.5">
              <span className="text-gray-400 uppercase">{item.symbol}:</span>
              <span className="text-white font-bold">{item.value}</span>
              <span className={`flex items-center text-[10px] font-bold ${item.isUp ? 'text-emerald-400' : 'text-red-400'}`}>
                {item.isUp ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                {item.change}
              </span>
            </div>
          ))}
        </div>

        {/* Right: Language Selector & Live TV */}
        <div className="flex items-center space-x-3">
          <div className="flex items-center space-x-1">
            <Globe className="w-3.5 h-3.5 text-red-500" />
            <select 
              value={currentLang}
              onChange={(e) => setCurrentLang(e.target.value)}
              className="bg-transparent text-gray-200 font-medium focus:outline-none cursor-pointer hover:text-white"
            >
              {languages.map((lang) => (
                <option key={lang} value={lang} className="bg-gray-900 text-white">
                  {lang}
                </option>
              ))}
            </select>
          </div>

          <button 
            onClick={onOpenLiveTV}
            className="flex items-center space-x-1.5 bg-[#E30613] hover:bg-red-700 text-white px-3 py-0.5 rounded-full font-bold text-xs transition-all shadow-sm"
          >
            <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
            <Tv className="w-3.5 h-3.5" />
            <span>LIVE TV</span>
          </button>
        </div>
      </div>

      {/* 2. MAIN LOGO & SEARCH HEADER (PURE WHITE BACKGROUND) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between bg-white">
        {/* Mobile Hamburger Toggle */}
        <button 
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden p-2 rounded-md text-gray-700 hover:bg-gray-100"
          aria-label="Toggle Navigation Menu"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>

        {/* ABP LIVE BRAND LOGO */}
        <Link href="/" className="flex items-center space-x-3 group">
          <div className="relative flex items-center justify-center w-11 h-11 bg-gradient-to-tr from-[#E30613] via-[#C4040F] to-amber-500 rounded-lg shadow-md group-hover:scale-105 transition-transform duration-200">
            <span className="text-white font-black text-xl tracking-tighter">ABP</span>
            <div className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-amber-400 rounded-full border-2 border-white shadow-sm" />
          </div>
          <div className="flex flex-col">
            <span className="text-2xl font-black tracking-tight text-gray-900 leading-none">
              ABP <span className="text-[#E30613]">LIVE</span>
            </span>
            <span className="text-[10px] uppercase font-bold tracking-wider text-gray-500">
              English News
            </span>
          </div>
        </Link>

        {/* SEARCH & ACTION BUTTONS */}
        <div className="flex items-center space-x-3">
          <button 
            onClick={onOpenSearch}
            className="flex items-center space-x-2 bg-gray-100 hover:bg-gray-200 px-3.5 py-2 rounded-full text-xs font-medium text-gray-700 border border-gray-200 transition-colors"
          >
            <Search className="w-4 h-4 text-[#E30613]" />
            <span className="hidden sm:inline">Search breaking news, keywords...</span>
          </button>

          <button 
            onClick={onOpenLiveTV}
            className="hidden md:flex items-center space-x-2 border-2 border-[#E30613] text-[#E30613] hover:bg-[#E30613] hover:text-white px-3.5 py-1.5 rounded-full text-xs font-bold transition-all"
          >
            <Tv className="w-4 h-4" />
            <span>WATCH LIVE</span>
          </button>
        </div>
      </div>

      {/* 3. NAVIGATION BAR (ABP RED #E30613) */}
      <nav className="bg-[#E30613] text-white shadow-md hidden lg:block">
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-between">
          <div className="flex items-center space-x-1 overflow-x-auto py-1">
            <Link 
              href="/"
              className="px-3.5 py-2 rounded text-sm font-bold hover:bg-red-800 transition-colors uppercase tracking-wider"
            >
              Home
            </Link>

            {categories.map((cat) => (
              <Link
                key={cat.id}
                href={cat.id === 'home' ? '/' : `/category/${cat.id}`}
                className="px-3 py-2 rounded text-xs font-bold hover:bg-red-800 transition-colors uppercase tracking-wider text-gray-100 hover:text-white"
              >
                {cat.name}
              </Link>
            ))}
          </div>

          <div className="flex items-center space-x-2 text-xs font-bold bg-red-900/60 px-3 py-1.5 rounded-md">
            <Flame className="w-3.5 h-3.5 text-amber-300 animate-bounce" />
            <span className="text-amber-200 uppercase tracking-wide">Trending</span>
          </div>
        </div>
      </nav>

      {/* 4. BREAKING NEWS TICKER (LIGHT GRAY BACKGROUND) */}
      <div className="bg-gray-100 border-t border-b border-gray-200 text-xs py-2 px-4 flex items-center overflow-hidden">
        <div className="flex items-center space-x-2 shrink-0 bg-[#E30613] text-white px-2.5 py-1 rounded font-extrabold uppercase tracking-wider mr-3 z-10 shadow-sm">
          <span className="w-2 h-2 rounded-full bg-white animate-ping" />
          <span>BREAKING NEWS</span>
        </div>

        <div className="relative overflow-hidden w-full h-5 flex items-center">
          <div className={`whitespace-nowrap flex space-x-8 ${tickerPaused ? '' : 'animate-ticker'}`}>
            {ticker.concat(ticker).map((item, index) => (
              <span key={index} className="inline-flex items-center text-gray-900 font-semibold">
                {item}
                <span className="mx-4 text-red-600 font-black">•</span>
              </span>
            ))}
          </div>
        </div>

        <button 
          onClick={() => setTickerPaused(!tickerPaused)}
          className="shrink-0 ml-2 p-1 text-gray-500 hover:text-gray-900"
          title={tickerPaused ? "Resume Ticker" : "Pause Ticker"}
        >
          {tickerPaused ? <Play className="w-3.5 h-3.5" /> : <Pause className="w-3.5 h-3.5" />}
        </button>
      </div>

      {/* MOBILE DRAWER */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white text-gray-900 px-4 py-4 space-y-3 border-b border-gray-200 shadow-xl animate-fadeIn">
          <div className="flex items-center justify-between pb-2 border-b border-gray-200">
            <span className="font-extrabold text-[#E30613] text-sm tracking-wider uppercase">Menu Categories</span>
            <button onClick={() => setMobileMenuOpen(false)} className="text-gray-500">
              <X className="w-5 h-5" />
            </button>
          </div>
          <div className="grid grid-cols-2 gap-2 text-sm">
            <Link 
              href="/"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded bg-gray-100 hover:bg-red-600 hover:text-white font-semibold text-gray-900"
            >
              Home
            </Link>
            {categories.map((cat) => (
              <Link
                key={cat.id}
                href={cat.id === 'home' ? '/' : `/category/${cat.id}`}
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 rounded bg-gray-100 hover:bg-red-600 hover:text-white font-semibold text-gray-800 capitalize"
              >
                {cat.name}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
