'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  Tv, Search, Menu, X, Globe, Smartphone, ChevronRight, 
  Pause, Play, Flame, Sun, ArrowUpRight, ArrowDownRight,
  MoreHorizontal
} from 'lucide-react';
import { Category, MarketItem, WeatherItem } from '@/lib/getNewsData';

interface HeaderProps {
  categories: Category[];
  ticker: string[];
  marketTicker: MarketItem[];
  weatherData: WeatherItem[];
  onOpenLiveTV: () => void;
  onOpenSearch: () => void;
  activeCategory?: string;
  onSelectCategory?: (id: string) => void;
}

import { useRouter, usePathname } from 'next/navigation';

export default function Header({ categories, ticker, marketTicker, weatherData, onOpenLiveTV, onOpenSearch, activeCategory = '', onSelectCategory }: HeaderProps) {
  const router = useRouter();
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [currentLang, setCurrentLang] = useState('English');
  const [tickerPaused, setTickerPaused] = useState(false);
  const [currentDate, setCurrentDate] = useState('');
  const [selectedCityIdx, setSelectedCityIdx] = useState(0);
  const [megaMenuOpen, setMegaMenuOpen] = useState(false);

  const handleCategorySelect = (id: string) => {
    if (onSelectCategory) {
      onSelectCategory(id);
    } else {
      router.push('/');
    }
  };

  const [currentDateTime, setCurrentDateTime] = useState('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const options: Intl.DateTimeFormatOptions = { 
        weekday: 'long', year: 'numeric', month: 'long', day: 'numeric',
        hour: '2-digit', minute: '2-digit', second: '2-digit'
      };
      setCurrentDateTime(now.toLocaleString('en-US', options));
    };
    updateTime(); // initial call
    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  const languages = ['English', 'हिंदी', 'मराठी', 'বাংলা', 'ગુજરાતી', 'ਪੰਜਾਬੀ', 'தமிழ்', 'తెలుగు'];

  return (
    <header className="w-full bg-white border-b border-gray-200 shadow-sm sticky top-0 z-40 transition-colors">
      
      {/* 1. TOP UTILITY BAR */}
      <div className="bg-[#051118] text-gray-300 py-1.5 px-4 sm:px-6 flex items-center justify-end text-[11px] font-medium tracking-wide">
        <div className="flex items-center space-x-2">
          <span>{currentDateTime}</span>
        </div>
      </div>

      {/* 2. MAIN NAVBAR */}
      <div className="bg-white px-4 sm:px-6 py-3 flex items-center justify-between shadow-sm relative">
        <div className="flex items-center">
          {/* Mobile Menu Toggle */}
          <button 
            className="lg:hidden p-1 mr-3 text-gray-700"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>

          {/* LOGO */}
          <Link href="/" className="shrink-0 flex items-center mr-8">
            <img src="/logo1.png" alt="Metrotimes" className="h-9 sm:h-16 object-contain" />
          </Link>

          {/* Desktop Categories */}
          <div className="hidden lg:flex items-center space-x-6">
            {categories.map((cat) => {
              const isActive = pathname === cat.slug;
              return (
                <Link
                  key={cat.id}
                  href={cat.slug}
                  className={`text-[13px] font-bold uppercase tracking-wide transition-colors ${isActive ? 'text-[#E30613]' : 'text-[#005187] hover:text-[#E30613]'}`}
                >
                  {cat.name}
                </Link>
              );
            })}
          </div>
        </div>

        {/* SEARCH BUTTON */}
        <div className="flex items-center space-x-3 shrink-0 ml-4">
          <button 
            onClick={onOpenSearch}
            className="flex items-center space-x-2 bg-gray-100 hover:bg-gray-200 px-3 py-1.5 rounded-full text-xs font-medium text-gray-700 border border-gray-200 transition-colors"
          >
            <Search className="w-4 h-4 text-[#E30613]" />
            <span className="hidden sm:inline">Search...</span>
          </button>
        </div>
      </div>

      {/* SUB-NAVBAR HAS BEEN REMOVED */}

      {/* 4. BREAKING NEWS TICKER */}
      <div className="bg-gray-100 border-b border-gray-200 text-xs py-2 px-4 flex items-center overflow-hidden">
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
        >
          {tickerPaused ? <Play className="w-3.5 h-3.5" /> : <Pause className="w-3.5 h-3.5" />}
        </button>
      </div>

      {/* MEGA MENU HAS BEEN REMOVED */}

      {/* MOBILE DRAWER */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white text-gray-900 px-4 py-4 space-y-3 border-b border-gray-200 shadow-xl animate-fadeIn absolute w-full left-0 top-full z-50">
          <div className="grid grid-cols-2 gap-2 text-sm">
            {categories.map((cat) => {
              const isActive = pathname === cat.slug;
              return (
                <Link
                  key={cat.id}
                  href={cat.slug}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`px-3 py-2 rounded font-semibold capitalize text-center transition-colors ${
                    isActive 
                      ? 'bg-red-50 text-[#E30613] border border-red-200' 
                      : 'bg-gray-100 text-gray-800 hover:bg-red-600 hover:text-white'
                  }`}
                >
                  {cat.name}
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </header>
  );
}
