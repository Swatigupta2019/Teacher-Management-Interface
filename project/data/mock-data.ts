import { DashboardStats, Student, Course, Report } from '@/types/navigation';

export const dashboardStats: DashboardStats = {
  totalTeachers: 24,
  activeStudents: 156,
  totalClasses: 48,
  revenue: 12450
};

export const mockStudents: Student[] = [
  {
    id: '1',
    name: 'Emma Johnson',
    email: 'emma.johnson@example.com',
    avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=400',
    status: 'active',
    enrolledCourses: 3,
    joinDate: '2024-01-15'
  },
  {
    id: '2',
    name: 'Michael Chen',
    email: 'michael.chen@example.com',
    avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=400',
    status: 'active',
    enrolledCourses: 2,
    joinDate: '2024-02-01'
  },
  {
    id: '3',
    name: 'Sarah Williams',
    email: 'sarah.williams@example.com',
    avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=400',
    status: 'pending',
    enrolledCourses: 1,
    joinDate: '2024-02-15'
  },
  {
    id: '4',
    name: 'David Rodriguez',
    email: 'david.rodriguez@example.com',
    status: 'active',
    enrolledCourses: 4,
    joinDate: '2023-12-10'
  },
  {
    id: '5',
    name: 'Lisa Thompson',
    email: 'lisa.thompson@example.com',
    avatar: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=400',
    status: 'inactive',
    enrolledCourses: 0,
    joinDate: '2023-11-20'
  }
];

export const mockCourses: Course[] = [
  {
    id: '1',
    title: 'Advanced Mathematics',
    instructor: 'Dr. John Smith',
    students: 28,
    duration: '12 weeks',
    status: 'active',
    price: 299
  },
  {
    id: '2',
    title: 'Physics Fundamentals',
    instructor: 'Prof. Maria Garcia',
    students: 22,
    duration: '10 weeks',
    status: 'active',
    price: 249
  },
  {
    id: '3',
    title: 'Chemistry Lab',
    instructor: 'Dr. Robert Johnson',
    students: 18,
    duration: '8 weeks',
    status: 'draft',
    price: 199
  },
  {
    id: '4',
    title: 'Computer Science Basics',
    instructor: 'Ms. Jennifer Lee',
    students: 35,
    duration: '16 weeks',
    status: 'active',
    price: 399
  }
];

export const mockReports: Report[] = [
  {
    id: '1',
    title: 'Monthly Revenue Report',
    type: 'financial',
    generatedDate: '2024-02-01',
    status: 'ready'
  },
  {
    id: '2',
    title: 'Student Performance Analysis',
    type: 'academic',
    generatedDate: '2024-01-28',
    status: 'ready'
  },
  {
    id: '3',
    title: 'Attendance Summary',
    type: 'attendance',
    generatedDate: '2024-02-15',
    status: 'processing'
  }
];