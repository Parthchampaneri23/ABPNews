'use client';

import React, { useState } from 'react';
import { Play, Tv, Eye, Clock, Video } from 'lucide-react';
import { VideoItem } from '@/lib/getNewsData';

interface VideoSectionProps {
  videos: VideoItem[];
  onPlayVideo: (video: VideoItem) => void;
}

export default function VideoSection({ videos, onPlayVideo }: VideoSectionProps) {
  if (!videos || videos.length === 0) return null;

  return (
    <section className="bg-gray-950 text-white py-10 my-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* HEADER */}
        <div className="flex items-center justify-between pb-4 mb-6 border-b border-gray-800">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-red-600 rounded-lg shadow-md">
              <Video className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-black uppercase tracking-wider text-white">
                Metrotimes VIDEOS
              </h2>
              <p className="text-xs text-gray-400">Exclusive Video Reports, Discussions & Ground News</p>
            </div>
          </div>
          <span className="hidden sm:inline-flex items-center space-x-2 text-xs font-bold text-red-500 bg-red-950/60 px-3 py-1 rounded-full border border-red-900">
            <span className="w-2 h-2 rounded-full bg-red-500 animate-ping" />
            <span>VIDEO HUB</span>
          </span>
        </div>

        {/* VIDEOS GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {videos.map((item) => (
            <div 
              key={item.id}
              onClick={() => onPlayVideo(item)}
              className="bg-gray-900 rounded-xl overflow-hidden border border-gray-800 hover:border-red-600 transition-all duration-300 group cursor-pointer shadow-lg hover:-translate-y-1"
            >
              <div className="relative aspect-[16/9] overflow-hidden bg-gray-950">
                <img 
                  src={item.thumbnail} 
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 opacity-90 group-hover:opacity-100"
                />
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors" />

                {/* PLAY BUTTON BADGE */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-12 h-12 bg-red-600 text-white rounded-full flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform duration-300">
                    <Play className="w-6 h-6 fill-current ml-0.5" />
                  </div>
                </div>

                {/* DURATION BADGE */}
                <span className="absolute bottom-2 right-2 bg-black/80 text-white text-[10px] font-bold px-2 py-0.5 rounded">
                  {item.duration}
                </span>

                {/* CATEGORY BADGE */}
                <span className="absolute top-2 left-2 bg-red-600 text-white text-[9px] font-bold px-2 py-0.5 rounded uppercase tracking-wider">
                  {item.category}
                </span>
              </div>

              <div className="p-4 space-y-2">
                <h3 className="text-xs sm:text-sm font-bold text-gray-100 group-hover:text-red-400 transition-colors line-clamp-2 leading-snug">
                  {item.title}
                </h3>

                <div className="flex items-center justify-between text-[11px] text-gray-400 pt-1">
                  <span className="flex items-center space-x-1">
                    <Eye className="w-3.5 h-3.5 text-gray-500" />
                    <span>{item.views}</span>
                  </span>
                  <span className="text-red-500 font-semibold group-hover:underline">Watch &rarr;</span>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
