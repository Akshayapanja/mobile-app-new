import { AppShell } from '@/components/AppShell';
import { ScreenHeader } from '@/components/ScreenHeader';
import { getUser } from '@/lib/session';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { toast } from 'sonner';

export default function Payslip() {
  const u = getUser()!;
  const earnings = [
    { l: 'Basic Salary', v: 45000 },
    { l: 'HRA', v: 9000 },
    { l: 'Transport Allowance', v: 2000 },
    { l: 'Medical Allowance', v: 1500 },
  ];
  const ded = [{ l: 'PF', v: 5400 }, { l: 'Professional Tax', v: 200 }];
  const totalE = earnings.reduce((a, b) => a + b.v, 0);
  const totalD = ded.reduce((a, b) => a + b.v, 0);

  return (
    <AppShell role="staff">
      <ScreenHeader title="My Payslip" />
      <div className="px-5 pt-4">
        <div className="flex items-center justify-between mb-4">
          <button className="p-2"><ChevronLeft size={18} /></button>
          <h3 className="text-[15px] font-semibold">April 2025</h3>
          <button className="p-2"><ChevronRight size={18} /></button>
        </div>

        <div className="card-base p-4 mb-4">
          <p className="text-[14px] font-semibold text-foreground">{u.name}</p>
          <p className="text-[12px] text-muted-foreground">{u.designation}</p>
          <p className="text-[12px] text-muted-foreground">Employee ID: {u.employeeId}</p>
        </div>

        <div className="card-base p-4 mb-4">
          <p className="text-[12px] font-semibold text-muted-foreground uppercase tracking-wider mb-2.5">Gross Earnings</p>
          <div className="space-y-2 mb-3">
            {earnings.map(e => (
              <div key={e.l} className="flex justify-between text-[13px]">
                <span className="text-foreground">{e.l}</span>
                <span className="text-foreground">₹{e.v.toLocaleString()}</span>
              </div>
            ))}
          </div>
          <div className="flex justify-between border-t border-border pt-2.5 text-[14px] font-bold text-success">
            <span>Total Earnings</span><span>₹{totalE.toLocaleString()}</span>
          </div>

          <p className="text-[12px] font-semibold text-muted-foreground uppercase tracking-wider mb-2.5 mt-5">Deductions</p>
          <div className="space-y-2 mb-3">
            {ded.map(e => (
              <div key={e.l} className="flex justify-between text-[13px]">
                <span className="text-foreground">{e.l}</span>
                <span className="text-foreground">₹{e.v.toLocaleString()}</span>
              </div>
            ))}
          </div>
          <div className="flex justify-between border-t border-border pt-2.5 text-[14px] font-bold text-destructive">
            <span>Total Deductions</span><span>₹{totalD.toLocaleString()}</span>
          </div>

          <div className="border-t-2 border-dashed border-border mt-4 pt-4 flex justify-between items-center">
            <span className="text-[14px] font-semibold text-foreground">Net Pay</span>
            <span className="text-[24px] font-extrabold text-primary">₹{(totalE - totalD).toLocaleString()}</span>
          </div>
        </div>

        <button onClick={() => toast.success('Payslip for April 2025 downloaded!')} className="btn-primary">⬇ Download Payslip</button>
      </div>
    </AppShell>
  );
}
