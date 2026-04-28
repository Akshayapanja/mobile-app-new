import { AppShell } from '@/components/AppShell';

const TODAY = [
  { icon: '📋', title: 'Marks Submission Reminder', text: 'Please submit Class 8A marks by Friday', time: '1 hour ago', unread: true },
  { icon: '📢', title: 'New Announcement', text: 'Staff meeting scheduled for April 22', time: '2 hours ago', unread: true },
  { icon: '💰', title: 'Salary Update', text: 'March salary credited to your account', time: '3 hours ago', unread: true },
];
const YDAY = [
  { icon: '✓', title: 'Leave Approved', text: 'Your casual leave for Apr 10 approved', time: 'Yesterday 2:00 PM', unread: false },
  { icon: '📚', title: 'Homework Reminder', text: '3 students yet to submit homework', time: 'Yesterday 9:00 AM', unread: false },
  { icon: '📅', title: 'Attendance Reminder', text: 'Class 9B attendance not marked yet', time: 'Yesterday 8:30 AM', unread: false },
];

export default function StaffNotifications() {
  return (
    <AppShell role="staff">
      <div className="px-5 pt-4">
        <div className="flex items-center justify-between mb-5">
          <h1 className="text-[20px] font-bold text-foreground">Notifications</h1>
          <button className="text-[12px] text-primary font-medium">Mark all read</button>
        </div>

        <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider mb-2">Today</p>
        <div className="card-base divide-y divide-border mb-5">
          {TODAY.map((n, i) => (
            <div key={i} className="p-3.5 flex gap-3 items-start">
              <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center text-lg">{n.icon}</div>
              <div className="flex-1">
                <p className="text-[13px] font-semibold text-foreground">{n.title}</p>
                <p className="text-[12px] text-muted-foreground">{n.text}</p>
                <p className="text-[10px] text-muted-foreground mt-1">{n.time}</p>
              </div>
              {n.unread && <span className="w-2 h-2 rounded-full bg-primary mt-2" />}
            </div>
          ))}
        </div>

        <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider mb-2">Yesterday</p>
        <div className="card-base divide-y divide-border opacity-80">
          {YDAY.map((n, i) => (
            <div key={i} className="p-3.5 flex gap-3 items-start">
              <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center text-lg">{n.icon}</div>
              <div className="flex-1">
                <p className="text-[13px] font-medium text-foreground">{n.title}</p>
                <p className="text-[12px] text-muted-foreground">{n.text}</p>
                <p className="text-[10px] text-muted-foreground mt-1">{n.time}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </AppShell>
  );
}

