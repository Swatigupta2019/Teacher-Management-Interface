import { Teacher } from '@/types/teacher';

export const mockTeacher: Teacher = {
  id: '1',
  name: 'Alynia Allan',
  email: 'AlyniaAllan@example.com',
  phone: '+1 (416) 555-0123',
  address: {
    street: '123 Main Street',
    city: 'North York',
    state: 'Ontario',
    zipCode: 'M2M 1A1',
    country: 'Canada'
  },
  avatar: 'https://images.pexels.com/photos/762020/pexels-photo-762020.jpeg?auto=compress&cs=tinysrgb&w=400',
  status: 'active',
  joinDate: '2023-01-15',
  experience: 8,
  rating: 4.8,
  totalStudents: 45,
  specializations: ['Mathematics', 'Physics', 'Chemistry', 'Computer Science'],
  qualifications: {
    private: [
      {
        id: '1',
        name: 'Vocal Contemporary',
        rate: 20.00,
        currency: '$',
        level: 'intermediate',
        description: 'Contemporary vocal techniques and performance'
      },
      {
        id: '2',
        name: 'Vocal Core',
        rate: 30.00,
        currency: '$',
        level: 'advanced',
        description: 'Core vocal training and fundamentals'
      },
      {
        id: '3',
        name: 'Vocal Intermediate',
        rate: 25.00,
        currency: '$',
        level: 'intermediate',
        description: 'Intermediate vocal training program'
      },
      {
        id: '4',
        name: 'Vocal Plus',
        rate: 35.00,
        currency: '$',
        level: 'advanced',
        description: 'Advanced vocal training with extended techniques'
      },
      {
        id: '5',
        name: 'Instrument',
        rate: 40.00,
        currency: '$',
        level: 'beginner',
        description: 'Basic instrument training'
      }
    ],
    group: [
      {
        id: '1',
        name: 'Group Vocal Workshop',
        rate: 60.00,
        currency: '$',
        minStudents: 3,
        maxStudents: 8,
        description: 'Interactive group vocal training sessions'
      },
      {
        id: '2',
        name: 'Music Theory Basics',
        rate: 45.00,
        currency: '$',
        minStudents: 5,
        maxStudents: 12,
        description: 'Fundamental music theory for beginners'
      }
    ]
  },
  schedule: [
    {
      id: '1',
      day: 'tuesday',
      startTime: '14:00',
      endTime: '15:30',
      subject: 'Vocal Contemporary',
      type: 'private',
      color: '#3B82F6'
    },
    {
      id: '2',
      day: 'wednesday',
      startTime: '15:30',
      endTime: '17:00',
      subject: 'Group Vocal Workshop',
      type: 'group',
      studentCount: 6,
      color: '#10B981'
    },
    {
      id: '3',
      day: 'thursday',
      startTime: '10:00',
      endTime: '11:30',
      subject: 'Vocal Core',
      type: 'private',
      color: '#3B82F6'
    },
    {
      id: '4',
      day: 'friday',
      startTime: '13:00',
      endTime: '14:30',
      subject: 'Music Theory Basics',
      type: 'group',
      studentCount: 8,
      color: '#10B981'
    },
    {
      id: '5',
      day: 'saturday',
      startTime: '09:00',
      endTime: '10:30',
      subject: 'Instrument',
      type: 'private',
      color: '#3B82F6'
    },
    {
      id: '6',
      day: 'saturday',
      startTime: '11:00',
      endTime: '12:30',
      subject: 'Vocal Plus',
      type: 'private',
      color: '#3B82F6'
    }
  ]
};