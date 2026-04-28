import { useEffect, useState } from 'react';
import { AppShell } from '@/components/AppShell';
import { ScreenHeader } from '@/components/ScreenHeader';
import { MARKS_STUDENTS } from '@/lib/mockData';
import { toast } from 'sonner';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Skeleton } from '@/components/ui/skeleton';

const colorMap: Record<string, { bg: string; color: string }> = {
  green: { bg: '#F0FDF4', color: '#5CB85C' },
  blue: { bg: '#EAF3FB', color: '#4A90D9' },
  amber: { bg: '#FFF8E7', color: '#F5A623' },
  red: { bg: '#FEF2F2', color: '#E85D5D' },
};

export default function MarksEntry() {
  const [data, setData] = useState(MARKS_STUDENTS.map(s => ({ ...s })));
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 500);
    return () => clearTimeout(t);
  }, []);

  return (
    <AppShell role="staff">
      <ScreenHeader title="Marks Entry" />
      <div className="px-5 pt-4">
        {loading ? (
          <div className="space-y-3">
            <div className="grid grid-cols-2 gap-3 mb-3">
              <Skeleton className="h-12 w-full rounded-lg bg-[#F3F4F6]" />
              <Skeleton className="h-12 w-full rounded-lg bg-[#F3F4F6]" />
            </div>
            <div className="grid grid-cols-2 gap-3 mb-3">
              <Skeleton className="h-12 w-full rounded-lg bg-[#F3F4F6]" />
              <Skeleton className="h-12 w-full rounded-lg bg-[#F3F4F6]" />
            </div>
            <Skeleton className="h-11 w-full rounded-full bg-[#F3F4F6]" />
            <div className="space-y-2.5 mb-4">
              {[...Array(6)].map((_, i) => (
                <Skeleton key={i} className="h-[54px] w-full rounded-xl bg-[#F3F4F6]" />
              ))}
            </div>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-2 gap-3 mb-3">
              <select className="input-field"><option>Mid Term</option><option>Unit Test 1</option></select>
              <select className="input-field"><option>Class 8</option><option>Class 9</option></select>
            </div>
            <div className="grid grid-cols-2 gap-3 mb-3">
              <select className="input-field"><option>Section A</option></select>
              <select className="input-field"><option>Mathematics</option></select>
            </div>
            <button className="btn-primary mb-4" style={{ height: 44 }}>Load Students</button>

            <div className="space-y-2.5 mb-4">
              {data.map((s, i) => {
                const cm = colorMap[s.color];
                return (
                  <div key={s.name} className="card-base p-3 flex items-center gap-3">
                    <p className="flex-1 text-[13px] font-medium text-foreground">{s.name}</p>
                    <span className="text-[11px] text-muted-foreground">/{s.max}</span>
                    <input
                      type="number"
                      value={s.marks}
                      onChange={e => { const arr = [...data]; arr[i].marks = parseInt(e.target.value || '0'); setData(arr); }}
                      className="w-14 h-9 text-center border border-border rounded-lg text-[13px]"
                    />
                    <span className="pill" style={{ background: cm.bg, color: cm.color }}>{s.grade}</span>
                  </div>
                );
              })}
            </div>

            <div className="grid grid-cols-2 gap-3 mb-2">
              <button onClick={() => toast.success('✅ Marks saved successfully for Class 8A')} className="btn-primary">Save</button>
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <button className="btn-primary" style={{ background: '#1F2937' }}>Lock Marks</button>
                </AlertDialogTrigger>
                <AlertDialogContent className="max-w-[360px]">
                  <AlertDialogHeader>
                    <AlertDialogTitle>Lock marks?</AlertDialogTitle>
                    <AlertDialogDescription>
                      Are you sure you want to lock marks? This cannot be undone.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction
                      onClick={() => toast.success('🔒 Marks locked for Class 8A Mid Term exam')}
                      className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                    >
                      Lock Marks
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          </>
        )}
      </div>
    </AppShell>
  );
}
