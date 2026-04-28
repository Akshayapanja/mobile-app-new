import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppShell } from '@/components/AppShell';
import { ScreenHeader } from '@/components/ScreenHeader';
import { toast } from 'sonner';

export default function CreateHomework() {
  const nav = useNavigate();
  const [form, setForm] = useState({ cls: '8', sec: 'A', subject: 'Mathematics', title: '', desc: '', due: '2025-04-30', maxMarks: '20' });
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    setSubmitting(false);
    setSuccess(false);
  }, []);

  const submit = () => {
    if (submitting) return;
    if (!form.cls || !form.sec || !form.subject || !form.title || !form.desc || !form.due || !form.maxMarks) {
      toast.error('Please fill all required fields');
      return;
    }
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      setSuccess(true);
      toast.success('Homework created successfully');
    }, 1000);
  };

  return (
    <AppShell role="staff">
      <ScreenHeader
        title="Create Homework"
        right={
          <button
            onClick={() => nav('/staff/homework-bot')}
            aria-label="AI Homework Bot"
            className="flex items-center justify-center"
            style={{
              width: 36,
              height: 36,
              borderRadius: '50%',
              background: '#FFF8E7',
              border: '1px solid #F5A623',
            }}
          >
            <span style={{ fontSize: 18, lineHeight: 1 }}>🤖</span>
          </button>
        }
      />
      <div className="px-5 pt-4">
        {success ? (
          <div
            style={{ background: '#F0FDF4', border: '1px solid #5CB85C', borderRadius: 12, padding: 16 }}
            className="animate-fade-in"
          >
            <p style={{ color: '#5CB85C', fontWeight: 700, fontSize: 15 }}>✅ Homework Created Successfully!</p>
            <p className="text-[13px] text-muted-foreground mt-2">
              Subject: <span className="font-medium text-foreground">{form.subject}</span>
              {'\n'}
              Class: <span className="font-medium text-foreground">{form.cls}</span> · Section:{' '}
              <span className="font-medium text-foreground">{form.sec}</span>
              {'\n'}
              Due date: <span className="font-medium text-foreground">{form.due}</span>
            </p>
            <p className="text-[13px] text-muted-foreground mt-2">
              Homework has been assigned to
              {'\n'}
              students. Parents will be notified.
            </p>
            <div className="grid grid-cols-2 gap-3 mt-4">
              <button
                onClick={() => {
                  setForm({ cls: '8', sec: 'A', subject: 'Mathematics', title: '', desc: '', due: '2025-04-30', maxMarks: '20' });
                  setSuccess(false);
                }}
                className="btn-ghost border border-border"
              >
                Create Another
              </button>
              <button onClick={() => nav('/staff/homework')} className="btn-primary">
                View Homework List
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-[12px] font-medium block mb-1.5">Class</label>
                <select value={form.cls} onChange={e => setForm({ ...form, cls: e.target.value })} className="input-field">{['6', '7', '8', '9', '10'].map(c => <option key={c}>{c}</option>)}</select>
              </div>
              <div>
                <label className="text-[12px] font-medium block mb-1.5">Section</label>
                <select value={form.sec} onChange={e => setForm({ ...form, sec: e.target.value })} className="input-field">{['A', 'B', 'C'].map(s => <option key={s}>{s}</option>)}</select>
              </div>
            </div>
            <div>
              <label className="text-[12px] font-medium block mb-1.5">Subject</label>
              <input value={form.subject} onChange={e => setForm({ ...form, subject: e.target.value })} className="input-field" />
            </div>
            <div>
              <label className="text-[12px] font-medium block mb-1.5">Title</label>
              <input value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} placeholder="Homework title" className="input-field" />
            </div>
            <div>
              <label className="text-[12px] font-medium block mb-1.5">Description</label>
              <textarea value={form.desc} onChange={e => setForm({ ...form, desc: e.target.value })} rows={4} placeholder="Homework details..." className="input-field resize-none" />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-[12px] font-medium block mb-1.5">Due Date</label>
                <input type="date" value={form.due} onChange={e => setForm({ ...form, due: e.target.value })} className="input-field" />
              </div>
              <div>
                <label className="text-[12px] font-medium block mb-1.5">Max Marks</label>
                <input value={form.maxMarks} onChange={e => setForm({ ...form, maxMarks: e.target.value })} className="input-field" />
              </div>
            </div>
            <button onClick={submit} disabled={submitting} className="btn-primary mt-2">
              {submitting ? 'Submitting...' : 'Create Homework'}
            </button>
          </div>
        )}
      </div>
    </AppShell>
  );
}
