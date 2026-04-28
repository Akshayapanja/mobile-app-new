import { useState } from 'react';
import { AppShell } from '@/components/AppShell';
import { ScreenHeader } from '@/components/ScreenHeader';
import { AI_CONTENT, detectTopic, TOPIC_LABEL } from '@/lib/mockData';
import { getUser } from '@/lib/session';
import { Paperclip, Upload } from 'lucide-react';
import { toast } from 'sonner';

type Mode = 'simplify' | 'mcq' | 'workflow';

export default function HomeworkBot() {
  const u = getUser()!;
  const [tab, setTab] = useState<'type' | 'upload'>('type');
  const [topic, setTopic] = useState('');
  const [filename, setFilename] = useState('');
  const [output, setOutput] = useState('');
  const [currentTopic, setCurrentTopic] = useState('');
  const [cls, setCls] = useState('8');
  const [sec, setSec] = useState('A');

  const generate = (mode: Mode) => {
    const source = tab === 'type' ? topic : filename;
    if (!source) { toast.error('Provide a topic or file'); return; }
    const t = detectTopic(source);
    setCurrentTopic(t);
    setOutput(AI_CONTENT[t][mode]);
    toast.success('Content generated');
  };

  const send = () => {
    if (!output) return;
    const detectedTopic = TOPIC_LABEL[currentTopic] || 'Generated';
    const payload = {
      id: Date.now(),
      subject: detectedTopic,
      title: 'AI Generated: ' + detectedTopic,
      content: output,
      class: cls,
      section: sec,
      sentBy: 'Mrs. Lakshmi Subramaniam',
      sentAt: new Date().toLocaleDateString(),
      type: 'AI Generated',
    };
    localStorage.setItem('sentHomework', JSON.stringify(payload));
    toast.success(`Homework sent to Class ${cls} - Section ${sec} parents!`);
  };

  const onFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (f) setFilename(f.name);
  };

  return (
    <AppShell role="staff">
      <ScreenHeader title="AI Homework Bot" />
      <div className="px-5 pt-4">
        <p className="text-[12px] text-muted-foreground mb-4">Generate homework from topics or uploads</p>

        <div className="flex gap-2 mb-4 p-1 bg-muted rounded-full">
          <button onClick={() => setTab('type')} className={`flex-1 py-2 rounded-full text-[12px] font-medium ${tab === 'type' ? 'bg-white text-primary shadow-sm' : 'text-muted-foreground'}`}>✏️ Type Topic</button>
          <button onClick={() => setTab('upload')} className={`flex-1 py-2 rounded-full text-[12px] font-medium ${tab === 'upload' ? 'bg-white text-primary shadow-sm' : 'text-muted-foreground'}`}>📎 Upload File</button>
        </div>

        {tab === 'type' ? (
          <textarea
            value={topic}
            onChange={e => setTopic(e.target.value)}
            placeholder="Type a topic... Example: Photosynthesis Class 8, Newton's Laws, Water Cycle"
            rows={4}
            className="input-field resize-none mb-3"
          />
        ) : (
          <label className="border-2 border-dashed border-primary/40 rounded-xl p-6 text-center bg-secondary/30 block mb-3 cursor-pointer">
            <Paperclip size={28} className="mx-auto text-primary mb-2" />
            <p className="text-[13px] font-semibold text-foreground">{filename || 'Upload textbook photo or PDF'}</p>
            <p className="text-[11px] text-muted-foreground mt-1">Supports JPG, PNG, PDF</p>
            <span className="inline-block mt-3 px-4 py-1.5 bg-primary text-primary-foreground rounded-full text-[12px] font-medium"><Upload size={12} className="inline mr-1" />Choose File</span>
            <input type="file" className="hidden" onChange={onFile} accept="image/*,application/pdf" />
          </label>
        )}

        <div className="grid grid-cols-3 gap-2 mb-5">
          <button onClick={() => generate('simplify')} className="rounded-full py-2.5 text-[11px] font-semibold text-white" style={{ background: '#3BAFDA' }}>📝 Simplify</button>
          <button onClick={() => generate('mcq')} className="rounded-full py-2.5 text-[11px] font-semibold text-white" style={{ background: '#7C3AED' }}>❓ MCQs</button>
          <button onClick={() => generate('workflow')} className="rounded-full py-2.5 text-[11px] font-semibold text-white" style={{ background: '#EA580C' }}>📋 Workflow</button>
        </div>

        <div className="card-base p-4 mb-5 min-h-[200px] max-h-[320px] overflow-y-auto">
          {output ? (
            <pre className="text-[12px] text-foreground whitespace-pre-wrap font-sans leading-relaxed">{output}</pre>
          ) : (
            <p className="text-[13px] text-muted-foreground text-center py-12">Content will appear here...</p>
          )}
        </div>

        {output && (
          <div className="card-base p-4 animate-fade-in">
            <p className="text-[12px] font-semibold text-muted-foreground uppercase tracking-wider mb-3">Send to Students</p>
            <div className="grid grid-cols-2 gap-3 mb-3">
              <select value={cls} onChange={e => setCls(e.target.value)} className="input-field">{['6','7','8','9','10'].map(c=><option key={c}>{c}</option>)}</select>
              <select value={sec} onChange={e => setSec(e.target.value)} className="input-field">{['A','B','C'].map(s=><option key={s}>{s}</option>)}</select>
            </div>
            <button onClick={send} className="w-full rounded-full text-white font-semibold py-3" style={{ background: '#5CB85C' }}>📤 Send as Homework</button>
          </div>
        )}
      </div>
    </AppShell>
  );
}
