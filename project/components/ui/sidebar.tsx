'use client';

import { useState } from 'react';
import { cn } from '@/lib/utils';
import { navigationItems } from '@/data/navigation';
import * as Icons from 'lucide-react';

interface SidebarProps {
  className?: string;
  currentPage?: string;
  onNavigate?: (href: string) => void;
}

export function Sidebar({ className, currentPage = '/teachers', onNavigate }: SidebarProps) {
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);

  const handleNavigation = (href: string) => {
    if (onNavigate) {
      onNavigate(href);
    }
  };

  return (
    <div className={cn("w-64 bg-slate-900 text-white flex flex-col", className)}>
      {/* Logo/Header */}
      <div className="p-6 border-b border-slate-700">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
            <Icons.GraduationCap className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold">EduManage</h1>
            <p className="text-xs text-slate-400">Teacher Portal</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 py-6 space-y-2">
        {navigationItems.map((item) => {
          const IconComponent = Icons[item.icon as keyof typeof Icons] as React.ComponentType<any>;
          const isActive = currentPage === item.href;
          const isHovered = hoveredItem === item.id;

          return (
            <button
              key={item.id}
              onClick={() => handleNavigation(item.href)}
              onMouseEnter={() => setHoveredItem(item.id)}
              onMouseLeave={() => setHoveredItem(null)}
              className={cn(
                "w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-left transition-all duration-200",
                isActive 
                  ? "bg-blue-600 text-white shadow-lg" 
                  : isHovered
                  ? "bg-slate-800 text-white"
                  : "text-slate-300 hover:text-white"
              )}
            >
              <div className="flex items-center space-x-3">
                <IconComponent className={cn(
                  "w-5 h-5 transition-colors",
                  isActive ? "text-white" : "text-slate-400"
                )} />
                <span className="font-medium">{item.label}</span>
              </div>
              
              {item.badge && (
                <span className={cn(
                  "px-2 py-1 text-xs font-semibold rounded-full",
                  isActive 
                    ? "bg-blue-500 text-white" 
                    : "bg-slate-700 text-slate-300"
                )}>
                  {item.badge}
                </span>
              )}
            </button>
          );
        })}
      </nav>

      {/* User Profile */}
      <div className="p-4 border-t border-slate-700">
        <div className="flex items-center space-x-3 p-3 rounded-lg bg-slate-800 hover:bg-slate-700 transition-colors cursor-pointer">
          <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
            <Icons.User className="w-4 h-4 text-white" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-white truncate">Admin User</p>
            <p className="text-xs text-slate-400 truncate">admin@edumanage.com</p>
          </div>
          <Icons.ChevronUp className="w-4 h-4 text-slate-400" />
        </div>
      </div>
    </div>
  );
}