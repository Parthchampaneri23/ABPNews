'use client';

import React from 'react';
import Link from 'next/link';
import { Globe, Smartphone, Mail, ArrowUpRight, ShieldCheck, Heart } from 'lucide-react';
import { Category } from '@/lib/getNewsData';

interface FooterProps {
  categories: Category[];
}

export default function Footer({ categories }: FooterProps) {
  return (
    <footer className="bg-gray-950 text-gray-300 border-t-4 border-red-600">
      
      {/* NEWSLETTER BANNER */}
      <div className="bg-gradient-to-r from-red-700 via-red-600 to-amber-600 text-white py-8 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="space-y-1 text-center md:text-left">
            <h3 className="text-xl font-extrabold tracking-tight">
              Stay Informed with ABP LIVE Newsletters
            </h3>
            <p className="text-xs text-red-100">
              Get top morning headlines, breaking alerts, and expert analysis delivered to your inbox.
            </p>
          </div>

          <div className="flex w-full md:w-auto max-w-md space-x-2">
            <input 
              type="email" 
              placeholder="Enter your email address" 
              className="px-4 py-2.5 rounded-lg text-xs text-gray-900 bg-white focus:outline-none flex-1 font-medium"
            />
            <button className="bg-gray-950 hover:bg-gray-900 text-white text-xs font-extrabold px-5 py-2.5 rounded-lg uppercase tracking-wider transition-colors shadow-md">
              SUBSCRIBE
            </button>
          </div>
        </div>
      </div>

      {/* MAIN FOOTER LINKS */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 grid grid-cols-1 md:grid-cols-4 gap-8">
        
        {/* BRAND COL */}
        <div className="space-y-4">
          <Link href="/" className="flex items-center space-x-3">
            <div className="flex items-center justify-center w-10 h-10 bg-red-600 rounded-lg text-white font-black text-xl shadow-md">
              ABP
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-extrabold tracking-tight text-white leading-none">
                ABP <span className="text-red-500">LIVE</span>
              </span>
              <span className="text-[10px] uppercase font-bold tracking-wider text-gray-400">
                English News Channel
              </span>
            </div>
          </Link>
          <p className="text-xs text-gray-400 leading-relaxed">
            ABP LIVE is India&apos;s leading digital news destination bringing real-time breaking news updates, political coverage, sports, entertainment, and ground reports.
          </p>
          <div className="pt-2 flex items-center space-x-3 text-xs text-gray-400">
            <span className="flex items-center space-x-1">
              <ShieldCheck className="w-4 h-4 text-emerald-500" />
              <span>Verified Publishing</span>
            </span>
          </div>
        </div>

        {/* CATEGORIES COL */}
        <div className="space-y-3">
          <h4 className="text-sm font-extrabold uppercase text-white tracking-wider border-b border-gray-800 pb-2">
            News Categories
          </h4>
          <ul className="grid grid-cols-2 gap-2 text-xs font-medium">
            {categories.map((cat) => (
              <li key={cat.id}>
                <Link 
                  href={cat.id === 'home' ? '/' : `/category/${cat.id}`}
                  className="hover:text-red-400 transition-colors"
                >
                  {cat.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* NETWORK SITES */}
        <div className="space-y-3">
          <h4 className="text-sm font-extrabold uppercase text-white tracking-wider border-b border-gray-800 pb-2">
            ABP Network Languages
          </h4>
          <ul className="space-y-2 text-xs font-medium">
            <li><a href="https://news.abplive.com" target="_blank" rel="noopener noreferrer" className="hover:text-red-400 flex items-center justify-between"><span>ABP Live English</span><ArrowUpRight className="w-3 h-3 text-gray-500" /></a></li>
            <li><a href="https://www.abplive.com" target="_blank" rel="noopener noreferrer" className="hover:text-red-400 flex items-center justify-between"><span>ABP News Hindi</span><ArrowUpRight className="w-3 h-3 text-gray-500" /></a></li>
            <li><a href="https://marathi.abplive.com" target="_blank" rel="noopener noreferrer" className="hover:text-red-400 flex items-center justify-between"><span>ABP Majha (Marathi)</span><ArrowUpRight className="w-3 h-3 text-gray-500" /></a></li>
            <li><a href="https://bengali.abplive.com" target="_blank" rel="noopener noreferrer" className="hover:text-red-400 flex items-center justify-between"><span>ABP Ananda (Bengali)</span><ArrowUpRight className="w-3 h-3 text-gray-500" /></a></li>
            <li><a href="https://gujarati.abplive.com" target="_blank" rel="noopener noreferrer" className="hover:text-red-400 flex items-center justify-between"><span>ABP Asmita (Gujarati)</span><ArrowUpRight className="w-3 h-3 text-gray-500" /></a></li>
          </ul>
        </div>

        {/* APPS & LEGAL */}
        <div className="space-y-3">
          <h4 className="text-sm font-extrabold uppercase text-white tracking-wider border-b border-gray-800 pb-2">
            Download ABP App
          </h4>
          <p className="text-xs text-gray-400">
            Get instant breaking news alerts on iOS & Android devices.
          </p>
          <div className="flex space-x-2 pt-2">
            <button className="bg-gray-900 border border-gray-800 hover:border-gray-700 px-3 py-2 rounded-lg text-xs font-semibold flex items-center space-x-2">
              <Smartphone className="w-4 h-4 text-red-500" />
              <span>App Store</span>
            </button>
            <button className="bg-gray-900 border border-gray-800 hover:border-gray-700 px-3 py-2 rounded-lg text-xs font-semibold flex items-center space-x-2">
              <Smartphone className="w-4 h-4 text-emerald-500" />
              <span>Google Play</span>
            </button>
          </div>
        </div>

      </div>

      {/* BOTTOM LEGAL & COPYRIGHT */}
      <div className="bg-gray-950 border-t border-gray-900 py-4 px-4 sm:px-6 text-center text-xs text-gray-500">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
          <span>&copy; 2026 ABP Network Pvt. Ltd. All rights reserved.</span>
          <div className="flex space-x-4">
            <a href="#" className="hover:text-gray-400">Privacy Policy</a>
            <a href="#" className="hover:text-gray-400">Terms of Use</a>
            <a href="#" className="hover:text-gray-400">Contact Us</a>
            <a href="#" className="hover:text-gray-400">Editorial Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
