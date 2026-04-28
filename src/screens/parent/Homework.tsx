// ✅ Converted from React Web → React Native

import React, { useEffect, useMemo, useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { getSentHomework } from '../../lib/session';

type Filter = 'All' | 'Pending' | 'Submitted' | 'Overdue';
type HWStatus = 'Pending' | 'Submitted' | 'Overdue';

type HomeworkItem = {
  id: string;
  subject: string;
  subjectPillBg: string;
  subjectPillFg: string;
  status: HWStatus;
  title: string;
  description: string;
  dueLabel: string;
  rightLabel: string;
  isFromTeacher?: boolean;
};

const BASE_HOMEWORK: HomeworkItem[] = [
  {
    id: 'h1',
    subject: 'Mathematics',
    subjectPillBg: '#EAF3FB',
    subjectPillFg: '#4A90D9',
    status: 'Pending',
    title: 'Solve Exercise 5.3 Quadratic Equations',
    description: 'Complete problems 1 to 10 from\ntextbook page 87',
    dueLabel: 'Due: Apr 15 2025',
    rightLabel: '⚠ 1 day left',
  },
  {
    id: 'h2',
    subject: 'Science',
    subjectPillBg: '#F0FDF4',
    subjectPillFg: '#5CB85C',
    status: 'Submitted',
    title: 'Draw and label the digestive system',
    description: 'Include all major organs with functions',
    dueLabel: 'Due: Apr 13 2025',
    rightLabel: 'Submitted on Apr 12',
  },
  {
    id: 'h3',
    subject: 'English',
    subjectPillBg: '#FFF8E7',
    subjectPillFg: '#F5A623',
    status: 'Overdue',
    title: 'Write an essay on Climate Change',
    description: 'Minimum 500 words',
    dueLabel: 'Due: Apr 10 2025',
    rightLabel: '⚠ 4 days overdue',
  },
  {
    id: 'h4',
    subject: 'Hindi',
    subjectPillBg: '#EAF3FB',
    subjectPillFg: '#4A90D9',
    status: 'Submitted',
    title: 'Write a letter to school principal',
    description: 'Formal letter format 200 words',
    dueLabel: 'Due: Apr 11 2025',
    rightLabel: 'Submitted on Apr 10',
  },
];

function statusPill(status: HWStatus) {
  if (status === 'Pending') return { bg: '#FFF0F0', fg: '#E85D5D', label: 'Pending' };
  if (status === 'Submitted') return { bg: '#F0FDF4', fg: '#5CB85C', label: 'Submitted ✓' };
  return { bg: '#FFF0F0', fg: '#E85D5D', label: 'Overdue ✗' };
}

export default function Homework() {
  const navigation = useNavigation<any>();
  const [filter, setFilter] = useState<Filter>('All');
  const [teacherHw, setTeacherHw] = useState<HomeworkItem | null>(null);

  useEffect(() => {
    let mounted = true;
    async function loadTeacherHomework() {
      const list = await getSentHomework();
      const first = list[0];
      if (!first) return;

      const content = String(first.content || '');
      const title = (content.slice(0, 50) || first.title || 'Homework').trim();
      const description = (content.slice(50, 130) || '').trim();

      const card: HomeworkItem = {
        id: `teacher-${first.id}`,
        subject: first.subject || 'Homework',
        subjectPillBg: '#EAF3FB',
        subjectPillFg: '#4A90D9',
        status: 'Pending',
        title,
        description: description || 'New homework shared by teacher.',
        dueLabel: `Sent by: ${first.sentBy}`,
        rightLabel: `Sent: ${first.sentAt}`,
        isFromTeacher: true,
      };

      if (mounted) setTeacherHw(card);
    }
    loadTeacherHomework();
    return () => {
      mounted = false;
    };
  }, []);

  const all = useMemo(() => (teacherHw ? [teacherHw, ...BASE_HOMEWORK] : BASE_HOMEWORK), [teacherHw]);

  const filtered = useMemo(() => {
    if (filter === 'All') return all;
    return all.filter(h => h.status === filter);
  }, [all, filter]);

  const total = all.length;
  const submitted = all.filter(h => h.status === 'Submitted').length;
  const pending = all.filter(h => h.status === 'Pending' || h.status === 'Overdue').length;

  const filters: Filter[] = ['All', 'Pending', 'Submitted', 'Overdue'];

  return (
    <SafeAreaView style={styles.safe} edges={['top', 'left', 'right']}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.topNav}>
          <TouchableOpacity onPress={() => navigation.goBack()} activeOpacity={0.85} style={styles.topNavBtn}>
            <Ionicons name="arrow-back" size={22} color="#111827" />
          </TouchableOpacity>
          <Text style={styles.topNavTitle}>Homework</Text>
          <View style={styles.topNavRightSpacer} />
        </View>

        <View style={styles.childRow}>
          <View style={styles.childAvatar}>
            <Text style={styles.childInitials}>AK</Text>
          </View>
          <View style={styles.childInfo}>
            <Text style={styles.childName}>Arjun Kumar</Text>
            <Text style={styles.childClass}>Class 8-A</Text>
          </View>
          <View style={styles.termPill}>
            <Text style={styles.termPillText}>Term 2</Text>
          </View>
        </View>

        <View style={styles.summaryRow}>
          <View style={[styles.summaryCard, { backgroundColor: '#FFF3E0' }]}>
            <Text style={[styles.summaryValue, { color: '#F5A623' }]}>{total}</Text>
            <Text style={styles.summaryLabel}>Total</Text>
          </View>
          <View style={[styles.summaryCard, { backgroundColor: '#F0FDF4' }]}>
            <Text style={[styles.summaryValue, { color: '#5CB85C' }]}>{submitted}</Text>
            <Text style={styles.summaryLabel}>Submitted</Text>
          </View>
          <View style={[styles.summaryCard, { backgroundColor: '#FFF0F0' }]}>
            <Text style={[styles.summaryValue, { color: '#E85D5D' }]}>{pending}</Text>
            <Text style={styles.summaryLabel}>Pending</Text>
          </View>
        </View>

        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.filterRow}>
          {filters.map(f => {
            const active = filter === f;
            return (
              <TouchableOpacity
                key={f}
                activeOpacity={0.9}
                onPress={() => setFilter(f)}
                style={[styles.filterPill, active ? styles.filterPillActive : styles.filterPillInactive]}
              >
                <Text style={[styles.filterText, active ? styles.filterTextActive : styles.filterTextInactive]}>{f}</Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>

        <Text style={styles.sectionTitle}>Recent Homework</Text>

        <View style={styles.hwList}>
          {filtered.map(h => {
            const st = statusPill(h.status);
            const isOverdueCard = h.status === 'Overdue';
            return (
              <View key={h.id} style={[styles.hwCard, isOverdueCard ? styles.hwCardOverdue : null]}>
                <View style={styles.hwTopRow}>
                  <View style={styles.hwPillsLeft}>
                    <View style={[styles.pill, { backgroundColor: h.subjectPillBg }]}>
                      <Text style={[styles.pillText, { color: h.subjectPillFg }]}>{h.subject}</Text>
                    </View>
                    {h.isFromTeacher ? (
                      <View style={[styles.pill, { backgroundColor: '#EAF3FB' }]}>
                        <Text style={[styles.pillText, { color: '#4A90D9' }]}>📚 From Teacher</Text>
                      </View>
                    ) : null}
                  </View>

                  <View style={[styles.pill, { backgroundColor: st.bg }]}>
                    <Text style={[styles.pillText, { color: st.fg }]}>{st.label}</Text>
                  </View>
                </View>

                <Text style={styles.hwTitle}>{h.title}</Text>
                <Text style={styles.hwDesc}>{h.description}</Text>

                <View style={styles.hwDivider} />

                <View style={styles.hwBottomRow}>
                  <Text style={styles.hwDue}>📅 {h.dueLabel}</Text>
                  <Text style={[styles.hwRight, h.status === 'Submitted' ? styles.hwRightSuccess : styles.hwRightDanger]}>
                    {h.rightLabel}
                  </Text>
                </View>
              </View>
            );
          })}

          {filtered.length === 0 ? <Text style={styles.emptyText}>No homework in this category</Text> : null}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#FFFFFF' },
  content: { paddingHorizontal: 20, paddingTop: 12, paddingBottom: 80 },

  topNav: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 },
  topNavBtn: { width: 40, height: 40, borderRadius: 20, alignItems: 'center', justifyContent: 'center' },
  topNavTitle: { fontSize: 18, fontWeight: '700', color: '#111827', textAlign: 'center', flex: 1 },
  topNavRightSpacer: { width: 40, height: 40 },

  childRow: {
    backgroundColor: '#EAF3FB',
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 14,
  },
  childAvatar: { width: 40, height: 40, borderRadius: 20, backgroundColor: '#FFFFFF', alignItems: 'center', justifyContent: 'center' },
  childInitials: { fontSize: 14, fontWeight: '800', color: '#4A90D9' },
  childInfo: { flex: 1 },
  childName: { fontSize: 14, fontWeight: '800', color: '#1F2937', marginBottom: 2 },
  childClass: { fontSize: 12, color: '#9CA3AF', fontWeight: '600' },
  termPill: { backgroundColor: '#FFFFFF', borderWidth: 1, borderColor: '#E5E7EB', borderRadius: 999, paddingHorizontal: 12, paddingVertical: 6 },
  termPillText: { fontSize: 11, fontWeight: '800', color: '#4A90D9' },

  summaryRow: { flexDirection: 'row', gap: 10, marginBottom: 14 },
  summaryCard: { flex: 1, borderRadius: 12, padding: 12, alignItems: 'center', justifyContent: 'center' },
  summaryValue: { fontSize: 20, fontWeight: '900' },
  summaryLabel: { fontSize: 11, color: '#9CA3AF', fontWeight: '700', marginTop: 2 },

  filterRow: { gap: 10, paddingRight: 6, marginBottom: 14 },
  filterPill: { borderRadius: 999, paddingVertical: 6, paddingHorizontal: 16 },
  filterPillActive: { backgroundColor: '#4A90D9' },
  filterPillInactive: { backgroundColor: '#FFFFFF', borderWidth: 1, borderColor: '#E5E7EB' },
  filterText: { fontSize: 12, fontWeight: '800' },
  filterTextActive: { color: '#FFFFFF' },
  filterTextInactive: { color: '#6B7280' },

  sectionTitle: { fontSize: 15, fontWeight: '800', color: '#111827', marginBottom: 12 },

  hwList: { gap: 12 },
  hwCard: { backgroundColor: '#FFFFFF', borderWidth: 1, borderColor: '#E5E7EB', borderRadius: 12, padding: 16 },
  hwCardOverdue: { backgroundColor: '#FFF8F8', borderColor: '#FECACA' },
  hwTopRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: 10, marginBottom: 8 },
  hwPillsLeft: { flexDirection: 'row', alignItems: 'center', gap: 8, flex: 1, flexWrap: 'wrap' },
  pill: { borderRadius: 999, paddingHorizontal: 10, paddingVertical: 6 },
  pillText: { fontSize: 11, fontWeight: '800' },

  hwTitle: { fontSize: 14, fontWeight: '800', color: '#1F2937', marginTop: 6 },
  hwDesc: { fontSize: 12, color: '#9CA3AF', fontWeight: '600', marginTop: 6, lineHeight: 16 },
  hwDivider: { height: 1, backgroundColor: '#E5E7EB', marginVertical: 12 },
  hwBottomRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: 10 },
  hwDue: { fontSize: 12, color: '#9CA3AF', fontWeight: '700' },
  hwRight: { fontSize: 12, fontWeight: '900' },
  hwRightDanger: { color: '#E85D5D' },
  hwRightSuccess: { color: '#5CB85C' },

  emptyText: { textAlign: 'center', color: '#9CA3AF', fontSize: 13, fontWeight: '700', paddingVertical: 16 },
});
