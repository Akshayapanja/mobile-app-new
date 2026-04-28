import { useMemo, useState } from 'react';
import { AppShell } from '@/components/AppShell';
import { ScreenHeader } from '@/components/ScreenHeader';

type Period = {
  title: string;
  time: string;
  room: string;
  status: 'Ongoing' | 'Upcoming';
  pillBg: string;
  pillColor: string;
  barColor: string;
};

function mk(title: string, time: string, room: string, status: Period['status']): Period {
  const isOngoing = status === 'Ongoing';
  return {
    title,
    time,
    room,
    status,
    barColor: '#4A90D9',
    pillBg: isOngoing ? '#EAF3FB' : '#F3F4F6',
    pillColor: isOngoing ? '#4A90D9' : '#6B7280',
  };
}

export default function StaffTimetable() {
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'] as const;
  const [day, setDay] = useState<(typeof days)[number]>('Mon');

  const byDay = useMemo<Record<(typeof days)[number], Period[]>>(
    () => ({
      Mon: [
        mk('Class 8A Mathematics', '8:00-8:45', 'Room 12', 'Ongoing'),
        mk('Class 9B Mathematics', '10:30-11:15', 'Room 8', 'Upcoming'),
        mk('Class 7C Mathematics', '11:15-12:00', 'Room 5', 'Upcoming'),
      ],
      Tue: [
        mk('Class 8A Mathematics', '8:45-9:30', 'Room 12', 'Ongoing'),
        mk('Class 8A Mathematics', '11:15-12:00', 'Room 12', 'Upcoming'),
      ],
      Wed: [
        mk('Class 8A Mathematics', '8:45-9:30', 'Room 12', 'Ongoing'),
        mk('Class 9B Mathematics', '10:30-11:15', 'Room 8', 'Upcoming'),
      ],
      Thu: [
        mk('Class 8A Mathematics', '9:30-10:15', 'Room 12', 'Ongoing'),
        mk('Class 7C Mathematics', '10:30-11:15', 'Room 5', 'Upcoming'),
      ],
      Fri: [
        mk('Class 8A Mathematics', '10:30-11:15', 'Room 12', 'Ongoing'),
        mk('Class 9B Mathematics', '11:15-12:00', 'Room 8', 'Upcoming'),
      ],
      Sat: [
        mk('Class 8A Mathematics', '8:00-8:45', 'Room 12', 'Ongoing'),
        mk('Class 7C Mathematics', '10:30-11:15', 'Room 5', 'Upcoming'),
      ],
    }),
    [],
  );

  const periods = byDay[day];

  return (
    <AppShell role="staff">
      <ScreenHeader title="My Timetable" />
      <div className="px-5 pt-4">
        <div className="flex gap-2 mb-4 overflow-x-auto no-scrollbar">
          {days.map(d => (
            <button
              key={d}
              onClick={() => setDay(d)}
              className="px-4 py-2 rounded-full text-[13px] font-medium border whitespace-nowrap transition"
              style={{
                background: day === d ? '#4A90D9' : '#FFFFFF',
                borderColor: day === d ? '#4A90D9' : '#E5E7EB',
                color: day === d ? '#FFFFFF' : '#6B7280',
              }}
            >
              {d}
            </button>
          ))}
        </div>

        <div className="space-y-3">
          {periods.map((p, i) => (
            <div key={i} className="card-base p-3.5 flex gap-3">
              <div className="rounded-full shrink-0" style={{ width: 4, background: p.barColor }} />
              <div className="flex-1">
                <div className="flex items-center justify-between gap-2">
                  <h3 className="text-[15px] font-semibold text-foreground">{p.title}</h3>
                  <span className="pill" style={{ background: p.pillBg, color: p.pillColor }}>
                    {p.status}
                  </span>
                </div>
                <p className="text-[12px] text-muted-foreground mt-1">
                  {p.time} <span className="text-muted-foreground">|</span> {p.room}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </AppShell>
  );
}

