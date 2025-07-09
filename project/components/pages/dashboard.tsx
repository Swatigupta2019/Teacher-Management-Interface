'use client';

import { Card } from '@/components/ui/card';
import { dashboardStats } from '@/data/mock-data';
import * as Icons from 'lucide-react';

export function DashboardPage() {
  const stats = [
    {
      title: 'Total Teachers',
      value: dashboardStats.totalTeachers,
      icon: Icons.Users,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
      change: '+12%'
    },
    {
      title: 'Active Students',
      value: dashboardStats.activeStudents,
      icon: Icons.GraduationCap,
      color: 'text-green-600',
      bgColor: 'bg-green-50',
      change: '+8%'
    },
    {
      title: 'Total Classes',
      value: dashboardStats.totalClasses,
      icon: Icons.BookOpen,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
      change: '+15%'
    },
    {
      title: 'Monthly Revenue',
      value: `$${dashboardStats.revenue.toLocaleString()}`,
      icon: Icons.DollarSign,
      color: 'text-emerald-600',
      bgColor: 'bg-emerald-50',
      change: '+23%'
    }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600 mt-2">Welcome back! Here's what's happening at your school.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <Card key={index} className="p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                <p className="text-2xl font-bold text-gray-900 mt-2">{stat.value}</p>
                <p className="text-sm text-green-600 mt-1">{stat.change} from last month</p>
              </div>
              <div className={`p-3 rounded-full ${stat.bgColor}`}>
                <stat.icon className={`w-6 h-6 ${stat.color}`} />
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activities</h3>
          <div className="space-y-4">
            {[
              { action: 'New teacher registered', user: 'Sarah Johnson', time: '2 hours ago', icon: Icons.UserPlus },
              { action: 'Class scheduled', user: 'Math 101', time: '4 hours ago', icon: Icons.Calendar },
              { action: 'Assignment submitted', user: '15 students', time: '6 hours ago', icon: Icons.FileText },
              { action: 'Payment received', user: '$299.00', time: '1 day ago', icon: Icons.CreditCard }
            ].map((activity, index) => (
              <div key={index} className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50">
                <div className="p-2 bg-blue-50 rounded-full">
                  <activity.icon className="w-4 h-4 text-blue-600" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">{activity.action}</p>
                  <p className="text-xs text-gray-500">{activity.user} • {activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
          <div className="grid grid-cols-2 gap-3">
            {[
              { label: 'Add Teacher', icon: Icons.UserPlus, color: 'bg-blue-600 hover:bg-blue-700' },
              { label: 'Create Course', icon: Icons.BookOpen, color: 'bg-green-600 hover:bg-green-700' },
              { label: 'Schedule Class', icon: Icons.Calendar, color: 'bg-purple-600 hover:bg-purple-700' },
              { label: 'Generate Report', icon: Icons.BarChart3, color: 'bg-orange-600 hover:bg-orange-700' }
            ].map((action, index) => (
              <button
                key={index}
                className={`p-4 rounded-lg text-white transition-colors ${action.color} flex flex-col items-center space-y-2`}
              >
                <action.icon className="w-6 h-6" />
                <span className="text-sm font-medium">{action.label}</span>
              </button>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}