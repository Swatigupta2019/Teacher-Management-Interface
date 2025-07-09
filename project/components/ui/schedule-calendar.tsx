'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { ScheduleSlot } from '@/types/teacher';

interface ScheduleCalendarProps {
  schedule: ScheduleSlot[];
  className?: string;
}

const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
const timeSlots = [
  '7:00', '8:00', '9:00', '10:00', '11:00', '12:00',
  '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00'
];

export function ScheduleCalendar({ schedule, className }: ScheduleCalendarProps) {
  const getScheduleForTimeSlot = (day: string, time: string) => {
    return schedule.find(slot => {
      const slotDay = slot.day.toLowerCase();
      const dayMatch = slotDay === day.toLowerCase();
      const timeMatch = slot.startTime <= time && slot.endTime > time;
      return dayMatch && timeMatch;
    });
  };

  const getSlotHeight = (slot: ScheduleSlot) => {
    const startHour = parseInt(slot.startTime.split(':')[0]);
    const endHour = parseInt(slot.endTime.split(':')[0]);
    const startMinute = parseInt(slot.startTime.split(':')[1]);
    const endMinute = parseInt(slot.endTime.split(':')[1]);
    
    const duration = (endHour - startHour) + (endMinute - startMinute) / 60;
    return duration * 60; // 60px per hour
  };

  const getSlotPosition = (slot: ScheduleSlot) => {
    const startHour = parseInt(slot.startTime.split(':')[0]);
    const startMinute = parseInt(slot.startTime.split(':')[1]);
    const position = (startHour - 7) * 60 + startMinute; // 7 AM is the starting point
    return position;
  };

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>Weekly Schedule</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <div className="min-w-[800px]">
            {/* Header */}
            <div className="grid grid-cols-8 gap-1 mb-2">
              <div className="text-sm font-medium text-gray-500 p-2">Time</div>
              {days.map(day => (
                <div key={day} className="text-sm font-medium text-gray-700 p-2 text-center">
                  {day}
                </div>
              ))}
            </div>

            {/* Time slots */}
            <div className="relative">
              {timeSlots.map((time, timeIndex) => (
                <div key={time} className="grid grid-cols-8 gap-1 border-b border-gray-100">
                  <div className="text-xs text-gray-500 p-2 h-16 flex items-center">
                    {time}
                  </div>
                  {days.map(day => {
                    const slot = getScheduleForTimeSlot(day, time);
                    return (
                      <div
                        key={`${day}-${time}`}
                        className={cn(
                          "h-16 border-l border-gray-100 relative",
                          timeIndex % 2 === 0 ? "bg-gray-50" : "bg-white"
                        )}
                      >
                        {slot && (
                          <div
                            className={cn(
                              "absolute inset-1 rounded-md p-2 text-xs text-white shadow-sm",
                              slot.type === 'private' ? 'bg-blue-500' : 'bg-green-500'
                            )}
                            style={{
                              height: `${getSlotHeight(slot)}px`,
                              top: `${getSlotPosition(slot) - timeIndex * 60}px`
                            }}
                          >
                            <div className="font-medium truncate">{slot.subject}</div>
                            <div className="text-xs opacity-80">
                              {slot.type === 'group' && slot.studentCount && `${slot.studentCount} students`}
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              ))}
            </div>

            {/* Legend */}
            <div className="flex items-center gap-4 mt-4 text-sm">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-blue-500 rounded"></div>
                <span>Private Sessions</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-green-500 rounded"></div>
                <span>Group Sessions</span>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}