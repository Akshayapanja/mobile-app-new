import { useState } from 'react';
import { AppShell } from '@/components/AppShell';
import { ScreenHeader } from '@/components/ScreenHeader';
import { toast } from 'sonner';

export default function BroadcastMessage() {
  const [msg, setMsg] = useState('');

  return (
    <AppShell role="staff">
      <ScreenHeader title="Message to Class 8A Parents" />
      <div className="px-5 pt-4 pb-2">
        <div className="mb-4">
          <span className="pill" style={{ background: '#EAF3FB', color: '#4A90D9' }}>All Class 8A Parents (32)</span>
        </div>

        <textarea
          value={msg}
          onChange={e => setMsg(e.target.value)}
          placeholder="Type your message..."
          className="input-field min-h-[120px] resize-none"
        />

        <button
          onClick={() => {
            if (!msg.trim()) return;
            toast.success('✅ Message sent to all 32 parents \nof Class 8A!');
            setMsg('');
          }}
          className="w-full rounded-full py-3 text-white font-semibold mt-4"
          style={{ background: '#5CB85C' }}
        >
          Send to All Parents
        </button>
      </div>
    </AppShell>
  );
}

