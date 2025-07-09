export interface Teacher {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
  avatar?: string;
  status: 'active' | 'inactive' | 'pending';
  joinDate: string;
  qualifications: {
    private: PrivateQualification[];
    group: GroupQualification[];
  };
  schedule: ScheduleSlot[];
  specializations: string[];
  experience: number;
  rating: number;
  totalStudents: number;
}

export interface PrivateQualification {
  id: string;
  name: string;
  rate: number;
  currency: string;
  description?: string;
  level: 'beginner' | 'intermediate' | 'advanced';
}

export interface GroupQualification {
  id: string;
  name: string;
  rate: number;
  currency: string;
  minStudents: number;
  maxStudents: number;
  description?: string;
}

export interface ScheduleSlot {
  id: string;
  day: 'monday' | 'tuesday' | 'wednesday' | 'thursday' | 'friday' | 'saturday' | 'sunday';
  startTime: string;
  endTime: string;
  subject: string;
  type: 'private' | 'group';
  studentCount?: number;
  color: string;
}

export interface NavigationItem {
  id: string;
  label: string;
  icon: string;
  href: string;
  active?: boolean;
}