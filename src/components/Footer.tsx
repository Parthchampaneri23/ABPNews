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
    <footer className="bg-[#0a1d28] text-gray-400 border-t-4 border-red-600">
      
      {/* NEWSLETTER BANNER */}
      <div className="bg-gradient-to-r from-red-700 via-red-600 to-amber-600 text-white py-8 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="space-y-1 text-center md:text-left">
            <h3 className="text-xl font-extrabold tracking-tight">
              Stay Informed with Metrotimes Newsletters
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
            <button className="bg-white hover:bg-gray-100 text-red-600 text-xs font-extrabold px-5 py-2.5 rounded-lg uppercase tracking-wider transition-colors shadow-md">
              SUBSCRIBE
            </button>
          </div>
        </div>
      </div>

      {/* MAIN FOOTER LINKS */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 grid grid-cols-1 md:grid-cols-4 gap-8">
        
        {/* BRAND COL */}
        <div className="space-y-4">
          <Link href="/" className="inline-block bg-white px-3 py-2 rounded">
            <img src="/logo1.png" alt="Metrotimes" className="h-10 sm:h-12 object-contain" />
          </Link>
          <p className="text-xs text-gray-400 leading-relaxed">
            Metrotimes is India&apos;s leading digital news destination bringing real-time breaking news updates, political coverage, sports, entertainment, and ground reports.
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
          <h4 className="text-sm font-extrabold uppercase text-white tracking-wider border-b border-gray-700 pb-2">
            News Categories
          </h4>
          <ul className="grid grid-cols-2 gap-2 text-xs font-medium">
            {categories.map((cat) => (
              <li key={cat.id}>
                <Link 
                  href={cat.id === 'home' ? '/' : `/category/${cat.id}`}
                  className="hover:text-white transition-colors"
                >
                  {cat.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* NETWORK SITES */}
        <div className="space-y-3">
          <h4 className="text-sm font-extrabold uppercase text-white tracking-wider border-b border-gray-700 pb-2">
            Metrotimes Languages
          </h4>
          <ul className="space-y-2 text-xs font-medium">
            <li><a href="#" target="_blank" rel="noopener noreferrer" className="hover:text-white flex items-center justify-between"><span>Metrotimes English</span><ArrowUpRight className="w-3 h-3 text-gray-500" /></a></li>
            <li><a href="#" target="_blank" rel="noopener noreferrer" className="hover:text-white flex items-center justify-between"><span>Metrotimes Hindi</span><ArrowUpRight className="w-3 h-3 text-gray-500" /></a></li>
            <li><a href="#" target="_blank" rel="noopener noreferrer" className="hover:text-white flex items-center justify-between"><span>Metrotimes Marathi</span><ArrowUpRight className="w-3 h-3 text-gray-500" /></a></li>
            <li><a href="#" target="_blank" rel="noopener noreferrer" className="hover:text-white flex items-center justify-between"><span>Metrotimes Bengali</span><ArrowUpRight className="w-3 h-3 text-gray-500" /></a></li>
            <li><a href="#" target="_blank" rel="noopener noreferrer" className="hover:text-white flex items-center justify-between"><span>Metrotimes Gujarati</span><ArrowUpRight className="w-3 h-3 text-gray-500" /></a></li>
          </ul>
        </div>

        {/* APPS & LEGAL */}
        <div className="space-y-3">
          <h4 className="text-sm font-extrabold uppercase text-white tracking-wider border-b border-gray-700 pb-2">
            Download Metrotimes App
          </h4>
          <p className="text-xs text-gray-400">
            Get instant breaking news alerts on iOS & Android devices.
          </p>
          <div className="flex space-x-2 pt-2">
            <button className="bg-[#051118] border border-gray-700 hover:border-gray-500 px-3 py-2 rounded-lg text-xs font-semibold flex items-center space-x-2 text-white transition-colors">
              <Smartphone className="w-4 h-4 text-red-500" />
              <span>App Store</span>
            </button>
            <button className="bg-[#051118] border border-gray-700 hover:border-gray-500 px-3 py-2 rounded-lg text-xs font-semibold flex items-center space-x-2 text-white transition-colors">
              <Smartphone className="w-4 h-4 text-emerald-500" />
              <span>Google Play</span>
            </button>
          </div>
        </div>

      </div>

      {/* BOTTOM LEGAL & COPYRIGHT */}
      <div className="bg-[#051118] border-t border-gray-800 py-4 px-4 sm:px-6 text-center text-xs text-gray-500">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
          <span>&copy; 2026 Metrotimes Media Pvt. Ltd. All rights reserved.</span>
          <div className="flex space-x-4">
            <a href="#" className="hover:text-gray-300 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-gray-300 transition-colors">Terms of Use</a>
            <a href="#" className="hover:text-gray-300 transition-colors">Contact Us</a>
            <a href="#" className="hover:text-gray-300 transition-colors">Editorial Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
