import React, { useCallback, useEffect, useMemo, useState } from 'react';
import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { getSentHomework, SentHomework } from '../../lib/session';

type HwCard = {
  id: string;
  subject: string;
  cls: string;
  sec: string;
  due: string;
  title: string;
  subm: number;
  total: number;
  color: string;
  bg: string;
};

const BASE: HwCard[] = [
  {
    id: 'b1',
    subject: 'Mathematics',
    cls: '8',
    sec: 'A',
    due: 'Apr 15',
    title: 'Solve Exercise 5.3 Quadratic Equations',
    subm: 18,
    total: 32,
    color: '#4A90D9',
    bg: '#EAF3FB',
  },
  {
    id: 'b2',
    subject: 'Mathematics',
    cls: '8',
    sec: 'A',
    due: 'Apr 18',
    title: 'Draw and label coordinate geometry diagram',
    subm: 24,
    total: 32,
    color: '#4A90D9',
    bg: '#EAF3FB',
  },
  {
    id: 'b3',
    subject: 'Mathematics',
    cls: '8',
    sec: 'A',
    due: 'Apr 10',
    title: 'Complete Chapter 4 exercises',
    subm: 32,
    total: 32,
    color: '#4A90D9',
    bg: '#EAF3FB',
  },
  {
    id: 'b4',
    subject: 'Mathematics',
    cls: '9',
    sec: 'B',
    due: 'Apr 16',
    title: 'Quadratic equations practice problems',
    subm: 29,
    total: 35,
    color: '#4A90D9',
    bg: '#EAF3FB',
  },
  {
    id: 'b5',
    subject: 'Mathematics',
    cls: '9',
    sec: 'B',
    due: 'Apr 20',
    title: 'Trigonometry chapter exercise set',
    subm: 21,
    total: 35,
    color: '#4A90D9',
    bg: '#EAF3FB',
  },
  {
    id: 'b6',
    subject: 'Mathematics',
    cls: '7',
    sec: 'C',
    due: 'Apr 18',
    title: 'Algebra problems Exercise 3.2',
    subm: 28,
    total: 30,
    color: '#4A90D9',
    bg: '#EAF3FB',
  },
  {
    id: 'b7',
    subject: 'Mathematics',
    cls: '7',
    sec: 'C',
    due: 'Apr 10',
    title: 'Essay on Environment',
    subm: 30,
    total: 30,
    color: '#4A90D9',
    bg: '#EAF3FB',
  },
];

const CLASSES = ['8', '9', '7'] as const;
const CLASS_TO_SECTION: Record<string, string> = { '8': 'A', '9': 'B', '7': 'C' };

function ProgressBarRow({ value, color }: { value: number; color: string }) {
  const pct = Math.max(0, Math.min(100, value));
  return (
    <View style={styles.progressOuter}>
      <View style={[styles.progressInner, { width: `${pct}%`, backgroundColor: color }]} />
    </View>
  );
}

export default function StaffHomework() {
  const navigation = useNavigation<any>();
  const [cls, setCls] = useState('8');
  const [sec, setSec] = useState('A');
  const [sent, setSent] = useState<SentHomework[]>([]);

  useEffect(() => {
    setSec(CLASS_TO_SECTION[cls]);
  }, [cls]);

  useEffect(() => {
    let alive = true;
    getSentHomework().then(list => {
      if (alive) setSent(list);
    });
    return () => {
      alive = false;
    };
  }, []);

  const openClassPicker = useCallback(() => {
    Alert.alert('Class', 'Choose class', [
      ...CLASSES.map(c => ({ text: `Class ${c}`, onPress: () => setCls(c) })),
      { text: 'Cancel', style: 'cancel' },
    ]);
  }, []);

  const filteredBase = useMemo(
    () => BASE.filter(h => h.cls === cls && h.sec === sec),
    [cls, sec]
  );

  const filteredSent = useMemo(
    () => sent.filter(s => s.class === cls && s.section === sec),
    [sent, cls, sec]
  );

  return (
    <SafeAreaView style={styles.safe} edges={['top', 'left', 'right']}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.topNav}>
          <View style={styles.topNavSpacer} />
          <Text style={styles.topNavTitle}>Homework</Text>
          <TouchableOpacity
            activeOpacity={0.9}
            onPress={() => navigation.navigate('StaffCreateHomework')}
            style={styles.addBtn}
          >
            <Ionicons name="add" size={22} color="#FFFFFF" />
          </TouchableOpacity>
        </View>

        <View style={styles.filterRow}>
          <TouchableOpacity activeOpacity={0.9} style={styles.dropdown} onPress={openClassPicker}>
            <Text style={styles.dropdownValue}>Class {cls}</Text>
            <Ionicons name="chevron-down" size={18} color="#9CA3AF" />
          </TouchableOpacity>
          <TouchableOpacity activeOpacity={0.9} style={styles.dropdown} onPress={() => Alert.alert('Section', `Class ${cls} has only Section ${CLASS_TO_SECTION[cls]}`)}>
            <Text style={styles.dropdownValue}>Section {sec}</Text>
            <Ionicons name="chevron-down" size={18} color="#9CA3AF" />
          </TouchableOpacity>
        </View>

        <View style={{ gap: 12 }}>
          {filteredSent.map(s => (
            <View key={s.id} style={styles.card}>
              <View style={styles.cardTop}>
                <View style={[styles.pill, { backgroundColor: '#EAF3FB' }]}>
                  <Text style={[styles.pillText, { color: '#4A90D9' }]}>{s.subject}</Text>
                </View>
                <View style={[styles.pill, { backgroundColor: '#4A90D9' }]}>
                  <Text style={[styles.pillText, { color: '#FFFFFF' }]}>AI Generated</Text>
                </View>
              </View>
              <Text style={styles.metaGray}>
                Class {s.class} - {s.section} · Sent {new Date(s.sentAt).toLocaleDateString()}
              </Text>
              <Text style={styles.cardTitle}>{s.title}</Text>
              <View style={styles.progressMetaRow}>
                <Text style={styles.progressHint}>0/30 submitted</Text>
                <Text style={styles.justSent}>Just sent</Text>
              </View>
              <ProgressBarRow value={5} color="#4A90D9" />
            </View>
          ))}

          {filteredBase.map(h => {
            const pct = h.total === 0 ? 0 : (h.subm / h.total) * 100;
            const barColor = h.subm === h.total ? '#5CB85C' : '#4A90D9';
            const done = h.subm === h.total;
            return (
              <View key={h.id} style={styles.card}>
                <View style={styles.cardTop}>
                  <View style={[styles.pill, { backgroundColor: h.bg }]}>
                    <Text style={[styles.pillText, { color: h.color }]}>{h.subject}</Text>
                  </View>
                  <Text style={styles.dueText}>Due: {h.due}</Text>
                </View>
                <Text style={styles.cardTitle}>{h.title}</Text>
                <Text style={styles.metaGray}>
                  Class {h.cls} - {h.sec}
                </Text>

                <View style={styles.progressMetaRow}>
                  {done ? (
                    <Text style={styles.allDone}>All Done ✓</Text>
                  ) : (
                    <Text style={styles.progressHint}>
                      {h.subm}/{h.total} submitted
                    </Text>
                  )}
                </View>
                <ProgressBarRow value={pct} color={barColor} />

                <View style={styles.actionRow}>
                  <TouchableOpacity
                    activeOpacity={0.85}
                    onPress={() => navigation.navigate('StaffSubmissions')}
                  >
                    <Text style={styles.linkPrimary}>View Submissions</Text>
                  </TouchableOpacity>
                  <View style={styles.actionRight}>
                    <TouchableOpacity activeOpacity={0.85} onPress={() => Alert.alert('Edit', 'Coming soon')}>
                      <Text style={styles.linkMuted}>Edit</Text>
                    </TouchableOpacity>
                    <TouchableOpacity activeOpacity={0.85} onPress={() => Alert.alert('Delete', 'Coming soon')}>
                      <Text style={styles.linkDanger}>Delete</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            );
          })}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#FFFFFF' },
  content: { paddingHorizontal: 20, paddingTop: 12, paddingBottom: 80 },

  topNav: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  topNavSpacer: { width: 36, height: 36 },
  topNavTitle: { fontSize: 18, fontWeight: '800', color: '#111827', textAlign: 'center', flex: 1 },
  addBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#4A90D9',
    alignItems: 'center',
    justifyContent: 'center',
  },

  filterRow: { flexDirection: 'row', gap: 12, marginBottom: 16 },

  dropdown: {
    flex: 1,
    height: 48,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 8,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  dropdownValue: { fontSize: 14, color: '#1F2937', fontWeight: '700' },

  card: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 12,
    padding: 16,
  },
  cardTop: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 8,
    flexWrap: 'wrap',
  },
  pill: {
    borderRadius: 999,
    paddingHorizontal: 10,
    paddingVertical: 6,
  },
  pillText: { fontSize: 12, fontWeight: '800' },
  dueText: { fontSize: 12, color: '#9CA3AF', fontWeight: '700' },
  metaGray: { marginTop: 8, fontSize: 12, color: '#9CA3AF', fontWeight: '600' },
  cardTitle: { marginTop: 8, fontSize: 14, fontWeight: '800', color: '#111827' },

  progressMetaRow: {
    marginTop: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  progressHint: { fontSize: 11, color: '#9CA3AF', fontWeight: '700' },
  justSent: { fontSize: 11, color: '#4A90D9', fontWeight: '800' },
  allDone: { fontSize: 11, color: '#5CB85C', fontWeight: '900' },

  progressOuter: {
    marginTop: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#F3F4F6',
    overflow: 'hidden',
  },
  progressInner: { height: 6, borderRadius: 3 },

  actionRow: {
    marginTop: 14,
    paddingTop: 14,
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  linkPrimary: { fontSize: 13, fontWeight: '800', color: '#4A90D9' },
  actionRight: { flexDirection: 'row', gap: 16 },
  linkMuted: { fontSize: 13, fontWeight: '700', color: '#9CA3AF' },
  linkDanger: { fontSize: 13, fontWeight: '800', color: '#E85D5D' },
});
