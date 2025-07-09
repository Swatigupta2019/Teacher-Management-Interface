'use client';

import { useState, useMemo, useEffect } from 'react';
import { Sidebar } from '@/components/ui/sidebar';
import { TeacherHeader } from '@/components/ui/teacher-header';
import { TeacherTabs } from '@/components/ui/teacher-tabs';
import { DashboardPage } from '@/components/pages/dashboard';
import { StudentsPage } from '@/components/pages/students';
import { CoursesPage } from '@/components/pages/courses';
import { mockTeacher } from '@/data/mock-teacher';
import { Teacher } from '@/types/teacher';
import { Toaster } from '@/components/ui/sonner';

export default function TeacherManagementPage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState('/teachers');
  const [teacher, setTeacher] = useState<Teacher>(mockTeacher);
  const [loading, setLoading] = useState(false);

  // Simulate loading state
  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => setLoading(false), 500);
    return () => clearTimeout(timer);
  }, [currentPage]);

  const handleTeacherUpdate = (updatedTeacher: Teacher) => {
    setTeacher(updatedTeacher);
  };

  const renderContent = useMemo(() => {
    switch (currentPage) {
      case '/dashboard':
        return <DashboardPage />;
      case '/students':
        return <StudentsPage />;
      case '/courses':
        return <CoursesPage />;
      case '/teachers':
        return (
          <>
            <TeacherHeader 
              teacher={teacher}
              onEdit={handleTeacherUpdate}
            />
            <TeacherTabs 
              teacher={teacher} 
              onUpdateTeacher={handleTeacherUpdate}
            />
          </>
        );
      case '/schedule':
        return (
          <div className="text-center py-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Schedule Management</h2>
            <p className="text-gray-600">Schedule management interface coming soon...</p>
          </div>
        );
      case '/assignments':
        return (
          <div className="text-center py-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Assignments</h2>
            <p className="text-gray-600">Assignment management interface coming soon...</p>
          </div>
        );
      case '/grades':
        return (
          <div className="text-center py-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Grades</h2>
            <p className="text-gray-600">Grade management interface coming soon...</p>
          </div>
        );
      case '/attendance':
        return (
          <div className="text-center py-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Attendance</h2>
            <p className="text-gray-600">Attendance tracking interface coming soon...</p>
          </div>
        );
      case '/reports':
        return (
          <div className="text-center py-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Reports</h2>
            <p className="text-gray-600">Reporting dashboard coming soon...</p>
          </div>
        );
      case '/settings':
        return (
          <div className="text-center py-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Settings</h2>
            <p className="text-gray-600">System settings interface coming soon...</p>
          </div>
        );
      default:
        return (
          <>
            <TeacherHeader 
              teacher={teacher}
              onEdit={handleTeacherUpdate}
            />
            <TeacherTabs 
              teacher={teacher} 
              onUpdateTeacher={handleTeacherUpdate}
            />
          </>
        );
    }
  }, [currentPage, teacher]);

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Mobile sidebar backdrop */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={`fixed lg:relative lg:translate-x-0 transition-transform duration-300 ease-in-out z-50 ${
        isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
      } lg:block`}>
        <Sidebar 
          className="h-full" 
          currentPage={currentPage}
          onNavigate={(href) => {
            setCurrentPage(href);
            setIsSidebarOpen(false);
          }}
        />
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Mobile header */}
        <div className="lg:hidden bg-white border-b border-gray-200 px-4 py-3">
          <button
            onClick={() => setIsSidebarOpen(true)}
            className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>

        {/* Content area */}
        <div className="flex-1 overflow-auto">
          <div className="container mx-auto px-4 lg:px-8 py-6 max-w-7xl">
            {loading ? (
              <div className="flex items-center justify-center py-12">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                <span className="ml-2 text-gray-600">Loading...</span>
              </div>
            ) : (
              renderContent
            )}
          </div>
        </div>
      </div>
      <Toaster position="top-right" />
    </div>
  );
}