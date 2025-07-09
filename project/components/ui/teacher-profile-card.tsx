'use client';

import { useState } from 'react';
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Edit3, 
  Star, 
  Calendar,
  Users,
  Award
} from 'lucide-react';
import { Teacher } from '@/types/teacher';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';

interface TeacherProfileCardProps {
  teacher: Teacher;
  onEdit: () => void;
}

export function TeacherProfileCard({ teacher, onEdit }: TeacherProfileCardProps) {
  const [isEditing, setIsEditing] = useState(false);

  const statusColors = {
    active: 'bg-green-100 text-green-800',
    inactive: 'bg-gray-100 text-gray-800',
    pending: 'bg-yellow-100 text-yellow-800'
  };

  return (
    <Card className="overflow-hidden">
      <CardContent className="p-6">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Avatar and Status */}
          <div className="flex-shrink-0">
            <div className="relative">
              <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-2xl font-bold">
                {teacher.avatar ? (
                  <img 
                    src={teacher.avatar} 
                    alt={teacher.name}
                    className="w-full h-full object-cover rounded-full"
                  />
                ) : (
                  teacher.name.split(' ').map(n => n[0]).join('')
                )}
              </div>
              <div className="absolute -top-1 -right-1">
                <Badge className={statusColors[teacher.status]}>
                  {teacher.status}
                </Badge>
              </div>
            </div>
          </div>

          {/* Main Info */}
          <div className="flex-1">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-1">{teacher.name}</h2>
                <div className="flex items-center gap-4 text-sm text-gray-600">
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 text-yellow-500 fill-current" />
                    <span>{teacher.rating}/5</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Users className="w-4 h-4" />
                    <span>{teacher.totalStudents} students</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    <span>{teacher.experience} years exp.</span>
                  </div>
                </div>
              </div>
              <Button 
                variant="outline" 
                size="sm"
                onClick={onEdit}
                className="flex items-center gap-2"
              >
                <Edit3 className="w-4 h-4" />
                Edit
              </Button>
            </div>

            {/* Contact Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Mail className="w-4 h-4" />
                <span>{teacher.email}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Phone className="w-4 h-4" />
                <span>{teacher.phone}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600 md:col-span-2">
                <MapPin className="w-4 h-4" />
                <span>
                  {teacher.address.street}, {teacher.address.city}, {teacher.address.state} {teacher.address.zipCode}
                </span>
              </div>
            </div>

            {/* Specializations */}
            <div className="flex flex-wrap gap-2">
              {teacher.specializations.map((spec, index) => (
                <Badge key={index} variant="secondary">
                  {spec}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}