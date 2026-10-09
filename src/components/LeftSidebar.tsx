import React from 'react';
import Link from 'next/link';
import { 
  LayoutGrid, Tv, Video, Trophy, 
  PlaySquare, Image as ImageIcon, Podcast, Film, MessageSquare
} from 'lucide-react';

export default function LeftSidebar() {
  const menuItems = [
    { icon: Tv, label: 'Live TV' },
    { icon: Video, label: 'Video' },
    { icon: Trophy, label: 'Sports' },
    { icon: PlaySquare, label: 'Short Video' },
    { icon: LayoutGrid, label: 'Web Stories' },
    { icon: ImageIcon, label: 'Photo Gallery' },
    { icon: Podcast, label: 'Podcasts' },
    { icon: Film, label: 'Movie Review' },
    { icon: MessageSquare, label: 'Opinion' },
  ];

  return (
    <aside className="w-24 shrink-0 hidden xl:flex flex-col items-center py-6 bg-gray-50  border-r border-gray-200  h-full min-h-screen sticky top-[132px] z-10 self-start">
      
      <div className="flex flex-col items-center mb-8 group cursor-pointer">
        <div className="w-12 h-12 bg-[#E30613] rounded-full flex items-center justify-center mb-2 shadow-md group-hover:bg-red-700 transition-colors">
          <LayoutGrid className="w-5 h-5 text-white" />
        </div>
        <span className="text-[10px] font-bold text-[#E30613] uppercase tracking-wider text-center">
          Explore
        </span>
      </div>

      <div className="flex flex-col space-y-6 w-full px-2">
        {menuItems.map((item, idx) => (
          <Link key={idx} href="#" className="flex flex-col items-center group">
            <div className="w-10 h-10 rounded-full flex items-center justify-center bg-white  border border-gray-200  mb-1.5 shadow-sm group-hover:border-[#E30613] group-hover:text-[#E30613] transition-colors">
              <item.icon className="w-4 h-4 text-gray-700  group-hover:text-[#E30613] transition-colors" />
            </div>
            <span className="text-[10px] font-semibold text-gray-600  group-hover:text-[#E30613] text-center leading-tight">
              {item.label}
            </span>
          </Link>
        ))}
      </div>
    </aside>
  );
}
