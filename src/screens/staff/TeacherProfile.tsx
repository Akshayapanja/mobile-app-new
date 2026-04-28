import { AppShell } from '@/components/AppShell';
import { ScreenHeader } from '@/components/ScreenHeader';
import { useNavigate } from 'react-router-dom';

const TIMETABLE: Record<string, Array<{ time: string; cls: string; subject: string; room: string }>> = {
  Monday: [
    { time: '8:00AM', cls: 'Class 8A', subject: 'Mathematics', room: 'Room 12' },
    { time: '10:30AM', cls: 'Class 9B', subject: 'Mathematics', room: 'Room 8' },
    { time: '11:15AM', cls: 'Class 7C', subject: 'Mathematics', room: 'Room 5' },
  ],
  Tuesday: [
    { time: '8:45AM', cls: 'Class 8A', subject: 'Mathematics', room: 'Room 12' },
    { time: '11:15AM', cls: 'Class 8A', subject: 'Mathematics', room: 'Room 12' },
  ],
  Wednesday: [
    { time: '8:45AM', cls: 'Class 8A', subject: 'Mathematics', room: 'Room 12' },
    { time: '10:30AM', cls: 'Class 9B', subject: 'Mathematics', room: 'Room 8' },
  ],
  Thursday: [
    { time: '9:30AM', cls: 'Class 8A', subject: 'Mathematics', room: 'Room 12' },
    { time: '10:30AM', cls: 'Class 7C', subject: 'Mathematics', room: 'Room 5' },
  ],
  Friday: [
    { time: '10:30AM', cls: 'Class 8A', subject: 'Mathematics', room: 'Room 12' },
    { time: '11:15AM', cls: 'Class 9B', subject: 'Mathematics', room: 'Room 8' },
  ],
  Saturday: [
    { time: '8:00AM', cls: 'Class 8A', subject: 'Mathematics', room: 'Room 12' },
    { time: '10:30AM', cls: 'Class 7C', subject: 'Mathematics', room: 'Room 5' },
  ],
};

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-start justify-between gap-3 py-2.5">
      <p className="text-[12px] text-muted-foreground">{label}</p>
      <p className="text-[12px] font-medium text-foreground text-right">{value}</p>
    </div>
  );
}

export default function TeacherProfile() {
  const nav = useNavigate();

  return (
    <AppShell role="staff">
      <ScreenHeader title="My Profile" />
      <div className="px-5 pt-5 pb-2">
        <div className="flex flex-col items-center mb-5">
          <div
            className="flex items-center justify-center"
            style={{ width: 80, height: 80, borderRadius: '50%', background: '#EAF3FB' }}
          >
            <span style={{ fontWeight: 700, fontSize: 28, color: '#4A90D9' }}>LS</span>
          </div>
          <h2 className="text-[20px] font-bold text-foreground mt-3 text-center">Mrs. Lakshmi Subramaniam</h2>
          <p className="text-[14px] text-muted-foreground text-center">Mathematics Teacher</p>
          <p className="text-[13px] text-muted-foreground text-center">Delhi Public School, Hyderabad</p>
          <div className="mt-3">
            <span
              style={{
                background: '#F0FDF4',
                color: '#5CB85C',
                fontSize: 11,
                borderRadius: 50,
                padding: '3px 10px',
                display: 'inline-block',
              }}
            >
              Class Teacher — Class 8A
            </span>
          </div>
        </div>

        <div className="space-y-3 mb-5">
          <div className="card-base p-4">
            <p className="text-[15px] font-bold text-foreground mb-2.5">Personal Information</p>
            <div className="divide-y divide-border">
              <InfoRow label="📞 Phone" value="+91 9900000001" />
              <InfoRow label="✉ Email" value="lakshmi.s@dpshyd.edu.in" />
              <InfoRow label="🪪 Employee ID" value="EMP001" />
              <InfoRow label="📅 Joined" value="June 15, 2015" />
              <InfoRow label="🎓 Qualification" value={'M.Sc Mathematics,\nB.Ed'} />
            </div>
          </div>

          <div className="card-base p-4">
            <p className="text-[15px] font-bold text-foreground mb-2.5">Teaching Details</p>
            <div className="divide-y divide-border">
              <InfoRow label="📚 Subject" value="Mathematics" />
              <InfoRow label="🏫 Class Teacher of" value="Class 8A" />
              <InfoRow label="👥 Total Students" value="180" />
              <InfoRow label="📖 Classes Handled" value="5 classes" />
              <InfoRow label="⏰ Periods per week" value="30 periods" />
            </div>
          </div>

          <div className="card-base p-4">
            <p className="text-[15px] font-bold text-foreground mb-3">My Timetable</p>
            <div className="space-y-3">
              {Object.entries(TIMETABLE).map(([day, entries]) => (
                <div key={day}>
                  <p className="text-[12px] font-semibold text-foreground mb-2">{day}</p>
                  <div className="space-y-2">
                    {entries.map((e, i) => (
                      <div key={i} className="flex items-center gap-2.5">
                        <span className="pill" style={{ background: '#EAF3FB', color: '#4A90D9' }}>{e.time}</span>
                        <div className="flex-1 min-w-0">
                          <p className="text-[12px] font-medium text-foreground truncate">
                            {e.cls} {e.subject}
                          </p>
                          <p className="text-[11px] text-muted-foreground">{e.room}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="card-base p-4">
            <p className="text-[15px] font-bold text-foreground mb-3">Leave Balance</p>
            <div className="grid grid-cols-3 gap-2.5 text-center">
              <div className="rounded-xl p-3" style={{ background: '#EAF3FB' }}>
                <p className="text-[18px] font-bold text-foreground">8</p>
                <p className="text-[11px] text-muted-foreground">Casual</p>
              </div>
              <div className="rounded-xl p-3" style={{ background: '#F0FDF4' }}>
                <p className="text-[18px] font-bold text-foreground">12</p>
                <p className="text-[11px] text-muted-foreground">Medical</p>
              </div>
              <div className="rounded-xl p-3" style={{ background: '#FFF8E7' }}>
                <p className="text-[18px] font-bold text-foreground">5</p>
                <p className="text-[11px] text-muted-foreground">Personal</p>
              </div>
            </div>
          </div>
        </div>

        <button onClick={() => nav('/staff/apply-leave')} className="btn-primary w-full mb-3">
          Apply Leave
        </button>
        <button onClick={() => nav('/staff/payslip')} className="btn-ghost border border-border w-full">
          My Payslip
        </button>
      </div>
    </AppShell>
  );
}
