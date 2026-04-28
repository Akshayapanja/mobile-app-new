import { useEffect, useState } from 'react';
import { AppShell, Avatar } from '@/components/AppShell';
import { ScreenHeader } from '@/components/ScreenHeader';
import { getUser } from '@/lib/session';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';

export default function StaffApplyLeave() {
  const nav = useNavigate();
  const u = getUser()!;
  const [type, setType] = useState('Casual Leave');
  const [from, setFrom] = useState('2025-04-25');
  const [to, setTo] = useState('2025-04-26');
  const [reason, setReason] = useState('');
  const [success, setSuccess] = useState(false);
  const days = Math.max(1, Math.round((new Date(to).getTime() - new Date(from).getTime()) / 86400000) + 1);
  const initials = u.name.split(' ').slice(-2).map(s => s[0]).join('');

  const balances = [
    { label: 'Casual', value: 8, bg: '#EAF3FB' },
    { label: 'Medical', value: 12, bg: '#F0FDF4' },
    { label: 'Personal', value: 5, bg: '#FFF8E7' },
  ];

  const history = [
    { type: 'Medical Leave', date: 'Apr 1-3', status: 'Approved', color: 'success' },
    { type: 'Casual Leave', date: 'Mar 15', status: 'Approved', color: 'success' },
    { type: 'Personal Leave', date: 'Feb 20', status: 'Rejected', color: 'destructive' },
  ];

  useEffect(() => {
    setSuccess(false);
  }, []);

  return (
    <AppShell role="staff">
      <ScreenHeader title="Apply Leave" />
      <div className="px-5 pt-4">
        <div className="card-base p-3 flex items-center gap-3 mb-4">
          <Avatar initials={initials} bg="#EAF3FB" color="#4A90D9" size={44} />
          <div>
            <p className="text-[14px] font-semibold text-foreground">{u.name}</p>
            <p className="text-[12px] text-muted-foreground">{u.designation}</p>
          </div>
        </div>

        <h3 className="text-[13px] font-semibold mb-2.5">Leave Balance</h3>
        <div className="grid grid-cols-3 gap-2.5 mb-5">
          {balances.map(b => (
            <div key={b.label} className="rounded-xl p-3 text-center" style={{ background: b.bg }}>
              <p className="text-[18px] font-bold text-foreground">{b.value}</p>
              <p className="text-[10px] text-muted-foreground">{b.label}</p>
            </div>
          ))}
        </div>

        {success ? (
          <div className="mb-5 animate-fade-in" style={{ background: '#F0FDF4', border: '1px solid #5CB85C', borderRadius: 12, padding: 16 }}>
            <p style={{ color: '#5CB85C', fontWeight: 700, fontSize: 15 }}>✅ Leave Request Submitted!</p>
            <p className="text-[13px] text-muted-foreground mt-2">Your leave request has been sent{'\n'}to HR for approval.</p>
            <p className="text-[12px] text-muted-foreground mt-2">Expected response within 24 hours</p>
            <button onClick={() => nav('/staff/dashboard')} className="btn-primary mt-4">Back to Dashboard</button>
          </div>
        ) : (
          <>
            <div className="space-y-3 mb-4">
              <div>
                <label className="text-[12px] font-medium block mb-1.5">Leave Type</label>
                <select value={type} onChange={e => setType(e.target.value)} className="input-field">
                  <option>Casual Leave</option><option>Medical Leave</option><option>Personal Leave</option>
                </select>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div><label className="text-[12px] font-medium block mb-1.5">From</label><input type="date" value={from} onChange={e => setFrom(e.target.value)} className="input-field" /></div>
                <div><label className="text-[12px] font-medium block mb-1.5">To</label><input type="date" value={to} onChange={e => setTo(e.target.value)} className="input-field" /></div>
              </div>
              <div><span className="pill bg-secondary text-primary">Duration: {days} day{days > 1 ? 's' : ''}</span></div>
              <div>
                <label className="text-[12px] font-medium block mb-1.5">Reason</label>
                <textarea value={reason} onChange={e => setReason(e.target.value)} rows={3} placeholder="Enter reason..." className="input-field resize-none" />
              </div>
            </div>

            <button
              onClick={() => {
                toast.success('Leave request submitted to admin');
                setSuccess(true);
              }}
              className="btn-primary mb-5"
            >
              Submit Leave
            </button>
          </>
        )}

        <h3 className="text-[13px] font-semibold mb-2.5">Leave History</h3>
        <div className="space-y-2.5">
          {history.map((h, i) => (
            <div key={i} className="card-base p-3 flex items-center justify-between">
              <div>
                <p className="text-[13px] font-medium text-foreground">{h.type}</p>
                <p className="text-[11px] text-muted-foreground">{h.date}</p>
              </div>
              <span className={`pill ${h.color === 'success' ? 'bg-tint-green text-success' : 'bg-tint-red text-destructive'}`}>{h.status}</span>
            </div>
          ))}
        </div>
      </div>
    </AppShell>
  );
}
