import { Link, useNavigate } from 'react-router-dom';
import { AppShell, ProgressBar } from '@/components/AppShell';
import { Plus } from 'lucide-react';
import { getSentHomework } from '@/lib/session';
import { useEffect, useState } from 'react';
import { Skeleton } from '@/components/ui/skeleton';

const BASE = [
  { id: 'b1', subject: 'Mathematics', cls: '8', sec: 'A', due: 'Apr 15', title: 'Solve Exercise 5.3 Quadratic Equations', subm: 18, total: 32, color: '#4A90D9', bg: '#EAF3FB' },
  { id: 'b2', subject: 'Science', cls: '9', sec: 'B', due: 'Apr 18', title: 'Draw and label the digestive system', subm: 24, total: 35, color: '#5CB85C', bg: '#F0FDF4' },
  { id: 'b3', subject: 'English', cls: '7', sec: 'C', due: 'Apr 10', title: 'Write essay on Climate Change', subm: 31, total: 31, color: '#F5A623', bg: '#FFF8E7' },
];

export default function StaffHomework() {
  const nav = useNavigate();
  const sent = getSentHomework();
  const [cls, setCls] = useState('All');
  const [sec, setSec] = useState('All');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 500);
    return () => clearTimeout(t);
  }, []);

  return (
    <AppShell role="staff">
      <div className="px-5 pt-5">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-[20px] font-bold text-foreground">Homework</h1>
          <button onClick={() => nav('/staff/create-homework')} className="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center"><Plus size={20} /></button>
        </div>

        {loading ? (
          <div className="space-y-3">
            <div className="grid grid-cols-2 gap-3 mb-4">
              <Skeleton className="h-12 w-full rounded-lg bg-[#F3F4F6]" />
              <Skeleton className="h-12 w-full rounded-lg bg-[#F3F4F6]" />
            </div>
            <div className="space-y-3">
              {[...Array(6)].map((_, i) => (
                <Skeleton key={i} className="h-[110px] w-full rounded-xl bg-[#F3F4F6]" />
              ))}
            </div>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-2 gap-3 mb-4">
              <select value={cls} onChange={e => setCls(e.target.value)} className="input-field"><option>All</option>{['6','7','8','9','10'].map(c=><option key={c}>Class {c}</option>)}</select>
              <select value={sec} onChange={e => setSec(e.target.value)} className="input-field"><option>All</option>{['A','B','C'].map(s=><option key={s}>Section {s}</option>)}</select>
            </div>

            <div className="space-y-3">
              {sent.map(s => (
                <div key={s.id} className="card-base p-3.5">
                  <div className="flex items-center justify-between mb-2">
                    <span className="pill bg-secondary text-primary">{s.subject}</span>
                    <span className="pill bg-secondary text-primary">🤖 AI Generated</span>
                  </div>
                  <p className="text-[11px] text-muted-foreground">Class {s.class} - {s.section} · Sent {new Date(s.sentAt).toLocaleDateString()}</p>
                  <p className="text-[14px] font-medium text-foreground mt-1.5">{s.title}</p>
                  <div className="mt-2.5 mb-1 flex justify-between text-[11px]"><span className="text-muted-foreground">0/30 submitted</span><span className="text-primary font-medium">Just sent</span></div>
                  <ProgressBar value={5} color="#4A90D9" />
                </div>
              ))}
              {BASE.map(h => (
                <Link to="/staff/submissions" key={h.id} className="card-base p-3.5 block">
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="pill" style={{ background: h.bg, color: h.color }}>{h.subject}</span>
                    <span className="text-[11px] text-muted-foreground">Due: {h.due}</span>
                  </div>
                  <p className="text-[11px] text-muted-foreground">Class {h.cls} - {h.sec}</p>
                  <p className="text-[14px] font-medium text-foreground mt-1.5">{h.title}</p>
                  <div className="mt-2.5 mb-1 flex justify-between text-[11px]">
                    <span className={h.subm === h.total ? 'text-success font-medium' : 'text-muted-foreground'}>{h.subm}/{h.total} submitted</span>
                    <span className="text-primary">View →</span>
                  </div>
                  <ProgressBar value={(h.subm / h.total) * 100} color={h.subm === h.total ? '#5CB85C' : '#4A90D9'} />
                  <div className="flex gap-3 mt-2.5 pt-2.5 border-t border-border text-[11px]">
                    <button className="text-primary font-medium">View Submissions</button>
                    <button className="text-muted-foreground">Edit</button>
                    <button className="text-destructive">Delete</button>
                  </div>
                </Link>
              ))}
            </div>
          </>
        )}
      </div>
    </AppShell>
  );
}
