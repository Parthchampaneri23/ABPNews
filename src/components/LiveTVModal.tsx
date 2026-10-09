'use client';

import React from 'react';
import { X, Tv, Volume2, ShieldCheck, Radio, Play, Users, MessageSquare } from 'lucide-react';

interface LiveTVModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function LiveTVModal({ isOpen, onClose }: LiveTVModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 animate-fadeIn">
      <div className="bg-gray-900 border border-gray-800 rounded-2xl w-full max-w-4xl overflow-hidden shadow-2xl text-white">
        
        {/* MODAL HEADER */}
        <div className="bg-gray-950 px-6 py-4 flex items-center justify-between border-b border-gray-800">
          <div className="flex items-center space-x-3">
            <div className="flex items-center space-x-2 bg-red-600 text-white text-xs font-black px-3 py-1 rounded-full uppercase tracking-wider">
              <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
              <span>Metrotimes TV 24x7</span>
            </div>
            <span className="text-xs text-gray-400 font-medium hidden sm:inline">
              Non-Stop Live Coverage & News Broadcast
            </span>
          </div>

          <button 
            onClick={onClose}
            className="p-1 text-gray-400 hover:text-white hover:bg-gray-800 rounded-lg transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* EMBEDDED PLAYER / STREAM CONTAINER */}
        <div className="relative aspect-[16/9] w-full bg-black">
          <iframe 
            src="https://www.youtube-nocookie.com/embed/live_stream?channel=UC9k-yiEpRHMNVOnOi_aQK8w&autoplay=1&mute=0" 
            title="Metrotimes Live Broadcast Stream"
            className="w-full h-full border-0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>

        {/* LIVE STREAM FOOTER */}
        <div className="p-4 sm:p-6 bg-gray-950 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-gray-800">
          <div className="space-y-1 text-center sm:text-left">
            <div className="flex items-center justify-center sm:justify-start space-x-2">
              <Radio className="w-4 h-4 text-red-500 animate-pulse" />
              <h4 className="text-sm font-bold text-white">
                Metrotimes English Live Broadcast
              </h4>
            </div>
            <p className="text-xs text-gray-400">
              Live updates on National Politics, Economy, International Affairs & Sports
            </p>
          </div>

          <div className="flex items-center space-x-3 text-xs font-semibold">
            <span className="flex items-center space-x-1.5 bg-gray-800 text-gray-300 px-3 py-1.5 rounded-lg border border-gray-700">
              <Users className="w-4 h-4 text-amber-400" />
              <span>142,500 Viewers Live</span>
            </span>
            <button 
              onClick={onClose}
              className="bg-red-600 hover:bg-red-700 text-white px-4 py-1.5 rounded-lg font-bold transition-colors"
            >
              Close Stream
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
