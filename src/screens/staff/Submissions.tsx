import { useState } from 'react';
import { AppShell, ProgressBar } from '@/components/AppShell';
import { ScreenHeader } from '@/components/ScreenHeader';
import { SUBMISSIONS } from '@/lib/mockData';
import { toast } from 'sonner';

export default function Submissions() {
  const [data, setData] = useState(SUBMISSIONS.map(s => ({ ...s })));
  const submitted = data.filter(d => d.submitted).length;

  return (
    <AppShell role="staff">
      <ScreenHeader title="Submissions" />
      <div className="px-5 pt-4">
        <div className="card-base p-4 mb-4">
          <p className="text-[14px] font-bold text-foreground">Mathematics — Ex 5.3</p>
          <p className="text-[11px] text-muted-foreground">Class 8 - A · Due Apr 15</p>
          <div className="mt-3 mb-1 flex justify-between text-[11px]"><span className="text-muted-foreground">{submitted}/{data.length} submitted</span></div>
          <ProgressBar value={(submitted / data.length) * 100} color="#4A90D9" />
        </div>

        <div className="space-y-2.5 mb-4">
          {data.map((s, i) => (
            <div key={s.roll} className="card-base p-3 flex items-center gap-3">
              <span className="w-8 h-8 rounded-lg bg-secondary text-primary text-[12px] font-semibold flex items-center justify-center">{s.roll}</span>
              <div className="flex-1">
                <p className="text-[13px] font-medium text-foreground">{s.name}</p>
                <span className={`pill mt-1 ${s.submitted ? 'bg-tint-green text-success' : 'bg-tint-red text-destructive'}`}>{s.submitted ? 'Submitted ✓' : 'Not Submitted'}</span>
              </div>
              <input
                type="number"
                disabled={!s.submitted}
                value={s.grade ?? ''}
                onChange={e => { const v = e.target.value ? parseInt(e.target.value) : null; const arr=[...data]; arr[i].grade = v as number | null; setData(arr); }}
                placeholder="—"
                className="w-14 h-9 text-center border border-border rounded-lg text-[13px] disabled:bg-muted disabled:opacity-50"
              />
            </div>
          ))}
        </div>

        <button onClick={() => toast.success('Grades saved successfully')} className="btn-primary">Save Grades</button>
      </div>
    </AppShell>
  );
}
