import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { getUser } from '../../lib/session';

type Role = 'parent' | 'staff';

type Contact = {
  id: string;
  name: string;
  roleLine: string;
  initials: string;
  bg: string;
  fg: string;
};

type ChatMsg = { id: string; dir: 'in' | 'out'; text: string; time: string };

const PARENT_CONTACTS: Contact[] = [
  { id: '1', name: 'Mrs. Lakshmi Subramaniam', roleLine: 'Mathematics Teacher', initials: 'LK', bg: '#EAF3FB', fg: '#4A90D9' },
  { id: '2', name: 'Mr. Rajesh Venkataraman', roleLine: 'Science Teacher', initials: 'RV', bg: '#F0FDF4', fg: '#5CB85C' },
  { id: '3', name: 'School Principal', roleLine: 'Administration', initials: 'SP', bg: '#FFF8E7', fg: '#F5A623' },
];

const STAFF_CONTACTS: Contact[] = [
  { id: '1', name: 'Mrs. Priya Kumar', roleLine: "Rohit's Mother", initials: 'PK', bg: '#EAF3FB', fg: '#4A90D9' },
  { id: '6', name: 'Mrs. Sunita Sharma', roleLine: "Aarav's Mother", initials: 'SS', bg: '#EAF3FB', fg: '#4A90D9' },
  { id: '7', name: 'Mrs. Meena Patel', roleLine: "Priya's Mother", initials: 'MP', bg: '#F0FDF4', fg: '#5CB85C' },
  { id: '8', name: 'Mrs. Radha Iyer', roleLine: "Divya's Mother", initials: 'RI', bg: '#FFF8E7', fg: '#F5A623' },
  { id: '9', name: 'Mrs. Kavitha Singh', roleLine: "Ananya's Mother", initials: 'KS', bg: '#FFF0F0', fg: '#E85D5D' },
  { id: '10', name: 'Mrs. Suma Reddy', roleLine: "Karthik's Mother", initials: 'SR', bg: '#EAF3FB', fg: '#4A90D9' },
  { id: '11', name: 'Mrs. Latha Nair', roleLine: "Sneha's Mother", initials: 'LN', bg: '#F0FDF4', fg: '#5CB85C' },
  { id: '12', name: 'Mrs. Pooja Mehta', roleLine: "Arjun's Mother", initials: 'PM', bg: '#FFF8E7', fg: '#F5A623' },
];

const MOCK_THREADS: Record<string, ChatMsg[]> = {
  'parent-1': [
    { id: 'p1-1', dir: 'in', text: 'Hello Mrs. Kumar! Arjun has\nbeen doing very well in Mathematics.', time: '10:15 AM' },
    { id: 'p1-2', dir: 'out', text: 'Thank you so much! He has been\nstudying hard at home.', time: '10:18 AM' },
    { id: 'p1-3', dir: 'in', text: 'Please ensure he completes\nexercise 5.3 homework by tomorrow.', time: '10:20 AM' },
    { id: 'p1-4', dir: 'out', text: 'Sure I will make sure tonight.', time: '10:22 AM' },
  ],
  'parent-2': [
    { id: 'p2-1', dir: 'in', text: 'Please ensure lab assignment\nis completed by Friday.', time: 'Yesterday 2:30 PM' },
    { id: 'p2-2', dir: 'out', text: 'Yes sir Arjun will submit\nby Thursday itself.', time: 'Yesterday 2:45 PM' },
  ],
  'parent-3': [
    { id: 'p3-1', dir: 'in', text: 'PTM on April 20th slot\nbooking is now open.', time: 'Mon 11:00 AM' },
    { id: 'p3-2', dir: 'out', text: 'Thank you I will book today.', time: 'Mon 11:30 AM' },
  ],
  'staff-1': [
    { id: 's1-1', dir: 'in', text: 'How is Arjun performing\nin Math? He seems worried.', time: '10:30 AM' },
    { id: 's1-2', dir: 'out', text: 'Arjun is doing well! Scored\n87 in last test. No worry.', time: '10:35 AM' },
    { id: 's1-3', dir: 'in', text: 'That is such a relief!\nThank you Mrs. Subramaniam.', time: '10:37 AM' },
  ],
  'staff-2': [
    { id: 's2-1', dir: 'in', text: 'Can you share last test\nmarks for Sneha please?', time: 'Yesterday 3:00 PM' },
    { id: 's2-2', dir: 'out', text: 'Sneha scored 91 in Mathematics.\nExcellent work!', time: 'Yesterday 3:15 PM' },
  ],
};

function nowLabel() {
  return new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

export default function Chat() {
  const navigation = useNavigation<any>();
  const route = useRoute<any>();
  const chatId = String(route.params?.chatId ?? '1');

  const [role, setRole] = useState<Role>('parent');
  useEffect(() => {
    let alive = true;
    (async () => {
      const u = await getUser();
      const r = (u as any)?.role === 'staff' ? 'staff' : 'parent';
      if (alive) setRole(r);
    })();
    return () => {
      alive = false;
    };
  }, []);

  const contacts = role === 'parent' ? PARENT_CONTACTS : STAFF_CONTACTS;
  const contact = useMemo(() => contacts.find(c => c.id === chatId) ?? contacts[0], [chatId, contacts]);

  const threadKey = `${role}-${chatId}`;
  const initial = useMemo(() => (MOCK_THREADS[threadKey] ? [...MOCK_THREADS[threadKey]] : []), [threadKey]);

  const [msgs, setMsgs] = useState<ChatMsg[]>(initial);
  const [text, setText] = useState('');

  useEffect(() => setMsgs(initial), [initial]);

  const scrollRef = useRef<ScrollView | null>(null);
  useEffect(() => {
    const t = setTimeout(() => scrollRef.current?.scrollToEnd({ animated: true }), 50);
    return () => clearTimeout(t);
  }, [msgs.length]);

  const send = () => {
    const t = text.trim();
    if (!t) return;
    setMsgs(prev => [...prev, { id: `${threadKey}-${Date.now()}`, dir: 'out', text: t, time: nowLabel() }]);
    setText('');
  };

  return (
    <SafeAreaView style={styles.safe}>
      <KeyboardAvoidingView style={styles.kb} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <View style={styles.topNav}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn} hitSlop={10}>
            <Text style={styles.backText}>‹</Text>
          </TouchableOpacity>

          <View style={styles.navCenter}>
            <Text style={styles.contactName} numberOfLines={1}>
              {contact?.name ?? 'Chat'}
            </Text>
            <Text style={styles.contactRole} numberOfLines={1}>
              {contact?.roleLine ?? ''}
            </Text>
          </View>

          <View style={{ width: 40 }} />
        </View>

        <ScrollView ref={scrollRef} style={styles.messages} contentContainerStyle={styles.messagesContent} showsVerticalScrollIndicator={false}>
          {msgs.map(m => {
            const isOut = m.dir === 'out';
            return (
              <View key={m.id} style={[styles.msgRow, isOut ? styles.rowOut : styles.rowIn]}>
                {!isOut ? (
                  <View style={[styles.avatar, { backgroundColor: contact.bg }]}>
                    <Text style={[styles.avatarText, { color: contact.fg }]}>{contact.initials}</Text>
                  </View>
                ) : null}

                <View style={[styles.bubbleWrap, isOut ? { alignItems: 'flex-end' } : { alignItems: 'flex-start' }]}>
                  <View style={[styles.bubble, isOut ? styles.bubbleOut : styles.bubbleIn]}>
                    <Text style={[styles.bubbleText, isOut ? styles.textOut : styles.textIn]}>{m.text}</Text>
                  </View>
                  <Text style={styles.time}>{m.time}</Text>
                </View>
              </View>
            );
          })}
          <View style={{ height: 12 }} />
        </ScrollView>

        <View style={styles.inputBar}>
          <TextInput
            value={text}
            onChangeText={setText}
            placeholder="Type a message..."
            placeholderTextColor="#9CA3AF"
            style={styles.input}
            multiline
          />
          <TouchableOpacity onPress={send} style={styles.sendBtn} activeOpacity={0.9}>
            <Text style={styles.sendIcon}>→</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#FFFFFF' },
  kb: { flex: 1 },

  topNav: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 16, paddingVertical: 10, borderBottomWidth: 1, borderBottomColor: '#F3F4F6' },
  backBtn: { width: 40, height: 40, justifyContent: 'center', alignItems: 'flex-start' },
  backText: { fontSize: 26, color: '#111827', lineHeight: 26 },
  navCenter: { flex: 1, alignItems: 'center' },
  contactName: { fontSize: 16, fontWeight: '800', color: '#111827' },
  contactRole: { fontSize: 12, fontWeight: '700', color: '#6B7280', marginTop: 2 },

  messages: { flex: 1 },
  messagesContent: { padding: 16, gap: 14 },

  msgRow: { flexDirection: 'row', alignItems: 'flex-end' },
  rowIn: { justifyContent: 'flex-start' },
  rowOut: { justifyContent: 'flex-end' },

  avatar: { width: 28, height: 28, borderRadius: 14, alignItems: 'center', justifyContent: 'center', marginRight: 8 },
  avatarText: { fontSize: 11, fontWeight: '800' },

  bubbleWrap: { maxWidth: '82%' },
  bubble: { borderRadius: 12, paddingVertical: 8, paddingHorizontal: 12 },
  bubbleIn: { backgroundColor: '#F3F4F6', marginRight: 60 },
  bubbleOut: { backgroundColor: '#4A90D9', marginLeft: 60 },
  bubbleText: { fontSize: 13, fontWeight: '600', lineHeight: 18 },
  textIn: { color: '#111827' },
  textOut: { color: '#FFFFFF' },
  time: { fontSize: 11, color: '#9CA3AF', fontWeight: '700', marginTop: 4 },

  inputBar: { borderTopWidth: 1, borderTopColor: '#F3F4F6', backgroundColor: '#FFFFFF', flexDirection: 'row', alignItems: 'flex-end', paddingHorizontal: 16, paddingVertical: 10, gap: 10 },
  input: { flex: 1, borderWidth: 1, borderColor: '#E5E7EB', borderRadius: 20, paddingHorizontal: 16, paddingVertical: 10, fontSize: 14, color: '#111827', maxHeight: 110 },
  sendBtn: { width: 40, height: 40, borderRadius: 20, backgroundColor: '#4A90D9', alignItems: 'center', justifyContent: 'center' },
  sendIcon: { color: '#FFFFFF', fontSize: 18, fontWeight: '800' },
});

