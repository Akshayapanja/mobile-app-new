import { useMemo, useState } from 'react';
import { AppShell } from '@/components/AppShell';
import { ScreenHeader } from '@/components/ScreenHeader';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';

type Student = {
  roll: string;
  name: string;
  father: string;
  mother: string;
  phone: string;
  email: string;
};

const STUDENTS: Student[] = [
  { roll: '01', name: 'Aarav Sharma', father: 'Mr. Ramesh Sharma', mother: 'Mrs. Sunita Sharma', phone: '+91 9800000011', email: 'aarav.parent@email.com' },
  { roll: '02', name: 'Priya Patel', father: 'Mr. Rakesh Patel', mother: 'Mrs. Meena Patel', phone: '+91 9800000012', email: 'priya.patel.parent@email.com' },
  { roll: '03', name: 'Rohit Kumar', father: 'Mr. Suresh Kumar', mother: 'Mrs. Priya Kumar', phone: '+91 9800000001', email: 'priya.kumar@email.com' },
  { roll: '04', name: 'Ananya Singh', father: 'Mr. Vikram Singh', mother: 'Mrs. Kavitha Singh', phone: '+91 9800000013', email: 'ananya.parent@email.com' },
  { roll: '05', name: 'Karthik Reddy', father: 'Mr. Rajan Reddy', mother: 'Mrs. Suma Reddy', phone: '+91 9800000014', email: 'karthik.parent@email.com' },
  { roll: '06', name: 'Sneha Nair', father: 'Mr. Mohan Nair', mother: 'Mrs. Latha Nair', phone: '+91 9800000015', email: 'sneha.parent@email.com' },
  { roll: '07', name: 'Arjun Mehta', father: 'Mr. Deepak Mehta', mother: 'Mrs. Pooja Mehta', phone: '+91 9800000016', email: 'arjun.parent@email.com' },
  { roll: '08', name: 'Divya Iyer', father: 'Mr. Krishna Iyer', mother: 'Mrs. Radha Iyer', phone: '+91 9800000017', email: 'divya.parent@email.com' },
];

export default function StudentList() {
  const nav = useNavigate();
  const [klass, setKlass] = useState('8');
  const [section, setSection] = useState('A');
  const [loaded, setLoaded] = useState(true);
  const [open, setOpen] = useState<Record<string, boolean>>({ '03': true });

  const list = useMemo(() => (loaded ? STUDENTS : []), [loaded]);

  const chatIdForStudent = (name: string) => {
    const map: Record<string, number> = {
      'Aarav Sharma': 6,
      'Priya Patel': 7,
      'Rohit Kumar': 1,
      'Ananya Singh': 9,
      'Karthik Reddy': 10,
      'Sneha Nair': 11,
      'Arjun Mehta': 12,
      'Divya Iyer': 8,
    };
    return map[name];
  };

  return (
    <AppShell role="staff">
      <ScreenHeader title="Student Details" />
      <div className="px-5 pt-4 pb-2">
        <div className="flex items-center gap-2 mb-4">
          <select
            value={klass}
            onChange={e => setKlass(e.target.value)}
            className="input-field"
            style={{ width: '50%' }}
          >
            <option value="8">Class 8</option>
            <option value="7">Class 7</option>
            <option value="9">Class 9</option>
          </select>
          <select
            value={section}
            onChange={e => setSection(e.target.value)}
            className="input-field"
            style={{ width: '50%', minWidth: 160 }}
          >
            <option value="A">Section A</option>
            <option value="B">Section B</option>
            <option value="C">Section C</option>
            <option value="D">Section D</option>
          </select>
        </div>

        <button
          onClick={() => setLoaded(true)}
          className="btn-primary mb-5"
        >
          Load Students
        </button>

        <div className="space-y-3 mb-5">
          {list.map(s => {
            const expanded = !!open[s.roll];
            return (
              <div key={s.roll} className="bg-white rounded-xl p-[14px]" style={{ border: '1px solid #E5E7EB' }}>
                <button
                  onClick={() => setOpen(prev => ({ ...prev, [s.roll]: !prev[s.roll] }))}
                  className="w-full flex items-center justify-between"
                >
                  <div className="flex items-center gap-2">
                    <span className="pill" style={{ background: '#EAF3FB', color: '#4A90D9' }}>{s.roll}</span>
                    <p className="text-[14px] font-bold text-foreground">{s.name}</p>
                  </div>
                  <span className="text-[16px] text-muted-foreground">{expanded ? '▾' : '▸'}</span>
                </button>

                {expanded && (
                  <div className="mt-4">
                    <p className="text-[11px] text-muted-foreground mb-2">👨‍👩‍👧 Parent Details</p>

                    <div className="space-y-2 text-[13px]">
                      <div className="flex items-center justify-between">
                        <span className="text-foreground">{s.father}</span>
                        <a className="text-foreground font-medium flex items-center gap-2" href={`tel:${s.phone.replace(/\s/g, '')}`}>
                          <span>{s.phone}</span>
                          <span className="text-[16px] leading-none">📞</span>
                        </a>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-foreground">{s.mother}</span>
                        <a className="text-foreground font-medium flex items-center gap-2" href={`tel:${s.phone.replace(/\s/g, '')}`}>
                          <span>{s.phone}</span>
                          <span className="text-[16px] leading-none">📞</span>
                        </a>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-muted-foreground">Email</span>
                        <span className="text-foreground font-medium">{s.email}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 mt-4">
                      <button
                        onClick={() => {
                          const id = chatIdForStudent(s.name);
                          if (!id) {
                            toast.error('Chat not available');
                            return;
                          }
                          nav(`/staff/chat/${id}`);
                        }}
                        className="pill px-3 py-2"
                        style={{ background: '#EAF3FB', color: '#4A90D9' }}
                      >
                        Send Message
                      </button>
                      <button className="btn-ghost border border-border px-3 py-2 h-auto">Send to Whole Class</button>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <button
          onClick={() => toast.success('Message sent to all Class 8A parents!')}
          className="w-full rounded-full py-3 text-white font-semibold"
          style={{ background: '#5CB85C' }}
        >
          Send Message to Whole Class
        </button>
      </div>
    </AppShell>
  );
}

