import { useEffect, useMemo, useState } from 'react';
import { AppShell } from '@/components/AppShell';
import { ScreenHeader } from '@/components/ScreenHeader';
import { CheckCircle2 } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';

type AttendanceStudent = { roll: string; name: string; status: string };

const STUDENTS_BY_CLASS_SECTION: Record<string, Array<{ roll: string; name: string }>> = {
  '6-A': [
    { roll: '01', name: 'Aarav Sharma' },
    { roll: '02', name: 'Priya Patel' },
    { roll: '03', name: 'Rohit Kumar' },
    { roll: '04', name: 'Ananya Singh' },
    { roll: '05', name: 'Karthik Reddy' },
    { roll: '06', name: 'Sneha Nair' },
    { roll: '07', name: 'Arjun Mehta' },
    { roll: '08', name: 'Divya Iyer' },
  ],
  '6-B': [
    { roll: '01', name: 'Vikram Das' },
    { roll: '02', name: 'Pooja Gupta' },
    { roll: '03', name: 'Rahul Verma' },
    { roll: '04', name: 'Meera Pillai' },
    { roll: '05', name: 'Aditya Joshi' },
    { roll: '06', name: 'Kavya Menon' },
    { roll: '07', name: 'Suresh Babu' },
    { roll: '08', name: 'Lakshmi Devi' },
  ],
  '6-C': [
    { roll: '01', name: 'Pranav Rao' },
    { roll: '02', name: 'Swathi Reddy' },
    { roll: '03', name: 'Harish Patel' },
    { roll: '04', name: 'Nisha Kumar' },
    { roll: '05', name: 'Ravi Teja' },
    { roll: '06', name: 'Deepika Singh' },
    { roll: '07', name: 'Ajay Nair' },
    { roll: '08', name: 'Rekha Sharma' },
  ],
  '6-D': [
    { roll: '01', name: 'Mohan Das' },
    { roll: '02', name: 'Sunita Verma' },
    { roll: '03', name: 'Vijay Mehta' },
    { roll: '04', name: 'Geeta Iyer' },
    { roll: '05', name: 'Ramesh Patel' },
    { roll: '06', name: 'Sonia Gupta' },
    { roll: '07', name: 'Kiran Rao' },
    { roll: '08', name: 'Deepak Joshi' },
  ],

  '7-A': [
    { roll: '01', name: 'Meena Pillai' },
    { roll: '02', name: 'Suresh Sharma' },
    { roll: '03', name: 'Lakshmi Nair' },
    { roll: '04', name: 'Arun Kumar' },
    { roll: '05', name: 'Preethi Reddy' },
    { roll: '06', name: 'Vishal Singh' },
    { roll: '07', name: 'Kavitha Das' },
    { roll: '08', name: 'Rajesh Verma' },
  ],
  '7-B': [
    { roll: '01', name: 'Aarav Sharma' },
    { roll: '02', name: 'Kavya Menon' },
    { roll: '03', name: 'Rohit Kumar' },
    { roll: '04', name: 'Swathi Reddy' },
    { roll: '05', name: 'Arjun Mehta' },
    { roll: '06', name: 'Nisha Kumar' },
    { roll: '07', name: 'Priya Patel' },
    { roll: '08', name: 'Harish Patel' },
  ],
  '7-C': [
    { roll: '01', name: 'Deepika Singh' },
    { roll: '02', name: 'Suresh Babu' },
    { roll: '03', name: 'Ajay Nair' },
    { roll: '04', name: 'Meera Pillai' },
    { roll: '05', name: 'Vikram Das' },
    { roll: '06', name: 'Rekha Sharma' },
    { roll: '07', name: 'Pooja Gupta' },
    { roll: '08', name: 'Ravi Teja' },
  ],
  '7-D': [
    { roll: '01', name: 'Ananya Singh' },
    { roll: '02', name: 'Mohan Das' },
    { roll: '03', name: 'Divya Iyer' },
    { roll: '04', name: 'Sunita Verma' },
    { roll: '05', name: 'Karthik Reddy' },
    { roll: '06', name: 'Vijay Mehta' },
    { roll: '07', name: 'Sneha Nair' },
    { roll: '08', name: 'Geeta Iyer' },
  ],

  '8-A': [
    { roll: '01', name: 'Pranav Rao' },
    { roll: '02', name: 'Lakshmi Devi' },
    { roll: '03', name: 'Aditya Joshi' },
    { roll: '04', name: 'Ramesh Patel' },
    { roll: '05', name: 'Kavya Menon' },
    { roll: '06', name: 'Sonia Gupta' },
    { roll: '07', name: 'Suresh Babu' },
    { roll: '08', name: 'Kiran Rao' },
  ],
  '8-B': [
    { roll: '01', name: 'Deepak Joshi' },
    { roll: '02', name: 'Preethi Reddy' },
    { roll: '03', name: 'Meena Pillai' },
    { roll: '04', name: 'Vishal Singh' },
    { roll: '05', name: 'Suresh Sharma' },
    { roll: '06', name: 'Kavitha Das' },
    { roll: '07', name: 'Lakshmi Nair' },
    { roll: '08', name: 'Rajesh Verma' },
  ],
  '8-C': [
    { roll: '01', name: 'Arun Kumar' },
    { roll: '02', name: 'Aarav Sharma' },
    { roll: '03', name: 'Sneha Nair' },
    { roll: '04', name: 'Rohit Kumar' },
    { roll: '05', name: 'Divya Iyer' },
    { roll: '06', name: 'Pooja Gupta' },
    { roll: '07', name: 'Arjun Mehta' },
    { roll: '08', name: 'Vikram Das' },
  ],
  '8-D': [
    { roll: '01', name: 'Rahul Verma' },
    { roll: '02', name: 'Ananya Singh' },
    { roll: '03', name: 'Swathi Reddy' },
    { roll: '04', name: 'Harish Patel' },
    { roll: '05', name: 'Nisha Kumar' },
    { roll: '06', name: 'Ravi Teja' },
    { roll: '07', name: 'Karthik Reddy' },
    { roll: '08', name: 'Ajay Nair' },
  ],

  '9-A': [
    { roll: '01', name: 'Rekha Sharma' },
    { roll: '02', name: 'Mohan Das' },
    { roll: '03', name: 'Sunita Verma' },
    { roll: '04', name: 'Vijay Mehta' },
    { roll: '05', name: 'Geeta Iyer' },
    { roll: '06', name: 'Ramesh Patel' },
    { roll: '07', name: 'Sonia Gupta' },
    { roll: '08', name: 'Kiran Rao' },
  ],
  '9-B': [
    { roll: '01', name: 'Deepak Joshi' },
    { roll: '02', name: 'Meena Pillai' },
    { roll: '03', name: 'Suresh Sharma' },
    { roll: '04', name: 'Lakshmi Nair' },
    { roll: '05', name: 'Arun Kumar' },
    { roll: '06', name: 'Preethi Reddy' },
    { roll: '07', name: 'Vishal Singh' },
    { roll: '08', name: 'Kavitha Das' },
  ],
  '9-C': [
    { roll: '01', name: 'Rajesh Verma' },
    { roll: '02', name: 'Aarav Sharma' },
    { roll: '03', name: 'Priya Patel' },
    { roll: '04', name: 'Rohit Kumar' },
    { roll: '05', name: 'Ananya Singh' },
    { roll: '06', name: 'Karthik Reddy' },
    { roll: '07', name: 'Sneha Nair' },
    { roll: '08', name: 'Arjun Mehta' },
  ],
  '9-D': [
    { roll: '01', name: 'Divya Iyer' },
    { roll: '02', name: 'Vikram Das' },
    { roll: '03', name: 'Pooja Gupta' },
    { roll: '04', name: 'Rahul Verma' },
    { roll: '05', name: 'Meera Pillai' },
    { roll: '06', name: 'Aditya Joshi' },
    { roll: '07', name: 'Kavya Menon' },
    { roll: '08', name: 'Suresh Babu' },
  ],

  '10-A': [
    { roll: '01', name: 'Lakshmi Devi' },
    { roll: '02', name: 'Pranav Rao' },
    { roll: '03', name: 'Swathi Reddy' },
    { roll: '04', name: 'Harish Patel' },
    { roll: '05', name: 'Nisha Kumar' },
    { roll: '06', name: 'Ravi Teja' },
    { roll: '07', name: 'Deepika Singh' },
    { roll: '08', name: 'Ajay Nair' },
  ],
  '10-B': [
    { roll: '01', name: 'Rekha Sharma' },
    { roll: '02', name: 'Mohan Das' },
    { roll: '03', name: 'Sunita Verma' },
    { roll: '04', name: 'Vijay Mehta' },
    { roll: '05', name: 'Geeta Iyer' },
    { roll: '06', name: 'Ramesh Patel' },
    { roll: '07', name: 'Sonia Gupta' },
    { roll: '08', name: 'Kiran Rao' },
  ],
  '10-C': [
    { roll: '01', name: 'Deepak Joshi' },
    { roll: '02', name: 'Meena Pillai' },
    { roll: '03', name: 'Suresh Sharma' },
    { roll: '04', name: 'Lakshmi Nair' },
    { roll: '05', name: 'Arun Kumar' },
    { roll: '06', name: 'Preethi Reddy' },
    { roll: '07', name: 'Vishal Singh' },
    { roll: '08', name: 'Kavitha Das' },
  ],
  '10-D': [
    { roll: '01', name: 'Rajesh Verma' },
    { roll: '02', name: 'Aarav Sharma' },
    { roll: '03', name: 'Priya Patel' },
    { roll: '04', name: 'Rohit Kumar' },
    { roll: '05', name: 'Ananya Singh' },
    { roll: '06', name: 'Karthik Reddy' },
    { roll: '07', name: 'Sneha Nair' },
    { roll: '08', name: 'Arjun Mehta' },
  ],
};

export default function MarkAttendance() {
  const [cls, setCls] = useState('8');
  const [sec, setSec] = useState('A');
  const [loaded, setLoaded] = useState(true);
  const [loading, setLoading] = useState(true);
  const key = useMemo(() => `${cls}-${sec}`, [cls, sec]);
  const base = useMemo(() => (
    STUDENTS_BY_CLASS_SECTION[key] || STUDENTS_BY_CLASS_SECTION['8-A']
  ), [key]);
  const [students, setStudents] = useState<AttendanceStudent[]>(base.map(s => ({ ...s, status: 'P' })));
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    setStudents(base.map(s => ({ ...s, status: 'P' })));
    setSubmitted(false);
  }, [base]);

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 500);
    return () => clearTimeout(t);
  }, []);

  const setStatus = (i: number, s: string) => {
    const arr = [...students]; arr[i].status = s; setStudents(arr); setSubmitted(false);
  };

  return (
    <AppShell role="staff">
      <ScreenHeader title="Mark Attendance" back={false} />
      <div className="px-5 pt-4">
        {loading ? (
          <div className="space-y-3">
            <div className="grid grid-cols-2 gap-3 mb-3">
              <Skeleton className="h-12 w-full rounded-lg bg-[#F3F4F6]" />
              <Skeleton className="h-12 w-full rounded-lg bg-[#F3F4F6]" />
            </div>
            <Skeleton className="h-5 w-48 bg-[#F3F4F6]" />
            <Skeleton className="h-11 w-full rounded-full bg-[#F3F4F6]" />
            <div className="space-y-2.5 mb-5">
              {[...Array(7)].map((_, i) => (
                <Skeleton key={i} className="h-[52px] w-full rounded-xl bg-[#F3F4F6]" />
              ))}
            </div>
            <Skeleton className="h-[52px] w-full rounded-full bg-[#F3F4F6]" />
          </div>
        ) : (
          <>
            <div className="grid grid-cols-2 gap-3 mb-3">
              <select value={cls} onChange={e => setCls(e.target.value)} className="input-field">
                {['6', '7', '8', '9', '10'].map(c => <option key={c} value={c}>Class {c}</option>)}
              </select>
              <select value={sec} onChange={e => setSec(e.target.value)} className="input-field">
                {['A', 'B', 'C', 'D'].map(s => <option key={s} value={s}>Section {s}</option>)}
              </select>
            </div>
            <p className="text-[12px] text-muted-foreground mb-3">Date: <span className="font-semibold text-foreground">April 21, 2025</span></p>
            <button onClick={() => { setLoaded(true); setStudents(base.map(s => ({ ...s, status: 'P' }))); setSubmitted(false); }} className="btn-primary mb-4" style={{ height: 44 }}>Load Students</button>

            {loaded && (
              <div className="space-y-2.5 mb-5">
                {students.map((s, i) => (
                  <div key={s.roll} className="card-base p-3 flex items-center gap-3">
                    <span className="w-8 h-8 rounded-lg bg-secondary text-primary text-[12px] font-semibold flex items-center justify-center">{s.roll}</span>
                    <p className="flex-1 text-[13px] font-medium text-foreground">{s.name}</p>
                    <div className="flex gap-1.5">
                      {[
                        { k: 'P', bg: '#5CB85C' },
                        { k: 'A', bg: '#E85D5D' },
                        { k: 'L', bg: '#F5A623' },
                      ].map(b => (
                        <button key={b.k} onClick={() => setStatus(i, b.k)} className={`w-8 h-8 rounded-full text-[12px] font-bold transition ${s.status === b.k ? 'text-white' : 'bg-muted text-muted-foreground'}`} style={s.status === b.k ? { background: b.bg } : {}}>
                          {b.k}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {submitted && (
              <div className="rounded-xl bg-tint-green border border-success/30 p-3.5 mb-4 flex items-start gap-2 animate-fade-in">
                <CheckCircle2 size={18} className="text-success mt-0.5" />
                <p className="text-[12px] text-foreground">Attendance submitted for Class {cls}{sec} — April 21, 2025</p>
              </div>
            )}

            <button onClick={() => setSubmitted(true)} className="btn-primary mb-4">Submit Attendance</button>
          </>
        )}
      </div>
    </AppShell>
  );
}
