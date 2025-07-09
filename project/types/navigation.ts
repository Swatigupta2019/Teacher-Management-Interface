export interface NavigationItem {
  id: string;
  label: string;
  icon: string;
  href: string;
  active?: boolean;
  badge?: number;
  children?: NavigationItem[];
}

export interface DashboardStats {
  totalTeachers: number;
  activeStudents: number;
  totalClasses: number;
  revenue: number;
}

export interface Student {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  status: 'active' | 'inactive' | 'pending';
  enrolledCourses: number;
  joinDate: string;
}

export interface Course {
  id: string;
  title: string;
  instructor: string;
  students: number;
  duration: string;
  status: 'active' | 'draft' | 'completed';
  price: number;
}

export interface Report {
  id: string;
  title: string;
  type: 'financial' | 'academic' | 'attendance';
  generatedDate: string;
  status: 'ready' | 'processing' | 'failed';
}