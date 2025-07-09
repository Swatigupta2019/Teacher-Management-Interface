import { NavigationItem } from '@/types/navigation';

export const navigationItems: NavigationItem[] = [
  {
    id: 'dashboard',
    label: 'Dashboard',
    icon: 'LayoutDashboard',
    href: '/dashboard',
    active: false
  },
  {
    id: 'teachers',
    label: 'Teachers',
    icon: 'Users',
    href: '/teachers',
    active: true,
    badge: 24
  },
  {
    id: 'students',
    label: 'Students',
    icon: 'GraduationCap',
    href: '/students',
    badge: 156
  },
  {
    id: 'courses',
    label: 'Courses',
    icon: 'BookOpen',
    href: '/courses',
    badge: 12
  },
  {
    id: 'schedule',
    label: 'Schedule',
    icon: 'Calendar',
    href: '/schedule'
  },
  {
    id: 'assignments',
    label: 'Assignments',
    icon: 'FileText',
    href: '/assignments',
    badge: 8
  },
  {
    id: 'grades',
    label: 'Grades',
    icon: 'Award',
    href: '/grades'
  },
  {
    id: 'attendance',
    label: 'Attendance',
    icon: 'CheckCircle',
    href: '/attendance'
  },
  {
    id: 'reports',
    label: 'Reports',
    icon: 'BarChart3',
    href: '/reports'
  },
  {
    id: 'settings',
    label: 'Settings',
    icon: 'Settings',
    href: '/settings'
  }
];