'use client';

import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { QualificationsTable } from './qualifications-table';
import { ScheduleCalendar } from './schedule-calendar';
import { Teacher, PrivateQualification, GroupQualification } from '@/types/teacher';
import { BookOpen, Calendar, MessageSquare, BarChart3, Clock, FileText } from 'lucide-react';

interface TeacherTabsProps {
  teacher: Teacher;
  onUpdateTeacher?: (teacher: Teacher) => void;
}

export function TeacherTabs({ teacher, onUpdateTeacher }: TeacherTabsProps) {
  const [currentTeacher, setCurrentTeacher] = useState(teacher);

  const handleUpdatePrivateQualifications = (qualifications: PrivateQualification[]) => {
    const updatedTeacher = {
      ...currentTeacher,
      qualifications: {
        ...currentTeacher.qualifications,
        private: qualifications
      }
    };
    setCurrentTeacher(updatedTeacher);
    onUpdateTeacher?.(updatedTeacher);
  };

  const handleUpdateGroupQualifications = (qualifications: GroupQualification[]) => {
    const updatedTeacher = {
      ...currentTeacher,
      qualifications: {
        ...currentTeacher.qualifications,
        group: qualifications
      }
    };
    setCurrentTeacher(updatedTeacher);
    onUpdateTeacher?.(updatedTeacher);
  };
  return (
    <Tabs defaultValue="qualifications" className="w-full">
      <TabsList className="grid w-full grid-cols-6 lg:w-auto lg:grid-cols-none lg:inline-flex">
        <TabsTrigger value="qualifications" className="flex items-center gap-2">
          <BookOpen className="w-4 h-4" />
          <span className="hidden sm:inline">Qualifications</span>
        </TabsTrigger>
        <TabsTrigger value="schedule" className="flex items-center gap-2">
          <Calendar className="w-4 h-4" />
          <span className="hidden sm:inline">Schedule</span>
        </TabsTrigger>
        <TabsTrigger value="availability" className="flex items-center gap-2">
          <Clock className="w-4 h-4" />
          <span className="hidden sm:inline">Availability</span>
        </TabsTrigger>
        <TabsTrigger value="students" className="flex items-center gap-2">
          <BarChart3 className="w-4 h-4" />
          <span className="hidden sm:inline">Students</span>
        </TabsTrigger>
        <TabsTrigger value="communications" className="flex items-center gap-2">
          <MessageSquare className="w-4 h-4" />
          <span className="hidden sm:inline">Communications</span>
        </TabsTrigger>
        <TabsTrigger value="documents" className="flex items-center gap-2">
          <FileText className="w-4 h-4" />
          <span className="hidden sm:inline">Documents</span>
        </TabsTrigger>
      </TabsList>

      <TabsContent value="qualifications" className="space-y-6">
        <QualificationsTable
          privateQualifications={currentTeacher.qualifications.private}
          groupQualifications={currentTeacher.qualifications.group}
          onUpdatePrivate={handleUpdatePrivateQualifications}
          onUpdateGroup={handleUpdateGroupQualifications}
        />
      </TabsContent>

      <TabsContent value="schedule" className="space-y-6">
        <ScheduleCalendar schedule={currentTeacher.schedule} />
      </TabsContent>

      <TabsContent value="availability" className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Availability Settings</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Monday</span>
                <Badge variant="outline">9:00 AM - 5:00 PM</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Tuesday</span>
                <Badge variant="outline">9:00 AM - 5:00 PM</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Wednesday</span>
                <Badge variant="outline">9:00 AM - 5:00 PM</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Thursday</span>
                <Badge variant="outline">9:00 AM - 5:00 PM</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Friday</span>
                <Badge variant="outline">9:00 AM - 5:00 PM</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Saturday</span>
                <Badge variant="secondary">Unavailable</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Sunday</span>
                <Badge variant="secondary">Unavailable</Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="students" className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Student Management</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center py-8 text-gray-500">
              <BarChart3 className="w-12 h-12 mx-auto mb-4 text-gray-400" />
              <p>Student management features coming soon</p>
            </div>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="communications" className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Communications</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center py-8 text-gray-500">
              <MessageSquare className="w-12 h-12 mx-auto mb-4 text-gray-400" />
              <p>Communication tools coming soon</p>
            </div>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="documents" className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Documents</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center py-8 text-gray-500">
              <FileText className="w-12 h-12 mx-auto mb-4 text-gray-400" />
              <p>Document management coming soon</p>
            </div>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
}