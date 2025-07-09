'use client';

import { useState } from 'react';
import { 
  ChevronLeft, 
  ChevronRight, 
  Users, 
  Calendar, 
  BookOpen, 
  Settings, 
  Bell, 
  MessageSquare,
  BarChart3,
  FileText,
  User
} from 'lucide-react';
import { NavigationItem } from '@/types/teacher';
import { cn } from '@/lib/utils';

const navigationItems: NavigationItem[] = [
  { id: 'teachers', label: 'Teachers', icon: 'Users', href: '/teachers', active: true },
  { id: 'schedule', label: 'Schedule', icon: 'Calendar', href: '/schedule' },
  { id: 'courses', label: 'Courses', icon: 'BookOpen', href: '/courses' },
  { id: 'students', label: 'Students', icon: 'User', href: '/students' },
  { id: 'analytics', label: 'Analytics', icon: 'BarChart3', href: '/analytics' },
  { id: 'messages', label: 'Messages', icon: 'MessageSquare', href: '/messages' },
  { id: 'reports', label: 'Reports', icon: 'FileText', href: '/reports' },
  { id: 'notifications', label: 'Notifications', icon: 'Bell', href: '/notifications' },
  { id: 'settings', label: 'Settings', icon: 'Settings', href: '/settings' },
];

const iconMap = {
  Users, Calendar, BookOpen, User, BarChart3, MessageSquare, FileText, Bell, Settings
};

interface NavigationSidebarProps {
  isCollapsed: boolean;
  onToggle: () => void;
}

export function NavigationSidebar({ isCollapsed, onToggle }: NavigationSidebarProps) {
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);

  return (
    <div className={cn(
      "bg-slate-900 text-white transition-all duration-300 ease-in-out flex flex-col",
      isCollapsed ? "w-16" : "w-64"
    )}>
      {/* Header */}
      <div className="p-4 border-b border-slate-800">
        <div className="flex items-center justify-between">
          {!isCollapsed && (
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <BookOpen className="w-5 h-5" />
              </div>
              <h1 className="text-xl font-bold">EduManage</h1>
            </div>
          )}
          <button
            onClick={onToggle}
            className="p-1 hover:bg-slate-800 rounded-lg transition-colors"
          >
            {isCollapsed ? <ChevronRight className="w-5 h-5" /> : <ChevronLeft className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Navigation Items */}
      <nav className="flex-1 py-4">
        <ul className="space-y-1 px-2">
          {navigationItems.map((item) => {
            const Icon = iconMap[item.icon as keyof typeof iconMap];
            return (
              <li key={item.id}>
                <a
                  href={item.href}
                  className={cn(
                    "flex items-center px-3 py-2 rounded-lg transition-colors group relative",
                    item.active 
                      ? "bg-blue-600 text-white" 
                      : "text-slate-300 hover:bg-slate-800 hover:text-white"
                  )}
                  onMouseEnter={() => setHoveredItem(item.id)}
                  onMouseLeave={() => setHoveredItem(null)}
                >
                  <Icon className="w-5 h-5 flex-shrink-0" />
                  {!isCollapsed && (
                    <span className="ml-3 text-sm font-medium">{item.label}</span>
                  )}
                  
                  {/* Tooltip for collapsed state */}
                  {isCollapsed && hoveredItem === item.id && (
                    <div className="absolute left-full ml-2 px-2 py-1 bg-slate-800 text-white text-sm rounded-md whitespace-nowrap z-50">
                      {item.label}
                    </div>
                  )}
                </a>
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
}